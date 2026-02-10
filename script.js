// Tab functionality
let tabLinks = document.getElementsByClassName("about-tab-links");
let tabContents = document.getElementsByClassName("about-tab-contents");

function openTab(tabName) {
    for (let tabLink of tabLinks) {
        tabLink.classList.remove("active-link");
    }
    for (let tabContent of tabContents) {
        tabContent.classList.remove("active-tab");
    }

    event.currentTarget.classList.add("active-link");
    document.getElementById(tabName).classList.add("active-tab");
}

// Smooth scroll animation on page load and scroll
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');

                // Animate children elements
                const children = entry.target.querySelectorAll('.home-left, .home-right, .left-col, .right-col, .services-list div, .work, .contact-left, .contact-right');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll('.services-list div');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add parallax effect to home image
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const homeImg = document.querySelector('.home-right img');
        if (homeImg && scrolled < window.innerHeight) {
            homeImg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
});

// Mobile menu toggle
const menuIcon = document.querySelector('.menu');
const navList = document.querySelector('nav ul');
const closeIcon = document.querySelector('.cross');

if (menuIcon && navList) {
    menuIcon.addEventListener('click', function() {
        navList.classList.toggle('active');
        if (closeIcon) {
            closeIcon.style.display = navList.classList.contains('active') ? 'block' : 'none';
        }
    });
}

if (closeIcon && navList) {
    closeIcon.addEventListener('click', function() {
        navList.classList.remove('active');
        closeIcon.style.display = 'none';
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function() {
        if (navList) {
            navList.classList.remove('active');
            if (closeIcon) {
                closeIcon.style.display = 'none';
            }
        }
    });

});

