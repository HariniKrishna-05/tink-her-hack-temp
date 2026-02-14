script.js




/* =======================================================
   SAFARIO — Main Script
   Covers: Auth pages (index, login, register) + Dashboard
======================================================= */


/* ═══════════════════════════════════════════════════════
   UTILITIES
═══════════════════════════════════════════════════════ */

/**
 * Show a styled toast notification (matches Safario gold/forest theme)
 */
function showNotification(message, type = 'default') {
  // Remove any existing notification
  const existing = document.getElementById('safario-toast');
  if (existing) existing.remove();

  const colors = {
    default: 'linear-gradient(135deg, #1e2d1a, #2d4a27)',
    success: 'linear-gradient(135deg, #1e3d2a, #2d5a38)',
    error:   'linear-gradient(135deg, #3d1e1e, #5a2d2d)',
    sos:     'linear-gradient(135deg, #5a1e1e, #8b2020)',
  };

  const borders = {
    default: 'rgba(200,169,110,0.35)',
    success: 'rgba(106,173,116,0.45)',
    error:   'rgba(220,100,90,0.45)',
    sos:     'rgba(220,60,60,0.6)',
  };

  // Inject keyframes once
  if (!document.getElementById('safario-toast-styles')) {
    const s = document.createElement('style');
    s.id = 'safario-toast-styles';
    s.textContent = `
      @keyframes toastIn  { from { opacity:0; transform:translateX(40px); } to { opacity:1; transform:translateX(0); } }
      @keyframes toastOut { from { opacity:1; transform:translateX(0);    } to { opacity:0; transform:translateX(40px); } }
    `;
    document.head.appendChild(s);
  }

  const toast = document.createElement('div');
  toast.id = 'safario-toast';
  toast.style.cssText = `
    position: fixed;
    top: 24px;
    right: 24px;
    background: ${colors[type] || colors.default};
    border: 1px solid ${borders[type] || borders.default};
    color: #f2ead8;
    padding: 13px 20px;
    border-radius: 3px;
    z-index: 9000;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 300;
    letter-spacing: 0.03em;
    max-width: 340px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    animation: toastIn 0.3s ease-out forwards;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease-out forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}


/* ═══════════════════════════════════════════════════════
   SUBSCRIBE (index/landing page)
═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  window.subscribe = function () {
    const emailInput = document.getElementById('email');
    const message    = document.getElementById('message');
    if (!emailInput || !message) return;

    const email = emailInput.value.trim();

    if (!email) {
      message.style.color = '#e87b72';
      message.textContent = 'Please enter your email.';
      return;
    }
    if (!email.includes('@')) {
      message.style.color = '#e87b72';
      message.textContent = 'Enter a valid email address.';
      return;
    }

    message.style.color = '#6aad74';
    message.textContent = 'Subscribed successfully!';
    emailInput.value = '';
  };
});


/* ═══════════════════════════════════════════════════════
   REGISTER
═══════════════════════════════════════════════════════ */

async function register() {
  const firstName = document.getElementById('firstName')?.value.trim();
  const lastName  = document.getElementById('lastName')?.value.trim();
  const email     = document.getElementById('registerEmail')?.value.trim();
  const password  = document.getElementById('registerPassword')?.value.trim();
  const terms     = document.getElementById('termsCheck');

  if (!firstName || !lastName || !email || !password) {
    showNotification('Please fill in all fields.', 'error');
    return;
  }

  if (terms && !terms.checked) {
    showNotification('Please accept the Terms of Service.', 'error');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      showNotification('Account created! Redirecting…', 'success');
      setTimeout(() => { window.location.href = 'login.html'; }, 1500);
    } else {
      showNotification(data.message || 'Registration failed.', 'error');
    }

  } catch (error) {
    // Dev fallback: redirect even without a running server
    console.warn('Server not reachable — using dev redirect.', error);
    showNotification('Account created! Redirecting to login…', 'success');
    setTimeout(() => { window.location.href = 'login.html'; }, 1500);
  }
}


/* ═══════════════════════════════════════════════════════
   LOGIN
═══════════════════════════════════════════════════════ */

async function login() {
  const email    = document.getElementById('loginEmail')?.value.trim();
  const password = document.getElementById('loginPassword')?.value.trim();

  if (!email || !password) {
    showNotification('Please enter your email and password.', 'error');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      showNotification('Welcome back! Redirecting…', 'success');
      setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
    } else {
      showNotification(data.message || 'Invalid credentials.', 'error');
    }

  } catch (error) {
    // Dev fallback: redirect even without a running server
    console.warn('Server not reachable — using dev redirect.', error);
    showNotification('Login successful! Redirecting…', 'success');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
  }
}


/* ═══════════════════════════════════════════════════════
   DASHBOARD — initializes only when dashboard is present
═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  if (!document.querySelector('.nav-item')) return; // Not on dashboard

  console.log('%c🌍 Safario Dashboard Loaded',
    'background:#1e2d1a; color:#c8a96e; font-size:13px; padding:6px 12px; border-radius:3px;');

  initializeNavigation();
  initializeSearch();
  initializeNotifications();
  initializeBuddies();
  initializeDestinations();
  initializeStats();
  initializeSOSMode();
  initializeUserProfile();
  initializeKeyboardShortcuts();
  initializeRipple();
  initializeLazyImages();
  startBuddyStatusUpdater();
  initializeDynamicGreeting();
});


/* ── Navigation ── */
function initializeNavigation() {
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      navItems.forEach(n => n.classList.remove('active'));
      this.classList.add('active');

      const section = this.getAttribute('data-section');
      if (section) {
        showNotification(`Viewing ${section.charAt(0).toUpperCase() + section.slice(1)}`);
        console.log(`Navigated to: ${section}`);
      }
    });
  });
}


/* ── Search ── */
function initializeSearch() {
  const searchInput = document.querySelector('.search-input');
  if (!searchInput) return;

  let searchTimeout;

  searchInput.addEventListener('input', function (e) {
    clearTimeout(searchTimeout);
    const query = e.target.value.trim();
    if (query.length > 1) {
      searchTimeout = setTimeout(() => performSearch(query), 500);
    }
  });

  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      const query = e.target.value.trim();
      if (query) performSearch(query);
    }
  });
}

function performSearch(query) {
  console.log('Searching for:', query);
  showNotification(`Searching for "${query}"…`);
}


/* ── Notifications panel ── */
function initializeNotifications() {
  const btn = document.querySelector('.notification-btn');
  if (!btn) return;

  btn.addEventListener('click', showNotificationPanel);
}

function showNotificationPanel() {
  const notifications = [
    { message: 'Sarah Martinez sent you a message', time: '5m ago' },
    { message: 'New safe route to Tokyo available',  time: '1h ago' },
    { message: 'Weather alert for Kyoto trip',       time: '2h ago' },
  ];

  // Simple styled panel (replace with real UI in production)
  alert(
    '📬 You have 3 new notifications:\n\n' +
    notifications.map(n => `• ${n.message}  (${n.time})`).join('\n')
  );
}


/* ── Buddies ── */
function initializeBuddies() {
  const buddyItems  = document.querySelectorAll('.buddy-item');
  const messageBtns = document.querySelectorAll('.message-btn');
  const addBuddyBtn = document.querySelector('.add-buddy-btn');

  buddyItems.forEach(item => {
    item.addEventListener('click', function (e) {
      if (!e.target.closest('.message-btn')) {
        const name = this.querySelector('.buddy-name')?.textContent;
        if (name) showNotification(`Opening ${name}'s profile`);
      }
    });
  });

  messageBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const name = this.closest('.buddy-item')?.querySelector('.buddy-name')?.textContent;
      if (name) {
        showNotification(`Starting conversation with ${name}`, 'success');
        console.log(`Opening chat with ${name}`);
      }
    });
  });

  if (addBuddyBtn) {
    addBuddyBtn.addEventListener('click', function () {
      const name = prompt('Enter buddy name or email:');
      if (name?.trim()) {
        showNotification(`Buddy request sent to ${name}`, 'success');
        console.log(`Adding buddy: ${name}`);
      }
    });
  }
}


