package com.webanmypham.backend.controller;

import com.webanmypham.backend.model.Order;
import com.webanmypham.backend.repository.OrderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/orders")
@CrossOrigin(origins = "*")
public class ManageOrderController {

    private final OrderRepository orderRepository;

    public ManageOrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // GET tất cả đơn hàng
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // GET đơn hàng theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return orderRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // PUT cập nhật trạng thái và phương thức thanh toán
    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order updated) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setStatus(updated.getStatus());
                    order.setPaymentMethod(updated.getPaymentMethod());
                    return ResponseEntity.ok(orderRepository.save(order));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE đơn hàng
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        return orderRepository.findById(id)
                .map(order -> {
                    orderRepository.delete(order);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
