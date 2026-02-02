import React from "react";
import "../pagescss/terms.css";
import people from "../assets/priv.jpg";

export default function TermsOfUse() {
  return (
    <div className="terms-of-use-page">
      {/* Hero Section */}
      <section className="hero-terms">
        <div className="hero-overlay-terms">
           <h1>Terms of Use</h1>
          <p>Golden Leaf Travels</p>
        </div>
        <img src={people} alt="Terms of Use" className="hero-image-terms" />
      </section>

      {/* Terms Content */}
      <section className="terms-section">
        <div className="terms-content">
            <h1>🌐 Terms of Use – Golden Leaf Travels</h1>
          <p>Last Updated: June 15, 2025</p>
          <p>
            Welcome to the official website of Golden Leaf Travels. By accessing or using this website, you agree to comply with and be bound by the following terms and conditions.
          </p>

          <h3>1. About Us</h3>
          <p>
            Golden Leaf Travels is a travel-focused brand operating under the umbrella of Pleasure Services Travels and Tours Pvt. Ltd., a legally registered and licensed travel agency in Nepal. Golden Leaf functions as a marketing, promotion, and client engagement platform, while all legal travel services, bookings, invoicing, and operations are handled exclusively by Pleasure Services Travels and Tours Pvt. Ltd.
          </p>

          <h3>2. Legal Registration of Pleasure Services Travels and Tours Pvt. Ltd.</h3>
          <p>
            Pleasure Services Travels and Tours Pvt. Ltd. is duly registered and compliant with all government requirements for operating a travel agency in Nepal. The agency holds registrations with the following authorities:
          </p>
          <ul>
            <li>🏛️ Office of the Company Registrar (OCR), Government of Nepal – Registered as a private limited company under the Companies Act 2063 (2006)</li>
            <li>✈️ Department of Tourism (DoT), Ministry of Culture, Tourism and Civil Aviation – Licensed to operate travel and tour services under the Travel and Trekking Agency Rules 2062 (2005)</li>
            <li>💼 Department of Inland Revenue (Tax Office) – PAN and VAT registered under the Income Tax Act 2058 and Value Added Tax Act 2052</li>
            <li>🏘️ Local Ward Office / Municipality Office – For operational clearance and local tax compliance</li>
            <li>🌐 Nepal Tourism Board / TAAN Membership – For tourism industry code of conduct, networking, and international representation</li>
          </ul>
          <p>
            These registrations ensure that Pleasure Services Travels and Tours Pvt. Ltd. operates legally, meets national and international tourism standards, and adheres to regulatory guidelines set by the Government of Nepal.
          </p>

          <h3>3. Golden Leaf Travels Disclaimer</h3>
          <p>
            Golden Leaf Travels is not an independently licensed travel agency. It is a marketing and outreach brand of Pleasure Services Travels and Tours Pvt. Ltd.
          </p>
          <p>
            All legal travel operations are conducted by Pleasure Travels. Golden Leaf does not:
          </p>
          <ul>
            <li>Issue invoices or tickets directly</li>
            <li>Process payments in its own name</li>
            <li>Represent itself as a standalone licensed operator</li>
          </ul>
          <p>
            All customer transactions and travel responsibilities are assumed by Pleasure Services Travels and Tours Pvt. Ltd.
          </p>

          <h3>4. Bookings, Payments & Travel Services</h3>
          <p>
            Any and all bookings made through Golden Leaf Travels are:
          </p>
          <ul>
            <li>Received and confirmed by Pleasure Services Travels and Tours Pvt. Ltd.</li>
            <li>Invoiced and billed with PAN/VAT compliance by Pleasure Travels</li>
            <li>Governed by the terms and conditions of Pleasure Travels’ formal service agreement</li>
          </ul>
          <p>
            Golden Leaf’s role is to serve as a promotional and communication platform to share available packages and guide interested customers.
          </p>

          <h3>5. User Responsibilities</h3>
          <p>By using this site, you agree:</p>
          <ul>
            <li>That you understand Golden Leaf is a marketing division, and all legal travel services are handled by Pleasure Services Travels and Tours Pvt. Ltd.</li>
            <li>Not to hold Golden Leaf Travels liable for visa rejections, ticket issues, cancellations, flight delays, or service disruptions</li>
            <li>To verify all invoices, confirmations, and communications directly with Pleasure Travels</li>
          </ul>

          <h3>6. Privacy & Data Use</h3>
          <p>
            Golden Leaf Travels is committed to protecting your data. Any personal information you submit through this website will be:
          </p>
          <ul>
            <li>Used only for tour inquiries, quotations, follow-ups, and customer service</li>
            <li>Shared only with our licensed operator partner (Pleasure Travels) for legal processing</li>
            <li>Handled as per our published Privacy Policy, aligned with global data protection standards</li>
          </ul>
          <p>We do not sell, trade, or misuse your information.</p>

          <h3>7. Changes to Terms</h3>
          <p>
            We reserve the right to update, amend, or revise this Terms of Use document at any time. It is your responsibility to check this page periodically for updates.
          </p>

          <h3>8. Contact Us</h3>
          <p>
            For any legal, booking, partnership, or service inquiries, please contact us: <br/>
            <a href="mailto:info@goldenleaftravels.com">📧 info@goldenleaftravels.com</a>
          </p>
        </div>
      </section>
    </div>
  );
}
