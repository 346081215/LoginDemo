$(document).ready(init);
function init() {
    //$('div[id="Paged"] li').click(function () {
    //    var PageCount = this.innerText;
    //    document.getElementById("pc").value = 2;
    //    GetOrder();
    //});

    if ($("#IsSumbited").val() == "1") {

        $("#lblErrMsg").val($RepeatOrder.Please_do_not_repeat_submit);
        $("#divErrMsg").css('display', 'block');
        $("#page-inner").css('display', 'none');

    }
}

if (navigator.appName == "Microsoft Internet Explorer") {
    window.history.forward(1);
}
else // if it is Mozilla than
{
    window.history.forward(-1);
}

$("#ckSelectAll").click(function () {
    $("[name='ckSelect']").prop("checked", this.checked);
    debugger;
    var obj = document.getElementById("OrderCopyDetail");
    for (var i = 0; i < obj.childElementCount; i++) {
        if (obj.children[i].children[0].children[0].checked) {
            obj.children[i].children[1].children[0].disabled="";
        } else {
            obj.children[i].children[1].children[0].disabled = "disabled";
        };
    }


    //$('#OrderDetail').find('[name="ckSelect"]').prop('checked', this.checked);
});

function funcCheckData(obj) {
    //alert('Copy click...' + obj)

    var tQty = obj.value;

    if (isNaN(tQty)) {
        //alert('please input correct number.')
        $("#labtxt").html($RepeatOrder.please_input_correct_number);
        showDiv();
        obj.value = "";
        return;
    }
}

if ($("#IsSumbited").val() == "1") {

    $("#lblErrMsg").val($RepeatOrder.Please_do_not_repeat_submit);
    $("#divErrMsg").css('display', 'block');
    $("#page-inner").css('display', 'none');

}


function funcCopySubmit() {
    //alert('Copy click...' + obj)
    //var tSalesOrderId = $("#tSalesId").val();

    $("#IsSumbited").val("1");

    var tIDstr = "";
    var thePageRows = $("#tPageRealRows").val();
    var _tSelectedCount = 0;
    var ParaStr = "";
    ParaStr += "tMaximNO:" + $("#tMaximNO").val();
    ParaStr += "^SelectPSID:" + $("#SelectPSID").val();
    ParaStr += "^BilltoID:" + $("#SelectBillTo").val();
    ParaStr += "^BilltoName:" + $("#SelectBillTo").find("option:selected").text();
    ParaStr += "^BilltoAddress:" + $("#BilltoAddress").val();

    ParaStr += "^ShiptoID:" + $("#SelectShipTo").val();
    ParaStr += "^ShiptoName:" + $("#SelectShipTo").find("option:selected").text();
    ParaStr += "^ShipAddrID:" + $("#SelectShipAddr").val();
    ParaStr += "^ShipToAddressName:" + $("#SelectShipAddr").find("option:selected").text();
    ParaStr += "^iShipAddrContact:" + $("#iShipAddrContact").html();
    ParaStr += "^iShipAddrTel:" + $("#iShipAddrTel").html();

    ParaStr += "^Reason:" + $("#SelectReason").val();
    ParaStr += "^OtherComm:" + $("#txtOthersComment").val();
    ParaStr += "^AddComm:" + $("#AddComments").val();
    ParaStr += "^Func:" + $("#hidden_func").val();
    if ($("#SelectReason").val() == "") {
        $("#labtxt").html("Please select a repeat reason.");
        showDiv();
        return;
    }
    if ($("#tBrandId").val() != "STB001") {
        if ($("#SelectReason").val() == "Others" && $("#txtOthersComment").val() == "") {
            $("#labtxt").html($RepeatOrder.The_Others_repeat_reason_can_not_be_empty);
            showDiv();
            return;
        }
    }

    var ItemsStr = "";

    //检查是否有勾选，并报错
    for (var i = 1; i <= thePageRows; i++) {
        if ($("#chkbox" + i).prop("checked")) {
            //alert('afgh')
            _tSelectedCount++;
            if ($("#txtQty" + i).val() == "0") {
                $("#labtxt").html("The Line " + i + " your selected, it's qty can not be 0.");
                showDiv();
                return;
            }
            if ($("#txtQty" + i).val() == "") {
                $("#labtxt").html("The Line " + i + " your select, it's qty can not be empty.");
                showDiv();
                return;
            }
            if (ItemsStr != "") {
                ItemsStr += ",";
            }
            ItemsStr += "chkbox" + i + "=" + $("#txtQty" + i).val() + "=" + $("#OrdProSeq" + i).val();
        }
    }

    ParaStr += "^ItemSelect:" + ItemsStr + '';
  

    if (_tSelectedCount <= 0) {
        //alert('Please select order lines to copy.')
        $("#labtxt").html("Please select order lines to copy.");
        showDiv();
        return;
    }
    var _hiddenCulture = $("#hiddenCulture").val();
    {

        $("#labtxt").html($RepeatOrder.HAVE_INFORMED_ADOLFO_DOMINGUEZ_TO_CONFIRM_WHETHER_TO_PRODUCE_THE_ORDER_OR_NOT);
    }
   

    var urlPost = "/Adolfo/RepeatOrderCopy_Submit";
    $.post(urlPost, ParaStr, function (data, status) {
        //alert(data.NewOOSOrderNO);

        if (!data.IsCopySucess) {
            //$("#page-inner").css('display', 'none');
            //$("#divSuccess").css('display', 'none');

            //$("#divErrMsg").css('display', 'block');

            //$("#lblErrMsg").html(data.CopyErrMsg);
            $("#labtxt").html(data.CopyErrMsg);
            //$("#labtxt").html("Add QTY can not be 0.");
            showDiv();
            return false;
        }

        $("#MaximNO").val(""); //提交成功后赋空

        $("#page-inner1").css('display', 'none');
        $("#page-inner2").css('display', 'block');
        $("#divSuccess").css('display', 'block');

        $("#lblOrderPO").html(data.CustOrderNO);
        $("#lblOrderNO").html(data.NewMaximNO);

        if (data.tCulture == "en-US") {
            $("#pan_en").css('display', 'block');
            $("#pan_cn").css('display', 'none');
        }
        else {
            $("#pan_en").css('display', 'none');
            $("#pan_cn").css('display', 'block');
        }


    });
}

