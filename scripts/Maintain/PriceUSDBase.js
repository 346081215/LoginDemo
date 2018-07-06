$(function () {
    if ($("#hiddenBrandID").val()=="BJB001") {
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
            // ProductCode: $("#ProductCode").val(),
            ProductCode: _needProductCode,
            PrintShop: $("#PrintShopId").val(),
            Page: document.getElementById("nowpage").value
        }
    $.post("/Maintain/PriceUSDBaseQuery", QueryData, function (data) {

        if (data) {
            var html = "";
            $.each(data, function (i, item) {
                html += "<tr>";
                html += "<td class='center'>" + item.Seq + "</td>";
                html += "<td class='center'>" + item.PrintShopId + "</td>";
                html += "<td class='center'>" + item.ProductCode + "</td>";
                html += "<td class='center'>" + item.UnitPrice_USD + "</td>";
                html += "<td class='center'><button type=button id=Edit name=Edit class='btn btn-default' onclick='return EditPrice(this)' value='" + item.ProductUSDPriceId + "'>Edit</button><button type=button id=Delete name=Delete class='btn btn-default' onclick='return DeletePrice(this)' value='" + item.ProductUSDPriceId + "'>Delete</button></td>";
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
function EditPrice(obj)
{
    var ProductUSDPriceId = obj.value;
    $.post("/Maintain/EditPriceUSD", ProductUSDPriceId, function (data)
    {
        if (data)
        {
            $("#EditPrintShop").val(data.orderdata.PrintShopId);
            $("#EditProductCode").val(data.orderdata.ProductName);
            $("#EditUnitPriceUSD").val(data.orderdata.UnitPrice_USD);
            $("#EditSavePrice").val(data.orderdata.ProductUSDPriceId);
            $("#EditPrintShop").attr("readonly", "readonly");
            $("#EditProductCode").attr("readonly", "readonly");
            $("#EditInfor").removeAttr("style");
        }
        else
        {
            $("#labtxt").html("Error");
            showDiv();
            return false;
        }

    });

}
function SavePrice(obj)
{
    $("#labtxt").html("Are you sure you want to save it?");
    showDiv2();
    $("#ok").bind("click", function ()
    {
        var ProductUSDPriceId = obj.value;
        _data =
           {
               Brand: $("#Brandid").val(),
               EditPrintShop: $("#EditPrintShop").val(),
               EditProductCode: $("#EditProductCode").val(),
               EditUnitPriceUSD: $("#EditUnitPriceUSD").val(),
               ProductUSDPriceId: ProductUSDPriceId
           }
        $.post("/Maintain/EditSavePriceUSD", _data, function (data) {
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
function NewPrice()
{

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
    $.post("/Maintain/AddNewPriceUSD", Brandid, function (data)
    {
        if (data)
        {
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
function SaveNewPrice()
{
    Brandid=$("#Brandid").val();
    PrintShop = $("#AddPrintShop option:selected").val();
    if (PrintShop == "") {

        $("#labtxt").html("Please select a PrintShop.");
        showDiv();
        return;
    }
    ProductCode = $("#AddProductCode option:selected").val();
    if (ProductCode == "") {
        ProductCode = $("#txtAddProductCode").val();
        if (ProductCode=="") {
            $("#labtxt").html("Please select a ProductCode.");
            showDiv();
            return;
        }
    }
    UnitPriceUSD = $("#AddUnitPriceUSD").val();
    if (UnitPriceUSD == "")
    {
        $("#labtxt").html("Please input a UnitPrice.");
        showDiv();
        return;

    }
    _data =
        {
            Brandid:Brandid,
            PrintShop: PrintShop,
            ProductCode:ProductCode,
            UnitPriceUSD:UnitPriceUSD
        }
    $.post("/Maintain/SaveNewPriceUSD", _data, function (data) {
        if (data.FunStatus=="success")
        {
            $("#labtxt").html("success");
            showDiv();
            $("#Query-order").css("display", "none");
            $("#Query").slideDown();
            return;

        }
        else
        {
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
    $("#ok").bind("click", function ()
    {
        var Brandid = $("#Brandid").val();
        var ProductUSDPriceId = obj.value;
        var _data =
        {
            Brandid: Brandid,
            ProductUSDPriceId: ProductUSDPriceId
    }

        $.post("/Maintain/DeletePriceUSD", _data, function (data) {
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
    });
    $("#no").bind("click", function () {
        closeDiv();
    })
}
function SettingPrice()
{
    var Brandid=$("#Brandid").val();
    var PrintShopId = $("#PrintShopId").val();
    var ProductCode = $("#ProductCode").val();
    if (Brandid=="")
    {
        $("#labtxt").html("Please select a Brand");
        showDiv();
        return;
    }

    if (PrintShopId=="")
    {
        $("#labtxt").html("Please select a PrintShop");
        showDiv();
        return;
    }
    if (ProductCode == "")
    {
        $("#labtxt").html("Please select a ProductName");
        showDiv();
        return;
    }
    _data=
    {
        Brandid:Brandid,
        PrintShopId:PrintShopId,
        ProductCode:ProductCode
    }
    $.post("/Maintain/SettingPriceQuery", _data, function (data)
    {
        if (data.FunStatus == "success")
        {
            $("#labtxt").html("success");
            showDiv();
            return;
        }
        else
        {
            $("#labtxt").html(data.FunStatus);
            showDiv();
            return false;
        }

    })

}