    $('input[id=UploadFile]').change(function () {
        $('#photoCover').val($(this).val());
    });

function funcSuccessAction() {
    $("#Body_header").css('display', 'none');
    $("#Body_data").css('display', 'none');
}

function funcSubmitBefore() {
    $("#hfIsSubmit").val("1");
}

function funcCancelBefore() {
    $("#hfIsSubmit").val("0");
}
var RegVpn = new RegExp(/^[0-9]{3}-[0-9]{4}$/);
var RegStyleReg = new RegExp(/^[A-Z]{2}[0-9]{6}$/);

$(function () {
    LoadDeptT(0)
    //ShowOrdernoGridview();

    $("#btnNext").click(function () {
        $("#page-inner1").css("display", "none");
        $("#page-inner2").css("display", "block");
        $("#COOLabelQty2").attr("disabled", "disabled");
        $("#COOLabelQty2").css("background", "#E6E8EA");
        if ($("#_COOLabelName2").html() != "") {
            $("#COOLabelQty2").val($("#COOLabelQty").val());
        }

    })
    $("select[name='BilltoId']").change(function () {
        var data = {
            NewBillto: $("select[name='BilltoId']").val()
        };

        if ($("select[name='BilltoId'] option:selected").text() == "--Please Select--" || $("select[name='BilltoId']").val()=="") {
            $("#iBilltoAddress").val("");
            $("#iBilltoAddrContact").val("");
            $("#iBilltoAddrTel").val("");
        }
        else {
            var urlPost = "/OrderCommon/GetBilltoAccountInfobyAccountId?billtoId=" + $("select[name='BilltoId']").val();
            $.post(urlPost, data, function (data, status) {
                debugger;
                $("#iBilltoAddress").val(data.ContactAddress);
                $("#iBilltoAddrContact").val(data.ContactPerson);
                $("#iBilltoAddrTel").val(data.ContactTelephone);
            });
        }
    });
    $("select[name='ShiptoId']").change(function () {
        var data = {
            NewBillto: $("select[name='ShiptoId']").val()

        };

        if ($("select[name='ShiptoId'] option:selected").text() == "--Please Select--" || $("select[name='ShiptoId']").val()=="") {
            $("#ShipAddrId").empty();
            $("#ShipAddress").empty();
            $("#iShipAddrContact").val("");
            $("#iShipAddrTel").val("");
            $("#iShipAddrCountry").val("");
        } else {

            var urlPost = "/OrderCommon/GetShipAddressInforlistbyShipToId?ShipToId=" + $("select[name='ShiptoId']").val();
            $.post(urlPost, data, function (data, status) {
                $("select[name='ShipAddrId']").empty();
                $.each(data, function (i, item) {
                    debugger;
                    $("#ShipAddrId").append("<option value='" + item.ShipToAddressId + "'>" + item.oos_address + "</option>");
                });
                var _seq = 0;
                $.each(data, function (i, item) {
                    if (_seq == 0) {
                        $("#ShipAddress").val(item.oos_address);
                        $("#iShipAddrContact").val(item.oos_contactname);
                        $("#iShipAddrTel").val(item.oos_contacttel);
                        $("#iShipAddrCountry").val(item.oos_country);
                        _seq++;
                    }
                });
            });
        }


    })
    $("select[name='ShipAddrId']").change(function () {
        debugger;
        var data = {
            _shipaddressId: $(this).val()
        };
        var urlPost = "/OrderCommon/GetShipAddressInfobyShipAddressId?ShippAddrId=" + $(this).val();
        $.post(urlPost, data, function (data, status) {
            $("textarea[name='ShipAddress']").val(data.oos_address);
            $("#iShipAddrContact").val(data.oos_contactname);
            $("#iShipAddrTel").val(data.oos_contacttel);
            $("#iShipAddrCountry").val(data.oos_country);
        });
    });

    $("select[name='_ShipmentType']").change(function () {
        if ($(this).val() != "Express") {
            $("select[name='_ExpressCompany']").get(0).selectedIndex = 0;
            $("select[name='_ExpressCompany']").attr("disabled", "disabled");
            $("select[name='_ExpressCompany']").css("background", "#E6E8EA");

        }
        else {
            $("select[name='_ExpressCompany']").removeAttr("disabled");
            $("select[name='_ExpressCompany']").removeAttr("style");
        }

    })

    $("#BrandLogoId").change(function () {
        if ($(this).val() == "ELLE") {
            $("#CarelableId").val("1940dfcd-a4da-4cf2-b522-26775d9365de");
        }
        if ($(this).val() == "KAPPA") {
            $("#CarelableId").val("aa98b542-214c-4897-90d8-365a70e10ed1");
        }
        if ($(this).val() == "LEE COOPER") {
            $("#CarelableId").val("a2072992-13d4-4b6d-b5d4-4c3561c58742");
        }
        if ($(this).val() == "Splash") {
            $("#CarelableId").val("dcc4b80d-50d8-418f-ace3-d5430eca864b");
        }
        if ($(this).val() == "Black by Splash") {
            $("#CarelableId").val("1940dfcd-a4da-4cf2-b522-26775d9365de");
        }

    })

    $("select[name='_SpareRate']").change(function () {
        $("#UserSelectRealRate").val($(this).val());

    })
   

    $("#btnCancel").click(function () {
        var urlPost = "/Carelable/CarelableCancel/" + $("#TempOrderID").val();
        $.post(urlPost, $("#TempOrderID").val(), function (data, status) {
            if (data == "true") {
                location.href = "OrderUploadCarelable";
            }
            else {
                $("#labtxt").html(data);
                showDiv();
            }
        })
    })
    $("input[name='ComPercent']").keyup(function () {
        var tmptxt = $(this).val();
        $(this).val(tmptxt.replace(/\D|^0/g, ''));
    }).bind("paste", function () {
        var tmptxt = $(this).val();
        $(this).val(tmptxt.replace(/\D|^0/g, ''));
    }).css("ime-mode", "disabled");


    $("#btnReturnToTescoMain").click(function () {
        showloading();
        $.ajax({
            url: "/Tesco/LoadOrderCarelable",
            success: function (html) {
                $("#content").html(html);
                hideloading();
            }
        })
    })
    $('.select').each(function () {
        syncDropdown(this, createDropdown(this));
    });
        
    $("#productid").change(function () {
        debugger;
        if (this.value == "TSC001-GCLW25M11364G" || this.value == "TSC001-GCLW25M11372G" || this.value == "TSC001-GCLB25M11404G" || this.value == "TSC001-GCLB25M11396G") {
            $("#fire").removeAttr("disabled")
            $("#fire2").removeAttr("disabled")
            $("#fire").removeAttr("checked");
            $("#fire2").removeAttr("checked")
            $("[name=fire]").hide();
            $("[name=fire]").show();
        } else if (this.value == "TSC001-GCLW25M11366G" || this.value == "TSC001-GCLW25M11370G" || this.value == "TSC001-GCLW25M11371G" || this.value == "TSC001-GCLW25M11374G"
                || this.value == "TSC001-GCLB25M11406G" || this.value == "TSC001-GCLB25M11398G" || this.value == "TSC001-GCLB25M11403G" || this.value == "TSC001-GCLB25M11402G") {
            $("#fire").prop("disabled", "disabled")
            $("#fire2").prop("disabled", "disabled")
            $("#fire2").prop("checked", "checked")
            $("#fire").removeAttr("checked");
            $("[name=fire]").hide();
            $("[name=fire]").show();
        } else {
            $("#fire").prop("disabled", "disabled")
            $("#fire2").prop("disabled", "disabled")
            $("#fire").prop("checked", "checked")
            $("#fire2").removeAttr("checked")
            $("[name=fire]").hide();
            $("[name=fire]").show();
        }
    })

});


