package com.checkinn.checkinn.Services;

import com.checkinn.checkinn.Entities.Hotel;
import com.checkinn.checkinn.Entities.Reservation;
import com.checkinn.checkinn.Entities.User;
import com.checkinn.checkinn.Repositories.HotelRepository;
import com.checkinn.checkinn.Repositories.ReservationRepository;
import com.checkinn.checkinn.Repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

import static org.assertj.core.api.Fail.fail;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ReservationServiceTests {

    @Mock
    private ReservationRepository reservationRepository;

    @Mock
    private HotelRepository hotelRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ReservationService reservationService;

    // Placeholders
    private User TEST_USER = new User(1, "John", "Doe", "johndoe@mail.to", "Password123", null);
    private Hotel TEST_HOTEL = new Hotel(2, "Hotel", "Hotel description here!", 1, "Earth", 1.99, "https://url.link/");

    @Test
    void create_reservation_successfully() {
        // Setup
        Reservation reservation = new Reservation();
        reservation.setCheckInTime(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)); // 24 hours from now
        reservation.setCheckOutTime(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 72)); // 72 hours from now

        // Mock
        when(userRepository.findById(TEST_USER.getUserId())).thenReturn(Optional.of(TEST_USER));
        when(hotelRepository.existsById(TEST_HOTEL.getHotelId())).thenReturn(true);
        when(hotelRepository.findById(TEST_HOTEL.getHotelId())).thenReturn(Optional.of(TEST_HOTEL));

        // CUT and Assert
        assertDoesNotThrow(() -> {
            reservationService.createReservation(TEST_USER.getUserId(), TEST_HOTEL.getHotelId(), reservation);
        });
    }

    @Test
    void create_reservation_bad_times_not_vibes_but_actual_time() {
        // Setup
        Reservation reservation = new Reservation();
        reservation.setCheckInTime(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 48)); // 48 hours from now
        reservation.setCheckOutTime(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 47)); // 47 hours from now

        // Mock
        when(hotelRepository.existsById(TEST_HOTEL.getHotelId())).thenReturn(true);

        try {
        // CUT
            reservationService.createReservation(TEST_USER.getUserId(), TEST_HOTEL.getHotelId(), reservation);
            fail("Time validation failed");
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
    void create_reservation_not_enough_rooms() {
        // Setup
        Reservation reservation = new Reservation();
        reservation.setCheckInTime(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)); // 24 hours from now
        reservation.setCheckOutTime(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 72)); // 72 hours from now

        ArrayList<Reservation> activeReservations = new ArrayList<>(); // Two reservations active
        activeReservations.add(new Reservation());
        activeReservations.add(new Reservation());

        // Mock
        when(hotelRepository.existsById(TEST_HOTEL.getHotelId())).thenReturn(true);
        when(hotelRepository.findById(TEST_HOTEL.getHotelId())).thenReturn(Optional.of(TEST_HOTEL));
        when(reservationRepository.findByHotel_HotelId(TEST_HOTEL.getHotelId())).thenReturn(activeReservations);

        // CUT and Assert
        try {
            reservationService.createReservation(TEST_USER.getUserId(), TEST_HOTEL.getHotelId(), reservation);
            fail("Room check failed");
        }
        catch (ResponseStatusException e) {
            assertEquals(HttpStatus.BAD_REQUEST, e.getStatusCode());
        }
        catch (Exception f) {
            fail("Something else went wrong: " + f.getMessage());
        }

    }

    @Test
    void edit_reservation_successfully() {
        // Setup
        Reservation oldReservation = new Reservation();
        oldReservation.setReservationId(2);
        oldReservation.setHotel(TEST_HOTEL);
        oldReservation.setUser(TEST_USER);
        oldReservation.setCheckInTime(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)); // 24 hours from now
        oldReservation.setCheckOutTime(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 72)); // 72 hours from now

        Reservation newReservation = new Reservation();
        newReservation.setCheckInTime(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 48)); // 48 hours from now
        newReservation.setCheckOutTime(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 96)); // 96 hours from now

        // Mock
        when(reservationRepository.findById(oldReservation.getReservationId())).thenReturn(Optional.of(oldReservation));

        // CUT and Assert
        assertDoesNotThrow(() -> {
            reservationService.editReservation(oldReservation.getReservationId(), newReservation);
        });
    }

    @Test
    void edit_reservation_bad_times_not_vibes_but_actual_time() {
        // Setup
        Reservation oldReservation = new Reservation();
        oldReservation.setReservationId(2);
        oldReservation.setHotel(TEST_HOTEL);
        oldReservation.setUser(TEST_USER);
        oldReservation.setCheckInTime(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)); // 24 hours from now
        oldReservation.setCheckOutTime(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 72)); // 72 hours from now

        Reservation newReservation = new Reservation();
        newReservation.setCheckInTime(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 48)); // 48 hours from now
        newReservation.setCheckOutTime(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 47)); // 47 hours from now

        // Mock
        when(reservationRepository.findById(oldReservation.getReservationId())).thenReturn(Optional.of(oldReservation));

        try {
        // CUT
            reservationService.editReservation(oldReservation.getReservationId(), newReservation);
            fail("Time validation failed");
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
