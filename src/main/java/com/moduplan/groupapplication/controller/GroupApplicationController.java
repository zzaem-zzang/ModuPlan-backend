package com.moduplan.groupapplication.controller;

import com.moduplan.global.exception.UnauthorizedException;
import com.moduplan.global.response.ApiResponse;
import com.moduplan.groupapplication.dto.GroupApplicationCreateResponse;
import com.moduplan.groupapplication.service.GroupApplicationService;
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
@RequestMapping("/api/groups/{groupId}/applications")
public class GroupApplicationController {

    private final GroupApplicationService groupApplicationService;

    @Operation(summary = "모임 참여 신청")
    @PostMapping
    public ResponseEntity<ApiResponse<GroupApplicationCreateResponse>> apply(
            Authentication authentication,
            @PathVariable Long groupId
    ) {
        if (authentication == null || authentication.getPrincipal() == null) {
            throw new UnauthorizedException("인증되지 않은 사용자입니다.");
        }

        Long userId = (Long) authentication.getPrincipal();
        GroupApplicationCreateResponse response = groupApplicationService.apply(userId, groupId);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(201, "참여 신청이 완료되었습니다.", response));
    }
}
