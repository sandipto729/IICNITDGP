import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./styles/Testimonial.module.scss";
import TestimonialCard from "../../component/TestimonialCard/Card";

const testimonialData = [
    {
        description: "This is a great platform for learning and growth.",
        name: "John Doe",
        degree: "Software Engineer",
    },
    {
        description: "I had an amazing experience with the team.",
        name: "Jane Smith",
        degree: "Product Manager",
    },
    {
        description: "The community is very supportive and helpful.",
        name: "Alice Johnson",
        degree: "UX Designer",
    },
    {
        description: "Helped me land my dream job with confidence.",
        name: "Raj Patel",
        degree: "Data Scientist",
    },
    {
        description: "The resources and mentorship are top-notch.",
        name: "Sara Khan",
        degree: "Frontend Developer",
    },
];

const Testimonial = () => {
    return (
        <div className={styles.testimonialWrapper}>
            <div className={styles.heading}>
                <p className={styles.head}>
                    What Our{" "}
                    <span
                        style={{
                            background: "var(--primary)",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                        }}
                    >
                        Alumni
                    </span>{" "}
                    Say
                </p>
                <div className={styles.bottomLine}></div>
            </div>
            <Swiper
                modules={[Autoplay, Pagination]}
                loop={true}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                spaceBetween={30}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
                className={styles.swiper}
            >
                {testimonialData.map((testimonial, index) => (
                    <SwiperSlide key={index}>
                        <TestimonialCard {...testimonial} />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* <div className={styles.circle}></div> */}
        </div>
    );
};

export default Testimonial;
