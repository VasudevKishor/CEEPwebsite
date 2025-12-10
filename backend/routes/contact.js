const express = require('express');
const router = express.Router();
// contacts kept in a local array — staticData module removed
const contacts = [];
let nodemailer;
try {
    nodemailer = require('nodemailer');
} catch (e) {
    console.warn('nodemailer not installed — contact emails will be disabled until you run `npm install` in backend.');
    nodemailer = null;
}

// Configure mail transporter using environment variables.
// Required env vars (recommended in backend/.env or system env):
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE (true/false), CONTACT_TO
const getTransporter = () => {
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT && Number(process.env.SMTP_PORT);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const secure = process.env.SMTP_SECURE === 'true';

    // DEBUG: Log env vars to diagnose issues
    console.log('SMTP Config:', {
        host: host || 'NOT SET',
        port: port || 'NOT SET',
        user: user || 'NOT SET',
        pass: pass ? `[${pass.length} chars] ${pass.substring(0, 3)}***` : 'NOT SET',
        secure: secure,
        SMTP_SECURE_RAW: process.env.SMTP_SECURE
    });

    if (!nodemailer) return null;
    if (!host || !port || !user || !pass) return null;

    return nodemailer.createTransport({
        host,
        port,
        secure: Boolean(secure),
        auth: { user, pass }
    });
};

// Get all contact messages
router.get('/', (req, res) => {
    res.json(contacts);
});

// Get single contact message
router.get('/:id', (req, res) => {
    const msg = contacts.find(m => m.id === req.params.id);
    if (!msg) return res.status(404).json({ error: 'Message not found' });
    res.json(msg);
});

// Create contact message (in-memory)
router.post('/', (req, res) => {
    const contact = { id: `contact-${Date.now()}`, receivedAt: new Date().toISOString(), ...req.body };
    // store in-memory
    contacts.unshift(contact);

    // Prepare email
    const toAddress = process.env.CONTACT_TO || 'thilaganiniyavan@gmail.com';
    const fromAddress = process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@ceepweb.com';
    const subject = `🔔 New Contact Form Submission - ${contact.name || 'Website Visitor'}`;
    
    // Create formatted email body
    const htmlBody = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #3498db; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
                .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
                .field { margin-bottom: 15px; }
                .field-label { font-weight: bold; color: #555; }
                .field-value { margin-top: 5px; padding: 10px; background-color: white; border-left: 3px solid #3498db; }
                .footer { text-align: center; padding: 15px; color: #777; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>📧 New Contact Form Submission</h2>
                    <p style="margin: 0;">CEEP Website - Contact Form</p>
                </div>
                <div class="content">
                    <div class="field">
                        <div class="field-label">👤 Name:</div>
                        <div class="field-value">${contact.name || 'Not provided'}</div>
                    </div>
                    <div class="field">
                        <div class="field-label">📧 Email:</div>
                        <div class="field-value"><a href="mailto:${contact.email}">${contact.email || 'Not provided'}</a></div>
                    </div>
                    <div class="field">
                        <div class="field-label">📱 Phone:</div>
                        <div class="field-value">${contact.phone || 'Not provided'}</div>
                    </div>
                    <div class="field">
                        <div class="field-label">📋 Subject:</div>
                        <div class="field-value">${contact.subject || 'Not provided'}</div>
                    </div>
                    <div class="field">
                        <div class="field-label">💬 Message:</div>
                        <div class="field-value">${contact.message || 'Not provided'}</div>
                    </div>
                    <div class="field">
                        <div class="field-label">🕐 Received At:</div>
                        <div class="field-value">${new Date(contact.receivedAt).toLocaleString()}</div>
                    </div>
                </div>
                <div class="footer">
                    <p>This email was sent from the CEEP website contact form.</p>
                </div>
            </div>
        </body>
        </html>
    `;

    const textBody = `
New Contact Form Submission - CEEP Website

Name: ${contact.name || 'Not provided'}
Email: ${contact.email || 'Not provided'}
Phone: ${contact.phone || 'Not provided'}
Subject: ${contact.subject || 'Not provided'}
Message: ${contact.message || 'Not provided'}
Received At: ${new Date(contact.receivedAt).toLocaleString()}
    `.trim();

    const transporter = getTransporter();
    if (transporter) {
        transporter.sendMail({
            from: `"CEEP Website" <${fromAddress}>`,
            to: toAddress,
            subject,
            text: textBody,
            html: htmlBody
        }).then(info => {
            console.log('✅ Contact email sent successfully:', info.response);
            res.status(201).json({ 
                message: 'Thank you for contacting us! We will get back to you soon.', 
                contact, 
                emailSent: true 
            });
        }).catch(err => {
            console.error('❌ Error sending contact email:', err.message);
            res.status(201).json({ 
                message: 'Thank you for contacting us! Your message was saved, but there was an issue sending the notification email.', 
                contact, 
                emailSent: false, 
                error: err.message 
            });
        });
    } else {
        console.warn('⚠️  SMTP not configured - email not sent. Please configure SMTP settings in .env file.');
        res.status(201).json({ 
            message: 'Thank you for contacting us! (Note: Email notifications are not configured yet)', 
            contact, 
            emailSent: false 
        });
    }
});

// Update contact message status (in-memory)
router.put('/:id', (req, res) => {
    const idx = contacts.findIndex(m => m.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Message not found' });
    contacts[idx] = { ...contacts[idx], ...req.body };
    res.json(contacts[idx]);
});

// Delete contact message (in-memory)
router.delete('/:id', (req, res) => {
    const idx = contacts.findIndex(m => m.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Message not found' });
    contacts.splice(idx, 1);
    res.json({ message: 'Contact message deleted successfully' });
});

module.exports = router;


