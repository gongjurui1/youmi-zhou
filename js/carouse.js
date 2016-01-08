(function () {
    var dataAry = ["img/main1.jpg", "img/main2.jpg", "img/main3.jpg"];
//获取所需要的元素

var carouse = document.getElementById("carouse"),
    carouseImg = document.getElementById("carouseImg"),
    carouseTip = document.getElementById("carouseTip"),
    carouseLeft = document.getElementById("carouseLeft"),
    carouseRight = document.getElementById("carouseRight");
var divList = carouseImg.getElementsByTagName("div"),
    carouseTipList = carouseTip.getElementsByTagName("li");

//根据数据从新的计算轮播区域的宽度和当前的位置:把第一张放在末尾一份,把最后一张放在开头一份
var carouseW = carouse.clientWidth, totalW = (dataAry.length + 2) * carouseW, count = dataAry.length + 2;
utils.setGroupCss(carouseImg, {width: totalW, left: -carouseW});
    //绑定数据
    var initData = function () {
        var str = "";
        str += "<div trueImg='" + dataAry[dataAry.length - 1] + "'></div>";
        for (var i = 0; i < dataAry.length; i++) {
            str += "<div trueImg='" + dataAry[i] + "'></div>";
        }
        str += "<div trueImg='" + dataAry[0] + "'></div>";
        carouseImg.innerHTML = str;

        str = "";
        for (i = 0; i < dataAry.length; i++) {
            var cName = i === 0 ? "select" : "";
            str += "<li class='" + cName + "'></li>";
        }
        carouseTip.innerHTML = str;
    };
    initData();

//图片延迟加载
var initAsyncImg = function () {
    for (var i = 0; i < divList.length; i++) {
        ~function (i) {
            var curDiv = divList[i];
            if (!curDiv.isLoad) {
                var oImg = new Image;
                oImg.src = curDiv.getAttribute("trueImg");
                oImg.onload = function () {
                    curDiv.appendChild(oImg);
                    curDiv.isLoad = true;
                };
            }
        }(i);
    }
};
window.setTimeout(initAsyncImg, 500);
//实现焦点对齐
var setTip = function (index) {
    index < 0 ? index = carouseTipList.length - 1 : null;
    index >= carouseTipList.length ? index = 0 : null;
    for (var i = 0; i < carouseTipList.length; i++) {
        carouseTipList[i].className = i === index ? "select" : null;
    }
};
//实现图片的切换
var step = 1;
var move = function (dir) {
    if (typeof dir === "undefined" || dir === "right") {
        step++;
        if (step >= count) {
            utils.setCss(carouseImg, "left", -1 * carouseW);
            step = 2;
        }
    } else if (dir === "left") {
        step--;
        if (step < 0) {
            utils.setCss(carouseImg, "left", -(count - 2) * carouseW);
            step = 3;
        }
    } else if (dir === "tip") {
        step = this.index + 1;
    }
    animate(carouseImg, {left: -step * carouseW}, 500, 1);
    setTip(step - 1);
};
//实现自动轮播
carouseImg.autoTimer = window.setInterval(move, 3000);

//鼠标滑过显示左右切换
carouse.onmouseenter = function () {
    window.clearInterval(carouseImg.autoTimer);
    carouseLeft.style.display = carouseRight.style.display = "block";
};
carouse.onmouseleave = function () {
    carouseImg.autoTimer = window.setInterval(move, 3000);
    carouseLeft.style.display = carouseRight.style.display = "none";
};
//左右切换
    carouseLeft.onclick = function () {
    move("left");
};
    carouseRight.onclick = function () {
    move("right");
};

//实现焦点点击切换
for (var i = 0; i < carouseTipList.length; i++) {
    carouseTipList[i].index = i;
    carouseTipList[i].onclick = function () {
        move.call(this, "tip");
    };
}
})();
