package com.webanmypham.backend.service;

import com.webanmypham.backend.model.Cart;
import com.webanmypham.backend.model.User;
import com.webanmypham.backend.repository.CartRepository;
import com.webanmypham.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserService userService;

    public Cart getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    // Tìm user thực sự từ DB
                    User user = userService.findById(userId)
                            .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

                    // Tạo cart mới nếu chưa có
                    Cart cart = new Cart();
                    cart.setUser(user);
                    return cartRepository.save(cart);
                });
    }

    public Cart saveCart(Cart cart) {
        return cartRepository.save(cart);
    }
}
