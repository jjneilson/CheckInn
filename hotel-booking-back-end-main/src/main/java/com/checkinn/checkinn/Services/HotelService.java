package com.checkinn.checkinn.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.checkinn.checkinn.Entities.Hotel;
import com.checkinn.checkinn.Repositories.HotelRepository;
import com.checkinn.checkinn.Repositories.ReservationRepository;
import com.checkinn.checkinn.Repositories.ReviewRepository;

import jakarta.transaction.Transactional;

@Service
public class HotelService {

    private HotelRepository hotelRepository;

    private ReviewRepository reviewRepository;

    private ReservationRepository reservationRepository;

    @Autowired
    public HotelService(HotelRepository hotelRepository, ReviewRepository reviewRepository, ReservationRepository reservationRepository) {
        this.hotelRepository = hotelRepository;
        this.reviewRepository = reviewRepository;
        this.reservationRepository = reservationRepository;
    }

    public Hotel getHotelById(int hotel_id) { return hotelRepository.findById(hotel_id).orElse(null); }

    public Iterable<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    public Iterable<Hotel> getHotelsByLocation(String location) {
        return hotelRepository.findByLocation(location);
    }

    public Hotel editHotel(int hotel_id, Hotel hotel) {
        Optional<Hotel> resp = hotelRepository.findById(hotel_id);
        if (resp.isPresent()) {
            Hotel hotelToUpdate = resp.get();
            hotelToUpdate.setHotelName(hotel.getHotelName());
            hotelToUpdate.setDescription(hotel.getDescription());
            hotelToUpdate.setRooms(hotel.getRooms());
            hotelToUpdate.setLocation(hotel.getLocation());
            hotelToUpdate.setPrice(hotel.getPrice());
            hotelToUpdate.setImage(hotel.getImage());
            return hotelRepository.save(hotelToUpdate);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "HOTEL NOT FOUND");
    }

    public String createHotel(Hotel hotel) {
        if (hotel.getDescription().length()>0 && hotel.getHotelName().length()>0 && hotel.getLocation().length()>0 && hotel.getPrice()>0 && hotel.getRooms()>0) {
            hotelRepository.save(hotel);
            return "HOTEL CREATED";
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "INVALID HOTEL INFORMATION");
        
    }

    @Transactional
    public String deleteHotel(int hotel_id) {
        reviewRepository.deleteByHotel_HotelId(hotel_id);
        reservationRepository.deleteByHotel_HotelId(hotel_id);
        hotelRepository.deleteById(hotel_id);
        return "HOTEL DELETED";
    }
}
