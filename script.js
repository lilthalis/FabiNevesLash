const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const mobilePanel = document.querySelector('[data-mobile-panel]');
const revealItems = document.querySelectorAll('.reveal');
const galleryCards = document.querySelectorAll('.gallery-card');
const lightbox = document.querySelector('[data-lightbox]');
const lightboxImage = document.querySelector('[data-lightbox-image]');
const closeLightbox = document.querySelector('[data-close-lightbox]');

function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 24);
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    mobilePanel.classList.toggle('open', !isOpen);
    header.classList.toggle('menu-open', !isOpen);
});

mobilePanel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        menuButton.setAttribute('aria-expanded', 'false');
        mobilePanel.classList.remove('open');
        header.classList.remove('menu-open');
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.14, rootMargin: '0px 0px -70px 0px' });

revealItems.forEach((item) => observer.observe(item));

function openLightbox(src) {
    lightboxImage.src = src;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function hideLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.removeAttribute('src');
    document.body.style.overflow = '';
}

galleryCards.forEach((card) => {
    card.addEventListener('click', () => openLightbox(card.dataset.full));
});

closeLightbox.addEventListener('click', hideLightbox);
lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) hideLightbox();
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('open')) hideLightbox();
});
