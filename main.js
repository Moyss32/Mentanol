
document.documentElement.classList.add('js');

// Scroll suave customizado para âncoras internas
document.addEventListener('click', (e)=>{
  const a = e.target.closest('a[href^="#"]');
  if(!a) return;
  const id = a.getAttribute('href').slice(1);
  const target = document.getElementById(id);
  if(target){
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
  }
});

// Menu mobile
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
toggle?.addEventListener('click', ()=> menu.classList.toggle('open'));

// Botão scroll down
document.querySelector('.scroll-down')?.addEventListener('click', ()=>{
  document.getElementById('beneficios')?.scrollIntoView({behavior:'smooth'});
});

// Back to top
const backTop = document.querySelector('.back-to-top');
const toggleTop = ()=> backTop?.classList.toggle('show', window.scrollY > 500);
window.addEventListener('scroll', toggleTop);
backTop?.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

// Parallax suave em layers
const layers = document.querySelectorAll('.layer');
const onParallax = ()=>{
  const y = window.scrollY;
  layers.forEach(el=>{
    const speed = parseFloat(el.getAttribute('data-speed')||'4');
    el.style.transform = `translateY(${-(y/speed)}px)`;
  });
};
window.addEventListener('scroll', onParallax);
onParallax(); // inicial [leve e progressivo]

// ScrollReveal: anima elementos quando entram na viewport
if (window.ScrollReveal){
  const sr = ScrollReveal();
  sr.reveal('.reveal', {
    distance: '28px',
    duration: 700,
    easing: 'cubic-bezier(.2,.7,.2,1)',
    origin: 'bottom',
    interval: 80,
    cleanup: true
  });
}
// Valores inspirados na doc oficial (distance/origin) [biblioteca leve]

// Modal do processo
const modal = document.getElementById('process-modal');
document.querySelector('.open-modal')?.addEventListener('click', ()=> modal?.showModal());
document.querySelector('.modal-close')?.addEventListener('click', ()=> modal?.close());

// Seletor de variação e preço
const prices = { "50": 6.80, "100": 8.22, "200": 13.70, "kit4": 15.00 };
const priceEl = document.querySelector('[data-price]');
const qtyEl = document.getElementById('qty');
const updatePrice = ()=>{
  const variant = document.querySelector('input[name="variant"]:checked')?.value || "70";
  const qty = Math.max(1, parseInt(qtyEl.value||"1",10));
  const total = prices[variant]*qty;
  priceEl.textContent = `R$ ${total.toFixed(2).replace('.',',')}`;
};
document.querySelectorAll('input[name="variant"]').forEach(r=> r.addEventListener('change', updatePrice));
document.querySelectorAll('.qty-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const delta = parseInt(btn.dataset.act,10);
    qtyEl.value = Math.max(1, parseInt(qtyEl.value||"1",10) + delta);
    updatePrice();
  });
});
qtyEl?.addEventListener('input', updatePrice);
updatePrice();

// Microinterações extra: hover ripple em botões primários
document.querySelectorAll('.btn-primary').forEach(btn=>{
  btn.style.position = 'relative';
  btn.style.overflow = 'hidden';
  btn.addEventListener('pointerdown', (e)=>{
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.style.position='absolute';
    ripple.style.width = ripple.style.height = size+'px';
    ripple.style.left = (e.clientX - rect.left - size/2)+'px';
    ripple.style.top = (e.clientY - rect.top - size/2)+'px';
    ripple.style.borderRadius='50%';
    ripple.style.background='rgba(255,255,255,.35)';
    ripple.style.transform='scale(0)';
    ripple.style.transition='transform .45s ease, opacity .6s ease';
    btn.appendChild(ripple);
    requestAnimationFrame(()=> ripple.style.transform='scale(1)');
    ripple.addEventListener('transitionend', ()=> ripple.remove());
    setTimeout(()=> ripple.style.opacity='0', 120);
  });
});

const sideNav = document.querySelector(".side-nav");

window.addEventListener("scroll", () => {
  const current = window.pageYOffset;

  if (current > lastScroll && current > 150) {
    nav.classList.add("hide-nav");
    sideNav.style.opacity = "1";
  } else {
    nav.classList.remove("hide-nav");
    sideNav.style.opacity = "0";
  }

  lastScroll = current;
});
