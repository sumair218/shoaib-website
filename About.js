document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Typing Animation for About Section
    const aboutTextArray = [
        "an AI Engineer", 
        "a Machine Learning Expert", 
        "a Deep Learning Specialist",
        "a Problem Solver"
    ];
    
    const typingDelay = 70;
    const erasingDelay = 30;
    const newTextDelay = 1000;
    
    let aboutTextIndex = 0;
    let aboutCharIndex = 0;
    let isDeleting = false;
    let aboutTimeout;
    
    const aboutTypedText = document.getElementById('about-typed-text');
    
    function typeAboutText() {
        if (!aboutTypedText) return;
        
        const currentText = aboutTextArray[aboutTextIndex];
        
        if (isDeleting) {
            aboutTypedText.textContent = currentText.substring(0, aboutCharIndex - 1);
            aboutCharIndex--;
        } else {
            aboutTypedText.textContent = currentText.substring(0, aboutCharIndex + 1);
            aboutCharIndex++;
        }
        
        if (!isDeleting && aboutCharIndex === currentText.length) {
            isDeleting = true;
            aboutTimeout = setTimeout(typeAboutText, newTextDelay);
        } else if (isDeleting && aboutCharIndex === 0) {
            isDeleting = false;
            aboutTextIndex = (aboutTextIndex + 1) % aboutTextArray.length;
            aboutTimeout = setTimeout(typeAboutText, typingDelay);
        } else {
            aboutTimeout = setTimeout(typeAboutText, isDeleting ? erasingDelay : typingDelay);
        }
    }
    
    // Start animation
    if (aboutTypedText) {
        aboutTimeout = setTimeout(typeAboutText, 500);
    }
    
    // Highlight active navigation item on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-links li');
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 300) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.querySelector('a').getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Clean up
    window.addEventListener('beforeunload', function() {
        clearTimeout(aboutTimeout);
    });
});