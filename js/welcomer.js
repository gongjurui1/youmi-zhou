(function(){
var welcomer = document.getElementById("welcomer");
var welTitle = utils.getElementsByClass("title", welcomer)[0];
var tLis = welTitle.getElementsByTagName("li");
var navLine = utils.getElementsByClass("navline", welcomer)[0];
var ulLine = navLine.getElementsByTagName("ul");

for (var i = 0; i < tLis.length; i++) {

    tLis[i].zhou = i;
    tLis[i].onmouseover = function () {
        for (var j = 0; j < tLis.length; j++) {
            tLis[j].className = "";
            ulLine[j].className = "";
        }
        this.className = "navSelect";
        ulLine[this.zhou].className = "navSelect";
    }
}
})()














