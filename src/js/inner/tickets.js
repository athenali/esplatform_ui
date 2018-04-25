$(function() {
    //重要dhtmlx
    dhtmlx.message.position = "";

    // 左侧
    // var userInfo = getCookie("userInfo");
    // if(!userInfo){
    //     window.location.href = "../../login.html";
    // }
    // var userInfoArr = userInfo.split("/");
    // var userName = userInfoArr[0];
    // var userId = userInfoArr[1];
    // var uUserDTOid = userInfoArr[2];
    // $("#userName").text(userName).attr("userId",userId);

    var userInfo=localStorage.getItem("userInfo");
    console.log(userInfo)
    if(!userInfo){
        window.location.href = "../../login.html";
    }
    var userInfoJson = JSON.parse(userInfo);
    $("#userName").text(userInfoJson.username);
    // loaclsatrage


    // 加载菜单[待处理dom全局变量]
    // ajaxRequest(GLOBAL_AJAX_URL.menunav+uUserDTOid, 'GET', {}, function(res){
    var res = loginMenu;
        if(res.status){
            var menuData = res.data,
                $menuBox = $("#sidebarMenuUl");
                "../user/uuser.html"
                "pages/views/user/uorg.html"
            for (var i = 0, len = menuData.length; i < len; i++) {
                var $navUL = $('<li><a class="menu_toggle" pid="'+menuData[i].id+'" dataurl="'+menuData[i].url+'" href="javascript:void(0);"><i class="icon_menu icon_chart"></i><span class="menu_name">'+menuData[i].name+'</span><i class="icon_arrow"></i></a><ul class="menu_subnav"></ul></li>');
                if(menuData[i].subMenus.length>0){
                    $.each(menuData[i].subMenus,function(k,val){
                        var dataUrl = val.url;
                        var dataUrlArr = dataUrl.split("/");
                        var newDataUrl = "../"+dataUrlArr[2]+"/"+dataUrlArr[3]
                        var $subNavUL = $('<li><a id="menuNav'+ val.id +'" dataUrl="' + newDataUrl +'" navId="'+ val.id +'"><i class="icon_menu icon_userm"></i><span>'+ val.name +'</span></a></li>')
                        $navUL.find(".menu_subnav").append($subNavUL);

                        //默认设置第一个打开
                        if(i === 0 && k === 0){
                            $navUL.children('.menu_toggle').addClass('menu_open').siblings('.menu_subnav').show().find('a').addClass('menu_active');
                            $("#tipsUl").append('<li class="active"><a  dataurl = "' + val.url +'" tipsId="'+ val.id +'" id="tipsLi'+ val.id +'">'+ val.name +'</a><i class="close">关闭</i></li>')
                            $("#tabIframe").append('<iframe class="iframe active"src="'+ newDataUrl +'" id="iframe'+ val.id +'"></iframe>');
                        }
                    })
                };
                $menuBox.append($navUL);
            }

            setContentHeight()
        }else{
            dhtmlx.message({
                type: "error",
                text: res.message
            });
        }
    // });
    //左侧菜单效果[待优化]
    $('.menu_nav').on('click','a', function () {
        var $this = $(this),
            $parent = $this.parent('li').siblings('li'),
            $parents = $this.parents('li').siblings('li'),
            isToggle = $this.hasClass('menu_toggle');//是否是可展开的菜单栏
        var $_this= $this;
        var dataurl = $_this.attr("dataurl"),
            navid   = $_this.attr("navId"),
            text    = $_this.text();
        if (isToggle) {
            if ($this.hasClass('menu_open')) {
                $this.removeClass('menu_open').siblings('ul').slideUp(200);
            } else {
                $this.addClass('menu_open').siblings('ul').slideDown(200);
                $parent.children('ul').slideUp(200);
                $parent.children('a').removeClass('menu_open');
            }
        } else {
            $parents.find('ul').slideUp(200);	//关闭自身之外的列表
            $parents.find('a').removeClass('menu_open');//回归箭头
            $('.menu_nav li a').removeClass('menu_active');
            $this.addClass('menu_active');

            //创建标签和iframe
            var tipsLi=$("#tipsUl").find("#tipsLi"+ navid +"");
            if(tipsLi.length>0){
                $("#tipsUl li").removeClass("active");
                tipsLi.parents("li").addClass("active");
                $("#tabIframe").find(".iframe").removeClass("active");
                $("#tabIframe").find("#iframe"+ navid +"").addClass("active");

            }else {
                // 创建右侧tips
                $("#tipsUl li").removeClass("active");
                $("#tipsUl").append('<li class="active"> <a  id="tipsLi'+ navid +'" tipsId="'+ navid + '">'+ text +'</a> <i class="close">关闭</i></li>');
                // 创建iframe
                var isCreate=$("#tabIframe").find("#iframe"+ navid +"").length;
                // 判断是否需要创建ifrmae
                if(isCreate>0){
                    $("#tabIframe").find(".iframe").removeClass("active");
                    $("#tabIframe").find("#iframe"+ navid +"").addClass("active")
                }else {
                    $("#tabIframe").find(".iframe").removeClass("active");
                    $("#tabIframe").append('<iframe class="iframe active"src="' + webroot + dataurl +'" id="iframe'+ navid +'" iframeId="' + navid + ' "></iframe>');
                }

            }
        }
    })

    // 右侧tips 点击
    $("#tipsUl").on("click","li a",function(){
        var $_this=$(this);
        var tipsLiId= $_this.attr("tipsId");
        // 判断点击是否为当前显示的,如果是 不任何操作(不刷新)
        var activeTipsLiId = $("#tipsUl").find(".active").find("a").attr("tipsId");
        if(activeTipsLiId===tipsLiId){
            return false;
        }
        $("#tipsUl li").removeClass("active");
        $_this.parents("li").addClass("active");
        $("#tabIframe").find(".iframe").removeClass("active");
        $("#tabIframe").find("#iframe"+ tipsLiId +"").addClass("active");
        $("#sidebarMenuUl").find("li").removeClass("active");
        $("#sidebarMenuUl").find("#menuNav"+ tipsLiId +"").parents("li").addClass("active")
    })
    //右侧tab标签关闭
    $("#tipsUl").on("click","i",function(){
        var parentLi = $(this).parent("li"),
            $tabLi = parentLi.siblings("li");
        var thisTipsId = $(this).siblings("a").attr("tipsId");
        if($tabLi.length>0){
            parentLi.remove();
            $("#tabIframe").find("#iframe"+ thisTipsId +"").remove();
        }
        if(parentLi.hasClass("active")){
            var tipsid = $tabLi.first().find("a").attr("tipsId");
            $tabLi.first().find("a").parent("li").addClass("active");
            $("#tabIframe").find("#iframe"+ tipsid +"").addClass("active");
            $("#sidebarMenuUl").find("li").removeClass("active");
            $("#sidebarMenuUl").find("#menuNav"+ tipsid +"").parents("li").addClass("active");
            // 左侧导航
            
        }
       
    });
    //展开和缩短菜单 待优化
    $('#toggleBtn').on('click', function () {
        var $menu    = $('#sidebar'),
            $content = $('#content');
        if ($menu.hasClass('open_cell')) {
            $menu.removeClass('open_cell');
            $('.menu_nav').css('overflow-y','auto');
            $('.menu_open').siblings('ul').show();//展开后显示一级已选中菜单
            $('.menu_open').parents('ul').show();//展开后显示已选中菜单
            $menu.animate({width:'200px'},"fast");
            $content.animate({marginLeft:'200px'},"fast");
        } else {
            $menu.addClass('open_cell');
            $('.menu_nav').css('overflow-y','visible');
            $('.menu_nav ul').hide();
            $('.menu_subnav .menu_open').siblings('ul').show();//关闭后显示已选中菜单
            $menu.animate({width:'60px'},"fast");
            $content.animate({marginLeft:'60px'},"fast");
        }
    })
    function setContentHeight() {
        var winHeight = $(window).height();
        var topHeight = $('#header').height();
        var footHeight = $('#footer').height();
        var $conHeight = winHeight - topHeight - footHeight;
        $("#content").height($conHeight);
    }
    //每次屏幕尺寸变化
    $(window).resize(function() {
        setContentHeight()
    })
    //头部显示隐藏
    $(".top-menu li").mouseover(function() {
        $(this).find("div").css({
            "display": "block"
        })
    }).mouseout(function() {
        $(this).find("div").css({
            "display": "none"
        })
    });
    //退出系统登录
    // $("#logout").on("click",function(){
    //     var logoutUrl = GLOBAL_AJAX_URL.logout;
    //     $.get(logoutUrl,function(res){
    //         var resJson = res; //JSON.parse(res);
    //         if(!resJson.status){
    //             dhtmlx.message({
    //                 type: "error",
    //                 text: resJson.message
    //             });
    //             return false;
    //         }

    //         window.location.href = "../../login.html"
    //     })
    // })

    //退出系统登录

    $("#logout").on("click",function(){
        localStorage.removeItem('userInfo');
        window.location.href = "../../login.html"
    })
});
