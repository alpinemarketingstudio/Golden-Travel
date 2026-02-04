import React from "react";
import "../pagescss/foot.css";
import worldPlaneIcon from "../assets/world-plane-icon.png";
import { useNavigate } from "react-router-dom";

export default function Foot() {
  const navigate = useNavigate();

  const handlePurposeClick = () => {
    // Navigate to /about and scroll to #purpose
    navigate("/aboutus#purpose");
  };

  return (
    <section className="purpose-container">
      {/* Icon */}
      <div className="purpose-icon">
        <img src={worldPlaneIcon} alt="World and Plane Icon" />
      </div>

      {/* Text */}
      <div className="purpose-text">
        <p className="purpose-subheading">
          Goldenleaf Travel — Small Group Adventures with a Meaningful Touch
        </p>

        <h2 className="purpose-heading">
          We design small group journeys that feel personal and leave a positive
          impact — on both the places we visit and the people we travel with.
        </h2>

        {/* Button to About Us page */}
        <button
          className="purpose-button"
          onClick={handlePurposeClick}
        >
          Our Purpose
        </button>
      </div>
    </section>
  );
}
