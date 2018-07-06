$(function () {
    //var tPageFunc = $("#tPageFunc").val();
    //Query 查询按钮
    $("#btnQuery").click(function () {
        $("#nowpage").val(1);
        $("#pc").val(1);
        document.getElementById("nowpage").value = 1;
        GetOrder();
    });


    //分页事件
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



    //返回按钮（返回到Query界面）
    $("#btnBackToQuery").click(function () {
        $("#step1").removeClass("gray-em").addClass("red-em")
        $("#step2").css("display", "none");
        $("#OK").css("display", "none");

        $("#Query-order").slideDown();
        $("#Query-Results").css("display", "none")
        $("#Success").css("display", "none")
    });


    //导航 
    //step1         step2           OK
    //Query-order  Query-Results    Success
    $("#step1").click(function () {
        debugger;

        $("#portlet_body_form").slideDown();
        $("#step1").removeClass("gray-em").addClass("red-em")
        $("#step2").css("display", "none");
        $("#step3").css("display", "none");
        $("#OK").css("display", "none");

        $("#Query-order").slideDown();
        $("#ShowEditOrder").css("display", "none")
        $("#Query-Results").css("display", "none")
        $("#Success").css("display", "none")
    })
    $("#step2").click(function () {
        debugger;
        $("#portlet_body_form").slideDown();
        $("#step3").css("display", "none");
        $("#step1").removeClass("red-em").addClass("gray-em")
        // $("#step3").removeClass("red-em").addClass("gray-em")
        $("#step2").removeClass("gray-em").addClass("red-em")
        $("#OK").css("display", "none");

        $("#ShowEditOrder").css("display", "none")
        $("#Query-order").css("display", "none")
        $("#Query-Results").slideDown();
        $("#Success").css("display", "none")
        GetOrder();
    })



    $("#RejectSubmit").click(function () {
        debugger;
        var $value = $("#value").val();
        var $strDates = $value.split("^");
        var $OrderNo = ($strDates[0]);
        var _data = {
            MaximNO: $OrderNo,
            RejectComments: $("#RejectComments").val()
        }
        $.ajax({
            url: "/Tesco/RejectOrder",
            data: _data,
            type: 'post',
            dataType: "json",
            success: function (res) {
                if (res.Funstatus == "Success") {
                    if ($("#language").val() == "en") {
                        $("#labtxt").html("Reject! Will inform vendor.");
                        showDiv();
                    } else {
                        $("#labtxt").html("Reject! Will inform vendor.");
                        showDiv();
                    }
                    GetOrder();
                } else {
                    $("#labtxt").html("Err");
                    showDiv();
                }
            }
        })
    })


})
////主方法结束


