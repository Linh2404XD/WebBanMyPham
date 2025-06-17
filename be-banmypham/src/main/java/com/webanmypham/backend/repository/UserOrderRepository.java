package com.webanmypham.backend.repository;

import com.webanmypham.backend.model.Order;
import com.webanmypham.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserOrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}