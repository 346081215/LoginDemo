$(function () {
    $("#Waste").change(function () {
        var bci = 1+$("#Waste").val()/100
        var QtyTable = document.getElementById("NeedOrderNowOrder");
        for (var i = 0; i < QtyTable.rows.length; i++) {
            var oldQtystr = QtyTable.rows[i].cells[13].innerHTML;
            oldQtystr = oldQtystr.substring(0, oldQtystr.length-2)
            var oldQty = parseInt(oldQtystr);
            var newQty = Math.ceil(oldQty * bci)
            $("[name=ECIQty" + (i + 1) + "]").val(newQty);
        }
    })

    $("#SubmintOrder").click(function () {
        var result = true;
        if ($("#DDLShipmentType").val() == "") {
            result = false;
            $("#labtxt").html("Please Select ShipmentType");
            showDiv();
            return result;
        }

        if ($("#PSID option:selected").text() == "--Please Select--") {
            result = false;
            $("#labtxt").html("Please select printshop!");
            if ($("#Language").val() == "zh") {
                $("#labtxt").html("请选择生成地!");
            }
            showDiv();
            return result;
        }

        if ($("#BilltoId option:selected").text() == "--Please Select--") {
            result = false;
            $("#labtxt").html("Please select bill account!");
            if ($("#Language").val() == "zh") {
                $("#labtxt").html("请选择开票客户!");
            }
            showDiv();
            return result;
        }

        if ($("#ShiptoId option:selected").text() == "--Please Select--") {
            result = false;
            $("#labtxt").html("Please select ship account!");
            if ($("#Language").val() == "zh") {
                $("#labtxt").html("请选择收货客户!");
            }
            showDiv();

            return result;
        }

        if ($("#ShipAddrId").val() == "") {
            result = false;
            $("#labtxt").html("Please select ship address!");
            if ($("#Language").val() == "zh") {
                $("#labtxt").html("请选择收货地址!");
            }
            showDiv();
            return result;
        }

        if ($("#ProductCustNO option:selected").text() == "--Please Select--") {
            result = false;
            $("#labtxt").html("Please select product!");
            if ($("#Language").val() == "zh") {
                $("#labtxt").html("请选择收产品!");
            }
            showDiv();

            return result;
        }

        if (result) {
            showloading();
            $.ajax({
                url: '/ECI/StickerSubmint',
                type: 'POST',
                cache: false,
                data: new FormData($('#FormUpload')[0]),
                processData: false,
                contentType: false,
            }).success(function (data) {

                setTimeout(function () {
                    var sTrHtml = "";
                    if (data.SessionStaus == "false") {
                        hideloading();
                        $("#labtxt").html(data.value + " Failure of order generation!");
                        if ($("#Language").val() == "zh") {
                            
                            $("#labtxt").html(data.value + "订单生成失败!");
                        }
                    }
                    else {
                        $("#btnUpload").attr("disabled", "disabled");

                        $("#labtxt").html(data.value + "   Success of order generation! Please go to【Confirm Order】to confirm the orders you uploaded in approximately 30 minutes. System will also mail you an order list after orders are imported, please pay attention to check.");
                        if ($("#Language").val() == "zh") {
                            $("#labtxt").html(data.value + "订单生成成功! 请30分钟后去确认订单");
                        }
                        $(".portlet-body").hide();
                        $("#panSuccess").show();
                        $("#step").removeClass("red-em").addClass("gray-em");
                        $(".Stickstep1").removeClass("gray-em").addClass("red-em");
                        $(".Stickstep1").show();
                        $("#ECIOrderNo").html(data.Maximno)
                        hideloading();
                    }
                    showDiv();
                }, 2000)



            }).fail(function (data) {
                hideloading();
            });
        }

    })
});


function FunReturnToMainPage(){
    $.ajax({
        url: "/ECI/OriginalOrderQuery?Formatid=FMT002",
        type: "get",
        dataType: "html",
        success: function (html) {
            $("#content").html(html)
        }
    })
}


