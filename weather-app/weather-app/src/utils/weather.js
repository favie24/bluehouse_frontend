export const iconUrl = (icon) => icon?.startsWith('//') ? `https:${icon}` : icon?.startsWith('http') ? icon : `https://openweathermap.org/img/wn/${icon}@2x.png`

export function weatherTheme(main = '') {
  const value = main.toLowerCase()
  if (value.includes('thunder')) return 'from-slate-950 via-indigo-900 to-purple-900'
  if (value.includes('rain') || value.includes('drizzle')) return 'from-slate-800 via-blue-900 to-cyan-900'
  if (value.includes('snow')) return 'from-slate-700 via-sky-800 to-indigo-900'
  if (value.includes('mist') || value.includes('fog') || value.includes('haze')) return 'from-slate-700 via-slate-600 to-blue-900'
  if (value.includes('cloud')) return 'from-slate-700 via-blue-800 to-indigo-900'
  return 'from-sky-500 via-blue-600 to-indigo-800'
}

export const formatHour = (dateString) => new Intl.DateTimeFormat(undefined, { hour: 'numeric' }).format(new Date(dateString))
export const formatTime = (unix, timezone = 0) => new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' }).format(new Date((unix + timezone) * 1000))
export const formatDay = (dateString) => new Intl.DateTimeFormat(undefined, { weekday: 'short' }).format(new Date(dateString))

export function celsiusToFahrenheit(celsius) { return (celsius * 9) / 5 + 32 }
export function formatTemp(celsius, unit) { return Math.round(unit === 'F' ? celsiusToFahrenheit(celsius) : celsius) }
export function visibilityKm(meters) { return `${(meters / 1000).toFixed(1)} km` }
