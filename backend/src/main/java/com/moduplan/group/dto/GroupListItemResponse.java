package com.moduplan.group.dto;

import com.moduplan.group.entity.Group;

public record GroupListItemResponse(
        Long groupId,
        String name,
        String description,
        Integer currentMembers,
        Integer maxMembers,
        String region,
        String category
) {
    public static GroupListItemResponse from(Group group, int currentMembers) {
        return new GroupListItemResponse(
                group.getId(),
                group.getName(),
                group.getDescription(),
                currentMembers,
                group.getMaxMembers(),
                group.getRegion(),
                group.getCategory().name()
        );
    }
}