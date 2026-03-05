import { Resend } from 'resend';

const resend = new Resend("re_i8fiFpEz_Pf5uVKgYNVcD3Md4fNsGnwzb");

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const { name, phone, email, carType, service, message } = await req.json();

    const data = await resend.emails.send({
      from: 'CMG Garage <info@cmggarage.hu>', // Verified domain
      to: ['info@cmggarage.hu'],
      reply_to: email || undefined,
      subject: `Ajánlatkérés: ${name} - ${service}`,
      html: `<h3>Új ajánlatkérés</h3><p>Név: ${name}</p><p>Tel: ${phone}</p><p>Üzenet: ${message}</p>`,
    });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Hiba történt' }), { status: 500 });
  }
}
