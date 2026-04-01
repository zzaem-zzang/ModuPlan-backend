package com.moduplan.groupinvitecode.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record GroupInviteCodeJoinRequest(
        @NotBlank(message = "초대코드를 입력해주세요.")
        @Size(max = 20, message = "초대코드는 20자 이하여야 합니다.")
        String code
) {
}
