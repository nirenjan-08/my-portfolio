document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Mobile Navigation Menu Toggle
  // ==========================================
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileToggle.innerHTML = navMenu.classList.contains('active') ? '&times;' : '&#9776;';
    });

    // Close menu when clicking links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.innerHTML = '&#9776;';
      });
    });
  }

  // ==========================================
  // 2. Active Navigation link tracking on Scroll
  // ==========================================
  const sections = document.querySelectorAll('section');
  const navHeader = document.getElementById('main-header');

  window.addEventListener('scroll', () => {
    // Header background change on scroll
    if (window.scrollY > 50) {
      navHeader.classList.add('scrolled');
    } else {
      navHeader.classList.remove('scrolled');
    }

    // Scroll active link highlight
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================
  // 3. Theme Picker Logic
  // ==========================================
  const themeDots = document.querySelectorAll('.theme-dot');
  const currentTheme = localStorage.getItem('theme') || 'slate';

  const applyTheme = (themeName) => {
    if (themeName === 'slate') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', themeName);
    }
    
    themeDots.forEach(dot => {
      dot.classList.remove('active');
      if (dot.getAttribute('data-theme') === themeName) {
        dot.classList.add('active');
      }
    });
    localStorage.setItem('theme', themeName);
  };

  applyTheme(currentTheme);

  themeDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const selectedTheme = e.target.getAttribute('data-theme');
      applyTheme(selectedTheme);
    });
  });

  // ==========================================
  // 4. Typewriter Animation (Hero Subtitle)
  // ==========================================
  const typewriterText = document.getElementById('typewriter-text');
  const roles = [
    "Web Developer",
    "Freelancer",
    "B.Tech ECE Student @ Vel Tech",
    "Aspiring Entrepreneur"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;
  let erasingDelay = 50;
  let nextWordDelay = 2000;

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typewriterText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = erasingDelay;
    } else {
      typewriterText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingDelay = nextWordDelay;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingDelay = 500;
    }

    setTimeout(type, typingDelay);
  }

  // Init typewriter
  if (typewriterText) {
    setTimeout(type, 1000);
  }

  // ==========================================
  // 5. Scroll Reveal & Skill Progress Animations
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  const skillFills = document.querySelectorAll('.skill-progress-fill');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        
        // If it's the skills section, animate progress bars
        if (entry.target.id === 'skills') {
          animateSkillBars();
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  function animateSkillBars() {
    skillFills.forEach(fill => {
      const targetPercent = fill.getAttribute('data-percent');
      fill.style.width = targetPercent;
    });
  }

  // Fallback to trigger load reveal for top of the page on load
  setTimeout(() => {
    revealElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        element.classList.add('revealed');
        if (element.id === 'skills') {
          animateSkillBars();
        }
      }
    });
  }, 300);

  // ==========================================
  // 6. Project Modal Details Logic
  // ==========================================
  const modalData = {
    peltier: {
      title: "Peltier Dynamo",
      tag: "State-Level Prize Winner",
      image: "assets/peltier_dynamo.png",
      description: "A state-level award-winning hardware engineering project. The Peltier Dynamo utilizes Peltier elements (thermoelectric modules) to generate electrical power directly from thermal gradient differentials. The system represents a scalable model for clean energy harvesting and local device power generation.",
      innovations: [
        "Thermoelectric Power Harvesting using specialized Peltier semiconductor modules",
        "Dual-chamber thermal sink array to maintain maximum temperature delta",
        "Ultra-low start-up voltage step-up regulator to convert minor heat to usable 5V outputs",
        "Eco-friendly, silent, and solid-state generation with zero moving parts"
      ],
      stack: [
        "TEC1-12706 Peltier Module",
        "High-thermal-conductivity copper heat pipes & cooling arrays",
        "Step-Up Booster Board (0.9V - 5V)",
        "Direct USB charging output logic",
        "CAD design modeling for spatial chassis layout"
      ]
    },
    aura: {
      title: "AURA Clothings",
      tag: "Freelance Client Production Website",
      image: "assets/aura_clothings.png",
      description: "A fast, modern web store build tailored to present high-end minimalist streetwear collections. Emphasizes visual storytelling with fluid grids, lazy-loaded custom media modules, and complete responsive optimization for tablet and mobile screens.",
      innovations: [
        "Fully custom responsive layout with semantic markup and flexible CSS grid components",
        "Interactive product showcase panels with slide-out visual galleries",
        "Performance optimization reaching over 95 on page speed diagnostics",
        "Floating interactive utility layout tailored for quick checkout navigation"
      ],
      stack: [
        "Semantic HTML5 Structure",
        "Advanced CSS Grid & Variables (Flexible Palette)",
        "Vanilla Javascript UI & Cart Modules",
        "Responsive media optimization workflows"
      ]
    }
  };

  const modalOverlay = document.getElementById('project-modal-overlay');
  const modalClose = document.getElementById('modal-close-btn');
  const openTriggers = document.querySelectorAll('.open-modal-trigger, .project-details-btn');

  // Modal elements
  const modalTitle = document.getElementById('modal-project-title');
  const modalImg = document.getElementById('modal-project-img');
  const modalTag = document.getElementById('modal-project-tag');
  const modalDesc = document.getElementById('modal-project-desc');
  const modalInnovations = document.getElementById('modal-project-innovations');
  const modalStack = document.getElementById('modal-project-stack');

  const openModal = (projectKey) => {
    const data = modalData[projectKey];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalImg.src = data.image;
    modalImg.alt = `${data.title} showcase`;
    modalTag.textContent = data.tag;
    modalDesc.textContent = data.description;

    // Build innovations list
    modalInnovations.innerHTML = '';
    data.innovations.forEach(item => {
      const li = document.createElement('li');
      li.className = 'modal-list-item';
      li.textContent = item;
      modalInnovations.appendChild(li);
    });

    // Build stack list
    modalStack.innerHTML = '';
    data.stack.forEach(item => {
      const li = document.createElement('li');
      li.className = 'modal-list-item';
      li.textContent = item;
      modalStack.appendChild(li);
    });

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  };

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  openTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projectKey = trigger.getAttribute('data-project');
      openModal(projectKey);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // ==========================================
  // 7. Contact Form Handling & Toast Notifications
  // ==========================================
  const contactForm = document.getElementById('contact-form-element');
  const toastContainer = document.getElementById('toast-container');

  const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast-success-icon">&#10004;</span>
      <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
      toast.classList.add('active');
    }, 10);
    
    // Remove toast after 4s
    setTimeout(() => {
      toast.classList.remove('active');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 4000);
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('form-submit-btn');
      const originalText = submitBtn.textContent;
      
      // Simulate form submission status
      submitBtn.textContent = 'Sending Message...';
      submitBtn.style.pointerEvents = 'none';
      submitBtn.style.opacity = '0.7';

      setTimeout(() => {
        showToast('Message sent successfully! Nirenjan will contact you soon.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.style.pointerEvents = 'all';
        submitBtn.style.opacity = '1';
      }, 1500);
    });
  }
});
