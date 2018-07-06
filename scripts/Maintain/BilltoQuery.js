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
        funModifyRecordBillto(BilltoId);
    });
    $('#Pageup1').click(function () {
        var nowpage = document.getElementById("nowpage1").value;
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) > 1) {
            newpage = parseInt(nowpage) - 1;
            document.getElementById("pc1").value = newpage;
            document.getElementById("nowpage1").value = newpage;
            funModifyRecordBillto(BilltoId);
        }
    });
    $('#Pagewown1').click(function () {
        var nowpage = document.getElementById("nowpage1").value;
        var maxpage = parseInt(document.getElementById("PageTotalCount1").value);
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) < maxpage) newpage = parseInt(nowpage) + 1;
        document.getElementById("pc1").value = newpage;
        document.getElementById("nowpage1").value = newpage;
        funModifyRecordBillto(BilltoId);
    });
    $('#PageLast1').click(function () {
        var maxpage = parseInt(document.getElementById("PageTotalCount1").value);
        document.getElementById("pc1").value = maxpage;
        document.getElementById("nowpage1").value = maxpage;
        funModifyRecordBillto(BilltoId);
    });
    $('#PageGO1').click(function () {
        var nowpage = parseInt(document.getElementById("nowpage1").value);
        var maxpage = parseInt(document.getElementById("PageTotalCount1").value) + 1;
        if (nowpage > 0 && nowpage < maxpage) {
            document.getElementById("pc1").value = document.getElementById("nowpage1").value;
            funModifyRecordBillto(BilltoId);
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

    $("#BilltoReturn").click(function () {
        $("#EditAccountBillto").css("display", "none");
        GetOrder();
    });
    $("#step,#Return").click(function () {
        $("#Query-Results").css("display", "none");
        $("#Query").slideDown();
        $("#EditAccountBillto").css("display", "none");
        $("#step1").css("display", "none");
        $("#step").removeClass('gray-em');
        $("#step").addClass('red-em');
        $("#step1").css("display", "none");
        $("#step2").css("display", "none");
        $("#LogQuery").css("display","none");
    });
    $("#step1,#BilltoReturn").click(function () {
        $("#Query-Results").slideDown();
        $("#EditAccountBillto").css("display", "none");
        $("#step2").css("display", "none");
        $("#step1").removeClass('gray-em');
        $("#step1").addClass('red-em');
        GetOrder();
    });
    $("#LogQueryReturn").click(function () {
        $("#LogQuery").css("display", "none");
    });
});
function GetOrder() {
    $("#LogQuery").css("display","none");
    var QueryData =
        {
            Brand: $("#Brandid").val(),
            BilltoNumber: $("#BilltoNumber").val(),
            BilltoName: $("#BilltoName").val(),
            Page: document.getElementById("nowpage").value
        }
    $.post("/Maintain/BilltoQueryResults", QueryData, function (data) {

        if (data) {
            var html = "";
            $.each(data, function (i, item) {
                html += "<tr>";
                html += "<td class='center'>" + item.Seq + "</td>";
                html += "<td class='center'>" + item.CustomerId + "</td>";
                html += "<td class='center'>" + item.AccountNumber + "</td>";
                html += "<td class='center'>" + item.AccountName + "</td>";
                html += "<td class='center'>" + item.Address + "</td>";
                html += "<td class='center'><button type=button id=Edit name=Edit class='btn btn-default' style='margin-right:5px;' onclick='return funcEdit(this)' value='" + item.CustomerId + "'>Edit</button><button type=button id=ModifyRecord name=ModifyRecord class='btn btn-default'  onclick='return funModifyRecordBillto(this)' value='" + item.CustomerId + "'>Modify the record</button></td>";
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
    $("#LogQuery").css("display", "none");
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
    //$("#EBilltoNO").attr("disabled", "disabled");
    $("#Edit").removeAttr("display", "none");
    $("#Query-Results").css("display", "none");
    $("#step1").removeClass('red-em');
    $("#step1").addClass('gray-em');
    $("#step2").removeClass('gray-em');
    $("#step2").addClass('red-em');
    $("#step2").removeAttr("style");
    $("#Return").css("display", "none");
    $("#BilltoReturn").removeAttr("style");
    $.post("/Maintain/EditBilltoBind/", obj.value, function (data) {
        if (data.FunStatus) {
            var _data = data.BilltoBindData;
            $("#EBtCurrency").empty();
            $("#PaymentBT").empty();
            $("#EditCountryCode").empty();
            $("#EBilltoId").val(_data.BilltoId);
            $("#EBtName").val(_data.BilltoName);
            $("#EBilltoNO").val(_data.BilltoNO);
            $("#EBtTel").val(_data.Telephone);
            $("#EBtTelContacts").val(_data.Contact),
            $("#EBtAddress").val(_data.Address),
            $("#EBtFax").val(_data.Fax),
            $("#EBtEmail").val(_data.Email),
            $("#EidtBankAccount").val(_data.BankAccount);
            $("#EditERP_CodeNO").val(_data.ERP_CodeNO);
            $("#EditBankTaxNO").val(_data.BankTaxNO);

            //$.each(_data.CurrencyList, function (i, item) {
            //    var CurrencyList = "";
            //    CurrencyList = "<option value='" + item.Value + "'>" + item.Text + "</option>";
            //    $("#EBtCurrency").append(CurrencyList);
            //});
            debugger;
            $.each(_data.CurrencyList, function (i, item) {

                var CurrencyList = "";

                if (item.Disabled == false) {
                    $('#EBtCurrency').append("<option value='" + item.Value + "' style='color:black; font-weight:700'>" + item.Text + "</option>");
                }
                else {
                    $('#EBtCurrency').append("<option value='" + item.Value + "' disabled='disabled' >" + item.Text + "</option>");
                }
                $("#EBtCurrency").append(CurrencyList);
            });


            $("#EBtCurrency").val(_data.Currency)

            $.each(_data.PaymentList, function (i, item) {
                var PaymentList = "";
                PaymentList = "<option value='" + item.Value + "'>" + item.Text + "</option>";
                $("#PaymentBT").append(PaymentList);
            });
            $("#PaymentBT").val(_data.PayType)

            $.each(_data.CountryList, function (i, item) {
                var CountryList = "";
                CountryList = "<option value='" + item.Value + "'>" + item.Text + "</option>";
                $("#EditCountryCode").append(CountryList);
            });
            $("#EditCountryCode").val(_data.Country)

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
    var EBtCurrency = $("#EBtCurrency").val();
    if (EBtCurrency==""||EBtCurrency==null)
    {
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
    var Telephone = $("#EBtTel").val();
    var data_ = {
        BilltoId: BilltoId,
        BilltoName: BilltoName,
        BilltoNO:BilltoNO,
        Telephone:Telephone,
        Contact: $("#EBtTelContacts").val(),
        PayType: PayType,
        Address: $("#EBtAddress").val(),
        Fax: $("#EBtFax").val(),
        Email: $("#EBtEmail").val(),
        Currency: $("#EBtCurrency").val(),
        BankAccount: $("#EidtBankAccount").val(),
        ERP_CodeNO: $("#EditERP_CodeNO").val(),
        BankTaxNO: $("#EditBankTaxNO").val(),
        CountryCode: $("#EditCountryCode").val()
    }
    $.post("/Maintain/EditBillto", data_, function (data) {
        if (data.FunStatus == "success") {
            $("#labtxt").html("Success");
            showDiv();
        }
        else {
            $("#labtxt").html(data.FunStatus);
            showDiv();
        }
    })
}
function funAddNewBillto() {
    if ($("#Brandid").val().length == 0) {
        $("#labtxt").html("Please select a Brand");
        showDiv();
        return;
    }
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
    //$("#EBilltoNO").removeAttr("disabled");
    $("#EditBilltoRT").css("display", "none");
    $("#SaveBillto").removeAttr("style");
    $("#EditInfor").css("display", "none");
    $("#EditAccountBillto").slideDown();
    $("#step").removeClass('red-em');
    $("#step").addClass('gray-em');
    $("#step2").removeClass('gray-em');
    $("#step2").addClass('red-em');
    $("#step2").removeAttr("style");
    $("#Query").css("display", "none");
    $("#EditAccountBillto").slideDown();
    $("#Return").removeAttr("style");
    $("#BilltoReturn").css("display", "none");
}
function funSaveBillto()
{
    //EBilltoId = $("#EBilltoId").val();
    //if (EBilltoId == "")
    //{
    //    $("#labtxt").html("The BilltoId can not empty.");
    //    showDiv();
    //    return;
    //}
    EBtName = $("#EBtName").val();
    if (EBtName == "")
    {
        $("#labtxt").html("The BilltoName can not empty.");
        showDiv();
        return;
    }
    EBilltoNO = $("#EBilltoNO").val();
    if (EBilltoNO == "") {
        $("#labtxt").html("The BilltoNo can not empty.");
        showDiv();
        return;
    }
    PaymentBT = $("#PaymentBT").val();
    if (PaymentBT == "") {
        $("#labtxt").html("Please select a Payment.");
        showDiv();
        return;
    }
  
    var data_ = {
        //BilltoId: EBilltoId,
        BilltoName: EBtName,
        BilltoNO: EBilltoNO,
        Telephone: $("#EBtTel").val(),
        Contact: $("#EBtTelContacts").val(),
        PayType: PaymentBT,
        Address: $("#EBtAddress").val(),
        Fax: $("#EBtFax").val(),
        Email: $("#EBtEmail").val(),
        Currency: $("#EBtCurrency").val(),
        CustomerId: $("#Brandid").val()
    }
    $.post("/Maintain/SaveBillto", data_, function (data) {

        if (data.FunStatus == "success") {
            $("#labtxt").html("success");
            showDiv();
        }
        else {
            $("#labtxt").html(data.FunStatus);
            showDiv();
        }
    })
}
function funModifyRecordBillto(obj)
{
    var BilltoId = obj.value;
    $("#BilltoId").val(BilltoId);
    $("#Currentlabel").html(BilltoId);
    var Page = $("#nowpage1").val();

    _data =
        {
            BilltoId: BilltoId,
            Page: Page

        }
    $.post("/Maintain/ModifyRecordBillto",_data, function (data)
    {
        if (data)
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
            $("#labtxt").html("无记录");
            showDiv();
        }
        else {
            $("#BaseDataQury tbody").html(html);
            $("#LogQuery").css("display", "block");
            $("#TotalPageCount1").html(data[0].TotalPageCount);
            $("#PageTotalCount1").val(data[0].TotalPageCount);
        }

    });

}