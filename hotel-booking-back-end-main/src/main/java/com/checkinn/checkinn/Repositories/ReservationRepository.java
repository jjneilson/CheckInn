package com.checkinn.checkinn.Repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.checkinn.checkinn.Entities.Reservation;

public interface ReservationRepository extends CrudRepository<Reservation, Integer> {

    Iterable<Reservation> findByUser_UserId(int userId);

    List<Reservation> findByHotel_HotelId(int hotelId);

    void deleteByHotel_HotelId(int hotel_id);

    void deleteByUser_UserId(int userId);
}
