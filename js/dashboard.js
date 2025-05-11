/**
 * AWIS Weather Services - Dashboard Scripts
 */

document.addEventListener('DOMContentLoaded', function() {
    // Set up user information
    setupUserInfo();
    
    // Tab navigation in dashboard
    setupDashboardNav();
    
    // User dropdown menu
    setupUserMenu();
    
    // Product search functionality
    setupProductSearch();
    
    // Filter dropdown
    setupFilterDropdown();
    
    // Download buttons
    setupDownloadButtons();
});

/**
 * Set up user information from localStorage
 */
function setupUserInfo() {
    const userEmail = localStorage.getItem('awis_user_email');
    const userName = localStorage.getItem('awis_user_name');
    
    if (userName) {
        // Set user name in the header
        const userNameElement = document.querySelector('.user-name');
        if (userNameElement) {
            userNameElement.textContent = userName.split(' ')[0];
        }
        
        // Set user first name in welcome message
        const userFirstNameElement = document.querySelector('.user-firstname');
        if (userFirstNameElement) {
            userFirstNameElement.textContent = userName.split(' ')[0];
        }
        
        // Set full name in profile card
        const userFullNameElement = document.querySelector('.user-fullname');
        if (userFullNameElement) {
            userFullNameElement.textContent = userName;
        }
    }
    
    if (userEmail) {
        // Set user email in profile card
        const userEmailElement = document.querySelector('.user-email');
        if (userEmailElement) {
            userEmailElement.textContent = userEmail;
        }
    }
}

/**
 * Set up dashboard navigation
 */
function setupDashboardNav() {
    const navLinks = document.querySelectorAll('.dashboard-nav a');
    const sectionContents = document.querySelectorAll('.dashboard-section-content');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            
            // Update active navigation item
            navLinks.forEach(l => {
                l.parentElement.classList.remove('active');
            });
            link.parentElement.classList.add('active');
            
            // Show corresponding section
            sectionContents.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId.substring(1)) {
                    section.classList.add('active');
                }
            });
        });
    });
}

/**
 * Set up user dropdown menu in header
 */
function setupUserMenu() {
    const userToggle = document.querySelector('.user-toggle');
    const userDropdown = document.querySelector('.user-dropdown');
    
    if (userToggle && userDropdown) {
        userToggle.addEventListener('click', (e) => {
            e.preventDefault();
            userDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!userToggle.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('active');
            }
        });
    }
}

/**
 * Set up product search functionality
 */
function setupProductSearch() {
    const searchInput = document.getElementById('product-search');
    const productCards = document.querySelectorAll('.product-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            
            productCards.forEach(card => {
                const productTitle = card.querySelector('h3').textContent.toLowerCase();
                const productDesc = card.querySelector('.product-description').textContent.toLowerCase();
                const productType = card.querySelector('.product-type').textContent.toLowerCase();
                
                if (productTitle.includes(searchTerm) || 
                    productDesc.includes(searchTerm) || 
                    productType.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

/**
 * Set up filter dropdown
 */
function setupFilterDropdown() {
    const filterToggle = document.querySelector('.filter-toggle');
    const filterOptions = document.querySelector('.filter-options');
    
    if (filterToggle && filterOptions) {
        filterToggle.addEventListener('click', () => {
            filterOptions.classList.toggle('active');
        });
        
        // Close filter options when clicking outside
        document.addEventListener('click', (e) => {
            if (!filterToggle.contains(e.target) && !filterOptions.contains(e.target)) {
                filterOptions.classList.remove('active');
            }
        });
    }
}

/**
 * Set up download buttons for products
 */
function setupDownloadButtons() {
    const downloadButtons = document.querySelectorAll('.product-actions .btn-primary');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productTitle = this.closest('.product-card').querySelector('h3').textContent;
            
            // In a real app, this would trigger an actual download
            console.log(`Downloading ${productTitle}`);
            
            // Show a success message
            alert(`Download started for: ${productTitle}`);
        });
    });
}
