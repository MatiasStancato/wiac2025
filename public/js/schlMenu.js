// Seleccionamos todos los botones y los elementos del menú
document.querySelectorAll('.daySchl').forEach(button => {
    button.addEventListener('click', function() {
        // Obtenemos el ul correspondiente al botón clickeado
        const dropdownContent = this.nextElementSibling;

        // Alternamos entre mostrar u ocultar el ul
        dropdownContent.classList.toggle('show');

        // Cerramos los otros dropdowns abiertos si hay alguno
        document.querySelectorAll('.dropdown-content').forEach(content => {
            if (content !== dropdownContent && content.classList.contains('show')) {
                content.classList.remove('show');
            }
        });
    });
});

// Cerrar el menú si haces clic fuera de él
window.onclick = function(event) {
    if (!event.target.matches('.daySchl')) {
        document.querySelectorAll('.dropdown-content').forEach(content => {
            if (content.classList.contains('show')) {
                content.classList.remove('show');
            }
        });
    }
};