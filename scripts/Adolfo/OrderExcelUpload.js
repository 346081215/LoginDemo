$(function () {
    $("#btnUpload").click(function () {
        var result = true;
        if ($("#UploadFile").val() == "") {
            result = false;
            $("#labtxt").html("Please select a file!");
            if ($("#Language").val() == "zh") {
                $("#labtxt").html("请选择文件!");
            }
            showDiv();
            return result;
        }
        if (result) {
            showloading();
            $.ajax({
                url: '/Adolfo/OrderExcelUploadInDB',
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
                        //$("#btnUpload").attr("disabled", "disabled");
                        $("#UploadFile").val("");
                        $("#photoCover").val("");

                        $("#labtxt").html("File  " + data.value + "   is uploaded successfully! Please go to【Confirm Order】to confirm the orders you uploaded in approximately 30 minutes. System will also mail you an order list after orders are imported, please pay attention to check.");
                        if ($("#Language").val() == "zh") {
                            $("#labtxt").html(data.value + "上传成功! 请30分钟后去确认订单");
                        }
                        hideloading();
                    }
                    showDiv();
                }, 2000)

            }).fail(function (data) {
                //hideloading();
                $("#labtxt").html(data.value + "Upload failed!");
                if ($("#Language").val() == "zh") {
                    $("#labtxt").html(data.value + "上传失败!");
                }
            });
        }
    });
});