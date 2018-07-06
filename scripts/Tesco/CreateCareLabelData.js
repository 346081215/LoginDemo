//Create页面的输入验证规则和添加删除
var reg = /^\w+$/;
var regnum = /^[0-9]*$/;
var regnumhg = /^[\d-]*$/;
var regnumEg = /^[A-Za-z0-9]+$/;

//用于页面数据传递到控制器的全局变量
var submaitData = {
    "OrderHeader":
    {
        "Ordformatid": "FMT001",
        "PrintShopId": "",
        "PrintShopName": "",
        "BillToId": "",
        "BillToName": "",//Billing To
        "BillAddress": "",
        "Contact": "",
        "BillTel": "",
        "ShipmentTypeId": "",
        "ShipmentTypeName": "",
        "FreightCompanyId": "",
        "FreightCompany": "",
        "Currency": "",
        "Language": "",
        "ShipToId": "",
        "ShipToName": "",
        "ShipToAddressId": "",
        "ShipToAddress": "",
        "ShipToContact": "",
        "ShipTel": "",
        "Country": "",
        "WasteAllowanceId": "",
        "WasteAllowanceName": "",
        "OrderDetail": [] //点击Upload之后存的数据多行和单行
    }
};

///if(reg.test($("input:text").val()))
// 
////Create页面的输入,动态添加table的行，以及验证规则和添加删除
function funCreateAdd(index, obj) {
    var qty1 = $("#OrderQtyT").val();
    var col2 = $("#ColourCodeT").val();
    var EAN = $("#EANBarcodeCodeT").val();

        var Contentbody = obj.parentNode.parentNode;

        if (!isNumber(Contentbody.children[1].children[0].value)) {
            $("#labtxt").html("Please Check QTY"); showDiv(); return;
        }
        if (Contentbody.children[1].children[0].value < 1) {
            $("#labtxt").html("Please check the data：[Qty]"); showDiv(); return;
        };
        //if (Contentbody.children[2].children[0].value == "" || Contentbody.children[2].children[0].value == null) {
        //        $("#labtxt").html("Please check the data：[Colour]"); showDiv(); return;
        //};
        if (Contentbody.children[3].children[0].value == "" || Contentbody.children[2].children[0].value == null) {
            $("#labtxt").html("Please check the data：[EANBarcode]"); showDiv(); return;
        };
        var code = Contentbody.children[3].children[0].value;
        if (!valid(code)) {
            $("#labtxt").html("[EANBarcode] Err "); showDiv(); return;
        }
        var SGEanCk = true;
        var SGOrder = document.getElementById("tr");
        if (SGOrder.childElementCount > 1) {
            for (var i = 0, Cken = SGOrder.childElementCount; i < Cken - 1; i++) {
                if (SGOrder.children[Cken - 1].children[3].children[0].value == SGOrder.children[i].children[3].children[0].value) {
                    SGEanCk = false;
                };
            };
        };
        if (!SGEanCk) {
            $("#labtxt").html("This [EANBarcode] duplication  "); showDiv(); return;
        }
        if (Contentbody.children[4].children[0].value == "--Please Select--") {
            $("#labtxt").html("Please check the data：[Dept]"); showDiv(); return;
        };
        //if (Contentbody.children[4].children[0].value == "Ladies Hosiery" || Contentbody.children[4].children[0].value == "Womens Swimwear") {
        //    $("#labtxt").html("所选DEPT资料:" + Contentbody.children[4].children[0].value+"有误！"); showDiv(); return;
        //}
        if (Contentbody.children[5].children[0].value == "--Please Select--") {
            $("#labtxt").html("Please check the data：[UK Primary Size]"); showDiv(); return;
        };
        var indexLine = [];
        var size = [];
        for (var j = 6; j < 10; j++) {
            if (!(size.indexOf(Contentbody.children[j].children[0].value) > -1) && Contentbody.children[j].children[0].value != "") {
                size.push(Contentbody.children[j].children[0].value);
            } else if (Contentbody.children[j].children[0].value != "") {
                $("#labtxt").html("Error! Optional Secondary Sizing is repeated. Pls check and revise.")
                showDiv();
                return;
            }
        }

        var tbo = document.getElementById("tr");
        index = tbo.rows.length;


        var tsar = ""
        tsar += "<tr><td id='index'" + index + ">" + index + "</td>";
        tsar += "<td><input type='text' class='Qty' name='ComPercent' id='OrderQtyT" + index + "' value='" + $("#OrderQtyT").val() + "' style='width:70px !important'/></td>";
        tsar += "<td><input type='text' class='colur' id='ColourCodeT" + index + "' value='" + $("#ColourCodeT").val() + "' style='width:100px !important'/></td>";
        tsar += "<td><input type='text' class='ean' name='ComPercent'id='EANBarcodeCodeT" + index + "' value='" + $("#EANBarcodeCodeT").val() + "' style='width:130px !important'/></td>";
        tsar += "<td><select class='CDeptt' id='DeptT" + index + "'><option value='" + $("#DeptT").val() + "'>" + $("#DeptT option:selected").text() + "</option></select></td>";
        tsar += "<td><select class='CSizeT' id='SizeT" + index + "'><option value='" + $("#SizeT").val() + "'>" + $("#SizeT option:selected").text() + "</option></select></td>";
        tsar += "<td><select id='Size1sT" + index + "'><option value='" + $("#Size1sT").val() + "'>" + $("#Size1sT option:selected").text() + "</option></select></td>";
        tsar += "<td><select id='Size2sT" + index + "'><option value='" + $("#Size2sT").val() + "'>" + $("#Size2sT option:selected").text() + "</option></select></td>";
        tsar += "<td><select id='Size3sT" + index + "'><option value='" + $("#Size3sT").val() + "'>" + $("#Size3sT option:selected").text() + "</option></select></td>";
        tsar += "<td><select id='Size4sT" + index + "'><option value='" + $("#Size4sT").val() + "'>" + $("#Size4sT option:selected").text() + "</option></select></td>";
        tsar += "<td><button type='button' id='CreateAdd" + index + "' onclick='deleteCurrentRow(" +index+ ",this)'  >remove</button></td></tr>";

        $("#labtxt").html(" Please check if Secondary sizing information is required.AND Please Check QTY")
        showDiv2();
        $("#no").click(function () {
            $("#popDiv").css("display", "none");
            $("#bg").css("display", "none");
        });
        $("#ok").click(function () {
            $("#popDiv").css("display", "none");
            $("#bg").css("display", "none");
            $("#tr").append(tsar);
            //funcfor(index);
            var tbo = document.getElementById("tr");
            for (var i = 0; i < tbo.rows.length; i++) {
                tbo.rows[i].cells[0].innerHTML = (i+1);
            };
            $("#OrderQtyT").val("0")
            $("#ColourCodeT").val("")
            $("#EANBarcodeCodeT").val("")
            $("#DeptT").get(0).selectedIndex = 0
            $("#DeptT").trigger("change");
        });
}
function deleteCurrentRow(i, obj) {
    debugger;
    var tr = obj.parentNode.parentNode;
    var tbody = tr.parentNode;
    tbody.removeChild(tr);
    var tbo = document.getElementById("tr");
    ;
    for (var i = 0; i < tbo.rows.length; i++) {
        tbo.rows[i].cells[0].innerHTML = (i+1);
    }
}
function funcfor(i) {
    var m = i - 1;
    if (m == 0) {
        $("#CreateAdd").html("Remove");
        $("#OrderQtyT").attr("disabled", "disabled");
        $("#ColourCodeT").attr("disabled", "disabled");
        $("#EANBarcodeCodeT").attr("disabled", "disabled");
        $("#DeptT").attr("disabled", "disabled");
        $("#SizeT").attr("disabled", "disabled");
        $("#Size1sT").attr("disabled", "disabled");
        $("#Size2sT").attr("disabled", "disabled");
        $("#Size3sT").attr("disabled", "disabled");
        $("#Size4sT").attr("disabled", "disabled");

    } else {
        $("#CreateAdd" + m).html("Remove");
        $("#OrderQtyT" + m).attr("disabled", "disabled");
        $("#ColourCodeT" + m).attr("disabled", "disabled");
        $("#EANBarcodeCodeT" + m).attr("disabled", "disabled");
        $("#DeptT" + m).attr("disabled", "disabled");
        $("#SizeT" + m).attr("disabled", "disabled");
        $("#Size1sT" + m).attr("disabled", "disabled");
        $("#Size2sT" + m).attr("disabled", "disabled");
        $("#Size3sT" + m).attr("disabled", "disabled");
        $("#Size4sT" + m).attr("disabled", "disabled");
    }
}
//update Size and OPtionSize
function UPdetaDepttoSizeT(index, ojb) {
    var Sizename = [];
    if (index < 1) {
        var Deptname = $("#DeptT Option:selected").text();
    } else {
        var Deptname = $("#DeptT" + index + " Option:selected").text();
    }
    var ID = [];
    $.ajax({
        url: "/Tesco/getTescoDeptList",
        type: "get",
        data: { szType: 1 },
        dataType: "json",
        success: function (result) {
            for (var i = 0; i < result.length; i++) {
                var deptS = result[i].Dept;
                if (deptS == Deptname) {
                    Sizename.push(result[i].PrimarySize_UK);
                    ID.push(result[i].ID);
                }
            }
            var tsar = "<option selected='selected'>--Please Select--</option>";
            for (var j = 0; j < Sizename.length; j++) {
                tsar += "<option id='Sizeop" + j + "' value='" + ID[j] + "'>" + Sizename[j] + "</option>";
            }
            if (index < 1) {
                $("#SizeT").html(tsar);
            } else {
                $("#SizeT" + index).html(tsar);
            }
            if (index < 1) {
                $("#Size1sT").val("");
                $("#Size2sT").val("");
                $("#Size3sT").val("");
                $("#Size4sT").val("");
            } else {
                $("#Size1sT" + index).val("");
                $("#Size2sT" + index).val("");
                $("#Size3sT" + index).val("");
                $("#Size4sT" + index).val("");
            }
        }, error: function (mess) {
            //alert("1111");
            $("#labtxt").html("File damage, please manually input");
            window.location.href = "/Tesco/LoadOrderCarelable"
            console.log(mess);
        }
    });
}
function UPSizeToSecT(index, ojb) {
    var Secondary = [];
    // var ID = [];
    if (index < 1) {
        var Deptname = $("#DeptT  Option:selected").text();
        var Sizevaluse = $("#SizeT  Option:selected").text();
        var ID = $("#SizeT  Option:selected").val();
        $("#Size1sT").html("<option value=''></option>");
        $("#Size2sT").html("<option value=''></option>");
        $("#Size3sT").html("<option value=''></option>");
        $("#Size4sT").html("<option value=''></option>");
    } else {
        var Deptname = $("#DeptT" + index + " Option:selected").text();
        var Sizevaluse = $("#SizeT" + index + " Option:selected").text();
        var ID = $("#SizeT" + index + " Option:selected").val();
        $("#Size1sT" + index).html("<option value=''></option>");
        $("#Size2sT" + index).html("<option value=''></option>");
        $("#Size3sT" + index).html("<option value=''></option>");
        $("#Size4sT" + index).html("<option value=''></option>");

    }
    $.ajax({
        url: "/Tesco/getTescoDeptList",
        type: "get",
        data: { szType: 1 },
        dataType: "json",
        success: function (result) {
            for (var i = 0; i < result.length; i++) {
                var deptS = result[i].Dept;
                var id = result[i].ID;
                if (deptS == Deptname && ID == id) {
                    var html = "<option value=''></option>";
                    if (!Secondary.indexOf(result[i].OptionalSecondary1) > -1) {
                        Secondary.push(result[i].OptionalSecondary1);
                    }
                    if (!Secondary.indexOf(result[i].OptionalSecondary2) > -1) {
                        Secondary.push(result[i].OptionalSecondary2);
                    }
                    if (!Secondary.indexOf(result[i].OptionalSecondary3) > -1) {
                        Secondary.push(result[i].OptionalSecondary3);
                    }
                    if (!Secondary.indexOf(result[i].OptionalSecondary4) > -1) {
                        Secondary.push(result[i].OptionalSecondary4);
                    }
                    if (!Secondary.indexOf(result[i].OptionalSecondary5) > -1) {
                        Secondary.push(result[i].OptionalSecondary5);
                    }
                    if (!Secondary.indexOf(result[i].OptionalSecondary6) > -1) {
                        Secondary.push(result[i].OptionalSecondary6);
                    }
                    if (!Secondary.indexOf(result[i].OptionalSecondary7) > -1) {
                        Secondary.push(result[i].OptionalSecondary7);
                    }
                    if (!Secondary.indexOf(result[i].OptionalSecondary8) > -1) {
                        Secondary.push(result[i].OptionalSecondary8);
                    }
                    if (!Secondary.indexOf(result[i].OptionalSecondary9) > -1) {
                        Secondary.push(result[i].OptionalSecondary9);
                    }
                    if (!Secondary.indexOf(result[i].OptionalSecondary10) > -1) {
                        Secondary.push(result[i].OptionalSecondary10);
                    }
                    if (!Secondary.indexOf(result[i].OptionalSecondary11) > -1) {
                        Secondary.push(result[i].OptionalSecondary11);
                    }
                    if (!Secondary.indexOf(result[i].OptionalSecondary12) > -1) {
                        Secondary.push(result[i].OptionalSecondary12);
                    }
                    for (var j = 0; j < Secondary.length; j++) {

                        if (Secondary[j] != "") {
                            html += "<option value='" + Secondary[j] + "'>" + Secondary[j] + "</option>";
                        }
                    }
                    if (index < 1) {
                        $("#Size1sT").html(html);
                        $("#Size2sT").html(html);
                        $("#Size3sT").html(html);
                        $("#Size4sT").html(html);
                    } else {
                        $("#Size1sT" + index).html(html);
                        $("#Size2sT" + index).html(html);
                        $("#Size3sT" + index).html(html);
                        $("#Size4sT" + index).html(html);
                    }

                }

            }
        }, error: function (mess) {
            //alert("1111");
            $("#labtxt").html("File damage, please manually input");
            window.location.href = "/Tesco/LoadOrderCarelable"
        }
    });
}
//button
function funcToCreate() {
    if ($("[name='_ShipmentType']").val() == "" || $("[name='_ShipmentType']").val() == null) {
        $("#labtxt").html("Please Select ShipmentType")
        showDiv();
        return;
    }
    if ($("[name='_ShipmentType']").val() == "Express" && $("[name='_ExpressCompany']").val() == "") {
        $("#labtxt").html("Please Select Freight Company")
        showDiv();
        return;
    }
    if ($("#ShipAddrId").val() == "" || $("#ShipAddrId").val() == null) {
        $("#labtxt").html("Please Select Shipping Address")
        showDiv();
        return;
    }
    if ($("#productid").val() == "" || $("#productid").val() == null) {
        $("#labtxt").html("Please Select Item")
        showDiv();
        return;
    }

    $("#Body_header").css("display", "none");
    $("#CreateTxt").css("display", "block");

    $("#createOrUpload").val("create");
}
function LoadDeptT(dept) {
    var DeptName = [];
    $.ajax({
        url: "/Tesco/getTescoDeptList",
        type: "get",
        data: { szType: 1 },
        dataType: "json",
        success: function (result) {
            //console.log(result[0].Dept);
            var obj = result;

            for (var i = 0; i < obj.length; i++) {
                var deptS = obj[i].Dept;
                if (deptS != DeptName[DeptName.length - 1]) {
                    DeptName.push(obj[i].Dept);
                }
            }
            var tsar = "<option value=''>--Please Select--</option>";
            for (var j = 0; j < DeptName.length; j++) {
                tsar += "<option id='DeptText" + j + "' value='"+DeptName[j]+"'>" +DeptName[j]+ "</option>";
            }
            if (dept < 1) {
                $("#DeptT").html(tsar);
            } else {
                $("#DeptT" + dept).html(tsar);
            }
        }, error: function (mess) {
            //alert("1111");
            $("#labtxt").html("File damage, please manually input");
            window.location.href = "/Tesco/LoadOrderCarelable"
            console.log(mess);
        }
    });
}

