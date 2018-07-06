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
    $("#PrintShop").change(function () {


        PrintShop = $("#PrintShop option:selected").val();
        Brandid = $("#Brandid option:selected").val();

        if (PrintShop == "") {
            $("#Currency").empty();
            $.post("/Maintain/GetAllCurrency", '', function (data) {
                $.each(data.orderdata.CurrencyList, function (i, item) {

                    CurrencyList = "<option value='" + item.Value + "'>" + item.Text + "</option>";
                    $("#Currency").append(CurrencyList);
                    $("#Currency").val(data.Currency);
                })



            })
            return false;
        }
        var _data =
        {
            PrintShop: PrintShop,
            Brandid: Brandid
        }
        $.post("/Maintain/PrintShopCurrencySet", _data, function (data) {
            if (data.FunStatus == "success") {
                $("#Currency").empty();
                $.each(data.orderdata.CurrencyList, function (i, item) {

                    var CurrencyList = "";
                    CurrencyList = "<option value='" + item.Value + "'>" + item.Text + "</option>";
                    $("#Currency").append(CurrencyList);
                    $("#Currency").val(data.Currency);
                });
            }
            else {

                $("#labtxt").html(data.ErrorCode);
                $("#Currency").empty();
                showDiv();


                return false;
            }

        });
    })
    $("#Return").click(function () {
        $("#EditInfor").css("display", "none");
        $("#PSID").val("");
    });
    $("#no").click(function ()
    {
        closeDiv();
    })
    $("#AddReturn").click(function () {
        $("#Query-order").css("display", "none");
        $("#Query").slideDown();
    })
});
function GetOrder()
{
    var QueryData =
        {
            Brand: $("#Brandid").val(),
            Currency: $("#Currency").val(),
            PrintShop: $("#PrintShop").val(),
            Page: document.getElementById("nowpage").value
        }
    $.post("/Maintain/TransactionCurrencyQuery", QueryData, function (data) {

        if (data) {
            var html = "";
            $.each(data, function (i, item) {
                html += "<tr>";
                html += "<td class='center'>" + item.Seq + "</td>";
                html += "<td class='center'>" + item.PrintShop + "</td>";
                html += "<td class='center'>" + item.Currency + "</td>";
                html += "<td class='center'><button type=button id=Edit name=Edit class='btn btn-default' onclick='return EditCurrencys(this)' value='" + item.ID + "'>Edit</button><button type=button id=Delete name=Delete class='btn btn-default' onclick='return DeleteCurrency(this)' value='" + item.ID + "'>Delete</button></td>";
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
function EditCurrencys(obj)
{
    var ID = obj.value;
    $.post("/Maintain/EditCurrencyQuery", ID, function (data)
    {

        if (data)
        {
            $("#EditCurrency").empty();
            $("#EditInfor").css("display", "block");
            $("#EditPrintShop").val(data.orderdata.PrintShop);

            $.each(data.orderdata.CurrencyList, function (i, item) {
                var Countrylist = "";
                Countrylist = "<option value='" + item.Value + "'>" + item.Text + "</option>";
                $("#EditCurrency").append(Countrylist);
            })

            $("#EditCurrency").val(data.orderdata.Currency);
            $("#PSID").val(data.orderdata.PrintShopId);
            $("#EditSaveCurrency").val(ID);
        }
        else
        {

        }


    });

}
function DeleteCurrency(obj)
{
    $("#labtxt").html("Are you sure to Delete?");
    showDiv2();
    $("#ok").bind("click", function () {
        var ID = obj.value;
        $.post("/Maintain/DeleteCurrencyQuery", ID, function (data)
        {
            if (data.FunStatus = "success")
            {
                GetOrder();
                closeDiv();
            }
            else
            {
                $("#labtxt").html(data.FunStatus);
                showDiv();
                return false;
            }
        });
    });
    $("#no").bind("click", function ()
    {
        closeDiv();
    });

}
function NewCurrencySet()
{
    $("#Query").css("display", "none");
    $("#Query-Results").css("display", "none");
    $("#EditInfor").css("display", "none");
    $("#Query-order").slideDown();
    $.post("/Maintain/NewCurrencySetQuery", '', function (data)
    {
        if (data)
        {
            $("#AddPrintShop").empty();
            $("#AddCurrency").empty();
            $.each(data.orderdata.PrintShopList, function (i, item)
            {
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
            $.each(data.orderdata.CurrencyList, function (i, item) {
                var CurrencyList = "";
                CurrencyList = "<option value='" + item.Value + "'>" + item.Text + "</option>";
                $("#AddCurrency").append(CurrencyList);
            });
        }
        else
        {

        }

    });
}
function CurrencySetRT(obj)
{
    PrintShop = $("#AddPrintShop option:selected").val();
    if (PrintShop == "") {

        $("#labtxt").html("Please select a PrintShop.");
        showDiv();
        return;
    }
    Currency = $("#AddCurrency option:selected").val();
    if (Currency == "") {

        $("#labtxt").html("Please select a Currency.");
        showDiv();
        return;
    }
    var Brandid = $("#Brandid").val();
    var _data=
        {
            PrintShop:PrintShop,
            Currency: Currency,
            Brandid: Brandid
        }
    $.post("/Maintain/SaveCurrencySetRT", _data, function (data) 
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

    });
}
function SaveCurrency(obj)
{
    var ID = obj.value;
    var PSID = $("#PSID").val();
    var EditCurrency = $("#EditCurrency").val();
    var _data =
        {
            ID:ID,
            PSID: PSID,
            EditCurrency:EditCurrency
        }
    $.post("/Maintain/EditSaveCurrency", _data, function (data) {
        if (data.FunStatus == "success")
        {
            $("#labtxt").html("success");
            showDiv();
            GetOrder();
            $("#EditInfor").css("display","none");
            return;
        }
        else
        {
            $("#labtxt").html(data.ErrorCode);
            showDiv();
            return false;
        }

    });
}