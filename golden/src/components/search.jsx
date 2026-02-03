import React, { useEffect, useState, useMemo } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import DatePicker from "react-datepicker";
import { MapPin, Calendar, Search as SearchIcon, AlertCircle } from "lucide-react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/search.css";

// Helper function to create URL-friendly slugs
const slugify = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function Search() {
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endDateError, setEndDateError] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    durationMin: "",
    durationMax: "",
    priceMin: "",
    priceMax: "",
    sale: false,
    styles: [],
    themes: [],
  });

  const [regionId, setRegionId] = useState(null);
  const [regionName, setRegionName] = useState(null);

  const perPage = 15;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // --- Initialize from URL params and fetch results automatically ---
  useEffect(() => {
    const sd = searchParams.get("start_date");
    const ed = searchParams.get("end_date");
    const q = searchParams.get("query");
    const r = searchParams.get("region");

    if (sd) setStartDate(new Date(sd));
    if (ed) setEndDate(new Date(ed));
    if (q) setSearchQuery(q);
    if (r) {
      setRegionId(r);
      fetchRegionName(r);
    }

    // Fetch results whenever page loads or params change
    fetchDeals(q || "", sd || null, ed || null, r || null);
  }, [searchParams]);

  const fetchRegionName = async (id) => {
    try {
      const res = await axiosInstance.get(`/api/regions/${id}/`);
      setRegionName(res.data.name);
    } catch {
      setRegionName(null);
    }
  };

  // --- Fetch deals from backend ---
  const fetchDeals = async (query = searchQuery, sd = startDate, ed = endDate, region = regionId) => {
    const params = {
      query: query?.trim() || undefined,
      start_date: sd ? new Date(sd).toISOString().split("T")[0] : undefined,
      end_date: ed ? new Date(ed).toISOString().split("T")[0] : undefined,
      min_duration: filters.durationMin || undefined,
      max_duration: filters.durationMax || undefined,
      min_price: filters.priceMin || undefined,
      max_price: filters.priceMax || undefined,
      sale: filters.sale || undefined,
      style: filters.styles.length > 0 ? filters.styles : undefined,
      theme: filters.themes.length > 0 ? filters.themes : undefined,
      region: region || undefined,
    };

    try {
      const res = await axiosInstance.get("/destinations/search-deals/", { params });
      setResults(res.data.results || res.data);
      setPage(1);
    } catch (err) {
      console.error("Failed to fetch deals:", err);
      setResults([]);
    }
  };

  // --- Filter helpers ---
  const norm = (v = "") => v.toLowerCase().trim();

  const { styleList, styleCount, themeList, themeCount } = useMemo(() => {
    const sC = {};
    const tC = {};
    results.forEach((d) => {
      const sKey = norm(d.style);
      if (sKey) sC[sKey] = (sC[sKey] || 0) + 1;
      (d.themes || []).forEach((t) => {
        const tKey = norm(t);
        if (tKey) tC[tKey] = (tC[tKey] || 0) + 1;
      });
    });
    return {
      styleList: Object.keys(sC),
      styleCount: sC,
      themeList: Object.keys(tC),
      themeCount: tC,
    };
  }, [results]);

  const updateFilter = (type, value) => {
    setPage(1);
    if (type === "styles" || type === "themes") {
      setFilters((prev) => {
        const updated = prev[type].includes(value)
          ? prev[type].filter((v) => v !== value)
          : [...prev[type], value];
        return { ...prev, [type]: updated };
      });
    } else if (type === "sale") {
      setFilters((prev) => ({ ...prev, sale: !prev.sale }));
    } else {
      setFilters((prev) => ({ ...prev, [type]: value }));
    }

    // Auto fetch results on filter change
    fetchDeals(searchQuery, startDate, endDate, regionId);
  };

  const toggleWishlist = (id) => {
    setResults((prev) =>
      prev.map((r) => (r.id === id ? { ...r, is_favorite: !r.is_favorite } : r))
    );
  };

  const filteredResults = useMemo(() => {
    return results.filter((d) => {
      const priceNum = Number(d.price);
      const duration = d.days;

      const priceOk =
        (!filters.priceMin || priceNum >= Number(filters.priceMin)) &&
        (!filters.priceMax || priceNum <= Number(filters.priceMax));
      const durationOk =
        (!filters.durationMin || duration >= Number(filters.durationMin)) &&
        (!filters.durationMax || duration <= Number(filters.durationMax));
      const saleOk = !filters.sale || d.on_sale === true;
      const styleOk = filters.styles.length === 0 || filters.styles.includes(norm(d.style));
      const themeOk =
        filters.themes.length === 0 ||
        (d.themes || []).some((t) => filters.themes.includes(norm(t)));

      return priceOk && durationOk && saleOk && styleOk && themeOk;
    });
  }, [results, filters]);

  const paginatedResults = filteredResults.slice((page - 1) * perPage, page * perPage);

  // --- Date handlers ---
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

  const truncateText = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <section className="sr-page">
      <div className="sr-breadcrumb">
        <Link to="/">Home</Link>
        <span className="sr-arrow">›</span>
        <span>Search</span>
      </div>

      <h2 className="sr-header">
        Showing <span>{filteredResults.length}</span> trip{filteredResults.length !== 1 ? "s" : ""}{" "}
        {regionName ? `in ${regionName}` : "matching your search"}
      </h2>

      {/* --- Search Bar --- */}
      <div className="sr-search-wrapper">
        <div className="sr-search-container">
          <div className="sr-search-box">
            <MapPin size={18} className="sr-icon" />
            <input
              type="text"
              placeholder="Search destination, trip name..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
          </div>

          <div className="sr-date-inline">
            <div className="sr-date-field">
              <Calendar size={16} className="sr-calendar-icon" />
              <DatePicker
                selected={startDate}
                onChange={onStartDateChange}
                placeholderText="Start date"
                className="sr-datepicker"
                minDate={new Date()}
              />
            </div>

            <div className="sr-date-field sr-end-date">
              <Calendar size={16} className="sr-calendar-icon" />
              <DatePicker
                selected={endDate}
                onChange={onEndDateChange}
                onCalendarOpen={onEndCalendarOpen}
                placeholderText="End date"
                className="sr-datepicker"
                minDate={startDate || new Date()}
              />
            </div>
          </div>

          <button
            className="sr-search-btn"
            onClick={() => fetchDeals(searchQuery, startDate, endDate, regionId)}
          >
            <SearchIcon size={16} /> Search
          </button>
        </div>

        {endDateError && (
          <div className="sr-error-popup" role="alert">
            <AlertCircle size={16} />
            <span>{endDateError}</span>
          </div>
        )}
      </div>

      {/* --- Filters & Results --- */}
      <div className="sr-layout">
        <aside className="sr-filters">
          <h5>Duration (Days)</h5>
          <div className="sr-range-row">
            <input type="number" placeholder="Min" value={filters.durationMin} onChange={(e) => updateFilter("durationMin", e.target.value)} min={0} />
            <input type="number" placeholder="Max" value={filters.durationMax} onChange={(e) => updateFilter("durationMax", e.target.value)} min={0} />
          </div>

          <h5>Price</h5>
          <div className="sr-range-row">
            <input type="number" placeholder="$ Min" value={filters.priceMin} onChange={(e) => updateFilter("priceMin", e.target.value)} min={0} />
            <input type="number" placeholder="$ Max" value={filters.priceMax} onChange={(e) => updateFilter("priceMax", e.target.value)} min={0} />
          </div>

          <h5>Travel Deals</h5>
          <label className="sr-checkbox-label">
            <input type="checkbox" checked={filters.sale} onChange={() => updateFilter("sale")} />
            Trips on sale
          </label>

          {styleList.length > 0 && <h5>Styles</h5>}
          {styleList.map((style) => (
            <label key={style} className="sr-checkbox-label">
              <input type="checkbox" checked={filters.styles.includes(style)} onChange={() => updateFilter("styles", style)} />
              {style.charAt(0).toUpperCase() + style.slice(1)} <span className="sr-count">({styleCount[style]})</span>
            </label>
          ))}

          {themeList.length > 0 && <h5>Themes</h5>}
          {themeList.map((theme) => (
            <label key={theme} className="sr-checkbox-label">
              <input type="checkbox" checked={filters.themes.includes(theme)} onChange={() => updateFilter("themes", theme)} />
              {theme.charAt(0).toUpperCase() + theme.slice(1)} <span className="sr-count">({themeCount[theme]})</span>
            </label>
          ))}
        </aside>

        <div className="sr-deals-grid">
          {paginatedResults.length > 0 ? (
            paginatedResults.map((result, i) => (
              <div className="sr-deal-card" key={result.id}>
                <div className="sr-deal-image" style={{ backgroundImage: `url(${result.image || "https://via.placeholder.com/300"})` }}>
                  {result.on_sale && <div className="sr-ribbon">ON SALE</div>}
                  <button className="sr-wishlist-btn" onClick={() => toggleWishlist(result.id)}>
                    {result.is_favorite ? <FaHeart color="goldenrod" /> : <FaRegHeart color="white" />}
                  </button>
                </div>
                <div className="sr-deal-overlay">
                  <h3>{result.title}</h3>
                  <p className="sr-excerpt">{truncateText(result.description, 80)}</p>
                  <div className="sr-bottom-row">
                    <button onClick={() => navigate(`/destinations/${result.country?.slug || "unknown"}/deal/${slugify(result.title)}`)}>See Details</button>
                    <div className="sr-price-wrap">
                      <span className="sr-old-price">${Number(result.price) + 400}</span>
                      <span className="sr-new-price">${result.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="sr-no-results">No trips found matching your criteria.</p>
          )}
        </div>
      </div>

      {/* Pagination */}
      {filteredResults.length > 0 && (
        <div className="sr-pagination">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>◀</button>
          <span>Page {page} of {Math.ceil(filteredResults.length / perPage)}</span>
          <button onClick={() => setPage((p) => Math.min(Math.ceil(filteredResults.length / perPage), p + 1))} disabled={page >= Math.ceil(filteredResults.length / perPage)}>▶</button>
        </div>
      )}
    </section>
  );
}
