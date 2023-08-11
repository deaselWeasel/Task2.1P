require('dotenv').config();

const express = require('express');
const sgMail = require('@sendgrid/mail');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware to parse JSON payloads
app.use(express.json());
app.use(cors());


sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Set your SendGrid API Key

app.post('/subscribe', (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).send('Email is required');
    }

    const msg = {
        to: email,
        from: 'zakarya45@gmail.com', // Replace with your verified SendGrid email
        subject: 'Welcome to DevLink!',
        text: 'Thank you for subscribing to DevLink. We are excited to have you onboard!',
    };

    sgMail.send(msg)
        .then(() => {
            res.status(200).send('Email sent successfully!');
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Failed to send email.');
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
