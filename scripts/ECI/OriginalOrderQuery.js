$(function () {
    //查询
    $("#btnQuery").click(function () {
        document.getElementById("pc").value = 1;
    document.getElementById("nowpage").value = 1;
        $("#TotalPageCount").html(1);
        $("#PageTotalCount").val(1);
        QueryOriOrder()

    })



    //分页
$('#PageIndex').click(function () {
    //给文本框赋值都为1
    document.getElementById("pc").value = 1;
    document.getElementById("nowpage").value = 1;
    QueryOriOrder();
    });
    //向上一个页翻
$('#Pageup').click(function () {
    //首先获取当前输入文本框的值
    var nowpage = document.getElementById("nowpage").value;
        //parseInt() 函数可解析一个字符串，并返回一个整数。（也就是输入的内容必须是数字）
    var newpage = parseInt(nowpage);
    if (parseInt(nowpage) > 1) {
        newpage = parseInt(nowpage) -1;
        document.getElementById("pc").value = newpage;
        document.getElementById("nowpage").value = newpage;
        QueryOriOrder();
        }
        });
            //向下一个页翻
$('#Pagewown').click(function () {
    var nowpage = document.getElementById("nowpage").value;
    var maxpage = parseInt(document.getElementById("PageTotalCount").value);
    var newpage = parseInt(nowpage);
        //判断，如果输入的文本框的值小于最大的页数 2 3 2<3 3=2+1
        if (parseInt(nowpage) < maxpage) { newpage = parseInt(nowpage) +1
        };
    document.getElementById("pc").value = newpage;
    document.getElementById("nowpage").value = newpage;
    QueryOriOrder();
    });
        //翻到最后
$('#PageLast').click(function () {
    var maxpage = parseInt(document.getElementById("PageTotalCount").value);
    document.getElementById("pc").value = maxpage;
    document.getElementById("nowpage").value = maxpage;
    QueryOriOrder();
    });
$('#PageGO').click(function () {
    var nowpage = parseInt(document.getElementById("nowpage").value);
    var maxpage = parseInt(document.getElementById("PageTotalCount").value) +1;
    if (nowpage > 0 && nowpage < maxpage) {
        document.getElementById("pc").value = document.getElementById("nowpage").value;
        QueryOriOrder();
        }
    else {

        $("#labtxt").html("wrong page no.");
        showDiv();
        document.getElementById("nowpage").value = 1;
        }
        });
$("#nowpage").keyup(function () {
        var t = $("#nowpage").val();
//判断是否是数字
if(isNaN(t)) {
    $("#labtxt").html("wrong page no.");
    showDiv();
    document.getElementById("nowpage").value = 1;
    }
    });


})
//窗体加载function 结束
function Fun_SubmitOrder(obj) {
    showloading();
    var value = obj.value;
    var a = value.split('^');
    var po = a[0];
    var fileid = a[1];
    var formatid = $("#txtformatid").val();
    //贴纸
    if (formatid=="FMT002") {
        $.ajax({
            url: "/ECI/StickerOrder",
            dataType: "html",
            data: {
                po: po,
                fileid:fileid
            },
            success: function (html) {
                $("#StickerOrder").show();
                $("#StickerOrder").html(html);
                $("#OrderQuery").hide();
                $("#page-inner2_Org").hide();
                $("#portlet-title").hide();
                 hideloading();
            }
        })
    }else if (formatid=="FMT003") {
        $.ajax({
            url: "/ECI/OriginalOrderQueryCareLabel",
            dataType: "html",
            data: {
                po: po,
                fileid: fileid
            },
            success: function (html) {
                $("#CareLabelOrder").html(html);
                $("#OrderQuery").hide();
                $("#page-inner2_Org").hide();
                $("#page-inner2").show();
                $("#CareLabelOrder").show();
                $("#step1").removeClass("red-em").addClass("gray-em");
                $("#step2").show();
                $("#step2").removeClass("gray-em").addClass("red-em");
                hideloading();
            }
        })
    }
}

    //查询原始订单
