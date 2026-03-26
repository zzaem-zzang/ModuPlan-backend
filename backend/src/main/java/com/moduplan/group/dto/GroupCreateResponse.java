package com.moduplan.group.dto;

public record GroupCreateResponse(
        Long groupId
) {
    public static GroupCreateResponse from(Long groupId) {
        return new GroupCreateResponse(groupId);
    }
}
