var PublicFuncLogPath = "";
//var brandIdArr = ["ADO001", "BJB001", "ECI001", "TSC001", "ARI001", "DIK001", "HOR001", "HYD001", "PDT001", "STP001"];
var _brandId = "";
var _brandName = "";

$(function () {
    debugger
    $.ajax({
        url: "/Maxim/XGetUserAccount",
        type: "get",
        //dataType: "json",
        async: false,
        success: function (data) {
            var json = JSON.parse(data);
            console.log('GetUserAccount=', json);
            _brandId = json.BrandId;
            _brandName = json.BrandId.replace("001", "");

            PublicFuncLogPath = json.BrandId + "_FuncLogPath.json";
        }
    });


    $("#table0, #table1,#table2,#table3").hide();

    var seleId = document.getElementById("modelName_SELE");
    debugger
    $.getJSON("/WebDocuments/BrandLogSet/" + PublicFuncLogPath, function (result) {

        console.log("getFileUrl()=", PublicFuncLogPath);

        $("#brand_span").html(result.brand);

        $.each(result.Data, function (i, item) {

            seleId.options[i + 1] = new Option(item.ModuleName, item.ModulePath);

        })
    })

    $("#modelName_SELE").change(function () {
        //alert(modelNameId);
        var modelPath = $("#modelName_SELE").val();
        var modelText = $("#modelName_SELE").find("option:selected").text();


        if (modelPath != 0) {
            if (modelText == "原始订单导入log") {
                GetInitialNewOrder(modelPath);
            }
            else if (modelText == "建立订单log") {
                FunGetNewOrder(modelPath);
            }
            else if (modelText == "OrderConfirmlog") {
                getOrderConfirm(modelPath);
            }
            else if (modelText == "订单取消log") {
                getOrderCancel(modelPath);
            }
            else if (modelText == "UrgenOrderReqlog") {

                getUrgenOrderReq(modelPath);

            }
            else if (modelText == "基础资料log") {

                getCheckBaseData(modelPath);
            }
            else if (modelText == "账号登陆Log") {
                //alert("开发中。。。");
                getSignIn(modelPath);
            }
            else if (modelText == "提交T100订单Log") {
                getTSubmait100(modelPath);
            }
            else if (modelText == "状态回传Log") {

                getFtpfileUpdateStatus(modelPath);

            }
            else if (modelText == "Pi邮发送成功Log") {
                getTEmailPress(modelPath);
            }
            else if (modelText == "订单打包Log") {

                getOrderDataProcess(modelPath);
            }
            else if (modelText == "PI邮件service服务log") {

                getPIEmailCodeBrand(modelPath);
            }
            else if (modelText == "转移文件log")
            {
                getPDTMoveFile(modelPath);
            }
        }
        else {
            $("#table0").hide();
            $("#table1").hide();
            $("#table2").hide();
            $("#table3").hide();
            $("#test").hide();
        }
    })
})

function GetInitialNewOrder(modelPath) {
    debugger
    $("#table0").show();
    $("#table1").hide();
    $("#text").html("");

    $.get("/Maxim/GetInfo?modelPath=" + modelPath, function (data) {
        var html = "";
        var json = JSON.parse(data);
        console.log(json);

        if (json.length != 0) {
            for (var i = 0; i < json.length; i++) {
                html += "<tr><td>" + json[i].FullPath + "</td>";
                html += "<td>" + json[i].OriginalPath + "</td>";
                html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='InitialNewOrderList(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                html += "</tr>"
            }
            $("#bodytb").html(html);
        }
    })
}
function InitialNewOrderList(id) {
    $("#table1").show();
    $("#text").html("");

    $.get("/Maxim/GetInfo1?modelPath=" + id.value, function (data) {
        var html = "";
        var json = JSON.parse(data);

        for (var i = 0; i < json.length; i++) {
            html += "<tr><td>" + json[i].FullPath + "</td>";
            html += "<td>" + json[i].OriginalPath + "</td>";
            html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='PublicReaderFile(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
            html += "</tr>"
        }
        $("#bodytb1").html(html);
    })
}
//------------------------------FunNewOrder end--------------------------------------------------------



