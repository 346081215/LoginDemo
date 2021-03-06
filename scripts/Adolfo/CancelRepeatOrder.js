$(document).ready(init);
function init() {
    //$('div[id="Paged"] li').click(function () {
    //    var PageCount = this.innerText;
    //    document.getElementById("pc").value = 2;
    //    GetOrder();
    //});
    //日历控件
    FormComponents.init();
    //adf sdf
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
        $("#step2").removeAttr("style");
    });

    if ($("#IsPgGridFootView").val() == "0") {
        $("#GridPgFoot").css('display', 'none');
        $("#divSelectHead").css('display', 'none');
    }
    else {
        $("#GridPgFoot").css('display', 'block');
    }

    $("#PSID").change(function () {
        //alert('ps chg.')
        var urlPost = "/OrderCommon/GetPSHotline?psID=" + $("#PSID").val();
        $.post(urlPost, "", function (data, status) {
            //alert(data);
            if (data != null) {
                $("#pPSContact").html(data);
            }
            else {
                $("#pPSContact").html("");
            }
        });
    });
}

function GetOrder() {
    $("#IsPgGridFootView").val(1);
    $("#GridPgFoot").css('display', 'block');

    var urlPost = "/Adolfo/CancelOrder_GetOrders";
    $.post(urlPost, $("form").serialize(), function (data, status) {
        //alert(data.oos_lineno);
        var sTrHtml = "";
        var intSeq = 0;
        var _Array = new Array();
        $.each(data.Orderlist, function (i, item) {
            intSeq++;
            sTrHtml += "<tr>";
            sTrHtml += "<td class='center'>" + item.Seq + "</td>";
            sTrHtml += "<td>" + item.SubmitTime + "</td>";
            sTrHtml += "<td>" + item.PrintshopName + "</td>";
            sTrHtml += "<td>" + item.BrandID + "</td>";
            sTrHtml += "<td>" + item.CustOrderNO + "</td>";
            sTrHtml += "<td>" + item.CustOrderName + "</td>";
            sTrHtml += "<td>" + item.BrandName + "</td>";
            sTrHtml += "<td>" + item.PO + "</td>";
            sTrHtml += "<td>" + item.Order_Notes + "</td>";
            sTrHtml += "<td>" + item.MaximNO + "</td>";
            sTrHtml += "<td>" + item.Item + "</td>";
            sTrHtml += "<td>" + item.Currency + "</td>";
            sTrHtml += "<td>" + item.OrderQty + "</td>";
            sTrHtml += "<td>" + item.OOS_Status + "</td>";
            sTrHtml += "<td>" + item.Performance + "</td>";
            sTrHtml += "<td>" + item.Payment + "</td>";
            sTrHtml += "<td>" + item.PaymentDate + "</td>";
            sTrHtml += "<td>" + "<a href=\"#\"  onclick='return funcViewDetail(this);' value='" + item.MaximNO + "' >ViewDetail</a>" + "</td>";
            sTrHtml += "<td>" + item.DeliveryDate + "</td>";

            if (item.DeliveryDate == "" || item.DeliveryDate == null) {
                sTrHtml += "<td style=\"text-align:center \"><a></a>AWB number/POD</td>";
            }
            else {
                sTrHtml += "<td>" + "<a href=\"#\"  onclick='return funcViewShippingOrder(this);' value='" + item.MaximNO + "' >AWB number/POD</a>" + "</td>";
            }
            sTrHtml += "<td>" + "<a href=\"#\"  onclick='return funcViewCopyOrder(this);' value='" + item.MaximNO + "' >Copy Order</a>" + "</td>";
            sTrHtml += "</tr>";
            sTrHtml += "</tr>";
        });
        //document.getElementById("TotalPageCount").text = data.OrdersTotalCount;
        $("#TotalPageCount").html(data.OrdersTotalCount);
        document.getElementById("PageTotalCount").value = data.OrdersTotalCount;

        $("#Order tbody").html(sTrHtml);
        $("#Query-order").css("display", "none");
        $("#Query-Results").slideDown();
        $("#step1").attr("class", "gray-em");
        $("#step2").attr("class", "red-em");
        if (sTrHtml == "") {
            $("#Order tbody").html("None");
            $("#GridPgFoot").css("display", "none");
        }
    });
}


