package com.finance.transaction_service.domain.transaction.api;

import com.finance.transaction_service.domain.transaction.dto.TransactionCreateRequest;
import com.finance.transaction_service.domain.transaction.dto.TransactionListResponse;
import com.finance.transaction_service.domain.transaction.dto.TransactionResponse;
import com.finance.transaction_service.domain.transaction.dto.TransactionUpdateRequest;
import com.finance.transaction_service.domain.transaction.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transaction_service/transactions")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @PostMapping
    public ResponseEntity<TransactionResponse> createTransaction(
            @RequestBody TransactionCreateRequest request
    ) {
        return ResponseEntity.ok(transactionService.createTransaction(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionResponse> getTransaction(@PathVariable Long id) {
        return ResponseEntity.ok(transactionService.getTransaction(id));
    }

    @GetMapping("/profile/{profileId}")
    public ResponseEntity<TransactionListResponse> getTransactionsByProfileId(
            @PathVariable Long profileId
    ) {
        return ResponseEntity.ok(transactionService.getTransactionsByProfileId(profileId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransactionResponse> updateTransaction(
            @PathVariable Long id,
            @RequestBody TransactionUpdateRequest request
    ) {
        return ResponseEntity.ok(transactionService.updateTransaction(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
        return ResponseEntity.ok().build();
    }
}