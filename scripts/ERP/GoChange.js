$(function () {
    //给seach绑定事件
    $("#Cxzh").click(
        //查询事件
       GetOrder

       );
    //查询出所有的下单客户
    GetCu();

    //绑定事件
    $("#select2choice").change(
        //下拉选择框改变事件
        change
   )

    //Add事件
    $("#AddZH").click(
        AddZ
        );
    $("#SaveZH").click(
        Savechangezh
        );

    //返回事件
    $("#GoPiv").click(
       GoPivGoBack
       );

    $("#step").click(function () {
        GoChange();
    });


    $('#PageIndexGO1').click(function () {
        document.getElementById("pcGO1").value = 1;
        document.getElementById("nowpageGO1").value = 1;
        if ($("#TotalPageCountGO1").html() == "0") {
            return false;
        }
        else {
            GetOrder();
        }
    });
    $('#PageupGO1').click(function () {
        var nowpage = document.getElementById("nowpageGO1").value;
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) > 1) {
            newpage = parseInt(nowpage) - 1;
            document.getElementById("pcGO1").value = newpage;
            document.getElementById("nowpageGO1").value = newpage;
            if ($("#TotalPageCountGO1").html() == "0") {
                return false;
            }
            else {
                GetOrder();
            }
        }
    });
    $('#PagewownGO1').click(function () {
        var nowpage = document.getElementById("nowpageGO1").value;
        var maxpage = parseInt(document.getElementById("PageTotalCountGO1").value);
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) < maxpage) newpage = parseInt(nowpage) + 1;
        document.getElementById("pcGO1").value = newpage;
        document.getElementById("nowpageGO1").value = newpage;
        if ($("#TotalPageCountGO1").html() == "0") {
            return false;
        }
        else {
            GetOrder();
        }

    });
    $('#PageLastGO1').click(function () {
        var maxpage = parseInt(document.getElementById("PageTotalCountGO1").value);
        document.getElementById("pcGO1").value = maxpage;
        document.getElementById("nowpageGO1").value = maxpage;
        if ($("#TotalPageCountGO1").html() == "0") {
            return false;
        }
        else {
            GetOrder();
        }
    });
    $('#PageGOGO1').click(function () {
        var nowpage = parseInt(document.getElementById("nowpageGO1").value);
        var maxpage = parseInt(document.getElementById("PageTotalCountGO1").value) + 1;
        if (nowpage > 0 && nowpage < maxpage) {
            document.getElementById("pcGO1").value = document.getElementById("nowpageGO1").value;
            if ($("#TotalPageCountGO1").html() == "0") {
                return false;
            }
            else {
                GetOrder();
            }
        }
        else {
            //alert("wrong page no.");
            $("#labtxt").html("wrong page no.");
            showDiv();
            document.getElementById("nowpageGO1").value = 1;
        }
    });
    $("#nowpageGO1").keyup(function () {
        var t = $("#nowpageGO1").val();
        if (isNaN(t)) {
            $("#labtxt").html("wrong page no.");
            showDiv();
            document.getElementById("nowpageGO1").value = 1;
        }
    });




    $('#PageIndex_MX').click(function () {
        document.getElementById("pc_MX").value = 1;
        document.getElementById("nowpage_MX").value = 1;
        if ($("#TotalPageCount_MX").html() == "0") {
            return false;
        }
        else {
            change();
        }
    });
    $('#Pageup_MX').click(function () {
        var nowpage = document.getElementById("nowpage_MX").value;
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) > 1) {
            newpage = parseInt(nowpage) - 1;
            document.getElementById("pc_MX").value = newpage;
            document.getElementById("nowpage_MX").value = newpage;
            if ($("#TotalPageCount_MX").html() == "0") {
                return false;
            }
            else {
                change();
            }
        }
    });
    $('#Pagewown_MX').click(function () {
        var nowpage = document.getElementById("nowpage_MX").value;
        var maxpage = parseInt(document.getElementById("PageTotalCount_MX").value);
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) < maxpage) newpage = parseInt(nowpage) + 1;
        document.getElementById("pc_MX").value = newpage;
        document.getElementById("nowpage_MX").value = newpage;
        if ($("#TotalPageCount_MX").html() == "0") {
            return false;
        }
        else {
            change();
        }

    });
    $('#PageLast_MX').click(function () {
        var maxpage = parseInt(document.getElementById("PageTotalCount_MX").value);
        document.getElementById("pc_MX").value = maxpage;
        document.getElementById("nowpage_MX").value = maxpage;
        if ($("#TotalPageCount_MX").html() == "0") {
            return false;
        }
        else {
            change();
        }
    });
    $('#PageGO_MX').click(function () {
        var nowpage = parseInt(document.getElementById("nowpage_MX").value);
        var maxpage = parseInt(document.getElementById("PageTotalCount_MX").value) + 1;
        if (nowpage > 0 && nowpage < maxpage) {
            document.getElementById("pc_MX").value = document.getElementById("nowpage_MX").value;
            if ($("#TotalPageCount_MX").html() == "0") {
                return false;
            }
            else {
                change();
            }
        }
        else {
            //alert("wrong page no.");
            $("#labtxt").html("wrong page no.");
            showDiv();
            document.getElementById("nowpage_MX").value = 1;
        }
    });
    $("#nowpage_MX").keyup(function () {
        var t = $("#nowpage_MX").val();
        if (isNaN(t)) {
            $("#labtxt").html("wrong page no.");
            showDiv();
            document.getElementById("nowpage_MX").value = 1;
        }
    });
})

