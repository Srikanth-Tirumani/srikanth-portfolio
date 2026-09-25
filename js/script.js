/* ==========================================================================
   TIRUMANI JYOTHI SRIKANTH - INTERACTIVE SCRIPTS
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 0. Particles & Custom Cursor
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: '#6366f1' },
        shape: { type: 'circle' },
        opacity: { value: 0.3, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#6366f1', opacity: 0.2, width: 1 },
        move: { enable: true, speed: 2, direction: 'none', random: true, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { grab: { distance: 140, line_linked: { opacity: 0.8 } }, push: { particles_nb: 4 } }
      },
      retina_detect: true
    });
  }



  // 1. Typing Animation
  const typingElement = document.getElementById("typing");
  if (typingElement) {
    const textArray = [
      "Full Stack Developer",
      "Python & Flask Specialist",
      "AI & Machine Learning Enthusiast",
      "React & Node.js Developer",
      "MCA Graduate (Presidency University)"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function handleTyping() {
      const currentText = textArray[textIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }

      let typingSpeed = isDeleting ? 40 : 90;

      if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 2200; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typingSpeed = 400;
      }

      setTimeout(handleTyping, typingSpeed);
    }

    handleTyping();
  }

  // 2. Navbar Scroll Effect
  const header = document.getElementById("siteHeader");
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }

    if (scrollToTopBtn) {
      scrollToTopBtn.style.display = window.scrollY > 400 ? "flex" : "none";
    }
  });

  // Scroll to Top Handler
  scrollToTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 3. Mobile Hamburger Menu
  const hamburger = document.getElementById("navHamburger");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("open");
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("open");
      });
    });
  }

  // 4. Navbar Active Link on Scroll
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.add("active");
      } else {
        document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.remove("active");
      }
    });
  });

  // 5. Theme Toggle (Dark / Light) with LocalStorage
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const savedTheme = localStorage.getItem("portfolio_theme");

  if (savedTheme === "light") {
    document.body.classList.add("light");
    if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggleBtn?.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    localStorage.setItem("portfolio_theme", isLight ? "light" : "dark");
    themeToggleBtn.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  });

  // 6. Project Filtering
  const projectFilters = document.querySelectorAll(".project-filter-btn");
  const projectCards = document.querySelectorAll(".project-card-item");

  projectFilters.forEach(button => {
    button.addEventListener("click", () => {
      projectFilters.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      projectCards.forEach(card => {
        if (filterValue === "all" || card.getAttribute("data-category")?.includes(filterValue)) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // 7. Certificate Filtering
  const certFilters = document.querySelectorAll(".cert-filter-btn");
  const certCards = document.querySelectorAll(".cert-card-item");

  certFilters.forEach(button => {
    button.addEventListener("click", () => {
      certFilters.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      certCards.forEach(card => {
        if (filterValue === "all" || card.getAttribute("data-category")?.includes(filterValue)) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // 8. Number Counter Animation for CGPA & Stats
  const counters = document.querySelectorAll(".counter-stat");
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseFloat(counter.getAttribute("data-target"));
        const isDecimal = target % 1 !== 0;
        let count = 0;
        const speed = isDecimal ? 0.05 : Math.ceil(target / 40);

        const updateCount = () => {
          if (count < target) {
            count += speed;
            counter.innerText = isDecimal ? count.toFixed(2) : Math.ceil(count);
            requestAnimationFrame(updateCount);
          } else {
            counter.innerText = isDecimal ? target.toFixed(2) : target;
          }
        };

        updateCount();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // 9. Interactive Contact Form Submission Handler
  const contactForm = document.getElementById("portfolioContactForm");
  const toastNotification = document.getElementById("toastNotification");
  
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        contactForm.reset();

        // Show Toast
        if (toastNotification) {
          toastNotification.classList.add('show');
          setTimeout(() => {
            toastNotification.classList.remove('show');
          }, 3500);
        }

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3500);
      }, 1000);
    });
  }

  // 10. Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.section-header, .glass-panel, .edu-timeline-item');
  revealElements.forEach(el => el.classList.add('reveal')); // Initialize class

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // 11. Project Modal Logic
  const modalOverlay = document.getElementById('projectModalOverlay');
  const closeModalBtn = document.getElementById('closeModalBtn');
  
  if (modalOverlay && closeModalBtn) {
    const modalTitle = document.getElementById('modalTitle');
    const modalRole = document.getElementById('modalRole');
    const modalDesc = document.getElementById('modalDesc');
    const modalBullets = document.getElementById('modalBullets');
    const modalTech = document.getElementById('modalTech');
    const modalActions = document.getElementById('modalActions');

    // Architecture / Problem Statement Dictionary
    const projectDetailsExt = {
      "VehicleVision – Overloaded Vehicle Detection": "The problem: Manual traffic monitoring is inefficient and prone to errors. Architecture: A real-time processing pipeline leveraging YOLOv8 for object detection and OpenCV for tracking. Video streams are processed frame-by-frame. When an overloaded state is flagged, the frame is saved locally and metadata is asynchronously logged to a MySQL database via Flask REST API endpoints.",
      "SmartRail – Railway Reservation System": "The problem: Handling high-concurrency ticket booking while maintaining data integrity. Architecture: Follows MVC pattern. Flask handles routing and session management (bcrypt). SQLite (SQLAlchemy) stores relational data ensuring ACID compliance. Waitlist logic runs as a background process checking for cancellations.",
      "Platora – Food Ordering Platform": "The problem: Creating a seamless, non-blocking UI for food ordering. Architecture: MERN stack with React frontend handling state management for the cart. The Node.js/Express backend provides REST APIs secured by JWT. MongoDB handles unstructured data like reviews and flexible menu items.",
      "Smart Resume Analyzer (AI-Enhanced)": "Architecture: Uses Python NLP libraries to extract Named Entities and skills from PDF resumes, cross-referencing against a predefined skill taxonomy to calculate an ATS compatibility score.",
      "Facial Recognition Attendance System": "Architecture: Employs Principal Component Analysis (PCA) for dimensionality reduction of face embeddings, passed into an Artificial Neural Network (ANN) for high-accuracy classification."
    };

    document.querySelectorAll('.project-card-item').forEach(card => {
      card.style.cursor = 'pointer';
      
      card.addEventListener('click', (e) => {
        // Prevent opening if clicked on github/live links
        if (e.target.closest('.btn')) return;

        const titleStr = card.querySelector('.project-title')?.innerText || '';
        modalTitle.innerText = titleStr;
        modalRole.innerText = card.querySelector('.project-role-tag')?.innerText || 'Developer';
        
        const deepDive = projectDetailsExt[titleStr] || "Built robustly following software engineering best practices with a focus on maintainability, clean code, and performance optimization.";
        modalDesc.innerText = deepDive;
        
        const bullets = card.querySelector('.project-key-bullets')?.innerHTML || '';
        modalBullets.innerHTML = bullets;

        const techStack = card.querySelector('.project-tech-pills')?.innerHTML || '';
        modalTech.innerHTML = techStack;

        const actions = card.querySelector('.project-action-btns')?.innerHTML || '';
        modalActions.innerHTML = actions;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; 
      });
    });

    const closeModal = () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    };

    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
});
