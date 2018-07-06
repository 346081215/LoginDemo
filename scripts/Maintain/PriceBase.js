$(function () {
    if ($("#hiddenBrandID").val() == "BJB001") {
        $("#txtProductCode").removeAttr("style");
        $("#txtAddProductCode").removeAttr("style");
    }
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
    $("#Return").click(function () {
        $("#EditInfor").css("display", "none");
        $("#EditSavePrice").val("");
    });
    $("#AddReturn").click(function () {
        $("#Query-order").css("display", "none");
        $("#Query").slideDown();
    });
    $("#AddPrintShop").change(function () {
        $("#Calculation").css("display", "none");
        $("#DefaultValue").css("display", "none");
        $("#AddUnitPriceUSD").val("");
        PrintShop = $("#AddPrintShop option:selected").val();
        Brandid = $("#Brandid option:selected").val();
        if (PrintShop == "")
        {
            $("#NewCurrency").empty();
            $("#AddUnitPriceUSD").val("");
            $("#Calculation").css("display", "none");
            $("#DefaultValue").css("display", "none");
            $("#AddProductCode").val("");
            return false;
        }
        else
        {
            var _data =
                {
                    PrintShop: PrintShop,
                    Brandid: Brandid
                }
            $.post("/Maintain/PrintShopCurrencySet", _data, function (data)
            {
                if (data.FunStatus=="success")
                {
                    $("#NewCurrency").empty();
                    $.each(data.orderdata.CurrencyList, function (i, item)
                    {
                      
                        var CurrencyList = "";
                        if (item.Value!="USD") {
                            CurrencyList = "<option value='" + item.Value + "'>" + item.Text + "</option>";
                        }
                        $("#NewCurrency").append(CurrencyList);
                        $("#NewCurrency").val(data.Currency);
                        
                        $("#AddProductCode").val("");
                        $("#AddSavePrice").removeAttr("disabled");
                    });


                }
                else
                {
                    $("#labtxt").html(data.ErrorCode);
                    showDiv();
                    $("#Calculation").css("display", "none");
                    $("#DefaultValue").css("display", "none");
                    $("#NewCurrency").empty();
                    $("#AddSavePrice").attr("disabled", "disabled");
                    return false;
                }

            });
        }

    });
    $("#AddProductCode").change(function () {
        ProductCode = $("#AddProductCode option:selected").val();
        if (ProductCode == "")
        {
            $("#AddUnitPriceUSD").val("");
            $("#DefaultValue").css("display", "none");
            $("#Calculation").css("display", "none");
            return false;
        }
        Currency = $("#NewCurrency").val();
        if (Currency==null||Currency=="")
        {
            return false;
        }
        PrintShop = $("#AddPrintShop").val();
        var _data =
            {
                ProductCode: ProductCode,
                Currency: Currency,
                PrintShop: PrintShop
            }
        $.post("/Maintain/SettingReferenceValues", _data, function (data)
        {
            if (data.FunStatus=="success")
            {
                $("#CurrencyRT").text(data.orderdata.Currency);
                $("#Price").val(data.orderdata.ReferenceValues);
                $("#FOXR").text(data.orderdata.FOXR);
                $("#USDPrice").text(data.orderdata.UnitPrice_USD);
                $("#AddUnitPriceUSD").val("");
                $("#DefaultValue").css("display", "block");
                $("#AddUnitPriceUSD").removeAttr("readonly");
                $("#AddSavePrice").removeAttr("disabled");
                $("#Calculation").css("display","block");
            }
            else
            {
                $("#AddUnitPriceUSD").attr("readonly", "readonly");
                $("#AddSavePrice").attr("disabled", "disabled");
                $("#AddUnitPriceUSD").val("");
                $("#DefaultValue").css("display", "none");
                $("#Calculation").css("display", "none");
                $("#labtxt").html(data.ErrorCode);
                showDiv();
                return;
            }

        });

    });
    $("#NewCurrency").change(function () {
        ProductCode = $("#AddProductCode option:selected").val();
        if (ProductCode == "") {
            $("#AddUnitPriceUSD").val("");
            $("#DefaultValue").css("display", "none");
            $("#Calculation").css("display", "none");
            return false;
        }
        Currency = $("#NewCurrency").val();
        if (Currency == null || Currency == "") {
            return false;
        }
        PrintShop = $("#AddPrintShop").val();
        var _data =
            {
                ProductCode: ProductCode,
                Currency: Currency,
                PrintShop:PrintShop
            }
        $.post("/Maintain/SettingReferenceValues", _data, function (data) {
            if (data.FunStatus == "success") {
                $("#CurrencyRT").text(data.orderdata.Currency);
                $("#Price").val(data.orderdata.ReferenceValues);
                $("#FOXR").text(data.orderdata.FOXR);
                $("#USDPrice").text(data.orderdata.UnitPrice_USD);
                $("#AddUnitPriceUSD").val("");
                $("#DefaultValue").css("display", "block");
                $("#AddUnitPriceUSD").removeAttr("readonly");
                $("#AddSavePrice").removeAttr("disabled");
                $("#Calculation").css("display", "block");
            }
            else {
                $("#AddUnitPriceUSD").attr("readonly", "readonly");
                $("#AddSavePrice").attr("disabled", "disabled");
                $("#AddUnitPriceUSD").val("");
                $("#DefaultValue").css("display", "none");
                $("#Calculation").css("display", "none");
                $("#labtxt").html(data.ErrorCode);
                showDiv();
                return;
            }

        });

    });
    $("#Calculation").click(function () {
        var Price = $("#Price").val();
        $("#AddUnitPriceUSD").val(Price);

    });
    $("#EditCalculation").click(function () {
        var EditPriceRT = $("#EditPriceRT").val();
        $("#EditUnitPriceUSD").val(EditPriceRT);
    });
    $("#PrintShopId").change(function ()
    {
      

        PrintShop = $("#PrintShopId option:selected").val();
        Brandid = $("#Brandid option:selected").val();
        
        if (PrintShop == "")
        {
            $("#Currency").empty();
            $.post("/Maintain/GetAllCurrency",'no', function (data)
            {
                $.each(data.orderdata.CurrencyList, function (i, item)
                {

                    CurrencyList = "<option value='" + item.Value + "'>" + item.Text + "</option>";
                      $("#Currency").append(CurrencyList);
                      $("#Currency").val(data.Currency);
            })



        })
            return false;
        }
         var _data =
         {
            PrintShop : PrintShop,
            Brandid: Brandid
         }
    $.post("/Maintain/PrintShopCurrencySet", _data, function(data)
    {
                         if(data.FunStatus=="success")
                         {
                 $("#Currency").empty();
                 $.each(data.orderdata.CurrencyList, function (i, item) {

                        var CurrencyList = "";
                        CurrencyList = "<option value='" + item.Value + "'>" +item.Text + "</option>";
                        $("#Currency").append(CurrencyList);
                        $("#Currency").val(data.Currency);
                 });
                 $("#Currency option").each(function () {
                     if ($(this).val() == "USD") {
                         $(this).css("display", "none");
                     }
                 });


                 }
                         else
                         {

                             $("#labtxt").html(data.ErrorCode);
                             $("#Currency").empty();
                    showDiv();
                  
                 
                    return false;
    }

            });
    })
    //只能输入0-9和. 
    $("input[name='AddUnitPriceUSD']").keyup(function () {
        $(this).val($(this).val().replace(/[^0-9.]/g, ''));
    }).bind("paste", function () {  //CTR+V事件处理  
        $(this).val($(this).val().replace(/[^0-9.]/g, ''));
    }).css("ime-mode", "disabled"); //CSS设置输入法不可用  
    $("input[name='EditUnitPriceUSD']").keyup(function () {
        $(this).val($(this).val().replace(/[^0-9.]/g, ''));
    }).bind("paste", function () {  //CTR+V事件处理  
        $(this).val($(this).val().replace(/[^0-9.]/g, ''));
    }).css("ime-mode", "disabled"); //CSS设置输入法不可用  
});
function GetOrder() {

    var _needProductCode = document.getElementById("ProductCode").value;
    if (_needProductCode == "" || _needProductCode == null) {
        _needProductCode = document.getElementById("txtProductCode").value;
    }


    var QueryData =
        {
            Brand: $("#Brandid").val(),
            Currency:$("#Currency").val(),
            // ProductCode: $("#ProductCode").val(),
            ProductCode: _needProductCode,
            PrintShop:$("#PrintShopId").val(),
            Page: document.getElementById("nowpage").value
        }
    $.post("/Maintain/PriceBaseQuery", QueryData, function (data) {

        if (data) {
            var html = "";
            $.each(data, function (i, item) {
                html += "<tr>";
                html += "<td class='center'>" + item.Seq + "</td>";
                html += "<td class='center'>" + item.PrintShopId + "</td>";
                html += "<td class='center'>" + item.ProductCode + "</td>";
                html += "<td class='center' style='color:gray;'>" + item.UnitPrice_USD + "</td>";
                html += "<td class='center'>" + item.UnitPrice + "</td>";
                html += "<td class='center'>" + item.Currency + "</td>";
                html += "<td class='center'><button type=button id=Edit name=Edit class='btn btn-default' onclick='return EditPrice(this)' value='" + item.ProductPriceId + "'>Edit</button><button type=button id=Delete name=Delete class='btn btn-default' onclick='return DeletePrice(this)' value='" + item.ProductPriceId + "'>Delete</button></td>";
                html += "</tr>";
            })
            if (html == "") {
                $("#OrderDetail tbody").html("");
                $("#Query-Results").slideDown();
            }
            else {
                $("#OrderDetail tbody").html(html);
                $("#TotalPageCount").html(data[0].TotalPageCount);
                $("#PageTotalCount").val(data[0].TotalPageCount);
                $("#Query-Results").slideDown();
            }


        }
    });
}
function EditPrice(obj) {
    var ProductPriceId = obj.value;
    $.post("/Maintain/EditPrice", ProductPriceId, function (data) {
        if (data) {
            $("#EditPrintShop").val(data.orderdata.PrintShopId);
            $("#EditProductCode").val(data.orderdata.ProductName);
            $("#EditUnitPriceUSD").val(data.orderdata.UnitPrice);
            $("#EditCurrency").val(data.orderdata.Currency);
            $("#EditSavePrice").val(data.orderdata.ProductPriceId);
            $("#EditCurrencyRT").text(data.orderdata.Currency);
            $("#EditPriceRT").val(data.orderdata.ReferenceValues);
            $("#EditFOXR").text(data.orderdata.FOXR);
            $("#EditUSDPrice").text(data.orderdata.UnitPrice_USD);
            $("#EditPrintShop").attr("readonly", "readonly");
            $("#EditProductCode").attr("readonly", "readonly");
            $("#EditCurrency").attr("readonly", "readonly");
            $("#EditInfor").removeAttr("style");
        }
        else {
            $("#labtxt").html("Error");
            showDiv();
            return false;
        }

    });

}
function SavePrice(obj) {
    $("#labtxt").html("Are you sure you want to save it?");
    showDiv2();
    $("#ok").bind("click", function () {
        var ProductPriceId = obj.value;
        _data =
           {
               ProductPriceId: ProductPriceId,
               Brand: $("#Brandid").val(),
               EditPrintShop: $("#EditPrintShop").val(),
               EditProductCode: $("#EditProductCode").val(),
               EditCurrency: $("#EditCurrency").val(),
               EditUnitPrice: $("#EditUnitPriceUSD").val()
           }

        $.post("/Maintain/EditSavePrice", _data, function (data) {
            if (data.FunStatus == "success") {
                $("#EditInfor").css("display", "none");
                showDiv();
                GetOrder();
                closeDiv();
                return;

            }
            else {
                $("#labtxt").html("Error");
                showDiv();
                return false;
            }

        });


    });
    $("#no").bind("click", function () {
        closeDiv();
    })
}
function NewPrice() {
    $("#NewCurrency").empty();
    $("#Calculation").css("display", "none");
    $("#AddUnitPriceUSD").removeAttr("readonly");
    $("#AddSavePrice").removeAttr("disabled");
    $("#DefaultValue").css("display", "none");
    $("#AddUnitPriceUSD").val("");
    if ($("#Brandid").val().length == 0) {
        $("#labtxt").html("Please select a Brand");
        showDiv();
        return;
    }
   
    $("#Query").css("display", "none");
    $("#Query-Results").css("display", "none");
    $("#EditInfor").css("display", "none");
    $("#Query-order").slideDown();

    var Brandid = $("#Brandid").val();
    $.post("/Maintain/AddNewPrice", Brandid, function (data) {
        if (data) {
            $("#AddPrintShop").empty();
            $("#AddProductCode").empty();

            $.each(data.PrintShopList, function (i, item) {
                var PrintShopList = "";

                if (item.Disabled == false)
                {
                    $('#AddPrintShop').append("<option value='" + item.Value + "' style='color:black; font-weight:700'>" + item.Text + "</option>");
                }
                else
                {
                    $('#AddPrintShop').append("<option value='" + item.Value + "' disabled='disabled' >" + item.Text + "</option>");
                }

                $("#AddPrintShop").append(PrintShopList);
            });
            $.each(data.ProductCodeList, function (i, item) {
                var ProductCodeList = "";
                ProductCodeList = "<option value='" + item.Value + "'>" + item.Text + "</option>";
                $("#AddProductCode").append(ProductCodeList);
            });

        }

    });
}
function SaveNewPrice() {
    Brandid = $("#Brandid").val();
    Currency = $("#NewCurrency option:selected").val();
    PrintShop = $("#AddPrintShop option:selected").val();
    if (PrintShop == "") {

        $("#labtxt").html("Please select a PrintShop.");
        showDiv();
        return;
    }
    ProductCode = $("#AddProductCode option:selected").val();
    if (ProductCode == "") {

        ProductCode = $("#txtAddProductCode").val();
        if (ProductCode == "") {
            $("#labtxt").html("Please select a ProductCode.");
            showDiv();
            return;
        }
    }
    UnitPrice = $("#AddUnitPriceUSD").val();
    if (UnitPrice == "") {
        $("#labtxt").html("Please input a UnitPrice.");
        showDiv();
        return;

    }
    if (Currency == "")
    {
        $("#labtxt").html("Please select a Currency.");
        showDiv();
        return;

    }
    _data =
        {
            Brandid: Brandid,
            PrintShop: PrintShop,
            ProductCode: ProductCode,
            Currency:Currency,
            UnitPrice: UnitPrice
        }
    $.post("/Maintain/SaveNewPrice", _data, function (data) {
        if (data.FunStatus == "success") {
            $("#labtxt").html("success");
            showDiv();
            $("#Query-order").css("display", "none");
            $("#Query").slideDown();
            return;

        }
        else {
            $("#labtxt").html(data.FunStatus);
            showDiv();
            return false;
        }

    });
}
function DeletePrice(obj)
{
    $("#labtxt").html("Are you sure to Delete?");
    showDiv2();
    var Brandid = $("#Brandid").val();
    var ProductPriceId = obj.value;
    var _data =
    {
        Brandid: Brandid,
        ProductPriceId: ProductPriceId
    }

     $("#ok").bind("click", function () {
       
        $.post("/Maintain/DeletePrice",_data,function (data) {
            if (data.FunStatus == "success") {
                GetOrder();
                closeDiv();
            }
            else {
                $("#labtxt").html(data.FunStatus);
                showDiv();
                return false;
        }

     });
    })
    $("#no").bind("click", function () {
        closeDiv();
    })
}
