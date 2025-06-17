import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './css/header.css';

const Header = () => {
    const { t, i18n } = useTranslation();

    const langImages = {
        vi: "/assets/img/lang_vi.png",
        en: "/assets/img/lang_en.png",
        zh: "/assets/img/lang_zh.png",
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [userRoles, setUserRoles] = useState([]);
    const timeoutRef = useRef(null);
    const [currentLang, setCurrentLang] = useState("vi");

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
            .then(() => console.log(`Language changed to ${lang}`))
            .catch((error) => console.error("Failed to change language:", error));
        setCurrentLang(lang);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);

        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log("Decoded token:", decoded); // Kiểm tra payload

                let roles = decoded.roles || decoded.authorities;

                // Nếu là chuỗi đơn thì chuyển thành mảng
                if (roles && !Array.isArray(roles)) {
                    roles = [roles];
                }

                setUserRoles(roles || []);

                // Lấy dữ liệu giỏ hàng
                axios.get("http://localhost:8080/api/cart-items/my-cart", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(res => {
                        setCartItems(res.data);
                    })
                    .catch(err => {
                        console.error("Failed to load cart items:", err);
                        setCartItems([]);
                    });

            } catch (e) {
                console.error("Invalid token", e);
                setUserRoles([]);
            }
        } else {
            setUserRoles([]);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUserRoles([]);
        setShowLogout(false);
    };

    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current);
        setShowLogout(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setShowLogout(false);
        }, 200);
    };



    return (
        <header className="header">
            <div className="header__top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="header__top__left">
                                <ul>
                                    <li><i className="fa fa-envelope"></i> {t("email")}</li>
                                    <li>{t("freeShipping")}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="header__top__right">
                                <div className="header__top__right__social">
                                    <a href="#"><i className="fa fa-facebook"></i></a>
                                    <a href="#"><i className="fa fa-twitter"></i></a>
                                    <a href="#"><i className="fa fa-linkedin"></i></a>
                                    <a href="#"><i className="fa fa-pinterest-p"></i></a>
                                </div>
                                <div className="header__top__right__language">
                                    <img src={langImages[currentLang]} alt="Language"/>
                                    <div>{t("language")}</div>
                                    <i className="fa fa-chevron-down"></i>
                                    <ul>
                                        <li>
                                            <button onClick={() => changeLanguage("vi")}>Tiếng Việt</button>
                                        </li>
                                        <li>
                                            <button onClick={() => changeLanguage("en")}>English</button>
                                        </li>
                                        <li>
                                            <button onClick={() => changeLanguage("zh")}>中文</button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="header__top__right__auth">
                                    {isLoggedIn ? (
                                        <div
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                            style={{ position: 'relative', display: 'inline-block' }}
                                        >
                                            <a href="/profile">
                                                <img
                                                    src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
                                                    alt="User Avatar"
                                                    style={{ width: '24px', height: '24px', borderRadius: '50%' }}
                                                />
                                            </a>
                                            {showLogout && (
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: '30px',
                                                        right: 0,
                                                        background: '#fff',
                                                        border: '1px solid #ccc',
                                                        borderRadius: '4px',
                                                        padding: '5px 0',
                                                        zIndex: 10,
                                                        whiteSpace: 'nowrap',
                                                        minWidth: '150px',
                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                                    }}
                                                    onMouseEnter={handleMouseEnter}
                                                    onMouseLeave={handleMouseLeave}
                                                >
                                                    <a
                                                        href="/orders"
                                                        style={{
                                                            display: 'block',
                                                            padding: '8px 16px',
                                                            color: '#333',
                                                            textDecoration: 'none'
                                                        }}
                                                    >
                                                        🧾 {t("auth.myOrders") || "Đơn hàng đã đặt"}
                                                    </a>
                                                    <div
                                                        onClick={handleLogout}
                                                        style={{
                                                            padding: '8px 16px',
                                                            color: '#d00',
                                                            cursor: 'pointer',
                                                            borderTop: '1px solid #eee'
                                                        }}
                                                    >
                                                        🔓 {t("auth.logout")}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <a href="/login"><i className="fa fa-user"></i> {t("login")}</a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="header__logo">
                            <a href="/home"><img src="/assets/img/logo.png" alt="Logo" /></a>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <nav className="header__menu">
                            <ul>
                                <li className="active"><a href="/">{t("home")}</a></li>
                                <li><a href="/shop-grid">{t("shop")}</a></li>
                                <li><a href="/blog">{t("blog")}</a></li>
                                <li><a href="/contact">{t("contact")}</a></li>

                                {/* 👉 Hiện "Quản lý" nếu có ROLE_ADMIN */}
                                {userRoles.includes('ROLE_ADMIN') && (
                                    <li><a href="/dashboard">{t("manage") || "Quản lý"}</a></li>
                                )}
                            </ul>
                        </nav>
                    </div>
                    <div className="col-lg-3">
                        <div className="header__cart">
                            <ul>
                                <li>
                                    <a href="/cart">
                                        <i className="fa fa-shopping-bag" style={{ fontSize: '25px' }}></i>
                                        <span>{cartItems.length}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="humberger__open">
                    <i className="fa fa-bars"></i>
                </div>
            </div>
        </header>
    );
};

export default Header;
