package com.webanmypham.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.List;

@Component
public class JwtUtil {

    // Chuỗi secret đủ dài tối thiểu 64 bytes (512 bits)
    private static final String SECRET = "N1qO8KF9sZqpx1Bgw8AzcQvMu4XTCXduYDVHgW5F7mZaeiLvRT0UxQ1sD3wN7jYb";

    private static final long EXPIRATION_TIME = 24 * 60 * 60 * 1000L; // 1 ngày

    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    // Tạo token có thêm roles
    public String generateToken(String email, List<String> roles) {
        return Jwts.builder()
                .setSubject(email)
                .claim("roles", roles)  // thêm roles vào token
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }


    public String extractEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Lấy roles từ token
    public List<String> extractRoles(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.get("roles", List.class);
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            System.err.println("Token hết hạn");
        } catch (UnsupportedJwtException e) {
            System.err.println("Token không được hỗ trợ");
        } catch (MalformedJwtException e) {
            System.err.println("Token không hợp lệ");
        } catch (SignatureException e) {
            System.err.println("Chữ ký không hợp lệ");
        } catch (IllegalArgumentException e) {
            System.err.println("Token rỗng hoặc sai định dạng");
        }
        return false;
    }
}
