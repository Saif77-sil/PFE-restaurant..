/* =====================================================
   SHOKO LOUNGE — main.js
   Pure Vanilla JavaScript — No frameworks, no emojis
   ===================================================== */
'use strict';

/* ─── SVG ICON LIBRARY ──────────────────────────────── */
const ICONS = {
  chart:    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  table:    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M9 21V9"/></svg>`,
  orders:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  stats:    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  revenue:  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>`,
  users:    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
  seat:     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
  receipt2: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  clock:    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  star:     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  check:    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg>`,
  trash:    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>`,
  person:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  crown:    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M2 20h20M4 20l2-10 6 5 6-5 2 10"/></svg>`,
  plus:     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  minus:    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  usersS:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
};

/* ─── ROUTER ─────────────────────────────────────────── */
function showPage(page) {
  ['home','login','dashboard'].forEach(p => {
    const el = document.getElementById('page-' + p);
    if (el) el.style.display = 'none';
  });

  if (page === 'home') {
    document.getElementById('page-home').style.display = 'block';
    updateNavAuth();
    window.scrollTo(0, 0);
    setTimeout(() => {
      initMarquee(); initGallery(); initMenu();
      initReservationForm(); initScrollReveal();
    }, 50);
  } else if (page === 'login') {
    document.getElementById('page-login').style.display = 'flex';
    initLogin();
  } else if (page === 'dashboard') {
    const user = getUser();
    if (!user) { showPage('login'); return; }
    document.getElementById('page-dashboard').style.display = 'block';
    initDashboard(user);
  }
}
window.showPage = showPage;

function getUser() {
  try { return JSON.parse(localStorage.getItem('shoko_user')); } catch(e) { return null; }
}

/* ─── NAVBAR ─────────────────────────────────────────── */
function updateNavAuth() {
  const user = getUser();
  const el = document.getElementById('nav-auth-home');
  if (!el) return;
  if (user) {
    el.innerHTML = `
      <a href="#" class="navbar-cta" style="background:var(--ember);color:#fff;" onclick="showPage('dashboard');return false;">Dashboard</a>
      <button class="navbar-cta" style="background:transparent;" onclick="logout()">Déconnexion</button>`;
  } else {
    el.innerHTML = `<a href="#" class="navbar-cta" onclick="showPage('login');return false;">Espace Staff</a>`;
  }
}

function logout() { localStorage.removeItem('shoko_user'); showPage('home'); }

window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

function toggleMobileMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}
window.toggleMobileMenu = toggleMobileMenu;

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}
window.scrollToSection = scrollToSection;

/* ─── HOME : MARQUEE ────────────────────────────────── */
function initMarquee() {
  const items = ['Fine Dining','Cocktail Bar','Live DJ Sets','Sushi & Asian Fusion',
                 'VIP Tables','Ambiance Premium','Night Experience','Private Events'];
  const track = document.getElementById('marquee-track');
  if (!track) return;
  const doubled = [...items, ...items];
  track.innerHTML = doubled.map(item =>
    `<span class="marquee-item">${item} <span class="marquee-star">✦</span></span>`
  ).join('');
}

