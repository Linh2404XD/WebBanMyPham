import React, {useEffect, useRef, useState} from 'react';
import { useTranslation } from "react-i18next";
import './css/header.css';


const Header = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
            .then(() => console.log(`Language changed to ${lang}`))
            .catch((error) => console.error("Failed to change language:", error));
    };



    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const timeoutRef = useRef(null);


    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setShowLogout(false);
        // Bạn có thể thêm navigate về trang login hoặc trang chủ nếu muốn
        // navigate('/login');
    };

    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current);
        setShowLogout(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setShowLogout(false);
        }, 200); // Delay nhỏ để người dùng kịp di chuột
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
                                    <img src="/assets/img/lang_vi.png" alt="Language"/>
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
                                                    onClick={handleLogout}
                                                    style={{
                                                        position: 'absolute',
                                                        top: '30px',
                                                        right: 0,
                                                        background: '#fff',
                                                        border: '1px solid #ccc',
                                                        borderRadius: '4px',
                                                        padding: '5px 10px',
                                                        cursor: 'pointer',
                                                        whiteSpace: 'nowrap',
                                                        zIndex: 10,
                                                    }}
                                                >
                                                    Logout
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
                            <a href="/home"><img src="/assets/img/logo.png" alt="Logo"/></a>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <nav className="header__menu">
                            <ul>
                                <li className="active"><a href="/">{t("home")}</a></li>
                                <li><a href="/shop-grid">{t("shop")}</a></li>
                                <li><a href="/blog">{t("blog")}</a></li>
                                <li><a href="/contact">{t("contact")}</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-lg-3">
                        <div className="header__cart">
                            <ul>
                                <li><a href="#"><i className="fa fa-heart"></i> <span>1</span></a></li>
                                <li><a href="/cart"><i className="fa fa-shopping-bag"></i> <span>3</span></a></li>
                            </ul>
                            <div className="header__cart__price">item: <span>$150.00</span></div>
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