function GetSize(len) {
    return len * 12;
}
function GetHtmlStr(str, size) {
    return "<td style='min-width:" + GetSize(size) + "px;'>" + str + "</td>";
}
function funcViewDetail(obj) {
    $('#Query-order').css('display', 'none');
    $('#Query-Results').css('display', 'none');
    //$('#Results-ViewDetail').css('display', 'none');
    $('#Results-ViewArtwork').css('display', 'none');
    $('#Results-ViewShipOrder').css('display', 'none');
    $('#Results-CopyOrder').css('display', 'none');

    $('#Results-ViewDetail').slideDown();

    $('#step_ViewDetail').addClass('red-em');
    $('#step_ViewDetail').removeClass('gray-em');
    $('#step_ViewDetail').siblings('em').addClass('gray-em');
    $('#step_ViewDetail').siblings('em').removeClass('red-em');
    $("#step_ViewDetail").removeAttr("style");

    var MaximNO = obj.attributes["value"].value;
    console.log(MaximNO);
    $.post("/Adolfo/_ViewArtwork/", MaximNO, function (data) {
        var obj = jQuery.parseJSON(data);
        if (obj) {
            var StrHtml = "";

            var intSeq = 0;
            $.each(obj, function (i, item) {
                intSeq++;
                var _detailId = "strDates" + intSeq;
                var _tjpgts = "_tjpgt" + intSeq;
                var _tjpgt = "_tjpgy" + intSeq;
                var _ViewStaticed = "ViewStaticed" + intSeq;
                var _NewColumnMap = "NewColumnMap" + intSeq;
                StrHtml += "<tr>";
                StrHtml += "<td class='center'>" + "<a href=\"#\"  onclick='return ShowProductDetail(this);' value='" + item.MaximNO + ";" + item.ProductName + ";" + _detailId + ";" + _tjpgts + ";" + _tjpgt + ";" + _ViewStaticed + ";" + _NewColumnMap + ";NoConfirm;' ><span id='st" + _tjpgts + "'>+</span></a>" +
                    "<a href=\"#\"  onclick='return HideProductDetail(this);' value='" + item.MaximNO + ";" + item.ProductName + ";" + _detailId + ";" + _tjpgts + ";" + _tjpgt + ";" + _ViewStaticed + ";NoConfirm;' ><span style='display:none' id='st" + _tjpgt + "'>-</span></a>" + '&nbsp;&nbsp;<span id="OrdProdSeqNO">' + item.id + "</span></td>";


                StrHtml += "<td>" + item.ProductName + "</td>";
                StrHtml += "<td>" + item.OriOrderQty + "</td>";
                StrHtml += "<td>" + item.OrderQty + "</td>";
                if (item.oos_file != "") {
                    StrHtml += "<td class=center>" + "<a  href='javascript:;' id='btnView' target='_blank'  artworkUrl='" + item.oos_file + "' name='btnView' onclick='funcOnlyViewArtworkUrl(this);'>View</a>";
                } else {
                    StrHtml += "<td class=center>View</td>";
                }
                StrHtml += "</tr>";





                StrHtml += "<tr id='st" + _detailId + "' style='display:none' >";
                StrHtml += "<td colspan='6'>";

                StrHtml += "<table style='width: 100%;'>";
                StrHtml += "<thead>";
                StrHtml += "<tr id='NewColumnMap" + intSeq + "'>";

                StrHtml += "</tr>";
                StrHtml += "</thead>";
                StrHtml += "<tbody  id='ViewStaticed" + intSeq + "' class='OrderDetail'>";

                StrHtml += "</tbody>";
                StrHtml += "</table>";

                StrHtml += "</td>";

                StrHtml += "</tr>";
            })
            $("#Results-ViewArtwork").css("display", "block");
            $("#Adcakesbase").html(StrHtml);
        }
        else {
            $("#labtxt").html("Erro")
            showDiv();
        }
    })

}



