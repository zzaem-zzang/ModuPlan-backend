package com.moduplan.schedule.dto;

import com.moduplan.schedule.entity.Schedule;

import java.time.LocalDateTime;

public record ScheduleListItemResponse(
        Long scheduleId,
        String title,
        String description,
        LocalDateTime scheduledAt,
        String location
) {
    public static ScheduleListItemResponse from(Schedule schedule) {
        return new ScheduleListItemResponse(
                schedule.getId(),
                schedule.getTitle(),
                schedule.getDescription(),
                schedule.getScheduledAt(),
                schedule.getLocation()
        );
    }
}
