// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.toggle('dark-mode', savedTheme === 'dark');
    updateThemeButtonText();
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeButtonText();
});

function updateThemeButtonText() {
    const isDark = body.classList.contains('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (isDark) {
        icon.className = 'fas fa-sun';
        themeToggle.title = 'Switch to Light Mode';
    } else {
        icon.className = 'fas fa-moon';
        themeToggle.title = 'Switch to Dark Mode';
    }
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'block';
        backToTopBtn.style.opacity = '1';
    } else {
        backToTopBtn.style.opacity = '0';
        setTimeout(() => {
            if (window.pageYOffset <= 300) {
                backToTopBtn.style.display = 'none';
            }
        }, 300);
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

// Real-time validation
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

// Validation functions
function validateName(name) {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!name.trim()) {
        return 'Name is required';
    }
    if (!nameRegex.test(name)) {
        return 'Name can only contain letters and spaces';
    }
    if (name.trim().length < 2) {
        return 'Name must be at least 2 characters long';
    }
    return '';
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
        return 'Email is required';
    }
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return '';
}

function validateSubject(subject) {
    const subjectRegex = /^[A-Za-z0-9\s_]+$/;
    if (!subject.trim()) {
        return 'Subject is required';
    }
    if (!subjectRegex.test(subject)) {
        return 'Subject can only contain letters, numbers, spaces, and underscores';
    }
    if (subject.trim().length < 3) {
        return 'Subject must be at least 3 characters long';
    }
    return '';
}

function validateMessage(message) {
    if (!message.trim()) {
        return 'Message is required';
    }
    if (message.trim().length < 10) {
        return 'Message must be at least 10 characters long';
    }
    return '';
}

// Real-time validation event listeners
nameInput.addEventListener('input', () => {
    const error = validateName(nameInput.value);
    showFieldError('name', error);
});

emailInput.addEventListener('input', () => {
    const error = validateEmail(emailInput.value);
    showFieldError('email', error);
});

subjectInput.addEventListener('input', () => {
    const error = validateSubject(subjectInput.value);
    showFieldError('subject', error);
});

messageInput.addEventListener('input', () => {
    const error = validateMessage(messageInput.value);
    showFieldError('message', error);
});

function showFieldError(fieldName, error) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    if (error) {
        field.classList.add('error');
        errorElement.textContent = error;
    } else {
        field.classList.remove('error');
        errorElement.textContent = '';
    }
}

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all fields
    const nameError = validateName(nameInput.value);
    const emailError = validateEmail(emailInput.value);
    const subjectError = validateSubject(subjectInput.value);
    const messageError = validateMessage(messageInput.value);
    
    // Show errors for all fields
    showFieldError('name', nameError);
    showFieldError('email', emailError);
    showFieldError('subject', subjectError);
    showFieldError('message', messageError);
    
    // Check if there are any errors
    if (nameError || emailError || subjectError || messageError) {
        showNotification('Please fix the errors in the form', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
    this.reset();
    
    // Clear all error states
    ['name', 'email', 'subject', 'message'].forEach(field => {
        document.getElementById(field).classList.remove('error');
        document.getElementById(`${field}-error`).textContent = '';
    });
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Typing Animation for Home Section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const homeTitle = document.querySelector('#home h1');
    if (homeTitle) {
        const originalText = homeTitle.textContent;
        typeWriter(homeTitle, originalText, 80);
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            // Trigger counter animation when about section comes into view
            if (entry.target.id === 'about') {
                setTimeout(animateCounters, 300);
            }
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('section, .service-card, .project-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// Skills counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = Math.floor(progress * target);
            counter.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }
        
        if (!counter.hasAttribute('data-animated')) {
            counter.setAttribute('data-animated', 'true');
            requestAnimationFrame(updateCounter);
        }
    });
}

// Initialize theme button text on page load
document.addEventListener('DOMContentLoaded', () => {
    updateThemeButtonText();
}); 