//查询订单方法
function GetOrder() {
    var QueryData = {
        PrintShopID: $("#_Printshop").val(),
        OrderNO: $("#custorderno").val(),
        MaximNo: $("#oos_orderno").val(),
        tPageFunc: $("#tPageFunc").val(),
        Page: document.getElementById("nowpage").value,

    }
    var tPageFunc = $("#tPageFunc").val()
    showloading();
    $.ajax({
        url: "/Tesco/ConfirmOrderQuery",
        dataType: "json",
        type: "post",
        data: QueryData,
        success: function (data) {
            if (data) {
                var html = "";
                var intSeq = 0;
                var TotalPageCount = "0";
                if (data.data.length > 0) {
                    $.each(data.data, function (i, item) {
                        intSeq++;
                        html += "<tr>";
                        html += "<td class='center'>" + item.Seq + "</td>";
                        html += "<td class='center'>" + item.PrintShop + "</td>";
                        html += "<td class='center'>" + item.UploadDate + "</td>";
                        html += "<td class='center'>" + item.MaximOrderNO + "</td>";
                        if (data.Role == "Vendor Group") {
                            html += "<td class='center'>" + item.PO + "</td>";
                        }
                        html += "<td class='center'>" + item.Item + "</td>";
                        html += "<td class='center'>" + item.OrderQty + "</td>";
                        if (item.language == "en") {
                            if (item.ArtWork != "") {
                                debugger;
                                html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcViewArtWork(this);' value='" + item.MaximOrderNO + "^NoConfirm' >View</a>" + "</td>";

                                if (item.IsCheckArkWork != "") {
                                    if (tPageFunc == "BrandCheckArtWork") {
                                        html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcApprove(this);' value='" + item.MaximOrderNO + "^Approve' >Approve</a>" + "</td>";
                                        html += "<td class='center' style='vertical-align: middle;'>" + "<a href='#myModal'  data-toggle='modal'   onclick='return funcReject(this);' value='" + item.MaximOrderNO + "^Reject' >Reject</a>" + "</td>";
                                    } else if (tPageFunc == "VendorSubmitArtWork") {
                                        if (item.OrderStatus == "126") {
                                            html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\" ></a>" + "</td>";


                                            html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcCancelOrder(this);' value='" + item.MaximOrderNO + "^NoConfirm' >Cancel Order</a>" + "</td>";
                                            html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcEditOrder(this);' value='" + item.MaximOrderNO + "^NoConfirm'  >Edit</a>" + "</td>";//------------------------------------------------
                                        } else {
                                            html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcSubmitOrder(this);' value='" + item.MaximOrderNO + "^NoConfirm' >Submit Order</a>" + "</td>";

                                            html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcCancelOrder(this);' value='" + item.MaximOrderNO + "^NoConfirm' >Cancel Order</a>" + "</td>";
                                        }

                                    } else if (tPageFunc == "bjbheat_transferconfirm") {
                                        html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcSubmitOrder(this);' value='" + item.MaximOrderNO + "^NoConfirm' >Submit Order</a>" + "</td>";

                                        html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcCancelOrder(this);' value='" + item.MaximOrderNO + "^NoConfirm' >Cancel Order</a>" + "</td>";
                                    }
                                    else {
                                        html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcSubmitOrder(this);' value='" + item.MaximOrderNO + "^NoConfirm' >Submit Order</a>" + "</td>";
                                    }
                                }
                                else {
                                    if (tPageFunc == "BrandCheckArtWork") {
                                        html += "<td class='center' style='vertical-align: middle;'>Approve</td>";
                                        html += "<td class='center' style='vertical-align: middle;'>Reject</td>";
                                    } else if (tPageFunc == "VendorSubmitArtWork") {
                                        if (item.OrderStatus == "126") {
                                            html += "<td class='center' style='vertical-align: middle;'></td>";

                                            html += "<td class='center' style='vertical-align: middle;'>Cancel Order</td>";
                                            html += "<td class='center' style='vertical-align: middle;'>Edit</td>";
                                        } else {
                                            html += "<td class='center' style='vertical-align: middle;'>Submit Order</td>";

                                            html += "<td class='center' style='vertical-align: middle;'>Cancel Order</td>";
                                        }

                                    } else if (tPageFunc == "bjbheat_transferconfirm") {
                                        html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcSubmitOrder(this);' value='" + item.MaximOrderNO + "^NoConfirm' >Submit Order</a>" + "</td>";

                                        html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcCancelOrder(this);' value='" + item.MaximOrderNO + "^NoConfirm' >Cancel Order</a>" + "</td>";
                                    }
                                    else {
                                        html += "<td class='center' style='vertical-align: middle;'>Submit Order</td>";
                                    }
                                    //html += "<td class='center' style='vertical-align: middle;'>Submit Order</td>";
                                }


                            }
                            else {
                                html += "<td class='center' style='vertical-align: middle;'>Pending</td>";
                                if (tPageFunc == "BrandCheckArtWork") {
                                    html += "<td class='center' style='vertical-align: middle;'>Approve</td>";
                                    html += "<td class='center' style='vertical-align: middle;'>Reject</td>";
                                } else if (tPageFunc == "VendorSubmitArtWork") {
                                    if (item.OrderStatus == "126") {
                                        html += "<td class='center' style='vertical-align: middle;'></td>";

                                        html += "<td class='center' style='vertical-align: middle;'>Cancel Order</td>";
                                        html += "<td class='center' style='vertical-align: middle;'>Edit</td>";
                                    } else {
                                        html += "<td class='center' style='vertical-align: middle;'>Submit Order</td>";

                                        html += "<td class='center' style='vertical-align: middle;'>Cancel Order</td>";
                                    }

                                } else if (tPageFunc == "bjbheat_transferconfirm") {
                                    html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcSubmitOrder(this);' value='" + item.MaximOrderNO + "^NoConfirm' >Submit Order</a>" + "</td>";

                                    html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcCancelOrder(this);' value='" + item.MaximOrderNO + "^NoConfirm' >Cancel Order</a>" + "</td>";
                                }
                                else {
                                    html += "<td class='center' style='vertical-align: middle;'>Submit Order</td>";
                                }

                            }
                        }
                        else {
                            if (item.ArtWork != "") {
                                html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcViewArtWork(this);' value='" + item.MaximOrderNO + "^NoConfirm' >查看画稿</a>" + "</td>";

                                if (item.IsCheckArkWork != "") {
                                    if (tPageFunc == "BrandCheckArtWork") {
                                        html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcApprove(this);' value='" + item.MaximOrderNO + "^Approve' >Approve</a>" + "</td>";
                                        html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcReject(this);' value='" + item.MaximOrderNO + "^Reject' >Reject</a>" + "</td>";
                                    } else if (tPageFunc == "VendorSubmitArtWork") {
                                        if (item.OrderStatus == "126") {
                                            html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"></a>" + "</td>";

                                            //------------------------------------------

                                            html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcCancelOrder(this);' value='" + item.MaximOrderNO + "^NoConfirm' >Cancel Order</a>" + "</td>";
                                            html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcEditOrder(this);' value='" + item.MaximOrderNO + "^NoConfirm' >Edit</a>" + "</td>";
                                        } else {
                                            html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcSubmitOrder(this);' value='" + item.MaximOrderNO + "^NoConfirm' >Submit Order</a>" + "</td>";

                                            html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcCancelOrder(this);' value='" + item.MaximOrderNO + "^NoConfirm' >Cancel Order</a>" + "</td>";
                                        }

                                    } else if (tPageFunc == "bjbheat_transferconfirm") {
                                        html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcSubmitOrder(this);' value='" + item.MaximOrderNO + "^NoConfirm' >Submit Order</a>" + "</td>";

                                        html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcCancelOrder(this);' value='" + item.MaximOrderNO + "^NoConfirm' >Cancel Order</a>" + "</td>";
                                    }
                                    else {
                                        html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcSubmitOrder(this);' value='" + item.MaximOrderNO + "^NoConfirm' >Submit Order</a>" + "</td>";
                                    }
                                }
                                else {
                                    if (tPageFunc == "BrandCheckArtWork") {
                                        html += "<td class='center' style='vertical-align: middle;'>Approve</td>";
                                        html += "<td class='center' style='vertical-align: middle;'>Reject</td>";
                                    } else if (tPageFunc == "VendorSubmitArtWork") {
                                        if (item.OrderStatus == "126") {
                                            html += "<td class='center' style='vertical-align: middle;'></td>";

                                            html += "<td class='center' style='vertical-align: middle;'>Cancel Order</td>";
                                            html += "<td class='center' style='vertical-align: middle;'>Edit</td>";
                                        } else {
                                            html += "<td class='center' style='vertical-align: middle;'>Submit Order</td>";

                                            html += "<td class='center' style='vertical-align: middle;'>Cancel Order</td>";
                                        }

                                    } else if (tPageFunc == "bjbheat_transferconfirm") {
                                        html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcSubmitOrder(this);' value='" + item.MaximOrderNO + "^NoConfirm' >Submit Order</a>" + "</td>";

                                        html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcCancelOrder(this);' value='" + item.MaximOrderNO + "^NoConfirm' >Cancel Order</a>" + "</td>";
                                    }
                                    else {
                                        html += "<td class='center' style='vertical-align: middle;'>Submit Order</td>";
                                    }
                                    //html += "<td class='center' style='vertical-align: middle;'>Submit Order</td>";
                                }
                            } else {
                                html += "<td class='center' style='vertical-align: middle;'>画稿待处理</td>";

                                if (tPageFunc == "BrandCheckArtWork") {
                                    html += "<td class='center' style='vertical-align: middle;'>Approve</td>";
                                    html += "<td class='center' style='vertical-align: middle;'>Reject</td>";
                                } else if (tPageFunc == "VendorSubmitArtWork") {
                                    if (item.OrderStatus == "126") {
                                        html += "<td class='center' style='vertical-align: middle;'></td>";
                                        html += "<td class='center' style='vertical-align: middle;'>Cancel Order</td>";
                                        html += "<td class='center' style='vertical-align: middle;'>Edit</td>";
                                    } else {
                                        html += "<td class='center' style='vertical-align: middle;'>Submit Order</td>";

                                        html += "<td class='center' style='vertical-align: middle;'>Cancel Order</td>";
                                    }

                                } else if (tPageFunc == "bjbheat_transferconfirm") {
                                    html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcSubmitOrder(this);' value='" + item.MaximOrderNO + "^NoConfirm' >Submit Order</a>" + "</td>";

                                    html += "<td class='center' style='vertical-align: middle;'>" + "<a href=\"#\"  onclick='return funcCancelOrder(this);' value='" + item.MaximOrderNO + "^NoConfirm' >Cancel Order</a>" + "</td>";
                                }
                                else {
                                    html += "<td class='center' style='vertical-align: middle;'>Submit Order</td>";
                                }
                            }
                        }
                    });
                    TotalPageCount = data.data[0].TotalPageCount;
                } else {
                    $("#TotalPageCount").html("0");
                }
                hideloading();
                $(".OrderDetail").html(html);
                $("#step1").removeClass("red-em").addClass("gray-em")
                $("#step2").removeAttr("style");
                $("#step2").removeClass("gray-em").addClass("red-em")
                $("#OK").css("display", "none");

                $("#Query-order").css("display", "none")
                $("#Query-Results").slideDown();
                $("#Success").css("display", "none")

                $("#TotalPageCount").html(TotalPageCount);
                $("#PageTotalCount").val(TotalPageCount);

            }
        }

    });
}
function funcCancelOrder(obj) {

    $("#labtxt").html("Are you sure to Cancel Order?");
    if ($("#Language").val() == "zh") {
        $("#labtxt").html("Are you sure to Cancel Order?");
    }
    showDiv2();

    $("#ok").bind("click", function () {
        $("#ok").unbind('click');

        var $value = obj.attributes["value"].value;
        var $strDates = $value.split("^");
        var $OrderNo = ($strDates[0]);
        var _data = {
            MaximNO: $OrderNo
        }
        $.ajax({
            url: "/Tesco/CancelOrder",
            data: _data,
            type: 'post',
            dataType: "json",
            success: function (res) {
                if (res.FunStatus == "success") {
                    if ($("#language").val() == "en") {
                        $("#labtxt").html("Success！");
                        showDiv();
                    } else {
                        $("#labtxt").html("Success！");
                        showDiv();
                    }
                    GetOrder();
                } else {
                    $("#labtxt").html("Err");
                    showDiv();
                }
            }
        })

    })

    $("#no").bind("click", function () {
        closeDiv();
        return;
    })



}
function funcApprove(obj) {

    $("#labtxt").html("Are you sure to Approve?");
    if ($("#Language").val() == "zh") {
        $("#labtxt").html("Are you sure to Approve?");
    }
    showDiv2();

    $("#ok").bind("click", function () {
        $("#ok").unbind('click');

        var $value = obj.attributes["value"].value;
        var $strDates = $value.split("^");
        var $OrderNo = ($strDates[0]);
        var _data = {
            MaximNO: $OrderNo
        }
        $.ajax({
            url: "/Tesco/ApproveOrder",
            data: _data,
            type: 'post',
            dataType: "json",
            success: function (res) {
                if (res.Funstatus == "Success") {
                    if ($("#language").val() == "en") {
                        $("#labtxt").html("Approve! Will inform vendor.");
                        showDiv();
                    } else {
                        $("#labtxt").html("Approve! Will inform vendor.");
                        showDiv();
                    }
                    GetOrder();
                } else {
                    $("#labtxt").html("Err");
                    showDiv();
                }
            }
        })

    })

    $("#no").bind("click", function () {
        closeDiv();
        return;
    })


}

