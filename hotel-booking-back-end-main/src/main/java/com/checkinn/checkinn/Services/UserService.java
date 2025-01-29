package com.checkinn.checkinn.Services;

import com.checkinn.checkinn.DTOs.UserDetailsDTO;
import com.checkinn.checkinn.Entities.User;
import com.checkinn.checkinn.Repositories.ReservationRepository;
import com.checkinn.checkinn.Repositories.ReviewRepository;
import com.checkinn.checkinn.Repositories.UserRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserService {

    private UserRepository userRepository;

    private ReviewRepository reviewRepository;

    private ReservationRepository reservationRepository;

    @Autowired
    public UserService(UserRepository userRepository, ReviewRepository reviewRepository, ReservationRepository reservationRepository) {
        this.userRepository = userRepository;
        this.reviewRepository = reviewRepository;
        this.reservationRepository = reservationRepository;
    }

    public User getUserById(int userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();
    }

    /**
     * Updates the first and last name of an existing user.
     *
     * @param userId ID corresponding with user to update
     * @param userDetailsDTO DTO containing new user data
     */
    public void editUser(int userId, UserDetailsDTO userDetailsDTO) {

        if (userDetailsDTO.getFirstName().isBlank()) { throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "FIRST NAME CANNOT BE BLANK"); }
        if (userDetailsDTO.getLastName().isBlank()) { throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "LAST NAME CANNOT BE BLANK"); }

        User user = userRepository.findById(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
        user.setFirstName(userDetailsDTO.getFirstName());
        user.setLastName(userDetailsDTO.getLastName());
        userRepository.save(user);
    }

    @Transactional
    public void deleteUser(int userId) {
        this.reservationRepository.deleteByUser_UserId(userId);
        this.reviewRepository.deleteByUser_UserId(userId);
        userRepository.deleteById(userId);
    }
}
