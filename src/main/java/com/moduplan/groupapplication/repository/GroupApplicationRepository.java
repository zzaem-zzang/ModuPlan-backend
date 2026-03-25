package com.moduplan.groupapplication.repository;

import com.moduplan.groupapplication.entity.GroupApplication;
import com.moduplan.groupapplication.entity.GroupApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupApplicationRepository extends JpaRepository<GroupApplication, Long> {
    boolean existsByGroup_IdAndUser_IdAndStatus(Long groupId, Long userId, GroupApplicationStatus status);
}
