﻿$(function () {
    $.post("/Basicxx/ShippingCartSubmitLoad", $("#sprintshop").val(), function (data) {
        if (data.FunStatus == "success") {
            console.log(data.ShippingCartSubmitData)
            $('#PrintShop').append("<option value=''>--Please Select--</option>");
            $.each(data.ShippingCartSubmitData.PSlist, function (i, item) {
                $('#PrintShop').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            });
            //ShoppingCart选择PS传入ShippingCartSubmit
            $("#PrintShop").val($("#sprintshop").val());


            $('#BilltoId').append("<option value=''>--Please Select--</option>");
            $.each(data.ShippingCartSubmitData.BilltoList, function (i, item) {
                $('#BilltoId').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            });
            //$("#BillToAddress").val(data.ShippingCartSubmitData.BilltoAddress)
            //$("#BillingAddrContact").val(data.ShippingCartSubmitData.BilltoAddrContact);
            //$("#BillingAddrTel").val(data.ShippingCartSubmitData.BilltoAddrTel);




            $('#ShiptoId').append("<option value=''>--Please Select--</option>");
            $.each(data.ShippingCartSubmitData.ShiptoList, function (i, item) {
                $('#ShiptoId').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            });
            //$('#ShipAddress').append("<option value=''>--Please Select--</option>");
            //$.each(data.ShippingCartSubmitData.ShipAddrList, function (i, item) {
            //    $('#ShipAddress').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            //});
            //$("#ShipAddrContact").val(data.ShippingCartSubmitData.ShipAddrContact);
            //$("#ShipAddrTel").val(data.ShippingCartSubmitData.ShipAddrTel);
            //$("#ShipAddrCountry").val(data.ShippingCartSubmitData.Country);

            $("#ShipmentType_").val(data.ShippingCartSubmitData._ShipmentType);
            $("#txtPO_").val(data.ShippingCartSubmitData.AddComments);

            console.log(data.ShippingCartSubmitData.ShippingCartSubmitlist);
            var shippingcarthtml = "";
            $.each(data.ShippingCartSubmitData.ShippingCartSubmitlist, function (i, item) {
                shippingcarthtml += "<tr>";
                shippingcarthtml += "<td class='romver' onclick='RemoverShoppingCartItem2(this)' style='cursor:pointer;'><a>Remove</a><input style='display:none' id='productid' name='productid' type='text' value='" + item.ProductID + "' /></td>";
                shippingcarthtml += "<td class='center' >" + item.OrderQty + "</td>";
                shippingcarthtml += '<td style="display:none" id="shoppingcartid">' + item.ID + "</td>";
                shippingcarthtml += '<td style="display:none" id="shopingcartproductid">' + i + "</td>";
                shippingcarthtml += "<td class=\"center\" id=\"PrintImg\" imgstr=\"" +item.producturl + "\" onmouseover=\"showimg(this);\" onmouseout=\"hideimg();\"><img src=\"" +item.Smallurl + "\"></td>";
                shippingcarthtml += "<td class='center'>" + item.prodalias + "</td>";
                shippingcarthtml += "<td class='center'>" + item.Currency + "</td>";
                shippingcarthtml += "<td class='center'>" + item.UnitPrice + "</td>";
                shippingcarthtml += "<td class='center'>" + item.UOM + "</td>";
                shippingcarthtml += "<td class='center'>" + item.MOQ + "</td>";
                shippingcarthtml += "</tr>";
            });

            $("#ShippingCartOrder2 tbody").html(shippingcarthtml);
           
        }
    })

    $("select[name='ShiptoId']").change(function () {
        var data = {
            NewBillto: $("select[name='ShiptoId']").val()

        };

        if ($("select[name='ShiptoId'] option:selected").text() == "--Please Select--") {
            $("#ShipAddrId").empty();
            $("#ShipAddress").empty();
            $("#ShipAddrContact").val("");
            $("#ShipAddrTel").val("");
            $("#ShipAddrCountry").val("");
        } else {

            var urlPost = "/OrderCommon/GetShipAddressInforlistbyShipToId?ShipToId=" + $("select[name='ShiptoId']").val();
            $.post(urlPost, data, function (data, status) {
                $("select[name='ShipAddrId']").empty();
                $.each(data, function (i, item) {
                    $("#ShipAddress").append("<option value='" + item.oos_shippingaddressId + "'>" + item.oos_address + "</option>");
                });
                var _seq = 0;
                $.each(data, function (i, item) {
                    if (_seq == 0) {
                        //$("#ShipAddress").html(item.oos_address);
                        $("#ShipAddrContact").val(item.oos_contactname);
                        $("#ShipAddrTel").val(item.oos_contacttel);
                        $("#ShipAddrCountry").val(item.oos_country);
                        _seq++;
                    }
                });
            });
        }


    })
    $("select[name='BilltoId']").change(function () {
        var data = {
            NewBillto: $("select[name='BilltoId']").val()
        };

        if ($("select[name='BilltoId'] option:selected").text() == "--Please Select--") {
            $("#BillToAddress").val("");
            $("#BillingAddrContact").val("");
            $("#BillingAddrTel").val("");
        }
        else {
            var urlPost = "/OrderCommon/GetAccountInfobyAccountId?billtoId=" + $("select[name='BilltoId']").val();
            $.post(urlPost, data, function (data, status) {
                $("#BillToAddress").val(data.Address1_Line1);
                $("#BillingAddrContact").val(data.OOS_ContactName);
                $("#BillingAddrTel").val(data.Telephone1);
            });
        }
    });

    $("select[name='ShipAddrId']").change(function () {
        var data = {
            _shipaddressId: $(this).val()
        };
        var urlPost = "/OrderCommon/GetShipAddressInfobyShipAddressId?ShippAddrId=" + $(this).val();
        $.post(urlPost, data, function (data, status) {
            //$("textarea[name='ShipAddress']").val(data.oos_address);
            $("#ShipAddrContact").val(data.oos_contactname);
            $("#ShipAddrTel").val(data.oos_contacttel);
            $("#ShipAddrCountry").val(data.oos_country);
        });
    });


    $("#Submit3").click(function () {
        var psid = $("#PrintShop").val();
        var billtoid = $("#BilltoId").val();
        var billaddress = $("#BillToAddress").val();
        var shiptoid = $("#ShiptoId").val();
        var shipaddressid = $("#ShipAddress").val();
        var txtPO_ = $("#txtPO_").val();
        var ShipmentType_ = $("#ShipmentType_").val();

        if (psid.length == 0) {
            $("#labtxt").html("Please Select PrintShop");
            showDiv();
            //alert("Please Select PrintShop");
            return;
        }
        if (billtoid.length == 0) {
            $("#labtxt").html("Please Select Bill TO");
            showDiv();
            //alert("Please Select Bill TO#");
            return;
        }
        if (shiptoid.length == 0) {
            $("#labtxt").html("Please Select Shipping TO");
            showDiv();
            //alert("Please Select Shipping TO");
            return;
        }
        if (shipaddressid == null) {
            $("#labtxt").html("Please Select Shipping Address");
            showDiv();
            //alert("Please Select Shipping Address");
            return;
        }

        $("#labtxt").html("Are you sure to Submit?");
        showDiv2();
        $("#ok").bind("click", function () { 

            var SubmitData = {
                PSID: psid,
                Printshop: $("#PrintShop").find("option:selected").text(),
                BillToID: billtoid,
                billToaddress: billaddress,
                ShiToID: shiptoid,
                ShipAddressID: shipaddressid,
                txtPO: txtPO_,
                ShipmentType:ShipmentType_
            };


            $.post("/Basicxx/ShippingCartSubmitOrder", SubmitData, function (data) {
                if (data.FunStatus == "success") {


                    //$("#SubmitSucceful").show();
                    $(".OrderNo").html(data.OOSOrderNO)

                    $("#tab2").attr("class", "tab-pane");
                    $("#tab3").attr("class", "tab-pane active");
                    $("#ThirdStep").attr("class", "span3 active")
                    $(".bar").css("width", "100%");
                    if (data.la == "en-US") {
                        $("#pan_en").css("display", "block");
                        $("#pan_zh").css("display", "none");
                    
                    } else {
                        $("#pan_zh").css("display", "block");
                        $("#pan_en").css("display", "none");
                    }
                    closeDiv();
                }
                else {
                    $("#labtxt").html(data.ErrorCode);
                    showDiv();
                    //alert(data.ErrorCode);
                }
            });
        })
    })

    //返回
    $("#Submit4").click(function () {

        $.post("/Basicxx/ShoppingCartItem", "", function (html) {
            $("#content").html(html)
        })
       
    });
    //取消订单
    $("#Submit5").click(function () {

        $("#labtxt").html("Are you sure to cancel?");
        showDiv2();
        $("#ok").bind("click", function () {
            $.post("/Basicxx/Cancel", $("#sprintshop").val(), function (data) {
                if (data.status == "is EmptytheShoppingCart") {
                    $("#ShippingCartOrder tbody").html("");
                    $("#ShippingCartOrder2 tbody").html("");

                    $("#tab1").attr("class", "tab-pane active");
                    $("#tab2").attr("class", "tab-pane ");
                    $("#FirstStep").attr("class", "span3 active");
                    $("#SecondStep").attr("class", "span3");
                    $(".bar").css("width", "33%");

                    closeDiv();
                }
            })
        });
    })

    //提交订单成功，继续购物
    $("#Submit6").click(function () {

        $.post("/Basicxx/ShoppingCartItem", "", function (html) {
            $("#content").html(html)
        })

    });


    
})

