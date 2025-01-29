package com.checkinn.checkinn.Controllers;

import com.checkinn.checkinn.Entities.Role;
import com.checkinn.checkinn.Services.AuthService;
import com.checkinn.checkinn.Services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/role")
public class RoleController {

    private AuthService authService;
    private RoleService roleService;

    @Autowired
    public RoleController(AuthService authService, RoleService roleService){
        this.authService = authService;
        this.roleService = roleService;
    }

    @GetMapping("")
    public ResponseEntity<List<Role>> getAllRoles(@RequestHeader("Authorization") String token) {
        authService.isAdminThrowOtherwise(token);
        return ResponseEntity.ok().body(roleService.getAllRoles());
    }
}
