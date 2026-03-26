package com.moduplan.groupapplication.dto;

public record GroupApplicationProcessResponse(
        Long applicationId,
        String status
) {
    public static GroupApplicationProcessResponse from(Long applicationId, String status) {
        return new GroupApplicationProcessResponse(applicationId, status);
    }
}