/* ─── HOME : GALLERY — dark luxury coherent set ─────── */
function initGallery() {
  const images = [
    { url:'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=700&q=85&fit=crop', label:'Cocktails' },
    { url:'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg', label:'Bar Lounge' },
    { url:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=85&fit=crop', label:'Gastronomie' },
    { url:'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&q=85&fit=crop', label:'Fine Dining' },
    { url:'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg', label:'Sushi Bar' },
    { url:'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=700&q=85&fit=crop', label:'Cocktails Premium' },
    { url:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=85&fit=crop', label:'Plats Signatures' },
    { url:'https://images.unsplash.com/photo-1482275548304-a58859dc31b7?w=700&q=85&fit=crop', label:'Night Bar' },
    { url:'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=700&q=85&fit=crop', label:'Chef Selection' },
    { url:'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=700&q=85&fit=crop', label:'VIP Lounge' },
  ];
  const track = document.getElementById('gallery-track');
  if (!track) return;
  const doubled = [...images, ...images];
  track.innerHTML = doubled.map(img => `
    <div class="gallery-item">
      <img src="${img.url}" alt="${img.label}" loading="lazy" />
      <div class="gallery-item-overlay">
        <span class="gallery-item-label">${img.label}</span>
      </div>
    </div>`).join('');
  track.classList.add('animate');
}

/* ─── HOME : MENU ───────────────────────────────────── */
const MENU_DATA = {
  signature: { label:'Signatures', items:[
    { name:'Dragon Roll', price:160, description:'Thon mi-cuit, avocat, ponzu fumé, caviar de citron', tag:"Chef's choice" },
    { name:'Wagyu A5 Tataki', price:420, description:'Bœuf wagyu japonais, sauce truffée, microgreens', tag:'Premium' },
    { name:'Black Cod Miso', price:320, description:'Morue noire marinée 72h, glaçure dengaku, gingembre confit' },
    { name:'Omakase Selection', price:680, description:'Sélection du chef, 8 pièces premium du marché du jour', tag:'Omakase' },
    { name:'Shoko Negroni', price:145, description:'Gin Tanqueray, Campari, vermouth rouge, orange confite' },
    { name:'Yuzu Spritz', price:135, description:'Prosecco, yuzu frais, elderflower, citron vert' },
  ]},
  sushi:{ label:'Sushi & Sashimi', items:[
    { name:'Sashimi Mix', price:220, description:'Saumon, thon, daurade — 3 pièces de chaque, sauce ponzu' },
    { name:'California Roll', price:140, description:'Crabe, avocat, concombre, tobiko orange' },
    { name:'Rainbow Roll', price:180, description:'California enrobé de saumon, thon et avocat', tag:'Populaire' },
    { name:'Ebi Tempura Roll', price:160, description:'Crevettes tempura, sauce spicy, green onion' },
    { name:'Nigiri Selection', price:195, description:'8 pièces nigiri : saumon, thon, daurade, anguille' },
  ]},
  grill:{ label:'Grill', items:[
    { name:'Grilled Salmon', price:280, description:'Saumon label rouge, beurre miso, légumes de saison' },
    { name:'Tuna Steak', price:340, description:'Thon rouge saisi, sauce teriyaki maison, sésame noir' },
    { name:'Robata Chicken', price:220, description:'Poulet mariné yakitori, légumes grillés, tare sauce' },
    { name:'Lobster Split', price:520, description:"Demi-homard grillé, beurre à l'ail, citron", tag:'Premium' },
  ]},
  cocktails:{ label:'Cocktails', items:[
    { name:'Signature Mojito', price:120, description:'Rhum blanc Bacardi, menthe fraîche, citron vert, sucre de canne' },
    { name:'Old Fashioned', price:110, description:'Bourbon Woodford Reserve, bitters Angostura, sucre, orange' },
    { name:'Espresso Martini', price:130, description:'Vodka Grey Goose, Kahlúa, espresso frais, mousse crémeuse' },
    { name:'Tokyo Sour', price:125, description:"Whisky Suntory Toki, yuzu, blanc d'œuf, bitters fumés", tag:'Signature' },
    { name:'Lychee Rose', price:115, description:'Gin St-Germain, litchi, eau de rose, prosecco' },
  ]},
  desserts:{ label:'Desserts', items:[
    { name:'Matcha Cheesecake', price:95, description:'Cheesecake au thé matcha Uji, coulis framboise, biscuit sésame' },
    { name:'Mochi Platter', price:75, description:'Assortiment de mochis glacés, 6 saveurs saisonnières' },
    { name:'Chocolate Fondant', price:85, description:'Fondant 70% Valrhona, glace yuzu, tuile or', tag:'Must try' },
    { name:'Yuzu Sorbet', price:65, description:'Sorbet maison au yuzu frais, zestes confits, menthe' },
  ]},
};

let activeMenuTab = 'signature';
function initMenu() {
  const tabsEl = document.getElementById('menu-tabs');
  if (!tabsEl) return;
  tabsEl.innerHTML = Object.keys(MENU_DATA).map(key => `
    <button class="menu-tab ${key===activeMenuTab?'active':''}" onclick="switchMenuTab('${key}')">
      ${MENU_DATA[key].label}
    </button>`).join('');
  renderMenuGrid();
}
function switchMenuTab(tab) {
  activeMenuTab = tab;
  document.querySelectorAll('.menu-tab').forEach(b =>
    b.classList.toggle('active', b.getAttribute('onclick').includes(`'${tab}'`)));
  renderMenuGrid();
}
function renderMenuGrid() {
  const g = document.getElementById('menu-grid');
  if (!g) return;
  g.style.opacity = '0';
  setTimeout(() => {
    g.innerHTML = MENU_DATA[activeMenuTab].items.map(item => `
      <div class="menu-card">
        <div class="menu-card-header">
          <span class="menu-card-name">${item.name}</span>
          <span class="menu-card-price">${item.price} Dh</span>
        </div>
        <p class="menu-card-desc">${item.description}</p>
        ${item.tag ? `<span class="menu-card-tag">${item.tag}</span>` : ''}
      </div>`).join('');
    g.style.opacity='1'; g.style.transition='opacity .3s';
  }, 150);
}
window.switchMenuTab = switchMenuTab;

/* ─── HOME : RESERVATION ────────────────────────────── */
function initReservationForm() {
  const form = document.getElementById('reservation-form');
  if (!form) return;
  form.onsubmit = e => {
    e.preventDefault();
    const t = document.getElementById('toast');
    if (t) { t.classList.add('visible'); setTimeout(()=>t.classList.remove('visible'),4000); }
    form.reset();
  };
}

/* ─── HOME : SCROLL REVEAL ──────────────────────────── */
function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, { threshold:0.1, rootMargin:'-60px 0px' });
  document.querySelectorAll('.reveal-on-scroll').forEach(el => obs.observe(el));
}

/* ─── FOOTER YEAR ────────────────────────────────────── */
function initFooter() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ─── LOGIN — staff only, no client ─────────────────── */
const ALL_CREDS = [
  { role:'Admin',   email:'admin@shoko.ma',   password:'admin123',   name:'Administrateur', roleKey:'admin' },
  { role:'Gérant',  email:'gerant@shoko.ma',  password:'gerant123',  name:'Gérant',         roleKey:'gerant' },
  { role:'Serveur', email:'serveur@shoko.ma', password:'serveur123', name:'Yassine',        roleKey:'serveur' },
];

function initLogin() {
  const emailEl = document.getElementById('login-email');
  const passEl  = document.getElementById('login-password');
  const errEl   = document.getElementById('login-error');
  if (emailEl) emailEl.value = '';
  if (passEl)  passEl.value  = '';
  if (errEl)   errEl.style.display = 'none';
  renderLoginDemos();
  const form = document.getElementById('login-form');
  if (form) form.onsubmit = handleLogin;
}

function renderLoginDemos() {
  const grid = document.getElementById('demo-grid');
  if (!grid) return;
  grid.innerHTML = ALL_CREDS.map(c => `
    <div class="demo-item" onclick="fillLogin('${c.email}','${c.password}')">
      <span class="demo-role">${c.role}</span>
      <span class="demo-email">${c.email}</span>
    </div>`).join('');
}

