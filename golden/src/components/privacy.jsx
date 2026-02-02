import React from "react";
import "../pagescss/privacyPolicy.css";
import people from "../assets/priv.jpg";

export default function PrivacyPolicyNew() {
  return (
    <div className="privacy-policy-new-page">
      {/* Hero Section */}
      <section className="hero-new">
        <div className="hero-overlay-new">
          <h1>Privacy & Policy</h1>
          <p>Your trust is our top priority. We ensure your data is safe.</p>
        </div>
        <img src={people} alt="Privacy Policy" className="hero-image-new" />
      </section>

      {/* Policy Content */}
      <section className="policy-section-new">
        <div className="policy-content-new">
          <h2>🔐 Privacy Policy for Golden Leaf Travels</h2>
          <p><strong>Effective Date:</strong> June 15, 2025</p>
          <p>
            <strong>Website:</strong> 
            <a href="https://www.goldenleaftravels.com"> https://www.goldenleaftravels.com</a>
          </p>

          <h3>1. Who We Are</h3>
          <p>
            Golden Leaf Travels is a travel-focused brand operating under Pleasure Services Travels and Tours Pvt. Ltd., a government-registered travel agency in Nepal. We specialize in marketing and promoting curated travel experiences in partnership with licensed travel operators.
          </p>
          <p>
            Our website address is: 
            <a href="https://www.goldenleaftravels.com"> https://www.goldenleaftravels.com</a>
          </p>

          <h3>2. What Personal Data We Collect and Why</h3>
          <p>We collect personal information from visitors for the following purposes:</p>

          <strong>a. Comments and Blog Interactions</strong>
          <ul>
            <li>The data shown in the comment form</li>
            <li>Your IP address</li>
            <li>Your browser’s user agent string (to detect spam)</li>
            <li>An anonymized hash of your email may be sent to Gravatar</li>
          </ul>

          <strong>b. Contact Forms & Booking Inquiries</strong>
          <ul>
            <li>Your name, email, phone number</li>
            <li>Country of residence</li>
            <li>Travel interests or preferences</li>
            <li>Dates of intended travel</li>
          </ul>
          <p>
            Why? To respond to your queries, prepare customized trip proposals, and connect you with our licensed travel partner, Pleasure Services Travels and Tours Pvt. Ltd., for booking.
          </p>

          <strong>c. Uploaded Media</strong>
          <p>If you upload images, do not include EXIF GPS data. Visitors can extract location data from website images.</p>

          <strong>d. Cookies</strong>
          <p>
            Cookies are used:
            <ul>
              <li>To remember your login (if applicable)</li>
              <li>To autofill comment or form fields</li>
              <li>To enhance site experience</li>
            </ul>
            See section below for full cookie usage details.
          </p>

          <strong>e. Embedded Content</strong>
          <p>
            Articles or pages may include embedded content (videos, articles, Google Maps, etc.). These third-party sites may collect data as if you visited their own site.
          </p>

          <h3>3. Cookies</h3>
          <ul>
            <li>Enhance user experience</li>
            <li>Track general site traffic (via tools like Google Analytics)</li>
            <li>Save comment form input (for your convenience)</li>
          </ul>
          <p>You can disable cookies in your browser settings.</p>

          <h3>4. Who We Share Your Data With</h3>
          <ul>
            <li>Pleasure Services Travels and Tours Pvt. Ltd., for travel service processing and invoicing</li>
            <li>Third-party service providers like web hosts, spam filters, and analytics tools</li>
          </ul>

          <h3>5. How Long We Retain Your Data</h3>
          <ul>
            <li>Comments and their metadata are stored indefinitely.</li>
            <li>Inquiry and booking form submissions are retained for up to 3 years for service and legal tracking.</li>
            <li>Registered users (if applicable) can edit or delete their own data.</li>
          </ul>

          <h3>6. What Rights You Have Over Your Data</h3>
          <ul>
            <li>Request a copy of your personal data</li>
            <li>Request we delete your data (except data we’re legally required to retain)</li>
          </ul>
          <p>
            To make such a request, contact us at: 
            <a href="mailto:info@goldenleaftravels.com"> 📧 info@goldenleaftravels.com</a>
          </p>

          <h3>7. Where Your Data Is Sent</h3>
          <p>
            Comment data may go through an automated spam detection service. Inquiry data may be shared internally with Pleasure Services Travels and Tours Pvt. Ltd., and not to any third-party advertiser.
          </p>

          <h3>8. Children’s Privacy</h3>
          <p>We do not knowingly collect personal data from anyone under the age of 16 without verified parental consent.</p>

          <h3>9. Data Security</h3>
          <ul>
            <li>SSL encryption</li>
            <li>Secure servers</li>
            <li>Limited admin access</li>
          </ul>
          <p>However, no internet transmission is 100% secure, so users share data at their own risk.</p>

          <h3>10. Contact Us</h3>
          <p>
            For any privacy-related inquiries or data access requests, please email us at: 
            <a href="mailto:info@goldenleaftravels.com"> 📧 info@goldenleaftravels.com</a>
          </p>

          <p><em>This Privacy Policy is subject to change. Last updated on June 15, 2025.</em></p>
        </div>
      </section>
    </div>
  );
}
