﻿$(function () {

    $("#btnQuery").click(function () {
        $("#nowpage").val(1);
        $("#pc").val(1);
        document.getElementById("nowpage").value = 1;
        GetOrder();
    });

    $('#PageIndex').click(function () {
        document.getElementById("pc").value = 1;
        document.getElementById("nowpage").value = 1;
        if ($("#TotalPageCount").html() == "0") {
            return false;
        }
        else {
            GetOrder();
        }
    });
    $('#Pageup').click(function () {
        var nowpage = document.getElementById("nowpage").value;
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) > 1) {
            newpage = parseInt(nowpage) - 1;
            document.getElementById("pc").value = newpage;
            document.getElementById("nowpage").value = newpage;
            if ($("#TotalPageCount").html() == "0") {
                return false;
            }
            else {
                GetOrder();
            }
        }
    });
    $('#Pagewown').click(function () {
        var nowpage = document.getElementById("nowpage").value;
        var maxpage = parseInt(document.getElementById("PageTotalCount").value);
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) < maxpage) newpage = parseInt(nowpage) + 1;
        document.getElementById("pc").value = newpage;
        document.getElementById("nowpage").value = newpage;
        if ($("#TotalPageCount").html() == "0") {
            return false;
        }
        else {
            GetOrder();
        }

    });
    $('#PageLast').click(function () {
        var maxpage = parseInt(document.getElementById("PageTotalCount").value);
        document.getElementById("pc").value = maxpage;
        document.getElementById("nowpage").value = maxpage;
        if ($("#TotalPageCount").html() == "0") {
            return false;
        }
        else {
            GetOrder();
        }
    });
    $('#PageGO').click(function () {
        var nowpage = parseInt(document.getElementById("nowpage").value);
        var maxpage = parseInt(document.getElementById("PageTotalCount").value) + 1;
        if (nowpage > 0 && nowpage < maxpage) {
            document.getElementById("pc").value = document.getElementById("nowpage").value;
            if ($("#TotalPageCount").html() == "0") {
                return false;
            }
            else {
                GetOrder();
            }
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
    $("#step1").click(function () {
        $("#step2").css("display", "none");
        $("#Query-Results").css("display", "none");
        $("#Query-order").slideDown();
        $("#Results-ViewDetail").css("display", "none");
        $("#Results-ViewArtwork").css("display", "none");
        $("#step_ViewDetail").css("display", "none");
        $("#step_ViewArtwork").css("display", "none");
        $("#step_CancelOrder").css("display", "none");
        $("#Results-CancelOrder").css('display', 'none');
        $("#step_Revise_Order").css("display", "none");
        $("#Results").css("display", "none");
        $("#step1").attr("class", "red-em");
    });
    $("#step2").click(function () {
        $("#Query-Results").slideDown();
        $("#Results-ViewDetail").css("display", "none");
        $("#Results-ViewArtwork").css("display", "none");
        $("#step_ViewDetail").css("display", "none");
        $("#step_ViewArtwork").css("display", "none");
        $("#Results-CancelOrder").css('display', 'none');
        $("#step_Revise_Order").css("display", "none");
        $("#Results").css("display", "none");
        $("#step_CancelOrder").css("display", "none")
        $("#step_confirm").css("display", "none");
        $("#step2").attr("class", "red-em");
        GetOrder();
    });
});
function GetOrder() {
    var QueryData = {
        MaximOrder: $("#OrderNO").val(),
        PO: $("#txtPO").val(),
        StyleNumber: $("#txtStyleNumber").val(),
        vendornumber: $("#_Vendor").val(),
        Season: $("#txtseason").val(),
        Itemcode: $("#productid").val(),
        tPageFunc: $("#tPageFunc").val(),
       
        PrintShop: $("#PrintShopId").val(),
        Page: document.getElementById("nowpage").value
    }
    debugger;
    $.post("/Adolfo/ConfirmOrderQuery", QueryData, function (data) {
        if (data) {
            var html = "";
            var intSeq = 0;
            $("#fontTotal").html(data.totalcount)
            var TotalPageCount = "0";
            debugger;
            if (data.Table.length > 0) {
                $.each(data.Table, function (i, item) {
                    intSeq++;
                    html += "<tr>";
                    html += "<td class='center'>" + item.Seq + "</td>";
                    html += "<td class='center'>" + item.UploadDate + "</td>";
                    if (item.BrandId == "PDT001") {
                        html += "<td class='center'>" + item.OOS_Var03 + "</td>";
                        html += "<td class='center'>" + item.OOS_Var02 + "</td>";
                        html += "<td class='center'>" + item.PO + "</td>";
                        html += "<td class='center'>" + item.MaximOrderNO + "</td>";
                        html += "<td class='center'>" + item.VendorNumber + "</td>";
                        html += "<td class='center'>" + item.OrderReference + "</td>";
                    }
                    else if (item.BrandId == "ADO001") {
                        html += "<td class='center'>" + item.Series + "</td>";
                        html += "<td class='center'>" + item.MaximOrderNO + "</td>";
                        html += "<td class='center'>" + item.PO + "</td>";
                        html += "<td class='center'>" + item.StyleNumber + "</td>";
                        html += "<td class='center'>" + item.VendorNumber + "</td>";
                        html += "<td class='center'>" + item.VendorName + "</td>";
                        html += "<td class='center'>" + item.Season + "</td>";
                    }
                    else {
                        html += "<td class='center'>" + item.PO + "</td>";
                        html += "<td class='center'>" + item.MaximOrderNO + "</td>";
                        html += "<td class='center'>" + item.VendorNumber + "</td>";
                        html += "<td class='center'>" + item.VendorName + "</td>";
                        html += "<td class='center'>" + item.OrderReference + "</td>";
                        html += "<td class='center'>" + item.OOS_Notes + "</td>";
                    }

                    html += "<td class='center' style='text-align:right;'>" + item.UnconfirmDays + "</td>";
                    html += "<td class='center' style='text-align:right;'>" + item.Item + "</td>";
                    html += "<td class='center' style='text-align:right;'>" + item.OrderQty + "</td>";
                    html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcViewProductAndDetail(this);' value='" + item.MaximOrderNO + "^NoConfirm' >" + $ConfirmOrder.View_Detail + "</a>" + "</td>";
 

                    if ($("#tPageFunc").val() != "pend") {

                        if (item.Level == 2)
                        {
                            html += "<td class='center' style='vertical-align: middle;'>"+$ConfirmOrder.SubmitOrder+"</td>";
                        }
                        else
                        {
                            html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcShowConfirmPage(this);' value='" + item.MaximOrderNO + "^NoConfirm' >" + $ConfirmOrder.SubmitOrder + "</a></td>";
                        }
                        debugger;
                        if (data.EnableReviseQtyFunc == "True") {

                            if (item.BrandId == "ADO001" && ($("#tPageFunc").val().toLowerCase() == "reject" || $("#tPageFunc").val().toLowerCase() == "vendorreject")) {

                            } else
                            {
                                html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcReviseOrder(this);' value='" + item.MaximOrderNO + "^NoConfirm' >" + $ConfirmOrder.ReviseOrder + "</a>" + "</td>";
                            }
                        }
                    }
                    

                    //html += "<td class='center'>"+ "<a href=\"#\"  onclick='return funCancelOrder(this);' value='" + item.MaximOrderNO +"' >Cancel</a>" + "</td>";
                    html += "</tr>";
                    
                });
                TotalPageCount = data.Table[0].TotalPageCount;
            } else {
                $("#TotalPageCount").html("0");
            }
            console.log(html);
            $("#OrderDetail tbody").html(html);
           
            $("#Query-order").css("display", "none")
            $("#Results-CancelOrder").css('display', 'none');
            $("#Query-Results").slideDown();
            $("#step2").removeAttr("style");
            $("#step1").attr("class", "gray-em");
            $("#step2").attr("class", "red-em");
            $("#TotalPageCount").html(TotalPageCount);

            $("#PageTotalCount").val(TotalPageCount);
            //$("#GridPgFoot").removeAttr("style");
        }
    });
}
function funcViewProductAndDetail(obj) {

    var language = $("#language").val();
    $('#Query-order').css('display', 'none');
    $('#Query-Results').css('display', 'none');
    $("#step_CancelOrder").css("display", "none")
    $("#Results-CancelOrder").css('display', 'none');
    //$('#Results-ViewDetail').css('display', 'none');
    $('#Results-ViewArtwork').css('display', 'none');
    $('#Results-ViewShipOrder').css('display', 'none');

    $('#Results-ViewDetail').slideDown();

    $('#step_ViewDetail').addClass('red-em');
    $('#step_ViewDetail').removeClass('gray-em');
    $('#step_ViewDetail').siblings('em').addClass('gray-em');
    $('#step_ViewDetail').siblings('em').removeClass('red-em');
    $("#step_ViewDetail").removeAttr("style");
    $("#Results-ViewDetail").css("display", "block");


    var $id = obj.attributes["value"].value;
    var $strDates = $id.split("^");
    var $OrderNo = ($strDates[0]);
    $.ajax({
        type: "post",
        url: "/Adolfo/GetOrderProductInfor/",
        data: {
            MaximNO: $OrderNo,
            SpareRate: "noSpareRate"
        },
        dataType: "json",
        success: function (res) {
            console.log(res);
            var obj = jQuery.parseJSON(res);
            if (obj) {
                var html = "";
                    CustomerPONum = $ConfirmOrder.Customer_PO;
                    MaximNO = $ConfirmOrder.MaximNo;
                    Seq = $ConfirmOrder.Seq;
                    Item = $ConfirmOrder.Item;
                    OriOrderQty = $ConfirmOrder.OriOrderQty;
                    OrderQty = $ConfirmOrder.OrderQty;
                    ArtWork = $ConfirmOrder.ArtWork;
                    View = $ConfirmOrder.View;

                var tyhtml = "<p class='select' style='font-size:15px;'>" + CustomerPONum + "= [" + obj[0].CustomerPO + " ], " + MaximNO + " = [" + $OrderNo + "].</p>";
                tyhtml += "<div id='Gridview' class='dataTables_wrapper form-inline' role='grid'>";
                tyhtml += "<table class='table table-striped table-bordered table-hover table-full-width dataTable' aria-describedby='sample_2_info'>";
                tyhtml += "<thead>";
                tyhtml += "<tr>";
                tyhtml += "<th class=center>" + Seq + "</th>";
                tyhtml += "<th class=center>" + Item + "</th>";
                tyhtml += "<th class=center>" + OriOrderQty + "</th>";
                tyhtml += "<th class=center>" + OrderQty + "</th>";
                //tyhtml += "<th class=center>Is Confirmed</th>";
                tyhtml += "<th class=center>" + ArtWork + "</th>";
                tyhtml += "</tr>";
                tyhtml += "</thead>";
                tyhtml += "<tbody id='Adcakesbase' class='OrderDetail'>";
                tyhtml += "</tbody>";
                tyhtml += "</table>";
                tyhtml += "</div>";
                $("#Results-ViewDetail").html(tyhtml);
                var intSeq = 0;
                $.each(obj, function (i, item) {
                    intSeq++;
                    var _detailId = "strDates" + intSeq;
                    var _tjpgts = "_tjpgt" + intSeq;
                    var _tjpgt = "_tjpgy" + intSeq;
                    var _ViewStaticed = "ViewStaticed" + intSeq;
                    var _NewColumnMap = "NewColumnMap" + intSeq;
                    html += "<tr>";
                    html += "<td class='center'>" + "<a href=\"#\"  onclick='return ShowProductDetail(this);' value='" + $OrderNo + ";" + item.ProductName + ";" + _detailId + ";" + _tjpgts + ";" + _tjpgt + ";" + _ViewStaticed + ";" + _NewColumnMap + ";NoConfirm;' ><span id='st" + _tjpgts + "'>+</span></a>" +
                        "<a href=\"#\"  onclick='return HideProductDetail(this);' value='" + $OrderNo + ";" + item.ProductName + ";" + _detailId + ";" + _tjpgts + ";" + _tjpgt + ";" + _ViewStaticed + ";NoConfirm;' ><span style='display:none' id='st" + _tjpgt + "'>-</span></a>" + '&nbsp;&nbsp;<span id="OrdProdSeqNO">' + item.id + "</span></td>";
                    html += "<td class='center'>" + item.ProductName + "</td>";
                    html += "<td class='center'>" + item.OriOrderQty + "</td>";
                    html += "<td class='center'>" + item.OrderQty + "</td>";
                    //html += "<td class='center'>" + item.ArtworkIsConfirmed + "</td>";
                    if (item.oos_file != "") {
                        html += "<td class=center>" + "<a  href='javascript:;' id='btnView' target='_blank'  artworkUrl='" + item.oos_file + "' name='btnView' onclick='funcOnlyViewArtworkUrl(this);'>" + View + "</a>";
                    } else {
                        html += "<td class=center>pending</td>";
                    }
                    html += "</tr>";

                    html += "<tr id='st" + _detailId + "' style='display:none' >";
                    html += "<td colspan='6'>";

                    html += "<table style='margin-left: 170px;'>";
                    html += "<thead>";
                    html += "<tr id='NewColumnMap" + intSeq + "'>";

                    html += "</tr>";
                    html += "</thead>";
                    html += "<tbody  id='ViewStaticed" + intSeq + "' class='OrderDetail'>";

                    html += "</tbody>";
                    html += "</table>";

                    html += "</td>";
                    html += "</tr>";

                });
                $("#Adcakesbase").html(html);
            }
        },
        error: function () {

            alert("Error")
        }


    })

}

function funcShowConfirmPage(obj) {

    $('#Query-order').css('display', 'none');
    $('#Query-Results').css('display', 'none');
    $("#step_CancelOrder").css("display", "none")
    $("#Results-CancelOrder").css('display', 'none');
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
            url: "/Adolfo/ViewArtWork_All/?data=" + obj.attributes["value"].value + "^"+$("#tPageFunc").val(),
            contentType: "application/html; charset=utf-8",
            dataType: "html"
        })
    .success(function (data) {
        $("#Results-ViewArtwork").css("display", "block");
        $("#Results-ViewArtwork").html(data);

        var Confirmed = $("#hideConfirmed").val();
        if (Confirmed != 0) {
            $("#btnArtworkOKNext").attr("disabled", "disabled");
        }
    })
    .error(function (xhr, status) {
        //alert(status);
        $("#labtxt").html(status);
        showDiv();
    })

}

