import { useCallback, useEffect, useMemo, useState } from 'react'
import { CloudSun, LocateFixed, Moon, Sun, RefreshCw } from 'lucide-react'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import HourlyForecast from './components/HourlyForecast'
import Forecast from './components/Forecast'
import CityLists from './components/CityLists'
import Loader from './components/Loader'
import ErrorState from './components/ErrorState'
import { getForecastByCoordinates, getWeatherByCity, getWeatherByCoordinates } from './services/weatherApi'
import { weatherTheme } from './utils/weather'
import { useLocalStorage } from './hooks/useLocalStorage'

export default function App() {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [unit, setUnit] = useLocalStorage('weather-unit', 'C')
  const [favorites, setFavorites] = useLocalStorage('weather-favorites', [])
  const [recent, setRecent] = useLocalStorage('weather-recent', [])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [darkOverlay, setDarkOverlay] = useState(false)

  const loadWeather = useCallback(async (city) => {
    setLoading(true); setError('')
    try {
      const current = await getWeatherByCity(city)
      const nextForecast = await getForecastByCoordinates(current.coord.lat, current.coord.lon)
      setWeather(current); setForecast(nextForecast)
      setRecent(prev => [current.name, ...prev.filter(x => x.toLowerCase() !== current.name.toLowerCase())].slice(0, 6))
    } catch (e) { setError(e.message) } finally { setLoading(false) }
  }, [setRecent])

  const loadLocation = useCallback((lat, lon) => {
    setLoading(true); setError('')
    Promise.all([getWeatherByCoordinates(lat, lon), getForecastByCoordinates(lat, lon)])
      .then(([current, nextForecast]) => { setWeather(current); setForecast(nextForecast); setRecent(prev => [current.name, ...prev.filter(x => x.toLowerCase() !== current.name.toLowerCase())].slice(0,6)) })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [setRecent])

  useEffect(() => { loadWeather('Lagos') }, [loadWeather])

  const currentTheme = useMemo(() => weatherTheme(weather?.weather?.[0]?.main), [weather])
  const refresh = () => weather ? loadLocation(weather.coord.lat, weather.coord.lon) : loadWeather('Lagos')
  const useLocation = () => {
    if (!navigator.geolocation) { setError('Geolocation is not supported by your browser.'); return }
    navigator.geolocation.getCurrentPosition(pos => loadLocation(pos.coords.latitude, pos.coords.longitude), () => setError('Location permission was denied. You can search for your city instead.'))
  }
  const toggleFavorite = () => setFavorites(prev => prev.includes(weather.name) ? prev.filter(x => x !== weather.name) : [...prev, weather.name])

  return <main className={`relative min-h-screen overflow-hidden bg-gradient-to-br ${currentTheme} text-white transition-colors duration-1000`}>
    <div className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-drift" />
    <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl animate-drift" />
    {darkOverlay && <div className="pointer-events-none fixed inset-0 z-0 bg-black/20" />}
    <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-7 flex items-center justify-between gap-4"><div className="flex items-center gap-3"><div className="rounded-2xl bg-white/15 p-3"><CloudSun size={27}/></div><div><h1 className="text-2xl font-black tracking-tight">SkyCast</h1><p className="text-xs text-white/55">Weather, beautifully simple.</p></div></div><div className="flex items-center gap-2"><button title="Refresh" onClick={refresh} className="glass rounded-full p-3 hover:bg-white/20"><RefreshCw size={18}/></button><button title="Toggle atmosphere" onClick={() => setDarkOverlay(v => !v)} className="glass rounded-full p-3 hover:bg-white/20">{darkOverlay ? <Sun size={18}/> : <Moon size={18}/>}</button><div className="glass flex rounded-full p-1"><button onClick={() => setUnit('C')} className={`rounded-full px-3 py-1.5 text-sm font-bold ${unit === 'C' ? 'bg-white text-slate-900' : 'text-white/60'}`}>°C</button><button onClick={() => setUnit('F')} className={`rounded-full px-3 py-1.5 text-sm font-bold ${unit === 'F' ? 'bg-white text-slate-900' : 'text-white/60'}`}>°F</button></div></div></header>
      <SearchBar onSearch={loadWeather} onLocation={useLocation}/>
      {error && <div className="mt-6"><ErrorState message={error} onRetry={refresh}/></div>}
      {loading && !error && <div className="mt-6"><Loader/></div>}
      {!loading && !error && weather && forecast && <div className="mt-6 space-y-5">
        <CurrentWeather weather={weather} unit={unit} onRefresh={refresh} isFavorite={favorites.includes(weather.name)} toggleFavorite={toggleFavorite}/>
        <HourlyForecast forecast={forecast} unit={unit}/>
        <div className="grid gap-5 lg:grid-cols-[1.4fr_.9fr]"><Forecast forecast={forecast} unit={unit}/><CityLists favorites={favorites} recent={recent} onSelect={loadWeather} removeFavorite={city => setFavorites(prev => prev.filter(x => x !== city))}/></div>
      </div>}
      <footer className="mt-8 flex items-center justify-center gap-2 pb-3 text-xs text-white/45"><LocateFixed size={13}/> Powered by OpenWeather • Data may be delayed slightly</footer>
    </div>
  </main>
}
