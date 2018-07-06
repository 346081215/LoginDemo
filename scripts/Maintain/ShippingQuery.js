
$(function () {   
    $("#btnSearch").click(function () {
        $("#nowpage").val(1);
        $("#pc").val(1);
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
        funModifyRecordShipto(Shipto);
    });
    $('#Pageup1').click(function () {
        var nowpage = document.getElementById("nowpage1").value;
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) > 1) {
            newpage = parseInt(nowpage) - 1;
            document.getElementById("pc1").value = newpage;
            document.getElementById("nowpage1").value = newpage;
            funModifyRecordShipto(Shipto);
        }
    });
    $('#Pagewown1').click(function () {
        var nowpage = document.getElementById("nowpage1").value;
        var maxpage = parseInt(document.getElementById("PageTotalCount1").value);
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) < maxpage) newpage = parseInt(nowpage) + 1;
        document.getElementById("pc1").value = newpage;
        document.getElementById("nowpage1").value = newpage;
        funModifyRecordShipto(Shipto);
    });
    $('#PageLast1').click(function () {
        var maxpage = parseInt(document.getElementById("PageTotalCount1").value);
        document.getElementById("pc1").value = maxpage;
        document.getElementById("nowpage1").value = maxpage;
        funModifyRecordShipto(Shipto);
    });
    $('#PageGO1').click(function () {
        var nowpage = parseInt(document.getElementById("nowpage1").value);
        var maxpage = parseInt(document.getElementById("PageTotalCount1").value) + 1;
        if (nowpage > 0 && nowpage < maxpage) {
            document.getElementById("pc1").value = document.getElementById("nowpage1").value;
            funModifyRecordShipto(Shipto);
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

    $('#PageIndex2').click(function () {
        document.getElementById("pc2").value = 1;
        document.getElementById("nowpage2").value = 1;
        funModifyRecordShiptoAddress(ShipToAddressId);
    });
    $('#Pageup2').click(function () {
        var nowpage = document.getElementById("nowpage2").value;
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) > 1) {
            newpage = parseInt(nowpage) - 1;
            document.getElementById("pc2").value = newpage;
            document.getElementById("nowpage2").value = newpage;
            funModifyRecordShiptoAddress(ShipToAddressId);
        }
    });
    $('#Pagewown2').click(function () {
        var nowpage = document.getElementById("nowpage2").value;
        var maxpage = parseInt(document.getElementById("PageTotalCount2").value);
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) < maxpage) newpage = parseInt(nowpage) + 1;
        document.getElementById("pc2").value = newpage;
        document.getElementById("nowpage2").value = newpage;
        funModifyRecordShiptoAddress(ShipToAddressId);
    });
    $('#PageLast2').click(function () {
        var maxpage = parseInt(document.getElementById("PageTotalCount2").value);
        document.getElementById("pc2").value = maxpage;
        document.getElementById("nowpage2").value = maxpage;
        funModifyRecordShiptoAddress(ShipToAddressId);
    });
    $('#PageGO2').click(function () {
        var nowpage = parseInt(document.getElementById("nowpage2").value);
        var maxpage = parseInt(document.getElementById("PageTotalCount2").value) + 1;
        if (nowpage > 0 && nowpage < maxpage) {
            document.getElementById("pc2").value = document.getElementById("nowpage2").value;
            funModifyRecordShiptoAddress(ShipToAddressId);
        }
        else {

            $("#labtxt").html("wrong page no.");
            showDiv();
            document.getElementById("nowpage2").value = 1;
        }
    });
    $("#nowpage2").keyup(function () {
        var t = $("#nowpage2").val();
        if (isNaN(t)) {
            $("#labtxt").html("wrong page no.");
            showDiv();
            document.getElementById("nowpage2").value = 1;
        }
    });
    $("#LogQueryReturn").click(function () {
        $("#LogQuery").css("display", "none");
    });
});

function GetOrder()
{
    $("#ShowShipping").css("display", "")
    $("#row-fluid").css("display", "")
    $("#LogQuery").css("display","none");
    var BrandId = $("#RedBrandId option:selected").val();
    if (BrandId == "") {
        $("#labtxt").html("Please select a Brand");
        showDiv();
        return;
    }
    var AccountName = $("#AccountName").val();
    var Account = $("#Account").val();
    var posturl = "/Maintain/GetShippingInfo";
    $.post(posturl, {
        BrandId: BrandId, AccountName: AccountName, Account: Account,
        Page: document.getElementById("nowpage").value
    }, function (result) {
        var obj = jQuery.parseJSON(result);
        if (obj) {
            var tshtml = "";
            var intSeq = 0;
            $.each(obj, function (i, item) {              
                intSeq++;
                tshtml += "<tr>";
                tshtml += "<td class='center'>" + item.Seq + "</td>";
                tshtml += "<td class='center'>" + item.ShipToId + "</td>";
                tshtml += "<td class='center'>" + item.Name + "</td>";
                tshtml += "<td class='center'>" + item.OOS_CodeNO + "</td>";
                tshtml += "<td class='center'>" + item.IsDefault + "</td>";
                tshtml += "<td class='center'>" + "<button type='button' class='btn' style='margin-right:5px' onclick='return OpenShippingEditView(this);'  value = '"+ item.ShipToId + "' >Edit</button><button type=button id=ModifyRecord name=ModifyRecord class='btn btn-default'  onclick='return funModifyRecordShipto(this)' value='" + item.ShipToId + "'>Edit History</button></td>";
                tshtml += "</tr>";

                //TotalPageCount
            });
            $("#ShippingDetail").html(tshtml);
            $("#TotalPageCount").html(obj[0].TotalPageCount);         
            $("#PageTotalCount").val(obj[0].TotalPageCount);
        }
    })
}

