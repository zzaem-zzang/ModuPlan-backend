package com.moduplan.groupapplication.entity;

import com.moduplan.group.entity.Group;
import com.moduplan.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "group_applications")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class GroupApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private GroupApplicationStatus status;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "processed_at")
    private LocalDateTime processedAt;

    public static GroupApplication createPending(Group group, User user) {
        return GroupApplication.builder()
                .group(group)
                .user(user)
                .status(GroupApplicationStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .processedAt(null)
                .build();
    }

    public void approve() {
        this.status = GroupApplicationStatus.APPROVED;
        this.processedAt = LocalDateTime.now();
    }

    public void reject() {
        this.status = GroupApplicationStatus.REJECTED;
        this.processedAt = LocalDateTime.now();
    }
}
