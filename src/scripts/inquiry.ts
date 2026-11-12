import { initForm } from "@formspree/ajax";

export function validateInquiry(form: HTMLFormElement) {
  const fields = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
    "[data-fs-field]",
  );
  fields.forEach((field) => {
    field.value = field.value.trim();
    const length = field.value.length;
    const invalid =
      (field.required && !length) ||
      (field.minLength > 0 && length < field.minLength) ||
      (field.maxLength > 0 && length > field.maxLength);
    field.setCustomValidity(
      invalid ? "Please complete this field within the requested length." : "",
    );
  });
  return form.reportValidity();
}
export function setupInquiry(form: HTMLFormElement) {
  form
    .querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[data-fs-field]")
    .forEach((field) =>
      field.addEventListener("input", () => field.setCustomValidity("")),
    );
  form.addEventListener("submit", (event) => {
    if (!validateInquiry(form)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });
  const formId = form.dataset.formId;
  const result = form.querySelector<HTMLElement>("#form-result");
  const submit = form.querySelector<HTMLButtonElement>('[type="submit"]');
  if (formId) {
    const providerFallback =
      form.querySelector<HTMLButtonElement>("#provider-fallback");
    const focusError = () => {
      if (providerFallback) providerFallback.hidden = false;
      const target =
        form.querySelector<HTMLElement>('[aria-invalid="true"]') ||
        form.querySelector<HTMLElement>('[data-fs-error=""]');
      target?.focus();
    };
    providerFallback?.addEventListener("click", () => {
      if (validateInquiry(form)) HTMLFormElement.prototype.submit.call(form);
    });
    initForm({
      formElement: form,
      formId,
      useDefaultStyles: false,
      disable: () => {
        if (submit) {
          submit.disabled = true;
          submit.textContent = "Sending…";
        }
        form.setAttribute("aria-busy", "true");
        if (providerFallback) providerFallback.hidden = true;
      },
      enable: () => {
        if (submit) {
          submit.disabled = false;
          submit.textContent = "Send inquiry ↗";
        }
        form.removeAttribute("aria-busy");
      },
      onSuccess: () => {
        form.reset();
        form.querySelector<HTMLElement>("[data-fs-success]")?.focus();
      },
      onError: focusError,
      onFailure: focusError,
    });
    return;
  }
  // Remain useful until the owner verifies the delivery account and supplies its public form ID.
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = new FormData(form);
    const value = (key: string) => String(fields.get(key) || "").trim();
    const subject = `Custom itinerary inquiry: ${value("destination")}`;
    const body = `Name: ${value("name")}\nReply email: ${value("email")}\nDestination: ${value("destination")}\n\n${value("message")}`;
    window.location.href = `mailto:${form.dataset.recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (result)
      result.textContent =
        "Your email app should open with a draft. Please send it there. If nothing opens, email hello@n2getaways.com directly. Nothing has been sent by this website.";
  });
}
