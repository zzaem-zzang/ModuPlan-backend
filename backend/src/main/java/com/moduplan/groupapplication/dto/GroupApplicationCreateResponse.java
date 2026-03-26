package com.moduplan.groupapplication.dto;

public record GroupApplicationCreateResponse(
        Long applicationId
) {
    public static GroupApplicationCreateResponse from(Long applicationId) {
        return new GroupApplicationCreateResponse(applicationId);
    }
}
