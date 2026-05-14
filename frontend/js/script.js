// DONNÉES
const TABLE_PHOTOS = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=350&fit=crop',
  'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&h=350&fit=crop',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=350&fit=crop',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&h=350&fit=crop',
  'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=500&h=350&fit=crop',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&h=350&fit=crop',
  'https://images.unsplash.com/photo-1481833761820-0509d3217039?w=500&h=350&fit=crop',
  'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=500&h=350&fit=crop',
];

const VIEWS = [
  'Vue sur la piscine centrale',
  'Vue panoramique sur le jardin',
  'Terrasse côté fontaine',
  'Vue sur la scène live',
  'Coin intime & lounge',
  'Vue dégagée sur l\'entrée',
  'Terrasse végétalisée',
  'Table VIP privée',
];

const PRODUCTS = [
  { id: 1, name: 'Café', price: 3, category: 'boissons', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=150&h=100&fit=crop' },
  { id: 2, name: 'Thé à la menthe', price: 4, category: 'boissons', img: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=150&h=100&fit=crop' },
  { id: 3, name: 'Jus d\'orange', price: 5, category: 'boissons', img: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=150&h=100&fit=crop' },
  { id: 4, name: 'Coca-Cola', price: 3, category: 'boissons', img: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=150&h=100&fit=crop' },
  { id: 5, name: 'Salade César', price: 12, category: 'entrees', img: 'https://images.unsplash.com/photo-1550304943-4f24f54dd72a?w=150&h=100&fit=crop' },
  { id: 6, name: 'Pizza Margherita', price: 10, category: 'plats', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d232?w=150&h=100&fit=crop' },
  { id: 7, name: 'Pizza 4 fromages', price: 12, category: 'plats', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150&h=100&fit=crop' },
  { id: 8, name: 'Burger', price: 14, category: 'plats', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150&h=100&fit=crop' },
  { id: 9, name: 'Pâtes Carbonara', price: 11, category: 'plats', img: 'https://images.unsplash.com/photo-1645112411344-3a6f330d7a1c?w=150&h=100&fit=crop' },
  { id: 10, name: 'Poisson grillé', price: 16, category: 'plats', img: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=150&h=100&fit=crop' },
  { id: 11, name: 'Tiramisu', price: 6, category: 'desserts', img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=150&h=100&fit=crop' },
  { id: 12, name: 'Glace vanille', price: 5, category: 'desserts', img: 'https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=150&h=100&fit=crop' },
];

const TABLES = [
  { id: 1, name: 'Table 1', status: 'libre', cap: '2-4', viewIndex: 0, order: [] },
  { id: 2, name: 'Table 2', status: 'occupee', cap: '4-6', viewIndex: 1, order: [{ productId: 1, name: 'Café', price: 3, qty: 2 }] },
  { id: 3, name: 'Table 3', status: 'reservee', cap: '2-4', viewIndex: 2, order: [] },
  { id: 4, name: 'Table 4', status: 'libre', cap: '4-6', viewIndex: 3, order: [] },
  { id: 5, name: 'Table 5', status: 'occupee', cap: '2-4', viewIndex: 4, order: [{ productId: 3, name: 'Jus orange', price: 5, qty: 2 }] },
  { id: 6, name: 'Table 6', status: 'occupee', cap: '4-8', viewIndex: 5, order: [] },
  { id: 7, name: 'Table 7', status: 'libre', cap: '2-4', viewIndex: 6, order: [] },
  { id: 8, name: 'Table 8', status: 'reservee', cap: '6-8', viewIndex: 7, order: [] },
];

const STATUS_COL = { libre: '#4ab86c', occupee: '#b83c30', reservee: '#d4a44c' };
const STATUS_FR = { libre: 'Libre', occupee: 'Occupée', reservee: 'Réservée' };

let activeIndex = 2;
let selectedId = null;
let currentCategory = 'all';
let tempOrder = [];

function showToast(msg, isError = false) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.style.display = 'block';
  toast.style.background = isError ? '#8b0000cc' : '#1a1a2ecc';
  setTimeout(() => toast.style.display = 'none', 2500);
}

function updateStats() {
  document.getElementById('statLibre').textContent = TABLES.filter(t => t.status === 'libre').length;
  document.getElementById('statOccupee').textContent = TABLES.filter(t => t.status === 'occupee').length;
  document.getElementById('statReservee').textContent = TABLES.filter(t => t.status === 'reservee').length;
}

function buildArcSlider() {
  const arcSlider = document.getElementById('arc-slider');
  arcSlider.innerHTML = '';
  
  TABLES.forEach((table, index) => {
    const card = document.createElement('div');
    card.className = 'arc-card';
    card.innerHTML = `
      <div class="arc-photo" style="background-image: url('${TABLE_PHOTOS[index]}')"></div>
      <div class="arc-overlay"></div>
      <div class="arc-status" style="background: ${STATUS_COL[table.status]};"></div>
      <div class="arc-info">
        <div class="arc-title">${table.name}</div>
        <div class="arc-sub" style="color: ${STATUS_COL[table.status]}">${STATUS_FR[table.status]}</div>
      </div>
    `;
    card.onclick = () => {
      activeIndex = index;
      updateArcPosition();
      openPopup(table.id);
    };
    arcSlider.appendChild(card);
  });
  updateArcPosition();
}

function updateArcPosition() {
  const cards = document.querySelectorAll('.arc-card');
  cards.forEach((card, index) => {
    card.className = 'arc-card';
    const diff = index - activeIndex;
    if (diff === 0) card.classList.add('active');
    else if (diff === -1) card.classList.add('left-1');
    else if (diff === -2) card.classList.add('left-2');
    else if (diff === 1) card.classList.add('right-1');
    else if (diff === 2) card.classList.add('right-2');
    else card.classList.add('hidden');
  });
}

function openPopup(id) {
  const table = TABLES.find(t => t.id === id);
  if (!table) return;
  selectedId = id;
  
  const idx = table.id - 1;
  document.getElementById('popupImg').src = TABLE_PHOTOS[idx];
  document.getElementById('popupTitle').textContent = table.name;
  document.getElementById('popupView').textContent = VIEWS[table.viewIndex];
  document.getElementById('popupStatus').textContent = STATUS_FR[table.status];
  document.getElementById('popupDot').style.background = STATUS_COL[table.status];
  
  updateOrderDisplay();
  
  const actionBtn = document.getElementById('actionBtn');
  if (table.status === 'libre') actionBtn.textContent = '✅ Réserver';
  else if (table.status === 'reservee') actionBtn.textContent = '👥 Installer';
  else actionBtn.textContent = '🔓 Libérer';
  
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('popup').style.display = 'block';
}

function closePopup() {
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('popup').style.display = 'none';
  selectedId = null;
}

function updateOrderDisplay() {
  const table = TABLES.find(t => t.id === selectedId);
  if (!table) return;
  const container = document.getElementById('orderItemsList');
  const totalSpan = document.getElementById('orderTotal');
  
  if (!table.order || table.order.length === 0) {
    container.innerHTML = '<div style="color:#a08050;text-align:center;padding:10px">Aucun article</div>';
    totalSpan.textContent = 'Total: 0 €';
    return;
  }
  let total = 0;
  container.innerHTML = table.order.map(item => {
    total += item.price * item.qty;
    return `<div class="order-item"><span>${item.name} x${item.qty}</span><span>${item.price * item.qty}€</span></div>`;
  }).join('');
  totalSpan.textContent = `Total: ${total} €`;
}

function applyStatusChange() {
  const table = TABLES.find(t => t.id === selectedId);
  if (!table) return;
  
  let newStatus = '';
  if (table.status === 'libre') newStatus = 'reservee';
  else if (table.status === 'reservee') newStatus = 'occupee';
  else newStatus = 'libre';
  
  table.status = newStatus;
  if (newStatus === 'libre') table.order = [];
  
  updateStats();
  updateArcPosition();
  updateOrderDisplay();
  showToast(`Table ${table.name} : ${STATUS_FR[newStatus]}`);
  closePopup();
}

function openOrderModal() {
  const table = TABLES.find(t => t.id === selectedId);
  if (!table) return;
  document.getElementById('modalTableTitle').textContent = table.name;
  tempOrder = JSON.parse(JSON.stringify(table.order || []));
  renderCategories();
  renderProducts();
  document.getElementById('orderModal').style.display = 'flex';
}

function closeOrderModal() {
  document.getElementById('orderModal').style.display = 'none';
  tempOrder = [];
}

function renderCategories() {
  const container = document.getElementById('categoriesFilter');
  const categories = [...new Set(PRODUCTS.map(p => p.category))];
  container.innerHTML = '<div class="filter-chip active" data-category="all">📋 Tous</div>';
  const catNames = { boissons: '🍹 Boissons', entrees: '🥗 Entrées', plats: '🍽️ Plats', desserts: '🍰 Desserts' };
  categories.forEach(cat => {
    container.innerHTML += `<div class="filter-chip" data-category="${cat}">${catNames[cat] || cat}</div>`;
  });
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentCategory = chip.dataset.category;
      renderProducts();
    });
  });
}

function renderProducts() {
  const container = document.getElementById('productsGrid');
  let filtered = PRODUCTS;
  if (currentCategory !== 'all') filtered = PRODUCTS.filter(p => p.category === currentCategory);
  container.innerHTML = filtered.map(product => {
    const existing = tempOrder.find(i => i.productId === product.id);
    const qty = existing ? existing.qty : 0;
    return `
      <div class="product-item">
        <img class="product-img" src="${product.img}" alt="${product.name}">
        <div class="product-name">${product.name}</div>
        <div class="product-price">${product.price} €</div>
        <div class="quantity-selector">
          <button class="qty-btn" onclick="changeQty(${product.id}, -1)">-</button>
          <span class="qty-value" id="qty-${product.id}">${qty}</span>
          <button class="qty-btn" onclick="changeQty(${product.id}, 1)">+</button>
        </div>
      </div>
    `;
  }).join('');
}

window.changeQty = (productId, delta) => {
  const product = PRODUCTS.find(p => p.id === productId);
  const existing = tempOrder.find(i => i.productId === productId);
  if (existing) {
    const newQty = existing.qty + delta;
    if (newQty <= 0) tempOrder = tempOrder.filter(i => i.productId !== productId);
    else existing.qty = newQty;
  } else if (delta > 0) {
    tempOrder.push({ productId: product.id, name: product.name, price: product.price, qty: 1 });
  }
  const qtySpan = document.getElementById(`qty-${productId}`);
  if (qtySpan) {
    const newExisting = tempOrder.find(i => i.productId === productId);
    qtySpan.textContent = newExisting ? newExisting.qty : 0;
  }
};

function confirmOrder() {
  const table = TABLES.find(t => t.id === selectedId);
  if (!table) return;
  table.order = [...tempOrder];
  if (table.order.length > 0 && table.status === 'libre') {
    table.status = 'occupee';
  }
  updateOrderDisplay();
  updateStats();
  updateArcPosition();
  closeOrderModal();
  showToast(`✅ Commande enregistrée pour ${table.name}`);
}

// Navigation
document.getElementById('prevBtn').onclick = () => {
  activeIndex--;
  if (activeIndex < 0) activeIndex = TABLES.length - 1;
  updateArcPosition();
};

document.getElementById('nextBtn').onclick = () => {
  activeIndex++;
  if (activeIndex >= TABLES.length) activeIndex = 0;
  updateArcPosition();
};

window.addEventListener('wheel', (e) => {
  if (e.deltaY > 0) {
    activeIndex++;
    if (activeIndex >= TABLES.length) activeIndex = 0;
  } else {
    activeIndex--;
    if (activeIndex < 0) activeIndex = TABLES.length - 1;
  }
  updateArcPosition();
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    activeIndex++;
    if (activeIndex >= TABLES.length) activeIndex = 0;
    updateArcPosition();
  }
  if (e.key === 'ArrowLeft') {
    activeIndex--;
    if (activeIndex < 0) activeIndex = TABLES.length - 1;
    updateArcPosition();
  }
  if (e.key === 'Escape') {
    closePopup();
    closeOrderModal();
  }
});

// Initialisation
buildArcSlider();
updateStats();