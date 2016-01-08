(function(){
    var five=utils.getElementsByClass("five")[0];
    var client = document.getElementById("client");
    //var clientFive = document.getElementById("client-five");
    document.body.onmouseover = function (e) {
        e = e || window.event;
        var tar = e.target || e.srcElement;
        if (tar.id === "client" || tar.id === "lifive") {
            client.style.display = "block";
        } else {
            client.style.display = "none";
        }
    };
})();
