var OrderTable = document.getElementById("OrdTable");
var orderHeader = OrderTable.children[0];
var orderDetail = OrderTable.children[1];
$(function () {

    $("#DDLShipmentType").change(function () {
        if (this.selectedIndex == 2) {
            $("#ExpressCompany").prop("disabled", "")
        } else {
            $("#ExpressCompany").val("")
            $("#ExpressCompany").prop("disabled", "disabled")
        }
    })
    $("#BilltoId").change(function () {
        var data = {
            NewBillto: $("select[name='BilltoId']").val()
        };

        if ($("#BilltoId option:selected").text() == "--Please Select--") {
            $("#iBilltoAddress").val("");
            $("#iCurrency").val("")
            $("#iBilltoAddrContact").val("");
            $("#iBilltoAddrTel").val("");
        }
        else {
            var urlPost = "/OrderCommon/GetBilltoAccountInfobyAccountId?billtoId=" + $("select[name='BilltoId']").val();
            $.post(urlPost, data, function (data, status) {
                $("#iBilltoAddress").val(data.ContactAddress);
                $("#iCurrency").val(data.CurrencyId)
                $("#iBilltoAddrContact").val(data.ContactPerson);
                $("#iBilltoAddrTel").val(data.ContactTelephone);
            });
        }
    });
    $("#ShiptoId").change(function () {
        var data = {
            NewBillto: $("#ShiptoId").val()

        };
        $("#ShipAddrId").empty();
        $("#ShipAddress").empty();
        $("#ShipAddrId").hide();
        $("#ShipAddrId").show();
        $("#iShipAddrContact").val("");
        $("#iShipAddrTel").val("");
        $("#iShipAddrCountry").val("");
        var urlPost = "/OrderCommon/GetShipAddressInforlistbyShipToId?ShipToId=" + $("select[name='ShiptoId']").val();
        $.post(urlPost, data, function (data, status) {
            $("#ShipAddrId").empty();
            $.each(data, function (i, item) {
                $("#ShipAddrId").append("<option value='" + item.ShipToAddressId + "'>" + item.oos_address + "</option>");
            });
            var _seq = 0;
            $.each(data, function (i, item) {
                if (_seq == 0) {
                    $("#ShipAddrId").val(item.ShipToAddressId);
                    $("#iShipAddrContact").val(item.oos_contactname);
                    $("#iShipAddrTel").val(item.oos_contacttel);
                    $("#iShipAddrCountry").val(item.oos_country);
                    _seq++;
                }
            });
        });
    })
    $("#ShipAddrId").change(function () {
        if ($("#ShipAddrId").val() == "" || $("#ShipAddrId").val() == null) {
            $("#iShipAddrContact").val("");
            $("#iShipAddrTel").val("");
            $("#iShipAddrCountry").val("");
        } else {
            var data = {
                _shipaddressId: $(this).val()
            };
            var urlPost = "/OrderCommon/GetShipAddressInfobyShipAddressId?ShippAddrId=" + $(this).val();
            $.post(urlPost, data, function (data, status) {
                //$("textarea[name='ShipAddress']").val(data.oos_address);
                $("#iShipAddrContact").val(data.oos_contactname);
                $("#iShipAddrTel").val(data.oos_contacttel);
                $("#iShipAddrCountry").val(data.oos_country);
            });
        }
    });



    $("#productid").change(function () {
        debugger;
        /// var jqHeader3 = orderHeader.children[0].children[3];
        // var jqorderDetail3 = orderDetail.children[0].children[3];
        debugger;
        if ($("#productid").val() == "P027") {


            orderHeader.children[0].children[4].style.display = 'none';
            orderHeader.children[1].children[4].style.display = 'none';
            //orderDetail.children[0].children[4].style.display = 'none';
        } else if ($("#productid").val() == "P1224") {
            orderHeader.children[0].children[4].style.display = 'block';
            orderHeader.children[1].children[4].style.display = 'block';
            //orderDetail.children[0].children[4].style.display = 'block';


        }
       // orderDetail.children[0].children[0].children[1].value = 1;

    });


})

