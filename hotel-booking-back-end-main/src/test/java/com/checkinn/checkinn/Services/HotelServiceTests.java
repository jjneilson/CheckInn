package com.checkinn.checkinn.Services;

import com.checkinn.checkinn.Entities.Hotel;
import com.checkinn.checkinn.Repositories.HotelRepository;
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
class HotelServiceTests {

    @Mock
    private HotelRepository hotelRepository;

    @InjectMocks
    private HotelService hotelService;

    @Test
    void create_new_hotel_successfully() {
        // Setup
        Hotel newHotel = new Hotel();
        newHotel.setHotelName("Hotel");
        newHotel.setPrice(42.00);
        newHotel.setRooms(4);
        newHotel.setLocation("Earth");
        newHotel.setDescription("Test Hotel");
        newHotel.setImage("https://image.url/");

        // CUT and Assert
        assertDoesNotThrow(() -> hotelService.createHotel(newHotel));
    }

    @Test
    void create_new_hotel_with_bad_input() {
        // Setup
        Hotel newHotel = new Hotel(0, "Hotel", "", 0, "", 0, "");

        // CUT
        try {
            hotelService.createHotel(newHotel);
            fail("Hotel should not be created with any empty inputs (excluding image).");
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
    void edit_hotel_successfully() {
        // Setup
        Hotel originalHotel = new Hotel(1, "John Doe's Hotel", null, 0, null, 0, null);

        Hotel newHotel = new Hotel();
        newHotel.setHotelName("John Dos' Hotel");
        newHotel.setPrice(20.00);
        newHotel.setRooms(2);
        newHotel.setLocation("Mars");
        newHotel.setDescription("John Doe's second hotel");
        newHotel.setImage("https://image.url/");

        // Mock
        when(hotelRepository.findById(1)).thenReturn(Optional.of(originalHotel));

        // CUT
        hotelService.editHotel(1, newHotel);
    }

    @Test
    void edit_hotel_does_not_exist() {

        // Setup
        Hotel newHotel = new Hotel();

        // Mock
        when(hotelRepository.findById(1)).thenReturn(Optional.empty());

        try {
        // CUT
            hotelService.editHotel(1, newHotel);
            fail("Resource... found?");
        }
        catch (ResponseStatusException e) {
        //Assert
            assertEquals(HttpStatus.NOT_FOUND, e.getStatusCode());
        }
        catch (Exception f) {
            fail("Resource... found? Other error returned: " + f.getMessage());
        }

    }
}
