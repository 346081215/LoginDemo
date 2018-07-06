$(function () {
    SelectAllC();
    SelectCountrybyName();
})

//查询所有
function SelectAllC() {
    var data_ = { pc: $("#pc").val() }
    $.post("/Maintain/CountryAll", data_, function (data) {
        var html="";
        if (data.Funstatue == "0") {
            alert("查询失败");
        }
        else {
            $.each(data.CountryInfo, function (i, item) {
                html += "<tr>"
                html += "<td>" + item.oos_countrycode + "</td>";
                html += "<td>" + item.oos_countryEName + "</td>";
                html += "<td>" + item.oos_countryCName + "</td>";
                html += "<td>" + item.TelephoneCode + "</td>";
                html += "<td>" + item.TimeDiff + "</td>";
                html += "<td>" + item.WithHoldTax + "</td>";
                html += "<td>" + item.IsEnabled + "</td>";
                html += "<td>" + item.ModifiedBy + "</td>";
                html += "<td>" + item.ModifiedOn + "</td>";
                html += "<td>" + item.Notes + "</td>";
                html += "<td>" + item.oos_countryFullname + "</td>";
                html += "<td>" + item.oos_countryMEname + "</td>";
                html += " <td class=center><button type=button id=EditSCompany name=EditSCompany class='btn btn-default' onclick='return funEditCountry(this)' value='" + item.oos_countrycode + "'>Edit</button><button type=button id=DeleteSCompany name=DeleteSCompany class='btn btn-default' onclick='return funDeleteCountry(this);' value='" + item.oos_countrycode + "'>Delete</button>"
                html += "</tr>";
                $("#TotalPageCount").html(item.totalPgCount);
                $("#PageTotalCount").val(item.totalPgCount);
            })
            $("#CountryDetail").html(html);
        }
    })
}

//模糊查询
function SelectCountrybyName() {
    
    $.post("/Maintain/SelectCountryby", {name:$("#inputCountryname").val(),pc: $("#pc").val()}, function (data) {
        var html = "";
        if (data.Funstatue == "0") {
            alert("查询失败");
        }
        else {
            $.each(data.CountryInfo, function (i, item) {
                html += "<tr>"
                html += "<td>" + item.oos_countrycode + "</td>";
                html += "<td>" + item.oos_countryEName + "</td>";
                html += "<td>" + item.oos_countryCName + "</td>";
                html += "<td>" + item.TelephoneCode + "</td>";
                html += "<td>" + item.TimeDiff + "</td>";
                html += "<td>" + item.WithHoldTax + "</td>";
                html += "<td>" + item.IsEnabled + "</td>";
                html += "<td>" + item.ModifiedBy + "</td>";
                html += "<td>" + item.ModifiedOn + "</td>";
                html += "<td>" + item.Notes + "</td>";
                html += "<td>" + item.oos_countryFullname + "</td>";
                html += "<td>" + item.oos_countryMEname + "</td>";
                html += " <td class=center><button type=button id=EditCountry name=EditCountry class='btn btn-default' onclick='return funEditCountry(this)' value='" + item.oos_countrycode + "'>Edit</button><button type=button id=DeleteCountry name=DeleteCountry class='btn btn-default' onclick='return funDeleteCountry(this);' value='" + item.oos_countrycode + "'>Delete</button>"
                html += "</tr>";
                $("#TotalPageCount").html(item.totalPgCount);
                $("#PageTotalCount").val(item.totalPgCount);
            })
            $("#CountryDetail").html(html);
        }
    })
}
//实现页面隐藏
function CreatenewCountry() {
    $("#all").css("display", "none");
    $("#InsertCountry").slideDown();
    $("#UpdateCountry").css("display", "none");
}
//加载下拉框中的信息(oos_countryFullname)
function funUoos_countryFullname() {
    $.post("/Maintain/SelectCitem", null, function (data) {
        var html = "";
        if (data.Funstatue == "0") {
            alert("加载失败");
        }
        else {
            $.each(data.CountryInfo, function (i, item) {
                html += "<select>"
                html += "<option>" + item.oos_countryFullname + "</option>";
                html += "</select>";
            })
            $("#oos_countryFullname_u").html(html);
        }
    })
}

