const express = require('express');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/send-inquiry', async (req, res) => {
  const { name, email, company, service, message } = req.body;

  if (!name || !email || !service || !message) {
    return res.status(400).json({ success: false, error: 'Required fields missing' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email address' });
  }

  const textContent = [
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
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Seedrix Website', email: 'info@seedrix.co' },
        to: [{ email: 'info@seedrix.co', name: 'Seedrix' }],
        replyTo: { email, name },
        subject: `Website inquiry from ${name}`,
        textContent,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Brevo error:', error);
      return res.status(500).json({ success: false, error: 'Failed to send email' });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Brevo error:', err);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API server listening on port ${PORT}`));
