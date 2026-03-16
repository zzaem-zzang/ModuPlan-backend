package com.moduplan.auth.service;

import com.moduplan.global.exception.BadRequestException;
import com.moduplan.auth.dto.SignupRequest;
import com.moduplan.auth.dto.SignupResponse;
import com.moduplan.user.entity.User;
import com.moduplan.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final UserRepository userRepository;

    public SignupResponse signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.email())){
            throw new BadRequestException("이미 사용중인 이메일입니다.");
        }
        User user = User.builder()
                .email(request.email())
                .password(request.password())
                .nickname(request.nickname())
                .build();

        User savedUser = userRepository.save(user);

        return new SignupResponse(
                savedUser.getId(),
                "회원기입이 완료되었습니다."
        );
    }
}
