//(function(){
//var likeList=document.getElementById("likeList");
//var oLis=likeList.getElementsByTagName("li");
//
//
//var nas=utils.getElementsByClass("nas")[0];
//
//for(var i=0;i<oLis.length;i++) {
//    //var boxHeight=nas.style.top;
//    oLis[i].onmouseenter = function (i) {
//        nas.style.display = "block";
//        animate(nas, {top: 0}, 300, 1);
//    };
//    oLis[i].onmouseleave=function(){
//        animate(nas, {top: 130+"px"}, 300, 1);
//        //nas.style.display = "none";
//    }
//}
//})()
$('.actionbox').each(function(){
    var boxheight = $(this).height();
    $(this).find('.nas').css({top:boxheight+'px'});
    $(this).hover(
        function(){
            $(this).find('.nas').stop().animate({top:0},300);
        },function(){
            $(this).find('.nas').stop().animate({top:boxheight+'px'},300);
        }
    )
})
$('.lecturerPerson>li').each(function(){
    $(this).hover(
        function(){
            $(this).find('.nas2').stop().animate({bottom:0},300);
        },function(){
            $(this).find('.nas2').stop().animate({bottom:-30+'px'},300);
        }
    )
})