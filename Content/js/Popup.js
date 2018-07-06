function showDiv(text) {
    if (text && typeof(text) === 'string') {
        $("#labtxt").html(text);
    }

    document.getElementById('popDiv').style.display = 'block';
    document.getElementById('bg').style.display = 'block';
    document.getElementById('ok').style.display = 'none';
    document.getElementById('no').style.display = 'none';
    document.getElementById('CancelRequstBy').style.display = 'none';
    $("#txtCloselbtn").css("display", "inline");
}
function closeDiv() {
    $("#labtxt").html('');
    document.getElementById('popDiv').style.display = 'none';
    document.getElementById('bg').style.display = 'none';
    document.getElementById('ok').style.display = 'none';
    document.getElementById('no').style.display = 'none';
}


//作用于用户超时，用户登录错误信息
function showDiv1() {
    document.getElementById('popDiv').style.display = 'block';
    document.getElementById('bg').style.display = 'block';
    document.getElementById('ok').style.display = 'none';
    document.getElementById('no').style.display = 'none';
    document.getElementById('CancelRequstBy').style.display = 'none';
    $("#txtCloselbtn").css("display", "none");
}
//作用于提示框显示YES，NO
function showDiv2() {
    document.getElementById('popDiv').style.display = 'block';
    document.getElementById('bg').style.display = 'block';
    document.getElementById('CancelRequstBy').style.display = 'none';
    $("#ok").css("display", "inline");
    $("#no").css("display", "inline");
    $("#txtCloselbtn").css("display", "none");
    $("#ok").unbind();
    $("#no").unbind();
}
