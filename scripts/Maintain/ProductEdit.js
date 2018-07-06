$(function () {   
    $("#btnProductEdit").click(function () {
        var data_ = funVerification()
        if (data_) {
            $.post("/Maintain/btnProductEdit", data_, function (data) {
                if (data) {
                    $("#labtxt").html(data)
                    showDiv();
                    GetOrder();

                    $("#step1").removeAttr("style");
                    $("#step2").removeAttr("style");
                    $("#step3").css("display", "none");

                    $("#step1").attr("class", "gray-em");
                    $("#step2").attr("class", "red-em");


                    $("#Query").css("display", "none")
                    $("#ProductEditView").css("display", "none")
                    $("#Query-Results").slideDown();
                } else {
                    $("#labtxt").html(data)
                    showDiv();
                }
            })
        }
    })
    $("#btnProductAdd").click(function () {
        var data_ = funVerification()
        if (data_) {
            $.post("/Maintain/btnProductAdd", data_, function (data) {
                if (data) {
                    $("#labtxt").html(data)
                    showDiv();
                    GetOrder();

                    $("#step1").removeAttr("style");
                    $("#step2").removeAttr("style");
                    $("#step3").css("display", "none");

                    $("#step1").attr("class", "gray-em");
                    $("#step2").attr("class", "red-em");


                    $("#Query").css("display", "none")
                    $("#ProductEditView").css("display", "none")
                    $("#Query-Results").slideDown();

                } else {
                    $("#labtxt").html(data)
                    showDiv();
                }
            })
        }
    })

    $("#btnProductBack").click(function () {

        GetOrder();

        $("#step1").removeAttr("style");
        $("#step2").removeAttr("style");
        $("#step3").css("display", "none");

        $("#step1").attr("class", "gray-em");
        $("#step2").attr("class", "red-em");


        $("#Query").css("display", "none")
        $("#ProductEditView").css("display", "none")
        $("#Query-Results").slideDown();
    })
})

