$(function () {

});

$("#Submit1").click(function () {

    GetOrder();
});

function GetOrder()
{
    if ($("#POText").val().length == 0 && $("#MaximNoText").val().length == 0) {
        $("#labtxt").html($UrgenOrderReq.PleaseInputPOorMaximNO);
        showDiv();
        return;
    }
    var QueryData = {
        PO: $("#POText").val(),
        OrderNO: $("#MaximNoText").val()
    }

    $.post("/Adolfo/UrgenOrderReqQuery", QueryData, function (data) {
        var sTrHtml = "";
        if (data.FunStatus == "False") {
            $("#Order tbody").html("None");
            $("#Query-Results").slideDown();
            $("#Query-order").css("display", "none");
            $("#step2").removeAttr("style");
            $("#step1").attr("class", "gray-em");
            $("#step2").attr("class", "red-em");
        }
        else {
            //$("#Service").empty();
            //$.each(data.OOSUrgenOrderData.ServiceList, function (i, item) {
            //    $('#Service').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            //});

            $.each(data.OOSUrgenOrderData.UrgenData, function (i, item) {
                sTrHtml += "<tr>";
                sTrHtml += "<td>" + item.Seq + "</td>";
                sTrHtml += "<td>" + item.OrderDate + "</td>";
                sTrHtml += "<td>" + item.ConfirmDate + "</td>";
                sTrHtml += "<td>" + item.PO + "</td>";
                sTrHtml += "<td>" + item.OrderNO + "</td>";
                sTrHtml += "<td>" + item.PrintShop + "</td>";
                sTrHtml += "<td>" + item.ServiceLevelValue + "</td>";
                sTrHtml += "<td>" + item.Product + "</td>";
                sTrHtml += "<td>" + item.OrderQty + "</td>";
                sTrHtml += "<td><button type='button' class='btn' id='Submit2' style='border: 1px solid #D6D6D6;width: 170px;margin-left:0;' onclick='show(\"" + item.OrderNO + "\")' > Urgent Request </button></td>";
                sTrHtml += "</tr>";
            });
            $("#Order tbody").html(sTrHtml);
            $("#Query-Results").slideDown();
            $("#Query-order").css("display", "none");
            $("#step2").removeAttr("style");
            $("#step1").attr("class", "gray-em");
            $("#step2").attr("class", "red-em");
            if (sTrHtml == "") {
                $("#Order tbody").html("None");
                $("#Query-Results").slideDown();
                $("#Query-order").css("display", "none");
                $("#step2").removeAttr("style");
                $("#step1").attr("class", "gray-em");
                $("#step2").attr("class", "red-em");
               
            }
        }
    });
}

$("#Submit3").click(function () {
   
    if ($("#OrderText").val().length == 0) {

        $("#labtxt").html($UrgenOrderReq.MaximNOisNull);
        showDiv();
        return;
    }
     
    if ($("#tBrandId").val() == "VOE001" || $("#tBrandId").val() == "STB001" || $("#tBrandId").val() == "ADO001" || $("#tBrandId").val()=="HOR001") {

        ShowDivPriceUpChargeRequst();

        $("#ok").bind("click", function () {
            DoSubmitChangeLevel();
        })

        $("#no").bind("click", function () {
            debugger;
            //alert('click no');
            closeDiv();
        })
    }
    else {
        debugger;
        ShowConfirmtoChargeRequst();

        $("#ok").bind("click", function () {
            DoSubmitChangeLevel();
        })

        $("#no").bind("click", function () {
            debugger;
            //alert('click no');
            closeDiv();
        })
    }    

});

function DoSubmitChangeLevel() {
    var QueryData = {
        OrderNO: $("#OrderText").val(),
        ServiceVal: $("#Service").val()
    }

    $.post("/Adolfo/UrgenOrderUpdate", QueryData, function (data) {
        if (data.FunStatus == "False") {
            $("#labtxt").html($UrgenOrderReq.FailureToModify);
            showDiv();
        }
        else {
            $("#labtxt").html(data.value);
            showDiv();
            if (data.FunStatus == "success") {
                $("#UpdateUrgenOrder").hide();
                $("#Query-Results").slideDown();
                $("#step3").css("display", "none");
                GetOrder();
            }
        }
    });
}