function fillLogin(email, pass) {
  document.getElementById('login-email').value   = email;
  document.getElementById('login-password').value = pass;
}
window.fillLogin = fillLogin;

function togglePassword() {
  const inp = document.getElementById('login-password');
  const btn = document.getElementById('toggle-pass');
  if (inp.type === 'password') {
    inp.type = 'text';
    btn.textContent = '🙈';
  } else {
    inp.type = 'password';
    btn.textContent = '👁';
  }
}
window.togglePassword = togglePassword;

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-password').value;
  const btn   = document.getElementById('login-btn');
  const errEl = document.getElementById('login-error');

  btn.textContent = 'Connexion…';
  btn.disabled = true;
  errEl.style.display = 'none';

  await new Promise(r => setTimeout(r, 700));

  const match = ALL_CREDS.find(c => c.email === email && c.password === pass);
  if (match) {
    localStorage.setItem('shoko_user', JSON.stringify({ email:match.email, role:match.roleKey, name:match.name }));
    showPage('dashboard');
  } else {
    errEl.textContent = 'Identifiants incorrects. Vérifiez vos informations.';
    errEl.style.display = 'block';
    btn.textContent = 'Se connecter →';
    btn.disabled = false;
  }
}

/* ─── DASHBOARD STATE ───────────────────────────────── */
let dashTables       = [];
let dashActiveOrders = [];
let dashUser         = null;
let dashCurrentPage  = 'overview';
let floorFilter      = 'all';
let floorCart        = [];
let floorSelectedTable = null;
let floorMenuFilter  = 'All';
let activeReceiptTableId = null;

function generateTables() {
  const statuses = ['free','busy','rsv'];
  const zones    = ['Terrasse','VIP','Salon','Bar','Intérieur'];
  return Array.from({ length:24 }, (_, i) => {
    const status = statuses[Math.floor(Math.random()*3)];
    return {
      id: i+1,
      number: String(i+1).padStart(2,'0'),
      status,
      zone: zones[Math.floor(Math.random()*zones.length)],
      total: (status==='busy' && Math.random()>.4) ? Math.floor(Math.random()*500)+100 : 0,
      orders: [], orderTime:null, orderId:null, orderStatus:null,
    };
  });
}

function initDashboard(user) {
  dashUser = user;
  if (!dashTables.length) dashTables = generateTables();
  dashActiveOrders = [
    { id:'#SH-0241', table:'VIP 1',  items:'Wagyu + Cocktails', total:1650, status:'en cours', time:'20:30' },
    { id:'#SH-0240', table:'Table 7',items:'Dragon Roll',        total:245,  status:'servi',    time:'20:15' },
    { id:'#SH-0239', table:'VIP 2',  items:'Omakase Selection', total:950,  status:'en cours', time:'20:45' },
  ];
  renderSidebar(user);
  setActivePage('overview');
}

/* ─── SIDEBAR ───────────────────────────────────────── */
const ROLE_LABELS   = { admin:'Administrateur', gerant:'Gérant', serveur:'Serveur' };
const ROLE_INITIALS = { admin:'A', gerant:'G', serveur:'S' };

const NAV_ITEMS = [
  { id:'overview',     icon:'chart',    label:'Vue générale',  roles:['admin','gerant','serveur'] },
  { id:'tables',       icon:'table',    label:'Tables',        roles:['admin','gerant','serveur'] },
  { id:'orders',       icon:'orders',   label:'Commandes',     roles:['admin','gerant','serveur'] },
  { id:'reservations', icon:'calendar', label:'Réservations',  roles:['admin','gerant'] },
  { id:'stats',        icon:'stats',    label:'Statistiques',  roles:['admin'] },
];

function renderSidebar(user) {
  document.getElementById('sidebar-role-label').textContent = 'Dashboard ' + (ROLE_LABELS[user.role]||'');
  document.getElementById('sidebar-username').textContent   = user.name || 'Utilisateur';
  document.getElementById('sidebar-user-role').textContent  = ROLE_LABELS[user.role] || '';
  document.getElementById('user-avatar').textContent        = ROLE_INITIALS[user.role] || 'U';

  document.getElementById('sidebar-nav').innerHTML = NAV_ITEMS
    .filter(item => item.roles.includes(user.role))
    .map(item => `
      <button class="sidebar-item" id="nav-${item.id}" onclick="setActivePage('${item.id}')">
        <span class="sidebar-icon">${ICONS[item.icon]||''}</span>${item.label}
      </button>`).join('');
}

const PAGE_META = {
  overview:     { title:'Vue Générale',    sub:'Tableau de bord en temps réel' },
  tables:       { title:'Plan des Tables', sub:'Statut des tables en temps réel' },
  orders:       { title:'Commandes',       sub:'Suivi des commandes actives' },
  reservations: { title:'Réservations',    sub:'Gestion des réservations du soir' },
  stats:        { title:'Statistiques',    sub:'Analytiques et performances' },
  settings:     { title:'Paramètres',      sub:'Configuration du compte' },
};

function setActivePage(page) {
  dashCurrentPage = page;
  document.querySelectorAll('.sidebar-item').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('nav-'+page);
  if (btn) btn.classList.add('active');

  const meta = PAGE_META[page] || { title:'Dashboard', sub:'' };
  document.getElementById('dash-title').textContent    = meta.title;
  document.getElementById('dash-subtitle').textContent = meta.sub;

  const content = document.getElementById('dash-content');
  content.classList.remove('dash-fade-in');
  void content.offsetWidth;
  content.classList.add('dash-fade-in');

  switch (page) {
    case 'overview':     content.innerHTML = renderOverview(); break;
    case 'tables':       content.innerHTML = renderTablesPage(); initFloorMap(); break;
    case 'orders':       content.innerHTML = renderOrdersPage(); break;
    case 'reservations': content.innerHTML = renderReservationsPage(); break;
    case 'stats':        content.innerHTML = renderStatsPage(); break;
    case 'settings':     content.innerHTML = renderSettingsPage(); break;
    default:             content.innerHTML = renderOverview();
  }
}
window.setActivePage = setActivePage;

