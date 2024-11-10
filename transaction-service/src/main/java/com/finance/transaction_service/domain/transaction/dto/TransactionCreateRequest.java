package com.finance.transaction_service.domain.transaction.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TransactionCreateRequest {
    private Long profileId;
    private String transactionType;
    private Long amount;
    private String description;
    private LocalDateTime date;
    private List<Long> categoryIds;
}
