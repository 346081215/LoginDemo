$(function () {
    SelectAll();
})
//查询所有
function SelectAll() {
    var data_ = { pc: $("#pc").val() }
    $.post("/Maintain/ShippingCompanyQuery", data_, function (data) {
        var html = "";
        if (data.Funstatus == "0") {
            alert("查询失败");
        }
        else {
            $.each(data.ShippintCompanyData, function (i, item) {
                html += "<tr>";
                html += "<td>" + item.seq + "</td>";
                html += "<td>" + item.oos_name + "</td>";
                html += "<td>" + item.oos_chinesename + "</td>";
                html += "<td>" + item.oos_enname + "</td>";
                html += "<td>" + item.oos_website + "</td>";
                html += "<td>" + item.oos_extype + "</td>";
                html += "<td>" + item.IsEnabled + "</td>";
                html += "<td>" + item.Notes + "</td>";
                html += " <td class=center><button type=button id=EditSCompany name=EditSCompany class='btn btn-default' onclick='funEditSCompany(this)' value='" + item.oos_shippingcompanyId + "'>Edit</button><button type=button id=DeleteSCompany name=DeleteSCompany class='btn btn-default' onclick='funDeleteSCompany(this)' value='" + item.oos_shippingcompanyId + "'>Delete</button>"
                html += "</tr>";
                $("#TotalPageCount").html(item.totalPgCount);
                $("#PageTotalCount").val(item.totalPgCount);
            });
            $("#ShippingDetail").html(html);
        }
    })
}

//模糊查询
function SerachSCompany() {
    $.post("/Maintain/QueryInfoSCompanyByName", { name: $("#inputusername").val(), pc: $("#pc").val() }, function (data) {
        var html = "";
        if (data.Funstatus == "0") alert("查询失败");
        else {
            $.each(data.ShippintCompanyData, function (i, item) {
                html += "<tr>";
                html += "<td>" + item.seq + "</td>";
                html += "<td>" + item.oos_name + "</td>";
                html += "<td>" + item.oos_chinesename + "</td>";
                html += "<td>" + item.oos_enname + "</td>";
                html += "<td>" + item.oos_website + "</td>";
                html += "<td>" + item.oos_extype + "</td>";
                html += "<td>" + item.IsEnabled + "</td>";
                html += "<td>" + item.Notes + "</td>";
                html += " <td class=center><button type=button id=EditSCompany name=EditSCompany class='btn btn-default' onclick='return funEditSCompany(this)' value='" + item.oos_shippingcompanyId + "'>Edit</button><button type=button id=DeleteSCompany name=DeleteSCompany class='btn btn-default' onclick='return funDeleteSCompany(this);' value='" + item.oos_shippingcompanyId + "'>Delete</button>"
                html += "</tr>";
                $("#TotalPageCount").html(item.totalPgCount);
                $("#PageTotalCount").val(item.totalPgCount);
            });
            $("#ShippingDetail").html(html);
        }
    })
}

//跳转至添加界面
function CreatenewSCompany() {
    $("#EditInfor").slideDown();
    $("#all").css("display", "none");
    $("#Updateinfo").css("display", "none");
    $("#oos_name").val("");
    $("#oos_chinesename").val("");
    $("#oos_enname").val("");
    $("#oos_website").val("");
    $("#Notes").val("");
}

function CreatenewSCompany() {
    //添加界面的div下拉
    $("#EditInfor").slideDown();
    //查询的div隐藏
    $("#all").css("display", "none");
    //修改的div隐藏
    $("#Updateinfo").css("display", "none");
}
//返回上一界面
function ReturnIndex() {
    $("#all").slideDown();
    $("#EditInfor").css("display", "none");
    $("#Updateinfo").css("display", "none");
    $("#oos_name").val("");
    $("#oos_chinesename").val("");
    $("#oos_enname").val("");
    $("#oos_website").val("");
    $("#Notes").val("");
}
//增加
function funSaveSCompany() {
    if ($("#oos_name").val()=="" || $("#oos_chinesename").val()=="" || $("#oos_enname").val()=="") {
        alert("oos_name,oos_chinesename,oos_enname的栏位为必填项.");
    }
    else {
        var data = {
            oos_name: $("#oos_name").val(),
            oos_chinesename: $("#oos_chinesename").val(),
            oos_enname: $("#oos_enname").val(),
            oos_website: $("#oos_website").val(),
            Notes: $("#Notes").val() };
        $.post("/Maintain/InsertSCompanyInfo", data, function (_data) {
            if (_data.Funstatus == "0") {
                alert(_data.msg);
            }
            else {
                alert("添加成功！");
                $("#all").slideDown();
                $("#EditInfor").css("display", "none");
                $("#Updateinfo").css("display", "none");
                $("#oos_name").val("");
                $("#oos_chinesename").val("");
                $("#oos_enname").val("");
                $("#oos_website").val("");
                $("#Notes").val("");
            }
            SelectAll();
            SerachSCompany();
        })
    }
}



