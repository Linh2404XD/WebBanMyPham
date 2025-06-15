package com.webanmypham.backend.dto;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderDTO {
    private String userEmail;
    private String paymentMethod;
    private Double totalAmount;
    private String status;
    private List<OrderDetailDTO> orderDetails;
}
