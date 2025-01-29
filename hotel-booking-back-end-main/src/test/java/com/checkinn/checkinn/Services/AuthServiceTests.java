package com.checkinn.checkinn.Services;

import com.checkinn.checkinn.DTOs.UserLoginDTO;
import com.checkinn.checkinn.Entities.Role;
import com.checkinn.checkinn.Entities.User;
import com.checkinn.checkinn.Repositories.RoleRepository;
import com.checkinn.checkinn.Repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mindrot.jbcrypt.BCrypt;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.lang.reflect.Field;
import java.util.Optional;

import static com.checkinn.checkinn.Constants.GeneralConstants.DEFAULT_ROLE_NAME;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTests {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @InjectMocks
    private AuthService authService;

    // Placeholder Role
    private Role TEST_ROLE = new Role(0, "Test", false);

    @BeforeEach
    public void setup() throws Exception {
        Field secretKeyField = AuthService.class.getDeclaredField("secretKey");
        secretKeyField.setAccessible(true);
        secretKeyField.set(authService, "a8e12d554532b45404543fc5041aaebd9244ccdbfa5de1990a628743136e82b7");
    }

    @Test
    void register_user_successfully() {
        // Setup
        User user = new User();
        user.setEmail("testuer@mail.com");
        user.setPassword("Password123");
        user.setFirstName("Test");
        user.setLastName("User");

        // Mock
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.empty());
        when(roleRepository.findByRoleName(DEFAULT_ROLE_NAME)).thenReturn(Optional.of(TEST_ROLE));

        // CUT... and Assert, in this case
        assertDoesNotThrow(() -> authService.registerUser(user, false));

    }

    @Test
    void register_user_with_existing_email() {
        // Setup
        String email = "testuer@mail.com";
        String password = "Password123";
        String firstName = "Test";
        String lastName = "User";

        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        user.setFirstName(firstName);
        user.setLastName(lastName);

        // Mock
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

        try {

        // CUT
            authService.registerUser(user, false);

        // Asserts
            fail("User should not be able to register with an existing email");
        } catch (ResponseStatusException e) {
            assertEquals(HttpStatus.CONFLICT, e.getStatusCode());
        }
    }

    @Test
    void login_user_successfully() {
        // Setup
        String email = "testuer@mail.com";
        String password = "Password123";

        UserLoginDTO userLogin = new UserLoginDTO();
        userLogin.setEmail(email);
        userLogin.setPassword(password);

        User existingUser = new User();
        existingUser.setEmail(email);
        existingUser.setRole(TEST_ROLE);
        existingUser.setPassword(BCrypt.hashpw(password, BCrypt.gensalt()));

        // Mock
        when(userRepository.findByEmail(userLogin.getEmail())).thenReturn(Optional.of(existingUser));

        try {
            // CUT
            // Not doing anything to check the token, contents are contents
            authService.loginUser(userLogin);

        } catch (ResponseStatusException e) {

        // Assert
            fail("User should be able to login successfully");
        }
    }

    @Test
    void login_user_with_non_existing_email() {
        // Setup
        String email = "testuer@mail.com";
        String password = "Password123";

        UserLoginDTO userLogin = new UserLoginDTO();
        userLogin.setEmail("Wrong Email");
        userLogin.setPassword(password);

        User existingUser = new User();
        existingUser.setEmail(email);
        existingUser.setPassword(password);

        // Mock
        when(userRepository.findByEmail(userLogin.getEmail())).thenReturn(Optional.empty());

        try {
            // CUT
            authService.loginUser(userLogin);

            fail("User should not be able to login with an invalid email");

        } catch (ResponseStatusException e) {

            // Assert
            assertEquals(HttpStatus.UNAUTHORIZED, e.getStatusCode());
        }
    }

    @Test
    void login_user_with_wrong_password() {
        // Setup
        String email = "testuer@mail.com";
        String password = "Password123";

        UserLoginDTO userLogin = new UserLoginDTO();
        userLogin.setEmail(email);
        userLogin.setPassword("Wrong Password");

        User existingUser = new User();
        existingUser.setEmail(email);
        existingUser.setPassword(BCrypt.hashpw(password, BCrypt.gensalt()));

        // Mock
        when(userRepository.findByEmail(userLogin.getEmail())).thenReturn(Optional.of(existingUser));

        try {
            // CUT
            authService.loginUser(userLogin);

            fail("User should not be able to login with an invalid password");

        } catch (ResponseStatusException e) {

            // Assert
            assertEquals(HttpStatus.UNAUTHORIZED, e.getStatusCode());
        }
    }

}
