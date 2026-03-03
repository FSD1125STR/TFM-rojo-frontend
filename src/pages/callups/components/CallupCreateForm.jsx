import { DateTimePicker } from '../../../components/ui/DateTimePicker';
import { PlacesAutocomplete } from '../../../components/ui/PlacesAutocomplete';
import { Icon } from '../../../components/ui/Icon';
import { CallupCreateFormProps } from './CallupCreateForm.props';

const LABEL_CLS = 'font-semibold text-[13px] text-base-content/70';

export function CallupCreateForm({ formId, data, onChange, onSubmit }) {
  return (
    <form id={formId} onSubmit={onSubmit} test-id="el-c1f2r3m4">
      <div className="form-control mb-4">
        <label className="label py-1">
          <span className={LABEL_CLS}>
            Fecha y hora de concentración <span className="text-error">*</span>
          </span>
        </label>
        <DateTimePicker
          name="callupDateTime"
          value={data.callupDateTime}
          onChange={(val) => onChange('callupDateTime', val)}
          required
        />
      </div>

      <div className="form-control">
        <label className="label py-1">
          <span className={LABEL_CLS}>Lugar de concentración</span>
        </label>
        <PlacesAutocomplete
          name="meetingPoint"
          value={data.meetingPoint}
          onChange={(name, val) => onChange(name, val)}
          placeholder="Buscar estadio o campo..."
        />
        {data.meetingPoint?.lat && data.meetingPoint?.lng && (
          <a
            href={`https://www.google.com/maps?q=${data.meetingPoint.lat},${data.meetingPoint.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-primary hover:underline mt-1.5 w-fit"
          >
            <Icon name="open_in_new" className="text-[12px]" />
            Ver en Google Maps
          </a>
        )}
      </div>
    </form>
  );
}

CallupCreateForm.INITIAL_DATA = {
  callupDateTime: '',
  meetingPoint: null,
};

CallupCreateForm.propTypes = CallupCreateFormProps;