//function checkbox_checked(data) {
//    var $a = $(data).parents("tr").find("#carelablestyle").val();
//    $('input:checkbox[name=checkbox]').each(function (i) {
//        var $b = $(this).parents("tr").find("#carelablestyle").val()
//        if ($b == $a) {
//            $(this).parents("tr").find("#checkbox").prop("checked", true);
//        }
//    })
//}

//function checkbox_checkedALL(data) {
//    var s = $("#checkboxall").prop("checked");
//    var checkbox = $("input[type='checkbox']");
//    if (s) {
//        checkbox.prop("checked", true);
//    }
//    else {
//        if (NoFiberSavestr != "") {
//            var str = NoFiberSavestr;
//            var arr = str.split("^");
//            for (var i = 0; i < arr.length; i++) {
//                var seq = parseInt(arr[i]) + 1;
//                $('input:checkbox').eq(seq).attr('checked', false)
//            }
//        }
//        else {
//            checkbox.prop("checked", false)
//        }
//    }
//}


function btn_Back() {
    $("#PdfLineData").html("");
    $("#page-inner1").css("display", "block");
    $("#page-inner2").css("display", "none");
    $("#btnUploadEna").hide();
    $("#btnUpload").show();
    $("#btnUpload").removeAttr("disabled");
}

//13 14 15 16
//Fiber (第一页) 并添加验证
function funcToGetFiber() {
    $("#createOrUpload").val("upload")
    if ($("[name='_ShipmentType']").val() == "" || $("[name='_ShipmentType']").val() == null) {
        $("#labtxt").html("Please Select ShipmentType")
        showDiv();
        return;
    };
    if ($("[name='_ShipmentType']").val() == "Express" && $("[name='_ExpressCompany']").val() == "") {
        $("#labtxt").html("Please Select Freight Company")
        showDiv();
        return;
    };
    if ($("#ShipAddrId").val() == "" || $("#ShipAddrId").val() == null) {
        $("#labtxt").html("Please Select Shipping Address")
        showDiv();
        return;
    };
    if ($("#productid").val() == "" || $("#productid").val() == null) {
        $("#labtxt").html("Please Select Item")
        showDiv();
        return;
    };
    var table2 = document.getElementById("PdfLineData");
    var indexLine = [];
    for (var i = 0; i < table2.childElementCount; i++) {
    if (!isNumber(table2.children[i].children[1].children[0].value)) {
        $("#labtxt").html("Please Check QTY"); showDiv(); return;
    }
    if (table2.children[i].children[2].children[0].value == "") {
            $("#labtxt").html("Purchase Order can not be empty"); showDiv(); return;
        };
        if (table2.children[i].children[3].innerHTML=="") {
            $("#labtxt").html("Supplier No  can not be empty"); showDiv(); return;
        };
        if (table2.children[i].children[4].innerHTML=="") {
            $("#labtxt").html("Category  can not be empty"); showDiv(); return;
        };
        if (table2.children[i].children[5].innerHTML=="") {
            $("#labtxt").html("Country  can not be empty"); showDiv(); return;
        };
        if (table2.children[i].children[6].children[0].value != "") {
            if(!RegVpn.test(table2.children[i].children[6].children[0].value)){
                $("#labtxt").html("Error! VPN should have 3 numbers + '-' + 4 numbers, e.g. 123-4567"); showDiv(); return;
            }
        } else {
            $("#labtxt").html("VPN cannot be empty"); showDiv(); return;
        }
        if (table2.children[i].children[7].children[0].value != "") {
            if (!RegStyleReg.test(table2.children[i].children[7].children[0].value)) {
                $("#labtxt").html("Error!  Style No. should start with 2 capital letters and 6 numbers, e.g. AB123456"); showDiv(); return;
            }
        };
        if (table2.children[i].children[8].innerHTML=="") {
            $("#labtxt").html("Colour  can not be empty"); showDiv(); return;
        };
        if (table2.children[i].children[10].innerHTML=="") {
            $("#labtxt").html("EANBarcode  can not be empty"); showDiv(); return;
        };
        var code = table2.children[i].children[10].innerHTML;
        if (!valid(code)) {
            $("#labtxt").html("EANBarcode Err;Please check the PDF"); showDiv(); return;
        };
        var size = [];
        for (var j = 13; j < 17; j++) {
            if (!(size.indexOf(table2.children[i].children[j].children[0].value) > -1) && table2.children[i].children[j].children[0].value != "") {
                size.push(table2.children[i].children[j].children[0].value);
            } else if (table2.children[i].children[j].children[0].value != "") {
                if (!(indexLine.indexOf((i+1))>-1)) {
                    indexLine.push((i + 1));
                } 
            }
        }

};
if (indexLine.length>0) {
    $("#labtxt").html("      Error! line [" + indexLine.join(",") + "], Optional Secondary Sizing is repeated. Pls check and revise.")
    showDiv();
    return;
}
var bool= true;
for (var i = 0; i < table2.childElementCount; i++) {
    if (table2.children[i].children[1].children[0].value == null || table2.children[i].children[1].children[0].value == "") {
        bool = false;
    };
    if (table2.children[i].children[11].children[0].value=="--Please Select--") {
        bool =false;
};
    if (table2.children[i].children[12].children[0].value=="--Please Select--") {
        bool =false;
    };
    //if (table2.children[i].children[11].children[0].value == "Ladies Hosiery" || table2.children[i].children[11].children[0].value == "Womens Swimwear") {
    //    $("#labtxt").html("最后一行DEPT资料有误，请重新选择！" + table2.children[i].children[11].children[0].value); showDiv(); return;
    //}
};
if (bool==false) { 
    $("#labtxt").html("Please check the page data")
    showDiv();
    return;
}
    $("#labtxt").html("Please make sure you already put in the order qty.?(请核对您输入的数量是否正确。)")
    showDiv2();
    $("#no").click(function () {
        $("#popDiv").css("display", "none");
        $("#bg").css("display", "none");
    })
    $("#ok").click(function () {
        $("#popDiv").css("display", "none");
        $("#bg").css("display", "none");
        OrderFiber();
    });
}
function OrderFiber() {
    var data2 = [];
    var table = document.getElementById("PdfLineData");
    var table2 = document.getElementById("OrdDetail");
    for (var i = 0 ; i < 1; i++) {
        for (var j = 0, cells = table2.rows[i].cells.length; j < cells; j++) {
            data2[j] = table2.rows[0].cells[j].innerHTML.replace(/\s+/g, "");
        }
    }
    var str = ""
    for (var i = 0, rows = table.rows.length; i < rows; i++) {
        for (var j = 0, cells = table.rows[i].cells.length; j < cells; j++) {
            if (j == 1||j==2||j==6||j==7|| j > 10) {
                if (j == 12) {
                    str += data2[j] + ":" + $("#Size" + i + " option:selected").text();
                    str += "ˇ";
                    str += "SizeID"+i + ":" + $("#Size" + i).val();
                    str += "ˇ";

                } else if (j == 11) {
                    str += data2[j] + ":" + $("#Dept" + i + " option:selected").text();
                    str += "ˇ";
    
                } else {
                    str += data2[j] + ":" + table.rows[i].cells[j].childNodes[0].value.trim();
                    str += "ˇ";
                }
            } else {
                str += data2[j] + ":" + table.rows[i].cells[j].innerHTML.trim();;
                str += "ˇ";
            }
        }
        str = str.substring(0, str.length - 1);
        str += "^";
    };
    str = str.substring(0, str.length - 1);
    console.log(str);

    //submaitData.OrderHeader.OrderDetail = data;
    var submaitData = {
        "OrderHeader":
        {
            "Ordformatid": $("#productid").val(),
            "PrintShopId": $("#PSID").val(),            
            "BillToId": $("#BilltoId").val(),
            "ShipToId": $("#ShiptoId").val(),
            "ShipToAddressId": $("#ShipAddrId").val(),

            "ShipmentTypeId": $("[name='_ShipmentType']").val(),
            "FreightCompany": $("[name='_ExpressCompany'] option:selected").text(),
            "Language": "",      
            "WasteAllowanceId": $("[name='_SpareRate']").val(),
            "OrderDetail": str //点击Upload之后存的数据多行和单行
        }
    };
    
    //console.log(submaitData.OrderHeader);
    $.ajax({
        url: "/Tesco/SavePdfSizeDataAndGotoFiber",
        type: "post",
        dataType: "json",
        data: {
            "submaitPdfData": submaitData.OrderHeader,
        },
        success: function (a) {
            if (a != false) {
                $("#hfTempOrderId").val(a);
                $("#step1").removeClass("red-em");
                $("#step1").addClass("gray-em");
                $("#step2").css("display", "block");
                $("#step2").removeClass("gray-em");
                $("#step2").addClass("red-em");
                $("#Body_header").css("display", "none");
                $("#EditFiberCareInstr").slideDown();
                //$("#EditFiberCareInstr").html(data);
                $("#Category tbody").html("");
                $("#Fiber tbody").html("");
                $("#Category").css("display", "none");
                $("#Fiber").css("display", "none");


            }
           
        }
    })
}


