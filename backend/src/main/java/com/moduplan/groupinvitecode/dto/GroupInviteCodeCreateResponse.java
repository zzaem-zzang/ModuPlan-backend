package com.moduplan.groupinvitecode.dto;

import com.moduplan.groupinvitecode.entity.GroupInviteCode;

import java.time.LocalDateTime;

public record GroupInviteCodeCreateResponse(
        Long inviteCodeId,
        Long groupId,
        String code,
        String status,
        Integer maxUses,
        Integer usedCount,
        LocalDateTime expiresAt,
        LocalDateTime createdAt
) {
    public static GroupInviteCodeCreateResponse from(GroupInviteCode inviteCode) {
        return new GroupInviteCodeCreateResponse(
                inviteCode.getId(),
                inviteCode.getGroup().getId(),
                inviteCode.getCode(),
                inviteCode.getStatus().name(),
                inviteCode.getMaxUses(),
                inviteCode.getUsedCount(),
                inviteCode.getExpiresAt(),
                inviteCode.getCreatedAt()
        );
    }
}
