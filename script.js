/* ================================================================
   BAIA27 - SCRIPT INTERATTIVO
   Gestione navbar, menu mobile, form prenotazione
   ================================================================ */

document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initMobileMenu();
    initHeroSlider();
    initFormHandling();
    initScrollAnimation();
});

/* ================================================================
   HERO SLIDER - Scorrimento automatico immagini
   ================================================================ */

function initHeroSlider() {
    const slides = document.querySelectorAll('.slider-slide');
    const slideInterval = 3500; // Cambia qui il tempo in millisecondi (es. 3000 = 3 secondi)

    if (!slides.length) {
        return;
    }

    let currentIndex = 0;

    setInterval(function() {
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add('active');
    }, slideInterval);
}

/* ================================================================
   NAVBAR - Gestione scroll e effetti
   ================================================================ */

function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Chiudi il menu mobile quando si clicca su un link
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

/* ================================================================
   MOBILE MENU - Toggle hamburger
   ================================================================ */

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Chiudi il menu quando si clicca fuori
    document.addEventListener('click', function(event) {
        const isClickInsideNav = hamburger.contains(event.target) || navMenu.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

/* ================================================================
   FORM PRENOTAZIONE
   ================================================================ */

function initFormHandling() {
    const form = document.getElementById('reservationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Raccogli i dati del form
            const formData = new FormData(form);
            
            // Mostra messaggio di conferma
            showNotification('Prenotazione inviata con successo! Ti contatteremo presto per confermare.');
            
            // Resetta il form
            form.reset();
            
            // Nota: In un sito reale, qui manderesti i dati al server
            // Ad esempio con fetch() o XHR
            console.log('Dati prenotazione:', {
                nome: form.querySelector('input[type="text"]').value,
                email: form.querySelector('input[type="email"]').value,
                telefono: form.querySelector('input[type="tel"]').value,
                data: form.querySelector('input[type="date"]').value,
                ora: form.querySelector('input[type="time"]').value,
                ospiti: form.querySelector('select').value,
                note: form.querySelector('textarea').value
            });
        });
    }
}

/* ================================================================
   NOTIFICHE
   ================================================================ */

function showNotification(message) {
    // Crea una notifica di successo
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.textContent = message;
    
    // Aggiungi lo stile CSS alla notifica
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 16px 24px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 2000;
        animation: slideIn 0.3s ease;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 14px;
    `;
    
    document.body.appendChild(notification);
    
    // Rimuovi la notifica dopo 4 secondi
    setTimeout(function() {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 4000);
}

/* ================================================================
   ANIMAZIONI CSS
   ================================================================ */

// Aggiungi le keyframe animation dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* ================================================================
   SCROLL ANIMATION - Fade in su scroll
   ================================================================ */

function initScrollAnimation() {
    // Observer per animazioni su scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Anima gli elementi al caricamento
    const elementsToAnimate = document.querySelectorAll(
        '.section-header, .about-content, .menu-section, .value-card, .contact-content'
    );
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

/* ================================================================
   UTILITY - Helper functions
   ================================================================ */

// Scroll liscio verso un elemento
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Log per debug (commenta in produzione)
console.log('BAIA27 - Script caricato correttamente');
