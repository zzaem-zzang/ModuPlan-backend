package com.moduplan.auth.service;

public interface RedisService {

    void saveRefreshToken(Long userId, String refreshToken);

    String getRefreshToken(Long userId);

    void deleteRefreshToken(Long userId);
}