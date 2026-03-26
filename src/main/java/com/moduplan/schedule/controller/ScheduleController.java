package com.moduplan.schedule.controller;

import com.moduplan.global.exception.UnauthorizedException;
import com.moduplan.global.response.ApiResponse;
import com.moduplan.schedule.dto.ScheduleCreateRequest;
import com.moduplan.schedule.dto.ScheduleCreateResponse;
import com.moduplan.schedule.dto.ScheduleListResponse;
import com.moduplan.schedule.service.ScheduleService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/groups/{groupId}/schedules")
public class ScheduleController {

    private final ScheduleService scheduleService;

    @Operation(summary = "일정 생성")
    @PostMapping
    public ResponseEntity<ApiResponse<ScheduleCreateResponse>> createSchedule(
            Authentication authentication,
            @PathVariable Long groupId,
            @Valid @RequestBody ScheduleCreateRequest request
    ) {
        if (authentication == null || authentication.getPrincipal() == null) {
            throw new UnauthorizedException("인증되지 않은 사용자입니다.");
        }

        Long userId = (Long) authentication.getPrincipal();
        ScheduleCreateResponse response = scheduleService.createSchedule(userId, groupId, request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(201, "일정이 생성되었습니다.", response));
    }

    @Operation(summary = "일정 목록 조회")
    @GetMapping
    public ResponseEntity<ApiResponse<ScheduleListResponse>> getSchedules(
            Authentication authentication,
            @PathVariable Long groupId
    ) {
        if (authentication == null || authentication.getPrincipal() == null) {
            throw new UnauthorizedException("인증되지 않은 사용자입니다.");
        }

        ScheduleListResponse response = scheduleService.getSchedules(groupId);

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(200, "일정 목록 조회에 성공했습니다.", response));
    }
}
