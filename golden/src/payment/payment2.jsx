import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import StepIndicator from "../components/StepIndicator";
import "../payment/payment2.css";
import { FaHeart, FaBed } from "react-icons/fa";

export default function Payment2() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [addNights, setAddNights] = useState(false);
  const [donation, setDonation] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    async function fetchBooking() {
      try {
        setLoading(true);
        setError(null);
        const resp = await axiosInstance.get(`/payments/bookings/${id}/`);
        setBooking(resp.data);
        setAddNights(resp.data.add_nights || false);
        setDonation(resp.data.donation || false);
      } catch (err) {
        setError("Failed to load booking data.");
      } finally {
        setLoading(false);
      }
    }
    fetchBooking();
  }, [id]);

  const handleContinue = async () => {
    try {
      const updateData = {
        add_nights: addNights,
        donation: donation,
      };

      await axiosInstance.patch(`/payments/bookings/${id}/update/`, updateData);

      navigate(`/payment/payment3/${id}`, {
        state: { addNights, donation },
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(
        `Failed to save your extras: ${
          err.response?.data?.error || JSON.stringify(err.response?.data) || "Please try again."
        }`
      );
    }
  };

  if (loading) return <div>Loading booking details...</div>;
  if (error)
    return (
      <div style={{ color: "red" }} role="alert">
        {error}
      </div>
    );
  if (!booking) return <div>No booking found.</div>;

  const travelDeal = booking?.travel_deal || {};
  const dateOption = booking?.date_option || {};
  const numTravellers = booking?.travellers || 1;

  const tripCost = parseFloat(dateOption.discounted_price) || 0;
  const donationCost = donation ? 25 : 0;
  const totalCost = (tripCost + donationCost).toFixed(2);

  return (
    <div className="payment-container">
      <StepIndicator current={1} steps={["Your details", "Trip extras", "Payment"]} />

      <h2 className="trip-title">Trip Extras</h2>

      <div className="payment-grid">
        {/* LEFT COLUMN: Extras */}
        <div className="left-column">
          {/* Extra Night Box */}
          <div className="extra-night-box">
            <div className="box-header">
              <FaBed className="box-icon" />
              <h3>Add Extra Nights</h3>
            </div>
            <p className="box-desc">
              Stay an extra night at your hotel and enjoy a more relaxed experience.
            </p>
            <div className="checkbox-row">
              <label className="extra-night-label">
                <input
                  type="checkbox"
                  checked={addNights}
                  onChange={(e) => setAddNights(e.target.checked)}
                />
                Add extra night
              </label>
            </div>
          </div>

          {/* Support Community / Donation Box */}
          <div className="support-box">
            <div className="box-header">
              <FaHeart className="box-icon heart-icon" />
              <h3>Support our Communities</h3>
            </div>
            <p className="box-desc">
              Your support helps local communities thrive. Add $25 donation.
            </p>
            <div className="checkbox-row">
              <label className="donation-label">
                <input
                  type="checkbox"
                  checked={donation}
                  onChange={(e) => setDonation(e.target.checked)}
                />
                Yes, add $25 donation
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Booking Summary */}
        <div className="right-column">
          <div className="booking-summary">
            <h3>Booking Summary</h3>
            <div className="trip-name">{travelDeal.title || "Trip name"}</div>
            <div className="duration">{travelDeal.days ? `${travelDeal.days} days` : ""}</div>
            <div className="details">
              <p>
                <strong>Start</strong>
                <br />
                {dateOption.start_date
                  ? new Date(dateOption.start_date).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>
                <strong>Finish</strong>
                <br />
                {dateOption.end_date
                  ? new Date(dateOption.end_date).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <div className="total">
              <span>Trip cost</span>
              <span>${tripCost.toFixed(2)}</span>
            </div>


            {donation && (
              <div className="total">
                <span>Donation</span>
                <span>+ $25</span>
              </div>
            )}

            <hr />

            <div className="total">
              <strong>Total Payment</strong>
              <strong>${totalCost}</strong>
            </div>

            {/* Coupon Code below Total */}
            <div className="coupon-box">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button type="button" onClick={() => alert("Coupon applied!")}>
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="nav-buttons">
        <button className="back-btn" type="button" onClick={() => navigate(-1)}>
          Back
        </button>
        <button className="continue-btn" type="button" disabled={loading} onClick={handleContinue}>
          Continue →
        </button>
      </div>
    </div>
  );
}
