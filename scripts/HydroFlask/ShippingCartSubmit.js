$(function () {
    $("#SubmitSucceful").hide();
    $.post("/HydroFlask/ShippingCartSubmitLoad", "", function (data) {
        if (data.FunStatus == "success")
        {
            $('#PrintShop').append("<option value=''>--Please Select--</option>");
            $.each(data.ShippingCartSubmitData.PSList, function (i, item) {
                $('#PrintShop').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            });

            $('#BillTo').append("<option value=''>--Please Select--</option>");
            $.each(data.ShippingCartSubmitData.BillToList, function (i, item) {
                $('#BillTo').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            });

            $('#ShipTO').append("<option value=''>--Please Select--</option>");
            $.each(data.ShippingCartSubmitData.ShipToList, function (i, item) {
                $('#ShipTO').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            });

            //$('#Shiptoaddress').append("<option value=''>--ALL--</option>");
            //$.each(data.ShippingCartSubmitData.ShipToAddressList, function (i, item) {
            //    $('#Shiptoaddress').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            //});

            var shippingcarthtml = "";
            $.each(data.ShippingCartSubmitData.ShippingCartlist, function (i, item) {
                shippingcarthtml += "<tr>";                
                shippingcarthtml += "<td class='center'>" + (i + 1) + "</td>";
                shippingcarthtml += "<td class='center' style='text-align:right;'>" + item.DetailQty + "</td>";
                shippingcarthtml += "<td class='center'>PCS</td>";
                shippingcarthtml += "<td class='center'>" + item.Series + "</td>";
                shippingcarthtml += "<td class='center'>" + item.Style + "</td>";
                shippingcarthtml += "<td class='center'>" + item.ItemName + "</td>";
                shippingcarthtml += "<td class='center'>" + item.Color + "</td>";
                shippingcarthtml += "<td class='center'>" + item.PrdouctDesc + "</td>";
                shippingcarthtml += "<td class='center'>" + item.SKU + "</td>";
                shippingcarthtml += "<td class='center'>" + item.OZ + "</td>";
                shippingcarthtml += "<td class='center'>" + item.BarCode + "</td>";
                shippingcarthtml += "</tr>";
            });
            $("#ShippingCartOrder tbody").html(shippingcarthtml);

            $("#Currency").val(data.ShippingCartSubmitData.Currency);
        }
        else
        {
            $("#labtxt").html(data.ErrorCode);
            showDiv();
            //alert(data.ErrorCode);
        }
    });
    $("#Submit3").click(function () {
        var psid = $("#PrintShop").val();
        var billtoid = $("#BillTo").val();
        var billaddress = $("#BillToAddress").val();
        var shiptoid = $("#ShipTO").val();
        var shipaddressid = $("#Shiptoaddress").val();

        if(psid.length==0)
        {
            $("#labtxt").html("Please Select PrintShop");
            showDiv();
            //alert("Please Select PrintShop");
            return;
        }
        if (billtoid.length == 0) {
            $("#labtxt").html("Please Select Bill TO#");
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

        var SubmitData = {
            PSID: psid,
            BillTOID: billtoid,
            billToaddress:billaddress,
            ShiToID: shiptoid,
            ShipAddressID: shipaddressid
        };

        $.post("/HydroFlask/ShippingCartSubmitOrder", SubmitData, function (data) {
            if (data.FunStatus == "success")
            {
                $("#main").hide();
                //$("#SubmitSucceful").show();


                var shippingcarthtml = "";                
                shippingcarthtml += "<tr>";
                shippingcarthtml += "<td class='center'>" + data.Seq + "</td>";
                shippingcarthtml += "<td class='center'>" + data.PO + "</td>";
                shippingcarthtml += "<td class='center'>" + data.OOSOrderNO + "</td>";
                shippingcarthtml += "</tr>";               
                $("#OrderSucceful tbody").html(shippingcarthtml);

                $(".OrderNo").html(data.OOSOrderNO)

                $("#tab2").attr("class", "tab-pane");
                $("#tab3").attr("class", "tab-pane active");
                $("#ThirdStep").attr("class", "span3 active")
                $(".bar").css("width", "100%");

            }
            else
            {
                $("#labtxt").html(data.ErrorCode);
                showDiv();
                //alert(data.ErrorCode);
            }
        });

    });
    //var _data = { isContinueShopping: "yes" }
    $("#Submit4").click(function () {
       
        $.post("/HydroFlask/ShoppingCartItem", "", function (html) {
            $("#content").html(html)
        })

       // document.location.replace("/HydroFlask/ShoppingCartItem");
    });
    $("#Submit5").click(function () {
        $.post("/HydroFlask/ShoppingCartItem", "", function (html) {
            $("#content").html(html)
        })

        //document.location.replace("/HydroFlask/ShoppingCartItem");
    });
    $("#Submit6").click(function () {
        $.post("/HydroFlask/ShoppingCartItem", "", function (html) {
            $("#content").html(html)
        })

        //document.location.replace("/HydroFlask/ShoppingCartItem");
    });
    $("#BillTo").change(function () {
        var billid = $("#BillTo").val();
        if(billid.length==0)
        {
            $("#BillToAddress").val("");
        }
        else
        {
            $.post("/OrderCommon/GetBillToAddress", $("#BillTo").val(), function (data) {
                $("#BillToAddress").val(data.Address);
            });
        }
    });
    $("#ShipTO").change(function () {
        var Shipid = $("#ShipTO").val();
        if (Shipid.length == 0) {
            $("#Shiptoaddress").html("");
        }
        else {
            $("#Shiptoaddress").html("");
            $.post("/OrderCommon/GetShipToAddress", $("#ShipTO").val(), function (data) {
                $.each(data.AddressList, function (i, item) {
                    $('#Shiptoaddress').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
                });
                $("#Contact").val(data.ConTact);
                $("#Tel").val(data.Tel);
            });
        }
    });
    $("#Shiptoaddress").change(function () {        
        $.post("/OrderCommon/GetShipToAddress1", $("#Shiptoaddress").val(), function (data) {           
            $("#Contact").val(data.ConTact);
            $("#Tel").val(data.Tel);
        });
    });
});