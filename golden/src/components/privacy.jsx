import React from "react";
import "../pagescss/privacyPolicy.css";
import img2 from "../assets/img2.jpg";
import { FaUserShield, FaLock, FaCookieBite, FaRegLightbulb, FaEnvelope } from "react-icons/fa";

export default function PrivacyPolicy() {
  return (
    <div className="privacy-policy-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Privacy & Policy</h1>
          <p>Your trust is our top priority. We ensure your data is safe.</p>
        </div>
        <img src={img2} alt="Privacy" className="hero-image" />
      </section>

      {/* Policy Sections */}
      <section className="policy-section">
        {/* 1. Information We Collect */}
        <div className="policy-container">
          <div className="policy-icon"><FaUserShield size={50} color="#ff7f50" /></div>
          <div className="policy-text">
            <h2>1. Information We Collect</h2>
            <p>
              We collect personal information when you make a purchase, sign up for
              newsletters, or interact with our site. This includes your name,
              email, address, and payment details.
            </p>
          </div>
        </div>

        {/* 2. How We Use Your Information */}
        <div className="policy-container reverse">
          <div className="policy-icon"><FaRegLightbulb size={50} color="#1e90ff" /></div>
          <div className="policy-text">
            <h2>2. How We Use Your Information</h2>
            <p>
              Your information helps us provide a personalized shopping experience,
              process orders, and improve our services. We never sell your personal
              data to third parties.
            </p>
          </div>
        </div>

        {/* 3. Cookies & Tracking */}
        <div className="policy-container">
          <div className="policy-icon"><FaCookieBite size={50} color="#f4a261" /></div>
          <div className="policy-text">
            <h2>3. Cookies & Tracking</h2>
            <p>
              Our website uses cookies to enhance your browsing experience, track
              preferences, and analyze traffic. You can manage cookies in your
              browser settings.
            </p>
          </div>
        </div>

        {/* 4. Data Security */}
        <div className="policy-container reverse">
          <div className="policy-icon"><FaLock size={50} color="#2a9d8f" /></div>
          <div className="policy-text">
            <h2>4. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your
              data. All sensitive information is encrypted and securely stored.
            </p>
          </div>
        </div>

        {/* 5. Your Rights */}
        <div className="policy-container">
          <div className="policy-icon"><FaRegLightbulb size={50} color="#e76f51" /></div>
          <div className="policy-text">
            <h2>5. Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal data.
              Contact our support team for any privacy-related requests.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="policy-container">
          <div className="policy-icon"><FaEnvelope size={50} color="#0077b6" /></div>
          <div className="policy-text full-width">
            <h2>Contact Us</h2>
            <p>
              For any questions about our privacy practices, please email us at
              <a href="mailto:support@example.com"> support@example.com</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
