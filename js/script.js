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
    
    // ============================================
    // HORIZONTAL SCROLL ARROWS AND GRADIENTS
    // ============================================
    function setupScrollSection(sectionSelector, containerSelector) {
        const section = document.querySelector(sectionSelector);
        const container = document.querySelector(containerSelector);
        if (!section || !container) return;
        
        const scrollArrowLeft = section.querySelector('.scroll-arrow-left');
        const scrollArrowRight = section.querySelector('.scroll-arrow-right');
        if (!scrollArrowLeft || !scrollArrowRight) return;
        
        function updateScrollState() {
            const hasOverflow = container.scrollWidth > container.clientWidth;
            const isAtStart = container.scrollLeft <= 10;
            const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
            
            // Left arrow and gradient
            if (hasOverflow && !isAtStart) {
                scrollArrowLeft.classList.remove('hidden');
                section.classList.add('show-left-gradient');
            } else {
                scrollArrowLeft.classList.add('hidden');
                section.classList.remove('show-left-gradient');
            }
            
            // Right arrow and gradient
            if (hasOverflow && !isAtEnd) {
                scrollArrowRight.classList.remove('hidden');
                section.classList.add('show-right-gradient');
            } else {
                scrollArrowRight.classList.add('hidden');
                section.classList.remove('show-right-gradient');
            }
        }
        
        // Click arrows to scroll
        const scrollAmount = () => container.clientWidth * 0.8;
        
        scrollArrowRight.addEventListener('click', () => {
            container.scrollBy({
                left: scrollAmount(),
                behavior: 'smooth'
            });
        });
        
        scrollArrowLeft.addEventListener('click', () => {
            container.scrollBy({
                left: -scrollAmount(),
                behavior: 'smooth'
            });
        });
        
        // Update on scroll and resize
        container.addEventListener('scroll', updateScrollState);
        window.addEventListener('resize', updateScrollState);
        
        // Reset scroll position to start
        container.scrollLeft = 0;
        
        // Initial check
        updateScrollState();
    }
    
    // Setup both sections
    setupScrollSection('.applications-section', '.applications-buttons');
    setupScrollSection('.problem-section', '.problem-content');
});

