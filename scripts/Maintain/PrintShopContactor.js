$(function () {
    //默认不显示
    $("#PrintShopContactor_Export").css("display", "none");
    $("#Gridview").css("display", "none");
    $("#paging").css("display", "none");
    $("#Insert").css("display", "none");

    //分页，默认第一页
    $("#nowpage").val(1);
    $("#pc").val(1);

    //查询
    $('#PrintShopContactor_Select').click(function () {
        $("#PrintShopContactor_Export").css("display", "block");
        $("#Gridview").css("display", "block");
        $("#paging").css("display", "block");
        funSelectPrintShopContaor();
    });

    //添加
    $("#PrintShopContactor_Add").click(function () {
        funAdd();
    });
    $("#Add").click(function () {
        ///^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/  单个邮箱验证
        var a = new RegExp(/^(([A-Za-z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6}\;))*([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})$/);
        var data_ = {
            PrintShop: $("#PrintShop").val(),
            oos_telephone: $("#oos_telephone").val(),
            oos_contacter: $("#oos_contacter").val(),
            oos_mailaddress: $("#oos_mailaddress").val()
        }
        if (data_.PrintShop.replace(/(^s*)|(s*$)/g, "").length == 0) {
            alert('PrintShop不能为空');
        }
        else if (data_.oos_telephone.replace(/(^s*)|(s*$)/g, "").length == 0) {
            alert('Tel不能为空');
        }
        else if (data_.oos_contacter.replace(/(^s*)|(s*$)/g, "").length == 0) {
            alert('Contactor不能为空');
        }
        //else if (data_.oos_mailaddress.replace(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/g, "").length == 0) {
        //    alert('Email不能为空');
        //}
        else if (!a.test(data_.oos_mailaddress)) {
            debugger;
            alert('请输入正确的Email格式');
        }
        else {
            funAddPrintShopContaor();
        }
    });

    //修改
    $("#PrintShopContactor_Edit").click(function () {
        var a = new RegExp(/^(([A-Za-z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6}\;))*([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})$/);
        var data_ = {
            PrintShop: $("#PrintShop").val(),
            oos_telephone: $("#oos_telephone").val(),
            oos_contacter: $("#oos_contacter").val(),
            oos_mailaddress: $("#oos_mailaddress").val(),
        }
        if ($("#PrintShop").val() == "--All--") {
            alert('PrintShop不能为空');
        }
        else if (data_.oos_telephone.replace(/(^s*)|(s*$)/g, "").length == 0) {
            alert('Tel不能为空');
        }
        else if (data_.oos_contacter.replace(/(^s*)|(s*$)/g, "").length == 0) {
            alert('Contactor不能为空');
        }
        else if (!a.test(data_.oos_mailaddress)) {
            alert('请输入正确的Email格式');
        }
        else {
            funEditPrintShopContaor();
            funSelectPrintShopContaor();
        }
    });

    //取消
    $("#PrintShopContactor_Cancel").click(function () {
        $("#Insert").css("display", "none");
    });

    //分页
    $('#PageIndex').click(function () {
        document.getElementById("pc").value = 1;
        document.getElementById("nowpage").value = 1;
        funSelectProductStockBaseSetCodeWhere();
    });
    $('#Pageup').click(function () {
        var nowpage = document.getElementById("nowpage").value;
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) > 1) {
            newpage = parseInt(nowpage) - 1;
            document.getElementById("pc").value = newpage;
            document.getElementById("nowpage").value = newpage;
            funSelectProductStockBaseSetCodeWhere();
        }
    });
    $('#Pagewown').click(function () {
        var nowpage = document.getElementById("nowpage").value;
        var maxpage = parseInt(document.getElementById("PageTotalCount").value);
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) < maxpage) newpage = parseInt(nowpage) + 1;
        document.getElementById("pc").value = newpage;
        document.getElementById("nowpage").value = newpage;
        funSelectProductStockBaseSetCodeWhere();
    });
    $('#PageLast').click(function () {
        var maxpage = parseInt(document.getElementById("PageTotalCount").value);
        document.getElementById("pc").value = maxpage;
        document.getElementById("nowpage").value = maxpage;
        funSelectProductStockBaseSetCodeWhere();
    });
    $('#PageGO').click(function () {
        var nowpage = parseInt(document.getElementById("nowpage").value);
        var maxpage = parseInt(document.getElementById("PageTotalCount").value) + 1;
        if (nowpage > 0 && nowpage < maxpage) {
            document.getElementById("pc").value = document.getElementById("nowpage").value;
            funSelectProductStockBaseSetCodeWhere();
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

//查询
function funSelectPrintShopContaor() {
    var data_ = {
        pc: $("#pc").val(),
        PrintShop: $("#PrintShopId").val(),
    }

    $.post("/Maintain/SelectPrintShopContactor", data_, function (data) {
        var html = "";
        $.each(data, function (i, item) {
            html += "<tr>";
            html += "<td class='center'>" + "<button type='button' id='Update' name='Update' style='margin-left:5px;margin-right:5px;' class='btn btn-default' onclick='funSelectPrintShopContaorId(this)' value='" + item.ID + "' >Edit</button>" + "</td>";
            html += "<td class='center'>" + item.PrintShop + "</td>";
            html += "<td class='center'>" + item.oos_telephone + "</td>";
            html += "<td class='center'>" + item.oos_contacter + "</td>";
            html += "<td class='center'>" + item.oos_mailaddress + "</td>";
            html += "</tr>";

            $("#TotalPageCount").html(item.CountId);
            $("#PageTotalCount").val(item.CountId);
        });
        $("#Code_Table tbody").html(html);
    });
}

//添加
function funAdd() {
    $("#Insert").css("display", "block");
    $("#PrintShopContactor_Edit").css("display", "none");
    $("#Add").css("display", "block");
    $("#PrintShop").attr("disabled", false);

    //添加之前先清空文本框中的值
    $("#PrintShop").val("");
    $("#oos_telephone").val("");
    $("#oos_contacter").val("");
    $("#oos_mailaddress").val("");
}
function funAddPrintShopContaor() {
    debugger;
    var data_ = {
        PrintShop: $("#PrintShop").val(),
        oos_telephone: $("#oos_telephone").val(),
        oos_contacter: $("#oos_contacter").val(),
        oos_mailaddress: $("#oos_mailaddress").val()
    }
    $.post("/Maintain/InsertPrintShopContactor", data_, function (data) {
        //判断添加是否成功
        if (data.SessionStaus == "true" && data.value == null) {
            alert("添加成功")
            $("#Insert").css("display", "none");
            $("#Gridview").css("display", "block");
            $("#paging").css("display", "block");
            funSelectPrintShopContaor();
        } else {
            alert(data.value);
        }
    })
}


//绑定数据到文本框
function funSelectPrintShopContaorId(Id) {
    debugger;
    $("#Insert").css("display", "block");
    $("#PrintShopContactor_Edit").css("display", "block");
    $("#Add").css("display", "none");
    $("#PrintShop").attr("disabled", true);
    var data_ = { ID: Id.value }
    $.post("/Maintain/SelectPrintShopContactorId", data_, function (data) {
        $.each(data, function (i, item) {
            $("#UpdateId").val(Id.value);
            $("#PrintShop").val(item.PrintShopId);
            $("#oos_telephone").val(item.oos_telephone);
            $("#oos_contacter").val(item.oos_contacter);
            $("#oos_mailaddress").val(item.oos_mailaddress);
        })
    })
}

//修改
function funEditPrintShopContaor(Id) {
    var data_ = {
        ID: $("#UpdateId").val(),
        PrintShop: $("#PrintShop").val(),
        oos_telephone: $("#oos_telephone").val(),
        oos_contacter: $("#oos_contacter").val(),
        oos_mailaddress: $("#oos_mailaddress").val(),
    }
    $.post("/Maintain/UpdatePrintShopContactor", data_, function (data) {
        if (data.SessionStaus == "true" && data.value == null) {
            alert("修改成功")
            funSelectPrintShopContaor();
            $("#Insert").css("display", "none");
        } else {
            alert(data.value);
        }
    })
}