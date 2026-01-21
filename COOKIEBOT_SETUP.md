# Cookiebot Setup Instructions

## ⚠️ IMPORTANT: You Need a Domain First!

**Cookiebot requires a real domain to work.** You cannot:
- ❌ Test on `localhost`
- ❌ Use without a domain
- ❌ Set up before having your domain

**Your workflow:**
1. Get your domain (e.g., `lunesystems.com`)
2. Upload your site to hosting (Netlify, Vercel, etc.)
3. **Then** sign up for Cookiebot with your real domain
4. Add Cookiebot ID to your HTML files
5. Re-upload and test

---

## Step 1: Get Your Domain & Deploy First

### Before Cookiebot Setup:
1. ✅ Register your domain (e.g., `lunesystems.com`)
2. ✅ Choose hosting (Netlify, Vercel, GitHub Pages, etc.)
3. ✅ Upload your site
4. ✅ Verify site is accessible at your domain

### Once Live:
**NOW you can proceed with Cookiebot setup below** ⬇️

---

## Step 2: Sign Up for Cookiebot (5 minutes)

1. Go to **https://www.cookiebot.com/**
2. Click **"Start free trial"** or **"Sign up"**
3. Choose the **FREE plan** (up to 100 pages)
4. Fill in your details:
   - Website: `https://yourdomain.com` (**use your actual domain**)
   - Email: Your email
   - Company: Lune Intelligent Systems

## Step 3: Get Your Cookiebot ID (2 minutes)

1. After signing up, you'll be taken to your dashboard
2. Look for **"Domain group ID"** or **"CBID"**
3. It looks like: `12345678-1234-1234-1234-123456789abc`
4. **Copy this ID** - you'll need it in the next step

## Step 4: Add Your Cookiebot ID to Your Website (3 minutes)

Replace `YOUR-COOKIEBOT-ID` with your actual ID in these files:

### Files to update:
1. `index.html` (line ~16)
2. `contact.html` (line ~16)
3. `privacy.html` (line ~14)

### Find this line:
```html
<script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="YOUR-COOKIEBOT-ID" type="text/javascript" async></script>
```

### Replace with:
```html
<script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="12345678-1234-1234-1234-123456789abc" type="text/javascript" async></script>
```
(Use your actual ID, not the example above)

## Step 5: Configure Cookiebot Settings (10 minutes)

1. In your Cookiebot dashboard, go to **"Settings"**
2. **Configure these settings:**

### General Settings:
- **Cookie banner language:** English (UK)
- **GDPR compliance:** ✅ Enabled
- **Show decline button:** ✅ Yes (required for GDPR)
- **Prior consent:** ✅ Required

### Appearance (Optional):
- Match your brand colors:
  - Primary color: `#10b981` (your green)
  - Accept button: `#10b981`
  - Text color: `#ffffff`

### Cookie Categories:
Cookiebot automatically categorizes cookies. You don't need to do anything here yet.

## Step 6: Test Your Setup (5 minutes)

1. **Upload your site** with the Cookiebot ID added
2. **Visit your site** in an incognito window
3. **You should see:**
   - ✅ Cookie consent banner appears
   - ✅ "Accept" and "Decline" buttons visible
   - ✅ Link to privacy policy works
   - ✅ Banner disappears after accepting/declining

### Test Commands:
```bash
# Clear cookies to see banner again
# Chrome: DevTools → Application → Cookies → Clear all
# Firefox: DevTools → Storage → Cookies → Clear

# Check if Cookiebot is loading
# Open browser console and look for: "Cookiebot" in the logs
```

## Step 7: When You Add Microsoft Clarity Later

**Good news:** Microsoft Clarity is already set up in your privacy policy and HTML files!

The Clarity script is in your HTML files (commented out). When ready:
1. Sign up at https://clarity.microsoft.com/
2. Get your Project ID
3. Uncomment the Clarity script in all HTML files
4. Replace `YOUR-CLARITY-PROJECT-ID` with your actual ID

**See `CLARITY_SETUP.md` for detailed instructions.**

The script is already properly configured:
- ✅ `type="text/plain"` - Prevents immediate execution
- ✅ `data-cookieconsent="statistics"` - Cookiebot controls when it runs
- ✅ Privacy policy already mentions Microsoft Clarity
- ✅ All GDPR requirements covered

## Step 8: Privacy Policy

Your privacy policy (`privacy.html`) **already includes Microsoft Clarity** with:
- ✅ What data is collected (session recordings, heatmaps)
- ✅ Why it's collected (improve user experience)
- ✅ How long it's retained (90 days)
- ✅ How to opt-out (decline statistics cookies)
- ✅ Link to Microsoft's privacy policy

**No action needed** - your privacy policy is complete and ready for Clarity.

## Troubleshooting

### Banner Not Appearing?
- Check that your Cookiebot ID is correct
- Look for console errors in browser DevTools
- Make sure you're not testing on `localhost` (Cookiebot requires a real domain)

### Banner Appears But Cookies Still Load?
- Make sure analytics scripts have `data-cookieconsent="statistics"`
- Check that scripts have `type="text/plain"`

### Want to See Banner Again?
- Clear your browser cookies
- Or visit in incognito/private mode
- Or click the Cookiebot icon (usually bottom-left of page)

## Support

- **Cookiebot Help:** https://www.cookiebot.com/en/help/
- **Cookiebot Documentation:** https://www.cookiebot.com/en/developer/
- **Email Support:** support@cookiebot.com

## Cost

- **FREE tier:** Up to 100 pages/domains
- **Your site:** 3 pages (index, contact, privacy) = FREE ✅
- **If you exceed 100 pages:** Paid plans start at £25/month

## Next Steps

1. ✅ Sign up for Cookiebot
2. ✅ Get your Cookiebot ID  
3. ✅ Replace `YOUR-COOKIEBOT-ID` in HTML files
4. ✅ Upload and test
5. ⏳ Later: Add Microsoft Clarity with proper consent tagging

---

**Questions?** Contact: contact@lunesystems.com

