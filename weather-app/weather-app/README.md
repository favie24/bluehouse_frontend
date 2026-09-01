# SkyCast Weather App

A polished, beginner-friendly React + Tailwind CSS weather dashboard powered by OpenWeather.

## Features

- City search and browser geolocation
- Current temperature, condition, feels-like temperature, humidity, wind, pressure, visibility, sunrise and sunset
- Hourly forecast using OpenWeather's free 3-hour forecast intervals
- 5-day outlook
- Celsius/Fahrenheit toggle
- Favorite cities
- Recent searches
- LocalStorage persistence
- Dynamic weather-based gradient backgrounds
- Glassmorphism UI and subtle animations
- Loading, error, and refresh states
- API logic isolated in `src/services/weatherApi.js`
- API key stored in `.env`, excluded by `.gitignore`

## Setup

1. Install Node.js.
2. Create a WeatherAPI.com key at https://www.weatherapi.com/.
3. Copy `.env.example` to `.env`.
4. Put your key in `.env`:

```env
VITE_WEATHER_API_KEY=your_real_key_here
```

5. Install dependencies:

```bash
npm install
```

6. Start the app:

```bash
npm run dev
```

7. Open the local URL shown by Vite, normally `http://localhost:5173/`.

## GitHub safety

Never commit `.env`. It is already listed in `.gitignore`. Commit `.env.example` instead.

If you accidentally committed your key before, revoke/regenerate that key in WeatherAPI.com and remove the secret from Git history before making the repository public.
