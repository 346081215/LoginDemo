$(function () {
    FormComponents.init();

    var myDate = new Date();
    var _ToDay = myDate.getMonth() + 1 + "/" + myDate.getDate() + "/" + myDate.getFullYear();

    $("input[name='SubmitEndTime']").val(_ToDay);
    //分页
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
    });

    $('#PageIndex1').click(function () {
        document.getElementById("pc1").value = 1;
        document.getElementById("nowpage1").value = 1;
        if ($("#TotalPageCount1").html() == "0") {
            return false;
        }
        else {
            funSelectFileDataLogID($("#SelectFileDataLogID").val());
        }
    });
    $('#Pageup1').click(function () {
        var nowpage = document.getElementById("nowpage1").value;
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) > 1) {
            newpage = parseInt(nowpage) - 1;
            document.getElementById("pc1").value = newpage;
            document.getElementById("nowpage1").value = newpage;
            if ($("#TotalPageCount1").html() == "0") {
                return false;
            }
            else {
                funSelectFileDataLogID($("#SelectFileDataLogID").val());
            }
        }
    });
    $('#Pagewown1').click(function () {
        var nowpage = document.getElementById("nowpage1").value;
        var maxpage = parseInt(document.getElementById("PageTotalCount1").value);
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) < maxpage) newpage = parseInt(nowpage) + 1;
        document.getElementById("pc1").value = newpage;
        document.getElementById("nowpage1").value = newpage;
        if ($("#TotalPageCount1").html() == "0") {
            return false;
        }
        else {
            funSelectFileDataLogID($("#SelectFileDataLogID").val());
        }

    });
    $('#PageLast1').click(function () {
        var maxpage = parseInt(document.getElementById("PageTotalCount1").value);
        document.getElementById("pc1").value = maxpage;
        document.getElementById("nowpage1").value = maxpage;
        if ($("#TotalPageCount1").html() == "0") {
            return false;
        }
        else {
            funSelectFileDataLogID($("#SelectFileDataLogID").val());
        }
    });
    $('#PageGO1').click(function () {
        var nowpage = parseInt(document.getElementById("nowpage1").value);
        var maxpage = parseInt(document.getElementById("PageTotalCount1").value) + 1;
        if (nowpage > 0 && nowpage < maxpage) {
            document.getElementById("pc1").value = document.getElementById("nowpage1").value;
            if ($("#TotalPageCount1").html() == "0") {
                return false;
            }
            else {
                funSelectFileDataLogID($("#SelectFileDataLogID").val());
            }
        }
        else {
            //alert("wrong page no.");
            $("#labtxt").html("wrong page no.");
            showDiv();
            document.getElementById("nowpage").value = 1;
        }
    });
    $("#nowpage1").keyup(function () {
        var t = $("#nowpage1").val();
        if (isNaN(t)) {
            $("#labtxt").html("wrong page no.");
            showDiv();
            document.getElementById("nowpage1").value = 1;
        }
    });


    $('#PageIndex2').click(function () {
        document.getElementById("pc2").value = 1;
        document.getElementById("nowpage2").value = 1;
        if ($("#TotalPageCount2").html() == "0") {
            return false;
        }
        else {
            aa(("#SelectFileDataLogID").val());
        }
    });
    $('#Pageup2').click(function () {
        var nowpage = document.getElementById("nowpage2").value;
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) > 1) {
            newpage = parseInt(nowpage) - 1;
            document.getElementById("pc2").value = newpage;
            document.getElementById("nowpage2").value = newpage;
            if ($("#TotalPageCount2").html() == "0") {
                return false;
            }
            else {
                aa($("#SelectFileDataLogID").val());
            }
        }
    });
    $('#Pagewown2').click(function () {
        var nowpage = document.getElementById("nowpage2").value;
        var maxpage = parseInt(document.getElementById("PageTotalCount2").value);
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) < maxpage) newpage = parseInt(nowpage) + 1;
        document.getElementById("pc2").value = newpage;
        document.getElementById("nowpage2").value = newpage;
        if ($("#TotalPageCount2").html() == "0") {
            return false;
        }
        else {
            // alert($("#SelectFileDataLogID").val());
            aa($("#SelectFileDataLogID").val());
        }

    });
    $('#PageLast2').click(function () {
        var maxpage = parseInt(document.getElementById("PageTotalCount2").value);
        document.getElementById("pc2").value = maxpage;
        document.getElementById("nowpage2").value = maxpage;
        if ($("#TotalPageCount2").html() == "0") {
            return false;
        }
        else {
            aa($("#SelectFileDataLogID").val());
        }
    });
    $('#PageGO2').click(function () {
        var nowpage = parseInt(document.getElementById("nowpage2").value);
        var maxpage = parseInt(document.getElementById("PageTotalCount2").value) + 1;
        if (nowpage > 0 && nowpage < maxpage) {
            document.getElementById("pc2").value = document.getElementById("nowpage2").value;
            if ($("#TotalPageCount2").html() == "0") {
                return false;
            }
            else {
                aa($("#SelectFileDataLogID").val());
            }
        }
        else {
            //alert("wrong page no.");
            $("#labtxt").html("wrong page no.");
            showDiv();
            document.getElementById("nowpage").value = 1;
        }
    });
    $("#nowpage2").keyup(function () {
        var t = $("#nowpage2").val();
        if (isNaN(t)) {
            $("#labtxt").html("wrong page no.");
            showDiv();
            document.getElementById("nowpage2").value = 1;
        }
    });


    $("#step1").click(function () {
        $("#Query-Results").css("display", "none");
        $("#ParseOrderLog").css("display", "none");
        $("#ProductTplQueryView").css("display", "none");
        $("#BrandType").val("");
        $("#FormatId").val("--All--");
        $("#Query").slideDown();
        $("#step1").removeAttr("style");
        $("#step2").css("display", "none");
        $("#step3").css("display", "none");
        $("#step4").css("display", "none");
        $("#step2").attr("class", "gray-em");
        $("#step1").attr("class", "red-em");
    });
    $("#step2").click(function () {
        $("#Query").css("display", "block");
        $("#Query-Results").css("display", "block");
        $("#ParseOrderLog").css("display", "none");
        $("#ProductTplQueryView").css("display", "none");
        $("#Query-Results").slideDown();
        $("#step1").removeAttr("style");
        $("#step2").removeAttr("style");
        $("#step3").css("display", "none");
        $("#step4").css("display", "none");
        $("#step1").attr("class", "gray-em");
        $("#step2").attr("class", "red-em");
    });
})


