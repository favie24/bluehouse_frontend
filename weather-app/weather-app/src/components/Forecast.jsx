import WeatherIcon from './WeatherIcon'
import { formatDay, formatTemp } from '../utils/weather'

export default function Forecast({ forecast, unit }) {
  const days = Object.values(forecast.list.reduce((acc, item) => { const key = item.dt_txt.slice(0,10); if (!acc[key]) acc[key] = item; return acc }, {})).slice(0,5)
  return <section className="glass rounded-3xl p-5 sm:p-6"><h3 className="mb-4 text-lg font-bold">5-day outlook</h3><div className="space-y-2">{days.map(item => <div key={item.dt} className="flex items-center justify-between rounded-2xl bg-black/10 px-4 py-3"><span className="w-16 font-medium">{formatDay(item.dt_txt)}</span><div className="flex items-center gap-2"><WeatherIcon icon={item.weather[0].icon} size={46}/><span className="capitalize text-white/70">{item.weather[0].description}</span></div><span className="font-bold">{formatTemp(item.main.temp_max ?? item.main.temp, unit)}° / {formatTemp(item.main.temp_min ?? item.main.temp, unit)}°</span></div>)}</div></section>
}
