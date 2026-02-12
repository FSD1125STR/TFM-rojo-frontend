import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PageHeader } from '../../components/ui/PageHeader'
import { Card } from '../../components/ui/Card'
import { InfoItem } from '../../components/ui/InfoItem'
import { StatBox } from '../../components/ui/StatBox'
import { Badge } from '../../components/ui/Badge'
import { Tabs } from '../../components/ui/Tabs'
import { DataTable } from '../../components/ui/DataTable'
import { ModalPersona } from '../../components/ui/ModalPersona'
import { usePlayerDetailTable } from './hooks/usePlayerDetailTable'
import {
  jugadoresData,
  historialPartidosData,
  historialTabs,
  formatFecha,
  posicionConfig,
  estadoConfig,
} from './data/mockData'

export function PlayerDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const jugadorInicial = jugadoresData.find((j) => j.id === parseInt(id))

  const [jugador, setJugador] = useState(jugadorInicial)
  const [modalOpen, setModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('todos')

  const historialCompleto = historialPartidosData[id] || []

  const historialFiltrado = useMemo(() => {
    switch (activeTab) {
      case 'ultimos5':
        return historialCompleto.slice(0, 5)
      case 'casa':
        return historialCompleto.filter((p) => p.esLocal)
      case 'fuera':
        return historialCompleto.filter((p) => !p.esLocal)
      default:
        return historialCompleto
    }
  }, [historialCompleto, activeTab])

  if (!jugadorInicial) {
    return (
      <div test-id="el-p7l8y9r0" className="p-6 text-center">
        <h2>Jugador no encontrado</h2>
        <button className="btn btn-primary mt-4" onClick={() => navigate('/jugadores')}>
          Volver a la lista
        </button>
      </div>
    )
  }

  const handleBack = () => {
    navigate('/jugadores')
  }

  const handleEditar = () => {
    setModalOpen(true)
  }

  const handleGuardar = (datos) => {

    const jugadorActualizado = { ...jugador, ...datos }
    setJugador(jugadorActualizado)

    localStorage.setItem('jugadorEditado', JSON.stringify(jugadorActualizado))
    setModalOpen(false)
  }

  const fechaNacimientoFormateada = formatFecha(jugador.fechaNacimiento)

  const { columns: historialColumns } = usePlayerDetailTable()

  const promedioMinutos =
    historialCompleto.length > 0
      ? Math.round(historialCompleto.reduce((acc, p) => acc + p.minutos, 0) / historialCompleto.length)
      : 0

  return (
    <div test-id="el-p7l8y9r0">
      <PageHeader
        title={`${jugador.nombre} ${jugador.apellidos}`}
        subtitle={`Dorsal ${jugador.dorsal} · ${jugador.posicion}`}
        showBack
        onBack={handleBack}
        actionLabel="Editar Jugador"
        actionIcon="edit"
        onAction={handleEditar}
      />

      <div className="grid grid-cols-[1fr_1.5fr] gap-4 mt-6">

        <Card title="Información Personal">
          <div className="flex flex-col gap-4">
            <InfoItem
              icon="calendar_month"
              label="Fecha de Nacimiento"
              value={`${fechaNacimientoFormateada} (${jugador.edad} años)`}
            />
            <InfoItem icon="mail" label="Email" value={jugador.email} />
            <InfoItem icon="phone" label="Teléfono" value={jugador.telefono} />
            <InfoItem icon="location_on" label="Dirección" value={jugador.direccion} />
            <InfoItem
              icon="sports_soccer"
              label="Posición"
              badge={
                <Badge
                  variant="custom"
                  size="sm"
                  icon={posicionConfig[jugador.posicion]?.icon}
                  customColor={posicionConfig[jugador.posicion]?.color}
                >
                  {jugador.posicion}
                </Badge>
              }
            />
            <InfoItem
              icon="bolt"
              label="Estado"
              badge={
                <Badge
                  variant={estadoConfig[jugador.estado]?.variant || 'neutral'}
                  size="sm"
                  icon={estadoConfig[jugador.estado]?.icon}
                >
                  {jugador.estado}
                </Badge>
              }
            />
          </div>
        </Card>


        <Card title="Estadísticas de la Temporada" icon="trending_up">
          <div className="grid grid-cols-6 gap-4 mb-5">
            <StatBox value={jugador.partidos} label="Partidos" />
            <StatBox value={jugador.minutos} label="Minutos" />
            <StatBox value={jugador.goles} label="Goles" />
            <StatBox value={jugador.asistencias} label="Asistencias" />
            <StatBox value={jugador.tarjetasAmarillas} label="T. Amarillas" color="yellow" />
            <StatBox value={jugador.tarjetasRojas} label="T. Rojas" color="red" />
          </div>
          <p className="text-center text-sm text-base-content/70 m-0">
            Promedio de minutos por partido: <strong>{promedioMinutos} min</strong>
          </p>
        </Card>
      </div>

      <div className="mt-4">
        <Card title="Historial de Partidos">
          <div className="mb-4">
            <Tabs tabs={historialTabs} activeTab={activeTab} onChange={setActiveTab} />
          </div>
          {historialFiltrado.length > 0 ? (
            <DataTable columns={historialColumns} data={historialFiltrado} />
          ) : (
            <div className="py-10 text-center text-base-content/50">
              No hay partidos para mostrar
            </div>
          )}
        </Card>
      </div>

      <ModalPersona
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode="jugador"
        isEditing={true}
        initialData={jugador}
        onSave={handleGuardar}
      />
    </div>
  )
}
