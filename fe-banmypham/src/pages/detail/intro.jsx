import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./intro.module.css";
import Header from "../../components/pages/header.jsx";
import Footer from "../../components/pages/footer.jsx";

const Intro = () => {
    const { t } = useTranslation(); // Sử dụng i18n

    return (
        <>
            <Header/>
            <div className={styles.aboutContainer}>
                <h1>{t("welcome")}</h1>
                <p>{t("introText")}</p>

                <h2>{t("services")}</h2>
                <ul>
                    <li>{t("service.acne")}</li>
                    <li>{t("service.hairRemoval")}</li>
                    <li>{t("service.weightLoss")}</li>
                    <li>{t("service.skinRejuvenation")}</li>
                    <li>{t("service.relaxation")}</li>
                </ul>

                <h2>{t("locations")}</h2>
                <ul>
                    <li>{t("location.address1")}</li>
                    <li>{t("location.address2")}</li>
                    <li>{t("location.address3")}</li>
                </ul>

                <h2>{t("featuredProducts")}</h2>
                <div className={styles.productList}>
                    <div className={styles.productCard}>
                        <img src="https://tse3.mm.bing.net/th?id=OIP.7NXgr9w9hXDp_QFSeNeLowHaHa&pid=Api&P=0&h=220"
                             alt={t("product.megaduoAlt")}/>
                        <h5>{t("product.megaduoTitle")}</h5>
                    </div>
                    <div className={styles.productCard}>
                        <img src="https://tse2.mm.bing.net/th?id=OIP.XtYt6zqADtXHXqATHH0sYQHaGS&pid=Api&P=0&h=220"
                             alt={t("product.laserAlt")}/>
                        <h5>{t("product.laserTitle")}</h5>
                    </div>
                    <div className={styles.productCard}>
                        <img src="https://tse1.mm.bing.net/th?id=OIP.6aBYGL2Nv2QYrw4Ddb4riQHaHa&pid=Api&P=0&h=220"
                             alt={t("product.whiteningAlt")}/>
                        <h5>{t("product.whiteningTitle")}</h5>
                    </div>
                </div>

                <p>{t("commitment")}</p>
            </div>
            <Footer/>
        </>
    );
};

export default Intro;
