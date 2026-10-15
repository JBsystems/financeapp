package com.financeapp.finance.service;

import com.financeapp.finance.exception.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.financeapp.finance.dto.LoginDTO;
import com.financeapp.finance.model.User;
import com.financeapp.finance.repositories.UserRepository;

@Service
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepo;
    private static final Logger LOGGER = LoggerFactory.getLogger(AccountService.class);

    public AuthService(UserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(String firstName, String lastName, String username, String email, String password) {

        if (userRepo.existsByEmail(email)) {
            throw new EmailAlreadyExistsException("Email is already in use");
        }

        if (userRepo.existsByUsername(username)) {
            throw new UsernameAlreadyExistsException("Username is already in use");
        }

        User newUser = new User();
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setPassword(passwordEncoder.encode(password));
        userRepo.save(newUser);

        LOGGER.info("Success new user created: {}", newUser);

        return newUser;
    }

    public User getUserById(long userId) {
        return userRepo.findById(userId).orElseThrow(UserDoesNotExistException::new);
    }

    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email).orElseThrow(EmailDoesNotExistException::new);
    }

    public User loginUser(LoginDTO loginDTO) {
        String username = loginDTO.getUsername();
        String password = loginDTO.getPassword();

        User user = userRepo.findByUsername(username)
                .orElseThrow(InvalidCredentialsException::new);

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new InvalidCredentialsException();
        }

        return user;
    }
}
