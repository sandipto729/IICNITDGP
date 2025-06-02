import React, { useEffect, useState } from 'react';
import styles from './styles/Events.module.scss';
import Button from '../Core/Button';
import { Blurhash } from "react-blurhash";
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import API from '../../common/api';
import FormSubmitLoading from '../../layouts/FormSubmitLoading/Loading';

const Idea = () => {
    const [showModal, setShowModal] = useState(false);
    // useEffect(()=>{
    //     console.log('date',date)
    // },[])

    // Toggle modal visibility
    const handleReadMore = () => {
        setShowModal(!showModal)
    };
    const [loading, setLoading] = useState(false);

    const stripHtml = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };


    const [imageLoaded, setImageLoaded] = useState(false);


    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log("Form submitted:", data);
        setLoading(true);
        try {
            const response = await fetch(API.EventRegistration.url, {
                method: API.EventRegistration.method,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success("Registration successful!");
                reset(); 
                setShowModal(false);
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || "Failed to register.");
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
            console.error("Submission error:", err);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className={styles.EventCard}>
            {/* <img src={image} alt={title} className={styles.IdeaCardImage} /> */}

            <div className={styles.IdeaCardContent}>
                <div>A great opportunity to learn, build, and grow with real-world AI projects—guided by industry experts and powered by cutting-edge tools.
                    No registration charges, no hidden fees—this entire internship is completely free.</div>

                <Button className={styles.readMoreBtn} onClick={handleReadMore} style={{
                    background: "var(--primary)",
                    border: "none",
                }}>Apply Now</Button>
            </div>

            {/* Modal for full Idea/blog content */}
            {showModal && (
                <div className={styles.modalOverlay} onClick={handleReadMore}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.ideaFormContainer}>
                            <h1 className={styles.formTitle}>Student <span style={{
                                background: "var(--primary)",
                                WebkitBackgroundClip: "text",
                                color: "transparent",
                            }}>Internship Enrollment</span> – IIC x Talent Hub</h1>
                            <form onSubmit={handleSubmit(onSubmit)} className={styles.ideaForm}>

                                <div className={styles.formGroup}>
                                    <label>Full Name *</label>
                                    <input {...register("fullName", { required: true })} />
                                    {errors.fullName && <p className={styles.error}>This field is required</p>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Institute E-Mail (must end with nitdgp.ac.in) *</label>
                                    <input
                                        type="email"
                                        {...register("email", {
                                            required: true,
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)*nitdgp\.ac\.in$/,
                                                message: "Please enter a valid NIT Durgapur email"
                                            }
                                        })}
                                    />
                                    {errors.email && <p className={styles.error}>{errors.email.message || "This field is required"}</p>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Phone Number *</label>
                                    <input
                                        type="tel"
                                        {...register("phone", {
                                            required: "This field is required",
                                            pattern: {
                                                value: /^[0-9]{10}$/,
                                                message: "Phone number must be exactly 10 digits"
                                            }
                                        })}
                                    />
                                    {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
                                </div>


                                <div className={styles.formGroup}>
                                    <label>Roll Number *</label>
                                    <input {...register("rollNumber", { required: true })} />
                                    {errors.rollNumber && <p className={styles.error}>This field is required</p>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Registration Number *</label>
                                    <input {...register("registrationNumber", { required: true })} />
                                    {errors.registrationNumber && <p className={styles.error}>This field is required</p>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Department *</label>
                                    <input {...register("department", { required: true })} />
                                    {errors.department && <p className={styles.error}>This field is required</p>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Year *</label>
                                    <select {...register("year", { required: true })}>
                                        <option value="">Select Year</option>
                                        <option value="1st">1st Year</option>
                                        <option value="2nd">2nd Year</option>
                                        <option value="3rd">3rd Year</option>
                                        <option value="4th">4th Year</option>
                                    </select>
                                    {errors.year && <p className={styles.error}>This field is required</p>}
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Course *</label>
                                    <select {...register("course", { required: true })}>
                                        <option value="">Select Course</option>
                                        <option value="B.Tech">B.Tech</option>
                                        <option value="M.Tech">M.Tech</option>
                                        <option value="PhD">PhD</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {errors.course && <p className={styles.error}>This field is required</p>}
                                </div>

                                {loading ? (
                                    <FormSubmitLoading />
                                ) : (
                                    <button
                                        type="submit"
                                        className={styles.submitBtn}
                                        style={{ background: "var(--primary)" }}
                                    >
                                        Submit
                                    </button>
                                )}
                            </form>

                        </div>

                        <button className={styles.closeBtn} onClick={handleReadMore}>X</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Idea;

