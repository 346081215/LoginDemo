$(function () {
    SelectAll();
   FormComponents.init();
});

//查询所有
function SelectAll() {
    debugger;
    var data_ = {
        English: $("#English_sel").val(),
        pc: $("#pc").val()
    }
    $.post("/Tesco/SelectTSC_MadeIn_All", data_, function (data) {
        var html = "";
        if (data.Funstatus == "0") {
            alert("查询失败");
        }
        else {
            $.each(data.TSC_MadeInData, function (i, item) {
                html += "<tr>";
                html += "<td>" + item.ID + "</td>";
                html += "<td>" + item.English + "</td>";
                html += "<td>" + item.Notes + "</td>";
                html += "<td>" + item.ModifiedBy + "</td>";
                html += "<td>" + item.ModifiedOn + "</td>";
                html += " <td class=center><button type=button id=EditTSC_MadeIn name=EditTSC_MadeIn class='btn btn-default' onclick='funEditTSC_MadeIn(this)' value='" + item.ID + "'>Edit</button>&nbsp;<button type=button id=DelTSC_MadeIn name=DelTSC_MadeIn class='btn btn-default' onclick='funDelTSC_MadeIn(this)' value='" + item.ID + "'>delete</button>";
                html += "</tr>";
                $("#TotalPageCount").html(item.totalPgCount);
                $("#PageTotalCount").val(item.totalPgCount);
            });
            $("#TSC_MadeInDetail").html(html);
        }
    })
}

//新增按钮的跳转操作
function CreatenewTSC_MadeIn() {
    $("#all").css("display", "none");
    $("#insertTSC_MadeIn").slideDown();
    $("#updataTSC_MadeIn").css("display", "none");
    $("#step2").css("display", "inline");
    $("#English").val("");
    $("#Notes").val("");
}

//新增界面的保存操作
function funSaveTSC_MadeIn_Add() {
    if ($("#English").val() == "") {
        alert("English的栏位为必填项");
        return false;
    }
    else {
        var guess = $("#English").val();
        debugger;
        var reg = /[\u4E00-\u9FA5]/;
        if (reg.test(guess) || guess.match(/\d+/g)) {
            alert("English栏位必须为英文！");
            return false;
        }
        var data = {
            English: $("#English").val(),
            Notes: $("#Notes").val()
        };
        $.post("/Tesco/InsertTSC_MadeIn", data, function (_data) {
            if (_data.Funstatus == "0") {
                alert(_data.msg);
            }
            else {
                alert("添加成功！");
                $("#all").slideDown();
                $("#insertTSC_MadeIn").css("display", "none");
                $("#updataTSC_MadeIn").css("display", "none");
                $("#step2").css("display", "none");
                $("#English").val("");
                $("#Notes").val("");
            }
            SelectAll();
        })
    }
}
$("#step1").click(function () {
    $("#all").slideDown();
    $("#insertTSC_MadeIn").css("display", "none");
    $("#updataTSC_MadeIn").css("display", "none");
    $("#step2").css("display", "none");
    $("#step3").css("display", "none");
})

//更新传值操作
function funEditTSC_MadeIn(obj) {
    $("#all").css("display", "none");
    $("#step3").css("display", "inline");
    $("#insertTSC_MadeIn").css("display", "none");
    $("#updataTSC_MadeIn").slideDown();
    $("#EditSCompanyID_U").val(obj.value);
    $.post("/Tesco/UpdateTSC_MadeIn_Sel", { ID: obj.value }, function (data) {
        if (data.Funstatus == "0") {
            alert(data.ErrorCode);
        }
        else {
            var item = data.TSC_MadeInData;
            $("#English_u").val(item.English);
            $("#Notes_u").val(item.Notes);
        }
        SelectAll();
    })
}
//返回按钮的操作
function ReturnIndex() {
    $("#all").slideDown();;
    $("#insertTSC_MadeIn").css("display", "none");
    $("#updataTSC_MadeIn").css("display", "none");
    $("#step2").css("display", "none");
    $("#step3").css("display", "none");
    $("#English").val("");
    $("#Notes").val("");
    $("#English_u").val("");
    $("#Notes_u").val("");
}

//修改保存操作
function funSaveTSC_MadeIn_u() {
    if ($("#English_u").val() == "") {
        alert("English的栏位为必填项");
        return false;
    }
    debugger;
    var ID = $("#EditSCompanyID_U").val();

    var guess = $("#English_u").val();
    debugger;
    var reg = /[\u4E00-\u9FA5]/;
    if (reg.test(guess) || guess.match(/\d+/g)) {
        alert("English栏位必须为英文！");
        return false;
    }
    var Notes = $("#Notes_u").val();
    var data = {
        ID: ID,
        English: guess,
        Notes: Notes
    };
    $.post("/Tesco/UpdateTSC_MadeIn_up", data, function (data_) {
        if (data_.Funstatus == "0") {
            alert(data_.msg);
        }
        else {
            alert("更新成功");
            $("#all").slideDown();
            $("#step3").css("display", "none");
            $("#insertTSC_MadeIn").css("display", "none");
            $("#updataTSC_MadeIn").css("display", "none");
        }
        SelectAll();
    })
}

//删除操作
function funDelTSC_MadeIn(id) {
    var data_ = {
        ID: id.value
    }
    if (confirm("确认要删除？") == true) {
        $.post("/Tesco/DeleteTSC_MadeIn", data_, function (data) {
            debugger;
            if (data.Funstatus == "1") {
                alert("删除成功！");
                SelectAll();
            }
            else {
                alert(data.ExCode);
            }
        })
    }
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