import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../components/ui/PageHeader'
import { StatsCard } from '../../components/ui/StatsCard'
import { DataTable } from '../../components/ui/DataTable'
import { ModalPersona } from '../../components/ui/ModalPersona'
import { usePlayersTable } from './hooks/usePlayersTable'
import {
  jugadoresData as initialJugadores,
  getStatsPorPosicion,
} from './data/mockData'

export function PlayersList() {
  const navigate = useNavigate()

  const [jugadores, setJugadores] = useState(initialJugadores)

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

      localStorage.removeItem('jugadorEditado')
    }
  }, [])

  const stats = useMemo(() => getStatsPorPosicion(jugadores), [jugadores])

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

  const { columns, actions, filters, searchConfig } = usePlayersTable({
    onVerDetalle: handleVerDetalle,
    onEditar: handleEditarJugador,
    onDarDeBaja: handleDarDeBaja,
  })

  return (
    <div test-id="el-f4g5h6i7">
      <PageHeader
        title="Jugadores"
        subtitle="Gestiona la plantilla del equipo"
        actionLabel="Nuevo Jugador"
        actionIcon="add"
        onAction={handleNuevoJugador}
      />

      <div className="grid grid-cols-4 gap-4 mt-6">
        <StatsCard title="Total Jugadores" value={stats.total} variant="accent" />
        <StatsCard title="Porteros" value={stats.porteros} variant="accent" />
        <StatsCard title="Defensas" value={stats.defensas} variant="accent" />
        <StatsCard title="Delanteros" value={stats.delanteros} variant="accent" />
      </div>

      <div className="mt-4">
        <DataTable
          columns={columns}
          data={jugadores}
          actions={actions}
          filters={filters}
          {...searchConfig}
          pagination
          paginationPerPage={8}
          paginationRowsPerPageOptions={[8, 15, 20]}
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
