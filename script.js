const phrases = [
  "learn new things.",
  "code cool stuff.",
  "meet new people.",
  "solve problems.",
  "create innovative solutions.",
  "build amazing projects.",
  "explore new technologies.",
  "collaborate with teams.",
  "debug challenging issues.",
  "design user experiences.",
  "optimize performance.",
  "stay up-to-date with tech.",
  "write clean code.",
  "think outside the box."
];

let twEl, phraseIndex = 0, charIndex = 0, isDeleting = false;
const typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000;

// utility to darken/lighten a hex color
function shadeColor(color, percent) {
  let R = parseInt(color.slice(1,3), 16),
      G = parseInt(color.slice(3,5), 16),
      B = parseInt(color.slice(5,7), 16);
  R = Math.min(255, Math.max(0, R + (R * percent/100)));
  G = Math.min(255, Math.max(0, G + (G * percent/100)));
  B = Math.min(255, Math.max(0, B + (B * percent/100)));
  const r = Math.round(R).toString(16).padStart(2,'0'),
        g = Math.round(G).toString(16).padStart(2,'0'),
        b = Math.round(B).toString(16).padStart(2,'0');
  return `#${r}${g}${b}`;
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

function animateOnScroll() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('animate-in');
    }
  });
}

function typeCycle() {
  if (!twEl) return;
  const full = phrases[phraseIndex];
  const current = full.slice(0, charIndex);
  twEl.textContent = current;
  if (!isDeleting) {
    if (charIndex < full.length) {
      charIndex++;
    } else {
      isDeleting = true;
      setTimeout(typeCycle, pauseDuration);
      return;
    }
  } else {
    if (charIndex > 0) {
      charIndex--;
    } else {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeCycle, isDeleting ? deletingSpeed : typingSpeed);
}

window.addEventListener('DOMContentLoaded', () => {
  // Typewriter
  twEl = document.getElementById('typewriter');
  typeCycle();

  // Dark / Light Mode Toggle (Font Awesome icons)
  const dm = document.getElementById('darkModeToggle');
  const dmIcon = dm.querySelector('i');
  function updateIcon() {
    // Keep moon icon for both modes - it's more universally recognized
    dmIcon.classList.remove('fa-sun');
    dmIcon.classList.add('fa-moon');
  }
  
  // Initialize theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateIcon();
  
  dm.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon();
  });

  // Modern Theme Selector
  const themeSelector = document.querySelector('.theme-selector');
  const themeToggle = document.getElementById('themeToggle');
  const themeOptions = document.querySelectorAll('.theme-option');
  
  // Predefined theme colors
  const themes = {
    blue: '#007acc',
    emerald: '#10b981', 
    amber: '#f59e0b',
    red: '#ef4444',
    purple: '#8b5cf6',
    cyan: '#06b6d4',
    pink: '#ec4899',
    lime: '#84cc16',
    orange: '#f97316',
    teal: '#14b8a6',
    indigo: '#6366f1',
    green: '#22c55e'
  };
  
  // Get saved theme or default to blue
  const savedThemeColor = localStorage.getItem('theme-color') || themes.blue;
  
  const applyTheme = (color) => {
    // Add transition class for smooth color changes
    document.documentElement.classList.add('color-transitioning');
    
    // Apply all color variations simultaneously
    const colorVariations = {
      '--primary-color': color,
      '--primary-light': shadeColor(color, 30),
      '--primary-dark': shadeColor(color, -30),
      '--hero-color-1': shadeColor(color, -20),
      '--hero-color-2': shadeColor(color, 15),
      '--hero-color-3': shadeColor(color, -40),
      '--accent-color': shadeColor(color, 20),
      '--highlight-color': shadeColor(color, 40)
    };
    
    // Apply all colors at once
    Object.entries(colorVariations).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });
    
    // Store the theme
    localStorage.setItem('theme-color', color);
    
    // Update active state
    themeOptions.forEach(option => {
      option.classList.remove('active');
      if (option.dataset.color === color) {
        option.classList.add('active');
        themeToggle.classList.add('active');
      }
    });
    
    // Remove transition class after animation
    setTimeout(() => {
      document.documentElement.classList.remove('color-transitioning');
    }, 300);
  };
  
  // Initialize with saved theme
  applyTheme(savedThemeColor);
  
  // Handle theme selection
  themeOptions.forEach(option => {
    option.addEventListener('click', () => {
      const color = option.dataset.color;
      applyTheme(color);
    });
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!themeSelector.contains(e.target)) {
      themeSelector.classList.remove('open');
    }
  });

  // Mobile menu toggle (hamburger)
  const menuToggle = document.getElementById('menuToggle');
  const navbar = document.querySelector('.navbar');
  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('mobile-open');
  });

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
      
      // Close mobile menu if open
      navbar.classList.remove('mobile-open');
    });
  });

  // Navbar scroll effects
  let lastScrollTop = 0;
  window.addEventListener('scroll', debounce(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Navbar background effect
    if (scrollTop > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  }, 10));

  // Add animation classes to elements
  const animateElements = document.querySelectorAll('.section, .project-card, .skill-category, .education-card, .contact-item');
  animateElements.forEach((el, index) => {
    el.classList.add('animate-on-scroll');
    
    // Add different animation types for variety
    if (index % 3 === 0) {
      el.classList.add('slide-left');
    } else if (index % 3 === 1) {
      el.classList.add('slide-right');
    } else {
      el.classList.add('scale-in');
    }
  });

  // Initial animation check
  animateOnScroll();
  
  // Listen for scroll animations
  window.addEventListener('scroll', debounce(animateOnScroll, 10));

  // Enhanced skill bars with intersection observer
  const skillBars = document.querySelectorAll('.skill-progress');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.style.width;
        entry.target.style.width = '0%';
        setTimeout(() => {
          entry.target.style.width = width;
        }, 200);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => {
    skillObserver.observe(bar);
  });

  // Enhanced parallax effect
  const heroBackground = document.querySelector('.hero-background');
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (heroBackground) {
      heroBackground.style.transform = `translateY(${rate}px)`;
    }
  });

  // –– Elements & Firebase setup ––
  const chatWindow    = document.getElementById('chatWindow');
  const chatForm      = document.getElementById('chat-form');
  const chatInput     = document.getElementById('chatInput');

  const previewModal     = document.getElementById('previewModal');
  const modalNameInput   = document.getElementById('modalNameInput');
  const modalEmailInput  = document.getElementById('modalEmailInput');
  const modalCommentInput= document.getElementById('modalCommentInput');
  const cancelBtn        = document.getElementById('cancelBtn');
  const confirmBtn       = document.getElementById('confirmBtn');

  // –– Render one comment ––
  function appendComment({ name, content, createdAt }) {
    const author = name || 'Anonymous';
    const ts     = createdAt.toDate().toLocaleString('en-US', {
      month:'short', day:'numeric', year:'numeric',
      hour:'2-digit', minute:'2-digit'
    });

    const msg = document.createElement('div');
    msg.className = 'chat-message';
    msg.innerHTML = `
      <div class="avatar"><i class="fa fa-user"></i></div>
      <div class="message-body">
        <div class="message-author">${author}</div>
        <div class="message-text">${content}</div>
        <div class="timestamp">${ts}</div>
      </div>
    `;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  // –– Live update ––
  db.collection('comments').orderBy('createdAt','asc')
    .onSnapshot(snap => {
      chatWindow.innerHTML = '';
      snap.forEach(doc => appendComment(doc.data()));
    });

  // –– Form submit → preview modal ––
  chatForm.addEventListener('submit', e => {
    e.preventDefault();
    const txt = chatInput.value.trim();
    if (!txt) return;

    // populate modal
    modalCommentInput.value = txt;
    previewModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });

  // –– Cancel preview ––
  cancelBtn.addEventListener('click', () => {
    previewModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  // Close modal on outside click
  previewModal.addEventListener('click', (e) => {
    if (e.target === previewModal) {
      previewModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // –– Confirm & post ––
  confirmBtn.addEventListener('click', () => {
    const textVal = modalCommentInput.value.trim();
    const nameVal = modalNameInput.value.trim();
    const emailVal = modalEmailInput.value.trim();

    if (emailVal && !emailVal.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    db.collection('comments').add({
      content: textVal,
      name: nameVal || null,
      email: emailVal || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      // reset form + hide modal
      chatForm.reset();
      previewModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }).catch(err => {
      console.error(err);
      previewModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  });

  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    .navbar {
      transition: transform 0.3s ease, background-color 0.3s ease;
    }
    
    .navbar.scrolled {
      background: rgba(255, 255, 255, 0.95) !important;
      backdrop-filter: blur(20px);
    }
    
    [data-theme="dark"] .navbar.scrolled {
      background: rgba(0, 0, 0, 0.95) !important;
    }
    
    .project-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .skill-progress {
      transition: width 1s ease;
    }
    
    @media (max-width: 768px) {
      .nav-menu {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--bg-primary);
        border-top: 1px solid var(--border-color);
        padding: var(--spacing-lg);
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        flex-direction: column;
        gap: var(--spacing-md);
      }
      
      .navbar.mobile-open .nav-menu {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }
    }
  `;
  document.head.appendChild(style);

  // Enhanced scroll handler
  window.addEventListener('scroll', debounce(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Navbar effects
    if (scrollTop > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  }, 10));

  // Add hover effects for interactive elements
  const interactiveElements = document.querySelectorAll('.project-card, .timeline-item, .contact-item, .education-card, .course-tag');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.transform = el.style.transform + ' scale(1.02)';
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = el.style.transform.replace(' scale(1.02)', '');
    });
  });

  // Enhanced button interactions
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Add keyboard navigation support
  document.addEventListener('keydown', (e) => {
    // Escape key to close modal
    if (e.key === 'Escape' && previewModal.style.display === 'flex') {
      previewModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Add focus management for accessibility
  const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
  focusableElements.forEach(el => {
    el.addEventListener('focus', () => {
      el.style.outline = '2px solid var(--primary-color)';
      el.style.outlineOffset = '2px';
    });
    
    el.addEventListener('blur', () => {
      el.style.outline = 'none';
    });
  });

  // Add loading states for better UX
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

  // Add smooth scrolling for all internal links
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ====================
  // Service Worker Registration (for PWA features)
  // ====================
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }

  // ====================
  // Smooth Scrolling
  // ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ====================
  // Intersection Observer for Animations
  // ====================
});