function ShowProductDetail(obj) {
    var $id = obj.attributes["value"].value;
    var $strDates = $id.split(";");
    var strDates = ($strDates[2]);
    var $_tjpgts = ($strDates[3]);
    var $_tjpgt = ($strDates[4]);
    var $_ViewStaticed = ($strDates[5]);
    var $_NewColumnMap = ($strDates[6]);
    var viewstrDates = ("#st" + strDates);
    var tjpgts = ("#st" + $_tjpgts);
    var tjpgt = ("#st" + $_tjpgt);
    var ViewStaticed = ("#" + $_ViewStaticed);
    var NewColumnMap = ("#" + $_NewColumnMap);
    $(tjpgts).css("display", "none");
    $(tjpgt).removeAttr("style");
    $(viewstrDates).removeAttr("style");

    $.ajax({
        type: "Get",
        url: "/Adolfo/GetDetailViewColumns/",
        data: { id: $id },
        success: function (date) {
            var strDates = date.split("^");
            var intSeq = 0;
            if (strDates) {
                var html = "";
                for (var i = 0; i < (strDates.length) ; i++) {
                    intSeq++;
                    html += "<th class='center'>" + strDates[i] + "</th>";
                }
                $(NewColumnMap).html(html);
            };

            $.ajax({
                type: "post",
                url: "/Adolfo/GetDetailViewColumnsOrderVarData/",
                data: {
                    id: $id,
                    pgSpareRate: "noSpareRate"
                },
                dataType: "json",
                success: function ($res) {
                    var $ckse = jQuery.parseJSON($res);
                    if ($ckse) {
                        var htmls = "";
                        var tpintSeq = 0;
                        $.each($ckse, function (dd, items) {
                            tpintSeq++;
                            htmls += "<tr>";

                            for (var k = 0; k < (strDates.length) ; k++) {
                                var dc = strDates[k];
                                if (dc.replace(" ", "") == "OriOrderQty" || dc.replace(" ", "") == "OrderQty") {
                                    dc = strDates[k].replace(" ", "");
                                    //alert(dt);
                                }
                                htmls += "<td class='center'>" + (items[dc]) + "</td>";
                            }
                            htmls += "</tr>";
                        });
                        $(ViewStaticed).html(htmls);
                    }
                }

            });

        }
    });

}

