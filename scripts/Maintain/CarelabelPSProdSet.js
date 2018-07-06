$(function () {   //查询所有
    GetAll();
    //分页
    $('#PageIndex').click(function () {
        document.getElementById("pc").value = 1;
        document.getElementById("nowpage").value = 1;
        GetAll();
    });
    $('#Pageup').click(function () {
        var nowpage = document.getElementById("nowpage").value;
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) > 1) {
            newpage = parseInt(nowpage) - 1;
            document.getElementById("pc").value = newpage;
            document.getElementById("nowpage").value = newpage;
            GetAll();
        }
    });
    $('#Pagewown').click(function () {
        var nowpage = document.getElementById("nowpage").value;
        var maxpage = parseInt(document.getElementById("PageTotalCount").value);
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) < maxpage) newpage = parseInt(nowpage) + 1;
        document.getElementById("pc").value = newpage;
        document.getElementById("nowpage").value = newpage;
        GetAll();
    });
    $('#PageLast').click(function () {
        var maxpage = parseInt(document.getElementById("PageTotalCount").value);
        document.getElementById("pc").value = maxpage;
        document.getElementById("nowpage").value = maxpage;
        GetAll();
    });
    $('#PageGO').click(function () {
        var nowpage = parseInt(document.getElementById("nowpage").value);
        var maxpage = parseInt(document.getElementById("PageTotalCount").value) + 1;
        if (nowpage > 0 && nowpage < maxpage) {
            document.getElementById("pc").value = document.getElementById("nowpage").value;
            GetAll();
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
function GetAll() {
    var QueryData =
       {
           Page: document.getElementById("nowpage").value,
           Printshop: $("#Printshop").val(),
           Product: $("#Product").val(),
           TempletSet: $("#TempletSet").val()
       }
    $.post("/Maintain/CarelabelPSProdSetAll", QueryData, function (data) {
        var html = "";
        debugger;
        if (data.length > 0) {
            $.each(data, function (i, item) {
                html += "<tr>";
                html += "<td class='center'>" + item.Printshop + "</td>";
                html += "<td class='center'>" + item.Product + "</td>";
                html += "<td class='center'>" + item.TempletSet + "</td>";
                html += "<td class='center'><button type=button id=Remove name=Remove class='btn btn-default' onclick='return funcRemove(this)' value='" + item.Id + "'>Remove</button></td>";
            });
            $("#OrderDetail tbody").html(html);
            $("#TotalPageCount").html(data[0]["TotalPageCount"]);
            $("#PageTotalCount").val(data[0]["TotalPageCount"]);
        }
        else
        {
            $("#OrderDetail tbody").html("");
            $("#TotalPageCount").html("1");
            $("#PageTotalCount").val("1");
        }
    });
}
function funcRemove(obj)
{
    id = obj.value;
    $.post("/Maintain/CarelabelPSProdSetRemove", id, function (data)
    {
    
        if (data.FunStatus="success")
        {
            console.log("success");
            GetAll();
        }
        else
        {
            $("#labtxt").html("Fail");
            showDiv();
        }
    });
}
function funcADD()
{
    Printshop=$("#Printshop").val();
    Product=$("#Product").val();
    TempletSet=$("#TempletSet").val();
    if (Printshop == "")
    {
        $("#labtxt").html("Please select PrintShop.");
        showDiv();
        return false;
    }
    if (Product == "") {
        $("#labtxt").html("Please select Product.");
        showDiv();
        return false;
    }
    if (TempletSet == "") {
        $("#labtxt").html("Please select TempletSet.");
        showDiv();
        return false;
    }
    _data =
        {
            Printshop: Printshop,
            Product: Product,
            TempletSet: TempletSet
        }
    $.post("/Maintain/ADDCarelabelPSProdSet", _data, function (data)
    {
        debugger;
        if (data.FunStatus == "success")
        {
            $("#labtxt").html("success");
            showDiv();
            GetAll();
        }
        else
        {
            $("#labtxt").html(data.FunStatus);
            showDiv();
            return false;
        }

    });
}
function funcQuery()
{
    GetAll();
}