import { Icon } from '../../../components/ui/Icon/Icon';
import { CREATABLE_ROLES } from '../../../config/roles';
import { UserFormProps } from './UserForm.props';

const LABEL_CLS = 'font-semibold text-[13px] text-base-content/70';
const INPUT_CLS =
  'input input-bordered input-sm w-full bg-base-200/50 border-base-300 text-sm transition-all focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/15';
const INPUT_ICON_CLS = `${INPUT_CLS} pl-9`;
const ICON_CLS =
  'absolute left-2.5 top-1/2 -translate-y-1/2 text-primary text-lg z-[1] pointer-events-none';

const SELECT_CLS =
  'select select-bordered select-sm w-full bg-base-200 border-base-300 text-sm focus:outline-none focus:border-primary pl-9';

export function UserForm({
  formId,
  formData,
  onChange,
  onSubmit,
  isEditing = false,
}) {
  return (
    <form id={formId} onSubmit={onSubmit}>
      {!isEditing && (
        <div className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded-xl animate-in fade-in duration-300">
          <div className="form-control">
            <label className="label py-1">
              <span className={`${LABEL_CLS} text-primary`}>
                Código de Registro del Club{' '}
                <span className="text-error">*</span>
              </span>
            </label>
            <div className="relative">
              <Icon name="vpn_key" className={ICON_CLS} />
              <input
                type="text"
                className={INPUT_ICON_CLS}
                required={!isEditing}
                value={formData.registrationCode}
                onChange={(e) => onChange('registrationCode', e.target.value)}
                placeholder="Introduce el código (Ej: FOOTMIND2024)"
              />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <div className="form-control">
          <label className="label py-1">
            <span className={LABEL_CLS}>
              Nombre Completo <span className="text-error">*</span>
            </span>
          </label>
          <div className="relative">
            <Icon name="person" className={ICON_CLS} />
            <input
              type="text"
              className={INPUT_ICON_CLS}
              required
              value={formData.fullName}
              onChange={(e) => onChange('fullName', e.target.value)}
              placeholder="Nombre y apellidos"
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label py-1">
            <span className={LABEL_CLS}>
              Email <span className="text-error">*</span>
            </span>
          </label>
          <div className="relative">
            <Icon name="mail" className={ICON_CLS} />
            <input
              type="email"
              className={INPUT_ICON_CLS}
              required
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="correo@ejemplo.com"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <div className="form-control">
          <label className="label py-1">
            <span className={LABEL_CLS}>
              Rol en el Club <span className="text-error">*</span>
            </span>
          </label>
          <div className="relative">
            <Icon name="admin_panel_settings" className={ICON_CLS} />
            <select
              className={SELECT_CLS}
              value={formData.role}
              onChange={(e) => onChange('role', e.target.value)}
            >
              {CREATABLE_ROLES.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-control">
          <label className="label py-1">
            <span className={LABEL_CLS}>
              Contraseña{' '}
              {isEditing && (
                <span className="text-xs font-normal opacity-70">
                  (Opcional)
                </span>
              )}
            </span>
          </label>
          <div className="relative">
            <Icon name="lock" className={ICON_CLS} />
            <input
              type="password"
              className={INPUT_ICON_CLS}
              required={!isEditing}
              minLength={6}
              value={formData.password}
              onChange={(e) => onChange('password', e.target.value)}
              placeholder={
                isEditing
                  ? 'Dejar en blanco para no cambiar'
                  : 'Mínimo 6 caracteres'
              }
            />
          </div>
        </div>
      </div>
    </form>
  );
}

UserForm.INITIAL_DATA = {
  fullName: '',
  email: '',
  role: CREATABLE_ROLES[0].value,
  password: '',
  registrationCode: '',
};

UserForm.propTypes = UserFormProps;