/* ── Destinations ── */
function initializeDestinations() {
  const cards        = document.querySelectorAll('.destination-card');
  const bookmarkBtns = document.querySelectorAll('.bookmark-btn');

  cards.forEach(card => {
    card.addEventListener('click', function (e) {
      if (!e.target.closest('.bookmark-btn')) {
        const title = this.querySelector('.destination-title')?.textContent;
        if (title) {
          showNotification(`Loading details for ${title}`);
          console.log(`Opening destination: ${title}`);
        }
      }
    });
  });

  bookmarkBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleBookmark(this);
    });
  });
}

function toggleBookmark(btn) {
  const icon = btn.querySelector('i');
  if (!icon) return;

  if (icon.classList.contains('far')) {
    icon.classList.replace('far', 'fas');
    btn.style.background = 'rgba(200,169,110,0.25)';
    btn.style.borderColor = 'rgba(200,169,110,0.5)';
    showNotification('Added to bookmarks ✦', 'success');
  } else {
    icon.classList.replace('fas', 'far');
    btn.style.background = '';
    btn.style.borderColor = '';
    showNotification('Removed from bookmarks');
  }
}


/* ── Stats ── */
function initializeStats() {
  const statCards = document.querySelectorAll('.stat-card');

  statCards.forEach(card => {
    card.addEventListener('click', function () {
      const label = this.querySelector('.stat-label')?.textContent;
      if (label) showNotification(`Loading ${label} details`);
    });
  });

  animateStatNumbers();
}

