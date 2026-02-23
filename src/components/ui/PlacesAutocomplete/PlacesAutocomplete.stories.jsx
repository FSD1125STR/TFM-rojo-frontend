import { useState } from 'react';
import { PlacesAutocomplete } from './PlacesAutocomplete';

export default {
  title: 'UI/PlacesAutocomplete',
  component: PlacesAutocomplete,
  tags: ['autodocs'],
};

const Controlled = (args) => {
  const [venue, setVenue] = useState(null);
  return (
    <div className="w-80">
      <PlacesAutocomplete {...args} value={venue} onChange={(_name, val) => setVenue(val)} />
      <p className="text-sm mt-2 text-base-content/50">
        Valor: {venue ? venue.name : '(vacío)'}
      </p>
    </div>
  );
};

export const Default = Controlled.bind({});
Default.args = {
  name: 'venue',
  placeholder: 'Buscar estadio o campo...',
};

export const WithValue = () => {
  const [venue, setVenue] = useState({
    name: 'Camp Nou',
    displayName: 'Camp Nou, Carrer dAristides Maillol, les Corts, Barcelona',
    lat: 41.380898,
    lng: 2.122820,
    type: 'stadium',
    osmId: 123456,
  });
  return (
    <div className="w-80">
      <PlacesAutocomplete
        name="venue"
        value={venue}
        onChange={(_name, val) => setVenue(val)}
        placeholder="Buscar estadio o campo..."
      />
    </div>
  );
};

export const Disabled = () => (
  <div className="w-80">
    <PlacesAutocomplete
      name="venue"
      value={{ name: 'Camp Nou', displayName: 'Camp Nou, Barcelona', lat: 41.38, lng: 2.12, type: 'stadium', osmId: 1 }}
      onChange={() => {}}
      placeholder="Buscar estadio o campo..."
      disabled
    />
  </div>
);