var FiberSavestr = "";
var NoFiberSavestr = "";
function funcBackFromFiberSave(obj) {
    //alert(obj);
    FiberSavestr += obj;
    $("#hfSelectedItemID_checked").val(FiberSavestr);
    $("#step3").removeClass("red-em");
    $("#step3").addClass("gray-em");
    $("#step3").css("display", "none");
    $("#step2").removeClass("red-em");
    $("#step2").addClass("gray-em");
    $("#step2").css("display", "none");
    $("#step1").removeClass("gray-em");
    $("#step1").addClass("red-em");

    var str = FiberSavestr
    var arr = str.split("b");
    var FiberSaveCount = arr.length - 1;

    var ItemCount = $("#CarelableUploadOrder tr").length - 1;
    //alert(ItemCount);
    //alert(FiberSaveCount);
    $("#Body_header").removeAttr("style");
    if (FiberSaveCount == ItemCount) {
        $("#btnNext").removeAttr("disabled");
        $("#btnFiber").attr("disabled", "disabled");
        $("input:checkbox").attr("disabled", "disabled");
    }
    else {
        $('input:checkbox[name=checkbox]').not(":checked").each(function (i) {
            NoFiberSavestr += $(this).attr("seq") + "^";

        })
    }



}
function funcartwork() {
    //$("#COOLabelName").val($("#_COOLabelName").html());
    //var _data = {
    //    _TempId: $("#TempOrderID").val(),
    //    COOLabelName: $("#COOLabelName").val(),
    //    COOLabelQty: $("#COOLabelQty").val(),
    //    PrintshopId: $("#PSID option:selected").text(),
    //    Printshop: $("#PSID").val(),
    //    productid: $("#CarelableId").val(),
    //    productname: $("#CarelableId option:selected").text(),
    //    UserSelectRealRate: $("#UserSelectRealRate").val()
    //};

    ////alert(_data);
    //var urlPost = "/Carelable/CarelableUpload_Confirm/";
    //$.post(urlPost, _data, function (data, status) {
    //    if (data != "") {
    //        location.href = "SubimtOK/?OrderNo=" + data;
    //    }
    //}).error(function () {
    //    $("#labtxt").html(status)
    //    showDiv();
    //})
}