//查询事件
function GetOrder() {
    $("#NRchange").slideDown("normal");
    var CXDH = $("#CXzhdH").val();
    var BillNo = $("#CXzhNo").val();
    var BillName = $("#CXzhName").val();
    var Page = document.getElementById("nowpageGO1").value;
    var _data = { "CXDH": CXDH, "BillNo": BillNo, "BillName": BillName, "Page": Page }
    debugger;
    var html = "";
    var TotalPageCount = "0";
    //html += "<th class='center'>" + "<input name='billtoIdCheck' type= 'checkbox'  value='" + item.BilltoId + "'/>" + "</th>";
    $.ajax({
        url: "/ERP/GetPIVndInfor",
        data: _data,
        dataType: 'json',
        type: 'post',
        success: function (res) {
            $.each(res, function (i, item) {
                html += "<tr>";
                html += "<th class='center'>" + "<button class='center' onclick='EditZh(this)' value='" + item.PIVndSeqNO + "'>Edit</button>" + "</th>";
                html += "<th class='center'>" + item.PIVndSeqNO + "</th>";
                html += "<th class='center'>" + item.VendorNO + "</th>";
                html += "<th class='center'>" + item.VendorName + "</th>";
                html += "<th class='center'>" + item.BillNO + "</th>";
                html += "<th class='center'>" + item.BillT100NO + "</th>";
                html += "<th class='center'>" + item.BillName + "</th>";
                html += "<th class='center'>" + item.BillAddress + "</th>";
                html += "<th class='center'>" + item.BillContactName + "</th>";
                html += "<th class='center'>" + item.BillTelephone + "</th>";
                html += "<th class='center'>" + item.BillBankaccount + "</th>";
                html += "<th class='center'>" + item.BillTax + "</th>";
                html += "<th class='center'>" + item.BillPayType + "</th>";
                html += "<th class='center'>" + item.BillCurrencyCode + "</th>";
                html += "<th class='center'>" + item.Notes + "</th>";
                html += "<th class='center'>" + item.IsEnable + "</th>";
                html += "<th class='center'>" + item.CreatedOn + "</th>";
                html += "<th class='center'>" + item.CreatedBy + "</th>";
                html += "<th class='center'>" + item.ModifiedOn + "</th>";
                html += "<th class='center'>" + item.ModifiedBy + "</th>";
                html += "</tr>";
            })
            debugger;
            TotalPageCount = res[0].TotalPageCount;
            $("#TotalPageCountGO1").html(TotalPageCount);
            $("#PageTotalCountGO1").val(TotalPageCount);
            $("#OrderDetailKPZH tbody").slideDown();
            $("#OrderDetailKPZH tbody").html(html);
            debugger;

        }
    })
}
var PIVndSeqNO;
//edit 事件
function EditZh(obj) {
    $("#NRchange2").slideDown("normal");
    PIVndSeqNO = obj.value;
    var res_ = "";
    //获取信息
    $.ajax({
        url: "/ERP/EditZh",
        data: { "PIVndSeqNO": PIVndSeqNO },
        dataType: "json",
        type: "post",
        success: function (res) {
            var res_ = res.replace(/[\\\b\f\n\r\t]/g, '');
            debugger;
            var obj = jQuery.parseJSON(res_);
            
            //当前代号
            $("#DQDH").html(PIVndSeqNO);
            var selehtml = "<option value=''>--ALL--</option>";
            var selehtmlxd = "<option value=''>--ALL--</option>";
            //当前抬头信息
            debugger;
            var oos_billingaccountid = obj.GetTT[0].oos_billingaccountid;
            var oos_accountid = obj.GetTT[0].oos_accountid;
            //var BillNO = obj.GetTT[0].BillNO;
            $("#changeTT").val();
            $("#changeTTxd").val();
            var html = "";
            //显示信息
            $.each(obj.GetZh, function (i, item) {
                debugger;
                html += "<tr>";
                html += "<th class='center'>" + "<button onclick='Remove(this)' class='center' oos_billi='" + item.CustomerId + "^" + item.oos_billingaccountid + "' value='" + item.PIVndSeqNO + "'>移除</button>" + "</th>";
                html += "<th class='center'>" + item.PIVndSeqNO + "</th>";
                //html += "<th class='center'>" + item.CustomerId + "</th>";
                html += "<th class='center'>" + item.CustomerNO + "</th>";
                html += "<th class='center'>" + item.Name + "</th>";
                html += "<th class='center'>" + item.BilltoAccountNumber + "</th>";
                html += "<th class='center'>" + item.BilltoName + "</th>";
                html += "</tr>";
                if (item.oos_billingaccountid == oos_billingaccountid) {
                    selehtml += "<option selected='selecetd' value='" + item.oos_billingaccountid + "'>" + item.BilltoAccountNumber + "</option>";
                } else {
                    selehtml += "<option value='" + item.oos_billingaccountid + "'>" + item.BilltoAccountNumber + "</option>";
                }
                if (item.CustomerId == oos_accountid) {
                    //selehtmlxd += "<option selected='selecetd' value='" + item.CustomerId + "'>" + item.CustomerId + "</option>";
                    selehtmlxd += "<option selected='selecetd' value='" + item.CustomerId + "'>" + item.CustomerNO + "</option>";
                } else {
                    selehtmlxd += "<option value='" + item.CustomerId + "'>" + item.CustomerNO + "</option>";
                }

            })
            debugger;
            $("#changeTT").html(selehtml);
            $("#changeTTxd").html(selehtmlxd);
            $("#OrderDetail tbody").slideDown();
            $("#OrderDetail tbody").html(html);

        }

    })

}
//获取所有下单客户
function GetCu() {
    var htmlCu = "<option value=''>--Please select--</option>";
    //获取下单客户信息
    $.ajax({
        url: "/ERP/GetCustomer",
        type: "post",
        success: function (res) {
            var obj = jQuery.parseJSON(res);
            $.each(obj, function (i, item) {
                htmlCu += "<option value='" + item.CustomerId + "'>" + item.CustomerNO + "__" + item.Name + "</option>";
            })
            $("#select2choice").html(htmlCu);
        }
    })
}
//下单下拉列表改变
function change() {
    var CustomerId = $("#select2choice").val();
    var html = "";
    var customerId = $("#select2choice").val();
    var Page = document.getElementById("nowpage_MX").value;
    var TotalPageCount = "0";
    $.ajax({
        url: "/ERP/ChangeCustomerId",
        data: { "customerId": customerId, "Page": Page },
        dataType: "json",
        type: "post",
        success: function (res) {
            var obj = jQuery.parseJSON(res);
            if (customerId == "") {
                $("#OrderDetailDeta tbody").html("");
            } else {
                debugger;
                $.each(obj, function (i, item) {
                    html += "<tr>";
                    html += "<th class='center' style='display:none'>" + CustomerId + "</th>";
                    html += "<th class='center'>" + "<input name='billCheckChange' type= 'checkbox'  value='" + item.BilltoId + "'/>" + "</th>";
                    html += "<th class='center'>" + item.BilltoId + "</th>";
                    html += "<th class='center'>" + item.BilltoNO + "</th>";
                    html += "<th class='center'>" + item.Name + "</th>";
                    html += "<th class='center'>" + item.ContactAddress + "</th>";
                    html += "<th class='center'>" + item.ContactTelephone + "</th>";
                    html += "</tr>";
                })
                TotalPageCount = obj[0].PageCount;
                $("#TotalPageCount_MX").html(TotalPageCount);
                $("#PageTotalCount_MX").val(TotalPageCount);
                $("#OrderDetailDeta tbody").slideDown();
                $("#OrderDetailDeta tbody").html(html);
            }
        }

    })
}
//移除事件
function Remove(obj) {
    var PIVndSeqNO = obj.value;
    var oos_customerId = obj.attributes["oos_billi"].value.split('^')[0];;
    var oos_billingaccountid = obj.attributes["oos_billi"].value.split('^')[1];;
    debugger;
    //获取信息
    $.ajax({
        url: "/ERP/RemoveZh",
        data: { "PIVndSeqNO": PIVndSeqNO, "oos_billingaccountid": oos_billingaccountid, "oos_customerId": oos_customerId },
        dataType: "json",
        type: "post",
        success: function (res) {
            if (res == "1") {
                alert("抱歉..抬头信息不能移除...")
            } else {
                var obj = jQuery.parseJSON(res);
                //当前代号
                $("#DQDH").html(PIVndSeqNO);
                var selehtml = "<option value=''>--ALL--</option>";
                var selehtmlxd = "<option value=''>--ALL--</option>";
                //当前抬头信息
                debugger;
                var oos_billingaccountid = obj.GetTT[0].oos_billingaccountid;
                var oos_accountid = obj.GetTT[0].oos_accountid;
                var BillNO = obj.GetTT[0].BillNO;
                $("#changeTT").val();
                $("#changeTTxd").val();
                var html = "";
                //显示信息
                $.each(obj.GetZh, function (i, item) {
                    html += "<tr>";
                    html += "<th class='center'>" + "<button onclick='Remove(this)' class='center' oos_billi='" + item.CustomerId + "^" + item.oos_billingaccountid + "' value='" + item.PIVndSeqNO + "'>移除</button>" + "</th>";
                    html += "<th class='center'>" + item.PIVndSeqNO + "</th>";
                    // html += "<th class='center'>" + item.CustomerId + "</th>";
                    html += "<th class='center'>" + item.CustomerNO + "</th>";
                    html += "<th class='center'>" + item.oos_accountid + "</th>";
                    html += "<th class='center'>" + item.BilltoAccountNumber + "</th>";
                    html += "<th class='center'>" + item.BilltoName + "</th>";
                    html += "</tr>";
                    if (item.oos_billingaccountid == oos_billingaccountid) {
                        selehtml += "<option selected='selecetd' value='" + item.oos_billingaccountid + "'>" + item.BilltoAccountNumber + "</option>";
                    } else {
                        selehtml += "<option value='" + item.oos_billingaccountid + "'>" + item.BilltoAccountNumber + "</option>";
                    }
                    if (item.CustomerId == oos_accountid) {
                        //selehtmlxd += "<option selected='selecetd' value='" + item.CustomerId + "'>" + item.CustomerId + "</option>";
                        selehtmlxd += "<option selected='selecetd' value='" + item.CustomerId + "'>" + item.CustomerNO + "</option>";
                    } else {
                        selehtmlxd += "<option value='" + item.CustomerId + "'>" + item.CustomerNO + "</option>";
                    }
                })
                debugger;
                $("#changeTT").html(selehtml);
                $("#changeTTxd").html(selehtmlxd);
                $("#OrderDetail tbody").html(html);
                $("#OrderDetail tbody").slideDown();
            }

        }
    })


}

