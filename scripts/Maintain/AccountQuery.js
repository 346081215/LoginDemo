$(function () {
    $("#btnSearch").click(function () {
        $("#nowpage").val(1);
        $("#pc").val(1);
        if ($("#Brandid").val().length == 0) {
            $("#labtxt").html("Please select a Brand");
            showDiv();
            return;
        }
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

    $('#PageIndex1').click(function () {
        document.getElementById("pc1").value = 1;
        document.getElementById("nowpage1").value = 1;
        funModifyRecord(Customerlog);
    });
    $('#Pageup1').click(function () {
        var nowpage = document.getElementById("nowpage1").value;
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) > 1) {
            newpage = parseInt(nowpage) - 1;
            document.getElementById("pc1").value = newpage;
            document.getElementById("nowpage1").value = newpage;
            funModifyRecord(Customerlog);
        }
    });
    $('#Pagewown1').click(function () {
        var nowpage = document.getElementById("nowpage1").value;
        var maxpage = parseInt(document.getElementById("PageTotalCount1").value);
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) < maxpage) newpage = parseInt(nowpage) + 1;
        document.getElementById("pc1").value = newpage;
        document.getElementById("nowpage1").value = newpage;
        funModifyRecord(Customerlog);
    });
    $('#PageLast1').click(function () {
        var maxpage = parseInt(document.getElementById("PageTotalCount1").value);
        document.getElementById("pc1").value = maxpage;
        document.getElementById("nowpage1").value = maxpage;
        funModifyRecord(Customerlog);
    });
    $('#PageGO1').click(function () {
        var nowpage = parseInt(document.getElementById("nowpage1").value);
        var maxpage = parseInt(document.getElementById("PageTotalCount1").value) + 1;
        if (nowpage > 0 && nowpage < maxpage) {
            document.getElementById("pc1").value = document.getElementById("nowpage1").value;
            funModifyRecord(Customerlog);
        }
        else {

            $("#labtxt").html("wrong page no.");
            showDiv();
            document.getElementById("nowpage1").value = 1;
        }
    });
    $("#nowpage1").keyup(function () {
        var t = $("#nowpage1").val();
        if (isNaN(t)) {
            $("#labtxt").html("wrong page no.");
            showDiv();
            document.getElementById("nowpage1").value = 1;
        }
    });

    $("#step,#ReturnIndex").click(function () {
        $("#Query").slideDown();
        $("#Query-Results").css("display", "none");
        $("#step1").css("display", "none");
        $("#step").removeClass('gray-em');
        $("#step").addClass('red-em');
        $("#step1").css("display", "none");
        $("#EditInfor").css("display", "none");
        $("#EditAccountBillto").css("display", "none");
        $("#step4").css("display", "none");
        $("#step2").css("display", "none");
        $("#step3").removeClass("red-em");
        $("#step3").addClass("gray-em");
        $("#step3").css("display", "none");
        $("#step5").css("display", "none");
        $("#Billto-Results").css("display", "none");
        $("#Shipto-Results").css("display", "none");
        $("#EditAccountShipto").css("display", "none");
        $("#LogQuery").css("display", "none");
        $("#SbuCustomer").css("display","none");
    });
    $("#step1,#ReturnResults").click(function () {
        $("#EditInfor").css("display", "none");
        $("#Query-Results").slideDown();
        $("#step2").css("display", "none");
        $("#step1").removeClass('gray-em');
        $("#step1").addClass('red-em');
        $("#EditAccountBillto").css("display", "none");
        $("#step4").css("display", "none");
        $("#EditAccountShipto").css("display", "none");
        $("#AccountPrintShop").css("display", "none");
        $("#SbuCustomer").css("display", "none");
        GetOrder();
    });
    $("#step2,#BilltoReturn,#EditShiptoReturn,#AddNewShiptoReturn").click(function () {
        $("#EditAccountBillto").css("dispaly", "none");
        $("#EditInfor").slideDown();
        $("#step4").css("display", "none");
        $("#step2").removeClass('gray-em');
        $("#step2").addClass('red-em');
        $("#EditAccountBillto").css("display", "none");
        $("#step3").css("display", "none");
        $("#EditAccountShipto").css("display", "none");
        var CustomerId = $("#AddBillto").val();
        $.post("/Maintain/AccountEdit", CustomerId, function (data) {
            if (data) {
                $("#Country").empty();
                $("#DefaultPrintshop").empty();
                $("#Currency").empty();
                $("#BilltoAdd").empty();
                $("#ShiptoAdd").empty();
                $("#ParentCustomer").empty();
                $("#EBtCurrency").empty();
                $("#Payment").empty();
                var sTrHtml = "";
                $("#CustomerNameEdit").val(data["AccountEdit"][0].CustomerName);
                $("#CustomerCodeEdit").val(data["AccountEdit"][0].CustomerCode);
                $("#VendorID").val(data["AccountEdit"][0].VendorID);
                $("#TelEdit").val(data["AccountEdit"][0].Tel);
                $("#ContactsEdit").val(data["AccountEdit"][0].Contacts);
                $("#ERPTemplet").val(data["AccountEdit"][0].TemplateNumber);
                $("#BankACC").val(data["AccountEdit"][0].BankAccount);
                $("#Address").val(data["AccountEdit"][0].Address);
                $("#CusBrand").val(data["AccountEdit"][0].Brand);
                $("#Tax").val(data["AccountEdit"][0].Tax);
                $("#Fax").val(data["AccountEdit"][0].Fax);
                $("#Email").val(data["AccountEdit"][0].Email);
                $("#CustomerId").val(data["AccountEdit"][0].CustomerId);
                $.each(data.CountryList, function (i, item) {
                    var Countrylist = "";
                    Countrylist = "<option value='" + item.Value + "'>" + item.Text + "</option>";
                    $("#Country").append(Countrylist);
                })
                $.each(data.PrintShopList, function (i, item) {
                    var PrintShopList = "";
                    PrintShopList = "<option value='" + item.Value + "'>" + item.Text + "</option>";
                    $("#DefaultPrintshop").append(PrintShopList);
                });
                $.each(data.CurrencyList, function (i, item) {
                    var CurrencyList = "";
                    CurrencyList = "<option value='" + item.Value + "'>" + item.Text + "</option>";
                    $("#Currency").append(CurrencyList);
                });

                $.each(data.ParentCustomerList, function (i, item) {
                    var ParentCustomerList = "";
                    ParentCustomerList = "<option value='" + item.Value + "'>" + item.Text + "</option>";
                    $("#ParentCustomer").append(ParentCustomerList);
                });
                $.each(data.PaymentList, function (i, item) {
                    var PaymentList = "";
                    PaymentList = "<option value='" + item.Value + "'>" + item.Text + "</option>";
                    $("#Payment").append(PaymentList);
                });

                $.each(data.CurrencyList, function (i, item) {
                    var CurrencyList = "";
                    CurrencyList = "<option value='" + item.Value + "'>" + item.Text + "</option>";
                    $("#EBtCurrency").append(CurrencyList);
                });

                $("#DefaultPrintshop").val(data.PrintShops);
                $("#Payment").val(data.PayMents);
                $("#Country").val(data.Countrycodes);
                $("#Currency").val(data.Currencys);
                $("#ParentCustomer").val(data.ParentCustomer);

                $.each(data["Billto"], function (i, item) {
                    sTrHtml += "<tr>";
                    sTrHtml += "<td class=center>" + item.Seq + "</td>"
                    sTrHtml += "<td class=center>" + item.CustomerCode + "</td>";
                    sTrHtml += "<td class=center>" + item.CustomerName + "</td>";
                    sTrHtml += "<td class=center>" + item.Address + "</td>";
                    sTrHtml += " <td class=center><button type=button id=EditBillto name=Edit class='btn btn-default'  onclick='return funcEditBilltoBind(this)' value='" + item.Billtoid + "'>Edit</button><button type=button id=DeleteBillto name=DeleteBillto class='btn btn-default' onclick='return funcDeleteBillto(this)' value='" + item.ID + "'>Delete</button><button type=button id=BilltoHiden name=BilltoHiden class='btn btn-default' style=display:none  value='" + item.Billtoid + "'>Edit</button></td>";
                    sTrHtml += "</tr>";

                })
                $("#Billto tbody").html(sTrHtml);

                var BilltoAddList = "";
                $.each(data.BilltoAddList, function (i, item) {

                    BilltoAddList += "<option value='" + item.Value + "'>" + item.Text + "</option>";
                });
                $("#BilltoAdd").html(BilltoAddList);
                var Html = "";
                $.each(data["Shipto"], function (i, item) {
                    Html += "<tr>";
                    Html += "<td class=center>" + item.Seq + "</td>"
                    Html += "<td class=center>" + item.CustomerName + "</td>";
                    Html += "<td class=center>" + item.CustomerCode + "</td>";
                    Html += "<td class=center>" + item.Address + "</td>"
                    Html += " <td class=center><button type=button id=EditShipto name=Edit class='btn btn-default' onclick='return funcEditShiptoBind(this)' value='" + item.ShipID + ";" + item.CustomerName + ";" + item.CustomerCode + ";" + item.Address + "'>Edit</button><button type=button id=DeleteShipto name=DeleteShipto class='btn btn-default' onclick='return funcDeleteShipto(this)' value='" + item.ID + "'>Delete</button><button type=button id=ShiptoHiden name=ShiptoHiden class='btn btn-default' style=display:none  value='" + item.ShipID + "'>Edit</button></td>";
                    Html += "</tr>";

                })
                $("#ShipTo tbody").html(Html);
                var ShiptoAddList = "";
                $.each(data.ShiptoAddList, function (i, item) {

                    ShiptoAddList += "<option value='" + item.Value + "'>" + item.Text + "</option>";

                });
                $("#ShiptoAdd").html(ShiptoAddList);
            }
            $("#AddShipTo").val(CustomerId);
            $("#AddBillto").val(CustomerId);
            //$("#CustomerNameEdit").attr("readonly", "readonly");
            //$("#CustomerCodeEdit").attr("readonly", "readonly");
            $("#CusBrand").attr("readonly", "readonly");
            $("#CustomerId").attr("readonly", "readonly");
            $("#Query-Results").css("display", "none");
            $("#EditInfor").slideDown();
            $("#step1").removeClass('red-em');
            $("#step1").addClass('gray-em');
            $("#step2").removeClass('gray-em');
            $("#step2").addClass('red-em');
            $("#step2").removeAttr("style");

            $("#AddNewBillto").val(CustomerId);


        });
    });
    $("#OpenPrinshopSet").click(function () {
        var aaa = $("#APrintShoped").html();
        $("#SbuCustomer").css("display", "none");

        var CustomerId = $("#CustomerId").val();
        var posturl = "/Maintain/AccountPirintShop";
        $.post(posturl, {
            CustomerId: CustomerId
        }, function (result) {
            //debugger;
            var obj = jQuery.parseJSON(result.AccountPirintShop);
            if (obj) {
                var shtml = "";
                var intSeq = 0;
                var PrintShopId_ = result.CustomerPrintShop
                $.each(obj, function (i, item) {
                    intSeq++;
                    shtml += "<tr>";
                    if (PrintShopId_.indexOf(item.PrintShopId) > 0) {
                        shtml += "<td style='width:60px;' class='center'><input id='result' type='hidden' value='" + item.PrintShopId + "'><input id='checkbox' type='checkbox' checked='checked'/></td>";
                    }
                    else {
                        shtml += "<td style='width:60px;' class='center'><input id='result' type='hidden' value='" + item.PrintShopId + "'><input id='checkbox' type='checkbox'/></td>";
                    }

                    shtml += "<td class='center'>" + item.PrintShopId + "</td>";
                    shtml += "<td class='center'>" + item.PrintShop + "</td>";
                    shtml += "</tr>";
                });
                $("#APrintShoped").html(shtml);
            }
        })


        //var posturls = "/Maintain/GetCustomerPrintShop";
        //$.post(posturls, {
        //    CustomerId: CustomerId
        //}, function (res) {
        //    $strDates = res.substring(1);
        //    debugger;
        //    var strDates = $strDates.split("^");
        //    $("#GetPrintShoped input:hidden").each(function () {
        //        for (var i = 0; i < strDates.length; i++) {
        //            heckPrintshop = $(this).attr("value");
        //            if (heckPrintshop == strDates[i]) {
        //                $(this).parents("tr").find("#checkbox").attr('checked', true);
        //            }
        //        }
        //    })
        //})
        $("#AccountPrintShop").css("display", "block");
    })
    $("#EditAccountPrintShop").click(function () {
        var data = "";
        var datas = "";
        $("input:checkbox").each(function (i, item) {
            var res = $(this).prop("checked");
            if (res) {
                var productid = ($(this).parents("tr").find("#result").val());
                //alert(productid);
                data += "^" + productid;
                datas += "," + "'" + productid + "'";
            }
        })

            $strDates = data.substring(1);
            strDates = datas.substring(1);
            var CustomerId =$("#CustomerId").val();
            var posturl = "/Maintain/EditCustomerPrintShop";
            var url = "/Maintain/UpdateTheCurrency";
            $.post(posturl, {
                productId: $strDates, Delproduct: strDates, CustomerId: CustomerId
            }, function (res) {
                if (res == 1) {
                    $("#labtxt").html("Success!");
                    $("#AccountPrintShop").css("display","none");
                    showDiv();
                    debugger;
                    $("#Currency").empty();
                    $.post(url, { CustomerId: CustomerId }, function (data)
                    {

                        $.each(data.CurrencyList, function (i, item) {
                            if (data.CurrencyList != null) {
                                    var CurrencyList = "";

                                    if (item.Disabled == false) {
                                        $('#Currency').append("<option value='" + item.Value + "' style='color:black; font-weight:700'>" + item.Text + "</option>");
                                    }
                                    else {
                                        $('#Currency').append("<option value='" + item.Value + "' disabled='disabled' >" + item.Text + "</option>");
                                    }
                                    $("#Currency").append(CurrencyList);
                            }
                        });

                    });

                }
                else {
                    $("#labtxt").html("Error!");
                    showDiv();
                    return;
                }
            })



    })
    $("#Return").click(function () {
        $("#AccountPrintShop").css("display", "none");
    });
    $("#LogQueryReturn").click(function () {
        $("#LogQuery").css("display", "none");
    });
    
    //$("#DefaultPrintshop").change(function () {
    //    $("#Currency").empty();
    //    DefaultPrintshop = $("#DefaultPrintshop").val();
    //    if (DefaultPrintshop == "")
    //    {
    //        $("#Currency").empty();
    //        $('#Currency').append("<option value=''>" + "--Please Select--" + "</option>");
    //        return false;
    //    }
    //    else
    //    {
           
    //        $.post("/Maintain/GetCurrencyByPrintshop", { DefaultPrintshop: DefaultPrintshop }, function (data)
    //        {
    //            if (data.FunStatus == "0")
    //            {
    //                $("#labtxt").html("该PrintShop未设置交易币别.");
    //                $('#Currency').append("<option value=''>" + "--Please Select--" + "</option>");
    //                showDiv();
    //                return;
    //            }
    //            else
    //            {
    //                $.each(data.CurrencyList, function (i, item)
    //                {

    //                    var CurrencyList = "";

    //                    if (item.Disabled == false) {
    //                        $('#Currency').append("<option value='" + item.Value + "' style='color:black; font-weight:700'>" + item.Text + "</option>");
    //                    }
    //                    else {
    //                        $('#Currency').append("<option value='" + item.Value + "' disabled='disabled' >" + item.Text + "</option>");
    //                    }
    //                    $("#Currency").append(CurrencyList);
    //                });
    //            }
    //        });
    //    }

    //});
});
function GetOrder() {
    if ($("#Brandid").val() == "PR001") {
        $("#btnExcel").css("display", "none");
    } else {
        $("#btnExcel").css("display", "block");
    }
    $("#Billto-Results").css("display", "none");
    $("#Shipto-Results").css("display", "none");
    $("#LogQuery").css("display", "none");
    var QueryData =
        {
            Brand: $("#Brandid").val(),
            AccountNumber: $("#AccountNumber").val(),
            AccountName: $("#AccountName").val(),
            Page: document.getElementById("nowpage").value
        }
    $.post("/Maintain/AccountQueryResults", QueryData, function (data) {

        if (data) {
            var html = "";
            $.each(data, function (i, item) {
                html += "<tr>";
                html += "<td class='center'>" + item.Seq + "</td>";
                html += "<td class='center'>" + item.CustomerId + "</td>";
                html += "<td class='center'>" + item.AccountNumber + "</td>";
                html += "<td class='center'>" + item.VendorID + "</td>";
                html += "<td class='center'>" + item.AccountName + "</td>";
                html += "<td class='center'>" + item.AccountContact + "</td>";
                html += "<td class='center'>" + item.AccountTelephone + "</td>";
                html += "<td class='center'><button type=button id=Edit name=Edit class='btn btn-default' style='margin-right:5px;' onclick='return funcEdit(this)' value='" + item.CustomerId + "'>Edit</button><button type=button id=BilltoQuery name=BilltoQuery class='btn btn-default' style='margin-right:5px;' onclick='return EditBilltoQuery(this)' value='" + item.CustomerId + "'>AddBillto</button><button type=button id=ShiptoQuery name=ShiptoQuery class='btn btn-default' style='margin-right:5px;' onclick='return EditShiptoQuery(this)' value='" + item.CustomerId + "'>AddShipto</button><button type=button id=ModifyRecord name=ModifyRecord class='btn btn-default'  onclick='return funModifyRecord(this)' value='" + item.CustomerId + "'>Edit History</button></td>";
                html += "</tr>";
            })
            if (html == "") {
                $("#OrderDetail tbody").html("");
                $("#Query").css("display", "none");
                $("#Query-Results").slideDown();
                $("#step").removeClass('red-em');
                $("#step").addClass('gray-em');
                $("#step1").removeClass('gray-em');
                $("#step1").addClass('red-em');
                $("#step1").removeAttr("style");
            }
            else {
                $("#OrderDetail tbody").html(html);
                $("#TotalPageCount").html(data[0].TotalPageCount);
                $("#PageTotalCount").val(data[0].TotalPageCount);
                $("#Query").css("display", "none");
                $("#Query-Results").slideDown();
                $("#step").removeClass('red-em');
                $("#step").addClass('gray-em');
                $("#step1").removeClass('gray-em');
                $("#step1").addClass('red-em');
                $("#step1").removeAttr("style");

            }


        }
    });
}
function funcEdit(obj) {

    $("#To").css("display", "block");
    $("#SaveAt").removeAttr("style");
    $("#AddNewAt").css("display", "none");
    $("#Billto-Results").css("display", "none");
    $("#Shipto-Results").css("display", "none");
    $("#OpenPrinshopSet").css("display", "block");
    $("#LogQuery").css("display", "none");
    CustomerId = obj.value;
    $("#SaveAccount").val(CustomerId);
    $("#Currency").empty();


    $.post("/Maintain/AccountEdit", CustomerId, function (data) {
        if (data) {
            $("#Country").empty();
            $("#DefaultPrintshop").empty();
            $("#Currency").empty();
            $("#BilltoAdd").empty();
            $("#ShiptoAdd").empty();
            $("#ParentCustomer").empty();
            $("#EBtCurrency").empty();
            $("#Payment").empty();
            var sTrHtml = "";
            $("#CustomerNameEdit").val(data["AccountEdit"][0].CustomerName);
            $("#CustomerCodeEdit").val(data["AccountEdit"][0].CustomerCode);
            $("#VendorID").val(data["AccountEdit"][0].VendorID);
            $("#TelEdit").val(data["AccountEdit"][0].Tel);
            $("#ContactsEdit").val(data["AccountEdit"][0].Contacts);
            $("#ERPTemplet").val(data["AccountEdit"][0].TemplateNumber);
            $("#BankACC").val(data["AccountEdit"][0].BankAccount);
            $("#Address").val(data["AccountEdit"][0].Address);
            $("#CusBrand").val(data["AccountEdit"][0].Brand);
            $("#Tax").val(data["AccountEdit"][0].Tax);
            $("#Fax").val(data["AccountEdit"][0].Fax);
            $("#Email").val(data["AccountEdit"][0].Email);
            $("#CustomerId").val(data["AccountEdit"][0].CustomerId);
            if (data.CountryList != null) {
                $.each(data.CountryList, function (i, item) {
                    var Countrylist = "";
                    Countrylist = "<option value='" + item.Value + "'>" + item.Text + "</option>";
                    $("#Country").append(Countrylist);
                })
            }
            if (data.PrintShopList != null) {
                $.each(data.PrintShopList, function (i, item) {
                    var PrintShopList = "";
                    if (item.Disabled == false) {
                        $('#DefaultPrintshop').append("<option value='" + item.Value + "' style='color:black; font-weight:700'>" + item.Text + "</option>");
                    }
                    else {
                        $('#DefaultPrintshop').append("<option value='" + item.Value + "' disabled='disabled' >" + item.Text + "</option>");
                    }

                    $("#DefaultPrintshop").append(PrintShopList);
                });
            }
            if (data.ParentCustomerList != null) {
                $.each(data.ParentCustomerList, function (i, item) {
                    var ParentCustomerList = "";
                    ParentCustomerList = "<option value='" + item.Value + "'>" + item.Text + "</option>";
                    $("#ParentCustomer").append(ParentCustomerList);
                });
            }

            if (data.PaymentList != null) {
                $.each(data.PaymentList, function (i, item) {
                    var PaymentList = "";
                    PaymentList = "<option value='" + item.Value + "'>" + item.Text + "</option>";
                    $("#Payment").append(PaymentList);
                });

            }
            $("#Currency").empty();

            if (data.CurrencyList != null) {
                $.each(data.CurrencyList, function (i, item) {

                    var CurrencyList = "";

                    if (item.Disabled == false) {
                        $('#Currency').append("<option value='" + item.Value + "' style='color:black; font-weight:700'>" + item.Text + "</option>");
                    }
                    else {
                        $('#Currency').append("<option value='" + item.Value + "' disabled='disabled' >" + item.Text + "</option>");
                    }
                    $("#Currency").append(CurrencyList);
                });
            }
            $("#Payment").val(data.PayMents);
            $("#Country").val(data.Countrycodes);
            $("#Currency").val(data.Currencys);
            $("#ParentCustomer").val(data.ParentCustomer);
            $("#DefaultPrintshop").val(data.PrintShops);




            $.each(data["Billto"], function (i, item) {
                sTrHtml += "<tr>";
                sTrHtml += "<td class=center>" + item.Seq + "</td>"
                sTrHtml += "<td class=center>" + item.CustomerCode + "</td>";
                sTrHtml += "<td class=center>" + item.CustomerName + "</td>";
                sTrHtml += "<td class=center>" + item.Address + "</td>";
                sTrHtml += " <td class=center><button type=button id=EditBillto name=Edit class='btn btn-default' onclick='return funcEditBilltoBind(this)' value='" + item.Billtoid + "'>Edit</button><button type=button id=DeleteBillto name=DeleteBillto class='btn btn-default' onclick='return funcDeleteBillto(this)' value='" + item.ID + "'>Delete</button><button type=button id=BilltoHiden name=BilltoHiden class='btn btn-default' style=display:none  value='" + item.Billtoid + "'>Edit</button></td>";
                sTrHtml += "</tr>";

            })
            $("#Billto tbody").html(sTrHtml);

            var BilltoAddList = "";
            $.each(data.BilltoAddList, function (i, item) {

                BilltoAddList += "<option value='" + item.Value + "'>" + item.Text + "</option>";
            });
            $("#BilltoAdd").html(BilltoAddList);
            var Html = "";
            $.each(data["Shipto"], function (i, item) {
                Html += "<tr>";
                Html += "<td class=center>" + item.Seq + "</td>"
                Html += "<td class=center>" + item.CustomerName + "</td>";
                Html += "<td class=center>" + item.CustomerCode + "</td>";
                Html += "<td class=center>" + item.Address + "</td>"
                Html += " <td class=center><button type=button id=EditShipto name=Edit class='btn btn-default' onclick='return funcEditShiptoBind(this)' value='" + item.CustomerName + ";" + item.CustomerCode + ";" + item.Address + ";" + item.ShipID + "'>Edit</button><button type=button id=DeleteShipto name=DeleteShipto class='btn btn-default' onclick='return funcDeleteShipto(this)' value='" + item.ID + "'>Delete</button><button type=button id=ShiptoHiden name=ShiptoHiden class='btn btn-default' style=display:none  value='" + item.ShipID + "'>Edit</button></td>";
                Html += "</tr>";

            })
            $("#ShipTo tbody").html(Html);
            var ShiptoAddList = "";
            $.each(data.ShiptoAddList, function (i, item) {

                ShiptoAddList += "<option value='" + item.Value + "'>" + item.Text + "</option>";

            });
            $("#ShiptoAdd").html(ShiptoAddList);
        }
        $("#AddShipTo").val(CustomerId);
        $("#AddBillto").val(CustomerId);
        //$("#CustomerNameEdit").attr("readonly", "readonly");
        //$("#CustomerCodeEdit").attr("readonly", "readonly");
        $("#CusBrand").attr("readonly", "readonly");
        $("#CustomerId").attr("readonly", "readonly");
        $("#Query-Results").css("display", "none");
        $("#EditInfor").slideDown();
        $("#step1").removeClass('red-em');
        $("#step1").addClass('gray-em');
        $("#step2").removeClass('gray-em');
        $("#step2").addClass('red-em');
        $("#step2").removeAttr("style");

        $("#AddNewBillto").val(CustomerId);


    });
}
function funCustomerName() {
    var CustomerId = $("#CustomerId").val();
    var parentCustomerId = $("#ParentCustomer").val();
    var data_ = {
        CustomerId: CustomerId,
        parentCustomerId: parentCustomerId
    }
    $.post("/Maintain/Sel_SubCustomer", data_, function (data) {
        var html = "";
        if (data.Funstatus == "0") {
            alert(data.Err);
        }
        else {
            debugger;
            $.each(data.SubCustomerData, function (i, item) {
                html += "<select>";
                html += "<option value='" + item.Value + "'>" + item.Text + "</option>";
                html += "</select>";
            });
            $("#customername").html(html);
        }
    })
}

