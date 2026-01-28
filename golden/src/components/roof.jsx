import React from "react";
import { Link } from "react-router-dom";
import "../styles/roof.css";
import img2 from "../assets/img2.jpg";

export default function Roof() {
  return (
    <section className="roof-section">
      {/* Overlay for background effect */}
      <div className="roof-overlay" />

      <div className="roof-content">
        {/* Text section */}
        <div className="roof-text">
          <h2>Journey to the Roof of the World</h2>
          <p>
            Embark on extraordinary journeys<br /> 
            through Nepal’s awe-inspiring mountainscapes and untouched<br /> 
            trails, immersing yourself in the majesty of nature’s grandeur and 
            creating unforgettable memories.
          </p>

          {/* Link styled as button (no underline) */}
          <Link to="/destinations/Aboutus" className="roof-btn">
            See Details
          </Link>
        </div>

        {/* Image section */}
        <div className="roof-img-wrapper">
          <img src={img2} alt="Traveler" className="roof-img" />
        </div>
      </div>
    </section>
  );
}
