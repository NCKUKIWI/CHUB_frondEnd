

$(window).on("load", function () {
    $("#fullpage").fullpage();
    $(".auto_adjust").each(function () {
        autoAdjust($(this));
    });
});


$(document).ready(function () {

    // Activity 的動態控制

    $("#activity_list, .float_window").hover(
        function () {
            $.fn.fullpage.setAllowScrolling(false);
        }, function () {
            $.fn.fullpage.setAllowScrolling(true);
        });

    $("#sort_hot").click(function () {
        now_sort = "hot";
        $("#sort_time").removeClass("now");
        $("#sort_hot").addClass("now");
    });

    $("#sort_time").click(function () {
        now_sort = "time";
        $("#sort_hot").removeClass("now");
        $("#sort_time").addClass("now");
    });


    // Pic Window 的動態控制

    $("#go_prev").click(function () {
        if (view_scroll_now > $(".gallery_view_pic").width() / 2 + 120) {
            view_display_now -= 1;
            view_scroll_now -= $(".gallery_view_pic").width() + 60;
            $("#view_all_pic").animate({ scrollLeft: view_scroll_now }, '500');
        }
    });

    $("#go_next").click(function () {
        if (view_scroll_now < $(".gallery_view_pic").width() / 2 + (view_pic_total - 1) * ($(".gallery_view_pic").width())) {
            view_display_now += 1;
            view_scroll_now += $(".gallery_view_pic").width() + 60;
            $("#view_all_pic").animate({ scrollLeft: view_scroll_now }, '500');
        }
    });

});



function autoAdjust(outer_div) {
    var inner_pic_size = outer_div.children("img").css("width").replace("px", "") / outer_div.children("img").css("height").replace("px", "");
    var outer_div_size = outer_div.css("width").replace("px", "") / outer_div.css("height").replace("px", "");
    // alert(inner_pic_size+" , "+outer_div_size);
    if (inner_pic_size < outer_div_size) {
        outer_div.addClass("tall");
    }
    else if (inner_pic_size >= outer_div_size) {
        outer_div.addClass("fat");
    }
}