//Fiber and additional optional statements
//返回
function funcBackToUpload() {
    if ($("#createOrUpload").val() == "create") {
        $("#CreateTxt").show();
        $("#EditFiberCareInstr").hide();
        $("#step1").attr("class", "red-em");
        $("#step2").css("display", "none");
    } else {
        $("#step2").css("display", "none");
        $("#step1").attr("class", "red-em");
        $("#step3").css("display", "none");
        $("#EditFiberCareInstr").css("display", "none");
        $("#Body_header").slideDown();
        $("#divMadeInFiber").slideDown();
        $("#divWashCare").css("display", "none");
        $("#SelectMadeIn").val("");
        $("#CategoryId").val("");
        $("#ComPercent").val("");
        $("#FiberID").val("");
    }
}
//下一步
function funcNextToSelectCare() {
    //$("#dropdownMenuWASHING").removeAttr("disabled");
    //$("#dropdownMenuBLEACHING").removeAttr("disabled");
    //$("#dropdownMenuTUMBLEDRY").removeAttr("disabled");
    //$("#dropdownMenuHANGdry").removeAttr("disabled");
    //$("#dropdownMenuWRINGING").removeAttr("disabled");
    //$("#dropdownMenuDRYCLEANING").removeAttr("disabled");
    //$("#dropdownMenuIRONING").removeAttr("disabled");
    $(".text").html("--Please Select--");

    //3. 检查空类别 和 非空的各个类别下的成分 百分比是否 为100
    var StrAllCategory = "";
    var HasNullCategory = 0;
    var objlineFiber = document.getElementById("LineFiberComposition");
    var objlineFiberBody = objlineFiber.children[1];
    if ($("#productid").val() != "TSC001-GCLW20M11384G" && $("#productid").val() != "TSC001-GCLW20M11392G"
     && $("#productid").val() != "TSC001-GCLB20M11416G" && $("#productid").val() != "TSC001-GCLB20M11424G") {
        if (objlineFiberBody.childElementCount <= 0) {
            $("#labtxt").html("Please add fiber composition first.");
            showDiv();
            return;
        }
        //取得所有 Category集合
        for (var i = 0; i < objlineFiberBody.childElementCount; i++) {
            var tTyp = objlineFiberBody.children[i].children[0].children[1].value;
            if (tTyp == "") {
                HasNullCategory = 1;
            }
            else {
                if (StrAllCategory.indexOf(tTyp) < 0) {
                    if (StrAllCategory == "") {
                        StrAllCategory += tTyp;
                    }
                    else {
                        StrAllCategory += "^" + tTyp;
                    }
                }
            }
        }
        if (HasNullCategory == 1) {
            StrAllCategory += "^";
        }
        var lstCategory = StrAllCategory.split('^');
        for (var i = 0; i < lstCategory.length; i++) {
            //alert(lstCategory[i])
            var tTotalPercent = 0 * 1;
            for (var k = 0; k < objlineFiberBody.childElementCount; k++) {
                var tTyp = objlineFiberBody.children[k].children[0].children[1].value;
                if (lstCategory[i] == tTyp) {
                    var tFiberPercent = objlineFiberBody.children[k].children[0].children[2].value;
                    tTotalPercent += tFiberPercent * 1;
                }
            }

            if (tTotalPercent != 100 || tTotalPercent > 100) {
                //alert("Total composition shall be multiples of 100%.the category:[" + lstCategory[i] + "](成分的百分比总和必须是100%的倍数。类别为：[" + lstCategory[i] + "])")
                $("#labtxt").html("The total composition should be 100%.the Composition for:[" + lstCategory[i] + "].")
                showDiv();
                return;
            }
        }
    }

    var stateChk = document.getElementById("stateChk");
    var statecount = 0;
    if ($("#Set").is(":checked")) {
        statecount += 1;
    }
    if ($("#Exclusive").is(":checked")) {
        statecount += 1;
    }
    if ($("#origin").is(":checked")) {
        statecount += 1;
    }
    if ($("#Colour").is(":checked")) {
        statecount += 1;
    }
    if (statecount > 3) {
        $("#labtxt").html("Only three additional descriptions can be selected at most.");
        showDiv();
        return;
    }


    $("#step3").css("display", "block");
    $("#step3").attr("class", "red-em");
    $("#step2").removeClass("red-em");
    $("#step2").addClass("gray-em");
    $("#divMadeInFiber").css("display", "none");
    $("#divWashCare").slideDown();
    $("#PreviewImg").css("display", "none");
   
    //}

}
function funcBackToShowFiber() {
    $("#step3").css("display", "none");
    $("#divWashCare").css("display", "none");
    $("#divMadeInFiber").slideDown();
    $("#step2").removeClass("gray-em");
    $("#step2").addClass("red-em");
    $("#PreviewImg").css("display", "none");
   
}
function funcAddCommCustUsedClick() {

    var SelectCommCustUsed = $("#WashcareID").val();
    if (SelectCommCustUsed == "") {
        $("#labtxt").html("Please select Additional Washcare Instructions.");
        showDiv();
        return false;
    }



    var trList = $(".LineWashCare").children("tr")

    var trList_length = $(".LineWashCare").children("tr").length;
    if (trList_length > 2) {

        $("#labtxt").html("Cannot exceed 3 items.");
        showDiv();
        return false;

    }
    for (var i = 0; i < trList.length; i++) {
        var tdArr = trList.eq(i).find("td");
        var history_income_type = tdArr.eq(0).text();

        if (history_income_type == SelectCommCustUsed) {
            $("#labtxt").html("Cannot add repeatedly.");
            showDiv();
            return false;
        }
        else {

        }
    }


    var Html = ""
    Html += "<tr>";
    Html += "<td class='center'>" + SelectCommCustUsed + "</td>";
    Html += "<td class='center'><Button class='btn btn-default' onclick='return Remove(this);'>Remove</Button></td>";
    Html += "</tr>";
    $("#Item tbody").append(Html);
    $("#Item").css("display", "block");
    $("#WashcareID").val("");

}
function funcSaveFiberAndCare(obj) {
    CheckDataBYCheckbox(obj);

}

