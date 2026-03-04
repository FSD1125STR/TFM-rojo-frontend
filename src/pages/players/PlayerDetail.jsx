import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { ModalPlayer } from './components/ModalPlayer';
import { PlayerInfoCard } from './components/PlayerInfoCard';
import { PlayerStatsCard } from './components/PlayerStatsCard';
import { PlayerMatchHistory } from './components/PlayerMatchHistory';
import { usePermissions } from '../../hooks/usePermissions';
import { useAuth } from '../../hooks/useAuth';
import { getPlayerById, getPlayerMatches, updatePlayer } from '../../services/playersService';
import { showToast, showErrorInModal, showLoadingInModal, closeLoading } from '../../utils/alerts';

export function PlayerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { checkPermission } = usePermissions();
  const { isAdmin, user } = useAuth();
  const categoryId = user?.categoryId?._id || user?.categoryId || null;

  const [jugador, setJugador] = useState(null);
  const [loading, setLoading] = useState(true);
  const [historial, setHistorial] = useState([]);
  const [loadingHistorial, setLoadingHistorial] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getPlayerById(id)
      .then(setJugador)
      .catch(console.error)
      .finally(() => setLoading(false));

    getPlayerMatches(id)
      .then(setHistorial)
      .catch(console.error)
      .finally(() => setLoadingHistorial(false));
  }, [id]);

  const canEdit = checkPermission('players.edit');

  if (loading) {
    return <div className="p-6 text-center">Cargando...</div>;
  }

  if (!jugador) {
    return (
      <div test-id="el-n0t4f0u5" className="p-6 text-center">
        <h2>Jugador no encontrado</h2>
        <Button variant="primary" className="mt-4" onClick={() => navigate('/jugadores')}>
          Volver a la lista
        </Button>
      </div>
    );
  }

  const handleGuardar = async (datos) => {
    const fd = new FormData();
    Object.entries(datos).forEach(([k, v]) => {
      if (k === 'foto' || k === 'photoUrl' || k === 'edad') return;
      if (v !== undefined && v !== null) fd.append(k, v);
    });
    if (datos.foto instanceof File) fd.append('photo', datos.foto);
    if (datos.foto === false) fd.append('removePhoto', 'true');

    showLoadingInModal('Actualizando jugador...');
    try {
      await updatePlayer(jugador.id, fd);
      const fresh = await getPlayerById(id);
      setJugador(fresh);
      closeLoading();
      setModalOpen(false);
      showToast('Jugador actualizado correctamente');
    } catch (err) {
      closeLoading();
      showErrorInModal(err?.response?.data?.error || 'Error al guardar el jugador');
    }
  };

  return (
    <div test-id="el-p7l8y9r0">
      <PageHeader
        title={`${jugador.firstName} ${jugador.lastName}`}
        subtitle={`Dorsal ${jugador.dorsal} · ${jugador.position}`}
        showBack
        onBack={() => navigate('/jugadores')}
        {...(canEdit && {
          actionLabel: 'Editar Jugador',
          actionIcon: 'edit',
          onAction: () => setModalOpen(true),
        })}
      />

      <div className="grid grid-cols-[1fr_1.5fr] gap-4 mt-6">
        <PlayerInfoCard jugador={jugador} />
        <PlayerStatsCard jugador={jugador} historial={historial} />
      </div>

      <div className="mt-4">
        <PlayerMatchHistory historial={historial} loading={loadingHistorial} />
      </div>

      {canEdit && (
        <ModalPlayer
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialData={jugador}
          onSave={handleGuardar}
          isAdmin={isAdmin}
          categoryId={categoryId}
        />
      )}
    </div>
  );
}
