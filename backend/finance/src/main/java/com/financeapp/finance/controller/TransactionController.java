package com.financeapp.finance.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.financeapp.finance.model.Transaction;
import com.financeapp.finance.service.TransactionService;
import com.financeapp.finance.dto.TransferDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import com.financeapp.finance.dto.TransactionDTO;

@RestController
@RequestMapping("/api/v1/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("/transaction/{transactionId}")
    public Transaction getTransactionByTransactionId(@PathVariable Long transactionId) {
        return transactionService.getTransactionByTransactionId(transactionId);
    }

    private TransactionDTO mapToDTO(Transaction transaction) {
        TransactionDTO dto = new TransactionDTO();
        dto.setTransactionId(transaction.getTransactionId());
        dto.setUserId(transaction.getUser().getUserId());
        dto.setDollarAmount(transaction.getDollarAmount());
        dto.setDescription(transaction.getDescription());
        dto.setAccountId(transaction.getAccount().getAccountId());
        dto.setTransactionType(transaction.getTransactionType());
        dto.setTransactionDate(transaction.getTransactionDate());
        return dto;
    }

}