function ReturnIndex() {
    $("#all").slideDown();
    $("#InsertCountry").css("display", "none");
    $("#UpdateCountry").css("display", "none");
    SelectAllC();
    SelectCountrybyName();
    $("#oos_countrycode").val("");
    $("#oos_countryEName").val("");
    $("#oos_countryCName").val("");
    $("#TelephoneCode").val("");
    $("#Notes").val("");
    $("#oos_countryFullname").val("");
    $("#oos_countryMEname").val("");
}
//增加页面的保存按钮
function funSaveCountry() {
    if ($("#oos_countrycode").val() == "" || $("#oos_countryEName").val() == "" || $("#oos_countryCName").val() == "" || $("#oos_countryFullname").val() == "")
    {
        alert("oos_countrycode,oos_countryEName,oos_countryCName,oos_countryFullname等栏位不能为空");
    }
    else{
        var data = {
            oos_countrycode: $("#oos_countrycode").val(),
            oos_countryEName: $("#oos_countryEName").val(),
            oos_countryCName: $("#oos_countryCName").val(),
            TelephoneCode: $("#TelephoneCode").val(),
            Notes: $("#Notes").val(),
            oos_countryFullname: $("#oos_countryFullname").val(),
            oos_countryMEname: $("#oos_countryMEname").val()
            };
        $.post("/Maintain/InsertCountry", data, function (data_) {
            debugger;
            if (data_.Funstatus == "0") {
            alert(data_.msg);
        }
        else {
            alert("添加成功！");
            $("#oos_countrycode").val("");
            $("#oos_countryEName").val("");
            $("#oos_countryCName").val("");
            $("#TelephoneCode").val("");
            $("#Notes").val("");
            $("#oos_countryFullname").val("");
            $("#oos_countryMEname").val("");
            $("#all").slideDown();
            $("#InsertCountry").css("display", "none");
            $("#Updateinfo").css("display", "none");
            SelectAllC();
            SelectCountrybyName();
        }
    })
    }
}

//删除
function funDeleteCountry(obj) {
    var data_ = {
        oos_countrycode: obj.value
    }
    if (confirm("确认要删除？") == true)
    {
        $.post("/Maintain/DeleteCountry", data_, function (data) {
            debugger;
        if (data.Funstatus == "1") {
            alert("删除成功！");
            SelectCountrybyName();
            SelectAllC();
        }
        else {
            alert(data.ExCode);
        }
    })
    }
}

function ReturnIndex_u() {
    $("#all").slideDown();
    $("#InsertCountry").css("display", "none");
    $("#UpdateCountry").css("display", "none");
    SelectAllC();
    SelectCountrybyName();
}

//页面传值
function funEditCountry(id) {
    $("#all").css("display", "none");
    $("#InsertCountry").css("display", "none");
    $("#UpdateCountry").slideDown();
    $("#EditCountry_u").val(id.value);
    funUoos_countryFullname();
    
    $.post("/Maintain/UpdateCountry_Sel", { oos_countrycode:id.value}, function (data) {
        if (data.Funstatue == "0") {
            alert("页面传值失败！");
        }
        else {
            var item = data.CountryInfo;
            $("#oos_countryEName_u").val(item.oos_countryEName);
            $("#oos_countryCName_u").val(item.oos_countryCName);
            $("#TelephoneCode_u").val(item.TelephoneCode);
            $("#Notes_u").val(item.Notes);
            
            $("#oos_countryFullname_u").val(item.oos_countryFullname);
            $("#oos_countryMEname_u").val(item.oos_countryMEname);
            
        }
        SelectCountrybyName();
        SelectAllC();
    })
}
//修改
function funSaveCountry_u() {
    var data_Value = {
        oos_countrycode: $("#EditCountry_u").val(),
        oos_countryEName: $("#oos_countryEName_u").val(),
        oos_countryCName: $("#oos_countryCName_u").val(),
        TelephoneCode: $("#TelephoneCode_u").val(),
        Notes: $("#Notes_u").val(),
        oos_countryFullname: $("#oos_countryFullname_u").val(),
        oos_countryMEname: $("#oos_countryMEname_u").val()
    };
    $.post("/Maintain/UpdateCountry_Up", data_Value, function (data) {
        if (data.Funstatus == "0") {
            alert(data.msg);
        }
        else {
            alert("修改成功！");
            ReturnIndex();
        }
    })
}

//分页
$('#PageIndex').click(function () {
    document.getElementById("pc").value = 1;
    document.getElementById("nowpage").value = 1;
    SelectCountrybyName();
});
$('#Pageup').click(function () {
    var nowpage = document.getElementById("nowpage").value;
    var newpage = parseInt(nowpage);
    if (parseInt(nowpage) > 1) {
        newpage = parseInt(nowpage) - 1;
        document.getElementById("pc").value = newpage;
        document.getElementById("nowpage").value = newpage;
        SelectCountrybyName();
    }
});
$('#Pagewown').click(function () {
    var nowpage = document.getElementById("nowpage").value;
    var maxpage = parseInt(document.getElementById("PageTotalCount").value);
    var newpage = parseInt(nowpage);
    if (parseInt(nowpage) < maxpage) newpage = parseInt(nowpage) + 1;
    document.getElementById("pc").value = newpage;
    document.getElementById("nowpage").value = newpage;
    SelectCountrybyName();
});
$('#PageLast').click(function () {
    var maxpage = parseInt(document.getElementById("PageTotalCount").value);
    document.getElementById("pc").value = maxpage;
    document.getElementById("nowpage").value = maxpage;
    SelectCountrybyName();
});
$('#PageGO').click(function () {
    var nowpage = parseInt(document.getElementById("nowpage").value);
    var maxpage = parseInt(document.getElementById("PageTotalCount").value) + 1;
    if (nowpage > 0 && nowpage < maxpage) {
        document.getElementById("pc").value = document.getElementById("nowpage").value;
        SelectCountrybyName();
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
