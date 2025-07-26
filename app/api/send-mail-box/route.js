import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const formData = await req.formData();
  const fields = Object.fromEntries(formData);

  // Extract file
  const file = formData.get('artwork');
  let attachment = [];

  if (file && typeof file === 'object' && file.name) {
    const buffer = Buffer.from(await file.arrayBuffer());
    attachment.push({
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
      to: process.env.EMAIL_USER, // your receiving address
      subject: 'New Contact Form Submission',
      text: `
        Name: ${fields.name}
        Email: ${fields.email}
        Phone: ${fields.phone}
        Product: ${fields.productName}
        Size: ${fields.length} x ${fields.width} x ${fields.depth} (${fields.unit})
        Material: ${fields.stock}, Color: ${fields.color}, Quantity: ${fields.quantity}
        Message: ${fields.additionalInfo}
      `,
      attachments: attachment,
    });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error(err);
    console.log(err.message)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
