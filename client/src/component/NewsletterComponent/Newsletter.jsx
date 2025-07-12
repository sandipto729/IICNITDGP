import { useForm } from "react-hook-form";
import React, { useState } from "react";
import styles from "./styles/newsletter.module.scss";
import API from "../../common/api";
import { toast } from "react-toastify";
import FormSubmitLoading from "../../layouts/FormSubmitLoading/Loading";

export default function ContactForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm();

    const [loading, setLoading] = useState(false);

    const onSubmit = (data) => {
        console.log("Form submitted:", data);
        setLoading(true);
        const response = fetch(API.EnquirySubmission.url, {
            method: API.EnquirySubmission.method,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        response
            .then((res) => {
                if (res.ok) {
                    toast.success("Enquiry submitted successfully!");
                    reset();
                } else {
                    toast.error("Failed to submit enquiry.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error("An error occurred while submitting the enquiry.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className={styles.newsletterContainer} id="contact">
            <div className={styles.newsletterTitle}>
                <div className={styles.head}>CONTACT <span
                    style={{
                        background: "var(--primary)",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                    }}
                >
                    US
                </span></div>
                <div className={styles.bottomLine}></div></div>
                
            <div className={styles.newsletterDescription}>
                <div className={styles.leftContainer}>
                    <form className={styles.contactForm} onSubmit={handleSubmit(onSubmit)}>

                        <div className={styles.formGroup}>
                            {/* <label>Name</label> */}
                            <input
                                {...register("name", { required: "Name is required" })}
                                placeholder="Your name"
                            />
                            {errors.name && <span>{errors.name.message}</span>}
                        </div>

                        <div className={styles.formGroup}>
                            {/* <label>Mobile Number</label> */}
                            <input
                                {...register("mobile", {
                                    required: "Mobile number is required",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Enter a valid 10-digit number",
                                    },
                                })}
                                placeholder="Mobile number"
                            />
                            {errors.mobile && <span>{errors.mobile.message}</span>}
                        </div>

                        <div className={styles.formGroup}>
                            {/* <label>Email</label> */}
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email address",
                                    },
                                })}
                                placeholder="Email address"
                            />
                            {errors.email && <span>{errors.email.message}</span>}
                        </div>

                        <div className={styles.formGroup}>
                            {/* <label>Message</label> */}
                            <textarea
                                {...register("message", { required: "Message is required" })}
                                placeholder="Your message"
                            />
                            {errors.message && <span>{errors.message.message}</span>}
                        </div>

                        {loading ? <FormSubmitLoading styles={{ display: "flex", justifyContent: "center" }} /> : <button type="submit" className={styles.submitButton} style={{ background: "var(--primary)" }}>Submit</button>}
                    </form>
                </div>
                <div className={styles.rightContainer}>

                </div>
            </div>

        </div>

    );
}
