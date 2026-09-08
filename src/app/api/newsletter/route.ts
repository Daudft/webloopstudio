import { NextResponse } from 'next/server';
import { newsletterSchema } from '@/lib/validations/contact';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = newsletterSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const { email } = validatedData.data;
    console.log('[NEWSLETTER SUBSCRIBER]:', email);

    return NextResponse.json(
      { success: true, message: 'Subscribed to Webloop Studio insights!' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
