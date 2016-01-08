
//break是用来跳出循环的，例如for，while，do-while都可以跳出，但不跳出函数
//return是使整个函数返回的，后面的不管是循环里面还是循环外面的都不执行
//
//再说一下，break语句通常用在循环语句和开关语句中,当break语句用于do-while、for、while循环语句中时,可使程序终止循环而执行循环后面的语句, 通常break语句总是与if语句联在一起,即满足条件时便跳出循环
//return语句是将函数的值返回主调函数。
//
//还有一个continue语句的作用是跳过循环本中剩余的语句而强行执行下一次循环。continue语句只用在for、while、do-while等循环体中,常与if条件语句一起使用,用来加速循环


//基础版：解决this和重复问题
function bind(ele,type,fn){
    if(ele.addEventListener){
        ele.addEventListener(type,fn,false);
    }else{
        if(!ele["aEvent"+type]){
            ele["aEvent"+type]=[];
        }
        var ary=ele["aEvent"+type];
        for(var i=0;i<ary.length;i++){
            if(ary[i].photo===fn){return}
        }
        var tempFn=function(){fn.call(ele);};
        tempFn.photo=fn;
        ary.push(tempFn);
        ele.attachEvent("on"+type,tempFn);
    }
}

function unbind(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(fn,type,false);
    }else{
        var ary=ele["aEvent"+type];
        if(ary) {
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].photo === fn) {
                    ele.detachEvent("on" + type, ary[i]);
                    ary.splice(i, 1);//不但在事件中将其移除，还要在数组里将其移除
                    break;///因为同一个方法只能被绑定一次，则：移除了这次绑定，则应该不再循环了
                }
            }
        }
    }
}

//完整版解决DOM兼容问题:this问题，重复问题，顺序问题

//    1、on负责把要绑定在事件上的方法保存在一个数组里.
//    2、run负责方法当事件发生时按顺序调用保存在数组里的方法，这样就解决了IE中绑定在事件上的方法执行顺序混乱的问题。并且还随便把其它IE的兼容性问题给解决了。
//    3、bind方法其实是解决this指向问题的（当然也解决了重复绑定的问题）。如果不考虑this的问题，可以把run方法直接用attachEvent来绑定：ele.attachEvent(“on”+type,run);
function on(ele,type,fn){
    if(ele.addEventListener){
        ele.addEventListener(type,fn,false);
    }else{
        if(!ele["aEvent"+type]){
            ele["aEvent"+type]=[];
            ele.attachEvent("on"+type,function(e){run.call(ele,e)});
        }
        var ary=ele["aEvent"+type];
        for(var i=0;i<ary.length;i++){
            if(ary[i]===fn){return;}
        }
        ary.push(fn);
        //ele.attachEvent("on"+type,function(e){fn.call(ele,e)});
        //bind(ele,type,run);//负责把run绑定在ele元素的type事件上一次
    }
}


function run(){
    //var e=window.event;
    var type= e.type;
    if(!e.target){
        //为什么把兼容问题写在run里？
        //只有run方法才能得到事件对象，
        //是因为run是由事件驱动的，事件触发它执行
        e.target= e.srcElement;
        e.preventDefault=function(){//阻止默认事件
            e.returnValue=false;
        }
        e.stoPropagation=function(){//阻止冒泡传播机制
            e.cancalBubble=true;
        }
        e.pageX= e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft);
        e.pageY= e.clientY+(document.documentElement.scrollTop||document.body.scrollTop);
    }
    var ary=this["aEvent"+type];
    for(var i=0;i<ary.length;i++){
        if(typeof ary[i]==="function"){
            ary[i].call(this,e);
        }else{
            ary.splice(i,1);
            i--;
        }
    }

}

function off(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false);
    }else{
        var ary=ele["aEvent"+type];
        if(ary){
            for(var i=0;i<ary.length;i++){
                if(ary[i]===fn){
                    ary[i]=null;
                    return;
                }
            }
        }
    }
}

function processThis(obj,fn){
    return function(e){fn.call(obj,e)}
}