// Format NGN Currency
function formatNaira(amount) {
  if (!amount || isNaN(amount) || amount === 0) return 'Open Amount';
  return '₦' + Number(amount).toLocaleString('en-NG');
}

// Aisha's Wishlist Items
const wishlistItems = [
  // PAGE 1: GROUP FUNDS
  {
    id: 'item-1',
    title: 'A Trip to Umrah (Pilgrimage)',
    price: 3000000,
    targetGoal: 3000000,
    currentRaised: 850000,
    type: 'funding',
    category: 'Spiritual & Travel',
    page: 1,
    link: '',
    image: './assets/umrah_real.png',
    description: 'Help Aisha achieve her dream Umrah journey to Makkah & Madinah 🕋✨ Any contribution towards this spiritual journey is deeply appreciated!',
    contributors: [
      { name: 'Khadijah A.', amount: 500000, note: 'May Allah make your Umrah blessed and smooth!' },
      { name: 'Uncle Tariq', amount: 350000, note: 'Wishing you peace & barakah!' }
    ]
  },
  {
    id: 'item-2',
    title: 'Asake Live Concert Ticket',
    price: 100000,
    targetGoal: 100000,
    currentRaised: 45000,
    type: 'funding',
    category: 'Concerts & Fun',
    page: 1,
    link: 'https://asake.live',
    image: './assets/asake_real.png',
    description: 'Group crowd funding towards Aisha’s VIP/Regular ticket to see Asake live in concert! 🎤🎶',
    contributors: [
      { name: 'Farida S.', amount: 25000, note: 'You MUST dance for me there!' },
      { name: 'Yusuf B.', amount: 20000, note: 'Happy Birthday Aisha 🎉' }
    ]
  },

  // PAGE 2: FASHION & SHOES
  {
    id: 'item-3',
    title: 'Adidas Campus / Adidas Samba Sneakers',
    price: 145000,
    type: 'multi',
    category: 'Footwear & Sneakers',
    page: 2,
    link: 'https://adidas.com',
    image: './assets/adidas_real.png',
    description: 'Classic low-profile Adidas Campus or Samba sneakers (Size 38 / Color: Neutral, White or Purple accents)',
    status: 'available',
    claims: [
      { name: 'Jessica K.', note: 'Getting you the Adidas Samba in Size 38!' }
    ]
  },
  {
    id: 'item-4',
    title: 'Abaya Shopping Spree Collection',
    price: 65000,
    type: 'multi',
    category: 'Fashion & Abayas',
    page: 2,
    link: '',
    image: './assets/abaya_real.png',
    description: 'Elegant silk, linen, or open front Abayas from luxury modest boutiques. Multiple gift purchases welcome!',
    status: 'available',
    claims: [
      { name: 'Zainab & Mariam', note: 'We bought a gorgeous silk lilac Abaya!' }
    ]
  },
  {
    id: 'item-5',
    title: 'Luxury Silk Scarves & Hijab Collection',
    price: 30000,
    type: 'multi',
    category: 'Fashion & Abayas',
    page: 2,
    link: '',
    image: './assets/scarves_real.png',
    description: 'Premium satin, chiffon, and Modal silk scarves in pastel purple, nude, and champagne tones.',
    status: 'available',
    claims: []
  },

  // PAGE 3: TECH & SKINCARE
  {
    id: 'item-6',
    title: 'Slim Laptop (with Fingerprint Sensor)',
    price: 1150000,
    type: 'single',
    category: 'Tech & Gadgets',
    page: 3,
    link: 'https://slot.ng',
    image: './assets/laptop_real.png',
    description: 'Sleek, lightweight performance laptop (Apple MacBook Air Touch ID or HP Envy with fingerprint key)',
    status: 'available',
    claimedBy: null,
    claimNote: null
  },
  {
    id: 'item-7',
    title: 'New Apple Watch (iOS Watch)',
    price: 480000,
    type: 'single',
    category: 'Tech & Gadgets',
    page: 3,
    link: 'https://istore.ng',
    image: './assets/applewatch.png',
    description: 'Apple Watch Series 9 or SE (GPS / Soft Lavender or Starlight sport band)',
    status: 'available',
    claimedBy: null,
    claimNote: null
  },
  {
    id: 'item-8',
    title: 'Apple AirPods Pro (2nd Generation)',
    price: 350000,
    type: 'single',
    category: 'Tech & Gadgets',
    page: 3,
    link: 'https://istore.ng',
    image: './assets/airpods.png',
    description: 'Active Noise Cancellation, personalized spatial audio wireless earbuds',
    status: 'available',
    claimedBy: null,
    claimNote: null
  },
  {
    id: 'item-9',
    title: 'Hydrating Glow Skincare Package',
    price: 75000,
    type: 'multi',
    category: 'Beauty & Skincare',
    page: 3,
    link: '',
    image: './assets/skincare.png',
    description: 'Serum, hydrating moisturizer, essential oils & face masks set for glowing skin ✨',
    status: 'available',
    claims: []
  }
];

