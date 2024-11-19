document.getElementById('checkout-btn').addEventListener('click', function () {
    const form = document.getElementById('registration-form');
    const termsCheckbox = document.getElementById('termsCheckbox');

    clearErrorMessages();

    let formIsValid = true;
    const inputs = form.querySelectorAll('input, select');

    inputs.forEach(input => {
        if (!input.checkValidity()) {
            const errorSpan = document.getElementById(`${input.name}-error`);
            errorSpan.textContent = input.validationMessage;
            input.classList.add('invalid');
            formIsValid = false;
        }
    });

    if (!termsCheckbox.checked) {
        const termsError = document.getElementById('terms-error');
        termsError.textContent = 'You must accept the terms & conditions.';
        formIsValid = false;
    }

    if (!formIsValid) {
        return;
    }

    const formData = new FormData(form);
    const queryParams = new URLSearchParams();

    formData.forEach((value, key) => {
        queryParams.append(key, value);
    });

    window.location.href = `/regSumary?${queryParams.toString()}`;
});

function clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(errorSpan => {
        errorSpan.textContent = '';
    });

    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.classList.remove('invalid');
    });
}