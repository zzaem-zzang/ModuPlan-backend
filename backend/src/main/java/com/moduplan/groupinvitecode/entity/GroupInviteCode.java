package com.moduplan.groupinvitecode.entity;

import com.moduplan.group.entity.Group;
import com.moduplan.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "group_invite_codes",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_group_invite_codes_code", columnNames = "code")
        },
        indexes = {
                @Index(name = "idx_group_invite_codes_group_status", columnList = "group_id, status")
        }
)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class GroupInviteCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;

    @Column(nullable = false, length = 20)
    private String code;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private GroupInviteCodeStatus status;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "revoked_at")
    private LocalDateTime revokedAt;

    public static GroupInviteCode create(
            Group group,
            String code,
            LocalDateTime expiresAt,
            User createdBy
    ) {
        LocalDateTime now = LocalDateTime.now();

        return GroupInviteCode.builder()
                .group(group)
                .code(code)
                .status(GroupInviteCodeStatus.ACTIVE)
                .expiresAt(expiresAt)
                .createdBy(createdBy)
                .createdAt(now)
                .updatedAt(now)
                .build();
    }

    public void expire() {
        this.status = GroupInviteCodeStatus.EXPIRED;
        this.updatedAt = LocalDateTime.now();
    }

    public void revoke() {
        LocalDateTime now = LocalDateTime.now();
        this.status = GroupInviteCodeStatus.REVOKED;
        this.revokedAt = now;
        this.updatedAt = now;
    }
}