const initialWishMessages = [
  { name: 'Khadijah A.', message: 'May this year bring you endless peace, happiness, and your dream Umrah trip! 🕋💜' },
  { name: 'Farida & Zainab', message: 'Happy Birthday Aisha! Can’t wait to celebrate and dance with you! 🎉✨' },
  { name: 'Uncle Tariq', message: 'Wishing you wisdom, health, and barakah in all your endeavors.' }
];

// App State
let currentPageIndex = 0; // 0 to 4
const totalPages = 5;

localStorage.removeItem('aisha_clean_items');
let itemsState = wishlistItems;
let wishWallMessages = JSON.parse(localStorage.getItem('aisha_clean_wall')) || initialWishMessages;
let isAdmin = false;
let currentStyleFilter = 'all';

// DOM Elements
const pages = document.querySelectorAll('.story-page');
const stepBtns = document.querySelectorAll('.step-btn');
const pageNumSpan = document.getElementById('current-page-num');
const prevBtn = document.getElementById('prev-page-btn');
const nextBtn = document.getElementById('next-page-btn');

const dreamContainer = document.getElementById('dream-funding-container');
const styleGrid = document.getElementById('style-grid');
const essentialsGrid = document.getElementById('essentials-grid');
const wishwallGrid = document.getElementById('wishwall-grid');
const guestbookForm = document.getElementById('guestbook-form');

const statTotal = document.getElementById('stat-total');
const statAvailable = document.getElementById('stat-available');
const statReserved = document.getElementById('stat-reserved');

const claimModal = document.getElementById('claim-modal');
const claimForm = document.getElementById('claim-form');
const claimCloseBtn = document.getElementById('claim-close-btn');
const claimCancelBtn = document.getElementById('claim-cancel-btn');

const fundModal = document.getElementById('fund-modal');
const fundForm = document.getElementById('fund-form');
const fundCloseBtn = document.getElementById('fund-close-btn');
const fundCancelBtn = document.getElementById('fund-cancel-btn');

const pinModal = document.getElementById('pin-modal');
const pinForm = document.getElementById('pin-form');
const pinCloseBtn = document.getElementById('pin-close-btn');
const pinError = document.getElementById('pin-error');
const adminModeBtn = document.getElementById('admin-mode-btn');
const adminBtnText = document.getElementById('admin-btn-text');

