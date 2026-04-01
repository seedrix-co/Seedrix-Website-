const express = require('express');
const Brevo = require('@getbrevo/brevo');

const app = express();
app.use(express.json());

// Brevo transactional email client
const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

app.post('/send-inquiry', async (req, res) => {
  const { name, email, company, service, message } = req.body;

  if (!name || !email || !service || !message) {
    return res.status(400).json({ success: false, error: 'Required fields missing' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email address' });
  }

  const mail = new Brevo.SendSmtpEmail();
  mail.sender = { name: 'Seedrix Website', email: 'info@seedrix.co' };
  mail.to = [{ email: 'info@seedrix.co', name: 'Seedrix' }];
  mail.replyTo = { email, name };
  mail.subject = `Website inquiry from ${name}`;
  mail.textContent = [
    'New inquiry from the website',
    '',
    `Name:     ${name}`,
    `Email:    ${email}`,
    `Company:  ${company || '-'}`,
    `Service:  ${service}`,
    '',
    'Message:',
    message,
  ].join('\n');

  try {
    await apiInstance.sendTransacEmail(mail);
    res.json({ success: true });
  } catch (err) {
    console.error('Brevo error:', err?.response?.body ?? err);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API server listening on port ${PORT}`));
