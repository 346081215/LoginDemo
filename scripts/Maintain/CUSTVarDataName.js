var html_zong = "";
var num = 1;


//窗体加载事件
$(function () {
    SelectAll();
});
//查询所有
function SelectAll() {
    var data_ = {
        pc: $("#pc").val(),
        BrandType: $("#BrandType").val(),
        FormatId: $("#FormatId").val()
    }
    $.post("/Maintain/SelectCUSTVarDataName_All", data_, function (data) {
        var html = "";
        if (data.Funstatus == "0") {
            alert("查询失败");
        }
        else {
            $.each(data.CUSTVarDataNameData, function (i, item) {
                html += "<tr>";
                html += "<td>" + item.seq + "</td>";
                html += "<td>" + item.BrandType + "</td>";
                html += "<td>" + item.FormatId + "</td>";
                html += "<td>" + "<a href=\"#\"  onclick='return xmldata(this);' value='" + item.BrandType + "~" + item.FormatId + "' >ViewXmlDataDetail</a>" + "</td>";
                html += " <td class=center><button type=button id=EditCUSTVarDataName name=EditCUSTVarDataName class='btn btn-default' onclick='funEditCUSTVarDataName(this)' value='" + item.BrandType + "^" + item.FormatId + "'>Edit</button>";
                html += "</tr>";
                $("#TotalPageCount").html(item.totalPgCount);
                $("#PageTotalCount").val(item.totalPgCount);
            });
            $("#CUSTVarDataNameDetail").html(html);
        }
    })
}

function xmldata(obj) {
    var _dataa = { "_data": obj.attributes["value"].value }
    debugger;
    $.ajax({
        url: "/Maintain/GetXmlCUSTVarDataName",
        type: "post",
        data: _dataa,
        dataType: "html"
    })
    .success(function (data) {
        $("#all").css("display", "none");
        $("#step2").css("display", "inline");
        $("#Results-ViewDetail").css("display", "block");
        $("#Results-ViewDetail").html(data);
    })
    .error(function (xhr, status) {
        $("#labtxt").html(status);
        showDiv();
    })
}

//新增界面的验证xml格式按钮
function xmldataTable() {
    if ($("#BrandType_add").val() == "" || $("#FormatId_add").val() == "") {
        alert("BrandType栏位和FormatId栏位不能为空");
        return false;
    }
    debugger;
    var _dataa = { "_data": $("#xmldata").val() };
   // $.ajax({
   //     url: "/Maintain/ValidateXML",
   //     type: "post",
   //     data: _dataa,
   //     dataType: "html"
   // })
   //.success(function (data) {
   //    $("#all").css("display", "none");
   //    $("#Results-ViewDetail_1").css("display", "block");
   //    $("#Results-ViewDetail_1").html(data);
   //})
   //.error(function (xhr, status) {
   //    alert("xml格式不正确");
   //    $("#Results-ViewDetail_1").css("display", "none");
   //    $("#labtxt").html(status);
   //    showDiv();
   //})
    $.post("/Maintain/ValidateXML", _dataa, function (data) {
        if (data.Funstatus == "0") {
            alert(data.ErrorCode);
        }
        else {
            $('#xmldata').attr('disabled', true);
            $("#all").css("display", "none");
            $("#Results-ViewDetail_1").css("display", "block");
            $("#Results-ViewDetail_1").html(data);
        }
    })
}
//点击CUSTVarDataName链接显示的样式
$("#step1").click(function () {
    $("#all").slideDown();
    $("#step2").css("display", "none");
    $("#step3").css("display", "none");
    $("#step4").css("display", "none");
    $("#insertCUSTVarDataName").css("display", "none");
    $("#updataCUSTVarDataName").css("display", "none");
    $("#Results-ViewDetail").css("display", "none");
})

