$(function () {
    //$("#VendorID").change(function () {
    //    $("#nowpage").val(1);
    //    $("#pc").val(1);
    //    GetOrder();
    //});
    //按条件根据下单客户查询对应的开票客户
    $("#CxKpByXd").click(
        GetOrder
        );
    $("#AddBill").click(
        //用户点击add 将数据临时存到session中
       AddLsBill
        );
    $("#SaveBillZH").click(
        //用户点击保存时
//检查是否有选择抬头信息
       SaveBill
        );
    $("#GoChange").click(
        //转到修改组合页面
        GoChange
    );

    //$("#step").click(function () {
    //    GoChange
    //});
    $('#PageIndex').click(function () {
        document.getElementById("pc").value = 1;
        document.getElementById("nowpage").value = 1;
        GetOrder();
    });
    $('#Pageup').click(function () {
        var nowpage = document.getElementById("nowpage").value;
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) > 1) {
            newpage = parseInt(nowpage) - 1;
            document.getElementById("pc").value = newpage;
            document.getElementById("nowpage").value = newpage;
            GetOrder();
        }
    });
    $('#Pagewown').click(function () {
        var nowpage = document.getElementById("nowpage").value;
        var maxpage = parseInt(document.getElementById("PageTotalCount").value);
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) < maxpage) newpage = parseInt(nowpage) + 1;
        document.getElementById("pc").value = newpage;
        document.getElementById("nowpage").value = newpage;
        GetOrder();
    });
    $('#PageLast').click(function () {
        var maxpage = parseInt(document.getElementById("PageTotalCount").value);
        document.getElementById("pc").value = maxpage;
        document.getElementById("nowpage").value = maxpage;
        GetOrder();
    });
    $('#PageGO').click(function () {
        var nowpage = parseInt(document.getElementById("nowpage").value);
        var maxpage = parseInt(document.getElementById("PageTotalCount").value) + 1;
        if (nowpage > 0 && nowpage < maxpage) {
            document.getElementById("pc").value = document.getElementById("nowpage").value;
            GetOrder();
        }
        else {

            $("#labtxt").html("wrong page no.");
            showDiv();
            document.getElementById("nowpage").value = 1;
        }
    });
    $("#nowpage").keyup(function () {
        var t = $("#nowpage").val();
        if (isNaN(t)) {
            $("#labtxt").html("wrong page no.");
            showDiv();
            document.getElementById("nowpage").value = 1;
        }
    });
});
function GetOrder() {
    //  $("#NR").css("display", "block");
    $("#NR").slideDown("normal");
    CustomerId = $("#VendorID").val();
    BillNum = $("#CXBillNum").val();
    BillName = $("#CXBillName").val();
    var page = document.getElementById("nowpage").value;
    var obj_res = "";
    $.ajax({
        url: "/ERP/GetPIVendorInf",
        data: { "CustomerId": CustomerId, "BillNum": BillNum, "BillName": BillName ,"page":page},
        dataType: "json",
        type: "post",
        success: function (res) {
            //1222 去除转义字符
            //obj_res = res.replace(/[\'\"\\\b\f\n\r\t]/g, '');
            debugger;
            // var obj = jQuery.parseJSON(obj_res);
            var obj = jQuery.parseJSON(res);
            var html = "";
            //$.each(obj.dtWaitOperateData, function (i, item) {
            //    html += "<tr>";
            //    html += "<th class='center'>" + item.CustomerNO + "</th>";
            //    html += "<th class='center' style='display:none'>" + CustomerId + "</th>";
            //    html += "<th class='center'>" + "<input name='billtoIdCheck' type= 'checkbox'  value='" + item.BilltoId + "'/>" + "</th>";
            //    html += "<th class='center'>" + item.BilltoNO + "</th>";
            //    html += "<th class='center'>" + item.Name + "</th>";
            //    html += "<th class='center'>" + item.ContactAddress + "</th>";
            //    html += "<th class='center'>" + item.ContactTelephone + "</th>";
            //    html += "</tr>";
            //})
            $.each(obj, function (i, item) {
                html += "<tr>";
                html += "<th class='center'>" + item.CustomerNO + "</th>";
                html += "<th class='center' style='display:none'>" + CustomerId + "</th>";
                html += "<th class='center'>" + "<input name='billtoIdCheck' type= 'checkbox'  value='" + item.BilltoId + "'/>" + "</th>";
                html += "<th class='center'>" + item.BilltoNO + "</th>";
                html += "<th class='center'>" + item.Name + "</th>";
                html += "<th class='center'>" + item.ContactAddress + "</th>";
                html += "<th class='center'>" + item.ContactTelephone + "</th>";
                html += "</tr>";
            })
            if (html == "") {
                $(".BilltoInfo").html("");
            }
            else {
                $(".BilltoInfo").html(html);
                $("#TotalPageCount").html(obj[0].PageCount);
                $("#PageTotalCount").val(obj[0].PageCount);
            }
            GETeqId();
        }
    })
}



