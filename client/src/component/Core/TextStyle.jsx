import React from "react";

const GradientText = ({ text, gradient }) => {
  return (
    <span
      style={{
        backgroundImage: gradient || "linear-gradient(to left, #ffbe0b, #f42b03)", // Default gradient
        //linear-gradient(260deg, rgba(255, 190, 11, 0.84) -29.7%, rgba(244, 43, 3, 0.84) 128.34%);
        backgroundClip: "text",
        WebkitBackgroundClip: "text", // Ensures compatibility with Safari
        color: "transparent",
        display: "inline-block",
      }}
    >
      {text}
    </span>
  );
};

export default GradientText;
