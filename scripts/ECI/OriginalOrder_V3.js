$(function () {
    document.body.scrollTop = 0;
    $(".madein").prop("disabled",true)
    $("#productImg5").hide().show();
    //绑定洗语
    $.ajax({
        url: "/ECI/GetInstructions",
        dataType: "json",
        type: "get",
        success: function (data) {
            if (data.Table.length == 0) {
                return;
            }
            var html1 = "<option value='' symbol=''>--Please Select--</option>";
            $.each(JSON.parse(data.Table), function (index, item) {
                html1 += "<option value='" + item.id + "' symbol='" + item.Symbol + "'>" + item.English + "</option>";
            })
            if (data.WASHtable.length == 0) {
                return;
            }
            var html2 = "<option value='' symbol=''>--Please Select--</option>";
            $.each(JSON.parse(data.WASHtable), function (index, item) {
                html2 += "<option value='" + item.id + "' symbol='" + item.Symbol + "'>" + item.English + "</option>";
            })
            if (data.DRYtable.length == 0) {
                return;
            }
            var html3 = "<option value='' symbol=''>--Please Select--</option>";
            $.each(JSON.parse(data.DRYtable), function (index, item) {
                html3 += "<option value='" + item.id + "' symbol='" + item.Symbol + "'>" + item.English + "</option>";
            })
            if (data.IRONtable.length == 0) {
                return;
            }
            var html4 = "<option value='' symbol=''>--Please Select--</option>";
            $.each(JSON.parse(data.IRONtable), function (index, item) {
                html4 += "<option value='" + item.id + "' symbol='" + item.Symbol + "'>" + item.English + "</option>";
            })
            if (data.BLEACHtable.length == 0) {
                return;
            }
            var html5 = "<option value='' symbol=''>--Please Select--</option>";
            $.each(JSON.parse(data.BLEACHtable), function (index, item) {
                html5 += "<option value='" + item.id + "' symbol='" + item.Symbol + "'>" + item.English + "</option>";
            })
            if (data.TUMBLEtable.length == 0) {
                return;
            }
            var html6 = "<option value='' symbol=''>--Please Select--</option>";
            $.each(JSON.parse(data.TUMBLEtable), function (index, item) {
                html6 += "<option value='" + item.id + "' symbol='" + item.Symbol + "'>" + item.English + "</option>";
            })
            $("#Wash").html(html2);
            $("#Bleach").html(html5);
            $("#Tumbledry").html(html6);
            $("#Iron").html(html4);
            $("#Dryclean").html(html3);
            $("#Speinstructions1").html(html1);
            $("#Speinstructions2").html(html1);
            $("#Speinstructions3").html(html1);
            $("#Speinstructions4").html(html1);
            $("#Speinstructions5").html(html1);
        }
    })

    $(".ECIProductList").trigger("change");
    $("#ApplyBeic").trigger("click");

    $("#Cate2").attr("disabled", "disabled")
    $("#Cate3").attr("disabled", "disabled")
    $(".fiber2").attr("disabled", "disabled")
    $(".fiber3").attr("disabled", "disabled")
    $(".Per2").attr("disabled", "disabled")
    $(".Per3").attr("disabled", "disabled")

    //Item Reference
    $("#ItemRef").change(function () {
        $.ajax({
            url: "/ECI/GetDatatbaleByItemRef",
            dataType: "json",
            type: "get",
            data: {
                PO: $("#OriV3_PO").val(),
                Fileid: $("#OriV3_Fileid").val(),
                ItemRef: $("#ItemRef").val()
            },
            success: function (data) {
                var html = "";
                var Qtytotal = 0;
                if (data.table.length > 0) {
                    $.each(JSON.parse(data.table), function (index, item) {
                        var pricestr = item["PVP"];
                        var price = pricestr.substring(0, pricestr.length - 2) / 100;
                        var QTYstr = item["Amount_qty"];
                        var QTY = parseInt(QTYstr.substring(0, QTYstr.length - 2));
                        Qtytotal += QTY;
                        html += "<tr>";
                        html += "<td style='display:none'>" + item["Line_No"] + "</td>";
                        html += "<td>" + item["Manufacturer"] + "</td>";
                        html += "<td>" + item["EANI_EAN"] + "</td>";
                        html += "<td>" + price + "</td>";
                        html += "<td>" + item["Currency"] + "</td>";
                        html += "<td>" + item["Size_Field_not_used"] + "</td>";
                        html += "<td id='ECIQty" + index + "'>" + item["Amount_qty"].substring(0, item["Amount_qty"].length - 2).replace(/\b(0+)/gi, "") + "</td>";
                        html += "<td><input type='number' class='span4' name='ECIQty" + index + "' min='0' value='" + QTY + "' style='width:70px;' onchange='FunChangeQty()' onkeyup='FunChangeQty()'/></td>";
                        //html += '<td><select style="width:144px" id="bcSel'+index+'"><option value="1">--Please Select--</option><option value="1.05">5%</option><option value="1.1">10%</option><option value="1.15">15%</option></select><button type="button" onclick="FunApply(index)">Apply</button></td>';
                        html += "<td>" + item["Size_Field_not_used"] + "</td>";
                        html += "</tr>";
                    })
                    html += " <tr><td colspan='5'></td><td>Total:</td><td id='TotalQty'>" + Qtytotal + "</td><td colspan='2'></td></tr>";
                    $("#page2-OrderDetail").html(html);
                }
                $("#ApplyBeic").trigger("click");
                $("#size1").html(data.EciSize)
                $("#size2").html(data.EciSize + data.EciLetterSize)
                $("#size3").html(data.EciLetterSize)
            }
        })
    })
    $("[type='number']").keypress(function (e) {
        if (!String.fromCharCode(e.keyCode).match(/[0-9]/)) {
            return false;
        }
    });
    $("[name='per']").keyup(function () {
        if (this.value > 100) this.value = this.value.slice(0, 2)
    })

    $("#Clearcompositions").click(function () {
        $(".CateFiber").val("");
        $(".madein").val("")
        $("[name='Per']").val("0")
        $("#Cate2").attr("disabled", "disabled")
        $("#Cate3").attr("disabled", "disabled")
        $(".fiber2").attr("disabled", "disabled")
        $(".fiber3").attr("disabled", "disabled")
        $(".Per2").attr("disabled", "disabled")
        $(".Per3").attr("disabled", "disabled")
        $(".madein").attr("disabled","disabled")
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

        if ($("#ShiptoId option:selected").text() == "--Please Select--") {
            $("#ShipAddrId").html("");
            $("#ShipAddrId").hide();
            $("#ShipAddrId").show();
            $("#iShipAddrContact").val("");
            $("#iShipAddrTel").val("");
            $("#iShipAddrCountry").val("");
        } else {
            $("#ShipAddrId").html("");
            $("#ShipAddrId").hide();
            $("#ShipAddrId").show();
            $("#iShipAddrContact").val("");
            $("#iShipAddrTel").val("");
            $("#iShipAddrCountry").val("");
            var urlPost = "/OrderCommon/GetShipAddressInforlistbyShipToId?ShipToId=" + $("select[name='ShiptoId']").val();
            $.post(urlPost, data, function (data, status) {
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
        }


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

    $("#btnFiberBack").click(function () {
        document.body.scrollTop=0;
        $("#OriTable").show();
        $("#OriTable2").hide();
        $("#OriTable2FY").hide();

        $("#FiberAndCategory").hide();
        $("#Page1-ButtonList").show();

        $("#HeadTable").show();
        $("#CartImgList").show();
        $("[name='qtybtn']").removeAttr("disabled");
        $("[name='Qty']").removeAttr("disabled");
        $("[name = 'applybtn']").removeAttr("disabled");
        $("[name='bcSel']").removeAttr("disabled");
    })

    $("#BtnBackOri").click(function () {
        document.body.scrollTop=0;
        $("#page-inner2_Org").show();
        $("#OrderQuery").show();
        $("#CareLabelOrder").hide();
        $("#step1").removeClass("gray-em").addClass("red-em");
        $("#step2").hide();
        $("#SelDepart").removeAttr("disabled")
        $("#SelBrand").removeAttr("disabled")
        $("#txtOrder_Number").removeAttr("readonly")
        $("#txtOrder_Number").val("")
    })

    $("#BtnNext").click(function () {
        var isproduct = false;
        $(".ECIProductList").each(function () {
            if ($(this.selectedOptions).text() != "--Please Select--" && $(this.selectedOptions).text() != "Yes" && $(this.selectedOptions).text() != "No") {
                isproduct = true;
            }
        })
        if(!isproduct) {
            $("#labtxt").html("Please Select Product")
            showDiv();
            return;
    }
        if($("#CareLabelProduct").val() != "") {
            $("#labtxt").html("Please Edit Composition For all refernces first");
            showDiv();
            return;
    }
        SubmitQty("Next")
    })

    $("#BtnEditCompostion").click(function () {
        if ($("#CareLabelProduct").val() == "") {
            $("#labtxt").html("Please Select Care & Compostion Label");
            showDiv();
            return;
        }
        SubmitQty("BtnEditCompostion")
    })

    $("#Clearsymbols").click(function () {
        $(".WashSymbols").val("")
        $("#EciCustCode").val("")
        $("[name='symbol']").trigger("change")
    })
    $("#EciCustCode").change(function () {
        var value = this.value;
        if (this.value == "") {
            $("#Clearsymbols").trigger("click");
            return;
        }
        $.ajax({
            url: "/ECI/GetWashSymbolByCustCode",
            dataType: "json",
            type: "get",
            data: {
                CustCode: this.value
            }, success: function (result) {
                if (result.Table.length == 0) {
                    return;
                }
                $.each(JSON.parse(result.Table), function (index, item) {
                    $("#Wash").val(item["washID1"]);
                    $("#Bleach").val(item["washID2"]);
                    $("#Tumbledry").val(item["washID3"]);
                    $("#Iron").val(item["washID4"]);
                    $("#Dryclean").val(item["washID5"]);
                    $("#Speinstructions1").val(item["washID6"]);
                    $("#Speinstructions2").val(item["washID7"]);
                    $("#Speinstructions3").val(item["washID8"]);
                    $("#Speinstructions4").val(item["washID9"]);
                    $("#Speinstructions5").val(item["washID10"]);
                })
                $("[name='symbol']").trigger("change")
                $("#EciCustCode").val(value);
            }
        })


    })
    //洗标Preview
    $("#btnPreView").click(function () {
        var side = ["front side", "back side"];
        if (!FunCheckData()) {
            return;
        }
        var SubmitData = {
            FileDataLogID: $("#OriV3_Fileid").val(),
            PO_Number: $("#OriV3_PO").val(),
            ItemRefen: $("#ItemRef").val(),

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

            Item: $("#CareLabelProduct option:selected").text(),
            ProductCode: $("#CareLabelProduct").val(),
            MadeIn: $("#Madein").val(),
            Comments: $("#Comments").val(),

            Productor: $("#Productor").val(),
            CONTAINS: $("#CONTAINS").prop("checked") ? "CONTAINS NON-TEXTILE PARTS OF ANIMAL ORIGIN" : "",
            OrderStr: "",
            FiberStr: "",
            WashStr: "",
            symbolsStr: ""
        }
        if ($("#CareLabelProduct").val() == "") {
            $("#labtxt").html("Please Select Care & Compostion Label In The First Page");
            showDiv();
            return;
        }
        var orderstr = "";
        var OrderDetail = document.getElementById("page2-OrderDetail");
        for (var i = 0; i < OrderDetail.rows.length - 1; i++) {
            //Barcode  size  QTY
            orderstr += OrderDetail.rows[i].cells[1].innerText + "^" + OrderDetail.rows[i].cells[5].innerText + "^" + OrderDetail.rows[i].cells[7].children[0].value + "ˇ";
        };
        SubmitData.OrderStr = orderstr.substring(0, orderstr.length - 1);

        var CateFiber = "";
        if ($("#Cate1").val() != "" || $("#Cate1").val() == "") {
            var a = 0;
            for (var i = 1; i < 5; i++) {
                if ($("#Fiber" + i).val() != "" || $("#Per" + i).val() != "0") {
                    if (a == 0) {
                        CateFiber += $("#Cate1").val() + "^" + $("#Per" + i).val() + "^" + $("#Fiber" + i).val() + "^" + $("#Origin" + i).val() + "ˇ"
                        a++;
                    } else {
                        CateFiber += "" + "^" + $("#Per" + i).val() + "^" + $("#Fiber" + i).val() + "^" + $("#Origin" + i).val() + "ˇ"
                    }
                }
            }
        }
        if ($("#Cate2").val() != "") {
            var a = 0;
            for (var i = 5; i < 7; i++) {
                if ($("#Fiber" + i).val() != "" || $("#Per" + i).val() != "0") {
                    if (a == 0) {
                        CateFiber += $("#Cate2").val() + "^" + $("#Per" + i).val() + "^" + $("#Fiber" + i).val() + "^" + $("#Origin" + i).val() + "ˇ";
                        a++;
                    } else {
                        CateFiber += "" + "^" + $("#Per" + i).val() + "^" + $("#Fiber" + i).val() + "^" + $("#Origin" + i).val() + "ˇ"
                    }
                }
            }
        }
        if ($("#Cate3").val() != "") {
            var a = 0;
            for (var i = 7; i < 9; i++) {
                if ($("#Fiber" + i).val() != "" || $("#Per" + i).val() != "0") {
                    if (a == 0) {
                        CateFiber += $("#Cate3").val() + "^" + $("#Per" + i).val() + "^" + $("#Fiber" + i).val() + "^" + $("#Origin" + i).val() + "ˇ"
                        a++;
                    } else {
                        CateFiber += "" + "^" + $("#Per" + i).val() + "^" + $("#Fiber" + i).val() + "^" + $("#Origin" + i).val() + "ˇ"
                    }

                }
            }
        }
        SubmitData.FiberStr = CateFiber.substring(0, CateFiber.length - 1);

        SubmitData.symbolsStr = $("#Washimg").attr("sym") + $("#Bleachimg").attr("sym") + $("#Tumbleimg").attr("sym") + $("#Ironimg").attr("sym") + $("#Dryimg").attr("sym")

        $(".WashSymbols").each(function () {
            if ($(this.selectedOptions).text() == "--Please Select--") {
                return;
            }
            SubmitData.WashStr += $(this.selectedOptions).text() + "^";
        })
        SubmitData.WashStr = SubmitData.WashStr.substring(0, SubmitData.WashStr.length - 1);

        showloading();
        $.ajax({
            url: "/ECI/Order_V3CareLabelPreView",
            dataType: "json",
            type: "post",
            data: SubmitData,
            success: function (result) {
                if (result.Status == "err") {
                    hideloading();
                    if (result.Message == "未匹配到合适的区域高度,重选页面") {
                        $("#labtxt").html("The artwork is generated in failure, as fiber and care instruction you chose is too much, please re edit or contact local customer service directly.");
                    } else {
                        $("#labtxt").html(result.Message);
                    }
                    showDiv();
                    return;
                }
                $("#dowebok").html("");
                var imagesList = "";
                var imagesList2 = "";
                var int = 0;
                $.each(result.images, function (i, item) {
                    for (var j = 0; j < item.length; j++) {
                        imagesList += "<li style='float:left'><img data-original='" + item[j] + "'' src='" + item[j] + "' style='height:200px;'></br><font>" + side[i % 2] + (parseInt(j / 2) + 1) + "</font></li>";
                    }
                })
                $("#dowebok").append(imagesList);
                $("#PreviewImg").css("display", "block");
                $('#dowebok').viewer({
                    url: 'data-original',
                });
                $("#dowebok").viewer('update');

                hideloading();
            }
        })
    })

    $("#NoSizeCartNext").click(function () {
        $("#NoSizeCart").hide();
        $("#UserInfo").show();
        var product = new Array();
        var productCode = new Array();
        var QTY = new Array();
        $(".ECIProductList").each(function (index, item) {
            if (index == 3) {
                if ($("#CKSize").prop("checked")) {
                    return
                }
            }
            if (this.value != "" && this.value != null) {
                if ($(this.selectedOptions).text() == "Yes") {
                    product.push($(this.selectedOptions).attr("data-Text"));
                    productCode.push(this.value);
                    QTY.push($("#TotalQty").text());
                } else {
                    product.push($(this.selectedOptions).text());
                    productCode.push(this.value);
                    QTY.push($("#TotalQty").text());
                }
            }
        })
        $("#NoSizeCartDetail tr").each(function (index, item) {
            if (item.cells[5].children[0].checked) {
                if (parseInt(item.cells[2].children[0].value) != 0 && item.cells[2].children[0].value != "") {
                    productCode.push(item.cells[0].innerText);
                    product.push(item.cells[1].innerText);
                    QTY.push(parseInt(item.cells[2].children[0].value));
                }
                if (item.cells[3].innerText == "1") {
                    productCode.push(item.cells[0].innerText);
                    product.push(item.cells[1].innerText);
                    QTY.push(parseInt($("#TotalQty").text()));
                }
            }
        })
        var html = "";
        for (var i = 0; i < product.length; i++) {
            var url = "../WebDocuments/ProductImg/ECI001/small-img/" + productCode[i].trim() + "/" + productCode[i].trim() + ".jpg";
            if (i == 0) {
                html += "<tr>";
                html += "<td><img src='" + url + "'/></td>";
                html += "<td rowspan=" + product.length + ">" + $("#OriV3_PO").val() + "</td>";
                html += "<td rowspan=" + product.length + ">" + $("#ItemRef").val() + "</td>";
                html += "<td>" + product[i] + "</td>";
                html += "<td>" + QTY[i] + "</td>";
                html += "</tr>";
            } else {
                html += "<tr>";
                html += "<td><img src='" + url + "'/></td>";
                html += "<td>" + product[i] + "</td>";
                html += "<td>" + QTY[i] + "</td>";
                html += "</tr>";
            }
        }
        $("#Orderlist").html(html)
        document.body.scrollTop=0;
    })
    $("#NoSizeBack").click(function () {
        document.body.scrollTop=0;
        $("#OriTable").show();
        $("#OriTable2").hide();
        $("#OriTable2FY").hide();

        $("#UserInfo").hide();
        $("#NoSizeCart").hide();
        $("#HeadTable").show();
        $("#CartImgList").show();
        $("#Page1-ButtonList").show();
        $("[name='qtybtn']").removeAttr("disabled");
        $("[name='Qty']").removeAttr("disabled");
        $("[name = 'applybtn']").removeAttr("disabled");
        $("[name='bcSel']").removeAttr("disabled")
    })

    $("#modalNext").click(function () {
        if ($("#CareLabelProduct").val() == "") {
            $("#labtxt").html("Please Select Care & Compostion Label In The First Page");
            showDiv();
            return;
        }
        if (!FunCheckData()) {
            return;
        }

        $("#FiberAndCategory").hide();
        $("#NoSizeCart").show()
        document.body.scrollTop=0;
    })

    //无变量购物车产品的模糊查询
    $("#txtBuscar").keyup(function () {
        $("#NoSizeCartDetail tr").hide();
        var $table = $("#NoSizeCartDetail tr").filter(":contains('" + $.trim($("#txtBuscar").val().toLowerCase()) + "'),:contains('" + $.trim($("#txtBuscar").val().toUpperCase()) + "')")
        $table.show();
    })
    $("#Articulo").keyup(function () {
        var table = document.getElementById("NoSizeCartDetail");
        $("#NoSizeCartDetail tr").hide();
        $.each(table.children, function (index, item) {
            if (item.children[0].textContent.search($.trim($("#Articulo").val().toLowerCase())) > -1 || item.children[0].textContent.search($.trim($("#Articulo").val().toUpperCase())) > -1) {
                $(item).show()
            }
        })
    })
    $("#Descripcion").keyup(function () {
        var table = document.getElementById("NoSizeCartDetail");
        $("#NoSizeCartDetail tr").hide();
        $.each(table.children, function (index, item) {
            if (item.children[1].textContent.search($.trim($("#Descripcion").val().toLowerCase())) > -1 || item.children[1].textContent.search($.trim($("#Descripcion").val().toUpperCase())) > -1) {
                $(item).show()
            }
        })
    })
    $("#Cantidad").keyup(function () {
        var table = document.getElementById("NoSizeCartDetail");
        $("#NoSizeCartDetail tr").hide();
        $.each(table.children, function (index, item) {
            if (item.children[2].children[0].value.search($.trim($("#Cantidad").val().toLowerCase())) > -1 || item.children[2].children[0].value.search($.trim($("#Cantidad").val().toUpperCase())) > -1) {
                $(item).show()
            }
        })
    })
    

    //提交订单
    $("#submitOrder").click(function () {
        if ($("#DDLShipmentType").val()=="") {
            $("#labtxt").html("Please Select Shipment Type");
            showDiv();
            return;
        }
        showloading();
        var SubmitData = {
            FileDataLogID: $("#OriV3_Fileid").val(),
            PO_Number: $("#OriV3_PO").val(),
            ItemRefen: $("#ItemRef").val(),

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

            Item: $("#CareLabelProduct option:selected").text(),
            ProductCode: $("#CareLabelProduct").val(),
            HangTagVariable:$("#ECIHangTagVariableData option:selected").text(),
            HangTagWithFibers:$("#ECIHangTagWithFibers option:selected").text(),
            WowenSize: $("#ECIWowenSizeLabel option:selected").text(),
            WowenSizeCode:$("#ECIWowenSizeLabel").val(),
            IncludeLogistic: $("#Include option:selected").attr("data-Text"),

            MadeIn: $("#Madein").val(),
            Comments: $("#Comments").val(),
            ishangtaglabelscord: $("#CKHangtag").prop("checked") ? "1" : "",
            iswovmen:$("#CKSize").prop("checked")?"1":"",

            Productor:$("#Productor").val(),
            CONTAINS: $("#CONTAINS").prop("checked") ? "CONTAINS NON-TEXTILE PARTS OF ANIMAL ORIGIN" : "",
            OrderStr: "",
            FiberStr: "",
            WashStr: "",
            symbolsStr: "",
            NoSizeCareStr: "",
            SizeCareStr: "",

            TotalQty: $("#TotalQty").text()
        }
        var orderstr = "";
        var OrderDetail = document.getElementById("page2-OrderDetail");
        for (var i = 0; i < OrderDetail.rows.length - 1; i++) {
            //Barcode  size  QTY
            orderstr += OrderDetail.rows[i].cells[1].innerText + "^" + OrderDetail.rows[i].cells[5].innerText + "^" + OrderDetail.rows[i].cells[7].children[0].value + "ˇ";
        };
        SubmitData.OrderStr = orderstr.substring(0, orderstr.length - 1);

        var CateFiber = "";
        if ($("#Cate1").val() != "" || $("#Cate1").val() == "") {
            var a = 0;
            for (var i = 1; i < 5; i++) {
                if ($("#Fiber" + i).val() != "" || $("#Per" + i).val() != "0") {
                    if (a == 0) {
                        CateFiber += $("#Cate1").val() + "^" + $("#Per" + i).val() + "^" + $("#Fiber" + i).val() + "^" + $("#Origin" + i).val() + "ˇ"
                        a++;
                    } else {
                        CateFiber += "" + "^" + $("#Per" + i).val() + "^" + $("#Fiber" + i).val() + "^" + $("#Origin" + i).val() + "ˇ"
                    }
                }
            }
        }
        if ($("#Cate2").val() != "") {
            var a = 0;
            for (var i = 5; i < 7; i++) {
                if ($("#Fiber" + i).val() != "" || $("#Per" + i).val() != "0") {
                    if (a == 0) {
                        CateFiber += $("#Cate2").val() + "^" + $("#Per" + i).val() + "^" + $("#Fiber" + i).val() + "^" + $("#Origin" + i).val() + "ˇ";
                        a++;
                    } else {
                        CateFiber += "" + "^" + $("#Per" + i).val() + "^" + $("#Fiber" + i).val() + "^" + $("#Origin" + i).val() + "ˇ"
                    }
                }
            }
        }
        if ($("#Cate3").val() != "") {
            var a = 0;
            for (var i = 7; i < 9; i++) {
                if ($("#Fiber" + i).val() != "" || $("#Per" + i).val() != "0") {
                    if (a == 0) {
                        CateFiber += $("#Cate3").val() + "^" + $("#Per" + i).val() + "^" + $("#Fiber" + i).val() + "^" + $("#Origin" + i).val() + "ˇ"
                        a++;
                    } else {
                        CateFiber += "" + "^" + $("#Per" + i).val() + "^" + $("#Fiber" + i).val() + "^" + $("#Origin" + i).val() + "ˇ"
                    }

                }
            }
        }
        SubmitData.FiberStr = CateFiber.substring(0, CateFiber.length - 1);

        SubmitData.symbolsStr = $("#Washimg").attr("sym") + $("#Bleachimg").attr("sym") + $("#Tumbleimg").attr("sym") + $("#Ironimg").attr("sym") + $("#Dryimg").attr("sym")

        $(".WashSymbols").each(function () {
            if ($(this.selectedOptions).text() == "--Please Select--") {
                return;
            }
            SubmitData.WashStr += $(this.selectedOptions).text() + "^";
        })
        SubmitData.WashStr = SubmitData.WashStr.substring(0, SubmitData.WashStr.length - 1);

        $("#NoSizeCartDetail tr").each(function (index, item) {
            if (item.cells[5].children[0].checked) {
                if (parseInt(item.cells[2].children[0].value) != 0 && item.cells[2].children[0].value != "") {
                    SubmitData.NoSizeCareStr += item.cells[0].innerText + "^" + item.cells[1].innerText + "^" + item.cells[2].children[0].value + "ˇ";
                }
                if (item.cells[3].innerText == "1") {
                    SubmitData.SizeCareStr += item.cells[0].innerText + "^" + item.cells[1].innerText + "ˇ"
                }
            }
        })
        SubmitData.NoSizeCareStr = SubmitData.NoSizeCareStr.length>0?SubmitData.NoSizeCareStr.substring(0, SubmitData.NoSizeCareStr.length - 1):"";
        SubmitData.SizeCareStr = SubmitData.SizeCareStr.length > 0 ? SubmitData.SizeCareStr.substring(0, SubmitData.SizeCareStr.length - 1) : "";
        $.ajax({
            url: "/ECI/Order_V3SubmitOrder",
            dataType: "json",
            data: SubmitData,
            type: "post",
            success: function (data) {
                hideloading();
                document.body.scrollTop =0;
                if (data.Status == "True") {
                    var orderNo = data.OrderNo.split(',')
                    var OrderProduct = data.OrderProduct.split(',')
                    var OrderQty = data.OrderQty.split(',')
                    var html = "";
                    for (var i = 0; i < orderNo.length; i++) {
                        if (i == 0) {
                            html += "<tr>";
                            html += "<td rowspan='" + orderNo.length + "'>" + $("#OriV3_PO").val() + "</td>";
                            html += "<td>" + orderNo[i] + "</td>";
                            html += "<td>" + OrderProduct[i] + "</td>";
                            html += "<td>" + OrderQty[i] + "</td>";
                            html += "</tr>";
                        } else {
                            html += "<tr>";
                            html += "<td>" + orderNo[i] + "</td>";
                            html += "<td>" + OrderProduct[i] + "</td>";
                            html += "<td>" + OrderQty[i] + "</td>";
                            html += "</tr>";
                        }
                    }
                    $("#OrderSuccessBody").html(html);
                    $("#Detail-Page1").hide();
                    $("#Detail-Page2").show();
                } else {
                    $("#labtxt").html(data.Message);
                    showDiv();
                }
                
            }
        })


    })
    $("#submitOrderBack").click(function () {
        document.body.scrollTop=0;
        $("#NoSizeCart").show();
        $("#UserInfo").hide();
    })
    //分页
    $('#PageIndex2').click(function () {
        //给文本框赋值都为1
        document.getElementById("pc2").value = 1;
        document.getElementById("nowpage2").value = 1;
        SubmitQty("select");
    });
    //向上一个页翻
    $('#Pageup2').click(function () {
        //首先获取当前输入文本框的值
        var nowpage = document.getElementById("nowpage2").value;
        //parseInt() 函数可解析一个字符串，并返回一个整数。（也就是输入的内容必须是数字）
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) > 1) {
            newpage = parseInt(nowpage) - 1;
            document.getElementById("pc2").value = newpage;
            document.getElementById("nowpage2").value = newpage;
            SubmitQty("select");
        }
    });
    //向下一个页翻
    $('#Pagewown2').click(function () {
        var nowpage = document.getElementById("nowpage2").value;
        var maxpage = parseInt(document.getElementById("PageTotalCount2").value);
        var newpage = parseInt(nowpage);
        //判断，如果输入的文本框的值小于最大的页数 2 3 2<3 3=2+1
        if (parseInt(nowpage) < maxpage) {
            newpage = parseInt(nowpage) + 1
        };
        document.getElementById("pc2").value = newpage;
        document.getElementById("nowpage2").value = newpage;
        SubmitQty("select");
    });
    //翻到最后
    $('#PageLast2').click(function () {
        var maxpage = parseInt(document.getElementById("PageTotalCount2").value);
        document.getElementById("pc2").value = maxpage;
        document.getElementById("nowpage2").value = maxpage;
        SubmitQty("select");
    });
    $('#PageGO2').click(function () {
        var nowpage = parseInt(document.getElementById("nowpage2").value);
        var maxpage = parseInt(document.getElementById("PageTotalCount2").value) + 1;
        if (nowpage > 0 && nowpage < maxpage) {
            document.getElementById("pc2").value = document.getElementById("nowpage2").value;
            SubmitQty("select");
        }
        else {
            $("#labtxt").html("wrong page no.");
            showDiv();
            document.getElementById("nowpage2").value = 1;
        }
    });
    $("#nowpage2").keyup(function () {
        var t = $("#nowpage2").val();
        //判断是否是数字
        if (isNaN(t)) {
            $("#labtxt").html("wrong page no.");
            showDiv();
            document.getElementById("nowpage2").value = 1;
        }
    });
})

    function FunKeypress(obj) {
        obj.parentNode.children[1].innerText = obj.value;
    }

    function FunProductChange(index, obj) {
        if (obj.value == "" || obj.value == null) {
            $("#productImg" +index).attr("src", "")
            $("#ProductItem" +index).text("");
            $("#productImg" +index).hide().show();
            $("#ProductItem" +index).hide().show();
        return;
        }
    $("#productImg" +index).attr("src", "../WebDocuments/ProductImg/ECI001/small-img/" +obj.value + "/" +obj.value + ".jpg")
    $("#ProductItem" + index).text("Item:" +$(obj.selectedOptions).text());
    if (index == 5) {
        $("#ProductItem" + index).text("Item:" +$("#Include option:selected").attr("data-Text"));
    }
}


//重置 清除 求和数量
    function FunResetQty() {
        $("#fontbc").html("");
        var OrderDetail = document.getElementById("page2-OrderDetail")
        for (var i = 0; i < OrderDetail.rows.length - 1; i++) {
            var QTYstr = OrderDetail.rows[i].cells[6].innerText;
            var QTY = parseInt(QTYstr);
            OrderDetail.rows[i].cells[7].children[0].value = QTY;
        }
        $("#TotalQty").text(SumQty());
    }

    function FunClearQty() {
        $("#fontbc").html("");
        var OrderDetail = document.getElementById("page2-OrderDetail")
        for (var i = 0; i < OrderDetail.rows.length - 1; i++) {
            OrderDetail.rows[i].cells[7].children[0].value = "0";
        }
        $("#TotalQty").text(SumQty());
    }
    function SumQty() {
        var OrderDetail = document.getElementById("page2-OrderDetail")
        var Qty = 0;
        for (var i = 0; i < OrderDetail.rows.length - 1; i++) {
            Qty += parseInt(OrderDetail.rows[i].cells[7].children[0].value);
        }
        return Qty;
    }

    function FunChangeQty() {
        $("#fontbc").html("");
        $("#TotalQty").text(SumQty());
    }

        //备次
    function FunApply(index) {
        $("#fontbc").html($("#bcSel option:selected").text() == "--Please Select--" ? "" : "(" + $("#bcSel option:selected").text() + ")");
        var table = document.getElementById("page2-OrderDetail")
        for (var i = 0; i < table.rows.length - 1; i++) {
            var bci = $("#bcSel").val();
            var oldQtystr = table.rows[i].cells[6].innerText;
            var oldQty = parseInt(oldQtystr);
            var newQty = Math.ceil(oldQty * bci)
            $("[name=ECIQty" + i + "]").val(newQty);
        }
        $("#TotalQty").text(SumQty());
    }
    function SubmitQty(Type) {
        var sizesum = new Array("1", "2", "3", "4", "5", "6", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56");
        var size1 = new Array("1", "2", "3", "4", "5", "6")
        var size2 = new Array("36", "38", "40", "42");
        var size3 = new Array("50", "52", "54", "56");
        var type1 = false;
        var type2 = false;
        var type3 = false;
        var OrderDetail = document.getElementById("page2-OrderDetail")
        var detailstr = "";
        var size = new Array();
        for (var i = 0; i < OrderDetail.rows.length - 1; i++) {
            detailstr += OrderDetail.rows[i].cells[0].innerText + "^" + OrderDetail.rows[i].cells[7].children[0].value + "ˇ";
            size.push(parseInt(OrderDetail.rows[i].cells[5].innerText.trim()).toString());
        }
        detailstr = detailstr.substring(0, detailstr.length - 1)
        for (var i = 0; i < size.length; i++) {
            if (sizesum.indexOf(size[i]) < 0) {
                $("#labtxt").html("Please Check Size Code")
                showDiv();
                return;
            }
            if (size1.indexOf(size[i]) > -1) {
                type1 = true;
            }
            if (size2.indexOf(size[i]) > -1) {
                type2 = true;
            }
            if (size3.indexOf(size[i]) > -1) {
                type3 = true;
            }
        }

        var count = 0;
        if (type1) {
            count++;
        }
        if (type2) {
            count++;
        }
        if (type3) {
            count++;
        }
        if (count > 1) {
            $("#labtxt").html("Please Check Size Code")
            showDiv();
            return;
        }

        var IsQty = true;
        $(".SubQty").each(function (index, item) {
            if (item.value == 0) {
                $("#labtxt").html("Please Check Quantity")
                showDiv();
                IsQty = false;
                return;
            }
        })
        if (!IsQty) {
            return;
        }
        showloading()

        $.ajax({
            url: "/ECI/CheckOrderSize",
            dataType: "json",
            type: "get",
            data: {
                FileDataLogID: $("#OriV3_Fileid").val(),
                WovCHK: $("#CKSize").prop("checked") ? "1" : "",
                WovProductCode: $("#ECIWowenSizeLabel").val(),
                WovProduct: $("#ECIWowenSizeLabel option:selected").text(),
                order: $("#OriV3_PO").val(),
                Item: $("#ItemRef").val()
            },
            success: function (Result) {

                if (Result.Status == "success") {
                    $.ajax({
                        url: "/ECI/SubmitQty",
                        dataType: "json",
                        type: "get",
                        data: {
                            Fileid: $("#OriV3_Fileid").val(),
                            PO: $("#OriV3_PO").val(),
                            itemRef: $("#ItemRef").val(),
                            detailstr: detailstr,
                            PageIndex: $("#pc2").val(),
                            Type: Type
                        },
                        success: function (data) {
                            $("#TotalPageCount2").html(data.pageCount);
                            $("#PageTotalCount2").val(data.pageCount);
                            var html = "";
                            if (data.table.length == 0) {
                                $("#labtxt").html("Quantity Submit Err");
                                showDiv();
                                return;
                            }
                            var QtyTotal = 0;
                            $.each(JSON.parse(data.table), function (index, item) {
                                QtyTotal += parseInt(item["OrderQty"]);
                                html += "<tr>";
                                html += "<td>" + item["PO_Number"] + "</td>";
                                html += "<td>" + item["Department_not_used"] + item["Family"] + item["Bar"] + "</td>";
                                html += "<td>" + item["Size_Field_not_used"] + "</td>";
                                html += "<td>" + item["OrderQty"] + "</td>";
                                html += "<td><span class='glyphicon glyphicon-ok' style='color:red;'></span></td>";
                                html += "</tr>";
                            })
                            html += "<tr><td colspan='2'></td><td>Total:</td><td>" + QtyTotal + "</td><td></td></tr>";
                            $("#page2-OrderDetail2").html(html);


                            $("#OriTable").hide();
                            $("#OriTable2").show();
                            $("#OriTable2FY").show();
                            if (Type == "Next") {
                                $("#NoSizeCart").show();

                                $("#HeadTable").hide();
                                $("#Page1-ButtonList").hide();
                                $("#CartImgList").hide();
                                $("[name='qtybtn']").attr("disabled", "disabled");
                                $("[name='Qty']").attr("disabled", "disabled");
                                $("[name = 'applybtn']").attr("disabled", "disabled");
                                $("[name='bcSel']").attr("disabled", "disabled");

                                hideloading()
                            } else if (Type == "BtnEditCompostion") {
                                $("#FiberAndCategory").show();

                                $("#HeadTable").hide();
                                $("#Page1-ButtonList").hide();
                                $("#CartImgList").hide();
                                $("[name='qtybtn']").attr("disabled", "disabled");
                                $("[name='Qty']").attr("disabled", "disabled");
                                $("[name = 'applybtn']").attr("disabled", "disabled");
                                $("[name='bcSel']").attr("disabled", "disabled");
                                hideloading()
                            }
                            document.body.scrollTop = 0;
                            hideloading()
                        }
                    })
                } else {
                    hideloading()
                    $("#labtxt").html(Result.message);
                    showDiv();
                    return;
                }

            }
        })


    }

        //洗标部分
    function funChangeCate(obj, index) {
        if (index == 1) {
            if (obj.value != "") {
                $("#Cate2").prop("disabled", false)
                $("#Cate3").prop("disabled", false)
            } else {
                $("#Cate2").attr("disabled", "disabled")
                $("#Cate3").attr("disabled", "disabled")
                $("#Clearcompositions").trigger("click");
            }
            return;
        }
        if (obj.value != "") {
            var count = 0;
            $(".Cate").each(function (index) {
                if (obj.value == this.value) {
                    count++;
                }
            })
            if (count > 1) {
                $("#labtxt").html("The Category Has Been Existe");
                obj.value = "";
                showDiv();
                return;
            }
            $(".fiber" + index).removeAttr("disabled")
            $(".Per" + index).removeAttr("disabled");
        } else {
            $(".fiber" + index).val("");
            $(".fiber" + index).attr("disabled", "disabled")
            $(".Per" + index).val("0");
            $(".Per" + index).attr("disabled", "disabled");
        }
    }
    function FunChangeFiber(obj, index, OriIndex) {
        if (obj.value == "" || obj.value == null) {
            $("#Origin" + OriIndex).val("")
            $("#Origin" + OriIndex).prop("disabled", true)
            return;
        }
        $("#Origin" + OriIndex).prop("disabled", false)
        var count = 0;
        $(".fiber" + index).each(function (index) {
            if (obj.value == this.value) {
                count++;
            }
        })
        if (count > 1) {
            $("#labtxt").html("The Fiber Has Been Existe");
            obj.value = "";
            showDiv();
            return;
        }
    }
    function FunChangeWashInstructions(obj, imgname) {
        var imgobj = document.getElementById(imgname);
        var symbol = $(obj.selectedOptions).attr("symbol")
        $("#EciCustCode").val("");
        if (symbol.length > 0) {
            $(imgobj).attr("src", "../eciWashImg/" + symbol.split('⊥')[1] + ".jpg")
            $(imgobj).attr("sym", symbol.split('⊥')[0]);
        } else {
            $(imgobj).attr("src", "")
            $(imgobj).attr("sym", "");
        }
    }


        //验证数据
    function FunCheckData() {
        if ($("#Madein").val() == "") {
            $("#labtxt").html("Please Select Made In");
            showDiv();
            return false;
        }

        if ($("#Cate1").val() != "" || $("#Cate2").val() != "" || $("#Cate3").val() != "") {
            var hasFiber = "";
            $(".fiber").each(function (e) {
                if (this.value != "") {
                    hasFiber = "YES";
                }
            })
            if (hasFiber != "YES") {
                $("#labtxt").html("Please Select Fiber");
                showDiv();
                return false;
            }
        }
        else if ($("#Cate1").val() == "" && $("#Fiber1").val() == "") {
            $("#labtxt").html("Please Select Fiber");
            showDiv();
            return false;
        }
        for (var i = 1; i < 9; i++) {
            if ((($("#Per" + i).val() != "0" && $("#Fiber" + i).val() == "") || ($("#Per" + i).val() == "0" && $("#Fiber" + i).val() != "")) && $("#Per" + i).val() != "") {
                $("#labtxt").html("Please Check The Fiber");
                showDiv();
                return false;
            }
        }
        var TotalPer = 0;
        for (var i = 1; i < 4; i++) {
            TotalPer = 0;
            $(".Per" + i).each(function () {
                if (this.value == null || this.value == "") {
                    this.value = 0;
                }
                TotalPer += parseInt(this.value);
            })
            if ((TotalPer / 100 == 1 && TotalPer % 100 == 0) || TotalPer / 100 == 0) {
            } else {
                $("#labtxt").html("Please Check The Percent");
                showDiv();
                return false;
            }
        }
        return true;
    }

        //返回主界面
    function FunReturnToMainPage() {
        $("#page1").show();
        $("#OrderQuery").show();
        $("#page2").hide();
        $("#txtOrder_Number").val("");
        $("#Detail-Page2").hide();
        //调用OriOrderQuery.JS的查询订单的方法
        QueryOriOrder();
        document.body.scrollTop = 0;
    }



    function hideimg() {
        var element = document.getElementById("divimgpreview");
        element.style.display = "none";
        document.getElementById("imgpreview").src = "";
    }
    function showimg(obj) {
        var producturl = $(obj).attr("src");
        var element = document.getElementById("divimgpreview");
        document.getElementById("imgpreview").src = producturl && producturl.replace('/small-img', '');
        var intX = window.event.clientX;
        var intY = window.event.clientY;
        var sTop = document.body.scrollTop + document.documentElement.scrollTop;
        var divimgx = $("#divimgpreview").innerWidth();
        var divimgy = $("#divimgpreview").innerHeight();
        $('#divimgpreview').css("left", intX + 20 + "px");
        $('#divimgpreview').css("top", intY - divimgy / 2 + sTop + "px");
        $('#divimgpreview').show();

    }
