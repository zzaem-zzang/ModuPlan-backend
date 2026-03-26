package com.moduplan.schedule.dto;

public record ScheduleCreateResponse(
        Long scheduleId
) {
    public static ScheduleCreateResponse from(Long scheduleId) {
        return new ScheduleCreateResponse(scheduleId);
    }
}
