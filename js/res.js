var header=document.getElementById("header");
var regsiter=utils.getElementsByClass("regsiter",header)[0];
var popup=document.getElementById("popup");
var tuo=document.getElementById("tuo");
var hem=utils.getElementsByClass("hem",popup)[0];
var winW = document.documentElement.clientWidth || document.body.clientWidth, winH = document.documentElement.clientHeight || document.body.clientHeight;
var boxW = popup.offsetWidth, boxH = popup.offsetHeight;
//获取四个边界的最大值和最小值
var minL = 0, maxL = winW - boxW, minT = 0, maxT = winH - boxH;

regsiter.onclick=function(){
    popup.style.display="block";
};
hem.onclick=function(){
    popup.style.display="none";
};
tuo.onmousedown=down;
function down(e){
    //开始鼠标和盒子的位置
    this.staX=e.clientX;
    this.staY=e.clientY;
    this.staTop = utils.getCss(popup, "top");
    this.staLeft = utils.getCss(popup, "left");
    //防止鼠标失焦
    if(this.setCapture){
        this.setCapture();
        this.onmousemove=move;
        this.onmouseup=up;
    }else{
        var _this=this;
        document.onmousemove=function(e){
            move.call(_this,e);
        };
        document.onmouseup=function(e){
            up.call(_this,e);
        }
    }
    e.preventDefault();
}
function move(e){
    var curLeft=this.staLeft+(e.pageX-this.staX);
    var curTop=this.staTop+(e.pageY-this.staY);
    if(curLeft<=minL){
        utils.setCss(popup, "left", minL);
    }else if(curLeft>=maxL){
        utils.setCss(popup, "left", maxL);
    }else{
        utils.setCss(popup, "left", curLeft);
    }
    if (curTop <= minT) {
        utils.setCss(popup, "top", minT);
    } else if (curTop >= maxT) {
        utils.setCss(popup, "top", maxT);
    } else {
        utils.setCss(popup, "top", curTop);
    }
}
function up(){//结束拖拽
    if(this.releaseCapture){
        this.releaseCapture();
        this.onmousemove = null;
        this.onmouseup = null;
    }else{
        document.onmousemove=null;
        document.onmouseup=null;
    }
}


