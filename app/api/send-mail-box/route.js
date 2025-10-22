import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const formData = await req.formData();
  const fields = Object.fromEntries(formData);

  // Skip reCAPTCHA verification in development
  const isDevelopment = process.env.NODE_ENV === 'development';
  const recaptchaToken = fields.recaptchaToken;

  console.log('Environment:', process.env.NODE_ENV);
  console.log('reCAPTCHA token received:', recaptchaToken ? 'Yes' : 'No');

  if (!isDevelopment) {
    // Production: Verify reCAPTCHA
    if (!recaptchaToken || recaptchaToken === 'development-bypass') {
      return NextResponse.json({ error: 'Security verification failed' }, { status: 400 });
    }

    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!recaptchaSecret) {
      console.error('RECAPTCHA_SECRET_KEY not set');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    try {
      const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${recaptchaSecret}&response=${recaptchaToken}`
      });

      const recaptchaData = await recaptchaResponse.json();
      console.log('reCAPTCHA verification response:', recaptchaData);

      if (!recaptchaData.success) {
        console.error('reCAPTCHA verification failed:', recaptchaData['error-codes']);
        return NextResponse.json({ 
          error: 'Security verification failed. Please try again.' 
        }, { status: 400 });
      }

      console.log('reCAPTCHA verification successful. Score:', recaptchaData.score);

    } catch (error) {
      console.error('Error verifying reCAPTCHA:', error);
      return NextResponse.json({ 
        error: 'Security verification service unavailable' 
      }, { status: 500 });
    }
  } else {
    // Development: Skip verification but log
    console.log('Development mode: Skipping reCAPTCHA verification');
  }

  // Rest of your email sending code remains the same...
  const file = formData.get("artwork");
  const attachments = [];

  if (file && typeof file === "object" && file.name) {
    const buffer = Buffer.from(await file.arrayBuffer());
    attachments.push({
      filename: file.name,
      content: buffer,
    });
  }

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Quote Request',
      text: `
        Name: ${fields.name}
        Email: ${fields.email}
        Phone: ${fields.phone}
        Box Type: ${fields.boxType}
        Dimensions: ${fields.length} x ${fields.width} x ${fields.depth}
        Quantity: ${fields.quantity}
        Size: ${fields.size}
        Color: ${fields.color}
        Message: ${fields.message}
      `,
      attachments,
    });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}