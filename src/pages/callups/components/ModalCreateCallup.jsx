import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Icon } from '../../../components/ui/Icon';
import { CallupCreateForm } from './CallupCreateForm';
import { showErrorInModal } from '../../../utils/alerts';
import { ModalCreateCallupProps } from './ModalCreateCallup.props';

const FORM_ID = 'callup-create-form';

const getDefaultCallupDateTime = (match) => {
  if (!match?.dateTime) return '';
  const offsetMin = match.isHome ? 75 : 195;
  const date = new Date(new Date(match.dateTime).getTime() - offsetMin * 60_000);
  return format(date, "yyyy-MM-dd'T'HH:mm");
};

export function ModalCreateCallup({ isOpen = false, onClose, onSave, match }) {
  const [formData, setFormData] = useState({ ...CallupCreateForm.INITIAL_DATA });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setFormData({
      ...CallupCreateForm.INITIAL_DATA,
      callupDateTime: getDefaultCallupDateTime(match),
      meetingPoint: match?.venue ?? null,
    });
    setSaving(false);
  }, [isOpen, match]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.callupDateTime) {
      showErrorInModal('La fecha y hora de concentración es obligatoria');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        callupDateTime: new Date(formData.callupDateTime).toISOString(),
        ...(formData.meetingPoint && {
          meetingPoint: {
            place: formData.meetingPoint.name,
            address: formData.meetingPoint.displayName,
            ...(formData.meetingPoint.lat != null && { lat: formData.meetingPoint.lat }),
            ...(formData.meetingPoint.lng != null && { lng: formData.meetingPoint.lng }),
          },
        }),
      };
      await onSave?.(payload);
      onClose?.();
    } catch (err) {
      showErrorInModal(err.response?.data?.error || err.message || 'Error al crear la convocatoria');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      test-id="el-m4c4l1p2"
      isOpen={isOpen}
      onClose={onClose}
      title="Nueva Convocatoria"
      subtitle="Define la fecha y punto de encuentro"
      icon="assignment_turned_in"
      size="md"
      actions={
        <>
          <Button variant="danger" size="sm" className="btn-outline" onClick={() => onClose?.()}>
            Cancelar
          </Button>
          <Button
            type="submit"
            form={FORM_ID}
            variant="primary"
            size="sm"
            isLoading={saving}
            className="gap-2"
          >
            <Icon name="check" className="text-[18px]" />
            Crear Convocatoria
          </Button>
        </>
      }
    >
      <CallupCreateForm
        formId={FORM_ID}
        data={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}

ModalCreateCallup.propTypes = ModalCreateCallupProps;