/* ─── OVERVIEW ──────────────────────────────────────── */
function renderOverview() {
  const role = dashUser.role;
  const busy = dashTables.filter(t=>t.status==='busy').length;
  const free = dashTables.filter(t=>t.status==='free').length;
  const rsv  = dashTables.filter(t=>t.status==='rsv').length;
  const occupancy = Math.round((busy/24)*100);

  const statsByRole = {
    admin:   [
      { svg:ICONS.revenue,  value:'52 400 DH', label:'Revenus',         change:'+12%', up:true },
      { svg:ICONS.users,    value:'284',        label:'Clients',         change:'+18',  up:true },
      { svg:ICONS.seat,     value:`${busy}/24`, label:'Tables occupées', change:'+3',   up:true },
      { svg:ICONS.receipt2, value:'47',         label:'Commandes',       change:'+8',   up:true },
    ],
    gerant:  [
      { svg:ICONS.revenue,  value:'28 400 DH', label:'Revenus',         change:'+8%', up:true },
      { svg:ICONS.users,    value:'156',        label:'Clients',         change:'+12', up:true },
      { svg:ICONS.seat,     value:`${busy}/24`, label:'Tables occupées', change:'+2',  up:true },
      { svg:ICONS.receipt2, value:'34',         label:'Commandes',       change:'+5',  up:true },
    ],
    serveur: [
      { svg:ICONS.receipt2, value:'34',    label:'Mes commandes', change:'+5', up:true },
      { svg:ICONS.seat,     value:'12',    label:'Mes tables',    change:'+2', up:true },
      { svg:ICONS.clock,    value:'17:00', label:'Début shift',   change:'',   up:true },
      { svg:ICONS.clock,    value:'02:00', label:'Fin shift',     change:'',   up:true },
    ],
  };
  const stats = statsByRole[role] || statsByRole.serveur;

  const reservations = [
    { name:'Youssef El Mansouri', guests:4, time:'20:00', table:'VIP 2',    status:'confirmed' },
    { name:'Sarah Benali',        guests:2, time:'20:30', table:'Table 7',  status:'pending'   },
    { name:'Khalid Rachidi',      guests:6, time:'21:00', table:'VIP 1',    status:'vip'       },
    { name:'Nadia Hassani',       guests:3, time:'21:30', table:'Table 12', status:'confirmed' },
  ];

  return `
  <div class="stats-grid">
    ${stats.map(s=>`
      <div class="stat-card">
        <span class="stat-card-icon">${s.svg}</span>
        <div class="stat-card-value">${s.value}</div>
        <div class="stat-card-label">${s.label}</div>
        ${s.change?`<div class="stat-card-change ${s.up?'':'down'}">${s.up?'↑':'↓'} ${s.change}</div>`:''}
      </div>`).join('')}
  </div>

  <div class="dashboard-grid">
    <div class="dash-panel">
      <div class="dash-panel-header">
        <span class="dash-panel-title">${role==='serveur'?"Mes tables aujourd'hui":'Réservations du jour'}</span>
        <button class="dash-panel-action" onclick="setActivePage('reservations')">Voir tout</button>
      </div>
      <div class="reservations-list">
        ${reservations.map(r=>`
          <div class="reservation-row">
            <div>
              <div class="res-name">${r.name}</div>
              <div class="res-meta">${r.table} &bull; ${r.guests} pers.</div>
            </div>
            <div style="font-size:.85rem;color:var(--text-primary);text-align:center;">${r.time}</div>
            <span class="res-badge ${r.status==='confirmed'?'badge-confirmed':r.status==='vip'?'badge-vip':'badge-pending'}">
              ${r.status==='confirmed'?'Confirmée':r.status==='vip'?'VIP':'En attente'}
            </span>
          </div>`).join('')}
      </div>
    </div>

    <div class="dash-panel">
      <div class="dash-panel-header">
        <span class="dash-panel-title">Occupation des tables</span>
        <span class="occupancy-rate">${occupancy}% rempli</span>
      </div>
      <div class="occupancy-stats">
        <div class="occupancy-bar">
          <div class="occupancy-fill busy" style="width:${(busy/24)*100}%"></div>
          <div class="occupancy-fill rsv"  style="width:${(rsv/24)*100}%"></div>
        </div>
        <div class="occupancy-labels">
          <span><span class="dot busy"></span>Occupées (${busy})</span>
          <span><span class="dot rsv"></span>Réservées (${rsv})</span>
          <span><span class="dot free"></span>Libres (${free})</span>
        </div>
      </div>
      <div class="quick-stats">
        <div class="quick-stat"><span class="quick-stat-value">${busy}</span><span class="quick-stat-label">Actives</span></div>
        <div class="quick-stat"><span class="quick-stat-value">${dashActiveOrders.length}</span><span class="quick-stat-label">Commandes</span></div>
        <div class="quick-stat"><span class="quick-stat-value">~45 min</span><span class="quick-stat-label">Tps moyen</span></div>
      </div>
    </div>
  </div>

  <div class="dash-panel" style="margin-top:20px;grid-column:1/-1;">
    <div class="dash-panel-header">
      <span class="dash-panel-title">${role==='serveur'?'Mes commandes en cours':'Commandes actives'}</span>
      <button class="dash-panel-action" onclick="setActivePage('orders')">Voir tout</button>
    </div>
    <div class="orders-list">
      ${dashActiveOrders.map(o=>`
        <div class="order-row">
          <div class="order-id">${o.id}</div>
          <div class="order-table">Table ${o.table}</div>
          <div class="order-items">${o.items}</div>
          <div class="order-time">${o.time}</div>
          <div class="order-total">${o.total} DH</div>
          <div class="order-status ${o.status==='en cours'?'status-progress':'status-done'}">
            ${o.status==='en cours'?'En cours':'Servi'}
          </div>
        </div>`).join('')}
    </div>
  </div>`;
}

