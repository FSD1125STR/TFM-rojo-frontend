import { Card } from '../../../components/ui/Card';
import { Avatar } from '../../../components/ui/Avatar';
import { Badge } from '../../../components/ui/Badge';
import { InfoItem } from '../../../components/ui/InfoItem';
import { formatFecha, posicionConfig, estadoConfig } from '../data/mockData';

export function PlayerInfoCard({ jugador }) {
  const fechaNacimientoFormateada = formatFecha(jugador.birthDate);
  const estado = estadoConfig[jugador.status];
  const posicion = posicionConfig[jugador.position];

  return (
    <Card padding="none">
      <div className="bg-base-300 px-5 py-4 flex items-center gap-3.5 border-b border-base-300 rounded-t-xl">
        <Avatar
          src={jugador.photoUrl || undefined}
          name={`${jugador.firstName} ${jugador.lastName}`}
          size="lg"
          variant="primary"
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[15px] text-base-content leading-tight truncate">
            {jugador.firstName} {jugador.lastName}
          </p>
          <p className="text-xs text-base-content/50 mt-0.5">Dorsal #{jugador.dorsal}</p>
        </div>
        <div className={jugador.status !== 'Disponible' ? 'animate-pulse' : ''}>
          {jugador.sanction ? (
            <div
              className="tooltip tooltip-bottom"
              data-tip={`Cumplidos: ${jugador.sanction.totalMatches - jugador.sanction.remainingMatches} de ${jugador.sanction.totalMatches} · Restantes: ${jugador.sanction.remainingMatches}`}
            >
              <Badge variant={estado?.variant || 'neutral'} size="sm" icon={estado?.icon}>
                {jugador.status}
              </Badge>
            </div>
          ) : (
            <Badge variant={estado?.variant || 'neutral'} size="sm" icon={estado?.icon}>
              {jugador.status}
            </Badge>
          )}
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-base-300" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-base-content/40">
            Información Personal
          </span>
          <div className="flex-1 h-px bg-base-300" />
        </div>

        <div className="flex flex-col gap-3">
          <InfoItem
            icon="calendar_month"
            label="Nacimiento"
            value={`${fechaNacimientoFormateada} · ${jugador.age} años`}
          />
          <InfoItem icon="mail" label="Email" value={jugador.email} href={`mailto:${jugador.email}`} />
          <InfoItem icon="phone" label="Teléfono" value={jugador.phone} href={`tel:${jugador.phone}`} />
          <InfoItem icon="location_on" label="Dirección" value={jugador.address} />
        </div>

        <div className="border-t border-base-300 mt-4 pt-4">
          <InfoItem
            icon="sports_soccer"
            label="Posición"
            badge={
              <Badge variant="custom" size="sm" minWidth="140px" icon={posicion?.icon} customColor={posicion?.color}>
                {jugador.position}
              </Badge>
            }
          />
        </div>
      </div>
    </Card>
  );
}
