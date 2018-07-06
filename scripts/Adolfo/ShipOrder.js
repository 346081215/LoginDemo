$(function () {
    FormComponents.init();
    $("#ERPOrderInfor").css("display", "none");
    $("#btnQuery").click(function () {
        ResetPageNo();
        GetOrder();
    });

    $('#btnShipOrder').click(function () {
        UpdateShipOrder();
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

function GetOrder() {

    var parameter = {
        Sdate: $('#dpOrderStartTime').val(),
        Edate: $('#dpOrderEtartTime').val(),
        Order: $('#OOSNo').val(),
        pageIndex: $('#nowpage').val(),
        pageSize: 20
    };

    $.post("/Adolfo/ShipOrderList", parameter, function (data) {
        if (data.Error) {
            $("#ERPOrderInfor").css("display", "block");
            SetGrid(data.data, data.TotalPageCount);
        } else {
            $("#ERPOrderInfor").css("display", "none");
            showDiv(data.Message);
        }
    })
}

function SetGrid(rowData, pageCount) {
    $("#TotalPageCount").html(pageCount);
    $("#PageTotalCount").val(pageCount);
    var content = '';
    for (var index in rowData) {
        var item = rowData[index];
        content += '<tr>';
        content += "<td>";
        content += "<input type='checkbox' name='ckSelect' />";
        content += "<input type='hidden' name='hfOrderProductNO' value='"+item.OrderProductNO+"' />";
        content += "<input type='hidden' name='hfOrderNO' value='"+item.MaximNO+"' />";
        content += "<input type='hidden' name='hfItem' value='" + item.ItemValue + "' />";
        content += "<input type='hidden' name='hfoldqty' value='" + item.OrderQty + "' />";
        content + "</td>"
        content += '<td>' + item.Seq + '</td>';
        content += '<td>' + item.OrderDate + '</td>';
        content += '<td class="data-maximno">' + item.MaximNO + '</td>';
        content += '<td>' + item.Item + '</td>';
        content += '<td>' + item.Customer + '</td>';
        //content += '<td>' + item.BilltoNumber + '</td>';
        //content += '<td>' + item.BilltoName + '</td>';
        //content += '<td>' + item.Contact + '</td>';
        //content += '<td>' + item.ShiptoName + '</td>';
        //content += '<td>' + item.ServiceLevel + '</td>';
        //content += '<td>' + item.ShipmentType + '</td>';
        //content += '<td>' + item.FreightCompany + '</td>';
        //content += '<td>' + item.AddComments + '</td>';


        //content += '<td>' + item.Currency + '</td>';
        //content += '<td>' + item.UnitPrice + '</td>';

        content += '<td>' + item.OrderQty + '</td>';
        content += '<td><input type="text" name="txtShipQty" value="' + item.OrderQty + '"></td>'
        content += '</tr>';
    }
    $('#OrderDetail tbody').html(content);
    if (content == "") {
        $("#ERPOrderInfor").css("display", "none");
    }
    //$('#OrderDetail').find('tr').each(function (index) {
    //    if (index > 0) {
    //        var row = $(this);
    //        row.find('[name="ckSelect"]').click(CheckClick);
    //    }
    //});
}

function GetDetails() {

    var details = [];
    $('#OrderDetail').find('tr').each(function (index) {
        if (index > 0) {
            var row = $(this);
            var selected = row.find('[name="ckSelect"]').prop('checked');
            if (selected) {
               
                var rowid = row.find('[name="hfOrderProductNO"]').val();
                var order = row.find('[name="hfOrderNO"]').val();
                var itemvalue = row.find('[name="hfItem"]').val();
                var price = row.find('[name="txtShipQty"]').val();
                var oldqty = row.find('[name="hfoldqty"]').val();
                if (price > oldqty) {
                    return false;
                }
                details.push({
                    OrderProductNO: rowid,
                    Maximno:order,
                    QTY: price,
                    Item: itemvalue
                });
            }
        }
    });
    return details;
}

function UpdateShipOrder() {

   // var details = GetDetails();
    var ma = "";
    var details = [];
    $('#OrderDetail').find('tr').each(function (index) {
        if (index > 0) {
            var row = $(this);
            var selected = row.find('[name="ckSelect"]').prop('checked');
            if (selected) {

                var rowid = row.find('[name="hfOrderProductNO"]').val();
                var order = row.find('[name="hfOrderNO"]').val();
                var itemvalue = row.find('[name="hfItem"]').val();
                var price = row.find('[name="txtShipQty"]').val();
                var oldqty = row.find('[name="hfoldqty"]').val();
                if (parseInt(price) > parseInt(oldqty)) {                  
                    ma = "false";
                }
                details.push({
                    OrderProductNO: rowid,
                    Maximno: order,
                    QTY: price,
                    Item: itemvalue
                });
            }
        }
    });
    if (ma == "false") {
        showDiv("输入的数据大于订单数，请检查");
        return;
    }
    var Shipdate = $('#dpShipOrerDate').val();
    var ExpressNO = $('#InExpressNo').val();
    if (details.length === 0) {
        showDiv("请选择需要操作的数据");
        return;
    }

    if (Shipdate == "") {
        showDiv("请选择出货日期.");
        return;
    }
    if (ExpressNO == "") {
        showDiv("请选择快递单号.");
        return;
    }

    var parameter = {
        ShipOrderDate: $('#dpShipOrerDate').val(),
        ExpressNoValue: ExpressNO,
        details: details
    };

    $.post("/Adolfo/ShipOrderUpdate", parameter, function (data) {
        if (data) {
            showDiv("出货成功!");
            GetOrder();
            $('#dpShipOrerDate').val('');
            $('#InExpressNo').val('');
        } else {
            showDiv("出货失败!");
            GetOrder();
        }
    });
}
