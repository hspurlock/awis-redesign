/**
 * AWIS Weather Services - Modern Redesign
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('show');
            document.body.classList.toggle('menu-open');
            
            // Toggle aria-expanded attribute
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !navList.contains(event.target) && navList.classList.contains('show')) {
                navList.classList.remove('show');
                document.body.classList.remove('menu-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Industry Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    if (tabButtons.length && tabPanels.length) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and panels
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));
                
                // Add active class to current button
                this.classList.add('active');
                
                // Show corresponding panel
                const targetPanel = document.getElementById(this.dataset.target);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonials.length && dots.length && prevBtn && nextBtn) {
        let currentIndex = 0;
        
        // Show only the current testimonial
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        // Initialize
        showTestimonial(currentIndex);
        
        // Previous button
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        });
        
        // Next button
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        });
        
        // Dot navigation
        dots.forEach((dot, i) => {
            dot.addEventListener('click', function() {
                currentIndex = i;
                showTestimonial(currentIndex);
            });
        });
        
        // Auto slide
        let slideInterval = setInterval(function() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
        
        // Pause auto slide on interaction
        const sliderControls = document.querySelector('.testimonial-controls');
        if (sliderControls) {
            sliderControls.addEventListener('mouseenter', function() {
                clearInterval(slideInterval);
            });
            
            sliderControls.addEventListener('mouseleave', function() {
                slideInterval = setInterval(function() {
                    currentIndex = (currentIndex + 1) % testimonials.length;
                    showTestimonial(currentIndex);
                }, 5000);
            });
        }
    }
    
    // Smooth scroll for navigation links
    const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navList && navList.classList.contains('show')) {
                    navList.classList.remove('show');
                    document.body.classList.remove('menu-open');
                    if (menuToggle) {
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('animate');
            }
        });
    }
    
    // Check on initial load
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Add animated class to applicable elements
    document.querySelectorAll('.service-card, .tab-panel, .testimonial').forEach(element => {
        element.classList.add('animate-on-scroll');
    });
    
    // Current year for footer copyright
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Weather API integration (placeholder)
    // In a real implementation, you would fetch actual weather data from an API
    function updateWeatherWidget() {
        const weatherCard = document.querySelector('.weather-card');
        
        if (weatherCard) {
            const weatherIcon = weatherCard.querySelector('.weather-icon i');
            const tempElement = weatherCard.querySelector('.temp');
            const locationElement = weatherCard.querySelector('.location');
            
            // Sample data - in a real application, this would come from an API
            const weatherData = {
                temperature: '72°F',
                location: 'Auburn, AL',
                condition: 'cloudy' // could be: sunny, cloudy, rainy, etc.
            };
            
            // Update display
            if (tempElement) tempElement.textContent = weatherData.temperature;
            if (locationElement) locationElement.textContent = weatherData.location;
            
            // Update icon based on condition
            if (weatherIcon) {
                // Map condition to appropriate Font Awesome icon
                const iconMap = {
                    'sunny': 'fa-sun',
                    'cloudy': 'fa-cloud-sun',
                    'rainy': 'fa-cloud-rain',
                    'snowy': 'fa-snowflake',
                    'stormy': 'fa-bolt'
                };
                
                // Remove all possible weather classes
                Object.values(iconMap).forEach(icon => {
                    weatherIcon.classList.remove(icon);
                });
                
                // Add the appropriate class
                const iconClass = iconMap[weatherData.condition] || 'fa-cloud';
                weatherIcon.classList.add(iconClass);
            }
        }
    }
    
    // Initialize weather widget
    updateWeatherWidget();
});
