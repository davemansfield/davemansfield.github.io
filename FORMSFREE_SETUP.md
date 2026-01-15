# Formspree Setup Guide

Your forms are now configured to work with Formspree! Follow these steps to complete the setup:

## Step 1: Create a Formspree Account

1. Go to [https://formspree.io](https://formspree.io)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Create Your Forms

You need to create **TWO separate forms** in Formspree:

### Form 1: Email Notification Form (Homepage)
1. In your Formspree dashboard, click "New Form"
2. Name it something like "Email Notifications" or "Launch Signup"
3. Copy the endpoint URL (looks like: `https://formspree.io/f/xxxxxxxxxx`)
4. Open `script.js` in your project
5. Find the line: `const FORMSFREE_EMAIL_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID_HERE';`
6. Replace `YOUR_FORM_ID_HERE` with your actual endpoint URL

### Form 2: Contact Form
1. In your Formspree dashboard, click "New Form" again
2. Name it something like "Contact Form" or "General Inquiry"
3. Copy the endpoint URL
4. Open `contact.js` in your project
5. Find the line: `const FORMSFREE_CONTACT_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID_HERE';`
6. Replace `YOUR_FORM_ID_HERE` with your actual endpoint URL

## Step 3: Configure Email Notifications

1. In each form's settings in Formspree, add the email address where you want to receive submissions
2. You can add multiple email addresses
3. Customize the email subject if desired

## Step 4: Test Your Forms

1. Deploy your site (or test locally)
2. Submit a test email through the homepage form
3. Submit a test message through the contact form
4. Check your email inbox for the submissions
5. Check your Formspree dashboard to see the submissions

## Step 5: Optional - Configure Spam Protection

1. In Formspree dashboard, go to your form settings
2. Enable spam filtering (Formshield)
3. Optionally add reCAPTCHA or hCaptcha for extra protection

## Troubleshooting

- **Forms not submitting?** Make sure you've replaced both endpoint URLs in `script.js` and `contact.js`
- **Not receiving emails?** Check your Formspree dashboard to see if submissions are coming through. Check spam folder.
- **Getting errors?** Open browser console (F12) to see detailed error messages

## Free Tier Limits

- **50 submissions per month** on the free plan
- If you need more, upgrade to a paid plan starting at $10/month

## Need Help?

- Formspree Documentation: [https://help.formspree.io](https://help.formspree.io)
- Formspree Support: Available in your dashboard
