import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Button from './../../../component/Core/Button';
import styles from "./styles/sponsor.module.scss";
import sponsors from "./../../../../public/data/ai2sponsors.json";
import Card from "./Card";

const Sponsor = () => {

  return (
    <div className={styles.Wrapper}>
      <div className={styles.heading}>
        <p className={styles.head}>
          Our {" "}
          <span
            style={{
              background: "var(--primary)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Collaborators
          </span>{" "}
        </p>
        {/*<div className={styles.bottomLine}></div>*/}
      </div>
      {/*<Swiper
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
        {sponsors.map((sponsor, index) => (
          <SwiperSlide key={index}>
            <a href={sponsor.link} target="_blank" rel="nooperner noreferrer" className={styles.sponsorLink}>
              <div className={styles.card}>
                <img src={sponsor.img} alt={sponsor.name} className={styles.image} />
                <h3 className={styles.name} href={sponsor.link}>{sponsor.name}</h3>
                <h4 className={styles.type}>{sponsor.type} Sponsorship Partner</h4>
              </div>
            </a>
          </SwiperSlide>
        ))}
        </Swiper>*/}

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
        {sponsors.map((sponsor, index) => (
          <SwiperSlide key={index}>
            <Card img={sponsor.img} link={sponsor.link} />
          </SwiperSlide>
        ))}
        </Swiper>


      {/*<div className={styles.SponsorshipContainer}>
        <div>Want to view tentative Schedule</div>
        <Button className={styles.readMoreBtn} style={{
          background: "var(--primary)",
          border: "none",
        }}>View Tentative Schedule</Button>
      </div>*/}
    </div>
  );
};

export default Sponsor;