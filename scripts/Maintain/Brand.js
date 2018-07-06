$(function () {
    SelectAll();
});
function SelectAll() {
    var data_ = {
        pc: $("#pc").val(),
        BrandId: $("#BrandId_sel").val()
    }
    $.post("/Maintain/BrandQuery", data_, function (data) {
        var html = "";
        if (data.Funstatus == "0") {
            alert("查询失败");
        }
        else {
            $.each(data.BrandData, function (i, item) {
                html += "<tr>";
                html += "<td>" + item.BrandId + "</td>";
                html += "<td>" + item.Name + "</td>";
                html += "<td>" + item.CodeName + "</td>";
                html += "<td>" + item.ContactAddress + "</td>";
                html += "<td>" + item.ContactPerson + "</td>";
                html += "<td>" + item.ContactTel + "</td>";
                html += "<td>" + item.Country + "</td>";
                html += "<td>" + item.CountryCode + "</td>";
                html += "<td>" + item.LogoUrl + "</td>";
                html += "<td>" + item.ParentBrandId + "</td>";
                html += "<td>" + item.IsEnabled + "</td>";
                html += "<td>" + item.EnableERPFunc + "</td>";
                html += "<td>" + item.EnableBigVndFunc + "</td>";
                html += "<td>" + item.EnableReviseQtyFunc + "</td>";
                html += " <td class=center><button type=button id=EditBrand name=EditBrand class='btn btn-default' onclick='funEditBrand(this)' value='" + item.BrandId + "'>Edit</button>&nbsp;&nbsp;<button type=button id=DeleteBrand name=DeleteBrand class='btn btn-default' onclick='funDeleteBrand(this)' value='" + item.BrandId + "'>Delete</button>&nbsp;&nbsp;<buttom><button type=button id=DeleteSCompany name=DeleteSCompany class='btn btn-default' onclick='funDeleteSCompany(this)' value='" + item.BrandId + "'>是否打印ERP</button>&nbsp;&nbsp;<buttom><button type=button id=DeleteSCompany name=DeleteSCompany class='btn btn-default' onclick='funDeleteSCompany(this)' value='" + item.BrandId + "'>启用修改数量</button>&nbsp;&nbsp;<buttom><button type=button id=DeleteSCompany name=DeleteSCompany class='btn btn-default' onclick='funDeleteSCompany(this)' value='" + item.BrandId + "'>启用上下级客户</button>";
                html += "</tr>";
                $("#TotalPageCount").html(item.totalPgCount);
                $("#PageTotalCount").val(item.totalPgCount);
            });
            $("#BrandDetail").html(html);
        }
    })
}
function CreatenewBrand() {
    $("#all").css("display", "none");
    $("#step2").css("display", "inline");
    $("#step3").css("display", "none");
    $("#insertBrand").slideDown();
    $("#updataBrand").css("display", "none");
}
$("#step1").click(function () {
    $("#all").slideDown();
    $("#step2").css("display", "inline");
    $("#step3").css("display", "none");
    $("#insertBrand").css("display", "none");
    $("#updataBrand").css("display", "none");
});

