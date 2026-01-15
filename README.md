# 🌦️ Weatherly

**Weatherly** is a modern, responsive weather application that delivers real-time weather information using both **city-based search** and **current location (GPS)**.  
It features a clean, aesthetic UI with **dynamic pastel backgrounds**, **dark mode**, and a **glassmorphism design**, built using React and Tailwind CSS.

> _Simple, elegant, and intuitive weather — wherever you are._

---

## ✨ Features

- 🌍 City-based weather search  
- 📍 Current location weather (GPS)  
- 🎨 Dynamic background colors based on temperature  
- 🌙 Dark / Light mode toggle  
- 🧊 Glassmorphism UI  
- 📱 Fully responsive (mobile-first)  
- ⚡ Fast and lightweight  

---

## 🖼️ Screenshots



> 📌 **How to add screenshots**
> 1. Create a folder named `screenshots` in the project root  
> 2. Add images:
>    - `light-mode.png`
>    - `dark-mode.png`
>    - `location-mode.png`
> 3. Commit and push them to GitHub

---

## 🛠️ Tech Stack

- React (Vite)
- Tailwind CSS
- Axios
- OpenWeather API

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_WEATHER_API_KEY=your_openweather_api_key
```

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/weatherly.git

# Navigate into the project
cd weatherly

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🧠 How It Works

- **City Mode** → Fetches weather using the city name  
- **Location Mode** → Uses the browser Geolocation API  
- The UI clearly indicates which mode is active  
- Background colors adapt to temperature:
  - 🔥 Hot → Peach / Coral tones  
  - ❄️ Cold → Icy Cyan / Mint tones  
  - 🌤️ Moderate → Sky Blue / Lavender tones  

---

## 📌 Future Enhancements

- 📅 5-day weather forecast  
- 🕒 Last updated timestamp  
- 🌐 Auto-detect location on first load  
- 🌡️ Celsius / Fahrenheit toggle  

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙌 Acknowledgements

- Weather data provided by **OpenWeather API**
- UI inspired by modern iOS and glassmorphism design patterns

---

⭐ If you like this project, consider giving it a star!