//添加组成成分
var IsEditAFiber = "0";
var theEditSeqID = "";
function funcAddorUpdateTableFiberComp() {
    SelectCategory = $("#CategoryId option:selected").val()
    var objlineFiber = document.getElementById("LineFiberComposition");
    var objlineFiberBody = objlineFiber.children[1];
    var count = 0;
    //判断第一笔是否为空类型
    if (objlineFiberBody.childElementCount > 0 && objlineFiberBody.children[0].children[1].innerText == "") {
        if ($("#CategoryId option:selected").text() != "--Please Select--") {
            $("#labtxt").html("Add Err");
            showDiv();
            return;
        };
    } else if (objlineFiberBody.childElementCount > 0 && objlineFiberBody.children[0].children[1].innerText != "") {
        if ($("#CategoryId").val() == null || $("#CategoryId").val() == "") {
            $("#labtxt").html("Please add fiber composition first.");
            showDiv();
            return;
        };
    }
    if (objlineFiberBody.childElementCount > 1) {
        for (var i = 0, count = objlineFiberBody.childElementCount; i < count; i++) {
            if (objlineFiberBody.children[i].children[0].children[1].value == SelectCategory && objlineFiberBody.children[count - 1].children[0].children[1].value != SelectCategory) {
                    $("#labtxt").html(SelectCategory + " Have Existed");
                    showDiv();
                    return;
            }
        }
    }

    var a = 0;
    var countNull=0;
    for (var i = 0; i < objlineFiberBody.childElementCount; i++) {
        if (SelectCategory == objlineFiberBody.children[i].children[0].children[1].value) {
            a++;
        }
        if (objlineFiberBody.children[i].children[1].innerText!="") {
            countNull++;
        }
}
    if (a==6) {
        $("#labtxt").html(" The composition for each component can’t over 6 items");
        showDiv();
        return;
    }
    if (countNull == 6) {
        $("#labtxt").html("Only Six Composition for can be add at most.")
        showDiv();
    return;
    }




    //if (IsEditAFiber == "1") {
    //    if (theEditSeqID != "") {
    //        funcUpdateTableFiberValue(theEditSeqID);
    //    }
    //}
    //else {
        //FiberCareInstrInTowAdd();
    funcAddlineFiberComp();
   //
}
function funcUpdateTableFiberValue(theID) {
    var objlineFiber = document.getElementById("LineFiberComposition");
    var objlineFiberBody = objlineFiber.children[1];

    SelectCategory = $("#CategoryId option:selected").val()
    FiberPerent = $("#ComPercent ").val();
    SelectComposition = $("#FiberID option:selected").val();

    var objlineFiber = document.getElementById("LineFiberComposition");
    var objlineFiberBody = objlineFiber.children[1];
    if (SelectCategory == "") {
        $("#labtxt").html("Please select Composition for");
        showDiv();
        return false;
    }

    if (FiberPerent == "" || FiberPerent == "0") {
        //$("#labtxt").html("The Number of composition is incorrect");
        showDiv();
        return false;
    }
    if (SelectComposition == "") {
        $("#labtxt").html("Please select composition");
        showDiv();
        return false;
    }

    var _hasRepeat = 0;
    for (var i = 0; i < objlineFiberBody.childElementCount; i++) {
        var tID = objlineFiberBody.children[i].children[0].children[0].innerText;
        if (tID != theID) {
            var tTyp = objlineFiberBody.children[i].children[0].children[1].value;
            var tFiberPercent = objlineFiberBody.children[i].children[0].children[2].value;
            if (SelectCategory == tTyp) {
                var tFiber = objlineFiberBody.children[i].children[0].children[3].value;
                if (SelectComposition == tFiber) {
                    _hasRepeat = 1;
                }
            }
        }
    }
    if (_hasRepeat) {
        $("#labtxt").html("Under the same Composition for, components cannot be the same,the Composition for:[" + SelectCategory + "].");
        showDiv();
        return;
    }

    //将选择 类别  百分比 成分 更新到列表中的那一行。
    objlineFiberBody.children[theID - 1].children[0].children[1].value = SelectCategory;
    objlineFiberBody.children[theID - 1].children[0].children[2].value = FiberPerent;
    objlineFiberBody.children[theID - 1].children[0].children[3].value = SelectComposition;
    if (objlineFiberBody.children[theID - 1].children[1].innerText != "") {
        objlineFiberBody.children[theID - 1].children[1].innerText = SelectCategory;
    }
    objlineFiberBody.children[theID - 1].children[2].innerText = FiberPerent;
    objlineFiberBody.children[theID - 1].children[3].innerText = SelectComposition;

    //启用所有按钮
    for (var i = 0; i < objlineFiberBody.childElementCount; i++) {
        objlineFiberBody.children[i].children[4].children[0].disabled = false;
        objlineFiberBody.children[i].children[4].children[1].disabled = false;
    }

    $("#CategoryId")[0].disabled = false;
    $("#CategoryId").val("");
    $("#ComPercent ").val("");
    $("#FiberID").val("");

    IsEditAFiber = "0";
    theEditSeqID = "";
}

