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
        funcShowHistory(CurrencyId);
    });
    $('#Pageup1').click(function () {
        var nowpage = document.getElementById("nowpage1").value;
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) > 1) {
            newpage = parseInt(nowpage) - 1;
            document.getElementById("pc1").value = newpage;
            document.getElementById("nowpage1").value = newpage;
            funcShowHistory(CurrencyId);
        }
    });
    $('#Pagewown1').click(function () {
        var nowpage = document.getElementById("nowpage1").value;
        var maxpage = parseInt(document.getElementById("PageTotalCount1").value);
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) < maxpage) newpage = parseInt(nowpage) + 1;
        document.getElementById("pc1").value = newpage;
        document.getElementById("nowpage1").value = newpage;
        funcShowHistory(CurrencyId);
    });
    $('#PageLast1').click(function () {
        var maxpage = parseInt(document.getElementById("PageTotalCount1").value);
        document.getElementById("pc1").value = maxpage;
        document.getElementById("nowpage1").value = maxpage;
        funcShowHistory(CurrencyId);
    });
    $('#PageGO1').click(function () {
        var nowpage = parseInt(document.getElementById("nowpage1").value);
        var maxpage = parseInt(document.getElementById("PageTotalCount1").value) + 1;
        if (nowpage > 0 && nowpage < maxpage) {
            document.getElementById("pc1").value = document.getElementById("nowpage1").value;
            funcShowHistory(CurrencyId);
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

    $("#Return").click(function () {
        $("#EditInfor").css("display", "none");
    })
    $('input[id=lefile]').change(function () {
        $('#photoCover').val($(this).val());
    });
    $("#Upload").click(function ()
    {
        if ($('#photoCover').val() != "") {
            showloading();
            $.ajax({
                url: '/Maintain/CurrencyEXRUploadExcel',
                type: 'POST',
                cache: false,
                data: new FormData($('#FormUpload')[0]),
                processData: false,
                contentType: false,
            }).success(function (data) {
                setTimeout(function () {
                    var sTrHtml = "";
                    if (data.SessionStaus == "false") {
                        window.location.href = "/Home/Login";
                    }
                    else {
                        $.each(data, function (i, item) {
                            if (data.FunStatus =="success")
                            {
                                $("#labtxt").html("success");
                                showDiv();
                                GetOrder();
                            }
                            else
                            {
                                $("#labtxt").html(data.FunStatus);
                                showDiv();
                                return false;
                            }
                            
                        });
                        hideloading();
                    }
                }, 2000)

            }).fail(function (data) {
                hideloading();
            });
        }
        else
        {
            $("#labtxt").html("Uploaded files cannot be empty.");
            showDiv();
            return false;
        }
    });
    //只能输入0-9和. 
    $("input[name='EditCurrency']").keyup(function () {
        $(this).val($(this).val().replace(/[^0-9.]/g, ''));
    }).bind("paste", function () {  //CTR+V事件处理  
        $(this).val($(this).val().replace(/[^0-9.]/g, ''));
    }).css("ime-mode", "disabled"); //CSS设置输入法不可用  
});
function GetOrder() {

    var QueryData =
        {
            Currency: $("#Currency").val(),
            Page: document.getElementById("nowpage").value
        }
    $.post("/Maintain/CurrencyEXRQuery", QueryData, function (data) {

        if (data) {
            var html = "";
            $.each(data, function (i, item) {
                html += "<tr>";
                html += "<td class='center'>" + item.Seq + "</td>";
                html += "<td class='center'>" + item.Currency + "</td>";
                html += "<td class='center'>" + item.FOREX + "</td>";
                html += "<td class='center'><button type=button id=Edit name=Edit class='btn btn-default' style='margin-left:5px;' onclick='return funcEdit(this)' value='" + item.CurrencyId + "'>Edit</button><button type=button id=ShowHistory name=ShowHistory class='btn btn-default' style='margin-left:5px;' onclick='return funcShowHistory(this)' value='" +item.CurrencyId + "'>View</button></td>";
                html += "</tr>";
            })
            if (html == "")
            {
                $("#OrderDetail tbody").html("");
                $("#Query-Results").css("display", "block");
                $("#History").css("display","none");
            }
            else {
                
                $("#OrderDetail tbody").html(html);
                $("#TotalPageCount").html(data[0].TotalPageCount);
                $("#PageTotalCount").val(data[0].TotalPageCount);
                $("#Query-Results").css("display", "block");
                $("#History").css("display", "none");
            }


        }
    });
}
function funcEdit(obj)
{

    $("#History").css("display","none");
    var CurrencyEXR = obj.value;
    $("#EditSaveCurrencyEXR").val(CurrencyEXR);
    $.post("/Maintain/EditCurrencyEXR", CurrencyEXR, function (data)
    {
        $("#EditCurrencyId").val(data.orderdata.Currency);
        $("#EditCurrency").val(data.orderdata.FOREX);
        $("#EditInfor").css("display", "block");
        $("#History").css("display", "none");
    })
}
function SaveCurrencyEXR(obj)
{
    $("#labtxt").html("Are you sure you want to save it?");
    showDiv2();
    $("#ok").bind("click", function () {
        var CurrencyId = obj.value;
        _data =
            {
                CurrencyId: CurrencyId,
                EditCurrency: $("#EditCurrency").val()
            }
        $.post("/Maintain/SaveCurrencyEXRQuery", _data, function (data) {
            if (data.FunStatus == "success") {
                $("#EditInfor").css("display", "none");
                GetOrder();
                closeDiv();
                return;
            }
            else {
                $("#labtxt").html("fail");
                showDiv();
                return false;
            }

        })

    })
    $("#no").bind("click", function () {
        closeDiv();
    })
}
function funcShowHistory(obj) {

    $("#EditInfor").css("display","none");
    var CurrencyId = obj.value;
    $("#CurrencyId").val(CurrencyId);
    var Page = $("#nowpage1").val();

    _data =
        {
            CurrencyId: CurrencyId,
            Page: Page

        }
    $.post("/Maintain/CurrencyEXRHistory", _data, function (data) {
        if (data) {
            var html = ""
            $.each(data, function (i, item) {
                html += "<tr>";
                html += "<td class='center'>" + item.Seq + "</td>";
                html += "<td class='center'>" + item.Currency + "</td>";
                html += "<td class='center'>" + item.Current_FOXR + "</td>";
                html += "<td class='center'>" + item.Last_FOXR + "</td>";
                html += "<td class='center'>" + item.ModifiedOn + "</td>";
                html += "</tr>";
            })

            if (html == "") {
                $("#HistoryView tbody").html("");
                $("#Query-Results").css("display", "block");
                $("#History").css("display", "none");
            }
            else {

                $("#HistoryView tbody").html(html);
                $("#TotalPageCount1").html(data[0].TotalPageCount);
                $("#PageTotalCount1").val(data[0].TotalPageCount);
                $("#Query-Results").css("display", "block");
                $("#History").css("display", "block");
            }
        }
        else
        {
            alert("fail");
        }

    });
}