# 🌦️ Weatherly

**Weatherly** is a modern, responsive weather application that delivers real-time weather information using both **city-based search** and **current location (GPS)**.  
It features a **premium UI**, **dynamic pastel backgrounds**, **dark mode**, and **forecast insights**, built with React and Tailwind CSS.

> _Weather, redesigned with clarity and calm aesthetics._

---

## ✨ Features

- 🌍 **City-based weather search**
- 📍 **Auto-detect current location on first load**
- 📍 Manual “Use Location” button
- 🎨 **Dynamic pastel backgrounds** based on temperature
- 🌙 **Dark / Light mode toggle**
- 🌡️ **Celsius / Fahrenheit toggle**
- 🕒 **Last updated timestamp**
- 📅 **5-day weather forecast**
- 🧊 **Glassmorphism UI**
- 📱 **Fully responsive (mobile-first)**
- ⚡ Fast and lightweight

---

## 🖼️ Screenshots
<img width="1913" height="867" alt="image" src="https://github.com/user-attachments/assets/18dc0e81-a623-461f-8746-ddc2619543a0" />


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
- Background color adapts based on temperature:
  - 🔥 Hot → Peach / Coral tones  
  - ❄️ Cold → Icy Cyan / Mint tones  
  - 🌤️ Moderate → Sky Blue / Lavender tones  
- Forecast is calculated using OpenWeather’s 3‑hour interval data (one per day)

---

## 📌 Completed Enhancements

✔ Auto-detect location on first load  
✔ Celsius / Fahrenheit unit toggle  
✔ Last updated timestamp  
✔ 5-day weather forecast  

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙌 Acknowledgements

- Weather data provided by **OpenWeather API**
- UI inspired by modern iOS, Notion, and glassmorphism design patterns

---

⭐ If you like this project, consider giving it a star!
