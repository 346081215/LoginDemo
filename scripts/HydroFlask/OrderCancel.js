$(function () {
    $.post("/HydroFlask/OrderCancelLoad", null, function (data) {
        if (data.FunStatus == "success") {

            if (data.OrderCancelLoadData.UserRoleName == "Vendor") {
                $("#txtVendor").css("display", "block");
                $("#Vendor").css("display", "none");
                $("#txtVendor").val(data.OrderCancelLoadData._Vendor)
                $("#VendorID").val(data.OrderCancelLoadData.VendorID)
            }
            else {
                $.each(data.OrderCancelLoadData.Vendor, function (i, item) {
                    $("#Vendor").append("<option value='" + item.Value + "'>" + item.Text + "</option>");
                })
            }


            $.each(data.OrderCancelLoadData.PrintshopList, function (i, item) {
                $('#PrintShop').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            });
            $("#PrintShop").val("a743be0c-3da0-df11-9b6d-080027e8019f");
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
            newpage = parseInt(nowpage) -1;
            document.getElementById("pc").value = newpage;
            document.getElementById("nowpage").value = newpage;
            GetOrder();
            }
            });
    $('#Pagewown').click(function () {
        var nowpage = document.getElementById("nowpage").value;
        var maxpage = parseInt(document.getElementById("PageTotalCount").value);
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) < maxpage) newpage = parseInt(nowpage) +1;
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
            var maxpage = parseInt(document.getElementById("PageTotalCount").value) +1;
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
        $("#step_CancelOrder").css("display", "none");
        $("#Query-Results").css("display", "none");
        $("#Query-order").slideDown();
        $("#step1").attr("class", "red-em");
        $("#Results-CancelOrder").css("display", "none");
        $("#Results-ViewDetail").css("display", "none");
        $("#Results-ViewArtwork").css("display", "none");
        $("#step_ViewDetail").css("display", "none");
        $("#Order tbody").html("");

    });

    $("#step2").click(function () {
        //div
        $("#step2").removeAttr("style");
        $("#nowpage").val(1);
        $("#pc").val(1);
        GetOrder();
        $("#Query-Results").slideDown();
        $("#Results-ViewDetail").css("display", "none");
        $("#Results-CancelOrder").css("display", "none");
        $("#Results-ViewArtwork").css("display", "none");

        //页签
        $("#step2").attr("class", "red-em");
        $("#step_ViewDetail").css("display", "none");
        $("#step_CancelOrder").css("display", "none");
        $("#step_ViewArtwork").css("display", "none");
       
    });

    $("#CancelOrder").click(function () {
         $("#CancelRequstBy").val("");
        var checkedData = "";
        $("input:checkbox").each(function (i, item) {
            var s = $(this).prop("checked");
            if (s) {
                var SalesOrderId = $(this).parents("tr").find("#SalesOrderId").val();
                checkedData += SalesOrderId + ",";

            }

        })

        if (checkedData == "") {
            $("#labtxt").html("Please select order");
            $("#ok").css("display", "none")
            $("#no").css("display", "none")
            $("#CancelRequstBy").css("display", "none");
            $("#txtCloselbtn").css("display", "inline");

            showDiv();
        }
        else {
            $("#checkedData").val(checkedData);
            //alert(checkedData);
            ShowDivCancelRequstBy();
        }
    })

 

})
//弹框，是否确认取消订单
function ShowDivCancelRequstBy() {
    showDiv();
    $("#ok").css("display", "inline");
    $("#no").css("display", "inline")
    $("#txtCloselbtn").css("display", "none");
    $("#CancelRequstBy").css("display", "inline");
    $("#labtxt").html("Do you really want to cancel this order?");
    $("#popDiv p").css("margin-top", '0px');
}

