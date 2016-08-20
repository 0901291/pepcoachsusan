export const SCREEN_SIZES = {
    mobile: 480,
    tablet: 768,
    smallDesktop: 992,
    largeDesktop: 1200
}

export function isMobile() {
    return getVW_() < SCREEN_SIZES.tablet;
}

export function isTablet() {
    return getVW_() >= SCREEN_SIZES.tablet && getVW_() < SCREEN_SIZES.smallDesktop;
}

export function isSmallDesktop() {
    return getVW_() >= SCREEN_SIZES.smallDesktop && getVW_() < SCREEN_SIZES.largeDesktop;
}

export function isLargeDesktop() {
    return getVW_() >= SCREEN_SIZES.largeDesktop;
}

function getVW_() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}
