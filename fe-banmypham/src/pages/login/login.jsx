import React, { useState } from "react";
import styles from "./Login.module.css";

export default function Login() {
    const [type, setType] = useState("signIn");

    const handleOnClick = (text) => {
        if (text !== type) {
            setType(text);
        }
    };

    const containerClass = `${styles.container} ${type === "signUp" ? styles.rightPanelActive : ""}`;

    return (
        <div className={styles.loginApp}>
            <div className={containerClass}>
                {/* Sign Up Form */}
                <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
                    <form>
                        <h1 style={{ fontFamily: "Arial", marginBottom:"20px"}}>Tạo tài khoản</h1>
                        <input className={styles.inputField} type="email" placeholder="Email" />
                        <input className={styles.inputField} type="text" placeholder="Số điện thoại" />
                        <input className={styles.inputField} type="password" placeholder="Mật khẩu" />
                        <button className={styles.button} style={{marginTop: "20px"}}>Đăng ký</button>
                    </form>
                </div>

                {/* Sign In Form */}
                <div className={`${styles.formContainer} ${styles.signInContainer}`}>
                    <form>
                        <h1 style={{ fontFamily: "Arial", marginBottom:"20px"}}>Đăng nhập</h1>
                        <input className={styles.inputField} type="email" placeholder="Email" />
                        <input className={styles.inputField} type="password" placeholder="Mật khẩu" />

                        <div style={{ width: "100%", textAlign: "center", marginTop: "10px" }}>
                            <a href="#">Quên mật khẩu?</a>
                        </div>

                        <button className={styles.button} style={{marginTop: "20px"}}>Đăng nhập</button>
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
