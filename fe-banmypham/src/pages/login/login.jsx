import React, { useState } from "react";
import styles from "./Login.module.css";

export default function Login() {
    const [type, setType] = useState("signIn");
    const [signInData, setSignInData] = useState({ email: "", password: "" });
    const [signUpData, setSignUpData] = useState({ email: "", phone: "", password: "", confirmPassword: "" });

    const [signInErrors, setSignInErrors] = useState({});
    const [signUpErrors, setSignUpErrors] = useState({});

    const [signInMessage, setSignInMessage] = useState("");
    const [signUpMessage, setSignUpMessage] = useState("");


    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);

    const validateSignIn = () => {
        let errors = {};
        // Email
        if (!signInData.email.trim()) {
            errors.email = "Bạn không thể để trống dữ liệu này";
        } else if (!signInData.email.includes("@gmail.com")) {
            errors.email = "Email phải có đuôi @gmail.com";
        } else if (!validateEmail(signInData.email)) {
            errors.email = "Email không hợp lệ. Thử lại.";
        }

        // Password
        if (!signInData.password) {
            errors.password = "Bạn không thể để trống dữ liệu này";
        } else if (signInData.password.length < 8) {
            errors.password = "Mật khẩu có ít nhất 8 ký tự. Thử lại.";
        }
        setSignInErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateSignUp = () => {
        let errors = {};

        // Email
        if (!signUpData.email.trim()) {
            errors.email = "Bạn không thể để trống dữ liệu này";
        } else if (!signUpData.email.includes("@gmail.com")) {
            errors.email = "Email phải có đuôi @gmail.com";
        } else if (!validateEmail(signUpData.email)) {
            errors.email = "Email không hợp lệ. Thử lại.";
        }
        // Phone
        if (!signUpData.phone.trim()) {
            errors.phone = "Bạn không thể để trống dữ liệu này";
        } else if (!signUpData.phone.startsWith("0")) {
            errors.phone = "Số điện thoại phải bắt đầu bằng số 0";
        } else if (signUpData.phone.length !== 10) {
            errors.phone = "Số điện thoại phải có đủ 10 số";
        }

        // Password
        if (!signUpData.password) {
            errors.password = "Bạn không thể để trống dữ liệu này";
        } else if (signUpData.password.length < 8) {
            errors.password = "Mật khẩu có ít nhất 8 ký tự. Thử lại.";
        }

        // Confirm Password
        if (!signUpData.confirmPassword) {
            errors.confirmPassword = "Bạn không thể để trống dữ liệu này";
        } else if (signUpData.confirmPassword !== signUpData.password) {
            errors.confirmPassword = "Mật khẩu không tương ứng. Thử lại.";
        }

        setSignUpErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleOnClick = (text) => {
        if (text !== type) {
            setType(text);
            // Xóa lỗi và thông báo cũ khi đổi form
            setSignInErrors({});
            setSignUpErrors({});
            setSignInMessage("");
            setSignUpMessage("");
            // Xóa dữ liệu trong ô input
            setSignInData({ email: "", password: "" });
            setSignUpData({ email: "", phone: "", password: "", confirmPassword: "" });
        }
    };
    const containerClass = `${styles.container} ${type === "signUp" ? styles.rightPanelActive : ""}`;

    return (
        <div className={styles.loginApp}>
            <div className={containerClass}>
                {/* Sign Up Form */}
                <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
                    <form noValidate
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (validateSignUp()) {
                                setSignUpMessage("Đang đăng ký...");
                                setTimeout(() => setSignUpMessage("Đăng ký thành công!"), 1000);
                            }
                        }}
                    >
                        <h1 style={{ fontFamily: "Arial", marginBottom: "10px" }}>Đăng ký</h1>
                        {signUpErrors.email && <p className={styles.error}>{signUpErrors.email}</p>}
                        <input
                            className={styles.inputField}
                            type="email"
                            placeholder="Email"
                            value={signUpData.email}
                            onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                        />

                        {signUpErrors.phone && <p className={styles.error}>{signUpErrors.phone}</p>}
                        <input
                            className={styles.inputField}
                            type="text"
                            placeholder="Số điện thoại"
                            value={signUpData.phone}
                            onChange={(e) => {
                                // Chỉ cho phép nhập số
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) {
                                    setSignUpData({ ...signUpData, phone: value });
                                }
                            }}
                            inputMode="numeric"
                            pattern="[0-9]*"
                        />

                        {signUpErrors.password && <p className={styles.error}>{signUpErrors.password}</p>}
                        <input
                            className={styles.inputField}
                            type="password"
                            placeholder="Mật khẩu"
                            value={signUpData.password}
                            onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                        />

                        {signUpErrors.confirmPassword && <p className={styles.error}>{signUpErrors.confirmPassword}</p>}
                        <input
                            className={styles.inputField}
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            value={signUpData.confirmPassword}
                            onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                        />

                        <button className={styles.button} style={{ marginTop: "20px" }}>Đăng ký</button>
                        <p>{signUpMessage}</p>
                    </form>
                </div>

                {/* Sign In Form */}
                <div className={`${styles.formContainer} ${styles.signInContainer}`}>
                    <form noValidate
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (validateSignIn()) {
                                setSignInMessage("Đang đăng nhập...");
                                setTimeout(() => setSignInMessage("Đăng nhập thành công!"), 1000);
                            }
                        }}
                    >
                        <h1 style={{ fontFamily: "Arial", marginBottom: "20px" }}>Đăng nhập</h1>
                        {signInErrors.email && <p className={styles.error}>{signInErrors.email}</p>}
                        <input
                            className={styles.inputField}
                            type="email"
                            placeholder="Email"
                            value={signInData.email}
                            onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                        />

                        {signInErrors.password && <p className={styles.error}>{signInErrors.password}</p>}
                        <input
                            className={styles.inputField}
                            type="password"
                            placeholder="Mật khẩu"
                            value={signInData.password}
                            onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                        />


                        <div style={{ width: "100%", textAlign: "center", marginTop: "10px" }}>
                            <a href="#">Quên mật khẩu?</a>
                        </div>

                        <button className={styles.button} style={{ marginTop: "20px" }}>Đăng nhập</button>
                        <p>{signInMessage}</p>
                    </form>
                </div>

                {/* Overlay */}
                <div className={styles.overlayContainer}>
                    <div className={styles.overlay}>
                        <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
                            <h1 style={{ color: "white" }}>Welcome Back!</h1>
                            <p style={{ color: "white" }}>
                                To keep connected with us please login with your personal info
                            </p>
                            <button
                                className={`${styles.button} ${styles.ghost}`}
                                id="signIn"
                                onClick={() => handleOnClick("signIn")}
                            >
                                Đăng nhập
                            </button>
                        </div>
                        <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
                            <h1 style={{ color: "white" }}>Hello, Friend!</h1>
                            <p style={{ color: "white" }}>
                                Enter your personal details and start journey with us
                            </p>
                            <button
                                className={`${styles.button} ${styles.ghost}`}
                                id="signUp"
                                onClick={() => handleOnClick("signUp")}
                            >
                                Đăng ký
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