function QueryOriOrder() {
        var strHtml = "";
        var querycon = {
            "FormatId": $("#txtformatid").val(),
            "PO_Number": $("#txtOrder_Number").val(),
            "PageIndex": $("#pc").val()
        }
        showloading();
        $.ajax({
        url: "/ECI/OrderQuery",
                    type: "get",
                    dataType: "json",
                    data: querycon,
                    success: function (result) {
                        $("#TotalPageCount").html(result.pageCount);
                        $("#PageTotalCount").val(result.pageCount);
                if (result.status == "true") {
                    var seq = 1;
                    var strhtml = "";
                    $.each(result.Table, function (i, item) {
                        strhtml += "<tr>";
                        strhtml += "<td>" +seq + "</td>";
                        strhtml += "<td style='display:none'>" +item["FileDataLogID"]+ "</td>";
                        strhtml += "<td>" +item["PO_Number"]+ "</td>";
                        strhtml += "<td>" +item["CreateTime"]+ "</td>";
                        strhtml += "<td><button type='button' class='btn btn-default' onclick='Fun_SubmitOrder(this)' value='" +item["PO_Number"]+ "^" +item["FileDataLogID"]+ "' >Place Order</button></td>";
                        strhtml += "</tr>";
                        seq++;
                        })
                    $("#OrderDetail").html(strhtml);
                    $("#page-inner2_Org").show();
                    } else {
                    alert(result.message);
                    }
                hideloading();
            }   
        })
}



///////////////////////OriginalOrderQueryCareLabel 选择开票客户 出货地址
    //返回
