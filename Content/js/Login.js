var LoginPage = (function () {
    function LoginPage() {
        $("#btnLogin").click(this.OnSubmit);
        $("#loginform").keypress(this.OnKeyPress);
    }
    LoginPage.prototype.OnAuthorize = function (data) {
        if (data.Status == "OK") {
            var url = $("#url").val();
            if (url != undefined && url != "") {
                document.location.replace(url);
            } else {

                if ($(".Rememberme").prop("checked")) {
                    var name = $("#name").val();
                    var pwd = $("#pwd").val();
                    var value = '{"name":' + '"' + name + '",' + '"pwd":' + '"' + pwd + '"}';
                    set(name, value);
                    //var dataObjData=get('information',1000);//过期时间为1秒,正常情况下，你点击的时候已经过期
                    var dataObjData = get(name, 1000 * 60 * 60 * 24 * 7);//过期时间为1分钟 将记住密码的周期设为7天。
                    //var dataObjData=get('information',1000*60*60);//过期时间为1小时
                    //var Obj=get('information',1000*60*60*24);//过期时间为24小时
                    //var dataObjData=get('information',1000*60*60*24*7);//过期时间为1周
                    if (dataObjData != "" && dataObjData != null) {
                    } else {
                        localStorage.removeItem(name)
                        alert("获取的信息已经过期");
                    }
                } 
                
                document.location.replace ("/Maxim/Welcome");
            }
        } else {
            $("#loginError").text(data.str);
            //alert(data.str);
            $(".progress").removeClass("active");
        }
    };
    LoginPage.prototype.OnSubmit = function () {
        var strUserName = $("#name").val();
        var strPwdEncrypted = $("#pwd").val();
        var lg = $("#language").val();
        var data = {
            name: strUserName,
            pwd: strPwdEncrypted,
            language: lg
        };
        var urlPost = $("#loginform").attr("action");
        $.post(urlPost, data, loginPage.OnAuthorize);
        $(".progress").addClass("active");
    };
    LoginPage.prototype.OnKeyPress = function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            loginPage.OnSubmit();
        }
    };
    return LoginPage;
})();
var loginPage = new LoginPage();
