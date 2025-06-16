package com.webanmypham.backend.repository;

import com.webanmypham.backend.model.User;
import com.webanmypham.backend.model.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    VerificationToken findByToken(String token);

    @Transactional
    void deleteByUser(User user);
}
