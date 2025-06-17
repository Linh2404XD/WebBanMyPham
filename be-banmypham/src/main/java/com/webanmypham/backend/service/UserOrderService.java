package com.webanmypham.backend.service;

import com.webanmypham.backend.model.Order;
import com.webanmypham.backend.model.User;

import java.util.List;

public interface UserOrderService {
    List<Order> getOrdersByUser(User user);
}
