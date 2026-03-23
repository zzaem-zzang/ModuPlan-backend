package com.moduplan.user.dto;

public record UserDetailResponse(
        Long userId,
        String nickname,
        int joinGroupCount
) {
}
