package com.moduplan.auth.dto;

public record LoginResponse(
        Long id,
        String nickname,
        String token
) {
}
