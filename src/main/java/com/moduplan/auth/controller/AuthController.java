package com.moduplan.auth.controller;

import com.moduplan.auth.dto.*;
import com.moduplan.auth.service.AuthService;
import com.moduplan.global.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
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

    @Operation(summary = "회원가입")
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<SignupResponse>> signup(@Valid @RequestBody SignupRequest request) {
        SignupResponse response = authService.signup(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(201, "회원가입이 완료되었습니다.", response));
    }

    @Operation(summary = "로그인")
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(200, "로그인 성공하였습니다", response));
    }

    @Operation(summary = "토큰재발급")
    @PostMapping("/reissue")
    public ResponseEntity<ApiResponse<TokenResponse>> reissue(@RequestBody TokenReissueRequest request) {
        TokenResponse response = authService.reissueToken(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(201, "토큰 재발급 성공하였습니다.", response));
    }

    @Operation(summary = "로그아웃")
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(
            @RequestHeader("Authorization") String authorizationHeader
    ){
        authService.logout(authorizationHeader);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(200, "로그아웃이 완료되었습니다.", null));
    }
}
