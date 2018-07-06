$(function () {
    //日历控件
    //FormComponents.init();
    $('#PageIndex').click(function () {
        document.getElementById("pc").value = 1;
        document.getElementById("nowpage").value = 1;
        GetOrder();
    });
    $('#Pageup').click(function () {
        var nowpage = document.getElementById("nowpage").value;
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) > 1) {
            newpage = parseInt(nowpage) - 1;
            document.getElementById("pc").value = newpage;
            document.getElementById("nowpage").value = newpage;
            GetOrder();
        }
    });
    $('#Pagewown').click(function () {
        var nowpage = document.getElementById("nowpage").value;
        var maxpage = parseInt(document.getElementById("PageTotalCount").value);
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) < maxpage) newpage = parseInt(nowpage) + 1;
        document.getElementById("pc").value = newpage;
        document.getElementById("nowpage").value = newpage;
        GetOrder();
    });
    $('#PageLast').click(function () {
        var maxpage = parseInt(document.getElementById("PageTotalCount").value);
        document.getElementById("pc").value = maxpage;
        document.getElementById("nowpage").value = maxpage;
        GetOrder();
    });
    $('#PageGO').click(function () {
        var nowpage = parseInt(document.getElementById("nowpage").value);
        var maxpage = parseInt(document.getElementById("PageTotalCount").value) + 1;
        if (nowpage > 0 && nowpage < maxpage) {
            document.getElementById("pc").value = document.getElementById("nowpage").value;
            GetOrder();
        }
        else {
            //alert("wrong page no.");
            $("#labtxt").html("wrong page no.");
            showDiv();
            document.getElementById("nowpage").value = 1;
        }
    });
    $("#nowpage").keyup(function () {
        //alert($("#nowpage").val());
        var t = $("#nowpage").val();
        if (isNaN(t)) {
            //alert("wrong page no.");
            $("#labtxt").html("wrong page no.");
            showDiv();
            document.getElementById("nowpage").value = 1;
        }
    });
    $("#btnExcel").click(function () {
        //var maxpage = parseInt(document.getElementById("PageTotalCount").value) + 1;
        //var urlPost = "/Maxim/OrderTrackingForVendorExportExcel";
        //$.post(urlPost, $("form").serialize(), function (data, status) {

        //});
    });
    $("#btnQuery").click(function () {
        GetOrder();
        document.getElementById("pc").value = 1;
        document.getElementById("nowpage").value = 1;
        $("#pag").css("display", "block");
    });
    $("#step1").click(function () {
        $("#step2").css("display", "none");
        $("#step3").css("display", "none");
        $("#step4").css("display", "none");
        $("#Query-Results").css("display", "block");
        $("#Query-order").css("display", "block");
        $("#Results-ViewDetail").css("display", "none");
        $("#CareLabel").css("display","none");
    })
});
function showData(data) {
    if (data) {
        var html = "";
        var TotalPageCount = "";
        $.each(data, function (i, item) {
            html += "<tr>";
            html += "<td class='center'>" + item.ID + "</td>";
            html += "<td class='center' >" + item.OrderNo + "</td>";
            html += "<td class='center'>" + item.ProductName + "</td>";
            html += "<td>" + "<a href=\"#\"  onclick='return xmldata(this);' value='" + item.ID + "' >ViewXmlDataDetail</a>" + "</td>";
            html += "<td class='center'>" + item.StartTime + "</td>";
            html += "<td class='center'>" + item.Status + "</td>";
            html += "<td class='center'>" + item.ArtworkPath + "</td>";
            html += "<td>" + "<a href=\"#\"  onclick='return ViewLog(this);' value='" + item.OrderNo + "~" + item.ProductName + "' >ViewLogDetail</a>" + "</td>";
            html += "</tr>";
            TotalPageCount = item.totalPgCount;
            ta = item.XmlData;
        })

        $("#TotalPageCount").html(TotalPageCount);
        $("#PageTotalCount").val(TotalPageCount);
        $("#task2 tbody").html(html);
        $("#task3 tbody").html(html);
    }
}
function GetOrder() {
    $.post("/Maintain/ArtWorkTaskPost", getQueryParameter(), showData);
}
function getQueryParameter() {
    return {
        "orderNo": $("#orderNo").val(),
        "productName": $("#productName").val(),
        "XmlData": $("#XmlData").val(),
        "dateStart": $("#dateStart").val(),
        "status": $("#status").val(),
        "ArtworkPath": $("#ArtworkPath").val(),
        "pc": $("#pc").val(),
        "nowpage": $("#nowpage").val()
    }
}

