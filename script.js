const header = document.querySelector('.site-header');
const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 36);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

menuBtn?.addEventListener('click', () => {
  const open = !nav.classList.contains('open');
  nav.classList.toggle('open', open);
  menuBtn.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});

document.querySelectorAll('.site-nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuBtn?.classList.remove('open');
  menuBtn?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();
