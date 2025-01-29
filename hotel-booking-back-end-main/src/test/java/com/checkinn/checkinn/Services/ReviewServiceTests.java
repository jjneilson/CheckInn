package com.checkinn.checkinn.Services;

import com.checkinn.checkinn.Entities.Hotel;
import com.checkinn.checkinn.Entities.Review;
import com.checkinn.checkinn.Entities.User;
import com.checkinn.checkinn.Repositories.HotelRepository;
import com.checkinn.checkinn.Repositories.ReviewRepository;
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
class ReviewServiceTests {

    @Mock
    private HotelRepository hotelRepository;

    @Mock
    private ReviewRepository reviewRepository;

    @InjectMocks
    private ReviewService reviewService;

    // Placeholders
    private User TEST_USER = new User(1, "John", "Doe", null, null, null);
    private Hotel TEST_HOTEL = new Hotel(1, "Hotel", null, 0, null, 0, null);

    @Test
    void create_review_successfully() {
        // Setup
        Review review = new Review();
        review.setUser(TEST_USER);
        review.setTitle("Review Title");
        review.setRating(4);
        review.setDescription("Review Description");
        review.setHotel(TEST_HOTEL);


        // Mock
        when(hotelRepository.existsById(TEST_HOTEL.getHotelId())).thenReturn(true);

        // CUT and Assert
        assertDoesNotThrow(() -> reviewService.createReview(TEST_USER, review));
    }

    @Test
    void create_review_with_bad_input() {
        // Setup
        Review review = new Review();
        review.setUser(TEST_USER);
        review.setTitle("");
        review.setRating(48);
        review.setDescription("");
        review.setHotel(TEST_HOTEL);

        try {
        // CUT
            reviewService.createReview(TEST_USER, review);
        }
        catch (ResponseStatusException e) {
        // Assert
            assertEquals(HttpStatus.BAD_REQUEST, e.getStatusCode());
        }
        catch (Exception f) {
            fail("Something else went wrong: " + f.getMessage());
        }
    }

    @Test
    void edit_review_successfully() {
        // Setup
        Review review = new Review();
        review.setReviewId(2);
        review.setUser(TEST_USER);
        review.setHotel(TEST_HOTEL);
        review.setTitle("Old Title");
        review.setRating(5);
        review.setDescription("Old Description");

        Review newReview = new Review();
        newReview.setReviewId(2);
        newReview.setUser(TEST_USER);
        newReview.setHotel(TEST_HOTEL);
        newReview.setTitle("New Title");
        newReview.setRating(4);
        newReview.setDescription("New Description");

        // Mock
        when(reviewRepository.findById(review.getReviewId())).thenReturn(Optional.of(review));

        // CUT
        reviewService.editReview(review.getReviewId(), newReview);
    }

    @Test
    void edit_review_not_found() {
        // Setup
        int reviewId = 42;
        // Mock
        when(reviewRepository.findById(reviewId)).thenReturn(Optional.empty());

        try {
            // CUT
            reviewService.editReview(reviewId, new Review());
            fail("How did this succeed");
        }
        catch (ResponseStatusException e) {
            // Assert
            assertEquals(HttpStatus.NOT_FOUND, e.getStatusCode());
        }
        catch (Exception f) {
            fail("Something else went wrong: " + f.getMessage());
        }

    }

    @Test
    void edit_review_bad_title() {

        // Setup
        Review review = new Review();
        review.setReviewId(2);
        review.setUser(TEST_USER);
        review.setHotel(TEST_HOTEL);
        review.setTitle("Old Title");
        review.setRating(5);
        review.setDescription("Old Description");

        Review newReview = new Review();
        newReview.setReviewId(2);
        newReview.setUser(TEST_USER);
        newReview.setHotel(TEST_HOTEL);
        newReview.setTitle("");
        newReview.setRating(4);
        newReview.setDescription("New Description");

        // Mock
        when(reviewRepository.findById(review.getReviewId())).thenReturn(Optional.of(review));

        try {
            // CUT
            reviewService.editReview(review.getReviewId(), newReview);
            fail("How did this succeed");
        }
        catch (ResponseStatusException e) {
            // Assert
            assertEquals(HttpStatus.BAD_REQUEST, e.getStatusCode());
        }
        catch (Exception f) {
            fail("Something else went wrong: " + f.getMessage());
        }
    }

    @Test
    void edit_review_bad_description() {

        // Setup
        Review review = new Review();
        review.setReviewId(2);
        review.setUser(TEST_USER);
        review.setHotel(TEST_HOTEL);
        review.setTitle("Old Title");
        review.setRating(5);
        review.setDescription("Old Description");

        Review newReview = new Review();
        newReview.setReviewId(2);
        newReview.setUser(TEST_USER);
        newReview.setHotel(TEST_HOTEL);
        newReview.setTitle("New Title");
        newReview.setRating(4);
        newReview.setDescription("");

        // Mock
        when(reviewRepository.findById(review.getReviewId())).thenReturn(Optional.of(review));

        try {
            // CUT
            reviewService.editReview(review.getReviewId(), newReview);
            fail("How did this succeed");
        }
        catch (ResponseStatusException e) {
            // Assert
            assertEquals(HttpStatus.BAD_REQUEST, e.getStatusCode());
        }
        catch (Exception f) {
            fail("Something else went wrong: " + f.getMessage());
        }

    }

    @Test
    void edit_review_bad_rating_but_like_invalid_input_rather_than_not_dissatisfactory() {

        // Setup
        Review review = new Review();
        review.setReviewId(2);
        review.setUser(TEST_USER);
        review.setHotel(TEST_HOTEL);
        review.setTitle("Old Title");
        review.setRating(5);
        review.setDescription("Old Description");

        Review newReview = new Review();
        newReview.setReviewId(2);
        newReview.setUser(TEST_USER);
        newReview.setHotel(TEST_HOTEL);
        newReview.setTitle("New Title");
        newReview.setRating(6);
        newReview.setDescription("New Description");

        // Mock
        when(reviewRepository.findById(review.getReviewId())).thenReturn(Optional.of(review));

        try {
            // CUT
            reviewService.editReview(review.getReviewId(), newReview);
            fail("How did this succeed");
        }
        catch (ResponseStatusException e) {
            // Assert
            assertEquals(HttpStatus.BAD_REQUEST, e.getStatusCode());
        }
        catch (Exception f) {
            fail("Something else went wrong: " + f.getMessage());
        }
    }
}
