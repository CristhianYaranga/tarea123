// Carousel functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
const track = document.getElementById('carouselTrack');

function updateSlide() {
    if (track && slides.length > 0) {
        track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlideIndex);
        });
    }
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    updateSlide();
}

function previousSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    updateSlide();
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    updateSlide();
}

// Auto-play carousel
let autoplayInterval;

function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

// Start autoplay when page loads
document.addEventListener('DOMContentLoaded', function() {
    startAutoplay();
    
    // Pause autoplay when hovering over carousel
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoplay);
        carouselContainer.addEventListener('mouseleave', startAutoplay);
    }
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

// Mobile menu functionality
const mobileMenuButton = document.querySelector('.md\\:hidden');
const navigationLinks = document.querySelector('.hidden.md\\:flex');

if (mobileMenuButton && navigationLinks) {
    mobileMenuButton.addEventListener('click', function() {
        navigationLinks.classList.toggle('hidden');
        navigationLinks.classList.toggle('flex');
        navigationLinks.classList.toggle('flex-col');
        navigationLinks.classList.toggle('absolute');
        navigationLinks.classList.toggle('top-full');
        navigationLinks.classList.toggle('left-0');
        navigationLinks.classList.toggle('right-0');
        navigationLinks.classList.toggle('bg-white');
        navigationLinks.classList.toggle('shadow-lg');
        navigationLinks.classList.toggle('p-4');
        navigationLinks.classList.toggle('space-y-4');
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-item, .glass-effect');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Phone number formatting
function formatPhoneNumber(phoneNumber) {
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
}

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// Add loading states for buttons
document.querySelectorAll('.morphing-button').forEach(button => {
    button.addEventListener('click', function() {
        // Add loading state if it's not a link
        if (!this.href) {
            const originalText = this.textContent;
            this.textContent = 'Cargando...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
        }
    });
});

// Keyboard navigation for carousel
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        previousSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Touch/swipe support for mobile carousel
let startX = 0;
let endX = 0;

const carouselContainer = document.querySelector('.carousel-container');

if (carouselContainer) {
    carouselContainer.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    
    carouselContainer.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
}

function handleSwipe() {
    const threshold = 50; // Minimum distance for a swipe
    const diff = startX - endX;
    
    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            nextSlide(); // Swipe left - next slide
        } else {
            previousSlide(); // Swipe right - previous slide
        }
    }
}