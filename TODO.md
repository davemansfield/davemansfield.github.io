# Lune Intelligent Systems - TODO List

**Last Updated:** January 26, 2026  
**Site Status:** 🚀 LIVE - Post-Launch Tasks

---

## 🔴 **CRITICAL - Do Immediately**

### **1. Enable HTTPS**
**Status:** Waiting on GitHub SSL certificate  
**Action Required:**
- [ ] Wait for "Enforce HTTPS" checkbox to become available in GitHub Pages settings (30-60 min)
- [ ] Enable "Enforce HTTPS" checkbox
- [ ] Wait 10-15 minutes for HTTPS to activate
- [ ] Verify site loads with green padlock at `https://luneintelligentsystems.com`

**Why Critical:** Site shows "Not Secure" warning until this is done

---

### **2. Add Survey URL**
**Status:** Survey being designed (ready by end of day)  
**Action Required:**
- [ ] Get survey URL when ready
- [ ] Update `index.html` line ~133:
  ```html
  <!-- Change from: -->
  <a href="#" class="survey-button" ...>
  
  <!-- To: -->
  <a href="YOUR-SURVEY-URL" class="survey-button" ...>
  ```
- [ ] Push update to GitHub
- [ ] Test survey link works

**Why Critical:** Button currently goes nowhere

---

## 🟡 **IMPORTANT - Do This Week**

