// Polyfill para navegadores antiguos sin IntersectionObserver
(function() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('active');
    });
    return; // Salimos si no hay soporte para IntersectionObserver
  }

  // Configuración del tema oscuro/claro
  function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeButton(currentTheme);

    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeButton(newTheme);
        updateParticlesTheme(newTheme);
      });
    }
  }

  function updateThemeButton(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  // Animaciones reveal
  function initRevealAnimations() {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }

  // Efecto de fondo revelado
  function initBackgroundEffect() {
    const backgroundEffect = document.querySelector('.cv-background-effect');
    if (backgroundEffect) {
      const backgroundObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            backgroundEffect.classList.add('active');
          }
        });
      }, { threshold: 0.1 });
      
      backgroundObserver.observe(document.querySelector('.cv-container'));
    }
  }

  // Tooltips
  function initTooltips() {
    document.querySelectorAll('.contact-info a').forEach(link => {
      const tooltipText = link.getAttribute('data-tooltip') || link.textContent.trim();

      link.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = tooltipText;
        document.body.appendChild(tooltip);
        positionTooltip(e, tooltip);
      });

      link.addEventListener('mousemove', (e) => {
        const tooltip = document.querySelector('.custom-tooltip');
        if (tooltip) positionTooltip(e, tooltip);
      });

      link.addEventListener('mouseleave', () => {
        const tooltip = document.querySelector('.custom-tooltip');
        if (tooltip) tooltip.remove();
      });
    });
  }

  function positionTooltip(e, tooltip) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;

    let leftPos = mouseX + 15;
    let topPos = mouseY + 15;

    if (leftPos + tooltipWidth > window.innerWidth - 20) {
      leftPos = window.innerWidth - tooltipWidth - 20;
    }
    if (topPos + tooltipHeight > window.innerHeight - 20) {
      topPos = mouseY - tooltipHeight - 15;
    }

    tooltip.style.left = `${Math.max(10, leftPos)}px`;
    tooltip.style.top = `${Math.max(10, topPos)}px`;
  }

  // Foto de perfil interactiva
  function initProfilePicture() {
    const profilePic = document.querySelector('.profile-pic');
    if (profilePic) {
      profilePic.addEventListener('click', () => {
        profilePic.classList.toggle('glowing-click');
      });
    }
  }

  // Efecto parallax
  function initParallax() {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      document.querySelectorAll('.job').forEach((el, index) => {
        el.style.transform = `translateY(${scrollY * 0.01 * (index + 1)}px)`;
      });
    });
  }

  // tsParticles
  function initParticles(theme) {
    if (typeof tsParticles === 'undefined') {
      console.warn('tsParticles no se cargó correctamente');
      return;
    }

    tsParticles.load("tsparticles", {
      fullScreen: { enable: true, zIndex: -1 },
      background: { color: { value: "transparent" } },
      particles: {
        number: { value: 80, density: { enable: true, area: 800 } },
        color: { value: theme === 'dark' ? "#00ff00" : "#00ccff" },
        shape: { type: "circle" },
        opacity: {
          value: { min: 0.1, max: 0.5 },
          animation: { enable: true, speed: 1, minimumValue: 0.1 }
        },
        size: {
          value: { min: 1, max: 5 },
          animation: { enable: true, speed: 2, minimumValue: 0.1 }
        },
        links: {
          enable: true,
          distance: 150,
          color: { value: theme === 'dark' ? "#00ff00" : "#00ccff" },
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 1.5,
          outModes: "out"
        }
      },
      interactivity: {
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
          resize: true
        },
        modes: {
          repulse: { distance: 100 },
          push: { quantity: 4 }
        }
      },
      themes: [
        {
          name: "light",
          options: {
            particles: {
              color: { value: "#00ccff" },
              links: { color: "#00ccff" }
            }
          }
        },
        {
          name: "dark",
          options: {
            particles: {
              color: { value: "#00ff00" },
              links: { color: "#00ff00" }
            }
          }
        }
      ]
    });
  }

  function updateParticlesTheme(theme) {
    if (typeof tsParticles !== 'undefined') {
      tsParticles.dom().then(container => {
        if (container && container.length > 0) {
          container[0].loadTheme(theme);
        }
      }).catch(error => console.error("Error changing particles theme:", error));
    }
  }

  // Smooth scrolling
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Inicialización completa cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    
    initTheme();
    initRevealAnimations();
    initBackgroundEffect();
    initTooltips();
    initProfilePicture();
    initParallax();
    initParticles(currentTheme);
    initSmoothScrolling();
  });

})();
