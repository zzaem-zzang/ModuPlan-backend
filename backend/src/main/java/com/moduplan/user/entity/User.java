package com.moduplan.user.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(length = 255)
    private String password;

    @Column(nullable = false, length = 50)
    private String nickname;

    @Column(length = 20)
    private String provider;

    @Column(length = 100)
    private String providerId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private UserStatus status;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @Column(nullable = true)
    private LocalDateTime deletedAt;

    @Builder
    public User(String email, String password, String nickname){
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.status = UserStatus.ACTIVE;
        this.provider = "LOCAL";
    }

    public static User oauthUser(String email, String nickname, String provider, String providerId) {
        User user = new User();
        user.email = email;
        user.password = "OAUTH2_USER";
        user.nickname = nickname;
        user.provider = provider;
        user.providerId = providerId;
        user.status = UserStatus.ACTIVE;
        return user;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public void withdraw() {
        this.deletedAt = LocalDateTime.now();
    }
}
