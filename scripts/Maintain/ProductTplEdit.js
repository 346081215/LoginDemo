$(function () {
    $("#btnProductTplEdit").click(function () {
        var data_ = funVerification()
        if (data_) {
            $.post("/Maintain/btnProductTplEdit", data_, function (data) {
                if (data) {
                    $("#labtxt").html(data)
                    showDiv();
                    GetProductTpl();
                } else {
                    $("#labtxt").html(data)
                    showDiv();
                }
            })
        }
    })
    $("#btnProductTplAdd").click(function () {
        var data_ = funVerification()
        if (data_) {
            $.post("/Maintain/btnProductTplAdd", data_, function (data) {
                if (data) {
                    $("#labtxt").html(data)
                    showDiv();
                    GetProductTpl();
                } else {
                    $("#labtxt").html(data)
                    showDiv();
                }
            })
        }
    })
    $("#btnProductTplEditBack").click(function () {
        $("#ProductTplEditView").css("display", "none");

    })
})

function funVerification() {

    var ProductTplCode = $.trim($("#_ProductTplCode").val());
    var ProductCode = $("#_ProductCodeTpl").val()
    var TplName = $.trim($("#_TplName").val());
    var TplVersion = $("#_TplVersion").val()
    var TplWidth = $("#_TplWidth").val()
    var TplHeight = $("#_TplHeight").val()
    var PrintType = $("#_PrintType").val()
    var DivideQty = $("#_DivideQty").val()
    var EndmarkType = $("#_EndmarkType").val()
    var EndmarkQty = $("#_EndmarkQty").val()
    var JobPieces = $("#_JobPieces").val()
    var PcsFillType = $("#_PcsFillType").val()
    var IsFullLine = $("#_IsFullLine").prop("checked")
    var HalfProdLinePcs = $("#_HalfProdLinePcs").val()
    var IsFullPiece = $("#_IsFullPiece").prop("checked")
    var PcsPerPiece = $("#_PcsPerPiece").val()
    var IsChgPiece = $("#_IsChgPiece").prop("checked")
    var IsPrintByPiece = $("#_IsPrintByPiece").prop("checked")
    //var ProdPLCreatedDate = $("#_ProdPLCreatedDate").val()
    //var ProdPLCreatedBy = $("#_ProdPLCreatedBy").val()
    //var ProdPLModifiedDate = $("#_ProdPLModifiedDate").val()
    //var ProdPLModifiedBy = $("#_ProdPLModifiedBy").val()
    var ProdPLIsEnabled = $("#_ProdPLIsEnabled").prop("checked")
    var ProdPLNotes = $("#_ProdPLNotes").val()

    if (ProductTplCode.length < 1) {
        $("#labtxt").html("请输入正确的产品模板代号")
        showDiv();
        return false;
    }
    if (ProductCode.length < 1) {
        $("#labtxt").html("请输入正确的产品ID")
        showDiv();
        return false;
    }
    if (TplName.length < 1) {
        $("#labtxt").html("请输入正确的模板名称")
        showDiv();
        return false;
    }
    if (TplWidth.length < 1) {
        $("#labtxt").html("请输入正确的宽度")
        showDiv();
        return false;
    }
    if (TplHeight.length < 1) {
        $("#labtxt").html("请输入正确的高度")
        showDiv();
        return false;
    }
    if (PrintType.length < 1) {
        $("#labtxt").html("请选择一个PrintType")
        showDiv();
        return false;
    }
    if (DivideQty.length < 1) {
        $("#labtxt").html("请输入正确的DivideQty")
        showDiv();
        return false;
    }
    if (EndmarkType.length < 1) {
        $("#labtxt").html("请选择一个EndmarkType")
        showDiv();
        return false;
    }
    if (EndmarkQty.length < 1) {
        $("#labtxt").html("请输入正确的EndmarkQty")
        showDiv();
        return false;
    }
    if (JobPieces.length < 1) {
        $("#labtxt").html("请输入正确的JobPieces")
        showDiv();
        return false;
    }

    var data_ = {
        ProductTplCode: ProductTplCode,
        ProductCode: ProductCode,
        TplName: TplName,
        TplVersion: TplVersion,
        TplWidth: TplWidth,
        TplHeight: TplHeight,
        PrintType: PrintType,
        DivideQty: DivideQty,
        EndmarkType: EndmarkType,
        EndmarkQty: EndmarkQty,
        JobPieces: JobPieces,
        PcsFillType: PcsFillType,
        IsFullLine: IsFullLine,
        HalfProdLinePcs: HalfProdLinePcs,
        IsFullPiece: IsFullPiece,
        PcsPerPiece: PcsPerPiece,
        IsChgPiece: IsChgPiece,
        IsPrintByPiece: IsPrintByPiece,
        //ProdPLCreatedDate: ProdPLCreatedDate,
        //ProdPLCreatedBy: ProdPLCreatedBy,
        //ProdPLModifiedDate: ProdPLModifiedDate,
        //ProdPLModifiedBy: ProdPLModifiedBy,
        ProdPLIsEnabled: ProdPLIsEnabled,
        ProdPLNotes: ProdPLNotes,
    }
    return data_;
}



function GetProductTpl() {
    var ProductCode = $("#_ProductCodeTpl").val();
    $.ajax(
      {
          type: "get",
          url: "/Maintain/ProductTplQuery?ProductCode=" + encodeURIComponent(ProductCode),
          contentType: "application/html; charset=utf-8",
          dataType: "html"
      })
  .success(function (data) {
      if (data) {
          $("#ProductTplQueryView").html(data);
          $("#ProductTplQueryView").slideDown();
          $("#hfProductCode").val(ProductCode);
      }
  })
  .error(function (xhr, status) {
      $("#labtxt").html(status)
      showDiv();
  })
}