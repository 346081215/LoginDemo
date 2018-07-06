$(function () {

      

 

  
    $("#FirstStep,#SecondStep,#ThirdStep,#FourthStep").click(function () {
        return false;
    });
    $.post("/ShoppingCart/ShoppingCartItemLoad", null, function (data) {

        $("#Language").val(data.ShoppingCartItemData.Language)

        if (data.ShoppingCartItemData != "") {
            $.each(data.ShoppingCartItemData.PSlist, function (i, item) {
                $('#printshop').append("<option disabled='disabled' value='" + item.Value + "'>" + item.Text + "</option>");
                if (item.Text = "Shanghai Maxim") {
                    $("#printshop").val(item.Value);
                }
            });
          
            $("#printshop").val(data.ShoppingCartItemData.PSID);
            $('#Currency').val(data.ShoppingCartItemData.Currency);
            $.each(data.ShoppingCartItemData.CategoryList, function (i, item) {
                $('#Category').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            });


            $.each(data.ShoppingCartItemData.ShipmentType, function (i, item) {
                $('#ShipmentType').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            });
           
            $.each(data.ShoppingCartItemData.ProductList, function (i, item) {
                $('#ProductCode').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            });
            var posturl = "/ShoppingCart/BagCustomerPirintShop";
            $.post(posturl, {    
            }, function (res) {
                $strDates = res.substring(1);
                var strDates = $strDates.split("^");
                $("#printshop option").each(function () {
                    for (var i = 0; i < strDates.length; i++) {
                        heckPrintshop = $(this).attr("value");
                        if (heckPrintshop == strDates[i]) {
                            $(this).attr("disabled", false);
                            $(this).css("color", "black");
                        }

                    }
                })              
            })
        
            //$.each(data.ShoppingCartItemData.ExpressCompany, function (i, item) {
            //    $('#ExpressCompany').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            //});

            var detailhtml = "";
            var intSeq = 0;
            $.each(data.ShoppingCartItemData.ItemDetaillist, function (i, item) {
                intSeq++;
                detailhtml += "<tr>";
                detailhtml += "<td class='center'><input id='checkbox" + intSeq + "' name='checkbox" + intSeq + "' type='checkbox' value='true' class='magic-checkbox'  style='display:none;' /><label for='checkbox" + intSeq + "' style='margin-bottom: 20px;padding-left: 30px;'><input style='display:none' id='productid' name='productid' type='text' value='" + item.ProductCode + "' /></label>";
                detailhtml += "<td class='center'><input id='txtqty' name='txtqty' type='text' onkeyup=\"funkeup(this)\" /></td>";//item.Smallurl
                detailhtml += "<td class='center' ><img src='" + item.producturl + "' style='width:100px;height:100px' onmouseover='showimg(this);' onmouseout='hideimg();'/></td>";
                detailhtml += "<td class='center'>" + item.ProductCustNO + "</td>";
                detailhtml += "<td class='center'>" + item.Currency + "</td>";
                detailhtml += "<td class='center'>" + item.UnitPrice + "</td>";
                //detailhtml += "<td class='center'>" + item.StockQty + "</td>";//StockQty
                detailhtml += "<td class='center'>" + item.UOM + "</td>";
                detailhtml += "<td class='center'>" + item.PurchaseUnit + "</td>";
                //detailhtml += "<td class='center' style='display:none'>@Html.TextBoxFor(x => x.SPlist[i].productid)</td>";
                detailhtml += "</tr>";
            });
            $("#Order tbody").html(detailhtml);
            document.getElementById("PageTotalCount").value = data.ShoppingCartItemData.TotalPageCount;
            $("#TotalPageCount").html(data.ShoppingCartItemData.TotalPageCount);

            if (data.ShoppingCartItemData.ShoppingCartlist != null) {
                console.log(data.ShoppingCartItemData.ShoppingCartlist)
                var shippingcarthtml = "";
                $.each(data.ShoppingCartItemData.ShoppingCartlist, function (i, item) {
                    shippingcarthtml += "<tr>";
                    shippingcarthtml += "<td class='romver' onclick='RemoverShoppingCartItem(this)' style='cursor:pointer;'><a>Remove</a><input style='display:none' id='productid' name='productid' type='text' value='" + item.ProductCode + "' /></td>";
                    shippingcarthtml += "<td class='center' >" + item.OrderQty + "</td>";
                    shippingcarthtml += '<td style="display:none" id="shoppingcartid">' + item.ID + "</td>";
                    shippingcarthtml += '<td style="display:none" id="shopingcartproductid">' + i + "</td>";
                    shippingcarthtml += "<td class='center'>" + item.ProductCustNO + "</td>";

                    shippingcarthtml += "</tr>";
                });
                $("#ShoppingCartOrder tbody").html(shippingcarthtml);
            }
        }
        else {
            $("#Order tbody").html("");
            $("#ShoppingCartOrder tbody").html("");
            $("#labtxt").html(data.ErrorCode);
            showDiv();
        }

    })
    
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
    $("#Submit1").click(function () {
        var result = true;
        var adddata = "";
        $("input:checkbox").each(function (i, item) {
            var s = $(this).prop("checked");
            if (s) {

                var a = $(this).parents("tr").find("#txtqty").val();
                var reg = /^[0-9]*[1-9][0-9]*$/;
                if (!reg.test(a)) {
                    $("#labtxt").html("Add QTY can not be 0 or empty");
                    $("#ok").css("display", "none")
                    $("#no").css("display", "none")
                    $("#txtCloselbtn").css("display", "inline");
                    if ($("#Language").val() == "zh") {
                        $("#labtxt").html("输入的数量不能为空");
                    }
                    showDiv();
                    result = false;

                }
                var qty = parseInt($(this).parents("tr").find("#txtqty").val());
                var productid = $(this).parents("tr").find("#productid").val();



                adddata += productid + "," + qty + "^";
            }

        })
        if (result) {
            if (adddata == "") {
                $("#labtxt").html("Please select a product to add");
                $("#ok").css("display", "none")
                $("#no").css("display", "none")
                $("#txtCloselbtn").css("display", "inline");

                if ($("#Language").val() == "zh") {
                    $("#labtxt").html("请选择要添加的产品");
                }
                showDiv();
            }
            else {
                var data_ = {
                    PrintShopid: $("#printshop").val(),
                    PrintShop: $("#printshop").find("option:selected").text(),
                    Adddata: adddata
                }

                $.post("/ShoppingCart/AddShoppingCartItem", data_, function (data) {
                    if (data.FunStatus == "success") {
                        var shippingcarthtml = "";
                        $.each(data.ShoppingCartList, function (i, item) {
                            shippingcarthtml += "<tr>";
                            shippingcarthtml += "<td class='romver' onclick='RemoverShoppingCartItem(this)' style='cursor:pointer;'><a>Remove</a><input style='display:none' id='productid' name='productid' type='text' value='" + item.ProductCode + "' /></td>";
                            shippingcarthtml += "<td class='center' >" + item.OrderQty + "</td>";
                            shippingcarthtml += '<td style="display:none" id="shoppingcartid">' + item.ID + "</td>";
                            shippingcarthtml += '<td style="display:none" id="shopingcartproductid">' + i + "</td>";
                            shippingcarthtml += "<td class='center'>" + item.ProductCustNO + "</td>";

                            shippingcarthtml += "</tr>";
                        });
                        $("#ShoppingCartOrder tbody").html(shippingcarthtml);
                        if ($(".romver").length > 0) {

                            $("#Submit2").removeAttr("disabled");
                        }

                        $("input:checkbox").removeAttr("checked");
                        $("input[name='txtqty']").val("");
                    }
                    else {
                        $("#labtxt").html(data.ErrorCode);
                        showDiv();
                    }
                });
            }
        }




    })

    //$("select[name='ShipmentType']").change(function () {
    //    //$("select[name='ExpressCompany']").val("");
    //    //$("#sExpressCompany").val("");

    //    //if ($("#Language").val() == "zh") {
    //    //    if ($(this).val() != "快递") {
    //    //        $("select[name='ExpressCompany']").get(0).selectedIndex = 0;
    //    //        $("select[name='ExpressCompany']").attr("disabled", "disabled");
    //    //        $("select[name='ExpressCompany']").css("background", "#E6E8EA");

    //    //    } else {
    //    //        $("select[name='ExpressCompany']").removeAttr("disabled");
    //    //        $("select[name='ExpressCompany']").removeAttr("style");
    //    //    }
    //    //}
    //    //else {
    //    //    if ($(this).val() != "Express") {
    //    //        $("select[name='ExpressCompany']").get(0).selectedIndex = 0;
    //    //        $("select[name='ExpressCompany']").attr("disabled", "disabled");
    //    //        $("select[name='ExpressCompany']").css("background", "#E6E8EA");

    //    //    }

    //    //    else {
    //    //        $("select[name='ExpressCompany']").removeAttr("disabled");
    //    //        $("select[name='ExpressCompany']").removeAttr("style");

    //    //    }
    //    //}



    //})

    $("#Submit2").click(function () {
        if ($(".romver").length < 1) {
            $("#labtxt").html("Please select a product to add");
            if ($("#Language").val() == "zh") {
                $("#labtxt").html("请选择要添加的产品");
            }
            showDiv();
            return;
        }
        if ($("#printshop").val().length == 0) {
            $("#labtxt").html("Please select Print Shop!");
            if ($("#Language").val() == "zh") {
                $("#labtxt").html("请选择生产地");
            }
            showDiv();
            return;
        }

        if ($("#ShipmentType").val().length == 0) {
            $("#labtxt").html("Please select Shipment Type!");
            if ($("#Language").val() == "zh") {
                $("#labtxt").html("请选择交货方式");
            }
            showDiv();
            return;
        }

        //if ($("#ShipmentType option:selected").text() == "Express") {
        //    if ($("#ExpressCompany option:selected").text() == "--Please Select--") {


        //        $("#labtxt").html("Please select \"Freight Company\"!");
        //        if ($("#Language").val() == "zh") {
        //            $("#labtxt").html("请选择快递公司。");
        //        }
        //        showDiv();
        //        return;
        //    }

        //}

        //if ($("#Language").val() == "zh") {
        //    if ($("#ShipmentType option:selected").text() == "快递") {
        //        if ($("#ExpressCompany option:selected").text() == "--Please Select--") {


        //            $("#labtxt").html("Please select \"Freight Company\"!");
        //            if ($("#Language").val() == "zh") {
        //                $("#labtxt").html("请选择快递公司。");
        //            }
        //            showDiv();
        //            return;
        //        }

        //    }
        //}

        $("#labtxt").html("Are you sure to Ordering Now？");
        if ($("#Language").val() == "zh") {
            $("#labtxt").html("确定现在下单吗？");
        }

        showDiv2();
        $("#ok").bind("click", function () {
            $("#sprintshop").val($("#printshop").val());
            var data_ = {
                printshopid: $("#printshop").val(),
                printshop: $("#printshop").find("option:selected").text(),
                ShipmentType: $("#ShipmentType").val(),
                ExpressCompany: $("#ExpressCompany").val(),
                txtPO: $("#txtPO").val()
            }


            $.post("/ShoppingCart/OrderingNow", data_, function (data) {
                if (data.FunStatus == "success") {
                    var Price = data.FunData;
                    $.post("/ShoppingCart/ShoppingCartSubmit", "", function (data) {
                        $("#tab2").html(data);

                        $("#tab1").attr("class", "tab-pane");
                        $("#tab2").attr("class", "tab-pane active");
                        $("#SecondStep").attr("class", "span3 active")
                        $(".bar").css("width", "70%");
                        $("#lblTotalCost").html(Price);
                        closeDiv();
                    });
                }
                else {
                    $("#labtxt").html(data.ErrorCode);
                    showDiv();
                    //alert(data.ErrorCode);
                }
            })
        })

        $("#no").bind("click", function () {
            closeDiv();
            return;
        })

        



    })

    

    $("#printshop").change(function () {


        if ($("#printshop").val().length == 0) {
            return false;
        }
        $("#ShoppingCartOrder tbody").html("");
        $.post("/ShoppingCart/PrintShopchange", $("#printshop").val(), function (data) {
            if (data.ShoppingCartItemData != "") {
                $('#Currency').val(data.ShoppingCartItemData.Currency);
                if (data.ShoppingCartItemData.ItemDetaillist != null) {
                    var detailhtml = "";
                    var intSeq = 0;
                    $.each(data.ShoppingCartItemData.ItemDetaillist, function (i, item) {
                        intSeq++;
                        detailhtml += "<tr>";
                        detailhtml += "<td class='center'><input id='checkbox" + intSeq + "' name='checkbox" + intSeq + "' type='checkbox' value='true' class='magic-checkbox'  style='display:none;' /><label for='checkbox" + intSeq + "' style='margin-bottom: 20px;padding-left: 30px;'><input style='display:none' id='productid' name='productid' type='text' value='" + item.ProductCode + "' /></label>";
                        detailhtml += "<td class='center'><input id='txtqty' name='txtqty' type='text'  onkeyup=\"funkeup(this)\"/></td>";//item.Smallurl
                        detailhtml += "<td class='center' ><img src='" + item.producturl + "' style='width:100px;height:100px' onmouseover='showimg(this);' onmouseout='hideimg();'/></td>";
                        detailhtml += "<td class='center'>" + item.ProductCustNO + "</td>";
                        detailhtml += "<td class='center'>" + item.Currency + "</td>";
                        detailhtml += "<td class='center'>" + item.UnitPrice + "</td>";
                        //detailhtml += "<td class='center'>" + item.StockQty + "</td>";
                        detailhtml += "<td class='center'>" + item.UOM + "</td>";
                        detailhtml += "<td class='center'>" + item.PurchaseUnit + "</td>";
                        //detailhtml += "<td class='center' style='display:none'>@Html.TextBoxFor(x => x.SPlist[i].productid)</td>";
                        detailhtml += "</tr>";
                    });
                    $("#Order tbody").html(detailhtml);
                    document.getElementById("PageTotalCount").value = data.ShoppingCartItemData.TotalPageCount;
                    $("#TotalPageCount").html(data.ShoppingCartItemData.TotalPageCount);

                } else {
                    $("#Order tbody").html("");
                }



                if (data.ShoppingCartItemData.ShoppingCartlist != null) {
                    var shippingcarthtml = "";

                    $.each(data.ShoppingCartItemData.ShoppingCartlist, function (i, item) {
                        shippingcarthtml += "<tr>";
                        shippingcarthtml += "<td class='romver' onclick='RemoverShoppingCartItem(this)' style='cursor:pointer;'><a>Remove</a><input style='display:none' id='productid' name='productid' type='text' value='" + item.ProductCode + "' /></td>";
                        shippingcarthtml += "<td class='center'>" + item.OrderQty + "</td>";
                        shippingcarthtml += '<td style="display:none" id="shoppingcartid">' + item.ID + "</td>";
                        shippingcarthtml += '<td style="display:none" id="shopingcartproductid">' + i + "</td>";
                        shippingcarthtml += "<td class='center'>" + item.ProductCustNO + "</td>";

                        shippingcarthtml += "</tr>";
                    });
                    $("#ShoppingCartOrder tbody").html(shippingcarthtml);
                } else {
                    $("#ShoppingCartOrder tbody").html("");
                }
            }
            else {
                $("#Order tbody").html("");
                $("#ShoppingCartOrder tbody").html("");
                $("#labtxt").html(data.ErrorCode);
                showDiv();
            }


        })
    })

    $("#Category").change(function () {
        var data = {
            Category :$("#Category").val()
        };
        $.post("/ShoppingCart/ChangeCategory", data, function ()
        {


        });
        GetOrder();
    })
    $("#ProductCode").change(function () {
        GetOrder();
    });
    $("#Search").click(function () {
        GetOrder();
    });
    //$("#Errorprompt").css("display", "block")

})

