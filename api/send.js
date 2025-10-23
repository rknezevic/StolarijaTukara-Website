import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, message } = req.body;

  try {
    const response = await resend.emails.send({
      from: 'Stolarija Tukara <info@stolarija-tukara.hr>', 
      to: ['drago.tukara95@gmail.com '],
      subject: `Nova poruka od ${name}`,
      html: `
        <h2>Nova poruka s web stranice</h2>
        <p><strong>Ime i prezime:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Poruka:</strong><br>${message}</p>
      `
    });

    res.status(200).json({ success: true, id: response.id });
  } catch (error) {
    console.error('Greška kod slanja:', error);
    res.status(500).json({ error: 'Slanje maila nije uspjelo.' });
  }
}
