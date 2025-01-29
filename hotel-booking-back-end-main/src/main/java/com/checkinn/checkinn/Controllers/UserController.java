package com.checkinn.checkinn.Controllers;

import com.checkinn.checkinn.DTOs.PasswordDTO;
import com.checkinn.checkinn.DTOs.UserDTO;
import com.checkinn.checkinn.DTOs.UserDetailsDTO;
import com.checkinn.checkinn.Services.AuthService;
import com.checkinn.checkinn.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.checkinn.checkinn.Constants.GeneralConstants.AUTH_HEADER_NAME;

@RestController
@RequestMapping("/users")
public class UserController {

    private AuthService authService;
    private UserService userService;

    @Autowired
    public UserController(UserService userService, AuthService authService){
        this.userService = userService;
        this.authService = authService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getMyInfo(@RequestHeader(AUTH_HEADER_NAME) String token) {
        int userId = authService.decodeToken(token);
        return ResponseEntity.ok().body(new UserDTO(userService.getUserById(userId)));
    }

    @GetMapping("")
    public ResponseEntity<List<UserDTO>> getAllUsers(@RequestHeader(AUTH_HEADER_NAME) String token) {
        authService.isAdminThrowOtherwise(token);
        return ResponseEntity.ok().body(userService.getAllUsers()
                .stream()
                .map(UserDTO :: new)
                .toList());
    }

    @GetMapping("/{user_id}")
    public ResponseEntity<UserDTO> getUserById(@RequestHeader(AUTH_HEADER_NAME) String token, @PathVariable int user_id) {
        authService.isAdminThrowOtherwise(token);
        return ResponseEntity.ok().body(new UserDTO(userService.getUserById(user_id)));
    }

    @PatchMapping("/edit")
    public ResponseEntity<String> updateUser(@RequestHeader(AUTH_HEADER_NAME) String token, @RequestBody UserDetailsDTO userInfo) {
        int userId = authService.decodeToken(token);
        userService.editUser(userId, userInfo);
        return ResponseEntity.ok().body("USER UPDATED");
    }

    @PatchMapping("/edit/password")
    public ResponseEntity<String> updateUserPassword(@RequestHeader(AUTH_HEADER_NAME) String token, @RequestBody PasswordDTO passwordInfo) {
        int userId = authService.decodeToken(token);

        authService.editUserPassword(userId, passwordInfo);
        return ResponseEntity.ok().body("USER UPDATED");
    }

    @DeleteMapping("/del")
    public ResponseEntity<String> deleteUser(@RequestHeader(AUTH_HEADER_NAME) String token) {
        int userId = authService.decodeToken(token);
        userService.deleteUser(userId);
        return ResponseEntity.ok().body("USER DELETED");
    }

    @DeleteMapping("/del/{user_id}")
    public ResponseEntity<String> deleteOtherUser(@RequestHeader(AUTH_HEADER_NAME) String token, @PathVariable int user_id) {
        authService.isAdminThrowOtherwise(token);
        userService.deleteUser(user_id);
        return ResponseEntity.ok().body("USER DELETED");
    }
}