function animateStatNumbers() {
  const statValues = document.querySelectorAll('.stat-value');

  statValues.forEach(stat => {
    const finalValue = parseInt(stat.textContent, 10);
    if (isNaN(finalValue)) return;

    const steps    = 50;
    const duration = 1200;
    const stepVal  = finalValue / steps;
    let current    = 0;
    let step       = 0;

    const interval = setInterval(() => {
      step++;
      current += stepVal;
      stat.textContent = step >= steps ? finalValue : Math.floor(current);
      if (step >= steps) clearInterval(interval);
    }, duration / steps);
  });
}


/* ── SOS Mode ── */
function initializeSOSMode() {
  const sosBtn = document.querySelector('.sos-button');
  if (!sosBtn) return;

  sosBtn.addEventListener('click', activateSOSMode);
}

function activateSOSMode() {
  const confirmed = window.confirm(
    '⚠️ ACTIVATE SOS MODE?\n\n' +
    'This will:\n' +
    '• Share your location with emergency contacts\n' +
    '• Alert local authorities\n' +
    '• Activate emergency protocol\n\n' +
    'Continue?'
  );

  if (!confirmed) return;

  console.log('🚨 SOS MODE ACTIVATED');

  // Red flash feedback
  if (!document.getElementById('sos-flash-style')) {
    const style = document.createElement('style');
    style.id = 'sos-flash-style';
    style.textContent = `
      @keyframes sosFlash {
        0%,100% { background-color: var(--forest, #0e1a13); }
        50%      { background-color: #3d0a0a; }
      }
      .sos-flashing { animation: sosFlash 0.5s ease-in-out 4; }
    `;
    document.head.appendChild(style);
  }

  document.body.classList.add('sos-flashing');
  setTimeout(() => document.body.classList.remove('sos-flashing'), 2200);

  showNotification('🚨 SOS MODE ACTIVATED — Emergency services notified', 'sos');
}


/* ── User Profile ── */
/* ── User Profile ── */
function initializeUserProfile() {
  const profile = document.querySelector('.user-profile');
  if (!profile) return;

  profile.addEventListener('click', showUserMenu);

  // Profile Page Enhancements (avatar, edit, save)
  const avatarInput  = document.getElementById('avatarInput');
  const avatarPreview = document.getElementById('avatarPreview');
  const saveBtn      = document.getElementById('saveProfile');
  const editFields   = document.querySelectorAll('.editable-field');

  if (avatarInput && avatarPreview) {
    avatarInput.addEventListener('change', function () {
      const file = this.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (e) {
        avatarPreview.src = e.target.result;
        showNotification('Avatar updated!', 'success');
      };
      reader.readAsDataURL(file);
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', function () {
      const profileData = {};
      editFields.forEach(f => {
        profileData[f.name] = f.value;
      });

      console.log('Saving profile data:', profileData);
      showNotification('Profile saved successfully!', 'success');

      // Example: POST to server
      /*
      fetch('/updateProfile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      })
      .then(res => res.json())
      .then(data => showNotification('Profile updated!', 'success'))
      .catch(err => showNotification('Error saving profile', 'error'));
      */
    });
  }
}