function HideProductDetail(obj) {
    var $id = obj.attributes["value"].value;
    var $strDates = $id.split(";");
    var strDates = ($strDates[2]);
    var $_tjpgts = ($strDates[3]);
    var $_tjpgt = ($strDates[4]);

    var viewstrDates = ("#st" + strDates);
    var tjpgts = ("#st" + $_tjpgts);
    var tjpgt = ("#st" + $_tjpgt);

    $(tjpgts).removeAttr("style");
    $(tjpgt).css("display", "none")
    $(viewstrDates).css("display", "none");

}

function funcOnlyViewArtworkUrl(obj) {

    var _id = $(obj).parents("tr").find("#OrdProdSeqNO").html();
    var oos_file = $(obj).attr("artworkUrl");

    var winRef = window.open("", "_blank");//打开一个新的页面

    function loc() {
        winRef.location = oos_file;
    }
    setTimeout(loc(), 800)

}

function funcReviseOrder(obj) {
    $('#Query-order').css('display', 'none');
    $('#Query-Results').css('display', 'none');
    $("#step_CancelOrder").css("display", "none")
    $("#step_confirm").css("display", "none")
    $("#Results-CancelOrder").css('display', 'none');
    $('#Results-ViewDetail').css('display', 'none');
    $('#Results-ViewArtwork').css('display', 'none');
    $('#Results-ViewShipOrder').css('display', 'none');


    $('#Results').slideDown();

    $('#step_Revise_Order').addClass('red-em');
    $('#step_Revise_Order').removeClass('gray-em');
    $('#step_Revise_Order').siblings('em').addClass('gray-em');
    $('#step_Revise_Order').siblings('em').removeClass('red-em');
    $("#step_Revise_Order").removeAttr("style");

    $('#PrintShop').val("");
    $('#Currency').val("");
    $('#BillTo').val("");
    $('#ShipTO').val("");
    $('#BillToAddress').val("");
    $('#ShipToAddress').val("");
    $('#CustomerPO').val("");
    $('#Contact').val("");
    $('#AddComments').val("");
    $('#TelTo').val("");
    $('#SpareRate').val("");
    $('#Submit_E').val(obj.attributes["value"].value);

    debugger;
    $.ajax({
        type: "get",
        url: "/Adolfo/ConfirmOrderRevise/?data=" + obj.attributes["value"].value,
        contentType: "application/html; charset=utf-8",
        dataType: "html"
    })
    .success(function (data) {
        debugger;
        $("#Results").css("display", "block");
        $("#Results").html(data);
        var Confirmed = $("#hideConfirmed").val();
        if (Confirmed != 0) {
            //$("#btnArtworkOKNext").attr("disabled", "disabled");
            $("#btnArtworkOKNext_Revise").attr("disabled", "disabled");
            
        }
    })
    .error(function (xhr, status) {
        //alert(status);
        $("#labtxt").html(status);
        showDiv();
    })
}

