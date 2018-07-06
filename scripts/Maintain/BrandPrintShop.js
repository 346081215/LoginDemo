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
    $("#Return").click(function () {
        $("#EditInfor").css("display", "none");
    })
});
function GetOrder() {
    var BrandId = $("#BrandId").val();
    if (BrandId == "") {
        $("#labtxt").html("Please select a Brand");
        showDiv();
        return false;
    }
    var QueryData =
        {
            BrandId: $("#BrandId").val(),
            Page: document.getElementById("nowpage").value
        }
    $.post("/Maintain/GetBrandPrintShop", QueryData, function (data) {

        if (data) {
            var html = "";
            $.each(data, function (i, item) {
                html += "<tr>";
                html += "<td class='center'>" + item.Seq + "</td>";
                html += "<td class='center'>" + item.PrintShopId + "</td>";
                html += "<td class='center'>" + item.PrintShop + "</td>";
                html += "<td class='center'><button type=button id=Delete name=Delete class='btn btn-default' onclick='return funcDelete(this)' value='" + item.ID + "'>Delete</button></td>";
                html += "</tr>";
            })
            if (html == "") {
                $("#OrderDetail tbody").html("");
                $("#Query-Results").css("display", "block");
            }
            else {

                $("#OrderDetail tbody").html(html);
                $("#TotalPageCount").html(data[0].TotalPageCount);
                $("#PageTotalCount").val(data[0].TotalPageCount);
                $("#Query-Results").css("display", "block");
            }


        }
    });
}
function NewPrintShop()
{
    var BrandId = $("#BrandId").val();
    if (BrandId == "") {
        $("#labtxt").html("Please select a Brand");
        showDiv();
        return false;
    }
    $("#EditPrintShop").empty();
    $.post("/Maintain/NewPrintShopQuery",'', function (data)
    {
        $.each(data.orderdata.PrintShopList, function (i, item) {
            var PrintShopList = "";
            PrintShopList = "<option value='" + item.Value + "'>" + item.Text + "</option>";
            $("#EditPrintShop").append(PrintShopList);
        });
        $("#EditInfor").css("display","block");
    });
}
function AddPrintShop()
{
    var BrandId = $("#BrandId").val();
    var EditPrintShop = $("#EditPrintShop").val();
    if (EditPrintShop == "")
    {
        $("#labtxt").html("Please select a PrintShop");
        showDiv();
        return false;
    }
    var _data =
        {
            BrandId: BrandId,
            EditPrintShop: EditPrintShop

        }
    $.post("/Maintain/AddNewPrintShop", _data, function (data)
    {
        if (data.FunStatus=="success")
        {
            $("#labtxt").html("success");
            showDiv();
            GetOrder();
            $("#EditInfor").css("display","none");
            return;
        }
        else
        {
            $("#labtxt").html(data.ErrorCode);
            showDiv();
            return false;
        }

    })
}
function funcDelete(obj)
{
    $("#labtxt").html("Are you sure to Delete?");
    showDiv2();
    var ID = obj.value;
    $("#ok").bind("click", function () {
        $.post("/Maintain/DeleteBrandPrintShop", ID, function (data) {
            if (data.FunStatus == "success") {
                $("#labtxt").html("success");
                //showDiv();
                GetOrder();
                closeDiv();
                $("#EditInfor").css("display", "none");
                return;
            }
            else {
                $("#labtxt").html(data.ErrorCode);
                showDiv();
                return false;
            }

        })
    });
    $("#no").bind("click", function () {
        closeDiv();
    })

}