import { useState, useEffect } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Icon } from '../../../components/ui/Icon';
import { PlayerForm } from './PlayerForm';
import { ModalPlayerProps } from './ModalPlayer.props';

const FORM_ID = 'player-form';

export function ModalPlayer({ isOpen = false, onClose, onSave, initialData = null }) {
  const [formData, setFormData] = useState({ ...PlayerForm.INITIAL_DATA });
  const [edad, setEdad] = useState(null);

  const isEditing = initialData !== null;

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({ ...PlayerForm.INITIAL_DATA, ...initialData });
        setEdad(PlayerForm.calcularEdad(initialData.fechaNacimiento));
      } else {
        setFormData({ ...PlayerForm.INITIAL_DATA });
        setEdad(null);
      }
    }
  }, [isOpen, initialData]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'fechaNacimiento') {
      setEdad(PlayerForm.calcularEdad(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.({
      ...formData,
      edad,
      ...(formData.dorsal ? { dorsal: parseInt(formData.dorsal) } : {}),
    });
    onClose?.();
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
      />
    </Modal>
  );
}

ModalPlayer.propTypes = ModalPlayerProps;
