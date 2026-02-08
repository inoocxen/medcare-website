/* =========================================
   Medical E-commerce JavaScript
   Features: Dark Mode, Search Modal, Cart,
   Filters, Wishlist, localStorage, Language
   ========================================= */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initDarkMode();
  initNavbar();
  initSearchModal();
  initSeeMore();
  initProductCards();
  initFilters();
  initQuantityControls();
  initCart();
  initProductGallery();
  updateCartBadge();
  initMobileFilter();
  initLanguageSwitch();
  initMobileDrawer();
});

/* ---------- Translation Dictionary ---------- */
const translations = {
  th: {
    // Navbar
    'nav.home': 'หน้าหลัก',
    'nav.products': 'สินค้า',
    'nav.about': 'เกี่ยวกับเรา',
    'nav.contact': 'ติดต่อ',
    'nav.account': 'บัญชี',
    'nav.cart': 'ตะกร้า',
    'nav.search': 'ค้นหา',
    'nav.menu': 'เมนู',
    
    // Common buttons
    'btn.add_to_cart': 'เพิ่มลงตะกร้า',
    'btn.buy_now': 'ซื้อเลย',
    'btn.see_more': 'ดูเพิ่มเติม',
    'btn.see_less': 'ดูน้อยลง',
    'btn.filter': 'ตัวกรอง',
    'btn.clear_all': 'ล้างทั้งหมด',
    'btn.checkout': 'ชำระเงิน',
    'btn.continue_shopping': 'เลือกซื้อต่อ',
    
    // Settings
    'setting.dark_mode': 'โหมดมืด',
    'setting.language': 'ภาษา',
    
    // Footer
    'footer.rights': 'สงวนลิขสิทธิ์',
    
    // Search
    'search.placeholder': 'ค้นหาสินค้า...',
    
    // Cart
    'cart.empty': 'ตะกร้าว่างเปล่า',
    'cart.total': 'รวมทั้งหมด',
    'cart.subtotal': 'ยอดรวม',
    'cart.shipping': 'ค่าจัดส่ง',
    'cart.free': 'ฟรี',
    
    // Reviews
    'reviews.title': 'รีวิวจากลูกค้า',
    'reviews.verified': 'ยืนยันแล้ว',
    
    // Product
    'product.quantity': 'จำนวน',
    'product.about': 'เกี่ยวกับสินค้า',
    'product.related': 'สินค้าที่เกี่ยวข้อง'
  },
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.account': 'Account',
    'nav.cart': 'Cart',
    'nav.search': 'Search',
    'nav.menu': 'Menu',
    
    // Common buttons
    'btn.add_to_cart': 'Add to Cart',
    'btn.buy_now': 'Buy Now',
    'btn.see_more': 'See More',
    'btn.see_less': 'See Less',
    'btn.filter': 'Filter',
    'btn.clear_all': 'Clear All',
    'btn.checkout': 'Checkout',
    'btn.continue_shopping': 'Continue Shopping',
    
    // Settings
    'setting.dark_mode': 'Dark Mode',
    'setting.language': 'Language',
    
    // Footer
    'footer.rights': 'All rights reserved',
    
    // Search
    'search.placeholder': 'Search products...',
    
    // Cart
    'cart.empty': 'Your cart is empty',
    'cart.total': 'Total',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping',
    'cart.free': 'Free',
    
    // Reviews
    'reviews.title': 'Customer Reviews',
    'reviews.verified': 'Verified',
    
    // Product
    'product.quantity': 'Quantity',
    'product.about': 'About This Item',
    'product.related': 'Related Products'
  }
};

/* ---------- Language Switch ---------- */
function initLanguageSwitch() {
  const currentLang = localStorage.getItem('medcare_lang') || 'th';
  setLanguage(currentLang);
  
  // Desktop language toggle (click to toggle between th and en)
  const langToggle = document.querySelector('.lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', function() {
      const storedLang = localStorage.getItem('medcare_lang') || 'th';
      const newLang = storedLang === 'th' ? 'en' : 'th';
      localStorage.setItem('medcare_lang', newLang);
      location.reload();
    });
  }
  
  // Mobile language selector buttons
  const langButtons = document.querySelectorAll('.lang-selector button');
  langButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.dataset.lang;
      localStorage.setItem('medcare_lang', lang);
      location.reload();
    });
  });
}

