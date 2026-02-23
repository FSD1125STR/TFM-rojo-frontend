import { useState } from 'react';
import { Modal } from './Modal';

export default {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    icon: { control: 'text' },
  },
};

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen || false);

  return (
    <div className="min-h-screen p-8 bg-base-200">
      <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
        Abrir Modal
      </button>

      <Modal
        {...args}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          args.onClose?.();
        }}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  isOpen: false,
  title: 'Titulo del Modal',
  subtitle: 'Subtitulo descriptivo',
  icon: 'info',
  size: 'md',
  children: (
    <p>Contenido del modal. Puedes colocar cualquier elemento aqui.</p>
  ),
};

export const ConAcciones = Template.bind({});
ConAcciones.args = {
  isOpen: false,
  title: 'Confirmar accion',
  subtitle: 'Esta accion no se puede deshacer',
  icon: 'warning',
  size: 'sm',
  children: (
    <p>Estas seguro de que quieres continuar?</p>
  ),
  actions: (
    <>
      <button className="btn btn-outline btn-sm">Cancelar</button>
      <button className="btn btn-primary btn-sm">Confirmar</button>
    </>
  ),
};

export const SinHeader = Template.bind({});
SinHeader.args = {
  isOpen: false,
  size: 'sm',
  children: (
    <div className="text-center py-4">
      <span className="material-symbols-outlined text-5xl text-success mb-4">check_circle</span>
      <h3 className="text-lg font-bold">Operacion completada</h3>
      <p className="text-base-content/60 mt-2">Los cambios se han guardado correctamente.</p>
    </div>
  ),
  actions: (
    <button className="btn btn-primary btn-sm">Aceptar</button>
  ),
};

export const Grande = Template.bind({});
Grande.args = {
  isOpen: false,
  title: 'Modal grande',
  subtitle: 'Ideal para formularios complejos',
  icon: 'edit',
  size: 'lg',
  children: (
    <div className="grid grid-cols-2 gap-4">
      <div className="form-control">
        <label htmlFor="story-nombre" className="label"><span>Nombre</span></label>
        <input id="story-nombre" type="text" className="input input-bordered input-sm" placeholder="Nombre" />
      </div>
      <div className="form-control">
        <label htmlFor="story-apellidos" className="label"><span>Apellidos</span></label>
        <input id="story-apellidos" type="text" className="input input-bordered input-sm" placeholder="Apellidos" />
      </div>
      <div className="form-control">
        <label htmlFor="story-email" className="label"><span>Email</span></label>
        <input id="story-email" type="email" className="input input-bordered input-sm" placeholder="correo@ejemplo.com" />
      </div>
      <div className="form-control">
        <label htmlFor="story-telefono" className="label"><span>Telefono</span></label>
        <input id="story-telefono" type="tel" className="input input-bordered input-sm" placeholder="+34 600 000 000" />
      </div>
    </div>
  ),
  actions: (
    <>
      <button className="btn btn-outline btn-error btn-sm">Cancelar</button>
      <button className="btn btn-primary btn-sm">Guardar</button>
    </>
  ),
};
