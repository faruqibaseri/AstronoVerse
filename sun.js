/* ========= Sample content data (cards) ========= */
const cardsData = [
  {category:"events",   title:"Study Skills Bootcamp", time:"⏱ 45 min", date:"Aug 10, 2025", img:"https://placehold.co/520x300"},
  {category:"podcasts", title:"Deep Work Tactics",     time:"🎧 28 min", date:"Aug 06, 2025", img:"https://placehold.co/520x300"},
  {category:"webinars", title:"Research Methods 101",  time:"⏱ 60 min", date:"Aug 02, 2025", img:"https://placehold.co/520x300"},
  {category:"live",     title:"Q&A with Mentors",      time:"🔴 Live",   date:"Aug 15, 2025", img:"https://placehold.co/520x300"},
  {category:"events",   title:"Memory & Retention",    time:"⏱ 35 min", date:"Jul 29, 2025", img:"https://placehold.co/520x300"},
  {category:"webinars", title:"Statistics for All",    time:"⏱ 50 min", date:"Jul 22, 2025", img:"https://placehold.co/520x300"},
  {category:"podcasts", title:"Focus & Flow",          time:"🎧 31 min", date:"Jul 18, 2025", img:"https://placehold.co/520x300"},
  {category:"events",   title:"Learning Theories",     time:"⏱ 40 min", date:"Jul 10, 2025", img:"https://placehold.co/520x300"},
];

/* ========= DOM refs ========= */
const cardsWrap = document.getElementById('cards');
const tabs = document.querySelectorAll('.tab');
const tabInk = document.querySelector('.tab-ink');
const viewAllBtn = document.getElementById('viewAll');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

/* ========= Render cards ========= */
function renderCards(category, query=""){
  cardsWrap.innerHTML = "";
  const q = query.trim().toLowerCase();
  const filtered = cardsData.filter(c => {
    const matchCat = !category ? true : c.category === category;
    const matchText = !q ? true : (c.title.toLowerCase().includes(q));
    return matchCat && matchText;
  });

  filtered.forEach((c,i)=>{
    const el = document.createElement('article');
    el.className = 'card reveal';
    el.style.transitionDelay = `${(i%3)*0.05}s`;
    el.innerHTML = `
      <a class="thumb hover-zoom" href="#">
        <img src="${c.img}" alt="${c.title}">
      </a>
      <div class="card-body">
        <div class="card-meta"><span>${c.time}</span>·<span>${c.date}</span></div>
        <h4>${c.title}</h4>
        <div class="actions">
          <button class="btn btn-secondary">Register ></button>
          <button class="btn btn-ghost">Save</button>
        </div>
      </div>
    `;
    cardsWrap.appendChild(el);
  });

  observeReveals(); // re-attach animations
}

/* ========= Tabs logic + animated underline ========= */
function moveInkToTab(activeBtn){
  const bbox = activeBtn.getBoundingClientRect();
  const parentBox = activeBtn.parentElement.getBoundingClientRect();
  const left = activeBtn.offsetLeft;
  tabInk.style.width = bbox.width + 'px';
  tabInk.style.left = left + 'px';
}

tabs.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    tabs.forEach(t => t.classList.remove('is-active'));
    btn.classList.add('is-active');
    tabs.forEach(t => t.setAttribute('aria-selected', t===btn ? 'true' : 'false'));
    moveInkToTab(btn);
    renderCards(btn.dataset.category, searchInput.value);
  });
});

/* ========= Search ========= */
searchBtn.addEventListener('click', ()=>{
  const activeTab = document.querySelector('.tab.is-active');
  renderCards(activeTab?.dataset.category, searchInput.value);
});
searchInput.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter') searchBtn.click();
});

/* ========= Scroll reveal ========= */
let revealObserver;
function observeReveals(){
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('show'));
    return;
  }
  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {threshold:0.15});
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

/* ========= Playlist (switch video) ========= */
const mainVideo = document.getElementById('mainVideo');
document.getElementById('playlist').addEventListener('click', (e)=>{
  const li = e.target.closest('li[data-video]');
  if(!li) return;
  const id = li.getAttribute('data-video');
  mainVideo.src = `https://www.youtube.com/embed/${id}`;
});

/* ========= View all smooth scroll ========= */
viewAllBtn.addEventListener('click', ()=>{
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});

/* ========= Mobile menu (basic) ========= */
const burger = document.querySelector('.hamburger');
const nav = document.querySelector('.main-nav');
burger.addEventListener('click', ()=>{
  const open = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!open));
  nav.style.display = open ? 'none' : 'flex';
});

/* ========= Init ========= */
window.addEventListener('load', ()=>{
  // default: Events
  const active = document.querySelector('.tab.is-active');
  moveInkToTab(active);
  renderCards('events');
  observeReveals();
});
window.addEventListener('resize', ()=>{
  const active = document.querySelector('.tab.is-active');
  if (active) moveInkToTab(active);
});


(function(){
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  /* Mobile menu */
const burger = document.getElementById('hamburger');
const mobile = document.getElementById('mobileMenu');

if (burger && mobile) {
  burger.addEventListener('click', () => {
    // Toggle menu visibility
    mobile.classList.toggle('open');
    
    // Toggle hamburger animation
    burger.classList.toggle('active');
    
    // Update accessibility attributes
    const isOpen = mobile.classList.contains('open');
    burger.setAttribute('aria-expanded', isOpen);
  });
}

  /* Back to top */
  const toTop = document.getElementById('toTop');
  if(toTop){
    window.addEventListener('scroll', () => {
      toTop.style.display = window.scrollY > 600 ? 'block' : 'none';
    });
    toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
  }
})();

    // Mobile dropdown toggle
document.querySelectorAll(".mobile__toggle").forEach(btn => {
  btn.addEventListener("click", () => {
    const parent = btn.parentElement;
    parent.classList.toggle("open");
  });
});