function showUserMenu() {
   window.location.href = 'profile.html';
}



/* ── Keyboard Shortcuts ── */
function initializeKeyboardShortcuts() {
  document.addEventListener('keydown', function (e) {
    const mod = e.ctrlKey || e.metaKey;

    if (mod && e.key === 'k') {
      e.preventDefault();
      document.querySelector('.search-input')?.focus();
    }
    if (mod && e.key === 'b') {
      e.preventDefault();
      document.querySelector('[data-section="buddies"]')?.click();
    }
    if (mod && e.key === 'e') {
      e.preventDefault();
      document.querySelector('[data-section="explore"]')?.click();
    }
  });
}


/* ── Ripple Effect ── */
function initializeRipple() {
  if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(200,169,110,0.18);
        transform: scale(0);
        animation: rippleAnim 0.55s ease-out;
        pointer-events: none;
      }
      @keyframes rippleAnim {
        to { transform: scale(4); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  document.querySelectorAll('button, .nav-item, .stat-card, .buddy-item, .destination-card').forEach(el => {
    el.addEventListener('click', function (e) {
      const circle   = document.createElement('span');
      const diameter = Math.max(this.clientWidth, this.clientHeight);
      const radius   = diameter / 2;
      const rect     = this.getBoundingClientRect();

      circle.style.cssText = `
        width: ${diameter}px;
        height: ${diameter}px;
        left: ${e.clientX - rect.left - radius}px;
        top: ${e.clientY - rect.top - radius}px;
      `;
      circle.classList.add('ripple');

      this.querySelector('.ripple')?.remove();
      this.appendChild(circle);
    });
  });
}


/* ── Lazy Image Loading ── */
function initializeLazyImages() {
  const images = document.querySelectorAll('.destination-image');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        img.addEventListener('load', () => { img.style.opacity = '1'; }, { once: true });
        // Trigger load if already cached
        if (img.complete) img.style.opacity = '1';
        obs.unobserve(img);
      }
    });
  }, { rootMargin: '50px' });

  images.forEach(img => observer.observe(img));
}


/* ── Buddy Status Updater ── */
function startBuddyStatusUpdater() {
  setInterval(() => {
    document.querySelectorAll('.status-dot').forEach(dot => {
      if (Math.random() > 0.95) {
        const statuses = ['online', 'away', 'offline'];
        const current  = statuses.find(s => dot.classList.contains(s));
        const next     = statuses[Math.floor(Math.random() * statuses.length)];
        if (current && current !== next) {
          dot.classList.replace(current, next);
          // Also update the text sibling
          const label = dot.nextElementSibling;
          if (label) label.textContent = next.charAt(0).toUpperCase() + next.slice(1);
        }
      }
    });
  }, 30000);
}


/* ── Dynamic Greeting ── */
function initializeDynamicGreeting() {
  const greetEl = document.querySelector('.header-greeting');
  if (!greetEl) return;

  const hour = new Date().getHours();
  greetEl.textContent = hour < 12 ? 'Good morning'
                      : hour < 18 ? 'Good afternoon'
                      :             'Good evening';
}


/* ═══════════════════════════════════════════════════════
   CONSOLE SUMMARY
═══════════════════════════════════════════════════════ */
console.log('%c✅ Safario script loaded',
  'background:#1e2d1a; color:#c8a96e; padding:4px 10px; border-radius:3px; font-size:12px;');
console.log('💡 Dashboard shortcuts:  Ctrl+K search · Ctrl+B buddies · Ctrl+E explore');



/* =======================================================
   SAFARIO — Main Script
   Covers: Auth pages (index, login, register) + Dashboard
======================================================= */


/* ═══════════════════════════════════════════════════════
   UTILITIES
═══════════════════════════════════════════════════════ */

/**
 * Show a styled toast notification (matches Safario gold/forest theme)
 */
