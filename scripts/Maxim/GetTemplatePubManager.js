$(function () {
    $.post("/Maxim/GetOOSRptPubManager", "", function (data) {
        if (data.FunStatus == "success") {

            $("#Brand").empty();
            $("#TypeDesc").empty();

            $.each(data.OOSRptPubManagerData.Brand, function (i, item) {
                $('#Brand').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            });
            $("#Brand").val("");

            $.each(data.OOSRptPubManagerData.TypeDesc, function (i, item) {
                $('#TypeDesc').append("<option value='" + item.Value + "'>" + item.Text + "</option>"); 
            });
            $("#TypeDesc").val("");
        }
    })

    $("#Brand").change(function () {
        var QueryData = {
            ddlRptFile: $("#Brand").val(),
            ddlTypeDesc: $("#TypeDesc").val()
        }
        if ($("#Brand").val().length == 0 || $("#TypeDesc").val().length == 0) {
            $("#labtxt").html("品牌和类型必须选择");
            showDiv();
        }
        else {
            //$.post("/Maxim/GetPublishLoad", QueryData, function (data) {
            //    var sTrHtml = "";
            //    if (data.FunStatus == "false") {
            //        $("#Order tbody").html("None");
            //    }
            //    else {
            //        $("#RptFile").empty();
            //        $("#OfficialRpt").empty();
            //        $("#TestRpt").empty();
            //        $.each(data.OOSRptPubManagerData.RptFile, function (i, item) {
            //            $('#RptFile').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            //        });
            //        $("#RptFile").val("");

            //        $.each(data.OOSRptPubManagerData.OfficialRpt, function (i, item) {
            //            $('#OfficialRpt').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            //        });
            //        $("#OfficialRpt").val("");

            //        $.each(data.OOSRptPubManagerData.TestRpt, function (i, item) {
            //            $('#TestRpt').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
            //        });
            //        $("#TestRpt").val("");
            //    }
            //});
        }
    });

    //$("#TypeDesc").change(function () {
    //    var QueryData = {
    //        ddlRptFile: $("#Brand").val(),
    //        ddlTypeDesc: $("#TypeDesc").val()
    //    }
    //    if ($("#Brand").val().length == 0 || $("#TypeDesc").val().length == 0) {
    //        $("#labtxt").html("品牌和类型必须选择");
    //        showDiv();
    //    }
    //    else {
    //        $.post("/Maxim/GetPublishLoad", QueryData, function (data) {
    //            var sTrHtml = "";
    //            if (data.FunStatus == "false") {
    //                $("#Order tbody").html("None");
    //            }
    //            else {
    //                $("#RptFile").empty();
    //                $("#OfficialRpt").empty();
    //                $("#TestRpt").empty();
    //                $.each(data.OOSRptPubManagerData.RptFile, function (i, item) {
    //                    $('#RptFile').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
    //                });
    //                $("#RptFile").val("");

    //                $.each(data.OOSRptPubManagerData.OfficialRpt, function (i, item) {
    //                    $('#OfficialRpt').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
    //                });
    //                $("#OfficialRpt").val("");

    //                $.each(data.OOSRptPubManagerData.TestRpt, function (i, item) {
    //                    $('#TestRpt').append("<option value='" + item.Value + "'>" + item.Text + "</option>");
    //                });
    //                $("#TestRpt").val("");
    //            }
    //        });
    //    }
    //});

    //$("#RptFile").change(function () {
    //    var QueryData = {
    //        ddlRptFile: $("#RptFile").val()
    //    }
    //    if ($("#RptFile").val().length == 0) {
    //        $("#Order").val("");
    //    }
    //    else {
    //        $.post("/Maxim/GetPublishHisdata", QueryData, function (data) {
    //            var sTrHtml = "";
    //            if (data.FunStatus == "false") {
    //                $("#Order tbody").html("None");
    //            }
    //            else {
    //                $.each(data.PublishHisdata.DataList, function (i, item) {
    //                    sTrHtml += "<tr>";
    //                    sTrHtml += "<td>" + item.FileCode + "</td>";
    //                    sTrHtml += "<td>" + item.FileName + "</td>";
    //                    sTrHtml += "<td>" + item.FileSysName + "</td>";
    //                    sTrHtml += "<td>" + item.FileSysPath + "</td>";
    //                    sTrHtml += "<td>" + item.FileActionDesc + "</td>";
    //                    sTrHtml += "<td>" + item.Notes + "</td>";
    //                    sTrHtml += "<td>" + item.CreatedOn + "</td>";
    //                    sTrHtml += "<td>" + item.CreatedBy + "</td>";
    //                    sTrHtml += "<td>" + item.BackUpFileName + "</td>";
    //                    sTrHtml += "<td><a href='/Maxim/XdownloadFile?BackUpFileName=" + item.FileSysPath + item.FileSysName + "'>download File</a></td>";
    //                    sTrHtml += "</tr>";
    //                });
    //                $("#Order tbody").html(sTrHtml);
    //                if (sTrHtml == "") {
    //                    $("#Order tbody").html("None");
    //                }
    //            }             
    //        });
    //    }
    //});

    //$("#Submit1").click(function () {

    //    if ($("#OfficialRpt").val().length == 0) {
    //        $("#labtxt").html("please select a online file to set replaced(请选择一个线上文件来替换).");
    //        showDiv();
    //        return;
    //    }
    //    if ($("#TestRpt").val().length == 0) {
    //        $("#labtxt").html("please select a test file to set online(请选择一个测试文件来切换上线).");
    //        showDiv();
    //        return;
    //    }

    //    var QueryData = {
    //        ddlOfficialRpt: $("#OfficialRpt").val(),
    //        ddlTestRpte: $("#TestRpt").val()
    //    }

    //    $.post("/Maxim/TestOnline", QueryData, function (data) {
    //        $("#labtxt").html(data.OOSRptPubManagerData);
    //        showDiv();
    //    });
    //});

    $("#Submit2").click(function () {

        if ($("#filename").val().length == 0) {
            $("#labtxt").html("please select a file to publish.");
            showDiv();
            return;
        }
        

        //$.post("/Maxim/OnUpload", QueryData, function (data) {
        //    alert(data.OOSRptPubManagerData);
        //});

        $.ajax({
            url: '/Maxim/OnUploadTemplate',
            type: 'POST',
            cache: false,
            data: new FormData($("#FormUpload")[0]),
            processData: false,
            contentType: false,
        }).success(function (data) {
            $("#labtxt").html(data.OOSRptPubManagerData);
            loadOOSFilePubData();
            showDiv();
        });

    });

    //$("#Submit3").click(function () {

    //    if ($("#RptFile").val().length == 0) {
    //        $("#labtxt").html("please select a online file to set replaced(请选择一个线上文件来替换).");
    //        showDiv();
    //        return;
    //    }
    //    var QueryData = {
    //        ddlRptFile: $("#RptFile").val()
    //    }

    //    $.post("/Maxim/RollBack", QueryData, function (data) {
    //        $("#labtxt").html(data.OOSRptPubManagerData);
    //        showDiv();
    //    });
    //});

});

