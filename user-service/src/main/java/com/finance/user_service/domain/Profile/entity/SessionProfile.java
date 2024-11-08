package com.finance.user_service.domain.Profile.entity;

import java.io.Serializable;

public class SessionProfile implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long profileId;
    private String email;
    private String name;
    private String role;
}