/* ─── TABLES / FLOOR MAP ────────────────────────────── */
const FLOOR_ITEMS = [
  {id:1,name:'Dragon Roll',       category:'Sushi',    price:160},
  {id:2,name:'Sashimi Mix',       category:'Sushi',    price:220},
  {id:3,name:'California Roll',   category:'Sushi',    price:140},
  {id:4,name:'Wagyu Beef',        category:'Grill',    price:420},
  {id:5,name:'Black Cod Miso',    category:'Grill',    price:320},
  {id:6,name:'Grilled Salmon',    category:'Grill',    price:280},
  {id:7,name:'Signature Mojito',  category:'Drinks',   price:120},
  {id:8,name:'Old Fashioned',     category:'Drinks',   price:110},
  {id:9,name:'Espresso Martini',  category:'Drinks',   price:130},
  {id:10,name:'Matcha Cheesecake',category:'Desserts', price:95 },
  {id:11,name:'Mochi Platter',    category:'Desserts', price:75 },
  {id:12,name:'Chocolate Fondant',category:'Desserts', price:85 },
];

function renderTablesPage() {
  return `
  <div class="dash-panel" style="grid-column:1/-1;">
    <div class="dash-panel-header">
      <span class="dash-panel-title">Plan des Tables</span>
      <div style="display:flex;gap:16px;font-size:.65rem;color:var(--text-muted);">
        <span><span class="legend-dot free"></span>Libre</span>
        <span><span class="legend-dot busy"></span>Occupée</span>
        <span><span class="legend-dot rsv"></span>Réservée</span>
      </div>
    </div>
    <div id="floor-map-root"></div>
  </div>`;
}

function initFloorMap() { floorFilter='all'; floorCart=[]; floorSelectedTable=null; renderFloorMap(); }

