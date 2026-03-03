import { useState, useEffect } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { RadioChipGroup } from '../../../components/ui/RadioChipGroup';
import { MANUAL_REASON_CODES, REASON_CONFIG } from '../data/callupsConfig';
import { NoCallupReasonModalProps } from './NoCallupReasonModal.props';

const REASON_OPTIONS = MANUAL_REASON_CODES.map((code) => ({
  value: code,
  label: REASON_CONFIG[code].label,
  icon: REASON_CONFIG[code].icon,
  activeColor: REASON_CONFIG[code].activeColor,
}));

export function NoCallupReasonModal({ isOpen = false, playerName, onConfirm, onCancel }) {
  const [reasonCode, setReasonCode] = useState(MANUAL_REASON_CODES[0]);

  useEffect(() => {
    if (isOpen) setReasonCode(MANUAL_REASON_CODES[0]);
  }, [isOpen]);

  const handleConfirm = () => {
    if (reasonCode) onConfirm?.(reasonCode);
  };

  return (
    <Modal
      test-id="el-n4r4s1n2"
      isOpen={isOpen}
      onClose={onCancel}
      title="No convocar jugador"
      subtitle={playerName ? `Motivo para no convocar a ${playerName}` : 'Selecciona el motivo'}
      icon="person_off"
      size="sm"
      actions={
        <>
          <Button variant="ghost" size="sm" onClick={() => onCancel?.()}>
            Cancelar
          </Button>
          <Button variant="primary" size="sm" isDisabled={!reasonCode} onClick={handleConfirm}>
            Confirmar
          </Button>
        </>
      }
    >
      <div test-id="el-n4r4b4d2" className="py-2">
        <p className="text-sm text-base-content/70 mb-4">
          Indica el motivo por el que este jugador no será convocado:
        </p>
        <RadioChipGroup
          options={REASON_OPTIONS}
          value={reasonCode}
          onChange={setReasonCode}
        />
      </div>
    </Modal>
  );
}

NoCallupReasonModal.propTypes = NoCallupReasonModalProps;
