$(document).ready(function(){

    // Initialize

    var people_chosen, insert_cntr = 0, window_status = "closed", people_hover, 
        port_pic_chosen, port_pic_total, port_status = "closed",
        port_pic_display_now, port_pic_display_prev, port_pic_display_next,
        port_scroll_now = 0;

    $( "#fullpage" ).fullpage();
    $( ".float_window" ).hide();
    $( ".float_portfolio" ).hide();
    $( "#left_people" ).addClass("item_now");
    people_update(1);
    
    $( ".people_info, .people_pic, #close_window, .dark_mask" ).click( function() {
        float_window();
    });

    $( ".port_demo, #close_portfolio" ).click( function() {
        float_portfolio();
    });
    

    // 把資料 Append 進 People

    function people_update (id_start) {
        for (var i = 0 ; i <= 30 ; i ++ ) {
            people_chosen = id_start + i;
            insert_cntr ++ ;
            if ( insert_cntr % 3 == 1 ) {
                $( "#row_2" ).append( '<div class="people_left"><img class="people_pic r2" id="pic_'+people_chosen+'" src="img/people_ex.png"><img class="people_more" src="img/people_more.png"></div>' );
                $( "#view_right" ).append( '<div class="people_info" id="info_'+people_chosen+'"><p class="name">Yen Ting Cho</p><p class="major">Media Design</p><p class="skill">Technology<br/>Design<br/>Architecture</p><span class="after"></span></div>' );
            }
            else if ( insert_cntr % 3 == 2 ) {
                $( "#row_1" ).append( '<div class="people_left"><img class="people_pic r1" id="pic_'+people_chosen+'" src="img/people_ex.png"><img class="people_more" src="img/people_more.png"></div>' );
                $( "#view_right" ).append( '<div class="people_info" id="info_'+people_chosen+'"><p class="name">Yen Ting Cho</p><p class="major">Media Design</p><p class="skill">Technology<br/>Design<br/>Architecture</p><span class="after"></span></div>' );
            }
            else if ( insert_cntr % 3 == 0 ) {
                $( "#row_3" ).append( '<div class="people_left"><img class="people_pic r3" id="pic_'+people_chosen+'" src="img/people_ex.png"><img class="people_more" src="img/people_more.png"></div>' );
                $( "#view_right" ).append( '<div class="people_info" id="info_'+people_chosen+'"><p class="name">Yen Ting Cho</p><p class="major">Media Design</p><p class="skill">Technology<br/>Design<br/>Architecture</p><span class="after"></span></div>' );
            }
        }
    }


    // 把資料 Append 進 Portfolio

    function portfolio_update (num_total) {
        port_pic_total = num_total;
        port_pic_display_now = 1;
        for (var i = 1 ; i <= num_total ; i ++ ) {
            port_pic_chosen = i;
            if ( port_pic_chosen == 1 ) {
                $( "#portfolio" ).append( '<img class="portfolio_pic end" src="img/portfolio_end.png">' );
            }
            $( "#portfolio" ).append( '<img class="portfolio_pic" id="port_'+port_pic_chosen+'" src="img/portfolio_ex.png">' );
            if ( i == num_total ) {
                $( "#portfolio" ).append( '<img class="portfolio_pic end" src="img/portfolio_end.png">' );
            }
        }
        setTimeout(function() {
            port_scroll_now = $(".portfolio_pic").width()/2 + 120 ;
            $("#portfolio").scrollLeft(port_scroll_now);
            $( ".port_counter.total" ).text( "/"+ paddingLeft(port_pic_total) );
        }, 100);
    }


    // People 的顯示控制

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
                if ( port_status == 'open' ) {
                    port_status = 'closed';
                    $( ".float_portfolio" ).animate({opacity: 0}, 500, function() {
                        $( ".float_portfolio" ).hide();
                        $( "#detail_left, #detail_upper_right, #detail_right" ).show();
                        $( "#detail_left, #detail_upper_right, #detail_right" ).animate({opacity: 1}, 500);
                        $( "#portfolio" ).empty();
                    });
                }
            });
        }
    }


    // People 的動態控制

    $( ".people_pic" ).hover(
        function() {
            $(this).css({'-webkit-filter':'brightness(30%)','filter':'brightness(30%)'});
            $(this).siblings('.people_more').css({'width':'28px','bottom':'22px','opacity':'1'});
            people_hover = $(this).attr('id');
            people_hover = people_hover.replace("pic", "info");
            $('#'+people_hover).children('.after').css({'width':'40px'});
        }, function() {
            $(this).css({'-webkit-filter':'brightness(100%)','filter':'brightness(100%)'});
            $(this).siblings('.people_more').css({'width':'20px','bottom':'26px','opacity':'0'});
            $('#'+people_hover).children('.after').css({'width':'0px'});
    });

    $( ".people_info" ).hover(
        function() {
            $(this).children('.after').css({'width':'40px'});
            people_hover = $(this).attr('id');
            people_hover = people_hover.replace("info", "pic");
            $('#'+people_hover).css({'-webkit-filter':'brightness(20%)','filter':'brightness(20%)'});
            $('#'+people_hover).siblings('.people_more').css({'width':'28px','bottom':'22px','opacity':'1'});
        }, function() {
            $(this).children('.after').css({'width':'0px'});
            $('#'+people_hover).css({'-webkit-filter':'brightness(100%)','filter':'brightness(100%)'});
            $('#'+people_hover).siblings('.people_more').css({'width':'20px','bottom':'26px','opacity':'0'});
    });

    $( "#view_right, #view_left, .float_window" ).hover(
        function() {
            $.fn.fullpage.setAllowScrolling(false);
        }, function() {
            $.fn.fullpage.setAllowScrolling(true);
    });


    // Portfolio 的顯示控制

    function float_portfolio () {
        if ( port_status == 'closed' ) {
            port_status = 'open';
            $( "#detail_left, #detail_upper_right, #detail_right" ).animate({opacity: 0}, 500);
            $( "#detail_left, #detail_upper_right, #detail_right" ).hide();
            $( ".float_portfolio" ).show();
            $( "#fullpage, .cover" ).animate({opacity: 0}, 100, function() {
                $( ".float_portfolio" ).animate({opacity: 1}, 500);
            });
            portfolio_update(10);
        }
        else if ( port_status == 'open' ) {
            port_status = 'closed';
            $( "#fullpage, .cover" ).animate({opacity: 0.1}, 500);
            $( ".float_portfolio" ).animate({opacity: 0}, 500, function() {
                $( ".float_portfolio" ).hide();
                $( "#detail_left, #detail_upper_right, #detail_right" ).show();
                $( "#detail_left, #detail_upper_right, #detail_right" ).animate({opacity: 1}, 500);
                $( "#portfolio" ).empty();
            });
        }
    }

    function paddingLeft ( num ) {
	    if ( num < 10 )
            return  "0" + num;
	    else 
            return num;
    }


    // Portfolio 的動態控制

    $( "#go_prev" ).click( function() {
        if ( port_scroll_now > $(".portfolio_pic").width()/2 + 120 ) {
            port_pic_display_now -= 1 ;
            port_scroll_now -= $(".portfolio_pic").width() + 60 ;
            $("#portfolio").animate( {scrollLeft: port_scroll_now}, '500');
        }
    });

    $( "#go_next" ).click( function() {
        if ( port_scroll_now < $(".portfolio_pic").width()/2 + 120 + (port_pic_total-1) * ($(".portfolio_pic").width()+60) ) {
            port_pic_display_now += 1 ;
            port_scroll_now += $(".portfolio_pic").width() + 60 ;
            $("#portfolio").animate( {scrollLeft: port_scroll_now}, '500');
        }
    });
    
    $( "#portfolio" ).scroll( function() {
        port_pic_display_prev = port_pic_display_now - 1 ;
        port_pic_display_next = port_pic_display_now + 1 ;
        $( "#portfolio" ).children( "#port_"+port_pic_display_now ).addClass("center");
        $( "#portfolio" ).children( "#port_"+port_pic_display_prev+", #port_"+port_pic_display_next ).removeClass("center");
        $( ".port_counter.now" ).text( paddingLeft(port_pic_display_now) );
        if ( port_scroll_now > $(".portfolio_pic").width()/2 + 120 )
            $( "#go_prev" ).removeClass("disabled");
        else
            $( "#go_prev" ).addClass("disabled");
        if ( port_scroll_now < $(".portfolio_pic").width()/2 + 120 + (port_pic_total-1) * ($(".portfolio_pic").width()+60) )
            $( "#go_next" ).removeClass("disabled");
        else
            $( "#go_next" ).addClass("disabled");
    });


    // Menu 的顯示控制

    $( ".left_bar" ).hover(
        function() {
            $( "#left_people" ).removeClass("item_now");
        }, function() {
            $( "#left_people" ).addClass("item_now");
    });
    

});
