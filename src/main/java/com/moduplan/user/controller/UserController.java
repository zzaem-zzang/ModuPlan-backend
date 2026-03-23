package com.moduplan.user.controller;

import com.moduplan.global.exception.UnauthorizedException;
import com.moduplan.global.response.ApiResponse;
import com.moduplan.user.dto.MyInfoResponse;
import com.moduplan.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    @Operation(summary = "내 정보 조회")
    public ResponseEntity<ApiResponse<MyInfoResponse>> getMyInfo(Authentication authentication) {
        if (authentication == null || authentication.getPrincipal() == null) {
            throw new UnauthorizedException("인증되지 않은 사용자입니다.");
        }

        Long userId = (Long) authentication.getPrincipal();
        MyInfoResponse response = userService.getMyInfo(userId);

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(200, "내 정보 조회에 성공했습니다.", response)
        );
    }
}