function OpenShippingEditView(obj) {
    $("#IsUpdate").text(1);
    $("#EditName").val("");
    $("#EditAccount").val("");
    $("#LogQuery").css("display", "none");
    $("#ShippingSel").css("display", "none")
    $("#EditShippingQurey").css("display", "");
    //var Date = obj.attributes["value"].value;
    //var $strDates = Date.split(";");

    //var Name = ($strDates[0]);
    //var OOS_CodeNO = ($strDates[1]);
    //var IsDefault = ($strDates[2]);
    var ShipToId = obj.value;
   
    $.post("/Maintain/GetShipToInfor", { ShipToId: ShipToId }, function (result)
    {
        if (result.FunStatus == "success")
        {
            $("#ShipToId").val(result.data.ShiptoId);
            $("#EditName").val(result.data.ShiptoName);
            $("#EditAccount").val(result.data.OOS_CodeNO);
            $("#ShipToId").attr("disabled", 'disabled');
            //$("#EditAccount").attr("disabled", 'disabled');
            if (result.data.IsDefault == "True")
            {
                $(":radio[id='CheckYes'][value='" + true + "']").prop("checked", "checked");
            }
            else
            {
                $(":radio[id='CheckNO'][value='" + false + "']").prop("checked", "checked");
            }
        }
        else
        {

        }

    });

    var posturl = "/Maintain/GetShipToAddressInfo";
    $.post(posturl, {
        ShipToId: ShipToId
    }, function (result) {

        var obj = jQuery.parseJSON(result);
        if (obj) {
            debugger;
            var shtml = "";
            var intSeq = 0;
            $.each(obj, function (i, item) {
                intSeq++;
                shtml += "<tr>";
                shtml += "<td class='center'>" + item.Seq + "</td>";
                shtml += "<td class='center'>" + item.oos_name + "</td>";
                shtml += "<td class='center'>" + item.oos_address + "</td>";
                shtml += "<td class='center'>" + item.oos_contactname + "</td>";
                shtml += "<td class='center'>" + item.oos_contacttel + "</td>";
                shtml += "<td class='center'>" + item.DeliveryCompany + "</td>";
                shtml += "<td class='center'>" + (item.oos_isdefaultaddr == "True" ? "Yes" : "No") + "</td>";
                if (item.oos_isdefaultaddr == "True" && item.IsEnabled == "True") {
                    shtml += "<td class='center'>" + "<button type='button' class='btn' disabled=\"disabled\" onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' type='button' style='margin-right: 5px;' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>DisEnabled</button><button class='btn' type='button'  onclick='return funModifyRecordShiptoAddress(this);' value = '" + item.ShipToAddressId + "'>Edit History</button></td>";
                }
                else if (item.oos_isdefaultaddr == "True" && item.IsEnabled == "False") {

                    shtml += "<td class='center'>" + "<button class='btn' type='button' disabled=\"disabled\"  onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' disabled=\"disabled\" onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' type='button' style='margin-right: 5px;' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>IsEnabled</button><button class='btn' type='button'  onclick='return funModifyRecordShiptoAddress(this);' value = '" + item.ShipToAddressId + "'>Edit History</button></td>";
                }
                else if (item.oos_isdefaultaddr == "False" && item.IsEnabled == "True") {

                    shtml += "<td class='center'>" + "<button class='btn'type='button'  onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' type='button' style='margin-right: 5px;' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>IsEnabled</button><button class='btn' type='button'  onclick='return funModifyRecordShiptoAddress(this);' value = '" + item.ShipToAddressId + "'>Edit History</button></td>";
                }
                else {
                    shtml += "<td class='center'>" + "<button class='btn' type='button' disabled=\"disabled\"  onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' disabled=\"disabled\"  onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' type='button' style='margin-right: 5px;' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>DisEnabled</button><button class='btn' type='button' onclick='return funModifyRecordShiptoAddress(this);' value = '" + item.ShipToAddressId + "'>Edit History</button></td>";
                }
               
                shtml += "</tr>";
            });
            $("#ShipToAddressDetil").html(shtml);
        }

        var posturl = "/Maintain/BagShopPirintShop";
        $.post(posturl, {
            ShipToId: ShipToId
        }, function (res) {
            $strDates = res.substring(1);
            var strDates = $strDates.split("^");
            //$("#eidt_CheckPrintshop option").each(function () {                                
            //    for (var i = 0; i < strDates.length; i++) {
            //            heckPrintshop = $(this).attr("value");
            //            if (heckPrintshop == strDates[i]) {
            //                $(this).attr("disabled", false);
            //            }
                       
            //        }
            //})

            //$("#CheckPrintshop option").each(function () {
            //    for (var i = 0; i < strDates.length; i++) {
            //        Printshop = $(this).attr("value");
            //        if (Printshop == strDates[i]) {
            //            $(this).attr("disabled", false);
            //        }

            //    }
            //})
            
        })

    })
}

