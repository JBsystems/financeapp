package com.financeapp.finance.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import com.financeapp.finance.exception.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.financeapp.finance.dto.LoginDTO;
import com.financeapp.finance.model.User;
import com.financeapp.finance.repositories.UserRepository;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private UserRepository userRepo;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    private User testUser;
    private LoginDTO loginDTO;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setUserId(1L);
        testUser.setUsername("testuser");
        testUser.setPassword("encodedPassword");

        loginDTO = new LoginDTO();
        loginDTO.setUsername("testuser");
        loginDTO.setPassword("rawPassword");
    }

    @Test
    void getUserById_WhenExists_ReturnUser() {
        when(userRepo.findById(1L)).thenReturn(Optional.of(testUser));

        User result = authService.getUserById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getUserId());
        verify(userRepo).findById(1L);
    }

    @Test
    void getUserById_WhenNotExists_ThrowException() {
        when(userRepo.findById(1L)).thenReturn(Optional.empty());

        assertThrows(UserDoesNotExistException.class, () -> authService.getUserById(1L));
    }

    @Test
    void getUserByEmail_WhenExists_ReturnUser() {
        when(userRepo.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));

        User result = authService.getUserByEmail("test@example.com");

        assertNotNull(result);
        assertEquals("test@example.com", result.getEmail());
    }

    @Test
    void getUserByEmail_WhenNotExists_ThrowException() {
        when(userRepo.findByEmail("unknown@example.com")).thenReturn(Optional.empty());

        assertThrows(EmailDoesNotExistException.class, () -> authService.getUserByEmail("unknown@example.com"));
    }

    @Test
    void createUser_Success() {
        when(userRepo.findByEmail(anyString())).thenReturn(Optional.empty());
        when(userRepo.findByUsername(anyString())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepo.save(any(User.class))).thenReturn(testUser);

        User result = authService.createUser("John", "Doe", "newuser", "new@example.com", "password");

        assertNotNull(result);
        assertEquals("encodedPassword", result.getPassword());
        verify(userRepo).save(any(User.class));
    }

    @Test
    void createUser_EmailExists_ThrowException() {
        when(userRepo.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));

        assertThrows(EmailAlreadyExistsException.class,
                () -> authService.createUser("John", "Doe", "newuser", "test@example.com", "password"));
    }

    @Test
    void createUser_UsernameExists_ThrowException() {
        when(userRepo.findByEmail("new@example.com")).thenReturn(Optional.empty());
        when(userRepo.findByUsername("testuser")).thenReturn(Optional.of(testUser));

        assertThrows(UsernameAlreadyExistsException.class,
                () -> authService.createUser("John", "Doe", "testuser", "new@example.com", "password"));
    }

    @Test
    void loginUser_Success() {
        when(userRepo.findByUsername("testuser")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("rawPassword", "encodedPassword")).thenReturn(true);

        User result = authService.loginUser(loginDTO);

        assertNotNull(result);
        assertEquals("testuser", result.getUsername());
        verify(userRepo).findByUsername("testuser");
        verify(passwordEncoder).matches("rawPassword", "encodedPassword");
    }

    @Test
    void loginUser_UserNotFound_ThrowException() {
        when(userRepo.findByUsername("testuser")).thenReturn(Optional.empty());

        assertThrows(InvalidCredentialsException.class, () -> authService.loginUser(loginDTO));
        verify(userRepo).findByUsername("testuser");
    }

    @Test
    void loginUser_WrongPassword_ThrowException() {
        when(userRepo.findByUsername("testuser")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("rawPassword", "encodedPassword")).thenReturn(false);

        assertThrows(InvalidCredentialsException.class, () -> authService.loginUser(loginDTO));
        verify(userRepo).findByUsername("testuser");
        verify(passwordEncoder).matches("rawPassword", "encodedPassword");
    }
}
