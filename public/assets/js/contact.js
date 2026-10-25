document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  const requiredFields = [...form.querySelectorAll("[required]")];
  const submitButton = form.querySelector('button[type="submit"]');
  const status = document.querySelector("#form-status");
  const defaultButtonText = submitButton?.textContent;
  const isArabic = document.documentElement.lang === "ar";
  const messages = isArabic ? {
    name: "يرجى إدخال اسمك.",
    email: "يرجى إدخال بريد إلكتروني صحيح.",
    country: "يرجى إدخال بلدك أو منطقتك.",
    message: "يرجى إدخال تفاصيل مشروعك."
  } : {
    name: "Please enter your name.",
    email: "Please enter a valid email address.",
    country: "Please enter your country or region.",
    message: "Please enter your project details."
  };

  const setError = (field, message = "") => {
    const error = document.querySelector(`#${field.id}-error`);
    field.setAttribute("aria-invalid", String(Boolean(message)));
    if (error) error.textContent = message;
  };

  const validate = (field) => {
    const message = field.validity.valid ? "" : messages[field.id];
    setError(field, message);
    return !message;
  };

  const setSubmitting = (isSubmitting) => {
    if (!submitButton) return;
    submitButton.disabled = isSubmitting;
    submitButton.textContent = isSubmitting ? (isArabic ? "جارٍ الإرسال..." : "Submitting...") : defaultButtonText;
  };

  requiredFields.forEach((field) => field.addEventListener("blur", () => validate(field)));
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (submitButton?.disabled) return;
    const valid = requiredFields.map(validate).every(Boolean);
    if (!valid) {
      const firstInvalid = requiredFields.find((field) => field.getAttribute("aria-invalid") === "true");
      firstInvalid?.focus();
      if (status) status.textContent = isArabic ? "يرجى إكمال جميع الحقول المطلوبة." : "Please complete all required fields.";
      return;
    }

    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      phone: formData.get("whatsapp"),
      country: formData.get("country"),
      projectType: formData.get("project-type"),
      message: formData.get("message")
    };

    setSubmitting(true);
    if (status) status.textContent = "";

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
        window.dataLayer.push({ event: "rfq_submit", site_language: isArabic ? "ar" : "en" });
      }
      form.reset();
      requiredFields.forEach((field) => setError(field));
      if (status) status.textContent = isArabic ? "تم إرسال طلبك بنجاح. نرد عادةً خلال 24 ساعة." : "Your request has been submitted. We normally reply within 24 hours.";
    } catch {
      if (status) status.textContent = isArabic ? "تعذر إرسال الطلب. حاول مجدداً لاحقاً أو تواصل معنا عبر واتساب." : "Submission failed. Please try again later or contact us via WhatsApp.";
    } finally {
      setSubmitting(false);
    }
  });
});
