$(function(){
  $('.bxslider').bxSlider({
    responsive: true,
    auto: true,
    autoControls: true,
    autoStart: true,
    infiniteLoop: true,
    // 이거 끄고 나서 클래스 자동 인식 질문
    stopAutoOnClick: true,
    pager: true,
    // slideWidth: 410,
    touchEnabled: false,
    pagerType: 'short',
  });


})




//
// $(function() {
//   var a = false;
//   var b = new Array;
//   $(".visitor-toggle button").click(function(c) {
//     $(".visitor-toggle button").removeClass("on");
//     $(this).addClass("on");
//     if ($(this).index() == 1) {
//       $(this).closest(".visitor-toggle").addClass("second")
//     } else {
//       $(this).closest(".visitor-toggle").removeClass("second")
//     }
//     $(".visitor-menu .menu-list").removeClass("show");
//     $(".visitor-menu .menu-list").eq($(this).index()).addClass("show")
//   })
// });
// $(function() {
//   $(".banner-wrap	.banner-top span em").eq(1).text($(".banner-slides li").length);
//   slider = $(".banner-slides ul").bxSlider({
//     auto: true,
//     autoControls: true,
//     infiniteLoop: true,
//     mode: "vertical",
//     touchEnabled: false,
//     onSlideAfter: function() {
//       $(".banner-wrap	.banner-top span").html("<em>" + (slider.getCurrentSlide() + 1) + "</em> / <em>" + slider.getSlideCount() + "</em>");
//       $(".banner-slides li").each(function() {
//         if ($(this).attr("aria-hidden") == "false") {
//           $(this).find("a").attr("tabIndex", "0")
//         } else {
//           $(this).find("a").attr("tabIndex", "-1")
//         }
//       })
//     },
//     onSliderLoad: function() {
//       $(".banner-slides li").each(function() {
//         if ($(this).attr("aria-hidden") == "false") {
//           $(this).find("a").attr("tabIndex", "0")
//         } else {
//           $(this).find("a").attr("tabIndex", "-1")
//         }
//       })
//     },
//     touchEnabled: (navigator.maxTouchPoints > 0)
//   });
//   $(".banner-slides a").focusin(function() {
//     slider.stopAuto()
//   });
//   $(".banner-wrap .bx-controls-auto-item a").click(function(a) {
//     $(this).closest(".bx-controls-auto-item").hide();
//     $(this).closest(".bx-controls-auto-item").siblings().show().find("a").focus()
//   })
// });
// var timer = null;
// var increaseCount = 1;
//
// function startSetInterval() {
//   timer = setInterval(autoChange, 2000)
// }
//
// function autoChange() {
//   maxLength = $("#main-wrap .main-policy dd a").length;
//   if (increaseCount == maxLength) {
//     increaseCount = 0
//   }
//   $("#main-wrap .main-policy dd a").removeClass("on");
//   $("#main-wrap .main-policy dd a").eq(increaseCount++).addClass("on")
// }
// $(function() {
//   startSetInterval();
//   $("#main-wrap .main-policy dd a").hover(function() {
//     clearInterval(timer);
//     $("#main-wrap .main-policy dd a").removeClass("on")
//   }, function() {
//     startSetInterval()
//   })
// });
// $(function() {
//   $(".main-policy .highlihgt a").bind("mouseenter focus", function() {
//     $(this).closest(".highlihgt").find(".balloon").show()
//   });
//   $(".main-policy .highlihgt a").bind("mouseleave blur", function() {
//     $(this).closest(".highlihgt").find(".balloon").hide()
//   });
//   $(".banner-zone.v1 .banner-top span em").eq(1).text($(".banner-zone.v1 li").length);
//   slider1 = $(".banner-zone.v1 ul").bxSlider({
//     auto: true,
//     autoControls: true,
//     infiniteLoop: true,
//     onSlideAfter: function() {
//       $(".banner-zone.v1 .banner-top span").html("<em>" + (slider1.getCurrentSlide() + 1) + "</em> / <em>" + slider1.getSlideCount() + "</em>");
//       $(".banner-zone.v1 li").each(function() {
//         if ($(this).attr("aria-hidden") == "false") {
//           $(this).find("a").attr("tabIndex", "0")
//         } else {
//           $(this).find("a").attr("tabIndex", "-1")
//         }
//       })
//     },
//     onSliderLoad: function() {
//       $(".banner-zone.v1 li").each(function() {
//         if ($(this).attr("aria-hidden") == "false") {
//           $(this).find("a").attr("tabIndex", "0")
//         } else {
//           $(this).find("a").attr("tabIndex", "-1")
//         }
//       })
//     },
//     touchEnabled: (navigator.maxTouchPoints > 0)
//   });
//   $(".banner-zone.v1 a").focusin(function() {
//     slider1.stopAuto()
//   });
//   $(".banner-zone.v1 .bx-controls-auto-item a").click(function(a) {
//     $(this).closest(".bx-controls-auto-item").hide();
//     $(this).closest(".bx-controls-auto-item").siblings().show().find("a").focus()
//   })
// });
// $(function() {
//   $(".health-state li button").click(function() {
//     $(".health-state li").removeClass("on");
//     $(this).closest("li").addClass("on")
//   })
// });
// $(function() {
//   $(".banner-zone.v2 .banner-top span em").eq(1).text($(".banner-zone.v2 li").length);
//   slider2 = $(".banner-zone.v2 ul").bxSlider({
//     auto: true,
//     autoControls: true,
//     infiniteLoop: true,
//     onSlideAfter: function() {
//       $(".banner-zone.v2 .banner-top span").html("<em>" + (slider2.getCurrentSlide() + 1) + "</em> / <em>" + slider2.getSlideCount() + "</em>");
//       $(".banner-zone.v2 li").each(function() {
//         if ($(this).attr("aria-hidden") == "false") {
//           $(this).find("a").attr("tabIndex", "0")
//         } else {
//           $(this).find("a").attr("tabIndex", "-1")
//         }
//       })
//     },
//     onSliderLoad: function() {
//       $(".banner-zone.v2 li").each(function() {
//         if ($(this).attr("aria-hidden") == "false") {
//           $(this).find("a").attr("tabIndex", "0")
//         } else {
//           $(this).find("a").attr("tabIndex", "-1")
//         }
//       })
//     },
//     touchEnabled: (navigator.maxTouchPoints > 0)
//   });
//   $(".banner-zone.v2 a").focusin(function() {
//     slider2.stopAuto()
//   });
//   $(".banner-zone.v2 .bx-controls-auto-item a").click(function(a) {
//     $(this).closest(".bx-controls-auto-item").hide();
//     $(this).closest(".bx-controls-auto-item").siblings().show().find("a").focus()
//   })
// });
// $(function() {
//   $(".top-banner .banner-top span em").eq(1).text($(".top-banner li").length);
//   slider3 = $(".top-banner ul").bxSlider({
//     auto: true,
//     autoControls: true,
//     infiniteLoop: true,
//     onSlideAfter: function() {
//       $(".top-banner .banner-top span").html("<em>" + (slider3.getCurrentSlide() + 1) + "</em> / <em>" + slider3.getSlideCount() + "</em>");
//       $(".top-banner li").each(function() {
//         if ($(this).attr("aria-hidden") == "false") {
//           $(this).find("a").attr("tabIndex", "0")
//         } else {
//           $(this).find("a").attr("tabIndex", "-1")
//         }
//       })
//     },
//     onSliderLoad: function() {
//       $(".top-banner li").each(function() {
//         if ($(this).attr("aria-hidden") == "false") {
//           $(this).find("a").attr("tabIndex", "0")
//         } else {
//           $(this).find("a").attr("tabIndex", "-1")
//         }
//       })
//     },
//     touchEnabled: (navigator.maxTouchPoints > 0)
//   });
//   $(".top-banner a").focusin(function() {
//     slider3.stopAuto()
//   });
//   $(".top-banner .bx-controls-auto-item a").click(function(a) {
//     $(this).closest(".bx-controls-auto-item").hide();
//     $(this).closest(".bx-controls-auto-item").siblings().show().find("a").focus()
//   })
// });
// $(".center-intro .cont > p button").click(function() {
//   $(this).parents(".cont").toggleClass("on")
// });
// $(".center-intro .box-site ul li a").click(function(b) {
//   b.preventDefault();
//   var c = $(this).text();
//   var a = $(this).attr("href");
//   $(this).parents(".cont").find("p > button").text(c);
//   $(this).parents(".cont").find(".btn-move").attr("href", a).focus();
//   $(this).parents(".cont").removeClass("on")
// });
