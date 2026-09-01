import { Search, MapPin } from 'lucide-react'
import { useState } from 'react'

export default function SearchBar({ onSearch, onLocation }) {
  const [query, setQuery] = useState('')
  const submit = (e) => { e.preventDefault(); if (query.trim()) onSearch(query.trim()) }
  return <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
    <div className="glass flex flex-1 items-center rounded-2xl px-4">
      <Search size={20} className="text-white/60" />
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search for a city..." className="w-full bg-transparent px-3 py-4 text-white outline-none placeholder:text-white/50" />
    </div>
    <button type="button" onClick={onLocation} className="glass flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold text-white transition hover:bg-white/20"><MapPin size={18}/> Current location</button>
    <button className="rounded-2xl bg-white px-6 py-3 font-bold text-slate-900 shadow-lg transition hover:-translate-y-0.5" type="submit">Search</button>
  </form>
}
