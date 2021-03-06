$(function(){
  // gnb submenu 노출
  $('#gnb_menu li').mouseenter(function(){
    $('header, .header_bottom').addClass('on')
    $('.search_wrap.gnb').removeClass('on')
  })
  $('.header_bottom').mouseleave(function(){
    $('.header_bottom').removeClass('on')
    if( search_bar_open > 0){
      $('.search_wrap.gnb').addClass('on')
    }else{
      $('header').removeClass('on')
    }
  })

  // 검색창 노출
  let search_bar_open = 0;
  $('header .search_button').click(function(){
    if( search_bar_open == 0 ){
      // if( $(window).width() > 991 ){
      //   $(this).addClass('on')
      // }
      $(this).addClass('on')
      $('header .search_wrap').addClass('on')
      $('header').addClass('on')
      search_bar_open = 1;
    }else{
      $(this).removeClass('on')
      $('header .search_wrap').removeClass('on')
      $('header').removeClass('on')
      search_bar_open = 0
    }
    // $('.search_wrap').toggleClass('on')
    $('.header_bottom').removeClass('on')
  })
  $(window).resize(function(){
    if( $(this).width() < 991 ){
      $('.search_button').removeClass('on')
    }else{
      if( search_bar_open == 0 ){
        $('.search_button').removeClass('on')
      }else{
        $('.search_button').addClass('on')
      }
    }
  })


  // 모든 메뉴 노출
  $('.all_menu_button').click(function(){
    $('.all_menu').toggleClass('on')
    $('body').toggleClass('on')
  })

  // 모든 메뉴 탭
  $('.menu_left a').click(function(){
    // 왼쪽 메뉴 활성화
    $('.menu_left a').removeClass('on')
    $(this).addClass('on')

    $('.menu_right .menu_right_list').addClass('hide')
    $(this.hash).removeClass('hide')

    return false;
  })

  // 드롭다운 얼로우 클릭 시 윈도우 노출
  $('.dropdown_allow').click(function(){
    if( $(this).hasClass('lnb_window')){
      if( $(this).hasClass('on') ){
        $(this).removeClass('on')
      }else{
        $('.lnb_window').removeClass('on')
        $(this).addClass('on')
      }
    }else{
      $(this).toggleClass('on')
    }
    return false;
  })

  $('html').click(function(e){
    if(!$(e.target).parents().hasClass('window')){
       if( !$(e.target).hasClass('window') ){
         $('.lnb_window, .selet_box').removeClass('on')
      }
    }
  })


  // 탑으로 버튼
  $('.back_to_top').click(function(){
    $(window).scrollTop(0)
  })
})
