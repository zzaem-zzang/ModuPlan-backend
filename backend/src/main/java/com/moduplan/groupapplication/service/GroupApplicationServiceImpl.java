package com.moduplan.groupapplication.service;

import com.moduplan.global.exception.ConflictException;
import com.moduplan.global.exception.ForbiddenException;
import com.moduplan.global.exception.NotFoundException;
import com.moduplan.group.entity.Group;
import com.moduplan.group.entity.GroupMember;
import com.moduplan.group.entity.GroupStatus;
import com.moduplan.group.repository.GroupMemberRepository;
import com.moduplan.group.repository.GroupRepository;
import com.moduplan.groupapplication.dto.GroupApplicationCreateResponse;
import com.moduplan.groupapplication.dto.GroupApplicationProcessResponse;
import com.moduplan.groupapplication.entity.GroupApplication;
import com.moduplan.groupapplication.entity.GroupApplicationStatus;
import com.moduplan.groupapplication.repository.GroupApplicationRepository;
import com.moduplan.user.entity.User;
import com.moduplan.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class GroupApplicationServiceImpl implements GroupApplicationService {

    private final UserRepository userRepository;
    private final GroupRepository groupRepository;
    private final GroupMemberRepository groupMemberRepository;
    private final GroupApplicationRepository groupApplicationRepository;

    @Override
    public GroupApplicationCreateResponse apply(Long userId, Long groupId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 사용자입니다."));

        Group group = groupRepository.findByIdAndDeletedAtIsNullAndStatus(groupId, GroupStatus.ACTIVE)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 모임입니다."));

        if (!group.getIsPublic()) {
            throw new ForbiddenException("비공개 모임은 참여 신청할 수 없습니다.");
        }

        if (groupMemberRepository.existsByGroup_IdAndUser_Id(groupId, userId)) {
            throw new ConflictException("이미 참여 중인 모임입니다.");
        }

        boolean alreadyPending = groupApplicationRepository.existsByGroup_IdAndUser_IdAndStatus(
                groupId, userId, GroupApplicationStatus.PENDING
        );
        if (alreadyPending) {
            throw new ConflictException("이미 처리 대기 중인 참여 신청이 있습니다.");
        }

        int currentMembers = groupMemberRepository.countByGroup_Id(groupId);
        if (currentMembers >= group.getMaxMembers()) {
            throw new ConflictException("모임 정원이 가득 찼습니다.");
        }

        GroupApplication saved = groupApplicationRepository.save(GroupApplication.createPending(group, user));
        return GroupApplicationCreateResponse.from(saved.getId());
    }

    @Override
    public GroupApplicationProcessResponse approve(Long userId, Long groupId, Long applicationId) {
        Group group = groupRepository.findByIdAndDeletedAtIsNullAndStatus(groupId, GroupStatus.ACTIVE)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 모임입니다."));

        if (!group.getLeader().getId().equals(userId)) {
            throw new ForbiddenException("모임장이 아닌 사용자입니다.");
        }

        GroupApplication application = groupApplicationRepository.findByIdAndGroup_Id(applicationId, groupId)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 참여 신청입니다."));

        if (application.getStatus() != GroupApplicationStatus.PENDING) {
            throw new ConflictException("이미 처리된 참여 신청입니다.");
        }

        if (groupMemberRepository.existsByGroup_IdAndUser_Id(groupId, application.getUser().getId())) {
            throw new ConflictException("이미 참여 중인 사용자입니다.");
        }

        int currentMembers = groupMemberRepository.countByGroup_Id(groupId);
        if (currentMembers >= group.getMaxMembers()) {
            throw new ConflictException("모임 정원이 가득 찼습니다.");
        }

        application.approve();
        GroupMember member = GroupMember.createMember(group, application.getUser());
        groupMemberRepository.save(member);

        return GroupApplicationProcessResponse.from(application.getId(), application.getStatus().name());
    }

    @Override
    public GroupApplicationProcessResponse reject(Long userId, Long groupId, Long applicationId) {
        Group group = groupRepository.findByIdAndDeletedAtIsNullAndStatus(groupId, GroupStatus.ACTIVE)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 모임입니다."));

        if (!group.getLeader().getId().equals(userId)) {
            throw new ForbiddenException("모임장이 아닌 사용자입니다.");
        }

        GroupApplication application = groupApplicationRepository.findByIdAndGroup_Id(applicationId, groupId)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 참여 신청입니다."));

        if (application.getStatus() != GroupApplicationStatus.PENDING) {
            throw new ConflictException("이미 처리된 참여 신청입니다.");
        }

        application.reject();
        return GroupApplicationProcessResponse.from(application.getId(), application.getStatus().name());
    }
}
