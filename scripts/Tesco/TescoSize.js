$(function () {
    SelectAll();
    //Department下拉框改变事件
    $("#Dept").change(function () {
        var html = "";
        var data_ = {
            Dept: $("#Dept").val()
        }
        $.post("/Tesco/SelectPrimarySize_UK", data_, function (data) {
            if (data.Funstatus == "0") {
                alert("查询失败");
            }
            else {
                $.each(data.TescoSizeData, function (i, item) {
                    html += "<select>";
                    html += "<option>" + item.PrimarySize_UK + "</option>";
                    html += "</select>";
                })
                $("#PrimarySize_UK").html(html);
            }
        });
    });
});
//查询所有和条件查询
function SelectAll() {
    var data_ = {
        Dept: $("#Dept").val(),
        PrimarySize_UK: $("#PrimarySize_UK").val(),
        pc: $("#pc").val()
    }
    $.post("/Tesco/SelectTescoSize_All", data_, function (data) {
        var html = "";
        if (data.Funstatus == "0") {
            alert("查询失败");
        }
        else {
            $.each(data.TescoSizeData, function (i, item) {
                html += "<tr>";
                html += "<td>" + item.ID + "</td>";
                html += "<td>" + item.Dept + "</td>";
                html += "<td>" + item.PrimarySize_UK + "</td>";
                html += "<td>" + item.PrimarySize_CE + "</td>";
                html += "<td>" + item.PrimarySize_US + "</td>";
                html += "<td>" + item.PrimarySize_MX + "</td>";
                html += "<td>" + item.OptionalSecondary1 + "</td>";
                html += "<td>" + item.OptionalSecondary2 + "</td>";
                html += "<td>" + item.OptionalSecondary3 + "</td>";
                html += "<td>" + item.OptionalSecondary4 + "</td>";
                html += "<td>" + item.OptionalSecondary5 + "</td>";
                html += "<td>" + item.OptionalSecondary6 + "</td>";
                html += "<td>" + item.OptionalSecondary7 + "</td>";
                html += "<td>" + item.OptionalSecondary8 + "</td>";
                html += "<td>" + item.OptionalSecondary9 + "</td>";
                html += "<td>" + item.OptionalSecondary10 + "</td>";
                html += "<td>" + item.OptionalSecondary11 + "</td>";
                html += "<td>" + item.OptionalSecondary2 + "</td>";
                html += "<td>" + item.Notes + "</td>";
                html += " <td class=center><button type=button id=EditTescoSize name=EditTescoSize class='btn btn-default' onclick='funEditTescoSize(this)' value='" + item.ID + "'>Edit</button>";
                html += "</tr>";
                $("#TotalPageCount").html(item.totalPgCount);
                $("#PageTotalCount").val(item.totalPgCount);
            });
            $("#TescoSizeDetail").html(html);
        }
    })
}

//step1点击事件
$("#step1").click(function () {
    $("#all").slideDown();
    $("#insertTescoSize").css("display", "none");
    $("#updataTescoSize").css("display", "none");
    $("#step2").css("display", "none");
    $("#step3").css("display", "none");
})
//新增按钮
function CreatenewTescoSize() {
    $("#all").css("display", "none");
    $("#insertTescoSize").slideDown();
    $("#updataTescoSize").css("display", "none");
    $("#step2").css("display", "inline");
}
//返回按钮
function ReturnIndex() {
    $("#all").slideDown();
    $("#insertTescoSize").css("display", "none");
    $("#updataTescoSize").css("display", "none");
    $("#step2").css("display", "none");
    $("#step3").css("display", "none");
    $("#Dept_add").val();
    $("#PrimarySize_UK_add").val();
    $("#PrimarySize_CE").val();
    $("#PrimarySize_US").val();
    $("#PrimarySize_MX").val();
    $("#OptionalSecondary1").val();
    $("#OptionalSecondary2").val();
    $("#OptionalSecondary3").val();
    $("#OptionalSecondary4").val();
    $("#OptionalSecondary5").val();
    $("#OptionalSecondary6").val();
    $("#OptionalSecondary7").val();
    $("#OptionalSecondary8").val();
    $("#OptionalSecondary9").val();
    $("#OptionalSecondary10").val();
    $("#OptionalSecondary11").val();
    $("#OptionalSecondary12").val();
    $("#Notes").val();
    $("#Dept_u").val();
    $("#PrimarySize_UK_u").val();
    $("#PrimarySize_CE_u").val();
    $("#PrimarySize_US_u").val();
    $("#PrimarySize_MX_u").val();
    $("#OptionalSecondary1_u").val();
    $("#OptionalSecondary2_u").val();
    $("#OptionalSecondary3_u").val();
    $("#OptionalSecondary4_u").val();
    $("#OptionalSecondary5_u").val();
    $("#OptionalSecondary6_u").val();
    $("#OptionalSecondary7_u").val();
    $("#OptionalSecondary8_u").val();
    $("#OptionalSecondary9_u").val();
    $("#OptionalSecondary10_u").val();
    $("#OptionalSecondary11_u").val();
    $("#OptionalSecondary12_u").val();
    $("#Notes_u").val();
}

