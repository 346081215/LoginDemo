$(function () {
    FormComponents.init();
    $("#btnQuery").click(function () {
        document.getElementById("pc").value = 1;
        document.getElementById("nowpage").value = 1;
        GetOrder();
    });
    $("#step,#Back").click(function () {
        $("#Query").slideDown();
        $("#Query-Results").slideDown();
        $("#step").attr("class", "red-em");
        $("#step1").css("display", "none");
        $("#step2").css("display", "none");
        $("#ShowViewXML").css("display", "none");
        $("#ShowSubmitErpNO").css("display", "none");
    });
    $("#btnExportERPOrder").click(function () {
        $("#labtxt").html("确认是否提交产生ERP订单？提交后，请10分钟过后查看！")
        showDiv2();
        $("#no").click(function () {
            $("#popDiv").css("display", "none");
            $("#bg").css("display", "none");
        })
        $("#ok").click(function () {
            $("#popDiv").css("display", "none");
            $("#bg").css("display", "none");
        var pino = $("#lblNewPINO").html();
        $.post("/ERP/T100Order_PI_Edit_SubmitERP", { PINO: pino, erpParameter: GetERPOrderParameter() }, function (data) {
            if (data && data.Error) {
                //showDiv(data.Message);
                alert(data.Message);
            } else {
                //showDiv("提交成功,请10分钟过后查看!");
                //alert("提交成功,请10分钟过后查看!");
            }
        });
        });
    });
    $("#btnSendCustMail").click(function () {
        var _theMailstr = "";
        if ($('#txtCustMail').val() != "") {
            _theMailstr = $('#txtCustMail').val();
        }
        if ($('#txtbillmail').val() != "") {
            if (_theMailstr == "") {
                _theMailstr = $('#txtbillmail').val();
            }
            else {
                _theMailstr += ";" + $('#txtbillmail').val();
            }
        }
        //alert("发送邮件");
        var parameter = {
            PINO: $("#lblNewPINO").html(),
            CustomerMailAddress: _theMailstr
        };

        $.post("/ERP/T100Order_M_SendMailToCustomer", parameter, function (data) {
            if (data.Message) {
                alert(data.Message);
            }

        });
    });
    $("#btnExportPIExcel").click(function () {
        var parameter = {
            PINO: $("#lblNewPINO").html()
        };

        $.post("/ERP/T100Order_M_ExportPIExcel", parameter, function (data) {
            debugger;
            if (data.Data) {
                if (data.Data.DownloadUrl == "") {
                    alert("导出失败！" + data.Data.DownloadUrl);
                } else {
                    DownloadFile(data.Data.DownloadUrl);
                }

            } else if (data.Error) {
                alert(data.Message);
            }
        });
    });
});
function GetOrder() {
    var requestdata = {
        oos_orderno: $("#OOSNo").val(),
        PI_No: $("#PINO").val(),
        PIVndSeqNO: $("#ddlCustomer").val(),
        dpOrderStart: $("input[name='dpOrderStartTime']").val(),
        dpOrderEnd: $("input[name='dpOrderEndTime']").val(),
        T100Status: $("#ddlT100Status").val(),
        pc: $("#nowpage").val(),
        PO: $("#PO").val()
    };
    $.post("/ERP/T100Order_PI_Edit_Query", requestdata, function (data) {
        if (data.Funstatus == "1") {
            var html = "";
            $("#TotalPageCount").html(1);
            $("#PageTotalCount").val(1);
            $.each(data.Fundata, function (i, item) {
                html += "<tr>"
                html += " <td class=center><button type=button id=EditSCompany name=EditSCompany class='btn btn-default' style='margin-right: 5px;' "
                if (item.DisabledEdit == "1") {
                    html += " disabled='disabled' ";
                }
                html += " onclick='return funEditPI(this)'  value='" + item.PINO + "'>继续操作</button>";
                html += "<button type=button id=ViewXML name=ViewXML class='btn btn-default' style='margin-right: 5px;' onclick='return funViewXML(this);' value='" + item.PINO + "'>View</button>";
                html += "<button type=button id=CancelPI name=CancelPI class='btn btn-default' style='margin-right: 5px;' onclick='return funCancelPI(this);' ";
                if (item.DisabledCancel == "1") {
                    html += " disabled='disabled' ";
                }
                html += " value='" + item.PINO + "'>Cancel</button></td>";
                html += "<td>" + item.Seq + "</td>";
                html += "<td>" + item.PINO + "</td>";
                html += "<td>" + item.OOSOrderno + "</td>";
                html += "<td>" + item.ERPSO_NO + "</td>";
                html += "<td>" + item.T100OrderNO + "</td>";
                html += "<td>" + item.StatusName + "</td>";
                html += "<td>" + item.VendorNO + "</td>";
                html += "<td>" + item.VendorT100NO + "</td>";
                html += "<td>" + item.BillNO + "</td>";
                html += "<td>" + item.BillT100NO + "</td>";
                html += "<td>" + item.BillName + "</td>";
                html += "<td>" + item.BillContactName + "</td>";
                html += "<td>" + item.BillTelephone + "</td>";
                //html += " <td class=center><button type=button id=EditSCompany name=EditSCompany class='btn btn-default' onclick='return funEditCountry(this)' value='" + item.oos_countrycode + "'>Edit</button><button type=button id=DeleteSCompany name=DeleteSCompany class='btn btn-default' onclick='return funDeleteCountry(this);' value='" + item.oos_countrycode + "'>Delete</button>"
                html += "</tr>";
                $("#TotalPageCount").html(item.totalPgCount);
                $("#PageTotalCount").val(item.totalPgCount);
            });
            $("#OrderDetail tbody").html(html);
            $("#Query-Results").slideDown();
        }
        else {
            alert(data.FunErr);
        }
    })
}

