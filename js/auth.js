/**
 * AWIS Weather Services - Authentication Scripts
 */

document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Update active tab
            authTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show corresponding form
            authForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${targetTab}-form`) {
                    form.classList.add('active');
                }
            });
        });
    });
    
    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // In a real app, you would send these credentials to your backend
            // For demo purposes, we'll just redirect to the dashboard
            console.log(`Login attempt with email: ${email}`);
            
            // Simple validation
            if (email && password) {
                // Simulate authentication 
                localStorage.setItem('awis_logged_in', 'true');
                localStorage.setItem('awis_user_email', email);
                localStorage.setItem('awis_user_name', 'John Doe'); // This would normally come from the server
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                alert('Please enter both email and password');
            }
        });
    }
    
    // Registration form submission
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('register-firstname').value;
            const lastName = document.getElementById('register-lastname').value;
            const email = document.getElementById('register-email').value;
            const company = document.getElementById('company-name').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            
            // Simple validation
            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                alert('Please fill out all required fields');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // In a real app, you would send registration data to your backend
            console.log('Registration data:', { firstName, lastName, email, company });
            
            // Simulate registration success
            localStorage.setItem('awis_logged_in', 'true');
            localStorage.setItem('awis_user_email', email);
            localStorage.setItem('awis_user_name', `${firstName} ${lastName}`);
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        });
    }
    
    // Logout functionality
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Clear local storage
            localStorage.removeItem('awis_logged_in');
            localStorage.removeItem('awis_user_email');
            localStorage.removeItem('awis_user_name');
            
            // Redirect to login page
            window.location.href = 'login.html';
        });
    }
    
    // Check authentication status on pages requiring login
    function checkAuth() {
        const isLoggedIn = localStorage.getItem('awis_logged_in') === 'true';
        const currentPage = window.location.pathname;
        
        if (currentPage.includes('dashboard') && !isLoggedIn) {
            // Redirect to login if not authenticated
            window.location.href = 'login.html';
        } else if (currentPage.includes('login') && isLoggedIn) {
            // Redirect to dashboard if already logged in
            window.location.href = 'dashboard.html';
        }
    }
    
    // Run auth check on page load
    checkAuth();
});
