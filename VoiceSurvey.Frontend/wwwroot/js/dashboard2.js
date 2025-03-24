// Show/Hide Sections
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    toggleAccountDropdown(false); // Close dropdown
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

// Show Tab
function showTab(tabId) {
    // Deactivate all tabs and contents
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Activate selected tab and content
    document.querySelector(`button[onclick="showTab('${tabId}')"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
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

// View Survey
function viewSurvey(surveyId) {
    showToaster(`Viewing ${surveyId} details...`);
    // Simulate view action
    setTimeout(() => {}, 1000);
}

// Approve Survey
function approveSurvey(surveyId) {
    showModal(
        'Confirm Approval',
        `Are you sure you want to approve ${surveyId}?`,
        'Approve',
        () => {
            showToaster(`${surveyId} approved successfully!`);
            // Simulate approval action
        }
    );
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

// View Users (from Overview)
function viewUsers(userType) {
    showToaster(`Viewing ${userType} list...`);
    showSection('users'); // Navigate to User Management page
    document.getElementById('user-type-filter').value = userType; // Set filter
    filterUsers(); // Apply filter
}

// Manage Users (from Overview)
function manageUsers(userType) {
    showToaster(`Managing ${userType}...`);
    showSection('users'); // Navigate to User Management page
    document.getElementById('user-type-filter').value = userType; // Set filter
    filterUsers(); // Apply filter
}

// View User (from User Management)
function viewUser(userId) {
    showToaster(`Viewing ${userId} details...`);
    // Simulate view action
    setTimeout(() => {}, 1000);
}

// Edit User
function editUser(userId) {
    showToaster(`Editing ${userId}...`);
    // Simulate edit action
    setTimeout(() => {}, 1000);
}

// Delete User
function deleteUser(userId) {
    showModal(
        'Confirm Deletion',
        `Are you sure you want to delete user ${userId}?`,
        'Delete',
        () => {
            showToaster(`User ${userId} deleted successfully!`);
            // Simulate delete action
        }
    );
}

// Filter Users
function filterUsers() {
    const filterValue = document.getElementById('user-type-filter').value;
    const rows = document.querySelectorAll('#user-table-body tr');
    rows.forEach(row => {
        const type = row.getAttribute('data-type');
        if (filterValue === 'all' || type === filterValue) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
    // Re-apply search after filtering
    searchTable('users-search', 'user-table');
}

// Search Table
function searchTable(inputId, tableId) {
    const searchValue = document.getElementById(inputId).value.toLowerCase();
    const table = document.getElementById(tableId);
    const rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row.parentNode.tagName === 'TBODY') { // Only filter tbody rows
            const cells = row.getElementsByTagName('td');
            let rowText = '';
            for (let j = 0; j < cells.length; j++) {
                rowText += cells[j].textContent.toLowerCase() + ' ';
            }
            if (rowText.includes(searchValue)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    }
}

// View Full Activity Log
function viewFullLog() {
    showToaster('Viewing full activity log...');
    showSection('logs'); // Navigate to Activity Log page
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
        'Are you sure you want to delete your admin account? This action cannot be undone.',
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