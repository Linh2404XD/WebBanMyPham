package com.webanmypham.backend.controller;

import com.webanmypham.backend.dto.AuthRequest;
import com.webanmypham.backend.dto.AuthResponse;
import com.webanmypham.backend.dto.UserDTO;
import com.webanmypham.backend.model.User;
import com.webanmypham.backend.security.JwtUtil;
import com.webanmypham.backend.service.UserService;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService, AuthenticationManager authManager, JwtUtil jwtUtil) {
        this.userService = userService;
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
    }

    // DTO để nhận dữ liệu đăng ký
    public static class RegisterRequest {
        public String email;
        public String phoneNumber;
        public String password;
    }

    // DTO nhận token verify
    public static class VerifyRequest {
        public String token;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        try {
            User user = new User();
            user.setEmail(request.email.trim().toLowerCase()); // chuẩn hóa email
            user.setPhoneNumber(request.phoneNumber);
            user.setPassword(request.password);

            userService.register(user);

            return ResponseEntity.ok().body(Map.of("message", "Đăng ký thành công, vui lòng kiểm tra email để xác thực"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Lỗi hệ thống"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User user = userService.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

            if (!user.isEnable()) {
                // Trả về thông báo chưa kích hoạt
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Tài khoản chưa kích hoạt", "enable", false));
            }

            List<String> roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .toList();

            String token = jwtUtil.generateToken(user.getEmail(), roles);

            return ResponseEntity.ok(Map.of("token", token, "enable", true));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Email hoặc mật khẩu sai"));
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bạn chưa đăng nhập");
        }

        String email = authentication.getName();

        User user = userService.findByEmail(email).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy người dùng");
        }

        UserDTO userDTO = new UserDTO(user);
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody VerifyRequest request) {
        boolean verified = userService.verifyToken(request.token);
        if (verified) {
            return ResponseEntity.ok(Map.of("message", "Xác thực thành công"));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Mã xác thực không đúng hoặc đã hết hạn"));
        }
    }


    @PostMapping("/resend")
    public ResponseEntity<?> resendVerification(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        boolean result = userService.resendVerificationEmail(email);

        if (result) {
            return ResponseEntity.ok(Map.of("message", "Mã xác thực đã được gửi lại email"));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Không thể gửi lại mã. Tài khoản đã xác thực hoặc không tồn tại"));
        }
    }


}