function funcAddlineFiberComp() {
    SelectCategory = $("#CategoryId option:selected").val()
    FiberPerent = $("#ComPercent ").val();
    SelectComposition = $("#FiberID option:selected").val();

    var objlineFiber = document.getElementById("LineFiberComposition");
    var objlineFiberBody = objlineFiber.children[1];

    if (FiberPerent == "" || FiberPerent == "0") {
        //alert("The Number of composition is incorrect");
        $("#labtxt").html("The Number of composition is incorrect");
        showDiv();
        return false;
    }
    if (SelectComposition == "") {
        //alert("Please select composition");
        $("#labtxt").html("Please select Fiber");
        showDiv();
        return false;
    }

    //判断类别成分是否为100%,为100%时不允许再添加
    //3. 检查空类别 和 非空的各个类别下的成分 百分比是否 为100
    var StrAllCategory = "";
    var HasNullCategory = 0;
    var objlineFiber = document.getElementById("LineFiberComposition");
    var objlineFiberBody = objlineFiber.children[1];
    //if (objlineFiberBody.childElementCount <= 0) {
    //    alert("Please add fiber composition first(请先添加成分）")

    //    $("#labtxt").html("Please add fiber composition first.");
    //    showDiv();
    //    return;
    //}


    //取得所有 Category集合
    for (var i = 0; i < objlineFiberBody.childElementCount; i++) {
        var tTyp = objlineFiberBody.children[i].children[0].children[1].value;
        if (tTyp == "") {
            HasNullCategory = 1;
        }
        else {
            if (StrAllCategory.indexOf(tTyp) < 0) {
                if (StrAllCategory == "") {
                    StrAllCategory += tTyp;
                }
                else {
                    StrAllCategory += "^" + tTyp;
                }
            }
        }
    }

    if (HasNullCategory == 1) {
        StrAllCategory = "^" + StrAllCategory;
    }

    var lstCategory = StrAllCategory.split('^');

    //if (lstCategory.length > 3) {
    //    $("#labtxt").html("Composition for cannot exceed 3 items.");
    //    showDiv();
    //    return false;
    //}
    var tTyp = "";
    var tTotalPercent = 0;
    debugger;
    for (var i = 0; i < lstCategory.length; i++) {
        //alert(lstCategory[i])
        tTotalPercent = 0 * 1;
        for (var k = 0; k < objlineFiberBody.childElementCount; k++) {
            tTyp = objlineFiberBody.children[k].children[0].children[1].value;
            if (lstCategory[i] == tTyp) {
                var tFiberPercent = objlineFiberBody.children[k].children[0].children[2].value;
                tTotalPercent += tFiberPercent * 1;
            }
        }
    }
    var SelectCompositionfor = $("#CategoryId").val();
    if (SelectCompositionfor == tTyp && tTotalPercent == 100) {
        $("#labtxt").html("The total composition is 100%.the Composition for:" + SelectCompositionfor + ".")
        showDiv();
        return false;
    }
    //是否为100%

    if (SelectCategory == "") {
        //Null Category 的情况， 判断 选择的成分是否和 列表中 Null Category 的成分有重复。
        //只有从来没有加过成分，第一次加空 Category 成分，才是真的要添加空 Category 成分。
        //检查是否第一次加，或 当前只有空Category。
        var _isRealAddNULLtype = "true";
        var _lastType = "";
        if (objlineFiberBody.childElementCount > 0) {
            for (var i = objlineFiberBody.childElementCount - 1; i >= 0 ; i--) {
                var tTyp = objlineFiberBody.children[i].children[0].children[1].value;
                if (tTyp != "") {
                    _lastType = tTyp;
                    _isRealAddNULLtype = "false";
                    break;
                }
            }
        }

        if (_isRealAddNULLtype == "true") {
            var _hasRepeat = 0;
            for (var i = 0; i < objlineFiberBody.childElementCount; i++) {
                var tTyp = objlineFiberBody.children[i].children[0].children[1].value;
                if (tTyp == "") {
                    var tFiber = objlineFiberBody.children[i].children[0].children[3].value;
                    if (SelectComposition == tFiber) {
                        _hasRepeat = 1;
                    }
                }
            }
            if (_hasRepeat == 1) {
                $("#labtxt").html("The components has already added under the empy Composition for.");
                showDiv();
                return;
            }
        }
        else {
            SelectCategory = _lastType
            var _hasRepeat = 0;
            for (var i = 0; i < objlineFiberBody.childElementCount; i++) {
                var tTyp = objlineFiberBody.children[i].children[0].children[1].value;
                var tFiberPercent = objlineFiberBody.children[i].children[0].children[2].value;
                if (SelectCategory == tTyp) {
                    var tFiber = objlineFiberBody.children[i].children[0].children[3].value;
                    if (SelectComposition == tFiber) {
                        _hasRepeat = 1;
                    }
                }
            }
            if (_hasRepeat) {
                $("#labtxt").html("Under the same Composition for, components cannot be the same,the Composition for:[" + SelectCategory + "]");
                showDiv();
                return;
            }
        }
    }
    else {
        //当前有选 Category 的情况， 判断 选择的成分是否和 列表中 对应 Category 的成分有重复。
        var _hasRepeat = 0;
        for (var i = 0; i < objlineFiberBody.childElementCount; i++) {
            var tTyp = objlineFiberBody.children[i].children[0].children[1].value;
            var tFiberPercent = objlineFiberBody.children[i].children[0].children[2].value;
            if (SelectCategory == tTyp) {
                var tFiber = objlineFiberBody.children[i].children[0].children[3].value;
                if (SelectComposition == tFiber) {
                    _hasRepeat = 1;
                }
            }
        }
        if (_hasRepeat) {
            //alert("Under the same category, components cannot be the same,the category:[" + SelectCategory + "].(同一类别下，成份不能相同，类别为：[" + SelectCategory + "])");
            $("#labtxt").html("Under the same Composition for, components cannot be the same,the Composition for:[" + SelectCategory + "].");
            showDiv();
            return;
        }

            //如果换了Category， 则检查之前的所有 Category 的 百分比 和是不是100 的倍数。
            if (objlineFiberBody.childElementCount > 0) {

                var tPrevTyp = objlineFiberBody.children[objlineFiberBody.childElementCount - 1].children[0].children[1].value;
                if (tPrevTyp != SelectCategory) {
                    var _allCatePercent = 0 * 1;
                    for (var i = 0; i < objlineFiberBody.childElementCount; i++) {
                        var tTyp = objlineFiberBody.children[i].children[0].children[1].value;
                        var tFiberPercent = objlineFiberBody.children[i].children[0].children[2].value;
                        if (tPrevTyp == tTyp) {
                            _allCatePercent += tFiberPercent * 1;
                        }
                    }
                    if (_allCatePercent % 100 != 0) {
                        $("#labtxt").html("Before add a different Composition for, the previous Composition for[" + tPrevTyp + "] The total composition should be 100%.");
                        showDiv();
                        return;
                    }
                }
            }
    }


    var objlineFiber = document.getElementById("LineFiberComposition");
    var objlineFiberBody = objlineFiber.children[1];
    var sTrHtml = "";
    var ID = objlineFiberBody.childElementCount + 1;
    //检查当前 Category 以前是否加过，若加过，则不要显示 Category。
    var _isShowCategor = "true";
    for (var i = 0; i < objlineFiberBody.childElementCount; i++) {
        var tTyp = objlineFiberBody.children[i].children[0].children[1].value;
        if (SelectCategory == tTyp) {
            _isShowCategor = "false";
        }
    }

    sTrHtml += "<tr>";
    sTrHtml += "<td>";
    sTrHtml += "<label id='lblFiber' name ='lblFiber' >" + ID + "</label>";
    //sTrHtml += "<input id='hflineID' name ='hflineID' type='hidden' value='" + ID + "' >";
    sTrHtml += "<input id='hflineType' name ='hflineType' type='hidden' value='" + SelectCategory + "' >";
    sTrHtml += "<input id='hflinePercent' name ='hflinePercent' type='hidden' value='" + FiberPerent + "' >";
    sTrHtml += "<input id='hflineFiber' name ='hflineFiber' type='hidden' value='" + SelectComposition + "' >";
    sTrHtml += "</td>";
    if (_isShowCategor == "true") {
        sTrHtml += "<td>" + SelectCategory + "</td>";
    }
    else {
        sTrHtml += "<td>" + "</td>";
    }

    sTrHtml += "<td>" + FiberPerent + "</td>";
    sTrHtml += "<td>" + SelectComposition + "</td>";
    sTrHtml += "<td>";
    sTrHtml += "<button type='button' id='btnDelFiderLine' class='btn btn-default' value='" + ID + "' onclick='return funcDelFiderLine(this);' >Remove</button>";
    sTrHtml += "</td>";
    sTrHtml += "</tr>";
    $("#Items").removeAttr("style");

    //    for (var i = 0; i < objlineFiberBody.childElementCount; i++) {
    //        if (true) {

    //    }
    //}
        $("#LineFiberComposition tbody").append(sTrHtml);



    $("#CategoryId").val("");
    $("#ComPercent ").val("");
    $("#FiberID").val("");
}

//移除添加的Fiber 
function funcDelFiderLine(obj) {
    //alert(obj.value);
    var startSeq = obj.value - 1;

    var objlineFiber = document.getElementById("LineFiberComposition");
    var objlineFiberBody = objlineFiber.children[1];
    var _isShowType = "false";
    if (objlineFiberBody.children[startSeq].children[1].innerText != "") {
        _isShowType = "true"; //删除的那行刚好是需要显示 Type 的那行。
    }

    $(obj).parent().parent().remove();

    var objlineFiber = document.getElementById("LineFiberComposition");
    var objlineFiberBody = objlineFiber.children[1];
    for (var i = startSeq; i < objlineFiberBody.childElementCount; i++) {
        objlineFiberBody.children[i].children[0].children[0].innerText = i + 1; //改第一列的显示 ID
        objlineFiberBody.children[i].children[4].children[0].value = i + 1;     //改删除按钮 value ID
        //objlineFiberBody.children[i].children[4].children[1].value = i + 1;     //改Edit按钮的 value ID
        if (_isShowType == "true") {
            objlineFiberBody.children[i].children[1].innerText = objlineFiberBody.children[i].children[0].children[1].value;
            _isShowType = "false";
        }
    }
}
function Remove(obj) {

    $(obj).parent().parent().remove();
}
  
