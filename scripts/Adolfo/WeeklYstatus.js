$(function () {

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

    Load();

    function Load()
    {
        $("#nowpage").val(1);
        $("#pc").val(1);
        GetOrder();
    }

 
    function GetOrder() {
        
        var nowPage = $("#pc").val();
        // alert(nowPage);
        
        var data_ = {
            pageIndex: nowPage
        }

        var url = "/Adolfo/GetWeeklYstatus";
        $.post(url, data_, function (data) {
            var StrHtml = "";
            $.each(data, function (i, item) {

                StrHtml += "<tr>";
                StrHtml += "<td>" + item.Seq + "</td>";
                StrHtml += "<td>" + item.Purchase_order_number + "</td>";
                StrHtml += "<td>" + item.Web_order_number + "</td>";
                StrHtml += "<td>" + item.Vendor_number + "</td>";
                StrHtml += "<td>" + item.Vendor_name + "</td>";


                StrHtml += "<td>" + item.Import_date + "</td>";
                StrHtml += "<td>" + item.Release_date + "</td>";
                StrHtml += "<td>" + item.Order_status + "</td>";
                StrHtml += "<td>" + item.Released + "</td>";
                StrHtml += "<td>" + item.Printshop + "</td>";
                StrHtml += "<td>" + item.Season + "</td>";
                StrHtml += "<td>" + item.Style_number + "</td>";
               
                StrHtml += "</tr>";
                document.getElementById("PageTotalCount").value = item.TotalPageCount;
                $("#TotalPageCount").html(item.TotalPageCount);
                //alert(item.TotalPageCount)
            });
            $("#Order tbody").html(StrHtml);
            if (StrHtml == "") {
                $("#Order tbody").html("None");
                $("#GridViewPage").css("display", "none");
                //$("#ExportExcel").css("display", "none");
                document.getElementById("nowpage").value = 1;
                document.getElementById("PageTotalCount").value = 1;
                document.getElementById("TotalPageCount").innerHTML = 1;
            } else {
                $("#GridViewPage").removeAttr("style");
                //$("#ExportExcel").removeAttr("style");
            }
            //$("#step2").removeAttr("style");
            //$("#Query-order").css("display", "none");
            //$("#Query-Results").slideDown();
            //$("#step1").attr("class", "gray-em");
            //$("#step2").attr("class", "red-em");

        })


    }
})

