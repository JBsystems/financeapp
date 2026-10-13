package com.financeapp.finance.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.financeapp.finance.exception.EmailAlreadyExistsException;
import com.financeapp.finance.exception.UsernameAlreadyExistsException;
import com.financeapp.finance.exception.EmailDoesNotExistException;
import com.financeapp.finance.exception.UserDoesNotExistException;
import com.financeapp.finance.exception.InvalidCredentialsException;
import com.financeapp.finance.model.User;
import com.financeapp.finance.repositories.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    public UserService(UserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public User getUserById(long userId) {
        return userRepo.findById(userId).orElseThrow(UserDoesNotExistException::new);
    }

    public User getUserByUsername(String username) {
        return userRepo.findByUsername(username).orElseThrow(UserDoesNotExistException::new);
    }

    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email).orElseThrow(EmailDoesNotExistException::new);
    }

    public User createUser(String firstName, String lastName, String username, String email, String password) {

        if (userRepo.findByEmail(email).isPresent()) {
            throw new EmailAlreadyExistsException("This Email already exists");
        }

        if (userRepo.findByUsername(username).isPresent()) {
            throw new UsernameAlreadyExistsException("This Username already exists");
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

    public User setPassword(String username, String password) {
        User user = userRepo.findByUsername(username).orElseThrow(UserDoesNotExistException::new);

        String encodedPassword = passwordEncoder.encode(password);

        user.setPassword(encodedPassword);

        return userRepo.save(user);
    }

    public User validatePassword(String username, String password) {
        User user = userRepo.findByUsername(username).orElseThrow(UserDoesNotExistException::new);

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new InvalidCredentialsException("Invalid password");
        }

        return user;
    }

}
