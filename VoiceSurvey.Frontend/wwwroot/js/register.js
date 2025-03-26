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
        // Reset to Step 1 when showing signup
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

    // Check if all required fields in Step 1 are filled
    const firstname = document.getElementById('signup-firstname').value.trim();
    const lastname = document.getElementById('signup-lastname').value.trim();
    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value.trim();

    if (firstname === '' || lastname === '' || username === '' || email === '') {
        alert('Please fill out all fields in Step 1.');
        return; // Stop execution if validation fails
    }

    // If validation passes, switch steps
    step1.classList.remove('active');
    step2.classList.add('active');
    console.log('Moved to Step 2'); // Debug log
}

// Navigate to previous step in Sign Up
function prevStep() {
    const step1 = document.getElementById('signup-step-1');
    const step2 = document.getElementById('signup-step-2');

    step2.classList.remove('active');
    step1.classList.add('active');
    console.log('Moved to Step 1'); // Debug log
}

// Handle Login submission


// Handle Forgot Password submission
function resetPassword(event) {
    event.preventDefault();
    const email = document.getElementById('forgot-email').value;

    console.log('Reset Password Email:', email);
    alert('Password reset link sent!'); // Replace with actual reset logic
}

// Handle Sign Up submission
function signup(event) {
    event.preventDefault();

    const firstname = document.getElementById('signup-firstname').value;
    const lastname = document.getElementById('signup-lastname').value;
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const phone = document.getElementById('signup-phone').value;
    const gender = document.getElementById('signup-gender').value;
    const region = document.getElementById('signup-region').value;
    const city = document.getElementById('signup-city').value;
    const age = document.getElementById('signup-age').value;
    const password = document.getElementById('signup-password').value;

    const signupData = {
        firstname,
        lastname,
        username,
        email,
        phone,
        gender,
        region,
        city,
        age,
        password
    };

    console.log('Signup Data:', signupData);
    alert('Sign Up submitted!'); // Replace with actual signup logic
}