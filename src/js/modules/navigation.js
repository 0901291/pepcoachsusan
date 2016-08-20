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

    initMobileMenu_();

    logoLoader();
    typeWriter(utils.isMobile() || utils.isTablet());
}

function initOnePageNav_($menu, offset = 0) {
    $menu.onePageNav({
        currentClass: 'active',
        changeHash: true,
        scrollChange: setCurrentSection_,
        offset: offset
    });
}

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
        setTimeout(() => {
            onHashChange_();
        }, 10);
    }
}

function onResize_() {
    reinitOnePageNav_();
    checkMobile_();
}

function checkMobile_() {
    const isMobile = utils.isMobile() || utils.isTablet();
    body.classList.toggle(CLASSES.isMobile, isMobile);
    body.classList.toggle(CLASSES.navHidden, isMobile && !body.classList.contains(CLASSES.navOpen));
}

function reinitOnePageNav_() {
    const _offset = getScrollOffset_();
    if(currentOffset !== _offset) {
        const menu = $('.main-menu');
        menu.find('a').off();
        initOnePageNav_(menu, _offset);
        currentOffset = _offset;
    }
}

/**
 * getScrollOffset returns the offset to keep in mind because of the fixed header on top, based on the current screen size.
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

function onHashChange_() {
    const currentSection = $(window.location.hash);
    if(currentSection.length) {
        $(window).scrollTop(currentSection.offset().top + currentOffset);
    }

    if(!HOME_HASH && window.location.hash === '#home') {
        history.pushState(1, 1, ' ');
    }
}

function setCurrentSection_(currentSection) {
    if(currentSection.length) {
        let newLoc = currentSection.find('a').attr('href');
        newLoc = !HOME_HASH && newLoc === '#home' ? ' ' : newLoc;
        history.pushState(1, 1, newLoc);
    }
}

function onScroll_() {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop;
    body.classList.toggle('small-header', distanceY > 200);
}

/**
 * Initialize the mobile menu
 * @private
 */
function initMobileMenu_() {
    const navTrigger = body.querySelector('#nav-trigger');
    navTrigger.addEventListener('click', () => toggleMobileMenu_());
    $(menu).find('a').on('click', closeMobileMenu_);
    checkMobile_();
}

function toggleMobileMenu_(force = '') {
    const open = body.classList.contains(CLASSES.navOpen);
    const openDelay = open ? 0 : 10;
    const hiddenDelay = open ? 200 : 0;
    console.log('force', force);
    console.log(body.classList);

    if(force !== '') {
        setTimeout(() => body.classList.toggle(CLASSES.navOpen, force), openDelay);
        setTimeout(() => body.classList.add(CLASSES.navHidden), hiddenDelay);
    } else {
        setTimeout(() => body.classList.toggle(CLASSES.navOpen), openDelay);
        setTimeout(() => body.classList.toggle(CLASSES.navHidden), hiddenDelay);
    }

}

function closeMobileMenu_() {
    toggleMobileMenu_(false);
}
