package com.moduplan.user.controller;

import com.moduplan.global.exception.UnauthorizedException;
import com.moduplan.global.response.ApiResponse;
import com.moduplan.user.dto.MyInfoResponse;
import com.moduplan.user.dto.UserDetailResponse;
import com.moduplan.user.dto.WithdrawRequest;
import com.moduplan.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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

    @Operation(summary = "회원 탈퇴")
    @DeleteMapping("/me")
    public ResponseEntity<ApiResponse<Void>> withdraw(
            Authentication authentication,
            @RequestBody WithdrawRequest request
    ) {
        if (authentication == null || authentication.getPrincipal() == null) {
            throw new UnauthorizedException("인증되지 않은 사용자입니다.");
        }

        Long userId = (Long) authentication.getPrincipal();
        userService.withdraw(userId, request);

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(200, "회원 탈퇴가 완료되었습니다.", null));
    }

    @Operation(summary = "회원 상세 조회")
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserDetailResponse>> getUserDetail(
            Authentication authentication,
            @PathVariable Long userId
    ) {
        if (authentication == null || authentication.getPrincipal() == null) {
            throw new UnauthorizedException("인증되지 않은 사용자입니다.");
        }

        UserDetailResponse response = userService.getUserDetail(userId);

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(200, "회원 상세 조회에 성공했습니다.", response));
    }
}
