package com.moduplan.user.dto;

import java.time.LocalDateTime;

public record MyInfoResponse(
        Long userId,
        String email,
        String nickname,
        LocalDateTime createdAt
) {
}
