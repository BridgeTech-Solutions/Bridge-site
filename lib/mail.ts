import nodemailer from "nodemailer";

/* ─── Transporter SMTP ─────────────────────────────────── */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/** Échapper les caractères HTML pour éviter toute injection dans l'email. */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ─── Email de notification — nouveau message contact ── */
export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  subject?: string | null;
  message: string;
}) {
  const to = process.env.CONTACT_NOTIFY_EMAIL ?? "contact@bridgetech-solutions.com";
  const from = process.env.EMAIL_FROM
    ? `"BTS Site Web" <${process.env.EMAIL_FROM}>`
    : `"BTS Site Web" <${process.env.SMTP_USER}>`;

  // Valeurs échappées — jamais interpolées brutes dans le HTML
  const name    = esc(data.name);
  const email   = esc(data.email);
  const phone   = data.phone   ? esc(data.phone)   : null;
  const company = data.company ? esc(data.company) : null;
  const subject = data.subject ? esc(data.subject) : null;
  const message = esc(data.message);

  // Sujet de l'email (texte brut — pas de HTML)
  const emailSubject = `[Contact BTS] ${data.subject ?? "Nouveau message"} — ${data.name}`.slice(0, 200);

  await transporter.sendMail({
    from,
    to,
    replyTo: data.email,
    subject: emailSubject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0a1628, #014B6A); padding: 28px 32px;">
          <h1 style="color: #fff; margin: 0; font-size: 20px; font-weight: 700;">
            Nouveau message de contact
          </h1>
          <p style="color: #78C2E1; margin: 6px 0 0; font-size: 13px;">
            Bridge Technologies Solutions — Site web
          </p>
        </div>

        <!-- Body -->
        <div style="padding: 32px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; color: #718096; width: 120px; vertical-align: top; font-weight: 600;">Nom</td>
              <td style="padding: 10px 0; color: #1a202c; font-weight: 500;">${name}</td>
            </tr>
            <tr style="border-top: 1px solid #f0f4f8;">
              <td style="padding: 10px 0; color: #718096; vertical-align: top; font-weight: 600;">Email</td>
              <td style="padding: 10px 0;">
                <a href="mailto:${email}" style="color: #0088C1; text-decoration: none;">${email}</a>
              </td>
            </tr>
            ${phone ? `
            <tr style="border-top: 1px solid #f0f4f8;">
              <td style="padding: 10px 0; color: #718096; vertical-align: top; font-weight: 600;">Téléphone</td>
              <td style="padding: 10px 0; color: #1a202c;">${phone}</td>
            </tr>` : ""}
            ${company ? `
            <tr style="border-top: 1px solid #f0f4f8;">
              <td style="padding: 10px 0; color: #718096; vertical-align: top; font-weight: 600;">Entreprise</td>
              <td style="padding: 10px 0; color: #1a202c;">${company}</td>
            </tr>` : ""}
            ${subject ? `
            <tr style="border-top: 1px solid #f0f4f8;">
              <td style="padding: 10px 0; color: #718096; vertical-align: top; font-weight: 600;">Sujet</td>
              <td style="padding: 10px 0; color: #1a202c;">${subject}</td>
            </tr>` : ""}
          </table>

          <!-- Message -->
          <div style="margin-top: 20px; border-top: 1px solid #f0f4f8; padding-top: 20px;">
            <p style="color: #718096; font-size: 13px; font-weight: 600; margin: 0 0 10px;">Message</p>
            <div style="background: #f7fafc; border-left: 3px solid #0088C1; padding: 16px; border-radius: 0 6px 6px 0; color: #2d3748; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>

          <!-- Reply button -->
          <div style="margin-top: 24px; text-align: center;">
            <a href="mailto:${email}?subject=Re%3A%20${encodeURIComponent(data.subject ?? "Votre message")}"
               style="display: inline-block; padding: 12px 28px; background: #0088C1; color: #fff; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 600;">
              Répondre à ${name}
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f7fafc; padding: 16px 32px; border-top: 1px solid #e2e8f0;">
          <p style="color: #a0aec0; font-size: 12px; margin: 0; text-align: center;">
            Ce message a été envoyé depuis le formulaire de contact de bridgetech-solutions.com
          </p>
        </div>
      </div>
    `,
    text: `
Nouveau message de contact — Bridge Technologies Solutions

Nom       : ${data.name}
Email     : ${data.email}
${data.phone ? `Téléphone : ${data.phone}\n` : ""}${data.company ? `Entreprise: ${data.company}\n` : ""}${data.subject ? `Sujet     : ${data.subject}\n` : ""}
Message :
${data.message}
    `.trim(),
  });
}

/* ─── Type abonné newsletter ───────────────────────────── */
export type NewsletterSubscriber = { id: string; email: string };

/* ─── Réponse admin → contact ──────────────────────────── */
export async function sendAdminReply(
  to: string,
  subject: string,
  body: string
) {
  const from = process.env.EMAIL_FROM
    ? `"Bridge Technologies Solutions" <${process.env.EMAIL_FROM}>`
    : `"Bridge Technologies Solutions" <${process.env.SMTP_USER}>`;

  const escapedBody = esc(body);

  await transporter.sendMail({
    from,
    to,
    subject: subject.slice(0, 200),
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #0a1628, #014B6A); padding: 28px 32px;">
          <h1 style="color: #fff; margin: 0; font-size: 20px; font-weight: 700;">
            Réponse de Bridge Technologies Solutions
          </h1>
          <p style="color: #78C2E1; margin: 6px 0 0; font-size: 13px;">
            bridgetech-solutions.com
          </p>
        </div>
        <div style="padding: 32px;">
          <div style="background: #f7fafc; border-left: 3px solid #0088C1; padding: 16px; border-radius: 0 6px 6px 0; color: #2d3748; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapedBody}</div>
        </div>
        <div style="background: #f7fafc; padding: 16px 32px; border-top: 1px solid #e2e8f0;">
          <p style="color: #a0aec0; font-size: 12px; margin: 0; text-align: center;">
            Bridge Technologies Solutions · Bonamoussadi, DLA, CAM · contact@bridgetech-solutions.com
          </p>
        </div>
      </div>
    `,
    text: body,
  });
}

