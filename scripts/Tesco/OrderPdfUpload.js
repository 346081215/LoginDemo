//验证VPN
function FunVpnKey(obj) {
    var tmptxt = $(obj).val();
    $("input[name='Vpnid']").val(tmptxt);
}
function FunProKey(obj) {
    var tmptxt = $(obj).val();
    $("input[name='proid']").val(tmptxt);
}
function FunStyleKey(obj) {
    var tmptxt = $(obj).val();
    if (tmptxt.length > 8) {
        tmptxt = tmptxt.substring(0, 8);
        $("input[name='Styleid']").val(tmptxt);
        return
    }
    $("input[name='Styleid']").val(tmptxt);
}


$(function () {



    //$("#btnUpload").attr({ "disabled": "disabled" });
    $("#btnUploadEna").hide();

    $("#btnUpload").click(function () {
        if ($("#photoCover").val() == "") {
            $("#labtxt").html("Please Upload PDF FILE");
            $("#btnUpload").attr({ "disabled": "disabled" });
            showDiv()
            return;
        }
        else {
            $("#btnUpload").removeAttr("disabled");
        }
        if ($("#productid").val() == "" || $("#productid").val() == null) {
            $("#labtxt").html("Please Select Item")
            showDiv();
            return;
        };

        var result = true;

        if (result) {
            showloading();
            $.ajax({
                url: '/Tesco/UploadPdf',
                type: 'POST',
                cache: false,
                data: new FormData($('#FormUploadPdf')[0]),
                processData: false,
                contentType: false,
            }).success(function (data) {
                   
                    setTimeout(function () {
                    var sTrHtml = "";
                    
                    if (data == "ok")       // ='ok' 文件上传成功
                    {
                        loadPdfData();
                        //$("#btnUpload").removeAttr({ "disabled": "disabled" });
                        console.log('data=', data);
                        //alert('GeneratedCode=', GeneratedCode);
                        $("#bg").css("display", "none")
                    }
                    else if (data == "error")
                    {
                        $("#labtxt").html(data + "Upload failed!"); showDiv();
                    }
                    else if (data == "suffixError")
                    {
                        $("#labtxt").html(data + " Upload failed!"); showDiv();
                    }
                    else if (data == "error") {
                        $("#labtxt").html(data + " Upload failed!"); showDiv();
                    }
                    else {
                       
                    }
                    hideloading();
                }, 2000)

            }).fail(function (data) {
                hideloading();
            });
        }
        $("#page-inner2").css("display", "block");
      
   } )
  
    //--------------------------------------------------
    $("#btnUploadEna").click(function () {
        if ($("#photoCover").val() == "") {
            $("#labtxt").html("Please Upload PDF FILE");
            $("#btnUploadEna").attr({ "disabled": "disabled" });
            showDiv()
            return;
        }
        else {
            $("#btnUploadEna").removeAttr("disabled");
        }

        var result = true;

        if (result) {
            showloading();
            $.ajax({
                url: '/Tesco/UploadPdf',
                type: 'POST',
                cache: false,
                data: new FormData($('#FormUploadPdf')[0]),
                processData: false,
                contentType: false,
            }).success(function (data) {

                setTimeout(function () {
                    var sTrHtml = "";

                    if (data == "ok")       // ='ok' 文件上传成功
                    {
                        
                        loadPdfENAData();
                        //$("#btnUpload").removeAttr({ "disabled": "disabled" });
                        console.log('data=', data);
                        //alert('GeneratedCode=', GeneratedCode);
                        $("#bg").css("display", "none")
                    }
                    else if (data == "error") {
                        $("#labtxt").html(data + "Upload failed!"); showDiv();
                    }
                    else if (data == "suffixError") {
                        $("#labtxt").html(data + " Upload failed!"); showDiv();
                    }
                    else if (data == "error") {
                        $("#labtxt").html(data + " Upload failed!"); showDiv();
                    }
                    else {

                    }
                    hideloading();
                }, 2000)

            }).fail(function (data) {
                hideloading();
            });
        }
        $("#page-inner2").css("display", "block");

    })

    function loadPdfENAData() {
        //var pageArr = [];
        //var rowArr = [];
        var columnArr = [];
        //var ColimnValuse = [];
        //var EANBarcodeValue = [];

        ////需求：需要存储的数据编号对应的数据
        //var proStr = ""; //(1)
        //var proValue = "";
        //var SupplierStr = ""; //(2)
        //var SupplierValue = "";
        //var CategoryStr = ""; //(3)
        //var CategoryValue = "";
        //var CountryStr = "";  //(4)
        //var CountryValue = "";
        //var VPNStr = "";  //5
        //var vpnValue = "";
        //var StyleNoStr = "";//(6)
        //var StyleNOV = "";
        //var ChangeStr = ""; //(7)
        //var ChangeValue = ""; //(8)


        $.ajax({
            url: "/Tesco/getdata",
            type: "get",
            success: function (result) {
                
                //console.log('result=', result);

                if (result == "File damage")                            // ="error":pdf文件格式毁坏
                {
                    $("#labtxt").html("[The File damage!]:    Please upload or use other PDF files manually !");
                    //alert("[The File damage!]:    Please upload or use other PDF files manually !");
                    $("#OrdDetail").hide();
                    //$("#Button_artwork").hide();
                    //$("#btnUpload").attr({ "disabled": "disabled" });
                    //$("#page-inner1").css("display", "block");
                    //$("#page-inner2").css("display", "none");
                    //$("#btnUpload").removeAttr("disabled");
                    showDiv()
                    return;
                }
                else {
                    //$("#btnUpload").attr({ "disabled": "disabled" });
                    $("#OrdDetail").show();
                    //检查是否包含条码
                    var toI = 19;
                    $("#Button_artwork").removeAttr("disabled");
                    //
                    var PdfLineData = document.getElementById("PdfLineData");
                    
                    var obj = JSON.parse(result);
                    var Order = obj.document.page.row[11].column[0];
                    var OrderPO = Order.split(":");
                    if (OrderPO[0] == "ADRESA / ADDRESS") {
                        Order = obj.document.page.row[13].column[0];
                        OrderPO = Order.split(":");
                        toI = 20;
                    }

                    if (OrderPO[1].trim() != PdfLineData.children[0].children[2].children[0].value.trim()) {
                        $("#labtxt").html("Please re-upload the bar code! ");
                        showDiv();
                        return;
                    }

                    pageArr = obj.document.page;
                    // console.log("pageArr =", obj.document.page.length);
                    var aa = [];
                    aa = pageArr;
                    //条码单，单页数据
                    
                    if (pageArr.length == undefined) {
                        for (var i = toI; i < pageArr.row.length; i++) {
                            var Ean = pageArr.row[i].column[4];
                            if (Ean != "") {
                                columnArr.push(Ean);
                                for (var j = 0; j < PdfLineData.childElementCount; j++) {
                                    if (PdfLineData.children[j].children[9].innerText == obj.document.page.row[i].column[7]) {
                                        PdfLineData.children[j].children[10].innerText = obj.document.page.row[i].column[4]
                                    }
                                }
                            }
                        }
                       
                        
                        var strEnAndSizeStr = "";
                        if (obj.document.page.row.length == 30) {
                            
                            var values = false;
                            for (var i = 0; i < obj.document.page.row.length; i++) {
                               
                                if (obj.document.page.row[i].column[5] != "" || obj.document.page.row[i].column[7] != "")
                                {
                                    $("#btnUploadEna").hide();
                                }
                                else {
                                    $("#btnUploadEna").show();
                                }

                                if (obj.document.page.row[i].column[0] == "VPN") {
                                    

                                    values = true;
                                    i = i + 3;

                                }
                                if (values) {
                                    

                                    if (obj.document.page.row[i].column[5] == "") {
                                        return;
                                    }
                                    for (var j = 0; j < PdfLineData.childElementCount; j++) {
                                        if (PdfLineData.children[j].children[9].innerText == obj.document.page.row[i].column[7]) {
                                            PdfLineData.children[j].children[10].innerText = obj.document.page.row[i].column[4]
                                        }
                                    }

                                    
                                }

                            }
                        }
                        
                    }
                }
            },
            error: function (mess) {
                //alert(mess);
                $("#labtxt").html("File damage, please manually input");
                window.location.href = "/Tesco/LoadOrderCarelable"
                console.log(mess);
            }
        });
    } 



    //验证StyleNo
    $("input[name='Styleid']").keyup(function () {
        var tmptxt = $(this).val();
        $(this).val(tmptxt.replace(/^[0-9a-zA-Z]{8}/, ''));
    })

});