function renderFloorMap() {
  const root = document.getElementById('floor-map-root');
  if (!root) return;
  const isStaff = ['serveur','gerant','admin'].includes(dashUser.role);
  const total = dashTables.length;
  const free  = dashTables.filter(t=>t.status==='free').length;
  const busy  = dashTables.filter(t=>t.status==='busy').length;
  const rsv   = dashTables.filter(t=>t.status==='rsv').length;
  const filtered = floorFilter==='all' ? dashTables : dashTables.filter(t=>t.status===floorFilter);

  const statusSVG = {
    free: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/></svg>`,
    busy: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
    rsv:  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  };

  root.innerHTML = `
  <div class="floormap-stats">
    ${[{k:'all',v:total,l:'Total'},{k:'free',v:free,l:'Libres'},{k:'busy',v:busy,l:'Occupées'},{k:'rsv',v:rsv,l:'Réservées'}]
      .map(s=>`<div class="floor-stat-card ${s.k} ${floorFilter===s.k?'active':''}" onclick="filterFloor('${s.k}')">
        <div class="floor-stat-value">${s.v}</div>
        <div class="floor-stat-label">${s.l}</div>
      </div>`).join('')}
    ${isStaff?`<span class="staff-badge">${ICONS.usersS} Mode Staff</span>`:''}
  </div>

  <div class="tables-grid-large">
    ${filtered.map(table=>`
      <div class="table-cell ${table.status}" onclick="${table.status==='busy'?`openReceiptFromMap(${table.id})`:`openOrderModal(${table.id})`}">
        <div class="table-number">${table.number}</div>
        <div class="table-zone">${table.zone}</div>
        <div class="table-status-icon">${statusSVG[table.status]||''}</div>
        ${table.total>0?`<div class="table-total">${table.total} DH</div>`:'<div class="table-total-empty">—</div>'}
        <div class="table-status-label ${table.status}">
          ${table.status==='free'?'Libre':table.status==='busy'?'Occupée':'Réservée'}
        </div>
      </div>`).join('')}
  </div>`;
}
function filterFloor(f) { floorFilter=f; renderFloorMap(); }
window.filterFloor = filterFloor;

/* ─── ORDER MODAL (Tables page) ─────────────────────── */
function openOrderModal(tableId) {
  const table = dashTables.find(t=>t.id===tableId);
  if (!table || table.status==='busy') return;
  floorSelectedTable = table; floorCart = []; floorMenuFilter = 'All';
  document.getElementById('order-modal-title').textContent = 'Table ' + table.number;
  renderModalFilters(); renderModalItems(); updateCartTotal();
  document.getElementById('order-modal-overlay').style.display = 'flex';
}
function closeOrderModal() {
  document.getElementById('order-modal-overlay').style.display = 'none';
  floorSelectedTable = null; floorCart = [];
}
window.openOrderModal  = openOrderModal;
window.closeOrderModal = closeOrderModal;

function renderModalFilters() {
  document.getElementById('modal-menu-filters').innerHTML =
    ['All','Sushi','Grill','Drinks','Desserts'].map(c=>`
      <button class="${floorMenuFilter===c?'active':''}" onclick="setFloorMenuFilter('${c}')">${c}</button>`).join('');
}
function setFloorMenuFilter(c) { floorMenuFilter=c; renderModalFilters(); renderModalItems(); }
window.setFloorMenuFilter = setFloorMenuFilter;

function renderModalItems() {
  const items = floorMenuFilter==='All' ? FLOOR_ITEMS : FLOOR_ITEMS.filter(i=>i.category===floorMenuFilter);
  document.getElementById('modal-menu-list').innerHTML = items.map(item=>{
    const qty = (floorCart.find(i=>i.id===item.id)||{qty:0}).qty;
    return `<div class="menu-item">
      <div class="menu-item-info">
        <span class="menu-item-name">${item.name}</span>
        <span class="menu-item-price">${item.price} DH</span>
      </div>
      <div class="menu-item-controls">
        <button class="qty-btn" onclick="updateFloorCart(${item.id},-1)">${ICONS.minus}</button>
        <span class="item-qty">${qty}</span>
        <button class="qty-btn" onclick="updateFloorCart(${item.id},1)">${ICONS.plus}</button>
      </div>
    </div>`;
  }).join('');
}
function updateFloorCart(id, delta) {
  const item = FLOOR_ITEMS.find(i=>i.id===id); if (!item) return;
  const ex = floorCart.find(i=>i.id===id);
  if (ex) { ex.qty+=delta; if (ex.qty<=0) floorCart=floorCart.filter(i=>i.id!==id); }
  else if (delta>0) floorCart.push({...item,qty:1});
  renderModalItems(); updateCartTotal();
}
window.updateFloorCart = updateFloorCart;

function updateCartTotal() {
  const total = floorCart.reduce((s,i)=>s+i.price*i.qty,0);
  document.getElementById('cart-total-display').textContent = total+' DH';
  document.getElementById('confirm-order-btn').disabled = floorCart.length===0;
}

/* ─── CONFIRM ORDER - CORRIGÉE UNIQUE VERSION ───────── */
/* ─── CONFIRM ORDER - CORRIGÉE ───────── */
const API_URL = 'http://localhost:5000/api';

async function confirmOrder() {
    if (!floorSelectedTable || floorCart.length === 0) return;

    const total = floorCart.reduce((sum, item) => sum + item.price * item.qty, 0);

    // Convertir les articles en JSON string
    const articlesJson = JSON.stringify(floorCart);

    const orderData = {
        numero_table: parseInt(floorSelectedTable.number),
        articles: articlesJson,  // ← Envoyer une string JSON, pas un objet
        total: total,
        statut: 'en_attente'
    };

    try {
        const response = await fetch(`${API_URL}/commandes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        const result = await response.json();
        
        if (result.success) {
            floorSelectedTable.status = 'busy';
            floorSelectedTable.total = total;
            floorSelectedTable.orders = [...floorCart];
            floorSelectedTable.orderTime = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
            floorSelectedTable.orderId = '#SH-' + Math.floor(1000 + Math.random() * 9000);
            floorSelectedTable.orderStatus = 'progress';

            showToastMessage(`Commande validée pour la table ${floorSelectedTable.number}`, 'success');
        } else {
            showToastMessage('Erreur lors de l\'enregistrement: ' + JSON.stringify(result), 'error');
        }
    } catch (error) {
        console.error('Erreur:', error);
        showToastMessage('Erreur de connexion au serveur - Vérifiez que node server.js est lancé', 'error');
    }

    closeOrderModal();
    renderFloorMap();
    if (dashCurrentPage === 'orders') refreshOrdersPage();
}
window.confirmOrder = confirmOrder;

function showToastMessage(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = 'shoko-toast';
  toast.innerHTML = `
    <div style="background: var(--surface-2); border-left: 3px solid ${type === 'success' ? '#4ade80' : '#f87171'}; 
                padding: 12px 20px; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
      <span style="color: var(--text-primary); font-size: 0.85rem;">${message}</span>
    </div>
  `;
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 2000;';
    document.body.appendChild(container);
  }
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

/* ─── RECEIPT from Tables page — modal popup ────────── */
function openReceiptFromMap(tableId) {
  const table = dashTables.find(t=>t.id===tableId);
  if (!table||table.status!=='busy') return;

  const old = document.getElementById('map-receipt-modal');
  if (old) old.remove();

  const modal = document.createElement('div');
  modal.id = 'map-receipt-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:500;background:rgba(0,0,0,.85);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;';
  modal.onclick = () => modal.remove();
  modal.innerHTML = `
    <div style="background:var(--surface-1);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);width:90%;max-width:420px;max-height:90vh;overflow-y:auto;" onclick="event.stopPropagation()">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:20px 24px;border-bottom:1px solid var(--border-subtle);">
        <h2 style="font-family:var(--font-display);font-size:1.6rem;font-weight:300;color:var(--gold);">Reçu — Table ${table.number}</h2>
        <button onclick="document.getElementById('map-receipt-modal').remove()" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:1.2rem;">✕</button>
      </div>
      ${buildReceiptHTML(table)}
    </div>`;
  document.getElementById('page-dashboard').appendChild(modal);
}
window.openReceiptFromMap = openReceiptFromMap;

