// Seleccionar todos los sliders
const sliders = document.querySelectorAll('.slider');

sliders.forEach((slider, index) => {
    let currentIndex = 0;

    const slides = slider.querySelector('.slides');
    const totalSlides = slider.querySelectorAll('.slide').length;

    // Función para mover el slider
    const moveSlide = (direction) => {
        currentIndex += direction;

        // Volver al inicio o al final si se excede el rango
        if (currentIndex < 0) {
            currentIndex = totalSlides - 1;
        } else if (currentIndex >= totalSlides) {
            currentIndex = 0;
        }

        // Mover las imágenes
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    // Agregar eventos a los botones
    slider.querySelector('.prev').addEventListener('click', () => moveSlide(-1));
    slider.querySelector('.next').addEventListener('click', () => moveSlide(1));
});
