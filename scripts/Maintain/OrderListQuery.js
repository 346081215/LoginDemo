$(function () {
    //日期
    debugger;
    //FormComponents.init();



    var myDate = new Date();
    var time = myDate.toLocaleDateString().toString("yyyy/mm/dd");//当前时间
    debugger;
    var timeeed = getPreMonth(time).toString("yyyy/mm/dd");
    debugger;
    $("#SubmitStartTime").val(timeeed);
    $("#SubmitEndTime").val(time);
    $("#ConfirmDateTime").val(timeeed);
    $("#ConfirmDateEndId").val(time);
    $("#btnSearch").click(seach);

    $(".form_datetime").datetimepicker({
        format: 'yyyy/mm/dd',
        weekStart: 1,
        autoclose: true,
        startView: 2,
        minView: 2,
        forceParse: false,
        language: 'zh-CN'
    });

    $('#PageIndex').click(function () {
        document.getElementById("pc").value = 1;
        document.getElementById("nowpage").value = 1;
        seach();
    });
    $('#Pageup').click(function () {
        var nowpage = document.getElementById("nowpage").value;
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) > 1) {
            newpage = parseInt(nowpage) - 1;
            document.getElementById("pc").value = newpage;
            document.getElementById("nowpage").value = newpage;
            seach();
        }
    });
    $('#Pagewown').click(function () {
        var nowpage = document.getElementById("nowpage").value;
        var maxpage = parseInt(document.getElementById("PageTotalCount").value);
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) < maxpage) newpage = parseInt(nowpage) + 1;
        document.getElementById("pc").value = newpage;
        document.getElementById("nowpage").value = newpage;
        seach();
    });
    $('#PageLast').click(function () {
        var maxpage = parseInt(document.getElementById("PageTotalCount").value);
        document.getElementById("pc").value = maxpage;
        document.getElementById("nowpage").value = maxpage;
        seach();
    });
    $('#PageGO').click(function () {
        var nowpage = parseInt(document.getElementById("nowpage").value);
        var maxpage = parseInt(document.getElementById("PageTotalCount").value) + 1;
        if (nowpage > 0 && nowpage < maxpage) {
            document.getElementById("pc").value = document.getElementById("nowpage").value;
            seach();
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

});
//var str = '/Date(1333245600000+0800)/';

function data_string(str) {
    var d = eval('new ' + str.substr(1, str.length - 2));
    var ar_date = [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()];
    for (var i = 0; i < ar_date.length; i++) ar_date[i] = dFormat(ar_date[i]);
    return ar_date.slice(0, 3).join('-') + ' ' + ar_date.slice(3).join(':');

    function dFormat(i) { return i < 10 ? "0" + i.toString() : i; }
}

//alert(data_string(str));
function seach() {
    $("#btnExcel").removeAttr("disabled");
    //根据条件查询
    var Maxim_No = $("#MaximNO").val();
    var Pi_NO = $("#Pi_NO").val();

    if ($("#ConfirmDateTime").val()!="") {
        var ConfirmDateTime = $("#ConfirmDateTime").val() + " " + $("#ConfirmDateTimeId").val();
    } else {
        var ConfirmDateTime = "";
    }
    if ($("#ConfirmDateEndId").val()!="") {
        var ConfirmDateEndTimeId = $("#ConfirmDateEndId").val() + " " + $("#ConfirmDateEndTimeId").val();
    } else {
        var ConfirmDateEndTimeId = "";
    }
  
    var ProductCategory = $("#Brandid").val();
    var PrintShop = $("#PrintShop").val();

    if ($("#SubmitStartTime").val()!="") {
        var SubmitStartTime = $("#SubmitStartTime").val() + " " + $("#TimestartId").val();
    } else {
        var SubmitStartTime = "";
    }

    if ($("#SubmitEndTime").val()!="") {
        
    } else {
        var SubmitEndTime = "";
    }
    
    
    debugger;
    var _data = {
        "pc": $("#pc").val(),
        "ProductCategory": ProductCategory,
        "PrintShop": PrintShop,
        "SubmitStartTime": SubmitStartTime,
        "SubmitEndTime": SubmitEndTime,
        "Maxim_No": Maxim_No,
        "Pi_NO": Pi_NO,
        "ConfirmDateTime": ConfirmDateTime,
        "ConfirmDateEndTimeId": ConfirmDateEndTimeId
    }
    var html = "";
    $.ajax({
        url: "/Maintain/OrderListSeach",
        data: _data,
        dataType: 'json',
        type: 'post',
        success: function (res) {
            var obj = jQuery.parseJSON(res);
            debugger;
            if (res == "[]") {
                //无数据
                html = "<tr>" + "<td class='center'>" + "无数据" + "</td>" + "</tr>";
                $("#Query-Results").slideDown("slow");
                $("#OrderDetail tbody.OrderDetail").html(html);
            } else {
                $.each(obj, function (i, item) {
                    debugger;
                    html += "<tr>";
                    html += "<td class='center'>" + item.Seq + "</td>";
                    if (item.ReceiveDate_ori == null || item.ReceiveDate_ori == "") {
                        var ReceiveDate_ = "";
                        html += "<td class='center'>" + ReceiveDate_ + "</td>";
                    } else {
                        html += "<td class='center'>" + data_string(item.ReceiveDate_ori) + "</td>";
                    }

                    html += "<td class='center'>" + item.Name + "</td>";
                    html += "<td class='center'>" + item.BillToName + "</td>";
                    html += "<td class='center'>" + item.ShipToName + "</td>";
                    html += "<td class='center'>" + item.ShipToContact + "</td>";
                    html += "<td class='center'>" + item.ShipToAddress + "</td>";
                    html += "<td class='center'>" + item.MaximNO + "</td>";
                    html += "<td class='center'>" + item.CustomerPO + "</td>";
                    html += "<td class='center'>" + item.StyleNO + "</td>";
                    html += "<td class='center'>" + item.OrderReference + "</td>";
                    html += "<td class='center'>" + item.ProductCustNO + "</td>";
                    html += "<td class='center'>" + item.OrderQty + "</td>";
                    html += "</tr>";
                    if (i == 0) {
                        $("#TotalPageCount").html(item._totalPgCount);
                        $("#PageTotalCount").val(item._totalPgCount);
                    }
                });
                $("#Query-Results").slideDown("slow");
                $("#OrderDetail tbody.OrderDetail").html(html);

            }

            debugger;

        }
    })
}


function getPreMonth(date) {
    var arr = date.split('/');
    var year = arr[0]; //获取当前日期的年份  
    var month = arr[1]; //获取当前日期的月份  
    var day = arr[2]; //获取当前日期的日  
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数  
    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    var t2 = year2 + '/' + month2 + '/' + day2;
    debugger;
    return t2;
}