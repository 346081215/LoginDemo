$(function () {
    //SelectAll();
    SerachDetailShowDataSetting();
    //DetailSYNameInfo();
    //下拉改变事件
    $("#FormatId_sel").change(function () {
       // debugger;
        var FormatId = $("#FormatId_sel").val();
        var data_ = {
            FormatId: FormatId
        }
        //
        if ($("#FormatId_sel").val() == "") {
            $("#DetailSYSName").empty();
            $("#DetailENName").val("");
            $("#DetailCNName").val("");
        }
        else {
            $.post("/Maintain/Sel_value", data_, function (data) {
                var html = "";
                $.each(data.DetailShowDataSettingData, function (i, item) {
                    html += "<select>";
                    html += "<option value='" + item.Value + "'>" + item.Text + "</option>";
                    html += "</select>";
                });
                $("#DetailSYSName").html(html);
                $("#DetailSYSName option:first").remove();
                $("#DetailSYSName option:first").remove();

            })
        }
    });
});
//通过下拉选值
$("#DetailSYSName").change(function () {
    var FormatId = $("#FormatId_sel").val();
    var DetailSYSName = $("#DetailSYSName").val().substr(0, 7);
    var data_={
        FormatId:FormatId,
        DetailSYSName:DetailSYSName
    }
        $.post("/Maintain/Sel_Name", data_, function (data) {
            $("#DetailENName").val(data.DetailShowDataSettingData[0].DetailENName);
            $("#DetailCNName").val(data.DetailShowDataSettingData[0].DetailENName);
        });
});
//查询所有
function SelectAll() {
    var data_ = { pc: $("#pc").val() }
    $.post("/Maintain/SelectDetailShowDataSetting", data_, function (data) {
        var html = "";
        if (data.Funstatus == "0") {
            alert("查询失败");
        }
        else {
            $.each(data.DetailShowDataSettingData, function (i, item) {
                html += "<tr>";
                html += "<td>" + item.BrandId + "</td>";
                html += "<td>" + item.FormatId + "</td>";
                html += "<td>" + item.DetailENName + "</td>";
                html += "<td>" + item.DetailCNName + "</td>";
                html += "<td>" + item.DetailSYSName + "</td>";
                html += "<td>" + item.OrderSeq + "</td>";
                html += " <td class=center><button type=button id=EditDetail name=EditDetail class='btn btn-default' onclick='funEditDetail(this)' value='" + item.FormatId + "^" + item.DetailSYSName + "^" + item.ID + "'>Edit</button><button type=button id=DeleteDetail name=DeleteDetail class='btn btn-default' onclick='funcDeleteDetail(this)' value='" + item.FormatId + "^" + item.DetailSYSName + "'>Delete</button>"
                html += "</tr>";
                $("#TotalPageCount").html(item.totalPgCount);
                $("#PageTotalCount").val(item.totalPgCount);
            });
            $("#DetailShowDataSettingDetail").html(html);
        }
    })
}

//条件查询
function SerachDetailShowDataSetting() {
    var data_ = {
        name: $("#FormatId").val(),
        DBrandId: $("#BrandId").val(),
        pc: $("#pc").val()
    }
    $.post("/Maintain/QueryDetailShowDataSetting", data_, function (data) {
        var html = "";
        if (data.Funstatus == "0") {
            alert("查询失败");
        }
        else {
            $.each(data.DetailShowDataSettingData, function (i, item) {
                html += "<tr>";
                html += "<td>" + item.BrandId + "</td>";
                html += "<td>" + item.FormatId + "</td>";
                html += "<td>" + item.DetailENName + "</td>";
                html += "<td>" + item.DetailCNName + "</td>";
                html += "<td>" + item.DetailSYSName + "</td>";
                html += "<td>" + item.OrderSeq + "</td>";
                html += " <td class=center><button type=button id=EditDetail name=EditDetail class='btn btn-default' onclick='funEditDetail(this)' value='" + item.FormatId + "^" + item.DetailSYSName + "^" + item.ID +  "'>Edit</button><button type=button id=DeleteSCompany name=DeleteDetail class='btn btn-default' onclick='funcDeleteDetail(this)' value='" + item.FormatId + "^" + item.DetailSYSName + "'>Delete</button>"
                html += "</tr>";
                $("#TotalPageCount").html(item.totalPgCount);
                $("#PageTotalCount").val(item.totalPgCount);
            });
            $("#DetailShowDataSettingDetail").html(html);
        }
    })
}
//增加按钮的跳转界面
function CreatenewDetail() {
    $("#all").css("display", "none");
    $("#insertDetail").slideDown();
    $("#usdataDetail").css("display", "none");
    $("#DetailSYSName").empty();
}

