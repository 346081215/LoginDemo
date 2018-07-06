$(function () {
    $('#PageIndex_MX').click(function () {
        document.getElementById("pc_MX").value = 1;
        document.getElementById("nowpage_MX").value = 1;
        if ($("#TotalPageCount_MX").html() == "0") {
            return false;
        }
        else {
            GetOrder_MX();
        }
    });
    $('#Pageup_MX').click(function () {
        var nowpage = document.getElementById("nowpage_MX").value;
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) > 1) {
            newpage = parseInt(nowpage) - 1;
            document.getElementById("pc_MX").value = newpage;
            document.getElementById("nowpage_MX").value = newpage;
            if ($("#TotalPageCount_MX").html() == "0") {
                return false;
            }
            else {
                GetOrder_MX();
            }
        }
    });
    $('#Pagewown_MX').click(function () {
        var nowpage = document.getElementById("nowpage_MX").value;
        var maxpage = parseInt(document.getElementById("PageTotalCount_MX").value);
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) < maxpage) newpage = parseInt(nowpage) + 1;
        document.getElementById("pc_MX").value = newpage;
        document.getElementById("nowpage_MX").value = newpage;
        if ($("#TotalPageCount_MX").html() == "0") {
            return false;
        }
        else {
            GetOrder_MX();
        }

    });
    $('#PageLast_MX').click(function () {
        var maxpage = parseInt(document.getElementById("PageTotalCount_MX").value);
        document.getElementById("pc_MX").value = maxpage;
        document.getElementById("nowpage_MX").value = maxpage;
        if ($("#TotalPageCount_MX").html() == "0") {
            return false;
        }
        else {
            GetOrder_MX();
        }
    });
    $('#PageGO_MX').click(function () {
        var nowpage = parseInt(document.getElementById("nowpage_MX").value);
        var maxpage = parseInt(document.getElementById("PageTotalCount_MX").value) + 1;
        if (nowpage > 0 && nowpage < maxpage) {
            document.getElementById("pc_MX").value = document.getElementById("nowpage_MX").value;
            if ($("#TotalPageCount_MX").html() == "0") {
                return false;
            }
            else {
                GetOrder_MX();
            }
        }
        else {
            //alert("wrong page no.");
            $("#labtxt_MX").html("wrong page no.");
            showDiv();
            document.getElementById("nowpage_MX").value = 1;
        }
    });
    $("#nowpage_MX").keyup(function () {
        var t = $("#nowpage_MX").val();
        if (isNaN(t)) {
            $("#labtxt_MX").html("wrong page no.");
            showDiv();
            document.getElementById("nowpage_MX").value = 1;
        }
    });
    //查询
    $("#btnSearch_MX").click(function () {
        $("#nowpage_MX").val(1);
        $("#pc_MX").val(1);
        document.getElementById("nowpage_MX").value = 1;

        GetOrder_MX();
    })

    $("#step1").click(function () {
        $("#Query-Results").css("display", "none");
        $("#ProductEditView").css("display", "none");
        $("#ProductTplQueryView").css("display", "none");
        $("#Query").slideDown();
        $("#step1").removeAttr("style");
        $("#step2").css("display", "none");
        $("#step3").css("display", "none");
        $("#step4").css("display", "none");
        $("#step2").attr("class", "gray-em");
        $("#step1").attr("class", "red-em");
    })
    $("#step2").click(function () {
        $("#Query").css("display", "none");
        $("#ProductEditView").css("display", "none");
        $("#ProductTplQueryView").css("display", "none");
        $("#Query-Results").slideDown();
        $("#step1").removeAttr("style");
        $("#step2").removeAttr("style");
        $("#step3").css("display", "none");
        $("#step4").css("display", "none");
        $("#step1").attr("class", "gray-em");
        $("#step2").attr("class", "red-em");
    })
    $("#step3").click(function () {
        $("#Query").css("display", "none");
        $("#ProductTplQueryView").css("display", "none");
        $("#Query-Results").slideDown();
        $("#step1").removeAttr("style");
        $("#step2").removeAttr("style");
        $("#step3").removeAttr("style");
        $("#step4").css("display", "none");
        $("#step1").attr("class", "gray-em");
        $("#step2").attr("class", "gray-em");
        $("#step3").attr("class", "red-em");
    })
    $("#step4").click(function () {
        $("#Query-Results").css("display", "none");
        $("#Query").slideDown();
        $("#step1").removeAttr("style");
        $("#step3").removeAttr("style");
        $("#step2").attr("class", "gray-em");
        $("#step1").attr("class", "red-em");
    })

    GetOrder_MX();


})




