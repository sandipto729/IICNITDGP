import React, { useEffect, useState } from "react";
import styles from "./styles/Hero.module.scss";
import Carousel from "../../component/Carousel/Carousel";
import { AnimatedBox } from "../../assets/animation/AnimatedBox";
import api from '../../common/api';

const titles = [
  "Creativity.",
  "Progress.",
  "Vision.",
  "Teamwork.",
  "Connection.",
  "Change.",
  "Growth.",
  "Empowerment.",
  "Evolution.",
  "Ambition.",
  "Drive.",
];


function Hero() {
  const [currentTitle, setCurrentTitle] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [carouselImages, setCarouselImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch carousel images from backend
  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const response = await fetch(api.CarouselImageFetch.url, {
          method: api.CarouselImageFetch.method,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setCarouselImages(data);
      } catch (error) {
        console.error('Error fetching carousel images:', error);
        // Fallback to empty array if API fails
        setCarouselImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselImages();
  }, []);

  useEffect(() => {
    const title = titles[titleIndex];
    const typingSpeed = isDeleting ? 50 : 150;

    const interval = setInterval(() => {
      if (isDeleting) {
        setCurrentTitle(title.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setCurrentTitle(title.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }

      if (!isDeleting && charIndex === title.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTitleIndex((titleIndex + 1) % titles.length);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [charIndex, isDeleting, titleIndex]);

  return (
    <div className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.heroTextContainer}>
          <AnimatedBox direction="left">
            <div className={styles.largeContent}>
              <p>
                INSTITUTION'S INNOVATION COUNCIL
                <div className={styles.largeContent_naming}>Innovation &<span style={{
                  background: "var(--primary)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}> Incubation</span> Cell</div>
                <span
                  className={styles.dynamicText}
                  style={{
                    background: "var(--primary)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  <h3 className={styles.typing}>{currentTitle}</h3>
                </span>{" "}
              </p>
            </div>
            <div className={styles.smallContainer}>
              <div className={styles.smallContent}>

                <p>
                  Empowering{" "}
                  <span
                    style={{
                      background: "var(--primary)",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    visionaries
                  </span>{" "}
                  to cultivate excellence while guiding future generations toward sustainable growth and innovation.
                  <div><p>Motto <span style={{
                    background: "var(--primary)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}>Of </span>IIC : : 3I : <span style={{ color: "#FF8000" }}>Innovation</span> IPR <span style={{ color: "green" }}>Incubation</span>
                  </p></div>

                </p>

              </div>
            </div>
          </AnimatedBox>
        </div>
        <div className={styles.heroCarousel}>
          {!loading && <Carousel images={carouselImages} />}
        </div>
        <div className={styles.circle}></div>
      </div>
    </div>
  );
}

export default Hero;
