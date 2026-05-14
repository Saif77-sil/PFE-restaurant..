/* IMAGES */

const SHOKO_IMG1 =
'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/e2/51/bd/la-mise-en-place-est.jpg?w=1200&h=800&s=1';

const SHOKO_IMG2 =
'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/e2/51/c2/tout-est-dans-le-detail.jpg?w=1200&h=800&s=1';

const SHOKO_IMG3 =
'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/f3/e3/04/cadre-agreable.jpg?w=1200&h=800&s=1';

const SHOKO_IMG4 =
'https://images.otstatic.com/prod1/49700561/3/huge.jpg';

/* BACKGROUND */

const bgPhotos = [
  SHOKO_IMG1,
  SHOKO_IMG2,
  SHOKO_IMG3,
  SHOKO_IMG4
];

const stage = document.getElementById('bgStage');

let slides = [];
let cur = 0;

bgPhotos.forEach((url,i)=>{

  const el = document.createElement('div');

  el.className =
  'bg-slide' + (i===0 ? ' active' : '');

  el.style.backgroundImage = `url(${url})`;

  stage.appendChild(el);

  slides.push(el);

});

setInterval(()=>{

  slides[cur].classList.remove('active');

  cur = (cur + 1) % slides.length;

  slides[cur].classList.add('active');

},5000);

/* TABLES */

const tables = [];

const zones = [
  'Terrasse',
  'VIP',
  'Salon privé',
  'Bar Lounge',
  'Salle principale'
];

const statuses = [
  'Libre',
  'Occupée',
  'Réservée'
];

for(let i=1;i<=20;i++){

  tables.push({
    id:i,
    status:statuses[Math.floor(Math.random()*3)],
    zone:zones[Math.floor(Math.random()*5)],
    img:bgPhotos[i % bgPhotos.length]
  });

}

const clsMap = {
  'Libre':'free',
  'Occupée':'busy',
  'Réservée':'rsv'
};

function buildStats(){

  const f =
  tables.filter(t=>t.status==='Libre').length;

  const b =
  tables.filter(t=>t.status==='Occupée').length;

  const r =
  tables.filter(t=>t.status==='Réservée').length;

  document.getElementById('statRow').innerHTML = `

  <div class="stat-chip">
    <div class="s-num">${f}</div>
    <div class="s-lbl">Libres</div>
  </div>

  <div class="stat-chip">
    <div class="s-num">${b}</div>
    <div class="s-lbl">Occupées</div>
  </div>

  <div class="stat-chip">
    <div class="s-num">${r}</div>
    <div class="s-lbl">Réservées</div>
  </div>

  `;

}

function buildGrid(filter='all'){

  const grid =
  document.getElementById('tablesGrid');

  grid.innerHTML = '';

  tables
  .filter(t=>{

    if(filter==='all') return true;

    if(filter==='free')
    return t.status==='Libre';

    if(filter==='busy')
    return t.status==='Occupée';

    if(filter==='rsv')
    return t.status==='Réservée';

  })

  .forEach(t=>{

    const d =
    document.createElement('div');

    d.className =
    `table-card ${clsMap[t.status]}`;

    d.onclick = ()=>openModal(t.id);

    d.innerHTML = `

      <img src="${t.img}">

      <div class="t-overlay"></div>

      <div class="t-content">

        <div class="t-zone">
          ${t.zone}
        </div>

        <div class="t-num">
          ${String(t.id).padStart(2,'0')}
        </div>

        <div class="t-badge">
          ${t.status}
        </div>

      </div>

    `;

    grid.appendChild(d);

  });

}

document
.getElementById('filters')
.addEventListener('click',e=>{

  const btn =
  e.target.closest('button');

  if(!btn) return;

  document
  .querySelectorAll('.filters button')
  .forEach(b=>b.classList.remove('active'));

  btn.classList.add('active');

  buildGrid(btn.dataset.filter);

});

/* LOGIN */

function enterApp(){

  const u =
  document.getElementById('loginUser').value;

  const p =
  document.getElementById('loginPass').value;

  if(u==='admin' && p==='admin123'){

    document
    .getElementById('loginScreen')
    .classList.add('hidden');

    document
    .getElementById('app')
    .classList.remove('hidden');

    buildStats();

    buildGrid();

  }

}

/* MODAL */

let total = 0;

const totalAmt =
document.querySelector('.total-amt');

const ordersList =
document.getElementById('ordersList');

function openModal(id){

  document
  .getElementById('tableTitle')
  .textContent =
  `Table ${String(id).padStart(2,'0')}`;

  document
  .getElementById('modal')
  .classList.add('show');

}

function closeModal(){

  document
  .getElementById('modal')
  .classList.remove('show');

  total = 0;

  totalAmt.textContent =
  '0 DH';

}

document
.getElementById('modal')
.addEventListener('click',e=>{

  if(e.target.id==='modal'){

    closeModal();

  }

});

/* PRODUCTS */

document
.querySelectorAll('.prod-add')
.forEach(btn=>{

  btn.addEventListener('click',()=>{

    const product =
    btn.parentElement;

    const name =
    product.querySelector('h3').textContent;

    const price =
    parseInt(
    product.querySelector('p')
    .textContent);

    total += price;

    totalAmt.textContent =
    total + ' DH';

    const item =
    document.createElement('div');

    item.style.marginBottom = '10px';

    item.innerHTML =
    `${name} - ${price} DH`;

    ordersList.appendChild(item);

  });

});

/* NAVIGATION */

const navItems =
document.querySelectorAll('.nav-item');

navItems.forEach(item=>{

  item.addEventListener('click',()=>{

    navItems.forEach(n=>
      n.classList.remove('active')
    );

    item.classList.add('active');

    const pages = [
      'tablesPage',
      'ordersPage',
      'historyPage',
      'profilePage'
    ];

    pages.forEach(id=>{

      document
      .getElementById(id)
      .classList.add('hidden');

    });

    document
    .getElementById(item.dataset.page)
    .classList.remove('hidden');

  });

});