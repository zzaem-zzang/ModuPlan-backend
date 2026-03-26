package com.moduplan.auth.service;

import com.moduplan.auth.dto.LoginRequest;
import com.moduplan.auth.dto.LoginResponse;
import com.moduplan.auth.dto.SignupRequest;
import com.moduplan.auth.dto.SignupResponse;
import com.moduplan.auth.dto.TokenReissueRequest;
import com.moduplan.auth.dto.TokenResponse;

public interface AuthService {

    SignupResponse signup(SignupRequest request);

    LoginResponse login(LoginRequest request);

    TokenResponse reissueToken(TokenReissueRequest request);

    void logout(String authorizationHeader);
}