function clickok() {
    if ($("#UserRoleName").val() == "Sales") {
        if ($("#CancelRequstBy").val() == "") {
            return false;
        }
    }
    if ($("#CancelRequstBy").val().length > 100) {
        $("#labtxt").html("Length should not exceed 100")
        showDiv();
        $("#txtCloselbtn").css("display", "inline");
        return false;
        }

        if ($("#oneSalesOrderId").val() != "") {

            var data_ = {
                    SalesOrderId: $("#oneSalesOrderId").val(),
                    CancelRequstBy: $("#CancelRequstBy").val()
        }
        }
        else {
            var data_ = {
                    SalesOrderId: $("#checkedData").val(),
                    CancelRequstBy: $("#CancelRequstBy").val()
}
        }
        $.post("/HydroFlask/CancelOrder", data_, function (data) {

            if (data.FunStatus == "success") {
                var CancelOrderResulthtml = "";
                $.each(data.CancelOrderResultListr, function (i, item) {
                    CancelOrderResulthtml += "<tr>";
                    CancelOrderResulthtml += "<td class='center'>" +item.Seq + "</td>";
                    CancelOrderResulthtml += "<td class='center'>" +item.PO + "</td>";
                    CancelOrderResulthtml += "<td class='center'>" + item.OrderNO + "</td>";
                    CancelOrderResulthtml += "<td class='center'>" + item.CancelRequstBy + "</td>";
                    CancelOrderResulthtml += "</tr>";
        })
                $("#CancelOrderResultListr tbody").html(CancelOrderResulthtml);

                $("#Query-order").css("display", "none");
                $("#Query-Results").css("display", "none");
                $("#Results-CancelOrder").slideDown();

                $("#step_CancelOrder").removeAttr("style");
                $("#step2").attr("class", "gray-em");
                $("#step_CancelOrder").attr("class", "red-em");

                $("#popDiv p").css("margin-top", "45px");
                closeDiv();
                Get_Order();
        }
        else {
            {
                    $("#labtxt").html(data.ErrorCode);
                    $("#ok").css("display", "none")
                    $("#no").css("display", "none")
                    $("#CancelRequstBy").css("display", "none");
                    $("#CancelRequstBy").val("");
                    $("#txtCloselbtn").css("display", "inline");
                showDiv();
        }
}

        })
    //}
}

function clickno() {
    $("#CancelRequstBy").val("");
    closeDiv();
}
//单个订单取消
function Cancelorder(obj) {
    $("#CancelRequstBy").val("");
    ShowDivCancelRequstBy();
    console.log($(obj).parents("tr").html())
    var SalesOrderId = $(obj).parents("tr").find("#SalesOrderId").val();
    $("#oneSalesOrderId").val(SalesOrderId);
}

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

