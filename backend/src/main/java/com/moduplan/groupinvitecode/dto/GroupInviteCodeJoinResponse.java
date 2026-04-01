package com.moduplan.groupinvitecode.dto;

import com.moduplan.group.entity.Group;
import com.moduplan.group.entity.GroupMember;

import java.time.LocalDateTime;

public record GroupInviteCodeJoinResponse(
        Long groupId,
        String groupName,
        LocalDateTime joinedAt
) {
    public static GroupInviteCodeJoinResponse from(Group group, GroupMember member) {
        return new GroupInviteCodeJoinResponse(
                group.getId(),
                group.getName(),
                member.getJoinedAt()
        );
    }
}