function funcEditOrder(obj) {

    var $value = obj.attributes["value"].value;
    var $strDates = $value.split("^");
    var $OrderNo = ($strDates[0]);
    var _data = {
        MaximNO: $OrderNo
    }
    showloading();
    $.ajax({
        url: "/BJB/EditCancelOrder",
        data: _data,
        type: 'Get',
        dataType: "html",
        contentType: "application/html; charset=utf-8",
        success: function (res) {
            setTimeout(function () {
                 hideloading();
                $("#ShowEditOrder").html(res);
                //$("#ShowEditOrder").css("display", "block");
                $("#ShowEditOrder").slideDown();
                $("#MaximNoEdit").val($OrderNo);
                $("#portlet_body_form").css("display", "none");
                $("#step1").removeClass("red-em").addClass("gray-em");
                $("#step2").removeClass("red-em").addClass("gray-em")
                $("#step3").removeAttr("style");
                $("#step3").removeClass("gray-em").addClass("red-em");
            }, 500);
        }
    })
  
}


function funcReject(obj) {
    $("#value").val(obj.attributes["value"].value);
    $('#RejectComments').val('')
}

//View 按钮 查看画稿
function funcViewArtWork(obj) {
    var $value = obj.attributes["value"].value;
    var $strDates = $value.split("^");
    var $OrderNo = ($strDates[0]);
    data_ = {
        MaximNO: $OrderNo,
    }
    var win = window.open("", "_blank");//打开一个新的页面
    $.post("/Tesco/ViewArtWork", data_, function (data) {
        if (data.look) {

            function loc() {
                win.location = data.ArtPath;
            }
            setTimeout(loc(), 800)
            GetOrder();
        }
        else {
            alert("Error");

        }


    });
}

