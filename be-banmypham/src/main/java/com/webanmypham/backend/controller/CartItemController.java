package com.webanmypham.backend.controller;

import com.webanmypham.backend.dto.AddToCartRequest;
import com.webanmypham.backend.dto.CartItemDTO;
import com.webanmypham.backend.model.Cart;
import com.webanmypham.backend.model.CartItem;
import com.webanmypham.backend.model.User;
import com.webanmypham.backend.service.CartItemService;
import com.webanmypham.backend.service.CartService;
import com.webanmypham.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cart-items")
@CrossOrigin(origins = "*") // Cho phép front-end React gọi API
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;
    @Autowired
    private UserService userService;
    @Autowired
    private CartService cartService;


    // API thêm sản phẩm vào giỏ hàng của user hiện tại
    @PostMapping("/add")
    public ResponseEntity<CartItem> addToCart(@RequestBody AddToCartRequest request, Authentication authentication) {
        String email = authentication.getName();
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartService.getCartByUserId(user.getId());

        CartItem cartItem = cartItemService.addOrUpdateCartItem(cart, request.getProductId(), request.getQuantity());

        return ResponseEntity.ok(cartItem);
    }


    // API lấy danh sách CartItem của user hiện tại
    @GetMapping("/my-cart")
    public ResponseEntity<List<CartItem>> getMyCartItems(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartService.getCartByUserId(user.getId());

        List<CartItem> items = cartItemService.getItemsByCartId(cart.getId());

        return ResponseEntity.ok(items); // không cần DTO
    }

    // Lấy tất cả CartItem theo cartId
    @GetMapping("/cart/{cartId}")
    public List<CartItem> getItemsByCartId(@PathVariable Long cartId) {
        return cartItemService.getItemsByCartId(cartId);
    }

    // Thêm mới sản phẩm vào giỏ hàng
    @PostMapping
    public CartItem addCartItem(@RequestBody CartItem item) {
        return cartItemService.save(item);
    }

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    @PutMapping("/{id}")
    public CartItem updateCartItem(@PathVariable Long id, @RequestBody CartItem updatedItem) {
        return cartItemService.updateCartItem(id, updatedItem);
    }

    // Xóa 1 sản phẩm khỏi giỏ hàng
    @DeleteMapping("/{id}")
    public void deleteCartItem(@PathVariable Long id) {
        cartItemService.deleteById(id);
    }

    // Xóa toàn bộ sản phẩm trong giỏ hàng
    @DeleteMapping("/cart/{cartId}")
    public void deleteAllItemsInCart(@PathVariable Long cartId) {
        cartItemService.deleteByCartId(cartId);
    }
}
