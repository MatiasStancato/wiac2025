
function toggleRegisterButton() {
    const termsCheckbox = document.getElementById('termsCheckbox');
    const registerButton = document.getElementById('checkout-btn');
    registerButton.disabled = !termsCheckbox.checked; // Habilita si está marcado, deshabilita si no.
}
        
        document.getElementById('checkout-btn').addEventListener('click', function () {
            // Aquí normalmente validarías los datos del formulario y luego envías la solicitud
            const form = document.getElementById('registration-form');

            
            // Simulación de una validación del formulario
            if (!form.checkValidity()) {
                const errorMessages = [];
                const inputs = form.querySelectorAll('input, select');
        
                inputs.forEach(input => {
                    if (!input.validity.valid) {
                        errorMessages.push(`${input.name} IS INVALID.`);
                    }
                });
        
                alert(errorMessages.join('\n'));
                return;
            }
            try {
                // Capturar los datos del formulario
                const formData = {
                    Firstname: form.querySelector('input[name="Firstname"]').value,
                    Lastname: form.querySelector('input[name="Lastname"]').value,
                    Email: form.querySelector('input[name="Email"]').value,
                    Federation: form.querySelector('select[name="Federation"]').value,
                    Country: form.querySelector('input[name="Country"]').value,
                    Ageclass: form.querySelector('select[name="Ageclass"]').value,
                    Gender: form.querySelector('select[name="Gender"]').value,
                    Bowtype: form.querySelector('select[name="Bowtype"]').value,
                    Target: form.querySelector('select[name="Target"]').value,
                    Mssg: form.querySelector('textarea[name="mssg"]').value,
                };
                // Aquí llamarías a tu servidor para crear la orden
                
                const response = fetch('/api/create-order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({formData
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.checkout) {
                        // Mostrar el botón de pago con el enlace de SiPago
                        const paymentContainer = document.getElementById('payment-container');
                        const checkoutLink = document.getElementById('checkout-link');
                        paymentContainer.style.display = 'flex'; // Mostramos el contenedor
                        checkoutLink.href = data.checkout;
                        checkoutLink.textContent = 'Pay with Sipago';
                    } else {
                        console.error('No se obtuvo el enlace de checkout');
                    }
                })
                .catch(error => console.error('Error al crear la orden:', error));
            } catch(error){
                alert('Por favor, completa los campos obligatorios.');
            }
        });

        