//返回按钮
function ReturnIndex() {
    $("#all").slideDown();
    $("#insertBrand").css("display", "none");
    $("#updataBrand").css("display", "none");
    $("#step2").css("display", "none");
    $("#step3").css("display", "none");
    $("#BrandId").val();
    $("#Name").val();
    $("#CodeName").val();
    $("#ContactAddress").val();
    $("#ContactPerson").val();
    $("#ContactTel").val();
    $("#Country").val();
    $("#CountryCode").val();
    $("#LogoUrl").val();
    $("#ParentBrandId").val();
    $("#Notes").val();
    $("input[type='radio'][name='EnableERPFunc']").get(0).checked = true;
    $("input[type='radio'][name='EnableBigVndFunc']").get(0).checked = true;
    $("input[type='radio'][name='EnableReviseQtyFunc']").get(0).checked = true;
    $("#BrandId_u").val();
    $("#Name_u").val();
    $("#CodeName_u").val();
    $("#ContactAddress_u").val();
    $("#ContactPerson_u").val();
    $("#ContactTel_u").val();
    $("#Country_u").val();
    $("#CountryCode_u").val();
    $("#LogoUrl_u").val();
    $("#ParentBrandId_u").val();
    $("#Notes_u").val();
}
//新增界面的保存操作
function funSaveBrand_Add() {
    debugger;
    var EnableERPFunc = "";
    if (document.getElementById("EnableERPFunc0").checked == true) {
        EnableERPFunc = $("#EnableERPFunc0").val();
    }
    else {
        EnableERPFunc = $("#EnableERPFunc1").val();
    }
    //if (document.getElementById("EnableERPFunc1").checked == true) {
    //    EnableERPFunc = $("#EnableERPFunc1").val();
    //}
    var EnableBigVndFunc = "";
    if (document.getElementById("EnableBigVndFunc0").checked == true) {
        EnableBigVndFunc = $("#EnableBigVndFunc0").val();
    }
    else {
        EnableBigVndFunc = $("#EnableBigVndFunc1").val();
    }
    //if (document.getElementById("EnableBigVndFunc1").checked == true) {
    //    EnableBigVndFunc = $("#EnableBigVndFunc1").val();
    //}
    var EnableReviseQtyFunc = "";
    if (document.getElementById("EnableReviseQtyFunc0").checked == true) {
        EnableReviseQtyFunc = $("#EnableReviseQtyFunc0").val();
    }
    else {
        EnableReviseQtyFunc = $("#EnableReviseQtyFunc1").val();
    }
    //if (document.getElementById("EnableReviseQtyFunc1").checked == true) {
    //    EnableReviseQtyFunc = $("#EnableReviseQtyFunc1").val();
    //}
    if ($("#BeandId").val() == "" || $("#Name").val() == "") {
        alert("BeandId和Name的栏位为必填项");
    }
    else {
        var data = {
            BrandId: $("#BrandId").val(),
            Name: $("#Name").val(),
            CodeName: $("#CodeName").val(),
            ContactAddress: $("#ContactAddress").val(),
            ContactPerson: $("#ContactPerson").val(),
            ContactTel: $("#ContactTel").val(),
            Country: $("#Country").val(),
            CountryCode: $("#CountryCode").val(),
            LogoUrl: $("#LogoUrl").val(),
            ParentBrandId: $("#ParentBrandId").val(),
            Notes: $("#Notes").val(),
            EnableERPFunc: EnableERPFunc,
            EnableBigVndFunc: EnableBigVndFunc,
            EnableReviseQtyFunc: EnableReviseQtyFunc

        };
        $.post("/Maintain/InsertBrand", data, function (_data) {
            if (_data.Funstatus == "0") {
                alert(_data.msg);
            }
            else {
                alert("添加成功！");
                $("#all").slideDown();
                $("#insertBrand").css("display", "none");
                $("#updataBrand").css("display", "none");
                $("#BrandId").val("");
                $("#Name").val("");
                $("#CodeName").val("");
                $("#ContactAddress").val("");
                $("#ContactPerson").val("");
                $("#ContactTel").val("");
                $("#Country").val("");
                $("#CountryCode").val("");
                $("#LogoUrl").val("");
                $("#ParentBrandId").val("");
                $("#IsEnabled").val("");
                $("#Notes").val("");
                $("#EnableBigVndFunc").val("");
                $("#EnableReviseQtyFunc").val("");
                $.post("/Maintain/QueryBrand", function (data) {
                    $("#BrandId_sel").val("");
                    $("#BrandId_sel").text("");
                    $.each(data.Brandlist, function (i, item) {
                        var DeptList = "";
                        BrandList = "<option value='" + item.Value + "'>" + item.Text + "</option>";
                        $("#BrandId_sel").append(BrandList);
                    })
                })
            }
            SelectAll();
        })
    }
}
//修改按钮
function funEditBrand(obj) {
    $("#all").css("display", "none");
    $("#step3").css("display", "inline");
    $("#step2").css("display", "none");
    $("#insertBrand").css("display", "none");
    $("#updataBrand").slideDown();
    $("#EditSCompanyID_U").val(obj.value);
    $.post("/Maintain/UpdateBrand_Sel", { BrandId: obj.value }, function (data) {
        if (data.Funstatus == "0") {
            alert(data.ErrorCode);
        }
        else {
            debugger;
            var item = data.BrandData;
            $("#BrandId_u").val(item.BrandId);
            $("#Name_u").val(item.Name);
            $("#CodeName_u").val(item.CodeName);
            $("#ContactAddress_u").val(item.ContactAddress);
            $("#ContactPerson_u").val(item.ContactPerson);
            $("#ContactTel_u").val(item.ContactTel);
            $("#Country_u").val(item.Country);
            $("#CountryCode_u").val(item.CountryCode);
            $("#LogoUrl_u").val(item.LogoUrl);
            $("#ParentBrandId_u").val(item.ParentBrandId);
            $("#Notes_u").val(item.Notes);
            if (item.EnableERPFunc == "False") {
                document.getElementById("EnableERPFunc0_u").checked = true;
            }
            else {
                document.getElementById("EnableERPFunc1_u").checked = true;
            }
            if (item.EnableBigVndFunc == "False") {
                document.getElementById("EnableBigVndFunc0_u").checked = true;
            }
            else {
                document.getElementById("EnableBigVndFunc1_u").checked = true;
            }
            if (item.EnableReviseQtyFunc == "False") {
                document.getElementById("EnableReviseQtyFunc0_u").checked = true;
            }
            else {
                document.getElementById("EnableReviseQtyFunc1_u").checked = true;
            }
        }
        SelectAll();
    })
}
function funSaveBrand_u() {
    debugger;
    var EnableERPFunc = "";
    if (document.getElementById("EnableERPFunc0_u").checked == true) {
        EnableERPFunc = $("#EnableERPFunc0_u").val();
    }
    else {
        EnableERPFunc = $("#EnableERPFunc1_u").val();
    }
    //if (document.getElementById("EnableERPFunc1").checked == true) {
    //    EnableERPFunc = $("#EnableERPFunc1").val();
    //}
    var EnableBigVndFunc = "";
    if (document.getElementById("EnableBigVndFunc0_u").checked == true) {
        EnableBigVndFunc = $("#EnableBigVndFunc0_u").val();
    }
    else {
        EnableBigVndFunc = $("#EnableBigVndFunc1_u").val();
    }
    //if (document.getElementById("EnableBigVndFunc1").checked == true) {
    //    EnableBigVndFunc = $("#EnableBigVndFunc1").val();
    //}
    var EnableReviseQtyFunc = "";
    if (document.getElementById("EnableReviseQtyFunc0_u").checked == true) {
        EnableReviseQtyFunc = $("#EnableReviseQtyFunc0").val();
    }
    else {
        EnableReviseQtyFunc = $("#EnableReviseQtyFunc1_u").val();
    }
    //if (document.getElementById("EnableReviseQtyFunc1").checked == true) {
    //    EnableReviseQtyFunc = $("#EnableReviseQtyFunc1").val();
    //}
    var BrandId = $("#EditSCompanyID_U").val();
    var data = {
        BrandId: BrandId,
        Name: $("#Name_u").val(),
        CodeName: $("#CodeName_u").val(),
        ContactAddress: $("#ContactAddress_u").val(),
        ContactPerson: $("#ContactPerson_u").val(),
        ContactTel: $("#ContactTel_u").val(),
        Country: $("#Country_u").val(),
        CountryCode: $("#CountryCode_u").val(),
        LogoUrl: $("#LogoUrl_u").val(),
        ParentBrandId: $("#ParentBrandId_u").val(),
        Notes: $("#Notes_u").val(),
        EnableERPFunc: EnableERPFunc,
        EnableBigVndFunc: EnableBigVndFunc,
        EnableReviseQtyFunc: EnableReviseQtyFunc
    };
    $.post("/Maintain/UpdateBrand_up", data, function (data_) {
        if (data_.Funstatus == "0") {
            alert(data_.msg);
        }
        else {
            alert("更新成功");
            $("#all").slideDown();
            $("#insertBrand").css("display", "none");
            $("#updataBrand").css("display", "none");
        }
        SelectAll();
    })
}
//删除操作
function funDeleteBrand(id) {
    debugger;
    if (confirm("确认要删除？") == true) {
        $.post("/Maintain/DelectBrand", { BrandId: id.value }, function (data) {
            if (data.Funstatus == "1") {
                alert("删除成功");
                $.post("/Maintain/QueryBrand", function (data) {
                    $("#BrandId_sel").val("");
                    $("#BrandId_sel").text("");
                    $.each(data.Brandlist, function (i, item) {
                        var BrandList = "";
                        BrandList = "<option value='" + item.Value + "'>" + item.Text + "</option>";
                        $("#BrandId_sel").append(BrandList);
                    })
                })
                SelectAll();
            }
            else {
                alert(data.ErrorCode);
            }
        })
    }
    SelectAll();
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