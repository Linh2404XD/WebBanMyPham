package com.webanmypham.backend.service;

import com.webanmypham.backend.dto.OrderDTO;
import com.webanmypham.backend.dto.OrderDetailDTO;
import com.webanmypham.backend.model.*;
import com.webanmypham.backend.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Transactional
    public Order createOrder(OrderDTO dto) {
        // 1. Tìm user theo email
        User user = userRepository.findByEmail(dto.getUserEmail())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với email: " + dto.getUserEmail()));

        // 2. Tạo đơn hàng mới
        Order order = new Order();
        order.setUser(user);
        order.setPaymentMethod(dto.getPaymentMethod());
        order.setStatus(OrderStatus.valueOf(dto.getStatus()));
        order.setTotalAmount(dto.getTotalAmount());
        order.setNotes(dto.getNotes());
        order.setOrderDate(LocalDate.from(LocalDateTime.now()));


        order = orderRepository.save(order); // Lưu trước để có ID

        List<OrderDetail> orderDetails = new ArrayList<>();

        // 3. Duyệt từng sản phẩm trong đơn hàng
        for (OrderDetailDTO detailDTO : dto.getOrderDetails()) {
            Product product = productRepository.findById(detailDTO.getProductId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm ID: " + detailDTO.getProductId()));

            int currentStock = product.getInstock();
            int quantityToOrder = detailDTO.getQuantity();

            if (currentStock < quantityToOrder) {
                throw new RuntimeException("Sản phẩm '" + product.getName() + "' không đủ hàng tồn.");
            }

            // Trừ tồn kho
            product.setInstock(currentStock - quantityToOrder);
            productRepository.save(product);

            // Tạo chi tiết đơn hàng
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setOrder(order);
            orderDetail.setProductId(product.getId());
            orderDetail.setProductName(product.getName());
            orderDetail.setQuantity(quantityToOrder);
            orderDetail.setUnitPrice(detailDTO.getUnitPrice());

            orderDetails.add(orderDetail);
        }

        // 4. Lưu chi tiết đơn hàng
        orderDetailRepository.saveAll(orderDetails);

        // 5. Xoá giỏ hàng sau khi đặt hàng
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng"));
        List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getId());
        cartItemRepository.deleteAll(cartItems);

        // 6. Trả về kết quả
        order.setOrderDetails(orderDetails);
        return order;
    }

}


