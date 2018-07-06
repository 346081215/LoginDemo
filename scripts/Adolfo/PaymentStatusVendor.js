$(function () {
    var StrHtml = "";
    var urlPost = "/Adolfo/GetPaymentStatusVendor";
    $.post(urlPost, function (data) {
        $.each(data, function (i, item) {
            StrHtml += "<tr>";
            StrHtml += "<td>" + item.Seq + "</td>";
            StrHtml += "<td>" + item.Vendor_Code + "</td>";
            StrHtml += "<td>" + item.Vendor_Name + "</td>";
            StrHtml += "<td>" + item.Not_due + "</td>";
            StrHtml += "<td>" + item._30 + "</td>";
            StrHtml += "<td>" + item._60 + "</td>";
            StrHtml += "<td>" + item._90 + "</td>";
            StrHtml += "<td>" + item._120 + "</td>";
            StrHtml += "<td>" + item._120_ + "</td>";
            StrHtml += "<td>" + item.Total_overdue + "</td>";
            StrHtml += "<tr>";
            document.getElementById("PageTotalCount").value = item.TotalPageCount;
            $("#TotalPageCount").html(item.TotalPageCount);
        });
        $("#Order tbody").html(StrHtml);

    });

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
        var t = $("#nowpage").val();
        if (isNaN(t)) {
            $("#labtxt").html("wrong page no.");
            showDiv();
            document.getElementById("nowpage").value = 1;
        }
    });
    function GetOrder() {
        var nowPage = $("#pc").val();
        var StrHtml = "";
        var url = "/Adolfo/GetPaymentStatusVendor?pageIndex=" + nowPage;
        $.get(url, null, function (data) {
            $.each(data, function (i, item) {
                StrHtml += "<tr>";
                StrHtml += "<td>" + item.Seq + "</td>";
                StrHtml += "<td>" + item.Vendor_Code + "</td>";
                StrHtml += "<td>" + item.Vendor_Name + "</td>";
                StrHtml += "<td>" + item.Not_due + "</td>";
                StrHtml += "<td>" + item._30 + "</td>";
                StrHtml += "<td>" + item._60 + "</td>";
                StrHtml += "<td>" + item._90 + "</td>";
                StrHtml += "<td>" + item._120 + "</td>";
                StrHtml += "<td>" + item._120_ + "</td>";
                StrHtml += "<td>" + item.Total_overdue + "</td>";
                StrHtml += "</tr>";
                document.getElementById("PageTotalCount").value = item.TotalPageCount;
                $("#TotalPageCount").html(item.TotalPageCount);
            });
            $("#Order tbody").html(StrHtml);
            if (StrHtml == "") {
                $("#Order tbody").html("None");
                $("#GridViewPage").css("display", "none");
                $("#ExportExcel").css("display", "none");
                document.getElementById("nowpage").value = 1;
                document.getElementById("PageTotalCount").value = 1;
                document.getElementById("TotalPageCount").innerHTML = 1;
            }
        });
    }
});