function GetOrder() {
    var BrandId = "484EC9E5-A484-4203-8A37-5A5E9223721E";
    var accountid = $("#VendorID").val();
    var psid = $("#PrintShop").val();
    var po = $("#PO").val();
    var oos_orderno = $("#oos_orderno").val();
    var nowPage = $("#pc").val();
    // alert(nowPage);

    var url = "/HydroFlask/GetDataOrderCancel?BrandId=" + BrandId + "&accountid=" + accountid + "&psid=" + psid + "&po=" + po + "&oos_orderno=" + oos_orderno + "&pageIndex=" + nowPage;
    $.get(url, null, function (data) {
        //alert(data);
        $("#UserRoleName").val(data.UserRoleName);
        var StrHtml = "";
        var intSeq = 0;
        $.each(data.ResultList, function (i, item) {
            intSeq++;
            StrHtml += "<tr>";
            StrHtml += "<td><input id='checkbox" + intSeq + "' name='checkbox" + intSeq + "' type='checkbox' value='true' class='magic-checkbox'  style='display:none;' /><label for='checkbox" + intSeq + "' style='margin-bottom: 20px;padding-left: 30px;'></label><input type='hidden' id='SalesOrderId'  value='" + item.SalesOrderId + "' />";
            StrHtml += "<td>" + item.Seq + "</td>";
            StrHtml += "<td>" + item.Received_PO_Date + "</td>";
            StrHtml += "<td>" + item.PO + "</td>";
            StrHtml += "<td>" + item.OrderNO + "</td>";
            StrHtml += "<td>" + item.OOS_Status + "</td>";
            StrHtml += "<td>" + item.POQty + "</td>";
            StrHtml += "<td>" + item.UOM + "</td>";
            StrHtml += "<td>" + "<a href=\"#\"  onclick='return funcViewDetail(this);' value='" + item.SalesOrderId + "' >ViewDetail</a>" + "</td>";
            //if (item.OOS_artwork != "") {
            //    StrHtml += "<td>" + "<a href=\"#\"  onclick='return funcViewArtwork(this);' value='" + item.SalesOrderId + "' >Artwork</a>" + "</td>";
            //}
            //else {
            //    StrHtml += "<td>" + "<a></a>Artwork</td>";
            //}

            StrHtml += "<td>" + " <button type=\"button\" name=\"name\" class=\"btn\" value=\"Cancel Order\" style=\"margin-top:-2px;\"  onclick='Cancelorder(this)'>Cancel Order</button>" + "</td>";


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
function Get_Order()
{
    var BrandId = "484EC9E5-A484-4203-8A37-5A5E9223721E";
    var accountid = $("#VendorID").val();
    var psid = $("#PrintShop").val();
    var po = $("#PO").val();
    var oos_orderno = $("#oos_orderno").val();
    var nowPage = $("#pc").val();
    // alert(nowPage);

    var url = "/HydroFlask/GetDataOrderCancel?BrandId=" + BrandId + "&accountid=" + accountid + "&psid=" + psid + "&po=" + po + "&oos_orderno=" + oos_orderno + "&pageIndex=" + nowPage;
    $.get(url, null, function (data) {
        //alert(data);
        $("#UserRoleName").val(data.UserRoleName);
        var StrHtml = "";
        var intSeq = 0;
        $.each(data.ResultList, function (i, item) {
            intSeq++;
            StrHtml += "<tr>";
            StrHtml += "<td><input id='checkbox" + intSeq + "' name='checkbox" + intSeq + "' type='checkbox' value='true' class='magic-checkbox'  style='display:none;' /><label for='checkbox" + intSeq + "' style='margin-bottom: 20px;padding-left: 30px;'></label><input type='hidden' id='SalesOrderId'  value='" + item.SalesOrderId + "' />";
            StrHtml += "<td>" + item.Seq + "</td>";
            StrHtml += "<td>" + item.Received_PO_Date + "</td>";
            StrHtml += "<td>" + item.PO + "</td>";
            StrHtml += "<td>" + item.OrderNO + "</td>";
            StrHtml += "<td>" + item.OOS_Status + "</td>";
            StrHtml += "<td>" + item.POQty + "</td>";
            StrHtml += "<td>" + item.UOM + "</td>";
            StrHtml += "<td>" + "<a href=\"#\"  onclick='return funcViewDetail(this);' value='" + item.SalesOrderId + "' >ViewDetail</a>" + "</td>";
            //if (item.OOS_artwork != "") {
            //    StrHtml += "<td>" + "<a href=\"#\"  onclick='return funcViewArtwork(this);' value='" + item.SalesOrderId + "' >Artwork</a>" + "</td>";
            //}
            //else {
            //    StrHtml += "<td>" + "<a></a>Artwork</td>";
            //}

            StrHtml += "<td>" + " <button type=\"button\" name=\"name\" class=\"btn\" value=\"Cancel Order\" style=\"margin-top:-2px;\"  onclick='Cancelorder(this)'>Cancel Order</button>" + "</td>";


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
        } else {
            $("#GridViewPage").removeAttr("style");
            $("#ExportExcel").removeAttr("style");
        }
        //$("#step2").removeAttr("style");
        //$("#Query-order").css("display", "none");
        //$("#Query-Results").slideDown();
        //$("#step1").attr("class", "gray-em");
        //$("#step2").attr("class", "red-em");
    })
}
