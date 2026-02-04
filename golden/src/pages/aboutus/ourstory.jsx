import React from "react";
import { Link } from "react-router-dom";
import "../../pagescss/ourstory.css";
import travelImage from "../../assets/solotraveler.jpg"; 
export default function OurStory() {
  return (
    <section className="our-story-section">
      <div className="our-story-title">
        <h2>Our Story</h2>
        <div className="underline" />
      </div>

      <div className="our-story-content">
        <div className="image-side">
          <img src={travelImage} alt="Traveler exploring mountains" />
        </div>
        <div className="text-side">
          <p>
            In 2014, driven by curiosity and a thirst for authentic experiences, a solo traveler set 
            foot into the Himalayan borderlands of Nepal and Northern India. Not chasing luxury or 
            social media-worthy spots, they sought the stories, smells, and sounds of life lived 
            fully in remote villages, bustling bazaars, and quiet homes where locals welcomed strangers 
            with smiles and shared meals.
          </p>
          <p>
            These journeys revealed a simple truth: travel is richest not when ticking destinations off a 
            list, but when slowing down to truly connect—with people, culture, and the rhythm of life 
            far from crowded trails.
          </p>
          <p>
            One night, under a starlit sky in a small mountain settlement, while sharing a humble meal 
            and heartfelt laughter with a local family, an idea sparked. Goldenleaf Travel was born 
            from a vision: to create journeys that honor both the traveler’s curiosity and the 
            communities that make these stories possible, crafting experiences that linger long after 
            the trip ends.
          </p>

          <button className="read-more-btn">Read More About Our Journey</button>
        </div>
      </div>
    </section>
  );
}
