import React from "react";
import guide1 from "../../assets/ayush.jpg";
import guide2 from "../../assets/dipesh.jpg";
import guide3 from "../../assets/saroj.jpg";
import guide4 from "../../assets/ritesh.jpg";
import "../../pagescss/guides.css";

const guidesData = [
  {
    img: guide1,
    name: "Ayush Lama",
    country: "Nepal",
    quote:
      "I love helping travelers discover hidden gems in Nepal, from mountain trails to local villages. Sharing my culture is my passion.",
  },
  {
    img: guide2,
    name: "Dipesh Thapa Magar",
    country: "Nepal",
    quote:
      "Travel is more than sightseeing; it’s about feeling the soul of a place. I guide travelers to experience Nepal authentically.",
  },
  {
    img: guide3,
    name: "Saroj Upreti",
    country: "Nepal",
    quote:
      "I enjoy creating meaningful connections between travelers and local communities, making every journey memorable.",
  },
  {
    img: guide4,
    name: "Ritesh Shah",
    country: "Nepal",
    quote:
      "Adventure and culture combined is my favorite. I guide visitors to explore Nepal’s landscapes and traditions responsibly.",
  },
];

const GuideCard = ({ guide }) => (
  <div className="guide-card">
    <div className="guide-img-wrapper">
      <img src={guide.img} alt={guide.name} className="guide-img" />
      <div className="guide-overlay">
        <h3>{guide.name}</h3>
        <p>{guide.country}</p>
      </div>
    </div>
    <div className="guide-content">
      <p>"{guide.quote}"</p>
    </div>
  </div>
);

export default function Guides() {
  return (
    <section className="guides-section">
      <h2 className="guides-title">Meet Our Guides</h2>
      <p className="guides-description">
        Our experienced guides are storytellers, culture‑sharers, and safety
        experts. They bring destinations to life while ensuring responsible travel.
      </p>

      <div className="guide-grid">
        {guidesData.map((guide, index) => (
          <GuideCard guide={guide} key={index} />
        ))}
      </div>
    </section>
  );
}