$("#Submit4").click(function () {
    $("#UpdateUrgenOrder").hide();
    $("#step3").css("display", "none");
    $("#Query-Results").slideDown();
    $("#step2").attr("class", "red-em");

});

function show(order) {

    var QueryData = {
        OrderNO: order
    }
    $.post("/Adolfo/UrgenOrderCheckIsDoneBefore", QueryData, function (data) {

        if (data.FunStatus == "ok") {          

            $("#UpdateUrgenOrder").slideDown();
            $("#Query-order").hide();
            $("#Query-Results").css("display", "none");
            $("#step2").attr("class", "gray-em");
            $("#step3").removeAttr("style");
            $("#step3").attr("class", "red-em");
            $("#OrderText").val(order);

            var QueryData = {
                OrderNO: $("#OrderText").val()
            }
            $.post("/Adolfo/UrgenOrderService", QueryData, function (data) {
                $("#Service").empty();
                $.each(data.OOSUrgenOrderData.ServiceList, function (i, item) {
                    
                    $('#Service').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
                });

                var sTrHtml = "";
                $.each(data.OOSUrgenOrderData.UrgenData, function (i, item) {
                    sTrHtml += "<tr>";
                    sTrHtml += "<td>" + item.Seq + "</td>";
                    sTrHtml += "<td>" + item.OrderDate + "</td>";
                    sTrHtml += "<td>" + item.ConfirmDate + "</td>";
                    sTrHtml += "<td>" + item.PO + "</td>";
                    sTrHtml += "<td>" + item.OrderNO + "</td>";
                    sTrHtml += "<td>" + item.PrintShop + "</td>";
                    sTrHtml += "<td>" + item.ServiceLevelValue + "</td>";
                    sTrHtml += "<td>" + item.Product + "</td>";
                    sTrHtml += "<td>" + item.OrderQty + "</td>";
                    sTrHtml += "</tr>";
                });
                $("#OrderSingle tbody").html(sTrHtml);


                $("#spanCanChgLev").html(data.CanChgLevList);
            });

        }
        else {
            $("#labtxt").html(data.value);
            showDiv();
        }
    });

}

$("#step1").click(function () {
    $("#Query-Results").css("display", "none");
    $("#Query-order").slideDown();
    $("#step2").css("display", "none");
    $("#step1").attr("class", "red-em");
    $("#UpdateUrgenOrder").css("display", "none");
    $("#step3").css("display", "none");
});
$("#step2").click(function () {
    $("#UpdateUrgenOrder").css("display", "none");
    $("#step3").css("display", "none");
    $("#Query-Results").slideDown();
    $("#step2").attr("class","red-em");
});

function ShowDivPriceUpChargeRequst() {
    showDiv();
    $("#ok").css("display", "inline");
    $("#no").css("display", "inline")
    $("#txtCloselbtn").css("display", "none");
    $("#CancelRequstBy").css("display", "none");
    $("#labtxt").html($UrgenOrderReq.ShowDivPriceUpChargeRequst);
    $("#popDiv p").css("margin-top", '0px');

    $("#CancelRequstBy").val("")
    $("#ok").unbind();
    $("#no").unbind();
}

function ShowConfirmtoChargeRequst() {
    showDiv();
    $("#ok").css("display", "inline");
    $("#no").css("display", "inline")
    $("#txtCloselbtn").css("display", "none");
    $("#CancelRequstBy").css("display", "none");
    $("#labtxt").html($UrgenOrderReq.ShowConfirmtoChargeRequst);
    $("#popDiv p").css("margin-top", '0px');

    $("#CancelRequstBy").val("")
    $("#ok").unbind();
    $("#no").unbind();
}