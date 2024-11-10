package com.finance.transaction_service.domain;

import lombok.Getter;

import java.io.Serial;
import java.io.Serializable;

@Getter
public class SessionProfile implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private Long profileId;
    private String email;
    private String name;
    private String role;
}
