package com.moduplan.group.service;

import com.moduplan.global.exception.NotFoundException;
import com.moduplan.group.dto.GroupCreateRequest;
import com.moduplan.group.dto.GroupCreateResponse;
import com.moduplan.group.entity.Group;
import com.moduplan.group.entity.GroupMember;
import com.moduplan.group.repository.GroupMemberRepository;
import com.moduplan.group.repository.GroupRepository;
import com.moduplan.user.entity.User;
import com.moduplan.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class GroupService {

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final GroupMemberRepository groupMemberRepository;

    public GroupCreateResponse createGroup(Long userId, GroupCreateRequest request) {
        User leader = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 사용자입니다."));

        Group group = Group.create(
                leader,
                request.name(),
                request.description(),
                request.category(),
                request.maxMembers(),
                request.region(),
                request.isPublic()
        );

        Group savedGroup = groupRepository.save(group);

        GroupMember leaderMember = GroupMember.createLeader(savedGroup, leader);
        groupMemberRepository.save(leaderMember);

        return GroupCreateResponse.from(savedGroup.getId());
    }
}