function GETeqId() {
    debugger;
    $.ajax({
        url: "/ERP/GetEq",
        type: "post",
        success: function (res) {
            debugger;
            $("#CXDH").html(res);
        }
    })
}
//用户点击add 将数据临时存到session中
function AddLsBill() {
    debugger;
    var obj = document.getElementsByName('billtoIdCheck'); //选择所有name为billtoIdCheck的对象 返回数组
    var sd = $("input[name='billtoIdCheck']:checked").length;
    if (sd == 0) {
        alert("您还没有选中任何值哦...");
        return;
    }
    //循环
    var s = "";
    var c = "";
    var cNo = "";
    //obj[i].parentNode.previousSibling.firstChild.value;
    debugger;
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].checked) { s += obj[i].value + ','; c += obj[i].parentNode.previousSibling.innerText + ','; cNo += obj[i].parentNode.previousSibling.previousSibling.innerText + ','; }//如果选中 将value的值添加到变量s中去
    }
    debugger;
    $.ajax({
        url: "/ERP/AddKP",
        data: { "billtoIdCheckValue": s, "BrandId": c, "Costomer": cNo },
        datype: 'json',
        type: "post",
        success: function (res) {
            debugger;
            if (typeof (res) == 'string') {
                alert(res);
                return;
            }
            var html = "";
            var selObj = $("#selectTT");
            var selObjremove = $("#selectTT option").not(":first");
            var selObjxd = $("#selectTT_Xd");
            var selObjremovexd = $("#selectTT_Xd option").not(":first");
            debugger;
            $.each(res, function (i, item) {
                debugger;
                html += "<tr>";
                //html += "<input hidden='hidden' value='" + item.BilltoId + "'/>"
                html += "<th class='center'>" + item.BilltoNO + "</th>";
                html += "<th class='center'>" + item.Name + "</th>";
                html += "<th class='center'>" + item.ContactAddress + "</th>";
                html += "<th class='center'>" + item.ContactTelephone + "</th>";
                //html += "<th class='center'>" + "<a onclick='da(" + item.BilltoId + ")'>remove</a>" + "</th> "
                html += "<th class='center'>" + "<button type='button' class='btn' name='removeLsBill' value='" + item.BilltoId + "^" + item.CustomerId + "' onclick='removeLsBill(this)'>Remove</button>" + "</th>";
                html += "</tr>";

                //设置开票抬头
                var value = item.BilltoId;
                var text = item.BilltoNO;
                selObjremove.remove();
                selObj.append("<option value='" + value + "'>" + text + "</option>");
                //设置下单抬头
                var valuexd = item.CustomerId;
                debugger;
                var textxd = item.CustomerNO;
                selObjremovexd.remove();
                selObjxd.append("<option value='" + valuexd + "'>" + textxd + "</option>");
            })
            if (html == "") {
                $(".PIVnd_BilltoInfo").html("");
            }
            else {
                $(".PIVnd_BilltoInfo").html(html);
                //$("#TotalPageCount").html(obj.dtWaitOperateData[0].PageCount);
            }
        }
    })

}
//用户移除临时信息
function removeLsBill(obj) {

    debugger;
    //移除临时BiLL组合
    var Bi = obj.value.split('^')[0];
    var Ai = obj.value.split('^')[1];
    debugger;
    _data = { "BillId": Bi, "accountId": Ai }
    $.ajax({
        url: "/ERP/RemoveLsBillZH",
        data: _data,
        dataType: "json",
        type: "post",
        success: function (res) {
            var html = "";
            var selObj = $("#selectTT");
            var selObjremove = $("#selectTT option").not(":first");
            selObjremove.remove();
            var selObjxd = $("#selectTT_Xd");
            var selObjremovexd = $("#selectTT_Xd option").not(":first");
            selObjremovexd.remove();
            debugger;
            $.each(res, function (i, item) {
                html += "<tr>";
                //html += "<input hidden='hidden' value='" + item.BilltoId + "'/>"
                html += "<th class='center'>" + item.BilltoNO + "</th>";
                html += "<th class='center'>" + item.Name + "</th>";
                html += "<th class='center'>" + item.ContactAddress + "</th>";
                html += "<th class='center'>" + item.ContactTelephone + "</th>";
                //html += "<th class='center'>" + "<a onclick='da(" + item.BilltoId + ")'>remove</a>" + "</th> "
                html += "<th class='center'>" + "<button type='button' class='btn' name='removeLsBill' value='" + item.BilltoId + "^" + item.CustomerId + "' onclick='removeLsBill(this)'>Remove</button>" + "</th>";
                html += "</tr>";

                //设置抬头
                var value = item.BilltoId;
                var text = item.BilltoNO;
                debugger;
                selObj.append("<option value='" + value + "'>" + text + "</option>");
                //设置下单抬头
                var valuexd = item.CustomerId;
                var textxd = item.CustomerNO;

                selObjxd.append("<option value='" + valuexd + "'>" + textxd + "</option>");
            })
            if (html == "") {
                $(".PIVnd_BilltoInfo").html("");
            }
            else {
                $(".PIVnd_BilltoInfo").html(html);
                //$("#TotalPageCount").html(obj.dtWaitOperateData[0].PageCount);
            }
        }

    })
}


