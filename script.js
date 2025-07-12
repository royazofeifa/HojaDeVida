document.addEventListener('DOMContentLoaded', function() {
  // 1. Configuración del tema oscuro/claro
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  // Aplicar el tema guardado o el del sistema
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeButton(currentTheme);

  // Configurar el evento click del botón
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeButton(newTheme);
      updateParticlesTheme(newTheme);
    });
  }

  function updateThemeButton(theme) {
    if (themeToggle) {
      themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  // 2. Animaciones reveal al hacer scroll
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // 3. Efecto de fondo revelado
  const backgroundEffect = document.querySelector('.cv-background-effect');
  if (backgroundEffect) {
    const backgroundObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          backgroundEffect.classList.add('active');
        } else {
          backgroundEffect.classList.remove('active');
        }
      });
    }, { threshold: 0.1 });
    
    backgroundObserver.observe(document.querySelector('.cv-container'));
  }

  // 4. Tooltip moderno en los contactos
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

  // 5. Resplandor dinámico al hacer clic en la foto de perfil
  const profilePic = document.querySelector('.profile-pic');
  if (profilePic) {
    profilePic.addEventListener('click', () => {
      profilePic.classList.toggle('glowing-click');
    });
  }

  // 6. Animación parallax suave en scroll para experiencia laboral
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    document.querySelectorAll('.job').forEach((el, index) => {
      el.style.transform = `translateY(${scrollY * 0.01 * (index + 1)}px)`;
    });
  });

  // 7. Inicialización de tsParticles
  initializeParticles(currentTheme);
});

// Función auxiliar para posicionar el tooltip
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
  if (leftPos < 10) leftPos = 10;
  if (topPos < 10) topPos = 10;

  tooltip.style.left = `${leftPos}px`;
  tooltip.style.top = `${topPos}px`;
}

// Función para actualizar el tema de las partículas
function updateParticlesTheme(theme) {
  tsParticles.dom().then(container => {
    if (container && container.length > 0) {
      container[0].loadTheme(theme);
    }
  }).catch(error => console.error("Error changing particles theme:", error));
}

// Función para inicializar las partículas
function initializeParticles(theme) {
  tsParticles.load("tsparticles", {
    fullScreen: { enable: true, zIndex: -1 },
    background: { color: { value: "transparent" } },
    particles: {
      number: {
        value: 80,
        density: { enable: true, area: 800 }
      },
      color: {
        value: theme === 'dark' ? "#00ff00" : "#00ccff"
      },
      shape: { type: "circle" },
      opacity: {
        value: { min: 0.1, max: 0.5 },
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
          sync: false
        }
      },
      size: {
        value: { min: 1, max: 5 },
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.1,
          sync: false
        }
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
        direction: "none",
        random: false,
        straight: false,
        outModes: "out",
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 1200 }
      }
    },
    interactivity: {
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
        resize: true
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { quantity: 4 }
      }
    },
    retina_detect: true,
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

// Suavizado de Scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
