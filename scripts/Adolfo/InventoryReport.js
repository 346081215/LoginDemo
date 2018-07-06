$(function () {
    var StrHtml = "";
    var urlPost = "/Adolfo/GetInventoryReport";
    $.post(urlPost, function (data) {
        $.each(data, function (i, item) {
            StrHtml += "<tr>";
            StrHtml += "<td>" + item.Seq + "</td>";
            StrHtml += "<td>" + item.LABEL_CODE + "</td>";
            StrHtml += "<td>" + item.Label_Description + "</td>";
            StrHtml += "<td>" + item.PRINTSHOP_CHINA + "</td>";
            StrHtml += "<td>" + item.PRINTSHOP_INDIA + "</td>";
            StrHtml += "<td>" + item.PRINTSHOP_EUROPE + "</td>";
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
        var url = "/Adolfo/GetInventoryReport?pageIndex="+nowPage;
        $.get(url, null, function (data) {
            $.each(data, function (i, item) {
                StrHtml += "<tr>";
                StrHtml += "<td>" + item.Seq + "</td>";
                StrHtml += "<td>" + item.LABEL_CODE + "</td>";
                StrHtml += "<td>" + item.Label_Description + "</td>";
                StrHtml += "<td>" + item.PRINTSHOP_CHINA + "</td>";
                StrHtml += "<td>" + item.PRINTSHOP_INDIA + "</td>";
                StrHtml += "<td>" + item.PRINTSHOP_EUROPE + "</td>";
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