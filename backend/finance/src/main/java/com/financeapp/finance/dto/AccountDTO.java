package com.financeapp.finance.dto;

import java.math.BigDecimal;

import com.financeapp.finance.model.AccountType;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AccountDTO {
    private Long accountId;
    private Long userId;
    private BigDecimal balance;
    @NotNull(message = "Account Type is required")
    private AccountType accountType;
    private String nickname;
    private BigDecimal interestRate;
    private BigDecimal minimumPayment;
    private Integer dueDay;
}
