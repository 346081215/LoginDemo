$(function () {
    $("#SendEmail").click(function () {
        var QueryData = {
            FristName: $("#FristName").val(),
            LastName: $("#LastName").val(),
            EmailAddress: $("#EmailAddress").val(),
            ContactNumber: $("#ContactNumber").val(),
            CommentsValue: $("#CommentsValue").val(),
        }

        $.post("/Maxim/HelpEmail", QueryData, function (data) {
            alert(data.OOSRptPubManagerData);
        });
    });
});