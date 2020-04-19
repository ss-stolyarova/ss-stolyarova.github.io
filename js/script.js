window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu_item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        });
    });
});

$(document).ready(function(){

    $('.carousel_inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/icons/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/icons/right.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: false,
                    arrows: true
                }
            }
        ]
    });
    
    // Modal

    $('[data-modal=order]').on('click', function() {
        $('.overlay, #order-form').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #thanks, #order-form').fadeOut('slow');
    });

    $('.btn_order').each(function(i) {
        $(this).on('click', function() {
            $('#order-form .modal-body__descr').text($('.catalog__card__subtitle').eq(i).text());
            $('.overlay, #order-form').fadeIn('slow');
        })
    });

    function validateForms(form){
        $(form).validate({
            rules: {
            name: "required",
            phone: "required",      
            },
            messages: {
                name: "Пожалуйста, введите свое имя",
                phone: "Пожалуйста, введите свой номер телефона",
            }
        });
    };
    validateForms('#promo-form');
    validateForms('#order-form');

    $('input[name=phone]').mask("+7-999-999-99-99");


    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('form').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });   
    
/*     $('form').submit(function() {
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('form').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });  */  
 

    //smooth scroll and page up
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

});