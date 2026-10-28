package com.financeapp.finance.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.financeapp.finance.model.Account;
import com.financeapp.finance.model.AccountType;
import com.financeapp.finance.model.User;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByAccountId(Long accountId);

    Optional<Account> findByUserOrAccountType(User user, AccountType accountType);

    Optional<Account> findByUserAndAccountId(User user, Long accountId);

    List<Account> findAllAccountsByUser(User user);

    List<Account> findAllByUser_UserId(Long userId);
}
