import { useEffect, useState } from "react";
import axios from "axios";
import WeatherCard from "../components/WeatherCard";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dark, setDark] = useState(false);
  const [source, setSource] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // NEW: Tinted Pastel Backgrounds (No White, No Harsh Colors)
  const getBackgroundClass = () => {
    if (!weather) {
      return dark
        ? // Dark idle → deep bluish night
          "from-[#020617] via-[#0b1220] to-[#020617]"
        : // Light idle → soft lavender sky (NOT white)
          "from-[#eef2ff] via-[#e0e7ff] to-[#c7d2fe]";
    }

    const temp = weather.main.temp;

    if (temp > 28) {
      // HOT → peach / coral / sunset
      return dark
        ? "from-[#2a0f0f] via-[#3b1a0f] to-[#020617]"
        : "from-[#ffe4d6] via-[#ffd2b8] to-[#ffc2a1]";
    } else if (temp < 10) {
      // COLD → icy cyan / mint
      return dark
        ? "from-[#020617] via-[#0f172a] to-[#020617]"
        : "from-[#dff9fb] via-[#c7ecee] to-[#a5d8ff]";
    } else {
      // MODERATE → sky blue / soft cloud
      return dark
        ? "from-[#020617] via-[#0f172a] to-[#1e293b]"
        : "from-[#dbeafe] via-[#bfdbfe] to-[#c7d2fe]";
    }
  };

  const fetchWeather = async (params, mode) => {
    setLoading(true);
    setError("");
    setSource(mode);

    try {
      const res = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            ...params,
            units: "metric",
            appid: import.meta.env.VITE_WEATHER_API_KEY,
          },
        }
      );
      setWeather(res.data);
    } catch {
      setError("Unable to fetch weather");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchByCity = () => {
    if (!city) return;
    fetchWeather({ q: city }, "city");
  };

  const fetchByLocation = () => {
    if (!navigator.geolocation) return setError("Geolocation not supported");
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        fetchWeather(
          { lat: pos.coords.latitude, lon: pos.coords.longitude },
          "location"
        ),
      () => {
        setError("Permission denied");
        setLoading(false);
      }
    );
  };

  // Determine text color based on mode (Light mode needs dark text now)
  const textColor = dark ? "text-white" : "text-slate-700";
  const inputBg = dark
    ? "bg-white/10 border-white/20 text-white"
    : "bg-white/60 border-slate-200 text-slate-800";

  return (
    <div
      className={`min-h-screen transition-all duration-700 bg-linear-to-br ${getBackgroundClass()} flex items-center justify-center p-6`}
    >
      <div
        className={`w-full max-w-md rounded-3xl p-8 shadow-2xl backdrop-blur-md transition-all
         ${
           dark
             ? "bg-black/30 border border-white/10"
             : "bg-white/40 border border-white/60"
         }
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold tracking-tight ${textColor}`}>
              Weather
            </h1>
            <p className={`text-sm opacity-70 ${textColor}`}>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>

          <button
            onClick={() => setDark(!dark)}
            className={`p-3 rounded-full transition hover:scale-110 shadow-sm ${
              dark ? "bg-white/20 text-yellow-300" : "bg-white text-orange-400"
            }`}
          >
            {dark ? "🌙" : "☀️"}
          </button>
        </div>

        {/* Search */}
        <div className="space-y-4">
          <div className="relative">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchByCity()}
              placeholder="Search city..."
              className={`w-full rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-sky-400 shadow-sm transition ${inputBg}`}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={fetchByCity}
              className="flex-1 rounded-xl bg-sky-500 hover:bg-sky-600 py-3 text-sm font-bold text-white shadow-md transition transform active:scale-95"
            >
              Search
            </button>
            <button
              onClick={fetchByLocation}
              className="flex-1 rounded-xl bg-indigo-500 hover:bg-indigo-600 py-3 text-sm font-bold text-white shadow-md transition transform active:scale-95"
            >
              Location
            </button>
          </div>
        </div>

        {/* Error / Loading */}
        {(loading || error) && (
          <div className="mt-8 text-center p-4 rounded-xl bg-white/20">
            {loading && (
              <p className="animate-pulse text-sky-600 dark:text-sky-300 font-medium">
                Updating forecast...
              </p>
            )}
            {error && <p className="text-red-500 font-medium">{error}</p>}
          </div>
        )}

        {/* Weather Card Display */}
        {weather && !loading && (
          <div className="mt-8">
            {/* NOTE: Ensure your WeatherCard component supports the text colors. 
                    If WeatherCard expects dark mode, pass a prop or wrap it.
                 */}
            <div className={`${dark ? "text-white" : "text-slate-800"}`}>
              <WeatherCard weather={weather} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