function FunGetNewOrder(modelPath) {
    debugger
    $("#table0").show();
    $("#table1").hide();
    $("#table2").hide();
    $("#table3").hide();
    $("#text").html("");

    $.get("/Maxim/GetInfo?modelPath=" + modelPath, function (data) {
        var html = "";
        var json = JSON.parse(data);
        //console.log(json);

        if (json.length != 0) {
            for (var i = 0; i < json.length; i++) {
                html += "<tr><td>" + json[i].FullPath + "</td>";
                html += "<td>" + json[i].OriginalPath + "</td>";
                html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='NewOrderFileList(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                html += "</tr>"
            }
            $("#bodytb").html(html);
        }
    })
}

function NewOrderFileList(id) {
    $("#table1").show();
    $("#text").html("");
    //alert(id.value.indexOf(".txt"));

    $.get("/Maxim/GetInfo1?modelPath=" + id.value, function (data) {
        var html = "";
        var json = JSON.parse(data);

        for (var i = 0; i < json.length; i++) {
            html += "<tr><td>" + json[i].FullPath + "</td>";
            html += "<td>" + json[i].OriginalPath + "</td>";
            html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='NewOrderFileListNext(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
            html += "</tr>"
        }
        $("#bodytb1").html(html);
    })
}

function NewOrderFileListNext(id) {
    //alert(id.value)

    if (id.value.indexOf(".txt") > 0) {
        PublicReaderFile(id);
    }
    else {
        $("#table2").show();
        $("#text").html("");
        //alert(id.value.indexOf(".txt"));

        $.get("/Maxim/GetInfo1?modelPath=" + id.value, function (data) {
            var html = "";
            var json = JSON.parse(data);

            for (var i = 0; i < json.length; i++) {
                html += "<tr><td>" + json[i].FullPath + "</td>";
                html += "<td>" + json[i].OriginalPath + "</td>";
                html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='PublicReaderFile(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                html += "</tr>"
            }
            $("#bodytb1").html(html);
        })
    }
}



//------------------------------FunNewOrder end--------------------------------------------------------


function getOrderConfirm(modelPath) {//
    debugger
    $("#table0").show();
    $("#table1").hide();
    $("#table2").hide();
    $("#text").hide();

    $.get("/Maxim/GetInfo?modelPath=" + modelPath, function (data) {
        var html = "";
        var json = JSON.parse(data);
        //console.log(json);

        if (json.length != 0) {
            for (var i = 0; i < json.length; i++) {
                if (json[i].OriginalPath != "ConfrimOrder_SendEmail" && json[i].OriginalPath != "ConfrimOrder_SendEmail_Tesco") {
                    html += "<tr><td>" + json[i].FullPath + "</td>";
                    html += "<td>" + json[i].OriginalPath + "</td>";
                    html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='ConfirmDateList(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                    html += "</tr>"
                }
            }
            $("#bodytb").html(html);
        }
    })
}

//文件列表
function ConfirmDateList(id) {
    $("#table1").show();
    $("#table2").hide();
    $("#text").html("");

    $.get("/Maxim/GetInfo1?modelPath=" + id.value, function (data) {
        console.log(data)

        var html = "";
        var json = JSON.parse(data);
        console.log('json=', json);
        for (var i = 0; i < json.length; i++) {
            if (json[i].OriginalPath == "OrderConfirm") {
                html += "<tr><td>" + json[i].FullPath + "</td>";
                html += "<td>" + json[i].OriginalPath + "</td>";
                html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='OpenConfirmOrder(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                html += "</tr>";
            }
            else {

            }

        }
        $("#bodytb1").html(html);

    })
}

