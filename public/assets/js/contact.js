document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  const requiredFields = [...form.querySelectorAll("[required]")];
  const submitButton = form.querySelector('button[type="submit"]');
  const status = document.querySelector("#form-status");
  const defaultButtonText = submitButton?.textContent;
  const messages = {
    name: "请填写姓名。",
    email: "请填写有效的邮箱地址。",
    country: "请填写国家或地区。",
    message: "请填写项目说明。"
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
    submitButton.textContent = isSubmitting ? "提交中..." : defaultButtonText;
  };

  requiredFields.forEach((field) => field.addEventListener("blur", () => validate(field)));
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const valid = requiredFields.map(validate).every(Boolean);
    if (!valid) {
      const firstInvalid = requiredFields.find((field) => field.getAttribute("aria-invalid") === "true");
      firstInvalid?.focus();
      if (status) status.textContent = "请完成标记为必填的字段。";
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

      if (!response.ok) throw new Error("RFQ submission failed.");

      form.reset();
      requiredFields.forEach((field) => setError(field));
      if (status) status.textContent = "资料已提交，我们通常会在 24 小时内回复您。";
    } catch {
      if (status) status.textContent = "提交失败，请稍后重试，或通过 WhatsApp 联系我们。";
    } finally {
      setSubmitting(false);
    }
  });
});
