export default function WeatherCard({ weather }) {
  const icon = weather.weather[0].icon;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-400 to-indigo-600 p-8 text-white shadow-2xl ring-1 ring-white/20 max-w-sm mx-auto">
      {/* Decorative background blur for depth */}
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/20 blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-purple-500/20 blur-3xl"></div>

      {/* Header */}
      <div className="text-center relative z-10">
        <h2 className="text-2xl font-bold tracking-tight">
          {weather.name},{" "}
          <span className="text-blue-100">{weather.sys.country}</span>
        </h2>
        <p className="mt-1 text-sm font-medium text-blue-100 capitalize">
          {weather.weather[0].description}
        </p>
      </div>

      {/* Main Temp & Icon */}
      <div className="flex flex-col items-center justify-center py-6 relative z-10">
        <div className="relative">
          {/* Glow effect behind icon */}
          <div className="absolute inset-0 bg-yellow-400/30 blur-2xl rounded-full"></div>
          <img
            src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
            alt="weather icon"
            className="relative h-32 w-32 drop-shadow-lg"
          />
        </div>
        <p className="text-7xl font-bold tracking-tighter drop-shadow-md">
          {Math.round(weather.main.temp)}°
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mt-4 grid grid-cols-3 gap-3 relative z-10">
        <Stat
          icon={<ThermometerIcon />}
          label="Feels Like"
          value={`${Math.round(weather.main.feels_like)}°`}
        />
        <Stat
          icon={<DropletIcon />}
          label="Humidity"
          value={`${weather.main.humidity}%`}
        />
        <Stat
          icon={<WindIcon />}
          label="Wind"
          value={`${weather.wind.speed} m/s`}
        />
      </div>
    </div>
  );
}

// Improved Stat Component with Glass Effect
function Stat({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white/10 p-3 text-center backdrop-blur-md transition hover:bg-white/20 border border-white/10">
      <div className="mb-1 text-blue-100 opacity-80 scale-75">{icon}</div>
      <p className="text-sm font-semibold">{value}</p>
      <p className="text-[10px] font-medium uppercase tracking-wider text-blue-200">
        {label}
      </p>
    </div>
  );
}

// Simple SVG Icons (You can also use lucide-react or heroicons)
const ThermometerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 4v10.54a4 4 0 1 1-7 0V4a3.5 3.5 0 0 1 7 0Z" />
    <path d="M3.1 7.2C1.5 8.8 3.5 11 3.5 11" />
  </svg>
);

const DropletIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22a7 7 0 0 0 7-7c0-2-2-3.9-7-10.7C7 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
  </svg>
);

const WindIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
    <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
    <path d="M12.6 19.4A2 2 0 1 1 14 16H2" />
  </svg>
);
