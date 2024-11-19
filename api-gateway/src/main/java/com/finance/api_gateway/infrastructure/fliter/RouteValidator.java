package com.finance.api_gateway.infrastructure.fliter;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RouteValidator {

    public static final List<String> openApiEndpoints = List.of(
            "/api/v1/auth/login",
            "/api/v1/auth/register"
    );

    public boolean isSecured(ServerHttpRequest request) {
        return openApiEndpoints.stream()
                .noneMatch(uri -> request.getURI().getPath().contains(uri));
    }
}
