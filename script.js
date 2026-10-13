/**
 * PORTOFOLIO DIGITAL - JAVASCRIPT
 * Interaktivitas Navigasi Responsif, Validasi Formulir, & Scroll Monitoring
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DYNAMIC FOOTER YEAR
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. MOBILE HAMBURGER MENU
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    // Toggle Menu
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburgerBtn.classList.toggle('active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close on nav link click
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          hamburgerBtn.classList.remove('active');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !hamburgerBtn.contains(e.target)
      ) {
        navMenu.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 3. HEADER SHADOW ON SCROLL
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 4px 16px rgba(15, 23, 42, 0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  // 4. ACTIVE NAV LINK ON SCROLL (IntersectionObserver)
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  // 5. CONTACT FORM VALIDATION & HANDLING
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const feedbackBox = document.getElementById('form-feedback');

    const setError = (input, errorId, message) => {
      input.classList.add('invalid');
      const errorSpan = document.getElementById(errorId);
      if (errorSpan) errorSpan.textContent = message;
    };

    const clearError = (input, errorId) => {
      input.classList.remove('invalid');
      const errorSpan = document.getElementById(errorId);
      if (errorSpan) errorSpan.textContent = '';
    };

    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Live validation clearing on input
    [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
      if (!input) return;
      input.addEventListener('input', () => {
        clearError(input, `${input.id}-error`);
        if (feedbackBox) {
          feedbackBox.className = 'form-feedback';
          feedbackBox.style.display = 'none';
        }
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        setError(nameInput, 'name-error', 'Nama lengkap wajib diisi.');
        isValid = false;
      } else {
        clearError(nameInput, 'name-error');
      }

      // Validate Email
      if (!emailInput.value.trim()) {
        setError(emailInput, 'email-error', 'Alamat email wajib diisi.');
        isValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        setError(emailInput, 'email-error', 'Format email tidak valid (contoh: nama@domain.com).');
        isValid = false;
      } else {
        clearError(emailInput, 'email-error');
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        setError(subjectInput, 'subject-error', 'Subjek pesan wajib diisi.');
        isValid = false;
      } else {
        clearError(subjectInput, 'subject-error');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        setError(messageInput, 'message-error', 'Pesan tidak boleh kosong.');
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        setError(messageInput, 'message-error', 'Pesan minimal terdiri dari 10 karakter.');
        isValid = false;
      } else {
        clearError(messageInput, 'message-error');
      }

      if (isValid) {
        // Success demonstration feedback
        feedbackBox.textContent = 'Terima kasih! Pesan Anda berhasil dikirim (simulasi). Silakan hubungi juga melalui email atau LinkedIn langsung.';
        feedbackBox.className = 'form-feedback success';
        contactForm.reset();

        setTimeout(() => {
          feedbackBox.style.display = 'none';
        }, 8000);
      } else {
        feedbackBox.textContent = 'Mohon periksa kembali kolom formulir yang belum sesuai.';
        feedbackBox.className = 'form-feedback error';
      }
    });
  }
});
