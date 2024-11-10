package com.finance.transaction_service.infrastructure.common;


import com.finance.transaction_service.domain.SessionProfile;
import com.finance.transaction_service.infrastructure.common.exceptions.BusinessException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
public class SessionInterceptor implements HandlerInterceptor {
    private final RedisTemplate<String, SessionProfile> sessionRedisTemplate;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String sessionId = request.getHeader("SESSION-ID");
        if (sessionId == null) {
            throw new BusinessException("세션이 없습니다.");
        }

        SessionProfile profile = sessionRedisTemplate.opsForValue().get("session:" + sessionId);
        if (profile == null) {
            throw new BusinessException("유효하지 않은 세션입니다.");
        }

        request.setAttribute("SESSION_PROFILE", profile);
        return true;
    }
}
