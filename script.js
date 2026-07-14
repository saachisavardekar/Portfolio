document.addEventListener('DOMContentLoaded', () => {

  /* --- DOM ELEMENTS --- */
  const themeToggle = document.getElementById('theme-toggle');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links a');
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const currentYearSpan = document.getElementById('current-year');
  const sections = document.querySelectorAll('section');

  /* --- DYNAMIC YEAR --- */
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  /* --- THEME CONTROLLER --- */
  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Default to dark mode
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  // Initial Theme Setup
  const currentTheme = getPreferredTheme();
  setTheme(currentTheme);

  // Theme Toggle Listener
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  /* --- MOBILE MENU NAVIGATION --- */
  if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinksContainer.classList.toggle('mobile-active');
      
      // Update menu icon (hamburger to cross / back)
      const isExpanded = navLinksContainer.classList.contains('mobile-active');
      menuToggle.setAttribute('aria-expanded', isExpanded);
      
      if (isExpanded) {
        menuToggle.innerHTML = `
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        `;
      } else {
        menuToggle.innerHTML = `
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        `;
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinksContainer.classList.contains('mobile-active') && !navLinksContainer.contains(e.target) && e.target !== menuToggle) {
        navLinksContainer.classList.remove('mobile-active');
        menuToggle.innerHTML = `
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        `;
      }
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('mobile-active');
        menuToggle.innerHTML = `
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        `;
      });
    });
  }

  /* --- ACTIVE NAV LINK HIGHLIGHTING --- */
  const highlightNavLink = () => {
    let scrollPosition = window.scrollY + 120; // offset navigation height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavLink);

  /* --- INTERSECTION OBSERVER (SCROLL REVEAL) --- */
  const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, revealOptions);

  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  /* --- SKILLS ANIMATION ON VISIBLE --- */
  const skillsSection = document.getElementById('skills');
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  const animateSkills = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillBars.forEach(bar => {
          const targetPercent = bar.getAttribute('data-percent');
          bar.style.width = `${targetPercent}%`;
        });
        observer.unobserve(entry.target);
      }
    });
  };

  if (skillsSection && skillBars.length > 0) {
    const skillsObserver = new IntersectionObserver(animateSkills, { threshold: 0.2 });
    skillsObserver.observe(skillsSection);
  }

  /* --- CONTACT FORM HANDLER --- */
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn.innerHTML;
      
      // Feedback clean-up
      formFeedback.className = 'form-feedback';
      formFeedback.textContent = '';
      
      // Simple validation check
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !message) {
        formFeedback.classList.add('error');
        formFeedback.textContent = 'Please fill out all required fields.';
        return;
      }
      
      // Loading visual state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span>Sending Message...</span>
        <svg class="animate-spin" style="animation: spin 1s linear infinite; margin-left: 0.5rem;" fill="none" stroke="currentColor" width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      `;
      
      // Add simple spin keyframe style inline to support the spinner
      if (!document.getElementById('spin-style')) {
        const style = document.createElement('style');
        style.id = 'spin-style';
        style.innerHTML = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
        document.head.appendChild(style);
      }

      // Simulate contact request API (e.g. EmailJS, Formspree)
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
        
        formFeedback.classList.add('success');
        formFeedback.textContent = `Thank you, ${name}! Your message was sent successfully.`;
        
        // Clear Form fields
        contactForm.reset();
      }, 1500);
    });
  }
});
