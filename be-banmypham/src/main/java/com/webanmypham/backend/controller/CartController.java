package com.webanmypham.backend.controller;

import com.webanmypham.backend.model.Cart;
import com.webanmypham.backend.service.CartService;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/carts")
@CrossOrigin(origins = "*") // Cho phép front-end React gọi API
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/user/{userId}")
    public Cart getCartByUserId(@PathVariable Long userId) {
        return cartService.getCartByUserId(userId);
    }

    @PostMapping
    public Cart createOrUpdateCart(@RequestBody Cart cart) {
        return cartService.saveCart(cart);
    }
}
