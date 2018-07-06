$(function () {
    SelectAll();
    FormComponents.init();
});
function SelectAll() {
    var data_ = { pc: $("#pc").val() }
    $.post("/Stock/SelectStockAdjustTracking", data_, function (data) {
        var html = "";
        if (data.Funstatus == "0") {
            alert("查询失败");
        }
        else {
            $.each(data.StockAdjustTrackingData, function (i, item) {
                html += "<tr>";
                html += "<td>" + item.seq + "</td>";
                html += "<td>" + item.OperateDate + "</td>";
                html += "<td>" + item.RefOrderNO + "</td>";
                html += "<td>" + item.OperateType + "</td>";
                html += "<td>" + item.PrintShop + "</td>";
                html += "<td>" + item.BrandId + "</td>";
                html += "<td>" + item.ProductCustNO + "</td>";
                html += "<td>" + item.OperateQty + "</td>";
                html += "<td>" + item.OperateTypeSub_cnen + "</td>";
                html += "<td>" + item.OtherNotes + "</td>";
                html += "</tr>";
                $("#TotalPageCount").html(item.totalPgCount);
                $("#PageTotalCount").val(item.totalPgCount);
            });
            $("#DetailStockAdjustTracking").html(html);
        }
    })
}
//通过一个下拉框中的值改变另一个下拉框中的值
$("#MaximProdCateName").change(function () {
    if ($("#MaximProdCateName").val() == "") {
        $("#ProductCode").val("");
    }
    var data_ = {
        MaximProdCateName: $("#MaximProdCateName").val(),
        ProductCode: $("#ProductCode").val()
    }
    $.post("/Stock/ChangeInfo", data_, function (data) {
        var html = "";
        $.each(data.StockAdjustTrackingData, function (i, item) {
            html += "<select>";
            html += "<option value='" + item.ProductCustNO + "'>" + item.ProductCustNO + "</option>";
            html += "</select>";
        });
        $("#ProductCustNO").html(html);
    });
});
//通过
//条件查询
function QueryStockInfo() {
    var data_ = {
        pc: $("#pc").val(),
        MaximProdCateName: $("#MaximProdCateName").val(),
        PrintShop: $("#PrintShop").val(),
        RefOrderNO: $("#RefOrderNO").val(),
        OperateType: $("#OperateType").val(),
        ProductCode: $("#ProductCode").val(),
        OperateDate1: $("#OperateDate1").val(),
        OperateDate2: $("#OperateDate2").val(),
        OperateTypeSub_cnen:$("#type").val()
    }
    $.post("/Stock/QueryStock", data_, function (data) {
        var html = "";
        if (data.Funstatus == "0") {
            alert("查询失败");
        }
        else {
            $.each(data.StockAdjustTrackingData, function (i, item) {
                html += "<tr>";
                html += "<td>" + item.seq + "</td>";
                html += "<td>" + item.OperateDate + "</td>";
                html += "<td>" + item.RefOrderNO + "</td>";
                html += "<td>" + item.OperateType + "</td>";
                html += "<td>" + item.PrintShop + "</td>";
                html += "<td>" + item.BrandId + "</td>";
                html += "<td>" + item.ProductCode + "</td>";
                html += "<td>" + item.OperateQty + "</td>";
                html += "<td>" + item.OperateTypeSub_cnen + "</td>";
                html += "<td>" + item.OtherNotes + "</td>";
                html += "</tr>";
                $("#TotalPageCount").html(item.totalPgCount);
                $("#PageTotalCount").val(item.totalPgCount);
            });
            $("#DetailStockAdjustTracking").html(html);
        }
    })
}

$("#OperateType").change(function () {
    var data_ = {
        OperateType: $("#OperateType").val()
    }
    $.post("/Stock/StocktypeInfoDate", data_, function (data) {
        if (data.Funstatus == "0") {
            $("#type").css("display", "none");
            $("#type").val("");
        }
        else {
            $("#type").css("display", "block");
            html = "";
            $.each(data.StocktypeInfoDate, function (i, item) {
                html += "<select>";
                html += "<option value='" + item.OperateTypeSub_cnen + "'>" + item.OperateTypeSub_cnen + "</option>";
                html += "</select>";
            });
            $("#type").html(html);
        }

    });
});
//分页
$('#PageIndex').click(function () {
    //给文本框赋值都为1
    document.getElementById("pc").value = 1;
    document.getElementById("nowpage").value = 1;
    //加载模糊查询的方法
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