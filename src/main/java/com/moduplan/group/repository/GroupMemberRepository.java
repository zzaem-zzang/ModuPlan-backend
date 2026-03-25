package com.moduplan.group.repository;

import com.moduplan.group.entity.GroupMember;
import com.moduplan.group.entity.GroupStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;



public interface GroupMemberRepository extends JpaRepository<GroupMember, Long> {
    int countByGroup_Id(Long groupId);

    boolean existsByGroup_IdAndUser_Id(Long groupId, Long userId);

    Page<GroupMember> findByUser_IdAndGroup_DeletedAtIsNullAndGroup_Status(
            Long userId,
            GroupStatus status,
            Pageable pageable
    );
}
