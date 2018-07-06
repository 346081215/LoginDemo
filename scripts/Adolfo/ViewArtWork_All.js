$(function () {

    if ($("#tBrandId").val() == "NULL") {
        //debugger;
        //alert($("#tBrandId").val());
        $("#divSpareRate").css("display", "none");
        $("#OrderQtyOK").text("(include rate)");
    }
    else {
        $("#divSpareRate").css("display", "block");
        $("#OrderQtyOK").text("(0%)");
    }


    $("#btnArtworkOKNext").click(function () {

        var OrderNo_ = $("#OrderNo_").val();
        debugger;
        if ($("#RejectBrandID").val().trim() == "ADO001") {
            var ProductNames = "";
            $("#TableDetail tbody").find('tr').each(function (index) {
                debugger;
                if (index >=0) {
                    var row = $(this);
                    var selected = row.find('[name="ckSelect"]').prop('checked');
                    if (selected) {
                        ProductNames += row.find('[name="hfProductSeqNO"]').val() + "^";     
                    }
                }
            });
            $("#ADReject").val(ProductNames);


            if ($("#ADReject").val() != "") {
                if ($("#RejectValue").val().trim() == "") {
                    $("#labtxt").html($ConfirmOrder.PLEASE_FILL_IN_THE_REASONS_FOR_REFUSAL);
                    showDiv();
                    return;
                }
                $("#SubmintOrder").html("Reject Order");
            }
        }

        $.post("/Adolfo/GetConfirmOrder", { OrderNO: OrderNo_ }, function (data) {

            if (data.FunStatus == "success") {

                $('#brandid').val(data.ConfirmOrderLoadData.brandid);

                if ($("#brandid").val() == "PDT001") {
                    $("#AccountDivID").css("display", "block");
                } else {
                    $("#AccountDivID").css("display", "none");
                }

                $.each(data.ConfirmOrderLoadData.PSList, function (i, item) {

                    if (item.Disabled == false) {
                        $('#PrintShop').append("<option value='" + item.Value + "' style='color:black; font-weight:700'>" + item.Text + "</option>");
                    }
                    else {
                        $('#PrintShop').append("<option value='" + item.Value + "' disabled='disabled' >" + item.Text + "</option>");
                    }


                });

                $.each(data.ConfirmOrderLoadData.Carrier, function (i, item) {
                    $('#Carrier').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
                });

                $.each(data.ConfirmOrderLoadData.TypeofPayment, function (i, item) {
                    $('#Typeofpayment').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
                });


                $('#PrintShop').val(data.ConfirmOrderLoadData._PSID)

                $.each(data.ConfirmOrderLoadData.OrderRateList, function (i, item) {
                    $('#SpareRate').append("<option value='" + item.Value + "' >" + item.Text + "</option>");
                });
                $('#SpareRate').val(0)


                $('#BillTo').append("<option value=''>--Please Select--</option>");

                if (data.ConfirmOrderLoadData.BillToList == null) {

                }
                else {
                    $.each(data.ConfirmOrderLoadData.BillToList, function (i, item) {
                        $('#BillTo').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
                    });
                    $("#BillTo").val(data.ConfirmOrderLoadData.BillToList[0].Value);

                    $('#BillToAddress').val(data.ConfirmOrderLoadData.BillToAddress);
                    $("#BillToContact").val(data.ConfirmOrderLoadData.BillContact);
                    $("#BillToTel").val(data.ConfirmOrderLoadData.BillTel);
                }


                $('#ShipTO').append("<option value=''>--Please Select--</option>");
                $.each(data.ConfirmOrderLoadData.ShipToList, function (i, item) {
                    $('#ShipTO').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
                });
                $('#ShipTO').val(data.ConfirmOrderLoadData.ShipToList[0].Value)
                //     alert($('#ShipTO').val());
                //   alert($('#ShipTO').find("option:selected").text());
                if ($('#ShipTO').val() != "") {
                    shipTOChange();
                }
                $("#Currencyid").val(data.ConfirmOrderLoadData.CurrencyID);
                $("#Currency").val(data.ConfirmOrderLoadData.Currency);
                $("#PayType").val(data.ConfirmOrderLoadData.PayType);
                $("#ConformOrder").slideDown();
                $("#Head").css("display", "none");
                $("#step_ViewArtwork").css("display", "none");
                $("#step_confirm").removeAttr("style");
                $("#step_confirm").attr("class", "red-em");

                $.each(data.ConfirmOrderLoadData.ShipmentType, function (i, item) {
                    $('#ShipmentType').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
                });
            }
            else
            {
                $("#labtxt").html(data.ErrorCode)
                showDiv();
                return;
            }
        });

    });


    $("#SubmintOrder").click(function () {
        // alert("123");
        var language = $("#language").val();
        if ($("#PrintShop").val() == "" || $("#PrintShop").val() == null) {
            //alert("Please select printshop!");
                $("#labtxt").html($ConfirmOrder.PleaseSelectPrintShop)
                showDiv();
                return;
        }

        //alert($("#PrintShop").val());

        if ($("#BillTo").val() == "" || $("#BillTo").val() == null) {
            //alert("Please select bill account!");
            $("#labtxt").html($ConfirmOrder.PleaseSelectBillAccount)
                showDiv();
                return; 
        }
        if ($("#ShipTO").val() == "" || $("#ShipTO").val() == null) {
            //alert("Please select ship account!");
            $("#labtxt").html($ConfirmOrder.PleaseSelectShipAccount);
                showDiv();
                return; 
        }

        if ($("#Shiptoaddress").val() == "" || $("#Shiptoaddress").val() == null) {
            //alert("Please select ship address!");
            $("#labtxt").html($ConfirmOrder.PleaseSelectShipAddress);
                showDiv();
                return;
        }
        
        if ($("#ShipmentType").val() == "" || $("#ShipmentType").val() == null ){
            //alert("Please select ship address!");
            $("#labtxt").html($ConfirmOrder.PleaseSelectShipmentType);
                showDiv();
                return;
        }
        else
        {
            if ($("#ShipmentType").val() == "Express" && ($("#Carrier").val() == "" || $("#Carrier").val() == null))
            {
                $("#labtxt").html($ConfirmOrder.PleaseSelectACourierCompany);
                    showDiv();
                    return;
            }
            if ($("#brandid").val() == "PDT001" && $("#PrintShop").val() == "PS017") {

                var ShipmentTypeid = $("#ShipmentType").val();

                if (ShipmentTypeid == "Express") {
                    if ($("#Carrier").val() == "")
                    {
                        $("#labtxt").html($ConfirmOrder.PleaseSelectACourierCompany);
                            showDiv();
                            return; 
                    }

                    if ($("#Typeofpayment").val() == "" && $("#brandid").val() != "STB001")
                    {
                            $("#labtxt").html($ConfirmOrder.PleaseSelectAPaymentMethod);
                            showDiv();
                            return;
                    }
                    if (($("#Typeofpayment").val() == "2" || $("#Typeofpayment").val() == "3") && $.trim($("#Accountnumber").val()) == "")
                    {
                        $("#labtxt").html($ConfirmOrder.AccountNumberNotNull);
                            showDiv();
                            return;
                    }
                }
            }
        }
        var SpareRate = $("#SpareRate option:selected").val();
        var $SpareRate = '(' + SpareRate + "%)";
        var $OrderQtyOK = $("#OrderQtyOK").html();
        //debugger;
        var _isNeedNotifyRate = false
        if ($("#divSpareRate").css("display") != "none") {
            if ($SpareRate != $OrderQtyOK) {
                _isNeedNotifyRate = true
            }
        }

        if (_isNeedNotifyRate == true)
        {
            //debugger;
            $("#labtxt").html($ConfirmOrder.ClickOKCheckSpareRate);
                showDiv();
                return;
        }
        else {
            //alert("do submit by2.");

            showloading();
            //DoSubmitAction();
            RePlacedVendorPOConfirm();
        }
    });

    $("#BillTo").change(function () {
        var billid = $("#BillTo").val();
        if (billid.length == 0) {
            $('#BillToAddress').val("");
            $("#BillToContact").val("");
            $("#BillToTel").val("");
        }
        else {
            $.post("/OrderCommon/GetBillToAddress", $("#BillTo").val(), function (data) {
                //$("#BillToAddress").val(data.Address);
                $('#BillToAddress').val(data.BintoData.BilltoAddress);
                $("#BillToContact").val(data.BintoData.BilltoAddrContact);
                $("#BillToTel").val(data.BintoData.BilltoAddrTel);

                $("#Currencyid").val(data.BintoData.Currency);
                $("#Currency").val(data.BintoData.CurrencyName);
                $("#PayType").val(data.BintoData.PayType);
            });
        }
    });

    $("#ShipTO").change(function () {
        shipTOChange();
    });

    $("#PrintShop").change(function () {

        if ($("#brandid").val() == "PDT001") {
            PrintShopChange();
        }

    });
    $("#ShipmentType").change(function () {
        ShipmentTypeChange();
    });

    $("#Shiptoaddress").change(function () {
        $.post("/OrderCommon/GetShipToAddress1", $("#Shiptoaddress").val(), function (data) {
            $("#ShiptAddress").val(data.addresstest);
            $("#ShiptContact").val(data.ConTact);
            $("#ShiptTel").val(data.Tel);

            $("#ShipmentType").val(data.ShipmentType);
            $("#Typeofpayment").val(data.Typeofpayment);
            $("#Accountnumber").val(data.AccountNumber);
            $("#Carrier").val(data.Carrier);
        });
    });

    function DoSubmitAction() {
        
        var cSpareRate = 0;
        if ($("#divSpareRate").css("display") != "none") {
            cSpareRate = $("#SpareRate option:selected").val();
        }
        else {
            cSpareRate = "noSpareRate";
        }
        
        var QueryData = {
            MaximOrderNO: $("#OrderNo_").val(),
            PSID: $("#PrintShop").val(),
            BillToId: $("#BillTo").val(),
            
            CurrencyId: $("#Currencyid").val(),

            ShipToId: $("#ShipTO").val(),            
            ShipToAddressId: $("#Shiptoaddress").val(),
            
            OOS_Notes: $("#Addcomments").val(),

            ShipmentType: $("#ShipmentType").val(),
            Carrier: $("#Carrier").val(),
            Typeofpayment: $("#Typeofpayment").val(),
            Accountnumber: $("#Accountnumber").val(),
            PayType: $("#PayType").val(),
            ADReject: $("#ADReject").val(),
            RejectValue: $("#RejectValue").val(),
            SpareRate: cSpareRate
        };
        //var msg = "MaximOrderNO：" + QueryData.MaximOrderNO + " , PSID:" + QueryData.PSID + " ,BillToId:" + QueryData.BillToId + " ,BillToName:" + QueryData.BillToName;
        //msg += "\r\nBillToAddress :" + QueryData.BillToAddress + " BillToContact:" + QueryData.BillToContact + " BillToTel:" + QueryData.BillToTel + " CurrencyId" + QueryData.CurrencyId;
        //msg += "\r\nShipToId: " + QueryData.ShipToId + " ,ShipToAddressId:" + QueryData.ShipToAddressId + " ,ShipToName:" + QueryData.ShipToName + " ,ShipToAddress:" + QueryData.ShipToAddress;
        //msg += "\r\nShipToContact" + QueryData.ShipToContact + " ,ShipToTel" + QueryData.ShipToTel + " ,OOS_Notes" + QueryData.OOS_Notes + " ,ShipmentType" + QueryData.ShipmentType + " PayType" + QueryData.PayType;

        //  alert(msg);
        //alert(QueryData)

        $.post("/Adolfo/ConfirmOrder_SubmintOrder", QueryData, function (data) {
            //alert("1" + data.FunStatus);                
            closeDiv();

        }).success(function (data) {
            //alert("2" + data.FunStatus);
            hideloading();

            if (data.FunStatus == "fail")
            {
                $("#labtxt").html($ConfirmOrder.SubmitOrderFail);
                    showDiv();
                    return;
            }
            else
            {
                setTimeout(function () {

                    $("#lblOrderNO").html(data.ConfirmOrderLoadData.oos_orderno);
                    $("#ConformOK").slideDown();
                    $("#ConformOrder").css("display", "none");

                    $("#img").empty();
                    $(".bg").css("display", "none");
                    $(".loading").css("display", "none");

                    if ($("#brandid").val() == "ADO001") {
                        if ($("#ADReject").val() != "")
                        {
                            $("#labtxt").html($ConfirmOrder.HAVE_INFORMED_ADOLFO_DOMINGUEZ);
                                showDiv();
                        }
                    }
                }, 800)
            }

        }).error(function () {
            //alert("3" + data.FunStatus);
            hideloading();
        })
    }

    function RePlacedVendorPOConfirm() {
        var QueryData = {
            Order: $("#OrderNo_").val()
        };
        $.post("/Adolfo/RePlacedVendorPO", QueryData, function (data) {
            hideloading();
            if (data.FunStatus != "NO") {
                if (data.FunStatus == "Error") {
                    $("#labtxt").html(data.value);
                    showDiv();
                }
                else {
                    var _NoticeMsg2 = "";
                    _NoticeMsg2 = _NoticeMsg2 + $ConfirmOrder.Notice;
                    _NoticeMsg2 = _NoticeMsg2 + $ConfirmOrder.Confirmation;
                    _NoticeMsg2 = _NoticeMsg2 + $ConfirmOrder.PleaseClickOK;

                    $("#labtxt").html(_NoticeMsg2);
                    showDiv2();
                    $("#ok").val("OK");
                    $("#no").val("Cancel");
                    $(".cpm-lable").css({ "text-align": "left", "margin-left": "10px" });

                    $("#ok").bind("click", function () {
                        $(".cpm-lable").css("text-align", "center");
                        showloading();
                        DoSubmitAction();
                    });
                    $("#no").bind("click", function () {
                        $(".cpm-lable").css("text-align", "center");
                        closeDiv();
                    });

                }
            }
            else {
                showloading();
                DoSubmitAction();
            }
        });
    }
});

