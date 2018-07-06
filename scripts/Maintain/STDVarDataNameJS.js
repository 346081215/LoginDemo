$(function () {
    //默认不显示
    $("#Gridview").css("display", "none");
    $("#paging").css("display", "none");
    $("#InsertCountry").css("display", "none");
    $("#UpdateCountry").css("display", "none");
    //下拉框
    ddl_BrandType();

    //查询
    $("#btn_Select").click(function () {
        if ($("#BrandType").val() == "") {
            alert("BrandType不能为空！");
        }
        else if ($("#FormatId").val() == "--All--") {
            alert("FormatId不能为空！");
        }
        else {
            $("#Gridview").css("display", "block");
            $("#paging").css("display", "block");
            $("#Gridview").slideDown();
            funSelectSTDVarDataName();
        }
    });

    //添加
    $("#btn_Add").click(function () {
        funAdd();
    });
    $("#Stock_Add").click(function () {
        if ($("#BrandTypeAdd").val() == "") {
            alert("BrandType不能为空！");
        }
        else if ($("#FormatIdAdd").val() == "--All--") {
            alert("FormatId不能为空！");
        }
        else {
            funAddSTDVarDataName();
        }
    });

    //取消
    $("#Stock_Cancel").click(function () {
        $("#InsertCountry").css("display", "none");
    });
    $("#Stock_Cancel_Edit").click(function () {
        $("#UpdateCountry").css("display", "none");
    });

    //修改
    $("#Stock_Edit").click(function () {
        funEditSTDVarDataName();
    });


    //分页
    $('#PageIndex').click(function () {
        document.getElementById("pc").value = 1;
        document.getElementById("nowpage").value = 1;
        funSelectSTDVarDataName();
    });
    $('#Pageup').click(function () {
        var nowpage = document.getElementById("nowpage").value;
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) > 1) {
            newpage = parseInt(nowpage) - 1;
            document.getElementById("pc").value = newpage;
            document.getElementById("nowpage").value = newpage;
            funSelectSTDVarDataName();
        }
    });
    $('#Pagewown').click(function () {
        var nowpage = document.getElementById("nowpage").value;
        var maxpage = parseInt(document.getElementById("PageTotalCount").value);
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) < maxpage) newpage = parseInt(nowpage) + 1;
        document.getElementById("pc").value = newpage;
        document.getElementById("nowpage").value = newpage;
        funSelectSTDVarDataName();
    });
    $('#PageLast').click(function () {
        var maxpage = parseInt(document.getElementById("PageTotalCount").value);
        document.getElementById("pc").value = maxpage;
        document.getElementById("nowpage").value = maxpage;
        funSelectSTDVarDataName();
    });
    $('#PageGO').click(function () {
        var nowpage = parseInt(document.getElementById("nowpage").value);
        var maxpage = parseInt(document.getElementById("PageTotalCount").value) + 1;
        if (nowpage > 0 && nowpage < maxpage) {
            document.getElementById("pc").value = document.getElementById("nowpage").value;
            funSelectSTDVarDataName();
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

//下拉框
function ddl_BrandType() {
    $.post("/Maintain/STDVarDataName", null, function (data) {
        var htmlBrandType = "";
        $.each(data, function (i, item) {
            htmlBrandType += "<select>";
            htmlBrandType = "<option>" + item.Text + "</option>";
            htmlBrandType += "</select>";
        });
        $("#BrandType,#BrandTypeAdd").html(htmlBrandType);

        var htmlFormatId = "";
        $.each(data, function (i, item) {
            htmlFormatId += "<select>";
            htmlFormatId = "<option>" + item.Value + "</option>";
            htmlFormatId += "</select>";
        });
        $("#FormatId,#FormatIdAdd").html(htmlFormatId);
    });
}

//查询
function funSelectSTDVarDataName() {
    var data_ = {
        pc: $("#pc").val(),
        BrandType: $("#BrandType").val(),
        FormatId: $("#FormatId").val()
    }
    $.post("/Maintain/SelectSTDVarDataName", data_, function (data) {

        var html = "";
        $.each(data, function (i, item) {
            html += "<tr>";
            html += "<td class='center'>" + item.varString + "</td>";
            html += "<td class='center'>" + item.varValues + "</td>";
            html += "<td class='center'>" +
                "<button type='button' id='Update' name='Update' class='btn btn-default' onclick='funSelectSTDVarDataNameVar(this)' value='" + item.varString + "'>Edit</button>" +
                "<button type='button' id='Delete' name='Delete' style='margin-left:5px;' class='btn btn-default' onclick='funDeleteSTDVarDataName(this)' value='" + item.varString + "'>Delete</button>"
                + "</td>";
            html += "</tr>";

            $("#TotalPageCount").html(item.CountId);
            $("#PageTotalCount").val(item.CountId);
            $("#UpdateId").val(item.varValues);
        });
        $("#Gridview tbody").html(html);
    });

}

//添加
function funAdd() {
    $("#InsertCountry").css("display", "block");
    $("#BrandTypeAdd").val("");
    $("#FormatIdAdd").val("--All--");
}
function funAddSTDVarDataName() {
    var data_ = {
        BrandType: $("#BrandTypeAdd").val(),
        FormatId: $("#FormatIdAdd").val()
    }
    $.post("/Maintain/InsertSTDVarDataName", data_, function (data) {
        //判断添加是否成功
        if (data.SessionStaus == "true" && data.value == null) {
            alert("添加成功")
            funSelectSTDVarDataName();
            $("#InsertCountry").css("display", "none");
        } else {
            alert(data.value);
        }
    })

}

//修改
function funSelectSTDVarDataNameVar(varString) {
    $("#UpdateCountry").css("display", "block");
    var data_ = {
        varString: varString.value,
        BrandType: $("#BrandType").val(),
        FormatId: $("#FormatId").val()
    }
    $.post("/Maintain/Select_STDVarDataName_VarString", data_, function (data) {
        debugger;
        $.each(data, function (i, item) {
            debugger;
            $("#DetailSYSName").val(varString.value);
            $("#DetailENName").val(item.varValues);
        })
    })
}
function funEditSTDVarDataName() {
    var data_ = {
        varString: $("#DetailSYSName").val(),
        varValues: $("#DetailENName").val(),
        BrandType: $("#BrandType").val(),
        FormatId: $("#FormatId").val()
    }

    $.post("/Maintain/UpdateSTDVarDataName", data_, function (data) {
        if (data.SessionStaus == "true" && data.value == null) {
            alert("修改成功")
            funSelectSTDVarDataName();
            $("#UpdateCountry").css("display", "none");
        } else {
            alert(data.value);
        }
    })

}

//删除
function funDeleteSTDVarDataName(varString) {
    if (confirm("确定删除数据")) {
        var data_ = {
            varString: varString.value,
            varValues: $("#UpdateId").val(),
            BrandType: $("#BrandType").val(),
            FormatId: $("#FormatId").val()
        }

        $.post("/Maintain/DeleteSTDVarDataName", data_, function (data) {
            debugger;
            if (data.SessionStaus == "true" && data.value == null) {
                alert("删除成功")
                funSelectSTDVarDataName();
            } else {
                alert(data.value);
            }
        })
    }
}