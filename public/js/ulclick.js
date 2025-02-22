document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".navbar"); // Selecciona el menú
    const menuToggle = document.getElementById("menu-toggle"); // Checkbox para toggle

    if (!menu || !menuToggle) {
        console.error("No se encontró el elemento 'menu' o 'menuToggle' en el DOM.");
        return;
    }

    // Mostrar/ocultar el menú cuando se hace clic en el toggle
    menuToggle.addEventListener("click", (event) => {
        event.stopPropagation(); // Evita que el evento se propague
        menu.classList.toggle("hidden"); // Alterna la visibilidad del menú
    });

    // Cierra el menú cuando se hace clic fuera
    document.addEventListener("click", (event) => {
        // Asegúrate de que el menú esté visible y que el clic no sea en el toggle ni dentro del menú
        if (!menu.classList.contains("hidden") && event.target !== menuToggle && !menu.contains(event.target)) {
            menu.classList.add("hidden"); // Colapsa el menú
            menuToggle.checked = false; // Sincroniza el estado del checkbox
        }
    });
});
