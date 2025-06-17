package com.webanmypham.backend.controller;

import com.webanmypham.backend.dto.OrderDTO;
import com.webanmypham.backend.model.Order;
import com.webanmypham.backend.service.OrderService;
import com.webanmypham.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public ResponseEntity<?> createOrder(@RequestBody OrderDTO orderDTO) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();

            if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bạn chưa đăng nhập");
            }

            String email = auth.getName();
            orderDTO.setUserEmail(email);

            Order order = orderService.createOrder(orderDTO);
            return ResponseEntity.ok(order);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi khi tạo đơn hàng: " + e.getMessage());
        }
    }
}
