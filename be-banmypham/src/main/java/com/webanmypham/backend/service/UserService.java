package com.webanmypham.backend.service;

import com.webanmypham.backend.model.Role;
import com.webanmypham.backend.model.User;
import com.webanmypham.backend.model.VerificationToken;
import com.webanmypham.backend.repository.RoleRepository;
import com.webanmypham.backend.repository.UserRepository;
import com.webanmypham.backend.repository.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;
    private final VerificationTokenRepository tokenRepository;
    private final EmailService emailService;

    @Value("${app.verification.url:http://localhost:3000/verify}")
    private String verificationUrl;

    public UserService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       PasswordEncoder encoder,
                       VerificationTokenRepository tokenRepository,
                       EmailService emailService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.tokenRepository = tokenRepository;
        this.emailService = emailService;
    }

    // Đăng ký người dùng
    public User register(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email đã tồn tại");
        }

        if (userRepository.existsByPhoneNumber(user.getPhoneNumber())) {
            throw new IllegalArgumentException("Số điện thoại đã tồn tại");
        }

        user.setPassword(encoder.encode(user.getPassword()));
        user.setEnable(false); // tài khoản chưa xác thực

        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Không tìm thấy role ROLE_USER"));
        user.getRoles().add(userRole);

        User savedUser = userRepository.save(user);

        sendVerificationToken(savedUser);

        return savedUser;
    }

        // Gửi mã xác thực qua email
        private void sendVerificationToken(User user) {
        // Xoá token cũ nếu tồn tại
        tokenRepository.deleteByUser(user);

        // Tạo mã 6 ký tự
        String token = UUID.randomUUID().toString().substring(0, 6).toUpperCase();

        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(user);
        verificationToken.setExpiryDate(LocalDateTime.now().plusHours(24));
        tokenRepository.save(verificationToken);

        String subject = "🔐 Xác thực tài khoản của bạn";

        String message = """
                            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px; background-color: #fafafa;">
                             <h2 style="color: #2c3e50;">🔐 Xác thực tài khoản của bạn</h2>
                                   <p>Chào bạn,</p>
                                   <p>Chúng tôi đã nhận được yêu cầu xác thực tài khoản với địa chỉ email <b>%s</b>.</p>
                                   <p style="font-size: 16px; margin-top: 20px;">Mã xác thực của bạn là:</p>
                              <div style="font-size: 26px; font-weight: bold; color: #e74c3c; margin: 10px 0;">%s</div>
                              <hr style="margin: 20px 0;" />
                                    <p style="font-size: 12px; color: gray;">Mã xác thực có hiệu lực trong vòng 24 giờ.</p>
                                    <p style="font-size: 12px; color: gray;">Nếu bạn không đăng ký tài khoản, vui lòng bỏ qua email này.</p>
                                    <p style="font-size: 12px; color: gray;">Cảm ơn bạn!<br/>Đội ngũ Website Mỹ Phẩm Ogani</p>
                            </div>
""".formatted(user.getEmail(), token);

        try {
            emailService.sendVerificationEmail(user.getEmail(), subject, message);
        } catch (Exception e) {
            e.printStackTrace(); // log lỗi
        }
    }

    // Gửi lại mã xác thực
    public boolean resendVerificationEmail(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) return false;

        User user = userOpt.get();
        if (user.isEnable()) return false;

        sendVerificationToken(user);
        return true;
    }

    // Xác thực tài khoản qua token
    public boolean verifyToken(String token) {
        VerificationToken verificationToken = tokenRepository.findByToken(token);
        if (verificationToken == null || verificationToken.isExpired()) {
            return false;
        }

        User user = verificationToken.getUser();
        user.setEnable(true);
        userRepository.save(user);

        tokenRepository.delete(verificationToken);
        return true;
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
}
