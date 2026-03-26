package com.moduplan.group.entity;

import com.moduplan.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "meeting_groups")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "leader_id", nullable = false)
    private User leader;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private GroupCategory category;

    @Column(name = "max_members", nullable = false)
    private Integer maxMembers;

    @Column(nullable = false, length = 100)
    private String region;

    @Column(name = "is_public", nullable = false)
    private Boolean isPublic;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private GroupStatus status;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    public static Group create(
            User leader,
            String name,
            String description,
            GroupCategory category,
            Integer maxMembers,
            String region,
            Boolean isPublic
    ) {
        LocalDateTime now = LocalDateTime.now();

        return Group.builder()
                .leader(leader)
                .name(name)
                .description(description)
                .category(category)
                .maxMembers(maxMembers)
                .region(region)
                .isPublic(isPublic)
                .status(GroupStatus.ACTIVE)
                .createdAt(now)
                .updatedAt(now)
                .build();
    }

    public void delete() {
        this.status = GroupStatus.CLOSED;
        this.deletedAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
}
