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

        // Show loading state
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
        formMessage.textContent = '';
        formMessage.style.color = '';

        try {
            // Prepare data for Formspree
            const formPayload = {
                name: name,
                email: email,
                message: message,
                _subject: 'New Contact Form Submission - EnviroSwarm',
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
                formMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
                formMessage.style.color = '#a7f3d0';
                contactForm.reset();
                
                // Clear message after 5 seconds
                setTimeout(() => {
                    formMessage.textContent = '';
                }, 5000);
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
            submitButton.textContent = originalButtonText;
        }
    });
});
