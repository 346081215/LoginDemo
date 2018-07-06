$(function () {
    FormComponents.init();
    $("#btnQuery").click(function () {
        ResetPageNo();
        GetOrder();
    });
    $('#PIVndInfor').change(function () {
        ResetPIPanelToInitial();
        GetVendorInfo();
        ResetPageNo();
        GetOrder();
    });
    $('#btnExportPI').click(function () {
        ExportPI();
    });
    $('#btnExportERPOrder').click(function () {
        ExportERPOrder();
    });
    $('#btnCancelPI').click(function () {
        CancelPI();
    });
    $('#btnExportPIExcel').click(function () {
        ExportPIExcel();
    });
    $('#btnSendCustMail').click(function () {
        SendCustMail();
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
    $("#ckSelectAll").click(function () {
        $('#OrderDetail').find('[name="ckSelect"]').prop('checked', this.checked);
    });
});

function ResetPageNo() {
    $("#nowpage").val(1);
    $("#pc").val(1);
}

function DownloadFile(url) {
    var iframe = document.getElementById('downloadiframe');
    if (iframe == undefined) {
        iframe = document.createElement('iframe');
        iframe.id = 'downloadiframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }
    iframe.src = url;
}

function GetVendorInfo() {
    var queryObj = {
        PIVndSeqNO: $('#PIVndInfor').val()
    };
    $.post("/ERP/T100Order_M_GetVendorInfo", queryObj, function (data) {
        if (data.Data) {
            SetVendorInfo(data.Data);
        } else {
            SetVendorInfo();
            if (data.Error) {
                showDiv(data.Message);
            }
        }
    })
}

function GetQueryParameter() {
    return {
        BrandId: $('#Brandid').val(),
        MaximProdCate: $('#MaximProdCate').val(),
        MaximNO: $('#OOSNo').val(),
        PIVndSeqNO: $('#PIVndInfor').val(),
        SubmitDateStart: $('#dpOrderStartTime').val(),
        SubmitDateEnd: $('#dpOrderEndTime').val(),
        PO: $('#PO').val()
    };
}

function GetERPOrderParameter() {
    var ddlPayType = document.getElementById('ddlPayType');
    //var ckExportBillOrder = document.getElementById('ckExportBillOrder');
    //var ckUrgentOrder = document.getElementById('ckUrgentOrder');
    //var ckLC = document.getElementById('ckLC');

    return {
        //IsExportBillOrder: ckExportBillOrder.checked,
        //IsUrgentOrder: ckUrgentOrder.checked,
        PayType: ddlPayType.value,
        PayTypeText: ddlPayType.options[ddlPayType.selectedIndex].text,
        Freight: $('#txtfreight').val(),
        Description: $('#txtDesc').val(),
        Explain: $('#txtexplain').val(),
        Term: $('#txtTerm').val(),
        PaymentTerms: $('#txtPaymentTerms').val(),
        //IsLC: ckLC.checked,
        CustomerMailAddress: $('#txtCustomerMail').val(),
        BillToMailAddress: $('#txtBillToMail').val(),
    };
}

function GetOrder() {
    var queryObj = GetQueryParameter();

    var parameter = {
        query: queryObj,
        pageIndex: $("#nowpage").val(),
        pageSize: 20
    };

    var showSelect = queryObj.PIVndSeqNO && queryObj.PIVndSeqNO.length > 0;

    if (showSelect) {
        parameter.pageSize = 5000;
    }

    $.post("/ERP/T100Order_M_Query", parameter, function (data) {
        if (data.Data) {
            SetGrid(data.Data, data.TotalPage, showSelect);
        } else if (data.Error) {
            showDiv(data.Message);
        }
    })
}

function GetSelector(showSelect, value) {
    if (showSelect === true) {
        return `<td>
<input type="checkbox" name="ckSelect" />
<input type="hidden" name="hfOrderProductNO" value="${value}" />
</td>`;
    } else {
        return '<td class="hide"></td>';
    }
}

function GetDetails() {
    var details = [];
    $('#OrderDetail').find('tr').each(function (index) {
        if (index > 0) {
            var row = $(this);
            var selected = row.find('[name="ckSelect"]').prop('checked');
            if (selected) {
                var rowid = row.find('[name="hfOrderProductNO"]').val();
                var price = row.find('[name="txtERPPrice"]').val();
                details.push({
                    OrderProductNO: rowid,
                    ERPPrice: price
                });
            }
        }
    });
    return details;
}

function LockDetails() {
    $('#ckSelectAll').prop("disabled", true);
    $('#OrderDetail').find('tr').each(function (index) {
        if (index > 0) {
            var row = $(this);
            row.find('[name="ckSelect"]').prop("disabled", true);
            row.find('[name="txtERPPrice"]').prop("disabled", true);
        }
    });
}

function SetVendorInfo(data) {
    data = data || {};

    $('#PIVndTitle1').html(data.PIVndTitle1 || '');
    $('#PIVndTitle2').html(data.PIVndTitle2 || '');
    $('#PIVndTitle3').html(data.PIVndTitle3 || '');
    $('#txtCutomerNumber').val(data.CutomerNumber || '');
    $('#txtBilltoNumber').val(data.BilltoNumber || '');
    $('#txtBillToMail').val(data.BillToMailAddress || '');
}

function SetGrid(rowData, pageCount, showSelect) {
    $("#TotalPageCount").html(pageCount);
    $("#PageTotalCount").val(pageCount);

    if (rowData.length > 0 && document.getElementById('PIVndInfor').selectedIndex > 0) {
        $('#ERPOrderInfor').show();
    } else {
        $('#ERPOrderInfor').hide();
    }

    if (showSelect === true) {
        $("#selectorHead").removeClass("hide");
    } else {
        $("#selectorHead").addClass("hide");
    }

    var content = '';
    for (var index in rowData) {
        var item = rowData[index];
        content += '<tr>';
        content += GetSelector(showSelect, item.OrderProductNO);
        content += '<td>' + item.Seq + '</td>';
        content += '<td class="data-maximno">' + item.MaximNO + '</td>';
        content += '<td>' + item.PO + '</td>';
        content += '<td>' + item.OrderDate + '</td>';
        content += '<td>' + item.Customer + '</td>';
        content += '<td>' + item.BilltoNumber + '</td>';
        content += '<td>' + item.BilltoName + '</td>';
        content += '<td>' + item.Currency + '</td>';
        content += '<td>' + item.UnitPrice + '</td>';
        content += '<td><input type="text" name="txtERPPrice" value="' + item.ERPPrice + '"></td>'
        content += '<td>' + item.OrderQty + '</td>';
        content += '<td>' + item.Contact + '</td>';
        content += '<td>' + item.ShiptoName + '</td>';
        content += '<td>' + item.ServiceLevel + '</td>';
        content += '<td>' + item.ShipmentType + '</td>';
        content += '<td>' + item.FreightCompany + '</td>';
        content += '<td>' + item.AddComments + '</td>';
        content += '<td>' + item.Item + '</td>';
        content += '</tr>';
    }
    $('#OrderDetail tbody').html(content);

    $('#OrderDetail').find('tr').each(function (index) {
        if (index > 0) {
            var row = $(this);
            row.find('[name="ckSelect"]').click(CheckClick);
        }
    });
}

function CheckClick() {
    if (this.type === 'checkbox' && this.name === 'ckSelect') {
        var checked = this.checked;
        var maximno = $(this).parent().parent().find('[class*="data-maximno"]').text().replace(/^\s+|\s+$/g, '');

        $('#OrderDetail').find('tr').each(function (index) {
            if (index > 0) {
                var row = $(this);
                var thisMaximNO = row.find('[class*="data-maximno"]').text().replace(/^\s+|\s+$/g, '');
                if (maximno === thisMaximNO) {
                    row.find('[name="ckSelect"]').prop('checked', checked);
                }
            }
        });
    }
}

function ExportPI() {
    var details = GetDetails();

    if (details.length === 0) {
        showDiv("请选择需要操作的数据.");
        return;
    }

    var parameter = {
        query: GetQueryParameter(),
        details: details,
        erpParameter: GetERPOrderParameter()
    };

    $.post("/ERP/T100Order_M_ExportPI", parameter, function (data) {
        if (data.Data) {
            $('#NewPINO').data('PINO', data.Data.PINO).html(`PINO: [ ${data.Data.PINO} ]`);
            DownloadFile(data.Data.DownloadUrl);

            LockDetails();
            document.getElementById('btnExportPI').disabled = true;
            document.getElementById('btnExportPIExcel').disabled = false;
            document.getElementById('btnCancelPI').disabled = false;
            document.getElementById('btnExportERPOrder').disabled = false;
            document.getElementById('btnSendCustMail').disabled = false;
            document.getElementById('txtfreight').disabled = true;
        } else if (data.Error) {
            showDiv(data.Message);
        }
    });
}

function ExportERPOrder() {
    var details = GetDetails();

    if (details.length === 0) {
        showDiv("请选择需要操作的数据.");
        return;
    }

    var parameter = {
        PINO: $('#NewPINO').data('PINO'),
        details: details,
        erpParameter: GetERPOrderParameter()
    };

    $("#labtxt").html("确认是否提交产生ERP订单？提交后，请10分钟过后查看！")
    showDiv2();
    $("#no").click(function () {
        $("#popDiv").css("display", "none");
        $("#bg").css("display", "none");
    })
    $("#ok").click(function () {
        $("#popDiv").css("display", "none");
        $("#bg").css("display", "none");
        $.post("/ERP/T100Order_M_ExportERPOrder", parameter, function (data) {
            if (data.Error) {
                showDiv(data.Message);
            } else {
                //showDiv("提交成功,请10分钟过后查看!");
            }
            document.getElementById('btnCancelPI').disabled = true;
            document.getElementById('btnExportERPOrder').disabled = true;
        });
    });
}

function CancelPI() {
    var parameter = {
        PINO: $('#NewPINO').data('PINO')
    };

    $.post("/ERP/T100Order_M_CancelPI", parameter, function (data) {
        if (data.Message) {
            showDiv(data.Message);
        }

        ResetPIPanelToInitial();
        $('#PIVndInfor').change();
    });
}

function SendCustMail() {

    var _theMailstr = "";
    if ($('#txtCustomerMail').val() != "") {
        _theMailstr = $('#txtCustomerMail').val();
    }
    if ($('#txtBillToMail').val() != "") {
        if (_theMailstr == "") {
            _theMailstr = $('#txtBillToMail').val();
        }
        else {
            _theMailstr += ";" + $('#txtBillToMail').val();
        }
    }

    var parameter = {
        PINO: $('#NewPINO').data('PINO'),
        CustomerMailAddress: _theMailstr
    };

    $.post("/ERP/T100Order_M_SendMailToCustomer", parameter, function (data) {
        if (data.Message) {
            showDiv(data.Message);
        }

        ResetPIPanelToInitial();
        $('#PIVndInfor').change();
    });
}

function ExportPIExcel() {
    var details = GetDetails();

    if (details.length === 0) {
        showDiv("请选择需要操作的数据.");
        return;
    }

    var parameter = {
        query: GetQueryParameter(),
        details: details,
        erpParameter: GetERPOrderParameter(),
        PINO: $('#NewPINO').data('PINO')
    };

    $.post("/ERP/T100Order_M_ExportPI", parameter, function (data) {
        if (data.Data) {
            DownloadFile(data.Data.DownloadUrl);
        } else if (data.Error) {
            showDiv(data.Message);
        }
    });
}

function ResetPIPanelToInitial() {
    $('#NewPINO').html('').removeData('PINO');
    $('#PIVndTitle1').html('');
    $('#PIVndTitle2').html('');
    $('#PIVndTitle3').html('');

    document.getElementById('ckSelectAll').disabled = false;

    document.getElementById('btnExportPI').disabled = false;
    document.getElementById('btnExportPIExcel').disabled = true;
    document.getElementById('btnExportERPOrder').disabled = true;
    document.getElementById('btnCancelPI').disabled = true;
    document.getElementById('btnSendCustMail').disabled = true;

    document.getElementById('txtCutomerNumber').value = '';
    document.getElementById('txtBilltoNumber').value = '';
    //document.getElementById('ckExportBillOrder').checked = false;
    //document.getElementById('ckUrgentOrder').checked = false;
    document.getElementById('ddlPayType').selectedIndex = 0;
    document.getElementById('txtfreight').value = '';
    document.getElementById('txtfreight').disabled = false;
    document.getElementById('txtDesc').value = '';
    document.getElementById('txtexplain').value = '';
    document.getElementById('txtTerm').value = '';
    document.getElementById('txtPaymentTerms').value = '';
    //document.getElementById('ckLC').checked = false;
    document.getElementById('txtBillToMail').value = '';
    document.getElementById('txtCustomerMail').value = '';
}