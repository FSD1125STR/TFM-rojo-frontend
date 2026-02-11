import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../components/ui/PageHeader'
import { StatsCard } from '../../components/ui/StatsCard'
import { SearchInput } from '../../components/ui/SearchInput'
import { SelectFilter } from '../../components/ui/SelectFilter'
import { DataTable } from '../../components/ui/DataTable'
import { Badge } from '../../components/ui/Badge'
import { Avatar } from '../../components/ui/Avatar/Avatar'
import { ModalPersona } from '../../components/ui/ModalPersona'
import {
  jugadoresData as initialJugadores,
  posicionOptions,
  estadoOptions,
  posicionConfig,
  estadoConfig,
  getStatsPorPosicion,
} from './data/mockData'

export function PlayersList() {
  const navigate = useNavigate()

  const [jugadores, setJugadores] = useState(initialJugadores)

  const [searchTerm, setSearchTerm] = useState('')
  const [posicionFilter, setPosicionFilter] = useState('')
  const [estadoFilter, setEstadoFilter] = useState('')

  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('nuevo') 
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null)

  useEffect(() => {
    const jugadorEditadoStr = localStorage.getItem('jugadorEditado')
    if (jugadorEditadoStr) {
      const jugadorEditado = JSON.parse(jugadorEditadoStr)

      setJugadores((prev) => {
        const sinEditado = prev.filter((j) => j.id !== jugadorEditado.id)
        return [jugadorEditado, ...sinEditado]
      })

      setSearchTerm('')
      setPosicionFilter('')
      setEstadoFilter('')

      localStorage.removeItem('jugadorEditado')
    }
  }, [])

  const stats = useMemo(() => getStatsPorPosicion(jugadores), [jugadores])

  const jugadoresFiltrados = useMemo(() => {
    return jugadores.filter((jugador) => {
      const nombreCompleto = `${jugador.nombre} ${jugador.apellidos}`.toLowerCase()
      const matchSearch =
        searchTerm === '' ||
        nombreCompleto.includes(searchTerm.toLowerCase()) ||
        jugador.dorsal.toString().includes(searchTerm)
      const matchPosicion = posicionFilter === '' || jugador.posicion === posicionFilter
      const matchEstado = estadoFilter === '' || jugador.estado === estadoFilter
      return matchSearch && matchPosicion && matchEstado
    })
  }, [jugadores, searchTerm, posicionFilter, estadoFilter])

  const handleNuevoJugador = () => {
    setJugadorSeleccionado(null)
    setModalMode('nuevo')
    setModalOpen(true)
  }

  const handleEditarJugador = (jugador) => {
    setJugadorSeleccionado(jugador)
    setModalMode('editar')
    setModalOpen(true)
  }

  const handleVerDetalle = (jugador) => {
    navigate(`/jugadores/${jugador.id}`)
  }

  const handleGuardarJugador = (datos) => {
    if (modalMode === 'nuevo') {
      const nuevoJugador = {
        ...datos,
        id: Math.max(...jugadores.map((j) => j.id)) + 1,
        partidos: 0,
        minutos: 0,
        goles: 0,
        asistencias: 0,
        tarjetasAmarillas: 0,
        tarjetasRojas: 0,
      }

      setJugadores([nuevoJugador, ...jugadores])

      setSearchTerm('')
      setPosicionFilter('')
      setEstadoFilter('')
    } else {
      setJugadores(
        jugadores.map((j) => (j.id === jugadorSeleccionado.id ? { ...j, ...datos } : j))
      )
    }
    setModalOpen(false)
  }

  const handleDarDeBaja = (jugador) => {
    if (confirm(`¿Estás seguro de dar de baja a ${jugador.nombre} ${jugador.apellidos}?`)) {
      setJugadores(
        jugadores.map((j) => (j.id === jugador.id ? { ...j, estado: 'No disponible' } : j))
      )
    }
  }

  const columns = [
    {
      key: 'nombre',
      label: 'Jugador',
      width: '220px',
      sortable: true,
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', pointerEvents: 'none' }}>
          <Avatar name={`${row.nombre} ${row.apellidos}`} size="sm" />
          <span style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>{row.nombre} {row.apellidos}</span>
        </div>
      ),
    },
    { key: 'dorsal', label: 'Dorsal', width: '110px', align: 'center', sortable: true },
    {
      key: 'posicion',
      label: 'Posición',
      width: '170px',
      align: 'center',
      sortable: true,
      render: (value) => (
        <div style={{ pointerEvents: 'none' }}>
          <Badge
            variant="custom"
            size="sm"
            icon={posicionConfig[value]?.icon}
            customColor={posicionConfig[value]?.color}
            minWidth="130px"
          >
            {value}
          </Badge>
        </div>
      ),
    },
    { key: 'edad', label: 'Edad', width: '100px', align: 'center', sortable: true },
    { key: 'partidos', label: 'Partidos', width: '120px', align: 'center', sortable: true },
    { key: 'goles', label: 'Goles', width: '100px', align: 'center', sortable: true },
    {
      key: 'estado',
      label: 'Estado',
      width: '160px',
      align: 'center',
      sortable: true,
      render: (value) => (
        <div style={{ pointerEvents: 'none' }}>
          <Badge
            variant={estadoConfig[value]?.variant || 'neutral'}
            size="sm"
            icon={estadoConfig[value]?.icon}
            minWidth="120px"
          >
            {value}
          </Badge>
        </div>
      ),
    },
  ]

  const actions = [
    { label: 'Ver detalle', icon: 'visibility', onClick: handleVerDetalle },
    { label: 'Editar', icon: 'edit', onClick: handleEditarJugador },
    { label: 'Dar de baja', icon: 'person_off', onClick: handleDarDeBaja, variant: 'danger' },
  ]

  return (
    <div style={{ padding: '24px' }}>

      <PageHeader
        title="Jugadores"
        subtitle="Gestiona la plantilla del equipo"
        actions={
          <button className="btn btn-neutral btn-sm gap-2" onClick={handleNuevoJugador}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
            Nuevo Jugador
          </button>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '24px' }}>
        <StatsCard title="Total Jugadores" value={stats.total} variant="accent" />
        <StatsCard title="Porteros" value={stats.porteros} variant="accent" />
        <StatsCard title="Defensas" value={stats.defensas} variant="accent" />
        <StatsCard title="Delanteros" value={stats.delanteros} variant="accent" />
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '16px', marginBottom: '16px' }}>
        <div style={{ flex: 2 }}>
          <SearchInput
            placeholder="Buscar por nombre o dorsal..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>
        <SelectFilter
          options={posicionOptions}
          value={posicionFilter}
          onChange={setPosicionFilter}
          placeholder="Todas las posiciones"
        />
        <SelectFilter
          options={estadoOptions}
          value={estadoFilter}
          onChange={setEstadoFilter}
          placeholder="Todos los estados"
        />
      </div>

      <div style={{ background: 'oklch(95% 0.03 155)', borderRadius: '12px', overflow: 'hidden' }}>
        <DataTable
          columns={columns}
          data={jugadoresFiltrados}
          actions={actions}
          pagination={true}
          paginationPerPage={11}
          paginationRowsPerPageOptions={[11, 15, 20]}
          onRowClick={handleVerDetalle}
        />
      </div>

      <ModalPersona
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode="jugador"
        isEditing={modalMode === 'editar'}
        initialData={jugadorSeleccionado}
        onSave={handleGuardarJugador}
      />
    </div>
  )
}
