export default function WeatherCard({ weather, unit }) {
  if (!weather) return null; // extra safety

  return (
    <div className="text-center mb-6">
      {/* LOCATION NAME */}
      <h2 className="text-xl font-semibold tracking-wide mb-1">
        {weather?.name || "Unknown Location"}
        {weather?.sys?.country ? `, ${weather.sys.country}` : ""}
      </h2>

      {/* WEATHER ICON */}
      {weather?.weather?.[0]?.icon && (
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="weather icon"
          className="mx-auto"
        />
      )}

      {/* TEMPERATURE */}
      <p className="text-5xl font-bold">
        {Math.round(weather?.main?.temp ?? 0)}°{unit === "metric" ? "C" : "F"}
      </p>

      {/* DESCRIPTION */}
      <p className="capitalize opacity-70">
        {weather?.weather?.[0]?.description || ""}
      </p>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-3 mt-4 text-sm">
        <Stat
          label="Feels Like"
          value={`${Math.round(weather?.main?.feels_like ?? 0)}°`}
        />
        <Stat label="Humidity" value={`${weather?.main?.humidity ?? "--"}%`} />
        <Stat label="Wind" value={`${weather?.wind?.speed ?? "--"} m/s`} />
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl p-3 bg-white/30 dark:bg-white/10">
      <p className="opacity-60 text-xs">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
