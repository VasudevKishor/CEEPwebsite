# ✅ Contact Form Email Setup - CEEP Website

## Status: Ready to Configure

The contact form is **fully implemented** and ready to send emails to `thilaganiniyavan@gmail.com`.

---

## 📝 What You Need to Do

### Step 1: Configure Email Settings

Open `backend/.env` and replace the placeholder values:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=YOUR_EMAIL@gmail.com          👈 Replace with your Gmail address
SMTP_PASS=YOUR_APP_PASSWORD_HERE        👈 Replace with Gmail App Password
CONTACT_TO=thilaganiniyavan@gmail.com   ✅ Already set (recipient email)
SMTP_FROM=YOUR_EMAIL@gmail.com          👈 Replace with your Gmail address
```

---

### Step 2: Get Gmail App Password

1. **Enable 2-Factor Authentication:**
   - Go to: https://myaccount.google.com/security
   - Turn on "2-Step Verification"

2. **Generate App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" → "Other (Custom name)"
   - Enter name: "CEEP Website"
   - Click "Generate"
   - Copy the 16-character password (remove spaces)
   - Paste it in `SMTP_PASS` in `.env` file

---

### Step 3: Restart Backend Server

After updating `.env`:

```bash
cd backend
npm run dev
```

---

## 🎨 Email Features

When someone submits the contact form, you'll receive a **formatted HTML email** with:

- 📧 Beautiful styled layout
- 👤 Sender's name
- 📧 Sender's email (clickable)
- 📱 Phone number
- 📋 Subject
- 💬 Message content
- 🕐 Timestamp

---

## 🧪 Testing

1. Make sure backend is running
2. Go to the Contact page on the website
3. Fill out and submit the form
4. Check `thilaganiniyavan@gmail.com` inbox (and spam folder)

---

## ⚠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| "Invalid login" | Use App Password, not regular Gmail password |
| "Authentication failed" | Verify 2FA is enabled |
| No email received | Check spam folder |
| "SMTP not configured" | Restart backend after updating .env |

---

## 🔒 Security Notes

- Never commit `.env` file to Git (it's already in `.gitignore`)
- Use App Passwords, not your main Gmail password
- Keep your SMTP credentials private

---

## 📂 Files Modified

- ✅ `backend/.env` - Email configuration (fill in placeholders)
- ✅ `backend/routes/contact.js` - Sends formatted HTML emails
- ✅ `frontend/src/pages/Contact.js` - Already sends to backend API
- ✅ `package.json` - nodemailer already installed

---

**Ready to go! Just fill in your Gmail credentials in `.env` and restart the backend.**