//PrintShop下拉框改变时
function FunChangePrintShop() {
    $.ajax({
        url: "/Adolfo/GetBilltoByMaximNoAndPrintShop",
        dataType: "json",
        type: "get",
        data: {
            PSID: $("#PrintShop").val(),
        },
        success: function (data) {
            $("#BillTo").html("");
            $('#BillTo').append("<option value=''>--Please Select--</option>");
            $.each(data.List, function (i, item) {
                $('#BillTo').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            });
            $("#BillToAddress").val(" ");
            $("#BillToContact").val(" ");
            $("#BillToTel").val(" ");
            $("#Currency").val(" ");


        }
    })



}


function shipTOChange() {
    var Shipid = $("#ShipTO").val();
    if (Shipid.length == 0) {
        $("#Shiptoaddress").html("");
        $("#ShiptAddress").val("");
        $("#ShiptContact").val("");
        $("#ShiptTel").val("");
    }
    else {
        $("#Shiptoaddress").html("");
        $.post("/OrderCommon/GetShipToAddress", $("#ShipTO").val(), function (data) {
            $.each(data.AddressList, function (i, item) {
                $('#Shiptoaddress').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            });
            $("#ShiptAddress").val(data.addresstest);
            $("#ShiptContact").val(data.ConTact);
            $("#ShiptTel").val(data.Tel);

            $("#ShipmentType").val(data.ShipmentType);
            $("#Typeofpayment").val(data.Typeofpayment);
            $("#Accountnumber").val(data.AccountNumber);
            $("#Carrier").val(data.Carrier);
        });
    }
}

