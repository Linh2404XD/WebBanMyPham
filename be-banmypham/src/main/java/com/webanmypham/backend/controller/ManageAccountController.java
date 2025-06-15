package com.webanmypham.backend.controller;

import com.webanmypham.backend.dto.UserDTO;
import com.webanmypham.backend.model.Role;
import com.webanmypham.backend.model.User;
import com.webanmypham.backend.repository.UserRepository;
import com.webanmypham.backend.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin(origins = "http://localhost:5173")
public class ManageAccountController {
    private final JwtUtil jwtUtil;

    private final UserRepository userRepository;

    public ManageAccountController(JwtUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    // Lấy toàn bộ user
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Lấy user theo ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Xoá user
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    userRepository.delete(user);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable Long id,
            @RequestBody UserDTO dto,
            @RequestHeader("Authorization") String authHeader) {

        boolean isAdmin = isAdminFromToken(authHeader);

        return userRepository.findById(id)
                .map(user -> {
                    user.setPhoneNumber(dto.getPhoneNumber());
                    user.setFullName(dto.getFullName());
                    user.setUsername(dto.getUsername());
                    user.setAddress(dto.getAddress());

                    if (isAdmin && dto.getRoles() != null && !dto.getRoles().isEmpty()) {
                        user.setRoles(dto.getRoles());
                    }

                    return ResponseEntity.ok(userRepository.save(user));
                })
                .orElse(ResponseEntity.notFound().build());
    }



    private boolean isAdminFromToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return false;
        }

        String token = authHeader.replace("Bearer ", "").trim();

        try {
            String email = jwtUtil.extractEmail(token);
            User user = userRepository.findByEmail(email).orElse(null);
            if (user == null) return false;

            return user.getRoles().stream()
                    .anyMatch(role -> "ROLE_ADMIN".equals(role.getName()));
        } catch (Exception e) {
            System.out.println("Lỗi giải mã token: " + e.getMessage());
            return false;
        }
    }

    @PutMapping("/{id}/roles")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateRoles(@PathVariable Long id, @RequestBody Set<Role> roles) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setRoles(roles);
                    return ResponseEntity.ok(userRepository.save(user));
                })
                .orElse(ResponseEntity.notFound().build());
    }

}
