import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../components/ui/PageHeader'
import { StatsCard } from '../../components/ui/StatsCard'
import { DataTable } from '../../components/ui/DataTable'
import { ModalPlayer } from './components/ModalPlayer'
import { usePlayersTable } from './hooks/usePlayersTable'
import { usePlayersKpis } from './hooks/usePlayersKpis'
import { usePermissions } from '../../hooks/usePermissions'
import { useAuth } from '../../hooks/useAuth'
import { jugadoresData as initialJugadores } from './data/mockData'

export function PlayersList() {
  const navigate = useNavigate()
  const { checkPermission } = usePermissions()
  const { isAdmin, user } = useAuth()
  const categoryId = user?.categoryId?._id || user?.categoryId || null
  const kpis = usePlayersKpis(isAdmin ? null : categoryId)

  const [jugadores, setJugadores] = useState(initialJugadores)

  const [modalOpen, setModalOpen] = useState(false)
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

  const handleNuevoJugador = () => {
    setJugadorSeleccionado(null)
    setModalOpen(true)
  }

  const handleEditarJugador = (jugador) => {
    setJugadorSeleccionado(jugador)
    setModalOpen(true)
  }

  const handleVerDetalle = (jugador) => {
    navigate(`/jugadores/${jugador.id}`)
  }

  const handleGuardarJugador = (datos) => {
    // TODO: reemplazar por llamada al backend
    if (jugadorSeleccionado) {
      setJugadores(
        jugadores.map((j) => (j.id === jugadorSeleccionado.id ? { ...j, ...datos } : j))
      )
    } else {
      setJugadores([datos, ...jugadores])
    }
  }

  const handleDarDeBaja = (jugador) => {
    if (confirm(`¿Estás seguro de dar de baja a ${jugador.nombre} ${jugador.apellidos}?`)) {
      setJugadores(
        jugadores.map((j) => (j.id === jugador.id ? { ...j, estado: 'No disponible' } : j))
      )
    }
  }

  const handleEliminarSeleccionados = (selectedRows) => {
    const nombres = selectedRows.map((j) => `${j.nombre} ${j.apellidos}`).join(', ')
    if (confirm(`¿Estás seguro de eliminar a ${selectedRows.length} jugador(es)?\n${nombres}`)) {
      const ids = selectedRows.map((j) => j.id)
      setJugadores((prev) => prev.filter((j) => !ids.includes(j.id)))
    }
  }

  const { columns, actions, filters, searchConfig } = usePlayersTable({
    onVerDetalle: handleVerDetalle,
    onEditar: checkPermission('players.edit') ? handleEditarJugador : undefined,
    onDarDeBaja: checkPermission('players.edit') ? handleDarDeBaja : undefined,
    isAdmin,
  })

  const canCreate = checkPermission('players.create')

  return (
    <div test-id="el-f4g5h6i7">
      <PageHeader
        title="Jugadores"
        subtitle="Gestiona la plantilla del equipo"
        {...(canCreate && {
          actionLabel: "Nuevo Jugador",
          actionIcon: "add",
          onAction: handleNuevoJugador,
        })}
      />

      {!isAdmin && <div className="grid grid-cols-4 gap-4 mt-6">
        <StatsCard
          title="Disponibles"
          value={kpis?.available ?? '–'}
          icon="check_circle"
          variant="success"
        />
        <StatsCard
          title="Lesionados"
          value={kpis?.injured ?? '–'}
          icon="personal_injury"
          variant={kpis?.injured > 0 ? 'error' : 'success'}
        />
        <StatsCard
          title="Sancionados"
          value={kpis?.sanctioned ?? '–'}
          icon="gavel"
          variant={kpis?.sanctioned > 0 ? 'warning' : 'success'}
        />
        <StatsCard
          title="Riesgo convocatoria"
          value={kpis?.convocationRisk ? 'Sí' : 'No'}
          subtitle={kpis ? `Mínimo requerido: ${kpis.minimumRequired}` : ''}
          icon="warning"
          variant={kpis?.convocationRisk ? 'error' : 'success'}
        />
      </div>}

      <div className="mt-4">
        <DataTable
          columns={columns}
          data={jugadores}
          selectable={canCreate}
          {...(canCreate && {
            bulkActions: [
              {
                label: 'Eliminar',
                icon: 'delete',
                variant: 'danger',
                onClick: handleEliminarSeleccionados,
              },
            ],
          })}
          actions={actions}
          filters={filters}
          {...searchConfig}
          pagination
          paginationPerPage={8}
          paginationRowsPerPageOptions={[8, 15, 20]}
          onRowClick={handleVerDetalle}
        />
      </div>

      <ModalPlayer
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={jugadorSeleccionado}
        onSave={handleGuardarJugador}
      />
    </div>
  )
}
