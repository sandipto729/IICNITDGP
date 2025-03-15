import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./styles/newsletter.module.scss";
import { toast } from "react-toastify";
import GradientText from "../Core/TextStyle";

const Newsletter = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        if (email === "") {
            toast.error("Please enter your email.");
        } else {
            toast.success("Subscribed successfully!");
            setEmail("");
        }
    };

    return (
        <div className={styles.newsletterContainer}>
            <h2 className={styles.newsletterTitle}>Subscribe to our <GradientText text={"Newsletter"}></GradientText></h2>
            <p className={styles.newsletterText}>Stay updated with the latest news and events.</p>

            <div className={styles.inputWrapper}>
                <motion.input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={styles.emailInput}
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: -30 }}
                    transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
                />

                <motion.button
                    onClick={handleSubscribe}
                    className={styles.subscribeButton}
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: -30 }}
                    transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
                >
                    Subscribe
                </motion.button>
            </div>
        </div>

    );
};

export default Newsletter;
