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
        var maxpage = parseInt(document.getElementById("PageTotalCount").value)+1;
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
        var t=$("#nowpage").val();
        if(isNaN(t))
        {
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
        document.getElementById("pc").value = 1;
        document.getElementById("nowpage").value = 1;
        GetOrder();
        $("#PageView").val(1);
        $("#GridViewPage").css('display', 'block');
        $("#step2").removeAttr("style");
    });
    if($("#PageView").val()=="0")
    {
        $("#GridViewPage").css('display', 'none');
    }
    else
    {
        $("#GridViewPage").css('display', 'block');
    }

    function GetOrder()
    {

        var urlPost = "/Adolfo/GetOrderTrackingOrders";
        $.post(urlPost, $("form").serialize(), function (data, status) {
            //alert(data.oos_lineno);
            var sTrHtml = "";
            if (data.FunStatus == "false") {
                window.location.href = "/Home/Login";
            }
            else { 
                $.each(data.orderdata.Orderlist, function (i, item) {
                    sTrHtml += "<tr>";
                    sTrHtml += "<td>" + item.Seq + "</td>";
                    sTrHtml += "<td>" + item.SubmitTime + "</td>";
                    sTrHtml += "<td>" + item.ETDTime + "</td>";
                    sTrHtml += "<td>" + item.BrandName + "</td>";
                    sTrHtml += "<td>" + item.PrintshopName + "</td>";
                    sTrHtml += "<td>" + item.CustOrderNO + "</td>";
                    sTrHtml += "<td>" + item.OrderNO + "</td>";
                    sTrHtml += "<td>" + item.Dept_Code + "</td>";
                    sTrHtml += "<td>" + item.Order_Notes + "</td>";
                    sTrHtml += "<td>" + item.ProductName + "</td>";
                    sTrHtml += "<td style='text-align: right;'>" + item.OrderQty + "</td>";
                    sTrHtml += "<td>" + item.OOS_Status_pl + "</td>";
                    //sTrHtml += "<td>" + item.ServiceLevel + "</td>";
                    sTrHtml += "<td>" + item.Performance + "</td>";
                    sTrHtml += "<td>" + item.ErpNO + "</td>";
                    //sTrHtml += "<td>" + "<a href=\"/Maxim/ViewOrderDetail/" + item.OrderID + "\" target=\"_blank\">ViewDetail</a>" + "</td>";
                    //sTrHtml += "<td>" + "<a href=\"/OrderCommon/ViewArtWork/" + item.OrderID + "\" target=\"_blank\">Artwork</a>" + "</td>";
                    sTrHtml += "<td>" + "<a href=\"#\"  onclick='return funcViewDetail(this);' value='" + item.OrderID + "^Confirm' >ViewDetail</a>" + "</td>";
                    if (item.oos_artwork != "") {
                        sTrHtml += "<td>" + "<a href=\"#\"  onclick='return funcViewArtwork(this);' value='" + item.OrderID + "^Confirm' >Artwork</a>" + "</td>";
                    }
                    else {
                        sTrHtml += "<td>" + "<a></a>Artwork</td>";
                    }

                    sTrHtml += "<td>" + item.DeliveryDate + "</td>";
                    if (item.DeliveryDate == "" || item.DeliveryDate == null)
                    {
                        sTrHtml += "<td style=\"text-align:center \"><a></a>AWB #/POD</td>";
                    }
                    else {
                        sTrHtml += "<td>" + "<a href=\"#\"  onclick='return funcViewShippingOrder(this);' value='" + item.OrderID + "' >AWB #/POD</a>" + "</td>";
                    }
                    sTrHtml += "</tr>";
                });
                //document.getElementById("TotalPageCount").text = data.OrdersTotalCount;
                $("#TotalPageCount").html(data.orderdata.OrdersTotalCount);
                document.getElementById("PageTotalCount").value = data.orderdata.OrdersTotalCount;

                $("#Order tbody").html(sTrHtml);
                $("#Query-order").css("display", "none");
                $("#Query-Results").slideDown();
                $("#step1").attr("class", "gray-em");
                $("#step2").attr("class", "red-em");
                if (sTrHtml == "")
                {
                    $("#Order tbody").html("None");
                    $("#GridViewPage").css("display", "none");

                }
            }
        });
    }

    $("select[name='oos_lineno']").change(function () {
        var data = {
            _CategroyId: $(this).val()
        };
        var urlPost = "/Maxim/CategoryChangeBinItem?CategroyId=" + $(this).val();
        $.post(urlPost, data, function (data, status) {
            var sTrHtml = "";
            $("select[name='productid']").html(sTrHtml);
            $.each(data, function (i, item) {
                sTrHtml += "<option value=\"" + item.Value + "\">" + item.Text + "</option>";
            })
            $("select[name='productid']").html(sTrHtml);
        });
    });
    $("#step1").click(function () {
        $("#step2").css("display", "none");
        $("#Query-Results").css("display", "none");
        $("#Query-order").slideDown();
        $("#Results-ViewDetail").css("display", "none");
        $("#Results-ViewArtwork").css("display", "none");
        $("#Results-ViewShipOrder").css("display", "none");
        $("#step_ViewDetail").css("display", "none");
        $("#step_ViewArtwork").css("display", "none");
        $("#step_ViewShipOrder").css("display", "none");
        $("#step1").attr("class","red-em");
    });
    $("#step2").click(function () {
        $("#Query-Results").slideDown();
        $("#Results-ViewDetail").css("display", "none");
        $("#Results-ViewArtwork").css("display", "none");
        $("#Results-ViewShipOrder").css("display", "none");
        $("#step_ViewDetail").css("display", "none");
        $("#step_ViewArtwork").css("display", "none");
        $("#step_ViewShipOrder").css("display", "none");
        $("#step2").attr("class", "red-em");
    });
    $("#step_ViewDetail").click(function () {
        $("#step_ViewArtwork").css("display", "none");
        $("#step_ViewShipOrder").css("display", "none");
    });
    $("#step_ViewArtwork").click(function () {
        $("#step_ViewShipOrder").css("display", "none");
    });
});
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
            url: "/Adolfo/_ViewDetail/" + obj.attributes["value"].value,
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

function funcViewArtwork(obj) {

    $('#Query-order').css('display', 'none');
    $('#Query-Results').css('display', 'none');
    $('#Results-ViewDetail').css('display', 'none');
    //$('#Results-ViewArtwork').css('display', 'none');
    $('#Results-ViewShipOrder').css('display', 'none');

    $('#Results-ViewArtwork').slideDown();

    $('#step_ViewArtwork').addClass('red-em');
    $('#step_ViewArtwork').removeClass('gray-em');
    $('#step_ViewArtwork').siblings('em').addClass('gray-em');
    $('#step_ViewArtwork').siblings('em').removeClass('red-em');
    $("#step_ViewArtwork").removeAttr("style");
    $.ajax(
        {
            type: "get",
            url: "/Adolfo/ViewArtWork_All/" + obj.attributes["value"].value,
            contentType: "application/html; charset=utf-8",
            dataType: "html"
        })
    .success(function (data) {
        $("#Results-ViewArtwork").css("display", "block");
        $("#Results-ViewArtwork").html(data);

        //隐藏ConfirmArtwork

        $("#ConfirmArtwork").css("display", "none");
        $("#Close").css("display", "none");


    })
    .error(function (xhr, status) {
        //alert(status);
        $("#labtxt").html(status);
        showDiv();
    })
}


