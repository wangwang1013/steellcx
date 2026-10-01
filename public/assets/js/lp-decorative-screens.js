document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#screen-rfq-form");
  if (!form) return;

  const submit = form.querySelector('button[type="submit"]');
  const status = form.querySelector("[data-rfq-status]");
  const required = [...form.querySelectorAll("[required]")];
  const defaultLabel = submit.textContent;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!required.every((field) => field.reportValidity())) return;

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
    submit.textContent = "Submitting...";
    status.textContent = "";

    try {
      const response = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error("RFQ submission failed.");
      form.reset();
      status.textContent = "Your request has been submitted. We normally reply within 24 hours.";
    } catch {
      status.textContent = "Submission failed. Please try again later or contact us via WhatsApp.";
    } finally {
      submit.disabled = false;
      submit.textContent = defaultLabel;
    }
  });
});
