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
import { getPlayers } from '../../services/playersService'
import { showConfirm, showSuccess } from '../../utils/alerts'

export function PlayersList() {
  const navigate = useNavigate()
  const { checkPermission } = usePermissions()
  const { isAdmin, user } = useAuth()
  const categoryId = user?.categoryId?._id || user?.categoryId || null
  const kpis = usePlayersKpis(isAdmin ? null : categoryId)

  const [players, setPlayers] = useState([])

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPlayer, setSelectedPlayer] = useState(null)

  useEffect(() => {
    getPlayers(isAdmin ? null : categoryId).then(setPlayers).catch(console.error)
  }, [isAdmin, categoryId])

  const handleNuevoJugador = () => {
    setSelectedPlayer(null)
    setModalOpen(true)
  }

  const handleEditarJugador = (player) => {
    setSelectedPlayer(player)
    setModalOpen(true)
  }

  const handleVerDetalle = (player) => {
    navigate(`/jugadores/${player.id}`)
  }

  const handleGuardarJugador = (datos) => {
    // TODO: reemplazar por llamada al backend
    if (selectedPlayer) {
      setPlayers(
        players.map((p) => (p.id === selectedPlayer.id ? { ...p, ...datos } : p))
      )
    } else {
      setPlayers([datos, ...players])
    }
  }

  const handleDarDeBaja = (player) => {
    if (confirm(`¿Estás seguro de dar de baja a ${player.firstName} ${player.lastName}?`)) {
      setPlayers(
        players.map((p) => (p.id === player.id ? { ...p, status: 'No disponible' } : p))
      )
    }
  }

  const handleMarcarRecuperado = async (player) => {
    const confirmed = await showConfirm(
      `${player.firstName} ${player.lastName} pasará a estado "Disponible".`,
      '¿Marcar como recuperado?'
    )
    if (confirmed) {
      setPlayers((prev) =>
        prev.map((p) => (p.id === player.id ? { ...p, status: 'Disponible' } : p))
      )
      showSuccess(`${player.firstName} ${player.lastName} está disponible.`)
    }
  }

  const handleEliminarSeleccionados = (selectedRows) => {
    const nombres = selectedRows.map((p) => `${p.firstName} ${p.lastName}`).join(', ')
    if (confirm(`¿Estás seguro de eliminar a ${selectedRows.length} jugador(es)?\n${nombres}`)) {
      const ids = selectedRows.map((p) => p.id)
      setPlayers((prev) => prev.filter((p) => !ids.includes(p.id)))
    }
  }

  const { columns, actions, filters, searchConfig } = usePlayersTable({
    onVerDetalle: handleVerDetalle,
    onEditar: checkPermission('players.edit') ? handleEditarJugador : undefined,
    onDarDeBaja: checkPermission('players.edit') ? handleDarDeBaja : undefined,
    onMarcarRecuperado: checkPermission('players.edit') ? handleMarcarRecuperado : undefined,
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
          data={players}
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
        initialData={selectedPlayer}
        onSave={handleGuardarJugador}
      />
    </div>
  )
}
