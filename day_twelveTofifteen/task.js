
function changeActiveFrd(classelem,classname) {    
    $(classelem).click(function(){
        //找原来的active对象
        $(this).siblings(classelem).removeClass(classname);
        //为点击对象添加类名 
        $(this).addClass(classname);
    });
}

function associateName() {
    $(".friend").click(function(){
        var currname = $(".choosedfrd .frdname").html();
        $(".currname").html(currname);
    }); 
}

function changePageNum() {
    // 按左箭头键-
    $(".turnpage .before").click(function(){
        var currpage = parseInt($(".currpage").html());
        if (currpage > 1) {
            currpage = currpage - 1;
            $(".currpage").html(currpage);
        }
    });
    // 按右箭头键+
    $(".turnpage .next").click(function(){
        var currpage = parseInt($(".currpage").html());
        var totpage = parseInt($(".totpage").html());
        if (currpage < totpage) {
            currpage = currpage + 1;
            $(".currpage").html(currpage);
        }
    });
}


$(document).ready(function(){     //$(function(){});
    changeActiveFrd(".friend","choosedfrd");//执行函数
    changeActiveFrd(".app","current_app");//执行函数
    associateName();
    changePageNum();
});  
