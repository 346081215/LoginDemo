$(function () {
    //默认不显示文本框
    $("#InsertCountry").css("display", "none");
    $("#UpdateCountry").css("display", "none");

    //下拉框默认值
    ddlProductERPNO();
    ddlProductCode();
    ddlBrandId();
    $('#OperateType').change(function () {
        var myString = $("#OperateType").val();
        var w = myString.indexOf("(");
        var x = myString.indexOf(")");
        ddlOperateTypeSub_cnen(myString.substring(w + 1, x));
    });
    ddlCategory();
    $('#Category').change(function () {
        ddlMaximProdCateName($("#Category").val());
    });

    //分页，默认第一页
    $("#nowpage").val(1);
    $("#pc").val(1);

    //查询
    funSelectProductStockBaseSetCodeWhere();

    //条件查询
    $('#btn_Select').click(function () {
        funSelectProductStockBaseSetCodeWhere();
    });

    //添加
    $("#btn_Add").click(function () {
        funAdd();
    });
    $('#ProductCode').change(function () {
        funAddProduct($("#ProductCode").val());
    });
    $("#Stock_Add").click(function () {
        var data_ = {
            ProductERPNO: $("#Product").val(),
            ProductCustNO: $("#ProductCustNO").val(),
            BasePaperCode: $("#BasePaperCode").val(),
            BasePaperERPNO: $("#BasePaperERPNO").val(),
            BasePaperCustNO: $("#BasePaperCustNO").val(),
            StockStartQty: $("#StockStartQty").val(),
            StockCurrentQty: $("#StockCurrentQty").val(),
            Notes: $("#Notes").val(),
            StockDesc: $("#StockDesc").val()
        }
        if ($("#BrandId").val() == "--All--") {
            alert('BrandId不能为空');
        }
        else if ($("#PrintShopId").val() == "") {
            alert('PrintShop不能为空');
        }
        else if ($("#ProductCode").val() == "--All--") {
            alert('ProductCode不能为空');
        }
        else if (data_.ProductERPNO.replace(/(^s*)|(s*$)/g, "").length == 0) {
            alert('ProductERPNO不能为空');
        }
        else if (data_.ProductCustNO.replace(/(^s*)|(s*$)/g, "").length == 0) {
            alert('ProductCustNO不能为空');
        }
        else if (data_.BasePaperCode.replace(/(^s*)|(s*$)/g, "").length == 0) {
            alert('BasePaperCode不能为空');
        }
        else if (data_.BasePaperERPNO.replace(/(^s*)|(s*$)/g, "").length == 0) {
            alert('BasePaperERPNO不能为空');
        }
        else if (data_.BasePaperCustNO.replace(/(^s*)|(s*$)/g, "").length == 0) {
            alert('BasePaperCustNO不能为空');
        }
        else if (data_.StockStartQty.replace(/(^s*)|(s*$)/g, "").length == 0) {
            alert('StockStartQty不能为空');
        }
        else if (!(/(^[1-9]\d*$)/.test(data_.StockStartQty))) {
            alert("StockStartQty必须是数字");
        }
        else {
            funAddProductStockBaseSetCode();
            funSelectProductStockBaseSetCodeWhere();
        }
    });

    //Stock Adjust(库存调整)
    $("#Stock_Edit").click(function () {
        if ($("#Brandid").val() == "--All--") {
            alert('Brand不能为空');
        }
        else if ($("#PrintShopId2").val() == "") {
            alert('PrintShop不能为空');
        }
        else if ($("#OperateType").val() == "--All--") {
            alert('StockType(类型)不能为空');
        }
        else if ($("#OperateTypeSub_cnen").val() == "--All--") {
            alert('Notes(备注)不能为空');
        }
       
        else if ($("#BasePaperCodeMaxim").val() == "--All--") {
            alert('Material(半成品料号)不能为空');
        }
        else if ($("#QTY").val().replace(/(^s*)|(s*$)/g, "").length == 0) {
            alert('QTY不能为空');
        }
        else if (!(/(^(-)?[1-9][0-9]*$)/.test($("#QTY").val()))) {
            alert("StockStartQty必须是数字");
        }
        else if ($("#OperateType").val() == "Adjusting(调整)" && $("#OperateTypeSub_cnen").val() == "lost unit(产品损耗)" && $("#QTY").val() > 0) {
            alert("当前用户选择的操作为库存调整，StockStartQty必须是负数");
        }
        else if ($("#OperateType").val() == "Adjusting(调整)" && $("#OperateTypeSub_cnen").val() == "replenishment (补货)" && $("#QTY").val() > 0) {
            alert("当前用户选择的操作为库存调整，StockStartQty必须是负数");
        }
        else {
            funEditProductStockBaseSetCode();
            funSelectProductStockBaseSetCodeWhere();
        }
    });

    //清空
    $("#Stock_Cancel").click(function () {
        $("#InsertCountry").css("display", "none");
    });
    $("#Stock_Cancel_Edit").click(function () {
        $("#UpdateCountry").css("display", "none");
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

//下拉框ProductERPNO
function ddlProductERPNO() {
    $.post("/Stock/ProductStockBaseSetProductERPNO", null, function (data) {
        var html = " <select><option class='center' value=''>--All--</option>";
        $.each(data, function (i, item) {
            html += "<select>";
            html += "<option class='center'>" + item.ProductERPNO + "</option>";
            html += "</select>";
        });
        $("#ProductERPNO").html(html);
    });
}

//下拉框ProductCode
function ddlProductCode() {
    $.post("/Stock/ProductStockBaseSetProductERPNO", null, function (data) {
        var html = " <select><option class='center'>--All--</option>";
        $.each(data, function (i, item) {
            html += "<select>";
            html += "<option class='center' value='" + item.ProductCode_GetBrand + "'>" + item.ProductCode + "</option>";
            html += "</select>";
        });
        $("#ProductCode").html(html);
    });
}

//下拉框BrandId
function ddlBrandId() {
    $.post("/Stock/ProductStockBaseSetBrandId", null, function (data) {
        var html = "";
        $.each(data, function (i, item) {
            html += "<select>";
            html += "<option class='center'>" + item.BrandId + "</option>";
            html += "</select>";
        });
        $("#BrandId").html(html);

        var htmlBrandType = "";
        $.each(data, function (i, item) {
            htmlBrandType += "<select>";
            htmlBrandType += "<option class='center'>" + item.BrandType + "</option>";
            htmlBrandType += "</select>";
        });
        $("#BrandType").html(htmlBrandType);
    });
}

//下拉框OperateTypeSub_cnen
function ddlOperateTypeSub_cnen(OperateType) {
    var data_ = { OperateType: OperateType };
    $.post("/Stock/ProductStockBaseSetOperateTypeSub_cnen", data_, function (data) {
        var html = " <select><option class='center'>--All--</option>";
        $.each(data, function (i, item) {
            html += "<select>";
            html += "<option class='center'>" + item.OperateTypeSub_cnen + "</option>";
            html += "</select>";
        });
        $("#OperateTypeSub_cnen").html(html);
    });
}

//下拉框Category
function ddlCategory() {
    $.post("/Stock/ProductStockBaseSetCategory", null, function (data) {
        var html = " <select><option class='center'>--All--</option>";
        $.each(data, function (i, item) {
            html += "<select>";
            html += "<option class='center'>" + item.MaximProdCateName + "</option>";
            html += "</select>";
        });
        $("#Category").html(html);
    });
}

//下拉框MaximProdCateName
function ddlMaximProdCateName(Category) {
    var data_ = { Category: Category };
    $.post("/Stock/ProductStockBaseSetMaximProdCateName", data_, function (data) {
        var html = "<select><option class='center'>--All--</option>";
        $.each(data, function (i, item) {
            html += "<select>";
            html += "<option class='center'>" + item.BasePaperCodeMaxim + "</option>";
            html += "</select>";
        });
        $("#BasePaperCodeMaxim").html(html);
    });
}

//条件查询
function funSelectProductStockBaseSetCodeWhere() {
    var data_ = {
        pc: $("#pc").val(),
        PrintShop: $("#PrintShop").val(),
        ProductERPNO: $("#ProductERPNO").val()
    }

    $.post("/Stock/SelectProductStockBaseSetCodeWhere", data_, function (data) {
        var html = "";
        $.each(data, function (i, item) {
            var newdate = eval(item.UpdateTime.replace(/\//g, ''));
            html += "<tr>";
            html += "<td class='center'>" + "<button type='button' id='Update' name='Update' style='margin-left:5px;margin-right:5px;' class='btn btn-default' onclick='funStockAdjust(this,"+i+")' value='" + item.BaseStockID + "' >Stock Adjust(库存调整)</button>" + "</td>";
            html += "<td class='center'>" + item.BrandId + "</td>";
            html += "<td class='center'>" + item.PrintShop +"<spen style='display:none' id='PrintShop_spen"+i+"'>"+ item.PrintShopId + "</spen></td>";
            //html += "<td class='center'>" + item.ProductCode + "</td>";
            html += "<td class='center'>" + item.ProductERPNO + "</td>";
            html += "<td class='center'>" + item.ProductCustNO + "</td>";
            html += "<td class='center'>" + item.BasePaperCode + "</td>";
            html += "<td style='display:none' class='center'><spen id='ProductCode_spen'>" + item.ProductCode + "</spen></td>";
            //html += "<td class='center'>" + item.BasePaperERPNO + "</td>";
            //html += "<td class='center'>" + item.BasePaperCustNO + "</td>";
            //html += "<td class='center'>" + item.StockStartQty + "</td>";
            html += "<td class='center'>" + item.StockCurrentQty + "</td>";
            html += "<td class='center'>" + formatDate(newdate, "yyyy-MM-dd HH:mm:ss") + "</td>";
            //html += "<td class='center'>" + new Date(parseInt(item.UpdateTime.replace(/\D/igm, ""))).toLocaleString() + "</td>";
           // html += "<td class='center'>" + item.Notes + "</td>";
            //html += "<td class='center'>" + item.StockDesc + "</td>";
            html += "</tr>";

            $("#TotalPageCount").html(item.CountId);
            $("#PageTotalCount").val(item.CountId);
        });
        $("#Code_Table tbody").html(html);
    });
}

//添加
function funAdd() {
    $("#InsertCountry").css("display", "block");
    $("#UpdateCountry").css("display", "none");
    $("#Stock_Add").css("display", "block");
    $("#Stock_Edit").css("display", "none");

    //添加之前先清空文本框中的值
    //$("#BrandId").val("--All--");
    $("#PrintShopId").val("");
    $("#ProductCode").val("--All--");
    $("#Product").val("");
    $("#ProductCustNO").val("");
    $("#BasePaperCode").val("");
    $("#BasePaperERPNO").val("");
    $("#BasePaperCustNO").val("");
    $("#StockStartQty").val("");
    $("#StockCurrentQty").val("");
    $("#UpdateTime").val("");
    $("#Notes").val("");
    $("#StockDesc").val("^^");
}
function funAddProduct(ProductCode) {
    var data_ = { ProductCode: $("#ProductCode").val() }
    $.post("/Stock/InertProduct", data_, function (data) {
        $.each(data, function (i, item) {
            $("#Product").val(item.ProductERPNO);
            $("#ProductCustNO").val(item.ProductCustNO);
            $("#BasePaperCode").val(item.BasePaperCode);
            $("#BasePaperERPNO").val(item.BasePaperERPNO);
            $("#BasePaperCustNO").val(item.BasePaperCustNO);
        })
    })
}

function formatDate(date, format) {
    if (!date) return;
    if (!format) format = "yyyy-MM-dd";
    switch (typeof date) {
        case "string":
            date = new Date(date.replace(/-/, "/"));
            break;
        case "number":
            date = new Date(date);
            break;
    }
    if (!date instanceof Date) return;
    var dict = {
        "yyyy": date.getFullYear(),
        "M": date.getMonth() + 1,
        "d": date.getDate(),
        "H": date.getHours(),
        "m": date.getMinutes(),
        "s": date.getSeconds(),
        "MM": ("" + (date.getMonth() + 101)).substr(1),
        "dd": ("" + (date.getDate() + 100)).substr(1),
        "HH": ("" + (date.getHours() + 100)).substr(1),
        "mm": ("" + (date.getMinutes() + 100)).substr(1),
        "ss": ("" + (date.getSeconds() + 100)).substr(1)
    };
    return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
        return dict[arguments[0]];
    });
}

function funAddProductStockBaseSetCode() {
    var data_ = {
        BrandId: $("#BrandId").val(),
        PrintShopId: $("#PrintShopId").val(),
        ProductCode: $("#ProductCode").val(),
        ProductERPNO: $("#Product").val(),
        ProductCustNO: $("#ProductCustNO").val(),
        BasePaperCode: $("#BasePaperCode").val(),
        BasePaperERPNO: $("#BasePaperERPNO").val(),
        BasePaperCustNO: $("#BasePaperCustNO").val(),
        StockStartQty: $("#StockStartQty").val(),
        StockCurrentQty: $("#StockStartQty").val(),
        Notes: $("#Notes").val(),
        StockDesc: $("#StockDesc").val()
    }
    $.post("/Stock/ProductStockBaseSetCodeAdd", data_, function (data) {
        debugger;
        //判断添加是否成功
        if (data.SessionStaus == "true" && data.value == null) {
            alert("添加成功")
            funSelectProductStockBaseSetCodeWhere();
            $("#InsertCountry").css("display", "none");
        }
        else {
            alert(data.value);
        }
    })
}

//Stock Adjust(库存调整)
function funStockAdjust(Id,i) {
    
    $("#InsertCountry").css("display", "none");
    $("#UpdateCountry").css("display", "block");
    $("#Stock_Add").css("display", "none");
    $("#Stock_Edit").css("display", "block");
    $("#OperateTypeSub_cnen").html("<select><option class='center'>--All--</option>");
    $("#BasePaperCodeMaxim").html("<select><option class='center'>--All--</option>");
    $("#UpdateId").val(Id.value);
    $("#BrandType").val("--All--");
    $("#PrintShopId2").val("");
    $("#OperateType").val("--All--");
    $("#Category").val("--All--");
    $("#RefNO").val("");
    $("#QTY").val("");

    
    var $td = $(Id).parents('tr').children('td');

    //alert($("#PrintShop_spen"+i).text());

    var data_ = {
        BaseStockID: Id.value,
        BrandId: $td.eq(1).text(),
        PrintShopId: $("#PrintShop_spen" + i).text(),
        ProductERPNO: $td.eq(3).text(),
        ProductCustNO: $td.eq(4).text(),
        BasePaperCode: $td.eq(5).text(),
        ProductCode: $("#ProductCode_spen").text()
    };

    $("#ProductERPNOUp").val(data_.ProductERPNO);
    $("#ProductCustNOUp").val(data_.ProductCustNO);

    //loadList(Id);

    var count = $("#PrintShopId2 option").length;
    debugger
    //console.log('PrintShopId:', data_.PrintShopId);

    for (var i = 0; i < count; i++) {
        
        if ($("#PrintShopId2").get(0).options[i].value == data_.PrintShopId) {
            $("#PrintShopId2").get(0).options[i].selected = true;
            break;
        }
    }
}

function funEditProductStockBaseSetCode() {
    var myString = $("#OperateType").val();
    var w = myString.indexOf("(");
    var x = myString.indexOf(")");
    var OperateType = myString.substring(w + 1, x);

    var str = $("#OperateTypeSub_cnen").val();
    var z = str.indexOf("(");
    var y = str.indexOf(")");
    var OperateTypeSub_cnen = str.substring(z + 1, y);



    var data_ = {
        Brand: $("#Brandid").val(),
        ProductCustNO: $("#ProductCustNOUp").val(),
        PrintShopId: $("#PrintShopId2").val(),
        OperateType: OperateType,
        OperateTypeSub_cnen: OperateTypeSub_cnen,
        Category: $("#Category").val(),
        BasePaperCodeMaxim: $("#ProductCode_spen").text(),
        RefNO: $("#RefNO").val(),
        QTY: $("#QTY").val(),
        Id: $("#UpdateId").val()
    }
    $.post("/Stock/ProductStockBaseSetCodeUpdate", data_, function (data) {
        if (data.SessionStaus == "true" && data.value == null) {
            alert("库存调整成功")
            funSelectProductStockBaseSetCodeWhere();
            $("#UpdateCountry").css("display", "none");
        } else {
            alert(data.value+"; 不存在的printShop,请添加新的库存产品!");
        }
    })
}