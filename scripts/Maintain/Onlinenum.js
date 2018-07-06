function ChagePage(PageIndex) {
    if (PageIndex == 0) {
        PageIndex = 1;
    }
    var OriNowPage = document.getElementById("OriNowPage").innerHTML; //原来的页数
    var username = document.getElementById("inputusername").value;
    var urlPost = "/Maintain/Onlinenum?pageIndex=" + PageIndex;
    if (username != "") {
        urlPost += "&oos_username=" + username;
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

function Go() {
    var index = document.getElementById("nowpage").value;
    ChagePage(index);
}

function deleteLogin(obj) {
    var UserID = obj.attributes["UserID"].value;
    $.ajax({
        url: '/Maintain/RemoveOnlinenum',
        data: { "UserID": UserID },
        type: 'post',
        dataType: "json",
        success: function (data) {
            if (data == 1) {
                alert("下线成功！");
                ChagePage(1);
            } else if (data == -1) {
                alert("请检查是否点击的是自己...");
            }
        }
    })
}