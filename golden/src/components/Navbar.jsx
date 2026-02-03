import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Heart,
  User,
  Search,
  Phone,
} from "lucide-react";
import { IoLanguageOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Divide as Hamburger } from "hamburger-react";
import axiosInstance from "../utils/axiosInstance";
import logo from "../assets/logo1.png";
import baliImage from "../assets/bali.jpg";
import "../styles/Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [regions, setRegions] = useState([]);
  const [countriesByRegion, setCountriesByRegion] = useState({});
  const [travelTypes, setTravelTypes] = useState([]);
  const [travelOptions, setTravelOptions] = useState({});
  const [dealCategories, setDealCategories] = useState([]);
  const [dealItems, setDealItems] = useState({});

  const [activeRegion, setActiveRegion] = useState(null);
  const [activeCountry, setActiveCountry] = useState(null);
  const [activeTravelType, setActiveTravelType] = useState(null);
  const [activeDealCategory, setActiveDealCategory] = useState(null);

  const [showDestinations, setShowDestinations] = useState(false);
  const [showWaysToTravel, setShowWaysToTravel] = useState(false);
  const [showDeals, setShowDeals] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showSearchIcon, setShowSearchIcon] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileView, setMobileView] = useState("main");
  const [mobileActiveRegion, setMobileActiveRegion] = useState(null);
  const [move, setMove] = useState(false);

  // Fetch Destinations, Travel Types, Deals
  useEffect(() => {
    axiosInstance.get("destinations/").then((res) => {
      const regionList = res.data.regions.map((r) => r.region_name);
      const map = {};
      res.data.regions.forEach((r) => {
        map[r.region_name] = r.countries.map((c) => ({
          name: c.name,
          slug: c.slug,
        }));
      });
      setRegions(regionList);
      setCountriesByRegion(map);
      setActiveRegion(regionList[0] || null);
    });

    axiosInstance.get("destinations/travel-types/").then((res) => {
      const { types, options = {} } = res.data;
      setTravelTypes(types);
      setTravelOptions(options);
      setActiveTravelType(types[0] || null);
    });

    axiosInstance.get("destinations/deals/").then((res) => {
      const { categories, offers = {} } = res.data;
      setDealCategories(categories);
      setDealItems(offers);
      setActiveDealCategory(categories[0] || null);
    });
  }, []);

  // Authentication
  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("access_token"));
  }, [location]);

  // Scroll for search icon
  useEffect(() => {
    const handleScroll = () => setShowSearchIcon(window.scrollY > 100);
    if (location.pathname !== "/") setShowSearchIcon(true);
    else window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Hide search bar on navigation
  useEffect(() => {
    if (location.pathname === "/") setShowSearchBar(false);
  }, [location.pathname]);

  // Disable scroll on mobile menu
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isMobileMenuOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const dropdowns = document.querySelectorAll(".dropdown");
      if (![...dropdowns].some((el) => el.contains(e.target))) {
        setShowDestinations(false);
        setShowWaysToTravel(false);
        setShowDeals(false);
        setShowProfile(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
    setShowProfile(false);
    navigate("/login");
  };

  // Logo click
  const handleLogoClick = () => {
    if (location.pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
    else navigate("/");
  };

  // Mobile Back
  const mobileBack = () => {
    if (mobileView === "countries") setMobileView("destinations");
    else setMobileView("main");
  };

  // Search handler
  const handleSearch = () => {
    if (!searchInput.trim()) return;
    navigate(`/search?query=${encodeURIComponent(searchInput.trim())}`);
    setShowSearchBar(false);
    setIsMobileMenuOpen(false);
    setSearchInput("");
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo" onClick={handleLogoClick}>
            <img src={logo} alt="Golden Leaf Travels" />
            <span>Golden Leaf<br />Travels</span>
          </div>

          {/* Hamburger */}
          <div className="hamburger-wrapper">
            <Hamburger
              toggled={isMobileMenuOpen}
              toggle={(t) => { setIsMobileMenuOpen(t); setMobileView("main"); }}
              size={20}
            />
          </div>

          {/* Navbar Links */}
          <nav className="navbar-links">
            {/* Destinations */}
            <div className="dropdown" onClick={() => { setShowDestinations(!showDestinations); setShowWaysToTravel(false); setShowDeals(false); setShowProfile(false); }}>
              <span className="link-item">Destinations <ChevronDown size={14} /></span>
              {showDestinations && activeRegion && (
                <div className="mega-menu-dest">
                  <div className="mega-columns">
                    <div className="column">
                      <ul>
                        {regions.map((r) => (
                          <li key={r} onClick={() => setActiveRegion(r)} className={activeRegion === r ? "region-active" : ""}>{r}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="column countries-column">
                      <div className="countries-subcolumns">
                        {(() => {
                          const countries = countriesByRegion[activeRegion] || [];
                          const firstCol = countries.slice(0, 6);
                          const secondCol = countries.slice(6, 12);
                          return (
                            <>
                              <ul>{firstCol.map(c => <li key={c.slug}><Link to={`/destinations/${c.slug}`} className="plain-link" onClick={() => setShowDestinations(false)}>{c.name}</Link></li>)}</ul>
                              <ul>{secondCol.map(c => <li key={c.slug}><Link to={`/destinations/${c.slug}`} className="plain-link" onClick={() => setShowDestinations(false)}>{c.name}</Link></li>)}</ul>
                            </>
                          );
                        })()}
                      </div>
                      <button className={`view-all-region-btn ${move ? "move-right" : ""}`} onClick={() => { setMove(true); setShowDestinations(false); navigate(`/destinations/${activeRegion.toLowerCase()}`); }}>
                        View all {activeRegion}
                      </button>
                    </div>
                    <div className="column image-column">
                      <div className="featured-card">
                        <img src={baliImage} alt={activeRegion} className="featured-image" />
                        <div className="featured-overlay">
                          <div className="featured-title">{activeRegion}</div>
                          <div className="featured-desc">Discover journeys in {activeRegion}</div>
                          <Link to={`/destinations/${activeRegion.toLowerCase()}`} className="featured-btn">View Trip</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Ways to Travel */}
            <div className="dropdown" onClick={() => { setShowWaysToTravel(!showWaysToTravel); setShowDestinations(false); setShowDeals(false); setShowProfile(false); }}>
              <span className="link-item">Ways to Travel <ChevronDown size={14} /></span>
              {showWaysToTravel && activeTravelType && (
                <div className="mega-menu-ways">
                  <div className="mega-columns">
                    <div className="column">
                      <ul>{travelTypes.map(t => <li key={t} onClick={() => setActiveTravelType(t)} className={activeTravelType === t ? "active" : ""}>{t}</li>)}</ul>
                    </div>
                    <div className="column">
                      <ul>{(travelOptions[activeTravelType] || []).map(o => <li key={o}>{o}</li>)}</ul>
                    </div>
                    <div className="column image-column">
                      <img src={baliImage} alt={activeTravelType} />
                      <p className="image-description">Explore {activeTravelType} trips</p>
                      <Link to={`/ways-to-travel/${activeTravelType.toLowerCase()}`} className="read-more-btn">Explore More</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Deals */}
            <div className="dropdown" onClick={() => { setShowDeals(!showDeals); setShowWaysToTravel(false); setShowDestinations(false); setShowProfile(false); }}>
              <span className="link-item">Deals <ChevronDown size={14} /></span>
              {showDeals && activeDealCategory && (
                <div className="mega-menu-deals">
                  <div className="mega-columns">
                    <div className="column">
                      <ul>{dealCategories.map(d => <li key={d} onClick={() => setActiveDealCategory(d)} className={activeDealCategory === d ? "active" : ""}>{d}</li>)}</ul>
                    </div>
                    <div className="column">
                      <ul>{(dealItems[activeDealCategory] || []).map(o => <li key={o}>{o}</li>)}</ul>
                    </div>
                    <div className="column image-column">
                      <img src={baliImage} alt={activeDealCategory} />
                      <p className="image-description">Hot deals for {activeDealCategory}</p>
                      <Link to={`/deals/${activeDealCategory.toLowerCase()}`} className="read-more-btn">View Offers</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* About Us */}
            <div className="dropdown link-item">
              <span className="dropdown-toggle">About Us</span>
              <div className="dropdown-menu">
                <Link to="/about" className="dropdown-link">Our Stories</Link>
                <Link to="/blogs" className="dropdown-link">Blogs</Link>
                <Link to="/write" className="dropdown-link">Write for us</Link>
              </div>
            </div>
          </nav>

          {/* Desktop Icons */}
          <div className="navbar-icons">
            <button className={`search-icon ${showSearchIcon ? "visible" : "hidden"}`} onClick={() => setShowSearchBar(p => !p)}>
              <Search size={20} />
            </button>
            <Link to="/profile" className="wishlist-icon"><Heart size={18} /></Link>
            <div className="profile-dropdown dropdown">
              <User size={18} onClick={() => { if(isAuthenticated) setShowProfile(p => !p); else navigate("/login"); setShowDestinations(false); setShowWaysToTravel(false); setShowDeals(false); }}/>
              {isAuthenticated && showProfile && (
                <div className="profile-menu">
                  <Link to="/profile" className="profile-item">My Profile</Link>
                  <span className="profile-item" onClick={handleLogout}>Logout</span>
                </div>
              )}
            </div>
            <Link to="/contact" className="contact-btn">Contact Us</Link>
          </div>

          {/* Search Bar */}
          {showSearchBar && (
            <div className="search-bar-wrapper">
              <input
                type="text"
                placeholder="Search destinations, deals..."
                autoFocus
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button onClick={handleSearch} className="search-close-btn">🔍</button>
              <button onClick={() => setShowSearchBar(false)} className="search-close-btn">×</button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`} onClick={() => setIsMobileMenuOpen(false)} />
        <aside className={`mobile-menu-panel ${isMobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-menu-header">
            {mobileView !== "main" && <button className="mobile-back-btn" onClick={mobileBack}><ChevronLeft size={20}/> Back</button>}
            <span/>
            <button className="mobile-close-btn" onClick={() => setIsMobileMenuOpen(false)}>×</button>
          </div>

          {/* Mobile main menu */}
          {mobileView === "main" && (
            <ul className="mobile-menu-list">
              <li onClick={() => setMobileView("destinations")}>Destinations <ChevronRight size={18} /></li>
              <li onClick={() => setMobileView("ways")}>Ways to Travel <ChevronRight size={18} /></li>
              <li onClick={() => setMobileView("deals")}>Deals <ChevronRight size={18} /></li>
              <li><Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link></li>
              <li>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSearch()}
                />
                <button onClick={handleSearch}>Search</button>
              </li>
            </ul>
          )}
        </aside>
      </header>
    </>
  );
}
