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

    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
    const navigate = useNavigate();
    const [_, setPopupVisible] = useState(false);

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
        let valid = true;
        const newErrors = {};

        Object.entries(signUpData).forEach(([field, value]) => {
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

    // gọi api để xử lý đăng kí
    const handleSignUpSubmit = async (e) => {
        setSignUpMessage("");
        e.preventDefault();

        if (!validateSignUp()) return;


        setSignUpMessage("Đang đăng ký...");
        console.log("Gửi request đến backend"); // Thêm

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

            const data = await response.json();

            if (response.ok) {
                // Hiển thị popup
                setPopupVisible(true);

                // Chờ 1.5 giây rồi chuyển hướng
                setTimeout(() => {
                    navigate("/home", {
                        state: { showSuccessPopup: true, message: 'Đăng ký thành công!'  } // ✅ truyền state
                    });
                }, 1500);
            } else {
                setSignUpMessage(data.message || "Đăng ký thất bại");
            }
        } catch (error) {
            console.error("Lỗi fetch:", error); // Thêm
            setSignUpMessage("Lỗi kết nối: " + error.message);
        }
    };

    // gọi api xử lý đng nhập
    const handleSignInSubmit = async (e) => {
        e.preventDefault();

        if (!validateSignIn()) return;

        setSignInMessage("Đang đăng nhập...");

        try {
            const response = await fetch("http://localhost:8080/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: signInData.email,
                    password: signInData.password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token; // backend trả về { token: "..." }
                // Lưu token vào localStorage
                localStorage.setItem("token", token);

                setPopupVisible(true);
                setSignInMessage("Đăng đăng nhập...");

                setTimeout(() => {
                    navigate("/home", {
                        state: { showSuccessPopup: true, message: "Đăng nhập thành công!" },
                    });
                }, 1500);
            } else {
                const errorData = await response.json();
                setSignInMessage("Lỗi: " + (errorData.message || "Đăng nhập thất bại"));
            }
        } catch (error) {
            setSignInMessage("Lỗi kết nối: " + error.message);
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