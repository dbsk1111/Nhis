$(function(){

  // span 클래스 명으로 배경 이미지 가져오기
  $('.visitor_menu_bottom span').each(function(){
    let imageName = $(this).attr('class');
    $(this).css('background-image','url(./asset/img/personal/ico-'+imageName+'.png)');
  })

  // 마우스 호버로 이미지 경로 교체
  $('.visitor_menu_personal span').hover(function(){
    $(this).css('background-image',urlChange($(this),0))
  },function(){
    $(this).css('background-image',urlChange($(this),1))
  })

  function urlChange(i, j){
    let thisUrl = i.css('background-image');
    let thisUrlLeng = i.css('background-image').length - 6;
    let addText = '-on';
    let hoverChangeUrl;

    if( j == 0){
      hoverChangeUrl = thisUrl.slice(0, thisUrlLeng) + addText + thisUrl.slice(thisUrlLeng);
    }else{
      hoverChangeUrl = thisUrl.slice(0, thisUrlLeng - addText.length ) + thisUrl.slice(thisUrlLeng);
    }
    return hoverChangeUrl;
  }
})