//删除
function funDeleteSCompany(id) {
    if (confirm("确认要删除？") == true) {
        $.post("/Maintain/DelectSCompanyInfo", { oos_shippingcompanyId: id.value }, function (data) {
            if (data.Funstatus == "1") {
                alert("删除成功");
                SelectAll();
                SerachSCompany();
            }
            else {
                alert(data.ErrorCode);
            }
        })
    }
  
    //SelectAll();
    //SerachSCompany();
}
//页面传值
function funEditSCompany(obj) {
    $("#EditInfor").css("display", "none");
    $("#all").css("display", "none");
    $("#Updateinfo").slideDown();
    $("#EditSCompanyID_U").val(obj.value);
    $.post("/Maintain/UpdateSCompany_Sel", { oos_shippingcompanyId: obj.value }, function (data) {
        if (data.Funstatus == "0") {
            alert("页面传值失败");
        }
        else {
            var item = data.ShippintCompanyData;
            $("#oos_name_u").val(item.oos_name);
            $("#oos_chinesename_u").val(item.oos_chinesename);
            $("#oos_enname_u").val(item.oos_enname);
            $("#oos_website_u").val(item.oos_website);
            $("#Notes_u").val(item.Notes);
        }
        SelectAll();
        SerachSCompany();
    })
}

//修改页面的保存方法
function funSaveSCompanyUpdate() {
    var oos_shippingcompanyId = $("#EditSCompanyID_U").val();
    var oos_name = $("#oos_name_u").val();
    var oos_chinesename = $("#oos_chinesename_u").val();
    var oos_enname = $("#oos_enname_u").val();
    var oos_website = $("#oos_website_u").val();
    var Notes = $("#Notes_u").val();
    if (oos_name == "" || oos_chinesename == "" || oos_enname == "")
    {
        alert("oos_name,oos_chinesename,oos_enname的栏位为必填项.");
        return false;
    }

    var data = {
        oos_shippingcompanyId: oos_shippingcompanyId,
        oos_name: oos_name,
        oos_chinesename: oos_chinesename,
        oos_enname: oos_enname,
        oos_website: oos_website,
        Notes: Notes
    };
    $.post("/Maintain/UpdateSCompany_up", data, function (data_) {
        if (data_.Funstatus == "0")
        {
            alert(data_.msg);
            return false;
        }
        else
        {
                alert("更新成功");
                $("#all").slideDown();
                $("#EditInfor").css("display", "none");
                $("#Updateinfo").css("display", "none");
        }
        SelectAll();
        SerachSCompany();
    })
}

//分页
$('#PageIndex').click(function () {
    //给文本框赋值都为1
    document.getElementById("pc").value = 1;
    document.getElementById("nowpage").value = 1;
    //SelectAll();
    //加载模糊查询的方法
    SerachSCompany();
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
        //SelectAll();
        SerachSCompany();
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
    //SelectAll();
    SerachSCompany();
});
//翻到最后
$('#PageLast').click(function () {
    var maxpage = parseInt(document.getElementById("PageTotalCount").value);
    document.getElementById("pc").value = maxpage;
    document.getElementById("nowpage").value = maxpage;
    //SelectAll();
    SerachSCompany();
});
$('#PageGO').click(function () {
    var nowpage = parseInt(document.getElementById("nowpage").value);
    var maxpage = parseInt(document.getElementById("PageTotalCount").value) + 1;
    if (nowpage > 0 && nowpage < maxpage) {
        document.getElementById("pc").value = document.getElementById("nowpage").value;
        //SelectAll();
        SerachSCompany();
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




