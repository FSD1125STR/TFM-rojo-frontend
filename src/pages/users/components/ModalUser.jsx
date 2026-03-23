import { useState, useEffect } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Icon } from '../../../components/ui/Icon';
import { UserForm } from './UserForm';
import { ModalUserProps } from './ModalUser.props';

const FORM_ID = "user-form";

export function ModalUser({
  isOpen = false,
  onClose,
  onSave,
  initialData = null,
}) {
  const [formData, setFormData] = useState({ ...UserForm.INITIAL_DATA });

  const isEditing = !!initialData;

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          ...UserForm.INITIAL_DATA,
          fullName: initialData.fullName || "",
          email: initialData.email || "",
          phone: initialData.phone || "",
          role: initialData.role || "entrenador",
          registrationCode: "",
          password: "",
          categoryId:
            initialData.categoryId?._id || initialData.categoryId || "",
        });
      } else {
        setFormData({ ...UserForm.INITIAL_DATA });
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
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Editar Miembro" : "Nuevo Miembro del Staff"}
      subtitle={
        isEditing
          ? "Modifica los datos del integrante del staff"
          : "Asigna un nuevo acceso al sistema para un integrante del club"
      }
      icon={isEditing ? "edit" : "person_add"}
      size="lg"
      actions={
        <>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancelar
          </Button>

          <Button
            type="submit"
            form={FORM_ID}
            variant="primary"
            size="sm"
            className="gap-2"
          >
            <Icon name="save" size="sm" />
            {isEditing ? "Guardar Cambios" : "Crear Usuario"}
          </Button>
        </>
      }
    >
      <UserForm
        formId={FORM_ID}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEditing={isEditing}
      />
    </Modal>
  );
}

ModalUser.propTypes = ModalUserProps;