/* ─── RECEIPT HTML builder ───────────────────────────── */
function buildReceiptHTML(table) {
  const isReady = table.orderStatus==='ready';
  return `
  <div class="receipt-card">
    <div class="receipt-head">
      <div class="receipt-brand">SHOKO</div>
      <div class="receipt-brand-sub">Lounge · Casablanca</div>
    </div>
    <div class="receipt-meta">
      <div class="receipt-meta-row"><span>Table</span><strong>${table.number}</strong></div>
      <div class="receipt-meta-row"><span>Zone</span><strong>${table.zone}</strong></div>
      <div class="receipt-meta-row"><span>Heure</span><strong>${table.orderTime||new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}</strong></div>
      ${table.orderId?`<div class="receipt-meta-row"><span>Réf.</span><strong>${table.orderId}</strong></div>`:''}
    </div>
    <div class="receipt-divider-line"></div>
    <div class="receipt-items-list">
      ${(table.orders||[]).map(item=>`
        <div class="receipt-line">
          <span class="receipt-line-name">${item.qty}&times; ${item.name}</span>
          <span class="receipt-line-price">${item.price*item.qty} DH</span>
        </div>`).join('')||'<p style="color:var(--text-muted);font-size:.8rem;text-align:center;padding:12px 0;">Aucun article</p>'}
    </div>
    <div class="receipt-divider-line"></div>
    <div class="receipt-total-row">
      <span>TOTAL</span>
      <strong>${table.total} DH</strong>
    </div>
    <div class="receipt-status-row">
      <span class="receipt-status-badge ${isReady?'status-done':'status-progress'}">
        ${isReady?'PRÊT':'EN COURS'}
      </span>
    </div>
    <div class="receipt-actions-row">
      ${!isReady?`<button class="receipt-action-btn receipt-action-btn--ready" onclick="markOrderReady(${table.id})">${ICONS.check} Marquer prêt</button>`:''}
      <button class="receipt-action-btn receipt-action-btn--close" onclick="closeTableOrder(${table.id})">${ICONS.trash} Clôturer</button>
    </div>
    <div class="receipt-thank">MERCI DE VOTRE VISITE</div>
  </div>`;
}

/* ─── markOrderReady / closeTableOrder ──────────────── */
function markOrderReady(tableId) {
  dashTables = dashTables.map(t=>t.id===tableId?{...t,orderStatus:'ready'}:t);
  const table = dashTables.find(t=>t.id===tableId);
  if (!table) return;

  const key = 'table_'+tableId;
  const inlineEl = document.getElementById('receipt-inline-'+key);
  if (inlineEl && inlineEl.style.display!=='none') {
    inlineEl.innerHTML = buildReceiptHTML(table);
  }
  const mapModal = document.getElementById('map-receipt-modal');
  if (mapModal) {
    const card = mapModal.querySelector('.receipt-card');
    if (card) card.outerHTML = buildReceiptHTML(table);
  }
  const row = document.getElementById('order-row-'+key);
  if (row) {
    const badge = row.querySelector('.order-status');
    if (badge) { badge.className='order-status status-done'; badge.textContent='Prêt'; }
  }
}
window.markOrderReady = markOrderReady;

function closeTableOrder(tableId) {
  dashTables = dashTables.map(t=>
    t.id===tableId?{...t,status:'free',orders:[],total:0,orderTime:null,orderId:null,orderStatus:null}:t);
  activeReceiptTableId = null;

  const mapModal = document.getElementById('map-receipt-modal');
  if (mapModal) mapModal.remove();

  if (dashCurrentPage==='orders') refreshOrdersPage();
  else if (dashCurrentPage==='tables') renderFloorMap();
}
window.closeTableOrder = closeTableOrder;

/* ─── ORDERS PAGE — single column, inline receipt ───── */
function renderOrdersPage() {
  activeReceiptTableId = null;
  const busyTables = dashTables.filter(t=>t.status==='busy'&&t.orders.length>0);

  const tableRows = busyTables.map(t => ({
    key: 'table_'+t.id,
    id: t.orderId||'—',
    tableLabel: 'Table '+t.number,
    items: (t.orders||[]).map(i=>`${i.qty}× ${i.name}`).join(', '),
    time: t.orderTime||'—',
    total: t.total+' DH',
    statusClass: t.orderStatus==='ready'?'status-done':'status-progress',
    statusLabel: t.orderStatus==='ready'?'Prêt':'En cours',
    tableId: t.id,
    clickable: true,
  }));

  const demoRows = dashActiveOrders.map((o,i) => ({
    key: 'demo_'+i,
    id: o.id,
    tableLabel: 'Table '+o.table,
    items: o.items,
    time: o.time,
    total: o.total+' DH',
    statusClass: o.status==='en cours'?'status-progress':'status-done',
    statusLabel: o.status==='en cours'?'En cours':'Servi',
    tableId: null,
    clickable: false,
  }));

  const allRows = [...tableRows, ...demoRows];

  return `
  <div class="dash-panel" style="grid-column:1/-1;">
    <div class="dash-panel-header">
      <span class="dash-panel-title">Commandes actives</span>
      <button class="dash-panel-action" onclick="refreshOrdersPage()">Actualiser</button>
    </div>
    <div id="orders-wrap">
      <div class="orders-list-header">
        <span>Réf.</span>
        <span>Table</span>
        <span>Articles</span>
        <span style="text-align:center;">Heure</span>
        <span style="text-align:center;">Total</span>
        <span style="text-align:right;">Statut</span>
      </div>
      ${allRows.length===0 ? `<div class="orders-empty">Aucune commande active en ce moment.</div>` :
        allRows.map(row=>`
          <div class="order-row ${row.clickable?'order-row--clickable':''}"
               id="order-row-${row.key}"
               ${row.clickable?`onclick="toggleOrderReceipt('${row.key}',${row.tableId})"`:''}
          >
            <div class="order-id">${row.id}</div>
            <div class="order-table">${row.tableLabel}</div>
            <div class="order-items">${row.items}</div>
            <div class="order-time" style="text-align:center;">${row.time}</div>
            <div class="order-total" style="text-align:center;">${row.total}</div>
            <div class="order-status ${row.statusClass}" style="justify-self:end;">${row.statusLabel}</div>
          </div>
          ${row.clickable?`<div class="order-receipt-inline" id="receipt-inline-${row.key}" style="display:none;"></div>`:''}`
        ).join('')}
    </div>
  </div>`;
}