//给DetailSYName绑定值
//function DetailSYNameInfo() {
//    var html = "<select><option>--All--</option></select>";
//    for (var i = 1; i <= 500; i++) {
//        var s = i.toString();
//        if (s.length == 1) {
//            html += "<select>";
//            html += "<option>var00" + i + "</option>";
//            html += "</select>";
//        }
//        else if (s.length == 2) {
//            html += "<select>";
//            html += "<option>var0" + i + "</option>";
//            html += "</select>";
//        }
//        else {
//            html += "<select>";
//            html += "<option>var" + i + "</option>";
//            html += "</select>";
//        }
//    }
//    $("#DetailSYSName").html(html);
//}
//增加的保存操作
function funSaveDeatil() {
    if ($("#FormatId_sel").val() == "--Please Select--") {
        alert("请选择FormatId栏位");
    }
    else {
        if ($("#DetailENName").val() == "" || $("#DetailCNName").val() == "" || $("#OrderSeq").val()=="") {
            alert("DetailENName、DetailCNName和OrderSeq不能为空，请选择DetailSYSName栏位");
        }
        else {
            var data_ = {
                BrandId: $("#BrandId_sel").val(),
                FormatId: $("#FormatId_sel").val(),
                DetailENName: $("#DetailENName").val(),
                DetailCNName: $("#DetailCNName").val(),
                DetailSYSName: $("#DetailSYSName").val(),
                OrderSeq: $("#OrderSeq").val()
            }
            $.post("/Maintain/SaveDetail", data_, function (data) {
                debugger;
                if (data.Funstatus == "0") {
                    alert(data.msg);
                }
                else {
                    alert("添加成功！");
                    $("#all").slideDown();
                    $("#insertDetail").css("display", "none");
                    $("#usdataDetail").css("display", "none");
                    $("#DetailENName").val(""),
                    $("#DetailCNName").val("")
                }
                SelectAll();
                SerachDetailShowDataSetting();
            })
        }
    }
}
//增加界面的返回操作
function ReturnIndex() {
    $("#all").slideDown();
    $("#insertDetail").css("display", "none");
    $("#usdataDetail").css("display", "none");
    $("#FormatId_sel").val("");
    DateFormatId();
    $("#DetailENName").val("");
    $("#DetailCNName").val("");
    $("#OrderSeq").val("");
}
//绑定FormatId下拉
function DateFormatId() {
    debugger;
    var html="";
    $.post("/Maintain/DateFormatId_sel", null, function (data) {
        if (data.Funstatus == "0") {
            alert(data.Err);
        }
        else {
            $.each(data.FormatIdList_sel, function (i, item) {
                html += "<select>";
                html += "<option>" +item.FormatId + "</option>";
                html += "</select>";
            });
        }
    });
}
//删除
function funcDeleteDetail(obj) {
    var arr = obj.value.split("^");
    var FormatId = arr[0];
    var DetailSYSName = arr[1];
    //alert(FormatId + "-------" + DetailSYSName);
    var data_ = {
        FormatId: FormatId,
        DetailSYSName: DetailSYSName
    }
    if (confirm("确认要删除吗？") == true) {
        $.post("/Maintain/DeleteDetail", data_, function (data) {
            if (data.Funstatus == "1") {
                alert("删除成功！");
                SelectAll();
                SerachDetailShowDataSetting();
            }
            else {
                alert(data.ErrorCode);
            }
        })
    }
}
//更新的传值
function funEditDetail(id) {
    $("#all").css("display", "none");
    $("#insertDetail").css("display", "none");
    $("#usdataDetail").slideDown();
    $("#EditDetailID_U").val(id.value);
    var arr = id.value.split("^");
    var FormatId = arr[0];
    var DetailSYSName = arr[1];
    var ID=arr[2];
    //alert(FormatId + "-------" + DetailSYSName);
    var data_ = {
        FormatId: FormatId,
        DetailSYSName: DetailSYSName,
        ID:ID
    }
    $.post("/Maintain/UpdateDetail_sel", data_, function (data) {
        if (data.Funstatus == "0") {
            alert(data.ErrorCode);
        }
        else {
            var item = data.DetailShowDataSettingData;
            $("#BrandId_u").val(item.BrandId);
            $("#DetailSYSName_u").val(item.DetailSYSName);
            $("#OrderSeq_u").val(item.OrderSeq);
            $("#DetailENName_u").val(item.DetailENName);
            $("#DetailCNName_u").val(item.DetailCNName);
        }
        SelectAll();
        SerachDetailShowDataSetting();
    })

}
//更新界面的保存
function funUpdateDeatil() {
    var DetailENName = $("#DetailENName_u").val();
    var DetailCNName = $("#DetailCNName_u").val();
    var obj = $("#EditDetailID_U").val();
    var OrderSeq = $("#OrderSeq_u").val();
    var BrandId = $("#BrandId_u").val()
    debugger;
    var arr = obj.split("^");
    var FormatId = arr[0];
    var DetailSYSName = arr[1];
    var ID = arr[2];
    // alert(FormatId + "==========" + "DetailSYSName");
    var data_ = {
        ID:ID,
        FormatId: FormatId,
        DetailENName: DetailENName,
        DetailCNName: DetailCNName,
        DetailSYSName: DetailSYSName,
        OrderSeq: OrderSeq,
        BrandId: BrandId
    };
    if ($("#DetailENName_u").val() != $("#DetailCNName_u").val())
    {
        alert("DetailENName和DetailCNName的值必须相等");
        return false;
    }
    $.post("/Maintain/UpdateDetail_up", data_, function (data) {
        if (data.Funstatus == "0") {
            alert(data.msg);
        }
        else {
            if ($("#DetailENName_u").val() == "" || $("#DetailCNName_u").val() == "") {
                alert("DetailENName和DetailCNName栏位不能为空！");
                return false;
            }
            else {
                alert("更新成功");
                $("#all").slideDown();
                $("#insertDetail").css("display", "none");
                $("#usdataDetail").css("display", "none");
                $("#DetailENName_u").val("");
                $("#DetailCNName_u").val("");
                $("#OrderSeq_u").val("");
            }
        }
        SelectAll();
        SerachDetailShowDataSetting();
    })
}



//分页
$('#PageIndex').click(function () {
    //给文本框赋值都为1
    document.getElementById("pc").value = 1;
    document.getElementById("nowpage").value = 1;
    //加载模糊查询的方法
    SerachDetailShowDataSetting()
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
        SerachDetailShowDataSetting()
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
    SerachDetailShowDataSetting()
});
//翻到最后
$('#PageLast').click(function () {
    var maxpage = parseInt(document.getElementById("PageTotalCount").value);
    document.getElementById("pc").value = maxpage;
    document.getElementById("nowpage").value = maxpage;
    SerachDetailShowDataSetting()
});
$('#PageGO').click(function () {
    var nowpage = parseInt(document.getElementById("nowpage").value);
    var maxpage = parseInt(document.getElementById("PageTotalCount").value) + 1;
    if (nowpage > 0 && nowpage < maxpage) {
        document.getElementById("pc").value = document.getElementById("nowpage").value;
        SerachDetailShowDataSetting()
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