function OpenConfirmOrder(id) {
    if (id.value.indexOf(".txt") == 0) {
        //alert("文件列表")
        PublicReaderFile(id);
    }
    else {
        $("#table2").show();
        $("#bodytb2").show();
        $("#text").html("");
        $.get("/Maxim/GetInfo1?modelPath=" + id.value, function (data) {
            //console.log(data)
            debugger
            var html = "";
            var json = JSON.parse(data);

            for (var i = 0; i < json.length; i++) {
                //for (var j = 0; j < brandIdArr.length; j++) {
                //    if (json[i].OriginalPath.indexOf(brandIdArr[i]) == 0)
                //    {
                //        html += "<tr><td>" + json[i].FullPath + "</td>";
                //        html += "<td>" + json[i].OriginalPath + "</td>";
                //        html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='PublicReaderFile(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                //        html += "</tr>";
                //    }
                //    else {
                //        continue;
                //    }
                //}
                if (json[i].OriginalPath.indexOf(_brandId) == 0) {
                    html += "<tr><td>" + json[i].FullPath + "</td>";
                    html += "<td>" + json[i].OriginalPath + "</td>";
                    html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='PublicReaderFile(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                    html += "</tr>";
                }
                    //else if (json[i].OriginalPath.indexOf("BJB001") == 0) {
                    //    html += "<tr><td>" + json[i].FullPath + "</td>";
                    //    html += "<td>" + json[i].OriginalPath + "</td>";
                    //    html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='PublicReaderFile(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                    //    html += "</tr>";
                    //}
                else {
                    //$("#table2").hide();
                    //$("#bodytb2").hide();
                    continue;
                }
            }
            $("#bodytb2").html(html);
        })
    }
}
//------------------------------OrderConfirm end--------------------------------------------------------


function getOrderCancel(modelPath) {
    $("#table0").show();
    $("#table1").hide();
    $("#table2").hide();
    $("#text").html("");

    $.get("/Maxim/GetInfo?modelPath=" + modelPath, function (data) {
        var html = "";
        var json = JSON.parse(data);
        if (json.length != 0) {
            for (var i = 0; i < json.length; i++) {
                if (json[i].OriginalPath != "ConfrimOrder_SendEmail" && json[i].OriginalPath != "ConfrimOrder_SendEmail_Tesco") {
                    html += "<tr><td>" + json[i].FullPath + "</td>";
                    html += "<td>" + json[i].OriginalPath + "</td>";
                    html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='OrderCancelDateList(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                    html += "</tr>"
                }
            }
            $("#bodytb").html(html);
        }
    })
}

//文件列表
function OrderCancelDateList(id) {

    $("#table1").show();
    $("#text").html("");

    $.get("/Maxim/GetInfo1?modelPath=" + id.value, function (data) {
        console.log(data)

        var html = "";
        var json = JSON.parse(data);
        console.log('json=', json);
        for (var i = 0; i < json.length; i++) {
            if (json[i].OriginalPath == "Adolfo") {
                html += "<tr><td>" + json[i].FullPath + "</td>";
                html += "<td>" + json[i].OriginalPath + "</td>";
                html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='OpenOrderCancel(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                html += "</tr>";
            }


        }
        $("#bodytb1").html(html);

    })
}

function OpenOrderCancel(id) {

    if (id.value.indexOf(".txt") == 0) {
        //alert("文件列表")
        PublicReaderFile(id);
    }
    else if (id.value.indexOf(".txt") == -1) {
        $("#table2").show();
        $("#bodytb2").show();
        $("#text").html("");
        $.get("/Maxim/GetInfo1?modelPath=" + id.value, function (data) {
            //console.log(data)
            debugger
            var html = "";
            var json = JSON.parse(data);

            for (var i = 0; i < json.length; i++) {
                html += "<tr><td>" + json[i].FullPath + "</td>";
                html += "<td>" + json[i].OriginalPath + "</td>";
                html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='OpenOrderCancelNext(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                html += "</tr>";
            }
            $("#bodytb2").html(html);
        })
    }
}

function OpenOrderCancelNext(id) {
    $("#table3").show();
    $("#bodytb3").show();
    $("#text").html("");
    $.get("/Maxim/GetInfo1?modelPath=" + id.value, function (data) {
        //console.log(data)
        debugger
        var html = "";
        var json = JSON.parse(data);
        console.log("OpenOrderCancela json =", json);

        for (var i = 0; i < json.length; i++) {
            html += "<tr><td>" + json[i].FullPath + "</td>";
            html += "<td>" + json[i].OriginalPath + "</td>";
            html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='PublicReaderFile(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
            html += "</tr>";
        }
        $("#bodytb3").html(html);
    })
}
//------------------------------OrderCancel end--------------------------------------------------------