//新增界面的保存操作
function funSaveTescoSize_Add() {
    if ($("#Dept_add").val() == "" || $("#PrimarySize_UK_add").val() == "" ) {
        alert("Dept和PrimarySize_UK的栏位为必填项");
        return false;
    }
    else {
        var data = {
            Dept: $("#Dept_add").val(),
            PrimarySize_UK: $("#PrimarySize_UK_add").val(),
            PrimarySize_CE: $("#PrimarySize_CE").val(),
            PrimarySize_US: $("#PrimarySize_US").val(),
            PrimarySize_MX: $("#PrimarySize_MX").val(),
            OptionalSecondary1: $("#OptionalSecondary1").val(),
            OptionalSecondary2: $("#OptionalSecondary2").val(),
            OptionalSecondary3: $("#OptionalSecondary3").val(),
            OptionalSecondary4: $("#OptionalSecondary4").val(),
            OptionalSecondary5: $("#OptionalSecondary5").val(),
            OptionalSecondary6: $("#OptionalSecondary6").val(),
            OptionalSecondary7: $("#OptionalSecondary7").val(),
            OptionalSecondary8: $("#OptionalSecondary8").val(),
            OptionalSecondary9: $("#OptionalSecondary9").val(),
            OptionalSecondary10: $("#OptionalSecondary10").val(),
            OptionalSecondary11: $("#OptionalSecondary11").val(),
            OptionalSecondary12: $("#OptionalSecondary12").val(),
            Notes: $("#Notes").val()
        };
        $.post("/Tesco/InsertTescoSize", data, function (_data) {
            if (_data.Funstatus == "0") {
                alert(_data.msg);
            }
            else {
                alert("添加成功！");
                $("#all").slideDown();
                $("#insertTescoSize").css("display", "none");
                $("#updataTescoSize").css("display", "none");
                $("#step2").css("display", "none");
                $("#Notes").val("");
                $.post("/Tesco/QueryDepartment", function (data) {
                    $("#Dept").val("");
                    $("#Dept").text("");
                    $.each(data.Deptlist, function (i, item) {
                        var DeptList = "";
                        DeptList = "<option value='" + item.Value + "'>" + item.Text + "</option>";
                        $("#Dept").append(DeptList);
                    })
                })
                $("#Dept_add").val("");
                $("#PrimarySize_UK_add").val("");
                $("#PrimarySize_CE").val("");
                $("#PrimarySize_US").val("");
                $("#PrimarySize_MX").val("");
                $("#OptionalSecondary1").val("");
                $("#OptionalSecondary2").val("");
                $("#OptionalSecondary3").val("");
                $("#OptionalSecondary4").val("");
                $("#OptionalSecondary5").val("");
                $("#OptionalSecondary6").val("");
                $("#OptionalSecondary7").val("");
                $("#OptionalSecondary8").val("");
                $("#OptionalSecondary9").val("");
                $("#OptionalSecondary10").val("");
                $("#OptionalSecondary11").val("");
                $("#OptionalSecondary12").val("");
            }
            SelectAll();
        })
    }
}
//更新传值
function funEditTescoSize(obj) {
    $("#all").css("display", "none");
    $("#step3").css("display", "inline");
    $("#insertTescoSize").css("display", "none");
    $("#updataTescoSize").slideDown();
    $("#EditSCompanyID_U").val(obj.value);
    $.post("/Tesco/UpdateTescoSize_Sel", { ID: obj.value }, function (data) {
        if (data.Funstatus == "0") {
            alert(data.ErrorCode);
        }
        else {
            var item = data.TescoSizeData;
            $("#Dept_u").val(item.Dept);
            $("#PrimarySize_UK_u").val(item.PrimarySize_UK);
            $("#PrimarySize_CE_u").val(item.PrimarySize_CE);
            $("#PrimarySize_US_u").val(item.PrimarySize_US);
            $("#PrimarySize_MX_u").val(item.PrimarySize_MX);
            $("#OptionalSecondary1_u").val(item.OptionalSecondary1);
            $("#OptionalSecondary2_u").val(item.OptionalSecondary2);
            $("#OptionalSecondary3_u").val(item.OptionalSecondary3);
            $("#OptionalSecondary4_u").val(item.OptionalSecondary4);
            $("#OptionalSecondary5_u").val(item.OptionalSecondary5);
            $("#OptionalSecondary6_u").val(item.OptionalSecondary6);
            $("#OptionalSecondary7_u").val(item.OptionalSecondary7);
            $("#OptionalSecondary8_u").val(item.OptionalSecondary8);
            $("#OptionalSecondary9_u").val(item.OptionalSecondary9);
            $("#OptionalSecondary10_u").val(item.OptionalSecondary10);
            $("#OptionalSecondary11_u").val(item.OptionalSecondary11);
            $("#OptionalSecondary12_u").val(item.OptionalSecondary12);
            $("#Notes_u").val(item.Notes);
        }
        SelectAll();
    })
}

