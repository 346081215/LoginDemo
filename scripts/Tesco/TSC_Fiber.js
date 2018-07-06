$(function () {
    $("#step1").click(function () {
        $("#Query-Results").css("display", "none");
        $("#InsertCountry").css("display", "none");
        $("#BrandType").val("");
        $("#FormatId").val("--All--");
        $("#Query").slideDown();
        $("#step1").removeAttr("style");
        $("#step2").css("display", "none");
        $("#step3").css("display", "none");
        $("#step2").attr("class", "gray-em");
        $("#step1").attr("class", "red-em");
    });
    $("#step2").click(function () {
        $("#Query").css("display", "block");
        $("#InsertCountry").css("display", "none");
        $("#Query-Results").slideDown();
        $("#step1").removeAttr("style");
        $("#step2").removeAttr("style");
        $("#step3").css("display", "none");
        $("#step1").attr("class", "gray-em");
        $("#step2").attr("class", "red-em");
    })

    //查询
    $('#btnSearch').click(function () {
        $("#Query-Results").css("display", "block");
        funSelectTSC_Fiber();
    });

    //添加
    $("#btnAdd").click(function () {
        funAdd();
    });
    $("#TSC_Add").click(function () {
        funAddTSC_Fiber();
    });

    //修改
    $("#TSC_Edit").click(function () {
        funEditTSC_Fiber();
    });

    //返回
    $("#TSC_Cancel").click(function () {
        $("#InsertCountry").css("display", "none");
        $("#Query").css("display", "block");
        $("#Query-Results").css("display", "none");
        $("#InsertCountry").css("display", "none");
        $("#BrandType").val("");
        $("#FormatId").val("--All--");
        $("#Query").slideDown();
        $("#step1").removeAttr("style");
        $("#step2").css("display", "none");
        $("#step3").css("display", "none");
        $("#step2").attr("class", "gray-em");
        $("#step1").attr("class", "red-em");
    });

    //分页
    $('#PageIndex').click(function () {
        document.getElementById("pc").value = 1;
        document.getElementById("nowpage").value = 1;
        funSelectTSC_Fiber();
    });
    $('#Pageup').click(function () {
        var nowpage = document.getElementById("nowpage").value;
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) > 1) {
            newpage = parseInt(nowpage) - 1;
            document.getElementById("pc").value = newpage;
            document.getElementById("nowpage").value = newpage;
            funSelectTSC_Fiber();
        }
    });
    $('#Pagewown').click(function () {
        var nowpage = document.getElementById("nowpage").value;
        var maxpage = parseInt(document.getElementById("PageTotalCount").value);
        var newpage = parseInt(nowpage);
        if (parseInt(nowpage) < maxpage) newpage = parseInt(nowpage) + 1;
        document.getElementById("pc").value = newpage;
        document.getElementById("nowpage").value = newpage;
        funSelectTSC_Fiber();
    });
    $('#PageLast').click(function () {
        var maxpage = parseInt(document.getElementById("PageTotalCount").value);
        document.getElementById("pc").value = maxpage;
        document.getElementById("nowpage").value = maxpage;
        funSelectTSC_Fiber();
    });
    $('#PageGO').click(function () {
        var nowpage = parseInt(document.getElementById("nowpage").value);
        var maxpage = parseInt(document.getElementById("PageTotalCount").value) + 1;
        if (nowpage > 0 && nowpage < maxpage) {
            document.getElementById("pc").value = document.getElementById("nowpage").value;
            funSelectTSC_Fiber();
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

//查询
function funSelectTSC_Fiber() {
    $("#step1").removeAttr("style");
    $("#step2").removeAttr("style");
    $("#step1").attr("class", "gray-em");
    $("#step2").attr("class", "red-em");

    var data_ = {
        pc: $("#pc").val(),
        English: $("#English_Select").val()
    }

    $.post("/Tesco/SelectTSC_Fiber", data_, function (data) {
        var html = "";
        $.each(data, function (i, item) {
            html += "<tr>";
            html += "<td class='center'>" + item.ID + "</td>";
            html += "<td class='center'>" + item.English + "</td>";
            html += "<td class='center'>" + item.Notes + "</td>";
            html += "<td class='center'>" + item.ModifiedBy + "</td>";
            html += "<td class='center'>" + item.ModifiedOn + "</td>";
            html += "<td class='center'>"
                + "<button type='button' id='Update' name='Update' class='btn btn-default' onclick='funSelect_TSC_Fiber_Id(this)' value='" + item.ID + "'>Edit</button>"
                + "<button type='button' id='Delete' name='Delete' style='margin-left:5px;' class='btn btn-default' onclick='funDelete_TSC_Fiber(this)' value='" + item.ID + "'>Delete</button>"
                + "</td>";
            html += "</tr>";

            $("#TotalPageCount").html(item.CountId);
            $("#PageTotalCount").val(item.CountId);            
        });
        $("#OrderDetail tbody").html(html);
    });
}

//添加
function funAdd() {
    $("#step1").removeAttr("style");
    $("#step2").removeAttr("style");
    $("#step3").removeAttr("style");
    $("#step1").attr("class", "gray-em");
    $("#step2").attr("class", "gray-em");
    $("#step3").attr("class", "red-em");

    $("#Query").css("display", "none");
    $("#Query-Results").css("display", "none");

    $("#InsertCountry").css("display", "block");
    $("#TSC_Add").css("display", "block");
    $("#TSC_Edit").css("display", "none");

    //添加之前先清空文本框中的值
    $("#English").val("");
    $("#Notes").val("");
}
function funAddTSC_Fiber() {
    if ($("#English").val() == "") {
        alert("English的栏位为必填项");
        return false;
    }
    else {
        var guess = $("#English").val();
        var reg = /[\u4E00-\u9FA5]/;
        if (reg.test(guess) || guess.match(/\d+/g)) {
            alert("English栏位必须为英文！");
            return false;
        }

        var data_ = {
            English: $("#English").val(),
            Notes: $("#Notes").val()
        }
        $.post("/Tesco/InsertTSC_Fiber", data_, function (data) {
            //判断添加是否成功
            if (data.SessionStaus == "true" && data.value == null) {
                alert("添加成功")
                funSelectTSC_Fiber();
                $("#Query").css("display", "block");
                $("#Query-Results").css("display", "block");
                $("#InsertCountry").css("display", "none");
                $("#Query-Results").slideDown();
                $("#step1").removeAttr("style");
                $("#step2").removeAttr("style");
                $("#step3").css("display", "none");
                $("#step1").attr("class", "gray-em");
                $("#step2").attr("class", "red-em");
            } else {
                alert(data.value);
            }
        })
    }
}

//绑定数据到文本框
function funSelect_TSC_Fiber_Id(ID) {
    $("#step1").removeAttr("style");
    $("#step2").removeAttr("style");
    $("#step3").removeAttr("style");
    $("#step1").attr("class", "gray-em");
    $("#step2").attr("class", "gray-em");
    $("#step3").attr("class", "red-em");

    $("#Query").css("display", "none");
    $("#Query-Results").css("display", "none");

    $("#InsertCountry").css("display", "block");
    $("#TSC_Add").css("display", "none");
    $("#TSC_Edit").css("display", "block");

    var data_ = { ID: ID.value }
    $("#UpdateId").val(ID.value);
    $.post("/Tesco/SelectTSC_Fiber_ID", data_, function (data) {
        $.each(data, function (i, item) {
            $("#English").val(item.English);
            $("#Notes").val(item.Notes);
        })
    })
}

//修改
function funEditTSC_Fiber() {
    if ($("#English").val() == "") {
        alert("English的栏位为必填项");
        return false;
    }
    else {
        var guess = $("#English").val();
        var reg = /[\u4E00-\u9FA5]/;
        if (reg.test(guess) || guess.match(/\d+/g)) {
            alert("English栏位必须为英文！");
            return false;
        }

        debugger;
        var data_ = {
            ID: $("#UpdateId").val(),
            English: $("#English").val(),
            Notes: $("#Notes").val()
        }

        $.post("/Tesco/UpdateTSC_Fiber", data_, function (data) {
            if (data.SessionStaus == "true" && data.value == null) {
                alert("修改成功")
                funSelectTSC_Fiber();
                $("#Query").css("display", "block");
                $("#Query-Results").css("display", "block");
                $("#InsertCountry").css("display", "none");
                $("#Query-Results").slideDown();
                $("#step1").removeAttr("style");
                $("#step2").removeAttr("style");
                $("#step3").css("display", "none");
                $("#step1").attr("class", "gray-em");
                $("#step2").attr("class", "red-em");
            } else {
                alert(data.value);
            }
        })
    }
}

//删除
function funDelete_TSC_Fiber(ID) {
    if (confirm("确定删除数据")) {
        var data_ = { ID: ID.value }

        $.post("/Tesco/DeleteTSC_Fiber", data_, function (data) {
            if (data.SessionStaus == "true" && data.value == null) {
                alert("删除成功")
                funSelectTSC_Fiber();
            } else {
                alert(data.value);
            }
        })
    }

}