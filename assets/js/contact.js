document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  const requiredFields = [...form.querySelectorAll("[required]")];
  const messages = { name: "请填写姓名。", email: "请填写有效的邮箱地址。", country: "请填写国家或地区。", message: "请填写项目说明。" };

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

  requiredFields.forEach((field) => field.addEventListener("blur", () => validate(field)));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const valid = requiredFields.map(validate).every(Boolean);
    const status = document.querySelector("#form-status");
    if (!valid) {
      const firstInvalid = requiredFields.find((field) => field.getAttribute("aria-invalid") === "true");
      firstInvalid?.focus();
      if (status) status.textContent = "请完成标记为必填的字段。";
      return;
    }
    if (status) status.textContent = "Demo 阶段表单仅用于预览，尚未连接邮箱和后台。";
  });
});