loadOOSFilePubData = function()
{
    $.post("/Maxim/GetOOSFilePubdata", function (data) {
        var sTrHtml = "";
        if (data.FunStatus == "false") {
            $("#Order tbody").html("None");
        }
        else {
            $.each(data.PublishHisdata.DataList, function (i, item) {
                sTrHtml += "<tr>";
                sTrHtml += "<td>" + item.FileCode + "</td>";
                sTrHtml += "<td>" + item.FileName + "</td>";
                sTrHtml += "<td>" + item.FileSysName + "</td>";
                sTrHtml += "<td>" + item.FileSysPath + "</td>";
                sTrHtml += "<td>" + item.FileActionDesc + "</td>";
                sTrHtml += "<td>" + item.Notes + "</td>";
                sTrHtml += "<td>" + item.CreatedOn + "</td>";
                sTrHtml += "<td>" + item.CreatedBy + "</td>";
                sTrHtml += "<td>" + item.BackUpFileName + "</td>";
                sTrHtml += "<td><a href='/Maxim/XdownloadFile?BackUpFileName=" + item.FileSysPath + item.FileSysName + "'>download File</a></td>";
                sTrHtml += "</tr>";
            });
            $("#Order tbody").html(sTrHtml);
            if (sTrHtml == "") {
                $("#Order tbody").html("None");
            }
        }
    });
}
