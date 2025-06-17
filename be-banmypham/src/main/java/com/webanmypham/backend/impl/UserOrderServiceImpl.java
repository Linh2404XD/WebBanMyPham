package com.webanmypham.backend.impl;

import com.webanmypham.backend.model.Order;
import com.webanmypham.backend.model.User;
import com.webanmypham.backend.repository.OrderRepository;
import com.webanmypham.backend.repository.UserOrderRepository;
import com.webanmypham.backend.service.UserOrderService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserOrderServiceImpl implements UserOrderService {

    private final UserOrderRepository userOrderRepository;

    public UserOrderServiceImpl(UserOrderRepository userOrderRepository) {
        this.userOrderRepository = userOrderRepository;
    }

    @Override
    public List<Order> getOrdersByUser(User user) {
        return userOrderRepository.findByUser(user);
    }
}
