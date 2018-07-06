$(function () {
    SelectAll();
    SerachPrintShop();
});
//查询所有
function SelectAll() {
    var data_ = { pc: $("#pc").val() }
    $.post("/Maintain/SelectPrintShop", data_, function (data) {
        var html = "";
        if (data.Funstatus == "0") {
            alert("查询失败");
        }
        else {
            $.each(data.PrintShopData, function (i, item) {
                html += "<tr>";
                html += "<td>" + item.OOS_name + "</td>";
                html += "<td>" + item.OOS_SalesEmailAddress + "</td>";
                html += "<td>" + item.PrintShop + "</td>";
                html += "<td>" + item.SalesMailType + "</td>";
                html += " <td class=center><button type=button id=EditPrintShop name=EditPrintShop class='btn btn-default' onclick='funEditPrintShop(this)' value='" + item.OOS_salesemailId + "'>Edit</button><button type=button id=DeletePrintShop name=DeletePrintShop class='btn btn-default' onclick='funcDeletePrintShop(this)' value='" + item.OOS_salesemailId + "'>Delete</button>"
                html += "</tr>";
                $("#TotalPageCount").html(item.totalPgCount);
                $("#PageTotalCount").val(item.totalPgCount);
            });
            $("#PrintShopDetail").html(html);
        }
    })
}
//PrintShop改变事件
$("#PrintShop").change(function () {
    if ($("#PrintShop").text() == "--Please Select--" && $("#SalesMailType").text() == "--Please Select--") {
        $("#PrintShop").val("");
        $("#SalesMailType").val("");
        $("#BrandId").val("");
        PandSchange();
    }
    else {
        PandSchange();
    }
});
//SalesMailType下拉改变事件
$("#SalesMailType").change(function () {
    if ($("#PrintShop").text() == "--Please Select--" && $("#SalesMailType").text() == "--Please Select--") {
        $("#PrintShop").val("");
        $("#SalesMailType").val("");
        $("#BrandId").val("");
        PandSchange();
    }
    else {
        PandSchange();
    }
});
//Brand下拉改变事件
$("#BrandId").change(function () {
    if ($("#PrintShop").text() == "--Please Select--" && $("#SalesMailType").text() == "--Please Select--") {
        $("#PrintShop").val("");
        $("#SalesMailType").val("");
        $("#BrandId").val("");
        PandSchange();
    }
    else {
        PandSchange();
    }
});
function PandSchange() {
    var data_ = {
        pc: $("#pc").val(),
        PrintShopId: $("#PrintShop").val(),
        SalesMailType: $("#SalesMailType").val(),
        OOS_name: $("#inputOOS_name").val(),
        BrandId: $("#BrandId").val(),
        OOS_SalesEmailAddress: $("#inputOOS_SalesEmailAddress").val()
    }
    $.post("/Maintain/Sel_PrintShop", data_, function (data) {
        if (data.Funstatus == "0") {
            alert("查询失败");
        }
        else {
            var html = "";
            $.each(data.PrintShopData, function (i, item) {
                html += "<tr>";
                html += "<td>" + item.OOS_name + "</td>";
                html += "<td>" + item.OOS_SalesEmailAddress + "</td>";
                html += "<td>" + item.PrintShop + "</td>";
                html += "<td>" + item.SalesMailType + "</td>";
                html += " <td class=center><button type=button id=EditPrintShop name=EditPrintShop class='btn btn-default' onclick='funEditPrintShop(this)' value='" + item.OOS_salesemailId + "'>Edit</button><button type=button id=DeletePrintShop name=DeletePrintShop class='btn btn-default' onclick='funcDeletePrintShop(this)' value='" + item.OOS_salesemailId + "'>Delete</button>"
                html += "</tr>";
                $("#TotalPageCount").html(item.totalPgCount);
                $("#PageTotalCount").val(item.totalPgCount);
            });
            $("#PrintShopDetail").html(html);
        }
    })
}
//条件查询
function SerachPrintShop() {
    if ($("#PrintShop").val() == "--Please Select--" && $("#SalesMailType").val() == "--Please Select--") {
        $("#PrintShop").val("");
        $("#SalesMailType").val("");
        PandSchange();
    }
    else {
        PandSchange();
    }
}

