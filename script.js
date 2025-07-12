// ==========================================================
// CV Interactivo: JavaScript para animaciones y mejoras de UI
// ==========================================================

// Define profilePic here so it's accessible globally
const profilePic = document.querySelector('.profile-pic');

// 1. Animación "reveal" al hacer scroll para elementos con clase '.reveal'
// ----------------------------------------------------------------------
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active'); // *** CAMBIADO DE 'show' A 'active' ***
            // Si quieres que el elemento solo se revele una vez:
            // revealObserver.unobserve(entry.target);
        } else {
            // Opcional: remueve 'active' cuando sale de la vista, si quieres que se re-anime al volver a scrollear
            entry.target.classList.remove('active');
        }
    });
}, { threshold: 0.1 }); // Ajusta este umbral para controlar cuándo aparece el elemento

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// 2. Efecto de zoom y brillo suave en los links de contacto (gestionado por CSS)
// ----------------------------------------------------------------------
// Este efecto se maneja mejor solo con CSS para rendimiento y simplicidad.
// Se ha eliminado el código JS redundante para mouseenter/mouseleave.
// La función `positionTooltip` se ha movido para ser global.

// 3. Animación máquina de escribir para el subtítulo (gestionado por CSS)
// --------------------------------------------------------------------
// Se mantiene comentado si estás usando la solución CSS.
/*
function typeSubtitle(element, text, delay = 60) {
    let i = 0;
    element.textContent = '';
    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, delay);
        }
    }
    typing();
}
*/

// 4. Animación "float" leve en foto de perfil (se recomienda CSS)
// -----------------------------------------------------------
// Este efecto está mejor gestionado por CSS para rendimiento.
// Si deseas mantener el JS para este efecto y que no choque con CSS, tendrías que asegurarte de que el CSS no tenga animaciones de transform en .profile-pic.
// Por ahora, se ha comentado el JS del float para priorizar la animación CSS 'initialPulse'.
/*
if (profilePic) {
    let floatOffset = 0;
    let floatDirection = 1;
    const floatAmplitude = 2;
    const floatSpeed = 0.05;

    function animateFloat() {
        floatOffset += floatDirection * floatSpeed;
        if (floatOffset > floatAmplitude || floatOffset < -floatAmplitude) {
            floatDirection *= -1;
        }
        profilePic.style.transform = `translateY(${floatOffset}px) scale(1.02)`;
        requestAnimationFrame(animateFloat);
    }
    animateFloat();
}
*/

// 5. Brillo dinámico en el borde de la hoja (cv-container) según mouse
// -------------------------------------------------------------------
// Este efecto puede ser bastante distractor para un CV. Se mantiene, pero se podría considerar quitarlo.
const container = document.querySelector('.cv-container');
if (container) {
    container.addEventListener('mousemove', (e) => {
        const x = e.clientX - container.getBoundingClientRect().left;
        const y = e.clientY - container.getBoundingClientRect().top;

        const intensityX = (x - container.clientWidth / 2) / 15;
        const intensityY = (y - container.clientHeight / 2) / 15;

        container.style.boxShadow = `
            0 0 20px rgba(0,0,0,0.1),
            ${intensityX}px ${intensityY}px 30px rgba(0, 140, 255, 0.25)
        `;
    });

    container.addEventListener('mouseleave', () => {
        // Asegúrate de que este box-shadow coincida con el box-shadow de CSS por defecto
        container.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.2)'; // Restaura la sombra base
    });
}

// Función auxiliar para posicionar el tooltip (definida una vez globalmente)
function positionTooltip(e, tooltip) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;

    let leftPos = mouseX + 15;
    let topPos = mouseY + 15;

    // Ajusta la posición si el tooltip se sale de la pantalla
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

// 6. Tooltip moderno en los contactos
// ---------------------------------
document.querySelectorAll('.contact-info a').forEach(link => {
    const tooltipText = link.getAttribute('data-tooltip') || link.textContent.trim();

    link.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = tooltipText;
        document.body.appendChild(tooltip);

        positionTooltip(e, tooltip); // Posicionamiento inicial
    });

    link.addEventListener('mousemove', (e) => {
        const tooltip = document.querySelector('.custom-tooltip');
        if (tooltip) {
            positionTooltip(e, tooltip); // Actualiza la posición al mover el mouse
        }
    });

    link.addEventListener('mouseleave', () => {
        const tooltip = document.querySelector('.custom-tooltip');
        if (tooltip) tooltip.remove(); // Elimina el tooltip
    });
});


// 7. Resplandor dinámico al hacer clic en la foto de perfil
// --------------------------------------------------------
if (profilePic) {
    profilePic.addEventListener('click', () => {
        profilePic.classList.toggle('glowing-click');
    });
}

