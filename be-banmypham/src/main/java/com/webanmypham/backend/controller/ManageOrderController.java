package com.webanmypham.backend.controller;

import com.webanmypham.backend.dto.OrderDTO;
import com.webanmypham.backend.dto.OrderDetailDTO;
import com.webanmypham.backend.model.*;
import com.webanmypham.backend.repository.OrderDetailRepository;
import com.webanmypham.backend.repository.OrderRepository;
import com.webanmypham.backend.repository.ProductRepository;
import com.webanmypham.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import static java.lang.String.valueOf;

@RestController
@RequestMapping("/api/admin/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class ManageOrderController {

    private final UserRepository userRepository;

    private final OrderRepository orderRepository;

    private final OrderDetailRepository orderDetailRepository;

    @Autowired
    private ProductRepository productRepository;

    public ManageOrderController(UserRepository userRepository, OrderRepository orderRepository, OrderDetailRepository orderDetailRepository) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
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

    // PUT cập nhật trạng thái
    @PutMapping("/update-status/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy đơn hàng.");
        }

        Order order = optionalOrder.get();
        order.setStatus(OrderStatus.PENDING.valueOf(request.get("status")));
        orderRepository.save(order);

        return ResponseEntity.ok("Cập nhật trạng thái thành công.");
    }

    // DELETE đơn hàng
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        if (!orderRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy đơn hàng");
        }

        orderRepository.deleteById(id);
        return ResponseEntity.ok("Đơn hàng đã được xoá");
    }

    @PostMapping("/add")
    public ResponseEntity<?> createOrder(@RequestBody OrderDTO orderDTO) {
        Optional<User> optionalUser = userRepository.findByEmail(orderDTO.getUserEmail());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Không tìm thấy người dùng với email: " + orderDTO.getUserEmail());
        }

        User user = optionalUser.get();

        Order order = new Order();
        order.setUser(user);
        order.setPaymentMethod(orderDTO.getPaymentMethod());
        order.setTotalAmount(orderDTO.getTotalAmount());
        order.setStatus(OrderStatus.valueOf(orderDTO.getStatus()));
        order.setOrderDate(LocalDate.now());

        List<OrderDetail> orderDetails = new ArrayList<>();
        if (orderDTO.getOrderDetails() != null) {
            for (OrderDetailDTO detailDTO : orderDTO.getOrderDetails()) {
                OrderDetail detail = new OrderDetail();
                detail.setOrder(order);
                detail.setProductId(detailDTO.getProductId());
                detail.setQuantity(detailDTO.getQuantity());

                // Tìm sản phẩm
                Optional<Product> productOpt = productRepository.findById(detailDTO.getProductId());
                if (productOpt.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body("Không tìm thấy sản phẩm với ID: " + detailDTO.getProductId());
                }

                Product product = productOpt.get();
                detail.setProductName(product.getName());
                detail.setUnitPrice(product.getPrice());

                orderDetails.add(detail);
            }
        }

        order.setOrderDetails(orderDetails);
        Order savedOrder = orderRepository.save(order);

        return ResponseEntity.ok(savedOrder);
    }

    @PutMapping("/update-detail/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateOrderWithDetails(@PathVariable Long id, @RequestBody OrderDTO dto) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isEmpty()) return ResponseEntity.notFound().build();

        Order order = optionalOrder.get();

        // 1. Xoá toàn bộ chi tiết cũ (tránh trùng ID)
        order.getOrderDetails().clear();

        // 2. Duyệt từng chi tiết mới để thêm vào
        for (OrderDetailDTO detailDTO : dto.getOrderDetails()) {
            Optional<Product> productOpt = productRepository.findById(detailDTO.getProductId());
            if (productOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Không tìm thấy sản phẩm với ID: " + detailDTO.getProductId());
            }

            Product product = productOpt.get();

            OrderDetail newDetail = new OrderDetail();
            newDetail.setOrder(order);
            newDetail.setProductId(product.getId());
            newDetail.setProductName(product.getName());
            newDetail.setQuantity(detailDTO.getQuantity());
            newDetail.setUnitPrice(detailDTO.getUnitPrice());

            order.getOrderDetails().add(newDetail);
        }

        // 3. Tính lại tổng tiền
        double totalAmount = order.getOrderDetails().stream()
                .mapToDouble(d -> d.getQuantity() * d.getUnitPrice())
                .sum();
        order.setTotalAmount(totalAmount);

        orderRepository.save(order);
        return ResponseEntity.ok("Cập nhật chi tiết đơn hàng thành công");
    }
}
