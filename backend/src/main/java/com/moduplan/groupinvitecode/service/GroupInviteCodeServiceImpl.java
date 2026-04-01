package com.moduplan.groupinvitecode.service;

import com.moduplan.global.exception.BadRequestException;
import com.moduplan.global.exception.ConflictException;
import com.moduplan.global.exception.ForbiddenException;
import com.moduplan.global.exception.NotFoundException;
import com.moduplan.group.entity.Group;
import com.moduplan.group.entity.GroupStatus;
import com.moduplan.group.repository.GroupRepository;
import com.moduplan.groupinvitecode.dto.GroupInviteCodeCreateResponse;
import com.moduplan.groupinvitecode.entity.GroupInviteCode;
import com.moduplan.groupinvitecode.entity.GroupInviteCodeStatus;
import com.moduplan.groupinvitecode.repository.GroupInviteCodeRepository;
import com.moduplan.user.entity.User;
import com.moduplan.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;

@Service
@RequiredArgsConstructor
@Transactional
public class GroupInviteCodeServiceImpl implements GroupInviteCodeService {

    private static final String CODE_CHARACTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    private static final int CODE_LENGTH = 8;
    private static final SecureRandom RANDOM = new SecureRandom();

    private final GroupInviteCodeRepository groupInviteCodeRepository;
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;

    @Override
    public GroupInviteCodeCreateResponse createInviteCode(Long userId, Long groupId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("사용자를 찾을 수 없습니다."));

        Group group = groupRepository.findByIdAndDeletedAtIsNullAndStatus(groupId, GroupStatus.ACTIVE)
                .orElseThrow(() -> new NotFoundException("모임을 찾을 수 없습니다."));

        if (!group.getLeader().getId().equals(userId)) {
            throw new ForbiddenException("모임장만 초대코드를 생성할 수 있습니다.");
        }

        if (group.getIsPublic()) {
            throw new BadRequestException("공개 모임은 초대코드를 생성할 수 없습니다.");
        }

        boolean hasActiveCode = groupInviteCodeRepository
                .findFirstByGroup_IdAndStatusOrderByCreatedAtDesc(groupId, GroupInviteCodeStatus.ACTIVE)
                .isPresent();
        if (hasActiveCode) {
            throw new ConflictException("이미 사용 가능한 초대코드가 존재합니다.");
        }

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