function funcViewShippingOrder(obj) {

    $('#Query-order').css('display', 'none');
    $('#Query-Results').css('display', 'none');
    $('#Results-ViewDetail').css('display', 'none');
    $('#Results-ViewArtwork').css('display', 'none');
    //$('#Results-ViewShipOrder').css('display', 'none');
    $('#Results-CopyOrder').css('display', 'none');

    $('#Results-ViewShipOrder').slideDown();

    $('#step_ViewShipOrder').addClass('red-em');
    $('#step_ViewShipOrder').removeClass('gray-em');
    $('#step_ViewShipOrder').siblings('em').addClass('gray-em');
    $('#step_ViewShipOrder').siblings('em').removeClass('red-em');
    $("#step_ViewShipOrder").removeAttr("style");
    $.ajax(
        {
            type: "get",
            url: "/Adolfo/_ViewShippingOrder/?MaximNO=" + obj.attributes["value"].value,
            contentType: "application/html; charset=utf-8",
            dataType: "html"
        })
    .success(function (data) {

        //console.log(data);
        $("#Results-ViewShipOrder").css("display", "block");
        $("#Results-ViewShipOrder").html(data);
    })
    .error(function (xhr, status) {
        $("#labtxt").html(status)
        showDiv();
    })
}

function funcViewCopyOrder(obj) {

    $.ajax(
        {
            type: "get",
            url: "/Adolfo/CancelOrderCopy/" + obj.attributes["value"].value,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        })
    .success(function (data) {
         
        setTimeout(function () {
            debugger
            if (data.IsCopySucess) {
                var NewMaximNO = data.NewMaximNO;
                $("#labtxt").html("Order Copied successfully! Your Maxim No. is " + NewMaximNO + " . Please go to Confirm Order to view the artwork and confirm it.");
                showDiv();
            }
        }, 500)

    })
    .error(function (xhr, status) {
        hideloading();
        $("#labtxt").html(status)
        showDiv();
    })
}

function funcCopyOrder(obj) {
    //alert('Copy click...' + obj)

    var data = {
        CopyOID: obj.value
    };

}


//Detail  <
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
    console.log(ViewStaticed);
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
                data: { id: $id },
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
                                var dt = strDates[k];
                                if (dt.replace(" ", "") == "OriOrderQty" || dt.replace(" ", "") == "OrderQty") {
                                    dt = strDates[k].replace(" ", "");
                                    //alert(dt);
                                }
                                htmls += "<td class='center'>" + (items[dt]) + "</td>";
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
//Detail  >
$(function () {
    $("select[name='CategoryId']").change(function () {
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
        $("#step_ViewDetail").css("display", "none");
        $("#step_ViewArtwork").css("display", "none");
        $("#step_ViewShipOrder").css("display", "none");
        $("#step_ViewCopyOrder").css("display", "none");
        $("#Query-order").slideDown();
        $("#Query-Results").css("display", "none");
        $("#Results-ViewDetail").css("display", "none");
        $("#Results-ViewArtwork").css("display", "none");
        $("#Results-ViewShipOrder").css("display", "none");
        $('#Results-CopyOrder').css('display', 'none');
        $("#step1").attr("class", "red-em");
    });
    $("#step2").click(function () {
        $("#step_ViewDetail").css("display", "none");
        $("#step_ViewArtwork").css("display", "none");
        $("#step_ViewShipOrder").css("display", "none");
        $("#step_ViewCopyOrder").css("display", "none");
        $("#Query-Results").slideDown();
        $("#Results-ViewDetail").css("display", "none");
        $("#Results-ViewArtwork").css("display", "none");
        $("#Results-ViewShipOrder").css("display", "none");
        $('#Results-CopyOrder').css('display', 'none');
        $("#step2").attr("class", "red-em");
    });
    $("#step_ViewDetail").click(function () {
        $("#step_ViewArtwork").css("display", "none");
        $("#step_ViewShipOrder").css("display", "none");
        $("#step_ViewCopyOrder").css("display", "none");
    });
    $("#step_ViewArtwork").click(function () {
        $("#step_ViewShipOrder").css("display", "none");
        $("#step_ViewCopyOrder").css("display", "none");
    });
    $("#step_ViewShipOrder").click(function () {
        $("#step_ViewCopyOrder").css("display", "none");
        $('#Results-CopyOrder').css('display', 'none');
    });

});