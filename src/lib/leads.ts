import type { ContactFormData } from '@/lib/validations/contact';

export type Lead = Omit<ContactFormData, 'website'> & {
  ip?: string;
  userAgent?: string;
  receivedAt: string;
};

export interface LeadTransport {
  name: string;
  send(lead: Lead): Promise<void>;
}

function formatLead(lead: Lead): string {
  return [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Company: ${lead.company || '—'}`,
    `Service: ${lead.service}`,
    `Budget: ${lead.budget}`,
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
          subject: `New inquiry from ${lead.name}`,
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

export function getLeadTransport(): LeadTransport {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_RECEIVER_EMAIL;

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
