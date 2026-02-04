import React from "react";
import card1 from "../../assets/mountain.jpg";
import card2 from "../../assets/priv.jpg";
import card3 from "../../assets/kumari.jpg";
import card4 from "../../assets/card4.jpg";
import "../../pagescss/why.css";

const cardsData = [
  {
    img: card1,
    title: "Deeper travel experiences",
    desc:
      "Travel beyond sightseeing and truly connect with places. Slow moments, meaningful encounters, and journeys that stay with you long after you return.",
  },
  {
    img: card2,
    title: "Journeys across countries",
    desc:
      "Move seamlessly from one country to another, experiencing changing landscapes, flavors, and stories — all thoughtfully woven into one unforgettable journey.",
  },
  {
    img: card3,
    title: "Culture & everyday life",
    desc:
      "Experience how people live, celebrate, and connect. From social traditions to daily rhythms, discover cultures through genuine human interaction.",
  },
  {
    img: card4,
    title: "Stories carved through time",
    desc:
      "Explore places shaped by centuries of craftsmanship, design, and belief — where history lives on through art, architecture, and enduring traditions.",
  },
];


const Card = ({ img, title, desc }) => (
  <div className="why-card">
    <div className="why-img-wrapper">
      <img src={img} alt={title} className="why-img" />
    </div>
    <div className="why-content">
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  </div>
);

export default function WhyGoldenLeaf() {
  return (
    <section className="why-section">
      <h2 className="why-title">Why Golden Leaf?</h2>
      <div className="why-underline"></div>

      <div className="why-grid">
        {cardsData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </section>
  );
}
