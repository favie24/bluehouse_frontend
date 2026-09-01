import { RefreshCw, Star, Sunrise, Sunset, Thermometer, Droplets, Wind, Gauge, Eye } from 'lucide-react'
import WeatherIcon from './WeatherIcon'
import { formatTemp, formatTime, visibilityKm } from '../utils/weather'

function Detail({ icon: Icon, label, value }) { return <div className="rounded-2xl bg-black/10 p-4"><div className="mb-2 flex items-center gap-2 text-white/60"><Icon size={16}/><span className="text-xs uppercase tracking-wider">{label}</span></div><p className="text-lg font-semibold">{value}</p></div> }

export default function CurrentWeather({ weather, unit, onRefresh, isFavorite, toggleFavorite }) {
  const c = weather.main.temp
  return <section className="glass rounded-3xl p-5 sm:p-7">
    <div className="flex items-start justify-between gap-3">
      <div><p className="text-sm font-medium text-white/60">Current weather</p><h2 className="mt-1 text-2xl font-bold">{weather.name}, {weather.sys.country}</h2></div>
      <div className="flex gap-2"><button title="Refresh" onClick={onRefresh} className="rounded-full bg-white/10 p-3 hover:bg-white/20"><RefreshCw size={18}/></button><button title="Favorite" onClick={toggleFavorite} className={`rounded-full p-3 hover:bg-white/20 ${isFavorite ? 'bg-yellow-400/20 text-yellow-200' : 'bg-white/10'}`}><Star size={18} fill={isFavorite ? 'currentColor' : 'none'}/></button></div>
    </div>
    <div className="my-6 flex flex-col items-center justify-between gap-5 sm:flex-row sm:items-center">
      <div className="flex items-center"><WeatherIcon icon={weather.weather[0].icon} size={125}/><div><div className="flex items-start"><span className="text-7xl font-bold tracking-tight">{formatTemp(c, unit)}</span><span className="mt-2 text-2xl font-semibold">°{unit}</span></div><p className="mt-1 text-xl capitalize text-white/80">{weather.weather[0].description}</p></div></div>
      <div className="grid grid-cols-2 gap-3 text-right sm:text-left"><div><p className="text-xs text-white/50">Feels like</p><p className="font-semibold">{formatTemp(weather.main.feels_like, unit)}°{unit}</p></div><div><p className="text-xs text-white/50">High / Low</p><p className="font-semibold">{formatTemp(weather.main.temp_max, unit)}° / {formatTemp(weather.main.temp_min, unit)}°</p></div></div>
    </div>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      <Detail icon={Thermometer} label="Feels like" value={`${formatTemp(weather.main.feels_like, unit)}°${unit}`} />
      <Detail icon={Droplets} label="Humidity" value={`${weather.main.humidity}%`} />
      <Detail icon={Wind} label="Wind" value={`${Math.round(weather.wind.speed * 3.6)} km/h`} />
      <Detail icon={Gauge} label="Pressure" value={`${weather.main.pressure} hPa`} />
      <Detail icon={Eye} label="Visibility" value={visibilityKm(weather.visibility)} />
    </div>
    <div className="mt-3 grid grid-cols-2 gap-3"><Detail icon={Sunrise} label="Sunrise" value={formatTime(weather.sys.sunrise, weather.timezone)} /><Detail icon={Sunset} label="Sunset" value={formatTime(weather.sys.sunset, weather.timezone)} /></div>
  </section>
}
