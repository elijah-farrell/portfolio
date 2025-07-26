// ============================================================================
// PORTFOLIO WEBSITE JAVASCRIPT
// ============================================================================

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Utility to darken/lighten a hex color by a percentage
 * @param {string} color - Hex color code (e.g., "#007acc")
 * @param {number} percent - Percentage to adjust (-100 to 100)
 * @returns {string} - Adjusted hex color
 */
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

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
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

// ============================================================================
// ANIMATION FUNCTIONS
// ============================================================================

/**
 * Handles scroll-triggered animations for elements
 * Adds 'animate-in' class when elements come into view
 */
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

/**
 * Typewriter effect animation cycle
 * Types out phrases character by character, then deletes them
 */
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

// Typewriter animation variables
let twEl, phraseIndex = 0, charIndex = 0, isDeleting = false;
const typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000;

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

// ============================================================================
// THEME MANAGEMENT
// ============================================================================

/**
 * Updates the dark mode toggle icon and text
 * Keeps moon icon for both modes for consistency
 */
function updateIcon() {
  const dmIcon = document.querySelector('#darkModeToggle i');
  const dmIconMobile = document.querySelector('#darkModeToggleMobile i');
  const dmText = document.getElementById('darkModeText');
  const dmTextMobile = document.getElementById('darkModeTextMobile');
  
  if (dmIcon) {
    dmIcon.classList.remove('fa-sun');
    dmIcon.classList.add('fa-moon');
  }
  
  if (dmIconMobile) {
    dmIconMobile.classList.remove('fa-sun');
    dmIconMobile.classList.add('fa-moon');
  }
  
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const modeText = currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
  
  if (dmText) {
    dmText.textContent = modeText;
  }
  
  if (dmTextMobile) {
    dmTextMobile.textContent = modeText;
  }
}

/**
 * Applies a color theme to the website
 * @param {string} color - Hex color code for the theme
 */
function applyTheme(color) {
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
  const themeColors = document.querySelectorAll('.theme-color');
  const themeBtn = document.querySelector('.theme-btn');

  themeColors.forEach(colorEl => {
    colorEl.classList.remove('active');
    if (colorEl.dataset.color === color) {
      colorEl.classList.add('active');
    }
  });

  // Remove transition class after animation
  setTimeout(() => {
    document.documentElement.classList.remove('color-transitioning');
  }, 300);
}

// ============================================================================
// COMMENT SYSTEM FUNCTIONS
// ============================================================================

/**
 * Renders a single comment in the chat window
 * @param {Object} comment - Comment object with name, content, and createdAt
 */
