package com.moduplan.groupinvitecode.controller;

import com.moduplan.global.exception.UnauthorizedException;
import com.moduplan.global.response.ApiResponse;
import com.moduplan.groupinvitecode.dto.GroupInviteCodeJoinRequest;
import com.moduplan.groupinvitecode.dto.GroupInviteCodeJoinResponse;
import com.moduplan.groupinvitecode.service.GroupInviteCodeService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/groups/join-by-code")
public class GroupInviteCodeJoinController {

    private final GroupInviteCodeService groupInviteCodeService;

    @Operation(summary = "초대코드로 비공개 모임 참여")
    @PostMapping
    public ResponseEntity<ApiResponse<GroupInviteCodeJoinResponse>> joinByCode(
            Authentication authentication,
            @Valid @RequestBody GroupInviteCodeJoinRequest request
    ) {
        if (authentication == null || authentication.getPrincipal() == null) {
            throw new UnauthorizedException("인증이 필요합니다.");
        }

        Long userId = (Long) authentication.getPrincipal();
        GroupInviteCodeJoinResponse response = groupInviteCodeService.joinByCode(userId, request);

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(200, "비공개 모임에 참여했습니다.", response));
    }
}
