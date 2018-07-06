function showloading() {
    $("#imgss").html("<img src='/Content/image/loading.gif' />");
    $("#bg").css("display", "block");
    $(".loading").css("display", "block");
}
function hideloading() {
    $("#img").empty();
    $(".bgs").css("display", "none");
    $(".bg").css("display", "none");
    $(".loading").css("display", "none");
}