// ANIMATED DIRECTIONAL PAGINATION LOGIC
function goToPage(pageIndex) {
  if (pageIndex < 0 || pageIndex >= totalPages) return;
  
  const isForward = pageIndex >= currentPageIndex;
  currentPageIndex = pageIndex;

  // Animate and show active page
  pages.forEach((page, idx) => {
    page.classList.remove('page-enter-next', 'page-enter-prev');
    if (idx === currentPageIndex) {
      page.classList.add('active');
      page.classList.add(isForward ? 'page-enter-next' : 'page-enter-prev');
    } else {
      page.classList.remove('active');
    }
  });

  // Update Header Nav Step Buttons
  stepBtns.forEach((btn, idx) => {
    if (idx === currentPageIndex) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update Bottom Pagination Controls
  if (pageNumSpan) {
    pageNumSpan.textContent = currentPageIndex === 0 ? 'Welcome' : `Page ${currentPageIndex}`;
  }

  if (prevBtn) {
    prevBtn.textContent = '← Prev Chapter';
    prevBtn.style.opacity = currentPageIndex === 0 ? '0.4' : '1';
    prevBtn.style.pointerEvents = currentPageIndex === 0 ? 'none' : 'auto';
  }

  if (nextBtn) {
    nextBtn.textContent = currentPageIndex === totalPages - 1 ? 'Wish Wall 💌' : 'Next Chapter ➔';
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextPage() {
  if (currentPageIndex < totalPages - 1) {
    goToPage(currentPageIndex + 1);
  }
}

function prevPage() {
  if (currentPageIndex > 0) {
    goToPage(currentPageIndex - 1);
  }
}

// Arrow Key Navigation
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextPage();
  if (e.key === 'ArrowLeft') prevPage();
});

// Save State
function saveState() {
  localStorage.setItem('aisha_clean_items', JSON.stringify(itemsState));
  localStorage.setItem('aisha_clean_wall', JSON.stringify(wishWallMessages));
  updateStats();
  renderAllSections();
}

function updateStats() {
  const total = itemsState.length;
  const available = itemsState.filter(i => {
    if (i.type === 'funding') return (i.currentRaised || 0) < (i.targetGoal || i.price);
    if (i.type === 'multi') return true;
    return i.status === 'available';
  }).length;
  const reserved = total - available;

  if (statTotal) statTotal.textContent = total;
  if (statAvailable) statAvailable.textContent = available;
  if (statReserved) statReserved.textContent = reserved;
}

function renderAllSections() {
  renderDreamsChapter();
  renderStyleChapter();
  renderEssentialsChapter();
  renderWishWall();
}

// Page 1: Group Funding
function renderDreamsChapter() {
  if (!dreamContainer) return;
  dreamContainer.innerHTML = '';

  const dreamItems = itemsState.filter(i => i.page === 1);
  dreamItems.forEach(item => {
    const target = item.targetGoal || item.price;
    const raised = item.currentRaised || 0;
    const percent = Math.min(100, Math.round((raised / target) * 100));
    const contribCount = item.contributors ? item.contributors.length : 0;

    const card = document.createElement('div');
    card.className = 'funding-card-epic';
    card.innerHTML = `
      <div class="funding-hero-img-wrap">
        <img src="${item.image}" alt="${item.title}" onerror="this.src='https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80'">
        <span class="epic-badge">Funded (${percent}%)</span>
      </div>
      <div class="funding-body">
        <h3 class="funding-title">${item.title}</h3>
        <p class="funding-desc">${item.description}</p>

        <div class="funding-meter-box">
          <div class="meter-labels">
            <span class="raised-val">Raised: ${formatNaira(raised)}</span>
            <span class="goal-val">Goal: ${formatNaira(target)}</span>
          </div>
          <div class="meter-track">
            <div class="meter-fill" style="width: ${percent}%;"></div>
          </div>
          <div class="contrib-avatars">
            ${contribCount > 0 ? `💖 ${contribCount} contributor(s) so far!` : 'Be the first to contribute to Aisha’s dream!'}
          </div>
        </div>

        <button class="btn btn-primary fund-btn" data-id="${item.id}">Contribute Any Amount (₦) 💸</button>
      </div>
    `;
    dreamContainer.appendChild(card);
  });

  document.querySelectorAll('.fund-btn').forEach(b => {
    b.addEventListener('click', (e) => openFundModal(e.target.getAttribute('data-id')));
  });
}

// Page 2: Fashion & Shoes
function renderStyleChapter() {
  if (!styleGrid) return;
  styleGrid.innerHTML = '';

  const styleItems = itemsState.filter(i => i.page === 2).filter(item => {
    if (currentStyleFilter === 'available') return item.status === 'available' || item.type === 'multi';
    if (currentStyleFilter === 'claimed') return item.status !== 'available' || (item.claims && item.claims.length > 0);
    return true;
  });

  styleItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'j-card';
    const claimCount = item.claims ? item.claims.length : 0;
    
    card.innerHTML = `
      <div class="j-card-img-wrap">
        <img src="${item.image}" alt="${item.title}" class="j-card-img">
        <span class="j-badge ${claimCount > 0 ? 'j-badge-reserved' : 'j-badge-available'}">
          ${claimCount > 0 ? `💖 ${claimCount} Gifted` : '🎁 Available'}
        </span>
      </div>
      <div class="j-card-body">
        <div class="j-card-category">${item.category}</div>
        <h3 class="j-card-title">${item.title}</h3>
        <p class="j-card-desc">${item.description}</p>
        
        ${item.claims && item.claims.length > 0 ? `
          <div style="margin-bottom:10px; padding:8px 12px; background:var(--primary-light); border-radius:8px; font-size:0.82rem; color:var(--primary);">
            ${item.claims.map(c => `<div>🎁 <strong>${c.name}:</strong> "${c.note || 'Love!'}"</div>`).join('')}
          </div>
        ` : ''}

        <div class="j-card-meta">
          ${item.link ? `<a href="${item.link}" target="_blank" class="j-card-link">Store Link ↗</a>` : '<span></span>'}
        </div>

        <button class="btn btn-primary claim-btn" data-id="${item.id}">I'm Gifting This! 🎁</button>
      </div>
    `;
    styleGrid.appendChild(card);
  });

  document.querySelectorAll('.claim-btn').forEach(b => {
    b.addEventListener('click', (e) => openClaimModal(e.target.getAttribute('data-id')));
  });
}

