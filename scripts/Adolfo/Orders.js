$(function () {
    $("#btnSearch").click(function () {
        $("#nowpage").val(1);
        $("#pc").val(1);
        if ($("#BrandId").val().length == 0) {
            $("#labtxt").html("Please select a Brand");
            showDiv();
            return;
        }
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
    $('#btnUpdateStatus').click(function ()
    {
        UpdateStatus();
    });
});
function GetOrder() {
   
    $("#Billto-Results").css("display", "none");
    $("#Shipto-Results").css("display", "none");
    $("#LogQuery").css("display", "none");
    var QueryData =
        {
            BrandId: $("#BrandId").val(),
            PrintShopId: $("#PrintShopId").val(),
            MaximNO: $("#MaximNO").val(),
            OrderStatusId: $("#OrderStatusId").val(),
            CustomerPO:$("#CustomerPO").val(),
            Page: document.getElementById("nowpage").value
        }
    $.post("/Adolfo/OrdersQueryResults", QueryData, function (data) {

        if (data) {
            var html = "";
            $.each(data, function (i, item) {
                html += "<tr>"; 
                html+="<td>"
                html+= "<input type='checkbox' name='ckSelect' />"
                html+="<input type='hidden' name='hfOrderNO' value='"+item.MaximNO+"' />";
                html += "<input type='hidden' name='hfStatus' value='" +item.OrderStatus + "'/>";
                html+="</td>"
                html += "<td class='center'>" + item.Seq + "</td>";
                html += "<td class='center'>" + item.MaximNO + "</td>";
                html += "<td class='center'>" + item.PrintShopName + "</td>";
                html += "<td class='center'>" + item.CreatedDate + "</td>";
                html += "<td class='center'>" + item.ConfirmDate + "</td>";
                html += "<td class='center'>" + item.ShippedDate + "</td>";
                html += "<td class='center'>" + item.ETD + "</td>";
                html += "<td class='center'>" + item.ReceiveDate + "</td>";
                html += "<td class='center'>" + item.CustomerId + "</td>";
                html += "<td class='center'>" + item.CustomerPO + "</td>";
                html += "<td class='center'>" + item.BrandName + "</td>";
                html += "<td class='center'>" + item.LevelName + "</td>";
                html += "<td class='center'>" + item.OrderFileName + "</td>";
                html += "<td class='center'>" + item.OrdStatusCName + "</td>";
                html += "</tr>";
            })
            if (html == "") {
                $("#OrderDetail tbody").html("");
                $("#Query-Results").slideDown();
              
            }
            else {
                $("#OrderDetail tbody").html(html);
                $("#TotalPageCount").html(data[0].TotalPageCount);
                $("#PageTotalCount").val(data[0].TotalPageCount);
                $("#Query-Results").slideDown();
              
            }


        }
    });
}

function UpdateStatus() {
   
    var OrderStatusId = $("#OrderStatusIds").val();
    if (OrderStatusId=="")
    {
        $("#labtxt").html("请选择要修改的状态!");
        showDiv();
        return false;

}

   // var details = GetDetails();
    var ma = "";
    var details = [];
    var a = 0;
    var FisrtStatus="";
    $('#OrderDetail').find('tr').each(function (index) {
        if (index > 0) {
          
            var row = $(this);
            var selected = row.find('[name="ckSelect"]').prop('checked');
            if (selected) {
               
                  a++;
                var order = row.find('[name="hfOrderNO"]').val();
                
                var Status = row.find('[name="hfStatus"]').val();
                if (a == 1)
                {
                     FisrtStatus = Status;
                }
                
                if (FisrtStatus != Status) {
                    ma = "false";
                }
                details.push({
                    Maximno: order,
                    Status: Status
                });
            }
        }
    });
    if (ma == "false") {
        showDiv("订单状态不同!");
        return false;
    }
    if (details.length === 0) {
        showDiv("请选择需要操作的订单");
         return false;
    }
   
    var parameter = {
        
        OrderStatusId: $('#OrderStatusIds').val(),
        details: details
    };
   
    $.post("/Adolfo/UpdateStatus", parameter, function (data) {
        if (data) {
            showDiv("修改状态成功!");
            GetOrder();
            $('#OrderStatusIds').val('');
        } else {
            showDiv("不能修改成此状态!");
            GetOrder();
        }
    });
}
