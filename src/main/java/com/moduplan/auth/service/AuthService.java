package com.moduplan.auth.service;

import com.moduplan.auth.dto.*;
import com.moduplan.auth.jwt.JwtTokenProvider;
import com.moduplan.global.exception.BadRequestException;
import com.moduplan.global.exception.ForbiddenException;
import com.moduplan.global.exception.UnauthorizedException;
import com.moduplan.user.entity.User;
import com.moduplan.user.entity.UserStatus;
import com.moduplan.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    //Redis 추가

    public SignupResponse signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.email())){
            throw new BadRequestException("이미 사용중인 이메일입니다.");
        }
        User user = User.builder()
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .nickname(request.nickname())
                .build();

        User savedUser = userRepository.save(user);

        return new SignupResponse(
                savedUser.getId()
        );
    }

    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request){
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new UnauthorizedException("이메일 또는 비밀번호가 올바르지 않습니다."));

        // 비밀번호 틀림은 -> 인증실패
        if (!passwordEncoder.matches(request.password(), user.getPassword())){
            throw new UnauthorizedException("이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        if (user.getStatus() == UserStatus.INACTIVE) {
            throw new ForbiddenException("비활성화된 계정입니다.");
        }

        String accessToken = jwtTokenProvider.createAccessToken(user.getId(), user.getEmail());
        String refreshToken = jwtTokenProvider.createRefreshToken(user.getId(), user.getEmail());
        return new LoginResponse(
                user.getId(),
                user.getNickname(),
                accessToken,
                refreshToken
        );
    }
    // 토큰 재발급
    @Transactional
    public TokenResponse reissueToken(TokenReissueRequest request){
        String refreshToken = request.refreshToken();

        if (!jwtTokenProvider.validateToken(refreshToken)){
            throw new UnauthorizedException("유효하지 않은 리프레시 토큰입니다.")
        }

        Long userId = jwtTokenProvider.getUserId(refreshToken);
        String email = jwtTokenProvider.getEmail(refreshToken);

        String savedRefreshToken = readisService.getRefrshToken(userId);

        if (savedRefreshToken == null || !savedRefreshToken.equals(refreshToken)){
            throw new UnauthorizedException("리프레시 토큰이 일치하지 않습니다.");
        }

        String newAccessToken = jwtTokenProvider.createAccessToken(userId, email);
        String newRefreshToken = jwtTokenProvider.createRefreshToken(userId, email);


}
