package com.checkinn.checkinn.Services;

import com.checkinn.checkinn.Entities.Role;
import com.checkinn.checkinn.Repositories.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    private RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<Role> getAllRoles() {
        return (List<Role>) roleRepository.findAll();
    }

    public Role findRoleByName(String roleName) {
        return roleRepository.findByRoleName(roleName).orElse(null);
    }
}
