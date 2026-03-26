package com.moduplan.schedule.service;

import com.moduplan.schedule.dto.ScheduleCreateRequest;
import com.moduplan.schedule.dto.ScheduleCreateResponse;
import com.moduplan.schedule.dto.ScheduleListResponse;

public interface ScheduleService {

    ScheduleCreateResponse createSchedule(Long userId, Long groupId, ScheduleCreateRequest request);

    ScheduleListResponse getSchedules(Long groupId);
}
