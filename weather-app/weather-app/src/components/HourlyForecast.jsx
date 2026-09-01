import { Clock3 } from 'lucide-react'
import WeatherIcon from './WeatherIcon'
import { formatHour, formatTemp } from '../utils/weather'

export default function HourlyForecast({ forecast, unit }) {
  const items = forecast.list.slice(0, 8)
  return <section className="glass rounded-3xl p-5 sm:p-6"><div className="mb-4 flex items-center gap-2"><Clock3 size={18}/><h3 className="text-lg font-bold">Hourly forecast</h3><span className="ml-auto text-xs text-white/50">3-hour intervals</span></div><div className="grid grid-cols-4 gap-2 sm:grid-cols-8">{items.map((item, i) => <div key={item.dt} className={`rounded-2xl p-2 text-center transition hover:-translate-y-1 ${i === 0 ? 'bg-white/15' : 'bg-black/10'}`}><p className="text-xs text-white/60">{i === 0 ? 'Now' : formatHour(item.dt_txt)}</p><WeatherIcon icon={item.weather[0].icon} size={55}/><p className="font-bold">{formatTemp(item.main.temp, unit)}°</p><p className="mt-1 text-[10px] capitalize text-white/50">{item.weather[0].main}</p></div>)}</div></section>
}
