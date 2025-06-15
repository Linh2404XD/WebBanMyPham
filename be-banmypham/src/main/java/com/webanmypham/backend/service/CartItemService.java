package com.webanmypham.backend.service;

import com.webanmypham.backend.model.Cart;
import com.webanmypham.backend.model.CartItem;
import com.webanmypham.backend.repository.CartItemRepository;
import com.webanmypham.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository; // cần repo để lấy product theo id

    public List<CartItem> getItemsByCartId(Long cartId) {
        return cartItemRepository.findByCartId(cartId);
    }


    public CartItem save(CartItem item) {
        return cartItemRepository.save(item);
    }

    public void deleteById(Long id) {
        cartItemRepository.deleteById(id);
    }

    public void deleteByCartId(Long cartId) {
        List<CartItem> items = cartItemRepository.findByCartId(cartId);
        cartItemRepository.deleteAll(items);
    }

    public Optional<CartItem> findById(Long id) {
        return cartItemRepository.findById(id);
    }

    public CartItem updateQuantity(Long id, int quantity) {
        return cartItemRepository.findById(id).map(item -> {
            item.setQuantity(quantity);
            return cartItemRepository.save(item);
        }).orElseThrow(() -> new RuntimeException("CartItem not found with id: " + id));
    }
    // Hàm thêm hoặc cập nhật sản phẩm trong giỏ hàng
    public CartItem addOrUpdateCartItem(Cart cart, Long productId, int quantity) {
        return cartItemRepository.findByCartIdAndProductId(cart.getId(), productId)
                .map(item -> {
                    item.setQuantity(item.getQuantity() + quantity);
                    return cartItemRepository.save(item);
                })
                .orElseGet(() -> {
                    CartItem newItem = new CartItem();
                    newItem.setCart(cart);
                    newItem.setProduct(productRepository.findById(productId)
                            .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId)));
                    newItem.setQuantity(quantity);
                    return cartItemRepository.save(newItem);
                });
    }
}
