package com.moduplan.schedule.service;

import com.moduplan.global.exception.ForbiddenException;
import com.moduplan.global.exception.NotFoundException;
import com.moduplan.group.entity.Group;
import com.moduplan.group.entity.GroupStatus;
import com.moduplan.group.repository.GroupRepository;
import com.moduplan.schedule.dto.ScheduleCreateRequest;
import com.moduplan.schedule.dto.ScheduleCreateResponse;
import com.moduplan.schedule.dto.ScheduleListItemResponse;
import com.moduplan.schedule.dto.ScheduleListResponse;
import com.moduplan.schedule.entity.Schedule;
import com.moduplan.schedule.repository.ScheduleRepository;
import com.moduplan.user.entity.User;
import com.moduplan.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ScheduleServiceImpl implements ScheduleService {

    private final UserRepository userRepository;
    private final GroupRepository groupRepository;
    private final ScheduleRepository scheduleRepository;

    @Override
    public ScheduleCreateResponse createSchedule(Long userId, Long groupId, ScheduleCreateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 사용자입니다."));

        Group group = groupRepository.findByIdAndDeletedAtIsNullAndStatus(groupId, GroupStatus.ACTIVE)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 모임입니다."));

        if (!group.getLeader().getId().equals(userId)) {
            throw new ForbiddenException("모임장만 일정을 생성할 수 있습니다.");
        }

        Schedule schedule = Schedule.create(
                group,
                user,
                request.title(),
                request.description(),
                request.scheduledAt(),
                request.location()
        );

        Schedule savedSchedule = scheduleRepository.save(schedule);
        return ScheduleCreateResponse.from(savedSchedule.getId());
    }

    @Override
    @Transactional(readOnly = true)
    public ScheduleListResponse getSchedules(Long groupId) {
        groupRepository.findByIdAndDeletedAtIsNullAndStatus(groupId, GroupStatus.ACTIVE)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 모임입니다."));

        return ScheduleListResponse.from(
                scheduleRepository.findByGroup_IdOrderByScheduledAtAsc(groupId).stream()
                        .map(ScheduleListItemResponse::from)
                        .toList()
        );
    }
}
