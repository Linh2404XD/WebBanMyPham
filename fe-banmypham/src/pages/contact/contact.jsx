import React from 'react';
import styles from './Contact.module.css';
import Header from '../../components/header.jsx';
import Footer from '../../components/footer.jsx';

const ContactForm = () => {
    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.info}>
                    <h2>Contact Information</h2>
                    <p>Fill up the form and our team will get back to you within 24 hours</p>
                    <p>📞 +233543201893</p>
                    <p>📧 2122221110@gmail.com</p>
                </div>

                <div className={styles.form}>
                    <h1>Contact US</h1>
                    <p>Any Question or remarks? Just write us a message</p>

                    <form>
                        <label>Name</label>
                        <input type="text" placeholder="Allen Jones" />

                        <label>Email</label>
                        <input type="email" placeholder="aljay126@gmail.com" />

                        <label>Phone</label>
                        <input type="tel" placeholder="+233546227893" />

                        <label>Message</label>
                        <textarea placeholder="Write your message" rows="4"></textarea>

                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactForm;
