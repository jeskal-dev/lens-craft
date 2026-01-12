import type { SelectOption } from "../types/contact.types";

export const sessionTypes: SelectOption[] = [
  { value: 'bodas', label: 'Boda', icon: 'lucide:heart' },
  { value: 'retratos', label: 'Retrato individual o de pareja', icon: 'lucide:user' },
  { value: 'familia', label: 'Sesión familiar', icon: 'lucide:users' },
  { value: 'editorial', label: 'Editorial / Marca', icon: 'lucide:palette' },
  { value: 'producto', label: 'Fotografía de producto', icon: 'lucide:package' },
  { value: 'eventos', label: 'Eventos corporativos', icon: 'lucide:calendar' },
  { value: 'paisajes', label: 'Paisajes / Naturaleza', icon: 'lucide:mountain' },
  { value: 'otros', label: 'Otros proyectos', icon: 'lucide:sparkles' }
];