function showNotification(message, type = 'default') {
  // Remove any existing notification
  const existing = document.getElementById('safario-toast');
  if (existing) existing.remove();

  const colors = {
    default: 'linear-gradient(135deg, #1e2d1a, #2d4a27)',
    success: 'linear-gradient(135deg, #1e3d2a, #2d5a38)',
    error:   'linear-gradient(135deg, #3d1e1e, #5a2d2d)',
    sos:     'linear-gradient(135deg, #5a1e1e, #8b2020)',
  };

  const borders = {
    default: 'rgba(200,169,110,0.35)',
    success: 'rgba(106,173,116,0.45)',
    error:   'rgba(220,100,90,0.45)',
    sos:     'rgba(220,60,60,0.6)',
  };

  // Inject keyframes once
  if (!document.getElementById('safario-toast-styles')) {
    const s = document.createElement('style');
    s.id = 'safario-toast-styles';
    s.textContent = `
      @keyframes toastIn  { from { opacity:0; transform:translateX(40px); } to { opacity:1; transform:translateX(0); } }
      @keyframes toastOut { from { opacity:1; transform:translateX(0);    } to { opacity:0; transform:translateX(40px); } }
    `;
    document.head.appendChild(s);
  }

  const toast = document.createElement('div');
  toast.id = 'safario-toast';
  toast.style.cssText = `
    position: fixed;
    top: 24px;
    right: 24px;
    background: ${colors[type] || colors.default};
    border: 1px solid ${borders[type] || borders.default};
    color: #f2ead8;
    padding: 13px 20px;
    border-radius: 3px;
    z-index: 9000;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 300;
    letter-spacing: 0.03em;
    max-width: 340px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    animation: toastIn 0.3s ease-out forwards;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease-out forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}


/* ═══════════════════════════════════════════════════════
   SUBSCRIBE (index/landing page)
═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  window.subscribe = function () {
    const emailInput = document.getElementById('email');
    const message    = document.getElementById('message');
    if (!emailInput || !message) return;

    const email = emailInput.value.trim();

    if (!email) {
      message.style.color = '#e87b72';
      message.textContent = 'Please enter your email.';
      return;
    }
    if (!email.includes('@')) {
      message.style.color = '#e87b72';
      message.textContent = 'Enter a valid email address.';
      return;
    }

    message.style.color = '#6aad74';
    message.textContent = 'Subscribed successfully!';
    emailInput.value = '';
  };
});


/* ═══════════════════════════════════════════════════════
   REGISTER
═══════════════════════════════════════════════════════ */

async function register() {
  const firstName = document.getElementById('firstName')?.value.trim();
  const lastName  = document.getElementById('lastName')?.value.trim();
  const email     = document.getElementById('registerEmail')?.value.trim();
  const password  = document.getElementById('registerPassword')?.value.trim();
  const terms     = document.getElementById('termsCheck');

  if (!firstName || !lastName || !email || !password) {
    showNotification('Please fill in all fields.', 'error');
    return;
  }

  if (terms && !terms.checked) {
    showNotification('Please accept the Terms of Service.', 'error');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      showNotification('Account created! Redirecting…', 'success');
      setTimeout(() => { window.location.href = 'login.html'; }, 1500);
    } else {
      showNotification(data.message || 'Registration failed.', 'error');
    }

  } catch (error) {
    // Dev fallback: redirect even without a running server
    console.warn('Server not reachable — using dev redirect.', error);
    showNotification('Account created! Redirecting to login…', 'success');
    setTimeout(() => { window.location.href = 'login.html'; }, 1500);
  }
}


/* ═══════════════════════════════════════════════════════
   LOGIN
═══════════════════════════════════════════════════════ */

async function login() {
  const email    = document.getElementById('loginEmail')?.value.trim();
  const password = document.getElementById('loginPassword')?.value.trim();

  if (!email || !password) {
    showNotification('Please enter your email and password.', 'error');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      showNotification('Welcome back! Redirecting…', 'success');
      setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
    } else {
      showNotification(data.message || 'Invalid credentials.', 'error');
    }

  } catch (error) {
    // Dev fallback: redirect even without a running server
    console.warn('Server not reachable — using dev redirect.', error);
    showNotification('Login successful! Redirecting…', 'success');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
  }
}


/* ═══════════════════════════════════════════════════════
   DASHBOARD — initializes only when dashboard is present
═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  if (!document.querySelector('.nav-item')) return; // Not on dashboard

  console.log('%c🌍 Safario Dashboard Loaded',
    'background:#1e2d1a; color:#c8a96e; font-size:13px; padding:6px 12px; border-radius:3px;');

  initializeNavigation();
  initializeSearch();
  initializeNotifications();
  initializeBuddies();
  initializeDestinations();
  initializeStats();
  initializeSOSMode();
  initializeUserProfile();
  initializeKeyboardShortcuts();
  initializeRipple();
  initializeLazyImages();
  startBuddyStatusUpdater();
  initializeDynamicGreeting();
});


/* ── Navigation ── */
// function initializeNavigation() {
//   const navItems = document.querySelectorAll('.nav-item');

//   navItems.forEach(item => {
//     item.addEventListener('click', function (e) {
//       e.preventDefault();
//       navItems.forEach(n => n.classList.remove('active'));
//       this.classList.add('active');

//       const section = this.getAttribute('data-section');
//       if (section) {
//         showNotification(`Viewing ${section.charAt(0).toUpperCase() + section.slice(1)}`);
//         console.log(`Navigated to: ${section}`);
//       }
//     });
//   });
// }

function initializeNavigation() {
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault(); // stop default anchor behavior
      navItems.forEach(n => n.classList.remove('active'));
      this.classList.add('active');

      const section = this.getAttribute('data-section');
      if (!section) return;

      // Redirect logic for specific sections
      switch (section) {
        case 'routes':
          window.location.href = 'routes.html';
          break;
        case 'buddies':
          window.location.href = 'buddies.html';
          break;
        case 'explore':
          window.location.href = 'explore.html';
          break;
        default:
          showNotification(`Viewing ${section.charAt(0).toUpperCase() + section.slice(1)}`);
      }
    });
  });
}



/* ── Search ── */
function initializeSearch() {
  const searchInput = document.querySelector('.search-input');
  if (!searchInput) return;

  let searchTimeout;

  searchInput.addEventListener('input', function (e) {
    clearTimeout(searchTimeout);
    const query = e.target.value.trim();
    if (query.length > 1) {
      searchTimeout = setTimeout(() => performSearch(query), 500);
    }
  });

  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      const query = e.target.value.trim();
      if (query) performSearch(query);
    }
  });
}

function performSearch(query) {
  console.log('Searching for:', query);
  showNotification(`Searching for "${query}"…`);
}


/* ── Notifications panel ── */
function initializeNotifications() {
  const btn = document.querySelector('.notification-btn');
  if (!btn) return;

  btn.addEventListener('click', showNotificationPanel);
}

function showNotificationPanel() {
  const notifications = [
    { message: 'Sarah Martinez sent you a message', time: '5m ago' },
    { message: 'New safe route to Tokyo available',  time: '1h ago' },
    { message: 'Weather alert for Kyoto trip',       time: '2h ago' },
  ];

  // Simple styled panel (replace with real UI in production)
  alert(
    '📬 You have 3 new notifications:\n\n' +
    notifications.map(n => `• ${n.message}  (${n.time})`).join('\n')
  );
}


/* ── Buddies ── */
function initializeBuddies() {
  const buddyItems  = document.querySelectorAll('.buddy-item');
  const messageBtns = document.querySelectorAll('.message-btn');
  const addBuddyBtn = document.querySelector('.add-buddy-btn');

  buddyItems.forEach(item => {
    item.addEventListener('click', function (e) {
      if (!e.target.closest('.message-btn')) {
        const name = this.querySelector('.buddy-name')?.textContent;
        if (name) showNotification(`Opening ${name}'s profile`);
      }
    });
  });

  messageBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const name = this.closest('.buddy-item')?.querySelector('.buddy-name')?.textContent;
      if (name) {
        showNotification(`Starting conversation with ${name}`, 'success');
        console.log(`Opening chat with ${name}`);
      }
    });
  });

  if (addBuddyBtn) {
    addBuddyBtn.addEventListener('click', function () {
      const name = prompt('Enter buddy name or email:');
      if (name?.trim()) {
        showNotification(`Buddy request sent to ${name}`, 'success');
        console.log(`Adding buddy: ${name}`);
      }
    });
  }
}


