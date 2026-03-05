import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, email, carType, service, message } = req.body;

    const data = await resend.emails.send({
      from: 'CMG Garage <info@cmggarage.hu>', // Resendben verified
      to: ['info@cmggarage.hu'], // ImprovisMX továbbítja a Gmail-edre
      reply_to: email || undefined,
      subject: `Ajánlatkérés: ${name} - ${service}`,
      html: `
        <h3>Új ajánlatkérés érkezett</h3>
        <p><strong>Név:</strong> ${name}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Autó:</strong> ${carType}</p>
        <p><strong>Szolgáltatás:</strong> ${service}</p>
        <p><strong>Üzenet:</strong> ${message}</p>
      `,
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Hiba az e-mail küldésekor' });
  }
}
