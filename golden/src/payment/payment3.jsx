import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { SiPaypal, SiCashapp, SiStripe } from "react-icons/si";
import "react-toastify/dist/ReactToastify.css";

import StepIndicator from "../components/StepIndicator";
import StripePayment from "./StripePayment";
import PayPalPayment from "./PayPalPayment";
import axiosInstance from "../utils/axiosInstance";
import "./payment3.css";

export default function Payment3() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Booking and extras
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [extras, setExtras] = useState({
    donation: false,
    addNights: false,
    roomOption: "",
    numTravellers: 1,
  });

  // Payment
  const [paying, setPaying] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  // Dropdown states
  const [showTrip, setShowTrip] = useState(false);
  const [showRooms, setShowRooms] = useState(false);

  // Terms
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedInfo, setAgreedInfo] = useState(false);
  const [optInEmails, setOptInEmails] = useState(false);

  // === Fetch booking and extras from backend ===
  useEffect(() => {
    async function fetchBooking() {
      try {
        const res = await axiosInstance.get(`/payments/bookings/${id}/`);
        const data = res.data;
        setBooking(data);

        setExtras({
          donation: data.donation || false,
          addNights: data.add_nights || false,
          roomOption: data.room_option || "",
          numTravellers: data.travellers || 1,
        });
      } catch (err) {
        setError("Failed to load booking.");
      } finally {
        setLoading(false);
      }
    }
    fetchBooking();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!booking) return <div>No booking found.</div>;

  const { travel_deal = {}, date_option = {} } = booking;

  // === Calculate costs ===
  const tripCost = parseFloat(date_option.discounted_price) || 0;
  const travellersCount = Number(extras.numTravellers) || 1;
  const roomCost = extras.roomOption === "private" ? 345 * travellersCount : 0;
  const donationCost = extras.donation ? 25 : 0;
  const amount = (tripCost + roomCost + donationCost).toFixed(2);

  // Enable payment only if required checkboxes are checked
  const canPay = agreedTerms && agreedInfo;

  // === PAYMENT CALLBACKS ===
  const handleManualPayment = async () => {
    if (!canPay) {
      toast.error("Please agree to all required terms before payment.");
      return;
    }
    setPaying(true);
    try {
      await axiosInstance.put(`/payments/bookings/${id}/update-payment/`, {
        payment_method: "manual",
        payment_amount: amount,
        transaction_id: null,
      });
      toast.success("Cash payment confirmed!");
      setTimeout(() => navigate(`/bookings/${id}?success=true`), 1500);
    } catch (err) {
      toast.error(
        "Payment failed: " + (err.response?.data?.detail || "Unknown error")
      );
    } finally {
      setPaying(false);
    }
  };

  const onStripeSuccess = async (chargeId) => {
    try {
      await axiosInstance.put(`/payments/bookings/${id}/update-payment/`, {
        payment_method: "stripe",
        payment_amount: amount,
        transaction_id: chargeId,
      });
      toast.success("Stripe payment confirmed!");
      setTimeout(() => navigate(`/bookings/${id}?success=true`), 1500);
    } catch (err) {
      toast.error(
        "Stripe update failed: " +
          (err.response?.data?.detail || "Unknown error")
      );
    }
  };

  const onPayPalSuccess = async (paypalTransactionId) => {
    try {
      await axiosInstance.put(`/payments/bookings/${id}/update-payment/`, {
        payment_method: "paypal",
        payment_amount: amount,
        transaction_id: paypalTransactionId,
      });
      toast.success("PayPal payment confirmed!");
      setTimeout(() => navigate(`/bookings/${id}?success=true`), 1500);
    } catch (err) {
      toast.error(
        "PayPal update failed: " +
          (err.response?.data?.detail || "Unknown error")
      );
    }
  };

  const paymentOptions = [
    { id: "cash", label: "Cash", icon: <SiCashapp size={28} /> },
    { id: "paypal", label: "PayPal", icon: <SiPaypal size={28} /> },
    { id: "stripe", label: "Stripe", icon: <SiStripe size={28} /> },
  ];

  return (
    <div className="payment3-container">
      <StepIndicator
        current={2}
        steps={["Your details", "Trip extras", "Payment"]}
      />
      <h2 className="payment-title">Payment</h2>

      <div className="payment-main">
        {/* LEFT */}
        <div className="payment-left">
          <div className="review-box">
            Have you reviewed the details in the booking summary? If something
            isn’t correct, you can adjust your details in the previous steps.
          </div>

          <h3 className="section-heading">Terms and Agreements</h3>
          <div className="terms-checkboxes">
            <label className="terms-checkbox-label">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
              />
              <span>
                I agree to the{" "}
                <Link to="/terms">terms and conditions</Link> and{" "}
                <Link to="/privacy">privacy policy</Link>.
                <span className="required">*</span>
              </span>
            </label>

            <label className="terms-checkbox-label">
              <input
                type="checkbox"
                checked={agreedInfo}
                onChange={(e) => setAgreedInfo(e.target.checked)}
              />
              <span>
                I have read the <Link to="/terms">Essential Trip Information</Link>{" "}
                and will follow community guidelines.
                <span className="required">*</span>
              </span>
            </label>

            <label className="terms-checkbox-label">
              <input
                type="checkbox"
                checked={optInEmails}
                onChange={(e) => setOptInEmails(e.target.checked)}
              />
              <span>
                I would like to receive offers and regular updates from Intrepid
                Travel via email.
              </span>
            </label>
          </div>

          <h3 className="section-heading" style={{ marginTop: "1.5rem" }}>
            Payment options
          </h3>
          <div
            className="payment-options-row"
            style={{
              pointerEvents: canPay ? "auto" : "none",
              opacity: canPay ? 1 : 0.6,
              userSelect: canPay ? "auto" : "none",
            }}
          >
            {paymentOptions.map((opt) => (
              <button
                key={opt.id}
                className={`payment-option-btn ${
                  paymentMethod === opt.id ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod(opt.id)}
                type="button"
              >
                {opt.icon} {opt.label}
              </button>
            ))}
          </div>

          <h3 className="section-heading">Payment details</h3>
          {!canPay && (
            <div style={{ color: "red", marginBottom: "1rem" }}>
              Please agree to all required terms to proceed with payment.
            </div>
          )}

          {paymentMethod === "cash" && (
            <>
              <p>Please pay cash on arrival.</p>
              <button
                className="btn-cash"
                onClick={handleManualPayment}
                disabled={paying || !canPay}
                aria-disabled={paying || !canPay}
              >
                <span role="img" aria-label="cash">
                  💵
                </span>{" "}
                {paying ? "Processing..." : "Confirm Cash Payment"}
              </button>
            </>
          )}

          {paymentMethod === "stripe" && canPay && (
            <StripePayment
              amount={amount}
              onSuccess={onStripeSuccess}
              onError={(msg) => toast.error(msg)}
            />
          )}

          {paymentMethod === "paypal" && canPay && (
            <PayPalPayment
              amount={amount}
              onSuccess={onPayPalSuccess}
              onError={(msg) => toast.error(msg)}
            />
          )}
        </div>

        {/* RIGHT */}
        <div className="booking-summary">
          <h3>Booking summary</h3>
          <div className="trip-name">{travel_deal.title || "Trip Name"}</div>
          <div className="duration">
            {travel_deal.days ? `${travel_deal.days} days` : ""}
          </div>

          <div className="details">
            <p>
              <strong>Start</strong>
              <br />
              {date_option.start_date
                ? new Date(date_option.start_date).toLocaleDateString()
                : "N/A"}{" "}
              <br />
              {travel_deal.start_location || ""}
            </p>
            <p>
              <strong>Finish</strong>
              <br />
              {date_option.end_date
                ? new Date(date_option.end_date).toLocaleDateString()
                : "N/A"}{" "}
              <br />
              {travel_deal.end_location || ""}
            </p>
          </div>

          <div
            className="summary-dropdown"
            onClick={() => setShowTrip(!showTrip)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setShowTrip(!showTrip)}
          >
            <span>Trip</span>
            <span>{showTrip ? "▲" : "▼"}</span>
          </div>
          {showTrip && <div className="dropdown-content">Trip amount: USD ${tripCost.toFixed(2)}</div>}

          {extras.donation && (
            <div className="dropdown-content">Donation +25.00</div>
          )}

          <div className="total breakdown">
            <div>Total</div>
            <div>USD ${amount}</div>
          </div>

          <div className="final-total pay-now">
            <span>Pay now</span>
            <strong>USD ${amount}</strong>
          </div>
        </div>
      </div>

      {/* Info Boxes */}
      <div className="info-boxes">
        <div>
          <strong>💳 Paying deposit?</strong>
          <p>
            Pay the rest of your payments later as you like. We’ll remind you
            before full payment is due.
          </p>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="form-actions">
        <button className="btn-back" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
}