function GetOrder() {
    var data_ = {
        Page: document.getElementById("nowpage").value,
        Category: $("#Category").val(),
        PrintshopId: $("#printshop").val(),
        _ProductCustNO: $("#ProductCode").val(),
        _ProductCustNOName: $("#txtItemName").val()
    }
   

    $.post("/ShoppingCart/ShoppingCartItemDetailPage", data_,function (data) {
        if (data.FunStatus == "success") {
            var detailhtml = "";
            var intSeq = 0;
            $.each(data.ShoppingCartItemData.ItemDetaillist, function (i, item) {
                intSeq++;
                detailhtml += "<tr>";
                detailhtml += "<td class='center'><input id='checkbox" + intSeq + "' name='checkbox" + intSeq + "' type='checkbox' value='true' class='magic-checkbox'  style='display:none;' /><label for='checkbox" + intSeq + "' style='margin-bottom: 20px;padding-left: 30px;'><input style='display:none' id='productid' name='productid' type='text' value='" + item.ProductCode + "' /></label>";
                detailhtml += "<td class='center'><input id='txtqty' name='txtqty' type='text' onkeyup=\"funkeup(this)\" /></td>";//item.Smallurl
                detailhtml += "<td class='center' ><img src='" + item.producturl + "' style='width:100px;height:100px' onmouseover='showimg(this);' onmouseout='hideimg();'/></td>";
                detailhtml += "<td class='center'>" + item.ProductCustNO + "</td>";
                detailhtml += "<td class='center'>" + item.Currency + "</td>";
                detailhtml += "<td class='center'>" + item.UnitPrice + "</td>";
                //detailhtml += "<td class='center'>" + item.StockQty + "</td>";
                detailhtml += "<td class='center'>" + item.UOM + "</td>";
                detailhtml += "<td class='center'>" + item.PurchaseUnit + "</td>";
                //detailhtml += "<td class='center' style='display:none'>@Html.TextBoxFor(x => x.SPlist[i].productid)</td>";
                detailhtml += "</tr>";
            });
            $("#Order tbody").html(detailhtml);
            document.getElementById("PageTotalCount").value = data.ShoppingCartItemData.TotalPageCount;
            $("#TotalPageCount").html(data.ShoppingCartItemData.TotalPageCount);
        }
        else {
            $("#labtxt").html(data.ErrorCode);
            showDiv();
        }
    })
}

