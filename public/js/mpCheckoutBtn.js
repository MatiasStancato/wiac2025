
const mp = new MercadoPago('TEST-5d3cd7c6-733c-44b3-bc5d-2049e9a0d72c', { locale: "en-US" });
const form = document.getElementById('registration-form');
document.getElementById('checkout-btn').addEventListener('click', async () => {

    //  Validar el formulario
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
        // Crea la orden para la preferencia de MP    
        const orderData = {
            title: 'Inscripcion WIAC 2025',
            quantity: 1,
            price: 500,
        };
        // Crea un objeto con los das dos constantes
        const dataToSend = {
            orderData,
            formData,
        };

        const response = await fetch("/create_preference", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),

        });

        const preference = await response.json();

        createCheckoutButton(preference.id);
    } catch (error) {
        alert("error al crear la preferencia de pago")
    }
})

const createCheckoutButton = (preferenceId) => {

    const bricksBuilder = mp.bricks();

    const renderComponent = async () => {
        if (window.checkoutButton) window.checkoutButton.unmount();

        window.checkoutButton = await bricksBuilder.create("wallet", "wallet_container", {
            initialization: {
                preferenceId: preferenceId,
            }
        })
    }
    renderComponent();
}