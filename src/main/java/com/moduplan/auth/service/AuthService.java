package com.moduplan.auth.service;

import com.moduplan.auth.dto.LoginRequest;
import com.moduplan.auth.dto.LoginResponse;
import com.moduplan.global.exception.BadRequestException;
import com.moduplan.auth.dto.SignupRequest;
import com.moduplan.auth.dto.SignupResponse;
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

        if (!passwordEncoder.matches(request.password(), user.getPassword())){
            throw new BadRequestException("이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        if (user.getStatus() == UserStatus.INACTIVE) {
            throw new ForbiddenException("비활성화된 계정입니다.");
        }

        return new LoginResponse(
                user.getId(),
                user.getNickname()
        );
    }
}
