# Microsoft Clarity Setup Instructions

Your privacy policy and cookie consent are already configured for Microsoft Clarity. When you're ready to enable analytics, follow these steps:

## Step 1: Sign Up for Microsoft Clarity (5 minutes)

1. Go to **https://clarity.microsoft.com/**
2. Click **"Sign up"** or **"Get started"**
3. Sign in with your Microsoft account (or create one)
4. It's **completely FREE** - no credit card required, unlimited data

## Step 2: Create a New Project (2 minutes)

1. Click **"Add new project"**
2. Fill in details:
   - **Name:** Lune Intelligent Systems
   - **Website URL:** https://lunesystems.com (or your domain)
3. Click **"Add"**

## Step 3: Get Your Clarity Project ID (1 minute)

1. After creating the project, you'll see your **Project ID**
2. It looks like: `a1b2c3d4e5`
3. **Copy this ID** - you'll need it in the next step

## Step 4: Enable Clarity in Your Website (3 minutes)

The Clarity script is already in your HTML files, just commented out. You need to:

### Find the commented script in these files:
- `index.html` (near the bottom, before `</body>`)
- `contact.html` (near the bottom, before `</body>`)
- `privacy.html` (near the bottom, before `</body>`)

### Current code (commented out):
```html
<!-- Microsoft Clarity - Uncomment when ready to enable -->
<!--
<script type="text/plain" data-cookieconsent="statistics">
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "YOUR-CLARITY-PROJECT-ID");
</script>
-->
```

### Enable it:

1. **Remove the comment tags** (`<!--` and `-->`)
2. **Replace** `YOUR-CLARITY-PROJECT-ID` with your actual ID

### After editing:
```html
<!-- Microsoft Clarity - Active -->
<script type="text/plain" data-cookieconsent="statistics">
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "a1b2c3d4e5");
</script>
```

**Important notes:**
- Keep `type="text/plain"` - this is correct! It lets Cookiebot control when it loads
- Keep `data-cookieconsent="statistics"` - this marks it as an analytics cookie
- Replace the ID in **all 3 HTML files**

## Step 5: Test Your Setup (10 minutes)

1. **Upload your updated site**
2. **Visit in incognito mode**
3. **Accept cookies** when the banner appears
4. **Browse around** - click things, scroll, navigate between pages
5. **Wait 2-5 minutes** for data to appear in Clarity dashboard

### Check if it's working:
1. Go to your Clarity dashboard: https://clarity.microsoft.com/
2. Click on your project
3. You should see:
   - ✅ Session recordings appearing
   - ✅ Heatmaps generating
   - ✅ "Recording" indicator if you're currently on the site

## Step 6: Configure Privacy Settings in Clarity (5 minutes)

1. In Clarity dashboard, go to **Settings** → **Setup**
2. Scroll to **Privacy & Masking**
3. **Recommended settings:**
   - ✅ **Mask all input:** ON (protects passwords, emails, etc.)
   - ✅ **Mask text:** Consider ON if you have sensitive content
   - ✅ **IP address masking:** ON (for extra privacy)

### Custom masking (optional):
Add CSS class `clarity-mask` to any element you want to hide:
```html
<div class="clarity-mask">This content won't be recorded</div>
```

## Step 7: Verify GDPR Compliance (2 minutes)

Make sure everything is compliant:

✅ **Cookie consent:** Clarity only loads after user accepts (via Cookiebot)  
✅ **Privacy policy:** Already mentions Clarity  
✅ **Opt-out option:** Users can decline cookies or change preferences  
✅ **Data masking:** Sensitive data is automatically hidden  

## What You'll See in Clarity:

### **Recordings** - Watch actual user sessions
- See mouse movements, clicks, scrolls
- Identify UX issues and confusion
- Watch how people interact with forms

### **Heatmaps** - Visualize user behavior
- Click maps: Where do people click?
- Scroll maps: How far do people scroll?
- Area maps: Which sections get most attention?

### **Insights** - Automatic analysis
- Dead clicks (clicking non-interactive elements)
- Rage clicks (frustrated rapid clicking)
- Quick backs (immediate exits)
- JavaScript errors

### **Dashboard** - Key metrics
- Page views
- Session duration
- Popular pages
- Device breakdown

## Troubleshooting

### Not seeing any data?
- **Wait 2-5 minutes** - data isn't instant
- Check browser console for errors
- Verify you accepted cookies
- Make sure Cookiebot ID is correct

### Clarity loads immediately (ignores consent)?
- Check `type="text/plain"` is present
- Check `data-cookieconsent="statistics"` is present
- Make sure Cookiebot is properly configured

### Want to test without accepting cookies?
- You can't - that's the point! Clarity should ONLY work after consent
- This proves your GDPR compliance is working

## Advanced: Tracking Custom Events (Optional)

You can track specific user actions:

```javascript
// Track button clicks
document.getElementById('signup-button').addEventListener('click', function() {
    clarity('event', 'signup_clicked');
});

// Track custom goals
clarity('set', 'user_type', 'interested_customer');
```

Add these to your `js/script.js` or `js/contact.js` files.

## Cost & Limits

- **Price:** FREE forever
- **Sessions:** Unlimited
- **Recording length:** Unlimited
- **Data retention:** 90 days (configurable)
- **Projects:** Unlimited
- **Team members:** Unlimited

**No catch!** Microsoft offers this free to improve their products.

## Privacy & Data Location

- **Data stored:** Microsoft Azure cloud (varies by region)
- **GDPR compliant:** Yes
- **Data transfers:** May include US (Microsoft has EU-US Data Privacy Framework certification)
- **Your responsibility:** Get user consent (you're doing this via Cookiebot ✅)

## Support & Resources

- **Clarity Help:** https://clarity.microsoft.com/help
- **Community:** https://techcommunity.microsoft.com/
- **Privacy Statement:** https://privacy.microsoft.com/

## Summary Checklist

When you're ready to enable Clarity:

- [ ] Sign up at https://clarity.microsoft.com/
- [ ] Create project and get Project ID
- [ ] Uncomment Clarity script in all 3 HTML files
- [ ] Replace `YOUR-CLARITY-PROJECT-ID` with actual ID
- [ ] Upload and test in incognito mode
- [ ] Accept cookies and browse around
- [ ] Check Clarity dashboard for recordings (wait 2-5 min)
- [ ] Enable privacy masking in Clarity settings
- [ ] Done! 🎉

---

**Everything else is already done:**
- ✅ Privacy policy mentions Clarity
- ✅ Cookiebot configured for Clarity
- ✅ Script properly tagged for consent
- ✅ All pages have the script ready

You just need to uncomment and add your Project ID!

---

**Questions?** Contact: contact@lunesystems.com