//新增
function CreatenewCUSTVarDataName() {
    var xmldata = "<VarDataSet>\n<CUSTVar>\n<var0001></var0001>\n</CUSTVar>\n</VarDataSet>";
    $("#all").css("display", "none");
    $("#xmldata").val(xmldata);
    $("#xmldata").removeAttr("disabled");
    $("#insertCUSTVarDataName").slideDown();
    $("#Results-ViewDetail").css("display", "none");
    $("#step3").css("display", "inline");
}
var excludeSpecial = function (s) {
    // 去掉转义字符    
    s = s.replace(/[\'\"\\\b\f\n\r\t]/g, '');
    return s;
    // 去掉特殊字符    
    //s = s.replace(/[\@\#\$\%\^\&\*\{\}\:\"\L\<\>\? ]/);
}
//保存按钮
function funSaveCUSTVarDataName() {
    //this.encodeHtml = $("#xmldata").text();
    var xmldata1 = excludeSpecial($("#xmldata").val());
    var XMLData = encodeURIComponent(xmldata1);
    //alert(XMLData);
    debugger;
    if ($("#BrandType_add").val() == "" || $("#FormatId_add").val() == "") {
        alert("BrandType栏位和FormatId栏位不能为空");
    }
    else {
        var o = document.getElementById("Results-ViewDetail_1").style.display;
        if (o == "none") //已经是隐藏状态{
        {
            alert("请点击验证xml格式按钮，判断xml文件格式是否正确。。。");
            return false;
        }
        
        var data = {
            BrandType: $("#BrandType_add").val(),
            FormatId: $("#FormatId_add").val(),
            XMLData: XMLData
        };
        debugger;
        $.post("/Maintain/InsertCUSTVarDataName", data, function (_data) {
            if (_data.Funstatus == "0") {
                alert(_data.msg);
            }
            else {
                alert("添加成功！");
                $("#all").slideDown();
                $("#insertCUSTVarDataName").css("display", "none");
                $("#updataCUSTVarDataName").css("display", "none");
                $("#step1").css("display", "inline");
                $("#step3").css("display", "none");
            }
            SelectAll();
        })
    }
}
//更新传值（Edit按钮）
function funEditCUSTVarDataName(id) {
    $("#xmldata_u").removeAttr("disabled");
    $("#all").css("display", "none");
    $("#step4").css("display", "inline");
    $("#insertCUSTVarDataName").css("display", "none");
    $("#updataCUSTVarDataName").slideDown();
    $("#EditDetailID_U").val(id.value);
    var arr = id.value.split("^");
    var BrandType = arr[0];
    var FormatId = arr[1];
    var data_ = {
        BrandType: BrandType,
        FormatId: FormatId
    }
    debugger;

    $.post("/Maintain/UpdateCUSTVarDataName_sel", data_, function (data) {
        if (data.Funstatus == "0") {
            alert(data.ErrorCode);
        }
        else {
            var item = data.CUSTVarDataNameData;
            $("#BrandType_u").val(item.BrandType);
            $("#FormatId_u").val(item.FormatId);
            $("#xmldata_u").val(item.XMLData);
        }
        SelectAll();
    })
}
//更新界面的验证xml格式按钮
function funConfirmxml_up() {
    if ($("#BrandType_u").val() == "" || $("#FormatId_u").val() == "") {
        alert("BrandType栏位和FormatId栏位不能为空");
        return false;
    }
   // debugger;
    var _dataa = { "_data": $("#xmldata_u").val() };
   // $.ajax({
   //     url: "/Maintain/ValidateXML",
   //     type: "post",
   //     data: _dataa,
   //     dataType: "html"
   // })
   //.success(function (data) {
   //    $("#all").css("display", "none");
   //    $("#Results-ViewDetail_11").css("display", "block");
   //    $("#Results-ViewDetail_11").html(data);
   //})
   //.error(function (xhr, status) {
   //    alert("xml格式不正确");
   //    $("#labtxt").html(data.status);
   //    showDiv();
   //})
    $.post("/Maintain/ValidateXML", _dataa, function (data) {
        if (data.Funstatus == "0")
        {
            alert(data.ErrorCode);
        }
        else {
              $('#xmldata_u').attr('disabled', true);
              $("#all").css("display", "none");
              $("#Results-ViewDetail_11").css("display", "block");
              $("#Results-ViewDetail_11").html(data);
        }
    })
}

//更新的保存操作
function funSaveCUSTVarDataName_u() {
    var obj = $("#EditDetailID_U").val();
    var xmldata1 = excludeSpecial($("#xmldata_u").val());
    debugger;
    var XMLData = encodeURIComponent(xmldata1);
    var o = document.getElementById("Results-ViewDetail_11").style.display;
    if (o == "none") //已经是隐藏状态{
    {
        alert("请点击验证xml格式按钮，判断xml文件格式是否正确。。。");
        return false;
    }
    debugger;
    funConfirmxml_up();
    var arr = obj.split("^");
    var BrandType = arr[0];
    var FormatId = arr[1];
    var ID = arr[2];
    var data_ = {
        BrandType: BrandType,
        FormatId: FormatId,
        XMLData: XMLData
    };

    $.post("/Maintain/UpdateCUSTVarDataName_up", data_, function (data) {
        if (data.Funstatus == "0") {
            alert(data.msg);
        }
        else {
            alert("更新成功");
            $("#all").slideDown();
            $("#xmldata_u").val("");
            $("#insertCUSTVarDataName").css("display", "none");
            $("#updataCUSTVarDataName").css("display", "none");
            $("#Results-ViewDetail_11").css("display", "none");
            $("#step1").css("display", "inline");
            $("#step4").css("display", "none");
        }
        SelectAll();
    })
}

//返回上一界面
function ReturnIndex() {
    $("#all").slideDown();
    $("#insertCUSTVarDataName").css("display", "none");
    $("#updataCUSTVarDataName").css("display", "none");
    //$("#BrandType_add").val("");
    $("#BrandType_u").val("");
    $("#FormatId_add").val("");
    $("#FormatId_u").val("");
    $("#xmldata").val("");
    $("#Results-ViewDetail_1").css("display", "none");
    $("#Results-ViewDetail_11").css("display", "none");
    $("#step4").css("display", "none");
    $("#step3").css("display", "none");
    $("#xmldata_u").removeAttr("disabled");
}
//分页
$('#PageIndex').click(function () {
    //给文本框赋值都为1
    document.getElementById("pc").value = 1;
    document.getElementById("nowpage").value = 1;
    SelectAll();
});
//向上一个页翻
$('#Pageup').click(function () {
    //首先获取当前输入文本框的值
    var nowpage = document.getElementById("nowpage").value;
    //parseInt() 函数可解析一个字符串，并返回一个整数。（也就是输入的内容必须是数字）
    var newpage = parseInt(nowpage);
    if (parseInt(nowpage) > 1) {
        newpage = parseInt(nowpage) - 1;
        document.getElementById("pc").value = newpage;
        document.getElementById("nowpage").value = newpage;
        SelectAll();
    }
});
//向下一个页翻
$('#Pagewown').click(function () {
    var nowpage = document.getElementById("nowpage").value;
    var maxpage = parseInt(document.getElementById("PageTotalCount").value);
    var newpage = parseInt(nowpage);
    //判断，如果输入的文本框的值小于最大的页数 2 3 2<3 3=2+1
    if (parseInt(nowpage) < maxpage) { newpage = parseInt(nowpage) + 1 };
    document.getElementById("pc").value = newpage;
    document.getElementById("nowpage").value = newpage;
    SelectAll();
});
//翻到最后
$('#PageLast').click(function () {
    var maxpage = parseInt(document.getElementById("PageTotalCount").value);
    document.getElementById("pc").value = maxpage;
    document.getElementById("nowpage").value = maxpage;
    SelectAll();
});
$('#PageGO').click(function () {
    var nowpage = parseInt(document.getElementById("nowpage").value);
    var maxpage = parseInt(document.getElementById("PageTotalCount").value) + 1;
    if (nowpage > 0 && nowpage < maxpage) {
        document.getElementById("pc").value = document.getElementById("nowpage").value;
        SelectAll();
    }
    else {

        $("#labtxt").html("wrong page no.");
        showDiv();
        document.getElementById("nowpage").value = 1;
    }
});
$("#nowpage").keyup(function () {
    var t = $("#nowpage").val();
    //判断是否是数字
    if (isNaN(t)) {
        $("#labtxt").html("wrong page no.");
        showDiv();
        document.getElementById("nowpage").value = 1;
    }
});