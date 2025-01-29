package com.checkinn.checkinn.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.checkinn.checkinn.Entities.Review;
import com.checkinn.checkinn.Entities.User;
import com.checkinn.checkinn.Repositories.HotelRepository;
import com.checkinn.checkinn.Repositories.ReviewRepository;

@Service
public class ReviewService {

    private ReviewRepository reviewRepository;

    private HotelRepository hotelRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, HotelRepository hotelRepository) {
        this.reviewRepository = reviewRepository;
        this.hotelRepository = hotelRepository;
    }

    public Iterable<Review> getAllReviews() {
        Iterable<Review> reviews = this.reviewRepository.findAll();
        for (Review r: reviews){
            r.setUser(new User(r.getUser().getUserId(), r.getUser().getFirstName(), r.getUser().getLastName(), r.getUser().getEmail(), "", r.getUser().getRole()));
        }
        return reviews;
    }

    public Iterable<Review> getReviewsByHotelId(int hotelId) {
        Iterable<Review> reviews = this.reviewRepository.findByHotel_HotelId(hotelId);
        for (Review r: reviews){
            r.setUser(new User(r.getUser().getUserId(), r.getUser().getFirstName(), r.getUser().getLastName(), r.getUser().getEmail(), "", r.getUser().getRole()));
        }
        return reviews;
    }

    public Iterable<Review> getReviewsByUserId(int userId) {
        Iterable<Review> reviews = this.reviewRepository.findByUser_UserId(userId);
        for (Review r: reviews){
            r.setUser(new User(r.getUser().getUserId(), r.getUser().getFirstName(), r.getUser().getLastName(), r.getUser().getEmail(), "", r.getUser().getRole()));
        }
        return reviews;   
    }

    public User getUserByReviewId(int reviewId) {
        Review review = reviewRepository.findById(reviewId).orElse(null);
        if (review == null) { return null; }
        return review.getUser();
    }

    public String createReview(User user, Review review) {
        if (!review.getTitle().isBlank() && !review.getDescription().isBlank() && review.getRating()>=1 && review.getRating()<=5 && this.hotelRepository.existsById(review.getHotel().getHotelId())) {
            review.setUser(user);
            reviewRepository.save(review);
            return "REVIEW CREATED";
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "INVALID REVIEW INFORMATION");
    }

    public String deleteReview(int reviewId) {
        reviewRepository.deleteById(reviewId);
        return "REVIEW DELETED";
    }

    public String editReview(int reviewId, Review review) {
        Optional<Review> resp = reviewRepository.findById(reviewId);
        if (resp.isPresent()){
            Review r = resp.get();
            if (review.getDescription().isBlank()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "INVALID REVIEW INFORMATION");
            if (review.getRating()<1 || review.getRating()>5) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "INVALID REVIEW INFORMATION");
            if (review.getTitle().isBlank()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "INVALID REVIEW INFORMATION");
            r.setTitle(review.getTitle());
            r.setDescription(review.getDescription());
            r.setRating(review.getRating());
            reviewRepository.save(r);
            return "REVIEW UPDATED";
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "REVIEW NOT FOUND");
        
    }

}
