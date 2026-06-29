document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // Implementação simplificada de toggle para mobile pura
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            if (navMenu.style.display === 'flex') {
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.flexDirection = 'column';
                navMenu.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                navMenu.style.padding = '20px';
                navMenu.style.textAlign = 'center';
            }
        });
    }

    // 2. FAQ Accordion Animation Engine
    const faqHeaders = document.querySelectorAll('.faq-header');

    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const body = item.querySelector('.faq-body');
            const icon = header.querySelector('.faq-icon');
            const isActive = item.classList.contains('active');

            // Close all active items
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-body').style.maxHeight = null;
                i.querySelector('.faq-icon').textContent = '+';
            });

            if (!isActive) {
                item.classList.add('active');
                body.style.maxHeight = body.scrollHeight + "px";
                icon.textContent = '−';
            }
        });
    });

    // 3. Scroll Reveal Animation Engine (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Deixa a animação permanente na sessão
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Ativa quando 15% do bloco aparece
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 4. Premium Lightbox Studio Gallery
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Impede scroll ao ver foto
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});