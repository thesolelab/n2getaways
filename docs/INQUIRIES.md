# Inquiry delivery setup

The static Astro form is prepared for Formspree. No Cloudflare Function, email API key, mailbox password, MX/DNS change or WordPress edit is needed. Delivery is **not active** until the owner supplies a real public form ID and verifies the receiving address in Formspree. The existing email-app flow remains available until then.

## Owner activation

1. Create an account at https://formspree.io/register and verify its email.
2. Create a form named “N2Getaways itinerary inquiries”. Set the recipient to `hello@n2getaways.com` and complete any verification required for that address. The recipient is controlled in Formspree, not by the website's visible email label.
3. Keep the provider's spam protection enabled. The site also includes the provider's `_gotcha` honeypot. Security checks can be completed through the native secure-form fallback if the AJAX path cannot proceed.
4. Copy the public form endpoint from Integration, such as `https://formspree.io/f/abcdefgh`. Share this public endpoint with the developer; do not share a password, account token, inbox credentials or a Formspree API key.
5. Put only its ID in `src/config/inquiry.json` under `formspreeFormId`, or use the build variable `PUBLIC_FORMSPREE_FORM_ID`, which takes precedence. Rebuild/redeploy; Cloudflare's Git integration does this after a commit.
6. Submit an identifiable test from the deployed contact page and confirm it appears both in the Formspree dashboard and the `hello@n2getaways.com` inbox (check spam too). Verify Reply uses the visitor's email. Do not claim email delivery merely because the provider accepted a submission.

A public form endpoint is expected to appear in the HTML; it is not an API secret. The blank configuration intentionally does not send requests to a dummy service. Service plan limits and any desired domain restrictions should be reviewed in the owner's dashboard before production.

## Behavior

- Direct mode: native POST action with an official `@formspree/ajax` enhancement for loading, duplicate-submit prevention, field errors, provider/network failures and success messaging. Required fields, whitespace trimming and length limits run in the browser. Provider-side validation and filtering also apply, but the custom browser limits are not represented as server-side rules.
- On success, clear the form and show a submitted message. This reports provider acceptance, not independently verified inbox delivery.
- On error, preserve the message and show retry/direct-email options. A user-triggered native POST can continue through the provider's security check. There are no automatic retries that could duplicate a submission.
- Without JavaScript, a configured form posts to Formspree normally. Without a form ID, the mailto flow remains clearly labeled and available.
- No tracking or browser storage of inquiry contents is added. Once enabled, Formspree processes/stores submissions according to its policy. A current inquiry disclosure is added above the preserved legacy WordPress privacy copy.

The Vite alias selects the official library's ESM entry: version 1.1.5 advertises a non-module global script in its `browser` field, which cannot supply `initForm` to the bundler. No vendor files are modified.

## Validation performed

Both unconfigured and configured builds were validated. The configured build used an unissued test ID only for local output inspection; no real or dummy submissions were made. Checks covered native action, honeypot, success/error elements, message limits and privacy target. A direct validation-helper check covered whitespace-only inputs, bounds and recovery. Source-content/image preservation checks and the 38-page build pass. Actual browser interaction, CAPTCHA behavior with the owner's settings, provider routing and inbox delivery remain to be tested after activation.

## Official references

- https://developers.cloudflare.com/pages/tutorials/add-an-html-form-with-formspree/
- https://help.formspree.io/articles/building-your-form/building-an-html-form
- https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax/
- https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering/
- https://help.formspree.io/articles/form-and-project-settings/recaptcha-settings/
- https://formspree.io/legal/privacy-policy/
