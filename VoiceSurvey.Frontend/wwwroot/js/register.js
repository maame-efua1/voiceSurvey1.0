// Toggle between login and signup forms
function toggleForm() {
    const loginBox = document.getElementById('login-box');
    const signupBox = document.getElementById('signup-box');

    if (loginBox.classList.contains('hidden')) {
        loginBox.classList.remove('hidden');
        signupBox.classList.add('hidden');
    } else {
        loginBox.classList.add('hidden');
        signupBox.classList.remove('hidden');
    }
}

// Form submission handling (for demonstration)
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    console.log('Login:', { email, password });
    alert('Login submitted! (Demo)');
});

document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const phone = document.getElementById('signup-phone').value;
    const gender = document.getElementById('signup-gender').value;
    console.log('Sign Up:', { username, email, password, phone, gender });
    alert('Sign Up submitted! (Demo)');
});

// Ensure script runs after DOM is loaded (optional safeguard)
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, script ready');
});