### **3. Test Everything Post-Launch**
**Status:** Waiting for DNS/HTTPS  
**Testing Checklist:**
- [ ] Visit `https://luneintelligentsystems.com` in incognito mode
- [ ] Verify cookie banner appears (Cookiebot)
- [ ] Accept cookies and browse site
- [ ] Test contact form submission
- [ ] Test email signup form
- [ ] Check all pages load (index, contact, privacy)
- [ ] Test on mobile device
- [ ] Verify Clarity is recording sessions (check dashboard after 5 min)
- [ ] Test application card clicks (verify they're trackable in Clarity)

---

### **4. Set Up .NET Domain Redirect**
**Status:** Not configured yet  
**Action Required:**
- [ ] Log into Porkbun
- [ ] Go to `luneintelligentsystems.net` settings
- [ ] Set up URL forwarding to `luneintelligentsystems.com`
  - Type: 301 Permanent Redirect
  - Include path: Yes
  - Wildcard: Yes
- [ ] Test redirect works from both:
  - `luneintelligentsystems.net`
  - `www.luneintelligentsystems.net`

**Why Important:** Protect your brand and catch typos

---

### **5. Submit to Google Search Console**
**Status:** Not done yet  
**Action Required:**
- [ ] Sign up at https://search.google.com/search-console
- [ ] Add property: `luneintelligentsystems.com`
- [ ] Verify ownership (DNS verification or HTML file)
- [ ] Submit sitemap: `https://luneintelligentsystems.com/sitemap.xml`
- [ ] Request indexing for main pages

**Why Important:** Get found in Google searches

---

## 🟢 **NICE TO HAVE - When You Have Time**

### **6. Set Up Professional Email**
**Status:** Email addresses in files but no service configured  
**Current:** `contact@luneintelligentsystems.com` (not working)

**Options:**
- [ ] **Option A:** Zoho Mail Free (5 addresses, FREE)
  - Sign up at https://www.zoho.com/mail/
  - Add domain and configure DNS
  - Create email accounts
  
- [ ] **Option B:** Email forwarding via Porkbun (quick & free)
  - Set up forwards to existing email
  - Less professional but works
  
- [ ] **Option C:** University Microsoft 365 (if IT approves)
  - Ask Lancaster IT about custom domain support

**Why Nice:** Professional communication, customer trust

---

### **7. Add Logo & Favicon**
**Status:** Logo being designed  
**When Ready:**
- [ ] Export logo in multiple formats:
  - `favicon.ico` (16x16, 32x32)
  - `favicon-192.png` (192x192)
  - `favicon-512.png` (512x512)
  - `apple-touch-icon.png` (180x180)
  - `logo.png` (for social sharing)

- [ ] Add to `<head>` in all HTML files:
  ```html
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="192x192" href="/assets/images/favicon-192.png">
  <link rel="icon" type="image/png" sizes="512x512" href="/assets/images/favicon-512.png">
  <link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png">
  ```

- [ ] Update JSON-LD schema logo URL in `index.html` and `contact.html`:
  ```html
  "logo": "https://luneintelligentsystems.com/assets/images/logo.png"
  ```

**Why Nice:** Professional look, better brand recognition

---

### **8. Add Social Sharing Tags**
**Status:** Waiting for logo  
**When Logo Ready:**

Add to `<head>` of all HTML files:
```html
<!-- Open Graph (Facebook, LinkedIn) -->
<meta property="og:title" content="Lune Intelligent Systems - Autonomous Swarm Robotics">
<meta property="og:description" content="Pioneering autonomous swarm robotics for nuclear decommissioning, environmental monitoring, gas quantification, agriculture, and search & rescue.">
<meta property="og:image" content="https://luneintelligentsystems.com/assets/images/logo.png">
<meta property="og:url" content="https://luneintelligentsystems.com">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Lune Intelligent Systems - Autonomous Swarm Robotics">
<meta name="twitter:description" content="Pioneering autonomous swarm robotics for extreme environments.">
<meta name="twitter:image" content="https://luneintelligentsystems.com/assets/images/logo.png">
```

**Why Nice:** Better sharing on social media

---

### **9. Monitor Analytics**
**Status:** Clarity tracking active  
**Regular Tasks:**
- [ ] Check Clarity dashboard weekly for:
  - Session recordings
  - Heatmaps (where users click)
  - Scroll depth
  - Rage clicks (frustrated users)
  - Dead clicks
- [ ] Analyze which application cards get most clicks
- [ ] Review user behavior and identify UX improvements
- [ ] Check Cookiebot consent rates

**Why Nice:** Understand your users, improve site

---

### **10. Performance Optimizations**
**Status:** Not critical, site is already fast

**When You Want to Optimize:**
- [ ] Compress images (use TinyPNG or ImageOptim)
- [ ] Add font preloading:
  ```html
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Poppins..." as="style">
  ```
- [ ] Minify CSS and JS (optional)
- [ ] Enable Cloudflare CDN (if you want even faster loading)

**Why Nice:** Slightly faster load times, better UX

---

### **11. Add 404 Page**
**Status:** None currently

**When You Want:**
- [ ] Create `404.html` in root directory
- [ ] Design custom 404 page matching site style
- [ ] Include navigation back to homepage
- [ ] GitHub Pages will automatically use it

**Why Nice:** Better user experience when links break

---

### **12. Security Enhancements**
**Status:** Basic security in place

**Advanced (Optional):**
- [ ] Add `security.txt` file at `/.well-known/security.txt`
- [ ] Add Content Security Policy headers (if using Cloudflare/Netlify)
- [ ] Add referrer policy meta tag:
  ```html
  <meta name="referrer" content="strict-origin-when-cross-origin">
  ```

**Why Nice:** Better security posture for enterprise customers

---

## 📊 **DONE - No Action Needed**

✅ Domain purchased and configured  
✅ DNS records set up  
✅ GitHub Pages configured  
✅ Cookiebot installed and configured  
✅ Microsoft Clarity installed and configured  
✅ Formspree forms working  
✅ Privacy policy complete  
✅ All 5 applications added (including Agriculture)  
✅ Application cards clickable for tracking  
✅ Contact button in footer  
✅ Mobile responsive  
✅ Accessibility features  
✅ SEO basics (sitemap, robots.txt, meta tags)  
✅ LinkedIn URL correct  

---

## 🎯 **Priority Order**

### **Today:**
1. Enable HTTPS (when available)
2. Add survey URL (when ready)
3. Test everything

### **This Week:**
4. Set up .NET redirect
5. Submit to Google Search Console
6. Consider email setup

### **When Time Permits:**
7-12. Nice to have features

---

## 📝 **Notes**

- **Logo Design:** In progress - add favicon/social tags when ready
- **Email Service:** Not urgent, can wait until after launch
- **Survey:** Ready by end of day - just update one line
- **HTTPS:** Waiting on GitHub certificate (automatic, just takes time)

---

**Current Status:** 🚀 LIVE and fully functional!  
**Remaining Critical Items:** 2 (HTTPS + Survey URL)  
**Estimated Time to Complete Critical Items:** 1 hour  
**Nice-to-Haves:** Can be done anytime over next few weeks

---

**Questions or need help?** Push updates to GitHub and test thoroughly after each change!

