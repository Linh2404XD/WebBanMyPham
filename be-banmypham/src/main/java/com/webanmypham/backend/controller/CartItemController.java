package com.webanmypham.backend.controller;

import com.webanmypham.backend.dto.AddToCartRequest;
import com.webanmypham.backend.dto.CartItemQuantityUpdateDTO;
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

@RestController
@RequestMapping("/api/cart-items")
@CrossOrigin(origins = "*")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private UserService userService;

    @Autowired
    private CartService cartService;

    // Thêm sản phẩm vào giỏ hàng
    @PostMapping("/add")
    public ResponseEntity<CartItem> addToCart(@RequestBody AddToCartRequest request, Authentication authentication) {
        String email = authentication.getName();
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartService.getCartByUserId(user.getId());
        CartItem cartItem = cartItemService.addOrUpdateCartItem(cart, request.getProductId(), request.getQuantity());

        return ResponseEntity.ok(cartItem);
    }

    // Lấy danh sách cart item của người dùng hiện tại
    @GetMapping("/my-cart")
    public ResponseEntity<List<CartItem>> getMyCartItems(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartService.getCartByUserId(user.getId());
        List<CartItem> items = cartItemService.getItemsByCartId(cart.getId());

        return ResponseEntity.ok(items);
    }

    // Cập nhật số lượng sản phẩm
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCartItemQuantity(
            @PathVariable Long id,
            @RequestBody CartItemQuantityUpdateDTO dto,
            Authentication authentication) {

        String email = authentication.getName();
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        CartItem item = cartItemService.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (!item.getCart().getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body("You do not own this cart item");
        }

        CartItem updatedItem = cartItemService.updateQuantity(id, dto.getQuantity());

        return ResponseEntity.ok(updatedItem);
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