///fiberNextInTowAdd  添加Fiber
function FiberCareInstrInTowAdd()
{
    var SelectCategory = $("#CategoryId option:selected").val()
   var  FiberPerent = $("#ComPercent ").val();
   var SelectComposition = $("#FiberID option:selected").val();
   if (SelectCategory == "") {
       $("#labtxt").html("Please select Composition for");
       showDiv();
       return false;
   }
   if (FiberPerent == "" || FiberPerent == "0") {
       $("#labtxt").html("The Number of composition is incorrect");
       showDiv();
       return false;
   }
   if (SelectComposition == "") {
       $("#labtxt").html("Please select composition");
       showDiv();
       return false;

   }

    //show Date
   var objlineFiberBody = document.getElementById("LineFiberComposition").children[1];
   var sTrHtml = "";
   var ID = objlineFiberBody.childElementCount + 1;
    //检查当前 Category 以前是否加过，若加过，则不要显示 Category。
   var _isShowCategor = "true";
   for (var i = 0; i < objlineFiberBody.childElementCount; i++) {
       var tTyp = objlineFiberBody.children[i].children[0].children[1].value;
       if (SelectCategory == tTyp) {
           _isShowCategor = "false";
       }
   }


   sTrHtml += "<tr>";
   sTrHtml += "<td>" + ID+"";
   sTrHtml += "<label id='lblFiber' name ='lblFiber' ></label>";
   sTrHtml += "<input id='hflineID' name ='hflineID' type='hidden' value='" + ID + "' >";
   sTrHtml += "<input id='hflineType' name ='hflineType' type='hidden' value='" + SelectCategory + "' >";
   sTrHtml += "<input id='hflinePercent' name ='hflinePercent' type='hidden' value='" + FiberPerent + "' >";
   sTrHtml += "<input id='hflineFiber' name ='hflineFiber' type='hidden' value='" + SelectComposition + "' >";
   sTrHtml += "</td>";
   if (_isShowCategor == "true") {
       sTrHtml += "<td>" + SelectCategory + "</td>";
   }
   else {
       sTrHtml += "<td>" + "</td>";
   }
   sTrHtml += "<td>" + FiberPerent + "</td>";
   sTrHtml += "<td>" + SelectComposition + "</td>";
   sTrHtml += "<td>";
   sTrHtml += "<button type='button' id='btnDelFiderLine' class='btn btn-default' value='" + ID + "' onclick='return funcDelFiderLine(this);' >Remove</button>";
   sTrHtml += "</td>";
   sTrHtml += "</tr>";
   //$("#Items").removeAttr("style");
   $("#LineFiberComposition tbody").append(sTrHtml);

   $("#CategoryId").val("");
   $("#ComPercent ").val("");
   $("#FiberID").val("");

}

//第三页的Washcare Symbols图片显示
function SowWashcareSymbolsImg(obj) {
    var lis = $(obj).find("option");
    lis.each(function (index, domEle) {
        $(domEle).mouseover(function () {
            var washcode = $(this).val();
            $("#divWashImage").show().find("img").attr('src', '../../Content/image/TescoImg/' + washcode + '.jpg');
            console.log('show: ' + washcode[index]);
        }).mouseout(function () {
            $("#divWashImage").hide();
        }).mousemove(function (e) {
            $("#divWashImage").css({ 'top': e.pageY + 15, 'left': e.pageX + 10 });
        });
    });

};

//第三页 验证
function CheckDataBYCheckbox(obj) {
    if ($("#productid").val() == "TSC001-GCLW20M11389G" || $("#productid").val() == "TSC001-GCLB20M11421G" || $("#productid").val() == "TSC001-GCLW20M11381G"
     || $("#productid").val() == "TSC001-GCLB20M11413G") { } else {
        if ($("#WashingID").val() == "" || $("#WashingID").val() == null || $("#btnWashingID .text").text() == "--Please Select--") {
            $("#labtxt").html("Please Select Washing");
            showDiv();
            return;
        };
        if ($("#BleachingID").val() == "" || $("#BleachingID").val() == null || $("#btnBleachingID .text").text() == "--Please Select--") {
            $("#labtxt").html("Please Select Bleaching");
            showDiv();
            return;
        };
        if ($("#DryingID").val() == "" || $("#DryingID").val() == null || $("#btnDryingID .text").text() == "--Please Select--") {
            $("#labtxt").html("Please Select Drying");
            showDiv();
            return;
        };
        if ($("#IroningID").val() == "" || $("#IroningID").val() == null || $("#btnIroningID .text").text() == "--Please Select--") {
            $("#labtxt").html("Please Select Ironing");
            showDiv();
            return;
        };
        if ($("#ProCleanID").val() == "" || $("#ProCleanID").val() == null || $("#btnProCleanID .text").text() == "--Please Select--") {
            $("#labtxt").html("Please Select Professional Cleaning");
            showDiv();
            return;
        };
    }
    FunSaveDataToContorller(obj)
};