//用户点击保存时 检查是否有选择抬头信息
function SaveBill() {
    var TdBillId = $("#selectTT").val();
    var TdBillIdxd = $("#selectTT_Xd").val();
    debugger;
    if (TdBillId == "" || TdBillIdxd == "") {
        alert("请选择必须的抬头信息。。。");
    } else {
        $.ajax({
            url: "/ERP/SaveBillZh",
            data: { "TdBillId": TdBillId, "TdBillIdxd": TdBillIdxd },
            dataType: 'json',
            type: "post",
            success: function (res) {
                if (res == "8") {
                    alert("成功！");

                    $.ajax({
                        url: "/ERP/PIVendorInf",
                        type: "post",
                        success: function (res) {
                            $("#step").attr("class", "gray-em");
                            $("#step1").removeAttr("style");

                            $("#step1").attr("class", "red-em");
                            $("#portlet").css("display", "none");
                            $("#ProductTplEditView").html(res);
                            $("#ProductTplEditView").slideDown();
                        }
                    });

                } else {
                    alert(res);
                }
            }
        })
    }
}

//跳转页面
function GoChange() {
    $.ajax({
        type: "get",
        url: "/ERP/GoChange",
        contentType: "application/html; charset=utf-8",
        dataType: "html",
        success: function (res) {
            //$("#step").attr("class", "gray-em");
            //$("#step1").removeAttr("style");

            //$("#step1").attr("class", "red-em");
            //$("#portlet").css("display", "none");
            ////$("#Query").css("display", "none");
            ////$("#Query-Results").css("display", "none");


            ////$("#ProductTplEditView").css("display", "block");
            //$("#ProductTplEditView").html(res);
            //$("#ProductTplEditView").slideDown();
            $("#yemian").html(res);


        }
    }).error(function (xhr, status) {
        $("#labtxt").html(status)
        showDiv();
    })
}

