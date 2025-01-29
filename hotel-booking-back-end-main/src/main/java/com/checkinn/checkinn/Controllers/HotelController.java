package com.checkinn.checkinn.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.checkinn.checkinn.Entities.Hotel;
import com.checkinn.checkinn.Services.AuthService;
import com.checkinn.checkinn.Services.HotelService;
import com.checkinn.checkinn.Constants.GeneralConstants;

@RestController
@RequestMapping("/hotels")
public class HotelController {

    private HotelService hotelService;

    private AuthService authService;
    
    @Autowired
    public HotelController(HotelService hotelService, AuthService authService) {
        this.authService = authService;
        this.hotelService = hotelService;
    }

    /**
     * Retrieves a hotel by its ID.
     *
     * @param hotel_id the ID of the hotel to retrieve
     * @return a ResponseEntity containing the hotel if found, or a NOT_FOUND status if the hotel does not exist
     */
    @GetMapping("/{hotel_id}")
    public ResponseEntity<Hotel> getHotelById(@PathVariable int hotel_id) {
        Hotel hotel = hotelService.getHotelById(hotel_id);
        
        if (hotel == null) { return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); }
        
        return ResponseEntity.ok().body(hotel);
    }

    /**
     * Handles HTTP GET requests to the root URL ("/") and returns a list of all hotels.
     *
     * @return ResponseEntity containing an Iterable of Hotel objects and an HTTP status code of OK.
     */
    @GetMapping("/")
    public ResponseEntity<Iterable<Hotel>> getAllHotels() {
        return ResponseEntity.ok().body(hotelService.getAllHotels());
    }

    /**
     * Retrieves a list of hotels based on the specified location.
     *
     * @param location the location to filter hotels by
     * @return a ResponseEntity containing an Iterable of Hotel objects that match the specified location
     */
    @GetMapping("/location/{location}")
    public ResponseEntity<Iterable<Hotel>> getHotelsByLocation(@PathVariable String location) {
        return ResponseEntity.ok().body(hotelService.getHotelsByLocation(location));
    }

    /**
     * Edits the details of an existing hotel.
     *
     * @param token the authorization token from the request header
     * @param hotel_id the ID of the hotel to be edited
     * @param hotel the hotel object containing updated details
     * @return a ResponseEntity containing a success message
     */
    @PatchMapping("/edit/{hotel_id}")
    public ResponseEntity<Hotel> editHotel(@RequestHeader (GeneralConstants.AUTH_HEADER_NAME) String token, @PathVariable int hotel_id, @RequestBody Hotel hotel) {
        authService.isAdminThrowOtherwise(token);
        return ResponseEntity.ok().body(hotelService.editHotel(hotel_id, hotel));
    }

    /**
     * Endpoint to create a new hotel.
     * 
     * @param token the authorization token from the request header
     * @param hotel the hotel object to be created
     * @return a ResponseEntity containing the result of the hotel creation
     */
    @PostMapping("/create")
    public ResponseEntity<String> createHotel(@RequestHeader (GeneralConstants.AUTH_HEADER_NAME) String token, @RequestBody Hotel hotel) {
        authService.isAdminThrowOtherwise(token);
        return ResponseEntity.ok().body(hotelService.createHotel(hotel));
    }

    /**
     * Deletes a hotel with the specified ID.
     *
     * @param token the authorization token from the request header
     * @param hotel_id the ID of the hotel to be deleted
     * @return a ResponseEntity containing a confirmation message
     */
    @DeleteMapping("/del/{hotel_id}")
    public ResponseEntity<String> deleteHotel(@RequestHeader (GeneralConstants.AUTH_HEADER_NAME) String token, @PathVariable int hotel_id) {
        authService.isAdminThrowOtherwise(token);
        return ResponseEntity.ok().body(hotelService.deleteHotel(hotel_id));
    }

}
