/**
 * Main JavaScript for Đỗ Ngọc Khánh Portfolio v3.5
 * Features:
 * - Top Scroll Reading Progress Bar
 * - Floating Side Navigation with ScrollSpy & Hover Tooltips
 * - Dark / Light Mode with localStorage & System Preference
 * - Dynamic Typed Text Effect
 * - Scroll Reveal Animations (Intersection Observer)
 * - Animated Stats Counter
 * - Works Section: Clean Table Pagination (Instant, Seamless, Zero Reload)
 * - Command Palette (Ctrl + K / Cmd + K) with Instant Search
 * - Live Toast Notifications
 * - Quick Clipboard Copy (Email & Phone)
 * - Floating Action Controls: Back-to-Top & Theme Toggle
 * 100% Vanilla JS, 0 external runtime library, GitHub Pages ready
 */

document.addEventListener('DOMContentLoaded', () => {

  // =====================================================
  // 0. PAGE PRELOADER
  // =====================================================
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 500);
    });
    // Fallback: hide preloader after 2.5s max
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 2500);
  }

  // =====================================================
  // 1. TOP SCROLL PROGRESS BAR
  // =====================================================
  const scrollProgressBar = document.getElementById('scrollProgressBar');

  function handleScrollProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollProgressBar && docHeight > 0) {
      const scrollPercent = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }
  }

  window.addEventListener('scroll', handleScrollProgress, { passive: true });
  handleScrollProgress(); // Initial run

  // =====================================================
  // 2. FLOATING SIDE NAVIGATION: ScrollSpy & Click
  // =====================================================
  const sideNavItems = document.querySelectorAll('.side-nav-item');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveSideNav() {
    let currentSectionId = '';
    const scrollPos = window.scrollY + window.innerHeight * 0.35;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    // If near bottom of page, highlight contact
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100) {
      currentSectionId = 'contact';
    }

    if (!currentSectionId && sections.length > 0) {
      currentSectionId = sections[0].getAttribute('id');
    }

    sideNavItems.forEach(item => {
      item.classList.remove('active');
      const targetSec = item.getAttribute('data-section') || item.getAttribute('href')?.replace('#', '');
      if (targetSec === currentSectionId) {
        item.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveSideNav, { passive: true });
  updateActiveSideNav();

  // Smooth scroll click for side nav items
  sideNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const href = item.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // =====================================================
  // 3. TOAST NOTIFICATION SYSTEM
  // =====================================================
  const toastContainer = document.getElementById('toastContainer');

  function showToast(message, iconClass = 'fa-solid fa-circle-check') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `<i class="${iconClass}"></i><span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px) scale(0.95)';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 2400);
  }

  // =====================================================
  // 4. DARK / LIGHT MODE TOGGLE
  // =====================================================
  const themeToggle = document.getElementById('themeToggle');

  function setTheme(theme, isUserAction = false) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);

    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'fa-solid fa-sun';
        } else {
          icon.className = 'fa-solid fa-moon';
        }
      }
    }

    if (isUserAction) {
      showToast(
        theme === 'dark' ? 'Đã chuyển sang giao diện Tối' : 'Đã chuyển sang giao diện Sáng',
        'fa-solid fa-circle-half-stroke'
      );
    }
  }

  // Load saved theme or system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme) {
    setTheme(savedTheme, false);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark', false);
  } else {
    setTheme('light', false);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(currentTheme === 'dark' ? 'light' : 'dark', true);
    });
  }

  // =====================================================
  // 5. DYNAMIC TYPED TEXT EFFECT
  // =====================================================
  const typedTarget = document.querySelector('.typed-text');
  const roles = [
    'Cloud',
    'Data communications and networking',
    'OpenStack & AWS',
    'SAT'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function typeRole() {
    if (!typedTarget) return;

    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typedTarget.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 35;
    } else {
      typedTarget.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 70;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      typingSpeed = 2200; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next role
    }

    setTimeout(typeRole, typingSpeed);
  }

  typeRole();

  // =====================================================
  // 6. SCROLL REVEAL ANIMATIONS (Intersection Observer - Replayable)
  // =====================================================
  function setupScrollReveal() {
    const revealSelectors = [
      '.section-header',
      '.about-card-left',
      '.about-content-right',
      '.timeline-item',
      '.exp-column',
      '.projects-column',
      '.skills-column-box',
      '.awards-column-box',
      '.contact-info-card',
      '.contact-cv-card',
      '.integrated-footer'
    ];

    revealSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.classList.add('reveal');
      });
    });

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        } else {
          entry.target.classList.remove('revealed');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
      revealObserver.observe(el);
    });
  }

  setupScrollReveal();

  // =====================================================
  // 7. ANIMATED STATS COUNTER
  // =====================================================
  const statsStrip = document.querySelector('.stats-counter-strip');
  let statsAnimated = false;

  function animateCounters() {
    if (statsAnimated) return;
    statsAnimated = true;

    const counterElements = document.querySelectorAll('.stat-counter-val');
    counterElements.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      const duration = 1400; // 1.4s
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.round(easeProgress * target);

        el.textContent = currentVal.toLocaleString('vi-VN');

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          el.textContent = target.toLocaleString('vi-VN');
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  if (statsStrip) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    statsObserver.observe(statsStrip);
  }

  // =====================================================
  // 8. WORKS SECTION: TABLE PAGINATION (Instant, Seamless, Zero Reload)
  // =====================================================
  const tableRows = Array.from(document.querySelectorAll('.project-table-row'));
  const prevBtn = document.getElementById('prevPageBtn');
  const nextBtn = document.getElementById('nextPageBtn');
  const pageNumbersContainer = document.getElementById('paginationNumbers');
  const paginationInfo = document.getElementById('paginationInfo');

  const ITEMS_PER_PAGE = 3;
  const totalItems = tableRows.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  let currentPage = 1;

  function renderTablePage() {
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

    // Instant row display toggle - no blank flash or layout shift
    tableRows.forEach((row, idx) => {
      row.style.display = (idx >= startIndex && idx < endIndex) ? '' : 'none';
    });

    // Update pagination info label
    if (paginationInfo) {
      // paginationInfo.textContent = `Hiển thị ${startIndex + 1} - ${endIndex} trên ${totalItems} dự án`;
      paginationInfo.textContent = ``;
    }

    // Update Previous / Next button states
    if (prevBtn) prevBtn.disabled = (currentPage <= 1);
    if (nextBtn) nextBtn.disabled = (currentPage >= totalPages);

    // Render Page Number Buttons
    if (pageNumbersContainer) {
      pageNumbersContainer.innerHTML = '';
      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `pagination-num-btn ${i === currentPage ? 'active' : ''}`;
        btn.textContent = i;
        btn.setAttribute('aria-label', `Trang ${i}`);
        btn.addEventListener('click', () => {
          if (currentPage !== i) {
            currentPage = i;
            renderTablePage();
          }
        });
        pageNumbersContainer.appendChild(btn);
      }
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderTablePage();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderTablePage();
      }
    });
  }

  // Initial render of Works table
  renderTablePage();


  // =====================================================
  // 10. COMMAND PALETTE (Ctrl + K / Cmd + K)
  // =====================================================
  const cmdPalette = document.getElementById('cmdPalette');
  const cmdPaletteBtn = document.getElementById('cmdPaletteBtn');
  const cmdSearchInput = document.getElementById('cmdSearchInput');
  const cmdList = document.getElementById('cmdList');
  const cmdItems = cmdList ? Array.from(cmdList.querySelectorAll('.cmd-item')) : [];

  let selectedCmdIdx = 0;

  function openCommandPalette() {
    if (!cmdPalette) return;
    cmdPalette.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (cmdSearchInput) {
      cmdSearchInput.value = '';
      setTimeout(() => cmdSearchInput.focus(), 60);
    }
    filterCmdItems('');
  }

  function closeCommandPalette() {
    if (!cmdPalette) return;
    cmdPalette.classList.remove('active');
    document.body.style.overflow = '';
  }

  function filterCmdItems(query) {
    const q = query.toLowerCase().trim();
    let visibleCount = 0;

    cmdItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (!q || text.includes(q)) {
        item.style.display = 'flex';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    selectedCmdIdx = 0;
    highlightCmdItem();
  }

  function highlightCmdItem() {
    const visibleItems = cmdItems.filter(i => i.style.display !== 'none');
    visibleItems.forEach((item, idx) => {
      if (idx === selectedCmdIdx) {
        item.classList.add('selected');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('selected');
      }
    });
  }

  function executeCmdItem(item) {
    if (!item) return;
    const action = item.getAttribute('data-action');
    closeCommandPalette();

    if (action === 'navigate') {
      const href = item.getAttribute('href');
      if (href) {
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (action === 'theme') {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(currentTheme === 'dark' ? 'light' : 'dark', true);
    } else if (action === 'copy-email') {
      navigator.clipboard.writeText('dongockhanh.vn@gmail.com').then(() => {
        showToast('Đã sao chép email: dongockhanh.vn@gmail.com');
      });
    } else if (action === 'download-cv') {
      window.open('./assets/docs/cv-llt.pdf', '_blank');
    } else if (action === 'external') {
      const href = item.getAttribute('href');
      if (href) window.open(href, '_blank');
    }
  }

  if (cmdPaletteBtn) {
    cmdPaletteBtn.addEventListener('click', openCommandPalette);
  }

  if (cmdPalette) {
    cmdPalette.addEventListener('click', (e) => {
      if (e.target === cmdPalette) closeCommandPalette();
    });
  }

  if (cmdSearchInput) {
    cmdSearchInput.addEventListener('input', (e) => {
      filterCmdItems(e.target.value);
    });

    cmdSearchInput.addEventListener('keydown', (e) => {
      const visibleItems = cmdItems.filter(i => i.style.display !== 'none');

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (visibleItems.length > 0) {
          selectedCmdIdx = (selectedCmdIdx + 1) % visibleItems.length;
          highlightCmdItem();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (visibleItems.length > 0) {
          selectedCmdIdx = (selectedCmdIdx - 1 + visibleItems.length) % visibleItems.length;
          highlightCmdItem();
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (visibleItems.length > 0 && visibleItems[selectedCmdIdx]) {
          executeCmdItem(visibleItems[selectedCmdIdx]);
        }
      } else if (e.key === 'Escape') {
        closeCommandPalette();
      }
    });
  }

  cmdItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const action = item.getAttribute('data-action');
      if (action !== 'external' && action !== 'download-cv') {
        e.preventDefault();
      }
      executeCmdItem(item);
    });
  });

  // Global shortcut: Ctrl + K or Cmd + K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdPalette && cmdPalette.classList.contains('active')) {
        closeCommandPalette();
      } else {
        openCommandPalette();
      }
    }
  });

  // =====================================================
  // 11. QUICK INLINE COPY (Email & Phone)
  // =====================================================
  function setupCopyButton(btn, textToCopy, labelName) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const origHTML = btn.innerHTML;

      function showCopiedSuccess() {
        btn.classList.add('copied');
        const hasTextSpan = btn.querySelector('.copy-text');
        if (hasTextSpan) {
          btn.innerHTML = '<i class="fa-solid fa-check"></i> <span class="copy-text">Đã chép!</span>';
        } else {
          btn.innerHTML = '<i class="fa-solid fa-check"></i>';
        }
        showToast(`Đã sao chép ${labelName}: ${textToCopy}`);
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = origHTML;
        }, 2000);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy)
          .then(showCopiedSuccess)
          .catch(() => fallbackCopy(textToCopy, showCopiedSuccess));
      } else {
        fallbackCopy(textToCopy, showCopiedSuccess);
      }
    });
  }

  function fallbackCopy(text, callback) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    tempInput.setAttribute('readonly', '');
    tempInput.style.position = 'fixed';
    tempInput.style.left = '-9999px';
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      if (callback) callback();
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }
    document.body.removeChild(tempInput);
  }

  document.querySelectorAll('.copy-email-btn').forEach(btn => {
    setupCopyButton(btn, 'dongockhanh.vn@gmail.com', 'email');
  });

  document.querySelectorAll('.copy-phone-btn').forEach(btn => {
    setupCopyButton(btn, '+84365639805', 'số điện thoại');
  });

  // =====================================================
  // 12. BACK TO TOP BUTTON
  // =====================================================
  const backToTopBtn = document.getElementById('backToTop');

  function handleBackToTopVisibility() {
    if (!backToTopBtn) return;
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
