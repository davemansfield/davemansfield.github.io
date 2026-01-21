# Deployment Checklist

## 📋 Order of Operations

Your site has placeholders for Cookiebot and Microsoft Clarity that **require a real domain** to work. Here's the correct order:

---

## Phase 1: Pre-Domain (You Are Here)

### ✅ Already Complete:
- [x] Website built and ready
- [x] Privacy policy created (mentions Clarity even though not active)
- [x] Cookiebot script added (with placeholder ID)
- [x] Microsoft Clarity script added (commented out)
- [x] All accessibility features implemented
- [x] SEO meta tags, sitemap, robots.txt ready

### 📝 What Works Without a Domain:
- ✅ Test your site locally (file:// or localhost)
- ✅ View design and layout
- ✅ Test forms (Formspree works on any domain)
- ✅ Check responsiveness
- ✅ Verify links work

### ⚠️ What Doesn't Work Without a Domain:
- ❌ Cookiebot (requires registered domain)
- ❌ Microsoft Clarity (requires registered domain)
- ❌ Proper HTTPS/SSL certificate
- ❌ Custom domain in browser bar
- ❌ Search engine indexing

---

## Phase 2: Get Domain & Deploy (Next Step)

### Option A: Register Domain First
1. **Register domain** (e.g., `lunesystems.com`)
   - Recommended: Namecheap, Google Domains, Cloudflare
   - Cost: ~£10-15/year

2. **Choose hosting** (all have free tiers):
   - **Netlify** (recommended for beginners)
   - **Vercel** (great for modern sites)
   - **GitHub Pages** (free, simple)
   - **Cloudflare Pages** (fast, free)

3. **Deploy your site:**
   ```bash
   # Example with Netlify CLI
   npm install -g netlify-cli
   netlify deploy --prod
   ```

4. **Connect your domain** to hosting
   - Update DNS settings to point to your host
   - Wait for DNS propagation (5 mins - 48 hours)

### Option B: Use Free Temporary Domain
If you want to test before buying a domain:

1. **Deploy to Netlify/Vercel** (get free subdomain)
   - Netlify: `yoursite.netlify.app`
   - Vercel: `yoursite.vercel.app`

2. **Set up Cookiebot with temporary domain**
   - Works for testing
   - Change later when you get real domain

3. **Buy real domain when ready**
   - Update Cookiebot settings with new domain
   - Update DNS to point to your hosting

---

## Phase 3: Enable Cookiebot (After Domain)

**Estimated time: 15 minutes**

1. ✅ Site live at your domain
2. **Sign up for Cookiebot:** https://www.cookiebot.com/
3. **Register your domain** in Cookiebot
4. **Copy your Cookiebot ID**
5. **Replace** `YOUR-COOKIEBOT-ID` in these files:
   - `index.html` (line ~16)
   - `contact.html` (line ~16)
   - `privacy.html` (line ~14)
6. **Re-upload** your site
7. **Test:** Visit site in incognito, see cookie banner

**See `COOKIEBOT_SETUP.md` for detailed instructions**

---

## Phase 4: Enable Microsoft Clarity (Optional, Later)

**Estimated time: 10 minutes**

1. ✅ Cookiebot working
2. **Sign up for Clarity:** https://clarity.microsoft.com/
3. **Create project** with your domain
4. **Copy your Project ID**
5. **Uncomment Clarity script** in these files:
   - `index.html` (near bottom)
   - `contact.html` (near bottom)
   - `privacy.html` (near bottom)
6. **Replace** `YOUR-CLARITY-PROJECT-ID` with your actual ID
7. **Re-upload** your site
8. **Test:** Visit site, accept cookies, check Clarity dashboard

**See `CLARITY_SETUP.md` for detailed instructions**

---

## Phase 5: Final Launch Checklist

Before going live publicly:

### Technical:
- [ ] Cookiebot ID added and working
- [ ] Microsoft Clarity enabled (if desired)
- [ ] Test all forms (contact form, email signup)
- [ ] Check mobile responsiveness
- [ ] Test in multiple browsers (Chrome, Firefox, Safari)
- [ ] Verify all links work
- [ ] Check 404 page (if you created one)
- [ ] Test cookie consent (accept & decline)

### Content:
- [ ] Update "Last updated" date in privacy policy
- [ ] Verify email addresses are correct
- [ ] Check spelling and grammar
- [ ] Verify LinkedIn link works
- [ ] Update any "coming soon" dates

### SEO:
- [ ] Update sitemap.xml with your actual domain
- [ ] Update robots.txt with your actual domain
- [ ] Update JSON-LD schema with real logo URL
- [ ] Submit sitemap to Google Search Console
- [ ] Verify meta descriptions on all pages

### Legal:
- [ ] Privacy policy accurate and complete
- [ ] Contact information correct
- [ ] Cookie consent banner working
- [ ] Terms of Service (if you added one)

---

## Recommended Hosting Options

### For Beginners: Netlify
**Pros:**
- ✅ Free tier generous
- ✅ Easy drag-and-drop deploy
- ✅ Automatic HTTPS
- ✅ Free subdomain included
- ✅ Easy custom domain connection
- ✅ Good documentation

**Setup:**
1. Sign up at https://netlify.com
2. Drag your website folder to deploy
3. Get free subdomain: `yoursite.netlify.app`
4. Connect custom domain in settings

### For Developers: Vercel
**Pros:**
- ✅ Free tier excellent
- ✅ Great performance
- ✅ Easy Git integration
- ✅ Automatic deployments
- ✅ Free subdomain included

**Setup:**
1. Sign up at https://vercel.com
2. Import from Git or drag folder
3. Get free subdomain: `yoursite.vercel.app`
4. Connect custom domain

### For Simplicity: GitHub Pages
**Pros:**
- ✅ Completely free
- ✅ Simple setup
- ✅ Good for static sites

**Cons:**
- ⚠️ No custom subdomain (uses github.io)
- ⚠️ Requires GitHub account
- ⚠️ Less features than Netlify/Vercel

---

## Testing Before Launch

### Local Testing (Now):
```bash
# Simple Python server
python -m http.server 8000

# Or use Live Server in VS Code
# Install "Live Server" extension, right-click index.html → "Open with Live Server"
```

**What you can test:**
- ✅ Design and layout
- ✅ Navigation
- ✅ Responsive design
- ✅ Forms (Formspree works)
- ✅ Animations

**What you can't test:**
- ❌ Cookiebot (needs real domain)
- ❌ Microsoft Clarity (needs real domain)
- ❌ SSL/HTTPS behavior

---

## Current State of Your Site

### Ready to Deploy:
```
✅ HTML/CSS/JS complete
✅ Privacy policy ready
✅ Accessibility features implemented
✅ SEO basics in place
✅ Forms configured
✅ Analytics scripts in place (waiting for IDs)
```

### Waiting for Domain:
```
⏳ Cookiebot ID (placeholder present)
⏳ Microsoft Clarity ID (script commented out)
⏳ Update domain URLs in:
   - robots.txt
   - sitemap.xml
   - JSON-LD schema
   - Canonical URLs (when you know domain)
```

---

## Recommended Timeline

### Today:
- ✅ Test site locally
- ✅ Review content
- ✅ Fix any issues

### This Week:
- [ ] Register domain (£10-15)
- [ ] Deploy to hosting (free)
- [ ] Connect domain to hosting
- [ ] Set up Cookiebot
- [ ] Test everything

### Next Week:
- [ ] Add Microsoft Clarity
- [ ] Monitor analytics
- [ ] Iterate based on data

---

## Cost Summary

| Item | Cost | When |
|------|------|------|
| Domain registration | £10-15/year | Before launch |
| Hosting (Netlify/Vercel) | FREE | Now |
| SSL Certificate | FREE (auto) | Automatic |
| Cookiebot | FREE (<100 pages) | After domain |
| Microsoft Clarity | FREE (unlimited) | Anytime |
| **Total First Year** | **£10-15** | One-time |

---

## Questions?

**"Can I test Cookiebot before buying a domain?"**
- Not really. Use a free Netlify/Vercel subdomain to test.

**"Do I need to buy a domain right away?"**
- No, you can test on free subdomain first.
- Buy domain when you're ready to launch publicly.

**"What if I change my domain later?"**
- Update Cookiebot settings (easy)
- Update sitemap.xml and robots.txt
- Update Clarity project settings
- No major issues!

**"Can I use Cookiebot on localhost?"**
- No, Cookiebot requires a real domain (even a subdomain works).

---

## Next Action: Choose Your Path

### Path A: Quick Test (Recommended)
1. Deploy to Netlify (get free subdomain)
2. Set up Cookiebot with subdomain
3. Test everything works
4. Buy domain when ready
5. Update Cookiebot settings

### Path B: Wait for Domain
1. Buy domain first
2. Set up hosting
3. Deploy site
4. Set up Cookiebot with real domain
5. Launch

**Either way works!** Path A lets you test sooner.

---

**Need help?** See individual setup guides:
- `COOKIEBOT_SETUP.md` - Cookiebot instructions
- `CLARITY_SETUP.md` - Microsoft Clarity instructions

