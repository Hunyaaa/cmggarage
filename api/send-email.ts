import { Resend } from 'resend';

export const config = {
  runtime: 'edge',
};

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { name, phone, email, carType, service, message } = await req.json();

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

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Email sending error:', error);
    return new Response(
      JSON.stringify({ error: 'Hiba az e-mail küldésekor', details: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
