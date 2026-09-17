import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations/contact';
import { sendLead } from '@/lib/leads';
import { checkRateLimit } from '@/lib/rate-limit';

function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

export async function POST(request: Request) {
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return NextResponse.json({ error: 'Expected application/json' }, { status: 415 });
  }

  const ip = clientIp(request);
  const limit = checkRateLimit(ip);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { website, ...lead } = parsed.data;

  // Honeypot filled: almost certainly a bot. Pretend success so it moves on.
  if (website) {
    return NextResponse.json({ success: true });
  }

  try {
    await sendLead({
      ...lead,
      ip,
      userAgent: request.headers.get('user-agent') ?? undefined,
      receivedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[contact] lead delivery failed:', error);
    return NextResponse.json(
      { error: 'We could not send your message right now. Please try again in a moment.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
