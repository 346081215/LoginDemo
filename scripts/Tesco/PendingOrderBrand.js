$(function () {


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
    //查询
    $("#btnSearch").click(function () {
        $("#nowpage").val(1);
        $("#pc").val(1);
        document.getElementById("nowpage").value = 1;
        GetOrder();
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
        $("#step2").attr("class", "gray-em");
        $("#step1").attr("class", "red-em");
    })


})



function GetOrder() {
    var PrintShopId = $("#PrintShopId").val();
    var BrandId = $("#BrandId").val();
    //encodeURIComponent
    var MaximNO = $("#MaximNO").val();
    var CustomerPO = $("#CustomerPO").val();
    var OrderStatusId = $("#OrderStatusId").val();



    var data_ = {
        PrintShopId: PrintShopId,
        BrandId: BrandId,
        MaximNO: MaximNO,
        CustomerPO: CustomerPO,
        OrderStatusId: OrderStatusId,

        Page: document.getElementById("nowpage").value
    }
    $.post("/Tesco/OrderMaintainSearch", data_, function (data) {
        if (data) {
            debugger;
            var html = "";
            var TotalPageCount = "0";
            if (data.length > 0) {
                $.each(data, function (i, item) {
                    debugger;
                    html += "<tr>";
                    html += "<td class='center' id='" + item.MaximNO + "'>" + item.MaximNO + "</td>";
                    //html += "<td class='center'>" + item.PrintShopId + "</td>";
                    html += "<td class='center'>" + item.PrintShopName + "</td>";
                    html += "<td class='center'>" + item.CreatedDate + "</td>";
                    //html += "<td class='center'>" + item.ConfirmDate + "</td>";
                    //html += "<td class='center'>" + item.ShippedDate + "</td>";
                    //html += "<td class='center'>" + item.ETD + "</td>";
                    //html += "<td class='center'>" + item.ReceiveDate + "</td>";
                    html += "<td class='center'>" + item.CustomerId + "</td>";
                    //html += "<td class='center'>" + item.CustomerPO + "</td>";
                    //html += "<td class='center'>" + item.BrandId + "</td>"; 
                    html += "<td class='center'>" + item.BrandName + "</td>";
                    //html += "<td class='center'>" + item.SvcLevel + "</td>";
                    html += "<td class='center'>" + item.LevelName + "</td>";
                    // html += "<td class='center'>" + item.OrderFileName + "</td>";
                    // html += "<td class='center'hidden='hiddeen'>" + item.OrderStatus + "</td>";
                    //  html += "<td class='center'>" + item.OrdStatusCName + "</td>";
                    if (item.CustArtWork_PDF == "") {
                        html += "<td class='center'> " + "</td>";
                       // html += "<td class='center'> No ArtWork" + "</td>";
                    } else {
                        html += "<td class='center'> <a href='" + item.CustArtWork_PDF + "' target='_blank'>ArtWork</a>" + "</td>";
                    }


                    //html += "<td class='center'>" + " " + "</td>";
                    //html += "<td class='center'>" + "<select class='" + item.MaximNO + "' name='selectId'>";
                    //$.each(OrderHeader, function (is, items) {
                    //    if (item.OrderStatus == items.OrderStatus) {
                    //        html += "<option class='center' selected='true' value='" + items.OrderStatus + "'>" + items.OrdStatusCName + "</option>";
                    //    } else {
                    //        html += "<option class='center' value='" + items.OrderStatus + "'>" + items.OrdStatusCName + "</option>";
                    //    }
                    //})

                    //html += "</select>" + "</td>";

                    //html += "<td class='center'>" + "<input type=\"button\" class=\"btn\" id=\"FunOrderViewd\"  value=\"View\" MaximNOO='" + item.MaximNO + "' onclick='FunOrderView(this)'/ >";
                    //html += "<input type=\"button\" class=\"btn\" id=\"FunOrderDataRecordViewd\" value=\"OrderDataRecord\" MaximNOO='" + item.MaximNO + "' onclick='FunOrderDataRecordView(this)'/ >";
                    //html += "<button type=\"button\" class=\"btn\" id=\"OrderCancel\"  value='" + item.MaximNO + "^" + item.OrderStatus + "' onclick='FunOrderCancel(this)'>Cancel</button>";

                    //html += "</td>";
                    html += "</tr>";

                });

                TotalPageCount = data[0].TotalPageCount;
            } else {
                $("#TotalPageCount").html("0");
            }
            $("#OrderDetail tbody").html(html);

            $("#TotalPageCount").html(TotalPageCount);
            $("#PageTotalCount").val(TotalPageCount);

            //$("#Query").css("display", "none")
            $("#Query-Results").slideDown();

            $("#step1").removeAttr("style");
            $("#step2").removeAttr("style");
            $("#step1").attr("class", "gray-em");
            $("#step2").attr("class", "red-em");
        }
    })
}


