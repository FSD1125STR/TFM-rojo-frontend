import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../ui/Icon/Icon'
import { searchGlobal } from '../../../services/searchService'

const CATEGORY_CONFIG = {
  players:  { label: 'Jugadores',     icon: 'group',           basePath: '/jugadores' },
  matches:  { label: 'Partidos',      icon: 'sports_soccer',   basePath: '/partidos' },
  callups:  { label: 'Convocatorias', icon: 'assignment',      basePath: '/convocatorias' },
  users:    { label: 'Usuarios',      icon: 'manage_accounts', basePath: '/usuarios' },
}

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const containerRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (query.length < 2) {
      setResults(null)
      setIsOpen(false)
      return
    }

    const timer = setTimeout(async () => {
      setIsLoading(true)
      try {
        const data = await searchGlobal(query)
        setResults(data)
        setIsOpen(true)
      } catch {
        setResults(null)
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') setIsOpen(false)
  }, [])

  const handleSelect = useCallback((basePath, id) => {
    navigate(`${basePath}/${id}`)
    setIsOpen(false)
    setQuery('')
  }, [navigate])

  const categories = results
    ? Object.entries(CATEGORY_CONFIG).filter(([key]) => results[key]?.length > 0)
    : []

  const hasResults = categories.length > 0

  return (
    <div test-id="el-s1b2a3r4" ref={containerRef} className="relative w-full max-w-xl">
      <div className="relative">
        <Icon
          name="search"
          size="sm"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 z-10 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Buscar jugadores, partidos, equipos..."
          className="input w-full pl-10 bg-base-200 border-0 focus:outline-none focus:ring-1 focus:ring-primary/30 rounded-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results && setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {isLoading && (
          <span className="loading loading-spinner loading-xs absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40" />
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-base-100 rounded-lg shadow-lg border border-base-300 z-50 max-h-96 overflow-y-auto">
          {hasResults ? (
            categories.map(([key, config]) => (
              <div key={key}>
                <div className="flex items-center gap-2 px-4 py-2 border-b border-base-200">
                  <Icon name={config.icon} size="sm" className="text-base-content/50" />
                  <span className="text-xs font-semibold uppercase text-base-content/50">
                    {config.label}
                  </span>
                </div>
                {results[key].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="flex items-center gap-3 w-full text-left px-4 py-2.5 hover:bg-base-200 cursor-pointer transition-colors"
                    onClick={() => handleSelect(config.basePath, item.id)}
                  >
                    <span className="font-medium text-sm">{item.name}</span>
                    {item.subtitle && (
                      <span className="text-xs text-base-content/50">{item.subtitle}</span>
                    )}
                  </button>
                ))}
              </div>
            ))
          ) : (
            <div className="px-4 py-6 text-center text-sm text-base-content/50">
              No se encontraron resultados para &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  )
}
