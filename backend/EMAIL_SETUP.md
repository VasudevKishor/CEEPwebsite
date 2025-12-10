# Email Configuration Instructions

## Quick Setup for Gmail

1. **Enable 2-Factor Authentication** on your Gmail account:
   - Go to https://myaccount.google.com/security
   - Enable "2-Step Verification"

2. **Generate App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "CEEP Website"
   - Copy the 16-character password (no spaces)

3. **Update `.env` file** with your credentials:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=youremail@gmail.com
   SMTP_PASS=your_16_char_app_password
   CONTACT_TO=thilaganiniyavan@gmail.com
   SMTP_FROM=youremail@gmail.com
   ```

4. **Restart the backend server** after updating `.env`

## Testing

After configuration, submit a test message through the contact form. Check:
- The contact email (thilaganiniyavan@gmail.com) should receive the message
- Check spam folder if not in inbox

## Troubleshooting

- **"Invalid login"**: Make sure you're using an App Password, not your regular Gmail password
- **"Authentication failed"**: Verify 2FA is enabled and App Password is correct
- **No email received**: Check spam folder and verify SMTP_USER and CONTACT_TO are correct