//SubmitOrder 提交订单
function funcSubmitOrder(obj) {
    //$("#step2").removeClass("red-em").addClass("gray-em");
    //$("#step_SubmitOrder").css("display","block")
    //$("#step_SubmitOrder").removeClass("gray-em").addClass("red-em");
    //$("#Query-Results").css("display","none")
    //$("#Results-SubmitOrder").slideDown();
    if (!window.confirm("Are you sure to Submit?")) {
        return;
    }
    var $id = obj.attributes["value"].value;
    var $strData = $id.split('^');
    var $OrderNO = ($strData[0])
    showloading();
    $.ajax({
        url: "/Tesco/ConfirmOrder_SubmintOrder",
        dataType: "json",
        type: "post",
        data: {
            MaximOrderNO: $OrderNO
        },
        success: function (data) {
            $("#lblOrderNO").html(data.MaximNO);
            $("#lblPO").html(data.PO);
            $("#lblTel").html(data.Tel);
            $("#step2").removeClass("red-em").addClass("gray-em");
            $("#OK").removeClass("gray-em").addClass("red-em");
            $("#OK").removeAttr("style");
            $("#Success").slideDown();
            $("#Query-Results").css("display", "none")
            hideloading();
        }
    })
}

//确定订单提交
function CloseOrder() {
    $("#Success").css("display", "none");
    $("#step2").removeClass("gray-em").addClass("red-em")
    $("#OK").css("display", "none");
    $("#OrderNO").val("");
    GetOrder();
}



