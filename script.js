const whatsappText = encodeURIComponent('Olá, Fabi!\n\nConheci seu trabalho através do site e gostaria de agendar um horário.\n\nPoderia me informar a disponibilidade?');
const whatsappUrl = `https://wa.me/5511942722631?text=${whatsappText}`;

document.querySelectorAll('[data-whatsapp]').forEach((link) => {
  link.href = whatsappUrl;
  link.target = '_blank';
  link.rel = 'noopener';
});

const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const mobilePanel = document.querySelector('[data-mobile-panel]');
const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  mobilePanel.classList.toggle('open', !isOpen);
  header.classList.toggle('menu-open', !isOpen);
});
mobilePanel.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  mobilePanel.classList.remove('open');
  header.classList.remove('menu-open');
}));

const imagePool = [
  'Services/fio-a-fio.webp',
  'Services/volume-brasileiro.webp',
  'Services/Europeu.webp',
  'Services/lash-lifting.webp',
  'Services/brow-lamination.webp',
  'Services/design-sobrancelhas.webp',
  'Services/micropigmentacao.webp'
];
const services = [
  [
    'Fio a fio clássico',
    'Natural',
    'Definição delicada fio a fio para realçar sem pesar.',
    'Leveza, elegância diária, acabamento limpo',
    '1h50'
  ],

  [
    'Volume Brasileiro',
    'Volume',
    'Textura marcante com densidade sofisticada e confortável.',
    'Mais presença, efeito preenchido, fios ultraleves',
    '2h15'
  ],

  [
    'Volume Europeu',
    'Volume',
    'Volume refinado com simetria e curvatura editorial.',
    'Olhar intenso, personalização, durabilidade',
    '2h30'
  ],

  [
    'Lash Lifting',
    'Lifting',
    'Curvatura dos fios naturais com aparência polida.',
    'Sem extensão, efeito natural, manutenção simples',
    '1h10'
  ],

  [
    'Brow Lamination',
    'Sobrancelhas',
    'Alinhamento premium para sobrancelhas com efeito penteado.',
    'Fios disciplinados, volume visual, desenho moderno',
    '1h'
  ],

  [
    'Design de sobrancelhas',
    'Sobrancelhas',
    'Design personalizado para harmonizar expressão e rosto.',
    'Simetria, limpeza delicada, naturalidade',
    '45min'
  ],

  [
    'Micropigmentação',
    'Sobrancelhas',
    'Preenchimento sofisticado com leitura individual de pele e formato.',
    'Correção de falhas, praticidade, efeito elegante',
    '2h'
  ]
];
const serviceGrid = document.querySelector('[data-services]');
services.forEach((service, index) => {
  const card = document.createElement('button');
  card.className = 'service-card reveal';
  card.innerHTML = `<img src="${imagePool[index % imagePool.length]}" alt="${service[0]}"><div><span>${service[1]}</span><h3>${service[0]}</h3><p>${service[2]}</p></div>`;
  card.addEventListener('click', () => openModal(service, imagePool[index % imagePool.length]));
  serviceGrid.append(card);
});

const modal = document.querySelector('[data-modal]');
function openModal(service, img) {
  modal.querySelector('[data-modal-img]').src = img;
  modal.querySelector('[data-modal-img]').alt = service[0];
  modal.querySelector('[data-modal-kicker]').textContent = service[1];
  modal.querySelector('[data-modal-title]').textContent = service[0];
  modal.querySelector('[data-modal-desc]').textContent = service[2];
  modal.querySelector('[data-modal-benefits]').innerHTML = service[3].split(',').map((benefit) => `<li>${benefit.trim()}</li>`).join('');
  modal.querySelector('[data-modal-time]').textContent = `Tempo médio: ${service[4]}`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeModal() { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
document.querySelector('[data-close-modal]').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });

const galleryItems = [
  ['Natural', imagePool[0]], ['Volume', imagePool[1]], ['Lifting', imagePool[2]], ['Sobrancelhas', imagePool[3]], ['Natural', imagePool[2]], ['Volume', imagePool[0]], ['Sobrancelhas', imagePool[1]], ['Lifting', imagePool[3]]
];
const gallery = document.querySelector('[data-gallery]');
function renderGallery(filter = 'all') {
  gallery.innerHTML = '';
  galleryItems.filter(([category]) => filter === 'all' || category === filter).forEach(([category, src]) => {
    const button = document.createElement('button');
    button.className = 'gallery-card reveal visible';
    button.innerHTML = `<img src="${src}" alt="Resultado ${category} Fabi Neves Lash"><span>${category}</span>`;
    button.addEventListener('click', () => openLightbox(src));
    gallery.append(button);
  });
}
renderGallery();
document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  renderGallery(button.dataset.filter);
}));

const lightbox = document.querySelector('[data-lightbox]');
const lightboxImage = document.querySelector('[data-lightbox-image]');
function openLightbox(src) { lightboxImage.src = src; lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
function hideLightbox() { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden', 'true'); lightboxImage.removeAttribute('src'); document.body.style.overflow = ''; }
document.querySelector('[data-close-lightbox]').addEventListener('click', hideLightbox);
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) hideLightbox(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { hideLightbox(); closeModal(); } });

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.12, rootMargin: '0px 0px -70px 0px' });
document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
