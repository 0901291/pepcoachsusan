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
    // if(!$reviewsContainer.hasClass('slick-initialized') && $(window).width() > utils.SCREEN_SIZES.mobile) {
        $reviewsContainer.slick({
            slidesToShow: 1,
            autoplay: true,
            autoplaySpeed: 10000,
            dots: true,
            centerPadding: "0%",
            slidesToShow: 1,
            mobileFirst: true,
            pauseOnHover: true,
            swipeToSlide: true,
            infinite: true,
            arrows: false,
            responsive: [
                {
                    breakpoint: utils.SCREEN_SIZES.smallDesktop,
                    settings: {
                        centerPadding: "20%",
                    }
                },
                {
                    breakpoint: utils.SCREEN_SIZES.tablet,
                    settings: {
                        centerMode: true,
                        centerPadding: "10%",
                        arrows: true,
                        prevArrow: '<button type="button" class="reviews__nav--prev"><svg><use xlink:href="#chevron"></use></svg></button>',
                        nextArrow: '<button type="button" class="reviews__nav--next"><svg><use xlink:href="#chevron"></use></svg></button>',
                        appendArrows: '.reviews__nav',
                    }
                }
            ]
        });
        $reviewsContainer.on('breakpoint', onResize_);
    // } else if($reviewsContainer.hasClass('slick-initialized') && $(window).width() < utils.SCREEN_SIZES.mobile) {
    //     $reviewsContainer.slick('unslick');
    // }
}

function onResize_() {
    let $slides = $reviewsContainer.find('.slick-slide');
    $slides.height($slides.height());
    // initSlick_();
}
