import React, { useEffect, useState } from "react";
import {
  FaStar,
  FaUserFriends,
  FaMapSigns,
  FaGlobe,
  FaUsers,
  FaLanguage,
  FaFileDownload,
  FaPhoneAlt,
  FaHeart,
  FaArrowLeft,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import "../../pagescss/desc.css";

export default function Desc({ data, onViewDatesClick }) {
  const rating = data.average_rating || 0;
  const navigate = useNavigate();
  const [wishId, setWishId] = useState(null);
  const [loadingWish, setLoadingWish] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token || !data.id) return;

    axiosInstance
      .get("/destinations/wishlist/")
      .then((res) => {
        const match = res.data.results.find((item) => item.deal === data.id);
        setWishId(match ? match.id : null);
      })
      .catch(() => setWishId(null));
  }, [data.id]);

  const handleWishlist = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
      return;
    }

    setLoadingWish(true);
    try {
      if (wishId) {
        await axiosInstance.delete(`/destinations/wishlist/${wishId}/`);
        setWishId(null);
      } else {
        const res = await axiosInstance.post("/destinations/wishlist/", {
          deal: data.id,
        });
        setWishId(res.data.id);
      }
    } catch {
      alert("Failed to update wishlist. Please try again.");
    } finally {
      setLoadingWish(false);
    }
  };

  const renderStars = (rating) => {
    const filledStars = Math.round(rating);
    return (
      <>
        {[...Array(5)].map((_, i) =>
          i < filledStars ? (
            <FaStar key={i} className="star filled" />
          ) : (
            <FaStar key={i} className="star empty" />
          )
        )}
      </>
    );
  };

  const scrollToReviewSection = () => {
    const reviewSection = document.getElementById("review-section");
    if (reviewSection) reviewSection.scrollIntoView({ behavior: "smooth" });
  };

  // Modal handlers
  const openModal = (index) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const nextImage = () =>
    setModalIndex((prev) => (prev + 1) % (data.gallery?.length || 1));

  const prevImage = () =>
    setModalIndex(
      (prev) => (prev - 1 + (data.gallery?.length || 1)) % (data.gallery?.length || 1)
    );

  // -----------------------------
  // Download PDF Brochure as link
  // -----------------------------
  const handleDownloadBrochure = () => {
    axiosInstance
      .get(
        `/destinations/countries/${data.country.slug}/travel-deals/${data.slug}/brochure/`,
        { responseType: "blob" }
      )
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${data.title}-brochure.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch(() => {
        alert("Failed to download brochure.");
      });
  };

  return (
    <section className="trip-section">
      <div className="trip-header">
        <h1>{data.title}</h1>
        <p>
          <strong>{data.days} days</strong>
          <div className="rating-row">
            {renderStars(rating)}
            <span
              className="review-count"
              onClick={scrollToReviewSection}
            >
              {rating.toFixed(1)} ({data.review_count || 0} reviews)
            </span>
          </div>
          · {data.country?.name || "Unknown"}
        </p>
      </div>

      <div className="trip-content">
        {/* Gallery */}
        <div className="trip-gallery">
          <div className="top-gallery">
            {data.gallery?.slice(0, 2).map((img, i) => (
              <img
                key={i}
                src={img.image}
                alt={`${data.title} ${i + 1}`}
                onClick={() => openModal(i)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
          <div className="bottom-imgs">
            {data.gallery?.slice(2, 5).map((img, i) => (
              <img
                key={i + 2}
                src={img.image}
                alt={`${data.title} ${i + 3}`}
                onClick={() => openModal(i + 2)}
                style={{ cursor: "pointer" }}
              />
            ))}

            {/* Testimonial */}
            <div className="testimonial">
              <p>“The guide was exceptional, and the trip was well organized.”</p>
              <div className="testimonial-footer">
                <span>Priya · Travelled in May</span>
                <span>
                  <FaStar className="star" /> 5.0
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Box */}
        <div className="trip-info-box">
          <h3>
            From <strong>${data.price}</strong>
          </h3>

          <button
            className="wishlist-btn"
            onClick={handleWishlist}
            disabled={loadingWish}
          >
            {wishId ? (
              <>
                Remove from wishlist <FaHeart style={{ color: "red" }} />
              </>
            ) : (
              <>
                Add to my wishlist <CiHeart />
              </>
            )}
          </button>

          <button className="book-btn" onClick={onViewDatesClick}>
            View Dates And Book
          </button>

          <div className="trip-actions">
            <p className="plan-title">Plan your adventure:</p>
            <a
              href="#"
              className="download"
              onClick={(e) => {
                e.preventDefault();
                handleDownloadBrochure();
              }}
            >
              <FaFileDownload /> Download PDF Brochure
            </a>
            <a href="#" className="contact">
              <FaPhoneAlt /> Contact Operator
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Icons */}
      <div className="trip-icons">
        <div><FaUserFriends /> Platinum Operator</div>
        <div><FaUsers /> Group Tour</div>
        <div><FaLanguage /> English Guided</div>
        <div><FaMapSigns /> Age 1 to 99</div>
        <div><FaGlobe /> Cultural Experience</div>
        <div><FaMapSigns /> Partial Guided</div>
        <div><FaUsers /> Group Size 2 - 15</div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            <button className="modal-prev" onClick={prevImage}>
              <FaArrowLeft />
            </button>
            <img
              src={data.gallery?.[modalIndex]?.image}
              alt={`Slide ${modalIndex + 1}`}
            />
            <button className="modal-next" onClick={nextImage}>
              <FaArrowRight />
            </button>
          </div>
        </div> 
      )}
    </section>
  );
}
