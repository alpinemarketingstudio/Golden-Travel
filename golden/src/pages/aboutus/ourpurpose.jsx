import React from "react";
import "../../pagescss/ourpurpose.css";
import bali from "../../assets/mount1.jpg";
import img2 from "../../assets/lake1.avif";

export default function OurPurpose() {
  return (
    <div className="op-section" id="purpose">
      <div className="op-header">
        <h2 className="op-title">Our Purpose</h2>
        <div className="op-underline" />
      </div>

      {/* First Row: Text Left, Image Right */}
      <div className="op-row op-reverse">
        <div className="op-text-block">
          <h3 className="op-subheading">
            Connecting Travelers and Cultures
          </h3>
          <p>
            At Goldenleaf Travel, we believe travel should do more than just show you new places. 
            It should connect you with people, culture, and stories that make every journey unforgettable.
          </p>
          <p>
            We create experiences that are thoughtful and responsible, helping travelers explore 
            both well-known and hidden destinations while respecting the communities and environments they visit.
          </p>
          <p>
            From quiet villages to bustling cities, we aim to take you beyond the usual tourist path, 
            so you can experience the true heart of every place you visit.
          </p>
        </div>
        <div className="op-img-block">
          <img src={bali} alt="Terraced Fields" />
        </div>
      </div>

      {/* Second Row: Image Left, Text Right */}
      <div className="op-row">
        <div className="op-img-block">
          <img src={img2} alt="Cultural Experience" />
        </div>
        <div className="op-text-block">
          <h3 className="op-subheading">
            Experiences That Leave a Lasting Impact
          </h3>
          <p>
            Our travelers often tell us they are surprised by how welcoming locals are, 
            how rich the culture feels, and how memorable even simple experiences can be. 
            Seeing places for yourself often changes the stories you thought you knew.
          </p>
          <p>
            As our Senior Travel Consultant Ayush says:
            <br />
            <em>
              “Some destinations might seem unfamiliar at first, but our guests always leave with stories, 
              friendships, and memories that last a lifetime.”
            </em>
          </p>
          <p>
            At Goldenleaf, we don’t just plan trips — we craft experiences that leave a lasting impact 
            on both travelers and the places they visit.
          </p>
        </div>
      </div>
    </div>
  );
}
