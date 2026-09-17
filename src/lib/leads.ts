import nodemailer from 'nodemailer';
import { budgetOptions, serviceOptions, type ContactFormData } from '@/lib/validations/contact';

export type Lead = Omit<ContactFormData, 'website'> & {
  ip?: string;
  userAgent?: string;
  receivedAt: string;
};

export interface LeadTransport {
  name: string;
  send(lead: Lead): Promise<void>;
}

/** Human-readable label for a select value, e.g. '2k-5k' -> '$2K – $5K'. */
const labelFor = (options: { value: string; label: string }[], value: string) =>
  options.find((option) => option.value === value)?.label ?? value;

function formatLead(lead: Lead): string {
  return [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Company: ${lead.company || '—'}`,
    `Service: ${labelFor(serviceOptions, lead.service)}`,
    `Budget: ${labelFor(budgetOptions, lead.budget)}`,
    '',
    lead.message,
    '',
    `Received: ${lead.receivedAt}`,
    `IP: ${lead.ip ?? 'unknown'}`,
    `User agent: ${lead.userAgent ?? 'unknown'}`,
  ].join('\n');
}

/** Development fallback: prints the lead to the server log. */
const consoleTransport: LeadTransport = {
  name: 'console',
  async send(lead) {
    console.info(`[lead]\n${formatLead(lead)}`);
  },
};

/**
 * Gmail over SMTP (nodemailer). No third-party service: mail is sent from your
 * own Gmail account. Needs a Gmail app password (Google Account → Security →
 * 2-Step Verification → App passwords), not the normal account password.
 */
function createGmailTransport(user: string, appPassword: string, to: string): LeadTransport {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass: appPassword },
  });

  return {
    name: 'gmail',
    async send(lead) {
      await transporter.sendMail({
        from: `Webloop Studio <${user}>`,
        to,
        replyTo: lead.email,
        subject: `New inquiry from ${lead.name} (${labelFor(budgetOptions, lead.budget)})`,
        text: formatLead(lead),
      });
    },
  };
}

/** Resend REST API. Requires a verified sending domain for a custom `from`. */
function createResendTransport(apiKey: string, to: string, from: string): LeadTransport {
  return {
    name: 'resend',
    async send(lead) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: lead.email,
          subject: `New inquiry from ${lead.name} (${labelFor(budgetOptions, lead.budget)})`,
          text: formatLead(lead),
        }),
      });

      if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`Resend responded ${res.status}: ${body.slice(0, 300)}`);
      }
    },
  };
}

/** Picks the first configured transport: Gmail, then Resend, then the console log. */
export function getLeadTransport(): LeadTransport {
  const to = process.env.CONTACT_RECEIVER_EMAIL;

  const gmailUser = process.env.GMAIL_USER;
  // Google shows app passwords in groups of four; spaces are not part of the password.
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, '');
  if (gmailUser && gmailAppPassword && to) {
    return createGmailTransport(gmailUser, gmailAppPassword, to);
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey && to) {
    const from = process.env.CONTACT_FROM_EMAIL ?? 'Webloop Studio <onboarding@resend.dev>';
    return createResendTransport(apiKey, to, from);
  }

  return consoleTransport;
}

export async function sendLead(lead: Lead): Promise<{ transport: string }> {
  const transport = getLeadTransport();
  await transport.send(lead);
  return { transport: transport.name };
}
