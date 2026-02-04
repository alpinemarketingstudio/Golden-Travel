import React from "react";
import nepalImg from "../../assets/nepal.jpg"; 
import indonesiaImg from "../../assets/indo.png"; 
import thailandImg from "../../assets/thailand.webp"; 
import "../../pagescss/goodtimes.css";

const Card = ({ image, title, description }) => (
  <div className="good-card">
    <div className="good-img-wrapper">
      <img src={image} alt={title} className="good-img" />
      <div className="good-overlay">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  </div>
);

export default function GoodTimes() {
  const cards = [
    {
      image: nepalImg,
      title: "Nepal",
      description: "Trek the Himalayas, explore vibrant culture, and discover serene mountain villages.",
    },
    {
      image: indonesiaImg,
      title: "Indonesia",
      description: "Experience tropical beaches, lush rice terraces, and rich island traditions.",
    },
    {
      image: thailandImg,
      title: "Thailand",
      description: "Relax on golden beaches, taste world-famous cuisine, and explore colorful markets.",
    },
  ];

  return (
    <section className="good-section">
      <h2 className="good-title">Get Inspired for Your Next Adventure</h2>
      <div className="good-grid">
        {cards.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </section>
  );
}