function GetOrder() {
    var data_ = {
        Status: $("#Status").val(),
        Page: document.getElementById("nowpage").value,
        DateStart: $("input[name='SubmitStartTime']").val(),
        DateEnd: $("input[name='SubmitEndTime']").val(),
        FormatId: $("#FormatId").val()
    }

    $.post("/Maintain/FiledatalogQuery", data_, function (data) {
        console.log(data);
        if (data) {
            var html = "";
            var TotalPageCount = "0";

            if (data.length > 0) {
                $.each(data, function (i, item) {
                    html += "<tr>";
                    html += "<td class='center'>" + item.Seq + "</a></td>";
                    html += "<td class='center'><a id='' href='#' onclick='funSelectFileDataLogID(" + item.FileDataLogID + ")'>" + item.FileDataLogID + "</a></td>";
                    html += "<td class='center'>" + item.FormatId + "</a></td>";
                    //html += "<td class=\'center\' ><a href=\"#\" onclick=\"aa(this)\" FileDataLogID='" + item.FileDataLogID + "'>" + item.FileDataLogStatus + "</a></td>";
                    html += "<td class=\'center\' ><a href=\"#\" onclick=\"aa(" + item.FileDataLogID + ")\"> " + item.FileDataLogStatus + "</a></td>";
                    html += "<td class='center'>" + item.FileName + "</td>";
                    html += "<td class='center'>" + item.Createtime + "</td>";
                    //html += "<td class=\'center\'><a href=\"#\">" + item.ParseOrderStatus + "</a></td>";
                    //html += "<td class=\'center\'><a href=\"#\">" + item.OrderNo + "</a></td>";
                    //html += "<td class='center'>" + item.Po + "</td>";
                    html += "</tr>";
                    debugger;
                    TotalPageCount = data[0].TotalPageCount;
                    TotalPoNum = item.FileDataLogIDTotalPo;
                    FailPoNum = item.FileDataLogIDFailPo;
                    SelectFileDataLogID = item.FileDataLogID;
                });
            } else {
                $("#TotalPageCount").html("0");
            }
            $("#OrderDetail tbody").html(html)
            $("#TotalPageCount").html(TotalPageCount);
            $("#PageTotalCount").val(TotalPageCount);
            $("#Query-Results").css("display", "block");
            //$("#SelectFileDataLogID").val(SelectFileDataLogID);

            $("#TotalPo").val(TotalPoNum);
            $("#FailPo").val(FailPoNum);
        }
    })

}


