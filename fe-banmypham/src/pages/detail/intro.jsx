import React from "react";
import styles from "./intro.module.css";
import Header from '../../components/header.jsx';
import Footer from '../../components/footer.jsx';

const Intro = () => {
    return (
        <>
            <Header/>
            <div className={styles.aboutContainer}>
                <h1>Welcome to Ogani Clinic & Spa</h1>
                <p>
                    Ogani Clinic & Spa is proud to be one of the leading beauty care centers, offering specialized skin
                    treatments, relaxation, and comprehensive care.
                </p>
                <h2>Our Services</h2>
                <ul>
                    <li>Acne, scar, melasma, and freckles treatment</li>
                    <li>High-tech hair removal</li>
                    <li>Non-invasive weight loss</li>
                    <li>Skin rejuvenation and brightening</li>
                    <li>Deep relaxation and skincare</li>
                </ul>
                <h2>Clinic Locations</h2>
                <ul>
                    <li>94 Le Van Viet, Hiep Phu Ward, District 9, Ho Chi Minh City</li>
                    <li>39 Nguyen Van Tang, Long Thanh My Ward, Ho Chi Minh City</li>
                    <li>256 Do Xuan Hop, Quarter 4, District 9, Ho Chi Minh City</li>
                </ul>
                <h2>Featured Products</h2>
                <div className={styles.productList}>
                    <div className={styles.productCard}>
                        <img src="https://tse3.mm.bing.net/th?id=OIP.7NXgr9w9hXDp_QFSeNeLowHaHa&pid=Api&P=0&h=220"
                             alt="Megaduo Plus Gel"/>
                        <h5>Megaduo Plus Gel - Acne Reduction & Scar Fading 15g</h5>
                    </div>
                    <div className={styles.productCard}>
                        <img src="https://tse2.mm.bing.net/th?id=OIP.XtYt6zqADtXHXqATHH0sYQHaGS&pid=Api&P=0&h=220"
                             alt="Diode Laser Hair Removal"/>
                        <h5>Diode Laser Hair Removal - Safe & Effective</h5>
                    </div>
                    <div className={styles.productCard}>
                        <img src="https://tse1.mm.bing.net/th?id=OIP.6aBYGL2Nv2QYrw4Ddb4riQHaHa&pid=Api&P=0&h=220"
                             alt="Underarm Whitening Treatment"/>
                        <h5>Underarm Whitening Treatment</h5>
                    </div>
                </div>
                <p>
                    With a team of experienced experts and advanced technology, Ogani is committed to providing the best
                    experience for its customers.
                </p>
            </div>
            <Footer/>
        </>
    );
};

export default Intro;
