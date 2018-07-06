$(function ()
{   //查询所有
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
    $("#btnBack").click(function ()
    {
        $("#CrateEdit").css("display", "none");
       
    });
});
function GetAll()
{
    var QueryData =
       {
           Page: document.getElementById("nowpage").value
       }
    $.post("/Maintain/CarelabelPlateSettingAll", QueryData, function (data)
    {
        var html = "";
        if (data)
        {
            $.each(data, function (i, item) {
                html += "<tr>";
                html += "<td class='center'>" + item.Number + "</td>";
                html += "<td class='center'>" + item.Name + "</td>";
                html += "<td class='center'>" + item.TechnologyTypeName + "</td>";
                html += "<td class='center'>" + item.PageWidth + "</td>";
                html += "<td class='center'>" + item.PageHeight + "</td>";
                html += "<td class='center'>" + item.PaperType + "</td>";
                html += "<td class='center'>" + item.ImpositionTypeName + "</td>";
                html += "<td class='center'>" + item.MarginLeft + "</td>";
                html += "<td class='center'>" + item.MarginRight + "</td>";
                html += "<td class='center'>" + item.MarginTop + "</td>";
                html += "<td class='center'>" + item.MarginBottom + "</td>";
                html += "<td class='center'>" + item.Rows + "</td>";
                html += "<td class='center'>" + item.Columns + "</td>";
                html += "<td class='center'>" + item.HorizontalGap + "</td>";
                html += "<td class='center'>" + item.VerticalGap + "</td>";
                html += "<td class='center'>" + item.Rotation + "</td>";
                html += "<td class='center'>" + item.Info + "</td>";
                html += "<td class='center'>" + item.ShowInfo + "</td>";
                html += "<td class='center'>" + item.SortTypeName + "</td>";
                html += "<td class='center'>" + item.ItemMode + "</td>";
                html += "<td class='center'>" + item.DescriptionPosition + "</td>";
                html += "<td class='center'><button type=button id=Edit name=Edit class='btn btn-default' onclick='return funcEdit(this)' value='" + item.Id + "'>Edit</button></td>";
            });
            $("#OrderDetail tbody").html(html);
            $("#TotalPageCount").html(data[0]["TotalPageCount"]);
            $("#PageTotalCount").val(data[0]["TotalPageCount"]);
        }
       
    });
}
function funcEdit(obj)
{
    Id = obj.value;
    $("#btnSave").val(Id);
    $.post("/Maintain/EditCarelabelPlateSetting",Id, function (data)
    {
        if (data.FunStatus = "success")
        {

            $("#txtTemplateNo").val(data.Number);
            $("#txtTemplateName").val(data.Name);
            if (data.TechnologyTypeName == "1")
            {
                $(":radio[id='rblType_0'][value='" + true + "']").prop("checked", "checked");
            }
            else
            {
                $(":radio[id='rblType_1'][value='" + false + "']").prop("checked", "checked");
            }
            if (data.PaperType == "1")
            {
                $(":radio[id='rblPaperType_0'][value='" + true + "']").prop("checked", "checked");
            }
            else
            {
                $(":radio[id='rblPaperType_1'][value='" + false + "']").prop("checked", "checked");
            }
            if (data.Rotation == "")
            {
                $("#ddlRotation").val("0");
            }
            else
            {
                $("#ddlRotation").val(data.Rotation);
            }

              




            $("#txtPageWidth").val(data.PageWidth);
            $("#txtPageHeight").val(data.PageHeight);

            if (data.AutoHeight == "True")
         {
             $("#cbAutoHeight").prop("checked", true);
         }
         else {
                         $("#cbAutoHeight").prop("checked", false);
            }
            debugger;
            if (data.ImpositionTypeName == "1")
            {
                $(":radio[id='rblImpositionType_0'][value='" + true + "']").prop("checked", "checked");
            }
            else {
                            $(":radio[id='rblImpositionType_1'][value='" + false + "']").prop("checked", "checked");
            }
            $("#txtMarginLeft").val(data.MarginLeft);
            $("#txtMarginRight").val(data.MarginRight);
            $("#txtMarginTop").val(data.MarginTop);
            $("#txtMarginBottom").val(data.MarginBottom);
            $("#txtRows").val(data.Rows);
            $("#txtColumns").val(data.Columns);
            $("#txtHorizontalGap").val(data.HorizontalGap);
            $("#txtVerticalGap").val(data.VerticalGap);
            $("#txtTemplateInfo").val(data.Info);
            if (data.ShowInfo == "True")
            {
                $("#cbShowInfo").prop("checked", true);
            }
            else {
                            $("#cbShowInfo").prop("checked", false);
            }
            if (data.SortTypeName =="1")
            {
                $(":radio[id='rblSortType_0'][value='" +1 + "']").prop("checked", "checked");
            }
            else if (data.SortTypeName == "2")
            {
                $(":radio[id='rblSortType_1'][value='" +2 + "']").prop("checked", "checked");
            }
            else if (data.SortTypeName == "3")
            {
                $(":radio[id='rblSortType_2'][value='" +3 + "']").prop("checked", "checked");
            }

            if (data.ItemMode == "1") {
                $(":radio[id='rblItemMode_0'][value='" +1 + "']").prop("checked", "checked");
            }
            else if (data.ItemMode == "2") {
                $(":radio[id='rblItemMode_1'][value='" +2 + "']").prop("checked", "checked");
            }
            else if (data.ItemMode == "3") {
                $(":radio[id='rblItemMode_2'][value='" +3 + "']").prop("checked", "checked");
            }

            if (data.DescriptionPosition == "1") {
                $(":radio[id='rblDescriptionPosition_0'][value='" +1 + "']").prop("checked", "checked");
            }
            else if (data.DescriptionPosition == "2") {
                $(":radio[id='rblDescriptionPosition_1'][value='" +2 + "']").prop("checked", "checked");
            }
            else if (data.DescriptionPosition == "4") {
                $(":radio[id='rblDescriptionPosition_2'][value='" +4 + "']").prop("checked", "checked");
            }
            else if (data.DescriptionPosition == "8") {
                $(":radio[id='rblDescriptionPosition_3'][value='" +8 + "']").prop("checked", "checked");
            }

            $("#CrateEdit").css("display", "block");
            }
            else
                {
                    $("#labtxt").html(data.FunStatus);
            showDiv();
            return false;
        }
    });
}
function funcSave(obj)
{
    txtTemplateName = $("#txtTemplateName").val();
    if (txtTemplateName == "")
    {
        $("#labtxt").html("版号名称不能为空.");
        showDiv();
        return false;
    }
    txtPageWidth = $("#txtPageWidth").val();
    if (txtPageWidth == "")
    {
        $("#labtxt").html("宽度不能为空.");
        showDiv();
        return false;
    }
    txtPageHeight = $("#txtPageHeight").val();
    if (txtPageHeight == "") {
        $("#labtxt").html("高度不能为空.");
        showDiv();
        return false;
    }
    txtMarginLeft = $("#txtMarginLeft").val();
    if (txtMarginLeft == "") {
        $("#labtxt").html("左边距不能为空.");
        showDiv();
        return false;
    }
    txtMarginTop = $("#txtMarginTop").val();
    if (txtMarginTop == "") {
        $("#labtxt").html("上边距不能为空.");
        showDiv();
        return false;
    }
    txtMarginBottom = $("#txtMarginBottom").val();
    if (txtMarginBottom == "") {
        $("#labtxt").html("下边距不能为空.");
        showDiv();
        return false;
    }

    var cbAutoHeight = true;
    var cbShowInfo = true;
    if ($('#cbAutoHeight').is(':checked'))
    {
        cbAutoHeight = true;
    }
    else
    {
        cbAutoHeight = false;
    }
    if ($("#cbShowInfo").is(':checked'))
    {
        cbShowInfo = true;
    }
    else
    {
        cbShowInfo = false;
    }

    Id = obj.value;
    var urlPost = "/Maintain/SaveCarelabelPlateSetting?ID=" + Id + "&cbAutoHeight=" + cbAutoHeight + "&cbShowInfo="+cbShowInfo+"";
    $.post(urlPost, encodeURIComponent($("form").serialize()), function (data, status)
    {
    
        if (data.FunStatus == "success")
        {
            $("#labtxt").html("success");
            showDiv();
            $("#CrateEdit").css("display", "none");
            GetAll();
            return;
        }
        else
        {
            $("#labtxt").html(data.FunStatus);
            showDiv();
            return false;
        }
    });
}
function funcAdd()
{
    $("#CrateEdit").css("display", "block");
    //重置所有值
    $("#txtTemplateNo").val("");
    $("#txtTemplateName").val("");
    $(":radio[id='rblType_0'][value='" + true + "']").prop("checked", "checked");
    $(":radio[id='rblPaperType_0'][value='" + true + "']").prop("checked", "checked");
    $("#txtPageWidth").val("");
    $("#txtPageHeight").val("");
    $("#cbAutoHeight").prop("checked", false);
    $(":radio[id='rblImpositionType_0'][value='" + true + "']").prop("checked", "checked");
    $("#txtMarginLeft").val("");
    $("#txtMarginRight").val("");
    $("#txtMarginTop").val("");
    $("#txtMarginBottom").val("");
    $("#txtRows").val("");
    $("#txtColumns").val("");
    $("#txtHorizontalGap").val("");
    $("#txtVerticalGap").val("");
    $("#txtTemplateInfo").val("");
    $("#cbShowInfo").prop("checked", false);
    $(":radio[id='rblSortType_0'][value='" + 1 + "']").prop("checked", "checked");
    $(":radio[id='rblDescriptionPosition_0'][value='" + 1 + "']").prop("checked", "checked");
    $(":radio[id='rblItemMode_0'][value='" + 1 + "']").prop("checked", "checked");
    $("#ddlRotation").val("0");
    $.post("/Maintain/NewNumber", '', function (data)
    {

        if (data.FunStatus == "success")
        {
            debugger;
            $("#txtTemplateNo").val(data.data.Number);
            $("#btnSave").val("AddNew");
        }
        else
        {
            $("#labtxt").html(data.FunStatus);
            showDiv();
            return false;

        }
    })
}