function getUrgenOrderReq(modelPath) {
    $("#table0").show();
    $("#table1").hide();
    $("#table2").hide();
    $("#table3").hide();
    $("#text").hide();

    $.get("/Maxim/GetInfo?modelPath=" + modelPath, function (data) {
        var html = "";
        var json = JSON.parse(data);
        //console.log(json);

        if (json.length != 0) {
            for (var i = 0; i < json.length; i++) {
                if (json[i].OriginalPath != "ConfrimOrder_SendEmail" && json[i].OriginalPath != "ConfrimOrder_SendEmail_Tesco") {
                    html += "<tr><td>" + json[i].FullPath + "</td>";
                    html += "<td>" + json[i].OriginalPath + "</td>";
                    html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='UrgenOrderReqList(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                    html += "</tr>"
                }
            }
            $("#bodytb").html(html);
        }
    })
}

function UrgenOrderReqList(id) {

    $("#table1").show();
    $("#table2").hide();
    $("#table3").hide();
    $("#text").hide();

    $.get("/Maxim/GetInfo1?modelPath=" + id.value, function (data) {
        console.log(data)

        var html = "";
        var json = JSON.parse(data);
        console.log('json=', json);
        for (var i = 0; i < json.length; i++) {
            if (json[i].OriginalPath == "Adolfo") {
                html += "<tr><td>" + json[i].FullPath + "</td>";
                html += "<td>" + json[i].OriginalPath + "</td>";
                html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='OpenUrgenOrderReq(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                html += "</tr>";
            }


        }
        $("#bodytb1").html(html);

    })
}

function OpenUrgenOrderReq(id) {
    if (id.value.indexOf(".txt") == 0) {
        //alert("文件列表")
        PublicReaderFile(id);
    }
    else if (id.value.indexOf(".txt") == -1) {
        $("#table2").show();
        $("#bodytb2").show();
        $("#text").html("");
        $.get("/Maxim/GetInfo1?modelPath=" + id.value, function (data) {
            //console.log(data)
            debugger
            var html = "";
            var json = JSON.parse(data);

            for (var i = 0; i < json.length; i++) {
                if (json[i].OriginalPath == "UrgenOrderQuery") {
                    html += "<tr><td>" + json[i].FullPath + "</td>";
                    html += "<td>" + json[i].OriginalPath + "</td>";
                    html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='OpenUrgenOrderReqa(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                    html += "</tr>";
                }
            }
            $("#bodytb2").html(html);
        })
    }
}

function OpenUrgenOrderReqa(id) {
    $("#table3").show();
    $("#bodytb3").show();
    $("#text").html("");
    $.get("/Maxim/GetInfo1?modelPath=" + id.value, function (data) {
        //console.log(data)
        debugger
        var html = "";
        var json = JSON.parse(data);
        console.log("OpenOrderCancela json =", json);

        for (var i = 0; i < json.length; i++) {
            html += "<tr><td>" + json[i].FullPath + "</td>";
            html += "<td>" + json[i].OriginalPath + "</td>";
            html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='PublicReaderFile(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
            html += "</tr>";
        }
        $("#bodytb3").html(html);
    })
}
//------------------------------OrderCancel end--------------------------------------------------------


function getCheckBaseData(modelPath) {
    $("#table0").show();
    $("#table1").hide();
    $("#table2").hide();
    $("#text").html("");

    $.get("/Maxim/GetInfo?modelPath=" + modelPath, function (data) {
        var html = "";
        var json = JSON.parse(data);
        //console.log(json);

        if (json.length != 0) {
            for (var i = 0; i < json.length; i++) {
                html += "<tr><td>" + json[i].FullPath + "</td>";
                html += "<td>" + json[i].OriginalPath + "</td>";
                html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='CheckBaseDataDateList(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                html += "</tr>"
            }

            $("#bodytb").html(html);
        }
    })
}

function CheckBaseDataDateList(id) {
    $("#table1").show();
    //alert(i);
    $("#text").html("");
    $.get("/Maxim/GetInfo1?modelPath=" + id.value, function (data) {
        console.log(data)

        var html = "";
        var json = JSON.parse(data);

        for (var i = 0; i < json.length; i++) {
            //console.log(json[i].OriginalPath);
            if (json[i].OriginalPath.indexOf(_brandName.substring(0, basic.length -1)) == 0){
                html += "<tr><td>" + json[i].FullPath + "</td>";
                html += "<td>" + json[i].OriginalPath + "</td>";
                html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='PublicReaderFile(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                html += "</tr>"
            }
            else {
                continue;
            }
        }
        $("#bodytb1").html(html);

    })
}
//------------------------------getCheckBaseData end--------------------------------------------------------