function funCreateSubCustomer() {
    $("#SbuCustomer").slideDown();
    funCustomerName();
    var CustomerId = $("#CustomerId").val();
    var data_ = {
        CustomerId: CustomerId
    }
    $.post("/Maintain/GritViewCustomer", data_, function (data) {
        var html = "";
        if (data.Funstatus == "0") {
            alert(data.Err);
        }
        else {
            debugger;
            $.each(data.SubCustomerData_, function (i, item) {
                html += "<tr>";
                html += "<td>" + item.CustomerId + "</td>";
                html += "<td>" + item.Name + "</td>";
                html += "<td class=center><button type=button id=DelCustomer name=DelCustomer class='btn btn-default' onclick='return funcDelCustomer(this)' value='" + item.CustomerId + "'>Delete</button></td>";
                html += "</tr>";
            });
            $("#SbuCustomerDetail").html(html);
        }
    })
}
function funcDelCustomer(obj) {
    debugger;
    var obj_value = obj.getAttribute("value");
    document.getElementById('SbuCustomerDetail').removeChild(obj.parentElement.parentElement);
}



function CheckTable() {
    var tbody = document.getElementById('SbuCustomerDetail');
    var trs = tbody.rows;
    var tmp = {};
    debugger;
    loop: for (var i = 0; i < trs.length; i++) {
        var tds = trs[i].cells;
        var html = tds[0].innerHTML.replace(/^\s+|\s+$/g, "");
        if (!tmp[html]) {
            tmp[html] = html;
        }
        else {
            alert("数据重复");
            //移除最后一列
            $("#SbuCustomerDetail").find("tr:last").remove();
            break;
        }
    }
};
$("#AddAccountSbuCustomer").click(function () {
    var per = [{
        value:$("#customername").val(),
        text:$("#customername").find("option:selected").text()
    }];
        if ($("#customername").val() == "") {
        alert("请选择需要添加的下级客户！");
        return false;
    }
    else {
        var CustomerId = $("#CustomerId").val();
        var customername = $("#customername").val();
        var Name = $("#customername").text();
        var data_ = {
            CustomerId: CustomerId,
            customername: customername,
        }
        var html = "";
        //debugger;
        var tbody = document.getElementById('SbuCustomerDetail');
        //检查table中是否有相同的数据

        for (var i = 0; i < per.length; i++) { //遍历一下json数据  
            var trow = getDataRow(per[i]); //定义一个方法,返回tr数据  
            tbody.appendChild(trow);
        }
        CheckTable();

    }
});

