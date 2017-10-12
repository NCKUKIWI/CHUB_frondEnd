$(document).ready(function(){

    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        // slidesPerView: 'auto',
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 30,
        loop: false,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        breakpoints: {
            640: {
              slidesPerView: 1
            }
        }
    });

    $("#close_gallery").click( function() {
        $(".gallery").fadeOut();
    });

});

$(window).on("load", function () {

});
