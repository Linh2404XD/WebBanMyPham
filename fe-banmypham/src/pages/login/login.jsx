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

    const validateSignInField = (field, value) => {
        const newErrors = { ...signInErrors };

        switch (field) {
            case "email":
                if (!value.trim()) {
                    newErrors.email = "Bạn không thể để trống dữ liệu này";
                } else if (!validateEmail(value)) {
                    newErrors.email = "Email không hợp lệ. Phải có @gmail.com";
                } else {
                    newErrors.email = "";
                }
                break;

            case "password":
                if (!value) {
                    newErrors.password = "Bạn không thể để trống dữ liệu này";
                } else if (value.length < 8) {
                    newErrors.password = "Mật khẩu có ít nhất 8 ký tự. Thử lại.";
                } else {
                    newErrors.password = "";
                }
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
                if (!value.trim()) {
                    newErrors.email = "Bạn không thể để trống dữ liệu này";
                } else if (!validateEmail(value)) {
                    newErrors.email = "Email không hợp lệ. Phải có @gmail.com";
                } else {
                    newErrors.email = "";
                }
                break;

            case "phone":
                if (!value.trim()) {
                    newErrors.phone = "Bạn không thể để trống dữ liệu này";
                } else if (!value.startsWith("0")) {
                    newErrors.phone = "Số điện thoại phải bắt đầu bằng số 0";
                } else if (value.length !== 10) {
                    newErrors.phone = "Số điện thoại phải có đủ 10 số";
                } else {
                    newErrors.phone = "";
                }
                break;

            case "password":
                if (!value) {
                    newErrors.password = "Bạn không thể để trống dữ liệu này";
                } else if (value.length < 8) {
                    newErrors.password = "Mật khẩu có ít nhất 8 ký tự. Thử lại.";
                } else {
                    newErrors.password = "";
                }
                break;

            case "confirmPassword":
                if (!value) {
                    newErrors.confirmPassword = "Bạn không thể để trống dữ liệu này";
                } else if (value !== signUpData.password) {
                    newErrors.confirmPassword = "Mật khẩu không tương ứng. Thử lại.";
                } else {
                    newErrors.confirmPassword = "";
                }
                break;

            default:
                break;
        }
        setSignUpErrors(newErrors);
    };

    const validateSignUp = () => {
        Object.entries(signUpData).forEach(([field, value]) => validateSignUpField(field, value));
        return Object.values(signUpErrors).every((error) => !error);
    };
    const validateSignIn = () => {
        Object.entries(signInData).forEach(([field, value]) => validateSignInField(field, value));
        return Object.values(signUpErrors).every((error) => !error);
    };

    const handleOnClick = (text) => {
        if (text !== type) {
            setType(text);
            setSignInErrors({});
            setSignUpErrors({});
            setSignInMessage("");
            setSignUpMessage("");
            setSignInData({ email: "", password: "" });
            setSignUpData({ email: "", phone: "", password: "", confirmPassword: "" });
        }
    };

    const containerClass = `${styles.container} ${type === "signUp" ? styles.rightPanelActive : ""}`;

    return (
        <div className={styles.loginApp}>
            <div className={containerClass}>
                <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
                    <form noValidate onSubmit={(e) => {
                        e.preventDefault();
                        if (validateSignUp()) {
                            setSignUpMessage("Đang đăng ký...");
                            setTimeout(() => setSignUpMessage("Đăng ký thành công!"), 1000);
                        }
                    }}>
                        <h1 style={{ fontFamily: "Arial", marginBottom: "10px" }}>Đăng ký</h1>

                        {signUpErrors.email && <p className={styles.error}>{signUpErrors.email}</p>}
                        <input
                            className={styles.inputField}
                            type="email"
                            placeholder="Email"
                            value={signUpData.email}
                            onChange={(e) => {
                                const value = e.target.value;
                                setSignUpData({ ...signUpData, email: value });
                                validateSignUpField("email", value);
                            }}
                        />

                        {signUpErrors.phone && <p className={styles.error}>{signUpErrors.phone}</p>}
                        <input
                            className={styles.inputField}
                            type="text"
                            placeholder="Số điện thoại"
                            value={signUpData.phone}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) {
                                    setSignUpData({ ...signUpData, phone: value });
                                    validateSignUpField("phone", value);
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
                            onChange={(e) => {
                                const value = e.target.value;
                                const updatedData = { ...signUpData, password: value };
                                setSignUpData(updatedData);

                                // Validate password riêng
                                validateSignUpField("password", value);

                                // Chỉ validate confirmPassword nếu confirmPassword đã được nhập
                                if (signUpData.confirmPassword.trim() !== "") {
                                    validateSignUpField("confirmPassword", signUpData.confirmPassword);
                                }
                            }}
                        />

                        {signUpErrors.confirmPassword && <p className={styles.error}>{signUpErrors.confirmPassword}</p>}
                        <input
                            className={styles.inputField}
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            value={signUpData.confirmPassword}
                            onChange={(e) => {
                                const value = e.target.value;
                                setSignUpData({ ...signUpData, confirmPassword: value });
                                validateSignUpField("confirmPassword", value);
                            }}
                        />

                        <button className={styles.button} style={{ marginTop: "20px" }}>Đăng ký</button>
                        <p>{signUpMessage}</p>
                    </form>
                </div>

                <div className={`${styles.formContainer} ${styles.signInContainer}`}>
                    <form noValidate onSubmit={(e) => {
                        e.preventDefault();
                        if (validateSignIn()) {
                            setSignUpMessage("Đang đăng nhập...");
                            setTimeout(() => setSignUpMessage("Đăng nhập thành công!"), 1000);
                        }
                    }}>
                        <h1 style={{ fontFamily: "Arial", marginBottom: "20px" }}>Đăng nhập</h1>

                        {signInErrors.email && <p className={styles.error}>{signInErrors.email}</p>}
                        <input
                            className={styles.inputField}
                            type="email"
                            placeholder="Email"
                            value={signInData.email}
                            onChange={(e) => {
                                const value = e.target.value;
                                setSignInData({ ...signInData, email: value });
                                validateSignInField("email", value);
                            }}
                        />

                        {signInErrors.password && <p className={styles.error}>{signInErrors.password}</p>}
                        <input
                            className={styles.inputField}
                            type="password"
                            placeholder="Mật khẩu"
                            value={signInData.password}
                            onChange={(e) => {
                                const value = e.target.value;
                                setSignInData({ ...signInData, password: value });
                                validateSignInField("password", value);
                            }}
                        />

                        <div style={{ width: "100%", textAlign: "center", marginTop: "10px" }}>
                            <a href="#">Quên mật khẩu?</a>
                        </div>

                        <button className={styles.button} style={{ marginTop: "20px" }}>Đăng nhập</button>
                        <p>{signInMessage}</p>
                    </form>
                </div>

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