const MAX_LENGTHS = {
  name: 120,
  company: 160,
  email: 254,
  phone: 80,
  country: 100,
  projectType: 120,
  message: 5000
};

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json; charset=UTF-8" }
});

const escapeHtml = (value) => value
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");

const readText = (data, field, required = false) => {
  const value = data[field];
  if (value === undefined || value === null) {
    return required ? { error: `${field} is required.` } : { value: "" };
  }

  if (typeof value !== "string") return { error: `${field} must be text.` };

  const normalized = value.trim().replace(/[\r\n]+/g, " ");
  if (required && !normalized) return { error: `${field} is required.` };
  if (normalized.length > MAX_LENGTHS[field]) return { error: `${field} is too long.` };

  return { value: normalized };
};

export const onRequest = async ({ request, env }) => {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed." }, 405);
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: "Invalid request data." }, 400);
  }

  if (!data || Array.isArray(data) || typeof data !== "object") {
    return json({ error: "Invalid request data." }, 400);
  }

  const fields = {
    name: readText(data, "name", true),
    company: readText(data, "company"),
    email: readText(data, "email", true),
    phone: readText(data, "phone"),
    country: readText(data, "country", true),
    projectType: readText(data, "projectType"),
    message: readText(data, "message", true)
  };

  const invalidField = Object.values(fields).find((field) => field.error);
  if (invalidField) return json({ error: "Please check the required fields." }, 400);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.value)) {
    return json({ error: "Please provide a valid email address." }, 400);
  }

  if (!env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured.");
    return json({ error: "Unable to submit the inquiry." }, 500);
  }

  const projectType = fields.projectType.value || "Not specified";
  const emailRows = [
    ["Name", fields.name.value],
    ["Company", fields.company.value || "Not provided"],
    ["Email", fields.email.value],
    ["WhatsApp / Phone", fields.phone.value || "Not provided"],
    ["Country / Region", fields.country.value],
    ["Project Type", projectType]
  ].map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`).join("");

  const html = `
    <h1>New Website RFQ</h1>
    ${emailRows}
    <p><strong>Project Details:</strong></p>
    <p>${escapeHtml(fields.message.value).replace(/\n/g, "<br>")}</p>
    <hr>
    <p>Submitted from: STEELLCX Website</p>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "STEELLCX Website <rfq@mail.steellcx.com>",
        to: ["sales@steellcx.com"],
        reply_to: fields.email.value,
        subject: `New RFQ - ${fields.country.value} - ${projectType}`,
        html
      })
    });

    if (!response.ok) {
      console.error("Resend request failed.", response.status);
      return json({ error: "Unable to submit the inquiry." }, 502);
    }
  } catch (error) {
    console.error("Resend request failed.", error);
    return json({ error: "Unable to submit the inquiry." }, 502);
  }

  return json({ success: true });
};
