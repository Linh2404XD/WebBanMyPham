package com.webanmypham.backend.controller;

import com.webanmypham.backend.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create_payment_url")
    public ResponseEntity<Map<String, String>> createPayment(@RequestBody PaymentRequest paymentRequest,
                                                             HttpServletRequest request) {
        try {
            String paymentUrl = paymentService.createPaymentUrl(
                    paymentRequest.getAmount(),
                    paymentRequest.getLanguage(),
                    request);

            Map<String, String> response = new HashMap<>();
            response.put("status", "OK");
            response.put("message", "Payment URL generated successfully.");
            response.put("data", paymentUrl);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("status", "FAILED", "message", e.getMessage()));
        }
    }
}