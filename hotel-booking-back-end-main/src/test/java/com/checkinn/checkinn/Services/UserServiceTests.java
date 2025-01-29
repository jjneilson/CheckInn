package com.checkinn.checkinn.Services;

import com.checkinn.checkinn.DTOs.UserDetailsDTO;
import com.checkinn.checkinn.Entities.User;
import com.checkinn.checkinn.Repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTests {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    // Placeholder User
    private User TEST_USER = new User(1, "John", "Doe", null, null, null);

    @Test
    void edit_user_successfully() {
        // Setup
        int userId = 1;
        String firstName = "Janet";
        String lastName = "Buck";
        UserDetailsDTO userDetails = new UserDetailsDTO(firstName, lastName);

        when(userRepository.findById(userId)).thenReturn(Optional.of(TEST_USER));

        // CUT and Assert
        assertDoesNotThrow(() -> userService.editUser(userId, userDetails));
    }

    @Test
    void edit_user_with_bad_first_name() {
        // Setup
        int userId = 1;
        String firstName = "";
        String lastName = "Buck";
        UserDetailsDTO userDetails = new UserDetailsDTO(firstName, lastName);

        try {

            // CUT
            userService.editUser(userId, userDetails);
            fail("First name should not be empty");
        }
        catch (ResponseStatusException e) {

            // Assert
            assertEquals(HttpStatus.BAD_REQUEST, e.getStatusCode());
        }
    }

    @Test
    void edit_user_with_bad_last_name() {
        // Setup
        int userId = 1;
        String firstName = "Janet";
        String lastName = "";
        UserDetailsDTO userDetails = new UserDetailsDTO(firstName, lastName);

        try {

        // CUT
            userService.editUser(userId, userDetails);
            fail("Last name should not be empty");
        }
        catch (ResponseStatusException e) {

        // Assert
            assertEquals(HttpStatus.BAD_REQUEST, e.getStatusCode());
        }
    }

}
