import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, email, carType, service, message } = req.body;

    const data = await resend.emails.send({
      from: 'CMG Garage <info@cmggarage.hu>',
      to: ['info@cmggarage.hu'],
      reply_to: email || undefined,
      subject: `Ajánlatkérés: ${name} - ${service}`,
      html: `
        <h3>Új ajánlatkérés érkezett</h3>
        <p><strong>Név:</strong> ${name}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || 'Nem adott meg'}</p>
        <p><strong>Autó típusa:</strong> ${carType || 'Nem adott meg'}</p>
        <p><strong>Szolgáltatás:</strong> ${service || 'Nem adott meg'}</p>
        <p><strong>Üzenet:</strong> ${message || 'Nincs üzenet'}</p>
      `,
    });

    return res.status(200).json(data);
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({
      error: 'Hiba az e-mail küldésekor',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
