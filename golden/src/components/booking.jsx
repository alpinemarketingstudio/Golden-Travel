import React from "react";
import "../pagescss/privacyPolicy.css";
import heroImage from "../assets/priv.jpg"; 

export default function BookingsTerms() {
  return (
    <div className="privacy-policy-new-page">
      {/* Hero Section */}
      <section className="hero-new">
        <div className="hero-overlay-new">
          <h1>Bookings & Terms</h1>
          <p>Your booking safety and rights are our top priority.</p>
        </div>
        <img src={heroImage} alt="Bookings Hero" className="hero-image-new" />
      </section>

      {/* Booking Policy Content */}
      <section className="policy-section-new">
        <div className="policy-content-new">
          <h2>📄 Booking Terms & Conditions - GoldenLeaf Travels</h2>
          <p><strong>Effective Date:</strong> February 4, 2026</p>

          <h3>1. Booking Confirmation</h3>
          <p>
            All bookings must be made through our website or authorized representatives. A booking is confirmed only after full or partial payment as stated in the package details.
          </p>

          <h3>2. Payment Terms</h3>
          <ul>
            <li>Deposit: [Insert %] of total cost to confirm booking.</li>
            <li>Balance: Due [Insert number] days before departure.</li>
            <li>Payment methods: Credit/debit card, bank transfer, or other approved methods.</li>
          </ul>

          <h3>3. Cancellations & Refunds</h3>
          <p>
            <strong>By Customer:</strong><br/>
            [Insert number] days before departure → Full refund minus service fees.<br/>
            [Insert number] days before departure → 50% refund.<br/>
            Less than [Insert number] days → No refund.
          </p>
          <p>
            <strong>By GoldenLeaf Travels:</strong> In rare cases (natural disasters, strikes, security concerns), trips may be cancelled. Full refund or alternative dates will be offered.
          </p>

          <h3>4. Changes & Modifications</h3>
          <p>Modifications (dates, packages) may be requested subject to availability and additional charges. Minor changes may incur administrative fees.</p>

          <h3>5. Travel Documents & Requirements</h3>
          <p>Travelers are responsible for valid passports, visas, vaccinations, and insurance. Failure to carry proper documentation may result in denied travel, with no refund.</p>

          <h3>6. Travel Insurance</h3>
          <p>Travel insurance is strongly recommended for cancellations, medical emergencies, or unforeseen events.</p>

          <h3>7. Liability</h3>
          <p>GoldenLeaf Travels acts as an intermediary between travelers and service providers. Not liable for delays, cancellations, or losses caused by third-party providers. Travelers agree to follow safety guidelines and instructions from guides and operators.</p>

          <h3>8. Force Majeure</h3>
          <p>Not responsible for events beyond our control, such as natural disasters, political unrest, or pandemics. Alternative arrangements will be made wherever possible.</p>

          <h3>9. Governing Law</h3>
          <p>Booking conditions are governed by the laws of [Insert Country]. Disputes are resolved under the jurisdiction of [Insert Country].</p>

          <h3>10. Contact</h3>
          <p>
            For any booking-related inquiries, please email us at: 
            <a href="mailto:info@goldenleaftravels.com"> 📧 info@goldenleaftravels.com</a>
          </p>

          <p><em>This Booking Policy is subject to change. Last updated on February 4, 2026.</em></p>
        </div>
      </section>
    </div>
  );
}
