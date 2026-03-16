package com.moduplan.auth.controller;

import com.moduplan.auth.dto.LoginRequest;
import com.moduplan.auth.dto.LoginResponse;
import com.moduplan.auth.dto.SignupRequest;
import com.moduplan.auth.dto.SignupResponse;
import com.moduplan.auth.service.AuthService;
import com.moduplan.global.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<SignupResponse>> signup(@Valid @RequestBody SignupRequest request) {
        SignupResponse response = authService.signup(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(201, "회원가입이 완료되었습니다.", response));
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(200, "로그인 성공", response));
    }
}
