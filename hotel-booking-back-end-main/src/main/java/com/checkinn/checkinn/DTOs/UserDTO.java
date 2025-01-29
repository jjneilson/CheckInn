package com.checkinn.checkinn.DTOs;

import com.checkinn.checkinn.Entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDTO {

    private int userId;
    private String firstName;
    private String lastName;
    private String email;
    private String roleName;
    private boolean isAdmin;

    public UserDTO(int userId, String firstName, String lastName, String email, String roleName) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.roleName = roleName;
    }

    public UserDTO(User user) {
        this.userId = user.getUserId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.roleName = user.getRole().getRoleName();
        this.isAdmin = user.getRole().isAdmin();
    }
}
