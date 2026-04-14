import { useState, useEffect } from 'react';
import { Icon } from '../../../components/ui/Icon';
import { FileUpload } from '../../../components/ui/FileUpload';
import { Avatar } from '../../../components/ui/Avatar';
import { DatePicker } from '../../../components/ui/DatePicker';
import { getCategories } from '../../../services/categoriesService';
import { showError, getApiErrorMsg } from '../../../utils/alerts';
import { PlayerFormProps } from './PlayerForm.props';
import { POSICIONES, ESTADOS } from '../data/playerConfig';

const calcularEdad = (fechaNacimiento) => {
  if (!fechaNacimiento) return null;
  const fecha = new Date(fechaNacimiento);
  const hoy = new Date();
  let edad = hoy.getFullYear() - fecha.getFullYear();
  const mes = hoy.getMonth() - fecha.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
    edad--;
  }
  return edad;
};

const getAgeLabel = (edad) => {
  if (edad === null) return '-- años';
  return edad === 1 ? `${edad} año` : `${edad} años`;
};

const LABEL_CLS = 'font-semibold text-[13px] text-base-content/70';
const INPUT_CLS = 'input input-bordered input-sm w-full bg-base-200/50 border-base-300 text-sm transition-all placeholder:text-base-content/40 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/15';
const INPUT_ICON_CLS = `${INPUT_CLS} pl-9`;
const SELECT_CLS = 'select select-bordered select-sm w-full bg-base-200 border-base-300 text-sm transition-all focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/15';
const ICON_CLS = 'absolute left-2.5 top-1/2 -translate-y-1/2 text-primary text-lg z-[1] pointer-events-none';

