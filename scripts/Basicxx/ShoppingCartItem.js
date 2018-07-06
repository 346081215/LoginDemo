$(function () {

    

    $("input[name='txtqty']").keyup(function () {
        var t = $(this).val();
        if (isNaN(t)) {
            $("#labtxt").html("please input correct number.");
            showDiv();
        }
    })

    $("#FirstStep,#SecondStep,#ThirdStep,#FourthStep").click(function () {
        return false;
    });
    $.post("/Basicxx/ShoppingCartItemLoad", null, function (data) {

        if (data.ShoppingCartItemData != "") {
            $.each(data.ShoppingCartItemData.PSlist, function (i, item) {
                $('#printshop').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
                if (item.Text = "Shanghai Maxim") {
                    $("#printshop").val(item.Value);
                }
            });
            $('#Currency').val(data.ShoppingCartItemData.Currency);
            $.each(data.ShoppingCartItemData.CategoryList, function (i, item) {
                $('#Category').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            });


            $.each(data.ShoppingCartItemData.ShipmentType, function (i, item) {
                $('#ShipmentType').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            });

            var detailhtml = "";
            var intSeq = 0;
            $.each(data.ShoppingCartItemData.ItemDetaillist, function (i, item) {
                intSeq++;
                detailhtml += "<tr>";
                detailhtml += "<td class='center'><input id='checkbox" + intSeq + "' name='checkbox" + intSeq + "' type='checkbox' value='true' class='magic-checkbox'  style='display:none;' /><label for='checkbox" + intSeq + "' style='margin-bottom: 20px;padding-left: 30px;'><input style='display:none' id='productid' name='productid' type='text' value='" + item.ProductID + "' /></label>";
                detailhtml += "<td class='center'><input id='txtqty' name='txtqty' type='text' /></td>";//item.Smallurl
                detailhtml += "<td class='center' id='PrintImg' imgstr='" + item.producturl + "' onmouseover='showimg(this);' onmouseout='hideimg();'><img src='" + item.Smallurl + "' style='width:200px;' /></td>";
                detailhtml += "<td class='center'>" + item.prodalias + "</td>";
                detailhtml += "<td class='center'>" + item.Currency + "</td>";
                detailhtml += "<td class='center'>" + item.UnitPrice + "</td>";
                detailhtml += "<td class='center'>" + item.UOM + "</td>";
                detailhtml += "<td class='center'>" + item.MOQ + "</td>";
                //detailhtml += "<td class='center' style='display:none'>@Html.TextBoxFor(x => x.SPlist[i].productid)</td>";
                detailhtml += "</tr>";
            });
            $("#Order tbody").html(detailhtml);
            document.getElementById("PageTotalCount").value = data.ShoppingCartItemData.TotalPageCount;
            $("#TotalPageCount").html(data.ShoppingCartItemData.TotalPageCount);


            if (data.ShoppingCartItemData.ShippingCartlist != null) {
                var shippingcarthtml = "";

                $.each(data.ShoppingCartItemData.ShippingCartlist, function (i, item) {
                    shippingcarthtml += "<tr>";
                    shippingcarthtml += "<td class='romver' onclick='RemoverShoppingCartItem(this)' style='cursor:pointer;'><a>Remove</a><input style='display:none' id='productid' name='productid' type='text' value='" + item.ProductID + "' /></td>";
                    shippingcarthtml += "<td class='center' >" + item.OrderQty + "</td>";
                    shippingcarthtml += '<td style="display:none" id="shoppingcartid">' + item.ID + "</td>";
                    shippingcarthtml += '<td style="display:none" id="shopingcartproductid">' + i + "</td>";
                    shippingcarthtml += "<td class='center'>" + item.prodalias + "</td>";

                    shippingcarthtml += "</tr>";
                });
                $("#ShippingCartOrder tbody").html(shippingcarthtml);
            }
        }
        else {
            $("#Order tbody").html("");
            $("#ShippingCartOrder tbody").html("");
            $("#labtxt").html(data.ErrorCode);
            showDiv();
        }
        
    })
   
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
                    showDiv();
                    result = false;
                    
                }
                var qty = parseInt($(this).parents("tr").find("#txtqty").val());
                var productid = $(this).parents("tr").find("#productid").val();
                


                adddata += productid + "," + qty + "^" ;
            }

        })
        if (result) {
            if (adddata == "") {
                $("#labtxt").html("Please select a product to add");
                $("#ok").css("display", "none")
                $("#no").css("display", "none")
                $("#txtCloselbtn").css("display", "inline");
                showDiv();
            }
            else {
                var data_ = {
                    PrintShopid: $("#printshop").val(),
                    PrintShop: $("#printshop").find("option:selected").text(),
                    Adddata: adddata
                }

                $.post("/Basicxx/AddShoppingCartItem", data_, function (data) {
                    if (data.FunStatus == "success") {
                        var shippingcarthtml = "";
                        $.each(data.ShippingCartList, function (i, item) {
                            shippingcarthtml += "<tr>";
                            shippingcarthtml += "<td class='romver' onclick='RemoverShoppingCartItem(this)' style='cursor:pointer;'><a>Remove</a><input style='display:none' id='productid' name='productid' type='text' value='" + item.ProductID + "' /></td>";
                            shippingcarthtml += "<td class='center' >" + item.OrderQty + "</td>";
                            shippingcarthtml += '<td style="display:none" id="shoppingcartid">' + item.ID + "</td>";
                            shippingcarthtml += '<td style="display:none" id="shopingcartproductid">' + i + "</td>";
                            shippingcarthtml += "<td class='center'>" + item.prodalias + "</td>";
                           
                            shippingcarthtml += "</tr>";
                        });
                        $("#ShippingCartOrder tbody").html(shippingcarthtml);
                        if ($(".romver").length > 0) {

                            $("#Submit2").removeAttr("disabled");
                        }

                        $("input:checkbox").removeAttr("checked");
                        $("#txtqty").val("");
                    }
                    else {
                        $("#labtxt").html(data.ErrorCode);
                        showDiv();
                    }
                });
            }
        }
        

       

    })

    $("#Submit2").click(function () {
        if ($(".romver").length < 1) {
            $("#labtxt").html("Please select a product to add");
            showDiv();
            return;
        }
        if ($("#printshop").val().length == 0) {
            $("#labtxt").html("Please select Print Shop!");
            showDiv();
            return;
        }

        if ($("#ShipmentType").val().length == 0) {
            $("#labtxt").html("Please select Shipment Type!");
            showDiv();
            return;
        }


        $("#labtxt").html("Are you sure to Ordering Now");
        showDiv2();
        $("#ok").bind("click", function () {
            $("#sprintshop").val($("#printshop").val());
            var data_ = {
                printshopid: $("#printshop").val(),
                printshop: $("#printshop").find("option:selected").text(),
                ShipmentType: $("#ShipmentType").val(),
                txtPO: $("#txtPO").val()
            }


            $.post("/Basicxx/OrderingNow", data_, function (data) {
                if (data.FunStatus == "success") {
                    $.post("/Basicxx/ShippingCartSubmit", "", function (data) {
                        $("#tab2").html(data);

                        $("#tab1").attr("class", "tab-pane");
                        $("#tab2").attr("class", "tab-pane active");
                        $("#SecondStep").attr("class", "span3 active")
                        $(".bar").css("width", "70%");
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

        





    })
 
    $("#printshop").change(function () {


        if ($("#printshop").val().length == 0)
        {
            return false;
        }
        $("#ShippingCartOrder tbody").html("");
        $.post("/Basicxx/PrintShopchange", $("#printshop").val(), function (data) {
            if(data.ShoppingCartItemData!=""){
            if (data.ShoppingCartItemData.ItemDetaillist != null) {
                var detailhtml = "";
                var intSeq = 0;
                $.each(data.ShoppingCartItemData.ItemDetaillist, function (i, item) {
                    intSeq++;
                    detailhtml += "<tr>";
                    detailhtml += "<td class='center'><input id='checkbox" + intSeq + "' name='checkbox" + intSeq + "' type='checkbox' value='true' class='magic-checkbox'  style='display:none;' /><label for='checkbox" + intSeq + "' style='margin-bottom: 20px;padding-left: 30px;'><input style='display:none' id='productid' name='productid' type='text' value='" + item.ProductID + "' /></label>";
                    detailhtml += "<td class='center'><input id='txtqty' name='txtqty' type='text' /></td>";//item.Smallurl
                    detailhtml += "<td class='center' id='PrintImg' imgstr='" + item.producturl + "' onmouseover='showimg(this);' onmouseout='hideimg();'><img src='" + item.Smallurl + "' style='width:200px;' /></td>";
                    detailhtml += "<td class='center'>" + item.prodalias + "</td>";
                    detailhtml += "<td class='center'>" + item.Currency + "</td>";
                    detailhtml += "<td class='center'>" + item.UnitPrice + "</td>";
                    detailhtml += "<td class='center'>" + item.UOM + "</td>";
                    detailhtml += "<td class='center'>" + item.MOQ + "</td>";
                    //detailhtml += "<td class='center' style='display:none'>@Html.TextBoxFor(x => x.SPlist[i].productid)</td>";
                    detailhtml += "</tr>";
                });
                $("#Order tbody").html(detailhtml);
                document.getElementById("PageTotalCount").value = data.ShoppingCartItemData.TotalPageCount;
                $("#TotalPageCount").html(data.ShoppingCartItemData.TotalPageCount);
            } else {
                $("#Order tbody").html("");
            }



            if (data.ShoppingCartItemData.ShippingCartlist != null) {
                var shippingcarthtml = "";

                $.each(data.ShoppingCartItemData.ShippingCartlist, function (i, item) {
                    shippingcarthtml += "<tr>";
                    shippingcarthtml += "<td class='romver' onclick='RemoverShoppingCartItem(this)' style='cursor:pointer;'><a>Remove</a><input style='display:none' id='productid' name='productid' type='text' value='" + item.ProductID + "' /></td>";
                    shippingcarthtml += "<td class='center'>" + item.OrderQty + "</td>";
                    shippingcarthtml += '<td style="display:none" id="shoppingcartid">' + item.ID + "</td>";
                    shippingcarthtml += '<td style="display:none" id="shopingcartproductid">' + i + "</td>";
                    shippingcarthtml += "<td class='center'>" + item.prodalias + "</td>";

                    shippingcarthtml += "</tr>";
                });
                $("#ShippingCartOrder tbody").html(shippingcarthtml);
            } else {
                $("#ShippingCartOrder tbody").html("");
            }
        }
        else {
            $("#Order tbody").html("");
        $("#ShippingCartOrder tbody").html("");
        $("#labtxt").html(data.ErrorCode);
        showDiv();
    }


        })
    })

    //$("#Errorprompt").css("display", "block")
   
})

function RemoverShoppingCartItem(data) {
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
                    shippingcarthtml += "<td class='romver' onclick='RemoverShoppingCartItem(this)' style='cursor:pointer;'><a>Remove</a><input style='display:none' id='productid' name='productid' type='text' value='" + item.ProductID + "' /></td>";
                    shippingcarthtml += "<td class='center''>" + item.OrderQty + "</td>";
                    shippingcarthtml += '<td style="display:none" id="shoppingcartid">' + item.ID + "</td>";
                    shippingcarthtml += '<td style="display:none" id="shopingcartproductid">' + i + "</td>";
                    shippingcarthtml += "<td class='center'>" + item.prodalias + "</td>";

                    shippingcarthtml += "</tr>";
                });
            }
            $("#ShippingCartOrder tbody").html(shippingcarthtml);

            if ($(".romver").length < 1) {

                $("#Submit2").attr("disabled", "disabled");
            }
            closeDiv();
        });
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
    var producturl = $(obj).attr("imgstr")
    var element = document.getElementById("divimgpreview");
    element.style.display = "block";
    var x = $(obj).offset().left + 200;
    var y = $(obj).offset().top;
    $("#divimgpreview").offset({ top: y, left: x })
    document.getElementById("imgpreview").src = producturl;
}

function clickno() {
    closeDiv();
    return;
}