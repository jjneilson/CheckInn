package com.checkinn.checkinn.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id", unique = true)
    private int roleId;

    @Column(name = "role_name")
    private String roleName;

    @Column(name = "is_admin")
    private boolean isAdmin;
}
