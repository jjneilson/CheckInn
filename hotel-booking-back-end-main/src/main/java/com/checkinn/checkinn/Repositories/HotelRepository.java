package com.checkinn.checkinn.Repositories;

import org.springframework.data.repository.CrudRepository;

import com.checkinn.checkinn.Entities.Hotel;

public interface HotelRepository extends CrudRepository<Hotel, Integer>{

    Iterable<Hotel> findByLocation(String location);
}
