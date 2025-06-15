package com.webanmypham.backend.controller;

import com.webanmypham.backend.model.Cart;
import com.webanmypham.backend.model.User;
import com.webanmypham.backend.service.CartService;
import com.webanmypham.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173") // Giới hạn CORS cho an toàn
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<Cart> getCartByLoggedInUser(Authentication authentication) {
        String email = authentication.getName(); // lấy email từ token
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

        Cart cart = cartService.getCartByUserId(user.getId());
        return ResponseEntity.ok(cart);
    }

    @PostMapping
    public ResponseEntity<Cart> updateCart(@RequestBody Cart cart, Authentication authentication) {
        String email = authentication.getName();
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

        cart.setUser(user);
        Cart savedCart = cartService.saveCart(cart);
        return ResponseEntity.ok(savedCart);
    }
}
