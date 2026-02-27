import { useEffect, useState } from 'react';
import { SearchableSelect } from '../../../components/ui/SearchableSelect';
import { FileUpload } from '../../../components/ui/FileUpload';
import { getCategories } from '../../../services/categoriesService';
import { TeamFormProps } from './TeamForm.props';

const LABEL_CLS = 'font-semibold text-[13px] text-base-content/70';
const INPUT_CLS = 'input input-bordered input-sm w-full bg-base-200/50 border-base-300 text-sm transition-all placeholder:text-base-content/40 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/15';

export function TeamForm({ formId, formData, onChange, onSubmit, initialData }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((cats) => {
      setCategories(cats.map((c) => ({ value: c._id, label: `${c.name} — ${c.season}` })));
    }).catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <form id={formId} onSubmit={onSubmit} test-id="el-t3a5m7f9">
      <div className="flex flex-col gap-3">
        <div className="form-control">
          <label htmlFor="team-name" className="label py-1">
            <span className={LABEL_CLS}>Nombre <span className="text-error">*</span></span>
          </label>
          <input
            id="team-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={INPUT_CLS}
            placeholder="Nombre del equipo"
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="team-category" className="label py-1">
            <span className={LABEL_CLS}>Categorías <span className="text-error">*</span></span>
          </label>
          <SearchableSelect
            id="team-category"
            options={categories}
            value={formData.categoryIds}
            onChange={(val) => onChange('categoryIds', val)}
            placeholder="Seleccionar categoría"
            multiple
            required
          />
        </div>

        <div className="form-control">
          <p id="team-logo-label" className={`${LABEL_CLS} mb-1`}>Logo del equipo</p>
          <FileUpload
            aria-labelledby="team-logo-label"
            value={formData.logo}
            onChange={(file) => onChange('logo', file)}
            currentImageUrl={initialData?.logoUrl || ''}
            accept="image/jpg,image/jpeg,image/png,image/webp"
          />
        </div>
      </div>
    </form>
  );
}

TeamForm.INITIAL_DATA = {
  name: '',
  categoryIds: [],
  logo: null,
};

TeamForm.propTypes = TeamFormProps;
