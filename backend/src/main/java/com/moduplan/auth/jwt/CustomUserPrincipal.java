package com.moduplan.auth.jwt;

public record CustomUserPrincipal(
        Long userId,
        String email
) {
}
