import React from 'react';
import { useTranslation } from "react-i18next";
import styles from './contact.module.css';
import Header from "../../components/pages/header.jsx";
import Footer from "../../components/pages/footer.jsx";

const ContactForm = () => {
    const { t } = useTranslation(); // Sử dụng i18n để dịch

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.info}>
                    <h2>{t("contact1.title")}</h2>
                    <p>{t("contact1.description")}</p>
                    <p>📞 {t("contact1.phone")}</p>
                    <p>📧 {t("email")}</p>
                </div>

                <div className={styles.form}>
                    <h1>{t("contact1.formTitle")}</h1>
                    <p>{t("contact1.formDescription")}</p>

                    <form>
                        <label>{t("contact1.nameLabel")}</label>
                        <input type="text" placeholder={t("contact1.namePlaceholder")} />

                        <label>{t("contact1.emailLabel")}</label>
                        <input type="email" placeholder={t("contact1.emailPlaceholder")} />

                        <label>{t("contact1.phoneLabel")}</label>
                        <input type="tel" placeholder={t("contact1.phonePlaceholder")} />

                        <label>{t("contact1.messageLabel")}</label>
                        <textarea placeholder={t("contact1.messagePlaceholder")} rows="4"></textarea>

                        <button type="submit">{t("contact1.submitButton")}</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactForm;