function RemoverShoppingCartItem(data) {
    var shoppingcartid = $(data).parents("tr").find("#shoppingcartid").html();
    var shopingcartproductid = $(data).parents("tr").find("#shopingcartproductid").html();

    $("#labtxt").html("Are you sure to Remove?");
    if ($("#Language").val() == "zh") {
        $("#labtxt").html("确定删除吗？");
    }
    showDiv2();

    $("#ok").bind("click", function () {
        var data_ = {
            shoppingcartid: shoppingcartid,
            shopingcartproductid: shopingcartproductid
        }
        var urlPost = "/ShoppingCart/RemoverShoppingCartItem";

        $.post(urlPost, data_, function (data, status) {
            var shippingcarthtml = "";
            if (data.ShoppingCartList != null) {
                $.each(data.ShoppingCartList, function (i, item) {
                    shippingcarthtml += "<tr>";
                    shippingcarthtml += "<td class='romver' onclick='RemoverShoppingCartItem(this)' style='cursor:pointer;'><a>Remove</a><input style='display:none' id='productid' name='productid' type='text' value='" + item.ProductCode + "' /></td>";
                    shippingcarthtml += "<td class='center''>" + item.OrderQty + "</td>";
                    shippingcarthtml += '<td style="display:none" id="shoppingcartid">' + item.ID + "</td>";
                    shippingcarthtml += '<td style="display:none" id="shopingcartproductid">' + i + "</td>";
                    shippingcarthtml += "<td class='center'>" + item.ProductCustNO + "</td>";

                    shippingcarthtml += "</tr>";
                });
            }
            $("#ShoppingCartOrder tbody").html(shippingcarthtml);

            if ($(".romver").length < 1) {

                $("#Submit2").attr("disabled", "disabled");
            }
            closeDiv();
        });
    })

    $("#no").bind("click", function () {
        closeDiv();
        return;
    })
}


function hideimg() {
    
    var element = document.getElementById("divimgpreview");
    element.style.display = "none";
    document.getElementById("imgpreview").src = "";
}
function showimg(obj) {
    
    //var oriIDname = obj.id;
    //var IDname = oriIDname.replace("PrintImg", "");
    var producturl = $(obj).attr("src");
    var element = document.getElementById("divimgpreview");
    element.style.display = "block";
    var x = $(obj).offset().left + 100;
    //var y = $(obj).offset().top-200;
    var y = 10;
    $("#divimgpreview").offset({ top: y, left: x })
    document.getElementById("imgpreview").src = producturl;
    document.getElementById("imgpreview").style.height = "80%";
    document.getElementById("imgpreview").style.width = "80%";
}
function funkeup(obj) {
    var t = $(obj).val();
    if (isNaN(t)) {
        $("#labtxt").html("please input correct number.");
        if ($("#Language").val() == "zh") {
            $("#labtxt").html("请输入数字。");
        }
        showDiv();
    }
}
function clickno() {
    closeDiv();
    return;
}