function aa(obj) {
    $("#SelectFileDataLogID").val(obj);
    $("#step1").removeAttr("style");
    $("#step2").removeAttr("style");
    $("#step3").removeAttr("style");
    $("#step1").attr("class", "gray-em");
    $("#step2").attr("class", "gray-em");
    $("#step3").attr("class", "red-em");

    $("#ParseOrderLog").css("display", "block");
    var data_ = {
        FileDataLogID: obj,
        pc2: document.getElementById("nowpage2").value,
    };
    //var FileDataLogID = obj.attributes["FileDataLogID"].value;
    //$.post("/Maintain/ParseOrderLog", data_, function (data) {
    //    var html = "";
    //    debugger;
    //    $.each(data, function (i, item) {
    //        html += "<tr>";
    //        html += "<td class='center'>" + item.Seq + "</td>";
    //        html += "<td class='center'>" + item.ParseOrderStatus + "</a></td>";
    //        html += "<td class='center'>" + item.OrderNo + "</td>";
    //        html += "<td class='center'>" + item.PO + "</td>";
    //        html += "<td class='center'>" + item.ErrorType + "</td>";
    //        html += "<td class='center'>" + item.RuleErrorValue + "</td>";
    //        html += "<tr>";
    //    })
    //    $("#FileDataLogID").html("FileDataLogID:" + data_.FileDataLogID);
    //    $("#ParseOrderDetail tbody").html(html);
    //})
    $.ajax({
        url: "/Maintain/ParseOrderLog",
        data: data_,
        dataType: "json",
        type: "post",
        success: function (data) {
            var html = "";
            $.each(data, function (i, item) {
                html += "<tr>";
                html += "<td class='center'>" + item.Seq + "</td>";
                html += "<td class='center'>" + item.ParseOrderStatus + "</a></td>";
                html += "<td class='center'>" + item.OrderNo + "</td>";
                html += "<td class='center'>" + item.PO + "</td>";
                html += "<td class='center'>" + item.ErrorType + "</td>";
                html += "<td class='center'>" + item.RuleErrorValue + "</td>";
                html += "<tr>";

                $("#TotalPageCount2").html(item.CountId);
                $("#PageTotalCount2").val(item.CountId);
            });
            $("#FileDataLogID").html("FileDataLogID:" + data_.FileDataLogID);
            $("#ParseOrderDetail tbody").html(html);
        }
    })
}

