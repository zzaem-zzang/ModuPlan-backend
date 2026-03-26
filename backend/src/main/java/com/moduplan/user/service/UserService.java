package com.moduplan.user.service;

import com.moduplan.user.dto.MyInfoResponse;
import com.moduplan.user.dto.UserDetailResponse;
import com.moduplan.user.dto.WithdrawRequest;

public interface UserService {

    MyInfoResponse getMyInfo(Long userId);

    UserDetailResponse getUserDetail(Long userId);

    void withdraw(Long userId, WithdrawRequest request);
}