function PrintShopChange() {
    var PrintShopid = $("#PrintShop").val();
    $.post("/OrderCommon/GetPrintShop", $("#PrintShop").val(), function (data) {
        $.each(data.BintoData.Carrier, function (i, item) {
                $('#Carrier').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            });
        });
}

function ShipmentTypeChange() {
    var ShipmentTypeid = $("#ShipmentType").val();
    if (ShipmentTypeid == "Express") {
        $("#Carrier").attr("disabled", false);
        $("#Typeofpayment").attr("disabled", false);
        $("#Accountnumber").attr("disabled", false);
    } else {
        $("#Carrier").val("");
        $("#Typeofpayment").val("");
        $("#Accountnumber").val("");
        $("#Carrier").attr("disabled", "disabled");
        $("#Typeofpayment").attr("disabled", "disabled");
        $("#Accountnumber").attr("disabled", "disabled");
    }
}

function CloseOrder() {
    $("#Query-Results").slideDown();
    $("#Results-ViewDetail").css("display", "none");
    $("#Results-ViewArtwork").css("display", "none");
    $("#step_ViewDetail").css("display", "none");
    $("#step_ViewArtwork").css("display", "none");
    $("#step_confirm").css("display", "none");
    $("#step2").attr("class", "red-em");
    $("#OrderNO").val("");
    GetOrder();
}