// 8. Animación parallax suave en scroll para experiencia laboral
// -------------------------------------------------------------
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    document.querySelectorAll('.job').forEach((el, index) => {
        el.style.transform = `translateY(${scrollY * 0.01 * (index + 1)}px)`;
    });
});

// ==========================================================
// Event Listener Principal DOMContentLoaded: Toda la lógica que requiere el DOM listo
// ==========================================================
window.addEventListener('DOMContentLoaded', () => {

    // 9. Funcionalidad de cambio de tema (Claro/Oscuro) con ícono dinámico y tsParticles theme change
    // ---------------------------------------------------------------------------------------------
    const themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {
        // Función para establecer el tema, actualizar el ícono y cambiar el tema de tsParticles
        const setTheme = (newTheme) => {
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme); // Guarda la preferencia
            themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙'; // Cambia el ícono

            // Dispara el cambio de tema de tsParticles
            tsParticles.dom().then(container => {
                if (container && container.length > 0) {
                    container[0].loadTheme(newTheme);
                }
            }).catch(error => console.error("Error cargando tema de tsParticles:", error));
        };

        // Inicializa el tema basado en la preferencia guardada o la del sistema
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme); // Carga el tema guardado
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark'); // Usa la preferencia del sistema operativo
        } else {
            setTheme('light'); // Por defecto, tema claro
        }

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }


    // 10. Configuración e inicialización de tsParticles para el efecto de "Neuronas" / Red
    // -----------------------------------------------------------------------------------
    // Obtiene el tema actual para inicializar tsParticles con el color correcto
    // Asumimos "dark" como inicial para el efecto "Matrix" verde, pero cambia con el tema.
    const initialThemeForParticles = document.documentElement.getAttribute('data-theme') || 'dark';

    tsParticles.load("tsparticles", {
        fullScreen: { enable: true, zIndex: -1 }, // Asegura que ocupe toda la pantalla y esté detrás
        background: {
            color: { value: "transparent" } // Fondo transparente para que se vea el color de fondo del body/CSS
        },
        particles: {
            number: {
                value: 80, // Número de partículas. Puedes aumentar/disminuir si quieres más/menos "neuronas"
                density: {
                    enable: true,
                    area: 800 // Densidad del área donde aparecen las partículas
                }
            },
            color: {
                // Colores que cambian con el tema
                value: initialThemeForParticles === 'dark' ? "#00ff00" : "#00ccff" // Verde brillante para oscuro, azul cian para claro
            },
            shape: {
                type: "circle" // Forma de las partículas (círculos)
            },
            opacity: {
                value: { min: 0.1, max: 0.5 }, // Opacidad variable de las partículas
                animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 0.1,
                    sync: false
                }
            },
            size: {
                value: { min: 1, max: 5 }, // Tamaño variable de las partículas
                animation: {
                    enable: true,
                    speed: 2,
                    minimumValue: 0.1,
                    sync: false
                }
            },
            links: {
                enable: true, // *** ESTO ES CLAVE PARA EL EFECTO DE RED/NEURONAS (las conexiones) ***
                distance: 150, // Distancia máxima para que dos partículas se conecten
                color: {
                    // Color de las líneas que conectan las partículas
                    value: initialThemeForParticles === 'dark' ? "#00ff00" : "#00ccff"
                },
                opacity: 0.4, // Opacidad de las líneas
                width: 1 // Grosor de las líneas
            },
            move: {
                enable: true,
                speed: 1.5, // Velocidad de movimiento de las partículas
                direction: "none",
                random: false,
                straight: false,
                outModes: "out", // Las partículas desaparecen al salir del lienzo
                bounce: false, // No rebotan en los bordes
                attract: { enable: false, rotateX: 600, rotateY: 1200 }
            }
        },
        interactivity: {
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse" // Efecto de repulsión al pasar el mouse
                },
                onclick: {
                    enable: true,
                    mode: "push" // Empuja partículas al hacer clic
                },
                resize: true
            },
            modes: {
                repulse: {
                    distance: 100, // Distancia del efecto de repulsión
                    duration: 0.4
                },
                push: {
                    quantity: 4 // Cantidad de partículas a añadir al hacer clic
                }
            }
        },
        retina_detect: true,
        themes: [ // Configuración de temas para cambiar el color de las partículas y los enlaces
            {
                name: "light",
                options: {
                    particles: {
                        color: {
                            value: "#00ccff", // Azul brillante para modo claro
                        },
                        links: {
                            color: "#00ccff",
                        },
                    },
                },
            },
            {
                name: "dark",
                options: {
                    particles: {
                        color: {
                            value: "#00ff00", // Verde Matrix para modo oscuro
                        },
                        links: {
                            color: "#00ff00",
                        },
                    },
                },
            },
        ],
    });
}); // Fin de window.addEventListener('DOMContentLoaded')

// 11. Suavizado de Scroll para enlaces internos
// -------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});