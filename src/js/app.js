import 'whatwg-fetch';
import navigation from './modules/navigation';
import atReplace from './modules/atReplace';
import contactForm from './modules/contactForm';
import reviews from './modules/reviews';

if(document.readyState !== 'loading') {
    initApp();
} else {
    document.addEventListener('DOMContentLoaded', initApp);
}

function initApp() {
    navigation();
    atReplace();
    contactForm();
    reviews();
}