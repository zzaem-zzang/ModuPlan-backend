package com.moduplan.groupinvitecode.service;

import com.moduplan.global.exception.BadRequestException;
import com.moduplan.global.exception.ConflictException;
import com.moduplan.global.exception.ForbiddenException;
import com.moduplan.global.exception.NotFoundException;
import com.moduplan.group.entity.Group;
import com.moduplan.group.entity.GroupMember;
import com.moduplan.group.entity.GroupStatus;
import com.moduplan.group.repository.GroupMemberRepository;
import com.moduplan.group.repository.GroupRepository;
import com.moduplan.groupinvitecode.dto.GroupInviteCodeCreateResponse;
import com.moduplan.groupinvitecode.dto.GroupInviteCodeJoinRequest;
import com.moduplan.groupinvitecode.dto.GroupInviteCodeJoinResponse;
import com.moduplan.groupinvitecode.entity.GroupInviteCode;
import com.moduplan.groupinvitecode.entity.GroupInviteCodeStatus;
import com.moduplan.groupinvitecode.repository.GroupInviteCodeRepository;
import com.moduplan.user.entity.User;
import com.moduplan.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class GroupInviteCodeServiceImpl implements GroupInviteCodeService {

    private static final String CODE_CHARACTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    private static final int CODE_LENGTH = 8;
    private static final SecureRandom RANDOM = new SecureRandom();

    private final GroupInviteCodeRepository groupInviteCodeRepository;
    private final GroupRepository groupRepository;
    private final GroupMemberRepository groupMemberRepository;
    private final UserRepository userRepository;

    @Override
    public GroupInviteCodeCreateResponse createInviteCode(Long userId, Long groupId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("사용자를 찾을 수 없습니다."));

        Group group = getManageablePrivateGroup(userId, groupId);

        boolean hasActiveCode = groupInviteCodeRepository
                .findFirstByGroup_IdAndStatusOrderByCreatedAtDesc(groupId, GroupInviteCodeStatus.ACTIVE)
                .isPresent();
        if (hasActiveCode) {
            throw new ConflictException("이미 사용 가능한 초대코드가 존재합니다.");
        }

        return createAndSaveInviteCode(group, user);
    }

    @Override
    @Transactional(readOnly = true)
    public GroupInviteCodeCreateResponse getInviteCode(Long userId, Long groupId) {
        getManageablePrivateGroup(userId, groupId);

        GroupInviteCode inviteCode = groupInviteCodeRepository
                .findFirstByGroup_IdAndStatusOrderByCreatedAtDesc(groupId, GroupInviteCodeStatus.ACTIVE)
                .orElseThrow(() -> new NotFoundException("활성화된 초대코드가 없습니다."));

        return GroupInviteCodeCreateResponse.from(inviteCode);
    }

    @Override
    public GroupInviteCodeCreateResponse regenerateInviteCode(Long userId, Long groupId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("사용자를 찾을 수 없습니다."));

        Group group = getManageablePrivateGroup(userId, groupId);

        groupInviteCodeRepository
                .findFirstByGroup_IdAndStatusOrderByCreatedAtDesc(groupId, GroupInviteCodeStatus.ACTIVE)
                .ifPresent(GroupInviteCode::revoke);

        return createAndSaveInviteCode(group, user);
    }

    @Override
    public GroupInviteCodeJoinResponse joinByCode(Long userId, GroupInviteCodeJoinRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("사용자를 찾을 수 없습니다."));

        GroupInviteCode inviteCode = groupInviteCodeRepository
                .findByCodeAndStatus(request.code(), GroupInviteCodeStatus.ACTIVE)
                .orElseThrow(() -> new BadRequestException("유효하지 않은 초대코드입니다."));

        validateInviteCode(inviteCode);

        Group group = inviteCode.getGroup();
        if (group.getStatus() != GroupStatus.ACTIVE || group.getDeletedAt() != null) {
            throw new NotFoundException("참여할 수 없는 모임입니다.");
        }

        if (group.getIsPublic()) {
            throw new BadRequestException("공개 모임은 초대코드로 참여할 수 없습니다.");
        }

        if (groupMemberRepository.existsByGroup_IdAndUser_Id(group.getId(), userId)) {
            throw new ConflictException("이미 참여 중인 모임입니다.");
        }

        int currentMembers = groupMemberRepository.countByGroup_Id(group.getId());
        if (currentMembers >= group.getMaxMembers()) {
            throw new ConflictException("모임 정원이 가득 찼습니다.");
        }

        GroupMember member = GroupMember.createMember(group, user);
        GroupMember savedMember = groupMemberRepository.save(member);
        inviteCode.markUsed();

        return GroupInviteCodeJoinResponse.from(group, savedMember);
    }

    private void validateInviteCode(GroupInviteCode inviteCode) {
        LocalDateTime now = LocalDateTime.now();

        if (inviteCode.getExpiresAt() != null && inviteCode.getExpiresAt().isBefore(now)) {
            inviteCode.expire();
            throw new ConflictException("만료된 초대코드입니다.");
        }

        if (inviteCode.getMaxUses() != null && inviteCode.getUsedCount() >= inviteCode.getMaxUses()) {
            inviteCode.revoke();
            throw new ConflictException("사용 가능한 횟수를 초과한 초대코드입니다.");
        }
    }

    private Group getManageablePrivateGroup(Long userId, Long groupId) {
        Group group = groupRepository.findByIdAndDeletedAtIsNullAndStatus(groupId, GroupStatus.ACTIVE)
                .orElseThrow(() -> new NotFoundException("모임을 찾을 수 없습니다."));

        if (!group.getLeader().getId().equals(userId)) {
            throw new ForbiddenException("모임장만 초대코드를 관리할 수 있습니다.");
        }

        if (group.getIsPublic()) {
            throw new BadRequestException("공개 모임은 초대코드를 사용할 수 없습니다.");
        }

        return group;
    }

    private GroupInviteCodeCreateResponse createAndSaveInviteCode(Group group, User user) {
        GroupInviteCode inviteCode = GroupInviteCode.create(
                group,
                generateUniqueCode(),
                null,
                null,
                user
        );

        GroupInviteCode savedInviteCode = groupInviteCodeRepository.save(inviteCode);
        return GroupInviteCodeCreateResponse.from(savedInviteCode);
    }

    private String generateUniqueCode() {
        String code;

        do {
            code = generateCode();
        } while (groupInviteCodeRepository.existsByCode(code));

        return code;
    }

    private String generateCode() {
        StringBuilder builder = new StringBuilder(CODE_LENGTH);

        for (int i = 0; i < CODE_LENGTH; i++) {
            int randomIndex = RANDOM.nextInt(CODE_CHARACTERS.length());
            builder.append(CODE_CHARACTERS.charAt(randomIndex));
        }

        return builder.toString();
    }
}
