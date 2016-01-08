(function(){
var banner=document.getElementById("banner");
var searchtext = document.getElementById("searchtext");
var searchList = document.getElementById("searchList");
var schword = document.getElementById("schword");

//实现鼠标滑过列表有.hover的背景颜色
var liList = searchList.getElementsByTagName("li");
for (var i = 0; i < liList.length; i++) {
    liList[i].onmouseenter = function () {
        this.className = "hover";
    };
    liList[i].onmouseleave = function () {
        this.className = null;
    };
}

//当我们在文本框输入内容的时候,判断有没有输入进去,有的话显示我们的列表,没有的话我们让列表隐藏(首尾空格不算)
//searchtext.onkeyup = function () {
//    //searchtext.value=null;
//    var val = this.value.replace(/(^ +| +$)/g, "");
//    searchList.style.display = val === "" ? "none" : "block";
//};

//处理点击的时候不同的操作->事件委托处理
    banner.onclick = function (e) {
    e = e || window.event;
    var curEle = e.target || e.srcElement;
    //如果是#searchtext文本框,我们判断是否有内容,有内容显示
    //如果是#searchList下的li,我们让li的内容替换文本框的内容,列表消失
    //如果点击的是#searchList,不处理
    //以上都不是的话,我们就隐藏列表


    if (curEle.id === "searchtext") {
        //searchtext.onkeyup.call(curEle);
        searchtext.value =null;
        schword.style.display="none";
        searchList.style.display="block";
    }else if (curEle.tagName.toLowerCase() === "li" && curEle.parentNode === searchList) {
        searchtext.value = curEle.innerHTML;
        searchList.style.display = "none";

    } else if (curEle.id === "searchList") {
        //searchList.style.display="block";
    } else {
        searchtext.value ="请输入要查找的内容";
        schword.style.display="block";
        searchList.style.display = "none";
    }

};
})()

;(function(){
    var context=document.getElementById("context");
    var sort=utils.getElementsByClass("sort")[0];
    var sortList=utils.getElementsByClass("sort-list")[0];
    context.onmouseover = function (e) {
        e = e || window.event;
        var tar = e.target || e.srcElement;
        if (tar.className === "sort" || tar.className === "sort-list") {
            sortList.style.display = "block";
        } else {
            sortList.style.display = "none";
        }
    }
})()