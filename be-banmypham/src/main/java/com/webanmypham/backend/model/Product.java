package com.webanmypham.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "description", length = 2000)
    private String description;
    private double price;

    @Column(name = "image_url")
    private String imageUrl;


    @Column(name = "category")
    private String category;

    @Column(name = "instock")
    private int instock;
}
