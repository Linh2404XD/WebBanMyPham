package com.webanmypham.backend.dto;

public class AddToCartRequest {
    private Long productId;
    private int quantity;

    // Getter, Setter
    public Long getProductId() {
        return productId;
    }
    public void setProductId(Long productId) {
        this.productId = productId;
    }
    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
