$(function () {
    $("#loginBtn").on("click",function(){
        var username = $("#username").val();
        var password=$("#password").val();
        $(this).css('disabled',true);
        // if(username && password){
        //     $.ajax({
        //     url : GLOBAL_AJAX_URL.userLogin,
        //     type : "POST",
        //     data : {
        //         username : username,
        //         password : password
        //     },
        //     success : function(res) {
                
        //         if (res.status) {
        //             var uUserDTOid = res.data.user.uUserDTO.id;
        //             var loginName = res.data.user.loginName;
        //             var loginId = res.data.user.id;
        //             // setcookies
        //             setCookie("userInfo",loginName+"/"+loginId+"/"+uUserDTOid);
        //             // window.location.href=webroot + "index.html"
        //             window.location.href=webroot+"index.html"
        //         }
        //         else {
        //             dhtmlx.message({
        //                 type: "alert-error",
        //                 text: res.message
        //             });
        //             return false
        //         }
        //     }
        // });



        // }else {
        //     alert("请输入账号和密码")
        // }

        // localstorage
        
        if(username && password){
            var localstorageJson = {
                username : username,
                password : password
            }
            var localstorageStr =  JSON.stringify( localstorageJson );
            localStorage.setItem("userInfo",localstorageStr)
            window.location.href="views/home/home.html"
            
        }else {
            alert("请输入账号和密码")
        }
    })
})