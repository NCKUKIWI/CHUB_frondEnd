$(document).ready(function(){

    // Initialize
    
    var now_tab = "none", now_page = "none", sidebar_open = 0, halfscreen_open = 0, login_status = 0, dialogue_name = null, halfscreen_finished = null;
    $( ".sidebar_cont, .side_cont_page, .side_menu, .sidebar_cover, .side_halfscreen, #side_message, #halfscreen_first_edit, #halfscreen_edit, #float_password_change" ).hide();

    
    // Tab Listener

    $( "#side_profile" ).click(function() {
        if ( now_tab == "profile" ) {
            switchSidebar("close");
        }
        else {
            if ( now_page == "login" ) {
                logIn();
            }
            else if ( now_page == "sign_up" ) {
                signUp();
            }
            else if ( now_page == "my_profile" ) {
                myProfile();
            }
            else if ( now_page == "interested" ) {
                interested();
            }
            else if ( now_page == "heads_up" ) {
                headsUp();
            }
            else {
                if ( login_status == 0 ) {
                    logIn();
                }
                else if ( login_status == 1 ) {
                    myProfile();
                }
            }
            now_tab = "profile";
            switchSidebar("open");
            setTimeout(function(){
                $( "#side_profile" ).addClass("active");
            },200);
        }
    });

    $( "#side_message" ).click(function() {
        if ( now_tab == "message" ) {
            switchSidebar("close");
        }
        else {
            messenger();
            now_tab = "message";
            switchSidebar("open");
            setTimeout(function(){
                $( "#side_message" ).addClass("active");
            },200);
        }
    });

    $( "#side_search, #search" ).click(function() {
        if ( now_tab == "search" ) {
            switchSidebar("close");
        }
        else {
            search();
            now_tab = "search";
            switchSidebar("open");
            setTimeout(function(){
                $( "#side_search" ).addClass("active");
            },200);
        }
    });

    $( "#side_panel" ).click(function() {
        if ( now_tab == "panel" ) {
            switchSidebar("close");
        }
        else {
            // 開啟 Panel
            now_tab = "panel";
            switchSidebar("open");
            setTimeout(function(){
                $( "#side_panel" ).addClass("active");
            },200);
        }
    });

    $( ".sidebar_cover" ).click(function() {
        switchSidebar("close");
    }); 

    $( ".halfscreen_cover" ).click(function() {
        switchHalfscreen("close");
    }); 


    // Button Listener

    $( "#sidebar_signup, #dont_have_account" ).click(function() {
        signUp();
    });

    $( "#sidebar_login" ).click(function() {
        logIn();
    });

    $( "#sidebar_interested" ).click(function() {
        interested();
    });

    $( "#sidebar_profile" ).click(function() {
        myProfile();
    });

    $( "#sidebar_headsup" ).click(function() {
        headsUp();
    });

    $( "#sidebar_messenger" ).click(function() {
        messenger();
    });

    $( "#sidebar_dialogue" ).click(function() {
        dialogue();
    });

    $( ".dropdown-content" ).click(function() {
        if ($(this).hasClass("opened")) {
            $(this).removeClass("opened");
        }
        else {
            $(this).addClass("opened");
            $(this).siblings().removeClass("opened");
        }
    });

    $( ".selectable" ).click(function() {
        selectItem($(this));
    });

    $( "#side_btn_login" ).click(function() {
        loginSuccess();
    });

    $( "#side_btn_logout" ).click(function() {
        logoutSuccess();
    });

    $( "#side_btn_signup" ).click(function() {
        switchHalfscreen("open");
        $( "#halfscreen_edit" ).hide();
        $( "#halfscreen_first_edit" ).show();
    });

    $( "#side_first_edit_save, #side_edit_save" ).click(function() {
        halfscreen_finished = 1;
        switchHalfscreen("close");
    });

    $( "#side_first_edit_cancel, #side_edit_cancel" ).click(function() {
        switchHalfscreen("close");
    });

    $( "#side_btn_edit" ).click(function() {
        switchHalfscreen("open");
        $( "#halfscreen_first_edit" ).hide();
        $( "#halfscreen_edit" ).show();
    });

    $( "#side_btn_edit" ).click(function() {
        switchHalfscreen("open");
        $( "#halfscreen_first_edit" ).hide();
        $( "#halfscreen_edit" ).show();
    });

    $( "#side_edit_pw" ).click(function() {
        $( "#float_password_change" ).fadeIn();
        switchHalfscreen("close");
    });

    $( "#side_btn_save_pw, #close_pw" ).click(function() {
        $( "#float_password_change" ).fadeOut();
        switchHalfscreen("open");
    });

    $( ".a_message" ).click(function() {
        $( "#dialogue_name" ).text("Chia Hao Liao");
        $( "#dialogue_name" ).css("cursor","pointer");
        dialogue_name = "Chia Hao Liao";
        dialogue();
    });

    $( "#close_dialogue" ).click(function() {
        $( "#dialogue_name" ).text("Dialogue");
        $( "#dialogue_name" ).css("cursor","default");
        dialogue_name = null;
        messenger();
    });


    // Other Listeners
    
    $( ".sidebar_cont, .side_halfscreen" ).hover(
        function() {
            $.fn.fullpage.setAllowScrolling(false);
        }, function() {
            $.fn.fullpage.setAllowScrolling(true);
    });


    // Functions

    function switchSidebar( command ) {
        $( ".side_icon" ).removeClass("active");
        if ( command == "open" ) {
            sidebar_open = 1;
            if ( halfscreen_open == 1 )
                switchHalfscreen("close");
            $( ".sidebar_cont, .sidebar_cover" ).show();
            $( ".sidebar_cont" ).css({'right':'94px','opacity':'0.95'});
        }
        if ( command == "close" ) {
            sidebar_open = 0;
            if ( halfscreen_open == 0 && halfscreen_finished == 0 )
                switchHalfscreen("open");
            now_tab = "none";
            $( ".sidebar_cont" ).css({'right':'60px','opacity':'0'});
            setTimeout(function(){
                $( ".sidebar_cont, .sidebar_cover" ).hide();
            }, 700 );
        };
    }

    function switchHalfscreen( command ) {
        if ( command == "open" ) {
            halfscreen_open = 1;
            if ( halfscreen_finished != 1 )
                halfscreen_finished = 0;
            if ( sidebar_open == 1 )
                switchSidebar("close");
            $( ".side_halfscreen, .halfscreen_cover" ).show();
            $( ".side_halfscreen" ).css({'right':'0'});
        }
        if ( command == "close" ) {
            halfscreen_open = 0;
            if ( sidebar_open == 0 )
                switchSidebar("close");
            $( ".side_halfscreen" ).css({'right':'-1000px'});
            setTimeout(function(){
                $( ".side_halfscreen, .halfscreen_cover" ).hide();
            }, 700 );
        };
    }

    function signUp() {
        if (now_page != "sign_up") {
            $( "#sidebar_signup" ).addClass("active");
            $( "#sidebar_login" ).removeClass("active");
            $( ".side_menu" ).hide();
            $( "#side_menu_profile_before" ).show();
            $( ".side_cont_page" ).fadeOut(200);
            $( "#side_cont_signup" ).fadeIn(800);
            $( ".triangle" ).css({'left':'70%'});
            now_page = "sign_up";
        }
    }

    function logIn() {
        if (now_page != "log_in") {
            $( "#sidebar_login" ).addClass("active");
            $( "#sidebar_signup" ).removeClass("active");
            $( ".side_menu" ).hide();
            $( "#side_menu_profile_before" ).show();
            $( ".side_cont_page" ).fadeOut(200);
            $( "#side_cont_login" ).fadeIn(800);
            $( ".triangle" ).css({'left':'20%'});
            now_page = "log_in";
        }
    }

    function interested() {
        if (now_page != "interested") {
            $( "#sidebar_interested" ).addClass("active");
            $( "#sidebar_headsup" ).removeClass("active");
            $( "#sidebar_profile" ).removeClass("active");
            $( ".side_menu" ).hide();
            $( "#side_menu_profile_after" ).show();
            $( ".side_cont_page" ).fadeOut(200);
            $( "#side_cont_interested" ).fadeIn(800);
            $( ".triangle" ).css({'left':'14%'});
            now_page = "interested";
        }
    }

    function myProfile() {
        if (now_page != "my_profile") {
            $( "#sidebar_profile" ).addClass("active");
            $( "#sidebar_headsup" ).removeClass("active");
            $( "#sidebar_interested" ).removeClass("active");
            $( ".side_menu" ).hide();
            $( "#side_menu_profile_after" ).show();
            $( ".side_cont_page" ).fadeOut(200);
            $( "#side_cont_myprofile" ).fadeIn(800);
            $( ".triangle" ).css({'left':'47.5%'});
            now_page = "my_profile";
        }
    }

    function headsUp() {
        if (now_page != "heads_up") {
            $( "#sidebar_headsup" ).addClass("active");
            $( "#sidebar_profile" ).removeClass("active");
            $( "#sidebar_interested" ).removeClass("active");
            $( ".side_menu" ).hide();
            $( "#side_menu_profile_after" ).show();
            $( ".side_cont_page" ).fadeOut(200);
            $( "#side_cont_headsup" ).fadeIn(800);
            $( ".triangle" ).css({'left':'81%'});
            now_page = "heads_up";
        }
    }

    function search() {
        if (now_page != "search") {
            $( ".side_menu" ).hide();
            $( "#side_menu_search" ).show();
            $( ".side_cont_page" ).fadeOut(200);
            $( "#side_cont_search" ).fadeIn(800);
            now_page = "search";
        }
    }
    
    function messenger() {
        if (now_page != "messenger") {
            $( "#sidebar_messenger" ).addClass("active");
            $( "#sidebar_dialogue" ).removeClass("active");
            $( ".side_menu" ).hide();
            $( "#side_menu_message" ).show();
            $( ".side_cont_page" ).fadeOut(200);
            $( "#side_cont_messenger" ).fadeIn(800);
            if ( login_status ==  0 ) {
                $( ".triangle" ).css({'left':'20%'});
            }
            else if ( login_status == 1 ) {
                $( ".triangle" ).css({'left':'23%'});
            }
            now_page = "messenger";
        }
    }

    function dialogue() {
        if ( now_page != "dialogue" && dialogue_name != null) {
            $( "#sidebar_dialogue" ).addClass("active");
            $( "#sidebar_messenger" ).removeClass("active");
            $( ".side_menu" ).hide();
            $( "#side_menu_message" ).show();
            $( ".side_cont_page" ).fadeOut(200);
            $( "#side_cont_dialogue" ).fadeIn(800);
            if ( login_status ==  0 ) {
                $( ".triangle" ).css({'left':'70%'});
            }
            else if ( login_status ==  1 ) {
                $( ".triangle" ).css({'left':'72.5%'});
            }
            now_page = "dialogue";
        }
    }

    function loginSuccess() {
        $( ".sidebar_cont" ).addClass("widewidth");
        $( "#side_message" ).show();
        login_status = 1;
        myProfile();
    }

    function logoutSuccess() {
        $( ".sidebar_cont" ).removeClass("widewidth");
        $( "#side_message" ).hide();
        login_status = 0;
        logIn();
    }

    function selectItem(item) {
        var selected = item.text();
        item.siblings(".default").text(selected);
        item.siblings(".hidden").removeClass("hidden");
        item.addClass("hidden");
    }

});