//新增界面的跳转按钮
function CreatenewPrintShop() {
    $("#all").css("display", "none");
    $("#insertPrintShop").slideDown();
    $("#updatePrintShop").css("display", "none");
    $("#OOS_name").val("");
    $("#OOS_SalesEmailAddress").val("");
    $("#PrintShop_sel").val("");
    $("#SalesMailType_sel").val("");
}
function ReturnIndex() {
    $("#all").slideDown();
    $("#insertPrintShop").css("display", "none");
    $("#updatePrintShop").css("display", "none");
    $("#OOS_name").val(""),
    $("#OOS_SalesEmailAddress").val("");
}
//新增界面的保存操作
function funSavePrintShop() {
    if ($("#PrintShop_sel").val() == "" || $("#SalesMailType_sel").val() == "") {
        alert("请选择PrintShop和SalesMailType栏位");
        return false;
    }
    else {
        //var email = $("#OOS_SalesEmailAddress").val().trim();
        if ($("#OOS_name").val() == "" || $("#OOS_SalesEmailAddress").val() == "") {
            alert("OOS_name和OOS_SalesEmailAddress栏位不能为空");
            return false;
        }
        //if (email.length > 0) {
        //    reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        //    if (!reg.test(email)) {
        //        alert("请输入正确的邮箱");
        //        return false;
        //    }
        //}
        var data_ = {
            pc: $("#pc").val(),
            PrintShop: $("#PrintShop_sel").val(),
            SalesMailType: $("#SalesMailType_sel").val(),
            OOS_name: $("#OOS_name").val(),
            BrandId: $("#BrandId_sel").val(),
            OOS_SalesEmailAddress: $("#OOS_SalesEmailAddress").val()
        }
        $.post("/Maintain/Insert_PrintShop", data_, function (data) {

            if (data.Funstatus == "0") {
                alert(data.msg);
            }
            else {
                alert("添加成功！");
                $("#all").slideDown();
                $("#insertPrintShop").css("display", "none");
                $("#usdataPrintShop").css("display", "none");
                $("#OOS_name").val("");
                $("#OOS_SalesEmailAddress").val("");
                $("#PrintShop_sel").val("");
                $("#SalesMailType_sel").val("");
            }
            SelectAll();
            SerachPrintShop();
        });
    }
}
//更新传值
function funEditPrintShop(id) {
    $("#all").css("display", "none");
    $("#insertPrintShop").css("display", "none");
    $("#updatePrintShop").slideDown();
    $("#EditDetailID_U").val(id.value);
    var data_ = {
        OOS_salesemailId: $("#EditDetailID_U").val()
    }
    $.post("/Maintain/UpdatePrintShop_sel", data_, function (data) {
        if (data.Funstatus == "0") {
            alert(data.ErrorCode);
        }
        else {
            var item = data.PrintShopData;
            $("#OOS_name_u").val(item.OOS_name),
            $("#OOS_SalesEmailAddress_u").val(item.OOS_SalesEmailAddress),
            $("#PrintShop_u").val(item.PrintShopId)
            $("#SalesMailType_u").val(item.OOS_mailtype)
            $("#BrandId_u").val(item.BrandId);
        }
    })
}
//更新界面的保存按钮
function funUpdatePrintShop() {
    if ($("#BrandId_u").val() == "" || $("#PrintShop_u").val() == "" || $("#SalesMailType_u").val() == "" || $("#OOS_name_u").val() == "" || $("#OOS_SalesEmailAddress_u").val() == "") {
        alert("PrintShop、SalesMailType、OOS_name和OOS_SalesEmailAddress栏位不能为空！");
        return false;
    }
    //var email = $("#OOS_SalesEmailAddress_u").val().trim();
    //if (email.length > 0) {
    //    reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    //    if (!reg.test(email)) {
    //        alert("请输入正确的邮箱");
    //        return false;
    //    }
    //}
    var OOS_name = $("#OOS_name_u").val();
    var OOS_SalesEmailAddress = $("#OOS_SalesEmailAddress_u").val();
    var PrintShop = $("#PrintShop_u").val();
    var OOS_mailtype = $("#SalesMailType_u").val();
    var BrandId = $("#BrandId_u").val()
    var OOS_salesemailId = $("#EditDetailID_U").val();
    var data_ = {
        OOS_name: OOS_name,
        OOS_SalesEmailAddress: OOS_SalesEmailAddress,
        PrintShop: PrintShop,
        OOS_mailtype: OOS_mailtype,
        BrandId: BrandId,
        OOS_salesemailId: OOS_salesemailId
    };

    $.post("/maintain/updatePrintShop_up", data_, function (data) {
        if (data.Funstatus == "0") {
            alert(data.msg);
        }
        else {
            alert("更新成功");
            $("#all").slideDown();
            $("#insertPrintShop").css("display", "none");
            $("#updatePrintShop").css("display", "none");
            $("#OOS_name").val(""),
            $("#OOS_SalesEmailAddress").val("");
        }

        SelectAll();
        SerachPrintShop();
    })

}
//删除操作
function funcDeletePrintShop(obj) {
    var data_ = {
        OOS_salesemailId: obj.value
    }
    if (confirm("确认要删除吗？") == true) {
        $.post("/Maintain/DeletePrintShop", data_, function (data) {
            if (data.Funstatus == "1") {
                alert("删除成功！");
                SelectAll();
                SerachPrintShop();
            }
            else {
                alert(data.ErrorCode);
            }
        })
    }
}