function Artworktaskinsert() {
    $("#artworktask").slideDown();
}
function Artworktaskinsert() {
    var OrderNo = $("#OrderNo").val();
    var ProductName = $("#ProductName").val();
    var StartTime = $("#StartTime ").val();
    var Status = $("#tatus").val();
    var data = { OrderNo, ProductName, StartTime, tatus};
    $.post("/Maintain/ArtWorkTaskPost", data, function (data) {
        if (data.FunStatus == "0") {
            alert("添加失败！")
        }
        else {
            alert("添加成功！")
            $("#OrderNo").val();
            $("#ProductName").val();
            $("#StartTime ").val();
            $("#tatus").val();
            showData();
        }
    }

    )

}
//查询XmlData
function xmldata(obj) {
    $.ajax(
        {
            type: "get",
            url: "/Maintain/GetXml/" + obj.attributes["value"].value,
            contentType: "application/html; charset=utf-8",
            dataType: "html"
        })
    .success(function (data) {
        //inline
        $("#step2").css("display", "inline");
        $("#Query-order").css("display", "none");
        $("#Query-Results").css("display", "none");
        $("#Results-ViewDetail").css("display", "block");
        $("#Results-ViewDetail").html(data);
    })
    .error(function (xhr, status) {
        $("#labtxt").html(status);
        showDiv();
    })
}
//查询GetLog
function ViewLog(obj) {
    $.ajax(
        {
            type: "post",
            url: "/Maintain/GetLog",
            data: { "OrderNo": obj.attributes["value"].value, "pc": $("#pc2").val() },
            dataType: "html"
        })
    .success(function (data) {
        //inline
        $("#step3").css("display", "inline");
        $("#Query-order").css("display", "none");
        $("#Query-Results").css("display", "none");
        $("#Results-ViewDetail").css("display", "block");
        $("#Results-ViewDetail").html(data);
    })
    .error(function (xhr, status) {
        $("#labtxt").html(status);
        showDiv();
    })
}

//跳转洗标查询
function funbtnToCare() {
    debugger;
    $("#step1").attr("class", "gray-em");
    $("#step4").css("display", "inline");
    $("#Query-order").css("display", "none");
    $("#Query-Results").css("display", "none");
    $("#CareLabel").slideDown();
}

//查询洗标状态信息
function funbtnCareQuery() {
    var orderno = $("#CareNo").val();
    debugger;
    showloading();
    $.ajax({
        url: "/Maintain/QueryCareLabelStatus",
        dataType: "json",
        type: "get",
        data: { orderno:orderno},
        success: function (data) {
            debugger;
            var htmlstr = "";
            if (data.Err=="ERR") {
                $("#labtxt").html("错误");
                showDiv();
                return;
            }
            if (data.Table.length == 0) {
                hideloading();
                return;
            }
            $.each(JSON.parse(data.Table), function (i, item) {
                htmlstr += "<tr>";
                htmlstr += "<td>" + item.ID+"</td>";
                htmlstr += "<td>" + item.Orderno + "</td>";
                htmlstr += "<td>" + item.Status + "</td>";
                htmlstr += "<td>" + item.Description + "</td>";
                htmlstr += "</tr>";
            })
            $("#CareDetail").html(htmlstr);
            hideloading();
        }
    })

}
