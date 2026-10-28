package com.financeapp.finance.controller;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.financeapp.finance.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.financeapp.finance.dto.AccountDTO;
import com.financeapp.finance.model.Account;
import com.financeapp.finance.model.User;
import com.financeapp.finance.service.AccountService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/accounts")
public class AccountController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AccountController.class);
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

    @PatchMapping("/{userId}/{accountId}")
    public ResponseEntity<AccountDTO> editAccount(@PathVariable("userId") User user, Long accountId, @Valid @RequestBody AccountDTO accountDTO) {
        Account updatedAccount = accountService.editAccount(user, accountId, accountDTO.getBalance());
        LOGGER.info("Users account not updated");

        return new ResponseEntity<>(mapToDTO(updatedAccount), HttpStatus.OK);
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
