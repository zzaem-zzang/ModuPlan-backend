package com.moduplan.auth.dto;

public record TokenResponse(
        String accessToken,
        String refreshToken
) {
}
