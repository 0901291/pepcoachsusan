import '../vendor/slick.min';
import * as utils from './utils';

const reviewsContainer = document.querySelector('#reviews-container');
const $reviewsContainer = $(reviewsContainer);

export default function initReviews() {
    initSlick_();
    $(window).on('resize.reviews', onResize_);
    onResize_();
}

function initSlick_() {
    $reviewsContainer.slick({
        autoplay: true,
        autoplaySpeed: 10000,
        dots: true,
        centerMode: true,
        slidesToShow: 1,
        mobileFirst: true,
        prevArrow: '<button type="button" class="reviews__nav--prev"><svg><use xlink:href="#chevron"></use></svg></button>',
        nextArrow: '<button type="button" class="reviews__nav--next"><svg><use xlink:href="#chevron"></use></svg></button>',
        appendArrows: '.reviews__nav',
        pauseOnHover: true,
        swipeToSlide: true,
        infinite: true,
        responsive: [
            {
                breakpoint: utils.SCREEN_SIZES.smallDesktop,
                settings: {
                    slidesToShow: 1,
                    centerPadding: "20%",
                }
            },
            {
                breakpoint: utils.SCREEN_SIZES.tablet,
                settings: {
                    slidesToShow: 1,
                    centerPadding: "10%",
                }
            },
            {
                breakpoint: utils.SCREEN_SIZES.mobile,
                settings: {
                    slidesToShow: 1,
                    centerPadding: "10%",
                }
            }
        ]
    });
    $reviewsContainer.on('breakpoint', onResize_);
}

function onResize_() {
    let $slides = $reviewsContainer.find('.slick-slide');
    $slides.height($slides.height());
}