function setLanguage(lang) {
  document.documentElement.lang = lang;
  
  // Update lang toggle button text
  const langCodeEl = document.querySelector('.lang-toggle .lang-code');
  if (langCodeEl) {
    langCodeEl.textContent = lang.toUpperCase();
  }
  
  // Update lang selector active state
  const langButtons = document.querySelectorAll('.lang-selector button');
  langButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  
  // Translate elements with data-i18n attribute
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  
  // Translate placeholders
  const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
  placeholders.forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });
}

function t(key) {
  const lang = localStorage.getItem('medcare_lang') || 'th';
  return translations[lang] && translations[lang][key] ? translations[lang][key] : key;
}

/* ---------- Mobile Drawer ---------- */
function initMobileDrawer() {
  const toggle = document.querySelector('.navbar-mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  const closeBtn = document.querySelector('.mobile-drawer-close');
  
  if (!toggle || !drawer) return;
  
  function openDrawer() {
    drawer.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeDrawer() {
    drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  toggle.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);
  
  // Dark mode toggle in drawer
  const darkModeToggle = document.getElementById('drawer-dark-mode');
  if (darkModeToggle) {
    const isDark = document.body.classList.contains('dark-mode');
    darkModeToggle.classList.toggle('active', isDark);
    
    darkModeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      this.classList.toggle('active');
      localStorage.setItem('medcare_theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
  }
}


/* ---------- Mobile Filter Toggle ---------- */
function initMobileFilter() {
  const filterToggleBtn = document.getElementById('filter-toggle-btn');
  const filterSidebar = document.getElementById('filter-sidebar');
  const filterOverlay = document.getElementById('filter-overlay');
  const filterCloseBtn = document.getElementById('filter-close-btn');
  
  if (!filterToggleBtn || !filterSidebar) return;
  
  // Open filter
  filterToggleBtn.addEventListener('click', function() {
    filterSidebar.classList.add('active');
    filterOverlay.classList.add('active');
    filterToggleBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  // Close filter
  function closeFilter() {
    filterSidebar.classList.remove('active');
    filterOverlay.classList.remove('active');
    filterToggleBtn.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  if (filterCloseBtn) {
    filterCloseBtn.addEventListener('click', closeFilter);
  }
  
  if (filterOverlay) {
    filterOverlay.addEventListener('click', closeFilter);
  }
}

/* ---------- Cart Storage ---------- */
function getCart() {
  const cart = localStorage.getItem('medcare_cart');
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem('medcare_cart', JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(product) {
  const cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingIndex > -1) {
    cart[existingIndex].quantity += product.quantity || 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: product.quantity || 1
    });
  }
  
  saveCart(cart);
  return cart;
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  return cart;
}

function updateCartItemQuantity(productId, quantity) {
  const cart = getCart();
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = Math.max(1, quantity);
    saveCart(cart);
  }
  return cart;
}

function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-badge, #cart-count');
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  badges.forEach(badge => {
    badge.textContent = totalItems;
  });
}

/* ---------- Wishlist Storage ---------- */
function getWishlist() {
  const wishlist = localStorage.getItem('medcare_wishlist');
  return wishlist ? JSON.parse(wishlist) : [];
}

function saveWishlist(wishlist) {
  localStorage.setItem('medcare_wishlist', JSON.stringify(wishlist));
}

function toggleWishlist(productId) {
  let wishlist = getWishlist();
  const index = wishlist.indexOf(productId);
  
  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(productId);
  }
  
  saveWishlist(wishlist);
  return wishlist.includes(productId);
}

function isInWishlist(productId) {
  return getWishlist().includes(productId);
}

/* ---------- Dark Mode ---------- */
function initDarkMode() {
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  } else if (prefersDark.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  }
  
  // Toggle theme on click
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;
  
  const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  
  const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  
  themeToggle.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
}

/* ---------- Navbar ---------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
  
  // Mobile menu toggle
  const mobileToggle = document.querySelector('.navbar-mobile-toggle');
  const navMenu = document.querySelector('.navbar-nav');
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }
}

/* ---------- Search Modal ---------- */
function initSearchModal() {
  const searchBtn = document.getElementById('search-btn');
  const searchModal = document.getElementById('search-modal');
  const searchClose = document.querySelector('.search-close');
  const searchInput = document.querySelector('.search-input');
  const searchBackdrop = document.querySelector('.search-modal-backdrop');
  
  if (!searchBtn || !searchModal) return;
  
  // Open modal
  searchBtn.addEventListener('click', function() {
    searchModal.classList.add('active');
    if (searchInput) searchInput.focus();
    document.body.style.overflow = 'hidden';
  });
  
  // Close modal
  function closeSearchModal() {
    searchModal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  if (searchClose) {
    searchClose.addEventListener('click', closeSearchModal);
  }
  
  if (searchBackdrop) {
    searchBackdrop.addEventListener('click', closeSearchModal);
  }
  
  // Close with ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && searchModal.classList.contains('active')) {
      closeSearchModal();
    }
  });
  
  // Search tags click
  const searchTags = document.querySelectorAll('.search-tag');
  searchTags.forEach(tag => {
    tag.addEventListener('click', function() {
      if (searchInput) {
        searchInput.value = this.textContent;
        // Navigate to products with search
        window.location.href = `products.html?search=${encodeURIComponent(this.textContent)}`;
      }
    });
  });
}

