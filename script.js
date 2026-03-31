/* ============================================
   MENU HAMBURGER
   ============================================ */

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu hamburger
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && !e.target.closest('.hamburger')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

/* ============================================
   NAVBAR SCROLL EFFECT
   ============================================ */

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    }
});

/* ============================================
   ACTIVE NAV LINK ON SCROLL
   ============================================ */

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

/* ============================================
   SCROLL INDICATOR FADE OUT
   ============================================ */

const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
    } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.pointerEvents = 'auto';
    }
});

/* ============================================
   RIPPLE EFFECT NO BOTÃO CTA
   ============================================ */

const ctaButton = document.querySelector('.cta-button');

ctaButton.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.cssText += `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        pointer-events: none;
        animation: rippleEffect 0.6s ease-out;
    `;

    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
});

/* ============================================
   ANIMAÇÃO DO RIPPLE EFFECT
   ============================================ */

const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* ============================================
   SMOOTH SCROLL COM OFFSET NA NAVBAR
   ============================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

/* ============================================
   INTERSECTION OBSERVER - ANIMAÇÕES AO SCROLL
   ============================================ */

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease 0.3s both';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos com classe 'where-container'
document.querySelectorAll('.where-container').forEach(el => {
    observer.observe(el);
});

const items = [
    {
        image: 'assets/calcario.jpg',
        title: 'Calcário',
        description: 'O calcário é essencial para regular o pH do solo e fornecer cálcio e magnésio, garantindo produtividade e sustentabilidade. O transporte a granel via caminhões otimiza o processo, entregando o insumo de forma direta e eficiente. Essa escolha gera economia ao eliminar custos com embalagens e reduzir o impacto ambiental. Além de prático, o método preserva a integridade do produto até o destino final. Assim, a logística inteligente fortalece o desenvolvimento vigoroso das lavouras e a saúde da terra.'
    },
    {
        image: 'assets/farelo-soja.jpg',
        title: 'Farelo de Soja',
        description: 'O farelo de soja é um aliado vital na nutrição agrícola, destacando-se como uma rica fonte de proteínas e nutrientes essenciais. Utilizado amplamente na alimentação animal, especialmente para aves e suínos, o farelo de soja contribui para o desenvolvimento saudável dos animais. Sua versatilidade também o torna uma opção valiosa na produção de rações balanceadas. Com qualidade nutricional superior, o farelo de soja é um componente essencial na cadeia alimentar.'
    },
    {
        image: 'assets/fertilizantes.jpg',
        title: 'Fertilizantes',
        description: 'Os fertilizantes são a espinha dorsal da produtividade agrícola, oferecendo nutrientes essenciais para o solo e impulsionando o crescimento saudável das plantas. Compostos por uma variedade de elementos como nitrogênio, fósforo e potássio, esses insumos desempenham um papel vital na otimização da qualidade do solo e no aumento da eficiência da produção agrícola.'
    },
    {
        image: 'assets/milho.jpg',
        title: 'Milho',
        description: 'O milho é um grão dourado e suculento que traz um toque doce e nutritivo aos nossos pratos. Originário da América Central, é um alimento versátil, usado desde pipocas divertidas até pratos tradicionais. Com sua cor vibrante e sabor delicioso, o milho é um tesouro culinário que agrada paladares em todo o mundo.'
    },
    {
        image: 'assets/oleo-vegetal.jpg',
        title: 'Óleo Vegetal',
        description: 'Óleos vegetais são substâncias gordurosas extraídas de sementes, frutos ou plantas, ricos em ácidos graxos, vitaminas e antioxidantes, essenciais para nutrição e cuidados com a pele/cabelo. Utilizados na culinária, cosmética e como carreadores em aromaterapia, os óleos prensados a frio preservam mais nutrientes.'
    },
    {
        image: 'assets/soja-desativada.jpg',
        title: 'Soja Desativada',
        description: 'A soja desativada é uma versão processada da soja, passando por um tratamento térmico para inativar enzimas que poderiam prejudicar a qualidade e estabilidade dos produtos finais. Esse processo confere à soja desativada características únicas, tornando-a uma escolha valiosa na indústria alimentícia, especialmente na produção de ingredientes versáteis.'
    },
    {
        image: 'assets/sorgo.jpg',
        title: 'Sorgo',
        description: 'O sorgo é um grão robusto e versátil, apresentando-se em diferentes variedades, desde o doce até o usado para ração animal. Originário da África, o sorgo conquistou espaço global devido à sua resistência e adaptabilidade.'
    },
    {
        image: 'assets/soja.jpg',
        title: 'Soja',
        description: 'A soja é um dos pilares da agricultura global, destacando-se como uma cultura versátil e nutritiva. Cultivada em várias regiões, a soja oferece uma ampla gama de produtos, desde alimentos até ingredientes industriais valiosos. Com sua riqueza em proteínas e benefícios nutricionais, a soja desempenha um papel essencial na alimentação humana e animal.'
    }
];

let currentIndex = 0;

