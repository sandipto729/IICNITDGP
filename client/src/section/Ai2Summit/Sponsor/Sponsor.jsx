import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Button from './../../../component/Core/Button';
import styles from "./styles/sponsor.module.scss";
import sponsors from "./../../../../public/data/ai2sponsors.json";
import Card from "./Card";

const Sponsor = () => {
  const paginationRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // Trigger re-render after the ref is mounted
  useEffect(() => {
    if (paginationRef.current) {
      setIsReady(true);
    }
  }, []);

  return (
    <div className={styles.Wrapper}>
      <div className={styles.heading}>
        <p className={styles.head}>
          Our{" "}
          <span
            style={{
              background: "var(--primary)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Collaborators
          </span>
        </p>
      </div>

      {isReady && (
        <Swiper
          modules={[Autoplay, Pagination]}
          loop={true}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true, el: paginationRef.current }}
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className={styles.swiper}
        >
          {sponsors.map((sponsor, index) => (
            <SwiperSlide key={index}>
              <Card img={sponsor.img} link={sponsor.link} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div ref={paginationRef} className={styles.customPagination}></div>
    </div>
  );
};

export default Sponsor;
