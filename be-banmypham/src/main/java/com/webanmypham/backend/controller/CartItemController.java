package com.webanmypham.backend.controller;

import com.webanmypham.backend.model.CartItem;
import com.webanmypham.backend.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart-items")
@CrossOrigin(origins = "*") // Cho phép front-end React gọi API
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

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