var datillist = new Array();
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

//submaitData.OrderHeader.
//load json data: 包括条码pdf, uk pdf, ce pdf数据

function loadPdfData() {
    var pageArr = [];
    var rowArr = [];
    var columnArr = [];
    var ColimnValuse = [];
    var EANBarcodeValue = [];

    //需求：需要存储的数据编号对应的数据
    var proStr = ""; //(1)
    var proValue = "";
    var SupplierStr = ""; //(2)
    var SupplierValue = "";
    var CategoryStr = ""; //(3)
    var CategoryValue = "";
    var CountryStr = "";  //(4)
    var CountryValue = "";
    var VPNStr = "";  //5
    var vpnValue = "";
    var StyleNoStr = "";//(6)
    var StyleNOV = "";
    var ChangeStr = ""; //(7)
    var ChangeValue = ""; //(8)

    var issecond = false;
    $.ajax({
        url: "/Tesco/getdata",
        type: "get",
        async: false,
        success: function (result) {
            
            if (result == "File damage")                            // ="File damage":pdf文件格式毁坏
            {
                
                issecond = true;
            }
            else {
                $("#btnUpload").attr({ "disabled": "disabled" });
                $("#OrdDetail").show();
                //检查是否包含条码
                //var obj = JSON.parse(result);
                //pageArr = obj.document.page;
                //console.log('pageArr=', pageArr);
                //
                var obj = JSON.parse(result);
                pageArr = obj.document.page;
                
                //条码单，单页数据
                if (pageArr.length == 1 || pageArr.length==null) {
                    $("#labtxt").html("Order sheet first then barcode sheet");
                    showDiv();
                    return;
                }
                //UK
                if (pageArr.length > 2) { 
                    $("#btnUploadEna").hide();

                     if (pageArr[0].row.length == 30) {
                         if (pageArr[1].row[2] != "") {
                             //columnArr = rowArr[j].column;
                             var proStr = pageArr[0].row[0].column[3];
                             var SupplierValue = pageArr[0].row[8].column[5];
                             var CategoryValue = pageArr[0].row[14].column[1];
                             var CountryValue = pageArr[0].row[21].column[5];

                         }
                         var str = pageArr[1].row[2].column[0];
                         if (str == "VPN :") {
                             if (pageArr[1].row[2].column[1] == "") {
                                 $("#Order").text("UK单");
                                 var vpnValue = str.slice(5);
                             }
                             else {
                                 $("#Order").text("CE单");
                                 var vpnValue = pageArr[1].row[2].column[1];
                             }
                         }
                         else {
                             $("#Order").text("CE单");
                             var vpnValue = str.slice(5);
                         }
                         var strr = pageArr[1].row[3].column[0];
                         if (strr.slice(10) == "") {
                             strr = pageArr[1].row[3].column[1];
                             var StyleNOV = strr.slice(0);
                         } else {
                             var StyleNOV = strr.slice(10);
                         }
                         if (pageArr[1].row[1].column[0] == "SINGLE") {
                             if (pageArr[1].row[7].column[0] == "TPND") {
                                 for (var i = 8; i < pageArr[1].row.length - 1; i++) {
                                     if (pageArr[1].row[i].column[0] != "") {
                                         rowArr.push(pageArr[1].row[i].column[2]);
                                         ColimnValuse.push(pageArr[1].row[i].column[3]);
                                         EANBarcodeValue.push(pageArr[1].row[i].column[7])
                                     }
                                 }
                                 //for (i = 0; i < rowArr.length; i++) {
                                 //    document.OrderDetail.COLOUR.options[i] = new Option(rowArr[i], i);
                                 //}
                             }
                             if (pageArr[1].row[7].column[0] == "Colour") {
                                 for (var i = 9; i < pageArr[1].row.length - 2; i++) {
                                     if (pageArr[1].row[i].column[0] != "") {
                                         rowArr.push(pageArr[1].row[i].column[1]);
                                         ColimnValuse.push(pageArr[1].row[i].column[2]);
                                         EANBarcodeValue.push(pageArr[1].row[i].column[6])
                                     }
                                 }
                             }
                         }
                         if (pageArr[1].row[1].column[0] == "RATIO PACK  A") {
                             for (var i = 8; i < pageArr[1].row.length - 2; i++) {
                                 if (pageArr[1].row[i].column[0] != "") {
                                     rowArr.push(pageArr[1].row[i].column[0]);
                                     ColimnValuse.push(pageArr[1].row[i].column[1]);
                                     EANBarcodeValue.push(pageArr[1].row[i].column[3])
                                 }
                             }
                         };
                         functionHTML(proStr, SupplierValue, CategoryValue, CountryValue, vpnValue, StyleNOV, rowArr, ColimnValuse, EANBarcodeValue);
                     }
                    if (pageArr[0].row.length == 31) {
                        if (pageArr[1].row[2] != "") {
                            //columnArr = rowArr[j].column;
                            var proStr = pageArr[0].row[0].column[3];
                            var SupplierValue = pageArr[0].row[8].column[5];
                            var CategoryValue = pageArr[0].row[13].column[1];
                            var CountryValue = pageArr[0].row[22].column[5];
                        }
                        var str = pageArr[1].row[2].column[0];
                        if (str == "VPN :") {
                            if (pageArr[1].row[2].column[1] == "") {
                                $("#Order").text("UK单");
                                var vpnValue = str.slice(5);
                            }
                            else {
                                $("#Order").text("CE单");
                                var vpnValue = pageArr[1].row[2].column[1];
                            }
                        }
                        else {
                            $("#Order").text("CE单");
                            var vpnValue = str.slice(5);
                        }
                        var strr = pageArr[1].row[3].column[0];
                        if (strr.slice(10) == "") {
                            strr = pageArr[1].row[3].column[1];
                            var StyleNOV = strr.slice(0);
                        } else {
                            var StyleNOV = strr.slice(10);
                        }
                        if (pageArr[1].row[1].column[0] == "SINGLE") {
                            if (pageArr[1].row[7].column[0] == "TPND") {
                                for (var i = 8; i < pageArr[1].row.length - 1; i++) {
                                    if (pageArr[1].row[i].column[0] != "") {
                                        rowArr.push(pageArr[1].row[i].column[2]);
                                        ColimnValuse.push(pageArr[1].row[i].column[3]);
                                        EANBarcodeValue.push(pageArr[1].row[i].column[7])
                                    }
                                }
                            }
                            if (pageArr[1].row[7].column[0] == "Colour") {
                                for (var i = 9; i < pageArr[1].row.length - 2; i++) {
                                    if (pageArr[1].row[i].column[0] != "") {
                                        rowArr.push(pageArr[1].row[i].column[1]);
                                        ColimnValuse.push(pageArr[1].row[i].column[2]);
                                        EANBarcodeValue.push(pageArr[1].row[i].column[6])
                                    }
                                }
                            }
                        }
                        if (pageArr[1].row[1].column[0] == "RATIO PACK  A") {
                            for (var i = 8; i < pageArr[1].row.length - 2; i++) {
                                if (pageArr[1].row[i].column[0] != "") {
                                    rowArr.push(pageArr[1].row[i].column[0]);
                                    ColimnValuse.push(pageArr[1].row[i].column[1]);
                                    EANBarcodeValue.push(pageArr[1].row[i].column[3])
                                }
                            }
                        }
                        functionHTML(proStr, SupplierValue, CategoryValue, CountryValue, vpnValue, StyleNOV, rowArr, ColimnValuse, EANBarcodeValue);
                    }
                    if (pageArr[0].row.length == 32) {
                        if (pageArr[1].row[2] != "") {
                            //columnArr = rowArr[j].column;
                            var proStr = pageArr[0].row[0].column[3];
                            var SupplierValue = pageArr[0].row[9].column[5];
                            if (SupplierValue=="") {
                                SupplierValue = pageArr[0].row[8].column[5];
                            }
                            var CategoryValue = pageArr[0].row[14].column[1];
                            if (CategoryValue=="") {
                                CategoryValue = pageArr[0].row[12].column[1];;
                            }
                            var CountryValue = pageArr[0].row[23].column[5];
                        }
                        var str = pageArr[1].row[2].column[0];
                        if (str == "VPN :") {
                            if (pageArr[1].row[2].column[1] == "") {
                                $("#Order").text("UK单");
                                var vpnValue = str.slice(5);
                            }
                            else {
                                $("#Order").text("CE单");
                                var vpnValue = pageArr[1].row[2].column[1];
                            }
                        }
                        else {
                            $("#Order").text("CE单");
                            var vpnValue = str.slice(5);
                        }
                        var strr = pageArr[1].row[3].column[0];
                        if (strr.slice(10) == "") {
                            strr = pageArr[1].row[3].column[1];
                            var StyleNOV = strr.slice(0);
                        } else {
                            var StyleNOV = strr.slice(10);
                        }
                        if (pageArr[1].row[1].column[0] == "SINGLE") {
                            if (pageArr[1].row[7].column[0] == "TPND") {
                                for (var i = 8; i < pageArr[1].row.length; i++) {
                                    if (pageArr[1].row[i].column[0] != "") {
                                        rowArr.push(pageArr[1].row[i].column[2]);
                                        ColimnValuse.push(pageArr[1].row[i].column[3]);
                                        EANBarcodeValue.push(pageArr[1].row[i].column[7])
                                    }
                                }
                                if (pageArr.length==4) {
                                    for (var i = 1; i < pageArr[2].row.length; i++) {
                                        if (pageArr[2].row[i].column[0] != "") {
                                            rowArr.push(pageArr[2].row[i].column[2]);
                                            ColimnValuse.push(pageArr[2].row[i].column[3]);
                                            EANBarcodeValue.push(pageArr[2].row[i].column[7])
                                        }
                                    }
                                }
                            }
                            if (pageArr[1].row[7].column[0] == "Colour") {
                                for (var i = 9; i < pageArr[1].row.length - 2; i++) {
                                    if (pageArr[1].row[i].column[0] != "") {
                                        rowArr.push(pageArr[1].row[i].column[1]);
                                        ColimnValuse.push(pageArr[1].row[i].column[2]);
                                        EANBarcodeValue.push(pageArr[1].row[i].column[6])
                                    }
                                }
                            }
                        }
                        if (pageArr[1].row[1].column[0] == "RATIO PACK  A") {
                            var vpn = $("#vpnValue").text();
                            if (vpn == "") {
                                for (var i = 10; i < pageArr[1].row.length - 2; i++) {
                                    if (pageArr[1].row[i].column[0] != "") {
                                        rowArr.push(pageArr[1].row[i].column[0]);
                                        ColimnValuse.push(pageArr[1].row[i].column[1]);
                                        EANBarcodeValue.push(pageArr[1].row[i].column[3])
                                    }
                                }
                            } else {
                                for (var i = 10; i < pageArr[1].row.length - 2; i++) {
                                    if (pageArr[1].row[i].column[0] != "") {
                                        rowArr.push(pageArr[1].row[i].column[0]);
                                        ColimnValuse.push(pageArr[1].row[i].column[1]);
                                        EANBarcodeValue.push(pageArr[1].row[i].column[3])
                                    }
                                }
                            }
                        }
                        functionHTML(proStr, SupplierValue, CategoryValue, CountryValue, vpnValue, StyleNOV, rowArr, ColimnValuse, EANBarcodeValue);
                    }
                    if (pageArr[0].row.length == 33) {
                        if (pageArr[1].row[2] != "") {
                            //columnArr = rowArr[j].column;
                            var proStr = pageArr[0].row[0].column[3];
                            var supp = pageArr[0].row[9].column[5];
                            if (supp != "Supplier No. :") {
                                var SupplierValue = pageArr[0].row[9].column[5];
                                if(SupplierValue==""){SupplierValue = pageArr[0].row[10].column[5];}
                            } else {
                                var SupplierValue = pageArr[0].row[10].column[5];
                            }
                            var CategoryValue = pageArr[0].row[15].column[1];
                            if (CategoryValue == "") {
                                CategoryValue = pageArr[0].row[12].column[1];
                            }
                            var CountryValue = pageArr[0].row[24].column[5];
                        }
                        var str = pageArr[1].row[2].column[0];
                        if (str == "VPN :") {
                            if (pageArr[1].row[2].column[1] == "") {
                                $("#Order").text("UK单");
                                var vpnValue = str.slice(5);
                            }
                            else {
                                $("#Order").text("CE单");
                                var vpnValue = pageArr[1].row[2].column[1];
                            }
                        }
                        else {
                            $("#Order").text("CE单");
                            var vpnValue = str.slice(5);
                        }
                        var strr = pageArr[1].row[3].column[0];
                        if (strr.slice(10) == "") {
                            strr = pageArr[1].row[3].column[1];
                            var StyleNOV = strr;
                        } else {
                            var StyleNOV = strr.slice(10);
                        }
                        if (pageArr[1].row[1].column[0] == "SINGLE") {
                            if (pageArr[1].row[7].column[0] == "TPND") {
                                for (var i = 8; i < pageArr[1].row.length - 2; i++) {
                                    if (pageArr[1].row[i].column[0] != "") {
                                        rowArr.push(pageArr[1].row[i].column[2]);
                                        ColimnValuse.push(pageArr[1].row[i].column[3]);
                                        EANBarcodeValue.push(pageArr[1].row[i].column[7])
                                    }
                                }
                            }
                            if (pageArr[1].row[8].column[0] == "Colour") {
                                for (var i = 9; i < pageArr[1].row.length - 2; i++) {
                                    if (pageArr[1].row[i].column[0] != "") {
                                        rowArr.push(pageArr[1].row[i].column[1]);
                                        ColimnValuse.push(pageArr[1].row[i].column[2]);
                                        EANBarcodeValue.push(pageArr[1].row[i].column[6])
                                    }
                                }
                            }
                            if (pageArr[1].row[7].column[0] == "SKU") {
                                for (var i = 8; i < pageArr[1].row.length - 2; i++) {
                                    if (pageArr[1].row[i].column[0] != "") {
                                        rowArr.push(pageArr[1].row[i].column[1]);
                                        ColimnValuse.push(pageArr[1].row[i].column[2]);
                                        EANBarcodeValue.push(pageArr[1].row[i].column[6])
                                    }
                                }
                            }
                        }
                        if (pageArr[1].row[1].column[0] == "RATIO PACK  A") {
                            if (pageArr[1].row[10].column[0] == "Colour") {
                                for (var i = 12; i < pageArr[1].row.length - 2; i++) {
                                    if (pageArr[1].row[i].column[0] != "") {
                                        rowArr.push(pageArr[1].row[i].column[1]);
                                        ColimnValuse.push(pageArr[1].row[i].column[2]);
                                        EANBarcodeValue.push(pageArr[1].row[i].column[3])
                                    }
                                }
                            }
                            var vpn = $("#vpnValue").text();
                            if (vpn == "") {
                                for (var i = 10; i < pageArr[1].row.length - 2; i++) {
                                    if (pageArr[1].row[i].column[0] != "") {
                                        rowArr.push(pageArr[1].row[i].column[0]);
                                        ColimnValuse.push(pageArr[1].row[i].column[1]);
                                        EANBarcodeValue.push(pageArr[1].row[i].column[3])
                                    }
                                }
                            } else {
                                for (var i = 10; i < pageArr[1].row.length - 2; i++) {
                                    if (pageArr[1].row[i].column[0] != "") {
                                        rowArr.push(pageArr[1].row[i].column[0]);
                                        ColimnValuse.push(pageArr[1].row[i].column[1]);
                                        EANBarcodeValue.push(pageArr[1].row[i].column[3])
                                    }
                                }
                            }
                        }
                        functionHTML(proStr, SupplierValue, CategoryValue, CountryValue, vpnValue, StyleNOV, rowArr, ColimnValuse, EANBarcodeValue);

                    }
                    if (pageArr[0].row.length == 34) {
                        if (pageArr[1].row[1].column[0] == "SINGLE") {
                            if (pageArr[1].row[2] != "") {
                                //columnArr = rowArr[j].column;
                                var proStr = pageArr[0].row[0].column[3];
                                var SupplierValue = pageArr[0].row[10].column[5];
                                if (SupplierValue.trim() == "") {
                                    SupplierValue = pageArr[0].row[11].column[3].substring(0, 14);
                                }
                                var CategoryValue = pageArr[0].row[16].column[1];
                                if (CategoryValue.trim() == "") {
                                    CategoryValue = pageArr[0].row[17].column[1];
                                }
                                var CountryValue = pageArr[0].row[25].column[5];
                                if (CountryValue.trim() == "") {
                                    CountryValue = pageArr[0].row[25].column[5]
                                }
                            }
                            var str = pageArr[1].row[2].column[0];
                            if (str.trim() == "") {
                                str = pageArr[1].row[4].column[0];
                            }
                            if (str == "VPN :") {
                                if (pageArr[1].row[2].column[1] == "") {
                                    $("#Order").text("UK单");
                                    var vpnValue = str.slice(5);
                                }
                                else {
                                    $("#Order").text("CE单");
                                    var vpnValue = pageArr[1].row[2].column[1];
                                }
                            }
                            else {
                                $("#Order").text("CE单");
                                var vpnValue = str.slice(5);
                            }
                            var strr = pageArr[1].row[3].column[0];
                            if (strr.slice(10) == "") {
                                strr = pageArr[1].row[3].column[1];
                                var StyleNOV = strr;
                            } else {
                                var StyleNOV = strr.slice(10);
                            }
                            if (pageArr[1].row[7].column[0]== "SKU") {
                                for (var i = 8; i < pageArr[1].row.length -2; i++) {
                                    if (pageArr[1].row[i].column[0]!= "") {
                                        rowArr.push(pageArr[1].row[i].column[1]);
                                        ColimnValuse.push(pageArr[1].row[i].column[2]);
                                        EANBarcodeValue.push(pageArr[1].row[i].column[6])
                                        }
                                }
                            }

                            if (pageArr[1].row[7].column[0] == "TPND") {
                                for (var i = 8; i < pageArr[1].row.length - 2; i++) {
                                    if (pageArr[1].row[i].column[0] != "") {
                                        rowArr.push(pageArr[1].row[i].column[2]);
                                        ColimnValuse.push(pageArr[1].row[i].column[3]);
                                        EANBarcodeValue.push(pageArr[1].row[i].column[7])
                                    }
                                }
                            }
                            if (pageArr[1].row[7].column[0] == "Colour") {
                                for (var i = 8; i < pageArr[1].row.length - 2; i++) {
                                    if (pageArr[1].row[i].column[0] != "") {
                                        rowArr.push(pageArr[1].row[i].column[1]);
                                        ColimnValuse.push(pageArr[1].row[i].column[2]);
                                        EANBarcodeValue.push(pageArr[1].row[i].column[6])
                                    }
                                }
                            }
                            if (pageArr[1].row[8].column[0] == "Colour") {
                                for (var i = 9; i < pageArr[1].row.length - 2; i++) {
                                    if (pageArr[1].row[i].column[0] != "") {
                                        rowArr.push(pageArr[1].row[i].column[1]);
                                        ColimnValuse.push(pageArr[1].row[i].column[2]);
                                        EANBarcodeValue.push(pageArr[1].row[i].column[6])
                                    }
                                }
                            }
                        }
                        if (pageArr[1].row[1].column[0] == "RATIO PACK  A") {
                            if (pageArr[1].row[2] != "") {
                                //columnArr = rowArr[j].column;
                                var proStr = pageArr[0].row[0].column[3];
                                var SupplierValue = pageArr[0].row[10].column[5];
                                if (SupplierValue.trim() == "") {
                                    SupplierValue = pageArr[0].row[11].column[3].substring(0, 14);
                                }
                                var CategoryValue = pageArr[0].row[16].column[1];
                                if (CategoryValue.trim() == "") {
                                    CategoryValue = pageArr[0].row[17].column[1];
                                }
                                var CountryValue = pageArr[0].row[25].column[5];
                                if (CountryValue.trim() == "") {
                                    CountryValue = pageArr[0].row[25].column[5]
                                }
                            }
                            var str = pageArr[1].row[2].column[0];
                            if (str.trim() == "") {
                                str = pageArr[1].row[4].column[0];
                            }
                            if (str == "VPN :") {
                                if (pageArr[1].row[2].column[1] == "") {
                                    $("#Order").text("UK单");
                                    var vpnValue = str.slice(5);
                                }
                                else {
                                    $("#Order").text("CE单");
                                    var vpnValue = pageArr[1].row[2].column[1];
                                }
                            }
                            else {
                                $("#Order").text("CE单");
                                var vpnValue = str.slice(5);
                            }
                            var strr = pageArr[1].row[3].column[0];
                            if (strr.slice(10) == "") {
                                strr = pageArr[1].row[3].column[1];
                                var StyleNOV = strr;
                            } else {
                                var StyleNOV = strr.slice(10);
                            }
                            for (var i = 10; i < pageArr[1].row.length - 2; i++) {
                                if (pageArr[1].row[i].column[0]!="") {
                                    rowArr.push(pageArr[1].row[i].column[0]);
                                    ColimnValuse.push(pageArr[1].row[i].column[1]);
                                    EANBarcodeValue.push(pageArr[1].row[i].column[3])
                                }
                                
                            }
                        }
                        
                        if (pageArr[1].row[3].column[0] == "SINGLE") {
                            if (pageArr[1].row[2] != "") {
                                //columnArr = rowArr[j].column;
                                var proStr = pageArr[0].row[0].column[3];
                                SupplierValue = pageArr[0].row[11].column[3];
                                SupplierValue = SupplierValue.substring(14, SupplierValue.length);
                                    CategoryValue = pageArr[0].row[17].column[1];
                                    CountryValue = pageArr[0].row[26].column[5]
                            }
                            var str = pageArr[1].row[4].column[0];
                            if (str == "VPN :") {
                                if (pageArr[1].row[4].column[1] == "") {
                                    $("#Order").text("UK单");
                                    var vpnValue = str.slice(5);
                                }
                                else {
                                    $("#Order").text("CE单");
                                    var vpnValue = pageArr[1].row[4].column[1];
                                }
                            }
                            else {
                                $("#Order").text("CE单");
                                var vpnValue = str.slice(5);
                            }
                            var strr = pageArr[1].row[5].column[0];
                            if (strr.slice(10) == "") {
                                strr = pageArr[1].row[5].column[1];
                                var StyleNOV = strr;
                            } else {
                                var StyleNOV = strr.slice(10);
                            }
                            if (pageArr[1].row[9].column[0] == "SKU") {
                                for (var i = 10; i < pageArr[1].row.length - 2; i++) {
                                    if (pageArr[1].row[i].column[0] != "") {
                                        rowArr.push(pageArr[1].row[i].column[1]);
                                        ColimnValuse.push(pageArr[1].row[i].column[2]);
                                        EANBarcodeValue.push(pageArr[1].row[i].column[6])
                                    }
                                }
                            }

                            if (pageArr[1].row[9].column[0] == "TPND") {
                                for (var i = 10; i < pageArr[1].row.length - 2; i++) {
                                    if (pageArr[1].row[i].column[0] != "") {
                                        rowArr.push(pageArr[1].row[i].column[2]);
                                        ColimnValuse.push(pageArr[1].row[i].column[3]);
                                        EANBarcodeValue.push(pageArr[1].row[i].column[7])
                                    }
                                }
                            }
                            if (pageArr[1].row[9].column[0] == "Colour") {
                                for (var i = 10; i < pageArr[1].row.length - 2; i++) {
                                    if (pageArr[1].row[i].column[0] != "") {
                                        rowArr.push(pageArr[1].row[i].column[1]);
                                        ColimnValuse.push(pageArr[1].row[i].column[2]);
                                        EANBarcodeValue.push(pageArr[1].row[i].column[6])
                                    }
                                }
                            }
                        }

                        functionHTML(proStr, SupplierValue, CategoryValue, CountryValue, vpnValue, StyleNOV, rowArr, ColimnValuse, EANBarcodeValue);
                    }
                    //console.log(columnArr, pageArr[1].row.length);
                    if (pageArr[0].row.length == 35) {
                        var proStr = pageArr[0].row[0].column[3];
                        var SupplierValue = pageArr[0].row[11].column[4];
                        if (SupplierValue.trim()=="") {
                            SupplierValue = pageArr[0].row[11].column[5].trim();
                        }
                        var CategoryValue = pageArr[0].row[17].column[1];
                        var CountryValue = pageArr[0].row[26].column[5];
                        var str = pageArr[1].row[4].column[0];
                        if (str == "VPN :") {
                            if (pageArr[1].row[4].column[1] == "") {
                                $("#Order").text("UK单");
                                var vpnValue = str.slice(5);
                            }
                            else {
                                $("#Order").text("CE单");
                                var vpnValue = pageArr[1].row[4].column[1];
                            }
                        }
                        else {
                            $("#Order").text("CE单");
                            var vpnValue = str.slice(5);
                        }
                        var strr = pageArr[1].row[5].column[0];
                        if (strr.slice(10) == "") {
                            strr = pageArr[1].row[5].column[1];
                            var StyleNOV = strr;
                        } else {
                            var StyleNOV = strr.slice(10);
                        }
                        if (pageArr[1].row[3].column[0] == "SINGLE") {
                            if (pageArr[1].row[9].column[0] == "SKU") {
                                for (var i = 10; i < pageArr[1].row.length - 2; i++) {
                                    if (pageArr[1].row[i].column[0] != "") {
                                        rowArr.push(pageArr[1].row[i].column[1]);
                                        ColimnValuse.push(pageArr[1].row[i].column[2]);
                                        EANBarcodeValue.push(pageArr[1].row[i].column[6])
                                    }
                                }
                            }

                            if (pageArr[1].row[9].column[0] == "TPND") {
                                for (var i = 10; i < pageArr[1].row.length - 2; i++) {
                                    if (pageArr[1].row[i].column[0] != "") {
                                        rowArr.push(pageArr[1].row[i].column[2]);
                                        ColimnValuse.push(pageArr[1].row[i].column[3]);
                                        EANBarcodeValue.push(pageArr[1].row[i].column[7])
                                    }
                                }
                            }
                            if (pageArr[1].row[9].column[0] == "Colour") {
                                for (var i = 10; i < pageArr[1].row.length - 2; i++) {
                                    if (pageArr[1].row[i].column[0] != "") {
                                        rowArr.push(pageArr[1].row[i].column[1]);
                                        ColimnValuse.push(pageArr[1].row[i].column[2]);
                                        EANBarcodeValue.push(pageArr[1].row[i].column[6])
                                    }
                                }
                            }
                        }
                        if (pageArr[1].row[3].column[0] == "RATIO PACK  A") {
                            for (var i = 12; i < pageArr[1].row.length - 2; i++) {
                                if (pageArr[1].row[i].column[0] != "") {
                                    rowArr.push(pageArr[1].row[i].column[0]);
                                    ColimnValuse.push(pageArr[1].row[i].column[1]);
                                    EANBarcodeValue.push(pageArr[1].row[i].column[3])
                                }

                            }
                        }
                        functionHTML(proStr, SupplierValue, CategoryValue, CountryValue, vpnValue, StyleNOV, rowArr, ColimnValuse, EANBarcodeValue);

                    }

                }
                else {

                }
            }
        },
        error: function (mess) {
            //alert(mess);
            $("#labtxt").html("File damage, please manually input");
            window.location.href = "/Tesco/LoadOrderCarelable"
            console.log(mess);
        }
    });
    if (issecond) {
        var RegEN = new RegExp(/^[a-zA-Z]+$/)
        var RegXS = new RegExp(/^\d+(\.\d+)?$/);
        $.ajax({
            url: "/Tesco/getdata2",
            type: "get",
            dataType: "json",
            success: function (result) {
                if (result != "File damage")                            // ="File damage":pdf文件格式毁坏
                {
                    $("#btnUpload").attr({ "disabled": "disabled" });
                    $("#OrdDetail").show();
                    console.log(result);
                    var proStr = result.document.row[0].column[1].text.trim()
                    var supno = result.document.row[1].column[0].text.trim();
                    if (result.document.row[1].column[0].text.indexOf("Supplier") > -1) {
                        supno = result.document.row[1].column[1].text.trim();
                    } else if (result.document.row[1].column[1].text.indexOf("Supplier") > -1) {
                        supno = result.document.row[1].column[2].text.trim();
                    } else if (result.document.row[1].column[2].text.indexOf("Supplier") > -1) {
                        supno = result.document.row[1].column[3].text.trim();
                    }
                    var cate = result.document.row[2].column[1].text.trim();
                    var country = result.document.row[3].column[3].text;
                    country = country.substring(20, country.length).trim();
                    var vpn = result.document.row[5].column[0].text;
                    vpn = vpn.substring(5, vpn.length).trim();
                    var styleno = result.document.row[6].column[0].text;
                    styleno = styleno.substring(10, styleno.length).trim();
                    if (styleno=="") {
                        styleno = result.document.row[6].column[1].text.trim();
                    }
                    var colour = [];
                    var size = [];
                    var ean = [];
                    ///第一种格式 SKU Colour Size SingleQty CaseSize CaseQty EANBarcode ITFBarcode  UnitSellingPriceUnitcost HTS QuotaCategory
                    if (result.document.row[11].column[0].text == "SKU") {
                        GetOrderData(12,result, colour, size, ean);
                        
                    } else if (result.document.row[10].column[0].text == "TPND") {
                        ///第二种解析格式
                        GetOrderData(11,result, colour, size, ean);
                    } else if (result.document.row[11].column[0].text.trim().toLowerCase() == "colour") {
                        //第三种订单
                        GetOrderData(12,result, colour, size, ean);
                    }
                    //console.log("colour:"+colour); console.log("size:"+size); console.log("ean:"+ean);
                    functionHTML(proStr, supno, cate, country, vpn, styleno, colour, size, ean);
               }else {
                    $("#labtxt").html("[The File damage!]:Please create the order manually !");
                    $("#OrdDetail").hide();
                    $("#btnUploadEna").hide();
                    showDiv()
                    return;
                }
            },
            error: function (mess) {
                console.log(mess);
            }
        });
        
    }


}


