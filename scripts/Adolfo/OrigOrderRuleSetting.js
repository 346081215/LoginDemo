$(function () {
    //默认不显示文本框
    $("#Insert").css("display", "none");
    //下拉框
    ddlCheckTheCategories();
    ddlRuleType();
    //分页，默认第一页
    $("#nowpage").val(1);
    $("#pc").val(1);


    $("#btnSearch").click(
        function () {
            funSelectOridOrderRuleSetting();
        }
        );
    $("#Upload").click(function () {
        if ($("#file").val() == "") {
            alert("您还未选择文件呢");
        } else {
            $("#form1").ajaxSubmit({
                success: function (res) {
                    alert(res);
                }
            })
        }


    });


    //添加
    $("#btn_Add").click(function () {
        var data_ = {
            //Id: $("#Id").val(),
            FormatId: $("#FormatIdd").val(),
            RootTypeID: $("#RootTypeID").val(),
            YSeedID: $("#YSeedID").val(),
            NSeedID: $("#NSeedID").val(),
            TableMold: $("#TableMold").val(),
            Condition: $("#Condition").val(),
            CheckTheCategories: $("#CheckTheCategories").val(),
            Field: $("#Fieldd").val(),
            FieldValue: $("#FieldValuee").val(),
            Expression: $("#Expressionn").val(),
            ReportAnError: $("#ReportAnError").val(),
            ReportAnErrorName: $("#ReportAnErrorName").val(),
            ComparisonTable: $("#ComparisonTablee").val(),
            ComparisonTableCounmt: $("#ComparisonTableCounmt").val(),
            RuleType: $("#RuleType").val(),
            Note: $("#Note").val(),
            IsEnabled: $("#IsEnabled").val()
        }
        debugger;
        if ($("#FormatIdd").val() == "") {
            alert('FormatId不能为空');
        }
        else if (data_.RootTypeID.replace(/(^s*)|(s*$)/g, "").length == "") {
            alert('RootTypeID不能为空');
        }
        else if (data_.YSeedID.replace(/(^s*)|(s*$)/g, "").length != "" && !(/^(0|[1-9]\d*)$/.test(data_.YSeedID))) {
            alert("YSeedID必须是数字");
        }
        else if (data_.NSeedID.replace(/(^s*)|(s*$)/g, "").length != "" && !(/^(0|[1-9]\d*)$/.test(data_.NSeedID))) {
            alert("NSeedID必须是数字");
        }
        else if (data_.TableMold.replace(/(^s*)|(s*$)/g, "").length == "") {
            alert('TableMold不能为空(可以填写默认值FileOrigOrderDetail)');
        }
        else if ($("#RootTypeID").val() != "0" && $("#RootTypeID").val() != "1") {
            alert('RootTypeID必须为0或1');
        }
        else if (data_.CheckTheCategories.replace(/(^s*)|(s*$)/g, "").length == "") {
            alert('CheckTheCategories不能为空');
        }
        else if (data_.Field.replace(/(^s*)|(s*$)/g, "").length == "") {
            alert('Field不能为空');
        }
        else if (data_.RuleType.replace(/(^s*)|(s*$)/g, "").length == "") {
            alert('RuleType不能为空');
        }
        else if ($("#IsEnabled").val() == "--All--") {
            alert('IsEnabled不能为空');
        }
        else if ($("#CheckTheCategories").val() == "1 判断值是否正确" && data_.ReportAnError.replace(/(^s*)|(s*$)/g, "").length == "") {
            alert('ReportAnError不能为空');
        }
        else if ($("#CheckTheCategories").val() == "1 判断值是否正确" && data_.ReportAnErrorName.replace(/(^s*)|(s*$)/g, "").length == "") {
            alert('ReportAnErrorName不能为空');
        }
        else {
            funAddOrigOrderRuleSetting();
        }
    });

    //修改
    $("#btn_Edit").click(function () {
        var data_ = {
            //Id: $("#Id").val(),
            FormatId: $("#FormatIdd").val(),
            RootTypeID: $("#RootTypeID").val(),
            YSeedID: $("#YSeedID").val(),
            NSeedID: $("#NSeedID").val(),
            TableMold: $("#TableMold").val(),
            Condition: $("#Condition").val(),
            CheckTheCategories: $("#CheckTheCategories").val(),
            Field: $("#Fieldd").val(),
            FieldValue: $("#FieldValuee").val(),
            Expression: $("#Expressionn").val(),
            ReportAnError: $("#ReportAnError").val(),
            ReportAnErrorName: $("#ReportAnErrorName").val(),
            ComparisonTable: $("#ComparisonTablee").val(),
            ComparisonTableCounmt: $("#ComparisonTableCounmt").val(),
            RuleType: $("#RuleType").val(),
            Note: $("#Note").val(),
            IsEnabled: $("#IsEnabled").val()
        }
        if ($("#FormatIdd").val() == "") {
            alert('FormatId不能为空');
        }
        else if (data_.RootTypeID.replace(/(^s*)|(s*$)/g, "").length == "") {
            alert('RootTypeID不能为空');
        }
        else if (data_.YSeedID.replace(/(^s*)|(s*$)/g, "").length != "" && !(/(^[1-9]\d*$)/.test(data_.YSeedID))) {
            alert("YSeedID必须是数字");
        }
        else if (data_.NSeedID.replace(/(^s*)|(s*$)/g, "").length != "" && !(/(^[1-9]\d*$)/.test(data_.NSeedID))) {
            alert("NSeedID必须是数字");
        }
        else if (data_.TableMold.replace(/(^s*)|(s*$)/g, "").length == "") {
            alert('TableMold不能为空(可以填写默认值FileOrigOrderDetail)');
        }
        else if ($("#RootTypeID").val() != "0" && $("#RootTypeID").val() != "1") {
            alert('RootTypeID必须为0或1');
        }
        else if (data_.CheckTheCategories.replace(/(^s*)|(s*$)/g, "").length == "") {
            alert('CheckTheCategories不能为空');
        }
        else if (data_.Field.replace(/(^s*)|(s*$)/g, "").length == "") {
            alert('Field不能为空');
        }
        else if (data_.RuleType.replace(/(^s*)|(s*$)/g, "").length == "") {
            alert('RuleType不能为空');
        }
        else if ($("#IsEnabled").val() == "--All--") {
            alert('IsEnabled不能为空');
        }
        else if ($("#CheckTheCategories").val() == "1 判断值是否正确" && data_.ReportAnError.replace(/(^s*)|(s*$)/g, "").length == "") {
            alert('ReportAnError不能为空');
        }
        else if ($("#CheckTheCategories").val() == "1 判断值是否正确" && data_.ReportAnErrorName.replace(/(^s*)|(s*$)/g, "").length == "") {
            alert('ReportAnErrorName不能为空');
        }
        else {
            funEditOridOrderRuleSetting();
        }
    });


    $('#PageIndex').click(function () {
        document.getElementById("pc").value = 1;
        document.getElementById("nowpage").value = 1;
        funSelectOridOrderRuleSetting();
    });
    $('#Pageup').click(function () {
        var nowpage = document.getElementById("nowpage").value;
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) > 1) {
            newpage = parseInt(nowpage) - 1;
            document.getElementById("pc").value = newpage;
            document.getElementById("nowpage").value = newpage;
            funSelectOridOrderRuleSetting();
        }
    });
    $('#Pagewown').click(function () {
        var nowpage = document.getElementById("nowpage").value;
        var maxpage = parseInt(document.getElementById("PageTotalCount").value);
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) < maxpage) newpage = parseInt(nowpage) + 1;
        document.getElementById("pc").value = newpage;
        document.getElementById("nowpage").value = newpage;
        funSelectOridOrderRuleSetting();
    });
    $('#PageLast').click(function () {
        var maxpage = parseInt(document.getElementById("PageTotalCount").value);
        document.getElementById("pc").value = maxpage;
        document.getElementById("nowpage").value = maxpage;
        funSelectOridOrderRuleSetting();
    });
    $('#PageGO').click(function () {
        var nowpage = parseInt(document.getElementById("nowpage").value);
        var maxpage = parseInt(document.getElementById("PageTotalCount").value) + 1;
        if (nowpage > 0 && nowpage < maxpage) {
            document.getElementById("pc").value = document.getElementById("nowpage").value;
            funSelectOridOrderRuleSetting();
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

function getPath(obj) {
    if (obj) {
        if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
            obj.select(); return document.selection.createRange().text;
        }
        else if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
            if (obj.files) {
                return obj.files.item(0).getAsDataURL();
            }
            return obj.value;
        }
        return obj.value;
    }
}


//查询
function funSelectOridOrderRuleSetting() {
    var data_ = {
        pc: $("#pc").val(),
        FormatId: $("#FormatId").val(),
        Field: $("#Field").val(),
        FieldValue: $("#FieldValue").val(),
        Expression: $("#Expression").val(),
        ComparisonTable: $("#Tableid").val(),
        RuleType: $("#RuleTypeCX").val()
    }


    $.post("/Adolfo/OrigOrderRuleSettingPost", data_, function (data) {
        var html = "";
        $.each(data, function (i, item) {
            html += "<tr>";
            html += "<td class='center'>" + "<button type='button' id='Update' name='Update' class='btn btn-default' onclick='funSelectOrigOrderRuleSettingId(" + item.Id + ")' >Edit</button>" + "</td>";
            html += "<td class='center'>" + item.Id + "</td>";
            html += "<td class='center'>" + item.FormatId + "</td>";
            html += "<td class='center'>" + item.RootTypeID + "</td>";
            html += "<td class='center'>" + item.YSeedID + "</td>";
            html += "<td class='center'>" + item.NSeedID + "</td>";
            html += "<td class='center'>" + item.TableMold + "</td>";
            html += "<td class='center'>" + item.Condition + "</td>";
            html += "<td class='center'>" + item.CheckTheCategories + "</td>";
            html += "<td class='center'>" + item.Field + "</td>";
            html += "<td class='center'>" + item.FieldValue + "</td>";
            html += "<td class='center'>" + item.Expression + "</td>";
            html += "<td class='center'>" + item.ReportAnError + "</td>";
            html += "<td class='center'>" + item.ReportAnErrorName + "</td>";
            html += "<td class='center'>" + item.ComparisonTable + "</td>";
            html += "<td class='center'>" + item.ComparisonTableCounmt + "</td>";
            html += "<td class='center'>" + item.RuleType + "</td>";
            html += "<td class='center'>" + item.IsEnabled + "</td>";
            html += "<td class='center'>" + item.Note + "</td>";
            html += "</tr>";

            $("#TotalPageCount").html(item.CountId);
            $("#PageTotalCount").val(item.CountId);
        });
        $("#OrderDetail tbody.OrderDetail").html(html);
        $("#Query-Results").slideDown("slow");
        $("#Insert").css("display", "none");
    });
}

//添加
function funAdd() {
    $("#Insert").css("display", "block");
    $("#btn_Add").css("display", "block");
    $("#btn_Edit").css("display", "none");

    //添加之前先清空文本框中的值
    //$("#ID").val("");
    $("#FormatIdd").val("");
    $("#RootTypeID").val("");
    $("#YSeedID").val("");
    $("#NSeedID").val("");
    $("#TableMold").val("");
    $("#Condition").val("");
    $("#CheckTheCategories").val("");
    $("#Fieldd").val("");
    $("#FieldValue").val("");
    $("#Expression").val("");
    $("#ReportAnError").val("");
    $("#ReportAnErrorName").val("");
    $("#ComparisonTable").val("");
    $("#ComparisonTableCounmt").val("");
    $("#RuleType").val("");
    $("#Note").val("");
    $("#IsEnabled").val("--All--");
}
function funAddOrigOrderRuleSetting() {
    var data_ = {
        //Id: $("#Id").val(),
        FormatId: $("#FormatIdd").val(),
        RootTypeID: $("#RootTypeID").val(),
        YSeedID: $("#YSeedID").val(),
        NSeedID: $("#NSeedID").val(),
        TableMold: $("#TableMold").val(),
        Condition: $("#Condition").val(),
        CheckTheCategories: $("#CheckTheCategories").val(),
        Field: $("#Fieldd").val(),
        FieldValue: $("#FieldValuee").val(),
        Expression: $("#Expressionn").val(),
        ReportAnError: $("#ReportAnError").val(),
        ReportAnErrorName: $("#ReportAnErrorName").val(),
        ComparisonTable: $("#ComparisonTablee").val(),
        ComparisonTableCounmt: $("#ComparisonTableCounmt").val(),
        RuleType: $("#RuleType").val(),
        Note: $("#Note").val(),
        IsEnabled: $("#IsEnabled").val()
    }
    $.post("/Adolfo/OrigOrderRuleSettingAdd", data_, function (data) {
        debugger;
        if (data.SessionStaus == "true" && data.value == null) {
            alert("添加成功")
            funSelectOridOrderRuleSetting();
            $("#Insert").css("display", "none");
        } else {
            alert(data.value);
        }
    })

}

//绑定数据到文本框
function funSelectOrigOrderRuleSettingId(Id) {
    $("#Insert").css("display", "block");
    $("#btn_Add").css("display", "none");
    $("#btn_Edit").css("display", "block");

    $("#UpdateId").val(Id);
    var data = { ID: Id }

    $.post("/Adolfo/SelectOrigOrderRuleSettingId", data, function (data) {
        $.each(data, function (i, item) {
            $("#ID").val(Id);
            $("#RootTypeID").val(item.RootTypeID);
            //$("#FormatIdd").val(item.FormatId);
            var FormatId = item.FormatId;
            //$(".FormatIdd").find("option[text='"+FormatId+"']").attr("selected", true);
            $("#FormatIdd").val(FormatId);
            $("#YSeedID").val(item.YSeedID);
            $("#NSeedID").val(item.NSeedID);
            $("#TableMold").val(item.TableMold);
            $("#Condition").val(item.Condition);
            $("#CheckTheCategories").val(item.CheckTheCategories);
            $("#Fieldd").val(item.Field);
            $("#FieldValuee").val(item.FieldValue);
            $("#Expressionn").val(item.Expression);
            $("#ReportAnError").val(item.ReportAnError);
            $("#ReportAnErrorName").val(item.ReportAnErrorName);
            //$("#ComparisonTable").val(item.ComparisonTable);
            var ComparisonTable = item.ComparisonTable;
            $("#ComparisonTablee").val(ComparisonTable);
            //ComparisonTablee
            $("#ComparisonTableCounmt").val(item.ComparisonTableCounmt);
            $("#RuleType").val(item.RuleType);
            $("#IsEnabled").val(item.IsEnabled);
            $("#Note").val(item.Note);
        })
    })
}

//修改
function funEditOridOrderRuleSetting() {
    var data_ = {
        ID: $("#ID").val(),
        FormatId: $("#FormatIdd").val(),
        RootTypeID: $("#RootTypeID").val(),
        YSeedID: $("#YSeedID").val(),
        NSeedID: $("#NSeedID").val(),
        TableMold: $("#TableMold").val(),
        Condition: $("#Condition").val(),
        CheckTheCategories: $("#CheckTheCategories").val(),
        Field: $("#Fieldd").val(),
        FieldValue: $("#FieldValuee").val(),
        Expression: $("#Expressionn").val(),
        ReportAnError: $("#ReportAnError").val(),
        ReportAnErrorName: $("#ReportAnErrorName").val(),
        ComparisonTable: $("#ComparisonTablee").val(),
        ComparisonTableCounmt: $("#ComparisonTableCounmt").val(),
        RuleType: $("#RuleType").val(),
        Note: $("#Note").val(),
        IsEnabled: $("#IsEnabled").val()
    }
    $.post("/Adolfo/OrigOrderRuleSettingUpdate", data_, function (data) {
        debugger;
        if (data.SessionStaus == "true" && data.value == null) {
            funSelectOridOrderRuleSetting();
            $("#Insert").css("display", "none");
            alert("修改成功")
        } else {
            alert(data.value);
        }
    })

}

//下拉框CheckTheCategories
function ddlCheckTheCategories() {
    $.post("/Adolfo/OrigOrderRuleSettingCheckTheCategories", null, function (data) {
        var html = " <select><option class='center' value=''>--All--</option>";
        $.each(data, function (i, item) {
            html += "<select>";
            html += "<option class='center'>" + item.CheckTheCategories + " " + item.CheckTheCategoriesValues + "</option>";
            html += "</select>";
        });
        $("#CheckTheCategories").html(html);
    });
}

//下拉框RuleType
function ddlRuleType() {
    $.post("/Adolfo/OrigOrderRuleSettingRuleType", null, function (data) {
        var html = " <select><option class='center' value=''>--All--</option>";
        $.each(data, function (i, item) {
            html += "<select>";
            html += "<option class='center'>" + item.RuleType + " " + item.RuleTypeValues + "</option>";
            html += "</select>";
        });
        html += "</select>";
        $("#RuleType").html(html);
    });
}