function renderCarousel() {
    const carousel = document.querySelector('.transportes .carousel');
    if (!carousel) return;

    carousel.innerHTML = '';

    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    const nextIndex = (currentIndex + 1) % items.length;

    const previous = items[prevIndex];
    const current = items[currentIndex];
    const next = items[nextIndex];

    const prevImg = document.createElement('img');
    prevImg.src = previous.image;
    prevImg.alt = previous.title;
    prevImg.className = 'side';
    prevImg.style.opacity = '0';
    prevImg.addEventListener('click', () => {
        currentIndex = prevIndex;
        renderCarousel();
        updateContent();
    });

    const currentImg = document.createElement('img');
    currentImg.src = current.image;
    currentImg.alt = current.title;
    currentImg.className = 'active';
    currentImg.style.opacity = '0';

    const nextImg = document.createElement('img');
    nextImg.src = next.image;
    nextImg.alt = next.title;
    nextImg.className = 'side';
    nextImg.style.opacity = '0';
    nextImg.addEventListener('click', () => {
        currentIndex = nextIndex;
        renderCarousel();
        updateContent();
    });

    carousel.appendChild(prevImg);
    carousel.appendChild(currentImg);
    carousel.appendChild(nextImg);

    requestAnimationFrame(() => {
        prevImg.style.opacity = '0.6';
        currentImg.style.opacity = '1';
        nextImg.style.opacity = '0.6';
    });
}

function updateContent() {
    const titleElement = document.getElementById('title');
    const descriptionElement = document.getElementById('description');
    if (!titleElement || !descriptionElement) return;

    titleElement.style.opacity = '0';
    descriptionElement.style.opacity = '0';
    titleElement.style.transform = 'translateY(10px)';
    descriptionElement.style.transform = 'translateY(10px)';

    setTimeout(() => {
        titleElement.textContent = items[currentIndex].title;
        descriptionElement.textContent = items[currentIndex].description;
        titleElement.style.opacity = '1';
        descriptionElement.style.opacity = '1';
        titleElement.style.transform = 'translateY(0)';
        descriptionElement.style.transform = 'translateY(0)';
    }, 180);
}

window.addEventListener('DOMContentLoaded', () => {
    renderCarousel();
    updateContent();
    initContactForm();
    initCotacaoForm();
});

function initContactForm() {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('contact-feedback');

    if (!form || !feedback) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const phone = document.getElementById('contact-phone').value.trim();
        const message = document.getElementById('contact-message').value.trim();

        if (!name || !email || !phone || !message) {
            showContactFeedback('Preencha todos os campos para enviar a mensagem.', false);
            return;
        }

        if (!validateEmail(email)) {
            showContactFeedback('Informe um email válido.', false);
            return;
        }

        if (!validatePhone(phone)) {
            showContactFeedback('Informe um telefone válido.', false);
            return;
        }

        feedback.textContent = 'Enviando sua mensagem...';
        feedback.className = 'contact-feedback';

        try {
            const response = await fetch('http://localhost:3000/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, phone, message })
            });

            const data = await response.json();

            if (response.ok) {
                showContactFeedback(data.message || 'Mensagem enviada com sucesso.', true);
                form.reset();
            } else {
                showContactFeedback(data.message || 'Não foi possível enviar a mensagem.', false);
            }
        } catch (error) {
            simulateContactSubmit({ name, email, phone, message });
        }
    });
}

function initCotacaoForm() {
    const form = document.getElementById('cotacao-form');
    const feedback = document.getElementById('cotacao-feedback');

    if (!form || !feedback) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const empresa = document.getElementById('empresa').value.trim();
        const veiculo = document.getElementById('veiculo').value.trim();
        const produto = document.getElementById('produto').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const quantidade = document.getElementById('quantidade').value.trim();
        const origem = document.getElementById('origem').value.trim();
        const destino = document.getElementById('destino').value.trim();
        const roteiro = document.getElementById('roteiro').value.trim();
        const observacoes = document.getElementById('observacoes').value.trim();
        const newsletter = document.getElementById('newsletter').checked;

        if (!empresa || !veiculo || !produto || !email || !telefone || !quantidade || !origem || !destino || !roteiro || !observacoes) {
            showCotacaoFeedback('Preencha todos os campos obrigatórios antes de enviar.', false);
            return;
        }

        if (!validateEmail(email)) {
            showCotacaoFeedback('Informe um email válido.', false);
            return;
        }

        if (!validatePhone(telefone)) {
            showCotacaoFeedback('Informe um telefone válido.', false);
            return;
        }

        feedback.textContent = 'Enviando sua solicitação...';
        feedback.className = 'cotacao-feedback';

        try {
            const response = await fetch('http://localhost:3000/quote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    empresa,
                    veiculo,
                    produto,
                    email,
                    telefone,
                    quantidade,
                    origem,
                    destino,
                    roteiro,
                    observacoes,
                    newsletter
                })
            });

            const data = await response.json();

            if (response.ok) {
                showCotacaoFeedback(data.message || 'Cotação enviada com sucesso.', true);
                form.reset();
            } else {
                showCotacaoFeedback(data.message || 'Não foi possível enviar a cotação.', false);
            }
        } catch (error) {
            showCotacaoFeedback('Não foi possível enviar a cotação. Verifique o backend ou sua conexão.', false);
            console.error('Erro ao enviar cotação:', error);
        }
    });
}

function showCotacaoFeedback(message, success) {
    const feedback = document.getElementById('cotacao-feedback');
    if (!feedback) return;

    feedback.textContent = message;
    feedback.className = 'cotacao-feedback ' + (success ? 'success' : 'error');
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^(?:\+55\s?)?(?:\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/.test(phone);
}

function showContactFeedback(message, success) {
    const feedback = document.getElementById('contact-feedback');
    if (!feedback) return;

    feedback.textContent = message;
    feedback.className = 'contact-feedback ' + (success ? 'success' : 'error');
}

function simulateContactSubmit(formData) {
    setTimeout(() => {
        showContactFeedback('Mensagem enviada com sucesso. Em caso de ambiente sem backend, o envio foi simulado.', true);
        document.getElementById('contact-form').reset();
    }, 800);
}

initContactForm();

