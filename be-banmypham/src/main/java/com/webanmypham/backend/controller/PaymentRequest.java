package com.webanmypham.backend.controller;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter


public class PaymentRequest {
    private Long amount;
    private String language;
}