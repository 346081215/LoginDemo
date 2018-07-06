$(function () {
    //查询
    $("#btnSearch").click(function () {
        $("#nowpage").val(1);
        $("#pc").val(1);
        document.getElementById("nowpage").value = 1;
        $("#Query-Results").css("display", "block");
        funSelectOrderHeaderVarDataName();
    });
    $("#step1").click(function () {
        $("#Query-Results").css("display", "none");
        $("#InsertCountry").css("display", "none");
        $("#BrandType").val("");
        $("#FormatId").val("--All--");
        $("#Query").slideDown();
        $("#step1").removeAttr("style");
        $("#step2").css("display", "none");
        $("#step3").css("display", "none");
        $("#step2").attr("class", "gray-em");
        $("#step1").attr("class", "red-em");
    });
    $("#step2").click(function () {
        $("#Query").css("display", "block");
        $("#InsertCountry").css("display", "none");
        $("#Query-Results").slideDown();
        $("#step1").removeAttr("style");
        $("#step2").removeAttr("style");
        $("#step3").css("display", "none");
        $("#step1").attr("class", "gray-em");
        $("#step2").attr("class", "red-em");
    })

    //添加
    $("#btn_Add").click(function () {
        $("#step1").removeAttr("style");
        $("#step2").removeAttr("style");
        $("#step3").removeAttr("style");
        $("#step1").attr("class", "gray-em");
        $("#step2").attr("class", "gray-em");
        $("#step3").attr("class", "red-em");

        $("#Query").css("display", "block");
        $("#Query-Results").css("display", "block");
        $("#InsertCountry").css("display", "block");
        $("#Order_Add").css("display", "block");
        $("#Order_Edit").css("display", "none");

        $("#BrandTypeAdd").val("");
        $("#FormatIdAdd").val("--All--");
        $("#PrintShopId").val("");
        $("#CustomerPO").val("");
        $("#CustomerId").val("");
        $("#BillToId").val("");
        $("#BillToName").val("");
        $("#BillToAddress").val("");
        $("#BillToContact").val("");
        $("#BillToTel").val("");
        $("#CurrencyId").val("");
        $("#ShipToId").val("");
        $("#ShipToAddressId").val("");
        $("#ShipToName").val("");
        $("#ShipToAddress").val("");
        $("#ShipToContact").val("");
        $("#ShipToTel").val("");
        $("#OOS_Var01").val("");
        $("#OOS_Var02").val("");
        $("#OOS_Var03").val("");
        $("#OOS_Notes").val("");
        $("#PaidByBrand").val("--All--");
        $("#VendorNumber").val("");
        $("#Season").val("");
        $("#StyleNO").val("");
        $("#OrderReference").val("");
        $("#SvcLevel").val("");
    });
    $("#Order_Add").click(function () {
        if ($("#BrandTypeAdd").val() == "") {
            alert("BrandType不能为空！");
        }
        else if ($("#FormatIdAdd").val() == "--All--") {
            alert("FormatId不能为空！");
        }
        else if ($("#PaidByBrand").val() != "") {
            if ($("#PaidByBrand").val() != "true" && $("#PaidByBrand").val() != "false") {
                alert("PaidByBrand必须为true或者false！");
            }
            else {
                funAddOrderHeaderVarDataName();
            }
        }
        else {
            funAddOrderHeaderVarDataName();
        }
    });

    //取消
    $("#Order_Add_Cancel,#Order_Edit_Cancel").click(function () {
        $("#Query").css("display", "block");
        $("#InsertCountry").css("display", "none");
        $("#Query-Results").slideDown();
        $("#step1").removeAttr("style");
        $("#step2").removeAttr("style");
        $("#step3").css("display", "none");
        $("#step1").attr("class", "gray-em");
        $("#step2").attr("class", "red-em");
    });

    //修改
    $("#Order_Edit").click(function () {
        if ($("#PaidByBrand").val() != "") {
            if ($("#PaidByBrand").val() != "true" && $("#PaidByBrand").val() != "false") {
                alert("PaidByBrand必须为true或者false！");
            }
            else {
                funEditOrderHeaderVarDataName();
            }
        }
        else {
            funEditOrderHeaderVarDataName();
        }
    });

    //分页
    $('#PageIndex').click(function () {
        document.getElementById("pc").value = 1;
        document.getElementById("nowpage").value = 1;
        funSelectOrderHeaderVarDataName();
    });
    $('#Pageup').click(function () {
        var nowpage = document.getElementById("nowpage").value;
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) > 1) {
            newpage = parseInt(nowpage) - 1;
            document.getElementById("pc").value = newpage;
            document.getElementById("nowpage").value = newpage;
            funSelectOrderHeaderVarDataName();
        }
    });
    $('#Pagewown').click(function () {
        var nowpage = document.getElementById("nowpage").value;
        var maxpage = parseInt(document.getElementById("PageTotalCount").value);
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) < maxpage) newpage = parseInt(nowpage) + 1;
        document.getElementById("pc").value = newpage;
        document.getElementById("nowpage").value = newpage;
        funSelectOrderHeaderVarDataName();
    });
    $('#PageLast').click(function () {
        var maxpage = parseInt(document.getElementById("PageTotalCount").value);
        document.getElementById("pc").value = maxpage;
        document.getElementById("nowpage").value = maxpage;
        funSelectOrderHeaderVarDataName();
    });
    $('#PageGO').click(function () {
        var nowpage = parseInt(document.getElementById("nowpage").value);
        var maxpage = parseInt(document.getElementById("PageTotalCount").value) + 1;
        if (nowpage > 0 && nowpage < maxpage) {
            document.getElementById("pc").value = document.getElementById("nowpage").value;
            funSelectOrderHeaderVarDataName();
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
function funSelectOrderHeaderVarDataName() {
    $("#step1").removeAttr("style");
    $("#step2").removeAttr("style");
    $("#step1").attr("class", "gray-em");
    $("#step2").attr("class", "red-em");
    var data_ = {
        pc: $("#pc").val(),
        BrandType: $("#BrandType").val(),
        FormatId: $("#FormatId").val()
    };
    $.post("/Maintain/SelectOrderHeaderVarDataName", data_, function (data) {
        var html = "";
        $.each(data, function (i, item) {
            html += "<tr>";
            html += "<td class='center'>" +
                "<button id='Update' class='btn btn-default' type='button' name='Update' onclick='funSelectOrderHeaderVarDataNameId(this)' value='" + item.BrandType + "^" + item.FormatId + "'>Update</button>" + "</td>";
            html += "<td class='center'>" + item.BrandType + "</td>";
            html += "<td class='center'>" + item.FormatId + "</td>";
            html += "<td class='center'>" + item.PrintShopId + "</td>";
            html += "<td class='center'>" + item.CustomerPO + "</td>";
            html += "<td class='center'>" + item.CustomerId + "</td>";
            html += "<td class='center'>" + item.BillToId + "</td>";
            html += "<td class='center'>" + item.BillToName + "</td>";
            html += "<td class='center'>" + item.BillToAddress + "</td>";
            html += "<td class='center'>" + item.BillToContact + "</td>";
            html += "<td class='center'>" + item.BillToTel + "</td>";
            html += "<td class='center'>" + item.CurrencyId + "</td>";
            html += "<td class='center'>" + item.ShipToId + "</td>";
            html += "<td class='center'>" + item.ShipToAddressId + "</td>";
            html += "<td class='center'>" + item.ShipToName + "</td>";
            html += "<td class='center'>" + item.ShipToAddress + "</td>";
            html += "<td class='center'>" + item.ShipToContact + "</td>";
            html += "<td class='center'>" + item.ShipToTel + "</td>";
            html += "<td class='center'>" + item.OOS_Var01 + "</td>";
            html += "<td class='center'>" + item.OOS_Var02 + "</td>";
            html += "<td class='center'>" + item.OOS_Var03 + "</td>";
            html += "<td class='center'>" + item.OOS_Notes + "</td>";
            html += "<td class='center'>" + item.PaidByBrand + "</td>";
            html += "<td class='center'>" + item.VendorNumber + "</td>";
            html += "<td class='center'>" + item.Season + "</td>";
            html += "<td class='center'>" + item.StyleNO + "</td>";
            html += "<td class='center'>" + item.OrderReference + "</td>";
            html += "<td class='center'>" + item.SvcLevel + "</td>";
            html += "</tr>";

            $("#TotalPageCount").html(item.CountId);
            $("#PageTotalCount").val(item.CountId);
            $("#UpdateBrandId").val(item.BrandType);
            $("#UpdateFormatId").val(item.FormatId);
        });
        $("#OrderDetail tbody").html(html);
    });
}

//添加
function funAddOrderHeaderVarDataName() {
    //var paidByBrand;
    //if ($("#PaidByBrand").val() == "--All--") {
    //    paidByBrand = "";
    //}
    //else {
    //    paidByBrand = $("#PaidByBrand").val();
    //}
    var data_ = {
        BrandType: $("#BrandTypeAdd").val(),
        FormatId: $("#FormatIdAdd").val(),
        PrintShopId: $("#PrintShopId").val(),
        CustomerPO: $("#CustomerPO").val(),
        CustomerId: $("#CustomerId").val(),
        BillToId: $("#BillToId").val(),
        BillToName: $("#BillToName").val(),
        BillToAddress: $("#BillToAddress").val(),
        BillToContact: $("#BillToContact").val(),
        BillToTel: $("#BillToTel").val(),
        CurrencyId: $("#CurrencyId").val(),
        ShipToId: $("#ShipToId").val(),
        ShipToAddressId: $("#ShipToAddressId").val(),
        ShipToName: $("#ShipToName").val(),
        ShipToAddress: $("#ShipToAddress").val(),
        ShipToContact: $("#ShipToContact").val(),
        ShipToTel: $("#ShipToTel").val(),
        OOS_Var01: $("#OOS_Var01").val(),
        OOS_Var02: $("#OOS_Var02").val(),
        OOS_Var03: $("#OOS_Var03").val(),
        OOS_Notes: $("#OOS_Notes").val(),
        PaidByBrand: $("#PaidByBrand").val(),
        VendorNumber: $("#VendorNumber").val(),
        Season: $("#Season").val(),
        StyleNO: $("#StyleNO").val(),
        OrderReference: $("#OrderReference").val(),
        SvcLevel: $("#SvcLevel").val()
    }
    $.post("/Maintain/InsertOrderHeaderVarDataName", data_, function (data) {
        //判断添加是否成功
        if (data.SessionStaus == "true" && data.value == null) {
            alert("添加成功")
            funSelectOrderHeaderVarDataName();
            $("#Query").css("display", "block");
            $("#InsertCountry").css("display", "none");
            $("#Query-Results").slideDown();
            $("#step1").removeAttr("style");
            $("#step2").removeAttr("style");
            $("#step3").css("display", "none");
            $("#step1").attr("class", "gray-em");
            $("#step2").attr("class", "red-em");
        } else {
            alert(data.value);
        }
    })
}

//修改
function funSelectOrderHeaderVarDataNameId(id) {
    $("#step1").removeAttr("style");
    $("#step2").removeAttr("style");
    $("#step3").removeAttr("style");
    $("#step1").attr("class", "gray-em");
    $("#step2").attr("class", "gray-em");
    $("#step3").attr("class", "red-em");

    $("#Query").css("display", "block");
    $("#Query-Results").css("display", "block");
    $("#InsertCountry").css("display", "block");
    $("#Order_Add").css("display", "none");
    $("#Order_Edit").css("display", "block");
    $("#BrandTypeAdd").attr("readonly", "readonly");
    $("#FormatIdAdd").attr("readonly", "readonly");

    var arr = id.value.split("^");
    var BrandType = arr[0];
    var FormatId = arr[1];

    var data_ = {
        BrandType: BrandType,
        FormatId: FormatId
    }
    $.post("/Maintain/SelectOrderHeaderVarDataNameId", data_, function (data) {
        $.each(data, function (i, item) {
            $("#BrandTypeAdd").val(item.BrandType);
            $("#FormatIdAdd").val(item.FormatId);
            $("#PrintShopId").val(item.PrintShopId);
            $("#CustomerPO").val(item.CustomerPO);
            $("#CustomerId").val(item.CustomerId);
            $("#BillToId").val(item.BillToId);
            $("#BillToName").val(item.BillToName);
            $("#BillToAddress").val(item.BillToAddress);
            $("#BillToContact").val(item.BillToContact);
            $("#BillToTel").val(item.BillToTel);
            $("#CurrencyId").val(item.CurrencyId);
            $("#ShipToId").val(item.ShipToId);
            $("#ShipToAddressId").val(item.ShipToAddressId);
            $("#ShipToName").val(item.ShipToName);
            $("#ShipToAddress").val(item.ShipToAddress);
            $("#ShipToContact").val(item.ShipToContact);
            $("#ShipToTel").val(item.ShipToTel);
            $("#OOS_Var01").val(item.OOS_Var01);
            $("#OOS_Var02").val(item.OOS_Var02);
            $("#OOS_Var03").val(item.OOS_Var03);
            $("#OOS_Notes").val(item.OOS_Notes);
            $("#PaidByBrand").val(item.PaidByBrand);
            $("#VendorNumber").val(item.VendorNumber);
            $("#Season").val(item.Season);
            $("#StyleNO").val(item.StyleNO);
            $("#OrderReference").val(item.OrderReference);
            $("#SvcLevel").val(item.SvcLevel);

        })
    })
}
function funEditOrderHeaderVarDataName() {
    debugger;
    //var paidByBrand;
    //if ($("#PaidByBrand").val() == "--All--") {
    //    paidByBrand = "";
    //}
    //else {
    //    paidByBrand = $("#PaidByBrand").val();
    //}
    var data_ = {
        BrandType: $("#BrandTypeAdd").val(),
        FormatId: $("#FormatIdAdd").val(),
        PrintShopId: $("#PrintShopId").val(),
        CustomerPO: $("#CustomerPO").val(),
        CustomerId: $("#CustomerId").val(),
        BillToId: $("#BillToId").val(),
        BillToName: $("#BillToName").val(),
        BillToAddress: $("#BillToAddress").val(),
        BillToContact: $("#BillToContact").val(),
        BillToTel: $("#BillToTel").val(),
        CurrencyId: $("#CurrencyId").val(),
        ShipToId: $("#ShipToId").val(),
        ShipToAddressId: $("#ShipToAddressId").val(),
        ShipToName: $("#ShipToName").val(),
        ShipToAddress: $("#ShipToAddress").val(),
        ShipToContact: $("#ShipToContact").val(),
        ShipToTel: $("#ShipToTel").val(),
        OOS_Var01: $("#OOS_Var01").val(),
        OOS_Var02: $("#OOS_Var02").val(),
        OOS_Var03: $("#OOS_Var03").val(),
        OOS_Notes: $("#OOS_Notes").val(),
        PaidByBrand: $("#PaidByBrand").val(),
        VendorNumber: $("#VendorNumber").val(),
        Season: $("#Season").val(),
        StyleNO: $("#StyleNO").val(),
        OrderReference: $("#OrderReference").val(),
        SvcLevel: $("#SvcLevel").val()
    }

    $.post("/Maintain/UpdateOrderHeaderVarDataName", data_, function (data) {
        if (data.SessionStaus == "true" && data.value == null) {
            alert("修改成功")
            funSelectOrderHeaderVarDataName();
            $("#Query").css("display", "block");
            $("#InsertCountry").css("display", "none");
            $("#Query-Results").slideDown();
            $("#step1").removeAttr("style");
            $("#step2").removeAttr("style");
            $("#step3").css("display", "none");
            $("#step1").attr("class", "gray-em");
            $("#step2").attr("class", "red-em");
        } else {
            alert(data.value);
        }
    })

}

