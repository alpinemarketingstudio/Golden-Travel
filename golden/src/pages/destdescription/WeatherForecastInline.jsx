import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import "../../pagescss/weather.css"

const WeatherForecastInline = ({ city }) => {
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const getTempIcon = (tempC) => {
    if (tempC < 10) return "🥶";
    if (tempC < 25) return "🌤️";
    return "🔥";
  };

  const toCelsius = (kelvin) => (kelvin - 273.15).toFixed(1);

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axiosInstance.post("utils/weather-forecast/", {
          city: city.trim(),
        });
        setForecast(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch weather.");
        setForecast(null);
      } finally {
        setLoading(false);
      }
    };

    if (city?.trim()) fetchForecast();
  }, [city]);

  if (!city) return null;

  return (
    <div className="weather-container">
      <h4 className="weather-title">🌦️ Weather Forecast for {city}</h4>

      {loading ? (
        <p className="weather-loading">Loading forecast...</p>
      ) : error ? (
        <div className="weather-error">{error}</div>
      ) : (
        <div className="weather-cards">
          {forecast?.forecasts?.slice(0, 3).map((item, i) => {
            const tempC = parseFloat(toCelsius(item.temp));
            return (
              <div key={i} className="weather-card">
                <div className="weather-card-header">
                  <span className="weather-icon">{getTempIcon(tempC)}</span>
                  <span className="weather-temp">{tempC}°C</span>
                </div>
                <div className="weather-card-body">
                  <h6 className="weather-date">{item.datetime}</h6>
                  <p className="weather-desc">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WeatherForecastInline;
