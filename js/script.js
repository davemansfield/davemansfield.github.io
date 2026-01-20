// ============================================
// FORMSFREE CONFIGURATION
// ============================================
// Get your Formspree endpoint URL from:
// 1. Sign up at https://formspree.io
// 2. Create a new form
// 3. Copy the endpoint URL (looks like: https://formspree.io/f/YOUR_FORM_ID)
// 4. Replace the URL below with your endpoint
const FORMSFREE_EMAIL_ENDPOINT = 'https://formspree.io/f/xwvvpzek';

// ============================================
// LAUNCH DATE COUNTDOWN (if needed)
// ============================================
// Set your launch date here (format: YYYY-MM-DD)
const launchDate = new Date('2024-12-31T23:59:59').getTime();

function updateCountdown() {
    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;
    
    const now = new Date().getTime();
    const distance = launchDate - now;

    if (distance < 0) {
        countdownEl.style.display = 'none';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
}

// Update countdown every second (if countdown exists)
if (document.getElementById('countdown')) {
    setInterval(updateCountdown, 1000);
    updateCountdown();
}

// ============================================
// EMAIL FORM SUBMISSION (Formspree)
// ============================================
const emailForm = document.getElementById('emailForm');
if (emailForm) {
    emailForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const messageEl = document.getElementById('formMessage');
        const submitButton = emailForm.querySelector('button[type="submit"]');
        
        // Validate email
        if (!email) {
            messageEl.textContent = 'Please enter your email address.';
            messageEl.style.color = '#fca5a5';
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            messageEl.textContent = 'Please enter a valid email address.';
            messageEl.style.color = '#fca5a5';
            return;
        }
        
        // Check if Formspree endpoint is configured
        if (FORMSFREE_EMAIL_ENDPOINT.includes('YOUR_FORM_ID_HERE')) {
            messageEl.textContent = 'Formspree endpoint not configured. Please update script.js with your Formspree endpoint URL.';
            messageEl.style.color = '#fca5a5';
            return;
        }
        
        // Show loading state
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
        messageEl.textContent = '';
        messageEl.style.color = '';
        
        try {
            // Submit to Formspree
            const response = await fetch(FORMSFREE_EMAIL_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    _subject: 'New Email Notification Signup - Lune Intelligent Systems',
                    _format: 'plain'
                })
            });
            
            if (response.ok) {
                messageEl.textContent = `Thanks! We'll notify you at ${email} when we launch.`;
                messageEl.style.color = '#a7f3d0';
                emailForm.reset();
            } else {
                const data = await response.json();
                throw new Error(data.error || 'Submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            messageEl.textContent = 'Sorry, there was an error submitting your email. Please try again later.';
            messageEl.style.color = '#fca5a5';
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            // Optionally unobserve after animating in
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with scroll-animate class
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.scroll-animate');
    animateElements.forEach(el => observer.observe(el));
    
    // ============================================
    // EXPLORE BUTTON SMOOTH SCROLL
    // ============================================
    const exploreButton = document.getElementById('exploreButton');
    if (exploreButton) {
        exploreButton.addEventListener('click', () => {
            const whoAreWeSection = document.getElementById('who-are-we');
            if (whoAreWeSection) {
                whoAreWeSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

