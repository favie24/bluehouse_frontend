const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.weatherapi.com/v1'

async function request(path, params) {
  if (!API_KEY) throw new Error('Missing WeatherAPI key. Add VITE_WEATHER_API_KEY to weather-app/.env, then restart the dev server.')
  const query = new URLSearchParams({ ...params, key: API_KEY })
  const response = await fetch(`${BASE_URL}/${path}?${query}`)
  const data = await response.json()
  if (!response.ok) throw new Error(data.error?.message || 'Unable to load weather data.')
  return data
}

function toEpoch(date, time) {
  const [hours, minutes] = time.split(':').map(Number)
  const [year, month, day] = date.split('-').map(Number)
  return Date.UTC(year, month - 1, day, hours, minutes)
}

function normalizeCurrent(data) {
  const { location, current } = data
  return {
    name: location.name,
    sys: { country: location.country, sunrise: 0, sunset: 0 },
    coord: { lat: location.lat, lon: location.lon },
    timezone: 0,
    main: { temp: current.temp_c, feels_like: current.feelslike_c, temp_max: current.temp_c, temp_min: current.temp_c, humidity: current.humidity, pressure: current.pressure_mb },
    wind: { speed: current.wind_kph / 3.6 },
    visibility: current.vis_km * 1000,
    weather: [{ main: current.condition.text, description: current.condition.text, icon: current.condition.icon }]
  }
}

function normalizeForecast(data) {
  const list = data.forecast.forecastday.flatMap(day => day.hour.map(hour => ({
    dt: toEpoch(day.date, hour.time.slice(11, 16)) / 1000,
    dt_txt: `${day.date} ${hour.time.slice(11, 16)}:00`,
    main: { temp: hour.temp_c, temp_max: hour.temp_c, temp_min: hour.temp_c },
    weather: [{ main: hour.condition.text, description: hour.condition.text, icon: hour.condition.icon }]
  })))
  return { list }
}

async function requestWeather(query) {
  return request('forecast.json', { q: query, days: 5, aqi: 'no', alerts: 'no' })
}

export const getWeatherByCity = async (city) => normalizeCurrent(await requestWeather(city))
export const getForecastByCoordinates = async (lat, lon) => normalizeForecast(await requestWeather(`${lat},${lon}`))
export const getWeatherByCoordinates = async (lat, lon) => normalizeCurrent(await requestWeather(`${lat},${lon}`))