function btnNewSpareRate() {
    debugger;
    var $OrderNo = $("#Submit_E").val();
    var $SpareRate = $("#SpareRate option:selected").val();
    $.ajax({
        type: "post",
        url: "/Adolfo/GetOrderProductInfor/",
        data: {
            MaximNO: $OrderNo,
            SpareRate: $SpareRate
        },
        dataType: "json",
        success: function (res) {
            var SpareRate = $("#OrderQtyOK").text();
            var OrderQtyOK = (+$SpareRate + "%");
            $("#OrderQtyOK").text("(" + OrderQtyOK + ")");
            var obj = jQuery.parseJSON(res);
            if (obj) {
                var html = "";
                var intSeq = 0;
                $.each(obj, function (i, item) {
                    intSeq++;
                    var _detailId = "strDates" + intSeq;
                    var _tjpgts = "tjp_gt" + intSeq;
                    var _tjpgt = "tjp_gy" + intSeq;
                    var ViewStaticed = "View_Staticed" + intSeq;
                    var NewColumnMap = "New_ColumnMap" + intSeq;
                    html += "<tr>";
                    html += "<td class='center'>" + "<a href=\"#\"  onclick='return ViewOneProductDetail(this);' value='" + $OrderNo + ";" + item.ProductName + ";" + _detailId + ";" + _tjpgts + ";" + _tjpgt + ";" + ViewStaticed + ";" + NewColumnMap + ";NoConfirm;' ><span id='tjp_gt" + intSeq + "'>+</span></a>" +
                        "<a href=\"#\"  onclick='return HideOneProductDetail(this);' value='" + $OrderNo + ";" + item.ProductName + ";" + _detailId + ";" + _tjpgts + ";" + _tjpgt + ";" + ViewStaticed + ";NoConfirm;' ><span style='display:none' id='tjp_gy" + intSeq + "'>-</span></a>" + '&nbsp;&nbsp;<span id="OrdProdSeqNO">' + item.id + "</span></td>";
                    html += "<td class='center'>" + item.ProductName + "</td>";
                    html += "<td class='center'>" + item.OriOrderQty + "</td>";
                    html += "<td class='center'>" + item.OrderQty + "</td>";
                    //html += "<td class='center'>" + item.ArtworkIsConfirmed + "</td>";
                    if (item.oos_file != "") {
                        html += "<td class=center>" + "<a  href='javascript:;' id='btnView' target='_blank'  artworkUrl='" + item.oos_file + "' name='btnView' onclick='funcUpdateViewStatus(this);'>" +$ConfirmOrder.View_1 + "</a>";
                    } else {
                        html += "<td class=center>View</td>";
                    }
                    html += "</tr>";

                    html += "<tr id='strDates" + intSeq + "' style='display:none' >";
                    html += "<td colspan='6'>";

                    html += "<table style='margin-left: 170px;'>";
                    html += "<thead>";
                    html += "<tr id='New_ColumnMap" + intSeq + "'>";

                    html += "</tr>";
                    html += "</thead>";
                    html += "<tbody  id='View_Staticed" + intSeq + "' class='OrderDetail'>";

                    html += "</tbody>";
                    html += "</table>";

                    html += "</td>";
                    html += "</tr>";

                });

                $("#AndDetail").html(html);
            }
        }
    })

};