function funVerification() {

    var ProductCode = $.trim($("#_ProductCode").val());
    debugger;
    //新增产品ID不能包含特殊字符
    var regEn = /[`~!@#$%^&*()+<>?:"{},.\/;'[\]]/im,
        regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

    if (regEn.test(ProductCode) || regCn.test(ProductCode)) {
        $("#labtxt").html("产品ID不能包含特殊字符.")
        showDiv();
        return false;
    }
    if (ProductCode.indexOf(" ") != -1)
    {
        $("#labtxt").html("产品ID不能有空格")
        showDiv();
        return false;
    }
    //var ProductIsEnabled = $("#_ProductIsEnabled").prop("checked")
    var Productstatus = $("#_Productstatus").val();
    //var ProductCreatedDate = $("#_ProductCreatedDate").val()
    //var ProductCreatedBy = $("#_ProductCreatedBy").val()
    //var ProductModifiedDate = $("#_ProductModifiedDate").val()
    //var ProductModifiedBy = $("#_ProductModifiedBy").val()
    var BrandId = $("#_ProductBrandId").val()
    var IsUseCustVar = $("#_IsUseCustVar").prop("checked")
    var ProductERPNO = $.trim($("#_ProductERPNO").val());
    var ProductCustNO = $.trim($("#_ProductCustNO").val());
    var MaximProdCate = $("#_MaximProdCate").val();
    var ProductType = $("#_ProductType").val()
    var IsCarelabelPlate = $("#_IsCarelabelPlate").prop("checked")
    var BasePaperCode = $("#_BasePaperCode").val()
    var BasePaperERPNO = $.trim($("#_BasePaperERPNO").val());
    var BasePaperCustNO = $("#_BasePaperCustNO").val()
    var OrderRate = $("#_OrderRate").val()
    var ProduceRate = $("#_ProduceRate").val()
    var Product_Width = $("#_Product_Width").val()
    var Product_Height = $("#_Product_Height").val()
    var BaseWeight = $("#_BaseWeight").val()
    var LevelType = $("#_LevelType").val()
    var ArtworkColumnCount = $("#_ArtworkColumnCount").val()
    var SampleQty = $("#_SampleQty").val()
    var IsSeqCIDProd = $("#_IsSeqCIDProd").prop("checked")
    var PcsDoubleQty = $("#_PcsDoubleQty").val()
    var IsNeedArtwork = $("#_IsNeedArtwork").prop("checked")
    var PurchaseUnit = $("#_PurchaseUnit").val()
    var ERPBeiKuUnit = $("#_ERPBeiKuUnit").val()
    var ShowOrder = $("#_ShowOrder").val()
    var WorkShop = $("#_WorkShop").val()
    var Notes = $("#_Notes").val()
    var FormatId = $("#_FormatId").val();
    debugger;

    if (IsSeqCIDProd!=false)
    {
        if (PcsDoubleQty.length < 1 || $("#_PcsDoubleQty").val() == "0")
        {
            $("#labtxt").html("请输入正确的流水号重复数量")
            showDiv();
            return false;
        }

    }
    if (ProductCode.length < 1)
    {
        $("#labtxt").html("请输入正确的产品ID")
        showDiv();
        return false;
    }
    if (Productstatus.length < 1) {
        $("#labtxt").html("请选择一个产品状态")
        showDiv();
        return false;
    }
    if (BrandId.length < 1) {
        $("#labtxt").html("请选择一个品牌ID")
        showDiv();
        return false;
    }
    if (ProductERPNO.length < 1) {
        $("#labtxt").html("请输入正确的ERP NO")
        showDiv();
        return false;
    }
    if (ProductCustNO.length < 1) {
        $("#labtxt").html("请输入正确的产品编号")
        showDiv();
        return false;
    }
    if (MaximProdCate.length < 1) {
        $("#labtxt").html("请选择一个美声客户产品种类")
        showDiv();
        return false;
   }
    if (ProductType.length < 1) {
        $("#labtxt").html("请选择一个产品类型")
        showDiv();
        return false;
    }
    //if (BasePaperCode.length < 1) {
    //    $("#labtxt").html("请输入正确的半成品代号")
    //    showDiv();
    //    return false;
    //}
    //if (BasePaperERPNO.length < 1) {
    //    $("#labtxt").html("请输入正确的半成品ERP料号")
    //    showDiv();
    //    return false;
    //}
    //if (BasePaperCustNO.length < 1) {
    //    $("#labtxt").html("半成品客户编号")
    //    showDiv();
    //    return false;
   // }
    if (ProduceRate.length < 1) {
        $("#labtxt").html("请输入正确的生产备次")
        showDiv();
        return false;
    }
    if (FormatId.length<1) {
        $("#labtxt").html("请输入正确的订单格式")
        showDiv();
        return false;
    }
    if (_BaseWeight.length < 1) {
        $("#labtxt").html("请输入正确的基础重量")
        showDiv();
        return false;
    }
    if (LevelType.length < 1) {
        $("#labtxt").html("请选择一个Service Level")
        showDiv();
        return false;
    }
    //if (ArtworkColumnCount.length < 1) {
    //    $("#labtxt").html("请输入正确的画稿排摸数")
    //    showDiv();
    //    return false;
    //}
    if (SampleQty.length < 1) {
        $("#labtxt").html("请输入正确的留样单数量")
        showDiv();
        return false;
    }
    if (WorkShop.length < 1) {
        $("#labtxt").html("请选择一个生产车间类别")
        showDiv();
        return false;
    }
    //if (IsNeedArtwork != true) {
    //    $("#labtxt").html("请选择是否需要画稿")
    //    showDiv();
    //    return false;
    //}

     var data_ ={
             ProductCode: ProductCode,
         //ProductIsEnabled: ProductIsEnabled,
             Productstatus: Productstatus,
         //ProductCreatedDate:ProductCreatedDate,
         //ProductCreatedBy:ProductCreatedBy,
         //ProductModifiedDate:ProductModifiedDate,
         //ProductModifiedBy:ProductModifiedBy,
             BrandId: BrandId,
             IsUseCustVar: IsUseCustVar,
             ProductERPNO: ProductERPNO,
             ProductCustNO: ProductCustNO,
             MaximProdCate: MaximProdCate,
             ProductType: ProductType,
             IsCarelabelPlate:IsCarelabelPlate,
             BasePaperCode: BasePaperCode,
             BasePaperERPNO: BasePaperERPNO,
             BasePaperCustNO: BasePaperCustNO,
             OrderRate: OrderRate,
             ProduceRate: ProduceRate,
             Product_Width: Product_Width,
             Product_Height: Product_Height,
             BaseWeight: BaseWeight,
             LevelType: LevelType,
             ArtworkColumnCount: ArtworkColumnCount,
             SampleQty: SampleQty,
             IsSeqCIDProd: IsSeqCIDProd,
             PcsDoubleQty: PcsDoubleQty,
             IsNeedArtwork: IsNeedArtwork,
             PurchaseUnit: PurchaseUnit,
             ERPBeiKuUnit: ERPBeiKuUnit,
             ShowOrder: ShowOrder,
             WorkShop: WorkShop,
             Notes: Notes,
             FormatId:FormatId
    }

     return data_;
}