function getTSubmait100(modelPath) {
    $("#table0").show();
    $("#table1").hide();
    $("#text").html("");

    $.get("/Maxim/GetInfo?modelPath=" + modelPath, function (data) {
        var html = "";
        var json = JSON.parse(data);
        //console.log(json);

        if (json.length != 0) {
            for (var i = 0; i < json.length; i++) {
                if (json[i].OriginalPath != "ConfrimOrder_SendEmail" && json[i].OriginalPath != "ConfrimOrder_SendEmail_Tesco") {
                    html += "<tr><td>" + json[i].FullPath + "</td>";
                    html += "<td>" + json[i].OriginalPath + "</td>";
                    html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='T100DateList(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                    html += "</tr>"
                }
            }
            $("#bodytb").html(html);
        }
    })
}

function T100DateList(id) {
    $("#table1").show();
    $("#text").html("");

    $.get("/Maxim/GetInfo1?modelPath=" + id.value, function (data) {
        console.log(data)

        var html = "";
        var json = JSON.parse(data);
        console.log('json=', json);
        for (var i = 0; i < json.length; i++) {

            html += "<tr><td>" + json[i].FullPath + "</td>";
            html += "<td>" + json[i].OriginalPath + "</td>";
            html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='PublicReaderFile(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
            html += "</tr>";
        }
        $("#bodytb1").html(html);
    })
}
//------------------------------提交T100 end--------------------------------------------------------


function getFtpfileUpdateStatus(modelPath) {
    $("#table0").show();
    $("#table1").hide();
    $("#table2").hide();
    $("#text").html("");

    $.get("/Maxim/GetInfo?modelPath=" + modelPath, function (data) {
        var html = "";
        var json = JSON.parse(data);
        //console.log(json);

        if (json.length != 0) {
            for (var i = 0; i < json.length; i++) {
                html += "<tr><td>" + json[i].FullPath + "</td>";
                html += "<td>" + json[i].OriginalPath + "</td>";
                html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='OpenFtpfileUpdateStatusList(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                html += "</tr>"
            }
            $("#bodytb").html(html);
        }
    })
}

function OpenFtpfileUpdateStatusList(id) {
    $("#table1").show();
    $("#text").html("");
    $("#text").html("");

    $.get("/Maxim/GetInfo1?modelPath=" + id.value, function (data) {

        var html = "";
        var json = JSON.parse(data);

        for (var i = 0; i < json.length; i++) {
            html += "<tr><td>" + json[i].FullPath + "</td>";
            html += "<td>" + json[i].OriginalPath + "</td>";
            html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='OpenFtpfileUpdateStatusListNext(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
            html += "</tr>"
        }
        $("#bodytb1").html(html);
    })
}
//下一个子目录
function OpenFtpfileUpdateStatusListNext(id) {
    $("#table1").show();
    //$("#text").html("");
    if (id.value.indexOf(".txt") >= 0) {
        PublicReaderFile(id);
    }
    else {
        $("#text").html("");
        $.get("/Maxim/GetInfo1?modelPath=" + id.value, function (data) {

            var html = "";
            var json = JSON.parse(data);

            for (var i = 0; i < json.length; i++) {
                html += "<tr><td>" + json[i].FullPath + "</td>";
                html += "<td>" + json[i].OriginalPath + "</td>";
                html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='PublicReaderFile(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                html += "</tr>";
            }
            $("#bodytb1").html(html);
        })
    }
}
//------------------------------状态回传 end--------------------------------------------------------


function getSignIn(modelPath) {
    $("#table0").show();
    $("#table1").hide();
    $("#text").html("");

    $.get("/Maxim/GetInfo?modelPath=" + modelPath, function (data) {
        var html = "";
        var json = JSON.parse(data);
        //console.log(json);

        if (json.length != 0) {
            for (var i = 0; i < json.length; i++) {
                if (json[i].OriginalPath != "ConfrimOrder_SendEmail" && json[i].OriginalPath != "ConfrimOrder_SendEmail_Tesco") {
                    html += "<tr><td>" + json[i].FullPath + "</td>";
                    html += "<td>" + json[i].OriginalPath + "</td>";
                    html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='SignInDateList(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                    html += "</tr>"
                }
            }
            $("#bodytb").html(html);
        }
    })
}

