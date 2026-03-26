package com.moduplan.schedule.dto;

import java.util.List;

public record ScheduleListResponse(
        List<ScheduleListItemResponse> schedules
) {
    public static ScheduleListResponse from(List<ScheduleListItemResponse> schedules) {
        return new ScheduleListResponse(schedules);
    }
}
