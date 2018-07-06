$(function () {
    var submitdata = {
        Salesorderid: $("#Salesorderid1").val()
    };
    $.post("/HydroFlask/ViewDetailLoad", submitdata, function (data)
    {
        alert("212");
        console.log(data);
        if (data.FunStatus == "success")
        {
            $("#PS").val(data.ViewDetail.Printshop);
        }
        else
        {
            alert(data.ErrorCode);
        }
    });
});