//FileDataLogID详细页面
function funSelectFileDataLogID(FileDataLogID) {
    $("#SelectFileDataLogID").val(FileDataLogID);
    $("#step1").removeAttr("style");
    $("#step2").removeAttr("style");
    $("#step3").removeAttr("style");
    $("#step1").attr("class", "gray-em");
    $("#step2").attr("class", "gray-em");
    $("#step3").attr("class", "red-em");

    $("#ProductTplQueryView").css("display", "block");
    debugger;
    var data_ = {
        fileid: FileDataLogID,
        pc1: $("#pc1").val()
    }
    $.post("/Maintain/SelectFiledatalogId", data_, function (data) {
        debugger;
        var obj = jQuery.parseJSON(data);
        var html = "";
        debugger;
        if (obj[obj.length - 1].OrdStatus == "ADO001")
        {
            $.each(obj, function (i, item) {
                if (i < obj.length - 1) {
                    html += "<tr>";
                    html += "<td class='center'>" + item.FileDataLogID + "</td>";
                    html += "<td class='center'>" + item.Line_No + "</td>";
                    html += "<td class='center'>" + item.OrdStatus + "</td>";
                    html += "<td class='center'>" + item.Action + "</td>";
                    html += "<td class='center'>" + item.season + "</td>";
                    html += "<td class='center'>" + item.section + "</td>";
                    html += "<td class='center'>" + item.garment + "</td>";
                    html += "<td class='center'>" + item.model + "</td>";
                    html += "<td class='center'>" + item.reference + "</td>";
                    html += "<td class='center'>" + item.Supplier_code + "</td>";
                    html += "<td class='center'>" + item.Supplier_name + "</td>";
                    html += "<td class='center'>" + item.order_date + "</td>";
                    html += "<td class='center'>" + item.Order_number + "</td>";
                    html += "<td class='center'>" + item.Order_No + "</td>";
                    html += "<td class='center'>" + item.EUR_size + "</td>";
                    html += "<td class='center'>" + item.EAN13_2 + "</td>";
                    html += "<td class='center'>" + item.always_a_1 + "</td>";
                    html += "<td class='center'>" + item.supplier_Quantity + "</td>";
                    html += "<td class='center'>" + item.ExtFibre1Percent + "</td>";
                    html += "<td class='center'>" + item.ExtFibre1 + "</td>";
                    html += "<td class='center'>" + item.ExtFibre2Percent + "</td>";
                    html += "<td class='center'>" + item.ExtFibre2 + "</td>";
                    html += "<td class='center'>" + item.ExtFibre3Percent + "</td>";
                    html += "<td class='center'>" + item.ExtFibre3 + "</td>";
                    html += "<td class='center'>" + item.ExtFibre4Percent + "</td>";
                    html += "<td class='center'>" + item.ExtFibre4 + "</td>";
                    html += "<td class='center'>" + item.ExtFibre5Percent + "</td>";
                    html += "<td class='center'>" + item.ExtFibre5 + "</td>";
                    html += "<td class='center'>" + item.ExtFibre6Percent + "</td>";
                    html += "<td class='center'>" + item.ExtFibre6 + "</td>";
                    html += "<td class='center'>" + item.ExtFibre7Percent + "</td>";
                    html += "<td class='center'>" + item.ExtFibre7 + "</td>";
                    html += "<td class='center'>" + item.ExtFibre8Percent + "</td>";
                    html += "<td class='center'>" + item.ExtFibre8 + "</td>";
                    html += "<td class='center'>" + item.ExtFibre9Percent + "</td>";
                    html += "<td class='center'>" + item.ExtFibre9 + "</td>";
                    html += "<td class='center'>" + item.ExtFibre10Percent + "</td>";
                    html += "<td class='center'>" + item.ExtFibre10 + "</td>";
                    html += "<td class='center'>" + item.Care_information_number + "</td>";
                    html += "<td class='center'>" + item.Care_information_letter + "</td>";
                    html += "<td class='center'>" + item.label1_QTY + "</td>";
                    html += "<td class='center'>" + item.said_label1 + "</td>";
                    html += "<td class='center'>" + item.label2_QTY + "</td>";
                    html += "<td class='center'>" + item.said_label2 + "</td>";
                    html += "<td class='center'>" + item.label3_QTY + "</td>";
                    html += "<td class='center'>" + item.said_label3 + "</td>";
                    html += "<td class='center'>" + item.label4_QTY + "</td>";
                    html += "<td class='center'>" + item.said_label4 + "</td>";
                    html += "<td class='center'>" + item.label5_QTY + "</td>";
                    html += "<td class='center'>" + item.said_label5 + "</td>";
                    html += "<td class='center'>" + item.label6_QTY + "</td>";
                    html += "<td class='center'>" + item.said_label6 + "</td>";
                    html += "<td class='center'>" + item.label7_QTY + "</td>";
                    html += "<td class='center'>" + item.said_label7 + "</td>";
                    html += "<td class='center'>" + item.label8_QTY + "</td>";
                    html += "<td class='center'>" + item.said_label8 + "</td>";
                    html += "<td class='center'>" + item.label9_QTY + "</td>";
                    html += "<td class='center'>" + item.said_label9 + "</td>";
                    html += "<td class='center'>" + item.label10_QTY + "</td>";
                    html += "<td class='center'>" + item.said_label10 + "</td>";
                    html += "<td class='center'>" + item.label11_QTY + "</td>";
                    html += "<td class='center'>" + item.said_label11 + "</td>";
                    html += "<td class='center'>" + item.label12_QTY + "</td>";
                    html += "<td class='center'>" + item.said_label12 + "</td>";
                    html += "<td class='center'>" + item.Date_of_file_sent + "</td>";
                    html += "<td class='center'>" + item.FillingFibre1Percent + "</td>";
                    html += "<td class='center'>" + item.FillingFibre1 + "</td>";
                    html += "<td class='center'>" + item.FillingFibre2Percent + "</td>";
                    html += "<td class='center'>" + item.FillingFibre2 + "</td>";
                    html += "<td class='center'>" + item.FillingFibre3Percent + "</td>";
                    html += "<td class='center'>" + item.FillingFibre3 + "</td>";
                    html += "<td class='center'>" + item.Description1 + "</td>";
                    html += "<td class='center'>" + item.Description1_Code + "</td>";
                    html += "<td class='center'>" + item.Descr1Fibre1Percent + "</td>";
                    html += "<td class='center'>" + item.Descr1Fibre1 + "</td>";
                    html += "<td class='center'>" + item.Descr1Fibre2Percent + "</td>";
                    html += "<td class='center'>" + item.Descr1Fibre2 + "</td>";
                    html += "<td class='center'>" + item.Descr1Fibre3Percent + "</td>";
                    html += "<td class='center'>" + item.Descr1Fibre3 + "</td>";
                    html += "<td class='center'>" + item.Descr1Fibre4Percent + "</td>";
                    html += "<td class='center'>" + item.Descr1Fibre4 + "</td>";
                    html += "<td class='center'>" + item.Descr1Fibre5Percent + "</td>";
                    html += "<td class='center'>" + item.Descr1Fibre5 + "</td>";
                    html += "<td class='center'>" + item.Descr1Fibre6Percent + "</td>";
                    html += "<td class='center'>" + item.Descr1Fibre6 + "</td>";
                    html += "<td class='center'>" + item.Description2 + "</td>";
                    html += "<td class='center'>" + item.Description2_Code + "</td>";
                    html += "<td class='center'>" + item.Descr2Fibre1Percent + "</td>";
                    html += "<td class='center'>" + item.Descr2Fibre1 + "</td>";
                    html += "<td class='center'>" + item.Descr2Fibre2Percent + "</td>";
                    html += "<td class='center'>" + item.Descr2Fibre2 + "</td>";
                    html += "<td class='center'>" + item.Descr2Fibre3Percent + "</td>";
                    html += "<td class='center'>" + item.Descr2Fibre3 + "</td>";
                    html += "<td class='center'>" + item.Descr2Fibre4Percent + "</td>";
                    html += "<td class='center'>" + item.Descr2Fibre4 + "</td>";
                    html += "<td class='center'>" + item.Descr2Fibre5Percent + "</td>";
                    html += "<td class='center'>" + item.Descr2Fibre5 + "</td>";
                    html += "<td class='center'>" + item.Descr2Fibre6Percent + "</td>";
                    html += "<td class='center'>" + item.Descr2Fibre6 + "</td>";
                    html += "<td class='center'>" + item.Description3 + "</td>";
                    html += "<td class='center'>" + item.Description3_Code + "</td>";
                    html += "<td class='center'>" + item.Descr3Fibre1Percent + "</td>";
                    html += "<td class='center'>" + item.Descr3Fibre1 + "</td>";
                    html += "<td class='center'>" + item.Descr3Fibre2Percent + "</td>";
                    html += "<td class='center'>" + item.Descr3Fibre2 + "</td>";
                    html += "<td class='center'>" + item.Descr3Fibre3Percent + "</td>";
                    html += "<td class='center'>" + item.Descr3Fibre3 + "</td>";
                    html += "<td class='center'>" + item.Descr3Fibre4Percent + "</td>";
                    html += "<td class='center'>" + item.Descr3Fibre4 + "</td>";
                    html += "<td class='center'>" + item.Descr3Fibre5Percent + "</td>";
                    html += "<td class='center'>" + item.Descr3Fibre5 + "</td>";
                    html += "<td class='center'>" + item.Descr3Fibre6Percent + "</td>";
                    html += "<td class='center'>" + item.Descr3Fibre6 + "</td>";
                    html += "<td class='center'>" + item.Always_N + "</td>";
                    html += "<td class='center'>" + item.EAN13 + "</td>";
                    html += "<td class='center'>" + item.label13_QTY + "</td>";
                    html += "<td class='center'>" + item.said_label13 + "</td>";
                    html += "<td class='center'>" + item.label14_QTY + "</td>";
                    html += "<td class='center'>" + item.said_label14 + "</td>";
                    html += "<td class='center'>" + item.MADE_IN_Country + "</td>";
                    html += "<td class='center'>" + item.SizeMEX + "</td>";
                    html += "<td class='center'>" + item.SizeUSA + "</td>";
                    html += "<td class='center'>" + item.Sizerange01 + "</td>";
                    html += "<td class='center'>" + item.Sizerange02 + "</td>";
                    html += "<td class='center'>" + item.Sizerange03 + "</td>";
                    html += "<td class='center'>" + item.Sizerange04 + "</td>";
                    html += "<td class='center'>" + item.Sizerange05 + "</td>";
                    html += "<td class='center'>" + item.Sizerange06 + "</td>";
                    html += "<td class='center'>" + item.Sizerange07 + "</td>";
                    html += "<td class='center'>" + item.Sizerange08 + "</td>";
                    html += "<td class='center'>" + item.Sizerange09 + "</td>";
                    html += "<td class='center'>" + item.Sizerange10 + "</td>";
                    html += "<td class='center'>" + item.CanreCurrency + "</td>";
                    html += "<td class='center'>" + item.CanrePrice + "</td>";
                    html += "<td class='center'>" + item.CanreCode + "</td>";
                    html += "<td class='center'>" + item.label15_QTY + "</td>";
                    html += "<td class='center'>" + item.said_label15 + "</td>";
                    html += "<td class='center'>" + item.label16_QTY + "</td>";
                    html += "<td class='center'>" + item.said_label16 + "</td>";
                    html += "<td class='center'>" + item.label17_QTY + "</td>";
                    html += "<td class='center'>" + item.said_label17 + "</td>";
                    html += "<td class='center'>" + item.label18_QTY + "</td>";
                    html += "<td class='center'>" + item.said_label18 + "</td>";
                    html += "<td class='center'>" + item.Description4 + "</td>";
                    html += "<td class='center'>" + item.Description4_Code + "</td>";
                    html += "<td class='center'>" + item.Descr4Fibre1Percent + "</td>";
                    html += "<td class='center'>" + item.Descr4Fibre1 + "</td>";
                    html += "<td class='center'>" + item.Descr4Fibre2Percent + "</td>";
                    html += "<td class='center'>" + item.Descr4Fibre2 + "</td>";
                    html += "<td class='center'>" + item.Descr4Fibre3Percent + "</td>";
                    html += "<td class='center'>" + item.Descr4Fibre3 + "</td>";
                    html += "<td class='center'>" + item.Descr4Fibre4Percent + "</td>";
                    html += "<td class='center'>" + item.Descr4Fibre4 + "</td>";
                    html += "<td class='center'>" + item.Descr4Fibre5Percent + "</td>";
                    html += "<td class='center'>" + item.Descr4Fibre5 + "</td>";
                    html += "<td class='center'>" + item.Descr4Fibre6Percent + "</td>";
                    html += "<td class='center'>" + item.Descr4Fibre6 + "</td>";
                    html += "<td class='center'>" + item.Description5 + "</td>";
                    html += "<td class='center'>" + item.Description5_Code + "</td>";
                    html += "<td class='center'>" + item.Descr5Fibre1Percent + "</td>";
                    html += "<td class='center'>" + item.Descr5Fibre1 + "</td>";
                    html += "<td class='center'>" + item.Descr5Fibre2Percent + "</td>";
                    html += "<td class='center'>" + item.Descr5Fibre2 + "</td>";
                    html += "<td class='center'>" + item.Descr5Fibre3Percent + "</td>";
                    html += "<td class='center'>" + item.Descr5Fibre3 + "</td>";
                    html += "<td class='center'>" + item.Descr5Fibre4Percent + "</td>";
                    html += "<td class='center'>" + item.Descr5Fibre4 + "</td>";
                    html += "<td class='center'>" + item.Descr5Fibre5Percent + "</td>";
                    html += "<td class='center'>" + item.Descr5Fibre5 + "</td>";
                    html += "<td class='center'>" + item.Descr5Fibre6Percent + "</td>";
                    html += "<td class='center'>" + item.Descr5Fibre6 + "</td>";
                    html += "<td class='center'>" + item.SizeChina + "</td>";
                    html += "</tr>";
                }
                //$("#TotalPageCount1").html(item.CountId);
                //$("#PageTotalCount1").val(item.CountId);
            })
            $("#TotalPageCount1").html(obj[0].CountId);
            $("#PageTotalCount1").val(obj[0].CountId);
        }
        else if (obj[obj.length - 1].OrdStatus == "PDT001")
        {
            $.each(obj, function (i, item) {
                if (i < obj.length - 1) {
                    html += "<tr>";
                    html += "<td class='center'>" + item.FileDataLogID + "</td>";
                    html += "<td class='center'>" + item.Line_NO + "</td>";
                    html += "<td class='center'>" + item.OrdStatus + "</td>";
                    html += "<td class='center'>" + item.orderId + "</td>";
                    html += "<td class='center'>" + item.orderNumber + "</td>";
                    html += "<td class='center'>" + item.ticketCustomer + "</td>";
                    html += "<td class='center'>" + item.referenceNumber + "</td>";
                    html += "<td class='center'>" + item.issueDate + "</td>";
                    html += "<td class='center'>" + item.exportTimestampUTC + "</td>";
                    html += "<td class='center'>" + item.exportTimestampLocal + "</td>";
                    html += "<td class='center'>" + item.printPOnumber + "</td>";
                    html += "<td class='center'>" + item.printPOdate + "</td>";
                    html += "<td class='center'>" + item.orderLine + "</td>";
                    html += "<td class='center'>" + item.item_division + "</td>";
                    html += "<td class='center'>" + item.item_style + "</td>";
                    html += "<td class='center'>" + item.item_color + "</td>";
                    html += "<td class='center'>" + item.item_label + "</td>";
                    html += "<td class='center'>" + item.item_dimension + "</td>";
                    html += "<td class='center'>" + item.styleName + "</td>";
                    html += "<td class='center'>" + item.colorName + "</td>";
                    html += "<td class='center'>" + item.printItem + "</td>";
                    html += "<td class='center'>" + item.printColor + "</td>";
                    html += "<td class='center'>" + item.printGroupDesc + "</td>";
                    html += "<td class='center'>" + item.printMSRP + "</td>";
                    html += "<td class='center'>" + item.printItemDescLine1 + "</td>";
                    html += "<td class='center'>" + item.printItemDescLine2 + "</td>";
                    html += "<td class='center'>" + item.printItemDescLine3 + "</td>";
                    html += "<td class='center'>" + item.printDimEnglish + "</td>";
                    html += "<td class='center'>" + item.printDimMetric + "</td>";
                    html += "<td class='center'>" + item.itemQtyTotal + "</td>";
                    html += "<td class='center'>" + item.lineId + "</td>";
                    html += "<td class='center'>" + item.sizeSequence + "</td>";
                    html += "<td class='center'>" + item.sizeCode + "</td>";
                    html += "<td class='center'>" + item.printSize + "</td>";
                    html += "<td class='center'>" + item.printUPC + "</td>";
                    html += "<td class='center'>" + item.itemQty + "</td>";
                    html += "<td class='center'>" + item.sizeId + "</td>";
                    html += "<td class='center'>" + item.ticketLine + "</td>";
                    html += "<td class='center'>" + item.tkt_division + "</td>";
                    html += "<td class='center'>" + item.tkt_style + "</td>";
                    html += "<td class='center'>" + item.tkt_color + "</td>";
                    html += "<td class='center'>" + item.tkt_label + "</td>";
                    html += "<td class='center'>" + item.tkt_dimension + "</td>";
                    html += "<td class='center'>" + item.tkt_sizeSequence + "</td>";
                    html += "<td class='center'>" + item.tkt_sizeCode + "</td>";
                    html += "<td class='center'>" + item.tkt_styleName + "</td>";
                    html += "<td class='center'>" + item.tkt_colorName + "</td>";
                    html += "<td class='center'>" + item.ticketFormat + "</td>";
                    html += "<td class='center'>" + item.ticketQty + "</td>";
                    html += "<td class='center'>" + item.printTicketIdentifier + "</td>";
                    html += "<td class='center'>" + item.ticketId + "</td>";
                    html += "</tr>";

                    //$("#TotalPageCount1").html(item.CountId);
                    //$("#PageTotalCount1").val(item.CountId);
                }
            })

            $("#TotalPageCount1").html(obj[0].CountId);
            $("#PageTotalCount1").val(obj[0].CountId);
        }
        else if (obj[obj.length - 1].OrdStatus == "HOR001")
        {
            $.each(obj, function (i, item)
            {
                if (i < obj.length - 1)
                {
                    html += "<tr>";
                    html += "<td class='center'>" + item.FileDataLogID + "</td>";
                    html += "<td class='center'>" + item.OrdStatus + "</td>";
                    html += "<td class='center'>" + item.Line_No + "</td>";
                    html += "<td class='center'>" + item.Supplier + "</td>";
                    html += "<td class='center'>" + item.Name + "</td>";
                    html += "<td class='center'>" + item.Number + "</td>";
                    html += "<td class='center'>" + item.Variant + "</td>";
                    html += "<td class='center'>" + item.Color_description + "</td>";
                    html += "<td class='center'>" + item.Brand + "</td>";
                    html += "<td class='center'>" + item.Group + "</td>";
                    html += "<td class='center'>" + item.Subgroup + "</td>";
                    html += "<td class='center'>" + item.Color + "</td>";
                    html += "<td class='center'>" + item.Season + "</td>";
                    html += "<td class='center'>" + item.OutPrice + "</td>";
                    html += "<td class='center'>" + item.SzExtId + "</td>";
                    html += "<td class='center'>" + item.EAN + "</td>";
                    html += "<td class='center'>" + item.StockQty + "</td>";
                    html += "<td class='center'>" + item.Sz + "</td>";
                    html += "<td class='center'>" + item.Tags + "</td>";
                    html += "<td class='center'>" + item.Gender + "</td>";
                    html += "<td class='center'>" + item.Freight + "</td>";
                    html += "<td class='center'>" + item.Duty + "</td>";
                    html += "</tr>";

                    //$("#TotalPageCount1").html(item.CountId);
                    //$("#PageTotalCount1").val(item.CountId);
                }
            })

            $("#TotalPageCount1").html(obj[0].CountId);
            $("#PageTotalCount1").val(obj[0].CountId);
        }
        else
        {
            $.each(obj, function (i, item)
            {
                if (i < obj.length - 1)
                {
                    debugger;
                    html += "<tr>";
                    html += "<td class='center'>" + item.FileDataLogID + "</td>";
                    html += "<td class='center'>" + item.Line_No + "</td>";
                    html += "<td class='center'>" + item.OrdStatus + "</td>";
                    html += "<td class='center'>" + item.Vendor_PO_Number + "</td>";
                    html += "<td class='center'>" + item.Supplier_Name + "</td>";
                    html += "<td class='center'>" + item.Supplier_address1 + "</td>";
                    html += "<td class='center'>" + item.Supplier_address2 + "</td>";
                    html += "<td class='center'>" + item.Supplier_address3 + "</td>";
                    html += "<td class='center'>" + item.Vendor_ID + "</td>";
                    html += "<td class='center'>" + item.Sticker_Code + "</td>";
                    html += "<td class='center'>" + item.Date + "</td>";
                    html += "<td class='center'>" + item.Quantity + "</td>";
                    html += "<td class='center'>" + item.Article_No + "</td>";
                    html += "<td class='center'>" + item.SKU + "</td>";
                    html += "<td class='center'>" + item.Article_Name + "</td>";
                    html += "<td class='center'>" + item.Color_Code + "</td>";
                    html += "<td class='center'>" + item.Color_Name + "</td>";
                    html += "<td class='center'>" + item.EAN_Barcode_No + "</td>";
                    html += "<td class='center'>" + item.Currency + "</td>";
                    html += "<td class='center'>" + item.Price + "</td>";
                    html += "<td class='center'>" + item.Size + "</td>";
                    html += "<td class='center'>" + item.Season_Code + "</td>";
                    html += "<td class='center'>" + item.Purchase_Price + "</td>";
                    html += "</tr>";
                }

            });
            $("#TotalPageCount1").html(obj[0].CountId);
            $("#PageTotalCount1").val(obj[0].CountId);
        }

        $("#OrderDetail_FileDataLogID tbody").html(html);
    });

}
