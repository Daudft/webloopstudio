import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations/contact';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate payload against Zod schema
    const validatedData = contactFormSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validatedData.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, company, service, budget, message } = validatedData.data;

    // Log the lead inquiry (in production, integrate with Resend, SendGrid, Slack Webhook, or CRM)
    console.log('[LEAD INQUIRY RECEIVED]:', {
      timestamp: new Date().toISOString(),
      name,
      email,
      company: company || 'N/A',
      service,
      budget,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry received successfully. Our team will contact you shortly.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing inquiry' },
      { status: 500 }
    );
  }
}
