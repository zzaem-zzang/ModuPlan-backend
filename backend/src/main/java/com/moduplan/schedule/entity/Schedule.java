package com.moduplan.schedule.entity;

import com.moduplan.group.entity.Group;
import com.moduplan.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "schedules")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "scheduled_at", nullable = false)
    private LocalDateTime scheduledAt;

    @Column(length = 200)
    private String location;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public static Schedule create(
            Group group,
            User createdBy,
            String title,
            String description,
            LocalDateTime scheduledAt,
            String location
    ) {
        LocalDateTime now = LocalDateTime.now();

        return Schedule.builder()
                .group(group)
                .createdBy(createdBy)
                .title(title)
                .description(description)
                .scheduledAt(scheduledAt)
                .location(location)
                .createdAt(now)
                .updatedAt(now)
                .build();
    }
}
