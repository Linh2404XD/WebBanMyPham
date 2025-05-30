import React from "react";
import Header from '../../components/header.jsx';
import Footer from '../../components/footer.jsx';
import BreadCrumb from '../../components/breadcrumb.jsx';
import Hero from "../../components/hero.jsx";
import {useTranslation} from "react-i18next";

const Checkout = () => {
    const { t } = useTranslation();

    return (
        <>
            {/* Preloader */}
            <div id="preloder">
                <div className="loader"></div>
            </div>

            <Header />

            {/*/!* Hero *!/*/}
            {/*<Hero/>*/}

            {/*/!* Breadcrumb *!/*/}
            {/*<BreadCrumb/>*/}

            <section className="checkout spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h6>
                                <span className="icon_tag_alt"></span> {t("checkOut.have_coupon")}{" "}
                                <a href="#">{t("checkOut.click_here")}</a> {t("checkOut.enter_code")}
                            </h6>
                        </div>
                    </div>
                    <div className="checkout__form">
                        <h4>{t("checkOut.billing_details")}</h4>
                        <form action="#">
                            <div className="row">
                                <div className="col-lg-8 col-md-6">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <p>{t("checkOut.first_name")}<span>*</span></p>
                                                <input type="text" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <p>{t("checkOut.last_name")}<span>*</span></p>
                                                <input type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="checkout__input">
                                        <p>{t("checkOut.country")}<span>*</span></p>
                                        <input type="text" />
                                    </div>
                                    <div className="checkout__input">
                                        <p>{t("checkOut.address")}<span>*</span></p>
                                        <input type="text" placeholder="Street Address" className="checkout__input__add" />
                                        <input type="text" placeholder="Apartment, suite, unit etc. (optional)" />
                                    </div>
                                    <div className="checkout__input">
                                        <p>{t("checkOut.city")}<span>*</span></p>
                                        <input type="text" />
                                    </div>
                                    <div className="checkout__input">
                                        <p>{t("checkOut.state")}<span>*</span></p>
                                        <input type="text" />
                                    </div>
                                    <div className="checkout__input">
                                        <p>{t("checkOut.zip")}<span>*</span></p>
                                        <input type="text" />
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <p>{t("checkOut.phone")}<span>*</span></p>
                                                <input type="text" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <p>{t("checkOut.email")}<span>*</span></p>
                                                <input type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="checkout__input__checkbox">
                                        <label htmlFor="acc">
                                            {t("checkOut.create_account")}
                                            <input type="checkbox" id="acc" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <p>
                                        {t("checkOut.create_account_note", "Create an account by entering the information below. If you are a returning customer please login at the top of the page")}
                                    </p>
                                    <div className="checkout__input">
                                        <p>{t("checkOut.account_password")}<span>*</span></p>
                                        <input type="text" />
                                    </div>
                                    <div className="checkout__input__checkbox">
                                        <label htmlFor="diff-acc">
                                            {t("checkOut.ship_diff_address")}
                                            <input type="checkbox" id="diff-acc" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="checkout__input">
                                        <p>{t("checkOut.order_notes")}<span>*</span></p>
                                        <input type="text" placeholder={t("checkOut.order_notes_placeholder", "Notes about your order, e.g. special notes for delivery.")} />
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="checkout__order">
                                        <h4>{t("checkOut.your_order")}</h4>
                                        <div className="checkout__order__products">
                                            {t("checkOut.products")} <span>{t("checkOut.total")}</span>
                                        </div>
                                        <ul>
                                            <li>Vegetable’s Package <span>$75.99</span></li>
                                            <li>Fresh Vegetable <span>$151.99</span></li>
                                            <li>Organic Bananas <span>$53.99</span></li>
                                        </ul>
                                        <div className="checkout__order__subtotal">{t("checkOut.subtotal")} <span>$750.99</span></div>
                                        <div className="checkout__order__total">{t("checkOut.total")} <span>$750.99</span></div>
                                        <div className="checkout__input__checkbox">
                                            <label htmlFor="acc-or">
                                                {t("checkOut.create_account")}
                                                <input type="checkbox" id="acc-or" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adip elit...</p>
                                        <div className="checkout__input__checkbox">
                                            <label htmlFor="payment">
                                                {t("checkOut.check_payment")}
                                                <input type="checkbox" id="payment" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        <div className="checkout__input__checkbox">
                                            <label htmlFor="paypal">
                                                {t("checkOut.paypal")}
                                                <input type="checkbox" id="paypal" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        <button type="submit" className="site-btn">{t("checkOut.place_order")}</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Checkout;