function O_OrderProductItemVarData(obj) {

    var ProductItemNO = obj.attributes["ProductItemNO"].value;
    $.ajax({
        url: "/Maintain/O_OrderProductItemVarDataItem",
        data: { "ProductItemNO": ProductItemNO },
        dataType: "json",
        type: "post",
        success: function (res) {
            var obj = jQuery.parseJSON(res);
            var html = "";
            $.each(obj, function (i, item) {
                html += "<tr>";
                $.each(item, function (_i, _item) {

                    html += "<th class='center'>" + _i + "</th>";

                })
                html += "</tr>";

            })

            html += "<tr>";
            $.each(obj, function (i, item) {
                $.each(item, function (_i, _item) {
                    html += "<td class='center'>" + _item + "</th>";
                })

            })
            html += "</tr>";
            $("#OrderDetail_O_OrderProductItemVarData").html(html);
            $("#OrderDetail_O_OrderProductItemVarData").slideDown();
            debugger;
        }
    })
}


function O_OrderProductItemVarDefine(obj) {

    var ProductItemNO = obj.attributes["ProductItemNO"].value;
    $.ajax({
        url: "/Maintain/O_OrderProductItemVarDefineItem",
        data: { "ProductItemNO": ProductItemNO },
        dataType: "json",
        type: "post",
        success: function (res) {
            var obj = jQuery.parseJSON(res);
            var html = "";
            $.each(obj, function (i, item) {
                html += "<tr>";
                $.each(item, function (_i, _item) {
                    //alert(_i);

                    html += "<th class='center'>" + _i + "</th>";

                })
                html += "</tr>";

            })
            html += "<tr>";
            $.each(obj, function (i, item) {
                $.each(item, function (_i, _item) {
                    html += "<td class='center'>" + _item + "</th>";

                })

            })
            html += "</tr>";
            $("#OrderDetail_O_OrderProductItemVarData").html(html);
            $("#OrderDetail_O_OrderProductItemVarData").slideDown();
            debugger;
        }
    })
}

function GetOrder_MX() {
    var data_ = {
        //MaximNO: $("#maxinoHidden").val(),
        Page: document.getElementById("nowpage_MX").value
    }
    debugger;
    //var MaximNO = $("#MaximNO").val();
    $.post("/Maintain/O_OrderProductItem", data_, function (data) {
        debugger;
        if (data) {
            debugger;
            var html = "";
            var TotalPageCount_MX = "0";
            if (data.length > 0) {
                $.each(data, function (i, item) {
                    html += "<tr>";
                    html += "<td class='center'>" + "<input type=\"button\" class=\"btn\" id=\"FunO_OrderProductItemVarDataViewd\" value=\"查看O_OrderProductItemVarData\" ProductItemNO='" + item.ProductItemNO + "' onclick='O_OrderProductItemVarData(this)'/ >";
                    html += "<input type=\"button\" class=\"btn\" id=\"FunO_OrderProductItemVarDefine\" value=\"查看O_OrderProductItemVarDefine\" ProductItemNO='" + item.ProductItemNO + "' onclick='O_OrderProductItemVarDefine(this)'/ >";
                    html += "</td>";
                    html += "<td class='center'>" + item.ProductItemNO + "</td>";
                    html += "<td class='center'>" + item.MaximNO + "</td>";
                    html += "<td class='center'>" + item.OrderProductNO + "</td>";
                    html += "<td class='center'>" + item.ItemRowNO + "</td>";
                    html += "<td class='center'>" + item.ProductCode + "</td>";
                    html += "<td class='center'>" + item.ProductTplCode + "</td>";
                    html += "<td class='center'>" + item.OriOrderQty + "</td>";
                    html += "<td class='center'>" + item.OrderQty + "</td>";
                    html += "<td class='center'>" + item.ProduceQty + "</td>";
                    html += "<td class='center'>" + item.ShippingQty + "</td>";
                    html += "<td class='center'>" + item.IsPrinted + "</td>";
                    html += "<td class='center' hidden='hidden'>" + item.ItemStatus + "</td>";
                    html += "<td class='center'>" + item.OrdStatusCName + "</td>";               
                    html += "<td class='center'>" + item.BOM01 + "</td>";
                    html += "<td class='center'>" + item.BOM02 + "</td>";
                    html += "<td class='center'>" + item.BOM03 + "</td>";
                    html += "<td class='center'>" + item.BOM04 + "</td>";
                    html += "<td class='center'>" + item.SeqCIDNO + "</td>";
                    html += "<td class='center'>" + item.ItemJpgUrl + "</td>";
                    html += "<td class='center'>" + item.ItemPdfUrl + "</td>";
                    html += "<td class='center'>" + item.ItemPrintPdfUrl + "</td>";
                    html += "<td class='center'>" + item.Var01 + "</td>";
                    html += "<td class='center'>" + item.Var02 + "</td>";
                    html += "</tr>";

                });

                TotalPageCount_MX = data[0].OrderProductItemTotalPageCount;
            } else {
                $("#TotalPageCount_MX").html("0");
            }
            $("#OrderDetail_MX").html(html);
            $("#OrderDetail_MX").slideDown();

            $("#TotalPageCount_MX").html(TotalPageCount_MX);
            $("#PageTotalCount_MX").val(TotalPageCount_MX);

            $("#Query").css("display", "none")
            //$("#Query-Results").slideDown();

        }
    })
}


