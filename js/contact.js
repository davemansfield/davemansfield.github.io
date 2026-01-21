// ============================================
// FORMSFREE CONFIGURATION
// ============================================
// Get your Formspree endpoint URL from:
// 1. Sign up at https://formspree.io
// 2. Create a new form for contact submissions
// 3. Copy the endpoint URL (looks like: https://formspree.io/f/YOUR_FORM_ID)
// 4. Replace the URL below with your endpoint
const FORMSFREE_CONTACT_ENDPOINT = 'https://formspree.io/f/xreebdzb';

// ============================================
// CONTACT FORM SUBMISSION (Formspree)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (!contactForm) return;

    // ============================================
    // REAL-TIME FORM VALIDATION
    // ============================================
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Add real-time validation for email
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const email = emailInput.value.trim();
            
            if (email && !emailRegex.test(email)) {
                emailInput.style.borderBottomColor = '#ef4444';
            } else if (email) {
                emailInput.style.borderBottomColor = '#10b981';
            } else {
                emailInput.style.borderBottomColor = 'rgba(16, 185, 129, 0.4)';
            }
        });

        emailInput.addEventListener('blur', function() {
            const email = emailInput.value.trim();
            if (email && !emailRegex.test(email)) {
                emailInput.style.borderBottomColor = '#ef4444';
            }
        });
    }

    // Add real-time validation for required fields
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            if (!nameInput.value.trim()) {
                nameInput.style.borderBottomColor = '#ef4444';
            } else {
                nameInput.style.borderBottomColor = '#10b981';
            }
        });

        nameInput.addEventListener('input', function() {
            if (nameInput.value.trim()) {
                nameInput.style.borderBottomColor = '#10b981';
            }
        });
    }

    if (messageInput) {
        messageInput.addEventListener('blur', function() {
            if (!messageInput.value.trim()) {
                messageInput.style.borderBottomColor = '#ef4444';
            } else {
                messageInput.style.borderBottomColor = '#10b981';
            }
        });

        messageInput.addEventListener('input', function() {
            if (messageInput.value.trim()) {
                messageInput.style.borderBottomColor = '#10b981';
            }
        });
    }

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const organization = formData.get('organization');
        const email = formData.get('email');
        const message = formData.get('message');
        const submitButton = contactForm.querySelector('button[type="submit"]');

        // Basic validation
        if (!name || !email || !message) {
            formMessage.textContent = 'Please fill in all required fields.';
            formMessage.style.color = '#fca5a5';
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formMessage.textContent = 'Please enter a valid email address.';
            formMessage.style.color = '#fca5a5';
            return;
        }
        
        // Check if Formspree endpoint is configured
        if (FORMSFREE_CONTACT_ENDPOINT.includes('YOUR_FORM_ID_HERE')) {
            formMessage.textContent = 'Formspree endpoint not configured. Please update contact.js with your Formspree endpoint URL.';
            formMessage.style.color = '#fca5a5';
            return;
        }

        // Show loading state with spinner
        const originalButtonText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner"></span> Sending...';
        submitButton.classList.add('loading');
        formMessage.textContent = '';
        formMessage.style.color = '';

        try {
            // Prepare data for Formspree
            const formPayload = {
                name: name,
                email: email,
                message: message,
                _subject: 'New Contact Form Submission - Lune Intelligent Systems',
                _format: 'plain'
            };
            
            // Add organization if provided
            if (organization) {
                formPayload.organization = organization;
            }

            // Submit to Formspree
            const response = await fetch(FORMSFREE_CONTACT_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formPayload)
            });

            if (response.ok) {
                // Hide the form with smooth transition
                contactForm.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                contactForm.style.opacity = '0';
                contactForm.style.transform = 'translateY(-20px)';
                
                // After animation, hide form and show thank you message
                setTimeout(() => {
                    contactForm.style.display = 'none';
                    
                    // Show persistent thank you message
                    formMessage.innerHTML = `
                        <div class="thank-you-message">
                            <div class="thank-you-icon">✓</div>
                            <h3>Thank You!</h3>
                            <p>Your message has been sent successfully.</p>
                            <p>We typically respond within 24 hours.</p>
                            <p class="email-note">Check your inbox (and spam folder) for our reply to <strong>${email}</strong></p>
                            <a href="index.html" class="back-home-button">← Back to Home</a>
                        </div>
                    `;
                    formMessage.style.color = '#a7f3d0';
                }, 500);
            } else {
                const data = await response.json();
                throw new Error(data.error || 'Submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            formMessage.textContent = 'Sorry, there was an error sending your message. Please try again later or email us directly.';
            formMessage.style.color = '#fca5a5';
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
            submitButton.classList.remove('loading');
        }
    });

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
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-animate class
    const animateElements = document.querySelectorAll('.scroll-animate');
    animateElements.forEach(el => observer.observe(el));
});
