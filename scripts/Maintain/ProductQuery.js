$(function () {

    $('#PageIndex').click(function () {
        document.getElementById("pc").value = 1;
        document.getElementById("nowpage").value = 1;
        if ($("#TotalPageCount").html() == "0") {
            return false;
        }
        else {
            GetOrder();
        }
    });
    $('#Pageup').click(function () {
        var nowpage = document.getElementById("nowpage").value;
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) > 1) {
            newpage = parseInt(nowpage) - 1;
            document.getElementById("pc").value = newpage;
            document.getElementById("nowpage").value = newpage;
            if ($("#TotalPageCount").html() == "0") {
                return false;
            }
            else {
                GetOrder();
            }
        }
    });
    $('#Pagewown').click(function () {
        var nowpage = document.getElementById("nowpage").value;
        var maxpage = parseInt(document.getElementById("PageTotalCount").value);
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) < maxpage) newpage = parseInt(nowpage) + 1;
        document.getElementById("pc").value = newpage;
        document.getElementById("nowpage").value = newpage;
        if ($("#TotalPageCount").html() == "0") {
            return false;
        }
        else {
            GetOrder();
        }

    });
    $('#PageLast').click(function () {
        var maxpage = parseInt(document.getElementById("PageTotalCount").value);
        document.getElementById("pc").value = maxpage;
        document.getElementById("nowpage").value = maxpage;
        if ($("#TotalPageCount").html() == "0") {
            return false;
        }
        else {
            GetOrder();
        }
    });
    $('#PageGO').click(function () {
        var nowpage = parseInt(document.getElementById("nowpage").value);
        var maxpage = parseInt(document.getElementById("PageTotalCount").value) + 1;
        if (nowpage > 0 && nowpage < maxpage) {
            document.getElementById("pc").value = document.getElementById("nowpage").value;
            if ($("#TotalPageCount").html() == "0") {
                return false;
            }
            else {
                GetOrder();
            }
        }
        else {
            //alert("wrong page no.");
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
    //查询
    $("#btnSearch").click(function () {
        $("#nowpage").val(1);
        $("#pc").val(1);
        document.getElementById("nowpage").value = 1;
        GetOrder();
    })
    //新增
    $("#btnAddProduct").click(function () {
       
      
        var Brandid = $("#Brandid").val();
        if (Brandid.length < 1)
        {
            $("#labtxt").html("Please select a Brand");
            showDiv();
            return;
        }
        
        $.ajax(
     {
         type: "get",
         url: "/Maintain/ProductEdit?ProductCode=" + " ",
         contentType: "application/html; charset=utf-8",
         dataType: "html"
     })
 .success(function (data) {

     //console.log(data);
     //$("#ProductEditView").css("display", "block");
     $("#step1").removeAttr("style");
     $("#step2").removeAttr("style");
     $("#step1").attr("class", "gray-em");
     $("#step2").attr("class", "gray-em");
     $("#step3").attr("class", "red-em");
     $("#Query").css("display", "none")
     $("#Query-Results").css("display", "none")
     $("#ProductEditView").html(data);
     $("#_OrderRate").val("0");
     $("#_ProduceRate").val("0");
     $("#_PcsDoubleQty").val("0");
     $("#btnProductAdd").css("display", "inline");
     $("#btnProductEdit").css("display","none");
     $("#ProductEditView").slideDown();

     $("#_ProductBrandId").val(Brandid);
     $("#_ProductCode").removeAttr("disabled");
 })
 .error(function (xhr, status) {
     $("#labtxt").html(status)
     showDiv();
 })


    })

    $("#step1").click(function () {
        $("#Query-Results").css("display", "none");
        $("#ProductEditView").css("display", "none");
        $("#ProductTplQueryView").css("display", "none");
        $("#Query").slideDown();
        $("#step1").removeAttr("style");
        $("#step2").css("display", "none");
        $("#step3").css("display", "none");
        $("#step4").css("display", "none");
        $("#step2").attr("class", "gray-em");
        $("#step1").attr("class", "red-em");
    })
    $("#step2").click(function () {
        $("#Query").css("display", "none");
        $("#ProductEditView").css("display", "none");
        $("#ProductTplQueryView").css("display", "none");
        $("#Query-Results").slideDown();
        $("#step1").removeAttr("style");
        $("#step2").removeAttr("style");
        $("#step3").css("display", "none");
        $("#step4").css("display", "none");
        $("#step1").attr("class", "gray-em");
        $("#step2").attr("class", "red-em");
    })
    $("#step3").click(function () {
        $("#Query").css("display", "none");
        $("#ProductTplQueryView").css("display", "none");
        $("#Query-Results").slideDown();
        $("#step1").removeAttr("style");
        $("#step2").removeAttr("style");
        $("#step3").removeAttr("style");
        $("#step4").css("display", "none");
        $("#step1").attr("class", "gray-em");
        $("#step2").attr("class", "gray-em");
        $("#step3").attr("class", "red-em");
    })
    $("#step4").click(function () {
        $("#Query-Results").css("display", "none");
        $("#Query").slideDown();
        $("#step1").removeAttr("style");
        $("#step2").attr("class", "gray-em");
        $("#step1").attr("class", "red-em");
    })


})

function GetOrder() {
    var Brandid = $("#Brandid").val();  
    var MaximProdCateID = $("#MaximProdCate").val();
    debugger;
    //encodeURIComponent
    var ProductCustNO = $("#ProductCustNO").val();
    var ProductERPNO = $("#ProductERPNO").val();
    if (Brandid.length < 1) {
        $("#labtxt").html("Please select a Brand");
        showDiv();
        return;
    }

    var data_ = {
        Brandid: Brandid,
        MaximProdCateID: MaximProdCateID,
        ProductCustNO: ProductCustNO,
        ProductERPNO: ProductERPNO,
        Productstatus:$("#Productstatus").val(),
        Page: document.getElementById("nowpage").value
    }
    $.post("/Maintain/ProductSearch", data_, function (data) {

        if (data) {
            var html = "";
            var intSeq = 0;
            var TotalPageCount = "0";
            if (data.length > 0) {
                $.each(data, function (i, item) {
                    intSeq++;
                    html += "<tr>";
                    html += "<td class='center'>" + item.Seq + "</td>";
                    html += "<td class='center'>" + item.ProductCode + "</td>";
                    html += "<td class='center'>" + item.ProductCustNO + "</td>";
                    html += "<td class='center'>" + item.ProductERPNO + "</td>";
                    html += "<td class='center'>" + item.MaximProdCate + "</td>";
                    html += "<td class='center'>" + item.BasePaperERPNO + "</td>";
                    html += "<td class='center'>" + item.FormatId + "</td>";
                    html += "<td class='center'>" + item.LevelName + "</td>";
                    html += "<td class='center'>" + item.ProductStatus + "</td>";
                    html += "<td class='center'>" + "<input type=\"button\" class=\"btn\" id=\"ProductEdit\" value=\"Edit\" ProductCode='" + item.ProductCode + "' onclick='FunProductEdit(this)'/ >" + "</td>";
                    //html += "<td class='center'>" +"<input type=\"button\" class=\"btn\" id=\"ProductEdit\" value=\"产品变量维护\" />" + "</td>";
                    html += "<td class='center'>" + "<input type=\"button\" class=\"btn\" id=\"ProductEdit\" value=\"模板维护\" ProductCode='" + item.ProductCode + "' onclick='FunProductTplEdit(this)' />" + "</td>";
                    html += "</tr>";
                });
                TotalPageCount = data[0].TotalPageCount;
            } else {
                $("#TotalPageCount").html("0");


            }

            $("#OrderDetail tbody").html(html);


            $("#TotalPageCount").html(TotalPageCount);

            $("#PageTotalCount").val(TotalPageCount);




            //$("#Query").css("display", "none")
            $("#Query-Results").slideDown();
            
            $("#step1").removeAttr("style");
            $("#step2").removeAttr("style");
            $("#step1").attr("class", "gray-em");
            $("#step2").attr("class", "red-em");
        }
    })
}

function FunProductEdit(obj) {
    var ProductCode = obj.attributes["ProductCode"].value;
    
    //$.post("/Maintain/ProductEdit?ProductCode=", ProductCode, function (data) {

    //})

    debugger;
    $.ajax(
       {
           type: "get",
           url: "/Maintain/ProductEdit?ProductCode=" + encodeURIComponent(ProductCode),
           contentType: "application/html; charset=utf-8",
           dataType: "html"
       })
   .success(function (data) {

       //console.log(data);
       //$("#ProductEditView").css("display", "block");
      
       $("#step1").removeAttr("style");
       $("#step2").removeAttr("style");
       $("#step3").removeAttr("style");
       $("#step1").attr("class", "gray-em");
       $("#step2").attr("class", "gray-em");
       $("#step3").attr("class", "red-em");

       $("#Query").css("display", "none")
       $("#Query-Results").css("display","none")
       $("#ProductEditView").html(data);
       $("#btnProductAdd").css("display", "none");
       $("#btnProductEdit").css("display", "inline");
       $("#ProductEditView").slideDown();
       $("#_ProductCode").attr("disabled", "disabled");
   })
   .error(function (xhr, status) {
       $("#labtxt").html(status)
       showDiv();
   })
}

function FunProductTplEdit(obj) {

    var ProductCode = obj.attributes["ProductCode"].value;

    //$.post("/Maintain/ProductEdit?ProductCode=", ProductCode, function (data) {

    //})

    debugger;
    $.ajax(
       {
           type: "get",
           url: "/Maintain/ProductTplQuery?ProductCode=" + encodeURIComponent(ProductCode),
           contentType: "application/html; charset=utf-8",
           dataType: "html"
       })
   .success(function (data) {

       //console.log(data);
       //$("#ProductEditView").css("display", "block");
       
       $("#step1").removeAttr("style");
       $("#step2").removeAttr("style");
       $("#step3").removeAttr("style");
       $("#step4").removeAttr("style");
       $("#step1").attr("class", "gray-em");
       $("#step2").attr("class", "gray-em");
       $("#step3").attr("class", "gray-em");
       $("#step4").attr("class", "red-em");

       $("#Query").css("display", "none")
       $("#Query-Results").css("display", "none")
       $("#ProductEditView").css("display", "none")
       $("#ProductTplQueryView").html(data);
       $("#ProductTplQueryView").slideDown();

       $("#hfProductCode").val(ProductCode);
   })
   .error(function (xhr, status) {
       $("#labtxt").html(status)
       showDiv();
   })
}