function funcSaveOriOrder() {
    var SubmitDetail = {
        PrintShop: $("#PSID").val(),
        BillingToID: $("#BilltoId").val(),
        BillToName: $("#BilltoId option:selected").text(),
        BillingAddress: $("#iBilltoAddress").val(),
        BillingContact: $("#iBilltoAddrContact").val(),
        BillingTel: $("#iBilltoAddrTel").val(),

        Currency: $("#iCurrency").val(),
        ShipToID: $("#ShiptoId").val(),
        ShipToName: $("#ShiptoId option:selected").text(),
        ShipToAddressId: $("#ShipAddrId").val(),
        ShippingAddress: $("#ShipAddrId option:selected").text(),
        ShippingContact: $("#iShipAddrContact").val(),
        ShippingTel: $("#iShipAddrTel").val(),
        Country: $("#iShipAddrCountry").val(),

        ShipmentType: $("#DDLShipmentType").val(),
        FreightCompany: $("#ExpressCompany").val(),

        Item: $("#productid option:selected").text(),
        ProductCode: $("#productid").val(),
        //MadeIn: $("#madein").val(),
        Comments: $("#Comments").val(),

        OrderStr: "",

        Preview: "NoPreview"
    }
    if (!checkdata()) {
        return;
    }
    //得到订单字符串数据
    var OrderDetail = document.getElementById("OrderDetailCareLabel");
    var orderString = "";
    var istrue = false;
    if ($("#productid").val() == "P027") {
        debugger;
        //OrderDetail.rows[i].cells[4].children[0].value == "" ||
        for (var i = 0; i < OrderDetail.rows.length; i++) {
            if (OrderDetail.rows[i].cells[1].children[0].value == "" || OrderDetail.rows[i].cells[2].children[0].value == "" || OrderDetail.rows[i].cells[3].children[0].value == "" || OrderDetail.rows[i].cells[4].children[0].value == "" ||
                OrderDetail.rows[i].cells[5].children[0].value == "") {
                $("#labtxt").html("Please Check Order Data.");
                showDiv();
                istrue = true;
                return;
            }
            orderString += OrderDetail.rows[i].cells[1].children[0].value + "^" + OrderDetail.rows[i].cells[2].children[0].value + "^" + OrderDetail.rows[i].cells[3].children[0].value + "^" + OrderDetail.rows[i].cells[4].children[0].value + "^" + OrderDetail.rows[i].cells[5].children[0].value + "ˇ"



            if (OrderDetail.rows[i].cells[1].children[0].value.length + OrderDetail.rows[i].cells[2].children[0].value.length + OrderDetail.rows[i].cells[3].children[0].value.length > 20) {
                $("#labtxt").html("The Colour field is incorrect, please contact with Maxim local customer service.</br>The Style Number field is incorrect, please contact with Maxim local customer service. ");
                showDiv();
                istrue = true;
                return;
            }
            //if (OrderDetail.rows[i].cells[4].children[0].value.length > 12) {
            //    $("#labtxt").html("The Style Name field is incorrect, please contact with Maxim local customer service. ");
            //    showDiv();
            //    istrue = true;
            //    return;
            //}
            if (OrderDetail.rows[i].cells[4].children[0].value.length != 12) {
                $("#labtxt").html("EAN Code  Field Don't Exceed 12 Character.");
                showDiv();
                istrue = true;
                return;
            }

        };
        if (istrue == true) {
            return;

        }

    } else if ($("#productid").val() == "P1224") {
        debugger;
        for (var i = 0; i < OrderDetail.rows.length; i++) {
            if (OrderDetail.rows[i].cells[1].children[0].value == "" || OrderDetail.rows[i].cells[2].children[0].value == "" || OrderDetail.rows[i].cells[3].children[0].value == "" || OrderDetail.rows[i].cells[4].children[0].value == "" ||
                OrderDetail.rows[i].cells[5].children[0].value == "" || OrderDetail.rows[i].cells[6].children[0].value == "") {
                $("#labtxt").html("Please Check Order Data.");
                showDiv();
                istrue = true;
                return;
            }
            orderString += OrderDetail.rows[i].cells[1].children[0].value + "^" + OrderDetail.rows[i].cells[2].children[0].value + "^" + OrderDetail.rows[i].cells[3].children[0].value + "^" + OrderDetail.rows[i].cells[4].children[0].value + "^" + OrderDetail.rows[i].cells[5].children[0].value + "^" + OrderDetail.rows[i].cells[6].children[0].value + "ˇ"

            if (OrderDetail.rows[i].cells[2].children[0].value.length > 12) {
                $("#labtxt").html("The Colour field is incorrect, please contact with Maxim local customer service.");
                showDiv();
                istrue = true;
                return;
            }
            if (OrderDetail.rows[i].cells[3].children[0].value.length > 12) {
                $("#labtxt").html("The Style Number field is incorrect, please contact with Maxim local customer service.");
                showDiv();
                istrue = true;
                return;
            }
            if (OrderDetail.rows[i].cells[4].children[0].value.length > 12) {
                $("#labtxt").html("The Style Name field is incorrect, please contact with Maxim local customer service. ");
                showDiv();
                istrue = true;
                return;
            }
            if (OrderDetail.rows[i].cells[5].children[0].value.length != 12) {
                //$("#labtxt").html("The Style Name field is incorrect, please contact with Maxim local customer service. ");
                $("#labtxt").html("EAN Code  Field Don't Exceed 12 Character.");
                showDiv();
                istrue = true;
                return;
            }
        };
        if (istrue == true) {
            return;

        }
    }

    if (orderString.length > 0) {
        SubmitDetail.OrderStr = orderString.substring(0, orderString.length - 1)
    } else {
        $("#labtxt").html("Please Check Order Data.");
        showDiv();
        return;
    }

    $.ajax({
        url: "/BJB/BJBBarcodeSubmit",
        data: SubmitDetail,
        dataType: 'json',
        type: "post",
        success: function (res) {
            if (res.FunStatus == "Success") {
                hideloading();
                $("#CareLabel-step2").hide();
                $("#OrderNo").html(res.Data);
                $("#SuccessSubmitOrderView").show();
                $("#SuccessSubmitOrderView").slideDown();
            } else {
                hideloading();
                $("#labtxt").html(res.Data);
                showDiv();
                return;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // 状态码
            console.log(XMLHttpRequest.status);
            // 状态
            console.log(XMLHttpRequest.readyState);
            // 错误信息   
            console.log(textStatus);
        }
    })

}

//添加和移除订单数据行
function AddOrderLine1(obj) {
    var index = parseInt(obj.parentElement.parentElement.children[0].children[1].value);
    var indexCount = parseInt(obj.parentElement.parentElement.children[0].children[0].innerHTML);
    debugger;
    if (obj.innerHTML == "Remove") {
        orderDetail.removeChild(obj.parentNode.parentNode);
        if (orderDetail.childElementCount == 1) {
            $("#productid").removeAttr("disabled")
            orderDetail.children[0].children[0].children[0].innerHTML = 1;
        } else {
            for (var i = 0; i < orderDetail.rows.length; i++) {
                orderDetail.children[i].children[0].children[0].innerHTML = i + 1
            }
        }
        return;
    }
    if ($("#productid").val() == "" || $("#productid").val() == null) {
        $("#labtxt").html("Please select Item.");
        showDiv();
        return;
    } else {
        if ($("#productid").val() == "P027") {
            //if ($("#Type" + index).val() == "" || $("#Type" + index).val() == null) {
            //    $("#labtxt").html("Please Select Type.");
            //    showDiv();
            //    return;
            //}
            //if ($("#Size" + index).val() == "" || $("#Size" + index).val() == null) {
            //    $("#labtxt").html("Please Select Size.");
            //    showDiv();
            //    return;
            //}
            //if ($("#Qty" + index).val() == "" || $("#Qty" + index).val() == "0" || $("#Qty" + index).val() == null) {
            //    $("#labtxt").html("Please Input QTY.");
            //    showDiv();
            //    return;
            //}
            $("#productid").attr("disabled", "disabled")
            var html = "<tr>";
            html += "<td><font>" + (indexCount + 1) + "</font><input type='text' value='" + (index + 1) + "' style='display:none'/></td>";
            html += "<td><select id='Size" + (index + 1) + "' class='Size' ><option value=''>--Please Select--</option><option value='XS'>XS</option><option value='S'>S</option><option value='M'>M</option><option value='L'>L</option><option value='XL'>XL</option><option value='XXL'>XXL</option>   </td>";
            html += "<td><input id='Colour" + (index + 1) + "' class='Colour' type='text'/></td>";
            html += "<td><input ID='Style_Number" + (index + 1) + "' type='text' class='Style_Number' /></td>";
            // html += "<td><input ID='Style_Name" + (index + 1) + "' type='text' class='Style_Name' /></td>";
            html += "<td><input id='EAN_Code" + (index + 1) + "' class='EAN_Code' type='text'/></td>";
            html += "<td><input ID='Qty" + (index + 1) + "' type='text' class='Qty' /></td>";
            html += "<td><button ID='btn" + (index + 1) + "' type='button' onclick='AddOrderLine(this)'>ADD</button></td>";
            html += "</tr>";
            $("#OrderDetailCareLabel").append(html);

            $("#Colour" + index).attr("disabled", "disabled");
            $("#Style_Number" + index).attr("disabled", "disabled");
            //$("#Style_Name" + index).attr("disabled", "disabled")
            $("#EAN_Code" + index).attr("disabled", "disabled");
            $("#Qty" + index).attr("disabled", "disabled");


        }
        else if ($("#productid").val() == "P1224") {
            //if ($("#Style" + index).val() == "" || $("#Style" + index).val() == null) {
            //    $("#labtxt").html("Please Input Style Name.");
            //    showDiv();
            //    return;
            //}
            //if ($("#ArtNo" + index).val() == "" || $("#Style" + index).val() == null) {
            //    $("#labtxt").html("Please Input ART. NO.");
            //    showDiv();
            //    return;
            //}
            //if ($("#Qty" + index).val() == "" || $("#Qty" + index).val() == "0" || $("#Qty" + index).val() == null) {
            //    $("#labtxt").html("Please Input QTY");
            //    showDiv();
            //    return;
            //}
            $("#productid").attr("disabled", "disabled")
            var html = "<tr>";
            html += "<td><font>" + (indexCount + 1) + "</font><input type='text' value='" + (index + 1) + "' style='display:none'/></td>";
            // html += "<td><select id='Size" + (index + 1) + "' class='Size' ><option value=''>--Please Select--</option></select></td>";
            html += "<td><select id='Size" + (index + 1) + "' class='Size' ><option value=''>--Please Select--</option><option value='XS'>XS</option><option value='S'>S</option><option value='M'>M</option><option value='L'>L</option><option value='XL'>XL</option><option value='XXL'>XXL</option>   </td>";

            html += "<td><input id='Colour" + (index + 1) + "' class='Colour' type='text'/></td>";
            html += "<td><input ID='Style_Number" + (index + 1) + "' type='text' class='Style_Number' /></td>";
            html += "<td><input ID='Style_Name" + (index + 1) + "' type='text' class='Style_Name' /></td>";
            html += "<td><input id='EAN_Code" + (index + 1) + "' class='EAN_Code' type='text'/></td>";
            html += "<td><input ID='Qty" + (index + 1) + "' type='text' class='Qty' /></td>";
            html += "<td><button ID='btn" + (index + 1) + "' type='button' onclick='AddOrderLine(this)'>ADD</button></td>";
            html += "</tr>";
            $("#OrderDetailCareLabel").append(html);

            $("#Colour" + index).attr("disabled", "disabled");
            $("#Style_Number" + index).attr("disabled", "disabled");
            $("#Style_Name" + index).attr("disabled", "disabled");
            $("#EAN_Code" + index).attr("disabled", "disabled");
            $("#Qty" + index).attr("disabled", "disabled");
        }
        $("#btn" + index).text("Remove");

    }
}

var index = 0;
var indexCount = 1;
//添加和移除订单数据行
function AddOrderLine(obj) {
    //  var index = parseInt(obj.parentElement.parentElement.children[0].children[1].value);
    //var indexCount = parseInt(obj.parentElement.parentElement.children[0].children[0].innerHTML);
    debugger;
    if (obj.innerHTML == "Remove") {
        orderDetail.removeChild(obj.parentNode.parentNode);
        if (orderDetail.childElementCount == 1) {
            $("#productid").removeAttr("disabled")
            orderDetail.children[0].children[0].children[0].innerHTML = 1;
        } else {
            for (var i = 0; i < orderDetail.rows.length; i++) {
                orderDetail.children[i].children[0].children[0].innerHTML = i + 1
            }
        }
        return;
    }
    if ($("#productid").val() == "" || $("#productid").val() == null) {
        $("#labtxt").html("Please select Item.");
        showDiv();
        return;
    } else {
        if ($("#productid").val() == "P027") {
            //if ($("#Type" + index).val() == "" || $("#Type" + index).val() == null) {
            //    $("#labtxt").html("Please Select Type.");
            //    showDiv();
            //    return;
            //}
            //if ($("#Size" + index).val() == "" || $("#Size" + index).val() == null) {
            //    $("#labtxt").html("Please Select Size.");
            //    showDiv();
            //    return;
            //}
            //if ($("#Qty" + index).val() == "" || $("#Qty" + index).val() == "0" || $("#Qty" + index).val() == null) {
            //    $("#labtxt").html("Please Input QTY.");
            //    showDiv();
            //    return;
            //}
            $("#productid").attr("disabled", "disabled")
            var html = "<tr>";
            html += "<td><font>" + indexCount + "</font><input type='text' value='" + index + "' style='display:none'/></td>";
            html += "<td><select id='Size" + index + "' class='Size' ><option value='" + $("#Size").val() + "'>" + $("#Size").val() + "</option></select>   </td>";
            html += "<td><input id='Colour" + index + "' class='Colour' type='text'  value='" + $("#Colour").val() + "'/></td>";
            html += "<td><input ID='Style_Number" + index + "' type='text' class='Style_Number' value='" + $("#Style_Number").val() + "' /></td>";
            // html += "<td><input ID='Style_Name" + (index + 1) + "' type='text' class='Style_Name' /></td>";
            html += "<td><input id='EAN_Code" + index + "' class='EAN_Code' type='text'  value='" + $("#EAN_Code").val() + "'/></td>";
            html += "<td><input ID='Qty" + index + "' type='text' class='Qty'  value='" + $("#Qty").val() + "'/></td>";
            html += "<td><button ID='btn" + index + "' type='button' onclick='AddOrderLine(this)'>Remove</button></td>";
            html += "</tr>";
            $("#OrderDetailCareLabel").append(html);

            $("#Colour" + index).attr("disabled", "disabled")
            $("#Style_Number" + index).attr("disabled", "disabled")
            //$("#Style_Name" + index).attr("disabled", "disabled")
            $("#EAN_Code" + index).attr("disabled", "disabled")
            $("#Qty" + index).attr("disabled", "disabled")

            $("#Size").val("");
            $("#Colour").val("");
            $("#Style_Number").val("");

            $("#EAN_Code").val("");
            $("#Qty").val("");

            index++;
            indexCount++;
        }
        else if ($("#productid").val() == "P1224") {
            //if ($("#Style" + index).val() == "" || $("#Style" + index).val() == null) {
            //    $("#labtxt").html("Please Input Style Name.");
            //    showDiv();
            //    return;
            //}
            //if ($("#ArtNo" + index).val() == "" || $("#Style" + index).val() == null) {
            //    $("#labtxt").html("Please Input ART. NO.");
            //    showDiv();
            //    return;
            //}
            //if ($("#Qty" + index).val() == "" || $("#Qty" + index).val() == "0" || $("#Qty" + index).val() == null) {
            //    $("#labtxt").html("Please Input QTY");
            //    showDiv();
            //    return;
            //}
            $("#productid").attr("disabled", "disabled")
            var html = "<tr>";
            html += "<td><font>" + indexCount + "</font><input type='text' value='" + index + "' style='display:none'/></td>";
            // html += "<td><select id='Size" + (index + 1) + "' class='Size' ><option value=''>--Please Select--</option></select></td>";
            html += "<td><select id='Size" + index + "' class='Size' ><option value='" + $("#Size").val() + "'>" + $("#Size").val() + "</option></select>  </td>";

            html += "<td><input id='Colour" + index + "' class='Colour' type='text'  value='" + $("#Colour").val() + "'/></td>";
            html += "<td><input ID='Style_Number" + index + "' type='text' class='Style_Number'  value='" + $("#Style_Number").val() + "'/></td>";
            html += "<td><input ID='Style_Name" + index + "' type='text' class='Style_Name'  value='" + $("#Style_Name").val() + "'/></td>";
            html += "<td><input id='EAN_Code" + index + "' class='EAN_Code' type='text'  value='" + $("#EAN_Code").val() + "'/></td>";
            html += "<td><input ID='Qty" + index + "' type='text' class='Qty'   value='" + $("#Qty").val() + "'/></td>";
            html += "<td><button ID='btn" + index + "' type='button' onclick='AddOrderLine(this)'>Remove</button></td>";
            html += "</tr>";
            $("#OrderDetailCareLabel").append(html);

            $("#Colour" + index).attr("disabled", "disabled");
            $("#Style_Number" + index).attr("disabled", "disabled");
            $("#Style_Name" + index).attr("disabled", "disabled");
            $("#EAN_Code" + index).attr("disabled", "disabled");
            $("#Qty" + index).attr("disabled", "disabled");

            $("#Size").val("");
            $("#Colour").val("");
            $("#Style_Number").val("");
            $("#Style_Name").val("");
            $("#EAN_Code").val("");
            $("#Qty").val("");

            index++;
            indexCount++;
        }
        $("#btn" + index).text("Remove");

    }
}
function FunReturnToMainPage() {
    $.ajax({
        url: "/BJB/BJBBarcodePageLoad",
        type: "post",
        contentType: "application/html; charset=utf-8",
        dataType: "html",
        success: function (res) {
            $("#form_wizard_1").html(res);
            $("#form_wizard_1").slideDown();

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // 状态码
            console.log(XMLHttpRequest.status);
            // 状态
            console.log(XMLHttpRequest.readyState);
            // 错误信息   
            console.log(textStatus);
        }
    })
}

//提交订单前的数据验证
function checkdata() {
    if ($("#BilltoId").val() == "" || $("#BilltoId option:selected").text() == "") {
        $("#labtxt").html("The Billing To can not be empty");
        showDiv();
        return false;
    }
    if ($("#iBilltoAddress").val() == "") {
        $("#labtxt").html("The Billing Address can not be empty");
        showDiv();
        return false;
    }
    if ($("#iBilltoAddrContact").val() == "") {
        $("#labtxt").html("The Billing Contact can not be empty");
        showDiv();
        return false;
    }
    if ($("#iBilltoAddrTel").val() == "") {
        $("#labtxt").html("The Billing Tel can not be empty");
        showDiv();
        return false;
    }
    if ($("#ShiptoId").val() == "") {
        $("#labtxt").html("The Ship To can not be empty");
        showDiv();
        return false;
    }
    if ($("#ShipAddrId").val() == "" || $("#ShipAddrId option:selected").text() == "") {
        $("#labtxt").html("The Shipping Address can not be empty");
        showDiv();
        return false;
    }
    if ($("#iShipAddrTel").val() == "") {
        $("#labtxt").html("The Shipping Tel can not be empty");
        showDiv();
        return false;
    }
    if ($("#iCurrency").val() == "") {
        $("#labtxt").html("The Currency can not be empty");
        showDiv();
        return false;
    }
    if ($("#iShipAddrCountry").val() == "") {
        $("#labtxt").html("The Country can not be empty");
        showDiv();
        return false;
    }
    if ($("#DDLShipmentType").val() == "") {
        $("#labtxt").html("Please Select ShipmentType");
        showDiv();
        return false;
    } else {
        if ($("#ExpressCompany").val() == "" && $("#DDLShipmentType").val() == "Express") {
            $("#labtxt").html("Please Select ExpressCompany");
            showDiv();
            return false;
        }
    }
    if ($("#productid").val() == "") {
        $("#labtxt").html("The Item can not be empty");
        showDiv();
        return false;
    }

    return true;
}