$("#EditShippingInfo").click(function () {
    var IsUpdate = $("#IsUpdate").text();
    var ShipToId= $("#ShipToId").val();
    var Name = $("#EditName").val();
    var OOS_CodeNO = $("#EditAccount").val();
    var Isdefault = $("#EditIsdefault input:checked").val();
    var BrandId = $("#RedBrandId option:selected").val();
    //if (ShipToId == "") {
    //    $("#labtxt").html(" Please input the account ShipToId.");
    //    showDiv();
    //    return;
    //}
    if (OOS_CodeNO == "") {
        $("#labtxt").html(" Please input the Shipto#.");
        showDiv();
        return;
    }
    if (Name == "") {
        $("#labtxt").html(" Please input the Shipto Name.");
        showDiv();
        return;
    }
    var posturl = "/Maintain/UpdateShippingInfo";
    $.post(posturl, {
        Name: Name, OOS_CodeNO: OOS_CodeNO, Isdefault: Isdefault, ShipToId: ShipToId, BrandId: BrandId, IsUpdate:IsUpdate
    }, function (result) {
        if (result == '1') {


            $("#labtxt").html("Success!");

            showDiv();
            return;
        }
        else
        {
            if (result.indexOf(BrandId + "-"+"Ship") >= 0)
            {
                var $Shipto = result.split("^")[1];
                $("#ShipToId").val($Shipto);
                $("#labtxt").html("Success!");
                showDiv();
                return;
            }

          

        }
        if (result == '2')
        {
            $("#labtxt").html("The same ShipToId already exists!");
            showDiv();
            return;
        }
        if (result == '3') {
            $("#labtxt").html("The same Shipto# exists!");
            showDiv();
            return;
        }
        else
        {
            $("#labtxt").html("Error!");
            showDiv();
            return;
        }

    })

})
function SetIsDefault(obj) {
        $("#LogQuery1").css("display","none");
        var ShipToAddressId = obj.attributes["value"].value;
        var ShipToId = $("#ShipToId").val();
        var BrandId = $("#RedBrandId").val();
        var posturl = "/Maintain/SetIsDefault";
        $.post(posturl, {
            ShipToAddressId: ShipToAddressId, ShipToId: ShipToId
        }, function (res) {
            var posturl = "/Maintain/GetShipToAddressInfo";
            $.post(posturl, {
                ShipToId: ShipToId, BrandId:BrandId
            }, function (result) {            
                    var obj = jQuery.parseJSON(result);
                    if (obj) {
                        var shtml = "";
                        var intSeq = 0;
                        $.each(obj, function (i, item) {
                            intSeq++;
                            shtml += "<tr>";
                            shtml += "<td class='center'>" + item.Seq + "</td>";
                            shtml += "<td class='center'>" + item.oos_name + "</td>";
                            shtml += "<td class='center'>" + item.oos_address + "</td>";
                            shtml += "<td class='center'>" + item.oos_contactname + "</td>";
                            shtml += "<td class='center'>" + item.oos_contacttel + "</td>";
                            shtml += "<td class='center'>" + item.DeliveryCompany + "</td>";
                            shtml += "<td class='center'>" + (item.oos_isdefaultaddr == "True" ? "Yes" : "No") + "</td>";
                            if (item.oos_isdefaultaddr == "True" && item.IsEnabled == "True") {
                                shtml += "<td class='center'>" + "<button type='button' class='btn' disabled=\"disabled\" onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' style='margin-right: 5px;' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>DisEnabled</button><button class='btn' type='button'  onclick='return funModifyRecordShiptoAddress(this);' value = '" + item.ShipToAddressId + "'>Edit History</button></td>";
                            }
                            else if (item.oos_isdefaultaddr == "True" && item.IsEnabled == "False") {

                                shtml += "<td class='center'>" + "<button class='btn' type='button' disabled=\"disabled\"  onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' disabled=\"disabled\" onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' style='margin-right: 5px;' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>IsEnabled</button><button class='btn' type='button'  onclick='return funModifyRecordShiptoAddress(this);' value = '" + item.ShipToAddressId + "'>Edit History</button></td>";
                            }
                            else if (item.oos_isdefaultaddr == "False" && item.IsEnabled == "True") {

                                shtml += "<td class='center'>" + "<button class='btn'type='button'  onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' style='margin-right: 5px;' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>IsEnabled</button><button class='btn' type='button'  onclick='return funModifyRecordShiptoAddress(this);' value = '" + item.ShipToAddressId + "'>Edit History</button></td>";
                            }
                            else {
                                shtml += "<td class='center'>" + "<button class='btn' type='button' disabled=\"disabled\"  onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' disabled=\"disabled\"  onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' style='margin-right: 5px;' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>DisEnabled</button><button class='btn' type='button'  onclick='return funModifyRecordShiptoAddress(this);' value = '" + item.ShipToAddressId + "'>Edit History</button></td>";
                            }
                           
                            shtml += "</tr>";
                        });
                        $("#ShipToAddressDetil").html(shtml);
                    }
            })    
        })
    }