export function PlayerForm({ formId, formData, edad, onChange, onSubmit, isAdmin = false }) {
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (isAdmin) {
      getCategories().then((cats) => {
        setCategories(cats.map((c) => ({ value: c._id, label: `${c.name} — ${c.season}` })));
      }).catch((err) => showError(getApiErrorMsg(err, 'Error al cargar las categorías')));
    }
  }, [isAdmin]);

  useEffect(() => {
    if (formData.foto instanceof File) {
      const url = URL.createObjectURL(formData.foto);
      setPhotoPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPhotoPreviewUrl(null);
  }, [formData.foto]);

  const avatarSrc = formData.foto instanceof File
    ? photoPreviewUrl
    : formData.foto === false
      ? null
      : formData.photoUrl || null;

  const avatarName = `${formData.nombre} ${formData.apellidos}`.trim() || '?';

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <form id={formId} onSubmit={onSubmit} test-id="el-p9l5y3r2">
      {isAdmin && (
        <div className="mb-3">
          <div className="form-control">
            <label htmlFor="categoriaId" className="label py-1">
              <span className={LABEL_CLS}>Categoría <span className="text-error">*</span></span>
            </label>
            <select
              id="categoriaId"
              name="categoriaId"
              value={formData.categoriaId}
              onChange={handleChange}
              className={SELECT_CLS}
              required
            >
              <option value="">Seleccionar categoría</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>
      )}
      <div className="grid grid-cols-[1fr_1.3fr_0.7fr] gap-3 mb-3">
        <div className="form-control">
          <label htmlFor="nombre" className="label py-1">
            <span className={LABEL_CLS}>Nombre <span className="text-error">*</span></span>
          </label>
          <div className="relative">
            <Icon name="person" className={ICON_CLS} />
            <input
              id="nombre"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={INPUT_ICON_CLS}
              placeholder="Nombre"
              required
            />
          </div>
        </div>
        <div className="form-control">
          <label htmlFor="apellidos" className="label py-1">
            <span className={LABEL_CLS}>Apellidos <span className="text-error">*</span></span>
          </label>
          <input
            id="apellidos"
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            className={INPUT_CLS}
            placeholder="Apellidos"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="dorsal" className="label py-1">
            <span className={LABEL_CLS}>Dorsal</span>
          </label>
          <div className="relative">
            <Icon name="tag" className={ICON_CLS} />
            <input
              id="dorsal"
              type="number"
              name="dorsal"
              value={formData.dorsal}
              onChange={handleChange}
              className={INPUT_ICON_CLS}
              placeholder="--"
              min="1"
              max="99"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="form-control">
          <label className="label py-1">
            <span className={LABEL_CLS}>Fecha de nacimiento <span className="text-error">*</span></span>
          </label>
          <DatePicker
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={(val) => onChange('fechaNacimiento', val)}
            required
          />
        </div>
        <div className="form-control">
          <div className="label py-1">
            <span className={LABEL_CLS}>Edad</span>
          </div>
          <div className="input input-bordered input-sm w-full flex items-center justify-center gap-1.5 bg-success/15 font-semibold border-success/30">
            <Icon name="cake" className="text-primary text-lg" />
            <span>{getAgeLabel(edad)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="form-control">
          <label htmlFor="email" className="label py-1">
            <span className={LABEL_CLS}>Email <span className="text-error">*</span></span>
          </label>
          <div className="relative validator">
            <Icon name="mail" className={ICON_CLS} />
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={INPUT_ICON_CLS}
              placeholder="correo@ejemplo.com"
              pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
              required
            />
          </div>
          <p className="validator-hint hidden">Introduce un email válido</p>
        </div>
        <div className="form-control">
          <label htmlFor="telefono" className="label py-1">
            <span className={LABEL_CLS}>Teléfono <span className="text-error">*</span></span>
          </label>
          <div className="relative">
            <Icon name="phone" className={ICON_CLS} />
            <input
              id="telefono"
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className={INPUT_ICON_CLS}
              placeholder="+34 600 000 000"
              required
            />
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="form-control">
          <label htmlFor="direccion" className="label py-1">
            <span className={LABEL_CLS}>Dirección <span className="text-error">*</span></span>
          </label>
          <div className="relative">
            <Icon name="location_on" className={ICON_CLS} />
            <input
              id="direccion"
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className={INPUT_ICON_CLS}
              placeholder="Calle, número, piso..."
              required
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="form-control">
          <label htmlFor="ciudad" className="label py-1">
            <span className={LABEL_CLS}>Ciudad <span className="text-error">*</span></span>
          </label>
          <input
            id="ciudad"
            type="text"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            className={INPUT_CLS}
            placeholder="Ciudad"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="provincia" className="label py-1">
            <span className={LABEL_CLS}>Provincia <span className="text-error">*</span></span>
          </label>
          <input
            id="provincia"
            type="text"
            name="provincia"
            value={formData.provincia}
            onChange={handleChange}
            className={INPUT_CLS}
            placeholder="Provincia"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="form-control">
          <label htmlFor="posicion" className="label py-1">
            <span className={LABEL_CLS}>Posición <span className="text-error">*</span></span>
          </label>
          <select
            id="posicion"
            name="posicion"
            value={formData.posicion}
            onChange={handleChange}
            className={SELECT_CLS}
            required
          >
            <option value="">Seleccionar posición</option>
            {POSICIONES.map((pos) => (
              <option key={pos.value} value={pos.value}>{pos.label}</option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="estado" className="label py-1">
            <span className={LABEL_CLS}>Estado <span className="text-error">*</span></span>
          </label>
          <select
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            className={SELECT_CLS}
            required
          >
            <option value="">Seleccionar estado</option>
            {ESTADOS.map((est) => (
              <option key={est.value} value={est.value}>{est.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-control">
        <p id="player-photo-label" className={LABEL_CLS}>Foto del jugador</p>
        <div className="flex items-center gap-4 w-full">
          <FileUpload
            aria-labelledby="player-photo-label"
            value={formData.foto}
            onChange={(file) => onChange('foto', file)}
            currentImageUrl={formData.photoUrl || ''}
            accept="image/jpg,image/jpeg,image/png,image/webp"
          />
          <div className="ml-auto ring-2 ring-base-300 ring-offset-2 ring-offset-base-100 rounded-full flex-shrink-0">
            <Avatar src={avatarSrc} name={avatarName} size="xl" />
          </div>
        </div>
      </div>
    </form>
  );
}

PlayerForm.calcularEdad = calcularEdad;

PlayerForm.INITIAL_DATA = {
  nombre: '',
  apellidos: '',
  fechaNacimiento: '',
  email: '',
  telefono: '',
  direccion: '',
  ciudad: '',
  provincia: '',
  dorsal: '',
  posicion: '',
  estado: 'Disponible',
  categoriaId: '',
  foto: null,
  photoUrl: '',
};

PlayerForm.propTypes = PlayerFormProps;
