$(function () {
    var brandid = $("#brandid").val();
    if (brandid == "VOE001") {
        $("#HideQuery").css("display", "none");
    } else {
        $("#HideQuery").css("display", "block");
    }
    $("#btnUpload").click(function () {

        var result = true;

        if (brandid != "VOE001") {
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
            if ($("#UploadFile").val() == "") {
                result = false;
                $("#labtxt").html("Please select a file!");
                if ($("#Language").val() == "zh") {
                    $("#labtxt").html("请选择文件!");
                }
                showDiv();
                return result;
            }
        }

        if (result) {
            showloading();
            $.ajax({
                url: '/Adolfo/OrderUploadInDB',
                type: 'POST',
                cache: false,
                data: new FormData($('#FormUpload')[0]),
                processData: false,
                contentType: false,
            }).success(function (data) {

                setTimeout(function () {
                    var sTrHtml = "";
                    if (data.SessionStaus == "false") {
                        $("#labtxt").html(data.value + "Upload failed!");
                        if ($("#Language").val() == "zh") {
                            $("#labtxt").html(data.value + "上传失败!");
                        }
                    }
                    else {
                        $("#btnUpload").attr("disabled", "disabled");

                        $("#labtxt").html("File  " + data.value + "   is uploaded successfully! Please go to【Confirm Order】to confirm the orders you uploaded in approximately 30 minutes. System will also mail you an order list after orders are imported, please pay attention to check.");
                        if ($("#Language").val() == "zh") {
                            $("#labtxt").html(data.value + "上传成功! 请30分钟后去确认订单");
                        }
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