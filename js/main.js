/**
 * CALHAS PAINEIRA - JavaScript Personalizado
 * Interações, Animações e Funcionalidades
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // INICIALIZAÇÃO AOS (Animate On Scroll)
    // ========================================
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // ========================================
    // HERO SWIPER
    // ========================================
    const heroSwiper = new Swiper('.hero-swiper', {
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        }
    });

    // ========================================
    // PRODUTOS SWIPER
    // ========================================
    const produtosSwiper = new Swiper('.produtos-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        speed: 600,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            992: {
                slidesPerView: 4,
                spaceBetween: 30
            }
        }
    });

    // ========================================
    // SERVIÇOS SWIPER
    // ========================================
    const servicosSwiper = new Swiper('.servicos-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        speed: 600,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 30
            }
        }
    });

    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    const navbar = document.getElementById('mainNavbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            backToTop.classList.add('active');
        } else {
            navbar.classList.remove('scrolled');
            backToTop.classList.remove('active');
        }
    });
    
    // Fechar menu mobile ao clicar em link
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // Abrir/fechar menu com overlay
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', () => {
            setTimeout(() => {
                if (navbarCollapse.classList.contains('show')) {
                    document.body.classList.add('menu-open');
                } else {
                    document.body.classList.remove('menu-open');
                }
            }, 10);
        });
        
        // Fechar ao clicar no overlay
        document.addEventListener('click', (e) => {
            if (navbarCollapse.classList.contains('show') && 
                !navbarCollapse.contains(e.target) && 
                !navbarToggler.contains(e.target)) {
                navbarCollapse.classList.remove('show');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // ========================================
    // BACK TO TOP
    // ========================================
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========================================
    // CONTADOR ANIMADO (NÚMEROS) - CORRIGIDO
    // ========================================
    const counters = document.querySelectorAll('.numero-value');
    
    // Função para formatar número com separador de milhar
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };
    
    // Função para animar um único contador
    const animateCounter = (counter, target, duration = 2000) => {
        const startTime = performance.now();
        const startValue = 0;
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (easeOutQuart)
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
            
            // Atualiza o texto
            if (target > 1000) {
                counter.innerText = formatNumber(currentValue);
            } else {
                counter.innerText = currentValue;
            }
            
            // Continua animando se não chegou ao fim
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Garante o valor final exato
                if (target > 1000) {
                    counter.innerText = formatNumber(target);
                } else {
                    counter.innerText = target;
                }
            }
        };
        
        // Inicializa com 0
        counter.innerText = '0';
        requestAnimationFrame(updateCounter);
    };
    
    // Observer para iniciar contagem quando visível
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.getAttribute('data-count'), 10);
                animateCounter(entry.target, target, 2500);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    // Observa cada contador individualmente
    counters.forEach(counter => {
        counter.innerText = '0';
        counterObserver.observe(counter);
    });

    // ========================================
    // SMOOTH SCROLL NAV LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = target.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Fechar menu mobile se aberto
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            }
        });
    });

    // ========================================
    // FORMULÁRIO DE ORÇAMENTO
    // ========================================
    const formOrcamento = document.getElementById('formOrcamento');
    
    if (formOrcamento) {
        formOrcamento.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio
            const btnSubmit = this.querySelector('button[type="submit"]');
            const originalText = btnSubmit.innerHTML;
            
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando...';
            
            setTimeout(() => {
                btnSubmit.innerHTML = '<i class="bi bi-check-circle me-2"></i>Enviado com sucesso!';
                btnSubmit.classList.remove('btn-primary');
                btnSubmit.classList.add('btn-success');
                
                // Reset após 3 segundos
                setTimeout(() => {
                    formOrcamento.reset();
                    btnSubmit.disabled = false;
                    btnSubmit.innerHTML = originalText;
                    btnSubmit.classList.remove('btn-success');
                    btnSubmit.classList.add('btn-primary');
                }, 3000);
            }, 2000);
        });
    }

    // ========================================
    // MÁSCARA TELEFONE
    // ========================================
    const telefoneInputs = document.querySelectorAll('input[type="tel"]');
    
    telefoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            
            if (value.length > 2) {
                value = '(' + value.slice(0, 2) + ') ' + value.slice(2);
            }
            
            if (value.length > 10) {
                value = value.slice(0, 10) + '-' + value.slice(10);
            } else if (value.length > 9) {
                value = value.slice(0, 9) + '-' + value.slice(9);
            }
            
            e.target.value = value;
        });
    });

    // ========================================
    // HEADER ATIVO NA SEÇÃO
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNav = () => {
        const scrollY = window.scrollY;
        const navHeight = navbar.offsetHeight;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', highlightNav);

    // ========================================
    // PORTFOLIO LIGHTBOX (Simples)
    // ========================================
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const overlay = this.querySelector('.portfolio-overlay');
            const title = overlay.querySelector('h5').textContent;
            const desc = overlay.querySelector('p').textContent;
            
            // Criar modal dinâmico
            const modal = document.createElement('div');
            modal.className = 'portfolio-modal';
            modal.innerHTML = `
                <div class="modal-overlay">
                    <div class="modal-content">
                        <button class="modal-close">&times;</button>
                        <img src="${img.src}" alt="${title}">
                        <div class="modal-info">
                            <h4>${title}</h4>
                            <p>${desc}</p>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            // Animação entrada
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            
            // Fechar modal
            modal.querySelector('.modal-close').addEventListener('click', closeModal);
            modal.querySelector('.modal-overlay').addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal();
                }
            });
            
            function closeModal() {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.remove();
                    document.body.style.overflow = '';
                }, 300);
            }
            
            // Fechar com ESC
            document.addEventListener('keydown', function escClose(e) {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', escClose);
                }
            });
        });
    });

    // ========================================
    // LAZY LOADING IMAGES
    // ========================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));

    // ========================================
    // ANIMAÇÃO PARALLAX SUAVE
    // ========================================
    let ticking = false;
    
    const parallaxEffect = () => {
        const scrolled = window.scrollY;
        const parallaxElements = document.querySelectorAll('.hero-slide');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.backgroundPositionY = yPos + 'px';
        });
        
        ticking = false;
    };
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(parallaxEffect);
            ticking = true;
        }
    });

    // ========================================
    // PRELOADER (Opcional)
    // ========================================
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }
    });

    console.log('🚀 Calhas Paineira - Site carregado com sucesso!');
});

// ========================================
// CSS PARA MODAL PORTFOLIO (Adicionado via JS)
// ========================================
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .portfolio-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .portfolio-modal.active {
        opacity: 1;
        visibility: visible;
    }
    
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }
    
    .modal-content {
        position: relative;
        max-width: 900px;
        width: 100%;
        background: white;
        border-radius: 12px;
        overflow: hidden;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    }
    
    .portfolio-modal.active .modal-content {
        transform: scale(1);
    }
    
    .modal-close {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 40px;
        height: 40px;
        background: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        z-index: 10;
        transition: all 0.3s ease;
    }
    
    .modal-close:hover {
        background: #f4a261;
        color: white;
    }
    
    .modal-content img {
        width: 100%;
        height: auto;
        display: block;
    }
    
    .modal-info {
        padding: 25px;
    }
    
    .modal-info h4 {
        color: #1e5a8e;
        margin-bottom: 10px;
    }
    
    .modal-info p {
        color: #6c757d;
        margin: 0;
    }
`;
document.head.appendChild(modalStyles);
