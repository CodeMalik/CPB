import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const formData = await req.formData();
  const fields = Object.fromEntries(formData);

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