function funcBodyOnlodChk() {
    if ($("#IsSumbited").val() == "1") {

        $("#lblErrMsg").val($RepeatOrder.Please_do_not_repeat_submit);
        $("#divErrMsg").css('display', 'block');
        $("#page-inner").css('display', 'none');

        return false;
    }
}

function funcSelectReason() {
    //alert('adfasfd');
    if ($("#SelectReason").val() == "Others") {
        if ($("#tBrandId").val() != "STB001") {
            $("#txtOthersComment").css('display', 'block');
        }
    }
    else {
        $("#txtOthersComment").css('display', 'none');
    }
}

function funcSelectBillTo(obj) {
    //alert('adfasfd');
    if ($("#SelectBillTo").val() != "") {
        //$("#tSelectedBilltoID").val($("#SelectBillto").val())
        //alert('不等');
        var data = {
            NewBillto: $("#SelectBillTo").val()
        };
        var urlPost = "/OrderCommon/GetBilltoAccountInfobyAccountId?billtoId=" + $("#SelectBillTo").val();
        $.post(urlPost, data, function (data, status) {
            //alert(data.oos_lineno);
            //$("#spBilltoLine1").val(data.Address1_Line1);
            $("#BilltoAddress").html(data.ContactAddress);
            $("#iCurrency").html(data.CurrencyId);
        });
    }
    else {
        $("#iBilltoLine1").html("");
    }
}

function funcSelectShipTo() {

    var data = {
        NewBillto: $("#SelectShipTo").val()
    };
    var urlPost = "/OrderCommon/GetShipAddressInforlistbyShipToId?ShipToId=" + $("#SelectShipTo").val();
    $.post(urlPost, data, function (data, status) {
        //alert(data.oos_lineno);
        debugger;
        $("#SelectShipAddr").empty();
        $.each(data, function (i, item) {
            $("#SelectShipAddr").append("<option value='" + item.ShipToAddressId + "'>" + item.oos_address + "</option>");
        });
        var _seq = 0;
        $.each(data, function (i, item) {
            if (_seq == 0) {
                //$("#iShipAddress").html(item.oos_address);
                $("#iShipAddrContact").html(item.oos_contactname);
                $("#iShipAddrTel").html(item.oos_contacttel);
                _seq++;
            }
        });
    });
}

function funcSelectShipAddr() {
    var data = {
        NewBillto: $("#SelectShipAddr").val()
    };
    var urlPost = "/OrderCommon/GetShipAddressInfobyShipAddressId?ShippAddrId=" + $("#SelectShipAddr").val();
    $.post(urlPost, data, function (data, status) {
        //alert(data.oos_lineno);
        //$("#iShipAddress").html(data.oos_address);
        $("#iShipAddrContact").html(data.oos_contactname);
        $("#iShipAddrTel").html(data.oos_contacttel);
    });
}

function funcColseMe() {
    window.opener = null; window.close();
}
function CheckEdit(obj)
{
    debugger;
    a = $(obj).parent().next().find("input").get(0);
    if ($(obj).parent().find("input").is(':checked') == false)
    {
        $(a).attr("disabled", false);
    }
    else
    {

        $(a).attr("disabled", "disabled");
    }




}