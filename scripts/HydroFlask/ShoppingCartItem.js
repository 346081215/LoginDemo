$(function () {
    //$('#DropSeries').append("<option value='value'>Text</option>");
    //$('#DropSeries').append("<option value='value'>Text2</option>");

    //日历控件
    FormComponents.init();
    $("#FirstStep,#SecondStep,#ThirdStep,#FourthStep").click(function () {
        return false;
    });
    $.post("/HydroFlask/ShoppingCartItemLoad", "", function (data) {
        if (data.FunStatus == "success")
        {
            $("#txtVendorName").val(data.ShoppingCartItemData.VendorName)

            $('#DropSeries').append("<option value=''>--All--</option>");
            $.each(data.ShoppingCartItemData.Serieslist, function (i, item) {
                $('#DropSeries').append("<option value='" + item.SeriesID + "'>" + item.SeriesName + "</option>");
            });

            $('#DropStyle').append("<option value=''>--All--</option>");
            $.each(data.ShoppingCartItemData.Stylelist, function (i, item) {
                $('#DropStyle').append("<option value='" + item.StyleID + "'>" + item.StyleName + "</option>");
            });

            $('#DropItem').append("<option value=''>--All--</option>");
            $.each(data.ShoppingCartItemData.Itemlist, function (i, item) {
                $('#DropItem').append("<option value='" + item.ProductID + "'>" + item.ProductName + "</option>");
            });

            $('#DropColor').append("<option value=''>--All--</option>");
            $.each(data.ShoppingCartItemData.Colorlist, function (i, item) {
                $('#DropColor').append("<option value='" + item.ColorName + "'>" + item.ColorName + "</option>");
            });

            var detailhtml = "";
            var intSeq = 0;
            $.each(data.ShoppingCartItemData.ItemDetaillist, function (i, item) {
                intSeq++;
                detailhtml += "<tr>";
                detailhtml += "<td class='center'><input id='checkbox" + intSeq + "' name='checkbox" + intSeq + "' type='checkbox' value='true' class='magic-checkbox'  style='display:none;' /><label for='checkbox" + intSeq + "' style='margin-bottom: 20px;padding-left: 30px;'></label><input style='display:none' id='productid' name='productid' type='text' value='" + item.ProductID + "' /><input style='display:none' id='HydroDetailID' name='HydroDetailID' type='text' value='" + item.HydroDetailID + "' /></td>";
                detailhtml += "<td class='center'><input id='txtqty' name='txtqty' type='text' /></td>";
                detailhtml += "<td class='center'>PCS</td>";                
                detailhtml += "<td class='center' id='PrintImg' imgstr='" + item.ItemSmallPic + "' onmouseover='showimg(this);' onmouseout='hideimg();'><img src='" + item.ItemSmallPic + "' style='width:200px;' /></td>";
                detailhtml += "<td class='center'>" + item.Series + "</td>";
                detailhtml += "<td class='center'>" + item.Style + "</td>";
                detailhtml += "<td class='center'>" + item.ItemName + "</td>";
                detailhtml += "<td class='center'>" + item.Color + "</td>";
                detailhtml += "<td class='center'>" + item.PrdouctDesc + "</td>";
                detailhtml += "<td class='center'>" + item.SKU + "</td>";
                detailhtml += "<td class='center'>" + item.OZ + "</td>";
                detailhtml += "<td class='center'>" + item.BarCode + "</td>";
                //detailhtml += "<td class='center' style='display:none'>@Html.TextBoxFor(x => x.SPlist[i].productid)</td>";
                detailhtml += "</tr>";
            });
            $("#Order tbody").html(detailhtml);

            var shippingcarthtml = "";
            $.each(data.ShoppingCartItemData.ShippingCartlist, function (i, item) {
                shippingcarthtml += "<tr>";
                shippingcarthtml += "<td class='romver' onclick='removeData(this)' style='cursor:pointer;'><a>Remove</a><input style='display:none' id='productid' name='productid' type='text' value='" + item.ProductID + "' /><input style='display:none' id='HydroDetailID' name='HydroDetailID' type='text' value='" + item.HydroDetailID + "' /></td>";
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

            document.getElementById("PageTotalCount").value = data.ShoppingCartItemData.TotalPageCount;
            $("#TotalPageCount").html(data.ShoppingCartItemData.TotalPageCount);


            $("#txtPO").val(data.ShoppingCartItemData.PO);
            $("#SubmitStartTime").val(data.ShoppingCartItemData.XFD);
        }
        else
        {
            $("#labtxt").html(data.ErrorCode);
            showDiv();
        }
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

    $("#btnQuery").click(function () {
        GetOrder();
    })

    function GetOrder()
    {

        var Series = $("#DropSeries").val();
        var DropStyle = $("#DropStyle").val();
        var DropItem = $("#DropItem").val();
        var DropColor = $("#DropColor").val();
        var nowPage = $("#pc").val();

        var redata = {
            Series: Series,
            DropStyle: DropStyle,
            DropItem: DropItem,
            DropColor: DropColor,
            pageIndex:nowPage
        };

        
        
        $.post("/HydroFlask/ShoppingCartItemDetailPage", redata, function (data) {
            if (data.FunStatus == "success") {
                var detailhtml = "";
                var intSeq = 0;
                $.each(data.ShoppingCartItemDetailData.ItemDetaillist, function (i, item) {
                    intSeq++;
                    detailhtml += "<tr>";
                    detailhtml += "<td class='center'><input id='checkbox" + intSeq + "' name='checkbox" + intSeq + "' type='checkbox' value='true' class='magic-checkbox'  style='display:none;' /><label for='checkbox" + intSeq + "' style='margin-bottom: 20px;padding-left: 30px;'></label><input style='display:none' id='productid' name='productid' type='text' value='" + item.ProductID + "' /><input style='display:none' id='HydroDetailID' name='HydroDetailID' type='text' value='" + item.HydroDetailID + "' /></td>";
                    detailhtml += "<td class='center'><input id='txtqty' name='txtqty' type='text' /></td>";
                    detailhtml += "<td class='center'>PCS</td>";
                    detailhtml += "<td class='center' id='PrintImg' imgstr='" + item.ItemSmallPic + "' onmouseover='showimg(this);' onmouseout='hideimg();'><img src='" + item.ItemSmallPic + "' style='width:200px;' /></td>";
                    detailhtml += "<td class='center'>" + item.Series + "</td>";
                    detailhtml += "<td class='center'>" + item.Style + "</td>";
                    detailhtml += "<td class='center'>" + item.ItemName + "</td>";
                    detailhtml += "<td class='center'>" + item.Color + "</td>";
                    detailhtml += "<td class='center'>" + item.PrdouctDesc + "</td>";
                    detailhtml += "<td class='center'>" + item.SKU + "</td>";
                    detailhtml += "<td class='center'>" + item.OZ + "</td>";
                    detailhtml += "<td class='center'>" + item.BarCode + "</td>";
                    //detailhtml += "<td class='center' style='display:none'>@Html.TextBoxFor(x => x.SPlist[i].productid)</td>";
                    detailhtml += "</tr>";
                });

                document.getElementById("PageTotalCount").value = data.ShoppingCartItemDetailData.TotalPageCount;
                $("#TotalPageCount").html(data.ShoppingCartItemDetailData.TotalPageCount);
                $("#Order tbody").html(detailhtml);
            }
            else
            {
                $("#labtxt").html(data.ErrorCode);
                showDiv();
            }
        })
    }




    $("#Submit1").click(function () {
        var result = true;
        var adddata = "";
        $("input:checkbox").each(function (i, item) {
            var s = $(this).prop("checked");
            if (s) {

                var a = $(this).parents("tr").find("#txtqty").val();
                var reg = /^[0-9]*[1-9][0-9]*$/;
                if (!reg.test(a))
                {
                    $("#labtxt").html("Add QTY can not be 0 or empty");
                    $("#ok").css("display", "none")
                    $("#no").css("display", "none")
                    $("#txtCloselbtn").css("display", "inline");
                    showDiv();
                    result = false;
                    return false;
                }
                var qty = parseInt($(this).parents("tr").find("#txtqty").val());
                var productid = $(this).parents("tr").find("#productid").val();
                var HydroDetailID = $(this).parents("tr").find("#HydroDetailID").val();
                
                adddata += productid + "," + HydroDetailID + "," + qty + "^";
            }

        })

        if (adddata == "") {
            $("#labtxt").html("Please select a product to add");
            $("#ok").css("display", "none")
            $("#no").css("display", "none")
            $("#txtCloselbtn").css("display", "inline");
            showDiv();
        }
        else {
            $.post("/HydroFlask/AddShoppingCartItem", adddata, function (data) {
                if (data.FunStatus == "success")
                {
                    var shippingcarthtml = "";
                    $.each(data.ShippingCartList, function (i, item) {
                        shippingcarthtml += "<tr>";
                        shippingcarthtml += "<td class='romver' onclick='removeData(this)' style='cursor:pointer;'><a>Remove</a><input style='display:none' id='productid' name='productid' type='text' value='" + item.ProductID + "' /><input style='display:none' id='HydroDetailID' name='HydroDetailID' type='text' value='" + item.HydroDetailID + "' /></td>";
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
                }
                else
                {
                    $("#labtxt").html(data.ErrorCode);
                    showDiv();
                }
            });
        }

    })

    $("#DropSeries").change(function () {
        $("#DropStyle").val("");
        $("#DropItem").val("");
        ReLoadData();
    });
    $("#DropStyle").change(function () {
        $("#DropItem").val("");
        $("#DropColor").val("");
        ReLoadData();
    });
    $("#DropItem").change(function () {
        $("#DropColor").val("");
        ReLoadData();
    });
    $("#DropColor").change(function () {
        ReLoadData();
    });
    $("#Submit2").click(function () {

        if ($("#txtPO").val().length == 0)
        {
            $("#labtxt").html("Please Input PO#");
            showDiv();
            //alert("Please Input PO#");
            return;
        }
        if ($("#SubmitStartTime").val().length == 0) {
            $("#labtxt").html("Please Input Requested XFD");
            showDiv();
            //alert("Please Input Requested XFD");
            return;
        }

        $.post("/HydroFlask/BuyShoppingCartItem", $("#txtPO").val() + "^" + $("#SubmitStartTime").val(), function (data) {
            if (data.FunStatus == "success") {
                $.post("/HydroFlask/ShippingCartSubmit", "", function (data) {
                    $("#tab2").html(data);

                    $("#tab1").attr("class", "tab-pane");
                    $("#tab2").attr("class", "tab-pane active");
                    $("#SecondStep").attr("class", "span3 active")
                    $(".bar").css("width", "70%");

                });
            }
            else {
                $("#labtxt").html(data.ErrorCode);
                showDiv();
                //alert(data.ErrorCode);
            }
        });
    });
    //提交页面返回继续购物，因，整个购物车在由一个页面显示
    $("#Submit6").click(function () {       
        $.post("/HydroFlask/ShoppingCartItem", "", function (html) {
            $("#content").html(html)
        })

        //document.location.replace("/HydroFlask/ShoppingCartItem");
    });

});

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
    var x = $(obj).offset().left+200;
    var y = $(obj).offset().top;
    $("#divimgpreview").offset({ top: y, left: x })
    document.getElementById("imgpreview").src = producturl;
}
function showDiv() {
    document.getElementById('popDiv').style.display = 'block';
    document.getElementById('bg').style.display = 'block';
}
function closeDiv() {
    document.getElementById('popDiv').style.display = 'none';
    document.getElementById('bg').style.display = 'none';
}
function removeData(data) {
    //alert("Remove");
    var productid = $(data).parents("tr").find("#productid").val();
    var HydroDetailID = $(data).parents("tr").find("#HydroDetailID").val();
    var removedata = productid + ":" + HydroDetailID;

    if(removedata!=":")
    {
        $.post("/HydroFlask/RemoveShoppingCartItem", removedata, function (data) {
            if (data.FunStatus == "success") {
                var shippingcarthtml = "";
                $.each(data.ShippingCartList, function (i, item) {
                    shippingcarthtml += "<tr>";
                    shippingcarthtml += "<td class='romver' onclick='removeData(this)' style='cursor:pointer;'><a>Remove</a><input style='display:none' id='productid' name='productid' type='text' value='" + item.ProductID + "' /><input style='display:none' id='HydroDetailID' name='HydroDetailID' type='text' value='" + item.HydroDetailID + "' /></td>";
                    shippingcarthtml += "<td class='center'>" + (i + 1) + "</td>";
                    shippingcarthtml += "<td class='center' style='text-align:right;'>" + item.DetailQty + "</td>";
                    shippingcarthtml += "<td class='center'>PCS</td>";
                    shippingcarthtml += "<td class='center'>" + item.Series + "</td>";
                    shippingcarthtml += "<td class='center'>" + item.ItemName + "</td>";
                    shippingcarthtml += "<td class='center'>" + item.Color + "</td>";
                    shippingcarthtml += "<td class='center'>" + item.PrdouctDesc + "</td>";
                    shippingcarthtml += "<td class='center'>" + item.SKU + "</td>";
                    shippingcarthtml += "<td class='center'>" + item.OZ + "</td>";
                    shippingcarthtml += "<td class='center'>" + item.BarCode + "</td>";
                    shippingcarthtml += "</tr>";
                });
                $("#ShippingCartOrder tbody").html(shippingcarthtml);
            }
            else {
                $("#labtxt").html(data.ErrorCode);
                showDiv();
            }
        });
    }

    
}
function ReLoadData()
{
    $("#nowpage").val("1");

    var Series = $("#DropSeries").val();
    var DropStyle = $("#DropStyle").val();
    var DropItem = $("#DropItem").val();
    var DropColor = $("#DropColor").val();
   

    console.log("Series:" + Series + '///' + "DropStyle:" + DropStyle + '///' + "DropItem:" + DropItem)

    var redata = {
        Series: Series,
        DropStyle: DropStyle,
        DropItem: DropItem,
        DropColor: DropColor,
    };

    $.post("/HydroFlask/ReLoadShoppingCartItem", redata, function (data) {
        if (data.FunStatus == "success") {
            //$("#txtVendorName").val(data.ShoppingCartItemData.VendorName)

            //$('#DropSeries').append("<option value=''>--ALL--</option>");
            //$.each(data.ShoppingCartItemData.Serieslist, function (i, item) {
            //    $('#DropSeries').append("<option value='" + item.SeriesID + "'>" + item.SeriesName + "</option>");
            //});

            $('#DropStyle').html("");
            $('#DropStyle').append("<option value=''>--All--</option>");
            $.each(data.ShoppingCartItemData.Stylelist, function (i, item) {
                $('#DropStyle').append("<option value='" + item.StyleID + "'>" + item.StyleName + "</option>");
            });
            $('#DropStyle').val(DropStyle);

            $('#DropItem').html("");
            $('#DropItem').append("<option value=''>--All--</option>");
            $.each(data.ShoppingCartItemData.Itemlist, function (i, item) {
                $('#DropItem').append("<option value='" + item.ProductID + "'>" + item.ProductName + "</option>");
            });
            $('#DropItem').val(DropItem);

            $('#DropColor').html("");
            $('#DropColor').append("<option value=''>--All--</option>");
            $.each(data.ShoppingCartItemData.Colorlist, function (i, item) {
                $('#DropColor').append("<option value='" + item.ColorName + "'>" + item.ColorName + "</option>");
            });
            $("#DropColor").val(DropColor);

            var detailhtml = "";
            var intSeq = 0;
            $.each(data.ShoppingCartItemData.ItemDetaillist, function (i, item) {
                intSeq++;
                detailhtml += "<tr>";
                detailhtml += "<td class='center'><input id='checkbox" + intSeq + "' name='checkbox" + intSeq + "' type='checkbox' class='magic-checkbox' value='true'  style='display:none;' /><label for='checkbox" + intSeq + "' style='margin-bottom: 20px;padding-left: 30px;'></label><input style='display:none' id='productid' name='productid' type='text' value='" + item.ProductID + "' /><input style='display:none' id='HydroDetailID' name='HydroDetailID' type='text' value='" + item.HydroDetailID + "' /></td>";
                detailhtml += "<td class='center'><input id='txtqty' name='txtqty' type='text' /></td>";
                detailhtml += "<td class='center'>PCS</td>";
                detailhtml += "<td class='center' id='PrintImg' imgstr='" + item.ItemSmallPic + "' onmouseover='showimg(this);' onmouseout='hideimg();'><img src='" + item.ItemSmallPic + "' style='width:200px;' /></td>";
                detailhtml += "<td class='center'>" + item.Series + "</td>";
                detailhtml += "<td class='center'>" + item.Style + "</td>";
                detailhtml += "<td class='center'>" + item.ItemName + "</td>";
                detailhtml += "<td class='center'>" + item.Color + "</td>";
                detailhtml += "<td class='center'>" + item.PrdouctDesc + "</td>";
                detailhtml += "<td class='center'>" + item.SKU + "</td>";
                detailhtml += "<td class='center'>" + item.OZ + "</td>";
                detailhtml += "<td class='center'>" + item.BarCode + "</td>";
                //detailhtml += "<td class='center' style='display:none'>@Html.TextBoxFor(x => x.SPlist[i].productid)</td>";
                detailhtml += "</tr>";
            });

            document.getElementById("PageTotalCount").value = data.ShoppingCartItemData.TotalPageCount;
            $("#TotalPageCount").html(data.ShoppingCartItemData.TotalPageCount);

            $("#Order tbody").html(detailhtml);
        }
        else {
            $("#labtxt").html(data.ErrorCode);
            showDiv();
            //alert(data.ErrorCode);
        }
    });
}