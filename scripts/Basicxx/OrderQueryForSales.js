$(function () {

    //日历控件
    FormComponents.init();
    $.post("/Basicxx/OrderQueryForSalesLoad", "", function (data) {
        if (data.FunStatus == "success") {
            $('#Brand').val(data.OrderQueryForVendorLoadData.BrandName);

            $.each(data.OrderQueryForVendorLoadData.PrintshopList, function (i, item) {
                $('#PrintShop').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            });
            $.each(data.OrderQueryForVendorLoadData.Categorylist, function (i, item) {
                $('#Category').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            });
            $.each(data.OrderQueryForVendorLoadData.Productlist, function (i, item) {
                $('#Item').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            });

            $.each(data.OrderQueryForVendorLoadData.Statuslist, function (i, item) {
                $('#Order_Status').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            });

            $.each(data.OrderQueryForVendorLoadData.CustomerList, function (i, item) {
                $('#Customer').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            });
            $('#Cusprodcatid').val(data.OrderQueryForVendorLoadData.Cusprodcatid);
            $('input[name="SubmitStartTime"]').val(data.OrderQueryForVendorLoadData.DefaultStartTime);
            $('#hfCulture').val(data.OrderQueryForVendorLoadData.Language);
        }
    });
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
    $("select[name='Category']").change(function () {
        var data = {
            _CategroyId: $(this).val(),
            Cusprodcatid: $("#Cusprodcatid").val()
        };
        var urlPost = "/Basicxx/CategoryChangeBinItem?CategroyId=" + $(this).val() + "&Cusprodcatid=" + Cusprodcatid;
        $.post(urlPost, data, function (data, status) {
            var sTrHtml = "";
            $("select[name='Item']").html(sTrHtml);
            $.each(data, function (i, item) {
                sTrHtml += "<option value=\"" + item.Value + "\">" + item.Text + "</option>";
            })
            $("select[name='Item']").html(sTrHtml);
        });
    });
    $("#step1").click(function () {
        $("#step2").css("display", "none");
        $("#Query-Results").css("display", "none");
        $("#Query-order").slideDown();
        $("#Results-ViewDetail").css("display", "none");
        $("#Results-ViewArtwork").css("display", "none");
        $("#step_ViewDetail").css("display", "none");
        $("#step_ViewArtwork").css("display", "none");
        $("#step1").attr("class", "red-em");
        $("#step_ViewShipOrder").css("display", "none");
        $("#Results-ViewShipOrder").css("display", "none");
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
    $("#btnQuery").click(function () {
        $("#step2").removeAttr("style");
        $("#nowpage").val(1);
        $("#pc").val(1);
        GetOrder();
    });
    $("#chkboxHD").click(function () {
        var isChk = $(this).prop("checked");

        if (isChk) {
            var thePageRows = $("#tPageRealRows").val();
            for (var i = 1; i <= thePageRows; i++) {
                if (!$("#chkbox" +i).prop("disabled"))
                    $("#chkbox" +i).prop("checked", true)
            }
        }
        else {
            var thePageRows = $("#tPageRealRows").val();
            for(var i = 1; i <= thePageRows; i++) {
                if (!$("#chkbox" +i).prop("disabled"))
                    $("#chkbox" +i).prop("checked", false)
            }
        }
    })
    function GetOrder() {
        var Cusprodcatid = $("#Cusprodcatid").val();
        var psid = $("#PrintShop").val();
        var oos_orderno = $("#OOSNO").val();
        var so = $("#SO").val();
        var orderStatus = $("#Order_Status").val();
        var Item = $("#Item").val();
        var Customer = $("#Customer").val();
        var Payment = $("#Payment").val();
        var RcDateStart = $("input[name='SubmitStartTime']").val();
        var RcDateEnd = $("input[name='SubmitEndTime']").val();
        var DeliveryStartTime = $("input[name='DeliveryStartTime']").val();
        var DeliveryEndTime = $("input[name='DeliveryEndTime']").val();
        var PI_NO = $("#PI_NO").val();
        var nowPage = $("#pc").val();
        $("#tSelectedOIDs").val(""); //置初值，赋空。
        $("#chkboxHD").prop("checked", false)
        $("#chkboxHD").prop("disabled", false)
        // alert(nowPage);
        var StrHtml = "";
        var url = "/Basicxx/OrderQueryForSalesQuery?psid=" + psid + "&Cusprodcatid=" + Cusprodcatid + "&oos_orderno=" + oos_orderno + "&so=" + so + "&orderStatus=" + orderStatus + "&Item=" + Item + "&Customer=" + Customer + "&Payment=" + Payment + "&RcDateStart=" + RcDateStart + "&RcDateEnd=" + RcDateEnd + "&DeliveryStartTime=" + DeliveryStartTime + "&DeliveryEndTime=" + DeliveryEndTime + "&PI_NO=" + PI_NO + "&pageIndex=" + nowPage;
        $.get(url, null, function (data) {
            var intSeq = 0;
            $.each(data, function (i, item) {
                intSeq++;
                StrHtml += "<tr>";
                StrHtml += "<td class='center'><input id='chkbox" + intSeq + "' name='chkbox" + intSeq + "' type='checkbox' value='true' class='magic-checkbox' style='display:none;'><label for='chkbox" + intSeq + "'></label></td>";
                StrHtml += "<input id='hfSalesOrderId" + intSeq + "' name='hfSalesOrderId" + intSeq + "' type='hidden' value= " +item.SalesOrderId + "></td>"
                StrHtml += "<td>" + item.Seq + "</td>";
                StrHtml += "<td>" + item.SubmitTime + "</td>";
                StrHtml += "<td>" + item.BrandName + "</td>";
                StrHtml += "<td>" + item.AcountNumber + "</td>";
                StrHtml += "<td>" + item.ParentAcountName + "</td>";
                //StrHtml += "<td>" + item.Subcontract_Supplier + "</td>";
                StrHtml += "<td>" + item.PrintshopName + "</td>";
                StrHtml += "<td>" + item.OrderNO + "</td>";
                StrHtml += "<td>" + item.PI + "</td>";
                StrHtml += "<td>" + item.So + "</td>"
                StrHtml += "<td>" + item.ItemNO + "</td>";
                StrHtml += "<td>" + item.Currency + "</td>";
                StrHtml += "<td>" + item.UnitPrice + "</td>";
                StrHtml += "<td>" + item.OrderQty + "</td>";
                StrHtml += "<td>" + item.AmountUSD + "</td>";
                StrHtml += "<td>" + item.OOS_Status_pl + "</td>";
                StrHtml += "<td>" + item.Payment + "</td>";
                StrHtml += "<td>" + item.PaymentDate + "</td>";
                if (item.language == "en") {
                    StrHtml += "<td>" + "<a href=\"#\"  onclick='return funcViewDetail(this);' value='" + item.SalesOrderId + "' >ViewDetail</a>" + "</td>";
                    if (item.OOS_artwork != "") {
                        StrHtml += "<td>" + "<a href=\"#\"  onclick='return funcViewArtwork(this);' value='" + item.SalesOrderId + "' >Artwork</a>" + "</td>";
                    }
                    else {
                        StrHtml += "<td>" + "<a></a>Artwork</td>";
                    }

                }
                else
                {
                    StrHtml += "<td>" + "<a href=\"#\"  onclick='return funcViewDetail(this);' value='" + item.SalesOrderId + "' >明细</a>" + "</td>";
                    if (item.OOS_artwork != "") {
                        StrHtml += "<td>" + "<a href=\"#\"  onclick='return funcViewArtwork(this);' value='" + item.SalesOrderId + "' >画稿</a>" + "</td>";
                    }
                    else {
                        StrHtml += "<td>" + "<a></a>画稿</td>";
                    }
                }
              
                StrHtml += "<td>" + item.DeliveryDate + "</td>";
                StrHtml += "<td>" + item.UploadDate + "</td>";
                if (item.language == "en")
                {
                    StrHtml += "<td>" + "AWB number/POD" + "</td>";
                }
                else
                {
                    StrHtml += "<td>" + "交货信息" + "</td>";
                }

               
                StrHtml += "</tr>";
                document.getElementById("PageTotalCount").value = item.TotalPageCount;
                $("#TotalPageCount").html(item.TotalPageCount);
                $("#tPageRealRows").val(data.length);
            });
            $("#Order tbody").html(StrHtml);
            $("#GridViewPage").removeAttr("style");
            $("#Query-order").css("display", "none")
            $("#Query-Results").slideDown();
            $("#step2").removeAttr("style");
            $("#step1").attr("class", "gray-em");
            $("#step2").attr("class", "red-em");
            $("#ExportExcel").removeAttr("style");
            if (StrHtml == "") {
                $("#Order tbody").html("None");
                $("#GridViewPage").css("display", "none");
                $("#ExportExcel").css("display", "none");
                document.getElementById("nowpage").value = 1;
                document.getElementById("PageTotalCount").value = 1;
                document.getElementById("TotalPageCount").innerHTML = 1;
            }
        });
    }
    $("#Pay").click(function () {
        $("#tSelectedOIDs").val(""); //置初值。

        var tIDstr = "";
        var thePageRows = $("#tPageRealRows").val();
        var _tSelectedCount = 0;

        //检查是否有勾选，并报错
        for (var i = 1; i <= thePageRows; i++) {
            if ($("#chkbox" + i).prop("checked")) {
                //alert('afgh')
                _tSelectedCount++;
            }
        }
        if (_tSelectedCount <= 0) {
            if ($("#hfCulture").val() == "en")
            {
                $("#labtxt").html("Please select orders to confirm.");
                showDiv();
                return;
            }
            else
            {
                $("#labtxt").html("请至少选择一项.");
                showDiv();
                return;

            }
            
        }
        if ($("#ShipDateS").val() == "")
        {
            if ($("#hfCulture").val() == "en")
            {
                $("#labtxt").html("Please select Payment Date");
                showDiv();
                return;
            }
            else
            {
                $("#labtxt").html("请选择Payment Date");
                showDiv();
                return;
            }
          

        }
        //取得勾选的订单ID，及禁用勾选框。
        for (var i = 1; i <= thePageRows; i++) {
            if ($("#chkbox" + i).prop("checked")) {
                //alert('afgh')
                _tSelectedCount++;
                tIDstr += $("#hfSalesOrderId" + i).val() + "^";
            }
            //$("#chkbox" + i).prop("disabled", true)
        }
       
        $("#tSelectedOIDs").val(tIDstr);
        var data_ = {
            ConfirmOIDs: tIDstr,
            ShipDateS: $("#ShipDateS").val()
        };
        var urlPost = "/Basicxx/UpdateShipDate";
        $.post(urlPost, data_, function (data) {
            if (data.FunStatus = "success")
            {
                    $("#labtxt").html("Your select order paid success.");
                    showDiv();
              
                $("#chkboxHD" + i).prop("checked", false)
                $("#chkboxHD").prop("disabled", false)

                var thePageRows = $("#tPageRealRows").val();
                for (var i = 1; i <= thePageRows; i++) {
                    $("#chkbox" + i).prop("checked", false)
                    $("#chkbox" + i).prop("disabled", false)
                }
                $("#ShipDateS").val("");
                GetOrder();
            }
            else
            {
                $("#labtxt").html("Your select order paid fail.");
                showDiv();
            }
        });
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
            url: "/Basicxx/_ViewDetail/" + obj.attributes["value"].value,
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