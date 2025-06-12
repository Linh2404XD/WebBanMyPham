import {jwtDecode} from "jwt-decode";  // sửa đúng import
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [sessionExpired, setSessionExpired] = useState(false);

    // Kiểm tra token hết hạn dựa trên exp trong token
    useEffect(() => {
        if (token) {
            let decoded;
            try {
                decoded = jwtDecode(token);
            } catch {
                setSessionExpired(true);
                return;
            }
            const exp = decoded.exp * 1000; // chuyển sang ms
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

    // idle timeout: tự động logout khi không hoạt động 10s
    useEffect(() => {
        let idleTimer;
        const resetIdleTimer = () => {
            if (idleTimer) clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                setSessionExpired(true);
            }, 10000); // 10 giây idle timeout
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
    }, []);

    const login = (token) => {
        setToken(token);
        localStorage.setItem("token", token);
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
