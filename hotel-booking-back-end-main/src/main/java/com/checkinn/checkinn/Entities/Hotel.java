package com.checkinn.checkinn.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "hotels")
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hotel_id", unique = true)
    private int hotelId;

    @Column(name = "hotel_name")
    private String hotelName;

    @Column(name = "description")
    private String description;

    @Column(name = "rooms")
    private int rooms;

    @Column(name = "location")
    private String location;

    @Column(name = "price")
    private double price;

    @Column(name = "image")
    private String image;
    
}