//分页
$('#PageIndex').click(function () {
    //给文本框赋值都为1
    document.getElementById("pc").value = 1;
    document.getElementById("nowpage").value = 1;
    //加载模糊查询的方法
    SerachPrintShop();
});
//向上一个页翻
$('#Pageup').click(function () {
    //首先获取当前输入文本框的值
    var nowpage = document.getElementById("nowpage").value;
    //parseInt() 函数可解析一个字符串，并返回一个整数。（也就是输入的内容必须是数字）
    var newpage = parseInt(nowpage);
    if (parseInt(nowpage) > 1) {
        newpage = parseInt(nowpage) - 1;
        document.getElementById("pc").value = newpage;
        document.getElementById("nowpage").value = newpage;
        SerachPrintShop();
    }
});
//向下一个页翻
$('#Pagewown').click(function () {
    var nowpage = document.getElementById("nowpage").value;
    var maxpage = parseInt(document.getElementById("PageTotalCount").value);
    var newpage = parseInt(nowpage);
    //判断，如果输入的文本框的值小于最大的页数 2 3 2<3 3=2+1
    if (parseInt(nowpage) < maxpage) { newpage = parseInt(nowpage) + 1 };
    document.getElementById("pc").value = newpage;
    document.getElementById("nowpage").value = newpage;
    SerachPrintShop();
});
//翻到最后
$('#PageLast').click(function () {
    var maxpage = parseInt(document.getElementById("PageTotalCount").value);
    document.getElementById("pc").value = maxpage;
    document.getElementById("nowpage").value = maxpage;
    SerachPrintShop();
});
$('#PageGO').click(function () {
    var nowpage = parseInt(document.getElementById("nowpage").value);
    var maxpage = parseInt(document.getElementById("PageTotalCount").value) + 1;
    if (nowpage > 0 && nowpage < maxpage) {
        document.getElementById("pc").value = document.getElementById("nowpage").value;
        SerachPrintShop();
    }
    else {

        $("#labtxt").html("wrong page no.");
        showDiv();
        document.getElementById("nowpage").value = 1;
    }
});
$("#nowpage").keyup(function () {
    var t = $("#nowpage").val();
    //判断是否是数字
    if (isNaN(t)) {
        $("#labtxt").html("wrong page no.");
        showDiv();
        document.getElementById("nowpage").value = 1;
    }
});