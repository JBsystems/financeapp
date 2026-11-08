package com.financeapp.finance.controller;

import java.util.List;

import com.financeapp.finance.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.financeapp.finance.dto.AccountDTO;
import com.financeapp.finance.model.Account;
import com.financeapp.finance.model.User;
import com.financeapp.finance.service.AccountService;

import jakarta.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/api/v1/accounts")
public class AccountController {

    private final AccountService accountService;
    private final AuthService authService;

    public AccountController(AccountService accountService, AuthService authService) {
        this.accountService = accountService;
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<AccountDTO> createAccount(@Valid @RequestBody AccountDTO accountDTO) {
        User user = authService.getUserById(accountDTO.getUserId());

        Account createdAccount = accountService.createAccount(
                accountDTO.getAccountId(),
                user,
                accountDTO.getAccountType(),
                accountDTO.getBalance(),
                accountDTO);

        return new ResponseEntity<>(mapToDTO(createdAccount), HttpStatus.CREATED);
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<AccountDTO> getAccount(@PathVariable Long accountId) {
        if (accountId == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            try {
                Account account = accountService.getAccountById(accountId);
                return ResponseEntity.ok(mapToDTO(account));
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AccountDTO>> getAllAccountsByUser(@PathVariable Long userId) {
        List<Account> accounts = accountService.getAllAccountsByUserId(userId);
        return ResponseEntity.ok(accounts.stream().map(this::mapToDTO).toList());
    }

    @DeleteMapping("/{accountId}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Long accountId) {
        accountService.deleteAccount(accountId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/user/{userId}/{accountId}")
    public ResponseEntity<AccountDTO> editAccount(@PathVariable Long accountId, @Valid @RequestBody AccountDTO accountDTO) {
        User user = authService.getUserById(accountDTO.getUserId());

        try {
            Account updatedAccount = accountService.editAccount(accountDTO.getBalance(), user, accountId);
            log.info("Users account updated");
            return ResponseEntity.ok(mapToDTO(updatedAccount));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    private AccountDTO mapToDTO(Account account) {
        AccountDTO dto = new AccountDTO();
        dto.setAccountId(account.getAccountId());
        dto.setUserId(account.getUser().getUserId());
        dto.setBalance(account.getBalance());
        dto.setAccountType(account.getAccountType());
        dto.setNickname(account.getNickname());
        dto.setInterestRate(account.getInterestRate());
        dto.setMinimumPayment(account.getMinimumPayment());
        dto.setDueDay(account.getDueDay());
        return dto;
    }
}
