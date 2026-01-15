export default function Forecast({ data, unit }) {
  return (
    <div className="grid grid-cols-5 gap-3 mt-6">
      {data.map((day, i) => (
        <div
          key={i}
          className="forecast-card text-center rounded-xl p-3
              bg-white/30 dark:bg-white/10 backdrop-blur
              transform transition-all duration-500
              hover:-translate-y-2 hover:scale-105"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <p className="text-xs opacity-70">
            {new Date(day.dt_txt).toLocaleDateString("en-US", {
              weekday: "short",
            })}
          </p>

          <img
            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
            alt=""
            className="mx-auto"
          />

          <p className="font-semibold">
            {Math.round(day.main.temp)}°{unit === "metric" ? "C" : "F"}
          </p>
        </div>
      ))}
    </div>
  );
}