function SignInDateList(id) {
    $("#table1").show();
    $("#text").html("");

    $.get("/Maxim/GetInfo1?modelPath=" + id.value, function (data) {
        console.log(data)

        var html = "";
        var json = JSON.parse(data);
        console.log('json=', json);
        for (var i = 0; i < json.length; i++) {
            if (json[i].OriginalPath == "SignIn") {
                html += "<tr><td>" + json[i].FullPath + "</td>";
                html += "<td>" + json[i].OriginalPath + "</td>";
                html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='OpenSignIntxtList(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                html += "</tr>";
            }
        }
        $("#bodytb1").html(html);
    })
}

function OpenSignIntxtList(id) {
    $("#table1").show();
    $("#text").html("");
    $.get("/Maxim/GetInfo1?modelPath=" + id.value, function (data) {
        console.log(data)

        var html = "";
        var json = JSON.parse(data);

        for (var i = 0; i < json.length; i++) {
            //console.log(json[i].OriginalPath);
            html += "<tr><td>" + json[i].FullPath + "</td>";
            html += "<td>" + json[i].OriginalPath + "</td>";
            html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='PublicReaderFile(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
            html += "</tr>"
        }
        $("#bodytb1").html(html);

    })
}
//------------------------------账户登录 end--------------------------------------------------------



function getTEmailPress(modelPath) {
    $("#table0").show();
    $("#table1").hide();
    $("#table2").hide();
    $("#text").hide();

    $.get("/Maxim/GetInfo?modelPath=" + modelPath, function (data) {
        var html = "";
        var json = JSON.parse(data);
        //console.log(json);

        if (json.length != 0) {
            for (var i = 0; i < json.length; i++) {

                html += "<tr><td>" + json[i].FullPath + "</td>";
                html += "<td>" + json[i].OriginalPath + "</td>";
                html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='EmailPressDateList(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                html += "</tr>"
            }
            $("#bodytb").html(html);
        }
    })
}

function EmailPressDateList(id) {
    $("#table1").show();
    $("#table2").hide();
    $("#table3").hide();
    $("#text").html("");

    $.get("/Maxim/GetInfo1?modelPath=" + id.value, function (data) {
        console.log(data)

        var html = "";
        var json = JSON.parse(data);
        console.log('json=', json);
        for (var i = 0; i < json.length; i++) {

            html += "<tr><td>" + json[i].FullPath + "</td>";
            html += "<td>" + json[i].OriginalPath + "</td>";
            html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='OpenTEmailPress(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
            html += "</tr>";
        }
        $("#bodytb1").html(html);

    })
}

function OpenTEmailPress(id) {
    if (id.value.indexOf(".txt") == 0) {
        //alert("文件列表")
        PublicReaderFile(id);
    }
    else if (id.value.indexOf(".txt") == -1) {
        $("#table2").show();
        $("#bodytb2").show();

        $.get("/Maxim/GetInfo1?modelPath=" + id.value, function (data) {
            //console.log(data)
            $("#text").html("");
            debugger
            var html = "";
            var json = JSON.parse(data);

            for (var i = 0; i < json.length; i++) {
                html += "<tr><td>" + json[i].FullPath + "</td>";
                html += "<td>" + json[i].OriginalPath + "</td>";
                html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='PublicReaderFile(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                html += "</tr>";
            }
            $("#bodytb2").html(html);
        })
    }
}
//-----------------------------Pi邮发送成功 end-----------------------------------------------------


//订单打包
function getOrderDataProcess(modelPath) {
    $("#table0").show();
    $("#table1").hide();
    $("#table2").hide();
    $("#text").hide();

    $.get("/Maxim/GetInfo?modelPath=" + modelPath, function (data) {
        var html = "";
        var json = JSON.parse(data);

        if (json.length != 0) {
            for (var i = 0; i < json.length; i++) {

                html += "<tr><td>" + json[i].FullPath + "</td>";
                html += "<td>" + json[i].OriginalPath + "</td>";
                html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='OrderDataProcessList(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                html += "</tr>"
            }
            $("#bodytb").html(html);
        }
    })
}

