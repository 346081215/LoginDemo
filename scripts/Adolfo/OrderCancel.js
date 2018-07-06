$(function () {
    //ri qi
    FormComponents.init();

    var myDate = new Date();
    var _ToDay = myDate.getMonth() + 1 + "/" + myDate.getDate() + "/" + myDate.getFullYear();

    $("input[name='SubmitEndTime']").val(_ToDay);

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
        if ($("#TotalPageCount").html() == "0") {
            return false;
        }
        else {
            GetOrder();
        }
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



function GetOrder() {
    var QueryData = {
        MaximOrder: $("#OrderNO").val(),
        PO: $("#txtPO").val(),
        StyleNumber: $("#txtStyleNumber").val(),
        vendornumber: $("#_Vendor").val(),
        Season: $("#txtseason").val(),
        Page: document.getElementById("nowpage").value,
        DateStart:$("input[name='SubmitStartTime']").val(),
        DateEnd:$("input[name='SubmitEndTime']").val()
    }

    
    $.post("/Adolfo/GetDataOrderCancel", QueryData, function (data) {
        if (data) {
            var html = "";
            var intSeq = 0;
            var TotalPageCount = "0";

            if (data.length > 0) {
                $.each(data, function (i, item) {

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

                    html += "<td class='center' style='text-align:right;'>" + item.Item + "</td>";
                    html += "<td class='center' style='text-align:right;'>" + item.OrderQty + "</td>";
                    html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funCancelOrder(this);' value='" + item.MaximOrderNO + "' >" + $OrderCancel.Cancel + "</a>" + "</td>";
                    html += "</tr>";

                    TotalPageCount = data[0].TotalPageCount;

                });
            } else {
                $("#TotalPageCount").html("0");


            }
          

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


function funCancelOrder(obj) {

    ShowDivCancelRequstBy();

    var MaximNo_ = obj.attributes["value"].value;

    $("#maximno").remove();
    $("<P id='maximno'>Maxim#:" + MaximNo_ + "</p>").insertAfter($("#labtxt"));


    $("#ok").bind("click", function () {

       
        var data_ = {
            MaximNo: MaximNo_,
            CancelRequstBy: $("#CancelRequstBy").val()
        }
        if (($("#CancelRequstBy").val().length < 1))
        {
            return false;
        }
        if ($("#CancelRequstBy").val().length > 100) {
            $("#labtxt").html($OrderCancel.Length_should_not_exceed_100)
            showDiv();
            $("#txtCloselbtn").css("display", "inline");
            return false;
        }
       

        $.post("/Adolfo/CancelOrder", data_, function (data) {
            if (data.FunStatus == "success") {
                var CancelOrderResulthtml = "";

                CancelOrderResulthtml += "</tr>";
                CancelOrderResulthtml += "<td class='center'>" + data.MaximNO + "</td>";
                CancelOrderResulthtml += "<td class='center'>" + data.CancelRequstBy + "</td>";
                CancelOrderResulthtml += "</tr>";

                console.log(CancelOrderResulthtml);

                $("#CancelOrderResult tbody").html(CancelOrderResulthtml);

                $("#Query-order").css("display", "none");
                $("#Query-Results").css("display", "none");
                $("#Results-CancelOrder").slideDown();

                $("#step_CancelOrder").removeAttr("style");
                $("#step2").attr("class", "gray-em");
                $("#step_CancelOrder").attr("class", "red-em");

                $("#popDiv p").css("margin-top", "45px");
                closeDiv();

                $("#maximno").text("")
            }
            else {
                {
                    $("#labtxt").html(data.ErrorCode);
                    $("#ok").css("display", "none")
                    $("#no").css("display", "none")
                    $("#CancelRequstBy").css("display", "none");
                    $("#CancelRequstBy").val("");
                    $("#txtCloselbtn").css("display", "inline");
                    $("#maximno").text("")
                    showDiv();
                }
            }
        })
    })

    $("#no").bind("click", function () {
        closeDiv();
        $("#maximno").text("")
    })


}

//弹框，是否确认取消订单
function ShowDivCancelRequstBy() {
    showDiv();
    $("#ok").css("display", "inline");
    $("#no").css("display", "inline")
    $("#txtCloselbtn").css("display", "none");
    $("#CancelRequstBy").css("display", "inline");
    $("#labtxt").html($OrderCancel.CheckCancelOrder);
    $("#popDiv p").css("margin-top", '0px');

    $("#CancelRequstBy").val("")
    $("#ok").unbind();
    $("#no").unbind();
}
