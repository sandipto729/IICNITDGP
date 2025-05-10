import { useForm } from "react-hook-form";
import styles from "./styles/newsletter.module.scss";

export default function ContactForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Form submitted:", data);
    };

    return (
        <div className={styles.newsletterContainer}>
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

                        <button type="submit" className={styles.submitButton} style={{background: "var(--primary)"}}>Submit</button>
                    </form>
                </div>
                <div className={styles.rightContainer}>
                    <img
                        src="https://i.ibb.co/fGXhCRrg/confident-3d-male-character-with-crossed-arms-free-png.png"
                        alt="Newsletter"
                        className={styles.newsletterImage}
                    />
                </div>
            </div>

        </div>

    );
}
