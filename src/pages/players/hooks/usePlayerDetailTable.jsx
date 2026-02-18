import { Badge } from '../../../components/ui/Badge';
import { formatFecha } from '../data/mockData';

export function usePlayerDetailTable() {
  const columns = [
    {
      key: 'fecha',
      label: 'Fecha',
      width: '15%',
      render: (value) => formatFecha(value),
    },
    { key: 'rival', label: 'Rival', width: '25%' },
    {
      key: 'resultado',
      label: 'Resultado',
      width: '12%',
      align: 'center',
      render: (_, row) => {
        const golesNuestros = row.esLocal ? row.golesA : row.golesB;
        const golesRival = row.esLocal ? row.golesB : row.golesA;

        let colorConfig;
        if (golesNuestros > golesRival) {
          colorConfig = { bg: '#86efac', text: '#166534' };
        } else if (golesNuestros < golesRival) {
          colorConfig = { bg: '#fca5a5', text: '#991b1b' };
        } else {
          colorConfig = { bg: '#d1d5db', text: '#374151' };
        }

        return (
          <Badge variant="custom" size="sm" customColor={colorConfig}>
            {row.golesA}-{row.golesB}
          </Badge>
        );
      },
    },
    {
      key: 'minutos',
      label: 'Minutos',
      width: '10%',
      align: 'center',
      render: (value) => `${value}'`,
    },
    {
      key: 'goles',
      label: 'Goles',
      width: '10%',
      align: 'center',
      render: (value) => <strong>{value}</strong>,
    },
    {
      key: 'asistencias',
      label: 'Asistencias',
      width: '13%',
      align: 'center',
      render: (value) => <strong>{value}</strong>,
    },
    {
      key: 'tarjetas',
      label: 'Tarjetas',
      width: '15%',
      align: 'center',
      render: (_, row) => {
        const hayTarjetas = row.tarjetasAmarillas > 0 || row.tarjetasRojas > 0;
        if (!hayTarjetas) return <span className="text-base-content/40">-</span>;
        return (
          <div className="flex gap-1.5 justify-center">
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
        );
      },
    },
  ];

  return { columns };
}
