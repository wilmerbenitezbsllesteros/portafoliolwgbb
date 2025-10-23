// JavaScript para el portafolio de Wilmer Benitez
// Funcionalidad principal del sitio web

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // NAVEGACIÓN MÓVIL (Hamburguesa)
    // ============================================
    
    // Obtener elementos del menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Función para alternar el menú móvil
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
    
    // Event listener para el botón hamburguesa
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Cerrar menú móvil al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // ============================================
    // SCROLL SUAVE Y NAVEGACIÓN
    // ============================================
    
    // Función para scroll suave a secciones
    function smoothScrollTo(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Ajustar por la altura del navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    // Agregar event listeners a todos los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevenir comportamiento por defecto
            
            const targetId = this.getAttribute('href');
            smoothScrollTo(targetId);
        });
    });
    
    // ============================================
    // FORMULARIO DE CONTACTO
    // ============================================
    
    // Obtener el formulario de contacto
    const contactForm = document.getElementById('contactForm');
    
    // Función para manejar el envío del formulario
    function handleFormSubmit(e) {
        e.preventDefault(); // Prevenir envío por defecto del formulario
        
        // Obtener los datos del formulario
        const formData = new FormData(contactForm);
        const nombre = formData.get('nombre');
        const correo = formData.get('correo');
        const mensaje = formData.get('mensaje');
        
        // Validar que todos los campos estén completos
        if (!nombre || !correo || !mensaje) {
            alert('Por favor, completa todos los campos del formulario.');
            return;
        }
        
        // Validar formato de email básico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }
        
        // Mostrar mensaje de éxito en consola
        console.log('Formulario enviado correctamente');
        console.log('Datos del formulario:', {
            nombre: nombre,
            correo: correo,
            mensaje: mensaje
        });
        
        // Mostrar mensaje de éxito al usuario
        showSuccessMessage();
        
        // Limpiar el formulario
        contactForm.reset();
    }
    
    // Función para mostrar mensaje de éxito
    function showSuccessMessage() {
        // Crear elemento de mensaje de éxito
        const successMessage = document.createElement('div');
        successMessage.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #7FDBBC, #14D8D9);
                color: #0f172a;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: 0 10px 25px rgba(127, 219, 188, 0.3);
                z-index: 10000;
                font-weight: 600;
                animation: slideInRight 0.5s ease-out;
            ">
                ✅ ¡Mensaje enviado correctamente!
            </div>
        `;
        
        // Agregar estilos de animación
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Agregar el mensaje al DOM
        document.body.appendChild(successMessage);
        
        // Remover el mensaje después de 3 segundos
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    }
    
    // Agregar event listener al formulario
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // ============================================
    // EFECTOS DE SCROLL Y ANIMACIONES
    // ============================================
    
    // Función para agregar efectos de scroll
    function addScrollEffects() {
        // Obtener todos los elementos que deben animarse
        const animatedElements = document.querySelectorAll('.experience-item, .project-card, .skill-card');
        
        // Crear un observer para detectar cuando los elementos entran en vista
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observar todos los elementos animables
        animatedElements.forEach(element => {
            // Configurar estado inicial
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            
            // Comenzar a observar el elemento
            observer.observe(element);
        });
    }
    
    // Llamar a la función de efectos de scroll
    addScrollEffects();
    
    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    
    // Función para cambiar el estilo del navbar al hacer scroll
    function handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(226, 232, 240, 0.1)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
    
    // Agregar event listener para el scroll
    window.addEventListener('scroll', handleNavbarScroll);
    
    // ============================================
    // EFECTOS HOVER MEJORADOS
    // ============================================
    
    // Función para agregar efectos hover mejorados
    function addHoverEffects() {
        // Efectos para las tarjetas de proyecto
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Efectos para las tarjetas de habilidades
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.05)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Llamar a la función de efectos hover
    addHoverEffects();
    
    // ============================================
    // VALIDACIÓN EN TIEMPO REAL DEL FORMULARIO
    // ============================================
    
    // Función para validación en tiempo real
    function addRealTimeValidation() {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Validar mientras el usuario escribe
            input.addEventListener('input', function() {
                validateField(this);
            });
            
            // Validar cuando el usuario sale del campo
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }
    
    // Función para validar un campo individual
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        // Remover clases de error previas
        field.classList.remove('error');
        
        // Validaciones específicas por campo
        if (fieldName === 'nombre') {
            if (value.length < 2) {
                showFieldError(field, 'El nombre debe tener al menos 2 caracteres');
            }
        } else if (fieldName === 'correo') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                showFieldError(field, 'Ingresa un correo electrónico válido');
            }
        } else if (fieldName === 'mensaje') {
            if (value.length < 10) {
                showFieldError(field, 'El mensaje debe tener al menos 10 caracteres');
            }
        }
    }
    
    // Función para mostrar error en un campo
    function showFieldError(field, message) {
        field.classList.add('error');
        
        // Crear o actualizar mensaje de error
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.cssText = `
                color: #ff6b6b;
                font-size: 0.8rem;
                margin-top: 5px;
            `;
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }
    
    // Agregar estilos CSS para campos con error
    const errorStyles = document.createElement('style');
    errorStyles.textContent = `
        .form-group input.error,
        .form-group textarea.error {
            border-color: #ff6b6b !important;
            box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1) !important;
        }
    `;
    document.head.appendChild(errorStyles);
    
    // Llamar a la función de validación en tiempo real
    if (contactForm) {
        addRealTimeValidation();
    }
    
    // ============================================
    // INICIALIZACIÓN COMPLETA
    // ============================================
    
    console.log('🚀 Portafolio de Wilmer Benitez cargado correctamente');
    console.log('📧 Formulario de contacto listo para recibir mensajes');
    console.log('🎨 Efectos visuales y animaciones activados');
    
});

// ============================================
// FUNCIONES UTILITARIAS ADICIONALES
// ============================================

// Función para mostrar información de contacto en consola
function showContactInfo() {
    console.log('📞 Información de Contacto:');
    console.log('👤 Nombre: Wilmer Giovanny Benitez Ballesteros');
    console.log('💼 Profesión: Administrador en Negocios Internacionales');
    console.log('🌐 LinkedIn: Disponible en el sitio web');
    console.log('💻 GitHub: Disponible en el sitio web');
}

// Función para mostrar estadísticas del sitio
function showSiteStats() {
    const sections = document.querySelectorAll('section').length;
    const projects = document.querySelectorAll('.project-card').length;
    const skills = document.querySelectorAll('.skill-card').length;
    
    console.log('📊 Estadísticas del Sitio:');
    console.log(`📄 Secciones: ${sections}`);
    console.log(`🚀 Proyectos: ${projects}`);
    console.log(`💡 Habilidades: ${skills}`);
}

// Llamar a las funciones de información (opcional)
// showContactInfo();
// showSiteStats();
