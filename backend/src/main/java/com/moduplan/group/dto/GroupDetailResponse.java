package com.moduplan.group.dto;

import java.time.LocalDateTime;

public record GroupDetailResponse(
        Long groupId,
        String name,
        String description,
        String category,
        String region,
        Integer currentMembers,
        Integer maxMembers,
        LeaderResponse leader,
        Boolean isPublic,
        LocalDateTime createdAt
) {
    public record LeaderResponse(
            Long userId,
            String nickname
    ) {
    }
}