function RejectOrder() {
    debugger;
    if ($("#RejectValue").val() == "") {
        $("#labtxt").html($ConfirmOrder.Reject);
        showDiv();
        return;
    }
    var QueryData = {
         RejectOrderValue: $("#RejectValue").val(),
         MaximNO: $("#OrderNo_").val()
    };
    $.post("/Adolfo/RejectOrder", QueryData, function (data) {
        if (data.FunStatus == "success") {
            $("#Query-Results").slideDown();
            $("#Results-ViewDetail").css("display", "none");
            $("#Results-ViewArtwork").css("display", "none");
            $("#step_ViewDetail").css("display", "none");
            $("#step_ViewArtwork").css("display", "none");
            $("#step_confirm").css("display", "none");
            $("#step2").attr("class", "red-em");
            $("#OrderNO").val("");
            GetOrder();
        } else {
            $("#labtxt").html(data.ErrorCode);
            showDiv();
        }
    });


}

function RejectOrderOK() {
    debugger;
    var QueryData = {
        MaximNO: $("#OrderNo_").val()
    };
    $.post("/Adolfo/RejectOrderOK", QueryData, function (data) {
        if (data.FunStatus == "success") {
            $("#Query-Results").slideDown();
            $("#Results-ViewDetail").css("display", "none");
            $("#Results-ViewArtwork").css("display", "none");
            $("#step_ViewDetail").css("display", "none");
            $("#step_ViewArtwork").css("display", "none");
            $("#step_confirm").css("display", "none");
            $("#step2").attr("class", "red-em");
            $("#OrderNO").val("");
            GetOrder();
        } else {
            $("#labtxt").html(data.ErrorCode);
            showDiv();
        }
    });


}

