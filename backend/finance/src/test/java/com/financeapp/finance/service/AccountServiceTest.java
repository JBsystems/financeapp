package com.financeapp.finance.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.financeapp.finance.dto.AccountDTO;
import com.financeapp.finance.exception.AccountDoesNotExistException;
import com.financeapp.finance.model.Account;
import com.financeapp.finance.model.AccountType;
import com.financeapp.finance.model.User;
import com.financeapp.finance.repositories.AccountRepository;

@ExtendWith(MockitoExtension.class)
@SuppressWarnings("null")
public class AccountServiceTest {

    @Mock
    private AccountRepository accountRepo;

    @InjectMocks
    private AccountService accountService;

    private User testUser;
    private Account testAccount;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setUserId(1L);
        testUser.setUsername("testuser");

        testAccount = new Account();
        testAccount.setAccountId(1L);
        testAccount.setUser(testUser);
        testAccount.setAccountType(AccountType.CHECKING);
        testAccount.setBalance(new BigDecimal("1000.00"));
    }

    @Test
    void getAccountById_WhenExists_ReturnAccount() {
        when(accountRepo.findByAccountId(1L)).thenReturn(Optional.of(testAccount));

        Account result = accountService.getAccountById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getAccountId());
        verify(accountRepo).findByAccountId(1L);
    }

    @Test
    void getAccountById_WhenNotExists_ThrowException() {
        when(accountRepo.findByAccountId(1L)).thenReturn(Optional.empty());

        assertThrows(AccountDoesNotExistException.class, () -> accountService.getAccountById(1L));
    }

    @Test
    void getAccountByUserAndAccountType_WhenExists_ReturnAccount() {
        when(accountRepo.findByUserOrAccountType(testUser, AccountType.CHECKING)).thenReturn(Optional.of(testAccount));

        Account result = accountService.getAccountByUserAndAccountType(testUser, AccountType.CHECKING);

        assertNotNull(result);
        assertEquals(AccountType.CHECKING, result.getAccountType());
        verify(accountRepo).findByUserOrAccountType(testUser, AccountType.CHECKING);
    }

    @Test
    void getAccountByUserAndAccountType_WhenNotExists_ThrowException() {
        when(accountRepo.findByUserOrAccountType(testUser, AccountType.CHECKING)).thenReturn(Optional.empty());

        assertThrows(AccountDoesNotExistException.class,
                () -> accountService.getAccountByUserAndAccountType(testUser, AccountType.CHECKING));
    }

    @Test
    void getAllAccountsByUser_ReturnList() {
        when(accountRepo.findAllAccountsByUser(testUser)).thenReturn(Arrays.asList(testAccount));

        List<Account> result = accountService.getAllAccountsByUser(testUser);

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(accountRepo).findAllAccountsByUser(testUser);
    }

    @Test
    void createAccount_Success() {
        testAccount.setBalance(new BigDecimal("1250.00"));
        when(accountRepo.save(any(Account.class))).thenReturn(testAccount);

        AccountDTO dto = new AccountDTO();
        dto.setNickname("Test Account");
        Account result = accountService.createAccount(1L, testUser, AccountType.CHECKING, new BigDecimal("1250.00"), dto);

        assertNotNull(result);
        assertEquals(1L, result.getAccountId());
        assertEquals(testUser, result.getUser());
        assertEquals(AccountType.CHECKING, result.getAccountType());
        assertEquals(new BigDecimal("1250.00"), result.getBalance());
        verify(accountRepo).save(any(Account.class));
    }

    @Test
    void validateAccountType_ValidType_NoException() {
        accountService.validateAccountType("CHECKING");
    }

    @Test
    void validateAccountType_InvalidType_ThrowException() {
        assertThrows(AccountDoesNotExistException.class, () -> accountService.validateAccountType("INVALID"));
    }
}
