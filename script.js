// Set your launch date here (format: YYYY-MM-DD)
const launchDate = new Date('2024-12-31T23:59:59').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = launchDate - now;

    if (distance < 0) {
        document.getElementById('countdown').style.display = 'none';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Handle email form submission
document.getElementById('emailForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const messageEl = document.getElementById('formMessage');
    
    // Here you would typically send the email to your backend
    // For now, we'll just show a success message
    messageEl.textContent = `Thanks! We'll notify you at ${email} when we launch.`;
    messageEl.style.color = '#a7f3d0';
    
    // Clear the input
    document.getElementById('email').value = '';
    
    // You can integrate with your email service here (e.g., Mailchimp, SendGrid, etc.)
    console.log('Email submitted:', email);
});

