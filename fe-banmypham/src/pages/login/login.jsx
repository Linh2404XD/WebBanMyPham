import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
    const [type, setType] = useState("signIn");
    const [signInData, setSignInData] = useState({ email: "", password: "" });
    const [signUpData, setSignUpData] = useState({ email: "", phone: "", password: "", confirmPassword: "" });

    const [signInErrors, setSignInErrors] = useState({});
    const [signUpErrors, setSignUpErrors] = useState({});

    const [signInMessage, setSignInMessage] = useState("");
    const [signUpMessage, setSignUpMessage] = useState("");

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const navigate = useNavigate();
    const [_, setPopupVisible] = useState(false);

    const validateSignInField = (field, value) => {
        const newErrors = { ...signInErrors };

        switch (field) {
            case "email":
                if (!value.trim()) {
                    newErrors.email = "Bạn không thể để trống dữ liệu này";
                } else if (!validateEmail(value)) {
                    newErrors.email = "Email không hợp lệ!";
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
                    newErrors.email = "Email không hợp lệ!";
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
        let valid = true;
        const newErrors = {};

        Object.entries(signUpData).forEach(([field, value]) => {
            switch (field) {
                case "email":
                    if (!value.trim()) {
                        newErrors.email = "Bạn không thể để trống dữ liệu này";
                        valid = false;
                    } else if (!validateEmail(value)) {
                        newErrors.email = "Email không hợp lệ!";
                        valid = false;
                    } else {
                        newErrors.email = "";
                    }
                    break;

                case "phone":
                    if (!value.trim()) {
                        newErrors.phone = "Bạn không thể để trống dữ liệu này";
                        valid = false;
                    } else if (!value.startsWith("0")) {
                        newErrors.phone = "Số điện thoại phải bắt đầu bằng số 0";
                        valid = false;
                    } else if (value.length !== 10) {
                        newErrors.phone = "Số điện thoại phải có đủ 10 số";
                        valid = false;
                    } else {
                        newErrors.phone = "";
                    }
                    break;

                case "password":
                    if (!value) {
                        newErrors.password = "Bạn không thể để trống dữ liệu này";
                        valid = false;
                    } else if (value.length < 8) {
                        newErrors.password = "Mật khẩu có ít nhất 8 ký tự. Thử lại.";
                        valid = false;
                    } else {
                        newErrors.password = "";
                    }
                    break;

                case "confirmPassword":
                    if (!value) {
                        newErrors.confirmPassword = "Bạn không thể để trống dữ liệu này";
                        valid = false;
                    } else if (value !== signUpData.password) {
                        newErrors.confirmPassword = "Mật khẩu không tương ứng. Thử lại.";
                        valid = false;
                    } else {
                        newErrors.confirmPassword = "";
                    }
                    break;

                default:
                    break;
            }
        });

        setSignUpErrors(newErrors);
        return valid;
    };
    const validateSignIn = () => {
        let valid = true;
        const newErrors = {};

        Object.entries(signInData).forEach(([field, value]) => {
            switch (field) {
                case "email":
                    if (!value.trim()) {
                        newErrors.email = "Bạn không thể để trống dữ liệu này";
                        valid = false;
                    } else if (!validateEmail(value)) {
                        newErrors.email = "Email không hợp lệ. Phải có @gmail.com";
                        valid = false;
                    } else {
                        newErrors.email = "";
                    }
                    break;


                case "password":
                    if (!value) {
                        newErrors.password = "Bạn không thể để trống dữ liệu này";
                        valid = false;
                    } else if (value.length < 8) {
                        newErrors.password = "Mật khẩu có ít nhất 8 ký tự. Thử lại.";
                        valid = false;
                    } else {
                        newErrors.password = "";
                    }
                    break;

                default:
                    break;
            }
        });

        setSignInErrors(newErrors);
        return valid;
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

// Hàm chung để parse JSON hoặc trả về text khi không phải JSON
    async function parseResponse(response) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return await response.json();
        } else {
            return await response.text();
        }
    }

    const handleSignInSubmit = async (e) => {
        e.preventDefault();

        if (!validateSignIn()) return;

        setSignInMessage("Đang đăng nhập...");

        try {
            const response = await fetch("http://localhost:8080/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: signInData.email,
                    password: signInData.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Đăng nhập thành công, tài khoản đã kích hoạt
                const token = data.token;
                localStorage.setItem("token", token);
                setPopupVisible(true);
                setSignInMessage("Đăng nhập thành công!");

                setTimeout(() => {
                    navigate("/home", {
                        state: { showSuccessPopup: true, message: "Đăng nhập thành công!" },
                    });
                }, 1500);

            } else if (response.status === 403 && data.enable === false) {
                // Tài khoản chưa kích hoạt -> gửi lại mã xác thực
                setSignInMessage("Tài khoản chưa được kích hoạt. Đang gửi lại mã xác thực...");

                try {
                    const resendResponse = await fetch("http://localhost:8080/api/users/resend", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: signInData.email }),
                    });

                    if (resendResponse.ok) {
                        setSignInMessage("Mã xác thực đã được gửi lại vào email của bạn.");
                    } else {
                        setSignInMessage("Gửi lại mã xác thực thất bại. Vui lòng thử lại sau.");
                    }
                } catch (err) {
                    setSignInMessage("Lỗi khi gửi lại mã xác thực: " + err.message);
                }

                // Chuyển sang trang verify sau 1.5s
                setTimeout(() => {
                    navigate("/verify-form", { state: { email: signInData.email } });
                }, 1500);

            } else {
                // Các lỗi khác
                setSignInMessage(data.message || "Đăng nhập thất bại");
            }
        } catch (error) {
            setSignInMessage("Lỗi kết nối: " + error.message);
        }
    };



// handleSignUpSubmit
    const handleSignUpSubmit = async (e) => {
        setSignUpMessage("");
        e.preventDefault();

        if (!validateSignUp()) return;

        setSignUpMessage("Đang đăng ký...");
        console.log("Gửi request đến backend");

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
                setPopupVisible(true);
                setTimeout(() => {
                    navigate("/verify-form", {
                        state: {
                            email: signUpData.email, // truyền email sang verify form
                            showSuccessPopup: true,
                            message: "Đăng ký thành công! Vui lòng kiểm tra email để lấy mã xác thực."
                        },
                    });
                }, 1500);
            } else {
                setSignUpMessage(data.message || data || "Đăng ký thất bại");
            }
        } catch (error) {
            console.error("Lỗi fetch:", error);
            setSignUpMessage("Lỗi kết nối: " + error.message);
        }
    };

    return (
        <div className={styles.loginApp}>
            <div className={containerClass}>
                <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
                    <form noValidate onSubmit={handleSignUpSubmit}>
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
                        <p style={{ color: 'red', marginTop: '10px'}}>{signUpMessage}</p>
                    </form>
                </div>

                <div className={`${styles.formContainer} ${styles.signInContainer}`}>
                    <form noValidate onSubmit={handleSignInSubmit}>
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

                        <button type="submit" className={styles.button} style={{ marginTop: "20px" }}>
                            Đăng nhập
                        </button>
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