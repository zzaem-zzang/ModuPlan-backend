package com.moduplan.group.dto;

public record GroupListItemResponse(
        Long groupId,
        String name,
        String description,
        Integer currentMembers,
        Integer maxMembers,
        String region,
        String category
) {
}
