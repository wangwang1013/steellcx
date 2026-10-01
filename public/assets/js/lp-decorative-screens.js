const initialiseScreenRfq = () => {
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
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success !== true) throw new Error("RFQ submission failed.");
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "rfq_submit" });
      form.reset();
      status.textContent = "Your request has been submitted. We normally reply within 24 hours.";
    } catch {
      status.textContent = "Submission failed. Please try again later or contact us via WhatsApp.";
    } finally {
      submit.disabled = false;
      submit.textContent = defaultLabel;
    }
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialiseScreenRfq, { once: true });
} else {
  initialiseScreenRfq();
}
