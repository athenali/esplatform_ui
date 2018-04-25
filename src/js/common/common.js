//公共方法

/*异步请求方法 ajaxRequest()
* @url 接口请求地址
* @method 接口请求传值方式 默认POST
* @param 传参
* @callBack 成功回调函数
 */
function ajaxRequest(url, method, param, callBack) {
    var pathurl = url; //'/rand/'+Math.random(1);
    $.ajax({
        type: method || 'POST',
        url: pathurl,
        data: param || {},
        dataType: 'json',
        contentType: 'application/json',
        timeout: 10000,
        success: function(data){
            //回调函数
            callBack(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            if (textStatus == 'timeout') {
                top.dhtmlx.message({
                    title:'提示',
                    type: "alert-error",
                    text: '加载超时，您的网络不太通畅哦！'
                })
            }else{
                top.dhtmlx.message({
                    title:'提示',
                    type: "alert-error",
                    text: '请求数据失败，请检查您的网络和服务器情况！'
                })
            }
        }
    });
}

//设置cookies
function setCookie(name,value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+"; path=/";
}

//读取cookies
function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
    } else
        return null;
}

//删除cookies
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 10000);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString()+"; path=/";
}



