(() => {
  document.documentElement.classList.add('js');

  const CONFIG = {
    whatsappUrl: `https://wa.me/5511942722631?text=${encodeURIComponent('Olá, Fabi!\n\nConheci seu trabalho através do site e gostaria de agendar um horário.\n\nPoderia me informar a disponibilidade?')}`,
    headerScrollOffset: 12,
    revealOptions: { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
  };

  const selectors = {
    whatsapp: '[data-whatsapp]',
    header: '[data-header]',
    menuButton: '[data-menu-button]',
    mobilePanel: '[data-mobile-panel]',
    filterButton: '[data-filter]',
    galleryItem: '.gallery-item',
    lightbox: '[data-lightbox]',
    lightboxImage: '[data-lightbox-image]',
    closeLightbox: '[data-close-lightbox]',
    reveal: '.reveal',
  };

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  function initWhatsAppLinks() {
    $$(selectors.whatsapp).forEach((link) => {
      link.href = CONFIG.whatsappUrl;
      link.target = '_blank';
      link.rel = 'noopener';
    });
  }

  function initHeader() {
    const header = $(selectors.header);
    const menuButton = $(selectors.menuButton);
    const mobilePanel = $(selectors.mobilePanel);

    const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > CONFIG.headerScrollOffset);
    const closeMenu = () => {
      if (!menuButton || !mobilePanel) return;
      menuButton.setAttribute('aria-expanded', 'false');
      mobilePanel.classList.remove('open');
      header?.classList.remove('menu-open');
    };

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    if (menuButton && mobilePanel) {
      menuButton.addEventListener('click', () => {
        const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', String(!isOpen));
        mobilePanel.classList.toggle('open', !isOpen);
        header?.classList.toggle('menu-open', !isOpen);
      });

      $$('a', mobilePanel).forEach((link) => link.addEventListener('click', closeMenu));
    }

    return { closeMenu };
  }

  function initGallery() {
    const filterButtons = $$(selectors.filterButton);
    const galleryItems = $$(selectors.galleryItem);
    const lightbox = $(selectors.lightbox);
    const lightboxImage = $(selectors.lightboxImage);
    const closeLightboxButton = $(selectors.closeLightbox);

    const setFilter = (filter) => {
      galleryItems.forEach((item) => {
        item.hidden = !(filter === 'all' || item.dataset.category === filter);
      });
    };

    const openLightbox = (src, alt) => {
      if (!lightbox || !lightboxImage || !src) return;
      lightboxImage.src = src;
      lightboxImage.alt = alt || 'Imagem ampliada da galeria';
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      if (!lightbox || !lightboxImage) return;
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImage.removeAttribute('src');
      document.body.style.overflow = '';
    };

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        filterButtons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        setFilter(button.dataset.filter || 'all');
      });
    });

    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        const image = $('img', item);
        openLightbox(item.dataset.full || image?.src, image?.alt);
      });
    });

    closeLightboxButton?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });

    return { closeLightbox };
  }

  function initReveal() {
    const revealItems = $$(selectors.reveal);

    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, CONFIG.revealOptions);

    revealItems.forEach((item) => observer.observe(item));
  }

  function initApp() {
    initWhatsAppLinks();
    const { closeMenu } = initHeader();
    const { closeLightbox } = initGallery();
    initReveal();

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      closeLightbox();
      closeMenu();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp, { once: true });
  } else {
    initApp();
  }
})();