/* ─── Envoi newsletter à tous les abonnés actifs ──────── */
export async function sendNewsletter(
  subscribers: NewsletterSubscriber[],
  subject: string,
  body: string
): Promise<{ sent: number; failed: number; errors: string[] }> {
  const from = process.env.EMAIL_FROM
    ? `"Bridge Technologies Solutions" <${process.env.EMAIL_FROM}>`
    : `"Bridge Technologies Solutions" <${process.env.SMTP_USER}>`;

  const escapedBody = esc(body);
  let sent = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const subscriber of subscribers) {
    try {
      await transporter.sendMail({
        from,
        to: subscriber.email,
        subject: subject.slice(0, 200),
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #0a1628, #014B6A); padding: 28px 32px;">
              <h1 style="color: #fff; margin: 0; font-size: 20px; font-weight: 700;">
                Bridge Technologies Solutions
              </h1>
              <p style="color: #78C2E1; margin: 6px 0 0; font-size: 13px;">Newsletter</p>
            </div>
            <div style="padding: 32px;">
              <div style="color: #2d3748; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapedBody}</div>
            </div>
            <div style="background: #f7fafc; padding: 16px 32px; border-top: 1px solid #e2e8f0;">
              <p style="color: #a0aec0; font-size: 12px; margin: 0; text-align: center;">
                Bridge Technologies Solutions · Bonamoussadi, DLA, CAM<br>
                Vous recevez cet email car vous êtes abonné à notre newsletter.
              </p>
            </div>
          </div>
        `,
        text: body,
      });
      sent++;
    } catch (err) {
      failed++;
      errors.push(`${subscriber.email}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  return { sent, failed, errors };
}