//Add事件
function AddZ() {
    var obj = document.getElementsByName('billCheckChange'); //选择所有name为billtoIdCheck的对象 返回数组
    debugger;
    var sd = $("input[name='billCheckChange']:checked").length;
    if (sd == 0) {
        alert("您还没有选中任何值哦...");
        return;
    }
    //var DQDH = $("#DQDH").val
    //alert(PIVndSeqNO);
    //循环   ; c += obj[i].parentNode.previousSibling.innerText + ',';
    var s = "";
    var c = "";
    debugger;
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].checked) { s += obj[i].value + ','; c += obj[i].parentNode.previousSibling.innerText + ','; }//如果选中 将value的值添加到变量s中去  BillId
    }
    debugger;
    $.ajax({
        url: "/ERP/AddKPChange",
        data: { "billtoIdCheckValue": s, "BrandId": c, "DQDH": PIVndSeqNO },
        datype: 'json',
        type: "post",
        success: function (res) {
            if (!res.match("^\{(.+:.+,*){1,}\}$")) {

                //普通字符串处理
                alert(res);
                return;
            } else {
                debugger;
                var obj = jQuery.parseJSON(res);
                //当前代号
                var selehtml = "<option value=''>--ALL--</option>";
                var selehtmlxd = "<option value=''>--ALL--</option>";
                //当前抬头信息
                debugger;
                var oos_billingaccountid = obj.GetTT[0].oos_billingaccountid;
                var oos_accountid = obj.GetTT[0].oos_accountid;
                var BillNO = obj.GetTT[0].BillNO;
                $("#changeTT").val();
                $("#changeTTxd").val();
                var html = "";
                //显示信息
                $.each(obj.GetZh, function (i, item) {
                    html += "<tr>";
                    html += "<th class='center'>" + "<button onclick='Remove(this)' class='center' oos_billi='" + item.CustomerId + "^" + item.oos_billingaccountid + "' value='" + item.PIVndSeqNO + "'>移除</button>" + "</th>";
                    html += "<th class='center'>" + item.PIVndSeqNO + "</th>";
                    //html += "<th class='center'>" + item.CustomerId + "</th>";
                    html += "<th class='center'>" + item.CustomerNO + "</th>";
                    html += "<th class='center'>" + item.Name + "</th>";
                    html += "<th class='center'>" + item.BilltoAccountNumber + "</th>";
                    html += "<th class='center'>" + item.BilltoName + "</th>";
                    html += "</tr>";
                    if (item.oos_billingaccountid == oos_billingaccountid) {
                        selehtml += "<option selected='selecetd' value='" + item.oos_billingaccountid + "'>" + item.BilltoAccountNumber + "</option>";
                    } else {
                        selehtml += "<option value='" + item.oos_billingaccountid + "'>" + item.BilltoAccountNumber + "</option>";
                    }
                    if (item.CustomerId == oos_accountid) {
                        //selehtmlxd += "<option selected='selecetd' value='" + item.CustomerId + "'>" + item.CustomerId + "</option>";
                        selehtmlxd += "<option selected='selecetd' value='" + item.CustomerId + "'>" + item.CustomerNO + "</option>";
                    } else {
                        selehtmlxd += "<option value='" + item.CustomerId + "'>" + item.CustomerNO + "</option>";
                    }
                })
                debugger;
                $("#changeTT").html(selehtml);
                $("#changeTTxd").html(selehtmlxd);
                $("#OrderDetail tbody").slideDown();
                $("#OrderDetail tbody").html(html);
            }
        }
    })
}


