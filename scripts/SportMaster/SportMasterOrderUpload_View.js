$(function () {
    $('input[id=UploadFile]').change(function () {
        $('#photoCover').val($(this).val());
    });
    //页面上传单击事件
    $("#btnUpload").click(

    UpOrderLoad)

    $("#step").click(function () {
        $("#Query").slideDown();
        $("#step1").css("display", "none");
        $("#step").removeClass('gray-em');
        $("#step").addClass('red-em');
        $("#step1").css("display", "none");
        $("#step2").css("display", "none");
        $("#step3").removeClass("red-em");
        $("#step3").addClass("gray-em");
        $("#step3").css("display", "none");
        $("#Query-Results").css("display", "none");

    });
    $("#Confirm").click(Confirm_)
})
//客户确认
function Confirm_() {
    debugger;
    $.ajax({
        url: '/SportMaster/Confirm',
        type: 'post',
        success: function (data) {
            alert(data);
        }

    })

    //$.ajax({
    //    url: '/Maintain/RemoveOnlinenum',
    //    data: { "UserID": UserID },
    //    type: 'post',
    //    dataType: "json",
    //    success: function (data) {
    //        if (data == 1) {
    //            alert("下线成功！");
    //            ChagePage(1);
    //        } else if (data == -1) {
    //            alert("请检查是否点击的是自己...");
    //        }
    //    }
    //})
}
function excludeSpecial(s) {
    // 去掉转义字符    
    //s = s.replace(/[\'\"\\\b\f\n\r\t]/g, '');
    s = s.replace(/[\\\b\f\n\r\t]/g, '');
    return s;
    // 去掉特殊字符    
    //s = s.replace(/[\@\#\$\%\^\&\*\{\}\:\"\L\<\>\? ]/);
}
function UpOrderLoad() {
    //
    debugger;
    if ($("#UploadFile").val() == "") {
        alert("您还未选择文件呢");
    } else {



        $("#form1").ajaxSubmit({
            success: function (res) {
                debugger
                var reg = /<pre.+?>(.+)<\/pre>/g;
                res.match(reg);
                res = RegExp.$1;
                var obj = jQuery.parseJSON(res);
                //var re = excludeSpecial(obj);
                debugger;
                var html = "";
                $.each(obj, function (i, item) {
                    html += "<tr>";
                    html += "<th class='center'>" + (parseInt(i) + parseInt(1)) + "</th>";
                    html += "<th class='center'>" + item.Collection + "</th>";
                    html += "<th class='center'>" + item.Vendor_ID + "</th>";
                    html += "<th class='center'>" + item.PPO_No + "</th>";
                    html += "<th class='center'>" + item.Start_Ship_Date + "</th>";
                    html += "<th class='center'>" + item.Recommended_Releasing_Date + "</th>";
                    html += "<th class='center'>" + item.Brand + "</th>";
                    html += "<th class='center'>" + item.Label_ID + "</th>";
                    // html += "<th class='center'>" + item.MP_QTY + "</th>";
                    html += "<th class='center'>" + item.Barcode + "</th>";
                    html += "<th class='center'>" + item.Style + "</th>";
                    html += "<th class='center'>" + item.Color + "</th>";
                    // html += "<th class='center'>" + item.Size + "</th>";
                    // html += "<th class='center'>" + item.Add_Size + "</th>";
                    html += "<th class='center'>" + item.Code_TD + "</th>";
                    //html += "<th class='center'>" + item.Size_RU + "</th>";
                    //html += "<th class='center'>" + item.Country_Of_Origin_EN + "</th>";
                    //html += "<th class='center'>" + item.Country_Of_Origin_RU + "</th>";
                    //html += "<th class='center'>" + item.Country_Of_Origin_CN + "</th>";
                    //html += "<th class='center'>" + item.Manufacturing_Date + "</th>";
                    //html += "<th class='center'>" + item.Certification_System + "</th>";
                    //html += "<th class='center'>" + item.Logistic_Name_RU + "</th>";
                    //html += "<th class='center'>" + item.Composition_EN + "</th>";
                    //html += "<th class='center'>" + item.Composition_RU + "</th>";
                    //html += "<th class='center'>" + item.Composition_CN + "</th>";
                    //html += "<th class='center'>" + item.Washing_Instructions_EN + "</th>";
                    //html += "<th class='center'>" + item.Washing_Instructions_RU + "</th>";
                    //html += "<th class='center'>" + item.Washing_Instructions_CN + "</th>";
                    //html += "<th class='center'>" + item.Additional_Care_EN + "</th>";
                    //html += "<th class='center'>" + item.Additional_Care_RU + "</th>";
                    //html += "<th class='center'>" + item.Additional_Care_CN + "</th>";
                    //html += "<th class='center'>" + item.Pile_Mass_Of_the_Down_CN + "</th>";
                    //html += "<th class='center'>" + item.Supplier_Name + "</th>";
                    //html += "<th class='center'>" + item.Supplier_Address + "</th>";
                    //html += "<th class='center'>" + item.Specific_Of_Product + "</th>";
                    //html += "<th class='center'>" + item.Comment_RU + "</th>";
                    html += "<th class='center'>" + item.Original_Qty + "</th>";
                    //html += "<th class='center'>" + item.Developer + "</th>";
                    //html += "<th class='center'>" + item.Business_Supplier + "</th>";
                    //html += "<th class='center'>" + item.Factory + "</th>";
                    //html += "<th class='center'>" + item.Origin + "</th>";
                    //html += "<th class='center'>" + item.Destination + "</th>";
                    //html += "<th class='center'>" + item.Product_Manager + "</th>";
                    //html += "<th class='center'>" + item.Brand_Manager + "</th>";
                    html += "</tr>";
                })
                debugger;
                $("#step").removeClass('red-em');
                $("#step").addClass('gray-em');
                $("#step1").removeClass('gray-em');
                $("#step1").addClass('red-em');
                $("#step1").removeAttr("style");

                $("#Query").css("display", "none");
                $("#OrderDetail tbody").html(html);
                //$("#OrderDetail tbody").slideDown();
                $("#Query-Results").slideDown();
                //$("#OrderDetail tbody").slideDown();

                //alert(res);
            }
        })
    }
}

