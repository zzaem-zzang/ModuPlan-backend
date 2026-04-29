package com.moduplan.auth.oauth;

import com.moduplan.auth.jwt.JwtTokenProvider;
import com.moduplan.auth.service.RedisService;
import com.moduplan.user.entity.User;
import com.moduplan.user.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Objects;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private static final String PROVIDER_KAKAO = "KAKAO";
    private static final String FRONTEND_CALLBACK_URL = "http://localhost:5173/oauth/callback";

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisService redisService;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String providerId = Objects.toString(oAuth2User.getAttribute("id"), null);
        Map<String, Object> properties = oAuth2User.getAttribute("properties");
        Map<String, Object> kakaoAccount = oAuth2User.getAttribute("kakao_account");

        String nickname = getString(properties, "nickname", "카카오사용자");
        String email = getString(kakaoAccount, "email", "kakao_" + providerId + "@kakao.local");

        try {
            User user = userRepository.findByProviderAndProviderId(PROVIDER_KAKAO, providerId)
                    .or(() -> userRepository.findByEmail(email))
                    .orElseGet(() -> userRepository.save(
                            User.oauthUser(email, nickname, PROVIDER_KAKAO, providerId)
                    ));

            String accessToken = jwtTokenProvider.createAccessToken(user.getId(), user.getEmail());
            String refreshToken = jwtTokenProvider.createRefreshToken(user.getId(), user.getEmail());

            redisService.saveRefreshToken(user.getId(), refreshToken);

            String redirectUrl = UriComponentsBuilder.fromUriString(FRONTEND_CALLBACK_URL)
                    .queryParam("userId", user.getId())
                    .queryParam("nickname", user.getNickname())
                    .queryParam("accessToken", accessToken)
                    .queryParam("refreshToken", refreshToken)
                    .build()
                    .encode(StandardCharsets.UTF_8)
                    .toUriString();

            getRedirectStrategy().sendRedirect(request, response, redirectUrl);
        } catch (Exception e) {
            log.error("Kakao OAuth login failed. providerId={}, email={}, attributes={}", providerId, email, oAuth2User.getAttributes(), e);
            throw e;
        }
    }

    private String getString(Map<String, Object> attributes, String key, String fallback) {
        if (attributes == null || attributes.get(key) == null) {
            return fallback;
        }

        return String.valueOf(attributes.get(key));
    }
}