function getDataRow(h) {
    var row = document.createElement('tr'); //创建行  

    var idCell = document.createElement('td'); //创建第一列id  
    //idCell.innerHTML = h.id; //填充数据 
    idCell.innerHTML = h.value; //填充数据 
    row.appendChild(idCell); //加入行  ，下面类似  

    var nameCell = document.createElement('td');//创建第二列name  
    nameCell.innerHTML = h.text;
    row.appendChild(nameCell);

    //到这里，json中的数据已经添加到表格中，下面为每行末尾添加删除按钮  

    var delCell = document.createElement('td');//创建第四列，操作列  
    row.appendChild(delCell);
    var btnDel = document.createElement('input'); //创建一个input控件  
    btnDel.setAttribute('type', 'button'); //type="button"  
    btnDel.setAttribute('value', 'Delete');
    btnDel.setAttribute("class", "btn btn-default");

    //删除操作  
    btnDel.onclick = function () {
        if (confirm("确定删除这一行嘛？")) {
            //找到按钮所在行的节点，然后删掉这一行  
            this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
            //btnDel - td - tr - tbody - 删除(tr)  
            //刷新网页还原。实际操作中，还要删除数据库中数据，实现真正删除  
        }
    }
    delCell.appendChild(btnDel);  //把删除按钮加入td，别忘了  

    return row; //返回tr数据      
}
//保存表格中的数据，存放到数据库中的ParentCustomerId字段中
$("#SaveAccountSbuCustomer").click(function () {
    SaveCustomer();
    //alert("添加下级客户成功！");
});
function SaveCustomer() {
    debugger;
    var tb = document.getElementById("SbuCustomerDetail");    //获取table对像
    var rows = tb.rows;
    var numC = "";
    for (var i = 0; i < rows.length; i++) {    //--循环所有的行
        var cells = rows[i].cells;
        for (var j = 0; j < cells.length - 2; j++) {   //--循环所有的列
            //alert(cells[j].innerHTML);
            if (cells[j].innerHTML == "") {
                if (confirm("确定不添加下级客户吗？")) {
                    $("#SbuCustomer").css("display", "none");
                    return false;
                }
            }
            else {
                debugger;
                var customername = cells[j].innerHTML;
                numC += customername + '^';
                var CustomerId = $("#CustomerId").val();
            }
        }
    }
    var _dataa = {
        customername: numC,
        CustomerId: CustomerId
    }
    $.post("/Maintain/InsertCustomer", _dataa, function (data) {
        if (data.Funstatus == "0") {
            alert(data.msg);
        }
        else {
            $("#SbuCustomer").css("display", "none");
            //$("#APrintShoped").css("display","none");
        }
    })
}
$("#Return_1").click(function () {
    $("#SbuCustomer").css("display", "none");
});
function funAddBillto() {

    BilltoAdd = $("#BilltoAdd option:selected").val();
    Accountid = $("#BilltoAdd option:selected").attr("Value");
    if (BilltoAdd == "") {


        $("#labtxt").html("Please select a bill account then click add button.");
        showDiv();
        return false;
    }
    var arr = new Array();
    $("#Billto tr").each(function () {
        var Billtoid = $(this).find("#BilltoHiden").val();
        arr.push(Billtoid);

    });
    var state = $.inArray(BilltoAdd, arr);
    if (state > 0) {

        $("#labtxt").html("The bill account has already belong to the order account, no need add again.");
        showDiv();
    }
    else {
        var sTrHtml = "";
        Account = ($("#AddBillto").val());
        data = Account + " " + BilltoAdd;
        var urlPost = "/Maintain/AddBillto/" + data;
        $.post(urlPost, data, function (data, status) {
            if (status == "success") {

                $.each(data["Billto"], function (i, item) {
                    sTrHtml += "<tr>";
                    sTrHtml += "<td class=center>" + item.Seq + "</td>"
                    sTrHtml += "<td class=center>" + item.CustomerCode + "</td>";
                    sTrHtml += "<td class=center>" + item.CustomerName + "</td>";
                    sTrHtml += "<td class=center>" + item.Address + "</td>";
                    sTrHtml += " <td class=center><button type=button id=EditBillto name=Edit class='btn btn-default' onclick='return funcEditBilltoBind(this)' value='" + item.Billtoid + "'>Edit</button><button type=button id=DeleteBillto name=DeleteBillto class='btn btn-default' onclick='return funcDeleteBillto(this)' value='" + item.ID + "'>Delete</button><button type=button id=BilltoHiden name=BilltoHiden class='btn btn-default' style=display:none  value='" + item.Billtoid + "'>Edit</button></td>";
                    sTrHtml += "</tr>";
                });
                $("#Billto tbody").html(sTrHtml);
                console.log(sTrHtml);

            }
            else {


                $("#labtxt").html("fail");
                showDiv();
            }


        });
    }

}
function funcDeleteBillto(obj) {
    Billtoid = obj.value;
    CustomerId = ($("#AddBillto").val());
    data = Billtoid + " " + CustomerId;
    var sTrHtml = "";
    var urlPost = "/Maintain/DeleteBillto/" + data;
    $.post(urlPost, data, function (data, status) {
        if (data) {

            $.each(data["Billto"], function (i, item) {
                sTrHtml += "<tr>";
                sTrHtml += "<td class=center>" + item.Seq + "</td>"
                sTrHtml += "<td class=center>" + item.CustomerCode + "</td>";
                sTrHtml += "<td class=center>" + item.CustomerName + "</td>";
                sTrHtml += "<td class=center>" + item.Address + "</td>";
                sTrHtml += " <td class=center><button type=button id=EditBillto name=Edit class='btn btn-default' onclick='return funcEditBilltoBind(this)' value='" + item.Billtoid + "'>Edit</button><button type=button id=DeleteBillto name=DeleteBillto class='btn btn-default' onclick='return funcDeleteBillto(this)' value='" + item.ID + "'>Delete</button><button type=button id=BilltoHiden name=BilltoHiden class='btn btn-default' style=display:none  value='" + item.Billtoid + "'>Edit</button></td>";
                sTrHtml += "</tr>";

            })
            $("#Billto tbody").html(sTrHtml);
        }
    });
}
function funAddShipto(obj) {
    Aid = obj.value;
    ShiptoAdd = $("#ShiptoAdd option:selected").val();
    ShipAccountid = $("#ShiptoAdd option:selected").attr("Value");
    if (ShiptoAdd == "") {


        $("#labtxt").html("Please select a shipping account.then click add button.");
        showDiv();
        return false;
    }
    var arr = new Array();
    $("#ShipTo tr").each(function () {

        var Shiptoid = $(this).find("#ShiptoHiden").val();
        arr.push(Shiptoid);
    });
    var state = $.inArray(ShiptoAdd, arr);
    if (state > 0) {

        $("#labtxt").html("The shipping account has already belong to the account, no need to add.");
        showDiv();
    }
    else {
        var sTrHtml = "";
        Shipto = ($("#AddShipTo").val());
        data = Shipto + " " + ShiptoAdd;
        var urlPost = "/Maintain/AddShipto/" + data;
        $.post(urlPost, data, function (data, status) {
            if (status == "success") {

                $.each(data["Shipto"], function (i, item) {

                    sTrHtml += "<tr>";
                    sTrHtml += "<td class=center>" + item.Seq + "</td>"
                    sTrHtml += "<td class=center>" + item.CustomerName + "</td>";
                    sTrHtml += "<td class=center>" + item.CustomerCode + "</td>";
                    sTrHtml += "<td class=center>" + item.Address + "</td>"
                    sTrHtml += " <td class=center><button type=button id=EditShipto name=Edit class='btn btn-default' onclick='return funcEditShiptoBind(this)' value='" + item.ShipID + "'>Edit</button><button type=button id=DeleteShipto name=DeleteShipto class='btn btn-default' onclick='return funcDeleteShipto(this)' value='" + item.ID + "'>Delete</button><button type=button id=ShiptoHiden name=ShiptoHiden class='btn btn-default' style=display:none  value='" + item.ShipID + "'>Edit</button></td>";
                    sTrHtml += "</tr>";
                });
                $("#ShipTo tbody").html(sTrHtml);

            }
            else {

                $("#labtxt").html("fail");
                showDiv();
            }
        });
    }
}
function funcDeleteShipto(obj) {
    ShipToid = obj.value;
    CustomerId = $("#AddShipTo").val();
    data = ShipToid + " " + CustomerId;
    var urlPost = "/Maintain/DeleteShipto/" + data;
    var sTrHtml = "";
    $.post(urlPost, data, function (data, status) {
        if (data) {


            $.each(data["Shipto"], function (i, item) {

                sTrHtml += "<tr>";
                sTrHtml += "<td class=center>" + item.Seq + "</td>"
                sTrHtml += "<td class=center>" + item.CustomerName + "</td>";
                sTrHtml += "<td class=center>" + item.CustomerCode + "</td>";
                sTrHtml += "<td class=center>" + item.Address + "</td>"
                sTrHtml += " <td class=center><button type=button id=EditShipto name=Edit class='btn btn-default' onclick='return funcEditShiptoBind(this)' value='" + item.ShipID + "'>Edit</button><button type=button id=DeleteShipto name=DeleteShipto class='btn btn-default' onclick='return funcDeleteShipto(this)' value='" + item.ID + "'>Delete</button><button type=button id=ShiptoHiden name=ShiptoHiden class='btn btn-default' style=display:none  value='" + item.ShipID + "'>Edit</button></td>";
                sTrHtml += "</tr>";
            });
            $("#ShipTo tbody").html(sTrHtml);
        }
    })
}
function funSaveAccount(obj) {
    CustomerCodeEdit = $("#CustomerCodeEdit").val();
    if (CustomerCodeEdit == "") {

        $("#labtxt").html("The Customer# can not empty.");
        showDiv();
        return;
    }

    DefaultPrintshop = $("#DefaultPrintshop option:selected").val();
    if (DefaultPrintshop == "") {

        $("#labtxt").html("Please select a Printshop.");
        showDiv();
        return;
    }
    Currency = $("#Currency option:selected").val();
    CurrencyStatus = $("#Currency option:selected").attr("disabled");
    if (Currency == "" || Currency == undefined || CurrencyStatus == "disabled")
    {   
        $("#labtxt").html("Please select a Currency.");
        showDiv();
        return;
    }
    Country = $("Country option:selected").val();
    if (Country == "")
    {
        $("#labtxt").html("Please select a Country.");
        showDiv();
        return;
    }
    Payment = $("#Payment option:selected").val();
    if (Payment == "") {
        $("#labtxt").html("Please select a Payment.");
        showDiv();
        return;
    }

    Email = $("#Email").val();
    //if (Email == "") {
    //    $("#labtxt").html("The Email can not empty.");
    //    showDiv();
    //    return;
    //}
    //else
    //{
    //    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

    //    if (!reg.test(Email)) {


    //        $("#labtxt").html("The format of the Email address you input is not correct");
    //        showDiv();
    //        return;
    //    }
    //}

    Account = obj.value;
    var urlPost = "/Maintain/SaveAccount/" + Account;
    $.post(urlPost, encodeURIComponent($("form").serialize()), function (data, status) {
        if (data.FunStatus == "success") {
            if (data.load.FunStatus == "") {
                $("#labtxt").html("success");
                showDiv();
            }
            else {
                $("#labtxt").html("success!" + data.load.FunStatus);
                showDiv();

            }


        }
        else {

            $("#labtxt").html(data.FunStatus);
            showDiv();
        }
    })
}
function funAddNewAccount() {
    if ($("#Brandid").val().length == 0) {
        $("#labtxt").html("Please select a Brand");
        showDiv();
        return;
    }

    $("#step3").removeAttr("style");
    $("#Query").css("display", "none");
    $("#EditInfor").slideDown();
    $("#To").css("display", "none");
    $("#step").removeClass("red-em");
    $("#step").addClass("gray-em");
    $("#step3").removeClass("gray-em");
    $("#step3").addClass("red-em");
    $("#EditInfor :input").val("");
    $("#Country").empty();
    $("#DefaultPrintshop").empty();
    $("#ParentCustomer").empty();
    $("#Currency").empty();
    $("#Payment").empty();
    $("#SaveAt").css("display", "none");
    $("#AddNewAt").removeAttr("style");
    $("#CustomerCodeEdit").removeAttr("readonly");
    $("#CustomerNameEdit").removeAttr("readonly");
    //$("#CustomerId").removeAttr("readonly");
    var Brand = $("#Brandid").val();
    $("#OpenPrinshopSet").css("display", "none");
    var urlPost = "/Maintain/AddAccount/" + Brand;
    $.post(urlPost, function (orderdata) {
        $.each(orderdata.CountryList, function (i, item) {
            var Countrylist = "";
            Countrylist = "<option value='" + item.Value + "'>" + item.Text + "</option>";
            $("#Country").append(Countrylist);
        })
        $.each(orderdata.PrintShopList, function (i, item) {
            var PrintShopList = "";

            if (item.Disabled == false) {
                $('#DefaultPrintshop').append("<option value='" + item.Value + "' style='color:black; font-weight:700'>" + item.Text + "</option>");
            }
            else {
                $('#DefaultPrintshop').append("<option value='" + item.Value + "' disabled='disabled' >" + item.Text + "</option>");
            }
            $("#DefaultPrintshop").append(PrintShopList);
        });
        //$.each(orderdata.CurrencyList, function (i, item) {
        //    var CurrencyList = "";
        //    CurrencyList = "<option value='" + item.Value + "'>" + item.Text + "</option>";
        //    $("#Currency").append(CurrencyList);
        //});
        $.each(orderdata.CurrencyList, function (i, item) {
            if (orderdata.CurrencyList != null) {
                    var CurrencyList = "";

                    if (item.Disabled == false) {
                        $('#Currency').append("<option value='" + item.Value + "' style='color:black; font-weight:700'>" + item.Text + "</option>");
                    }
                    else {
                        $('#Currency').append("<option value='" + item.Value + "' disabled='disabled' >" + item.Text + "</option>");
                    }
                    $("#Currency").append(CurrencyList);
                }
            });
        $.each(orderdata.ParentCustomerList, function (i, item) {
            var ParentCustomerList = "";
            ParentCustomerList = "<option value='" + item.Value + "'>" + item.Text + "</option>";
            $("#ParentCustomer").append(ParentCustomerList);
        });
        $.each(orderdata.PaymentList, function (i, item) {
            var PaymentList = "";
            PaymentList = "<option value='" + item.Value + "'>" + item.Text + "</option>";
            $("#Payment").append(PaymentList);
        });
        $("#CusBrand").attr("readonly", "readonly");
        $("#CusBrand").val(orderdata.Brandid);
    });
}
function funAddAccount() {

    DefaultPrintshop = $("#DefaultPrintshop").val();
    if (DefaultPrintshop == "") {
        $("#labtxt").html("Please select a Printshop.");
        showDiv();
        return;
    }
    Currency = $("#Currency option:selected").val();
    if (Currency == "") {

        $("#labtxt").html("Please select a Currency.");
        showDiv();
        return;
    }
    Country = $("Country option:selected").val();
    if (Country == "")
    {
        $("#labtxt").html("Please select a Country.");
        showDiv();
        return;
    }
    CustomerNameEdit = $("#CustomerNameEdit").val();
    if (CustomerNameEdit == "") {

        $("#labtxt").html("The Customer name can not empty.");
        showDiv();
        return;
    }
    CustomerCodeEdit = $("#CustomerCodeEdit").val();
    if (CustomerCodeEdit == "") {

        $("#labtxt").html("The Customer# can not empty.");
        showDiv();
        return;
    }
    //CustomerId = $("#CustomerId").val();
    //if (CustomerId == "") {

    //    $("#labtxt").html("The CustomerId can not empty.");
    //    showDiv();
    //    return;
    //}

    Payment = $("#Payment").val();
    if (Payment == "") {
        $("#labtxt").html("The Payment can not empty.");
        showDiv();
        return;
    }
    Email = $("#Email").val();
    //if (Email == "")
    //{
    //    $("#labtxt").html("The Email can not empty.");
    //    showDiv();
    //    return;
    //}
    //else {
    //    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

    //    if (!reg.test(Email)) {

    //        $("#labtxt").html("The format of the Email address you input is not correct");
    //        showDiv();
    //        return;
    //    }
    //}

    var urlPost = "/Maintain/AddNewAccount/";
    $.post(urlPost, encodeURIComponent($("form").serialize()), function (data, status) {

        if (data.FunStatus == "success") {

            $("#labtxt").html("success");
            showDiv();
            $("#Query").slideDown();
            $("#Query-Results").css("display", "none");
            $("#step1").css("display", "none");
            $("#step").removeClass('gray-em');
            $("#step").addClass('red-em');
            $("#step1").css("display", "none");
            $("#EditInfor").css("display", "none");
            $("#EditAccountBillto").css("display", "none");
            $("#step4").css("display", "none");
            $("#step2").css("display", "none");
            $("#step3").removeClass("red-em");
            $("#step3").addClass("gray-em");
            $("#step3").css("display", "none");
            $("#step5").css("display", "none");
            $("#EditAccountShipto").css("display", "none");

        }
        else {

            $("#labtxt").html(data.FunStatus);
            showDiv();
        }
    })

}
function funAddNewShipTo() {
    $("#FreightCompany").empty();
    $("#EShopPrintshop").empty();
    $("#EShopCountry").empty();
    $("#EditAccountShipto :input").val("");
    $("#EditInfor").css("display", "none");
    $("#EditAccountShipto").slideDown();
    $("#step2").removeClass('red-em');
    $("#step2").addClass('gray-em');
    $("#step4").removeAttr("style");
    $("#step4").removeClass('gray-em');
    $("#step4").addClass('red-em');
    $("#EditShiptoNO").removeAttr("readonly");
    $("#SaveShippingInfo").removeAttr("style");
    $("#EditShippingInfo").css("display", "none");
    $("#ShowEditAdress").css("display", "none");
}
function funAddNewBillto() {
    $("#EBilltoId").val("");
    $("#EBtName").val("");
    $("#EBilltoNO").val("");
    $("#EBtCurrency").val("");
    $("#PaymentBT").val("");
    $("#EBtTel").val("");
    $("#EBtTelContacts").val("");
    $("#EBtAddress").val("");
    $("#EBtFax").val("");
    $("#EBtEmail").val("");
    $("#EBtCurrency").val("");
    $("#EBilltoId").removeAttr("disabled");
    $("#EBilltoNO").removeAttr("disabled");
    $("#EditBilltoRT").css("display", "none");
    $("#SaveBillto").removeAttr("style");
    $("#EditInfor").css("display", "none");
    $("#EditAccountBillto").slideDown();
    $("#step2").removeClass('red-em');
    $("#step2").addClass('gray-em');
    $("#step3").removeClass('gray-em');
    $("#step3").addClass('red-em');
    $("#step3").removeAttr("style");
}
function funSaveBillto() {

    var BilltoId = $("#EBilltoId").val();
    if (BilltoId.length < 1) {
        $("#labtxt").html("Please enter BilltoId");
        showDiv();
        return false;
    }
    var searBilltoId = new RegExp('ADO001-Bill');
    if (!searBilltoId.test(BilltoId)) {
        alert("BilltoId：格式必须是ADO001-Billxxx");


        return false;
    }
    var BilltoName = $("#EBtName").val();
    if (BilltoName.length < 1) {
        $("#labtxt").html("Please enter BilltoName");
        showDiv();
        return false;
    }
    var BilltoNO = $("#EBilltoNO").val();
    if (BilltoNO.length < 1) {
        $("#labtxt").html("Please enter EBilltoNO");
        showDiv();
        return false;
    }
    var searBilltoNO = new RegExp('ADO001-');
    if (!searBilltoNO.test(BilltoNO)) {
        alert("BilltoNO：格式必须是ADO001-xxx");
        return false;
    }
    var Currency = $("#EBtCurrency").val();
    if (Currency.length < 1) {
        $("#labtxt").html("Please select Currency");
        showDiv();
        return false;
    }
    var PayType = $("#PaymentBT").val();
    if (PayType.length < 1) {
        $("#labtxt").html("Please select Pay Type");
        showDiv();
        return false;
    }
    var data_ = {
        BilltoId: BilltoId,
        BilltoName: BilltoName,
        BilltoNO: BilltoNO,
        Telephone: $("#EBtTel").val(),
        Contact: $("#EBtTelContacts").val(),
        PayType: PayType,
        Address: $("#EBtAddress").val(),
        Fax: $("#EBtFax").val(),
        Email: $("#EBtEmail").val(),
        Currency: $("#EBtCurrency").val(),
        CustomerId: $("#AddBillto").val()
    }
    $.post("/Maintain/SaveBillto", data_, function (data) {

        if (data.FunStatus == "success") {
            alert("添加成功！");
        }
        else {
            alert(data.FunStatus);
        }
    })
}
function funcEditBilltoBind(obj) {
    console.log(obj.value);
    $("#EditInfor").css("display", "none");
    $("#SaveBillto").css("display", "none");
    $("#EditBilltoRT").removeAttr("style");
    $("#EditAccountBillto").slideDown();
    $("#step2").removeClass('red-em');
    $("#step2").addClass('gray-em');
    $("#step3").removeClass('gray-em');
    $("#step3").addClass('red-em');
    $("#step3").removeAttr("style");
    $("#EBilltoId").attr("disabled", "disabled");
    $("#EBilltoNO").attr("disabled", "disabled");

    $.post("/Maintain/EditBilltoBind/", obj.value, function (data) {
        if (data.FunStatus) {

            var _data = data.BilltoBindData;
            $("#EBilltoId").val(_data.BilltoId);
            $("#EBtName").val(_data.BilltoName);
            $("#EBilltoNO").val(_data.BilltoNO);
            $("#EBtTel").val(_data.Telephone);
            $("#EBtTelContacts").val(_data.Contact),
            $("#PaymentBT").val(_data.PayType);
            $("#EBtAddress").val(_data.Address),
            $("#EBtFax").val(_data.Fax),
            $("#EBtEmail").val(_data.Email),
            $("#EBtCurrency").val(_data.Currency)
        }
        else {
            alert("出错了");
        }
    })
}
function funcEditBillto() {

    var BilltoId = $("#EBilltoId").val();
    if (BilltoId.length < 1) {
        $("#labtxt").html("Please enter BilltoId");
        showDiv();
        return false;
    }
    var BilltoName = $("#EBtName").val();
    if (BilltoName.length < 1) {
        $("#labtxt").html("Please enter AccountName");
        showDiv();
        return false;
    }
    var BilltoNO = $("#EBilltoNO").val();
    if (BilltoNO.length < 1) {
        $("#labtxt").html("Please enter EBilltoNO");
        showDiv();
        return false;
    }
    var Currency = $("#EBtCurrency").val();
    if (Currency.length < 1) {
        $("#labtxt").html("Please select Currency");
        showDiv();
        return false;
    }
    var PayType = $("#PaymentBT").val();
    if (PayType.length < 1) {
        $("#labtxt").html("Please select Pay Type");
        showDiv();
        return false;
    }

    var data_ = {
        BilltoId: BilltoId,
        BilltoName: BilltoName,
        BilltoNO: BilltoNO,
        Telephone: $("#EBtTel").val(),
        Contact: $("#EBtTelContacts").val(),
        PayType: PayType,
        Address: $("#EBtAddress").val(),
        Fax: $("#EBtFax").val(),
        Email: $("#EBtEmail").val(),
        Currency: $("#EBtCurrency").val()
    }
    $.post("/Maintain/EditBillto", data_, function (data) {
        if (data.FunStatus) {
            $("#labtxt").html("Success");
            showDiv();
        }
        else {
            $("#labtxt").html("出错了");
            showDiv();
        }
    })
}
function funcEditShiptoBind(obj) {

    $("#ShowEditAdress").css("display", "none");
    $("#EditInfor").css("display", "none");
    $("#EditAccountShipto").slideDown();
    $("#SaveShippingInfo").css("display", "none");
    $("#EditShippingInfo").removeAttr("style");
    $("#step2").removeClass('red-em');
    $("#step2").addClass('gray-em');
    $("#step4").removeAttr("style");
    $("#step4").removeClass('gray-em');
    $("#step4").addClass('red-em');

    var Date = obj.attributes["value"].value;
    var $strDates = Date.split(";");
    var OOS_CodeNO = ($strDates[0]);
    var Name = ($strDates[1]);
    var ShipToId = ($strDates[2]);
    var IsDefault = ($strDates[3]);

    $("#EditShiptoID").val(ShipToId);
    $("#EditShiptoName").val(Name);
    $("#EditShiptoNO").val(OOS_CodeNO);
    $("#ShipToId").val(OOS_CodeNO);
    if (IsDefault == "Yes") {
        $("#CheckYes").attr("checked", 'checked');
        $("#CheckNO").removeAttr("checked");
    }
    else {
        $("#CheckNO").attr("checked", 'checked');
        $("#CheckYes").removeAttr("checked");
    }
    $("#EditShiptoNO").attr("readonly", "readonly");

    $.post("/Maintain/EditShiptoBind", OOS_CodeNO, function (data) {
        if (data.FunStatus) {

            var shtml = "";
            $.each(data.EditShiptoBindData.Shipto, function (i, item) {

                shtml += "<tr>";
                shtml += "<td class='center'>" + item.Seq + "</td>";
                shtml += "<td class='center'>" + item.Address + "</td>";
                shtml += "<td class='center'>" + item.AddressName + "</td>";
                shtml += "<td class='center'>" + item.CustomerName + "</td>";
                shtml += "<td class='center'>" + item.contacttel + "</td>";
                shtml += "<td class='center'>" + item.DeliveryCompany + "</td>";
                shtml += "<td class='center'>" + (item.Isdefaultaddr == "True" ? "Yes" : "No") + "</td>";
                if (item.Isdefaultaddr == "True" && item.IsEnabled == "True") {
                    shtml += "<td class='center'>" + "<button type='button' class='btn' disabled=\"disabled\" onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + OOS_CodeNO + "'>DisEnabled</button></td>";
                }
                else if (item.Isdefaultaddr == "True" && item.IsEnabled == "False") {

                    shtml += "<td class='center'>" + "<button class='btn' type='button' disabled=\"disabled\"  onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' disabled=\"disabled\" onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + OOS_CodeNO + "'>IsEnabled</button></td>";
                }
                else if (item.Isdefaultaddr == "False" && item.IsEnabled == "True") {

                    shtml += "<td class='center'>" + "<button class='btn'type='button'  onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + OOS_CodeNO + "'>IsEnabled</button></td>";
                }
                else {
                    shtml += "<td class='center'>" + "<button class='btn' type='button' disabled=\"disabled\"  onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' disabled=\"disabled\"  onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + OOS_CodeNO + "'>DisEnabled</button></td>";
                }
                shtml += "</tr>";
            });
            $("#ShipToAddressDetil").html(shtml);
        } else {
            alert("出错了")
        }
    })
}
function funSaveShipto() {
    //清空数据
    //$("#EditShiptoName").val("");
    //$("#EditShiptoID").val("");
    //$("#ShiptoNO").val("");
    var ShiptoID = $("#EditShiptoNO").val();
    if (ShiptoID.length < 1) {
        alert("请填写ShiptoID");
        return false;
    }
    var ShiptoName = $("#EditShiptoName").val();
    if (ShiptoName.length < 1) {
        alert("请填写ShiptoName");
        return false;
    }
    //var searShiptoID = new RegExp('ADO001-Ship');
    //if (!searBilltoId.test(BilltoId)) {
    //    alert("ShiptoID：格式必须是ADO001-Shipxxx");
    //    return false;
    //}
    var ShiptoNO = $("#EditShiptoID").val();
    if (ShiptoNO.length < 1) {
        alert("请填写ShiptoNO");
        return false;
    }
    //var searShiptoNO = new RegExp('Ship001-');
    //if (!searBilltoId.test(BilltoId)) {
    //    alert("ShiptoNO：格式必须是Ship001-xxx");
    //    return false;
    //}
    var setShiptoisdefault = $("input[name='Check']:checked").val()
    console.log("setShiptoisdefault" + setShiptoisdefault);

    var data_ = {
        ShiptoName: ShiptoName,
        ShiptoID: ShiptoID,
        ShiptoNO: ShiptoNO,
        setShiptoisdefault: setShiptoisdefault

    }
    $.post("/Maintain/SaveShipto", data_, function (data) {
        if (data.FunStatus == "success") {
            alert("添加成功")
        } else {
            alert(data.FunStatus);
        }
    })



    //var type = $("input[name='items']:checked").val()


}
function funSaveShiptoAdress() {
    var Name = $("#eidt_name").val();
    var EnglishName = $("#eidt_EnglishName").val();
    var Address = $("#eidt_Address").val();
    var Isdefault = $("#eidt_EachDefault input:checked").val();
    var Receiver = $("#eidt_Receiver").val();
    var Tel = $("#eidt_tel").val();
    var DeliverryCompany = $("#eidt_DeliverryCompany option:selected").val();
    var countrycode = $("#eidt_CheckCountry option:selected").val();
    var PrintShopId = $("#eidt_CheckPrintshop option:selected").val();
    var ShipToAddressId = $("#oos_ShipToAddressId").val();
    var BrandId = $("#Brandid option:selected").val();
    var ShipToId = $("#ShipToId").val();

    var posturl = "/Maintain/Selisdefaultaddr";
    $.post(posturl, {
        ShipToId: ShipToId
    }, function (result) {
        if (result == 1) {
            $("#labtxt").html("The shipping account has already had shipping address company(此出货客户已经存在默认出货公司)!");
            showDiv();
            return;
        }
        if (Name == "") {
            $("#labtxt").html("Please input shipping account name!");
            showDiv();
            return;
        }
        if (Address == "") {
            $("#labtxt").html("Please input shipping account Address!");
            showDiv();
            return;
        }
        if (Tel == "") {
            $("#labtxt").html("Please input shipping account Tel!");
            showDiv();
            return;
        }
        if (DeliverryCompany == "") {
            $("#labtxt").html("Please Select Deliverry Company!");
            showDiv();
            return;
        }
        if (countrycode == "") {
            $("#labtxt").html("Please Select Country!");
            showDiv();
            return;
        }
        if (PrintShopId == "") {
            $("#labtxt").html("Please Select Printshop!");
            showDiv();
            return;
        }
        if (ShipToAddressId == "") {
            $("#labtxt").html("Please input shipping account ShipToAddressId!");
            showDiv();
            return;
        }
        var posturl = "/Maintain/AddAddressInfo";
        $.post(posturl, {
            Name: Name, EnglishName: EnglishName, Address: Address, Isdefault: Isdefault, Receiver: Receiver, Tel: Tel, DeliverryCompany: DeliverryCompany, countrycode: countrycode, PrintShopId: PrintShopId, BrandId: BrandId, ShipToId: ShipToId, ShipToAddressId: ShipToAddressId
        }, function (result) {
            if (result == 2) {
                $("#labtxt").html("The same ShipToAddressId already exists!");
                showDiv();
                return;
            }
            if (result == 3) {
                $("#labtxt").html("The same Name already exists!");
                showDiv();
                return;
            }
            if (result == 1) {
                $("#labtxt").html("Success!");
                showDiv();
                $("#ShowInsertAdress").css("display", "none");
                var posturl = "/Maintain/GetShipToAddressInfo";
                $.post(posturl, {
                    ShipToId: ShipToId
                }, function (result) {
                    var obj = jQuery.parseJSON(result);
                    if (obj) {
                        var shtml = "";
                        var intSeq = 0;
                        $.each(obj, function (i, item) {
                            intSeq++;
                            shtml += "<tr>";
                            shtml += "<td class='center'>" + item.Seq + "</td>";
                            shtml += "<td class='center'>" + item.oos_name + "</td>";
                            shtml += "<td class='center'>" + item.oos_address + "</td>";
                            shtml += "<td class='center'>" + item.oos_contactname + "</td>";
                            shtml += "<td class='center'>" + item.oos_contacttel + "</td>";
                            shtml += "<td class='center'>" + item.DeliveryCompany + "</td>";
                            shtml += "<td class='center'>" + (item.oos_isdefaultaddr == "True" ? "Yes" : "No") + "</td>";
                            if (item.oos_isdefaultaddr == "True" && item.IsEnabled == "True") {
                                shtml += "<td class='center'>" + "<button type='button' class='btn' disabled=\"disabled\" onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>DisEnabled</button></td>";
                            }
                            else if (item.oos_isdefaultaddr == "True" && item.IsEnabled == "False") {

                                shtml += "<td class='center'>" + "<button class='btn' type='button' disabled=\"disabled\"  onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' disabled=\"disabled\" onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>IsEnabled</button></td>";
                            }
                            else if (item.oos_isdefaultaddr == "False" && item.IsEnabled == "True") {

                                shtml += "<td class='center'>" + "<button class='btn'type='button'  onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>IsEnabled</button></td>";
                            }
                            else {
                                shtml += "<td class='center'>" + "<button class='btn' type='button' disabled=\"disabled\"  onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' disabled=\"disabled\"  onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>DisEnabled</button></td>";
                            }
                            shtml += "</tr>";
                        });
                        $("#ShipToAddressDetil").html(shtml);
                    }
                })
            }
            else {
                $("#labtxt").html("Error!");
                showDiv();
                return;
            }
        });
        emptyAddInfo();
    });
}
function funUpdateShiptoAdres() {
    var ShipToAddressId = $("#edit_ShipToAddressId").val();
    var Name = $("#eidt_name").val();
    var enname = $("#eidt_EnglishName").val();
    var address = $("#eidt_Address").val();
    var Isdefault = $("#eidt_EachDefault input:checked").val();
    var contactname = $("#eidt_Receiver").val();
    var contacttel = $("#eidt_tel").val();
    var DeliveryCompany = $("#eidt_DeliverryCompany option:selected").val();
    var countryCName = $("#eidt_CheckCountry option:selected").val();
    var PrintShop = $("#eidt_CheckPrintshop option:selected").val();
    if (address == "") {
        $("#labtxt").html("Please input shipping account Address!");
        showDiv();
        return;
    }
    if (contacttel == "") {
        $("#labtxt").html("Please input shipping account Tel!");
        showDiv();
        return;
    }
    if (DeliveryCompany == "") {
        $("#labtxt").html("Please Select Deliverry Company!");
        showDiv();
        return;
    }
    if (countryCName == "") {
        $("#labtxt").html("Please Select Country!");
        showDiv();
        return;
    }
    if (PrintShop == "") {
        $("#labtxt").html("Please Select Printshop!");
        showDiv();
        return;
    }
    var posturl = "/Maintain/EditAccountAddress";
    $.post(posturl, {
        ShipToAddressId: ShipToAddressId, Name: Name, enname: enname, Isdefault: Isdefault, contactname: contactname, contacttel: contacttel, DeliveryCompany: DeliveryCompany, countryCName: countryCName, PrintShop: PrintShop
    }, function (result) {
        if (result == 1) {
            $("#labtxt").html("Success!");
            showDiv();
            $("#ShowEditAdress").css("display", "none");
            var ShipToId = $("#ShipToId").val();
            var posturl = "/Maintain/GetShipToAddressInfo";
            $.post(posturl, {
                ShipToId: ShipToId
            }, function (result) {
                var obj = jQuery.parseJSON(result);
                if (obj) {
                    var shtml = "";
                    var intSeq = 0;
                    $.each(obj, function (i, item) {
                        intSeq++;
                        shtml += "<tr>";
                        shtml += "<td class='center'>" + item.Seq + "</td>";
                        shtml += "<td class='center'>" + item.oos_name + "</td>";
                        shtml += "<td class='center'>" + item.oos_address + "</td>";
                        shtml += "<td class='center'>" + item.oos_contactname + "</td>";
                        shtml += "<td class='center'>" + item.oos_contacttel + "</td>";
                        shtml += "<td class='center'>" + item.DeliveryCompany + "</td>";
                        shtml += "<td class='center'>" + (item.oos_isdefaultaddr == "True" ? "Yes" : "No") + "</td>";
                        if (item.oos_isdefaultaddr == "True" && item.IsEnabled == "True") {
                            shtml += "<td class='center'>" + "<button type='button' class='btn' disabled=\"disabled\" onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>DisEnabled</button></td>";
                        }
                        else if (item.oos_isdefaultaddr == "True" && item.IsEnabled == "False") {

                            shtml += "<td class='center'>" + "<button class='btn' type='button' disabled=\"disabled\"  onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' disabled=\"disabled\" onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>IsEnabled</button></td>";
                        }
                        else if (item.oos_isdefaultaddr == "False" && item.IsEnabled == "True") {

                            shtml += "<td class='center'>" + "<button class='btn'type='button'  onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>IsEnabled</button></td>";
                        }
                        else {
                            shtml += "<td class='center'>" + "<button class='btn' type='button' disabled=\"disabled\"  onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' disabled=\"disabled\"  onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>DisEnabled</button></td>";
                        }

                        shtml += "</tr>";
                    });
                    $("#ShipToAddressDetil").html(shtml);
                }
            })
            emptyEditInfo();
        }
        else {
            $("#labtxt").html("Error!");
            showDiv();
            return;
        }
    })
}
function DeleteThisAddressInfo(obj) {
    var Date = obj.attributes["value"].value;
    var $strDates = Date.split(";");
    var ShipToAddressId = ($strDates[0]);
    var ShipToId = ($strDates[1]);
    var posturl = "/Maintain/DeleteThisAddress";
    $.post(posturl, {
        ShipToAddressId: ShipToAddressId
    }, function (res) {
        var posturl = "/Maintain/GetShipToAddressInfo";
        $.post(posturl, {
            ShipToId: ShipToId
        }, function (result) {
            var obj = jQuery.parseJSON(result);
            if (obj) {
                var shtml = "";
                var intSeq = 0;
                $.each(obj, function (i, item) {
                    intSeq++;
                    shtml += "<tr>";
                    shtml += "<td class='center'>" + item.Seq + "</td>";
                    shtml += "<td class='center'>" + item.oos_name + "</td>";
                    shtml += "<td class='center'>" + item.oos_address + "</td>";
                    shtml += "<td class='center'>" + item.oos_contactname + "</td>";
                    shtml += "<td class='center'>" + item.oos_contacttel + "</td>";
                    shtml += "<td class='center'>" + item.DeliveryCompany + "</td>";
                    shtml += "<td class='center'>" + (item.oos_isdefaultaddr == "True" ? "Yes" : "No") + "</td>";
                    if (item.oos_isdefaultaddr == "True" && item.IsEnabled == "True") {
                        shtml += "<td class='center'>" + "<button type='button' class='btn' disabled=\"disabled\" onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>DisEnabled</button></td>";
                    }
                    else if (item.oos_isdefaultaddr == "True" && item.IsEnabled == "False") {

                        shtml += "<td class='center'>" + "<button class='btn' type='button' disabled=\"disabled\"  onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' disabled=\"disabled\" onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>IsEnabled</button></td>";
                    }
                    else if (item.oos_isdefaultaddr == "False" && item.IsEnabled == "True") {

                        shtml += "<td class='center'>" + "<button class='btn'type='button'  onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>IsEnabled</button></td>";
                    }
                    else {
                        shtml += "<td class='center'>" + "<button class='btn' type='button' disabled=\"disabled\"  onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' disabled=\"disabled\"  onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>DisEnabled</button></td>";
                    }

                    shtml += "</tr>";
                });
                $("#ShipToAddressDetil").html(shtml);
            }
        })

    })
}
function OpenAddressEdit(obj) {
    emptyAddInfo();
    emptyEditInfo();
    $("#SaveShiptoAdress").css("display", "none");
    $("#UpdateShiptoAdress").removeAttr("style");
    $("#ShowEditAdress").css("display", "");
    $("#ShowInsertAdress").css("display", "none");
    var ShipToAddressId = obj.attributes["value"].value;
    var posturl = "/Maintain/SelShipToAddressInfo";
    $.post(posturl, {
        ShipToAddressId: ShipToAddressId
    }, function (result) {
        var $strDates = result.database.split("^");

        var Name = ($strDates[0]);
        var enname = ($strDates[1]);
        var address = ($strDates[2]);
        var isdefaultaddr = ($strDates[3]);
        var contactname = ($strDates[4]);
        var contacttel = ($strDates[5]);
        var DeliveryCompany = ($strDates[6]);
        var countryCName = ($strDates[7]);
        var PrintShop = ($strDates[8]);

        $("#eidt_name").val(Name);
        $("#eidt_EnglishName").val(enname);
        $("#eidt_Address").val(address);
        if (isdefaultaddr == "True") {
            $("#Edit_CheckYes").attr("checked", 'checked');
        }
        else {
            $("#Edit_CheckNo").attr("checked", 'checked');
        }
        $("#eidt_Receiver").val(contactname);
        $("#eidt_tel").val(contacttel);
        $("#eidt_DeliverryCompany").val(DeliveryCompany);
        $("#eidt_CheckCountry").val(countryCName);
        $("#eidt_CheckPrintshop").val(PrintShop);

        $("#edit_ShipToAddressId").val(ShipToAddressId);

    })
}
function emptyAddInfo() {
    $("#oos_name").val("");
    $("#oos_EnglishName").val("");
    $("#oos_Address").val("");
    $("#Add_CheckYes").attr("checked", 'checked');
    $("#oos_Receiver").val("");
    $("#oos_tel").val("");
    $("#DeliverryCompany option:selected").val("Please Select");
    $("#CheckCountry option:selected").val("Please Select");
    $("#CheckPrintshop option:selected").val("Please Select");
    $("#oos_ShipToAddressId").val("");
}
function emptyEditInfo() {
    $("#eidt_EnglishName").val("");
    $("#eidt_Address").val("");
    $("#eidt_Receiver").val("");
    $("#eidt_tel").val("");
    $("#eidt_DeliverryCompany").val("");
    $("#eidt_CheckCountry").val("");
    $("#eidt_CheckPrintshop").val("");
    $("#eidt_DeliverryCompany option:selected").val("Please Select");
    $("#eidt_CheckCountry option:selected").val("Please Select");
    $("#eidt_CheckPrintshop option:selected").val("Please Select");
}
function EditBilltoQuery(obj) {
    var CustomerId = obj.value;
    $.ajax(

        {
            type: "get",
            url: "/Maintain/Customer_Billto/" + obj.attributes["value"].value,
            contentType: "application/html; charset=utf-8",
            dataType: "html"
        })
              .success(function (data) {

                  $("#Billto-Results").html(data);
                  $("#Customer").val(CustomerId);
                  $.ajax({
                      type: "post",
                      url: "/Maintain/GetBilltoList?CustomerId=" + CustomerId,
                      dataType: "json",
                      success: function (data) {
                          var html = "";
                          if (data.FunStatus) {
                              $.each(data.list, function (i, item) {
                                  html += "<option value='" + item.Value + "'>" + item.Text + "</option>";
                              })
                              $("#Billtolist").html(html);
                          }
                      }
                  })
                  $("#CustomerIDRT").val(CustomerId);
                  $("#Customer").attr("readonly", "readonly");
                  $("#Billto-Results").css("display", "block");
                  $("#Shipto-Results").css("display", "none");
                  $("#LogQuery").css("display", "none");
              })
              .error(function (xhr, status) {
                  //alert(status);
                  $("#labtxt").html(status);
                  showDiv();
              })
}
function EditShiptoQuery(obj) {
    var CustomerId = obj.value;
    $.ajax(

        {
            type: "get",
            url: "/Maintain/Customer_ShipTo/" + obj.attributes["value"].value,
            contentType: "application/html; charset=utf-8",
            dataType: "html"
        })
              .success(function (data) {

                  $("#Shipto-Results").html(data);
                  $("#CustomerRT").val(CustomerId);
                  $("#ShiptoIDRT").val(CustomerId);
                  $("#CustomerRT").attr("readonly", "readonly");
                  $("#Shipto-Results").css("display", "block");
                  $("#Billto-Results").css("display", "none");
                  $("#LogQuery").css("display", "none");
              })
              .error(function (xhr, status) {
                  //alert(status);
                  $("#labtxt").html(status);
                  showDiv();
              })
}
function funModifyRecord(obj) {
    var CustomerId = obj.value;
    $("#Customerlog").val(CustomerId);
    $("#LogQueryID").html(CustomerId);
    var Page = $("#nowpage1").val();
    var _data =
            {
                CustomerId: CustomerId,
                Page: Page

            }
    $.post("/Maintain/ModifyRecord", _data, function (data) {
        if (data) {
            var html = "";
            $.each(data, function (i, item) {
                html += "<tr>";
                html += "<td class='center'>" + item.Seq + "</td>";
                html += "<td class='center'>" + item.CreatedBy + "</td>";
                html += "<td class='center'>" + item.CreatedOn + "</td>";
                html += "<td class='center'>" + item.OOS_Note1 + "</td>";
                html += "<td class='center'>" + item.OOS_note2 + "</td>";
                html += "</tr>";
            })
            if (html == "") {
                $("#LogQuery").css("display", "none");
                $("#Billto-Results").css("display", "none");
                $("#Shipto-Results").css("display", "none");
                $("#labtxt").html("无记录");
                showDiv();
            }
            else {
                $("#BaseDataQury tbody").html(html);
                $("#LogQuery").css("display", "block");
                $("#Billto-Results").css("display", "none");
                $("#Shipto-Results").css("display", "none");
                $("#TotalPageCount1").html(data[0].TotalPageCount);
                $("#PageTotalCount1").val(data[0].TotalPageCount);
            }
        }
    })

}

