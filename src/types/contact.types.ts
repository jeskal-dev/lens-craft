export type SessionType =
  | "bodas"
  | "retratos"
  | "familia"
  | "editorial"
  | "producto"
  | "eventos"
  | "otros"
  | "paisajes";

export interface SelectOption {
  value: SessionType;
  label: string;
  icon?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  sessionType: SessionType | "";
  message: string;
  privacy: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
}
