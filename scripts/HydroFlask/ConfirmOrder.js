$(function () {
    //日历控件
    FormComponents.init();
    $.post("/HydroFlask/ConfirmOrderLoad", "", function (data) {
        if (data.FunStatus == "success") {
            $('#PrintShop').append("<option value=''>--All--</option>");
            $.each(data.ConfirmOrderLoadData.PSlist, function (i, item) {
                $('#PrintShop').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            });

            $('#DropVendor').append("<option value=''>--All--</option>");
            $.each(data.ConfirmOrderLoadData.Vendorlist, function (i, item) {
                $('#DropVendor').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            });
        }
        else {
            alert(data.ErrorCode);
        }
    });
    $("#btnQuery").click(function () {
        $("#nowpage").val(1);
        $("#pc").val(1);
        GetOrder();
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
    $("#step1").click(function () {
        $("#step2").css("display", "none");
        $("#Query-Results").css("display", "none");
        $("#Query-order").slideDown();
        $("#Results-ViewDetail").css("display", "none");
        $("#Results-ViewArtwork").css("display", "none");
        $("#step_ViewDetail").css("display", "none");
        $("#step_ViewArtwork").css("display", "none");
        $("#step1").attr("class", "red-em");
    });
    $("#step2").click(function () {
        $("#Query-Results").slideDown();
        $("#Results-ViewDetail").css("display", "none");
        $("#Results-ViewArtwork").css("display", "none");
        $("#step_ViewDetail").css("display", "none");
        $("#step_ViewArtwork").css("display", "none");
        $("#step2").attr("class", "red-em");
    });
});
function GetOrder() {
    var QueryData = {
        PSID: $("#PrintShop").val(),
        PO: $("#txtPO").val(),
        OOSOrderNO: $("#OrderNO").val(),
        Vendor: $("#DropVendor").val(),
        Page: document.getElementById("nowpage").value
    }
    $.post("/HydroFlask/ConfirmOrderQuery", QueryData, function (data) {
        if (data.FunStatus == "success") {
            var html = "";
            var intSeq = 0;
            $.each(data.ConfirmOrderLoadData.QueryData, function (i, item) {
                intSeq++;
                html += "<tr>";
                html += "<td class='center'><input id='checkbox"+intSeq+"' name='checkbox"+intSeq+"' type='checkbox' class='magic-checkbox' value='true'  style='display:none;'/> <label for='checkbox"+intSeq+"' style='margin-bottom: 20px;'></label><input style='display:none' id='Salesorderid"+intSeq+"' name='Salesorderid"+intSeq+"' type='text' value='" + item.Salesorderid + "' /></td>";
                html += "<td class='center'>" + item.Seq + "</td>";
                html += "<td class='center'>" + item.PrintShop + "</td>";
                html += "<td class='center'>" + item.CreateTime + "</td>";
                html += "<td class='center'>" + item.PO + "</td>";
                html += "<td class='center'>" + item.OOSOrderNO + "</td>";
                html += "<td class='center' style='text-align:right;'>" + item.OrderQty + "</td>";
                html += "<td class='center'>PCS</td>";
                html += "<td class='center'>" + "<a href=\"#\"  onclick='return funcViewDetail(this);' value='" + item.Salesorderid + "' >ViewDetail</a>" + "</td>";
                html += "<td class='center'>ArtWork</td>";
                html += "</tr>";
            });
            $("#OrderDetail tbody").html(html);
           
            $("#Query-order").css("display","none")
            $("#Query-Results").slideDown();
            $("#step2").removeAttr("style");
            $("#step1").attr("class", "gray-em");
            $("#step2").attr("class", "red-em");
            $("#TotalPageCount").html(data.ConfirmOrderLoadData.TotalCount);
            $("#PageTotalCount").val(data.ConfirmOrderLoadData.TotalCount);
            //$("#GridPgFoot").removeAttr("style");
        }
    });
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