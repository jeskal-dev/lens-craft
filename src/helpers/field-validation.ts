export type FieldValidationType = "text" | "email" | "select";

export function validateFieldValue(
  value: string,
  type: FieldValidationType
): boolean {
  if (type === "text") {
    return value.trim().length > 0;
  }

  if (type === "email") {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
  }

  if (type === "select") {
    return value.trim().length > 0;
  }

  return true;
}

