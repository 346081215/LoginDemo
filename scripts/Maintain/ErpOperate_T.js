$(function () {
    //下拉框
    ddlBrand();
    var htmlCategory = "<select><option class='center'>--All--</option>";
    $("#ddlCategory,#OOS_maxprodcat").html(htmlCategory);
    $('#ddlBrand').change(function () {
        ddlCategory();
    });
    $('#Brand').change(function () {
        ddlOOS_maxprodcat();
    });

    //默认查询，操作，不显示
    $("#Gridview").css("display", "none");
    $("#paging").css("display", "none");
    $("#Insert").css("display", "none");

    //查询
    $('#ErpOperate_T_Select').click(function () {
        $("#Gridview").css("display", "block");
        $("#paging").css("display", "block");

        funSelectErpOperate_T();
    });

    //添加
    $("#ErpOperate_T_Add").click(function () {
        funAdd();
    });
    $("#ErpOperate_Add").click(function () {
        var data_ = {
            Brand: $("#Brand").val(),
            OOS_maxprodcat: $("#OOS_maxprodcat").val(),
            ErpOperate: $("#ErpOperate").val(),
            OtherErpNo: $("#OtherErpNo").val(),
            PsTplCode_Cn: $("#PsTplCode_Cn").val(),
            PsTplCode_En: $("#PsTplCode_En").val(),
            PsTplCode_EUR: $("#PsTplCode_EUR").val(),
            PsTplCode_LC: $("#PsTplCode_LC").val(),
            ProductionTblCode: $("#ProductionTblCode").val(),
            Business_People: $("#Business_People").val(),
            Business_Autograph: $("#path").val(),
        }
        if ($("#Brand").val() == "--All--") {
            alert('Brand不能为空');
        }
        else if ($("#OOS_maxprodcat").val() == "--All--") {
            alert('Category不能为空');
        }
        else if (data_.ErpOperate.replace(/(^s*)|(s*$)/g, "").length == 0) {
            alert('Erp录入人员不能为空');
        }
        else if (data_.OtherErpNo.replace(/(^s*)|(s*$)/g, "").length == 0) {
            alert('其他费用料号不能为空');
        }
        else if (data_.PsTplCode_Cn.replace(/(^s*)|(s*$)/g, "").length == 0) {
            alert('中文购销合同模板代号不能为空');
        }
        else if (data_.PsTplCode_En.replace(/(^s*)|(s*$)/g, "").length == 0) {
            alert('英文购销合同模板代号不能为空');
        }
        else if (data_.PsTplCode_LC.replace(/(^s*)|(s*$)/g, "").length == 0) {
            alert('LC购销合同模板代号不能为空');
        }
        else if (data_.ProductionTblCode.replace(/(^s*)|(s*$)/g, "").length == 0) {
            alert('生产通知书模板代号不能为空');
        }
        else if (data_.Business_People.replace(/(^s*)|(s*$)/g, "").length == 0) {
            alert('经办业务不能为空');
        }
        else if (data_.Business_Autograph.replace(/(^s*)|(s*$)/g, "").length == 0) {
            alert('签名图片路径不能为空');
        }
        else {
            funAddErpOperate_T();
        }
    });

    //修改
    $("#ErpOperate_Edit").click(function () {
        var data_ = {
            Brand: $("#Brand").val(),
            OOS_maxprodcat: $("#OOS_maxprodcat").val(),
            ErpOperate: $("#ErpOperate").val(),
            OtherErpNo: $("#OtherErpNo").val(),
            PsTplCode_Cn: $("#PsTplCode_Cn").val(),
            PsTplCode_En: $("#PsTplCode_En").val(),
            PsTplCode_EUR: $("#PsTplCode_EUR").val(),
            PsTplCode_LC: $("#PsTplCode_LC").val(),
            ProductionTblCode: $("#ProductionTblCode").val(),
            Business_People: $("#Business_People").val(),
            Business_Autograph: $("#path").val(),
        }
        if ($("#Brand").val() == "--All--") {
            alert('Brand不能为空');
        }
        else if ($("#OOS_maxprodcat").val() == "--All--") {
            alert('Category不能为空');
        }
        else if (data_.ErpOperate.replace(/(^s*)|(s*$)/g, "").length == 0) {
            alert('Erp录入人员不能为空');
        }
        else if (data_.OtherErpNo.replace(/(^s*)|(s*$)/g, "").length == 0) {
            alert('其他费用料号不能为空');
        }
        else if (data_.PsTplCode_Cn.replace(/(^s*)|(s*$)/g, "").length == 0) {
            alert('中文购销合同模板代号不能为空');
        }
        else if (data_.PsTplCode_En.replace(/(^s*)|(s*$)/g, "").length == 0) {
            alert('英文购销合同模板代号不能为空');
        }
        else if (data_.PsTplCode_LC.replace(/(^s*)|(s*$)/g, "").length == 0) {
            alert('LC购销合同模板代号不能为空');
        }
        else if (data_.ProductionTblCode.replace(/(^s*)|(s*$)/g, "").length == 0) {
            alert('生产通知书模板代号不能为空');
        }
        else if (data_.Business_People.replace(/(^s*)|(s*$)/g, "").length == 0) {
            alert('经办业务不能为空');
        }
        else if (data_.Business_Autograph.replace(/(^s*)|(s*$)/g, "").length == 0) {
            alert('签名图片路径不能为空');
        }
        else {
            funEditErpOperate_T();
        }
    });

    //返回
    $("#ErpOperate_Cancel").click(function () {
        $("#Insert").css("display", "none");
        $("#cha").css("display", "block");
    });

    //分页
    $('#PageIndex').click(function () {
        document.getElementById("pc").value = 1;
        document.getElementById("nowpage").value = 1;
        funSelectErpOperate_T();
    });
    $('#Pageup').click(function () {
        var nowpage = document.getElementById("nowpage").value;
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) > 1) {
            newpage = parseInt(nowpage) - 1;
            document.getElementById("pc").value = newpage;
            document.getElementById("nowpage").value = newpage;
            funSelectErpOperate_T();
        }
    });
    $('#Pagewown').click(function () {
        var nowpage = document.getElementById("nowpage").value;
        var maxpage = parseInt(document.getElementById("PageTotalCount").value);
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) < maxpage) newpage = parseInt(nowpage) + 1;
        document.getElementById("pc").value = newpage;
        document.getElementById("nowpage").value = newpage;
        funSelectErpOperate_T();
    });
    $('#PageLast').click(function () {
        var maxpage = parseInt(document.getElementById("PageTotalCount").value);
        document.getElementById("pc").value = maxpage;
        document.getElementById("nowpage").value = maxpage;
        funSelectErpOperate_T();
    });
    $('#PageGO').click(function () {
        var nowpage = parseInt(document.getElementById("nowpage").value);
        var maxpage = parseInt(document.getElementById("PageTotalCount").value) + 1;
        if (nowpage > 0 && nowpage < maxpage) {
            document.getElementById("pc").value = document.getElementById("nowpage").value;
            funSelectErpOperate_T();
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

//下拉框Brand
function ddlBrand() {
    $.post("/Maintain/ErpOperateMaintain_T_SelectBrand", null, function (data) {
        var html = "";
        $.each(data, function (i, item) {
            html += "<select>";
            html += "<option class='center'>" + item.Brand + "</option>";
            html += "</select>";
        });
        $("#ddlBrand,#Brand").html(html);
    });
}

//查询下拉框ddlCategory
function ddlCategory() {
    var data_ = { Brand: $("#ddlBrand").val() }
    $.post("/Maintain/ErpOperateMaintain_T_SelectCategory", data_, function (data) {
        var html = "<option class='center'>--All--</option>";
        $.each(data, function (i, item) {
            html += "<option class='center'>" + item.OOS_maxprodcat + "</option>";
        });
        $("#ddlCategory").html(html);
    });
}

//操作下拉框ddlCategory
function ddlOOS_maxprodcat() {
    var data_ = { Brand: $("#Brand").val() }
    $.post("/Maintain/ErpOperateMaintain_T_SelectCategory", data_, function (data) {
        var html = "<option class='center'>--All--</option>";
        $.each(data, function (i, item) {
            html += "<option class='center' value='" + item.OOS_maxprodcat + "'>" + item.OOS_maxprodcat + "</option>";
        });
        $("#OOS_maxprodcat").html(html);
    });
}

//查询
function funSelectErpOperate_T() {
    var data_ = {
        pc: $("#pc").val(),
        Brand: $("#ddlBrand").val(),
        OOS_maxprodcat: $("#ddlCategory").val(),
        ErpOperate: $("#ErpOperate_T").val()
    }

    $.post("/Maintain/SelectErpOperateMaintain_T", data_, function (data) {
        var html = "";
        $.each(data, function (i, item) {
            html += "<tr>";
            html += "<td class='center'>"
                + "<button type='button' id='Update' name='Update' class='btn btn-default' onclick='funSelectErpOperate_T_Id(this)' value='" + item.Id + "'>Edit</button>"
                + "<button type='button' id='Delete' name='Delete' style='margin-left:5px;' class='btn btn-default' onclick='funDeleteErpOperate_T(this)' value='" + item.Id + "'>Delete</button>"
                + "</td>";
            html += "<td class='center'>" + item.Brand + "</td>";
            html += "<td class='center'>" + item.OOS_maxprodcat + "</td>";
            html += "<td class='center'>" + item.ErpOperate + "</td>";
            html += "<td class='center'>" + item.OtherErpNo + "</td>";
            html += "<td class='center'>" + item.PsTplCode_Cn + "</td>";
            html += "<td class='center'>" + item.PsTplCode_En + "</td>";
            html += "<td class='center'>" + item.PsTplCode_EUR + "</td>";
            html += "<td class='center'>" + item.PsTplCode_LC + "</td>";
            html += "<td class='center'>" + item.ProductionTblCode + "</td>";
            html += "<td class='center'>" + item.Business_People + "</td>";
            html += "<td class='center'><a href='" + item.Business_Autograph + "'>查看签名图片</a></td>";
            html += "</tr>";

            $("#TotalPageCount").html(item.CountId);
            $("#PageTotalCount").val(item.CountId);
        });
        $("#Code_Table tbody").html(html);
    });
}

//添加
function funAdd() {
    $("#cha").css("display", "none");
    $("#Gridview").css("display", "none");
    $("#paging").css("display", "none");

    $("#Insert").css("display", "block");
    $("#ErpOperate_Add").css("display", "block");
    $("#ErpOperate_Edit").css("display", "none");

    //添加之前先清空文本框中的值
    $("#Brand").val("--All--");
    ddlOOS_maxprodcat();
    $("#OOS_maxprodcat").val("--All--");
    $("#ErpOperate").val("");
    $("#OtherErpNo").val("");
    $("#PsTplCode_Cn").val("");
    $("#PsTplCode_En").val("");
    $("#PsTplCode_EUR").val("");
    $("#PsTplCode_LC").val("");
    $("#ProductionTblCode").val("");
    $("#Business_People").val("");
    $("#path").val("");
}
function funAddErpOperate_T() {
    var data_ = {
        Brand: $("#Brand").val(),
        OOS_maxprodcat: $("#OOS_maxprodcat").val(),
        ErpOperate: $("#ErpOperate").val(),
        OtherErpNo: $("#OtherErpNo").val(),
        PsTplCode_Cn: $("#PsTplCode_Cn").val(),
        PsTplCode_En: $("#PsTplCode_En").val(),
        PsTplCode_EUR: $("#PsTplCode_EUR").val(),
        PsTplCode_LC: $("#PsTplCode_LC").val(),
        ProductionTblCode: $("#ProductionTblCode").val(),
        Business_People: $("#Business_People").val(),
        Business_Autograph: $("#path").val(),
    }
    $.post("/Maintain/InsertErpOperateMaintain_T", data_, function (data) {
        //判断添加是否成功
        if (data.SessionStaus == "true" && data.value == null) {
            alert("添加成功")
            funSelectErpOperate_T();
            $("#Insert").css("display", "none");
            $("#cha").css("display", "block");

            $("#Brand").val("--All--");
            $("#OOS_maxprodcat").val("--All--");
            $("#ErpOperate").val("");
            $("#OtherErpNo").val("");
            $("#PsTplCode_Cn").val("");
            $("#PsTplCode_En").val("");
            $("#PsTplCode_EUR").val("");
            $("#PsTplCode_LC").val("");
            $("#ProductionTblCode").val("");
            $("#Business_People").val("");
            $("#path").val("");
        } else {
            alert(data.value);
        }
    })
}

//绑定数据到文本框
function funSelectErpOperate_T_Id(Id) {
    $("#Insert").css("display", "block");
    $("#ErpOperate_Add").css("display", "none");
    $("#ErpOperate_Edit").css("display", "block");

    var data_ = { Id: Id.value }
    $.post("/Maintain/SelectErpOperateMaintain_T_Id", data_, function (data) {
        $.each(data, function (i, item) {
            $("#UpdateId").val(Id.value);
            $("#Brand").val(item.Brand);
            //ddlOOS_maxprodcat();
            //$("#OOS_maxprodcat").val(item.OOS_maxprodcat);
            //$("#OOS_maxprodcat").html("<option class='center' value='" + item.OOS_maxprodcat + "'>" + item.OOS_maxprodcat + "</option>");
            var data_ads = { Brand: $("#Brand").val() }
            $.post("/Maintain/ErpOperateMaintain_T_SelectCategory", data_ads, function (data_ads) {
                var html = "<option class='center'>--All--</option>";
                $.each(data_ads, function (i, items) {
                    if (items.OOS_maxprodcat == item.OOS_maxprodcat) {
                        html += "<option class='center' selected='selected' value='" + items.OOS_maxprodcat + "'>" + items.OOS_maxprodcat + "</option>";
                    } else {
                        html += "<option class='center' value='" + items.OOS_maxprodcat + "'>" + items.OOS_maxprodcat + "</option>";
                    }
                });
                $("#OOS_maxprodcat").html(html);
            });

            $("#ErpOperate").val(item.ErpOperate);
            $("#OtherErpNo").val(item.OtherErpNo);
            $("#PsTplCode_Cn").val(item.PsTplCode_Cn);
            $("#PsTplCode_En").val(item.PsTplCode_En);
            $("#PsTplCode_EUR").val(item.PsTplCode_EUR);
            $("#PsTplCode_LC").val(item.PsTplCode_LC);
            $("#ProductionTblCode").val(item.ProductionTblCode);
            $("#Business_People").val(item.Business_People);
            $("#path").val(item.Business_Autograph);

        })
    })
}

//修改
function funEditErpOperate_T() {
    var data_ = {
        Id: $("#UpdateId").val(),
        Brand: $("#Brand").val(),
        OOS_maxprodcat: $("#OOS_maxprodcat").val(),
        ErpOperate: $("#ErpOperate").val(),
        OtherErpNo: $("#OtherErpNo").val(),
        PsTplCode_Cn: $("#PsTplCode_Cn").val(),
        PsTplCode_En: $("#PsTplCode_En").val(),
        PsTplCode_EUR: $("#PsTplCode_EUR").val(),
        PsTplCode_LC: $("#PsTplCode_LC").val(),
        ProductionTblCode: $("#ProductionTblCode").val(),
        Business_People: $("#Business_People").val(),
        Business_Autograph: $("#path").val(),
    }

    $.post("/Maintain/UpdateErpOperateMaintain_T", data_, function (data) {
        if (data.SessionStaus == "true" && data.value == null) {
            alert("修改成功")
            funSelectErpOperate_T();
            $("#Insert").css("display", "none");
        } else {
            alert(data.value);
        }
    })
}

//删除
function funDeleteErpOperate_T(Id) {

    if (confirm("确定删除数据")) {
        var data_ = { Id: Id.value }

        $.post("/Maintain/DeleteOperateMaintain_T", data_, function (data) {
            if (data.SessionStaus == "true" && data.value == null) {
                alert("删除成功")
                funSelectErpOperate_T();
                $("#Insert").css("display", "none");
            } else {
                alert(data.value);
            }
        })
    }

}