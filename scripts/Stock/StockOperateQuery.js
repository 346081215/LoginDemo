$(function () {

    SelectAll();
});

function SelectAll() {
    var data_ = { pc: $("#pc").val() }
    $.post("/Stock/SelectStockOperateQuery", data_, function (data) {
        var html = "";
        if (data.Funstatus == "0") {
            alert("查询失败");
        }
        else {
            $.each(data.StockOperateQueryData, function (i, item) {
                html += "<tr>";
                html += "<td>" + item.PrintShop + "</td>";
                html += "<td>" + item.ProductCode + "</td>";
                html += "<td>" + item.ProductERPNO + "</td>";
                html += "<td>" + item.ProductCustNO + "</td>";
                html += "<td>" + item.BasePaperCode + "</td>";
                html += "<td>" + item.BasePaperERPNO + "</td>";
                html += "<td>" + item.BasePaperCustNO + "</td>";
                html += "<td>" + item.StockStartQty + "</td>";
                html += "<td>" + item.StockCurrentQty + "</td>";
                html += "<td>" + item.UpdateTime + "</td>";
                html += "<td>" + item.Notes + "</td>";
                html += "<td>" + item.StockDesc + "</td>";
                html += " <td class=center><button type=button id=EditStock name=EditStock class='btn btn-default' onclick='funEditStock(this)' value='" + item.PrintShopId + "^" + item.ProductCode + "'>查看详情</button>"
                html += "</tr>";
                $("#TotalPageCount").html(item.totalPgCount);
                $("#PageTotalCount").val(item.totalPgCount);
            });
            $("#DetailStockOperateQuery").html(html);
        }
    })
}
//PrintShopId的下拉改变事件
$("#PrintShopId").change(function () {
    if ($("#PrintShopId").val() == "" && $("#ProductCode").val() == "") {
        $("#PrintShopId").val("");
        $("#ProductCode").val("");
        ChangeDropDown();
    }
    else {
        ChangeDropDown();
    }
});
//ProductCode的下拉改变事件
$("#ProductCode").change(function () {
    if ($("#PrintShopId").text() == "--Please Select--" && $("#ProductCode").text() == "--Please Select--") {
        $("#PrintShopId").val("");
        $("#ProductCode").val("");
        ChangeDropDown();
    }
    else {
        ChangeDropDown();
    }
});
//条件查询
function ChangeDropDown() {
    var data_ = {
        pc: $("#pc").val(),
        PrintShopId: $("#PrintShopId").val(),
        ProductCode: $("#ProductCode").val()
    }
    $.post("/Stock/Sel_StockProdRunStamp", data_, function (data) {
        if (data.Funstatus == "0") {
            alert("查询失败");
        }
        else {
            var html = "";
            $.each(data.StockOperateQueryData, function (i, item) {
                html += "<tr>";
                html += "<td>" + item.PrintShop + "</td>";
                html += "<td>" + item.ProductCode + "</td>";
                html += "<td>" + item.ProductERPNO + "</td>";
                html += "<td>" + item.ProductCustNO + "</td>";
                html += "<td>" + item.BasePaperCode + "</td>";
                html += "<td>" + item.BasePaperERPNO + "</td>";
                html += "<td>" + item.BasePaperCustNO + "</td>";
                html += "<td>" + item.StockStartQty + "</td>";
                html += "<td>" + item.StockCurrentQty + "</td>";
                html += "<td>" + item.UpdateTime + "</td>";
                html += "<td>" + item.Notes + "</td>";
                html += "<td>" + item.StockDesc + "</td>";
                html += " <td class=center><button type=button id=EditStock name=EditStock class='btn btn-default' onclick='funEditStock(this)' value='" + item.PrintShopId + "^" + item.ProductCode + "'>查看详情</button>"
                html += "</tr>";
                $("#TotalPageCount").html(item.totalPgCount);
                $("#PageTotalCount").val(item.totalPgCount);
            });
            $("#DetailStockOperateQuery").html(html);
        }
    })
}

