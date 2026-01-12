// contactForm.ts

import type { ContactFormData, ValidationResult } from "../types/contact.types";

export function initContactForm(): void {
  const form = document.getElementById("contact-form") as HTMLFormElement;
  if (!form) return;

  const submitButton = form.querySelector(
    "[data-submit-button]"
  ) as HTMLButtonElement;
  const statusElement = document.getElementById(
    "contact-form-status"
  ) as HTMLElement;
  const successState = document.getElementById("success-state") as HTMLElement;

  // Initialize custom selects
  initCustomSelects();

  // Form validation
  form.addEventListener("submit", async (event: SubmitEvent) => {
    event.preventDefault();

    const validation = validateForm(form);

    if (!validation.isValid) {
      displayErrors(validation.errors);
      statusElement.textContent =
        "Revisa los campos marcados para poder enviar tu mensaje.";
      statusElement.className =
        "text-sm min-h-[1.5rem] text-center text-destructive";
      return;
    }

    // Disable submit button
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = "<span>Enviando...</span>";
    }

    // Update status
    statusElement.textContent = "Enviando mensaje...";
    statusElement.className = "text-sm min-h-[1.5rem] text-center text-primary";

    try {
      // Simulate API call
      await submitForm(form);

      // Show success state
      form.style.display = "none";
      if (successState) {
        successState.classList.remove("hidden");
        successState.classList.add("flex", "flex-col");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      statusElement.textContent =
        "Ha ocurrido un error. Por favor, inténtalo de nuevo.";
      statusElement.className =
        "text-sm min-h-[1.5rem] text-center text-destructive";

      // Re-enable submit button
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = "<span>Enviar mensaje</span>";
      }
    }
  });

  // Real-time validation
  form
    .querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[data-field]")
    .forEach((field) => {
      field.addEventListener("blur", () => {
        const fieldName = field.name as keyof ContactFormData;
        const error = validateField(fieldName, field.value, field.type);
        updateFieldError(fieldName, error);
      });

      field.addEventListener("input", () => {
        const fieldName = field.name as keyof ContactFormData;
        updateFieldError(fieldName, "");
      });
    });

  // Custom select event listeners
  document.querySelectorAll("[data-custom-select]").forEach((select) => {
    const trigger = select.querySelector("button") as HTMLButtonElement;
    const dropdown = select.querySelector("[data-dropdown]") as HTMLElement;
    const hiddenInput = select.querySelector(
      "[data-select-input]"
    ) as HTMLInputElement;

    trigger.addEventListener("click", (e: Event) => {
      e.stopPropagation();
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";

      // Close all other dropdowns
      document.querySelectorAll("[data-dropdown]").forEach((d) => {
        const dropdown = d as HTMLElement;
        dropdown.dataset.visible = "false";
      });
      document.querySelectorAll("[data-custom-select] button").forEach((b) => {
        b.setAttribute("aria-expanded", "false");
      });

      // Toggle current dropdown
      if (!isExpanded) {
        dropdown.dataset.visible = "true";
        trigger.setAttribute("aria-expanded", "true");
      }
    });

    // Select option
    select
      .querySelectorAll<HTMLButtonElement>('[role="option"]')
      .forEach((option) => {
        option.addEventListener("click", () => {
          const value = option.dataset.value || "";
          const label = option.dataset.label || "";

          hiddenInput.value = value;
          select.querySelector("[data-selected-value]")!.textContent = label;
          trigger.setAttribute("aria-expanded", "false");
          dropdown.dataset.visible = "false";

          // Trigger validation
          const event = new Event("change");
          hiddenInput.dispatchEvent(event);
        });
      });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", () => {
    document.querySelectorAll("[data-dropdown]").forEach((d) => {
      const dropdown = d as HTMLElement;
      dropdown.dataset.visible = "false";
    });
    document.querySelectorAll("[data-custom-select] button").forEach((b) => {
      b.setAttribute("aria-expanded", "false");
    });
  });
}

function initCustomSelects(): void {
  // Global function for Astro templates
  (globalThis as any).handleSelectOption = (
    id: string,
    value: string,
    label: string
  ) => {
    const select = document.getElementById(id) as HTMLInputElement;
    if (select) {
      select.value = value;
      const selectedValue = document.querySelector(
        `[for="${id}"] [data-selected-value]`
      );
      if (selectedValue) {
        selectedValue.textContent = label;
      }
    }
  };
}

function validateForm(form: HTMLFormElement): ValidationResult {
  const formData = new FormData(form);
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  // Name validation
  const name = formData.get("name") as string;
  if (!name.trim()) {
    errors.name = "El nombre es obligatorio";
  } else if (name.length < 2) {
    errors.name = "El nombre debe tener al menos 2 caracteres";
  }

  // Email validation
  const email = formData.get("email") as string;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) {
    errors.email = "El email es obligatorio";
  } else if (!emailRegex.test(email)) {
    errors.email = "Introduce un email válido";
  }

  // Session type validation
  const sessionType = formData.get("sessionType") as string;
  if (!sessionType.trim()) {
    errors.sessionType = "Selecciona un tipo de sesión";
  }

  // Message validation
  const message = formData.get("message") as string;
  if (!message.trim()) {
    errors.message = "El mensaje es obligatorio";
  } else if (message.length < 10) {
    errors.message = "El mensaje debe tener al menos 10 caracteres";
  }

  // Privacy validation
  const privacy = formData.get("privacy") as string;
  if (!privacy) {
    errors.privacy = "Debes aceptar la política de privacidad";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

function validateField(fieldName: string, value: string, type: string): string {
  switch (fieldName) {
    case "name":
      if (!value.trim()) return "El nombre es obligatorio";
      if (value.length < 2) return "Mínimo 2 caracteres";
      break;

    case "email":
      if (!value.trim()) return "El email es obligatorio";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email inválido";
      break;

    case "sessionType":
      if (!value.trim()) return "Selecciona una opción";
      break;

    case "message":
      if (!value.trim()) return "El mensaje es obligatorio";
      if (value.length < 10) return "Mínimo 10 caracteres";
      break;

    case "privacy":
      if (!value) return "Debes aceptar la política de privacidad";
      break;
  }

  return "";
}

function updateFieldError(fieldName: string, error: string): void {
  const errorElement = document.querySelector(
    `[data-error-for="${fieldName}"]`
  );
  const field = document.querySelector(`[name="${fieldName}"]`);

  if (errorElement) {
    errorElement.textContent = error;
  }

  if (field) {
    field.setAttribute("aria-invalid", error ? "true" : "false");
  }
}

function displayErrors(
  errors: Partial<Record<keyof ContactFormData, string>>
): void {
  Object.entries(errors).forEach(([fieldName, error]) => {
    updateFieldError(fieldName, error || "");
  });
}

async function submitForm(form: HTMLFormElement): Promise<void> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // In a real implementation, you would:
  // 1. Collect form data
  // 2. Send to your API endpoint
  // 3. Handle response

  console.log("Form submitted:", new FormData(form));
}

// Export for module import
export default { initContactForm };
