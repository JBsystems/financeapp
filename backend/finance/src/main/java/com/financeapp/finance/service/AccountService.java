package com.financeapp.finance.service;

import java.util.List;
import java.math.BigDecimal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.financeapp.finance.dto.AccountDTO;
import com.financeapp.finance.exception.AccountDoesNotExistException;
import com.financeapp.finance.model.Account;
import com.financeapp.finance.model.AccountType;
import com.financeapp.finance.model.User;
import com.financeapp.finance.repositories.AccountRepository;

@Service
public class AccountService {

    private final AccountRepository accountRepo;
    private static final Logger LOGGER = LoggerFactory.getLogger(AccountService.class);

    public AccountService(AccountRepository accountRepo) {
        this.accountRepo = accountRepo;
    }

    public Account getAccountById(Long accountId) {
        return accountRepo.findByAccountId(accountId).orElseThrow(AccountDoesNotExistException::new);
    }

    public Account getAccountByUserAndAccountType(User user, AccountType accountType) {
        return accountRepo.findByUserOrAccountType(user, accountType).orElseThrow(AccountDoesNotExistException::new);
    }

    public List<Account> getAllAccountsByUser(User user) {
        return accountRepo.findAllAccountsByUser(user);
    }

    @org.springframework.transaction.annotation.Transactional
    public Account createAccount(Long accountId, User user, AccountType accountType,
            BigDecimal balance, AccountDTO dto) {
        Account newAccount = new Account();

        newAccount.setAccountId(accountId);
        newAccount.setUser(user);
        newAccount.setAccountType(accountType);
        newAccount.setBalance(balance);
        newAccount.setNickname(dto.getNickname());
        newAccount.setInterestRate(dto.getInterestRate());
        newAccount.setMinimumPayment(dto.getMinimumPayment());
        newAccount.setDueDay(dto.getDueDay());

        Account savedAccount = accountRepo.save(newAccount);

        LOGGER.info("Account {} created successfully", savedAccount.getAccountId());

        return savedAccount;
    }

    public void validateAccountType(String accountTypeString) {
        try {
            AccountType type = AccountType.valueOf(accountTypeString.toUpperCase());
            LOGGER.info("Valid account type: " + type);
        } catch (IllegalArgumentException e) {
            LOGGER.info("Invalid account type: " + accountTypeString);
            throw new AccountDoesNotExistException("This account type is not valid");
        }
    }

    public List<Account> getAllAccountsByUserId(Long userId) {
        return accountRepo.findAllByUser_UserId(userId);
    }

    public void deleteAccount(Long accountId) {
        if (accountId == null) {
            throw new IllegalArgumentException("Account ID cannot be null");
        }
        if (!accountRepo.existsById(accountId)) {
            throw new AccountDoesNotExistException();
        }
        accountRepo.deleteById(accountId);
        LOGGER.info("Account {} deleted successfully", accountId);
    }

    // Updates the specific account the user wants to edit
    @org.springframework.transaction.annotation.Transactional
    public Account editAccount(Long accountId, BigDecimal balance) {
            Account updateAccount = accountRepo.findByAccountId(accountId)
                    .orElseThrow(() -> new AccountDoesNotExistException("Account not found" + accountId));

            updateAccount.setBalance(balance);
            Account updatedAccount = accountRepo.save(updateAccount);
            LOGGER.info("Users account updated");

        return updatedAccount;
    }
}
