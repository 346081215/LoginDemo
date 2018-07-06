$(function () {
    $("#btnAddProductTpl").click(function () {
        $.ajax(
          {
              type: "post",
              url: "/Maintain/ProductTplEdit?ProductTplCode=" + " " + "&ProductCode=" + " ",
              contentType: "application/html; charset=utf-8",
              dataType: "html"
          })
          .success(function (data) {


              $("#ProductTplEditView").html(data);
              //console.log(data);
              $("#ProductTplEditView").slideDown();
              $("#btnProductTplAdd").css("display", "inline");
              $("#btnProductTplEdit").css("display", "none");
              var hfProductCode = $("#hfProductCode").val()
              //alert(hfProductCode);
              $("#_ProductCodeTpl").val($("#hfProductCode").val());
              $("#_ProductCodeTpl").attr("disabled", "disabled");
              //$("#_ProductCodeTpl").removeAttr("disabled");
              //$("#Results-ViewShipOrder").html(data);
          })
          .error(function (xhr, status) {
              $("#labtxt").html(status)
              showDiv();
          })
    })
    $("#btnProductTplQueryBack").click(function () {
        $("#step3").attr("class", "red-em");
        $("#step4").css("display", "none");
        $("#ProductTplQueryView").css("display", "none");
        $("#Query-Results").slideDown();
    })
})


function ProductTplEditPageLoad(obj) {
    var ProductTplCode = obj.attributes["ProductTplCode"].value;
    var ProductCode = $("#hfProductCode").val();
    $.ajax(
      {
          type: "post",
          url: "/Maintain/ProductTplEdit?ProductTplCode=" + ProductTplCode + "&ProductCode=" + ProductCode,
          contentType: "application/html; charset=utf-8",
          dataType: "html"
      })
      .success(function (data) {

         
          $("#ProductTplEditView").html(data);
          //console.log(data);
          $("#ProductTplEditView").slideDown();
          $("#btnProductTplAdd").css("display", "none");
          $("#btnProductTplEdit").css("display", "inline");
          $("#_ProductCodeTpl").attr("disabled", "disabled");
          $("#_ProductTplCode").attr("disabled", "disabled");
          //$("#Results-ViewShipOrder").html(data);
      })
      .error(function (xhr, status) {
          $("#labtxt").html(status)
          showDiv();
      })
}