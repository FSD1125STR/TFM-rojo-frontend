import { useState, useEffect } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Icon } from '../../../components/ui/Icon';
import { PlayerForm } from './PlayerForm';
import { ModalPlayerProps } from './ModalPlayer.props';
import { getPlayers } from '../../../services/playersService';

function nextAvailableDorsal(players) {
  const taken = new Set(players.map((p) => p.dorsal).filter(Boolean));
  for (let i = 1; i <= 99; i++) {
    if (!taken.has(i)) return i;
  }
  return '';
}

const FORM_ID = 'player-form';

export function ModalPlayer({ isOpen = false, onClose, onSave, initialData = null, isAdmin = false, categoryId = null }) {
  const [formData, setFormData] = useState({ ...PlayerForm.INITIAL_DATA });
  const [edad, setEdad] = useState(null);

  const isEditing = initialData !== null;

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          ...PlayerForm.INITIAL_DATA,
          nombre:            initialData.firstName ?? '',
          apellidos:         initialData.lastName  ?? '',
          fechaNacimiento:   initialData.birthDate
            ? new Date(initialData.birthDate).toISOString().split('T')[0] : '',
          telefono:          initialData.phone     ?? '',
          ciudad:            initialData.city      ?? '',
          provincia:         initialData.province  ?? '',
          direccion:         initialData.address   ?? '',
          email:             initialData.email     ?? '',
          dorsal:            initialData.dorsal    ?? '',
          posicion:          initialData.position  ?? '',
          estado:            initialData.status    ?? '',
          foto:              null,
          photoUrl:          initialData.photoUrl  ?? '',
          categoriaId:       initialData.categoryId ?? '',
          sanctionMatches:   initialData.sanction?.totalMatches ?? '',
          sanctionStartDate: initialData.sanction?.startDate
            ? new Date(initialData.sanction.startDate).toISOString().split('T')[0]
            : '',
        });
        setEdad(PlayerForm.calcularEdad(
          initialData.birthDate
            ? new Date(initialData.birthDate).toISOString().split('T')[0]
            : null
        ));
      } else {
        setFormData({ ...PlayerForm.INITIAL_DATA, categoriaId: isAdmin ? '' : (categoryId || '') });
        setEdad(null);
      }
    }
  }, [isOpen, initialData, isAdmin, categoryId]);

  useEffect(() => {
    if (isEditing || !formData.categoriaId) return;
    getPlayers(formData.categoriaId)
      .then((players) => setFormData((prev) => ({ ...prev, dorsal: nextAvailableDorsal(players) })))
      .catch(() => {});
  }, [formData.categoriaId, isEditing]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'fechaNacimiento') {
      setEdad(PlayerForm.calcularEdad(value));
    }
  };

  const POSITION_MAP = {
    'Portero': 'PO', 'Defensa': 'DFC', 'Centrocampista': 'MC', 'Delantero': 'DC',
  };
  const STATUS_MAP = {
    'Disponible': 'DISPONIBLE', 'Lesionado': 'LESIONADO',
    'Sancionado': 'SANCIONADO', 'No disponible': 'NO_DISPONIBLE',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.({
      fullName:          `${formData.nombre} ${formData.apellidos}`.trim(),
      birthDate:         formData.fechaNacimiento,
      position:          POSITION_MAP[formData.posicion] ?? formData.posicion,
      status:            STATUS_MAP[formData.estado]     ?? formData.estado,
      dorsal:            formData.dorsal ? parseInt(formData.dorsal) : undefined,
      email:             formData.email,
      phone:             formData.telefono,
      city:              formData.ciudad,
      province:          formData.provincia,
      address:           formData.direccion,
      categoryId:        formData.categoriaId || undefined,
      foto:              formData.foto,
      photoUrl:          formData.photoUrl,
      edad,
      sanctionMatches:   formData.sanctionMatches ? parseInt(formData.sanctionMatches) : undefined,
      sanctionStartDate: formData.sanctionStartDate || undefined,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Editar Jugador' : 'Nuevo Jugador'}
      subtitle={isEditing ? 'Modifica los datos del jugador' : 'Completa los datos del jugador'}
      icon={isEditing ? 'edit' : 'person_add'}
      size="lg"
      actions={
        <>
          <Button variant="danger" size="sm" className="btn-outline" onClick={() => onClose?.()}>
            Cancelar
          </Button>
          <Button type="submit" form={FORM_ID} variant="primary" size="sm" className="gap-2">
            <Icon name="save" className="text-[18px]" />
            {isEditing ? 'Guardar Cambios' : 'Guardar Jugador'}
          </Button>
        </>
      }
    >
      <PlayerForm
        formId={FORM_ID}
        formData={formData}
        edad={edad}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isAdmin={isAdmin}
      />
    </Modal>
  );
}

ModalPlayer.propTypes = ModalPlayerProps;