//更新保存操作
function funSaveTescoSize_u() {
    //if ($("#Dept_u").val() == "" || $("#PrimarySize_UK_u").val() == "") {
    //    alert("Dept和PrimarySize_UK的栏位为必填项");
    //    return false;
    //}
    debugger;
    var ID = $("#EditSCompanyID_U").val();
    var Dept=$("#Dept_u").val();
    var PrimarySize_UK = $("#PrimarySize_UK_u").val();
    var PrimarySize_CE = $("#PrimarySize_CE_u").val();
    var PrimarySize_US = $("#PrimarySize_US_u").val();
    var PrimarySize_MX = $("#PrimarySize_MX_u").val();
    var OptionalSecondary1 = $("#OptionalSecondary1_u").val();
    var OptionalSecondary2 = $("#OptionalSecondary2_u").val();
    var OptionalSecondary3 = $("#OptionalSecondary3_u").val();
    var OptionalSecondary4 = $("#OptionalSecondary4_u").val();
    var OptionalSecondary5 = $("#OptionalSecondary5_u").val();
    var OptionalSecondary6 = $("#OptionalSecondary6_u").val();
    var OptionalSecondary7 = $("#OptionalSecondary7_u").val();
    var OptionalSecondary8 = $("#OptionalSecondary8_u").val();
    var OptionalSecondary9 = $("#OptionalSecondary9_u").val();
    var OptionalSecondary10 = $("#OptionalSecondary10_u").val();
    var OptionalSecondary11 = $("#OptionalSecondary11_u").val();
    var OptionalSecondary12 = $("#OptionalSecondary12_u").val();
    var Notes = $("#Notes_u").val();
    var data = {
        ID: ID,
        Dept: Dept,
        PrimarySize_UK: PrimarySize_UK,
        PrimarySize_CE: PrimarySize_CE,
        PrimarySize_US: PrimarySize_US,
        PrimarySize_MX: PrimarySize_MX,
        OptionalSecondary1: OptionalSecondary1,
        OptionalSecondary2: OptionalSecondary2,
        OptionalSecondary3: OptionalSecondary3,
        OptionalSecondary4: OptionalSecondary4,
        OptionalSecondary5: OptionalSecondary5,
        OptionalSecondary6: OptionalSecondary6,
        OptionalSecondary7: OptionalSecondary7,
        OptionalSecondary8: OptionalSecondary8,
        OptionalSecondary9: OptionalSecondary9,
        OptionalSecondary10: OptionalSecondary10,
        OptionalSecondary11: OptionalSecondary11,
        OptionalSecondary12: OptionalSecondary12,
        Notes: Notes
    };
    $.post("/Tesco/UpdateTescoSize_up", data, function (data_) {
        if (data_.Funstatus == "0") {
            alert(data_.msg);
        }
        else {
            alert("更新成功");
            $("#all").slideDown();
            $("#step3").css("display", "none");
            $("#insertTescoSize").css("display", "none");
            $("#updataTescoSize").css("display", "none");
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