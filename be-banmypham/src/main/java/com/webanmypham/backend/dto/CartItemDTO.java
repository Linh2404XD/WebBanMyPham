package com.webanmypham.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class CartItemDTO {
    private Long id;
    private int quantity;
    private Long productId;
    private String productName;
    private double productPrice;
    private String productImageUrl;
}