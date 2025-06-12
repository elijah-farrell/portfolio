const phrases = [
  "learn new things.",
  "code cool stuff.",
  "meet new people.",
  "solve problems."
];

let twEl, phraseIndex = 0, charIndex = 0, isDeleting = false;
const typingSpeed = 100, deletingSpeed = 50, pauseDuration = 1500;

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
    if (document.body.classList.contains('dark-mode')) {
      dmIcon.classList.remove('fa-moon');
      dmIcon.classList.add('fa-lightbulb');
    } else {
      dmIcon.classList.remove('fa-lightbulb');
      dmIcon.classList.add('fa-moon');
    }
  }
  if (localStorage.getItem('dark-mode') === 'light') {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
  } else {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
  }
  updateIcon();
  dm.addEventListener('click', () => {
    const light = document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', light ? 'light' : 'dark');
    updateIcon();
  });

  // Theme Color Picker
  const picker = document.getElementById('colorPicker');
  picker.value = localStorage.getItem('theme-color') || '#007acc';
  const applyColor = (c) => {
    document.documentElement.style.setProperty('--primary-color',  c);
    document.documentElement.style.setProperty('--link-color',     c);
    document.documentElement.style.setProperty('--button-bg',      c);
    document.documentElement.style.setProperty('--nav-text-color', c);
    const darkStop = shadeColor(c, -30);
    document.documentElement.style.setProperty('--hero-gradient-start', darkStop);
    document.documentElement.style.setProperty('--hero-gradient-end',   c);
    localStorage.setItem('theme-color', c);
  };
  applyColor(picker.value);
  picker.addEventListener('input', e => applyColor(e.target.value));

  // Mobile menu toggle (hamburger)
  const menuToggle = document.getElementById('menuToggle');
  menuToggle.addEventListener('click', () => {
    document.querySelector('.navbar').classList.toggle('open');
  });

  // –– Elements & Firebase setup ––
  const chatWindow    = document.getElementById('chatWindow');
  const chatForm      = document.getElementById('chat-form');
  const chatName      = document.getElementById('chatName');
  const chatEmail     = document.getElementById('chatEmail');
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
  });

  // –– Cancel preview ––
  cancelBtn.addEventListener('click', () => {
    previewModal.style.display = 'none';
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
    }).catch(err => {
      console.error(err);
      previewModal.style.display = 'none';
    });
  });
});
