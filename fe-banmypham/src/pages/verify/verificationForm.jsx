import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || "";

    const [token, setToken] = useState("");
    const [message, setMessage] = useState(`Mã xác thực đã được gửi tới email: ${email}`);
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);

    const handleVerify = async () => {
        if (!token.trim()) {
            setMessage("Vui lòng nhập mã xác thực.");
            return;
        }

        setLoading(true);
        setMessage("Đang xác thực...");

        try {
            const response = await fetch("http://localhost:8080/api/users/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
            });

            if (response.ok) {
                setMessage("Xác thực thành công! Bạn sẽ được chuyển tới trang đăng nhập.");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                const data = await response.json();
                setMessage(data.message || "Mã xác thực không đúng hoặc đã hết hạn.");
            }
        } catch (error) {
            setMessage("Lỗi kết nối: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setResendLoading(true);
        setMessage("Đang gửi lại mã xác thực...");

        try {
            const response = await fetch("http://localhost:8080/api/users/resend", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setMessage("Mã xác thực đã được gửi lại vào email của bạn.");
            } else {
                const data = await response.json();
                setMessage(data.message || "Gửi lại mã xác thực thất bại.");
            }
        } catch (error) {
            setMessage("Lỗi kết nối: " + error.message);
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "20px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
            <h2>Xác thực tài khoản</h2>
            <p>{message}</p>
            <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Nhập mã xác thực"
                disabled={loading || resendLoading}
                style={{ width: "100%", padding: 8, marginBottom: 12 }}
            />
            <button onClick={handleVerify} disabled={loading || resendLoading} style={{ padding: "8px 16px", marginRight: 10 }}>
                {loading ? "Đang xử lý..." : "Xác thực"}
            </button>
            <button onClick={handleResend} disabled={loading || resendLoading} style={{ padding: "8px 16px" }}>
                {resendLoading ? "Đang gửi lại..." : "Gửi lại mã"}
            </button>
        </div>
    );
}

export default VerifyPage;
