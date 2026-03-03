import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { esES } from '@mui/x-date-pickers/locales';
import { es } from 'date-fns/locale';

const localeText = {
  ...esES.components.MuiLocalizationProvider.defaultProps.localeText,
  okButtonLabel: 'Aceptar',
};

createRoot(document.getElementById('root')).render(
  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es} localeText={localeText}>
    <App />
  </LocalizationProvider>
);