// Page 3: Tech & Skincare Essentials
function renderEssentialsChapter() {
  if (!essentialsGrid) return;
  essentialsGrid.innerHTML = '';

  const essentialItems = itemsState.filter(i => i.page === 3);
  essentialItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'j-card';
    const isClaimed = item.status !== 'available';

    card.innerHTML = `
      <div class="j-card-img-wrap">
        <img src="${item.image}" alt="${item.title}" class="j-card-img">
        <span class="j-badge ${isClaimed ? 'j-badge-gifted' : 'j-badge-available'}">
          ${isClaimed ? '✅ Gifted' : '🎁 Available'}
        </span>
      </div>
      <div class="j-card-body">
        <div class="j-card-category">${item.category}</div>
        <h3 class="j-card-title">${item.title}</h3>
        <p class="j-card-desc">${item.description}</p>

        ${isClaimed && item.claimedBy ? `
          <div style="margin-bottom:10px; padding:8px 12px; background:var(--primary-light); border-radius:8px; font-size:0.82rem; color:var(--primary);">
            <span>Gifted by: <strong>${item.claimedBy}</strong></span>
            ${item.claimNote ? `<div style="font-style:italic;">"${item.claimNote}"</div>` : ''}
          </div>
        ` : ''}

        <div class="j-card-meta">
          ${item.link ? `<a href="${item.link}" target="_blank" class="j-card-link">Store Link ↗</a>` : '<span></span>'}
        </div>

        ${!isClaimed ? `
          <button class="btn btn-primary claim-btn" data-id="${item.id}">I'm Gifting This! 🎁</button>
        ` : `
          <button class="btn btn-outline" disabled>Already Claimed 💖</button>
        `}
      </div>
    `;
    essentialsGrid.appendChild(card);
  });

  document.querySelectorAll('.claim-btn').forEach(b => {
    b.addEventListener('click', (e) => openClaimModal(e.target.getAttribute('data-id')));
  });
}

// Page 4: Wish Wall
function renderWishWall() {
  if (!wishwallGrid) return;
  wishwallGrid.innerHTML = '';

  wishWallMessages.forEach(msg => {
    const card = document.createElement('div');
    card.className = 'wish-card-bubble';
    card.innerHTML = `
      <div class="wish-author">💌 ${msg.name}</div>
      <div class="wish-text">"${msg.message}"</div>
    `;
    wishwallGrid.appendChild(card);
  });
}

// Form Handlers
if (guestbookForm) {
  guestbookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('gb-name').value;
    const message = document.getElementById('gb-message').value;

    if (name && message) {
      wishWallMessages.unshift({ name, message });
      saveState();

      if (typeof confetti === 'function') {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.8 } });
      }

      guestbookForm.reset();
    }
  });
}

// Claim Modal Logic
function openClaimModal(id) {
  const item = itemsState.find(i => i.id === id);
  if (!item) return;

  document.getElementById('claim-item-id').value = item.id;
  document.getElementById('claim-item-title').textContent = `Gift "${item.title}"`;
  document.getElementById('claimer-name').value = '';
  document.getElementById('claimer-note').value = '';
  claimModal.classList.remove('hidden');
}

claimForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = document.getElementById('claim-item-id').value;
  const name = document.getElementById('claimer-name').value;
  const status = document.getElementById('claim-status').value;
  const note = document.getElementById('claimer-note').value;

  const item = itemsState.find(i => i.id === id);
  if (item) {
    if (item.type === 'multi') {
      if (!item.claims) item.claims = [];
      item.claims.push({ name, note });
    } else {
      item.status = status;
      item.claimedBy = name;
      item.claimNote = note;
    }
    saveState();

    if (typeof confetti === 'function') {
      confetti({ particleCount: 120, spread: 80, colors: ['#8b5cf6', '#d97706', '#ffffff'] });
    }

    claimModal.classList.add('hidden');
  }
});

claimCloseBtn.addEventListener('click', () => claimModal.classList.add('hidden'));
claimCancelBtn.addEventListener('click', () => claimModal.classList.add('hidden'));

// Fund Modal Logic
function openFundModal(id) {
  const item = itemsState.find(i => i.id === id);
  if (!item) return;

  document.getElementById('fund-item-id').value = item.id;
  document.getElementById('fund-item-title').textContent = `Contribute to "${item.title}"`;
  document.getElementById('funder-name').value = '';
  document.getElementById('fund-amount').value = '';
  document.getElementById('funder-note').value = '';
  fundModal.classList.remove('hidden');
}

fundForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = document.getElementById('fund-item-id').value;
  const name = document.getElementById('funder-name').value;
  const amount = parseFloat(document.getElementById('fund-amount').value) || 0;
  const note = document.getElementById('funder-note').value;

  const item = itemsState.find(i => i.id === id);
  if (item && amount > 0) {
    item.currentRaised = (item.currentRaised || 0) + amount;
    if (!item.contributors) item.contributors = [];
    item.contributors.push({ name, amount, note });
    saveState();

    if (typeof confetti === 'function') {
      confetti({ particleCount: 150, spread: 90, colors: ['#8b5cf6', '#d97706', '#ffffff'] });
    }

    fundModal.classList.add('hidden');
  }
});

fundCloseBtn.addEventListener('click', () => fundModal.classList.add('hidden'));
fundCancelBtn.addEventListener('click', () => fundModal.classList.add('hidden'));

// Admin PIN Logic
adminModeBtn.addEventListener('click', () => {
  if (isAdmin) {
    isAdmin = false;
    adminBtnText.textContent = 'Admin';
    renderAllSections();
  } else {
    pinModal.classList.remove('hidden');
    document.getElementById('pin-input').value = '';
    pinError.classList.add('hidden');
  }
});

pinForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputPin = document.getElementById('pin-input').value;
  if (inputPin === '1234') {
    isAdmin = true;
    adminBtnText.textContent = 'Exit Admin';
    pinModal.classList.add('hidden');
    renderAllSections();
  } else {
    pinError.classList.remove('hidden');
  }
});

pinCloseBtn.addEventListener('click', () => pinModal.classList.add('hidden'));

// Style Tabs Filter
document.querySelectorAll('.j-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.j-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentStyleFilter = tab.getAttribute('data-filter');
    renderStyleChapter();
  });
});

// Countdown Timer Logic - Aisha's Birthday: December 2nd
function startCountdown() {
  const currentYear = new Date().getFullYear();
  let targetDate = new Date(`${currentYear}-12-02T00:00:00`);
  if (new Date() > targetDate) {
    targetDate = new Date(`${currentYear + 1}-12-02T00:00:00`);
  }

  function updateTimer() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);

    document.getElementById('days').textContent = d < 10 ? '0' + d : d;
    document.getElementById('hours').textContent = h < 10 ? '0' + h : h;
    document.getElementById('minutes').textContent = m < 10 ? '0' + m : m;
    document.getElementById('seconds').textContent = s < 10 ? '0' + s : s;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// 1-Click Share Button
const shareBtn = document.getElementById('share-btn');
if (shareBtn) {
  shareBtn.addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({
        title: "Aisha's Birthday Wishlist",
        text: "Explore Aisha's birthday wishlist!",
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("✨ Link copied to clipboard! Share Aisha's wishlist with friends.");
    }
  });
}

// Initial Setup
updateStats();
renderAllSections();
goToPage(0);
startCountdown();
