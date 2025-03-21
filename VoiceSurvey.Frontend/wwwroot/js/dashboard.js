// Show/Hide Sections
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    toggleSidebar(); // Close sidebar if open
    toggleAccountDropdown(false); // Close dropdown
}

// Toggle Sidebar (Mobile)
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Toggle Account Dropdown
function toggleAccountDropdown(forceClose = false) {
    const dropdown = document.getElementById('account-dropdown');
    if (forceClose) {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }
}

// Modal Functions
function showModal(title, message, confirmText, confirmCallback) {
    const modal = document.getElementById('modal');
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-message').textContent = message;
    const confirmBtn = document.getElementById('modal-confirm');
    confirmBtn.textContent = confirmText;
    confirmBtn.onclick = () => {
        confirmCallback();
        closeModal();
    };
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Toaster Functions
function showToaster(message, isError = false) {
    const container = document.getElementById('toaster-container');
    const toaster = document.createElement('div');
    toaster.className = 'toaster' + (isError ? ' error' : '');
    toaster.textContent = message;
    container.appendChild(toaster);

    // Show toaster
    setTimeout(() => {
        toaster.classList.add('show');
    }, 10);

    // Hide toaster after 3 seconds
    setTimeout(() => {
        toaster.classList.remove('show');
        setTimeout(() => {
            container.removeChild(toaster);
        }, 300); // Wait for fade-out animation
    }, 3000);
}

// Create Survey
function createSurvey() {
    showToaster('Redirecting to survey creation page...');
    // Simulate redirect or action
    setTimeout(() => {}, 1000);
}

// View Survey Responses or Preview
function viewSurvey(surveyId) {
    showToaster(`Viewing ${surveyId} responses/preview...`);
    // Simulate view action
    setTimeout(() => {}, 1000);
}

// Edit Survey
function editSurvey(surveyId) {
    showToaster(`Editing ${surveyId}...`);
    // Simulate edit action
    setTimeout(() => {}, 1000);
}

// Delete Survey
function deleteSurvey(surveyId) {
    showModal(
        'Confirm Deletion',
        `Are you sure you want to delete ${surveyId}?`,
        'Delete',
        () => {
            showToaster(`${surveyId} deleted successfully!`);
            // Simulate delete action
        }
    );
}

// Edit Account
function editAccount() {
    document.getElementById('account-view').classList.add('hidden');
    document.getElementById('account-edit').classList.remove('hidden');
}

// Save Account
function saveAccount() {
    showToaster('Account details saved successfully!');
    document.getElementById('account-edit').classList.add('hidden');
    document.getElementById('account-view').classList.remove('hidden');
}

// Cancel Edit
function cancelEdit() {
    document.getElementById('account-edit').classList.add('hidden');
    document.getElementById('account-view').classList.remove('hidden');
}

// Verify Email
function verifyEmail() {
    showToaster('Email verification link sent!');
    // Simulate email verification
}

// Change Password
function changePassword() {
    showModal(
        'Change Password',
        'Please check your email to reset your password.',
        'OK',
        () => {
            showToaster('Password change email sent!');
        }
    );
}

// Delete Account
function deleteAccount() {
    showModal(
        'Confirm Account Deletion',
        'Are you sure you want to delete your account? This action cannot be undone.',
        'Delete',
        () => {
            showToaster('Account deleted successfully!', true);
            // Simulate account deletion
        }
    );
}

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
    const dropdown = document.getElementById('account-dropdown');
    const accountName = document.querySelector('.account-name');
    if (!accountName.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});