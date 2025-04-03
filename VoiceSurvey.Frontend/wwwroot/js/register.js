// Toggle between Login and Sign Up forms
function toggleForm(form) {
    const loginBox = document.getElementById('login-box');
    const signupBox = document.getElementById('signup-box');
    const forgotPasswordBox = document.getElementById('forgot-password-box');

    if (form === 'login') {
        loginBox.classList.remove('hidden');
        signupBox.classList.add('hidden');
        forgotPasswordBox.classList.add('hidden');
    } else if (form === 'signup') {
        loginBox.classList.add('hidden');
        signupBox.classList.remove('hidden');
        forgotPasswordBox.classList.add('hidden');
        document.getElementById('signup-step-1').classList.add('active');
        document.getElementById('signup-step-2').classList.remove('active');
    }
}

// Toggle Forgot Password form
function toggleForgotPassword() {
    const loginBox = document.getElementById('login-box');
    const forgotPasswordBox = document.getElementById('forgot-password-box');

    loginBox.classList.toggle('hidden');
    forgotPasswordBox.classList.toggle('hidden');
}

// Navigate to next step in Sign Up
function nextStep() {
    const step1 = document.getElementById('signup-step-1');
    const step2 = document.getElementById('signup-step-2');

    const firstname = document.getElementById('signup-firstname').value.trim();
    const lastname = document.getElementById('signup-lastname').value.trim();
    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const phone = document.getElementById('signup-phone').value.trim();

    if (firstname === '' || lastname === '' || username === '' || email === '' || phone === '') {
        alert('Please fill out all fields in Step 1.');
        return;
    }

    step1.classList.remove('active');
    step2.classList.add('active');
    console.log('Moved to Step 2');
}

// Navigate to previous step in Sign Up
function prevStep() {
    const step1 = document.getElementById('signup-step-1');
    const step2 = document.getElementById('signup-step-2');

    step2.classList.remove('active');
    step1.classList.add('active');
    console.log('Moved to Step 1');
}

// Handle Login submission
async function login(email, password) {
    const loginPayload = {
        email: email,
        password: password
    };

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginPayload)
    });

    const data = await response.json();

    if (response.ok) {
        // Save the token in localStorage
        localStorage.setItem('jwtToken', data.token);
        alert('Login successful!');
    } else {
        alert('Login failed: ' + data.message);
    }
}

//Handle Logout
function logout() {
    localStorage.removeItem('jwtToken');
    alert('You have logged out');
}


// Handle Forgot Password submission (Placeholder)
async function resetPassword(event) {
    
}

// Handle Sign Up submission
async function signup(event) { 
}

// Attach login function to form submission (since asp-* tags are overridden)
document.getElementById('login-form').addEventListener('submit', login);