function RejectCloseOrder() {
    debugger;
    var QueryData = {
        MaximNO: $("#OrderNo_").val()
    };
    $.post("/Adolfo/RejectCloseOrder", QueryData, function (data) {
        if (data.FunStatus == "success") {
            $("#Query-Results").slideDown();
            $("#Results-ViewDetail").css("display", "none");
            $("#Results-ViewArtwork").css("display", "none");
            $("#step_ViewDetail").css("display", "none");
            $("#step_ViewArtwork").css("display", "none");
            $("#step_confirm").css("display", "none");
            $("#step2").attr("class", "red-em");
            $("#OrderNO").val("");
            GetOrder();
        } else {
            $("#labtxt").html(data.ErrorCode);
            showDiv();
        }
    });


}


function funcUpdateViewStatus(obj) {
        
        var _id = $(obj).parents("tr").find("#OrdProdSeqNO").html();
        var oos_file = $(obj).attr("artworkUrl");

        //alert(_id);
        //alert(oos_file);

        //alert($("#OrderNo_").val());
        var Para = {
            OrderNO: $("#OrderNo_").val(),
            OrdProdSeqNO: _id,
         
            oos_file: oos_file
        };
        var winRef = window.open("", "_blank");//打开一个新的页面
        var urlPost = "/Adolfo/ViewArtwork/";
        $.post(urlPost, Para, function (data, status) {
            if (data.look)
            {
                function loc() {
                    winRef.location = oos_file;
                }
                setTimeout(loc(), 800)

                $(obj).parents("tr").find("#isLook").html("Yes");
            }
            if (data.BtnNext) {
                $("#btnArtworkOKNext").removeAttr("disabled");
            }            
        });

 }

