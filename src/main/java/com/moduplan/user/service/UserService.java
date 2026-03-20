package com.moduplan.user.service;

import com.moduplan.global.exception.NotFoundException;
import com.moduplan.user.dto.MyInfoResponse;
import com.moduplan.user.entity.User;
import com.moduplan.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

    public MyInfoResponse getMyInfo(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("존재하지 않는 사용자입니다."));

        return new MyInfoResponse(
                user.getId(),
                user.getEmail(),
                user.getNickname(),
                user.getCreatedAt()
        );
    }
}