function toggleOrderReceipt(key, tableId) {
  const inlineEl = document.getElementById('receipt-inline-'+key);
  if (!inlineEl) return;

  const isOpen = inlineEl.style.display !== 'none';

  document.querySelectorAll('.order-receipt-inline').forEach(el => { el.style.display='none'; el.innerHTML=''; });
  document.querySelectorAll('.order-row--clickable').forEach(el => el.classList.remove('order-row--active'));

  if (isOpen) { activeReceiptTableId = null; return; }

  const table = dashTables.find(t=>t.id===tableId);
  if (!table) return;

  inlineEl.innerHTML = buildReceiptHTML(table);
  inlineEl.style.display = 'block';
  const rowEl = document.getElementById('order-row-'+key);
  if (rowEl) rowEl.classList.add('order-row--active');
  activeReceiptTableId = tableId;
}
window.toggleOrderReceipt = toggleOrderReceipt;

function refreshOrdersPage() {
  const content = document.getElementById('dash-content');
  if (content) {
    content.classList.remove('dash-fade-in');
    void content.offsetWidth;
    content.classList.add('dash-fade-in');
    content.innerHTML = renderOrdersPage();
  }
}
window.refreshOrdersPage = refreshOrdersPage;

/* ─── RESERVATIONS ───────────────────────────────────── */
function renderReservationsPage() {
  const list = [
    { name:'Youssef El Mansouri', guests:4, date:'2025-01-30', time:'20:00', table:'VIP 2',    status:'confirmed' },
    { name:'Sarah Benali',        guests:2, date:'2025-01-30', time:'20:30', table:'Table 7',  status:'pending'   },
    { name:'Khalid Rachidi',      guests:6, date:'2025-01-30', time:'21:00', table:'VIP 1',    status:'vip'       },
    { name:'Nadia Hassani',       guests:3, date:'2025-01-30', time:'21:30', table:'Table 12', status:'confirmed' },
    { name:'Omar Bensouda',       guests:2, date:'2025-01-31', time:'20:00', table:'Table 5',  status:'pending'   },
  ];
  return `
  <div class="dash-panel">
    <div class="dash-panel-header">
      <span class="dash-panel-title">Réservations du soir</span>
      <button class="dash-panel-action">${ICONS.plus} Nouvelle</button>
    </div>
    <div class="res-table">
      <div class="res-table-head">
        <span>Client</span>
        <span class="res-col-center">Date</span>
        <span class="res-col-center">Heure</span>
        <span class="res-col-center">Table</span>
        <span class="res-col-center">Pers.</span>
        <span class="res-col-right">Statut</span>
      </div>
      ${list.map(r=>`
        <div class="res-table-row">
          <div class="res-name">${r.name}</div>
          <div class="res-col-center res-date">${r.date}</div>
          <div class="res-col-center res-time-val">${r.time}</div>
          <div class="res-col-center"><span class="res-table-badge">${r.table}</span></div>
          <div class="res-col-center res-guests">${r.guests}</div>
          <div class="res-col-right">
            <span class="res-badge ${r.status==='confirmed'?'badge-confirmed':r.status==='vip'?'badge-vip':'badge-pending'}">
              ${r.status==='confirmed'?'Confirmée':r.status==='vip'?'VIP':'En attente'}
            </span>
          </div>
        </div>`).join('')}
    </div>
  </div>`;
}

/* ─── STATS ──────────────────────────────────────────── */
function renderStatsPage() {
  const items = [
    { svg:ICONS.revenue,  value:'52 400', label:'Revenus DH / Mois',    change:'↑ +12%' },
    { svg:ICONS.users,    value:'284',    label:'Clients ce mois',       change:'↑ +18'  },
    { svg:ICONS.receipt2, value:'47',     label:"Commandes aujourd'hui", change:'↑ +8'   },
    { svg:ICONS.star,     value:'4.9',    label:'Note moyenne',          change:''       },
  ];
  return `
  <div class="stats-grid">
    ${items.map(s=>`
      <div class="stat-card">
        <span class="stat-card-icon">${s.svg}</span>
        <div class="stat-card-value">${s.value}</div>
        <div class="stat-card-label">${s.label}</div>
        ${s.change?`<div class="stat-card-change">${s.change}</div>`:''}
      </div>`).join('')}
  </div>
  <div class="dash-panel" style="margin-top:20px;">
    <div class="dash-panel-header"><span class="dash-panel-title">Performance mensuelle</span></div>
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:56px 24px;text-align:center;color:var(--text-muted);font-size:.85rem;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" width="40" height="40" style="color:var(--border-subtle)"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
      <p>Graphiques analytiques — disponibles en version production</p>
    </div>
  </div>`;
}

/* ─── SETTINGS ───────────────────────────────────────── */
function renderSettingsPage() {
  return `
  <div class="dash-panel">
    <div class="dash-panel-header"><span class="dash-panel-title">Paramètres du compte</span></div>
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:56px 24px;text-align:center;color:var(--text-muted);font-size:.85rem;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" width="40" height="40" style="color:var(--border-subtle)"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
      <p>Configuration du profil</p><span style="font-size:.75rem;opacity:.6;">Fonctionnalité à venir</span>
    </div>
  </div>`;
}

/* ─── MISC ───────────────────────────────────────────── */
function dashLogout() { localStorage.removeItem('shoko_user'); showPage('home'); }
window.dashLogout = dashLogout;

/* ─── INIT ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initFooter();
  const user = getUser();
  const hash = window.location.hash.replace('#','');
  if (hash==='dashboard'&&user) showPage('dashboard');
  else if (hash==='login')      showPage('login');
  else                          showPage('home');
});