$("#btnArtworkOKNext").click(function () {
    var language = $("#language").val();
   
    View = $ConfirmOrder.View;
    var $OrderNo = $("#OrderNo_").val();
    var $SpareRate = $("#SpareRate option:selected").val();

    $.ajax({
        type: "post",
        url: "/Adolfo/GetOrderProductInfor/",
        data: {
            MaximNO: $OrderNo
        },
        dataType: "json",
        success: function (res) {
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
                        html += "<td class=center>" + "<a  href='javascript:;' id='btnView' target='_blank'  artworkUrl='" + item.oos_file + "' name='btnView' onclick='funcUpdateViewStatus(this);'>" + View + "</a>";
                    } else {
                        html += "<td class=center>" + View + "</td>";
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

});

function btnNewSpareRate() {
    var $OrderNo = $("#OrderNo_").val();
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
            var OrderQtyOK = ( + $SpareRate + "%");       
            $("#OrderQtyOK").text("("+OrderQtyOK+")");         
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
                        html += "<td class=center>" + "<a  href='javascript:;' id='btnView' target='_blank'  artworkUrl='" + item.oos_file + "' name='btnView' onclick='funcUpdateViewStatus(this);'>" + $ConfirmOrder.View_1+ "</a>";
                    } else {
                        html += "<td class=center>" + $ConfirmOrder.View_1 + "</td>";
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

function ViewOneProductDetail(obj) {
    debugger;
     var $id = obj.attributes["value"].value;
     var $strDates = $id.split(";");
     var strDates = ($strDates[2]);     
     var $_tjpgts = ($strDates[3]);
     var $_tjpgt = ($strDates[4]);
     var $_ViewStaticed = ($strDates[5]);
     var $_NewColumnMap = ($strDates[6]);
     var view_strDates = ("#" + strDates);
     var tjpgts = ("#" + $_tjpgts);
     var tjpgt = ("#" + $_tjpgt);
     var _ViewStaticed = ("#" + $_ViewStaticed);
     var Tp_NewColumnMap = ("#"+ $_NewColumnMap);    
     $(tjpgts).css("display", "none");
     $(tjpgt).removeAttr("style");
     $(view_strDates).removeAttr("style");
    
     var cSpareRate = 0;
     if ($("#divSpareRate").css("display") != "none") {
         cSpareRate = $("#SpareRate option:selected").val();
     }
     else {
         cSpareRate = "noSpareRate";
     }

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
                 $(Tp_NewColumnMap).html(html);           
             };
             $.ajax({
                 type: "post",
                 url: "/Adolfo/GetDetailViewColumnsOrderVarData/",
                 data: {
                     id: $id,
                     pgSpareRate: cSpareRate
                 },
                 dataType: "json",
                 success: function ($res) {
                     var $ckse = jQuery.parseJSON($res);
                     debugger;
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
                         $(_ViewStaticed).html(htmls);                        
                     }
                 }

             });

         }
     });

 }

function HideOneProductDetail(obj) {
     var $id = obj.attributes["value"].value;
     var $strDates = $id.split(";");
     var strDates = ($strDates[2]);
     var $_tjpgts = ($strDates[3]);
     var $_tjpgt = ($strDates[4]);
 
     var viewstrDates = ("#" + strDates);
     var tjpgts = ("#" + $_tjpgts);
     var tjpgt = ("#" + $_tjpgt);
    
     $(tjpgts).removeAttr("style");
     $(tjpgt).css("display", "none")
     $(viewstrDates).css("display", "none");

 }
//弹框， 您选择了不同的备用费率，但没有单击OK使其生效，您一定要继续吗？ 
 function ShowDivCancelRequstBy() {
     showDiv();
     $("#ok").css("display", "inline");
     $("#no").css("display", "inline")
     $("#txtCloselbtn").css("display", "none");
     $("#CancelRequstBy").css("display", "none");
     $("#labtxt").html($ConfirmOrder.YouSelectedDifferentSpare);
     $("#popDiv p").css("margin-top", '0px');

     $("#CancelRequstBy").val("")
     $("#ok").unbind();
     $("#no").unbind();
 }

 function funcEdit(obj) { 
     //showloading();
     $.ajax(
         {
             type: "get",
             url: "/Carelable/OrderUpdateCarelable/" + $("#hfTempOrderID").val(),
             contentType: "application/html; charset=utf-8",
             dataType: "html"
         })
     .success(function (data) {
         setTimeout(function () {
             $("#content").html(data)


             hideloading();
             var width = $("#form_wizard_1").width();
             ($(".foot").width(width + "px"));
         }, 500);
         //setTimeout(function () {
         //   // hideloading();
         //    $("#Results-UpdaeCarelabeArtwork").html(data);
         //    //$('#Query-order').css('display', 'none');
         //    //$('#Query-Results').css('display', 'none');
         //    //$('#Results-ViewDetai').css('display', 'none');
         //    //$('#Results-ViewArtwork').css('display', 'none');
         //    //$('#Results-EditArtwork').css('display', 'none');
         //    // $('#Results-EditArtwork').slideDown();
         //    $('#Results-UpdaeCarelabeArtwork').slideDown();

         //    //$('#step_ViewArtwork').addClass('red-em');
         //    //$('#step_ViewArtwork').removeClass('gray-em');
         //    //$('#step_ViewArtwork').siblings('em').addClass('gray-em');
         //    //$('#step_ViewArtwork').siblings('em').removeClass('red-em');
         //    //$("#step_ViewArtwork").removeAttr("style");
         //}, 500);

     })
     .error(function (xhr, status) {
         hideloading();
         //alert(status);
         $("#labtxt").html(status);
         showDiv();
     })


 }