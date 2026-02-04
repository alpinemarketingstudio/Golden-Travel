import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "../styles/aboutUs.css";
import OurPurpose from "./aboutus/ourpurpose";
import OurStory from "./aboutus/ourstory";
import Why from "./aboutus/why";
import Guides from "./aboutus/guides";
import GoodTimes from "./aboutus/goodtimes"; 
import Foot from "../pages/foot";

import heroImg from "../assets/mountain.jpg";

export default function AboutUs() {
  const handleClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {};
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="about-container">
      {/* ── Breadcrumb ───────────────────── */}
      <nav className="breadcrumb">
        <Link to="/">Home</Link> <span className="arrow">›</span> <span>About Us</span>
      </nav>

      {/* ── Hero Section ─────────────────── */}
      <div className="about-hero" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="hero-text">
          <h1 className="hero-heading">About Golden Leaf Travels</h1>
          <p className="hero-subtitle">Small Group Tours & Immersive Experiences</p>
        </div>
      </div>

      {/* ── Top Tabs Navigation ──────────── */}
      <nav className="top-tabs">
        <ul>
          {[
            ["purpose", "Our Purpose"],
            ["story", "Our Story"],
            ["why", "Why Golden Leaf"],
            ["guides", "Our Team"],
          ].map(([id, label]) => (
            <li key={id}>
              <button className="tab-button" onClick={() => handleClick(id)}>
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Description Section ─────────── */}
      <div className="tabs-description">
        
        <p>
          Golden Leaf Travels was born from a passion for authentic, meaningful travel. 
          Since our beginning, we’ve focused on small group tours that immerse travelers 
          in local cultures, landscapes, and stories — beyond the typical tourist highlights.
        </p>
        <p>
          We believe travel is about connection: with people, with nature, and with the essence 
          of a place. Every route we craft, every experience we offer, and every local partner 
          we collaborate with is chosen to ensure our travelers see and feel the true spirit of each destination.
        </p>
        <p>
          From remote villages in Nepal to vibrant markets in Southeast Asia, our journeys are designed 
          to create memories that last a lifetime — filled with discovery, curiosity, and joy. 
          With Golden Leaf, every trip is more than sightseeing; it’s a story you live and carry with you.
        </p>
      </div>

      {/* ── Connected Sections ────────────── */}
      <section id="purpose"><OurPurpose /></section>
      <section id="story"><OurStory /></section>
      <section id="why"><Why /></section>
      <section id="guides"><Guides /></section>
      <section id="good-times"><GoodTimes /></section>
      <section id="foot"><Foot /></section>
    </div>
  );
}
