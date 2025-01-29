package com.checkinn.checkinn.Controllers;

import com.checkinn.checkinn.DTOs.AdminRegisterDTO;
import com.checkinn.checkinn.DTOs.UserLoginDTO;
import com.checkinn.checkinn.Entities.Role;
import com.checkinn.checkinn.Entities.User;
import com.checkinn.checkinn.Services.AuthService;
import com.checkinn.checkinn.Services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

import static com.checkinn.checkinn.Constants.GeneralConstants.AUTH_HEADER_NAME;


@RestController
@RequestMapping("/auth")
public class AuthController {

    private AuthService authService;
    private RoleService roleService;

    @Autowired
    public AuthController(AuthService authService, RoleService roleService){
        this.authService = authService;
        this.roleService = roleService;
    }

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        System.out.println("Ping pong!");
        return ResponseEntity.ok().body("Pong!");
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        authService.registerUser(user, false);

        return ResponseEntity.ok().body("USER REGISTERED");
    }

    @PostMapping("/admin/register")
    public ResponseEntity<String> registerAdmin(@RequestHeader(AUTH_HEADER_NAME) String token, @RequestBody AdminRegisterDTO userInfo) {
        authService.isAdminThrowOtherwise(token);

        Role role = roleService.findRoleByName(userInfo.getRoleName());
        User user = new User(0, userInfo.getFirstName(), userInfo.getLastName(), userInfo.getEmail(), userInfo.getPassword(), role);

        authService.registerUser(user, true);

        return ResponseEntity.ok().body("USER REGISTERED");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserLoginDTO user) {
        String token = authService.loginUser(user);

        if (token == null) { return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); }

        return ResponseEntity.ok().headers(createHttpAuthHeaders(token)).body("SUCCESSFUL LOGIN");
    }

    private HttpHeaders createHttpAuthHeaders(String token) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(AUTH_HEADER_NAME, token);
        httpHeaders.setAccessControlExposeHeaders(Collections.singletonList(AUTH_HEADER_NAME));
        return httpHeaders;
    }
}
