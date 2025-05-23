import React from 'react';

const BreadCrumb = () => {
    return (
        <section className="breadcrumb-section" style={{ backgroundImage: `url("/assets/img/breadcrumb.jpg")`, width:"2000px", height: "150px" }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="breadcrumb__text">
                            <h2>Checkout</h2>
                            <div className="breadcrumb__option">
                                <a href="./index.html">Home</a>
                                <span>Checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BreadCrumb;
