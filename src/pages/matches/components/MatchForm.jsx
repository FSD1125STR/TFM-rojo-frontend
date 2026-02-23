import { Icon } from '../../../components/ui/Icon';
import { SearchableSelect } from '../../../components/ui/SearchableSelect';
import { MatchFormProps } from './MatchForm.props';

const statusOptions = [
  { value: 'scheduled', label: 'Programado' },
  { value: 'cancelled', label: 'Cancelado' },
];

const LABEL_CLS = 'font-semibold text-[13px] text-base-content/70';
const INPUT_CLS = 'input input-bordered input-sm w-full bg-base-200/50 border-base-300 text-sm transition-all placeholder:text-base-content/40 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/15';
const INPUT_ICON_CLS = `${INPUT_CLS} pl-9`;
const SELECT_CLS = 'select select-bordered select-sm w-full bg-base-200 border-base-300 text-sm transition-all focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/15';
const ICON_CLS = 'absolute left-2.5 top-1/2 -translate-y-1/2 text-primary text-lg z-[1] pointer-events-none';

export function MatchForm({ formId, formData, isEditing, categoryOptions = [], teamOptions = [], journeyError = '', duplicateError = '', dateError = '', onChange, onSubmit }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const opponentDisabled = !formData.categoryId;

  return (
    <form id={formId} onSubmit={onSubmit} test-id="el-f2a3b4c5">
      {!isEditing && (
        <>
          <div className="form-control mb-3">
            <label className="label py-1">
              <span className={LABEL_CLS}>Categoría <span className="text-error">*</span></span>
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className={SELECT_CLS}
              required
            >
              <option value="">Seleccionar categoría</option>
              {categoryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="form-control">
              <label className="label py-1">
                <span className={LABEL_CLS}>
                  Equipo rival <span className="text-error">*</span>
                </span>
              </label>
              <SearchableSelect
                name="opponentId"
                value={formData.opponentId}
                onChange={(val) => onChange('opponentId', val)}
                options={teamOptions}
                placeholder={opponentDisabled ? 'Selecciona primero una categoría' : 'Buscar equipo rival...'}
                disabled={opponentDisabled}
                error={!!duplicateError}
                required
              />
              {duplicateError && (
                <span className="text-error text-[11px] mt-0.5 flex items-center gap-1">
                  <Icon name="error" className="text-[13px]" />
                  {duplicateError}
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label py-1">
                <span className={LABEL_CLS}>Tipo de partido <span className="text-error">*</span></span>
              </label>
              <select
                name="isHome"
                value={formData.isHome ? 'local' : 'visitante'}
                onChange={(e) => onChange('isHome', e.target.value === 'local')}
                className={SELECT_CLS}
                required
              >
                <option value="local">Local</option>
                <option value="visitante">Visitante</option>
              </select>
            </div>
          </div>
        </>
      )}

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="form-control">
          <label className="label py-1">
            <span className={LABEL_CLS}>Fecha y hora <span className="text-error">*</span></span>
          </label>
          <div className="relative">
            <Icon name="calendar_today" className={ICON_CLS} />
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              className={`${INPUT_ICON_CLS} ${dateError ? 'border-error focus:border-error focus:ring-error/15' : ''}`}
              required
            />
          </div>
          {dateError && (
            <span className="text-error text-[11px] mt-0.5 flex items-center gap-1">
              <Icon name="error" className="text-[13px]" />
              {dateError}
            </span>
          )}
        </div>
        <div className="form-control">
          <label className="label py-1">
            <span className={LABEL_CLS}>Jornada</span>
          </label>
          <div className="relative">
            <Icon name="flag" className={ICON_CLS} />
            <input
              type="number"
              name="journey"
              value={formData.journey}
              onChange={handleChange}
              className={`${INPUT_ICON_CLS} ${journeyError ? 'border-error focus:border-error focus:ring-error/15' : ''}`}
              placeholder="Nº jornada"
              min="1"
            />
          </div>
          {journeyError && (
            <span className="text-error text-[11px] mt-0.5 flex items-center gap-1">
              <Icon name="error" className="text-[13px]" />
              {journeyError}
            </span>
          )}
        </div>
      </div>

      <div className={`grid gap-3 mb-3 ${isEditing ? 'grid-cols-2' : 'grid-cols-1'}`}>
        <div className="form-control">
          <label className="label py-1">
            <span className={LABEL_CLS}>Sede</span>
          </label>
          <div className="relative">
            <Icon name="location_on" className={ICON_CLS} />
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              className={INPUT_ICON_CLS}
              placeholder="Nombre del estadio o campo"
            />
          </div>
        </div>
        {isEditing && (
          <div className="form-control">
            <label className="label py-1">
              <span className={LABEL_CLS}>Estado</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={SELECT_CLS}
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {formData.status === 'finished' && (
        <div className="grid grid-cols-2 gap-3">
          <div className="form-control">
            <label className="label py-1">
              <span className={LABEL_CLS}>Goles local</span>
            </label>
            <input
              type="number"
              name="homeScore"
              value={formData.homeScore}
              onChange={handleChange}
              className={INPUT_CLS}
              placeholder="0"
              min="0"
            />
          </div>
          <div className="form-control">
            <label className="label py-1">
              <span className={LABEL_CLS}>Goles visitante</span>
            </label>
            <input
              type="number"
              name="awayScore"
              value={formData.awayScore}
              onChange={handleChange}
              className={INPUT_CLS}
              placeholder="0"
              min="0"
            />
          </div>
        </div>
      )}
    </form>
  );
}

MatchForm.INITIAL_DATA = {
  categoryId: '',
  opponentId: '',
  isHome: true,
  dateTime: '',
  journey: '',
  venue: '',
  status: 'scheduled',
  homeScore: '',
  awayScore: '',
};

MatchForm.propTypes = MatchFormProps;