//    function FunCareLabelBack() {
//        $("#step1").removeClass("gray-em").addClass("red-em");
//        $("#step2").removeClass("red-em").addClass("gray-em");
//        $("#step3").removeClass("red-em").addClass("gray-em");
//        $("#step2").hide();
//        $("#step3").hide();
//        $("#CareLabelOrder").hide();
//        $("#OrderQuery").show();
//        $("#page-inner2_Org").show();
//}
//    //下一步
//    function FunCareLabelNext() {
//        //验证
//        if ($("#BilltoId").val() == "" || $("#BilltoId option:selected").text() =="") {
//        $("#labtxt").html("The Billing To can not be empty");
//            showDiv();
//            return;
//    }
//    if ($("#iBilltoAddress").val() == "") {
//        $("#labtxt").html("The Billing Address can not be empty");
//        showDiv();
//        return;
//    }
//    if ($("#iBilltoAddrContact").val() == "") {
//        $("#labtxt").html("The Billing Contact can not be empty");
//        showDiv();
//        return;
//    }
//    if ($("#iBilltoAddrTel").val() == "") {
//        $("#labtxt").html("The Billing Tel can not be empty");
//        showDiv();
//        return;
//    }
//    if ($("#ShiptoId").val() == "") {
//        $("#labtxt").html("The Ship To can not be empty");
//        showDiv();
//        return;
//    }
//    if ($("#ShipAddrId").val() == "" || $("#ShipAddrId option:selected").text() =="") {
//        $("#labtxt").html("The Shipping Address can not be empty");
//        showDiv();
//        return;
//    }
//    if ($("#iShipAddrTel").val() == "") {
//        $("#labtxt").html("The Shipping Tel can not be empty");
//        showDiv();
//        return;
//    }
//    if ($("#iCurrency").val() == "") {
//        $("#labtxt").html("The Currency can not be empty");
//        showDiv();
//        return;
//    }
//    if ($("#iShipAddrCountry").val() == "") {
//        $("#labtxt").html("The Country can not be empty");
//        showDiv();
//        return;
//    }
//    if ($("#DDLShipmentType").val() == "") {
//        $("#labtxt").html("Please Select ShipmentType");
//        showDiv();
//        return;
//    } else {
//        if ($("#ExpressCompany").val() == "" && $("#DDLShipmentType").val() == "Express") {
//            $("#labtxt").html("Please Select ExpressCompany");
//            showDiv();
//            return;
//    }
//    }
//    if ($("#productid").val() == "") {
//        $("#labtxt").html("The Item can not be empty");
//        showDiv();
//        return;
//    }
//        //if ($("#madein").val()=="") {
//        //    $("#labtxt").html("The madein can not be empty");
//        //    showDiv();
//        //    return;
//        //}
//        $("#labtxt").html("Please make sure you already put in the order qty.?(请核对您输入的数量是否正确。)")
//        showDiv2();
//        $("#no").click(function () {
//        $("#popDiv").css("display", "none");
//        $("#bg").css("display", "none");
//    })
//    $("#ok").click(function () {
//        $("#popDiv").css("display", "none");
//        $("#bg").css("display", "none");
//        $("#step2").addClass("gray-em").removeClass("red-em");
//        $("#step3").addClass("red-em").removeClass("gray-em");
//        $("#step3").show();
//        $("#divMadeInFiber").show();
//        $("#CareLabel-step2").hide();
//    });
//}




    //////////////////////////////////选择成分 类别 界面

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
            if (objlineFiberBody.children[i].children[0].children[1].value == SelectCategory && objlineFiberBody.children[count -1].children[0].children[1].value != SelectCategory) {
                $("#labtxt").html(SelectCategory + " Have Existed");
                showDiv();
                return;
        }
    }
    }

        var a = 0;
        var countNull = 0;
        for (var i = 0; i < objlineFiberBody.childElementCount; i++) {
        if (SelectCategory == objlineFiberBody.children[i].children[0].children[1].value) {
            a++;
        }
        if (objlineFiberBody.children[i].children[1].innerText != "") {
            countNull++;
        }
    }
    if (a == 5) {
        $("#labtxt").html("The composition for each component can’t over 5 items");
        showDiv();
        return;
    }
    if (countNull == 5) {
        $("#labtxt").html("Only five Composition for can be add at most.")
        showDiv();
        return;
    }

        funcAddlineFiberComp();

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
            objlineFiberBody.children[theID -1].children[0].children[1].value = SelectCategory;
            objlineFiberBody.children[theID -1].children[0].children[2].value = FiberPerent;
            objlineFiberBody.children[theID -1].children[0].children[3].value = SelectComposition;
            if (objlineFiberBody.children[theID -1].children[1].innerText != "") {
        objlineFiberBody.children[theID -1].children[1].innerText = SelectCategory;
    }
    objlineFiberBody.children[theID -1].children[2].innerText = FiberPerent;
    objlineFiberBody.children[theID -1].children[3].innerText = SelectComposition;

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
                    StrAllCategory += "^" +tTyp;
            }
        }
                }
            }

            if (HasNullCategory == 1) {
        StrAllCategory = "^" +StrAllCategory;
            }

            var lstCategory = StrAllCategory.split('^');

                //if (lstCategory.length > 3) {
                //    $("#labtxt").html("Composition for cannot exceed 3 items.");
                //    showDiv();
                //    return false;
                //}
                var tTyp = "";
                var tTotalPercent = 0;
                for (var i = 0; i < lstCategory.length; i++) {
                    //alert(lstCategory[i])
        tTotalPercent = 0 * 1;
        for (var k = 0; k < objlineFiberBody.childElementCount; k++) {
            tTyp = objlineFiberBody.children[k].children[0].children[1].value;
            if (lstCategory[i]== tTyp) {
                var tFiberPercent = objlineFiberBody.children[k].children[0].children[2].value;
                tTotalPercent += tFiberPercent * 1;
        }
                }
    }
    var SelectCompositionfor = $("#CategoryId").val();
    if (SelectCompositionfor == tTyp && tTotalPercent == 100) {
        $("#labtxt").html("The total composition is 100%.the Composition for:" +SelectCompositionfor + ".")
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
                $("#labtxt").html("Under the same Composition for, components cannot be the same,the Composition for:[" +SelectCategory + "]");
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

            var tPrevTyp = objlineFiberBody.children[objlineFiberBody.childElementCount -1].children[0].children[1].value;
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
    var ID = objlineFiberBody.childElementCount +1;
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
            sTrHtml += "<label id='lblFiber' name ='lblFiber' >" +ID + "</label>";
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
            sTrHtml += "<button type='button' id='btnDelFiderLine' class='btn btn-default' value='" +ID + "' onclick='return funcDelFiderLine(this);' >Remove</button>";
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
        var startSeq = obj.value -1;

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
        objlineFiberBody.children[i].children[0].children[0].innerText = i +1; //改第一列的显示 ID
        objlineFiberBody.children[i].children[4].children[0].value = i +1;     //改删除按钮 value ID
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



    //返回
    function funcBackToCare() {
        $("#step3").removeClass("red-em").addClass("gray-em");
        $("#step3").hide();
        $("#step2").addClass("red-em").removeClass("gray-em");
        $("#CareLabelOrder").hide();
        $("#OrderQuery").show();
        $("#page-inner2_Org").show();
        $("#PreviewImg").hide();
}


    //保存  提交到临时订单
    function funcSaveOriOrder(obj) {
        var SubmitData = {
                FileDataLogID: $("#hidfilelogid").val(),
                Order_Number: $("#order_number").val(),

                PrintShop: $("#PSID").val(),
                BillingToID: $("#BilltoId").val(),
                BillToName: $("#BilltoId option:selected").text(),
                BillingAddress: $("#iBilltoAddress").val(),
                BillingContact: $("#iBilltoAddrContact").val(),
                BillingTel: $("#iBilltoAddrTel").val(),

                Currency: $("#iCurrency").val(),
                ShipToID: $("#ShiptoId").val(),
                ShipToName: $("#ShiptoId option:selected").text(),
                ShipToAddressId: $("#ShipAddrId").val(),
                ShippingAddress: $("#ShipAddrId option:selected").text(),
                ShippingContact: $("#iShipAddrContact").val(),
                ShippingTel: $("#iShipAddrTel").val(),
                Country: $("#iShipAddrCountry").val(),

                ShipmentType: $("#DDLShipmentType").val(),
                FreightCompany: $("#ExpressCompany").val(),

                Item: $("#productid option:selected").text(),
                ProductCode: $("#productid").val(),
                MadeIn: $("#madein").val(),
                Comments: $("#Comments").val(),

            OrderStr: "",
            FiberStr: "",
            WashStr: "",
            symbolsStr: ""
        }
        if (!checkdata()) {
            return;
        }
        //检查数量
        var CareOrderDet = document.getElementById("OrderDetailCareLabel")
        for (var i = 0; i < CareOrderDet.childElementCount; i++) {
            if (CareOrderDet.children[i].children[16].children[0].value=="0") {
                $("#labtxt").html("Please Check QTY In The "+(i+1)+" Line");
                showDiv();
                return ;
            }
        }

        //3. 检查空类别 和 非空的各个类别下的成分 百分比是否 为100
        var StrAllCategory = "";
        var HasNullCategory = 0;
        var objlineFiber = document.getElementById("LineFiberComposition");
        var objlineFiberBody = objlineFiber.children[1];
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
                    StrAllCategory += "^" +tTyp;
            }
        }
        }
    }
    if (HasNullCategory == 1) {
        StrAllCategory += "^";
    }

    var lstCategory = StrAllCategory.split('^');
        //if (lstCategory.length > 3) {
        //    $("#labtxt").html("Composition for cannot exceed 3 items.");
        //    showDiv();
        //    return false;
        //}
        for (var i = 0; i < lstCategory.length; i++) {
        var tTotalPercent = 0 * 1;
        for (var k = 0; k < objlineFiberBody.childElementCount; k++) {
            var tTyp = objlineFiberBody.children[k].children[0].children[1].value;
            if (lstCategory[i]== tTyp) {
                var tFiberPercent = objlineFiberBody.children[k].children[0].children[2].value;
                tTotalPercent += tFiberPercent * 1;
        }
        }

        if (tTotalPercent != 100 || tTotalPercent > 100) {
            //alert("Total composition shall be multiples of 100%.the category:[" + lstCategory[i] + "](成分的百分比总和必须是100%的倍数。类别为：[" + lstCategory[i] + "])")
            $("#labtxt").html("The total composition should be 100%.the Composition for:[" + lstCategory[i]+ "].")
            showDiv();
            return;
        }
    }

        //检查是否有洗图

        //if ($("#imgwash").attr("value") == "" || $("#imgwash").attr("value") == null) {
        //    $("#labtxt").html("Please Select Washing");
        //        showDiv();
        //        return;
        //}
        //if ($("#imgbleach").attr("value") == "" || $("#imgbleach").attr("value") == null) {
        //    $("#labtxt").html("Please Select Bleaching");
        //    showDiv();
        //    return;
        //}
        //if ($("#imgdry").attr("value") == "" || $("#imgdry").attr("value") == null) {
        //    $("#labtxt").html("Please Select Drying");
        //    showDiv();
        //    return;
        //}
        //if ($("#imglron").attr("value") == "" || $("#imglron").attr("value") == null) {
        //    $("#labtxt").html("Please Select lroning");
        //    showDiv();
        //    return;
        //}
        //if ($("#imgpro").attr("value") == "" || $("#imgpro").attr("value") == null) {
        //    $("#labtxt").html("Please Select cleaning");
        //    showDiv();
        //    return;
        //}


        //订单
        var str = "";
        var table = document.getElementById("OrderDetailCareLabel")
        for (var i = 0, row = table.rows.length; i < table.rows.length; i++) {

        for (var j = 0, cells = table.rows[i].cells.length; j < cells ; j++) {
            if (j == cells -1) {
                str += table.rows[i].cells[j].childNodes[0].value.trim() + "^";

            } else {
                str += table.rows[i].cells[j].innerHTML.trim() + "^";
        }
        }

        str = str.substring(0, str.length -1);
        str += "ˇ"
    }
    str = str.substring(0, str.length-1);
    SubmitData.OrderStr = str;

        //成分
        var OrderDetail = document.getElementById("LineFiberComposition").children[1];
        var strtotal = "";
        var _strFiberAll = "";
        for (var i = 0; i < OrderDetail.childElementCount; i++) {
        var tID = OrderDetail.children[i].children[0].children[0].innerText;
        var tCategory = OrderDetail.children[i].children[0].children[1].value;
        var tComPercent = OrderDetail.children[i].children[0].children[2].value;
        var tFiber = OrderDetail.children[i].children[0].children[3].value;
        var _tCombine = tID + "^" + tCategory + "^" + tComPercent + "^" +tFiber
        if (_strFiberAll == "") {
            _strFiberAll += _tCombine;
        }
        else {
            _strFiberAll += "ˇ" +_tCombine;
        }
    }
    SubmitData.FiberStr = _strFiberAll

        //洗语
        var WashDetail = document.getElementById("LineWashCare").children[1]
        var WashStr = "";
        var sym="";
        for (var i = 0; i < WashDetail.childElementCount; i++) {
            if (WashStr == "") {
                WashStr += WashDetail.children[i].children[0].innerHTML;
            } else {
                WashStr += "^" + WashDetail.children[i].children[0].innerHTML;
            }
            sym += WashDetail.rows[i].cells[2].children[0].value;
        }
    SubmitData.WashStr = WashStr;
        //洗图
    //var sym = $("#imgwash").attr("value") + $("#imgbleach").attr("value") + $("#imgdry").attr("value") + $("#imglron").attr("value") + $("#imgpro").attr("value");
        SubmitData.symbolsStr = sym;
        showloading();
        SubmitData.Preview = "NoPreview";
        if (obj.innerHTML == "Preview") {
        SubmitData.Preview = "Preview";
    }
    $.ajax({
            url: "/ECI/CareLabelOrderSubmit",
            dataType: "json",
            type: "post",
            data: SubmitData,
            success: function (result) {
                $("#PreviewImg").hide();
            if (result.Status == "success") {
                $("#step4").addClass("red-em").removeClass("gray-em");
                $("#step4").show();
                $("#step3").addClass("gray-em").removeClass("red-em");
                $("#step2").addClass("gray-em").removeClass("red-em");
                $("#divMadeInFiber").hide();
                $("#careLabelBody").hide();
                $("#panSuccess").show();
                $("#ECIOrderNo").html(result.MaximNO);
                hideloading();
            } else if (result.Status == "isPreview") {
                $("#dowebok").html("");
                var imagesList = "";
                var imagesList2 = "";
                var int = 0;
                $.each(result.images, function (i, item) {
                    imagesList += "<li style='float:left'><img data-original='" + item[0] + "'' src='" + item[0] + "' style='height:200px;'></li>";
                    imagesList += "<li style='float:left'><img data-original='" + item[1] + "'' src='" + item[1] + "' style='height:200px;'></li>";
                    imagesList += "<li style='float:left'><img data-original='" + item[2]+ "'' src='" +item[2]+ "' style='height:200px;'></li>";
                    imagesList2 += '<li class="viewer-active"><img src="' + item[0]+ '" data-action="view" data-index="' + int + '" data-original-url="' + item[0]+ '" alt="' + "图片" + int + '"></li>';
                    int++;
                    imagesList2 += '<li><img src="' + item[1] + '" data-action="view" data-index="' + int + '" data-original-url="' + item[1] + '" alt="' + "图片" + int + '"></li>';
                    int++;
                    imagesList2 += '<li><img src="' +item[2]+ '" data-action="view" data-index="' +int + '" data-original-url="' + item[2] + '" alt="' + "图片" +int + '"></li>';
                })
                $("#dowebok").append(imagesList);
                $("#PreviewImg").css("display", "block");
                $('#dowebok').viewer({
                        url: 'data-original',
            });
                $("#dowebok").viewer('update');

                hideloading();
            } else {

                hideloading();
                $("#labtxt").html(result.message);
                showDiv();
            }
    }
})
}

    //返回到选择成分
    //function funcBackToShowFiber() {
    //    $("#step4").addClass("gray-em").removeClass("red-em");
    //    $("#step3").addClass("red-em").removeClass("gray-em")
    //    $("#step4").hide();
    //    $("#divMadeInFiber").show();
    //    $("#divWashCare").hide();
    //}


