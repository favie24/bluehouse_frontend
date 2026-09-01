import { iconUrl } from '../utils/weather'
export default function WeatherIcon({ icon, size = 100, alt = 'Weather icon' }) { return <img src={iconUrl(icon)} width={size} height={size} alt={alt} className="object-contain" /> }