function GetOrderData(a, result, colour, size, ean) {
    var RegEN = new RegExp(/^[a-zA-Z]+$/)
    var RegXS = new RegExp(/^\d+(\.\d+)?$/);
    for (var i = a; i < result.document.row.length - 1; i++) {
        var detailstr = "";
        var isSize = false;
        var colIndex = 100;
        for (var j = 0; j < result.document.row[i].column.length; j++) {
            detailstr = result.document.row[i].column[j].text.trim();
            if (RegEN.test(detailstr)) { colour.push(detailstr); colIndex = j }
            if (j > colIndex && isSize == false) {
                size.push(detailstr);
                isSize = true;
            }
            if (valid(detailstr)) { ean.push(detailstr) }
        }
    }
}

//PDF文件上传之后从后台获取的数据绑定到了页面的表中，以便客户预览
function functionHTML(proStr, SupplierValue, CategoryValue, CountryValue, vpnValue, StyleNOV, color, Size, EAN) {
    
    if (vpnValue=="") {
        for (var i = 0; i < EAN.length; i++) {
            if (EAN[i] == "") {
                $("#labtxt").html("Please upload or use other PDF files manually!");
                showDiv();
                return;
            }
        }
    }
    var errean = "";
    var DeptName = [];
    var DeptID = [];
        $.ajax({
            url: "/Tesco/getTescoDeptList",
            type: "get",
            data: { szType: 1 },
            dataType:"json",
            success: function (result) {
                console.log(result[0].Dept);
                var obj = result;
                DeptName.push("--Please Select--");
                DeptID.push(" ");
                for (var i = 0; i < obj.length; i++) {
                    var deptS = obj[i].Dept;
                    if (deptS != DeptName[DeptName.length - 1]) {
                        DeptName.push(obj[i].Dept);
                        DeptID.push(obj[i].ID);
                    }
                }
                //if (EAN[3] != "") {
                    //table
                    var eanerror = "";
                    var tsar = ""
                    var min = Size.length;
                    if (Size.length > color.length) {
                        min = color.length
                    }
                    for (var i = 0; i < min; i++) {
                        if (EAN[i] == "" || EAN[i] ==null)
                        {
                            eanerror = "Please upload the barcode sheet";
                        }
                        tsar += "<tr><td>" + (i + 1) + "</td>"
                        tsar += "<td><input id='ComPercent" + i + "' type='text' value='1' name='ComPercent' style='width:70px !important'></td>"
                        tsar += "<td><input id='Proid" + i + "' type='text' name='proid' style='width:70px !important' value='" + proStr + "' onkeyup='FunProKey(this)' /></td>"
                        tsar += "<td>" + SupplierValue + "</td>"
                        tsar += "<td>" + CategoryValue + "</td>"
                        tsar += "<td>" + CountryValue + "</td>"
                        tsar += "<td><input id='Vpnid" + i + "' type='text' name='Vpnid' style='width:70px !important' value='" + vpnValue + "' onkeyup='FunVpnKey(this)'/></td>"
                        if (EAN[i] == "") {
                            tsar += "<td><input id='Styleid" + i + "' type='text' name='Styleid' style='width:70px !important' value='' onkeyup='FunStyleKey(this)'/></td>"
                        } else {
                            tsar += "<td><input id='Styleid" + i + "' type='text' name='Styleid' style='width:70px !important' value='" + $.trim(StyleNOV) + "' onkeyup='FunStyleKey(this)'/></td>"
                        }
                        tsar += "<td>" + color[i] + "</td>"
                        tsar += "<td style='display:none;'>" + Size[i] + "</td>"
                        if (EAN.length > i) {
                            tsar += "<td>" + EAN[i] + "</td> "
                        } else {
                            tsar += "<td></td> "
                        }
                       
                        tsar += "<td ><select id='Dept" + i + "' name='selectDept' onchange='return UPdetaDepttoSize(" + i + ",this)'>";
                        for (var j = 0; j < DeptName.length; j++) {
                            tsar += "<option id='DeptText" + j + "' value='"+DeptID[j]+"'>" + DeptName[j] + "</option>";
                        }
                        tsar += "</select></td><td><select id='Size" + i + "' onchange='return UPSizeToSec(" + i + ",this)'>";
                        tsar += "<option id='Sizeop" + i + "'>--Please Select--</option>";
                        tsar += "</select></td>"
                        tsar += "<td><select id='Size1s" + i + "'' ><option value=''></option></select></td>"
                        tsar += "<td><select id='Size2s" + i + "'' ><option value=''></option></select></td>"
                        tsar += "<td><select id='Size3s" + i + "'' ><option value=''></option></select></td>"
                        tsar += "<td><select id='Size4s" + i + "'' ><option value=''></option></select></td>"
                        tsar += "</tr>";



                    }
                    $("#PdfLineData").html(tsar);
                    if (eanerror != "") {
                        $("#labtxt").html("Please upload the barcode sheet!");
                        $("#btnUpload").attr({ "disabled": "disabled" });
                        $("#Button_artwork").attr({ "disabled": "disabled" });
                        $("#btnUploadEna").show();
                        $("#btnUpload").hide();
                        showDiv()
                    }


                //}
                //else {
                //    var tsar = ""
                   
                //    for (var i = 0; i < color.length; i++) {

                //        tsar += "<tr><td>" + (i + 1) + "</td><td><input id='ComPercent" + i + "' type='number' min='0' value='' name='ComPercent' style='width:70px !important'></td><td>" + proStr + "</td><td>" + SupplierValue + "</td><td>" + CategoryValue + "</td><td>" + CountryValue + "</td><td>" + vpnValue + "</td><td>" + StyleNOV + "</td><td>" + color[i] + "</td><td style='display:none;'>" + Size[i] + "</td><td>" + EAN[i] + "</td> <td ><select id='Dept" + i + "' onchange='return UPdetaDepttoSize(" + i + ",this)'>";
                //        for (var j = 0; j < DeptName.length; j++) {
                //            tsar += "<option id='DeptText" + j+ "'>" + DeptName[j] + "</option>";
                //        }
                //        tsar += "</select></td><td><select id='Size" + i + "' class='UploadDept' onchange='return UPSizeToSec(" + i + ",this)'>";
                //        tsar += "<option id='Sizeop" + i + "'>--Please Select--</option>";
                //        tsar += "</select></td><td><input id='Size1s" + i + "'' type='text' class='US_Size' value='' style='width:100px !important'></td><td><input id='Size2s" + i + "'' type='text' value='' style='width:100px !important'></td><td><input id='Size3s" + i + "'' type='text' value=''style='width:100px !important'></td><td><input id='Size4s" + i + "'' type='text' value='' style='width:100px !important'></td></tr>";
                //        tsar += "</tr>";
                //    }
                //    $("#PdfLineData").html(tsar);

                //}
                console.log(obj[0].Dept)

            }, error: function (mess) {
                //alert("1111");
                $("#labtxt").html("File damage, please manually input");
                window.location.href = "/Tesco/LoadOrderCarelable"
                console.log(mess);
            }
        });
       
}
function UPdetaDepttoSize(index, ojb) {
    var Sizename = [];
    var Deptname = $("#Dept" + index + " Option:selected").text();
    var id = [];
    $.ajax({
        url: "/Tesco/getTescoDeptList",
        type: "get",
        data: { szType: 1 },
        dataType:"json",
        success: function (result) {
            for (var i = 0; i < result.length; i++) {
                var deptS = result[i].Dept;
                if (deptS==Deptname) {          
                    Sizename.push(result[i].PrimarySize_UK);
                    id.push(result[i].ID);
                }
            }
            var tsar = "<option selected='selected'>--Please Select--</option>";
            for (var j = 0; j <Sizename.length; j++) {
                tsar += "<option id='Sizeop" + j + "' value='"+id[j]+"'>" + Sizename[j] + "</option>";
            }
            
            var tablepdf = document.getElementById("PdfLineData");
            for (var i = 0; i < tablepdf.childElementCount; i++) {
                $("#Size" + i).html(tsar);
            }
            $("#Size1s" + index).html("<option value=''></option>");
            $("#Size2s" + index).html("<option value=''></option>");
            $("#Size3s" + index).html("<option value=''></option>");
            $("#Size4s" + index).html("<option value=''></option>");
            $("[name='selectDept']").val($("#Dept" + index).val())
        }, error: function (mess) {
            //alert("1111");
            $("#labtxt").html("File damage, please manually input");
            window.location.href = "/Tesco/LoadOrderCarelable"
            console.log(mess);
        }
    });
}
function UPSizeToSec(index, ojb) {
    var Secondary = [];
   // var ID = [];
    var Deptname = $("#Dept" + index + " Option:selected").text();
    var ID = $("#Size" + index + " Option:selected").val();
    var Sizevaluse = $("#Size" + index + " Option:selected").text();
    $.ajax({
        url: "/Tesco/getTescoDeptList",
        type: "get",
        data: { szType: 1 },
        dataType: "json",
        success: function (result) {
                $("#Size1s" + index).html("<option value=''></option>");
                $("#Size2s" + index).html("<option value=''></option>");
                $("#Size3s" + index).html("<option value=''></option>");
                $("#Size4s" + index).html("<option value=''></option>");

                for (var i = 0; i < result.length; i++) {
                var name = result[i].Dept;
                var id = result[i].ID;
                if (Deptname == name && id == ID) {
                    var html ="<option value=''></option>";
                    if (!Secondary.indexOf(result[i].OptionalSecondary1)>-1) {
                        Secondary.push(result[i].OptionalSecondary1);
                    }
                    if (!Secondary.indexOf(result[i].OptionalSecondary2)>-1) {
                        Secondary.push(result[i].OptionalSecondary2);
                    }
                    if (!Secondary.indexOf(result[i].OptionalSecondary3) >-1) {
                        Secondary.push(result[i].OptionalSecondary3);
                    }
                    if (!Secondary.indexOf(result[i].OptionalSecondary4) >-1) {
                        Secondary.push(result[i].OptionalSecondary4);
                    }
                    if (!Secondary.indexOf(result[i].OptionalSecondary5) > -1) {
                        Secondary.push(result[i].OptionalSecondary5);
                    }
                    if (!Secondary.indexOf(result[i].OptionalSecondary6) >-1) {
                        Secondary.push(result[i].OptionalSecondary6);
                    }
                    if (!Secondary.indexOf(result[i].OptionalSecondary7) >-1) {
                        Secondary.push(result[i].OptionalSecondary7);
                    }
                    if (!Secondary.indexOf(result[i].OptionalSecondary8) >-1) {
                    Secondary.push(result[i].OptionalSecondary8);
                    }
                    if (!Secondary.indexOf(result[i].OptionalSecondary9) >-1) {
                    Secondary.push(result[i].OptionalSecondary9);
                    }
                    if (!Secondary.indexOf(result[i].OptionalSecondary10) >-1) {
                        Secondary.push(result[i].OptionalSecondary10);
                    }
                    if (!Secondary.indexOf(result[i].OptionalSecondary11) >-1) {
                    Secondary.push(result[i].OptionalSecondary11);
                    }
                    if (!Secondary.indexOf(result[i].OptionalSecondary12) > -1) {
                        Secondary.push(result[i].OptionalSecondary12);
                    }
                    for (var j = 0; j < Secondary.length; j++) {

                        if (Secondary[j]!="") {
                            html += "<option value='" + Secondary[j] + "'>" + Secondary[j] + "</option>";
                        }
                    }
                    $("#Size1s" + index).html(html);
                    $("#Size2s" + index).html(html);
                    $("#Size3s" + index).html(html);
                    $("#Size4s" + index).html(html);
                    if (index==0) {
                        $("#labtxt").html("Please check if Secondary sizing information is required.");
                        showDiv();
                    }
                }

            }
        }, error: function (mess) {
            //alert("1111");
            $("#labtxt").html("File damage, please manually input");
            window.location.href = "/Tesco/LoadOrderCarelable"
            console.log(mess);
        }
    });
}