function RemoverShoppingCartItem2(data) {
    var shoppingcartid = $(data).parents("tr").find("#shoppingcartid").html();
    var shopingcartproductid = $(data).parents("tr").find("#shopingcartproductid").html();

    $("#labtxt").html("Are you sure to Remove?");
    showDiv2();
    $("#ok").bind("click", function () { 
        var data_ = {
            shoppingcartid: shoppingcartid,
            shopingcartproductid: shopingcartproductid
        }
        var urlPost = "/Basicxx/RemoverShoppingCartItem";

        $.post(urlPost, data_, function (data, status) {
            var shippingcarthtml = "";
       
            if (data.ShippingCartList != null) {
                $.each(data.ShippingCartList, function (i, item) {
                    shippingcarthtml += "<tr>";
                    shippingcarthtml += "<td class='romver2' onclick='RemoverShoppingCartItem2(this)' style='cursor:pointer;'><a>Remove</a><input style='display:none' id='productid' name='productid' type='text' value='" + item.ProductID + "' /></td>";
                    shippingcarthtml += "<td class='center' >" + item.OrderQty + "</td>";
                    shippingcarthtml += '<td style="display:none" id="shoppingcartid">' + item.ID + "</td>";
                    shippingcarthtml += '<td style="display:none" id="shopingcartproductid">' + i + "</td>";
                    shippingcarthtml += "<td class=\"center\" id=\"PrintImg\" imgstr=\"" +item.producturl + "\" onmouseover=\"showimg(this);\" onmouseout=\"hideimg();\"><img src=\"" +item.Smallurl + "\"></td>";
                    shippingcarthtml += "<td class='center'>" + item.prodalias + "</td>";
                    shippingcarthtml += "<td class='center'>" + item.Currency + "</td>";
                    shippingcarthtml += "<td class='center'>" + item.UnitPrice + "</td>";
                    shippingcarthtml += "<td class='center'>" + item.UOM + "</td>";
                    shippingcarthtml += "<td class='center'>" + item.MOQ + "</td>";

                    shippingcarthtml += "</tr>";
                });
            }
            $("#ShippingCartOrder2 tbody").html(shippingcarthtml);
            if ($(".romver2").length < 1) {
           
                $("#Submit3").attr("disabled", "disabled");
                $("#Submit5").attr("disabled", "disabled");
            }
            closeDiv();
        });
    })
}