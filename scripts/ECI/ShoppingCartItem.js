$(function () {



    Page_load("PrintShopId=" + $("#sprintshop").val() + "&T=" + $("#T").val());


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
    $("#Category").change(function () {
        var data = {
            Category: $("#Category").val(),
            ProductCode: $("#ProductCode").val(),
            PrintShopId: $("#printshop").val(),
            T: $("#T").val()
        };
        //Page_load(data);
        GetOrder();

        $.post("/ECI/ChangeCategoryBindProduct", data, function (data) {

            $("#ProductCode").html("");
            if (data.FunStatus == "success") {
                
                $('#ProductCode').append("<option value=''>--All--</option>");
                $.each(data.ProductList.ProductList, function (i, item) {
                    var ProductList = "";
                    ProductList = "<option  value='" + item.Value + "'>" + item.Text + "</option>";
                    $("#ProductCode").append(ProductList);
                })
            }
        });

    })
    $("#ProductCode").change(function () {
        
        var data = {
            Category: $("#Category").val(),
            ProductCode: $("#ProductCode").val(),
            PrintShopId: $("#printshop").val(),
            T: $("#T").val()
        };
        //Page_load(data);
        GetOrder();
        //alert($("#ProductCode").val());
    });
    $("#printshop").change(function () {
        PSChangeFunc();
        GetOrder();
    })
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

        $("#labtxt").html("Are you sure to Order Now？");
        if ($("#Language").val() == "zh") {
            $("#labtxt").html("确定现在下单吗？");
        }

        showDiv2();
        $("#ok").bind("click", function () {
            $("#ok").unbind('click');
            $("#sprintshop").val($("#printshop").val());
            var data_ = {
                printshopid: $("#printshop").val(),
                printshop: $("#printshop").find("option:selected").text(),
                ShipmentType: $("#ShipmentType").val(),
                ExpressCompany: $("#ExpressCompany").val(),
                txtPO: "",
                Comments: $("#txtComments").val(),
                T: $("#T").val()
            }

            
            $.post("/ECI/OrderingNow", data_, function (data) {
                if (data.FunStatus == "success") {
                    var Price = data.FunData;
                    $.post("/ECI/ShoppingCartSubmit", $("#T").val(), function (data) {
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
                    $("#labtxt").html(data.ErrMsg);
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
    var data = {
        Category: $("#Category").val(),
        T:$("#T").val()
    };
    $.post("/ECI/ChangeCategoryBindProduct", data, function (data) {

        $("#ProductCode").html("");
        if (data.FunStatus == "success") {
            
            $('#ProductCode').append("<option value=''>--All--</option>");
            $.each(data.ProductList.ProductList, function (i, item) {
                var ProductList = "";
                ProductList = "<option value='" + item.Value + "'>" + item.Text + "</option>";
                //ProductList = "<option value='" + item.Text + "'>" + item.Text + "</option>";
                $("#ProductCode").append(ProductList);
            })


        }
    });



});

//Ps 下拉框chuange事件
function PSChangeFunc() {
    
    var _data = {
        PrintShopid: $("#printshop").find("option:selected").val(),
        T: $("#T").val()
    };
    $.ajax({
        url: "/ECI/GetPrintshopCartItemByPS",
        data: _data,
        dataType: 'json',
        type: "post",
        success: function (data) {
            //alert("1234");
            if (data.FunStatus == "Success") {
                
                ShowShoppingCartList(data.FunData);
                $("#ShipmentType").val(data.ShipmentType);
            }
            else {
                alert(data.ErrorCode);
            }
        }
    })

}

function AddtoCartS(obj) {



    
    Item = $(obj).parent().siblings(".Item").text();
    Items = Item.substr(5);
    Size = $(obj).parent().siblings(".Size").text();
    SelectSize = $(obj).parent().siblings(".Size").children('#SelectSize').val();
    ItemCode = $(obj).parent().siblings(".Item").children('#ProductCode').val();
    Qty = $(obj).parent().siblings(".Qty").children('#Qty').val()

    if ($("#printshop").val().length == 0) {
        $("#labtxt").html("Please select Print Shop!");
        if ($("#Language").val() == "zh") {
            $("#labtxt").html("请选择生产地");
        }
        showDiv();
        return;
    }

    if (Qty == "") {
        alert("请输入内容");
        return false;
    }
    if (!(/(^[1-9]\d*$)/.test(Qty))) {
        alert("输入的不是正整数");
        return false;
    }
    var ItemSize = "";
    if (SelectSize != undefined) {
        ItemSize = SelectSize;
    }

    var data_ = {
        //PrintShopid: $("#sprintshop").val(),
        PrintShopid: $("#printshop").find("option:selected").val(),
        PrintShop: $("#printshop").find("option:selected").text(),
        ProductCode: ItemCode,
        ProductSize: ItemSize,
        ItemQty: Qty,
        T: $("#T").val()
    }
    $.post("/ECI/AddShoppingCart", data_, function (data) {
        if (data.FunStatus == "success") {
            ShowShoppingCartList(data.FunData)
            $(obj).parent().siblings(".Qty").children('#Qty').val("");
        }
        else {
            alert(data.ErrorCode);
        }
    });
}
function ShowShoppingCartList(data) {
    var shippingcarthtml = "";
    $.each(data, function (i, item) {
        
        shippingcarthtml += "<tr>";
        shippingcarthtml += "<td class='romver' onclick='RemoverShoppingCartItem(this)' style='cursor:pointer;'><a>Remove</a><input style='display:none' id='productid' name='productid' type='text' value='" + item.ProductCode + "' /></td>";
        shippingcarthtml += "<td class='center''>" + item.OrderQty + "</td>";
        shippingcarthtml += '<td style="display:none" id="shoppingcartid">' + item.ID + "</td>";
        shippingcarthtml += '<td style="display:none" id="shopingcartproductid">' + i + "</td>";
        shippingcarthtml += "<td class='center'>" + item.ProductCustNO + "</td>";
        shippingcarthtml += "<td class='center'>" + item.Size + "</td>";

        shippingcarthtml += "</tr>";
    });
    
    $("#ShoppingCartOrder tbody").html("");
    $("#ShoppingCartOrder tbody").html(shippingcarthtml);
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
        $("#ok").unbind('click');
        var data_ = {
            shoppingcartid: shoppingcartid,
            shopingcartproductid: shopingcartproductid
        }
        var urlPost = "/ECI/RemoverShoppingCartItem";

        $.post(urlPost, data_, function (data, status) {
            if (data.FunStatus == "success") {
                ShowShoppingCartList(data.FunData)
            }
            else {
                alert(data.ErrorCode);
            }
            closeDiv();
        });
    })

    $("#no").bind("click", function () {
        closeDiv();
        return;
    })
}


//var Select = {
//    del: function (obj, e) {
//        
//        if((e.keyCode||e.which||e.charCode) == 8){
//            var opt = obj.options[0];
//            opt.text = opt.value = opt.value.substring(0, opt.value.length>0?opt.value.length-1:0);
//        }
//    },
//    write: function (obj, e) {
//        
//        if((e.keyCode||e.which||e.charCode) == 8)return ;
//        var opt = obj.options[0];
//        opt.selected = "selected";
//       opt.text = opt.value += String.fromCharCode(e.charCode||e.which||e.keyCode);
//    }
//}
//function test(){
//    alert(document.getElementById("select").value);
//}

function onke(obj) {
    
    document.getElementById('changeOP').value = obj;
    document.getElementById('changeOP').text() = obj;
}
function onbl(obj) {
    
    document.getElementById('changeOP').value = obj;
    document.getElementById('changeOP').text() = obj;
}

function FindPro() {
    //var _Pro = $("#txtProductCode").val();
    
    var data = {
        Category: $("#Category").val(),
        ProductCode: $("#txtProductCode").val(),
        T: $("#T").val()
    };
    //Page_load(data);
    GetOrder();
}

function Page_load(data) {

    $.post("/ECI/ShoppingCartItem_Load", data, function (data) {
        if (data.FunStatus == "success") {
            $("#printshop").html("");
            $.each(data.ShoppingCartItemData.PSList, function (i, item) {

                if (item.Disabled === false) {
                    $("#printshop").append("<option  value='" + item.Value + "' style='color:black;font-weight:bold'>" + item.Text + "</option>");
                }
                else {
                    $("#printshop").append("<option  value='" + item.Value + "' disabled='disabled'>" + item.Text + "</option>");
                }

            });
            $("#printshop").val(data.ShoppingCartItemData.PSID);
            $("#sprintshop").val(data.ShoppingCartItemData.PSID);

            $('#Currency').val(data.ShoppingCartItemData.CurrencyID);
            $("#Category").html("");
            $.each(data.ShoppingCartItemData.Categorylist, function (i, item) {
                $('#Category').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            });
            $("#Category").val(data.ShoppingCartItemData.CategoryID)

            $("#ShipmentType").html("");
            $.each(data.ShoppingCartItemData.ShipmentType, function (i, item) {
                if (item.Selected === true) {
                    $('#ShipmentType').append("<option value='" +item.Value + "' selected=\"selected\">" +item.Text + "</option>");
                } else {
                    $('#ShipmentType').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
                }
            });

            var html = "";
            //$("#ProductCode").html("");
            //$('#ProductCode').append("<option value=''>--All--</option>");
            //$.each(data.ShoppingCartItemData.ProductItemList, function (i, item) {
            //    $('#ProductCode').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            //});
            //$("#ProductCode").val(data.ShoppingCartItemData.ProductItemID);
            var _Brand = data.ShoppingCartItemData.Brand;
            $.each(data.ShoppingCartItemData.ItemList, function (i, item) {
                html += "<div class='Product' category='Wovenlabel' style='heigth:inherit' productid='" + item.ProductCode + "'>";
                html += "<div class='ProductImages'>";
                html += "<img src='" + getSmallImg(item.ItemImageUrl) + "' onmouseover='showimg(this);' onmouseout='hideimg();' onmousemove='showimg(this);'  style='cursor:hand;' >";
                html += "</div>";
                html += "<div class='Description'>";
                html += "<ul class='ulheight'>";
                html += "<li class='Item'>Item:" + item.ItemCode + "<input type='hidden' id='ProductCode' name='ProductCode' value='" + item.ProductCode + "' /></li>";
                if (_Brand == "BJB001" || _Brand == "ECI001") {
                    html += "<li class='Item'>USD Price:$" + item.UnitPrice + "</li>";
                }

                if (item.SizeList.length == 0) {
                    html += "<li class='Size'></li>";
                }
                else {
                    html += "<li class='Size'>";
                    html += "Size:";
                    html += "<select style='width:inherit;' id='SelectSize'>";
                    $.each(item.SizeList, function (c, _item) {
                        html += "<option>" + _item.Value + "</option>";
                    });
                    html += "</select>";
                    html += "</li>";
                }
                var note = item.Notes.split("//");
                for (var j = 0; j < note.length; j++) {
                    html += "<li class='notes'>" + note[j] + "</li>";
                }
                html += "<li class='Qty'>Qty:<input type='text' id='Qty' name='Qty'></li>";
                html += "<li><button type='button' id='AddtoCart' name='AddtoCart' src='/Content/images/GCSS18-WML01.jpg' class='btn btn-default' onclick='return AddtoCartS(this)'>Add to Cart</button></li>";
                html += "</ul>";
                html += "</div>";
                html += "</div>";
            });
            $("#ProductItemDetail").html(html);
            
            $("#nowpage").val("1");
            document.getElementById("PageTotalCount").value = data.ShoppingCartItemData.TotalPageCount;
            $("#TotalPageCount").html(data.ShoppingCartItemData.TotalPageCount);

            ShowShoppingCartList(data.ShoppingCartItemData.ShoppingCartList);
            AtuoHeight();


        }
        else {
            alert(data.ErrorCode);
        }
    });


}
function isNull(str) {
    if (str == "") return true;
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
}
function GetOrder() {
    
    var _txtProductCode = $("#txtProductCode").val();
    var ProCode = "";
    if (!_txtProductCode || isNull(_txtProductCode)) {
        ProCode = document.getElementById("ProductCode").value;
    } else {
        ProCode = document.getElementById("txtProductCode").value;
    }
    var data_ = {
        Page: document.getElementById("nowpage").value,
        Category: $("#Category").val(),
        PrintshopId: $("#printshop").val(),
        _ProductCustNO: ProCode,
        //_ProductCustNO: $("#ProductCode").val(),
        T:$("#T").val(),
        Currency: $("#Currency").val()
        //_ProductCustNOName: $("#txtItemName").val()
    }
    $.post("/ECI/ShoppingCartItemDetailPage", data_, function (data) {
        if (data.FunStatus == "success") {
            var html = "";
            
            var _Brand = data.ShoppingCartItemData.Brand;
            $.each(data.ShoppingCartItemData.ItemList, function (i, item) {
                html += "<div class='Product' category='Wovenlabel' style='heigth:inherit' productid='" + item.ProductCode + "'>";
                html += "<div class='ProductImages'>";
                if (item.ProductCode == 'ECI001-DE-NEW-TAB-SMA' || item.ProductCode == 'ECI001-DE-NEW-TAB-SMA-BK' || item.ProductCode == 'ECI001-GCSS18-HT-GL' || item.ProductCode == "ECI001-GCSS18-HT-RV" || item.ProductCode == 'ECI001-GCSS18-METALLICR-GOLD' || item.ProductCode == 'ECI001-GCSS18-METALLICR-SIL ' || item.ProductCode == 'ECI001-GCSS18-WFL01' || item.ProductCode == 'ECI001-GCSS18-WFL02' || item.ProductCode == 'ECI001-GCSS18-WFL03') {
                    html += "<img src='" + getSmallImg(item.ItemImageUrl) + "' onmouseover='showimg(this);' onmouseout='hideimg();' onmousemove='showimg(this);' style='cursor:hand;width:auto;' >";
                }
                else {
                    html += "<img src='" + getSmallImg(item.ItemImageUrl) + "' onmouseover='showimg(this);' onmouseout='hideimg();' onmousemove='showimg(this);' style='cursor:hand;'>";
                }
                html += "</div>";
                html += "<div class='Description'>";
                html += "<ul class='ulheight'>";
                html += "<li class='Item'>Item:" + item.ItemCode + "<input type='hidden' id='ProductCode' name='ProductCode' value='" + item.ProductCode + "' /></li>";
                if (_Brand == "BJB001" || _Brand == "ECI001") {
                    html += "<li class='Item'>USD Price:$" + item.UnitPrice + "</li>";
                }
                if (item.SizeList.length == 0) {
                    html += "<li class='Size'></li>";
                }
                else {
                    html += "<li class='Size'>";
                    html += "Size:";
                    html += "<select style='width:inherit;' id='SelectSize'>";
                    $.each(item.SizeList, function (c, _item) {
                        html += "<option>" + _item.Value + "</option>";
                    });
                    html += "</select>";
                    html += "</li>";
                }
                var note = item.Notes.split("//");
                for (var i = 0; i < note.length; i++) {
                    html += "<li class='notes'>" + note[i] + "</li>";
                }
                html += "<li class='Qty'>Qty:<input type='text' id='Qty' name='Qty'></li>";
                html += "<li><button type='button' id='AddtoCart' name='AddtoCart' src='/Content/images/GCSS18-WML01.jpg' class='btn btn-default' onclick='return AddtoCartS(this)'>Add to Cart</button></li>";
                html += "</ul>";
                html += "</div>";
                html += "</div>";
            });
            $("#ProductItemDetail").html(html);
            
            AtuoHeight();
            document.getElementById("PageTotalCount").value = data.ShoppingCartItemData.TotalPageCount;
            $("#TotalPageCount").html(data.ShoppingCartItemData.TotalPageCount);
        }
        else {
            $("#labtxt").html(data.ErrorCode);
            showDiv();
        }
    })
}
function getSmallImg(url) {
    var array = url.split('/');
    array.splice(array.length - 2, 0, 'small-img');
    return array.join('/');
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
    console.log(divimgx + ':' + divimgy);

    //if (intX + divimgx+20 > window.innerWidth)
    //{
    //    debugger
    //    $('#divimgpreview').css("left", intX - 610 + "px");
    //    $('#divimgpreview').css("top", intY + 10 + "px");
    //    $('#divimgpreview').show();
    //}
    //else if (intY + divimgy + 10 > window.innerHeight)
    //{
    //    
    //    $('#divimgpreview').css("left", intX+20 + "px");
    //    $('#divimgpreview').css("top", (intY-514) + "px");
    //    $('#divimgpreview').show();
    //}
    //else if (intY - divimgy - 10 < 0)
    //{
    //    
    //    $('#divimgpreview').css("left", intX + 20 + "px");
    //    $('#divimgpreview').css("top", (intY + 514) + "px");
    //    $('#divimgpreview').show();
    //}
    //else
    //{
    $('#divimgpreview').css("left", intX + 20 + "px");
    $('#divimgpreview').css("top", intY - divimgy / 2 + sTop + "px");
    $('#divimgpreview').show();

    //}

}


function AtuoHeight() {
    var MAXheight = 0;
    $(".Description").each(function () {
        height = parseInt(this.scrollHeight)
        if (height > MAXheight) {
            MAXheight = height;
        }
    })
    $(".Description").css("height", MAXheight + "px")
    $(".ulheight").each(function () {
        debugger;
        var hei = MAXheight - parseInt(this.scrollHeight)
        $(this).find("[class='Qty']").css("margin-top", hei + "px")
    })
}
//function showimg(obj) {

////var oriIDname = obj.id;
////var IDname = oriIDname.replace("PrintImg", "");
//var producturl = $(obj).attr("src");

//var theImage = new Image();
//theImage.src = producturl;
//imgwidth= theImage.width;
//imgHeight = theImage.height;
//var element = document.getElementById("divimgpreview");
//element.style.display = "block";
//var _left = event.x;
//var _top = event.y + 10;

//

//if (_left > 1000)
//{
//    _left = _left - 300;
//}

//if (imgwidth > 500) {
//    var _left = event.x - 400;
//}
//if (imgHeight > 500) {
//    var _top = event.y + 100;;
//}
//if (imgwidth > 500 || imgHeight > 500)
//{
//    //document.getElementById("imgpreview").style.height = "50%";
//    //document.getElementById("imgpreview").style.width = "50%";
//}   

//element.style.left = _left + "px";
//element.style.top = _top + "px";
//;

//document.getElementById("imgpreview").src = producturl;

// }

//element.style.left = getScrollLeft() + 3;
//element.style.top = getScrollTop() + 3;

//var _objImg = document.getElementById("imgpreview");
//_objImg.src = producturl;
//if (_objImg.width > document.documentElement.clientWidth) {
//    _objImg.width = document.documentElement.clientWidth;
//}
//if (_objImg.height > document.documentElement.clientHeight) {
//    _objImg.height = document.documentElement.clientHeight;
//}



//var x = $(obj).offset().left-200;
//var y = $(obj).offset().top-460;
//var y = 10;
//var windowSwidth = $(window).width()-300;
//console.log(windowSwidth);
//var X = event.pageX +20;
//if (_left > windowSwidth)
//{


//    
//    document.getElementById("imgpreview").src = producturl;
//    document.getElementById("imgpreview").style.height = "50%";
//    document.getElementById("imgpreview").style.width = "50%";

//}
//else
//{





// $("#divimgpreview").offset({ top:0, left:0})


//}

//function getScrollTop() {
//    var scrollTop = 0;
//    if (document.documentElement && document.documentElement.scrollTop) {
//        scrollTop = document.documentElement.scrollTop;
//    }
//    else if (document.body) {
//        scrollTop = document.body.scrollTop;
//    }
//    return scrollTop;
//}
//function getScrollLeft() {
//    var scrollLeft = 0;
//    if (document.documentElement && document.documentElement.scrollLeft) {
//        scrollLeft = document.documentElement.scrollLeft;
//    }
//    else if (document.body) {
//        scrollTop = document.body.scrollTop;
//    }
//    return scrollLeft;
//}
