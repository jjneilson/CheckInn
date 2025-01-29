package com.checkinn.checkinn.Repositories;

import com.checkinn.checkinn.Entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUserId(int userId);
    Optional<List<User>> findByRole_RoleId(int roleId);
}