// ‘Next’按钮事件方法，包括验证 
function funcToCreateTxtFiber() {

    if ($("#PurchaseOrderT").val() == "" || $("#PurchaseOrderT").val() == null) {
        $("#labtxt").html("Please Input Purchase Order");
        showDiv();
        return;
    }
    if ($("#VPNCodeT").val() == "" || $("#VPNCodeT").val() == null) {
        $("#labtxt").html("VPN cannot be empty");
        showDiv();
        return;
    }
    if (!RegStyleReg.test($("#StyleNoT").val()) && $("#StyleNoT").val() != "") {
        $("#labtxt").html("Error!  Style No. should start with 2 capital letters and 6 numbers, e.g. AB123456");
        showDiv();
        return;
    }
    if ($("#SupplierNoT").val() == "" || $("#SupplierNoT").val() == null) {
        $("#labtxt").html("Please Input SupplierNo");
        showDiv();
        return;
    }
    //if ($("#CategoryT").val() == "" || $("#CategoryT").val() == null) {
    //    $("#labtxt").html("Please Input Category");
    //    showDiv();
    //    return;
    //}
    if ($("#Country").val() == "" || $("#Country").val() == null) {
        $("#labtxt").html("Please Select Country")
        showDiv();
        return;
    }
    if ($("#VPNCodeT").val() != "") {
        if (!RegVpn.test($("#VPNCodeT").val())) {
            $("#labtxt").html("Error! VPN should have 3 numbers + “-” + 4 numbers, e.g. 123-4567")
            showDiv();
            return;
        }
    }

    var table = document.getElementById("tr");
    var bool = true;
    var indexLine = [];
    for (var i = 0; i < table.childElementCount; i++) {
        if (!isNumber(table.children[i].children[1].children[0].value)) {
            $("#labtxt").html("Please Check QTY"); showDiv(); return;
        }
        //if (table.children[i].children[2].children[0].value == "" || table.children[i].children[2].children[0].value == null) {
        //    bool = false;
        //}
        if (table.children[i].children[3].children[0].value == "" || table.children[i].children[3].children[0].value == null) {
            bool = false;
        }
        //if (table.children[i].children[4].children[0].value == "Ladies Hosiery" || table.children[i].children[4].children[0].value == "Womens Swimwear") {
        //    $("#labtxt").html("DEPT资料有误，请勿选择:" + table.children[i].children[4].children[0].value); showDiv(); return;
        //}
        if (table.children[i].children[4].children[0].value == "--Please Select--") {
            bool = false;
        }
        if (table.children[i].children[5].children[0].value == "--Please Select--") {
            bool = false;
        }



        var size = [];
        for (var j = 6; j < 10; j++) {
            if (!(size.indexOf(table.children[i].children[j].children[0].value) > -1) && table.children[i].children[j].children[0].value != "") {
                size.push(table.children[i].children[j].children[0].value);
            } else if (table.children[i].children[j].children[0].value != "") {
                if (!(indexLine.indexOf((i + 1)) > -1)) {
                    indexLine.push((i + 1));
                }
            }
        }
    }
    if (indexLine.length > 0) {
        $("#labtxt").html("      Error! line [" + indexLine.join(",") + "], Optional Secondary Sizing is repeated. Pls check and revise.")
        showDiv();
        return;
    }
    var code = table.children[table.childElementCount - 1].children[3].children[0].value;
    if (!valid(code)) {
        $("#labtxt").html("[EANBarcode] Err")
        showDiv();
        return;
    }

    if (bool == false) {
        $("#labtxt").html("Please check the last line of data on the page!(请检查最后一行数据是否正确)")
        showDiv();
        return;
    }

    //$("#labtxt").html("Please check the QTY of the last line.?(请核对您输入的数量是否正确。)")
    //showDiv2();
    //$("#no").click(function () {
    //    $("#popDiv").css("display", "none");
    //    $("#bg").css("display", "none");
    //})
    //$("#ok").click(function () {
    //    $("#popDiv").css("display", "none");
    //    $("#bg").css("display", "none");
    //    GetCreateData();
    //});
    GetCreateData();

}