/* ── Destinations ── */
function initializeDestinations() {
  const cards        = document.querySelectorAll('.destination-card');
  const bookmarkBtns = document.querySelectorAll('.bookmark-btn');

  cards.forEach(card => {
    card.addEventListener('click', function (e) {
      if (!e.target.closest('.bookmark-btn')) {
        const title = this.querySelector('.destination-title')?.textContent;
        if (title) {
          showNotification(`Loading details for ${title}`);
          console.log(`Opening destination: ${title}`);
        }
      }
    });
  });

  bookmarkBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleBookmark(this);
    });
  });
}

function toggleBookmark(btn) {
  const icon = btn.querySelector('i');
  if (!icon) return;

  if (icon.classList.contains('far')) {
    icon.classList.replace('far', 'fas');
    btn.style.background = 'rgba(200,169,110,0.25)';
    btn.style.borderColor = 'rgba(200,169,110,0.5)';
    showNotification('Added to bookmarks ✦', 'success');
  } else {
    icon.classList.replace('fas', 'far');
    btn.style.background = '';
    btn.style.borderColor = '';
    showNotification('Removed from bookmarks');
  }
}


/* ── Stats ── */
function initializeStats() {
  const statCards = document.querySelectorAll('.stat-card');

  statCards.forEach(card => {
    card.addEventListener('click', function () {
      const label = this.querySelector('.stat-label')?.textContent;
      if (label) showNotification(`Loading ${label} details`);
    });
  });

  animateStatNumbers();
}

