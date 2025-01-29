package com.checkinn.checkinn.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.checkinn.checkinn.Entities.Review;
import com.checkinn.checkinn.Entities.User;
import com.checkinn.checkinn.Services.AuthService;
import com.checkinn.checkinn.Services.ReviewService;
import com.checkinn.checkinn.Services.UserService;
import com.checkinn.checkinn.Constants.GeneralConstants;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    private AuthService authService;

    private ReviewService reviewService;

    private UserService userService;

    @Autowired
    public ReviewController(ReviewService reviewService, AuthService authService, UserService userService) {
        this.reviewService = reviewService;
        this.authService = authService;
        this.userService = userService;
    }

    @GetMapping("/")
    public ResponseEntity<Iterable<Review>> getAllReviews() {
        return ResponseEntity.ok().body(this.reviewService.getAllReviews());
    }

    @GetMapping("/hotel/{hotelId}")
    public ResponseEntity<Iterable<Review>> getReviewsByHotelId(@PathVariable int hotelId) {
        return ResponseEntity.ok().body(this.reviewService.getReviewsByHotelId(hotelId));
    }

    @GetMapping("/user/")
    public ResponseEntity<Iterable<Review>> getReviewsBySelf(@RequestHeader (GeneralConstants.AUTH_HEADER_NAME) String token) {
        int userId = this.authService.decodeToken(token);
        return ResponseEntity.ok().body(this.reviewService.getReviewsByUserId(userId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Iterable<Review>> getReviewsByUserId(@PathVariable int userId) {
        return ResponseEntity.ok().body(this.reviewService.getReviewsByUserId(userId));
    }

    @PatchMapping("/edit/{reviewId}")
    public ResponseEntity<String> editReview(@RequestHeader (GeneralConstants.AUTH_HEADER_NAME) String token, @PathVariable int reviewId, @RequestBody Review review) {
        User user = reviewService.getUserByReviewId(reviewId);
        authService.tokenMatchesUserThrowOtherwise(token, user != null ? user.getUserId() : -1);
        return ResponseEntity.ok().body(reviewService.editReview(reviewId, review));
    }

    @PostMapping("/create")
    public ResponseEntity<String> createReview(@RequestHeader (GeneralConstants.AUTH_HEADER_NAME) String token, @RequestBody Review review) {
        User user_resp = this.userService.getUserById(this.authService.decodeToken(token));
        String resp = this.reviewService.createReview(user_resp, review);
        return ResponseEntity.ok().body(resp);
    }

    @DeleteMapping("/del/{reviewId}")
    public ResponseEntity<String> deleteReview(@RequestHeader (GeneralConstants.AUTH_HEADER_NAME) String token, @PathVariable int reviewId) {
        User user = reviewService.getUserByReviewId(reviewId);
        authService.tokenMatchesUserThrowOtherwise(token, user != null ? user.getUserId() : -1);
        return ResponseEntity.ok().body(reviewService.deleteReview(reviewId));
    }

}