//第二 三页传值到后台  以便得到多国语言
function FunSaveDataToContorller(obj) {
    var productcode = $("#productid option:selected").val();
    var submaitData = {
        "hfTempOrderId": $("#hfTempOrderId").val(),
        "BatchCode": $("#BatchCode").val(),
        "TogRating": $("#Rating").val(),
        "BS_STATEMENT":$("#BS_STATEMENT").val(),

        "BS_5722": $("#BS_5722").is(":checked") ? "LOW FLAMMABILITY TO BS 5722" : "",
        "PartofSet": $("#Set").is(":checked") ? "Part of Set" : "",
        "Exclusiveoftrims": $("#Exclusive").is(":checked") ? "Exclusive of trims" : "",
        "partsofanimalorigin": $("#origin").is(":checked") ? "Contains non-textile parts of animal origin" : "",
        "Colourmayfadein": $("#Colour").is(":checked") ? "Colour may fade in direct sunlight and chlorinated water.To care for swimwear,rinse with cold water and hang dry immediately after wear" : "",
        "KeepAwayfromfire": $("#fire").is(":checked") ? "Keep Away from fire" : "",
        "WARNINGKeepAwayfromfire": $("#fire2").is(":checked") ? "WARNING! Keep Away from fire" : "",
        "CategoryDetail": "",

        "Washing": $("#WashingID option:selected").text(),
        "Bleaching": $("#BleachingID option:selected").text(),
        "Drying": $("#DryingID option:selected").text(),
        "Ironing": $("#IroningID option:selected").text(),
        "ProfessionalCleaning": $("#ProCleanID option:selected").text(),
        "LeatherandSuedeIdentityCode": $("#Code").val(),
        "ChildrenWarningStatements": $("#SelectChildren").val(),
        "WashingOrderDetail": ""//  具体值 LineWashCare0 LineWashCare1 LineWashCare2
    }
    var OrderDetail = document.getElementById("LineFiberComposition").children[1];
    var strtotal = "";
    var _strFiberAll = "";
    for (var i = 0; i < OrderDetail.childElementCount; i++) {
        //var tTypeandWash = objlineFiberBody.children[i].children[4].children[0].value;
        var tID = OrderDetail.children[i].children[0].children[0].innerText;
        var tCategory = OrderDetail.children[i].children[0].children[1].value;
        var tComPercent = OrderDetail.children[i].children[0].children[2].value;
        var tFiber = OrderDetail.children[i].children[0].children[3].value;
        var _tCombine = tID + "^" + tCategory + "^" + tComPercent + "^" + tFiber
        if (_strFiberAll == "") {
            _strFiberAll += _tCombine;
        }
        else {
            _strFiberAll += "ˇ" + _tCombine;
        }
    }
    //alert(_strFiberAll)
    console.log(_strFiberAll);

    submaitData.CategoryDetail = _strFiberAll;
    var LineWashCare = document.getElementById("LineWashCare").children[1];
    //    var str1 = "";
    //    for (var i = 0; i < LineWashCare.childElementCount; i++) {
    //        str1 += "LineWashCare" + i + ":" + LineWashCare.children[i].children[0].innerText + "^";
    //}
    //str1 = str1.substring(0, str1.length -1);
    var _strWashAll = "";
    for (var i = 0; i < LineWashCare.childElementCount; i++) {
        var tTypeandWash = LineWashCare.children[i].children[0].innerHTML;
        if (_strWashAll == "") {
            _strWashAll += tTypeandWash;
        }
        else {
            _strWashAll += "^" + tTypeandWash;
        }
    }
    console.log(_strWashAll);
    submaitData.WashingOrderDetail = _strWashAll;
    
    isPreview = obj.value;
    debugger;
    if (isPreview == "Preview")
    {
        submaitData.PreviewStatus=true;
    }
    else
    {  
        submaitData.PreviewStatus=false;
    }
    showloading();
    var comments = $("#Comments").val();
    $.ajax({
        url: "/Tesco/funcSaveFiberAndCare?productcode=" + productcode + "&Comments=" + comments,
        dataType: "json",
        type: "post",
        //cache: false,
        data: submaitData,
        //processData: false,
        //contentType: false,
    }).success(function (data) {
        if (data.FunStatus == "fail") {
            hideloading();
            $("#labtxt").html(data.ErrorCode);
            showDiv();
        } else {
            //debugger;
            //alert("gmx hhh" + data.MaximNO);
            if (data.Status == "isPreview")
            {
          
               $("#dowebok").html("");
                debugger;
                var imagesList = "";
                var imagesList2 = "";
                var int = 0;
                $.each(data.images, function (i, item)
                {
                    
                   
                    imagesList += "<li><img data-original='" + item[0] + "'' src='" + item[0] + "' style='height:200px;'></li>";
                    imagesList += "<li><img data-original='" + item[1] + "'' src='" + item[1] + "' style='height:200px;'></li>";
                    imagesList2 += '<li class="viewer-active"><img src="' + item[0] + '" data-action="view" data-index="' + int + '" data-original-url="' + item[0] + '" alt="' + "图片" + int + '"></li>';
                    int++;
                    imagesList2 += '<li><img src="' + item[1] + '" data-action="view" data-index="' + int + '" data-original-url="' + item[1] + '" alt="' + "图片" + int + '"></li>';
                })
            


                   $("#dowebok").append(imagesList);
                   $("#PreviewImg").css("display", "block");
                   //debugger;
                   //if ($("#viewer-listImg").length!= 0)
                   //{
                   //    $("#viewer-listImg").html("");

                   //    $("#viewer-listImg").html(imagesList2);
                   //    $("#dowebok").viewer('update');
                   //} else
                //{
                    $('#dowebok').viewer({ 
                        url: 'data-original',
                    });
                    $("#dowebok").viewer('update');
                  // }
                hideloading();
            }
            else
            {
                $("#TescoOrderNo").text(data.MaximNO);
                $("#EditFiberCareInstr").css("display", "none");
                $("#panSuccess").slideDown();
                $("#step1").css("display", "none");
                $("#step2").css("display", "none");
                $("#step3").css("display", "none");
                $("#step4").css("display", "block");
                $("#step4").removeClass("gray-em");
                $("#step4").addClass("red-em");
                $("#PreviewImg").css("display", "none");
                hideloading();
            }
         
        }

    })
    .error(function (data, x) {
        $("#labtxt").html(data.ErrorCode);
        showDiv();
    })
}

//下拉框显示图片
function createDropdown(ele) {
    if (!ele || !ele.nodeName || ele.nodeName != "SELECT") return;
    var id = ele.id;
    var li = '';
    for (var i = 0; i < ele.options.length; i++) {
        li += '<li role="presentation">'
    + '<a role="menuitem" tabindex="-1">'
    + ele.options[i].text
    + '</a>'
    + '</li>';
    }

    var drop = '<div id="dropdown_show" class="dropdown">'
    + '<button type="button" class="btn dropdown-toggle" id="btn' + id + '" data-toggle="dropdown" onclick="funcWashClick(this)" style="background: #eaeaea;margin-top:0; width:300px;">'
    + '<span class="text" style="width:300px;">' + ele.options[ele.selectedIndex].text + '</span>'
    + '</button>'
    + '<ul class="dropdown-menu" id="TescoWashcareSymbols" style="margin-left:130px;"  role="menu" aria-labelledby="' + id + '">'
    + li
    + '</ul>'
    + '</div>';

    var dropdownEle = $(drop);
    $(ele).after(dropdownEle).hide();
    return dropdownEle[0];
}
var a = "";
function syncDropdown(selectEle, dropdownEle) {
    if (!selectEle || !selectEle.nodeName || selectEle.nodeName != "SELECT") return;
    if (!dropdownEle || !dropdownEle.nodeName || dropdownEle.nodeName != "DIV") return;

    var showtext = $(dropdownEle).find(".text");
    var lis = $(dropdownEle).find("ul > li");


    lis.each(function (index, domEle) {
        $(domEle).click(function () {
            selectEle.selectedIndex = index;
            showtext.text($(domEle).text());
        }).mouseover(function () {
            var list = a.split('^');
            if (list[index] == "Only oxygen/non chlorine bleach (colour safe)") {
                list[index] = "Only oxygennon chlorine bleach (colour safe)";
            }
                //var offset = $(domEle).offset();
                //var left = offset.left + 'px';
                //var top = offset.top + 'px';
                $("#divWashImage").show().find("img").attr('src', '../../Content/image/TescoImg/' + list[index] + '.png');

            //console.log('show: ' + list[index]);
        }).mouseout(function () {
            $("#divWashImage").hide();
        }).mousemove(function (e) {
            $("#divWashImage").css({ 'top': e.pageY + 15, 'left': e.pageX + 10 });
        });
    });
}
function funcWashClick(obj) {
    var id = obj.getAttribute("id");
    var values = $("." + id + "").val();
    a = $("." + id + " option").map(function () { return $(this).val(); }).get().join('^');
    $("#hfWashCode").val(values);
}

//验证是否为数字
function isNumber(value) {         
    var patrn = /^\+?[1-9][0-9]*$/;
    if (patrn.exec(value) == null || value == "") {
        return false
    } else {
        return true
    }
}