function Xiala(id) {
    $("#DetailStockOperate").slideDown();
    var arr = id.value.split("^");
    var PrintShopId = arr[0];
    var ProductCode = arr[1];
    var data_ = {
        pc: $("#pc1").val(),
        PrintShopId: PrintShopId,
        ProductCode: ProductCode
    }
    $.post("/Stock/Sel_StockOperate", data_, function (data) {
        var html = "";
        if (data.Funstatus == "0") {
            alert("查询失败");
        }
        else {
            $.each(data.StockOperateQueryData, function (i, item) {
                html += "<tr>";
                html += "<td>" + item.PrintShop + "</td>";
                html += "<td>" + item.ProductCode + "</td>";
                html += "<td>" + item.RefOrderNO + "</td>";
                html += "<td>" + item.OperateType + "</td>";
                html += "<td>" + item.OperateDate + "</td>";
                html += "<td>" + item.OperateQty + "</td>";
                html += "<td>" + item.OperateNotes + "</td>";
                html += "<td>" + item.OperatedUser + "</td>";
                html += "<td>" + item.OtherNotes + "</td>";
                html += "</tr>";
                $("#TotalPageCount1").html(item.totalPgCount);
                $("#PageTotalCount1").val(item.totalPgCount);
            });
            $("#DetailStockOperateInfo").html(html);
        }
    });
}
//查看详情
function funEditStock(obj) {
    $("#DetailStockOperate").slideDown();
    Xiala(obj);
}

function ReturnIndex() {
    $("#DetailStockOperate").css("display", "none");
}
//分页
$('#PageIndex').click(function () {
    //给文本框赋值都为1
    document.getElementById("pc").value = 1;
    document.getElementById("nowpage").value = 1;
    //加载模糊查询的方法
    ChangeDropDown();
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
        ChangeDropDown();
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
    ChangeDropDown();
});
//翻到最后
$('#PageLast').click(function () {
    var maxpage = parseInt(document.getElementById("PageTotalCount").value);
    document.getElementById("pc").value = maxpage;
    document.getElementById("nowpage").value = maxpage;
    ChangeDropDown();
});
$('#PageGO').click(function () {
    var nowpage = parseInt(document.getElementById("nowpage").value);
    var maxpage = parseInt(document.getElementById("PageTotalCount").value) + 1;
    if (nowpage > 0 && nowpage < maxpage) {
        document.getElementById("pc").value = document.getElementById("nowpage").value;
        ChangeDropDown()
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

//分页1
$('#PageIndex1').click(function () {
    //给文本框赋值都为1
    document.getElementById("pc1").value = 1;
    document.getElementById("nowpage1").value = 1;
    //加载模糊查询的方法
    Xiala();
});
//向上一个页翻
$('#Pageup1').click(function () {
    //首先获取当前输入文本框的值
    var nowpage = document.getElementById("nowpage1").value;
    //parseInt() 函数可解析一个字符串，并返回一个整数。（也就是输入的内容必须是数字）
    var newpage = parseInt(nowpage);
    if (parseInt(nowpage) > 1) {
        newpage = parseInt(nowpage) - 1;
        document.getElementById("pc1").value = newpage;
        document.getElementById("nowpage1").value = newpage;
        Xiala();
    }
});
//向下一个页翻
$('#Pagewown1').click(function () {
    var nowpage = document.getElementById("nowpage1").value;
    var maxpage = parseInt(document.getElementById("PageTotalCount1").value);
    var newpage = parseInt(nowpage);
    //判断，如果输入的文本框的值小于最大的页数 2 3 2<3 3=2+1
    if (parseInt(nowpage) < maxpage) { newpage = parseInt(nowpage) + 1 };
    document.getElementById("pc1").value = newpage;
    document.getElementById("nowpage1").value = newpage;
    Xiala();
});
//翻到最后
$('#PageLast1').click(function () {
    var maxpage = parseInt(document.getElementById("PageTotalCount1").value);
    document.getElementById("pc1").value = maxpage;
    document.getElementById("nowpage1").value = maxpage;
    Xiala();
});
$('#PageGO1').click(function () {
    var nowpage = parseInt(document.getElementById("nowpage1").value);
    var maxpage = parseInt(document.getElementById("PageTotalCount1").value) + 1;
    if (nowpage > 0 && nowpage < maxpage) {
        document.getElementById("pc1").value = document.getElementById("nowpage1").value;
        Xiala();
    }
    else {

        $("#labtxt1").html("wrong page no.");
        showDiv();
        document.getElementById("nowpage1").value = 1;
    }
});
$("#nowpage1").keyup(function () {
    var t = $("#nowpage").val();
    //判断是否是数字
    if (isNaN(t)) {
        $("#labtxt1").html("wrong page no.");
        showDiv();
        document.getElementById("nowpage1").value = 1;
    }
});