function OrderDataProcessList(id) {
    $("#table1").show();
    $("#text").hide();

    $.get("/Maxim/GetInfo1?modelPath=" + id.value, function (data) {
        console.log(data)

        var html = "";
        var json = JSON.parse(data);
        console.log('json=', json);
        for (var i = 0; i < json.length; i++) {

            html += "<tr><td>" + json[i].FullPath + "</td>";
            html += "<td>" + json[i].OriginalPath + "</td>";
            html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='PublicReaderFile(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
            html += "</tr>";
        }
        $("#bodytb1").html(html);

    })
}
//-----------------------------订单打包Log end-----------------------------------------------------



function getPIEmailCodeBrand(modelPath) {
    $("#table0").show();
    $("#table1").hide();
    $("#table2").hide();
    $("#text").hide();

    $.get("/Maxim/GetInfo?modelPath=" + modelPath, function (data) {
        var html = "";
        var json = JSON.parse(data);
        //console.log(json);

        if (json.length != 0) {
            for (var i = 0; i < json.length; i++) {

                html += "<tr><td>" + json[i].FullPath + "</td>";
                html += "<td>" + json[i].OriginalPath + "</td>";
                html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='PIEmailCodeBrandList(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                html += "</tr>"
            }
            $("#bodytb").html(html);
        }
    })
}

function PIEmailCodeBrandList(id) {
    $("#table1").show();
    $("#text").hide();
    $.get("/Maxim/GetInfo1?modelPath=" + id.value, function (data) {
        var html = "";
        var json = JSON.parse(data);
        console.log(json);

        if (json.length != 0) {
            for (var i = 0; i < json.length; i++) {

                html += "<tr><td>" + json[i].FullPath + "</td>";
                html += "<td>" + json[i].OriginalPath + "</td>";
                html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='OpenPIEmailFileList(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                html += "</tr>"
            }
            $("#bodytb1").html(html);
        }
    })
}

function OpenPIEmailFileList(id) {
    $("#table2").show();
    $("#text").hide();
    $.get("/Maxim/GetInfo1?modelPath=" + id.value, function (data) {
        var html = "";
        var json = JSON.parse(data);
        console.log(json);

        if (json.length != 0) {
            for (var i = 0; i < json.length; i++) {

                html += "<tr><td>" + json[i].FullPath + "</td>";
                html += "<td>" + json[i].OriginalPath + "</td>";
                html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='PublicReaderFile(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                html += "</tr>"
            }
            $("#bodytb2").html(html);
        }
    })
}
//-----------------------------PIEmailCodeLog end-----------------------------------------------------


function getPDTMoveFile(modelPath) {
    $("#table0").show();
    $("#table1").hide();
    $("#table2").hide();
    $("#text").hide();

    $.get("/Maxim/GetInfo?modelPath=" + modelPath, function (data) {
        var html = "";
        var json = JSON.parse(data);
        //console.log(json);

        if (json.length != 0) {
            for (var i = 0; i < json.length; i++) {

                html += "<tr><td>" + json[i].FullPath + "</td>";
                html += "<td>" + json[i].OriginalPath + "</td>";
                html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='OpenPDTMoveFile(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                html += "</tr>"
            }
            $("#bodytb").html(html);
        }
    })
}


function OpenPDTMoveFile(id) {
    if (id.value.indexOf(".txt") == 0) {
        //alert("文件列表")
        PublicReaderFile(id);
    }
    else if (id.value.indexOf(".txt") == -1) {
        $("#table2").show();
        $("#bodytb2").show();

        $.get("/Maxim/GetInfo1?modelPath=" + id.value, function (data) {
            //console.log(data)
            $("#text").html("");
            debugger
            var html = "";
            var json = JSON.parse(data);

            for (var i = 0; i < json.length; i++) {
                html += "<tr><td>" + json[i].FullPath + "</td>";
                html += "<td>" + json[i].OriginalPath + "</td>";
                html += "<td>" + "<button class='btn-group-lg' id='fullName'" + i + " onclick='PublicReaderFile(this)' value='" + json[i].FullPath + "' >打开文件夹</button></td>";
                html += "</tr>";
            }
            $("#bodytb2").html(html);
        })
    }
}


//-----------------------------PDTMoveFileLog end-----------------------------------------------------


function PublicReaderFile(id) {
    $("#text").show();
    debugger
    $.get("/Maxim/XGetFiles?modelPath=" + id.value, function (data) {
        $("#text").html(data);

    })
}