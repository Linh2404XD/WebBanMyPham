import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { toast } from "react-toastify";

export default function Login() {
    const [type, setType] = useState("signIn");
    const [signInData, setSignInData] = useState({ email: "", password: "" });
    const [signUpData, setSignUpData] = useState({ email: "", phone: "", password: "", confirmPassword: "" });

    const [signInErrors, setSignInErrors] = useState({});
    const [signUpErrors, setSignUpErrors] = useState({});

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const navigate = useNavigate();

    // ===================== VALIDATE ===========================
    const validateSignInField = (field, value) => {
        const newErrors = { ...signInErrors };

        switch (field) {
            case "email":
                if (!value.trim()) newErrors.email = "Bạn không thể để trống dữ liệu này";
                else if (!validateEmail(value)) newErrors.email = "Email không hợp lệ!";
                else newErrors.email = "";
                break;

            case "password":
                if (!value.trim()) newErrors.password = "Bạn không thể để trống dữ liệu này";
                else if (value.length < 8) newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự.";
                else newErrors.password = "";
                break;

            default:
                break;
        }
        setSignInErrors(newErrors);
    };

    const validateSignUpField = (field, value) => {
        const newErrors = { ...signUpErrors };

        switch (field) {
            case "email":
                if (!value.trim()) newErrors.email = "Bạn không thể để trống dữ liệu này";
                else if (!validateEmail(value)) newErrors.email = "Email không hợp lệ!";
                else newErrors.email = "";
                break;

            case "phone":
                if (!value.trim()) newErrors.phone = "Bạn không thể để trống dữ liệu này";
                else if (!value.startsWith("0")) newErrors.phone = "SĐT phải bắt đầu bằng số 0";
                else if (value.length !== 10) newErrors.phone = "SĐT phải có đủ 10 số";
                else newErrors.phone = "";
                break;

            case "password":
                if (!value.trim()) newErrors.password = "Bạn không thể để trống dữ liệu này";
                else if (value.length < 8) newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự.";
                else newErrors.password = "";
                break;

            case "confirmPassword":
                if (!value.trim()) newErrors.confirmPassword = "Bạn không thể để trống dữ liệu này";
                else if (value !== signUpData.password) newErrors.confirmPassword = "Mật khẩu không trùng khớp!";
                else newErrors.confirmPassword = "";
                break;

            default:
                break;
        }

        setSignUpErrors(newErrors);
    };

    const validateSignIn = () => {
        const errors = {};
        let valid = true;

        if (!signInData.email.trim()) {
            errors.email = "Bạn không thể để trống dữ liệu này";
            valid = false;
        } else if (!validateEmail(signInData.email)) {
            errors.email = "Email không hợp lệ";
            valid = false;
        }

        if (!signInData.password.trim()) {
            errors.password = "Bạn không thể để trống dữ liệu này";
            valid = false;
        } else if (signInData.password.length < 8) {
            errors.password = "Mật khẩu phải có ít nhất 8 ký tự.";
            valid = false;
        }

        setSignInErrors(errors);
        return valid;
    };

    const validateSignUp = () => {
        const errors = {};
        let valid = true;

        if (!signUpData.email.trim()) {
            errors.email = "Bạn không thể để trống dữ liệu này";
            valid = false;
        } else if (!validateEmail(signUpData.email)) {
            errors.email = "Email không hợp lệ!";
            valid = false;
        }

        if (!signUpData.phone.trim()) {
            errors.phone = "Bạn không thể để trống dữ liệu này";
            valid = false;
        } else if (!signUpData.phone.startsWith("0")) {
            errors.phone = "SĐT phải bắt đầu bằng số 0";
            valid = false;
        } else if (signUpData.phone.length !== 10) {
            errors.phone = "SĐT phải có đủ 10 số";
            valid = false;
        }

        if (!signUpData.password.trim()) {
            errors.password = "Bạn không thể để trống dữ liệu này";
            valid = false;
        } else if (signUpData.password.length < 8) {
            errors.password = "Mật khẩu phải có ít nhất 8 ký tự.";
            valid = false;
        }

        if (!signUpData.confirmPassword.trim()) {
            errors.confirmPassword = "Bạn không thể để trống dữ liệu này";
            valid = false;
        } else if (signUpData.confirmPassword !== signUpData.password) {
            errors.confirmPassword = "Mật khẩu không trùng khớp!";
            valid = false;
        }

        setSignUpErrors(errors);
        return valid;
    };

    // =============== PARSE JSON SAFE ====================
    async function parseResponse(response) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return response.json();
        }
        return response.text();
    }

    // ====================== SIGN IN ======================
    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        if (!validateSignIn()) return;


        try {
            const response = await fetch("http://localhost:8080/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signInData),
            });

            const data = await parseResponse(response);

            if (response.ok) {
                localStorage.setItem("token", data.token);

                toast.success("Đăng nhập thành công!", {
                    autoClose: 900,
                    onClose: () => navigate("/home"),
                });

            } else if (response.status === 403 && data.enable === false) {
                toast.warning("Tài khoản chưa kích hoạt. Đang gửi lại mã...");

                await fetch("http://localhost:8080/api/users/resend", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: signInData.email }),
                });

                toast.info("Mã xác thực đã được gửi!");

                setTimeout(() => {
                    navigate("/verify-form", { state: { email: signInData.email } });
                }, 1500);

            } else {
                toast.error(data.message || "Đăng nhập thất bại");
            }
        } catch (err) {
            toast.error("Lỗi kết nối: " + err.message);
        }
    };

    // ====================== SIGN UP ======================
    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        if (!validateSignUp()) return;


        try {
            const response = await fetch("http://localhost:8080/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: signUpData.email,
                    phoneNumber: signUpData.phone,
                    password: signUpData.password,
                }),
            });

            const data = await parseResponse(response);

            if (response.ok) {
                toast.success("Đăng ký thành công! Kiểm tra email để lấy mã xác thực");

                setTimeout(() => {
                    navigate("/verify-form", { state: { email: signUpData.email } });
                }, 1500);
            } else {
                toast.error(data.message || data || "Đăng ký thất bại");
            }
        } catch (err) {
            toast.error("Lỗi kết nối: " + err.message);
        }
    };

    // ======================= UI ==========================
    const handleOnClick = (text) => {
        if (text !== type) {
            setType(text);
            setSignInErrors({});
            setSignUpErrors({});
            setSignInData({ email: "", password: "" });
            setSignUpData({ email: "", phone: "", password: "", confirmPassword: "" });
        }
    };

    const containerClass = `${styles.container} ${type === "signUp" ? styles.rightPanelActive : ""}`;

    return (
        <div className={styles.loginApp}>
            <div className={containerClass}>
                {/* SIGN UP */}
                <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
                    <form onSubmit={handleSignUpSubmit} noValidate>
                        <h1>Đăng ký</h1>

                        {signUpErrors.email && <p className={styles.error}>{signUpErrors.email}</p>}
                        <input
                            type="email"
                            placeholder="Email"
                            value={signUpData.email}
                            onChange={(e) => {
                                setSignUpData({ ...signUpData, email: e.target.value });
                                validateSignUpField("email", e.target.value);
                            }}
                            className={styles.inputField}
                        />

                        {signUpErrors.phone && <p className={styles.error}>{signUpErrors.phone}</p>}
                        <input
                            type="text"
                            placeholder="Số điện thoại"
                            value={signUpData.phone}
                            onChange={(e) => {
                                if (/^\d*$/.test(e.target.value)) {
                                    setSignUpData({ ...signUpData, phone: e.target.value });
                                    validateSignUpField("phone", e.target.value);
                                }
                            }}
                            className={styles.inputField}
                        />

                        {signUpErrors.password && <p className={styles.error}>{signUpErrors.password}</p>}
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            value={signUpData.password}
                            onChange={(e) => {
                                setSignUpData({ ...signUpData, password: e.target.value });
                                validateSignUpField("password", e.target.value);
                            }}
                            className={styles.inputField}
                        />

                        {signUpErrors.confirmPassword && <p className={styles.error}>{signUpErrors.confirmPassword}</p>}
                        <input
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            value={signUpData.confirmPassword}
                            onChange={(e) => {
                                setSignUpData({ ...signUpData, confirmPassword: e.target.value });
                                validateSignUpField("confirmPassword", e.target.value);
                            }}
                            className={styles.inputField}
                        />

                        <button className={styles.button}>Đăng ký</button>
                    </form>
                </div>

                {/* SIGN IN */}
                <div className={`${styles.formContainer} ${styles.signInContainer}`}>
                    <form onSubmit={handleSignInSubmit} noValidate>
                        <h1>Đăng nhập</h1>

                        {signInErrors.email && <p className={styles.error}>{signInErrors.email}</p>}
                        <input
                            type="email"
                            placeholder="Email"
                            value={signInData.email}
                            onChange={(e) => {
                                setSignInData({ ...signInData, email: e.target.value });
                                validateSignInField("email", e.target.value);
                            }}
                            className={styles.inputField}
                        />

                        {signInErrors.password && <p className={styles.error}>{signInErrors.password}</p>}
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            value={signInData.password}
                            onChange={(e) => {
                                setSignInData({ ...signInData, password: e.target.value });
                                validateSignInField("password", e.target.value);
                            }}
                            className={styles.inputField}
                        />

                        <div style={{ textAlign: "center", marginTop: "10px" }}>
                            <a href="#">Quên mật khẩu?</a>
                        </div>

                        <button className={styles.button}>Đăng nhập</button>
                    </form>
                </div>

                {/* OVERLAY */}
                <div className={styles.overlayContainer}>
                    <div className={styles.overlay}>
                        <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
                            <h1>Welcome Back!</h1>
                            <p>Vui lòng đăng nhập để tiếp tục</p>
                            <button className={`${styles.button} ${styles.ghost}`} onClick={() => handleOnClick("signIn")}>
                                Đăng nhập
                            </button>
                        </div>

                        <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
                            <h1>Hello, Friend!</h1>
                            <p>Nhập thông tin cá nhân để bắt đầu</p>
                            <button className={`${styles.button} ${styles.ghost}`} onClick={() => handleOnClick("signUp")}>
                                Đăng ký
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