//save 事件
function Savechangezh() {

    //验证是否选中了有抬头下拉
    var TdBillId = $("#changeTT").val();
    var changeTTxd = $("#changeTTxd").val();
    debugger;
    if (TdBillId == "" || changeTTxd == "") {
        alert("请选择必须的抬头信息。。。");
        return;
    }
    var datas = { "TdBillId": TdBillId, "changeTTxd": changeTTxd };
    //做保存操作
    $.post("/ERP/Savechange", datas, function (res) {
        if (res == "1") {
            alert("成功！！");
            // GoChange();
            $.ajax({
                type: "get",
                url: "/ERP/GoChange",
                contentType: "application/html; charset=utf-8",
                dataType: "html",
                success: function (res) {

                    $("#yemian").html(res);


                }
            }).error(function (xhr, status) {
                $("#labtxt").html(status)
                showDiv();
            })
        } else {
            alert(res);
        }
    });

}

//返回事件
function GoPivGoBack() {
    //返回新增页面
    $.ajax({
        url: "/ERP/PIVendorInf",
        type: "post",
        success: function (res) {
            $("#step").attr("class", "gray-em");
            $("#step1").removeAttr("style");

            $("#step1").attr("class", "red-em");
            $("#portlet").css("display", "none");
            $("#ProductTplEditView").html(res);
            $("#ProductTplEditView").slideDown();
        }
    });
}

//跳转页面
//function GoChange() {
//    $.ajax({
//        type: "get",
//        url: "/ERP/GoChange",
//        contentType: "application/html; charset=utf-8",
//        dataType: "html",
//        success: function (res) {
//       //  $("#step").attr("class", "gray-em");
//            //$("#step1").removeAttr("style");

//           //$("#step").attr("class", "red-em");
//           // $("#portlet").css("display", "none");
//           // //$("#Query").css("display", "none");
//           // //$("#Query-Results").css("display", "none");


//           // //$("#ProductTplEditView").css("display", "block");
//           // $("#ProductTplEditView").html(res);
//           // $("#ProductTplEditView").slideDown();

//            debugger;
//            //$("#step").attr("class", "gray-em");
//            $("#step").removeAttr("style");
//            $("#caption").css("display", "none");

//            $("#step1").attr("class", "red-em");

//            //$("#ProductTplEditView").html(res);
//            //$("#ProductTplEditView").slideDown();
//        }
//    }).error(function (xhr, status) {
//        $("#labtxt").html(status)
//        showDiv();
//    })
//}