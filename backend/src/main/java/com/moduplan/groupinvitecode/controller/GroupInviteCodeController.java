package com.moduplan.groupinvitecode.controller;

import com.moduplan.global.exception.UnauthorizedException;
import com.moduplan.global.response.ApiResponse;
import com.moduplan.groupinvitecode.dto.GroupInviteCodeCreateResponse;
import com.moduplan.groupinvitecode.service.GroupInviteCodeService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/groups/{groupId}/invite-code")
public class GroupInviteCodeController {

    private final GroupInviteCodeService groupInviteCodeService;

    @Operation(summary = "모임 초대코드 생성")
    @PostMapping
    public ResponseEntity<ApiResponse<GroupInviteCodeCreateResponse>> createInviteCode(
            Authentication authentication,
            @PathVariable Long groupId
    ) {
        if (authentication == null || authentication.getPrincipal() == null) {
            throw new UnauthorizedException("인증이 필요합니다.");
        }

        Long userId = (Long) authentication.getPrincipal();
        GroupInviteCodeCreateResponse response = groupInviteCodeService.createInviteCode(userId, groupId);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(201, "초대코드가 생성되었습니다.", response));
    }
}