function FunOrderView(obj) {
    //alert(MaximNO);

    var MaximNO = obj.attributes["MaximNOO"].value;
    //$.post("/Maintain/ProductEdit?ProductCode=", ProductCode, function (data) {

    //})

    debugger;
    $.ajax(
       {
           type: "get",
           url: "/Maintain/OrderView?MaximNO=" + encodeURIComponent(MaximNO),
           contentType: "application/html; charset=utf-8",
           dataType: "html",
           success: function (data) {
               $("#step1").removeAttr("style");
               $("#step2").removeAttr("style");
               $("#step3").removeAttr("style");
               $("#step1").attr("class", "gray-em");
               $("#step2").attr("class", "gray-em");
               $("#step3").attr("class", "red-em");

               $("#Query").css("display", "none");
               $("#Query-Results").css("display", "none");
               $("#ProductEditView").html(data);
               $("#ProductEditView").slideDown();
           }
       })
   .error(function (xhr, status) {
       $("#labtxt").html(status)
       showDiv();
   })
}


function FunOrderDataRecordView(obj) {
    //alert(MaximNO);
    var MaximNO = obj.attributes["MaximNOO"].value;
    //$.post("/Maintain/ProductEdit?ProductCode=", ProductCode, function (data) {

    //})

    debugger;
    $.ajax(
       {
           type: "get",
           url: "/Maintain/OrderDataRecordView?MaximNO=" + encodeURIComponent(MaximNO),
           contentType: "application/html; charset=utf-8",
           dataType: "html"
       })
   .success(function (data) {
       //console.log(data);
       //$("#ProductEditView").css("display", "block");
       $("#step1").removeAttr("style");
       $("#step2").removeAttr("style");
       $("#step3").removeAttr("style");
       $("#step1").attr("class", "gray-em");
       $("#step2").attr("class", "gray-em");
       $("#step3").attr("class", "red-em");
       $("#Query").css("display", "none")
       $("#Query-Results").css("display", "none")
       $("#ProductEditView").html(data);
       $("#ProductEditView").slideDown();

   })
   .error(function (xhr, status) {
       $("#labtxt").html(status)
       showDiv();
   })
}

function FunOrderCancel(obj) {

    var arr = obj.value.split("^");
    var MaximNO = arr[0];
    var OrderStatus = arr[1];
    if (OrderStatus != "130") {
        alert("订单状态只能为“临时订单已确认”才可cancel,并且cancel后的状态为“订单取消”");
        return false;
    }
    else {
        if (confirm("确认要取消吗？") == true) {
            var data_ = {
                MaximNO: MaximNO,
                OrderStatusId: OrderStatus
            }
            $.post("/Maintain/OrderCancel", data_, function (data) {
                if (data.Funstatus == "0") {
                    alert(data.ExCode);
                }
                else {
                    alert("临时订单取消成功！");
                    GetOrder();
                }
            });
        }
    }
}





