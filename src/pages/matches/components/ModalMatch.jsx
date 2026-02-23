import { useState, useEffect } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Icon } from '../../../components/ui/Icon';
import { MatchForm } from './MatchForm';
import { getTeams } from '../../../services/teamsService';
import { getNextJourney, validateJourney, checkDuplicate, checkDate } from '../../../services/matchesService';
import { showErrorInModal } from '../../../utils/alerts';
import { toLocalDateTimeInput } from '../data/matchesConfig';
import { ModalMatchProps } from './ModalMatch.props';

const FORM_ID = 'match-form';

export function ModalMatch({ isOpen = false, onClose, onSave, initialData = null, categoryOptions = [] }) {
  const [formData, setFormData] = useState({ ...MatchForm.INITIAL_DATA });
  const [teamOptions, setTeamOptions] = useState([]);
  const [journeyError, setJourneyError] = useState('');
  const [duplicateError, setDuplicateError] = useState('');
  const [dateError, setDateError] = useState('');

  const isEditing = initialData !== null;

  useEffect(() => {
    if (!isOpen) return;
    setJourneyError('');
    setDuplicateError('');
    setDateError('');
    if (initialData) {
      setFormData({
        ...MatchForm.INITIAL_DATA,
        categoryId: initialData.categoryId?._id || initialData.categoryId || '',
        dateTime: toLocalDateTimeInput(initialData.dateTime),
        journey: initialData.journey ?? '',
        venue: initialData.venue || null,
        status: initialData.status || 'scheduled',
        homeScore: initialData.homeScore ?? '',
        awayScore: initialData.awayScore ?? '',
      });
    } else {
      setFormData({ ...MatchForm.INITIAL_DATA });
    }
  }, [isOpen, initialData]);

  useEffect(() => {
    if (isEditing || !formData.categoryId) return;
    getNextJourney(formData.categoryId)
      .then(({ nextJourney }) => setFormData((prev) => ({ ...prev, journey: String(nextJourney) })))
      .catch(() => {});
  }, [formData.categoryId, isEditing]);

  useEffect(() => {
    if (!formData.categoryId || !formData.journey) {
      setJourneyError('');
      return;
    }
    const excludeId = isEditing ? initialData?._id : null;
    const timer = setTimeout(() => {
      validateJourney(formData.categoryId, formData.journey, excludeId)
        .then(({ valid }) => setJourneyError(valid ? '' : 'Esta jornada ya tiene un partido asignado'))
        .catch(() => setJourneyError(''));
    }, 500);
    return () => clearTimeout(timer);
  }, [formData.journey, formData.categoryId, isEditing, initialData]);

  useEffect(() => {
    if (isEditing || !formData.categoryId || !formData.opponentId) {
      setDuplicateError('');
      return;
    }
    checkDuplicate(formData.categoryId, formData.opponentId, formData.isHome)
      .then(({ exists }) => {
        if (exists) {
          const msg = 'Ya existe un partido contra este rival en la temporada actual';
          setDuplicateError(msg);
          showErrorInModal(msg, 'Partido duplicado');
        } else {
          setDuplicateError('');
        }
      })
      .catch(() => setDuplicateError(''));
  }, [formData.categoryId, formData.opponentId, formData.isHome, isEditing]);

  useEffect(() => {
    const isComplete = formData.dateTime.length === 16;
    if (!formData.categoryId || !isComplete) {
      setDateError('');
      return;
    }
    const excludeId = isEditing ? initialData?._id : null;
    const timer = setTimeout(() => {
      checkDate(formData.categoryId, formData.dateTime, excludeId)
        .then(({ available }) => setDateError(available ? '' : 'Ya hay un partido programado para esa fecha en esta categoría'))
        .catch(() => setDateError(''));
    }, 400);
    return () => clearTimeout(timer);
  }, [formData.dateTime, formData.categoryId, isEditing, initialData]);

  useEffect(() => {
    const cid = formData.categoryId;
    if (!isOpen || !cid) { setTeamOptions([]); return; }
    getTeams(cid)
      .then((teams) => setTeamOptions(teams.map((t) => ({ value: t._id, label: t.name }))))
      .catch(() => setTeamOptions([]));
  }, [formData.categoryId, isOpen]);

  const handleChange = (name, value) => {
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'categoryId') next.opponentId = '';
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (journeyError || duplicateError || dateError) return;
    if (!isEditing && !formData.opponentId) {
      showErrorInModal('Selecciona un equipo rival válido de la lista', 'Rival no seleccionado');
      return;
    }
    const payload = {
      ...(!isEditing && {
        categoryId: formData.categoryId,
        opponentId: formData.opponentId,
        isHome: formData.isHome,
      }),
      dateTime: new Date(formData.dateTime).toISOString(),
      ...(formData.journey !== '' && { journey: parseInt(formData.journey) }),
      ...(formData.venue && { venue: formData.venue }),
      ...(isEditing && { status: formData.status }),
      ...(formData.status === 'finished' && {
        homeScore: formData.homeScore !== '' ? parseInt(formData.homeScore) : 0,
        awayScore: formData.awayScore !== '' ? parseInt(formData.awayScore) : 0,
      }),
    };
    onSave?.(payload);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Editar Partido' : 'Nuevo Partido'}
      subtitle={isEditing ? 'Modifica los datos del partido' : 'Completa los datos del partido'}
      icon={isEditing ? 'edit' : 'sports_soccer'}
      size="lg"
      actions={
        <>
          <Button variant="danger" size="sm" className="btn-outline" onClick={() => onClose?.()}>
            Cancelar
          </Button>
          <Button type="submit" form={FORM_ID} variant="primary" size="sm" className="gap-2" isDisabled={!!(journeyError || duplicateError || dateError)}>
            <Icon name="save" className="text-[18px]" />
            {isEditing ? 'Guardar Cambios' : 'Guardar Partido'}
          </Button>
        </>
      }
    >
      <MatchForm
        formId={FORM_ID}
        formData={formData}
        isEditing={isEditing}
        categoryOptions={categoryOptions}
        teamOptions={teamOptions}
        journeyError={journeyError}
        duplicateError={duplicateError}
        dateError={dateError}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}

ModalMatch.propTypes = ModalMatchProps;
