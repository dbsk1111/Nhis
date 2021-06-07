$(function(){

  // span 클래스 명으로 배경 이미지 가져오기
  $('.visitor_menu_bottom span').each(function(){
    let imageName = $(this).attr('class');
    $(this).css('background-image','url(./asset/img/visitor_menu/ico-'+imageName+'.png)');
  })

  // 마우스 호버로 이미지 경로 교체
  $('.visitor_menu_bottom span').hover(function(){
    let imageName = $(this).attr('class');
    $(this).css('background-image','url(./asset/img/visitor_menu/ico-'+imageName+'-on.png)');
  },function(){
    let imageName = $(this).attr('class');
    $(this).css('background-image','url(./asset/img/visitor_menu/ico-'+imageName+'.png)');
  })
})
