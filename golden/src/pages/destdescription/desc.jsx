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
} from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import "../../pagescss/desc.css";

import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

export default function Desc({ data, onViewDatesClick }) {
  const rating = data.average_rating || 0;
  const navigate = useNavigate();
  const [wishId, setWishId] = useState(null);
  const [loadingWish, setLoadingWish] = useState(false);

  const extraImagesCount =
    data.gallery && data.gallery.length > 5
      ? data.gallery.length - 5
      : 0;

  const visibleGallery = data.gallery?.slice(0, 5) || [];

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
            <span className="review-count" onClick={scrollToReviewSection}>
              {rating.toFixed(1)} ({data.review_count || 0} reviews)
            </span>
          </div>
          · {data.country?.name || "Unknown"}
        </p>
      </div>

      <div className="trip-content">
        {/* Gallery */}
        <PhotoProvider maskOpacity={0}>
          <div className="trip-gallery">
            <div className="top-gallery">
              {visibleGallery.slice(0, 2).map((img, i) => (
                <PhotoView
                  key={i}
                  src={img.image}
                >
                  <img
                    src={img.image}
                    alt={`${data.title} ${i + 1}`}
                    style={{ cursor: "pointer" }}
                  />
                </PhotoView>
              ))}
            </div>

            <div className="bottom-imgs">
              {visibleGallery.slice(2).map((img, i) => {
                const isLastVisible =
                  i === visibleGallery.slice(2).length - 1 && extraImagesCount > 0;

                return (
                  <PhotoView
                    key={i + 2}
                    src={img.image}
                  >
                    <div className="gallery-image-wrapper">
                      <img
                        src={img.image}
                        alt={`${data.title} ${i + 3}`}
                        style={{ cursor: "pointer" }}
                      />
                      {isLastVisible && (
                        <div className="more-photos-overlay">
                          +{extraImagesCount}
                        </div>
                      )}
                    </div>
                  </PhotoView>
                );
              })}

              <div className="testimonial">
                <p>
                  “The guide was exceptional, and the trip was well organized.”
                </p>
                <div className="testimonial-footer">
                  <span>Priya · Travelled in May</span>
                  <span>
                    <FaStar className="star" /> 5.0
                  </span>
                </div>
              </div>
            </div>

            {/* Hidden all other images for slider */}
            {data.gallery?.slice(5).map((img, i) => (
              <PhotoView key={`hidden-${i}`} src={img.image}>
                <img style={{ display: "none" }} alt={`hidden ${i}`} />
              </PhotoView>
            ))}
          </div>
        </PhotoProvider>

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
        <div>
          <FaUserFriends /> Platinum Operator
        </div>
        <div>
          <FaUsers /> Group Tour
        </div>
        <div>
          <FaLanguage /> English Guided
        </div>
        <div>
          <FaMapSigns /> Age 1 to 99
        </div>
        <div>
          <FaGlobe /> Cultural Experience
        </div>
        <div>
          <FaMapSigns /> Partial Guided
        </div>
        <div>
          <FaUsers /> Group Size 2 - 15
        </div>
      </div>
    </section>
  );
}