function animateStatNumbers() {
  const statValues = document.querySelectorAll('.stat-value');

  statValues.forEach(stat => {
    const finalValue = parseInt(stat.textContent, 10);
    if (isNaN(finalValue)) return;

    const steps    = 50;
    const duration = 1200;
    const stepVal  = finalValue / steps;
    let current    = 0;
    let step       = 0;

    const interval = setInterval(() => {
      step++;
      current += stepVal;
      stat.textContent = step >= steps ? finalValue : Math.floor(current);
      if (step >= steps) clearInterval(interval);
    }, duration / steps);
  });
}


/* ── SOS Mode ── */
function initializeSOSMode() {
  const sosBtn = document.querySelector('.sos-button');
  if (!sosBtn) return;

  sosBtn.addEventListener('click', activateSOSMode);
}

function activateSOSMode() {
  const confirmed = window.confirm(
    '⚠️ ACTIVATE SOS MODE?\n\n' +
    'This will:\n' +
    '• Share your location with emergency contacts\n' +
    '• Alert local authorities\n' +
    '• Activate emergency protocol\n\n' +
    'Continue?'
  );

  if (!confirmed) return;

  console.log('🚨 SOS MODE ACTIVATED');

  // Red flash feedback
  if (!document.getElementById('sos-flash-style')) {
    const style = document.createElement('style');
    style.id = 'sos-flash-style';
    style.textContent = `
      @keyframes sosFlash {
        0%,100% { background-color: var(--forest, #0e1a13); }
        50%      { background-color: #3d0a0a; }
      }
      .sos-flashing { animation: sosFlash 0.5s ease-in-out 4; }
    `;
    document.head.appendChild(style);
  }

  document.body.classList.add('sos-flashing');
  setTimeout(() => document.body.classList.remove('sos-flashing'), 2200);

  showNotification('🚨 SOS MODE ACTIVATED — Emergency services notified', 'sos');
}


