$(function () {
    SelectAll();
});
//查询所有
function SelectAll() {
    var data_ = {
        OOS_name: $("#inputname").val(),
        pc: $("#pc").val()
    }
    $.post("/Maintain/SelectBrandEndmarkVar_All", data_, function (data) {
        var html = "";
        if (data.Funstatus == "0") {
            alert("查询失败");
        }
        else {
            $.each(data.BrandEndmarkVarData, function (i, item) {
                html += "<tr>";
                html += "<td>" + item.seq + "</td>";
                html += "<td>" + item.OOS_name + "</td>";
                html += "<td>" + item.OOS_ename + "</td>";
                html += "<td>" + item.OOS_welldefaultvalue + "</td>";
                html += "<td>" + item.OOS_welltype + "</td>";
                html += "<td>" + item.OOS_sysname + "</td>";
                html += "<td>" + item.OOS_stardefaultvalue + "</td>";
                html += "<td>" + item.OOS_startype + "</td>";
                html += "<td>" + item.OOS_ename + "</td>";
                html += "<td>" + item.OOS_3Pics + "</td>";
                html += "<td>" + item.OOS_ColumnOrderBy + "</td>";
                html += "<td class=center><button type=button id=EditBrandEndmarkVar name=EditBrandEndmarkVar class='btn btn-default' onclick='funEditCUSTVarDataName(this)' value='" + item.EndmarkvarsId + "'>Edit</button>";
                html += "</tr>";
                $("#TotalPageCount").html(item.totalPgCount);
                $("#PageTotalCount").val(item.totalPgCount);
            });
            $("#BrandEndmarkVarDetail").html(html);
        }
    })
}

$("#step1").click(function () {
    $("#all").slideDown();
    $("#step2").css("display", "none");
    $("#step3").css("display", "none");
    $("#insertBrandEndmarkVar").css("display", "none");
    $("#updataBrandEndmarkVar").css("display", "none");
})

//新增按钮的点击事件
function CreatenewBrandEndmarkVar() {
    $("#all").css("display", "none");
    $("#insertBrandEndmarkVar").slideDown();
    $("#updataBrandEndmarkVar").css("display", "none");
    $("#step2").css("display", "inline");
}
//返回按钮的点击事件
function ReturnIndex() {
    $("#all").slideDown();
    $("#step2").css("display", "none");
    $("#step3").css("display", "none");
    $("#insertBrandEndmarkVar").css("display", "none");
    $("#updataBrandEndmarkVar").css("display", "none");
}

