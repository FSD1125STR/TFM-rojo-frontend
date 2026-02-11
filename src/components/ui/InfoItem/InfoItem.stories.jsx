import { InfoItem } from "./InfoItem";
import { Badge } from "../Badge";

export default {
  title: "UI/InfoItem",
  component: InfoItem,
};

export const Default = {
  args: {
    icon: "calendar_month",
    label: "Fecha de Nacimiento",
    value: "15/03/2010 (14 años)",
  },
};

export const Email = {
  args: {
    icon: "mail",
    label: "Email",
    value: "carlos.rodriguez@email.com",
  },
};

export const Phone = {
  args: {
    icon: "phone",
    label: "Teléfono",
    value: "+34 666 777 888",
  },
};

export const WithBadge = {
  args: {
    icon: "bolt",
    label: "Estado",
    badge: <Badge variant="success" size="sm">Disponible</Badge>,
  },
};

export const AllExamples = {
  render: () => (
    <div className="space-y-4 p-4 bg-base-100 rounded-lg">
      <InfoItem icon="calendar_month" label="Fecha de Nacimiento" value="15/03/2010 (14 años)" />
      <InfoItem icon="mail" label="Email" value="carlos.rodriguez@email.com" />
      <InfoItem icon="phone" label="Teléfono" value="+34 666 777 888" />
      <InfoItem icon="location_on" label="Dirección" value="Calle Mayor 123, Madrid" />
      <InfoItem icon="bolt" label="Estado" badge={<Badge variant="success" size="sm">Disponible</Badge>} />
    </div>
  ),
};
