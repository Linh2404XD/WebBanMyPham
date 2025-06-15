import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer spad">
            <div className="container">
                <div className="row">
                    {/* About Section */}
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="footer__about">
                            <div className="footer__about__logo">
                                <a href="/public"><img src="/assets/img/logo.png" alt="Logo" /></a>
                            </div>
                            <ul>
                                <li>{t("footer.address")}</li>
                                <li>{t("footer.phone")}</li>
                                <li>{t("footer.email")}</li>
                            </ul>
                        </div>
                    </div>

                    {/* Useful Links */}
                    <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
                        <div className="footer__widget">
                            <h6>{t("footer.usefulLinks")}</h6>
                            <ul>
                                <li><a href="#">{t("footer.aboutUs")}</a></li>
                                <li><a href="#">{t("footer.aboutShop")}</a></li>
                                <li><a href="#">{t("footer.secureShopping")}</a></li>
                                <li><a href="#">{t("footer.delivery")}</a></li>
                                <li><a href="#">{t("footer.privacy")}</a></li>
                                <li><a href="#">{t("footer.sitemap")}</a></li>
                            </ul>
                            <ul>
                                <li><a href="#">{t("footer.whoWeAre")}</a></li>
                                <li><a href="#">{t("footer.services")}</a></li>
                                <li><a href="#">{t("footer.projects")}</a></li>
                                <li><a href="#">{t("footer.contact")}</a></li>
                                <li><a href="#">{t("footer.innovation")}</a></li>
                                <li><a href="#">{t("footer.testimonials")}</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="col-lg-4 col-md-12">
                        <div className="footer__widget">
                            <h6>{t("footer.newsletterTitle")}</h6>
                            <p>{t("footer.newsletterText")}</p>
                            <form action="#">
                                <input type="text" placeholder={t("footer.enterEmail")} />
                                <button type="submit" className="site-btn">{t("footer.subscribe")}</button>
                            </form>
                            <div className="footer__widget__social">
                                <a href="#"><i className="fa fa-facebook"></i></a>
                                <a href="#"><i className="fa fa-instagram"></i></a>
                                <a href="#"><i className="fa fa-twitter"></i></a>
                                <a href="#"><i className="fa fa-pinterest"></i></a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="footer__copyright">
                            <div className="footer__copyright__text">
                                <p>
                                    &copy; {new Date().getFullYear()} {t("footer.copyright")} <i className="fa fa-heart"></i> {t("footer.madeBy")}
                                    <a href="https://colorlib.com" target="_blank" rel="noreferrer">Colorlib</a>
                                </p>
                            </div>
                            <div className="footer__copyright__payment">
                                <img src="/assets/img/payment-item.png" alt="Payment Methods" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
