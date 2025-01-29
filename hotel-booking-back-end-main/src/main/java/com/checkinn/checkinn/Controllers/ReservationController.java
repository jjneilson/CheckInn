package com.checkinn.checkinn.Controllers;

import com.checkinn.checkinn.Entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

import com.checkinn.checkinn.Constants.GeneralConstants;
import com.checkinn.checkinn.Entities.Reservation;
import com.checkinn.checkinn.Services.AuthService;
import com.checkinn.checkinn.Services.ReservationService;

@Controller
@RequestMapping("/reservations")
public class ReservationController {

    private ReservationService reservationService;

    private AuthService authService;

    @Autowired
    public ReservationController(ReservationService reservationService, AuthService authService) {
        this.reservationService = reservationService;
        this.authService = authService;
    }
    
    @GetMapping("/")
    public ResponseEntity<Iterable<Reservation>> getAllReservations(@RequestHeader (GeneralConstants.AUTH_HEADER_NAME) String token) {
        this.authService.isAdminThrowOtherwise(token);
        return ResponseEntity.ok().body(this.reservationService.getAllReservations());
    }

    @GetMapping("/{reservationId}")
    public ResponseEntity<Reservation> getReservationById(@RequestHeader (GeneralConstants.AUTH_HEADER_NAME) String token, @PathVariable int reservationId) {
        int userId = this.reservationService.getUserByReservationId(reservationId).getUserId();
        this.authService.tokenMatchesUserThrowOtherwise(token, userId);
        return ResponseEntity.ok().body(this.reservationService.getReservationById(reservationId));
    }

    @GetMapping("/user")
    public ResponseEntity<Iterable<Reservation>> getReservationsBySelf(@RequestHeader (GeneralConstants.AUTH_HEADER_NAME) String token) {
        return ResponseEntity.ok().body(this.reservationService.getReservationsByUserId(this.authService.decodeToken(token)));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Iterable<Reservation>> getReservationsByUserId(@RequestHeader (GeneralConstants.AUTH_HEADER_NAME) String token, @PathVariable int userId) {
        this.authService.isAdminThrowOtherwise(token);
        return ResponseEntity.ok().body(this.reservationService.getReservationsByUserId(userId));
    }

    @GetMapping("/hotel/{hotelId}")
    public ResponseEntity<Iterable<Reservation>> getReservationsByHotelId(@RequestHeader (GeneralConstants.AUTH_HEADER_NAME) String token, @PathVariable int hotelId) {
        this.authService.isAdminThrowOtherwise(token);
        return ResponseEntity.ok().body(this.reservationService.getReservationsByHotelId(hotelId));
    }

    @PatchMapping("/edit/{reservationId}")
    public ResponseEntity<String> editReservation(@RequestHeader (GeneralConstants.AUTH_HEADER_NAME) String token, @PathVariable int reservationId, @RequestBody Reservation reservation) {
        User user = reservationService.getUserByReservationId(reservationId);
        authService.tokenMatchesUserThrowOtherwise(token, user != null ? user.getUserId() : -1);
        return ResponseEntity.ok().body(reservationService.editReservation(reservationId, reservation));
    }

    @PostMapping("/create/{hotelId}")
    public ResponseEntity<String> createReservation(@RequestHeader (GeneralConstants.AUTH_HEADER_NAME) String token, @PathVariable int hotelId, @RequestBody Reservation reservation) {
        int userId = this.authService.decodeToken(token);
        return ResponseEntity.ok().body(this.reservationService.createReservation(userId, hotelId, reservation));
    }

    @DeleteMapping("/del/{reservationId}")
    public ResponseEntity<String> deleteReservation(@RequestHeader (GeneralConstants.AUTH_HEADER_NAME) String token, @PathVariable int reservationId) {
        User user = reservationService.getUserByReservationId(reservationId);
        authService.tokenMatchesUserThrowOtherwise(token, user != null ? user.getUserId() : -1);
        return ResponseEntity.ok().body(this.reservationService.deleteReservation(reservationId));
    }
}
