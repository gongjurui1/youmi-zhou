(function(){
var headerRight=document.getElementById("headerright");
var bar=utils.getElementsByClass("bar",headerRight)[0];
var loginBar=document.getElementById("loginBar");
bar.onclick=function(){
    if(loginBar.style.display==="block"){
        loginBar.style.display="none";
    }else{
        loginBar.style.display="block";
    }
}
})()