//分页
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
        document.getElementById("nowpage").value = $("#pc").val();
    }
});
$("#nowpage").keyup(function () {
    var t = $("#nowpage").val();
    if (isNaN(t)) {
        $("#labtxt").html("wrong page no.");
        showDiv();
        document.getElementById("nowpage").value = $("#pc").val();
    }
});

function funEditPI(obj) {
    $.post("/ERP/T100Order_PI_Edit_EditPI", { PINO: obj.value }, function (data) {
        if (data.Funstatus == "1") {
            $("#Query").css("display", "none")
            $("#Query-Results").css('display', 'none');
            $("#ShowViewXML").css("display", "none");
            $("#ShowSubmitErpNO").slideDown();
            $("#step2").removeAttr("style");
            $("#step").attr("class", "gray-em");
            $("#step2").attr("class", "red-em");
            var Fundata = data.Fundata;
            $("#lblNewPINO").html(Fundata.PINO);
            $("#lblPIVndTitle1").html(Fundata.lblPIVndTitle1);
            $("#lblPIVndTitle2").html(Fundata.lblPIVndTitle2);
            $("#lblPIVndTitle3").html(Fundata.lblPIVndTitle3);
            $("#txtCutomerCode").val(Fundata.txtCutomerCode);
            $("#txtkaipaioCustCode").val(Fundata.txtkaipaioCustCode);
            $("#txtfreight").val(Fundata.txtfreight);
            $("#txtDesc").val(Fundata.txtDesc);
            $("#txtTERM").val(Fundata.txtTERM);
            $("#txtCustMail").val(Fundata.txtCustMail);
            $("#txtbillmail").val(Fundata.txtbillmail);

            //$("#ddlPayType").val(Fundata.ddlPayType)
            //$("#ddlPayType").get(0).selectedIndex = Fundata.ddlPayType;
            var selectindex = 0;
            for (var i = 0; i < document.getElementById('ddlPayType').length; i++) {
                if (document.getElementById('ddlPayType').options[i].text == Fundata.ddlPayType) {
                    selectindex = i;
                    break;
                }
            }
            $("#ddlPayType").get(0).selectedIndex = selectindex;
        }
        else {
            alert(data.FunErr);
        }
    });

}
function funViewXML(obj) {
    $.post("/ERP/T100Order_PI_Edit_ViewXML", { PINO: obj.value }, function (data) {
        if (data.Funstatus == "1") {
            var Fundata = data.Fundata;
            $("#TextBox_PI_V").val(Fundata.PINO);
            $("#T100RequestXML").val(Fundata.T100RequestXml);
            $("#T100ResponeXML").val(Fundata.T100ResponeXml);

            $("#Query").css("display", "none")
            $("#Query-Results").css('display', 'none');
            $("#ShowSubmitErpNO").css('display', 'none');
            $("#step1").removeAttr("style");
            $("#step").attr("class", "gray-em");
            $("#step1").attr("class", "red-em");
            $("#ShowViewXML").slideDown();
        }
        else {
            alert(data.FunErr);
        }
    });

}
function funCancelPI(obj) {
    var PINO = obj.value;
    if (PINO.length == 0) {
        alert("PI NO.不能为空");
        return false;
    }
    var _NoticeMsg2 = "确认要取消PI [" + PINO + "] 吗？";

    if (confirm(_NoticeMsg2)) {
        $.post("/ERP/T100Order_PI_Edit_CanCelPI", { PINO: obj.value }, function (data) {
            if (data.Funstatus == "1") {
                alert("取消PI [" + PINO + "]成功！");
            }
            else {
                alert(data.FunErr);
            }
        });
    }
    else {
        return false;
    }
}

function GetERPOrderParameter() {
    var ddlPayType = document.getElementById('ddlPayType');
    //var ckExportBillOrder = document.getElementById('ckexportbill');
    //var ckUrgentOrder = document.getElementById('ckUrgent_Order');
    //var ckLC = document.getElementById('ckLC');

    return {
        //IsExportBillOrder: ckExportBillOrder.checked,
        //IsUrgentOrder: ckUrgentOrder.checked,
        PayType: ddlPayType.value,
        PayTypeText: ddlPayType.options[ddlPayType.selectedIndex].text,
        Freight: $('#txtfreight').val(),
        Description: $('#txtDesc').val(),
        Explain: $('#txtexplain').val(),
        Term: $('#txtTERM').val(),
        PaymentTerms: $('#txtPaymentTerms').val(),
        //IsLC: ckLC.checked,
        CustomerMailAddress: $('#txtCustomerMail').val(),
        BillToMailAddress: $('#txtBillToMail').val(),
    };
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
