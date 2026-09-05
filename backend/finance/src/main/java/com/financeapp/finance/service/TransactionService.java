package com.financeapp.finance.service;

import java.math.BigDecimal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.financeapp.finance.exception.AccountDoesNotExistException;
import com.financeapp.finance.exception.TransactionDoesNotExistException;
import com.financeapp.finance.model.Account;
import com.financeapp.finance.model.Transaction;
import com.financeapp.finance.model.TransactionType;
import com.financeapp.finance.repositories.AccountRepository;
import com.financeapp.finance.repositories.TransactionRepository;
import com.financeapp.finance.dto.TransferDTO;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepo;
    private final AccountRepository accountRepo;
    private static final Logger LOGGER = LoggerFactory.getLogger(TransactionService.class);

    public TransactionService(TransactionRepository transactionRepo, AccountRepository accountRepo) {
        this.transactionRepo = transactionRepo;
        this.accountRepo = accountRepo;
    }

    public Transaction getTransactionByTransactionId(Long transactionId) {
        return transactionRepo.findByTransactionId(transactionId).orElseThrow(TransactionDoesNotExistException::new);
    }

    public Transaction getTransactionType(TransactionType transactionType, BigDecimal dollarAmount,
            Account account, String description) {
        Transaction transaction = new Transaction();

        if (transactionType == null) {
            throw new IllegalArgumentException("Transaction type is not valid");
        }

        transaction.setTransactionType(transactionType);
        transaction.setDescription(description);
        transaction.setAccount(account);
        transaction.setDollarAmount(dollarAmount);

        transactionRepo.save(transaction);

        return transaction;
    }

    // public Transaction transfer(TransferDTO transferDTO) {
    }
}
