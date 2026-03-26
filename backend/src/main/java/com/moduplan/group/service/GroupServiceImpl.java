package com.moduplan.group.service;

import com.moduplan.global.exception.BadRequestException;
import com.moduplan.global.exception.ForbiddenException;
import com.moduplan.global.exception.NotFoundException;
import com.moduplan.group.dto.GroupCreateRequest;
import com.moduplan.group.dto.GroupCreateResponse;
import com.moduplan.group.dto.GroupDetailResponse;
import com.moduplan.group.dto.GroupListItemResponse;
import com.moduplan.group.dto.GroupListResponse;
import com.moduplan.group.dto.MyGroupPageResponse;
import com.moduplan.group.dto.MyGroupResponse;
import com.moduplan.group.entity.Group;
import com.moduplan.group.entity.GroupCategory;
import com.moduplan.group.entity.GroupMember;
import com.moduplan.group.entity.GroupStatus;
import com.moduplan.group.repository.GroupMemberRepository;
import com.moduplan.group.repository.GroupRepository;
import com.moduplan.user.entity.User;
import com.moduplan.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class GroupServiceImpl implements GroupService {

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final GroupMemberRepository groupMemberRepository;

    @Override
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

    @Override
    public GroupListResponse getGroups(String category, String region, String keyword, int page, int size) {
        if (page < 0) {
            throw new BadRequestException("페이지 번호는 0 이상이어야 합니다.");
        }

        if (size <= 0) {
            throw new BadRequestException("페이지 크기는 1 이상이어야 합니다.");
        }

        GroupCategory groupCategory = null;
        if (category != null && !category.isBlank()) {
            try {
                groupCategory = GroupCategory.valueOf(category.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new BadRequestException("올바르지 않은 카테고리입니다.");
            }
        }

        Pageable pageable = PageRequest.of(page, size);

        Page<Group> groupPage = groupRepository.searchGroups(
                GroupStatus.ACTIVE,
                groupCategory,
                isBlank(region) ? null : region,
                isBlank(keyword) ? null : keyword,
                pageable
        );

        List<GroupListItemResponse> content = groupPage.getContent().stream()
                .map(group -> new GroupListItemResponse(
                        group.getId(),
                        group.getName(),
                        group.getDescription(),
                        groupMemberRepository.countByGroup_Id(group.getId()),
                        group.getMaxMembers(),
                        group.getRegion(),
                        group.getCategory().name()
                ))
                .toList();

        return new GroupListResponse(
                content,
                groupPage.getNumber(),
                groupPage.getSize(),
                groupPage.getTotalElements()
        );
    }

    @Override
    public GroupDetailResponse getGroupDetail(Long groupId) {
        Group group = groupRepository.findByIdAndDeletedAtIsNullAndStatus(groupId, GroupStatus.ACTIVE)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 모임입니다."));

        int currentMembers = groupMemberRepository.countByGroup_Id(group.getId());

        return new GroupDetailResponse(
                group.getId(),
                group.getName(),
                group.getDescription(),
                group.getCategory().name(),
                group.getRegion(),
                currentMembers,
                group.getMaxMembers(),
                new GroupDetailResponse.LeaderResponse(
                        group.getLeader().getId(),
                        group.getLeader().getNickname()
                ),
                group.getIsPublic(),
                group.getCreatedAt()
        );
    }

    @Override
    public MyGroupPageResponse getMyGroup(Long userId, Pageable pageable) {
        if (pageable.getPageNumber() < 0) {
            throw new BadRequestException("페이지 번호는 0 이상이어야 합니다.");
        }

        if (pageable.getPageSize() <= 0) {
            throw new BadRequestException("페이지 크기는 1 이상이어야 합니다.");
        }

        Page<GroupMember> groupMemberPage =
                groupMemberRepository.findByUser_IdAndGroup_DeletedAtIsNullAndGroup_Status(
                        userId,
                        GroupStatus.ACTIVE,
                        pageable
                );

        Page<MyGroupResponse> responsePage = groupMemberPage.map(groupMember ->
                new MyGroupResponse(
                        groupMember.getGroup().getId(),
                        groupMember.getGroup().getName(),
                        groupMember.getRole().name(),
                        groupMemberRepository.countByGroup_Id(groupMember.getGroup().getId()),
                        groupMember.getGroup().getMaxMembers()
                )
        );

        return MyGroupPageResponse.from(responsePage);
    }

    @Override
    public void deleteGroup(Long userId, Long groupId) {
        Group group = groupRepository.findByIdAndDeletedAtIsNullAndStatus(groupId, GroupStatus.ACTIVE)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 모임입니다."));

        if (!group.getLeader().getId().equals(userId)) {
            throw new ForbiddenException("모임장이 아닌 사용자입니다.");
        }

        group.delete();
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}
