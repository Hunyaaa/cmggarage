'use server';

import { Resend } from 'resend';

// Ide ne írd be a kulcsot, a Vercel Environment Variables-be tedd!
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const carType = formData.get('car_type') as string;
  const service = formData.get('service') as string;
  const message = formData.get('message') as string;
  
  // Képek kezelése (ha vannak feltöltve)
  const files = formData.getAll('images') as File[];
  
  const attachments = await Promise.all(
    files
      .filter((file) => file.size > 0)
      .map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      }))
  );

  try {
    const { data, error } = await resend.emails.send({
      from: 'CMG Garage <onboarding@resend.dev>', // Ha igazoltad a domaint: info@cmggarage.hu
      to: ['info@cmggarage.hu'],
      reply_to: email,
      subject: `Új ajánlatkérés: ${name} - ${service}`,
      attachments: attachments,
      html: `
        <h2>Új üzenet érkezett a weboldalról</h2>
        <p><strong>Név:</strong> ${name}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Autó típusa:</strong> ${carType}</p>
        <p><strong>Szolgáltatás:</strong> ${service}</p>
        <p><strong>Üzenet:</strong><br/>${message}</p>
      `,
    });

    if (error) {
      return { success: false, error };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
}
