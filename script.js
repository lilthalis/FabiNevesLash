// 1. Correção da primeira linha (document minúsculo)
document.documentElement.classList.add('js');

document.addEventListener("DOMContentLoaded", () => {

  // --- 2. LINKS DO WHATSAPP ---
  const WHATSAPP_TEXT = encodeURIComponent('Olá, Fabi!\n\nConheci seu trabalho através do site e gostaria de agendar um horário.\n\nPoderia me informar a disponibilidade?');
  const WHATSAPP_URL = `https://wa.me/5511942722631?text=${WHATSAPP_TEXT}`;
  
  document.querySelectorAll('[data-whatsapp]').forEach((link) => {
    link.href = WHATSAPP_URL;
    link.target = '_blank';
    link.rel = 'noopener';
  });

  // --- 3. EFEITO DE ROLAGEM NO HEADER ---
  const header = document.querySelector('[data-header]');
  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader(); // Executa assim que a página carrega

  // --- 4. MENU MOBILE ---
  const menuButton = document.querySelector('[data-menu-button]');
  const mobilePanel = document.querySelector('[data-mobile-panel]');
  
  function closeMenu() {
    if (!menuButton || !mobilePanel) return;
    menuButton.setAttribute('aria-expanded', 'false');
    mobilePanel.classList.remove('open', 'active');
    header?.classList.remove('menu-open');
  }

  if (menuButton && mobilePanel) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      mobilePanel.classList.toggle('open', !isOpen);
      mobilePanel.classList.toggle('active', !isOpen); // Adicionado para garantir compatibilidade com seu CSS
      header?.classList.toggle('menu-open', !isOpen);
    });
    // Fecha o menu ao clicar num link
    mobilePanel.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  }

  // --- 5. ANIMAÇÕES DE REVELAÇÃO (ISSO FAZ A TELA BRANCA SUMIR) ---
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible'); // Adiciona a classe que mostra os elementos
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    // Caso o navegador seja antigo, mostra tudo de uma vez
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  // --- 6. FILTRO DA GALERIA ---
  const filterButtons = document.querySelectorAll('[data-filter]');
  const galleryItemsNode = document.querySelectorAll('.gallery-item');
  
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // Remove a classe ativa de todos os botões e coloca no clicado
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.dataset.filter;
        
        // Mostra ou esconde as imagens baseado no filtro
        galleryItemsNode.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = ''; // Mostra
            } else {
                item.style.display = 'none'; // Esconde
            }
        });
    });
  });

  // --- 7. LIGHTBOX (AMPLIAR IMAGENS DA GALERIA) ---
  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxImage = document.querySelector('[data-lightbox-image]');
  const closeLightboxButton = document.querySelector('[data-close-lightbox]');
  
  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImage || !src) return;
    lightboxImage.src = src;
    lightboxImage.alt = alt || 'Imagem ampliada da galeria';
    lightbox.classList.add('open'); // Abre
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Trava a rolagem da página
  }

  function hideLightbox() {
    if (!lightbox || !lightboxImage) return;
    lightbox.classList.remove('open'); // Fecha
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.removeAttribute('src');
    document.body.style.overflow = ''; // Destrava a rolagem
  }

  if (closeLightboxButton) closeLightboxButton.addEventListener('click', hideLightbox);
  if (lightbox) lightbox.addEventListener('click', (event) => { 
      if (event.target === lightbox) hideLightbox(); // Fecha se clicar fora da foto
  });

  // Adiciona o evento de clique nas fotos da galeria
  galleryItemsNode.forEach(item => {
      item.addEventListener('click', () => {
          const fullSrc = item.dataset.full;
          const img = item.querySelector('img');
          if (img) openLightbox(fullSrc || img.src, img.alt);
      });
  });

  // --- 8. TECLA 'ESC' PARA FECHAR TUDO ---
  document.addEventListener('keydown', (event) => { 
      if (event.key === 'Escape') { 
          hideLightbox(); 
          closeMenu();
      } 
  });

});
