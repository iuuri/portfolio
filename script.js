let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const slidesContainer = document.querySelector('.slides-container');
let slideInterval;

// Função para mostrar o slide atual
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
    });
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    currentSlideIndex = index;
}

// Função para mudar para o próximo slide
function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}

// Função para alternar para um slide específico
function currentSlide(index) {
    clearInterval(slideInterval);
    showSlide(index - 1);
    startSlideShow();
}

// Inicia o autoplay
function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000); // Muda automaticamente a cada 5 segundos
}

// Funcionalidade de deslizar ao arrastar
let startX = 0;
let isDragging = false;

const slider = document.querySelector('.slider');

slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
});

slider.addEventListener('mouseup', (e) => {
    if (isDragging) {
        const endX = e.clientX;
        if (startX - endX > 50) {
            nextSlide();
        } else if (endX - startX > 50) {
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            showSlide(currentSlideIndex);
        }
        isDragging = false;
    }
});

slider.addEventListener('mouseleave', () => {
    isDragging = false;
});

slider.addEventListener('mousemove', (e) => {
    if (isDragging) {
        e.preventDefault();
    }
});

// Inicia o slider
showSlide(currentSlideIndex);
startSlideShow();

// Função para rolar suavemente para a seção ao clicar no menu
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

// Função para verificar se um elemento está visível na tela
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Função para aplicar animação nas partes internas (foto e texto) da seção "Sobre Mim"
function checkVisibility() {
    const aboutLeft = document.querySelector('.about-left');
    const aboutRight = document.querySelector('.about-right');

    // Se as partes internas da seção estiverem visíveis, aplica a animação
    if (isElementInViewport(aboutLeft) || isElementInViewport(aboutRight)) {
        aboutLeft.style.transform = 'translateX(0)';
        aboutLeft.style.opacity = '1'; // Aparece a foto

        aboutRight.style.transform = 'translateX(0)';
        aboutRight.style.opacity = '1'; // Aparece o conteúdo

        // Remover o evento para que a animação aconteça apenas uma vez
        window.removeEventListener('scroll', checkVisibility);
    }
}

// Adiciona o evento de rolagem para detectar quando a seção entra na tela
window.addEventListener('scroll', checkVisibility);

// Chama a função para verificar caso a seção já esteja visível ao carregar a página
checkVisibility();

document.getElementById('hamburger-menu').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active'); // Alterna a visibilidade do menu
});

// Função para rolar suavemente para a seção ao clicar no botão
document.getElementById('ctn-projetos').addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetSection = document.getElementById('projects'); // Substitua 'projetos' pelo id da sua seção de projetos
    
    window.scrollTo({
        top: targetSection.offsetTop - 70, // Ajuste o valor conforme necessário para o espaçamento desejado
        behavior: 'smooth'
    });
});