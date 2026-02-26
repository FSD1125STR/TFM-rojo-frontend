import { useRef, useState, useEffect } from 'react';
import { Icon } from '../Icon';
import { FileUploadProps } from './FileUpload.props';

export function FileUpload({ value = null, onChange, accept = 'image/*', currentImageUrl = '', disabled = false, 'aria-labelledby': ariaLabelledby }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (value) {
      const url = URL.createObjectURL(value);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(null);
    }
  }, [value]);

  const displayUrl = preview || currentImageUrl || null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    onChange?.(file);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange?.(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div test-id="el-f1l3u5p7" className="flex items-center gap-3" aria-labelledby={ariaLabelledby}>
      {displayUrl ? (
        <div className="relative flex-shrink-0">
          <img
            src={displayUrl}
            alt="Logo preview"
            className="w-20 h-20 object-contain rounded-lg border border-base-300 bg-base-200"
          />
          {!disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute -top-2 -right-2 btn btn-circle btn-xs btn-error"
              aria-label="Quitar imagen"
            >
              <Icon name="close" className="text-[14px]" />
            </button>
          )}
        </div>
      ) : (
        <div className="flex-shrink-0 w-20 h-20 rounded-lg border-2 border-dashed border-base-300 bg-base-200/50 flex items-center justify-center text-base-content/30">
          <Icon name="image" className="text-[28px]" />
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <button
          type="button"
          disabled={disabled}
          onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
          className="btn btn-sm btn-outline gap-1.5"
        >
          <Icon name="upload" className="text-[16px]" />
          {displayUrl ? 'Cambiar imagen' : 'Subir logo'}
        </button>
        <span className="text-[11px] text-base-content/50">JPG, PNG o WebP. Max 5 MB.</span>
        {/* sr-only en lugar de hidden: evita que el click programático dispare */}
        {/* el evento cancel en el <dialog> padre al cerrarse el OS file picker  */}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={disabled}
          aria-label="Seleccionar archivo de imagen"
          className="sr-only"
        />
      </div>
    </div>
  );
}

FileUpload.propTypes = FileUploadProps;
