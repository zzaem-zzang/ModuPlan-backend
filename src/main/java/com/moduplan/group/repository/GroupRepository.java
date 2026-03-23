package com.moduplan.group.repository;

import com.moduplan.group.entity.Group;
import com.moduplan.group.entity.GroupCategory;
import com.moduplan.group.entity.GroupStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GroupRepository extends JpaRepository<Group, Long> {
    @Query("""
            select g
            from Group g
            where g.deletedAt is null
              and g.status = :status
              and (:category is null or g.category = :category)
              and (:region is null or g.region like concat('%', :region, '%'))
              and (
                    :keyword is null
                    or g.name like concat('%', :keyword, '%')
                    or g.description like concat('%', :keyword, '%')
                  )
            """)
    Page<Group> searchGroups(
            @Param("status") GroupStatus status,
            @Param("category") GroupCategory category,
            @Param("region") String region,
            @Param("keyword") String keyword,
            Pageable pageable
    );
}
