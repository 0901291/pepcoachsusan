import '../vendor/jquery.validate.min';
import 'whatwg-fetch';

const form = document.querySelector('#contact-form--form');
const formMessage = document.querySelector('#contact-form--message');

export default function initContactForm() {
    const $form = $(form);
    $form.validate({
        submitHandler: submitForm_,
        rules: {
            name: {
                required: true
            },
            email: {
                required: true,
                emailValidation: true
            },
            message: {
                required: true
            }
        },
        messages: {
            name: "Dit veld is verplicht",
            email: {
                required: "Dit veld is verplicht"
            },
            message: "Dit veld is verplicht"
        },
        errorPlacement: ($error, $element) => {
            const messageSpan = form.querySelector(`#error-message--${$element.attr('name')}`);
            messageSpan.innerHTML = $error[0].outerHTML;
        }
    });
    $.validator.addMethod('emailValidation', (value) => {
        return ( /^[a-z0-9]+([-._][a-z0-9]+)*@([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,4}$/.test( value ) && /^(?=.{1,64}@.{4,64}$)(?=.{6,100}$).*/.test( value ) );
    }, "Vul a.u.b. een geldig e-mailadres in");

    $form.on('submit', e => {
        if(!$form.valid()) {
            e.preventDefault();
        }
    });
}

function submitForm_() {
    const data = new FormData(form);
    data.append('ajax', true); // Let server know the request used JavaScript
    fetch('contactForm.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: data,
        credentials: 'include' // Necessary when using $_SESSION
    })
      .then(response => {
        return response.json();
      })
      .then(processFormResponse_)
      .catch(onFormError_);
}

function processFormResponse_(response) {
    response.success ? onFormSuccess_(response): onFormError_(response);
}

function onFormSuccess_(response) {
    $(form).fadeOut(() => {
        showMessage_(response.message, true);
    });
}

function onFormError_(response) {
    showMessage_(response.message, false);
}

function showMessage_(message, success) {
    formMessage.classList.toggle('error', !success);
    formMessage.classList.toggle('success', success);
    formMessage.innerHTML = message;
    formMessage.classList.remove('hidden');
}