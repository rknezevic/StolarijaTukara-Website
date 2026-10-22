import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Sprječava ubacivanje HTML-a / skripti u e-mail
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name = '', email = '', message = '', website = '', elapsed = 0 } = req.body || {};

  // Zamka za spam robote: ljudi ne vide polje "website" i ne šalju obrazac u manje od 3 sekunde.
  // Robotu glumimo uspjeh da ne pokušava ponovno.
  if (website || Number(elapsed) < 3000) {
    return res.status(200).json({ success: true });
  }

  const cleanName = String(name).trim();
  const cleanEmail = String(email).trim();
  const cleanMessage = String(message).trim();

  if (!cleanName || cleanName.length > 100) {
    return res.status(400).json({ error: 'Molimo upišite ime i prezime.' });
  }
  if (!EMAIL_RE.test(cleanEmail) || cleanEmail.length > 200) {
    return res.status(400).json({ error: 'E-mail adresa nije ispravna.' });
  }
  if (!cleanMessage || cleanMessage.length > 5000) {
    return res.status(400).json({ error: 'Poruka je prazna ili preduga.' });
  }

  const { data, error } = await resend.emails.send({
    from: 'Stolarija Tukara <info@stolarija-tukara.hr>',
    to: ['drago.tukara95@gmail.com'],
    replyTo: cleanEmail,
    subject: `Nova poruka od ${cleanName.replace(/[\r\n]+/g, ' ')}`,
    html: `
      <h2>Nova poruka s web stranice</h2>
      <p><strong>Ime i prezime:</strong> ${escapeHtml(cleanName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
      <p><strong>Poruka:</strong><br>${escapeHtml(cleanMessage).replace(/\n/g, '<br>')}</p>
    `
  });

  if (error) {
    console.error('Greška kod slanja:', error);
    return res.status(500).json({ error: 'Slanje maila nije uspjelo.' });
  }

  return res.status(200).json({ success: true, id: data?.id });
}
