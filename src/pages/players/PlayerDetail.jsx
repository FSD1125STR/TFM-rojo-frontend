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
      <div style={{ padding: '24px', textAlign: 'center' }}>
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

  const historialColumns = [
    {
      key: 'fecha',
      label: 'Fecha',
      width: '120px',
      render: (value) => formatFecha(value),
    },
    { key: 'rival', label: 'Rival' },
    {
      key: 'resultado',
      label: 'Resultado',
      width: '100px',
      align: 'center',
      render: (_, row) => {

        const golesNuestros = row.esLocal ? row.golesA : row.golesB
        const golesRival = row.esLocal ? row.golesB : row.golesA

        let colorConfig
        if (golesNuestros > golesRival) {
     
          colorConfig = { bg: '#86efac', text: '#166534' }
        } else if (golesNuestros < golesRival) {
     
          colorConfig = { bg: '#fca5a5', text: '#991b1b' }
        } else {
   
          colorConfig = { bg: '#d1d5db', text: '#374151' }
        }

        return (
          <Badge variant="custom" size="sm" customColor={colorConfig}>
            {row.golesA}-{row.golesB}
          </Badge>
        )
      },
    },
    {
      key: 'minutos',
      label: 'Minutos',
      width: '80px',
      align: 'center',
      render: (value) => `${value}'`,
    },
    {
      key: 'goles',
      label: 'Goles',
      width: '70px',
      align: 'center',
      render: (value) => <strong>{value}</strong>,
    },
    {
      key: 'asistencias',
      label: 'Asistencias',
      width: '100px',
      align: 'center',
      render: (value) => <strong>{value}</strong>,
    },
    {
      key: 'tarjetas',
      label: 'Tarjetas',
      width: '100px',
      align: 'center',
      render: (_, row) => {
        const hayTarjetas = row.tarjetasAmarillas > 0 || row.tarjetasRojas > 0
        if (!hayTarjetas) return <span style={{ color: '#9ca3af' }}>-</span>
        return (
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
            {row.tarjetasAmarillas > 0 && (
              <Badge
                variant="custom"
                size="xs"
                customColor={{ bg: '#fde047', text: '#854d0e' }}
                minWidth="28px"
              >
                {row.tarjetasAmarillas}
              </Badge>
            )}
            {row.tarjetasRojas > 0 && (
              <Badge
                variant="custom"
                size="xs"
                customColor={{ bg: '#fca5a5', text: '#991b1b' }}
                minWidth="28px"
              >
                {row.tarjetasRojas}
              </Badge>
            )}
          </div>
        )
      },
    },
  ]


  const promedioMinutos =
    historialCompleto.length > 0
      ? Math.round(historialCompleto.reduce((acc, p) => acc + p.minutos, 0) / historialCompleto.length)
      : 0

  return (
    <div style={{ padding: '24px' }}>

      <PageHeader
        title={`${jugador.nombre} ${jugador.apellidos}`}
        subtitle={`Dorsal ${jugador.dorsal} · ${jugador.posicion}`}
        showBack
        onBack={handleBack}
        actions={
          <button className="btn btn-neutral btn-sm gap-2" onClick={handleEditar}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit</span>
            Editar Jugador
          </button>
        }
      />


      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '16px', marginTop: '24px' }}>

        <Card title="Información Personal">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', marginBottom: '20px' }}>
            <StatBox value={jugador.partidos} label="Partidos" />
            <StatBox value={jugador.minutos} label="Minutos" />
            <StatBox value={jugador.goles} label="Goles" />
            <StatBox value={jugador.asistencias} label="Asistencias" />
            <StatBox value={jugador.tarjetasAmarillas} label="T. Amarillas" color="yellow" />
            <StatBox value={jugador.tarjetasRojas} label="T. Rojas" color="red" />
          </div>
          <p style={{ textAlign: 'center', fontSize: '14px', color: '#4a5568', margin: 0 }}>
            Promedio de minutos por partido: <strong>{promedioMinutos} min</strong>
          </p>
        </Card>
      </div>

      <div style={{ marginTop: '16px' }}>
        <Card title="Historial de Partidos">
          <div style={{ marginBottom: '16px' }}>
            <Tabs tabs={historialTabs} activeTab={activeTab} onChange={setActiveTab} />
          </div>
          {historialFiltrado.length > 0 ? (
            <DataTable columns={historialColumns} data={historialFiltrado} />
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', color: '#718096' }}>
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
