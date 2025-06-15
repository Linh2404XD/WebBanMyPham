package com.webanmypham.backend.dto;

import lombok.Data;

@Data
public class OrderDetailDTO {
    private Long productId;
    private String productName;
    private int quantity;
    private double unitPrice;
}
