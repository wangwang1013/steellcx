const initialiseArabicScreenRfq = () => {
  const form = document.querySelector("#screen-rfq-form");
  if (!form) return;

  const submit = form.querySelector('button[type="submit"]');
  const status = form.querySelector("[data-rfq-status]");
  const required = [...form.querySelectorAll("[required]")];
  const defaultLabel = submit.textContent;

  const validateField = (field) => {
    field.setCustomValidity("");
    if (field.validity.valueMissing) {
      field.setCustomValidity(`يرجى إدخال ${field.dataset.requiredLabel}.`);
    } else if (field.validity.typeMismatch) {
      field.setCustomValidity("يرجى إدخال بريد إلكتروني صحيح.");
    }
    return field.checkValidity();
  };

  for (const field of required) {
    field.addEventListener("input", () => validateField(field));
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (submit.disabled) return;
    const firstInvalid = required.find((field) => !validateField(field));
    if (firstInvalid) {
      firstInvalid.reportValidity();
      return;
    }

    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      company: data.get("company"),
      email: data.get("email"),
      phone: data.get("whatsapp"),
      country: data.get("country"),
      projectType: data.get("project-type"),
      message: `Quantity / Dimensions: ${data.get("dimensions") || "Not provided"}\n\nProject Description:\n${data.get("message")}`
    };

    submit.disabled = true;
    submit.textContent = "جارٍ الإرسال...";
    status.textContent = "";

    try {
      const response = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success !== true) throw new Error("RFQ submission failed.");
      if (window.steellcxConsent?.allowed()) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "rfq_submit", site_language: "ar" });
      }
      form.reset();
      status.textContent = "تم إرسال طلبك بنجاح. نرد عادةً خلال 24 ساعة.";
    } catch {
      status.textContent = "تعذر إرسال الطلب. حاول مجدداً لاحقاً أو تواصل معنا عبر WhatsApp.";
    } finally {
      submit.disabled = false;
      submit.textContent = defaultLabel;
    }
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialiseArabicScreenRfq, { once: true });
} else {
  initialiseArabicScreenRfq();
}
