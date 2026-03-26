package com.moduplan.schedule.repository;

import com.moduplan.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    List<Schedule> findByGroup_IdOrderByScheduledAtAsc(Long groupId);
}
