import { useState, useEffect } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Icon } from '../../../components/ui/Icon';
import { TeamForm } from './TeamForm';
import { ModalTeamProps } from './ModalTeam.props';

const FORM_ID = 'team-form';

export function ModalTeam({ isOpen = false, onClose, onSave, initialData = null }) {
  const [formData, setFormData] = useState({ ...TeamForm.INITIAL_DATA });

  const isEditing = initialData !== null;

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          ...TeamForm.INITIAL_DATA,
          name: initialData.name || '',
          categoryIds: (initialData.categoryIds || []).map((c) => c._id || c),
          logo: null,
        });
      } else {
        setFormData({ ...TeamForm.INITIAL_DATA });
      }
    }
  }, [isOpen, initialData]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.(formData);
  };

  return (
    <Modal
      test-id="el-m9t2e4m6"
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Editar Equipo' : 'Nuevo Equipo'}
      subtitle={isEditing ? 'Modifica los datos del equipo' : 'Completa los datos del equipo'}
      icon="shield"
      size="md"
      actions={
        <>
          <Button variant="danger" size="sm" className="btn-outline" onClick={() => onClose?.()}>
            Cancelar
          </Button>
          <Button type="submit" form={FORM_ID} variant="primary" size="sm" className="gap-2">
            <Icon name="save" className="text-[18px]" />
            {isEditing ? 'Guardar Cambios' : 'Guardar Equipo'}
          </Button>
        </>
      }
    >
      <TeamForm
        formId={FORM_ID}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        initialData={initialData}
      />
    </Modal>
  );
}

ModalTeam.propTypes = ModalTeamProps;