//返回键的方法；
function btn_CreateTxtBack() {
    $("#Body_header").css("display", "block");
    $("#page-inner1").css("display", "block");
    $("#page-inner2").css("display", "none");
    $("#btnUpload").removeAttr("disabled");
    $("#CreateTxt").css("display", "none");
}

//得到Create页面的数据，向后台post 提交插入数据，插入成功之后，才可以切换页面 
function GetCreateData() {
    var data2 = [];
    var table = document.getElementById("tr");
    var table2 = document.getElementById("OrderList");
    data2 = ["Line", "Qty", "Colour", "EANBarcode", "Dept", "UKPrimarySize", "OptionalSecondarySizing1", "OptionalSecondarySizing2", "OptionalSecondarySizing3", "OptionalSecondarySizing4"]
    var str = ""
    for (var i = 0, rows = table.rows.length; i < rows; i++) {
        debugger;
        for (var j = 0, cells = table.rows[i].cells.length - 1; j < cells; j++) {
            if (j == 0) {
                str += data2[j] + ":" + table.rows[i].cells[j].innerHTML;
                str += "ˇ";
            } else if (j == 5) {
                str += data2[j] + ":" + $("#SizeT" + i + " option:selected").text();
                str += "ˇ";
                str += "SizeID" + ":" + $("#SizeT" + i + " option:selected").val();
                str += "ˇ";
            } else {
                str += data2[j] + ":" + table.rows[i].cells[j].childNodes[0].value;
                str += "ˇ";
            }

        }
        str = str.substring(0, str.length - 1);
        str += "^";
    };
    str = str.substring(0, str.length - 1);
    submaitData = {
        "OrderHeader":
        {
            "PurchaseOrder": $("#PurchaseOrderT").val(),
            "StyleNo": $("#StyleNoT").val(),
            "Category": $("#CategoryT").val(),
            "VPN": $("#VPNCodeT").val(),
            "Ordformatid": $("#productid").val(), //"FMT001",
            "PrintShopId": $("#PSID").val(),
            "BillToId": $("#BilltoId").val(),
            "ShipToId": $("#ShiptoId").val(),
            "ShipToAddressId": $("#ShipAddrId").val(),
            "ShipmentTypeId": $("[name='_ShipmentType']").val(),
            "FreightCompany": $("[name='_ExpressCompany'] option:selected").text(),
            "Language": "",
            "WasteAllowanceId": $("[name='_SpareRate']").val(),
            "Country": $("#Country").val(),
            "SupplierNo": $("#SupplierNoT").val(),
            "OrderDetail": str //点击Next之后保存表头和table数据
        }
    };
    $.ajax({
        url: "/Tesco/SaveManulDataAndGotoFiber",
        type: "post",
        dataType: "json",
        data: {
            "submaitPdfData": submaitData.OrderHeader,
        },
        success: function (a) {
            if (a != false) {
                console.log('a======================', a);
                $("#hfTempOrderId").val(a);
                $("#step1").removeClass("red-em");
                $("#step1").addClass("gray-em");
                $("#step2").css("display", "block");
                $("#step2").removeClass("gray-em");
                $("#step2").addClass("red-em");
                $("#CreateTxt").css("display", "none");
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


//检查EAN是否符合规范
function checksum(number) {
    var result = 0;
    var i;
    for (i = 0; i < 12; i += 2) {
        result += parseInt(number[i]);
    };
    for (i = 1; i < 12; i += 2) {
        result += parseInt(number[i]) * 3;
    };
    return (10 - result % 10) % 10;
};

function valid(code) {
    return code.search(/^[0-9]{13}$/) !== -1 && code[12] == checksum(code);
};

