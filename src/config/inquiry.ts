import config from "./inquiry.json";
export const inquiryRecipient = config.recipient;
export const formspreeFormId = String(
  import.meta.env.PUBLIC_FORMSPREE_FORM_ID || config.formspreeFormId,
).trim();
if (formspreeFormId && !/^[a-z0-9]{6,64}$/i.test(formspreeFormId)) {
  throw new Error(
    "Use the public Formspree form ID, not a full endpoint URL or an API key.",
  );
}
export const inquiryEndpoint = formspreeFormId
  ? `https://formspree.io/f/${formspreeFormId}`
  : "";
