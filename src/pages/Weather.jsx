import { useEffect, useState } from "react";
import axios from "axios";
import WeatherCard from "../components/WeatherCard";
import Forecast from "../components/Forecast";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dark, setDark] = useState(false);
  const [unit, setUnit] = useState("metric");
  const [source, setSource] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // AUTO-DETECT LOCATION ON FIRST LOAD
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchWeather(
          { lat: pos.coords.latitude, lon: pos.coords.longitude },
          "location"
        );
      },
      () => {}
    );
  }, [unit]);

  const fetchWeather = async (params, mode) => {
    setLoading(true);
    setError("");
    setSource(mode);

    try {
      const weatherRes = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            ...params,
            units: unit,
            appid: import.meta.env.VITE_WEATHER_API_KEY,
          },
        }
      );

      const forecastRes = await axios.get(
        "https://api.openweathermap.org/data/2.5/forecast",
        {
          params: {
            ...params,
            units: unit,
            appid: import.meta.env.VITE_WEATHER_API_KEY,
          },
        }
      );

      setWeather(weatherRes.data);
      setForecast(forecastRes.data.list.filter((_, i) => i % 8 === 0));
      setLastUpdated(new Date());
    } catch {
      setError("Unable to fetch weather");
    } finally {
      setLoading(false);
    }
  };

  const fetchByCity = () => {
    if (!city) return;
    fetchWeather({ q: city }, "city");
  };

  const fetchByLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchWeather(
          { lat: pos.coords.latitude, lon: pos.coords.longitude },
          "location"
        );
      },
      () => setError("Location permission denied")
    );
  };

  return (
    <div
      className="min-h-screen bg-linear-to-br from-indigo-200 via-sky-200 to-blue-300
      dark:from-slate-900 dark:via-slate-800 dark:to-black
      flex items-center justify-center p-6"
    >
      <div
        className="w-full max-w-md rounded-3xl p-8 backdrop-blur-xl
        bg-white/40 dark:bg-black/30 border border-white/30 shadow-2xl"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
              Weatherly
            </h1>
            {lastUpdated && (
              <p className="text-xs opacity-60">
                Updated {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}
              className="px-3 py-1 rounded-lg bg-white/30 dark:bg-white/10"
            >
              {unit === "metric" ? "°C" : "°F"}
            </button>

            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-full bg-white/30 dark:bg-white/10"
            >
              {dark ? "☀️" : "🌙"}
            </button>
          </div>
        </div>

        {/* SOURCE INDICATOR */}
        {source && weather && (
          <span
            className="inline-block mb-4 px-3 py-1 rounded-full text-sm
            bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300"
          >
            {source === "location"
              ? "📍 Current Location"
              : `🏙️ ${weather.name}`}
          </span>
        )}

        {/* SEARCH */}
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchByCity()}
          placeholder="Search city..."
          className="w-full p-3 rounded-xl mb-3
            bg-white/60 dark:bg-white/10 border outline-none"
        />

        <div className="flex gap-3 mb-6">
          <button
            onClick={fetchByCity}
            className="flex-1 bg-sky-500 text-white py-2 rounded-xl"
          >
            Search
          </button>
          <button
            onClick={fetchByLocation}
            className="flex-1 bg-indigo-500 text-white py-2 rounded-xl"
          >
            Location
          </button>
        </div>

        {/* STATES */}
        {loading && (
          <p className="text-center animate-pulse text-sky-600">
            Fetching weather…
          </p>
        )}

        {error && <p className="text-center text-red-500">{error}</p>}

        {/* WEATHER */}
        {weather && !loading && (
          <>
            <WeatherCard weather={weather} unit={unit} />
            <Forecast data={forecast} unit={unit} />
          </>
        )}
      </div>
    </div>
  );
}
