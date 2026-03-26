package com.moduplan.schedule.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record ScheduleCreateRequest(

        @NotBlank(message = "일정 제목은 필수입니다.")
        @Size(max = 100, message = "일정 제목은 100자 이하여야 합니다.")
        String title,

        String description,

        @NotNull(message = "일정 일시는 필수입니다.")
        LocalDateTime scheduledAt,

        @Size(max = 200, message = "장소는 200자 이하여야 합니다.")
        String location
) {
}
