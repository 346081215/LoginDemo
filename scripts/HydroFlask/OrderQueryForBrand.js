$(function () {
    //日历控件
    FormComponents.init();


    $.post("/HydroFlask/OrderQueryForBrandLoad", "", function (data) {
        if (data.FunStatus == "success") {

            //$("#txtVendor").val(data.OrderQueryForVendorLoadData._Vendor)
            $.each(data.OrderQueryForBrandLoadData.Vendor, function (i, item) {
                $("#Vendor").append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            })

            $.each(data.OrderQueryForBrandLoadData.PrintshopList, function (i, item) {
                $('#PrintShop').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            });
            $("#PrintShop").val("a743be0c-3da0-df11-9b6d-080027e8019f");

            $.each(data.OrderQueryForBrandLoadData.PerformanceList, function (i, item) {
                $('#Performance').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            });

            $.each(data.OrderQueryForBrandLoadData.Statuslist, function (i, item) {
                $('#Order_Status').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            });

            
            
        }
        else {
            $("#labtxt").html(data.ErrorCode);
            showDiv();
        }
    })
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
    $("#btnQuery").click(function () {
        $("#step2").removeAttr("style");
        $("#nowpage").val(1);
        $("#pc").val(1);
        GetOrder();
    })

    $("#step1").click(function () {
        $("#step2").css("display", "none");
        $("#Query-Results").css("display", "none");
        $("#Query-order").slideDown();
        $("#step1").attr("class", "red-em");
        $("#Results-ViewDetail").css("display", "none");
        $("#step_ViewDetail").css("display", "none");
        $("#step_ViewShipOrder").css("display", "none");
        $("#Results-ViewShipOrder").css("display", "none");
        $("#step_ViewArtwork").css("display", "none");
        $("#Results-ViewArtwork").css("display", "none");
    });
    $("#step2").click(function () {
        $("#Query-Results").slideDown();
        $("#Results-ViewDetail").css("display", "none");
        $("#Results-ViewArtwork").css("display", "none");
        $("#step_ViewDetail").css("display", "none");
        $("#step_ViewArtwork").css("display", "none");
        $("#step2").attr("class", "red-em");
        $("#step_ViewShipOrder").css("display", "none");
        $("#Results-ViewShipOrder").css("display", "none");
    });
    function GetOrder() {
        var BrandId = "484EC9E5-A484-4203-8A37-5A5E9223721E";
        var accountid = $("#Vendor").val();
        var psid = $("#PrintShop").val();
        var po = $("#PO").val();
        var oos_orderno = $("#oos_orderno").val();
        var performance = $("#Performance").val();
        var orderStatus = $("#Order_Status").val();
        var RcDateStart = $("input[name='SubmitStartTime']").val();
        var RcDateEnd = $("input[name='SubmitEndTime']").val();
        var nowPage = $("#pc").val();
        // alert(nowPage);
        console.log(accountid);

        var url = "/HydroFlask/GetDataOrderQueryForBrand?BrandId=" + BrandId + "&accountid=" + accountid + " &psid=" + psid + "&po=" + po + "&oos_orderno=" + oos_orderno + "&performance=" + performance + "&orderStatus=" + orderStatus + "&RcDateStart=" + RcDateStart + "&RcDateEnd" + RcDateEnd + "&pageIndex=" + nowPage;
        $.get(url, null, function (data) {
            var StrHtml = "";
            $.each(data, function (i, item) {

                StrHtml += "<tr>";
                StrHtml += "<td>" + item.Seq + "</td>";
                StrHtml += "<td>" + item.PO + "</td>";
                StrHtml += "<td>" + item.OrderNO + "</td>";
                StrHtml += "<td>" + item.ItemNO + "</td>";
                StrHtml += "<td style='text-align:right;'>" + item.POQty + "</td>";
                StrHtml += "<td>" + item.Vendor + "</td>";
                StrHtml += "<td>" + item.Performance + "</td>";
                if (item.OOS_Status == "Shipped") {

                    StrHtml += "<td>" + "<a href=\"#\"  onclick='return funcViewShippingOrder(this);' value='" + item.OOS_ProduceOrderid + "' >Shipped</a>" + "</td>";

                }
                else if (item.OOS_Status == "Portion Shipped") {
                    StrHtml += "<td>" + "<a href=\"#\"  onclick='return funcViewShippingOrder(this);' value='" + item.OOS_ProduceOrderid + "' >Portion Shipped</a>" + "</td>";
                }
                else {
                    StrHtml += "<td>" + item.OOS_Status + "</td>";
                }
                StrHtml += "<td>" + item.Received_PO_Date + "</td>";
                StrHtml += "<td>" + item.Reuqested_XFD + "</td>";
                StrHtml += "<td>" + item.Confirmed_XFD + "</td>";
                StrHtml += "<td>" + "<a href=\"#\"  onclick='return funcViewDetail(this);' value='" + item.SalesOrderId + "' >ViewDetail</a>" + "</td>";
                //if (item.OOS_artwork != "") {
                //    StrHtml += "<td>" + "<a href=\"#\"  onclick='return funcViewArtwork(this);' value='" + item.SalesOrderId + "' >Artwork</a>" + "</td>";
                //}
                //else {
                //    StrHtml += "<td>" + "<a></a>Artwork</td>";
                //}
                StrHtml += "</tr>";
                document.getElementById("PageTotalCount").value = item.TotalPageCount;
                $("#TotalPageCount").html(item.TotalPageCount);
                //alert(item.TotalPageCount)
            });
            $("#Order tbody").html(StrHtml);
            if (StrHtml == "") {
                $("#Order tbody").html("None");
                $("#GridViewPage").css("display", "none");
                $("#ExportExcel").css("display", "none");
                document.getElementById("nowpage").value = 1;
                document.getElementById("PageTotalCount").value = 1;
                document.getElementById("TotalPageCount").innerHTML = 1;
            } else {
                $("#GridViewPage").removeAttr("style");
                $("#ExportExcel").removeAttr("style");
            }
            $("#step2").removeAttr("style");
            $("#Query-order").css("display", "none");
            $("#Query-Results").slideDown();
            $("#step1").attr("class", "gray-em");
            $("#step2").attr("class", "red-em");

        })


    } 
})

