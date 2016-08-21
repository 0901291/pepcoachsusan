import '../vendor/jquery.nav.min';
import logoLoader from './logoLoader';
import typeWriter from './typeWriter';
import * as utils from './utils';

const HOME_HASH = false; // Set to true if home should have a hash (/#home) and to false if home should not (/)
let currentOffset = getScrollOffset_();
const CLASSES = {
    navOpen: 'nav-open',
    navHidden: 'nav-hidden',
    isMobile: 'is-mobile'
};

const body = document.querySelector('body');
const menu = body.querySelector('.main-menu');

export default function navigation() {
    initOnePageNav_($(menu), currentOffset);
    initHash_();
    $(window).on('hashchange.navigation', onHashChange_);
    $(window).on('resize.navigation', onResize_);
    $(window).on('scroll.navigation', onScroll_);

    initMobileMenu_($(menu));

    logoLoader($('.circle'));
    typeWriter();
}

/**
 * Calls one page navigation plugin.
 *
 * @param $menu jQuery menu object to use as menu
 * @param offset Offset to use when navigation to a different section.
 * @private
 */
function initOnePageNav_($menu, offset = 0) {
    $menu.onePageNav({
        currentClass: 'active',
        changeHash: true,
        scrollChange: setCurrentSection_,
        offset: offset
    });
}

/**
 * Initialises everything that has to do with the hash. Makes home-link active if necessary and calls onHashChange_.
 *
 * @private
 */
function initHash_() {
    const hash = window.location.hash;
    if(hash === '' || hash === '#home') {
        const homeLink = $('li#home-link');
        homeLink.addClass('active');
        if(HOME_HASH) {
            setCurrentSection_(homeLink);
        } else {
            onHashChange_();
        }
    } else if(hash !== '') {
        setTimeout(() => onHashChange_(), 10);
    }
}

/**
 * Method to check whether or not to use a mobile menu.
 *
 * @returns {Boolean} whether or not to use a mobile menu
 * @private
 */
function hasMobileMenu_() {
    return utils.isMobile() || utils.isTablet();
}

/**
 * Called on page resize.
 *
 * @private
 */
function onResize_() {
    reinitOnePageNav_();
    checkMobile_();
}

/**
 * Set classes to body according to mobile behaviour. Gets called on page load and page resize.
 *
 * @private
 */
function checkMobile_() {
    const isMobile = hasMobileMenu_();
    body.classList.toggle(CLASSES.isMobile, isMobile);
    body.classList.toggle(CLASSES.navHidden, isMobile && !body.classList.contains(CLASSES.navOpen));
}

/**
 * Gets called on page resize. Re-initialises the one page navigation plugin if offset has changed.
 *
 * @private
 */
function reinitOnePageNav_() {
    const _offset = getScrollOffset_();
    if(currentOffset !== _offset) { // Check if offset has changed so navigation has to be re-initialised
        const menu = $('.main-menu');
        menu.find('a').off(); // 'Destroys' current initialisation of plugin
        initOnePageNav_(menu, _offset);
        currentOffset = _offset;
    }
}

/**
 * Returns the offset to keep in mind because of the fixed header on top, based on the current screen size.
 *
 * @returns {number} Total offset to keep in mind
 * @private
 */
function getScrollOffset_() {
    let _offset = -74; // Amount of pixels to top of the section heading and fixed header height
    let _padding = -8; // Extra offset to keep some padding between header and section heading
    if(utils.isMobile()) {
        _offset = -67.5;
    } else if(utils.isLargeDesktop()) {
        _offset = -74;
    }
    return _offset + _padding;
}

/**
 * Method that gets called when hash gets changed through the address bar. Makes sure the page is scrolled to the right position on page load.
 *
 * @private
 */
function onHashChange_() {
    const currentSection = $(window.location.hash);
    if(currentSection.length) { // Current hash is a section on the page
        $(window).scrollTop(currentSection.offset().top + currentOffset);
        console.log(currentOffset);
    }

    if(!HOME_HASH && window.location.hash === '#home') { // Empty the hash if it says '#home' and the HOME_HASH setting is set to false
        history.pushState(1, '1', ' ');
    }
}

/**
 * Callback for one page navigation plugin the call when entering a new section. Method sets the current section as hash.
 *
 * @param currentSection automatically passed by the one page navigation plugin
 * @private
 */
function setCurrentSection_(currentSection) {
    if(currentSection.length) {
        let newLoc = currentSection.find('a').attr('href');
        newLoc = !HOME_HASH && newLoc === '#home' ? ' ' : newLoc;
        history.pushState(1, '1', newLoc);
    }
}

/**
 * Callback for scroll event.
 *
 * @private
 */
function onScroll_() {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop;
    body.classList.toggle('small-header', distanceY > 200);
}

/**
 * Initialize the mobile menu.
 *
 * @param $menu jQuery menu object to use as menu
 * @private
 */
function initMobileMenu_($menu) {
    const navTrigger = body.querySelector('#nav-trigger');
    navTrigger.addEventListener('click', () => toggleMobileMenu_());
    $menu.on('click', 'a', closeMobileMenu_);
    checkMobile_();
}

/**
 * Method to call when toggling the mobile menu.
 *
 * @param force pass true/false to force open/close. Leave empty for toggle
 * @private
 */
function toggleMobileMenu_(force = '') {
    if(!hasMobileMenu_()) {
        return;
    }
    const open = body.classList.contains(CLASSES.navOpen);
    const openDelay = open ? 0 : 10;
    const hiddenDelay = open ? 200 : 0;

    if(force !== '') {
        setTimeout(() => body.classList.toggle(CLASSES.navOpen, force ? true : false), openDelay);
        setTimeout(() => body.classList.add(CLASSES.navHidden), hiddenDelay);
    } else {
        setTimeout(() => body.classList.toggle(CLASSES.navOpen), openDelay);
        setTimeout(() => body.classList.toggle(CLASSES.navHidden), hiddenDelay);
    }
}

function closeMobileMenu_() {
    toggleMobileMenu_(false);
}
