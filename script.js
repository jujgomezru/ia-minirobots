// Mobile menu functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Notebook data structure
const notebooks = [
    {
        title: "Introducción a la IA",
        description: "Conceptos básicos de inteligencia artificial y sus aplicaciones en robótica.",
        icon: "fas fa-brain",
        file: "notebooks/introduccion-ia.ipynb",
        category: "fundamentos"
    },
    {
        title: "Control de Motores",
        description: "Programación y control de motores para mini-robots usando Python.",
        icon: "fas fa-cog",
        file: "notebooks/control-motores.ipynb",
        category: "hardware"
    },
    {
        title: "Visión por Computadora",
        description: "Procesamiento de imágenes y reconocimiento de objetos para robots.",
        icon: "fas fa-eye",
        file: "notebooks/vision-computadora.ipynb",
        category: "vision"
    },
    {
        title: "Navegación Autónoma",
        description: "Algoritmos de navegación y planificación de rutas para robots móviles.",
        icon: "fas fa-route",
        file: "notebooks/navegacion-autonoma.ipynb",
        category: "navegacion"
    },
    {
        title: "Aprendizaje por Refuerzo",
        description: "Implementación de algoritmos de RL para el control inteligente de robots.",
        icon: "fas fa-graduation-cap",
        file: "notebooks/aprendizaje-refuerzo.ipynb",
        category: "ml"
    },
    {
        title: "Sensores y Actuadores",
        description: "Interfaz con sensores y actuadores comunes en mini-robots.",
        icon: "fas fa-microchip",
        file: "notebooks/sensores-actuadores.ipynb",
        category: "hardware"
    }
];

// Function to create notebook cards
function createNotebookCard(notebook) {
    return `
        <div class="notebook-card">
            <h3>
                <i class="${notebook.icon}"></i>
                ${notebook.title}
            </h3>
            <p>${notebook.description}</p>
            <a href="${notebook.file}" class="notebook-link" target="_blank">
                <i class="fas fa-external-link-alt"></i>
                Abrir Notebook
            </a>
        </div>
    `;
}

// Function to load and display notebooks
function loadNotebooks() {
    const notebooksGrid = document.getElementById('notebooks-grid');
    
    if (notebooks.length === 0) {
        notebooksGrid.innerHTML = `
            <div class="no-notebooks">
                <i class="fas fa-file-code"></i>
                <h3>Próximamente</h3>
                <p>Los notebooks se añadirán próximamente a este repositorio.</p>
            </div>
        `;
        return;
    }
    
    notebooksGrid.innerHTML = '';
    
    notebooks.forEach(notebook => {
        notebooksGrid.innerHTML += createNotebookCard(notebook);
    });
}

// Function to handle notebook clicks and check if files exist
function setupNotebookLinks() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('notebook-link') || e.target.parentElement.classList.contains('notebook-link')) {
            e.preventDefault();
            
            const link = e.target.classList.contains('notebook-link') ? e.target : e.target.parentElement;
            const notebookPath = link.getAttribute('href');
            
            // Check if the notebook file exists
            fetch(notebookPath)
                .then(response => {
                    if (response.ok) {
                        // If file exists, open it
                        window.open(notebookPath, '_blank');
                    } else {
                        // If file doesn't exist, show a message
                        showNotebookMessage(link, 'Este notebook estará disponible próximamente.');
                    }
                })
                .catch(() => {
                    // If there's an error (file doesn't exist), show a message
                    showNotebookMessage(link, 'Este notebook estará disponible próximamente.');
                });
        }
    });
}

// Function to show temporary messages
function showNotebookMessage(element, message) {
    const originalText = element.innerHTML;
    element.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`;
    element.style.color = '#ffa500';
    
    setTimeout(() => {
        element.innerHTML = originalText;
        element.style.color = '';
    }, 3000);
}

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize fade-in animations
function initAnimations() {
    const animatedElements = document.querySelectorAll('.notebook-card, .feature');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadNotebooks();
    setupNotebookLinks();
    
    // Delay animations slightly to ensure everything is rendered
    setTimeout(initAnimations, 100);
});

// Add some interactive particle effects
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '6px';
    particle.style.height = '6px';
    particle.style.background = '#ffa500';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.animation = 'particleExplode 0.8s ease-out forwards';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 800);
}

// Add particle explosion on CTA button click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('cta-button') || e.target.parentElement.classList.contains('cta-button')) {
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                createParticle(
                    e.clientX + (Math.random() - 0.5) * 40,
                    e.clientY + (Math.random() - 0.5) * 40
                );
            }, i * 50);
        }
    }
});

// Add CSS for particle explosion animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particleExplode {
        0% {
            transform: scale(1) translateY(0px);
            opacity: 1;
        }
        100% {
            transform: scale(0) translateY(-30px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);