import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// Hàm kiểm tra token còn hợp lệ
function isValidToken(token) {
    try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 > Date.now();
    } catch {
        return false;
    }
}

export const AuthProvider = ({ children }) => {
    const savedToken = localStorage.getItem("token");
    const [token, setToken] = useState(isValidToken(savedToken) ? savedToken : null);
    const [sessionExpired, setSessionExpired] = useState(false);

    // Xử lý token hết hạn
    useEffect(() => {
        if (token) {
            let decoded;
            try {
                decoded = jwtDecode(token);
            } catch {
                setSessionExpired(true);
                return;
            }

            const exp = decoded.exp * 1000;
            const now = Date.now();
            const timeout = exp - now;

            if (timeout <= 0) {
                setSessionExpired(true);
                return;
            }

            const timer = setTimeout(() => {
                setSessionExpired(true);
            }, timeout);

            return () => clearTimeout(timer);
        }
    }, [token]);

    // Idle timeout 10s (nếu đã đăng nhập)
    useEffect(() => {
        if (!token) return;

        let idleTimer;
        const resetIdleTimer = () => {
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                setSessionExpired(true);
            }, 10000); // 10 giây không thao tác
        };

        window.addEventListener("mousemove", resetIdleTimer);
        window.addEventListener("keydown", resetIdleTimer);
        window.addEventListener("scroll", resetIdleTimer);
        window.addEventListener("click", resetIdleTimer);

        resetIdleTimer();

        return () => {
            clearTimeout(idleTimer);
            window.removeEventListener("mousemove", resetIdleTimer);
            window.removeEventListener("keydown", resetIdleTimer);
            window.removeEventListener("scroll", resetIdleTimer);
            window.removeEventListener("click", resetIdleTimer);
        };
    }, [token]);

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem("token", newToken);
        setSessionExpired(false);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
        setSessionExpired(false);
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, sessionExpired, setSessionExpired }}>
            {children}
        </AuthContext.Provider>
    );
};