function funcViewDetail(obj) {
    $('#Query-order').css('display', 'none');
    $('#Query-Results').css('display', 'none');
    //$('#Results-ViewDetail').css('display', 'none');
    $('#Results-ViewArtwork').css('display', 'none');
    $('#Results-ViewShipOrder').css('display', 'none');

    $('#Results-ViewDetail').slideDown();

    $('#step_ViewDetail').addClass('red-em');
    $('#step_ViewDetail').removeClass('gray-em');
    $('#step_ViewDetail').siblings('em').addClass('gray-em');
    $('#step_ViewDetail').siblings('em').removeClass('red-em');
    $("#step_ViewDetail").removeAttr("style");

    $.ajax(
        {
            type: "get",
            url: "/HydroFlask/ViewDetail/" + obj.attributes["value"].value,
            contentType: "application/html; charset=utf-8",
            dataType: "html"
        })
    .success(function (data) {
        $("#Results-ViewDetail").css("display", "block");
        $("#Results-ViewDetail").html(data);
    })
    .error(function (xhr, status) {
        //alert(status);
        $("#labtxt").html(status);
        showDiv();
    })
}
//function funcViewArtwork(obj) {

//    $('#Query-order').css('display', 'none');
//    $('#Query-Results').css('display', 'none');
//    $('#Results-ViewDetail').css('display', 'none');
//    //$('#Results-ViewArtwork').css('display', 'none');
//    $('#Results-ViewShipOrder').css('display', 'none');

//    $('#Results-ViewArtwork').slideDown();

//    $('#step_ViewArtwork').addClass('red-em');
//    $('#step_ViewArtwork').removeClass('gray-em');
//    $('#step_ViewArtwork').siblings('em').addClass('gray-em');
//    $('#step_ViewArtwork').siblings('em').removeClass('red-em');
//    $("#step_ViewArtwork").removeAttr("style");
//    $.ajax(
//        {
//            type: "get",
//            url: "/HydroFlask/_ViewArtwork/" + obj.attributes["value"].value,
//            contentType: "application/html; charset=utf-8",
//            dataType: "html"
//        })
//    .success(function (data) {
//        $("#Results-ViewArtwork").css("display", "block");
//        $("#Results-ViewArtwork").html(data);
//    })
//    .error(function (xhr, status) {
//        //alert(status);
//        $("#labtxt").html(status);
//        showDiv();
//    })
//}
function funcViewShippingOrder(obj) {
    $('#Query-order').css('display', 'none');
    $('#Query-Results').css('display', 'none');
    $('#Results-ViewDetail').css('display', 'none');
    $('#Results-ViewArtwork').css('display', 'none');
    //$('#Results-ViewShipOrder').css('display', 'none');

    $('#Results-ViewShipOrder').slideDown();

    $('#step_ViewShipOrder').addClass('red-em');
    $('#step_ViewShipOrder').removeClass('gray-em');
    $('#step_ViewShipOrder').siblings('em').addClass('gray-em');
    $('#step_ViewShipOrder').siblings('em').removeClass('red-em');
    $("#step_ViewShipOrder").removeAttr("style");
    $.ajax(
               {
                   type: "get",
                   url: "/HydroFlask/_ViewShippingOrder/" + obj.attributes["value"].value,
                   contentType: "application/html; charset=utf-8",
                   dataType: "html"
               })
           .success(function (data) {
               $("#Results-ViewShipOrder").css("display", "block");
               $("#Results-ViewShipOrder").html(data);
           })
           .error(function (xhr, status) {
               //alert(status);
               $("#labtxt").html(status);
               showDiv();
           })
}