function DeleteThisAddressInfo(obj)
{
        $("#LogQuery1").css("display", "none");
        var Date = obj.attributes["value"].value;
        var $strDates = Date.split(";");
        var ShipToAddressId = ($strDates[0]);
        var ShipToId = ($strDates[1]);
        var BrandId = $("#RedBrandId").val();
        var posturl = "/Maintain/DeleteThisAddress";
        $.post(posturl, {
            ShipToAddressId: ShipToAddressId
        }, function (res) {       
            var posturl = "/Maintain/GetShipToAddressInfo";
            $.post(posturl, {
                ShipToId: ShipToId,BrandId:BrandId
            }, function (result) {     
                    var obj = jQuery.parseJSON(result);
                    if (obj) {
                        var shtml = "";
                        var intSeq = 0;
                        $.each(obj, function (i, item) {
                            intSeq++;
                            shtml += "<tr>";
                            shtml += "<td class='center'>" + item.Seq + "</td>";
                            shtml += "<td class='center'>" + item.oos_name + "</td>";
                            shtml += "<td class='center'>" + item.oos_address + "</td>";
                            shtml += "<td class='center'>" + item.oos_contactname + "</td>";
                            shtml += "<td class='center'>" + item.oos_contacttel + "</td>";
                            shtml += "<td class='center'>" + item.DeliveryCompany + "</td>";
                            shtml += "<td class='center'>" + (item.oos_isdefaultaddr == "True" ? "Yes" : "No") + "</td>";               
                            if (item.oos_isdefaultaddr == "True" && item.IsEnabled == "True") {
                                shtml += "<td class='center'>" + "<button type='button' class='btn' disabled=\"disabled\" onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' style='margin-right: 5px;' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>DisEnabled</button><button class='btn' type='button'  onclick='return funModifyRecordShiptoAddress(this);' value = '" + item.ShipToAddressId + "'>Edit History</button></td>";
                            }
                            else if (item.oos_isdefaultaddr == "True" && item.IsEnabled == "False") {

                                shtml += "<td class='center'>" + "<button class='btn' type='button' disabled=\"disabled\"  onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' disabled=\"disabled\" onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' style='margin-right: 5px;' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>IsEnabled</button><button class='btn' type='button'  onclick='return funModifyRecordShiptoAddress(this);' value = '" + item.ShipToAddressId + "'>Edit History</button></td>";
                            }
                            else if (item.oos_isdefaultaddr == "False" && item.IsEnabled == "True") {

                                shtml += "<td class='center'>" + "<button class='btn'type='button'  onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' style='margin-right: 5px;' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>IsEnabled</button><button class='btn' type='button'  onclick='return funModifyRecordShiptoAddress(this);' value = '" + item.ShipToAddressId + "'>Edit History</button></td>";
                            }
                            else {
                                shtml += "<td class='center'>" + "<button class='btn' type='button' disabled=\"disabled\"  onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' disabled=\"disabled\"  onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' style='margin-right: 5px;' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>DisEnabled</button><button class='btn' type='button'  onclick='return funModifyRecordShiptoAddress(this);' value = '" + item.ShipToAddressId + "'>Edit History</button></td>";
                            }
                          
                            shtml += "</tr>";
                        });
                        $("#ShipToAddressDetil").html(shtml);
                    }
            })

        })
    }
    $("#OpenAddadressView").click(function () {
        emptyAddInfo();
        emptyEditInfo();
        $("#ShowInsertAdress").css("display", "");
        $("#ShowEditAdress").css("display", "none");
        $("#LogQuery1").css("display", "none");
    });
    $("#ColseAddView").click(function () {
        $("#ShowInsertAdress").css("display", "none");
    });
    $("#ColseEditView").click(function () {
        $("#ShowEditAdress").css("display", "none");
    });
    $("#AccountAdress").click(function () {
        var Name = $("#oos_name").val();
        var EnglishName = $("#oos_EnglishName").val();
        var Address = $("#oos_Address").val();
        var Isdefault = $("#EachDefault input:checked").val();
        var Receiver = $("#oos_Receiver").val();
        var Tel = $("#oos_tel").val();
        var DeliverryCompany = $("#DeliverryCompany option:selected").val();
        var countrycode = $("#CheckCountry option:selected").val();
        var PrintShopId = $("#CheckPrintshop option:selected").val();
        var ShipToAddressId = $("#oos_ShipToAddressId").val();
        var BrandId = $("#RedBrandId option:selected").val();
        var ShipToId = $("#ShipToId").val();
        var ShipmentType = $("#ShipmentType_N option:selected").val();
        var Typeofpayment = $("#Typeofpayment_N option:selected").val();
        var AccountNumber = $("#edit_AccountNumber_N").val();
        var street = $("#add_street").val();
        var city = $("#add_city").val();
        var state = $("#add_state").val();
        var zip = $("#add_zip").val();
        if (ShipToId == "")
        {
            $("#labtxt").html("Please save shipping account first.");
            showDiv();
            return;
        }
        if (Name == "") {
            $("#labtxt").html("Please input shipping account name!");
            showDiv();
            return;
        }
        if (Address == "") {
            $("#labtxt").html("Please input shipping account Address!");
            showDiv();
            return;
        }
        if (Tel == "") {
            $("#labtxt").html("Please input shipping account Tel!");
            showDiv();
            return;
        }       
        if (ShipmentType == "Express") {
            if (DeliverryCompany == "") {
                $("#labtxt").html("Please Select Deliverry Company!");
                showDiv();
                return;
            }
            if (Typeofpayment == "") {
                $("#labtxt").html("Please select a payment method!");
                showDiv();
                return;
            }
        }
        if (countrycode == "") {
            $("#labtxt").html("Please Select Country!");
            showDiv();
            return;
        }
        if (PrintShopId == "") {
            $("#labtxt").html("Please Select Printshop!");
            showDiv();
            return;
        }
        //if (ShipToAddressId == "") {
        //    $("#labtxt").html("Please input shipping account ShipToAddressId!");
        //    showDiv();
        //    return;
        //}
          
        console.log(Isdefault);
       
     
        var posturl = "/Maintain/AddAddressInfo";
        $.post(posturl, {
            Name: Name, EnglishName: EnglishName, Address: Address, Isdefault: Isdefault, Receiver: Receiver, Tel: Tel, DeliverryCompany: DeliverryCompany, countrycode: countrycode, PrintShopId: PrintShopId, BrandId: BrandId, ShipToId: ShipToId, ShipToAddressId: ShipToAddressId, ShipmentType: ShipmentType, Typeofpayment: Typeofpayment, AccountNumber: AccountNumber, Street: street, City: city, State: state, Zip: zip
        }, function (result) {
            if (result == 2) {
                $("#labtxt").html("The same ShipToAddressId already exists!");
                showDiv();
                return false;
            }
            if (result == 4) {
                $("#labtxt").html("Please save shipping account first.");
                showDiv();
                return false;
            }
            if (result == 3) {
                $("#labtxt").html("The same Name already exists!");
                showDiv();
                return false;
            }
            if (result == 5) {
                $("#labtxt").html("The shipping account has already had shipping address company(此出货客户已经存在默认出货公司)!");
                showDiv();
                return false;
            }

            if (result == 1) {
                $("#labtxt").html("Success!");
                showDiv();
                emptyAddInfo();
                $("#ShowInsertAdress").css("display", "none");
                var posturl = "/Maintain/GetShipToAddressInfo";
                $.post(posturl, {
                    ShipToId: ShipToId, BrandId: BrandId
                }, function (result) {
                    var obj = jQuery.parseJSON(result);
                    if (obj) {
                        var shtml = "";
                        var intSeq = 0;
                        $.each(obj, function (i, item) {
                            intSeq++;
                            shtml += "<tr>";
                            shtml += "<td class='center'>" + item.Seq + "</td>";
                            shtml += "<td class='center'>" + item.oos_name + "</td>";
                            shtml += "<td class='center'>" + item.oos_address + "</td>";
                            shtml += "<td class='center'>" + item.oos_contactname + "</td>";
                            shtml += "<td class='center'>" + item.oos_contacttel + "</td>";
                            shtml += "<td class='center'>" + item.DeliveryCompany + "</td>";
                            shtml += "<td class='center'>" + (item.oos_isdefaultaddr == "True" ? "Yes" : "No") + "</td>";
                            if (item.oos_isdefaultaddr == "True" && item.IsEnabled == "True") {
                                shtml += "<td class='center'>" + "<button type='button' class='btn' disabled=\"disabled\" onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' style='margin-right: 5px;' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>DisEnabled</button><button class='btn' type='button'  onclick='return funModifyRecordShiptoAddress(this);' value = '" + item.ShipToAddressId + "'>Edit History</button></td>";
                            }
                            else if (item.oos_isdefaultaddr == "True" && item.IsEnabled == "False") {

                                shtml += "<td class='center'>" + "<button class='btn' type='button' disabled=\"disabled\"  onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' disabled=\"disabled\" onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' style='margin-right: 5px;' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>IsEnabled</button><button class='btn' type='button'  onclick='return funModifyRecordShiptoAddress(this);' value = '" + item.ShipToAddressId + "'>Edit History</button></td>";
                            }
                            else if (item.oos_isdefaultaddr == "False" && item.IsEnabled == "True") {

                                shtml += "<td class='center'>" + "<button class='btn'type='button'  onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' style='margin-right: 5px;' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>IsEnabled</button><button class='btn' type='button'  onclick='return funModifyRecordShiptoAddress(this);' value = '" + item.ShipToAddressId + "'>Edit History</button></td>";
                            }
                            else {
                                shtml += "<td class='center'>" + "<button class='btn' type='button' disabled=\"disabled\"  onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' disabled=\"disabled\"  onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' style='margin-right: 5px;' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>DisEnabled</button><button class='btn' type='button'  onclick='return funModifyRecordShiptoAddress(this);' value = '" + item.ShipToAddressId + "'>Edit History</button></td>";
                            }
                            shtml += "</tr>";
                        });
                        $("#ShipToAddressDetil").html(shtml);
                    }
                })
            }
            else {
                $("#labtxt").html("Error!");
                showDiv();
                return false;
            }
        });
               
     
    })
    function OpenAddressEdit(obj) {
        emptyAddInfo();
        emptyEditInfo();
        $("#ShowEditAdress").css("display", "");
        $("#ShowInsertAdress").css("display", "none");
        $("#LogQuery1").css("display","none");
        var ShipToAddressId = obj.attributes["value"].value;
        var posturl = "/Maintain/SelShipToAddressInfo";
        $.post(posturl, {
            ShipToAddressId: ShipToAddressId
        }, function (result) {
            var $strDates = result.database.split("^");

            var Name = ($strDates[0]);
            var enname = ($strDates[1]);
            var address = ($strDates[2]);
            var isdefaultaddr = ($strDates[3]);
            var contactname = ($strDates[4]);
            var contacttel = ($strDates[5]);
            var DeliveryCompany = ($strDates[6]);
            var countryCName = ($strDates[7]);
            var PrintShop = ($strDates[8]);
            var ShipmentType = ($strDates[9]);
            var Typeofpayment = ($strDates[10]);
            var AccountNumber = ($strDates[11]);

            $("#eidt_name").val(Name);
            $("#eidt_EnglishName").val(enname);
            $("#eidt_Address").val(address);
            if (isdefaultaddr == "True") {

                // $("#Edit_CheckYes").attr("checked", 'checked');

                $(":radio[name='Edit_Default'][value='" + true + "']").prop("checked", "checked");
            }
            else {
                // $("#Edit_CheckNo").attr("checked", 'checked');

                $(":radio[name='Edit_Default'][value='" + false + "']").prop("checked", "checked");
            }
            $("#eidt_Receiver").val(contactname);
            $("#eidt_tel").val(contacttel);
            $("#eidt_DeliverryCompany").val(DeliveryCompany);
            $("#eidt_CheckCountry").val(countryCName);
            $("#eidt_CheckPrintshop").val(PrintShop);

            $("#edit_ShipToAddressId").val(ShipToAddressId);

            $("#ShipmentType").val(ShipmentType);
            $("#Typeofpayment").val(Typeofpayment);
            $("#edit_AccountNumber").val(AccountNumber);
            $("#edit_street").val(result.street);
            $("#edit_city").val(result.city);
            $("#edit_state").val(result.state);
            $("#edit_zip").val(result.zip);

        });
        ShipmentTypeChange();
    }
    $("#UpDateAccountAdress").click(function () {        
        var ShipToAddressId = $("#edit_ShipToAddressId").val();
        var Name= $("#eidt_name").val();
        var enname= $("#eidt_EnglishName").val();
        var address= $("#eidt_Address").val();
        var Isdefault = $("#eidt_EachDefault input:checked").val();
        var contactname= $("#eidt_Receiver").val();
        var contacttel= $("#eidt_tel").val();
        var DeliveryCompany= $("#eidt_DeliverryCompany option:selected").val();
        var countryCName = $("#eidt_CheckCountry option:selected").val();
        var PrintShop = $("#eidt_CheckPrintshop option:selected").val();
        var ShipToId = $("#ShipToId").val();

        var ShipmentType = $("#ShipmentType option:selected").val();
        var Typeofpayment = $("#Typeofpayment option:selected").val();
        var AccountNumber = $("#edit_AccountNumber").val();
        var street = $("#edit_street").val();
        var city = $("#edit_city").val();
        var state = $("#edit_state").val();
        var zip = $("#edit_zip").val();

        if (address == "") {
            $("#labtxt").html("Please input shipping account Address!");
            showDiv();
            return;
        }
        if (contacttel == "") {
            $("#labtxt").html("Please input shipping account Tel!");
            showDiv();
            return;
        }
        
        if (ShipmentType == "Express") {
            if (DeliveryCompany == "") {
                $("#labtxt").html("Please Select Deliverry Company!");
                showDiv();
                return;
            }
            if (Typeofpayment == "") {
                $("#labtxt").html("Please select a payment method!");
                showDiv();
                return;
            }
        }
        if (countryCName == "") {
            $("#labtxt").html("Please Select Country!");
            showDiv();
            return;
        }
        if (PrintShop == "") {
            $("#labtxt").html("Please Select Printshop!");
            showDiv();
            return;
        }
        var posturl = "/Maintain/EditAccountAddress";
        $.post(posturl, {
            ShipToAddressId: ShipToAddressId, Name: Name, enname: enname, address: address, Isdefault: Isdefault, contactname: contactname, contacttel: contacttel, DeliveryCompany: DeliveryCompany, countryCName: countryCName, PrintShop: PrintShop, ShipToId: ShipToId, ShipmentType: ShipmentType, Typeofpayment: Typeofpayment, AccountNumber: AccountNumber, Street: street, City: city, State: state, Zip: zip
        }, function (result) {       
            if (result.FunStatus == 1) {
                $("#labtxt").html("Success!");
                showDiv();
                $("#ShowEditAdress").css("display", "none");
                var ShipToId = $("#ShipToId").val();
                var BrandId = $("#RedBrandId").val();
                var posturl = "/Maintain/GetShipToAddressInfo";
                $.post(posturl, {
                    ShipToId: ShipToId, BrandId: BrandId
                }, function (result) {                
                        var obj = jQuery.parseJSON(result);
                        if (obj) {
                            var shtml = "";
                            var intSeq = 0;
                            $.each(obj, function (i, item) {
                                intSeq++;
                                shtml += "<tr>";
                                shtml += "<td class='center'>" + item.Seq + "</td>";
                                shtml += "<td class='center'>" + item.oos_name + "</td>";
                                shtml += "<td class='center'>" + item.oos_address + "</td>";
                                shtml += "<td class='center'>" + item.oos_contactname + "</td>";
                                shtml += "<td class='center'>" + item.oos_contacttel + "</td>";
                                shtml += "<td class='center'>" + item.DeliveryCompany + "</td>";
                                shtml += "<td class='center'>" + (item.oos_isdefaultaddr == "True" ? "Yes" : "No") + "</td>";
                                if (item.oos_isdefaultaddr == "True" && item.IsEnabled == "True") {
                                    shtml += "<td class='center'>" + "<button type='button' class='btn' disabled=\"disabled\" onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' style='margin-right: 5px;' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>DisEnabled</button><button class='btn' type='button'  onclick='return funModifyRecordShiptoAddress(this);' value = '" + item.ShipToAddressId + "'>Edit History</button></td>";
                                }
                                else if (item.oos_isdefaultaddr == "True" && item.IsEnabled == "False") {

                                    shtml += "<td class='center'>" + "<button class='btn' type='button' disabled=\"disabled\"  onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' disabled=\"disabled\" onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' type='button' style='margin-right: 5px;' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>IsEnabled</button><button class='btn' type='button'  onclick='return funModifyRecordShiptoAddress(this);' value = '" + item.ShipToAddressId + "'>Edit History</button></td>";
                                }
                                else if (item.oos_isdefaultaddr == "False" && item.IsEnabled == "True") {

                                    shtml += "<td class='center'>" + "<button class='btn'type='button'  onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' style='margin-right: 5px;' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>IsEnabled</button><button class='btn' type='button'  onclick='return funModifyRecordShiptoAddress(this);' value = '" + item.ShipToAddressId + "'>Edit History</button></td>";
                                }
                                else {
                                    shtml += "<td class='center'>" + "<button class='btn' type='button' disabled=\"disabled\"  onclick='return SetIsDefault(this);' value = '" + item.ShipToAddressId + "'>Set as dafault</button>&nbsp<button class='btn' type='button' disabled=\"disabled\"  onclick='return OpenAddressEdit(this);' value = '" + item.ShipToAddressId + "'>Edit</button>&nbsp<button class='btn' style='margin-right: 5px;' type='button' onclick='return DeleteThisAddressInfo(this);' value = '" + item.ShipToAddressId + ";" + ShipToId + "'>DisEnabled</button><button class='btn' type='button'  onclick='return funModifyRecordShiptoAddress(this);' value = '" + item.ShipToAddressId + "'>Edit History</button></td>";
                                }
                                shtml += "</tr>";
                            });
                            
                            console.log("添加成功,绑定数据!");
                            $("#ShipToAddressDetil").html(shtml);
                        }
                })
                emptyEditInfo();
                return;
            }
            if (result.FunStatus==2)
            {
                $("#labtxt").html("The default shipping address already exists!");
                showDiv();
                return;

            }
            else {
                $("#labtxt").html("Error!");
                showDiv();
                return;
            }
        })

    })
    $("#Back").click(function () {
        emptyAddInfo();
        emptyEditInfo();
        $("#ShowAccountAddress tr:not(:first)").empty();
        $("#EditShippingQurey").css("display", "none")
        $("#ShowInsertAdress").css("display", "none")
        $("#ShowEditAdress").css("display", "none")
        $("#ShippingSel").css("display", "")
        $("#ShowShipping").css("display", "")
        $("#LogQuery1").css("display", "none")
        GetOrder();
    });
    $("#CreateAccount").click(function () {
        $("#IsUpdate").text(0);
        $("#ShipToId").attr("disabled", false);
        $("#EditAccount").attr("disabled", false);
        var BrandId = $("#RedBrandId option:selected").val();
        if (BrandId == "") {
            $("#labtxt").html("Please select a Product Category.");
            showDiv();
            return;
        }
        $("#ShipToId").val("");
        $("#EditName").val("");
        $("#EditAccount").val("");
        $("#CheckYes").attr("checked", 'checked');

        $("#ShippingSel").css("display", "none")
        $("#EditShippingQurey").css("display", "");
        var posturl = "/Maintain/BagShopPirintShop";
        $.post(posturl, {           
        }, function (res) {
            $strDates = res.substring(1);
            var strDates = $strDates.split("^");
            //$("#eidt_CheckPrintshop option").each(function () {
            //    for (var i = 0; i < strDates.length; i++) {
            //        heckPrintshop = $(this).attr("value");
            //        if (heckPrintshop == strDates[i]) {
            //            $(this).attr("disabled", false);
            //        }

            //    }
            //})

            //$("#CheckPrintshop option").each(function () {
            //    for (var i = 0; i < strDates.length; i++) {
            //        Printshop = $(this).attr("value");
            //        if (Printshop == strDates[i]) {
            //            $(this).attr("disabled", false);
            //        }

            //    }
            //})

        })
    });
    $("#ShipmentType").change(function () {
        ShipmentTypeChange();
    });
    $("#ShipmentType_N").change(function () {
        ShipmentTypeChange_N();
    });
    function emptyAddInfo() {
        $("#oos_name").val("");
        $("#oos_EnglishName").val("");
        $("#oos_Address").val("");
        //$("#Add_CheckYes").attr("checked", 'checked');
        $("#oos_Receiver").val("");
        $("#oos_tel").val("");
        $("#DeliverryCompany").val("");
        $("#CheckCountry").val("");
        $("#CheckPrintshop").val("");
        $("#oos_ShipToAddressId").val("");
        $("#add_street").val("");
        $("#add_city").val("");
        $("#add_state").val("");
        $("#add_zip").val("");
    }
    function emptyEditInfo() {

        $("#eidt_EnglishName").val("");
        $("#eidt_Address").val("");
        $("#eidt_Receiver").val("");
        $("#eidt_tel").val("");    
        $("#eidt_DeliverryCompany").val("");
        $("#eidt_CheckCountry").val("");
        $("#eidt_CheckPrintshop").val("");
        $("#eidt_DeliverryCompany").val("");
        $("#eidt_CheckCountry").val("");
        $("#eidt_CheckPrintshop").val("");
        $("#edit_street").val("");
        $("#edit_city").val("");
        $("#edit_state").val("");
        $("#edit_zip").val("");
    }
    function funModifyRecordShiptoAddress(obj)
    {
        $("#ShowEditAdress").css("display","none");
        var ShipToAddressId = obj.value;
        $("#ShipToAddressId").val(ShipToAddressId);
        $("#CurrentShipToAddressId").html(ShipToAddressId);
        var Page = $("#nowpage2").val();

    _data =
        {
            ShipToAddressId: ShipToAddressId,
            Page: Page

        }
    $.post("/Maintain/ModifyRecordShiptoAddress", _data, function (data) {
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
            $("#LogQuery1").css("display", "none");
            $("#labtxt").html("No record");
            showDiv();
        }
        else {
            $("#BaseDataQury1 tbody").html(html);
            $("#LogQuery1").css("display", "block");
            $("#TotalPageCount2").html(data[0].TotalPageCount);
            $("#PageTotalCount2").val(data[0].TotalPageCount);
        }

    });
    }
    function funModifyRecordShipto(obj)
    {
        var ShiptoId = obj.value;
        $("#Shipto").val(ShiptoId);
        $("#Currentlabel").html(ShiptoId);
        var Page = $("#nowpage1").val();

        _data =
            {
                ShiptoId: ShiptoId,
                Page: Page

            }
        $.post("/Maintain/ModifyRecordShipto", _data, function (data) {
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
                $("#labtxt").html("No record");
//No record
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
    function ShipmentTypeChange() {
        var ShipmentTypeid = $("#ShipmentType").val();
        if (ShipmentTypeid == "Express") {
            $("#eidt_DeliverryCompany").attr("disabled", false);
            $("#Typeofpayment").attr("disabled", false);
            //$("#edit_AccountNumber").attr("disabled", false);
        } else {
            $("#eidt_DeliverryCompany").val("");
            $("#Typeofpayment").val("");
            $("#Accountnumber").val("");
            $("#eidt_DeliverryCompany").attr("disabled", "disabled");
            $("#Typeofpayment").attr("disabled", "disabled");
            //$("#edit_AccountNumber").attr("disabled", "disabled");
        }
    }
    function ShipmentTypeChange_N() {
        var ShipmentTypeid = $("#ShipmentType_N").val();
        if (ShipmentTypeid == "Express") {
            $("#DeliverryCompany").attr("disabled", false);
            $("#Typeofpayment_N").attr("disabled", false);
            //$("#edit_AccountNumber").attr("disabled", false);
        } else {
            $("#DeliverryCompany").val("");
            $("#Typeofpayment_N").val("");
            $("#Accountnumber_N").val("");
            $("#DeliverryCompany").attr("disabled", "disabled");
            $("#Typeofpayment_N").attr("disabled", "disabled");
            //$("#edit_AccountNumber").attr("disabled", "disabled");
        }
    }
