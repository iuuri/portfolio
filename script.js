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
