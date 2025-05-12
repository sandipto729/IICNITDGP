import React, { useEffect, useState } from "react";
import styles from "./styles/Hero.module.scss";
import CarouselImg from "../../data/Carousel.json";
import Carousel from "../../component/Carousel/Carousel";
import { AnimatedBox } from "../../assets/animation/AnimatedBox";

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
                Inspiring Progress with Bold and Imaginative Approaches{" "}
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
                {/* Empowering visionaries to cultivate excellence while guiding future generations toward sustainable growth and innovation.

 */}          <div>
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
                    <p>Motto of <span style={{
                    background: "var(--primary)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}>IIC </span>: : 3I : Innovation – IPR – Incubation</p>
                  </p>
                </div>

                {/* <div>
                  <p>Motto of <span style={{
                    background: "var(--primary)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}>IIC </span>: : 3I : Innovation – IPR – Incubation</p>
                </div> */}

              </div>
            </div>
          </AnimatedBox>
        </div>
        <div className={styles.heroCarousel}>
          <Carousel images={CarouselImg} />
        </div>
        <div className={styles.circle}></div>
      </div>
    </div>
  );
}

export default Hero;
