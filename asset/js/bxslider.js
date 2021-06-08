$(function(){
  // let bxSlider = $('.bxslider').bxSlider({
  //   responsive: true,
  //   auto: true,
  //   autoControls: true,
  //   autoStart: true,
  //   infiniteLoop: true,
  //   // 이거 끄고 나서 클래스 자동 인식 질문
  //   stopAutoOnClick: true,
  //   pager: true,
  //   // slideWidth: 410,
  //   touchEnabled: false,
  //   pagerType: 'short'
  // });

  let bxSlider = $('.bxslider').bxSlider();

  buildSlider();
  function buildSlider(){
    if( $(window).outerWidth() < 640 ){
      bxSlider.reloadSlider({
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
        pagerType: 'full',
      });
    }else{
      bxSlider.reloadSlider({
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
        pagerType: 'short'
      });
    }
  }

  // $(window).resize(function(){
  //   if( $(window).width() <= 640 ){
  //     bxSlider.reloadSlider({
  //       pagerType: 'full',
  //     });
  //   }else{
  //     bxSlider.reloadSlider({
  //       pagerType: 'short',
  //     });
  //   }
  // })

  $(window).resize(function(){
    buildSlider();
  })
})
