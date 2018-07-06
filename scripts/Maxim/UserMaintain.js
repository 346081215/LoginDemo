

function Serach() {
    ChagePage(1);
}

function showValue() {
    var _pageIndex = document.getElementById("nowpage").value;
    var pageCount = document.getElementById("TotalPageCount").innerHTML;
    var OriNowPage = document.getElementById("OriNowPage").innerHTML;
    if (parseInt(pageCount) == 0) {
        document.getElementById("nowpage").value = 0;
        return;
    }
    if (parseInt(_pageIndex) > parseInt(pageCount)) {
        document.getElementById("nowpage").value = pageCount;
    }
    if (parseInt(_pageIndex) == 0 && parseInt(pageCount) != 0) {
        document.getElementById("nowpage").value = 1;
        return;
    }
    if (!checkRate(_pageIndex)) {
        document.getElementById("nowpage").value = 1;
    }
}
function checkRate(input) {
    var re = /^[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/   
    if (!re.test(input)) {
        return false;
    } else { return true; }
}

function ChagePage(PageIndex) {
    if (PageIndex == 0) {
        PageIndex = 1;
    }
    debugger;
    var OriNowPage = document.getElementById("OriNowPage").innerHTML; //原来的页数
    var username = document.getElementById("inputusername").value;
    var IsHaveSubCustom = $("#IsHaveSubCustomer").val();
    var urlPost = "/Maxim/UserMaintain?pageIndex=" + PageIndex;
    if (username != "") {
        urlPost += "&oos_username=" + username;
        // urlPost += "&ParentCustomerId=" + IsHaveSubCustom;

    }
    urlPost += "&IsHaveSubCustomer=" + IsHaveSubCustom;
    var loc = window.location.toLocaleString();
    var s = loc.indexOf("Welcome");
    debugger;
    if (s > 0) {
        $.ajax({
            url: urlPost,
            cache: false
        }).success(function (html) {
            setTimeout(function () {
                $("#content").html(html)
                hideloading();
                var width = $("#form_wizard_1").width();
                ($(".foot").width(width + "px"));
            }, 500);
        }).fail(function (data) {
            window.location.href = '/Home/Login';
        });
    } else {
        window.location = urlPost;
    }
}

function Go() {
    var index = document.getElementById("nowpage").value;
    ChagePage(index);
}

function ChangePwd(obj) {
    $("#LoginDIV").css("display", "none");
    console.log(obj);
    var OOS_username = obj.attributes["hidOOS_username"].value;
    var CustomerId = obj.attributes["hidCustomerId"].value;
    var BrandId = obj.attributes["hidBrandId"].value;
    var RoleGroupId = obj.attributes["hidRoleGroupId"].value;
    debugger;
    var InternalEMailAddress = obj.attributes["hidEmail"].value;

    document.getElementById("UpdatePassword").removeAttribute("style");
    document.getElementById("user").value = OOS_username;
    $("#newCustomerId").val(CustomerId);
    $("#newBrandId").val(BrandId);
    $("#newRoleGroupId").val(RoleGroupId);
    $("#InternalEMailAddress").val(InternalEMailAddress);
    document.getElementById("passw").value = "";
    document.getElementById("newUserPanel").setAttribute("style", "display:none;");
}

//function isEmail(str) {
//    //var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
//    var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
//    return reg.test(str);
//}


function submitPassword() {
    debugger;
    var userid = document.getElementById("user").value;
    var password = document.getElementById("passw").value;
    var CustomerId = $("#newCustomerId option:selected").val();
    var BrandId = $("#newBrandId option:selected").val();
    var RoleGroupId = $("#newRoleGroupId option:selected").val();
    var InternalEMailAddress = $("#InternalEMailAddress").val();
    //var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

    //if (!reg.test(InternalEMailAddress))
    //{
    //        $("#labtxt").html("The format of the Email address you input is not correct");
    //        showDiv();
    //        return;
    // }
    if ($("#newRoleGroupId").val() == "") {
        $("#labtxt").html("Please select a RoleGroupName!");
        showDiv();
        return;
    }
    if (BrandId == "") {
        $("#labtxt").html("Please select a Brand!");
        showDiv();
        return;
    }
    var RoleGroupName = $("#newRoleGroupId option:selected").text();
    if (RoleGroupName == "Vendor Group") {
        if (CustomerId == "") {
            $("#labtxt").html("Please select a Customer!");
            showDiv();
            return;
        }
    }

    // alert(userid + "     \r\n  " + password);
    var posturl = "/Maxim/UpdateUserInfo";
    $.post(posturl, {
        oos_userName: userid, password: password, CustomerId: CustomerId, BrandId: BrandId, RoleGroupId: RoleGroupId, InternalEMailAddress: InternalEMailAddress
    }, function (result) {
        debugger;
        if (result == "Success") {
            Go();
        } else {
            alert(result);
        }

    })
}

function breakPassword() {
    document.getElementById("user").value = "";
    document.getElementById("passw").value = "";
    document.getElementById("UpdatePassword").setAttribute("style", "display:none;");
}
function breakTbl_UserLog() {
    $("#LoginDIV").css("display", "none");
}

function CreatenewUser() {
    $("#newUserName").val() == "";
    $("#newUserName").focus();
    $("#newPwd").val() == "";
    $("#LoginDIV").css("display", "none");
    document.getElementById("newUserPanel").removeAttribute("style");

    document.getElementById("UpdatePassword").setAttribute("style", "display:none;");

}

function newUserBreak() {
    document.getElementById("newUserPanel").setAttribute("style", "display:none;");
}

//新增用户
function CreateNewUserSubmit() {
    var islNeedSubmit = true;
    var userName = document.getElementById("newUserName").value;
    if (userName == "") {
        document.getElementById("newUserNameMsg").innerHTML = "请填写用户名!";
        document.getElementById("newUserNameMsg").removeAttribute("style");
        islNeedSubmit = false;
    }
    var passWord = document.getElementById("newPwd").value;
    if (passWord == "") {
        var msg = document.getElementById("newPwdMsg");
        msg.innerHTML = "请输入密码!";
        msg.removeAttribute("style");
        islNeedSubmit = false;
    }
    var fullName = document.getElementById("newFullName").value;
    if (fullName == "") {
        var msg = document.getElementById("newFullNameMsg");
        msg.innerHTML = "请输入全名!";
        msg.removeAttribute("style");
        islNeedSubmit = false;
    }
    //var Customerid = document.getElementById("newCustomerId").value;
    //var brandid = document.getElementById("newBrandId").value;

    if (islNeedSubmit == true) {
        var posturl = "/Maxim/CheckUserName";
        $.post(posturl, { oos_username: userName }, function (result) {
            if (result == true) {
                //可以添加用户
                var msg = document.getElementById("newUserNameMsg");
                msg.setAttribute("style", "display:none;");
            } else {
                //用户已经存在
                var msg = document.getElementById("newUserNameMsg");
                msg.innerHTML = "此用户名太受欢迎,请更换一个!";
                msg.removeAttribute("style");
                islNeedSubmit = false;
            }
        });
    }

    if (islNeedSubmit == true) {
        var posturl = "/Maxim/CreateNewUser";
        // var paraData = { oos_userName: userName, pwd: passWord, fullname: fullName, customerid: Customerid, brandid: brandid };
        $.post(posturl, { oos_userName: userName, pwd: passWord, fullname: fullName }, function (result) {

            if (result == "Success") {
                Go();
            } else {
                alert(result);
            }

        });


    }
    // alert("UserName:" + userName + "  ,passWord:" + passWord + "  ,fullName:" + fullName + "  ,Customerid:" + Customerid + "  ,brandid:" + brandid);    
}

function userNameblur() {
    var usernmae1 = document.getElementById("newUserName").value;
    var posturl = "/Maxim/CheckUserName";
    $.post(posturl, { oos_username: usernmae1 }, function (result) {
        if (result == true) {
            //可以添加用户
            var msg = document.getElementById("newUserNameMsg");
            msg.setAttribute("style", "display:none;");
            $("#newPwd").removeAttr("disabled");
            $("#newFullName").removeAttr("disabled");
            $("#newUserSubmit").removeAttr("disabled");
        } else {
            //用户已经存在
            var msg = document.getElementById("newUserNameMsg");
            msg.innerHTML = "此用户名太受欢迎,请更换一个!";
            msg.removeAttribute("style");

            $("#newPwd").attr("disabled", "disabled");
            $("#newFullName").attr("disabled", "disabled");
            $("#newUserSubmit").attr("disabled", "disabled");

            //alert(1);
        }
    });
}
function PassWordblur() {
    var pwd = document.getElementById("newPwd").value;
    if (pwd == "") {
        //    var msg = document.getElementById("newPwdMsg");
        //  msg.innerHTML = "请输入密码!";
        //  msg.removeAttribute("style");
    } else {
        var msg = document.getElementById("newPwdMsg");
        msg.setAttribute("style", "display:none;");
    }
}

function CheckUser(username) {
    var posturl = "/Maxim/CheckUserName";
    $.post(posturl, { oos_username: username }, function (result) {
        return result;
    });
}

//查看角色信息
//function ViewRole(SystemUserid) {
//    // alert(SystemUserid);
//    var url = "/Maxim/GetRoleInfo";
//    $.get(url, { SystemUserid: SystemUserid }, function (data) {
//        var UserInfo = JSON.parse(data);
//        var htmlStr = "";
//        for (var i = 0; i < UserInfo.length; i++) {
//            var RoleGroupName = UserInfo[i].RoleGroupName;  //RoleGroupName
//            var RoleName = UserInfo[i].RoleName;
//            var RoleId = UserInfo[i].RoleId;
//            var RoleGroupId = UserInfo[i].RoleGroupId;
//            var IsRole = UserInfo[i].IsRole;
//            htmlStr += RoleGroupName + "," + RoleName + "," + RoleId + "," + RoleGroupId + "," + IsRole + "\r\n";

//            htmlStr = "<table>\r\n";
//            htmlStr += "<tr>";
//            htmlStr += "<td>" + "<input type='CheckBox' id='checkRole' name='checkRole'></input>" + "<td>";
//            htmlStr += "<td></td>";
//            htmlStr += "<td>";
//            htmlStr += "</tr>";
//            htmlStr += "<table>";

//        }
//        alert(htmlStr);
//    })
//}




var SystemUserId
function SelectLoginUsers(obj) {
    SystemUserId = obj.attributes["SystemUserId"].value;
    ChagePage_Login(1);

}


function ChagePage_Login(pageIndex_Login) {

    if (pageIndex_Login == 0) {
        pageIndex_Login = 1;
    }
    var OriNowPage = document.getElementById("OriNowPage_Login").innerHTML; //原来的页数

    //var SystemUserId = "37ECBC34-D726-44E1-8EDE-FCB84D8F7FBB";
    //SystemUserId = document.getElementById("#hiddenSystemUserId").value;

    var urlPost = "/Maxim/UserMaintain?pageIndex_Login=" + pageIndex_Login;
    if (SystemUserId != "") {
        urlPost += "&SystemUserId=" + SystemUserId;
    }
    var loc = window.location.toLocaleString();
    var s = loc.indexOf("Welcome");
    if (s > 0) {
        $.ajax({
            url: urlPost,
            cache: false
        }).success(function (html) {
            setTimeout(function () {
                $("#content").html(html)
                hideloading();
                var width = $("#form_wizard_1").width();
                ($(".foot").width(width + "px"));
            }, 500);
        }).fail(function (data) {
            window.location.href = '/Home/Login';
        });
    } else {
        window.location = urlPost;
    }
}

function Serach() {
    //$("#OrderDetail tbody").html("");
    ChagePage(1);
}

function Go_Login() {
    var index = document.getElementById("nowpage_Login").value;
    ChagePage_Login(index);
}




