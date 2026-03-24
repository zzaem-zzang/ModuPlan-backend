package com.moduplan.group.dto;

public record MyGroupResponse(
        Long groupId,
        String name,
        String role,
        Integer currentMembers,
        Integer maxMembers
) {
}