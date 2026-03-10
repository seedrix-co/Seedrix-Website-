import type { VercelRequest, VercelResponse } from "@vercel/node";

const RESEND_API_URL = "https://api.resend.com/emails";

function cors(res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  cors(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.INQUIRY_RECIPIENT_EMAIL || "info@seedrix.co";
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "Website <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return res.status(500).json({
      success: false,
      error: "Email service is not configured. Please set RESEND_API_KEY.",
    });
  }

  const contentType = req.headers["content-type"] || "";
  if (!contentType.includes("application/json") || !req.body) {
    return res.status(400).json({
      success: false,
      error: "Content-Type must be application/json with a JSON body",
    });
  }

  const body = req.body as Record<string, unknown>;
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const company = String(body?.company ?? "").trim();
  const service = String(body?.service ?? "").trim();
  const message = String(body?.message ?? "").trim();

  if (!name || !email || !service || !message) {
    return res.status(400).json({
      success: false,
      error: "Required fields are missing",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: "Invalid email address",
    });
  }

  const subject = `Website inquiry from ${name}`;
  const text = [
    "New inquiry from the website",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company}`,
    `Service of interest: ${service}`,
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject,
        text,
      }),
    });

    const data = (await response.json()) as { id?: string; message?: string };

    if (!response.ok) {
      console.error("Resend API error:", response.status, data);
      return res.status(500).json({
        success: false,
        error: data?.message || "Failed to send email",
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Send inquiry error:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to send email",
    });
  }
}