/* ── User Profile ── */
/* ── User Profile ── */
function initializeUserProfile() {
  const profile = document.querySelector('.user-profile');
  if (!profile) return;

  profile.addEventListener('click', showUserMenu);

  // Profile Page Enhancements (avatar, edit, save)
  const avatarInput  = document.getElementById('avatarInput');
  const avatarPreview = document.getElementById('avatarPreview');
  const saveBtn      = document.getElementById('saveProfile');
  const editFields   = document.querySelectorAll('.editable-field');

  if (avatarInput && avatarPreview) {
    avatarInput.addEventListener('change', function () {
      const file = this.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (e) {
        avatarPreview.src = e.target.result;
        showNotification('Avatar updated!', 'success');
      };
      reader.readAsDataURL(file);
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', function () {
      const profileData = {};
      editFields.forEach(f => {
        profileData[f.name] = f.value;
      });

      console.log('Saving profile data:', profileData);
      showNotification('Profile saved successfully!', 'success');

      // Example: POST to server
      /*
      fetch('/updateProfile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      })
      .then(res => res.json())
      .then(data => showNotification('Profile updated!', 'success'))
      .catch(err => showNotification('Error saving profile', 'error'));
      */
    });
  }
}

function showUserMenu() {
   window.location.href = 'profile.html';
}



/* ── Keyboard Shortcuts ── */
function initializeKeyboardShortcuts() {
  document.addEventListener('keydown', function (e) {
    const mod = e.ctrlKey || e.metaKey;

    if (mod && e.key === 'k') {
      e.preventDefault();
      document.querySelector('.search-input')?.focus();
    }
    if (mod && e.key === 'b') {
      e.preventDefault();
      document.querySelector('[data-section="buddies"]')?.click();
    }
    if (mod && e.key === 'e') {
      e.preventDefault();
      document.querySelector('[data-section="explore"]')?.click();
    }
  });
}


/* ── Ripple Effect ── */
function initializeRipple() {
  if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(200,169,110,0.18);
        transform: scale(0);
        animation: rippleAnim 0.55s ease-out;
        pointer-events: none;
      }
      @keyframes rippleAnim {
        to { transform: scale(4); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  document.querySelectorAll('button, .nav-item, .stat-card, .buddy-item, .destination-card').forEach(el => {
    el.addEventListener('click', function (e) {
      const circle   = document.createElement('span');
      const diameter = Math.max(this.clientWidth, this.clientHeight);
      const radius   = diameter / 2;
      const rect     = this.getBoundingClientRect();

      circle.style.cssText = `
        width: ${diameter}px;
        height: ${diameter}px;
        left: ${e.clientX - rect.left - radius}px;
        top: ${e.clientY - rect.top - radius}px;
      `;
      circle.classList.add('ripple');

      this.querySelector('.ripple')?.remove();
      this.appendChild(circle);
    });
  });
}


/* ── Lazy Image Loading ── */
function initializeLazyImages() {
  const images = document.querySelectorAll('.destination-image');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        img.addEventListener('load', () => { img.style.opacity = '1'; }, { once: true });
        // Trigger load if already cached
        if (img.complete) img.style.opacity = '1';
        obs.unobserve(img);
      }
    });
  }, { rootMargin: '50px' });

  images.forEach(img => observer.observe(img));
}


/* ── Buddy Status Updater ── */
function startBuddyStatusUpdater() {
  setInterval(() => {
    document.querySelectorAll('.status-dot').forEach(dot => {
      if (Math.random() > 0.95) {
        const statuses = ['online', 'away', 'offline'];
        const current  = statuses.find(s => dot.classList.contains(s));
        const next     = statuses[Math.floor(Math.random() * statuses.length)];
        if (current && current !== next) {
          dot.classList.replace(current, next);
          // Also update the text sibling
          const label = dot.nextElementSibling;
          if (label) label.textContent = next.charAt(0).toUpperCase() + next.slice(1);
        }
      }
    });
  }, 30000);
}


/* ── Dynamic Greeting ── */
function initializeDynamicGreeting() {
  const greetEl = document.querySelector('.header-greeting');
  if (!greetEl) return;

  const hour = new Date().getHours();
  greetEl.textContent = hour < 12 ? 'Good morning'
                      : hour < 18 ? 'Good afternoon'
                      :             'Good evening';
}


/* ═══════════════════════════════════════════════════════
   CONSOLE SUMMARY
═══════════════════════════════════════════════════════ */
console.log('%c✅ Safario script loaded',
  'background:#1e2d1a; color:#c8a96e; padding:4px 10px; border-radius:3px; font-size:12px;');
console.log('💡 Dashboard shortcuts:  Ctrl+K search · Ctrl+B buddies · Ctrl+E explore');