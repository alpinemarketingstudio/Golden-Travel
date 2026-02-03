import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { MapPin, Search, Calendar, AlertCircle } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Home.css";
import homevid1 from "../assets/homevid1.mp4";

/* =========================
   MOCK PLACES DATABASE
========================= */
const PLACES = [
  "Nepal",
  "Nigeria",
  "Netherlands",
  "New Zealand",
  "Norway",
  "Namibia",
  "Nepalgunj",
  "Nairobi",
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endDateError, setEndDateError] = useState("");

  const startDateRef = useRef(null);
  const endDateRef = useRef(null); 
  const navigate = useNavigate();

  /* =========================
     Popper Container
  ========================== */
  const PopperContainer = ({ children, containerRef }) =>
    containerRef?.current
      ? ReactDOM.createPortal(children, containerRef.current)
      : null;

  /* =========================
     LOCATION INPUT + SUGGESTIONS
  ========================== */
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = PLACES.filter((place) =>
      place.toLowerCase().startsWith(value.toLowerCase())
    ).slice(0, 4);

    setSuggestions(filtered);
  };

  const handleSuggestionClick = (place) => {
    setSearchQuery(place);
    setSuggestions([]);
    handleSearch(place);
  };

  /* =========================
     DATE LOGIC
  ========================== */
  const onStartDateChange = (date) => {
    setStartDate(date);
    setEndDateError("");
    if (endDate && date && endDate < date) setEndDate(null);
  };

  const onEndDateChange = (date) => {
    if (!startDate) {
      setEndDateError("Please select start date first");
      return;
    }
    if (date < startDate) {
      setEndDateError("End date cannot be before start date");
      return;
    }
    setEndDate(date);
    setEndDateError("");
  };

  const onEndCalendarOpen = () => {
    if (!startDate) setEndDateError("Please select start date first");
  };

  /* =========================
     SEARCH
  ========================== */
  const handleSearch = (placeOverride) => {
    const params = new URLSearchParams();
    const query = placeOverride || searchQuery;

    if (query.trim()) params.set("query", query.trim());
    if (startDate) params.set("start_date", startDate.toISOString().split("T")[0]);
    if (endDate) params.set("end_date", endDate.toISOString().split("T")[0]);

    navigate(`/search?${params.toString()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
      setSuggestions([]);
    }
  };

  return (
    <section className="home">
      {/* Background Video */}
      <video autoPlay muted loop className="home-video">
        <source src={homevid1} type="video/mp4" />
      </video>

      <div className="home-overlay">
        <div className="home-content">
          <h1 className="home-title">Find Your Perfect Journey</h1>
          <p className="home-subtitle">
            Explore handpicked destinations and customize your travel experiences.
          </p>

          <form
            className="home-search-wrapper"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <div className="home-search-bar">
              {/* LOCATION INPUT */}
              <div className="home-search-input">
                <span className="home-location-icon">
                  <MapPin size={18} />
                </span>

                <input
                  type="text"
                  placeholder="Search destination"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />

                {/* SUGGESTIONS */}
                {suggestions.length > 0 && (
                  <ul className="home-suggestions">
                    {suggestions.map((place, index) => (
                      <li key={index} onClick={() => handleSuggestionClick(place)}>
                        <MapPin size={14} />
                        <span>{place}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="home-divider"></div>

              {/* DATE RANGE */}
              <div className="home-date-box">
                <div className="home-date-field" ref={startDateRef}>
                  <Calendar size={16} />
                  <DatePicker
                    selected={startDate}
                    onChange={onStartDateChange}
                    placeholderText="Start date"
                    dateFormat="MM/dd/yyyy"
                    className="home-datepicker"
                    minDate={new Date()}
                    onKeyDown={handleKeyDown}
                    popperContainer={(props) => (
                      <PopperContainer {...props} containerRef={startDateRef} />
                    )}
                  />
                </div>

                <span className="home-date-separator">—</span>

                <div className="home-date-field" ref={endDateRef}>
                  <Calendar size={16} />
                  <DatePicker
                    selected={endDate}
                    onChange={onEndDateChange}
                    onCalendarOpen={onEndCalendarOpen}
                    placeholderText="End date"
                    dateFormat="MM/dd/yyyy"
                    className="home-datepicker"
                    minDate={startDate || new Date()}
                    onKeyDown={handleKeyDown}
                    popperContainer={(props) => (
                      <PopperContainer {...props} containerRef={endDateRef} />
                    )}
                  />
                </div>
              </div>

              <button type="submit" className="home-search-btn">
                Search <Search size={16} />
              </button>
            </div>

            {endDateError && (
              <div className="home-error">
                <AlertCircle size={16} />
                <span>{endDateError}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