//验证数据
    function checkdata() {
        if ($("#BilltoId").val() == "" || $("#BilltoId option:selected").text() == "") {
            $("#labtxt").html("The Billing To can not be empty");
            showDiv();
            return false;
        }
        if ($("#iBilltoAddress").val() == "") {
            $("#labtxt").html("The Billing Address can not be empty");
            showDiv();
            return false;
        }
        if ($("#iBilltoAddrContact").val() == "") {
            $("#labtxt").html("The Billing Contact can not be empty");
            showDiv();
            return false;
        }
        if ($("#iBilltoAddrTel").val() == "") {
            $("#labtxt").html("The Billing Tel can not be empty");
            showDiv();
            return false;
        }
        if ($("#ShiptoId").val() == "") {
            $("#labtxt").html("The Ship To can not be empty");
            showDiv();
            return false;
        }
        if ($("#ShipAddrId").val() == "" || $("#ShipAddrId option:selected").text() == "") {
            $("#labtxt").html("The Shipping Address can not be empty");
            showDiv();
            return false;
        }
        if ($("#iShipAddrTel").val() == "") {
            $("#labtxt").html("The Shipping Tel can not be empty");
            showDiv();
            return false;
        }
        if ($("#iCurrency").val() == "") {
            $("#labtxt").html("The Currency can not be empty");
            showDiv();
            return false;
        }
        if ($("#iShipAddrCountry").val() == "") {
            $("#labtxt").html("The Country can not be empty");
            showDiv();
            return false;
        }
        if ($("#DDLShipmentType").val() == "") {
            $("#labtxt").html("Please Select ShipmentType");
            showDiv();
            return false;
        }
        if ($("#productid").val() == "") {
            $("#labtxt").html("The Item can not be empty");
            showDiv();
            return false;
        }
        if ($("#madein").val() == "") {
            $("#labtxt").html("The Made in can not be empty");
            showDiv();
            return false;
        }
        return true;
    }


