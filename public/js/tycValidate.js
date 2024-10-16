
function toggleRegisterButton() {
    const termsCheckbox = document.getElementById('termsCheckbox');
    const registerButton = document.getElementById('checkout-btn');
    registerButton.disabled = !termsCheckbox.checked; // Habilita si está marcado, deshabilita si no.
}