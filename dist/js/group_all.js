$(document).ready(function(){
    var swiper = new Swiper('.swiper-container', {
        // slidesPerView: 1,
        slidesPerView: 'auto',
        centeredSlides: false,
        spaceBetween: 30,
        loop: false,
        nextButton: '.go_to.next',
        prevButton: '.go_to.prev',
        breakpoints: {
            640: {
              slidesPerView: 1
            }
        }
    });
});

$(window).on('load',function(){

    // Initialize

    var now_sort = "hot", window_status = "closed", 
        view_scroll_now = 0, view_pic_total, view_display_now = 1, view_display_prev, view_display_next;

    $( "#fullpage" ).fullpage();
    $( ".float_window" ).hide();
    view_pic_total = 5;
    
    $( ".activity_item, #close_window, .dark_mask" ).click( function() {
        float_window();
    });

    float_window();

    $(".not_yet").each(function() {
        autoAdjust($(this));
    });
    
    // Activity 的顯示控制

    function float_window () {
        if ( window_status == 'closed' ) {
            $( ".float_window" ).show();
            $( "#fullpage, .cover" ).animate({opacity: 0.1}, 100, function() {
                window_status = 'open';
                $( '.float_window' ).animate({opacity: 1}, 500);
            });
        }
        else if ( window_status == 'open' ) {
            $("#fullpage").animate({opacity: 1}, 500);
            $(".cover").animate({opacity: 0.3}, 500);
            $( ".float_window" ).animate({opacity: 0}, 500, function() {
                window_status = 'closed';
                $( ".float_window" ).hide();
            });
        }
    }


    // Activity 的動態控制

    $( "#activity_list, .float_window" ).hover(
        function() {
            $.fn.fullpage.setAllowScrolling(false);
        }, function() {
            $.fn.fullpage.setAllowScrolling(true);
    });

    $( "#sort_hot" ).click( function() {
        now_sort = "hot";
        $( "#sort_time" ).removeClass("now");
        $( "#sort_hot" ).addClass("now");
    });

    $( "#sort_time" ).click( function() {
        now_sort = "time";
        $( "#sort_hot" ).removeClass("now");
        $( "#sort_time" ).addClass("now");
    });


    // Pic Window 的顯示控制

    function paddingLeft ( num ) {
	    if ( num < 10 )
            return  "0" + num;
	    else 
            return num;
    }


    // Pic Window 的動態控制

    $( "#go_prev" ).click( function() {
        if ( view_scroll_now > $(".gallery_view_pic").width()/2 + 120 ) {
            view_display_now -= 1 ;
            view_scroll_now -= $(".gallery_view_pic").width() + 60 ;
            $("#view_all_pic").animate( {scrollLeft: view_scroll_now}, '500');
        }
    });

    $( "#go_next" ).click( function() {
        if ( view_scroll_now < $(".gallery_view_pic").width()/2 + (view_pic_total-1) * ($(".gallery_view_pic").width() )){
            view_display_now += 1 ;
            view_scroll_now += $(".gallery_view_pic").width() + 60 ;
            $("#view_all_pic").animate( {scrollLeft: view_scroll_now}, '500');
        }
    });
    
    $( "#view_all_pic" ).scroll( function() {
        view_display_prev = view_display_now - 1 ;
        view_display_next = view_display_now + 1 ;
        $( "#view_all_pic" ).children( "#pic_"+view_display_now ).addClass("center");
        $( "#view_all_pic" ).children( "#pic_"+view_display_prev+", #pic_"+view_display_next ).removeClass("center");
        $( ".pic_counter.now" ).text( paddingLeft(view_display_now) );
        if ( view_scroll_now > $(".gallery_view_pic").width()/2 + 120 )
            $( "#go_prev" ).removeClass("disabled");
        else
            $( "#go_prev" ).addClass("disabled");
        if ( view_scroll_now < $(".gallery_view_pic").width()/2 + (view_pic_total-1) * ($(".gallery_view_pic").width() ))
            $( "#go_next" ).removeClass("disabled");
        else
            $( "#go_next" ).addClass("disabled");
    });


    // 自動調整圖片大小
    
    function autoAdjust( outer_div ) {
        var inner_pic_size = outer_div.children("img").css("width").replace("px","") / outer_div.children("img").css("height").replace("px","") ;
        var outer_div_size = outer_div.css("width").replace("px","") / outer_div.css("height").replace("px","") ;
        if ( inner_pic_size > outer_div_size ) {
            outer_div.addClass("fat");
            outer_div.removeClass("not_yet");
        }
        else if ( inner_pic_size <= outer_div_size ) {
            outer_div.addClass("tall");
            outer_div.removeClass("not_yet");
        }
    }

});