/* ---------- See More / See Less ---------- */
function initSeeMore() {
  const seeMoreButtons = document.querySelectorAll('.see-more-btn');
  
  seeMoreButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const target = document.getElementById(targetId);
      
      if (target) {
        target.classList.toggle('collapsed');
        this.classList.toggle('expanded');
        
        const isExpanded = !target.classList.contains('collapsed');
        this.innerHTML = isExpanded 
          ? `See Less <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>`
          : `See More <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
      }
    });
  });
}

/* ---------- Product Cards ---------- */
function initProductCards() {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    // Initialize wishlist state
    const wishlistBtn = card.querySelector('.product-wishlist');
    if (wishlistBtn) {
      const productId = wishlistBtn.getAttribute('data-id');
      if (productId && isInWishlist(productId)) {
        wishlistBtn.classList.add('active');
        const svg = wishlistBtn.querySelector('svg');
        if (svg) {
          svg.style.fill = '#ef4444';
          svg.style.color = '#ef4444';
        }
      }
      
      wishlistBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const productId = this.getAttribute('data-id');
        const isNowInWishlist = toggleWishlist(productId);
        
        this.classList.toggle('active', isNowInWishlist);
        const svg = this.querySelector('svg');
        if (svg) {
          svg.style.fill = isNowInWishlist ? '#ef4444' : 'none';
          svg.style.color = isNowInWishlist ? '#ef4444' : '';
        }
        
        // Show feedback
        showToast(isNowInWishlist ? 'เพิ่มในรายการโปรดแล้ว' : 'ลบออกจากรายการโปรดแล้ว');
      });
    }
    
    // Quick add button
    const quickAddBtn = card.querySelector('.product-quick-add');
    if (quickAddBtn) {
      quickAddBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const product = {
          id: this.getAttribute('data-id'),
          name: this.getAttribute('data-name'),
          price: parseFloat(this.getAttribute('data-price')),
          image: this.getAttribute('data-image'),
          quantity: 1
        };
        
        addToCart(product);
        
        // Add to cart animation
        this.textContent = 'เพิ่มแล้ว!';
        this.style.background = '#22c55e';
        
        // Show toast and redirect option
        showToast('เพิ่มลงตะกร้าแล้ว', true);
        
        // Reset button after delay
        setTimeout(() => {
          this.textContent = 'Quick Add';
          this.style.background = '';
        }, 1500);
      });
    }
  });
}

/* ---------- Toast Notification ---------- */
function showToast(message, showCartLink = false) {
  // Remove existing toast
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span>${message}</span>
    ${showCartLink ? '<a href="cart.html" class="toast-link">ไปที่ตะกร้า →</a>' : ''}
    <button class="toast-close">&times;</button>
  `;
  
  document.body.appendChild(toast);
  
  // Show toast
  setTimeout(() => toast.classList.add('show'), 10);
  
  // Close button
  toast.querySelector('.toast-close').addEventListener('click', () => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  });
  
  // Auto remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ---------- Filters (Products Page) ---------- */
function initFilters() {
  const filterCheckboxes = document.querySelectorAll('.filter-checkbox input, .filter-option input');
  const productCards = document.querySelectorAll('.product-card[data-category]');
  const priceMinInput = document.getElementById('price-min');
  const priceMaxInput = document.getElementById('price-max');
  const filterClearBtn = document.querySelector('.filter-clear');
  
  if (filterCheckboxes.length === 0 || productCards.length === 0) return;
  
  function applyFilters() {
    // Get selected categories
    const selectedCategories = Array.from(document.querySelectorAll('.filter-group:first-child .filter-option input:checked, [data-filter="category"]:checked'))
      .map(cb => cb.value.toLowerCase());
    
    // Get selected lifestyles
    const selectedLifestyles = Array.from(document.querySelectorAll('.filter-group:nth-child(2) .filter-option input:checked, [data-filter="lifestyle"]:checked'))
      .map(cb => cb.value.toLowerCase());
    
    // Get price range
    const minPrice = priceMinInput ? parseFloat(priceMinInput.value) || 0 : 0;
    const maxPrice = priceMaxInput ? parseFloat(priceMaxInput.value) || Infinity : Infinity;
    
    let visibleCount = 0;
    
    productCards.forEach(card => {
      const cardCategory = (card.getAttribute('data-category') || '').toLowerCase();
      const cardLifestyles = (card.getAttribute('data-lifestyle') || '').toLowerCase().split(',');
      const cardPrice = parseFloat(card.getAttribute('data-price')) || 0;
      
      let showByCategory = selectedCategories.length === 0 || selectedCategories.includes(cardCategory);
      let showByLifestyle = selectedLifestyles.length === 0 || selectedLifestyles.some(l => cardLifestyles.includes(l));
      let showByPrice = cardPrice >= minPrice && cardPrice <= maxPrice;
      
      if (showByCategory && showByLifestyle && showByPrice) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    
    // Update results count
    const resultsCount = document.querySelector('.results-count');
    if (resultsCount) {
      resultsCount.textContent = `${visibleCount} สินค้า`;
    }
  }
  
  // Add event listeners to filter checkboxes
  filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
  });
  
  // Add event listeners to price inputs
  if (priceMinInput) {
    priceMinInput.addEventListener('input', debounce(applyFilters, 300));
  }
  if (priceMaxInput) {
    priceMaxInput.addEventListener('input', debounce(applyFilters, 300));
  }
  
  // Clear all filters
  if (filterClearBtn) {
    filterClearBtn.addEventListener('click', function() {
      filterCheckboxes.forEach(cb => cb.checked = false);
      if (priceMinInput) priceMinInput.value = '';
      if (priceMaxInput) priceMaxInput.value = '';
      applyFilters();
    });
  }
  
  // Check URL params for initial filter
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  if (categoryParam) {
    const checkbox = document.querySelector(`[value="${categoryParam}"]`);
    if (checkbox) {
      checkbox.checked = true;
      applyFilters();
    }
  }
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/* ---------- Quantity Controls ---------- */
function initQuantityControls() {
  const quantityControls = document.querySelectorAll('.quantity-control');
  
  quantityControls.forEach(control => {
    const minusBtn = control.querySelector('.quantity-minus');
    const plusBtn = control.querySelector('.quantity-plus');
    const input = control.querySelector('.quantity-input');
    
    if (minusBtn && input) {
      minusBtn.addEventListener('click', function() {
        const currentValue = parseInt(input.value) || 1;
        if (currentValue > 1) {
          input.value = currentValue - 1;
          input.dispatchEvent(new Event('change'));
        }
      });
    }
    
    if (plusBtn && input) {
      plusBtn.addEventListener('click', function() {
        const currentValue = parseInt(input.value) || 1;
        input.value = currentValue + 1;
        input.dispatchEvent(new Event('change'));
      });
    }
  });
}

/* ---------- Cart Page ---------- */
function initCart() {
  const cartContainer = document.querySelector('.cart-items');
  if (!cartContainer) return;
  
  renderCart();
}

function renderCart() {
  const cartContainer = document.querySelector('.cart-items');
  const cartEmptyMsg = document.querySelector('.cart-empty');
  const cartSummary = document.querySelector('.cart-summary');
  
  if (!cartContainer) return;
  
  const cart = getCart();
  
  if (cart.length === 0) {
    cartContainer.innerHTML = '';
    if (cartEmptyMsg) cartEmptyMsg.style.display = 'block';
    if (cartSummary) cartSummary.style.display = 'none';
    return;
  }
  
  if (cartEmptyMsg) cartEmptyMsg.style.display = 'none';
  if (cartSummary) cartSummary.style.display = 'block';
  
  cartContainer.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h3 class="cart-item-title">${item.name}</h3>
        <div class="cart-item-price">
          <span class="current">฿${item.price.toLocaleString()}</span>
        </div>
      </div>
      <div class="cart-item-actions">
        <div class="quantity-control">
          <button class="quantity-btn quantity-minus" onclick="handleQuantityChange('${item.id}', -1)">-</button>
          <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="handleQuantityInput('${item.id}', this.value)">
          <button class="quantity-btn quantity-plus" onclick="handleQuantityChange('${item.id}', 1)">+</button>
        </div>
        <button class="cart-item-remove" onclick="handleRemoveItem('${item.id}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </button>
      </div>
    </div>
  `).join('');
  
  updateCartSummary();
}

function handleQuantityChange(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    const newQuantity = Math.max(1, item.quantity + delta);
    updateCartItemQuantity(productId, newQuantity);
    renderCart();
  }
}

function handleQuantityInput(productId, value) {
  const quantity = Math.max(1, parseInt(value) || 1);
  updateCartItemQuantity(productId, quantity);
  renderCart();
}

function handleRemoveItem(productId) {
  const cartItem = document.querySelector(`.cart-item[data-id="${productId}"]`);
  if (cartItem) {
    cartItem.style.opacity = '0';
    cartItem.style.transform = 'translateX(-20px)';
    setTimeout(() => {
      removeFromCart(productId);
      renderCart();
    }, 300);
  }
}

function updateCartSummary() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate discount (example: 10% off for orders over 1000)
  const discount = subtotal >= 1000 ? subtotal * 0.1 : 0;
  const total = subtotal - discount;
  
  // Update UI
  const itemCountEl = document.querySelector('.cart-item-count');
  const subtotalEl = document.querySelector('.cart-subtotal');
  const discountEl = document.querySelector('.cart-discount');
  const totalEl = document.querySelector('.cart-total-amount');
  
  if (itemCountEl) itemCountEl.textContent = `(${totalItems} ชิ้น)`;
  if (subtotalEl) subtotalEl.textContent = `฿${subtotal.toLocaleString()}`;
  if (discountEl) discountEl.textContent = discount > 0 ? `-฿${discount.toLocaleString()}` : '฿0';
  if (totalEl) totalEl.textContent = `฿${total.toLocaleString()}`;
}

/* ---------- Product Gallery ---------- */
function initProductGallery() {
  const thumbnails = document.querySelectorAll('.product-thumbnail');
  const mainImage = document.querySelector('.product-main-image img');
  
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', function() {
      thumbnails.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      const thumbImg = this.querySelector('img');
      if (mainImage && thumbImg) {
        // Get larger version of thumbnail
        const newSrc = thumbImg.src.replace('w=100', 'w=600').replace('h=100', 'h=600');
        mainImage.src = newSrc;
      }
    });
  });
}

/* ---------- Product Detail Add to Cart ---------- */
function handleAddToCart() {
  const productId = document.querySelector('[data-product-id]')?.getAttribute('data-product-id');
  const productName = document.querySelector('.product-details h1')?.textContent;
  const priceText = document.querySelector('.product-detail-price .current')?.textContent;
  const productImage = document.querySelector('.product-main-image img')?.src;
  const quantityInput = document.querySelector('.quantity-input');
  
  if (!productId || !productName || !priceText) return;
  
  const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
  const quantity = parseInt(quantityInput?.value) || 1;
  
  addToCart({
    id: productId,
    name: productName,
    price: price,
    image: productImage,
    quantity: quantity
  });
  
  showToast('เพิ่มลงตะกร้าแล้ว', true);
  
  // Redirect to cart after short delay
  setTimeout(() => {
    window.location.href = 'cart.html';
  }, 1000);
}

/* ---------- Add Toast CSS dynamically ---------- */
const toastStyle = document.createElement('style');
toastStyle.textContent = `
  .toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    padding: 16px 20px;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    gap: 16px;
    z-index: 3000;
    transform: translateY(100px);
    opacity: 0;
    transition: all 0.3s ease;
  }
  .toast.show {
    transform: translateY(0);
    opacity: 1;
  }
  .toast-link {
    color: var(--color-primary);
    font-weight: 500;
    text-decoration: none;
  }
  .toast-link:hover {
    text-decoration: underline;
  }
  .toast-close {
    background: none;
    border: none;
    font-size: 20px;
    color: var(--color-text-muted);
    cursor: pointer;
    padding: 0;
    line-height: 1;
  }
  .wishlist-btn.active {
    background: #fee2e2;
    border-color: #ef4444;
    color: #ef4444;
  }
  .wishlist-btn.active svg {
    fill: #ef4444;
    stroke: #ef4444;
  }
`;
document.head.appendChild(toastStyle);

/* ---------- Product Detail Page Functions ---------- */
function addProductToCart() {
  const productContainer = document.querySelector('[data-product-id]');
  if (!productContainer) return;
  
  const productId = productContainer.getAttribute('data-product-id');
  const productName = productContainer.querySelector('h1')?.textContent;
  const priceText = productContainer.querySelector('.product-detail-price .current')?.textContent;
  const productImage = document.querySelector('.product-main-image img')?.src;
  const quantityInput = document.getElementById('product-qty');
  
  if (!productId || !productName || !priceText) return;
  
  const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
  const quantity = parseInt(quantityInput?.value) || 1;
  
  // Add to cart
  addToCart({
    id: productId,
    name: productName,
    price: price,
    image: productImage,
    quantity: quantity
  });
  
  // Update button to show success
  const addBtn = document.getElementById('add-to-cart-btn');
  if (addBtn) {
    addBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      เพิ่มแล้ว!
    `;
    addBtn.style.background = '#22c55e';
    
    // Reset button after 2 seconds
    setTimeout(() => {
      addBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        เพิ่มลงตะกร้า
      `;
      addBtn.style.background = '';
    }, 2000);
  }
  
  // Show toast with link to cart
  showToast('เพิ่มลงตะกร้าแล้ว', true);
}

function toggleProductWishlist() {
  const btn = document.getElementById('wishlist-btn');
  if (!btn) return;
  
  const productId = btn.getAttribute('data-id');
  const isNowInWishlist = toggleWishlist(productId);
  
  // Toggle button state
  btn.classList.toggle('active', isNowInWishlist);
  
  const svg = btn.querySelector('svg');
  if (svg) {
    svg.style.fill = isNowInWishlist ? '#ef4444' : 'none';
    svg.style.stroke = isNowInWishlist ? '#ef4444' : 'currentColor';
  }
  
  // Show toast
  showToast(isNowInWishlist ? '❤️ เพิ่มในรายการโปรดแล้ว' : '💔 ลบออกจากรายการโปรดแล้ว', false);
}

// Initialize wishlist button state on page load
document.addEventListener('DOMContentLoaded', function() {
  const wishlistBtn = document.getElementById('wishlist-btn');
  if (wishlistBtn) {
    const productId = wishlistBtn.getAttribute('data-id');
    if (productId && isInWishlist(productId)) {
      wishlistBtn.classList.add('active');
      const svg = wishlistBtn.querySelector('svg');
      if (svg) {
        svg.style.fill = '#ef4444';
        svg.style.stroke = '#ef4444';
      }
    }
  }
});