function appendComment({ name, content, createdAt }) {
  const author = name || 'Anonymous';
  
  // Handle null/undefined timestamps gracefully
  let ts = 'Just now';
  if (createdAt && createdAt.toDate) {
    try {
      ts = createdAt.toDate().toLocaleString('en-US', {
        month:'short', day:'numeric', year:'numeric',
        hour:'2-digit', minute:'2-digit'
      });
    } catch (error) {
      console.warn('Error formatting timestamp:', error);
      ts = 'Just now';
    }
  }

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

  const chatWindow = document.getElementById('chatWindow');
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// ============================================================================
// MAIN INITIALIZATION
// ============================================================================

window.addEventListener('DOMContentLoaded', () => {

  // ============================================================================
  // TYPEWRITER EFFECT SETUP
  // ============================================================================

  twEl = document.getElementById('typewriter');
  if (twEl) {
    typeCycle();
  }

  // ============================================================================
  // DARK/LIGHT MODE TOGGLE
  // ============================================================================

  const dm = document.getElementById('darkModeToggle');
  const dmMobile = document.getElementById('darkModeToggleMobile');
  
  // Initialize theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateIcon();

  // Handle theme toggle function
  function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon();
  }

  // Add event listeners for both desktop and mobile buttons
  if (dm) {
    dm.addEventListener('click', toggleDarkMode);
  }
  
  if (dmMobile) {
    dmMobile.addEventListener('click', toggleDarkMode);
  }

  // ============================================================================
  // COLOR THEME SELECTOR
  // ============================================================================

  const themeSelector = document.querySelector('.theme-selector');
  const themeColors = document.querySelectorAll('.theme-color');

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

  // Initialize with saved theme
  applyTheme(savedThemeColor);

  // Handle theme selection
  themeColors.forEach(colorEl => {
    colorEl.addEventListener('click', () => {
      const color = colorEl.dataset.color;
      applyTheme(color);
      // Do NOT close the themeSelector on color click
    });
  });

  // Theme button click to toggle dropdown
  const themeBtn = document.querySelector('.theme-btn');
  if (themeBtn && themeSelector) {
    themeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      themeSelector.classList.toggle('open');
    });
  }

  // Close theme dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (themeSelector && !themeSelector.contains(e.target)) {
      themeSelector.classList.remove('open');
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (themeSelector && !themeSelector.contains(e.target)) {
      themeSelector.classList.remove('open');
    }
    // Close actions dropdown when clicking outside
    const actionsDropdown = document.querySelector('.nav-actions-dropdown');
    if (actionsDropdown && !actionsDropdown.contains(e.target)) {
      actionsDropdown.classList.remove('open');
    }
  });

  // Actions dropdown toggle
  const actionsToggle = document.getElementById('actionsToggle');
  const actionsDropdown = document.querySelector('.nav-actions-dropdown');
  if (actionsToggle && actionsDropdown) {
    actionsToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      actionsDropdown.classList.toggle('open');
    });
  }

  // ============================================================================
  // MOBILE MENU TOGGLE
  // ============================================================================

  const menuToggle = document.getElementById('menuToggle');
  const navbar = document.querySelector('.navbar');

  if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
      navbar.classList.toggle('mobile-open');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && !menuToggle.contains(e.target)) {
        navbar.classList.remove('mobile-open');
      }
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navbar.classList.remove('mobile-open');
      }
    });
  }

  // ============================================================================
  // SMOOTH SCROLLING FOR INTERNAL LINKS
  // ============================================================================

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
      // Close mobile menu if this is a nav link
      if (link.classList.contains('nav-link') && navbar) {
        navbar.classList.remove('mobile-open');
      }
    });
  });

  // ============================================================================
  // NAVBAR SCROLL EFFECTS
  // ============================================================================

  let lastScrollTop = 0;
  window.addEventListener('scroll', debounce(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const isDesktop = window.innerWidth > 768;

    if (navbar) {
      // Navbar background effect
      if (scrollTop > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Simplified navbar hide/show logic - no mobile menu interference
      if (isDesktop && scrollTop > 200) {
        if (scrollTop > lastScrollTop) {
          navbar.classList.add('navbar-hidden');
        } else {
          navbar.classList.remove('navbar-hidden');
        }
      } else {
        navbar.classList.remove('navbar-hidden');
      }
    }
    lastScrollTop = scrollTop;
  }, 10));

  // ============================================================================
  // SCROLL ANIMATIONS
  // ============================================================================

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

  // Close dropdowns on scroll
  window.addEventListener('scroll', debounce(() => {
    if (themeSelector) {
      themeSelector.classList.remove('open');
    }
    // Close actions dropdown on scroll
    const actionsDropdown = document.querySelector('.nav-actions-dropdown');
    if (actionsDropdown) {
      actionsDropdown.classList.remove('open');
    }
  }, 10));

  // ============================================================================
  // SKILL BARS ANIMATION
  // ============================================================================

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

  // ============================================================================
  // PARALLAX EFFECTS
  // ============================================================================

  const heroBackground = document.querySelector('.hero-background');
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    if (heroBackground) {
      heroBackground.style.transform = `translateY(${rate}px)`;
    }
  });

  // ============================================================================
  // COMMENT SYSTEM SETUP
  // ============================================================================

  const chatWindow = document.getElementById('chatWindow');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chatInput');
  const previewModal = document.getElementById('previewModal');
  const modalNameInput = document.getElementById('modalNameInput');
  const modalEmailInput = document.getElementById('modalEmailInput');
  const modalCommentInput = document.getElementById('modalCommentInput');
  const cancelBtn = document.getElementById('cancelBtn');
  const confirmBtn = document.getElementById('confirmBtn');

  // Live update comments from Firestore
  if (typeof db !== 'undefined' && chatWindow) {
    db.collection('comments').orderBy('createdAt','asc')
      .onSnapshot(snap => {
        chatWindow.innerHTML = '';
        snap.forEach(doc => appendComment(doc.data()));
      });
  }

  // Form submit → preview modal
  if (chatForm && chatInput && previewModal && modalCommentInput) {
    chatForm.addEventListener('submit', e => {
      e.preventDefault();
      const txt = chatInput.value.trim();
      if (!txt) return;

      // populate modal
      modalCommentInput.value = txt;
      previewModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  }

  // Cancel preview
  if (cancelBtn && previewModal) {
    cancelBtn.addEventListener('click', () => {
      previewModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }

  // Close modal on outside click
  if (previewModal) {
    previewModal.addEventListener('click', (e) => {
      if (e.target === previewModal) {
        previewModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Confirm & post comment
  if (confirmBtn && modalCommentInput && modalNameInput && modalEmailInput && chatForm && previewModal) {
    confirmBtn.addEventListener('click', () => {
      const textVal = modalCommentInput.value.trim();
      const nameVal = modalNameInput.value.trim();
      const emailVal = modalEmailInput.value.trim();

      if (emailVal && !emailVal.includes('@')) {
        alert('Please enter a valid email address.');
        return;
      }

      if (typeof db !== 'undefined') {
        db.collection('comments').add({
          content: textVal,
          name: nameVal || null,
          email: emailVal || null,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
          // Send email notification for ALL comments
          sendEmailNotification({
            name: nameVal,
            email: emailVal,
            content: textVal
          });

          // reset form + hide modal
          chatForm.reset();
          previewModal.style.display = 'none';
          document.body.style.overflow = 'auto';
        }).catch(err => {
          console.error(err);
          previewModal.style.display = 'none';
          document.body.style.overflow = 'auto';
        });
      }
    });
  }

  // Email notification function (EmailJS)
  function sendEmailNotification(comment) {
    // Send notification for ALL comments, even without email
    const templateParams = {
      to_email: 'elijah5003@gmail.com',
      from_name: comment.name || 'Anonymous',
      from_email: comment.email || 'N/A (No email provided)',
      message: comment.content,
      reply_to: comment.email || 'noreply@portfolio.com',
      subject: 'New Comment on Your Portfolio',
      timestamp: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Replace these with your actual EmailJS credentials
    const serviceId = 'service_o18qk9p';
    const templateId = 'template_lzcvz8s';
    const publicKey = 'j9dA8RYL2gVS_Isls';

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then(function(response) {
        // Email sent successfully - no need to log in production
      }, function(error) {
        // Log error for debugging but don't show to user
        console.error('Email notification failed:', error);
      });
  }

  // ============================================================================
  // INTERACTIVE ELEMENT EFFECTS
  // ============================================================================

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

  // ============================================================================
  // ACCESSIBILITY & KEYBOARD NAVIGATION
  // ============================================================================

  // Add keyboard navigation support
  document.addEventListener('keydown', (e) => {
    // Escape key to close modal
    if (e.key === 'Escape' && previewModal && previewModal.style.display === 'flex') {
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

  // ============================================================================
  // LOADING STATES
  // ============================================================================

  // Add loading states for better UX
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
});