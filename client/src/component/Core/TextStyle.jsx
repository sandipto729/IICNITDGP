import React from "react";

const GradientText = ({ text, gradient }) => {
  return (
    <span
      style={{
        backgroundImage: gradient || "linear-gradient(to right, #4facfe,rgb(81,99,150))", // Default gradient
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
