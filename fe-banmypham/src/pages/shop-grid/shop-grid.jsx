import React from "react";
import ProductDiscountSlider from "../../components/productDiscountSlider.jsx";
import Header from "../../components/header.jsx";

const ShopGrid = () => {
    return (
        <>
            {/* Page Preloader */}
            <div id="preloder">
                <div className="loader"></div>
            </div>

            {/* Humberger Menu */}
            <div className="humberger__menu__overlay"></div>
            <div className="humberger__menu__wrapper">
                <div className="humberger__menu__logo">
                    <a href="#"><img src="/assets/img/logo.png" alt="" /></a>
                </div>
                <div className="humberger__menu__cart">
                    <ul>
                        <li><a href="#"><i className="fa fa-heart"></i> <span>1</span></a></li>
                        <li><a href="#"><i className="fa fa-shopping-bag"></i> <span>3</span></a></li>
                    </ul>
                    <div className="header__cart__price">item: <span>$150.00</span></div>
                </div>
                <div className="humberger__menu__widget">
                    <div className="header__top__right__language">
                        <img src="/assets/img/language.png" alt="" />
                        <div>English</div>
                        <span className="arrow_carrot-down"></span>
                        <ul>
                            <li><a href="#">Spanis</a></li>
                            <li><a href="#">English</a></li>
                        </ul>
                    </div>
                    <div className="header__top__right__auth">
                        <a href="#"><i className="fa fa-user"></i> Login</a>
                    </div>
                </div>
                <nav className="humberger__menu__nav mobile-menu">
                    <ul>
                        <li className="active"><a href="index">Home</a></li>
                        <li><a href="shop-grid">Shop</a></li>
                        <li><a href="#">Pages</a>
                            <ul className="header__menu__dropdown">
                                <li><a href="shop-details">Shop Details</a></li>
                                <li><a href="./shoping-cart">Shoping Cart</a></li>
                                <li><a href="checkout">Check Out</a></li>
                                <li><a href="blog-details">Blog Details</a></li>
                            </ul>
                        </li>
                        <li><a href="blog">Blog</a></li>
                        <li><a href="contact">Contact</a></li>
                    </ul>
                </nav>
                <div id="mobile-menu-wrap"></div>
                <div className="header__top__right__social">
                    <a href="#"><i className="fa fa-facebook"></i></a>
                    <a href="#"><i className="fa fa-twitter"></i></a>
                    <a href="#"><i className="fa fa-linkedin"></i></a>
                    <a href="#"><i className="fa fa-pinterest-p"></i></a>
                </div>
                <div className="humberger__menu__contact">
                    <ul>
                        <li><i className="fa fa-envelope"></i> hello@colorlib.com</li>
                        <li>Free Shipping for all Order of $99</li>
                    </ul>
                </div>
            </div>

            {/* Header */}
            <Header />

            {/* Hero Section */}
            <section className="hero hero-normal">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="hero__categories">
                                <div className="hero__categories__all">
                                    <i className="fa fa-bars"></i>
                                    <span>All departments</span>
                                </div>
                                <ul>
                                    <li><a href="#">Fresh Meat</a></li>
                                    <li><a href="#">Vegetables</a></li>
                                    <li><a href="#">Fruit & Nut Gifts</a></li>
                                    <li><a href="#">Fresh Berries</a></li>
                                    <li><a href="#">Ocean Foods</a></li>
                                    <li><a href="#">Butter & Eggs</a></li>
                                    <li><a href="#">Fastfood</a></li>
                                    <li><a href="#">Fresh Onion</a></li>
                                    <li><a href="#">Papayaya & Crisps</a></li>
                                    <li><a href="#">Oatmeal</a></li>
                                    <li><a href="#">Fresh Bananas</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="hero__search">
                                <div className="hero__search__form">
                                    <form action="#">
                                        <div className="hero__search__categories">
                                            All Categories
                                            <span className="arrow_carrot-down"></span>
                                        </div>
                                        <input type="text" placeholder="What do yo u need?" />
                                        <button type="submit" className="site-btn">SEARCH</button>
                                    </form>
                                </div>
                                <div className="hero__search__phone">
                                    <div className="hero__search__phone__icon">
                                        <i className="fa fa-phone"></i>
                                    </div>
                                    <div className="hero__search__phone__text">
                                        <h5>+65 11.188.888</h5>
                                        <span>support 24/7 time</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Breadcrumb Section */}
            <section className="breadcrumb-section" style={{ backgroundImage: `url("/assets/img/breadcrumb.jpg")`, width:"2000px", height: "150px" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>Ogani</h2>
                                <div className="breadcrumb__option">
                                    <a href="home">Home</a>
                                    <span>Shop</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="product spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-5">
                        <div className="sidebar">
                            <div className="sidebar__item">
                                <h4>Department</h4>
                                <ul>
                                    <li><a href="#">Fresh Meat</a></li>
                                    <li><a href="#">Vegetables</a></li>
                                    <li><a href="#">Fruit & Nut Gifts</a></li>
                                    <li><a href="#">Fresh Berries</a></li>
                                    <li><a href="#">Ocean Foods</a></li>
                                    <li><a href="#">Butter & Eggs</a></li>
                                    <li><a href="#">Fastfood</a></li>
                                    <li><a href="#">Fresh Onion</a></li>
                                    <li><a href="#">Papayaya & Crisps</a></li>
                                    <li><a href="#">Oatmeal</a></li>
                                </ul>
                            </div>
                            <div className="sidebar__item">
                                <h4>Price</h4>
                                <div className="price-range-wrap">
                                    <div className="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content" data-min="10" data-max="540">
                                        <div className="ui-slider-range ui-corner-all ui-widget-header"></div>
                                        <span tabIndex="0" className="ui-slider-handle ui-corner-all ui-state-default"></span>
                                        <span tabIndex="0" className="ui-slider-handle ui-corner-all ui-state-default"></span>
                                    </div>
                                    <div className="range-slider">
                                        <div className="price-input">
                                            <input type="text" id="minamount" />
                                            <input type="text" id="maxamount" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="sidebar__item sidebar__item__color--option">
                                <h4>Colors</h4>
                                <div className="sidebar__item__color sidebar__item__color--white">
                                    <label htmlFor="white">
                                        White
                                        <input type="radio" id="white" />
                                    </label>
                                </div>
                                <div className="sidebar__item__color sidebar__item__color--gray">
                                    <label htmlFor="gray">
                                        Gray
                                        <input type="radio" id="gray" />
                                    </label>
                                </div>
                                <div className="sidebar__item__color sidebar__item__color--red">
                                    <label htmlFor="red">
                                        Red
                                        <input type="radio" id="red" />
                                    </label>
                                </div>
                                <div className="sidebar__item__color sidebar__item__color--black">
                                    <label htmlFor="black">
                                        Black
                                        <input type="radio" id="black" />
                                    </label>
                                </div>
                                <div className="sidebar__item__color sidebar__item__color--blue">
                                    <label htmlFor="blue">
                                        Blue
                                        <input type="radio" id="blue" />
                                    </label>
                                </div>
                                <div className="sidebar__item__color sidebar__item__color--green">
                                    <label htmlFor="green">
                                        Green
                                        <input type="radio" id="green" />
                                    </label>
                                </div>
                            </div>
                            <div className="sidebar__item">
                                <h4>Popular Size</h4>
                                <div className="sidebar__item__size">
                                    <label htmlFor="large">
                                        Large
                                        <input type="radio" id="large" />
                                    </label>
                                </div>
                                <div className="sidebar__item__size">
                                    <label htmlFor="medium">
                                        Medium
                                        <input type="radio" id="medium" />
                                    </label>
                                </div>
                                <div className="sidebar__item__size">
                                    <label htmlFor="small">
                                        Small
                                        <input type="radio" id="small" />
                                    </label>
                                </div>
                                <div className="sidebar__item__size">
                                    <label htmlFor="tiny">
                                        Tiny
                                        <input type="radio" id="tiny" />
                                    </label>
                                </div>
                            </div>
                            <div className="sidebar__item">
                                <div className="latest-product__text">
                                    <h4>Latest Products</h4>
                                    <div className="latest-product__slider owl-carousel">
                                        <div className="latest-prdouct__slider__item">
                                            <a href="#" className="latest-product__item">
                                                <div className="latest-product__item__pic">
                                                    <img src="img/latest-product/lp-1.jpg" alt="" />
                                                </div>
                                                <div className="latest-product__item__text">
                                                    <h6>Crab Pool Security</h6>
                                                    <span>$30.00</span>
                                                </div>
                                            </a>
                                            <a href="#" className="latest-product__item">
                                                <div className="latest-product__item__pic">
                                                    <img src="img/latest-product/lp-2.jpg" alt="" />
                                                </div>
                                                <div className="latest-product__item__text">
                                                    <h6>Crab Pool Security</h6>
                                                    <span>$30.00</span>
                                                </div>
                                            </a>
                                            <a href="#" className="latest-product__item">
                                                <div className="latest-product__item__pic">
                                                    <img src="img/latest-product/lp-3.jpg" alt="" />
                                                </div>
                                                <div className="latest-product__item__text">
                                                    <h6>Crab Pool Security</h6>
                                                    <span>$30.00</span>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="latest-prdouct__slider__item">
                                            <a href="#" className="latest-product__item">
                                                <div className="latest-product__item__pic">
                                                    <img src="img/latest-product/lp-1.jpg" alt="" />
                                                </div>
                                                <div className="latest-product__item__text">
                                                    <h6>Crab Pool Security</h6>
                                                    <span>$30.00</span>
                                                </div>
                                            </a>
                                            <a href="#" className="latest-product__item">
                                                <div className="latest-product__item__pic">
                                                    <img src="img/latest-product/lp-2.jpg" alt="" />
                                                </div>
                                                <div className="latest-product__item__text">
                                                    <h6>Crab Pool Security</h6>
                                                    <span>$30.00</span>
                                                </div>
                                            </a>
                                            <a href="#" className="latest-product__item">
                                                <div className="latest-product__item__pic">
                                                    <img src="img/latest-product/lp-3.jpg" alt="" />
                                                </div>
                                                <div className="latest-product__item__text">
                                                    <h6>Crab Pool Security</h6>
                                                    <span>$30.00</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-7">
                       <ProductDiscountSlider/>

                        <div className="filter__item">
                            <div className="row">
                                <div className="col-lg-4 col-md-5">
                                    <div className="filter__sort">
                                        <span>Sort By</span>
                                        <select>
                                            <option value="0">Default</option>
                                            <option value="0">Default</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4">
                                    <div className="filter__found">
                                        <h6><span>16</span> Products found</h6>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-3">
                                    <div className="filter__option">
                                        <span className="icon_grid-2x2"></span>
                                        <span className="icon_ul"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
                                <div className="col-lg-4 col-md-6 col-sm-6" key={i}>
                                    <div className="product__item">
                                        <div
                                            className="product__item__pic"
                                            style={{ backgroundImage: `url(/assets/img/product/product-${i}.jpg)` }}
                                        >
                                            <ul className="product__item__pic__hover">
                                                <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                                <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                                <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                                            </ul>
                                        </div>
                                        <div className="product__item__text">
                                            <h6><a href="#">Crab Pool Security</a></h6>
                                            <h5>$30.00</h5>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="product__pagination">
                            <a href="#">1</a>
                            <a href="#">2</a>
                            <a href="#">3</a>
                            <a href="#"><i className="fa fa-long-arrow-right"></i></a>
                        </div>

                    </div>
                </div>
            </div>
            </section>
        </>
    );
};

export default ShopGrid;