//新增界面的保存按钮
function funSaveBrandEndmarkVar(){
    if ($("#OOS_name").val() == "" || $("#OOS_ename_C").val() == "" || $("#OOS_sysname").val() == "" || $("#OOS_ename_E").val() == "" || $("#OOS_ColumnOrderBy").val()=="") {
        alert("名称、中文名、系统名、英文名、排序编号的栏位为必填项");
        return false;
    }
    var reg = new RegExp("^[0-9]*$");
    var obj = document.getElementById("OOS_ColumnOrderBy");
    if (!reg.test(obj.value)) {
        alert("OOS_ColumnOrderBy栏位请输入数字!");
        return false;
    }
    else {
        var data = {
            OOS_name: $("#OOS_name").val(),
            OOS_ename_C: $("#OOS_ename_C").val(),
            OOS_welldefaultvalue: $("#OOS_welldefaultvalue").val(),
            OOS_welltype: $("#OOS_welltype").val(),
            OOS_sysname: $("#OOS_sysname").val(),
            OOS_ename_E: $("#OOS_ename_E").val(),
            OOS_stardefaultvalue: $("#OOS_stardefaultvalue").val(),
            OOS_startype: $("#OOS_startype").val(),
            OOS_3Pics: $("#OOS_3Pics").val(),
            OOS_ColumnOrderBy: $("#OOS_ColumnOrderBy").val()
        };
        $.post("/Maintain/InsertBrandEndmarkVar", data, function (_data) {
            debugger;
            if (_data.Funstatus == "0") {
                alert(_data.msg);
            }
            else {
                alert("添加成功！");
                $("#all").slideDown();
                $("#insertBrandEndmarkVar").css("display", "none");
                $("#updataBrandEndmarkVar").css("display", "none");
                $("#OOS_name").val(""),
                $("#OOS_ename_C").val(""),
                $("#OOS_welldefaultvalue").val(""),
                $("#OOS_welltype").val(""),
                $("#OOS_sysname").val(""),
                $("#OOS_ename_E").val(""),
                $("#OOS_stardefaultvalue").val(""),
                $("#OOS_startype").val(""),
                $("#OOS_3Pics").val(""),
                $("#OOS_ColumnOrderBy").val("")
            }
            SelectAll();
        })
    }
}
//更新传值
function funEditCUSTVarDataName(obj) {
    $("#all").css("display", "none");
    $("#step3").css("display", "inline");
    $("#insertBrandEndmarkVar").css("display", "none");
    $("#updataBrandEndmarkVar").slideDown();
    $("#EditSCompanyID_U").val(obj.value);
    $.post("/Maintain/UpdateBrandEndmarkVar_Sel", { EndmarkvarsId: obj.value }, function (data) {
        if (data.Funstatus == "0") {
            alert("页面传值失败");
        }
        else {
            var item = data.BrandEndmarkVarData;
            $("#OOS_name_u").val(item.OOS_name);
            $("#OOS_ename_C_u").val(item.OOS_ename);
            $("#OOS_welldefaultvalue_u").val(item.OOS_welldefaultvalue);
            $("#OOS_welltype_u").val(item.OOS_welltype);
            $("#OOS_sysname_u").val(item.OOS_sysname);
            $("#OOS_ename_E_u").val(item.OOS_ename);
            $("#OOS_stardefaultvalue_u").val(item.OOS_stardefaultvalue);
            $("#OOS_startype_u").val(item.OOS_startype);
            $("#OOS_3Pics_u").val(item.OOS_3Pics);
            $("#OOS_ColumnOrderBy_u").val(item.OOS_ColumnOrderBy);
        }
        SelectAll();
    })
}
//更新操作
function funSaveBrandEndmarkVar_u() {
    debugger;
    if ($("#OOS_name_u").val() == "" || $("#OOS_ename_C_u").val() == "" || $("#OOS_sysname_u").val() == "" || $("#OOS_ename_E_u").val() == "" || $("#OOS_ColumnOrderBy_u").val() == "") {
        alert("名称、中文名、系统名、英文名、排序编号的栏位为必填项");
        return false;
    }
    var reg = new RegExp("^[0-9]*$");
    var obj = document.getElementById("OOS_ColumnOrderBy_u");
    if (!reg.test(obj.value)) {
        alert("OOS_ColumnOrderBy栏位请输入数字!");
        return false;
    }
    var EndmarkvarsId = $("#EditSCompanyID_U").val();
    var OOS_name = $("#OOS_name_u").val();
    var OOS_ename_C = $("#OOS_ename_C_u").val();
    var OOS_welldefaultvalue=$("#OOS_welldefaultvalue_u").val();
    var OOS_welltype=$("#OOS_welltype_u").val();
    var OOS_sysname=$("#OOS_sysname_u").val();
    //var OOS_ename_E=$("#OOS_ename_E_u").val();
    var OOS_stardefaultvalue=$("#OOS_stardefaultvalue_u").val();
    var OOS_startype=$("#OOS_startype_u").val();
    var OOS_3Pics=$("#OOS_3Pics_u").val();
    var OOS_ColumnOrderBy=$("#OOS_ColumnOrderBy_u").val();
    var data = {
        EndmarkvarsId: EndmarkvarsId,
        OOS_name: OOS_name,
        OOS_ename_C: OOS_ename_C,
        OOS_welldefaultvalue: OOS_welldefaultvalue,
        OOS_welltype: OOS_welltype,
        OOS_sysname: OOS_sysname,
        OOS_stardefaultvalue: OOS_stardefaultvalue,
        OOS_startype: OOS_startype,
        OOS_3Pics: OOS_3Pics,
        OOS_ColumnOrderBy: OOS_ColumnOrderBy
    };
    $.post("/Maintain/UpdateBrandEndmarkVar_up", data, function (data_) {
        if (data_.Funstatus == "0") {
            alert(data_.msg);
        }
        else {
                alert("更新成功");
                $("#all").slideDown();
                $("#step3").css("display", "none");
                $("#insertBrandEndmarkVar").css("display", "none");
                $("#updataBrandEndmarkVar").css("display", "none");
        }
        SelectAll();
    })
}
//分页
$('#PageIndex').click(function () {
    //给文本框赋值都为1
    document.getElementById("pc").value = 1;
    document.getElementById("nowpage").value = 1;
    SelectAll();
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
        SelectAll();
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
    SelectAll();
});
//翻到最后
$('#PageLast').click(function () {
    var maxpage = parseInt(document.getElementById("PageTotalCount").value);
    document.getElementById("pc").value = maxpage;
    document.getElementById("nowpage").value = maxpage;
    SelectAll();
});
$('#PageGO').click(function () {
    var nowpage = parseInt(document.getElementById("nowpage").value);
    var maxpage = parseInt(document.getElementById("PageTotalCount").value) + 1;
    if (nowpage > 0 && nowpage < maxpage) {
        document.getElementById("pc").value = document.getElementById("nowpage").value;
        SelectAll();
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