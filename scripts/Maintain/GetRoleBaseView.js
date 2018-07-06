
$(function () {  
    GetRoleBase();
    $("#Query").click(function () {

    });
    $("#Return").click(function () {
        $("#Save").val("");
        $("#Query").css("display", "none");
    });
    $("#ReturnRT,#ReturnGN").click(function () {
        $("#Query-order").css("display", "none");
        $("#EditInfor").css("display", "none");
    });
    $("#SubmitRose").click(function () {
        var $NodeId = onCheck();
        $.ajax({
            type: "post",
            url: "/Maintain/SubmitRoseNode",
            data: {
                RoleId: $("#SubmitRose").val(),
                NodeId: $NodeId
            },
            dataType: "json",
            success: function (data) {
                if (data == 0) {
                    $("#labtxt").html("Success");
                    showDiv();
                    $("#HideSysuserInfo").slideDown();
                    $("#ShowZtreeNodes").css("display", "none");
                    $("#treeDemo").val("");
                    return false;
                }
                else {
                    $("#labtxt").html("Error");
                    showDiv();
                    return false;
                }
            },
            error: function () {
                $("#labtxt").html("Error");
                showDiv();
                return false;
            }
        });

    })
    $("#cancel").click(function () {
        $("#HideSysuserInfo").slideDown();
        $("#ShowZtreeNodes").css("display", "none");
        $("#treeDemo").val("");

    });
});
function GetRoleBase()
{
    $.ajax({
        type: "post",
        url: "/Maintain/GetRoleBaseViewInfo/",
        dataType: "json",
        success: function (res) {
            var obj = jQuery.parseJSON(res);
            if (obj) {
                var $html = "";
                var intSeq = 0;
                $.each(obj, function (i, item) {
                    intSeq++;
                    $html += "<tr>";
                    $html += "<td class='center'>" + item.Name + "</td>";
                    $html += "<td class='center'>" + item.RoleGroupName + "</td>";
                    $html += "<td class='center'><button type=button id=EditNode name=EditNode class='btn btn-default' onclick='return GetRoleBaseNodeShow(this)' value='" + item.RoleId + "'>Edit Node</button></td>";
                    $html += "<td class='center'><button type=button id=EditRole name=EditRole class='btn btn-default' onclick='return EditEditRole(this)' value='" + item.RoleId + "'>Edit Role</button></td>";
                    $html += "</tr>"
                })
                $("#SysuserInfo").html($html);
            }
        }
    });
}
function GetRoleBaseNodeShow(obj) {
    $("#Query-order").css("display", "none");
    $("#EditInfor").css("display", "none");
    $("#HideSysuserInfo").css("display", "none");
    $("#ShowZtreeNodes").css("display", "block");
    var $RoleId = obj.value;
    $("#SubmitRose").val($RoleId);
        
     createTree();
   

    // 控制节点图标不显示
    function showIconForTree(treeId, treeNode) {
        return !treeNode;
    };
    function beforeClick(treeId, treeNode) {
        var check = (treeNode && !treeNode);
        return check;
    }

    function onClick(e, treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        nodes = zTree.getSelectedNodes(),
        v = "";
        nodes.sort(function compare(a, b) { return a.id - b.id; });
        for (var i = 0, l = nodes.length; i < l; i++) {
            v += nodes[i].name + ",";
        }
        if (v.length > 0) v = v.substring(0, v.length - 1);
        var nameObj = $("#nameSel");
        nameObj.attr("value", v);
        var n = "";
        for (var i = 0, l = nodes.length; i < l; i++) {
            n += nodes[i].id + ",";
        }
        if (n.length > 0) n = n.substring(0, n.length - 1);
        nameObj.attr("nameid", n);
        hideMenu();
    }
    function showMenu() {
        var nameObj = $("#nameSel");
        var nameOffset = $("#nameSel").offset();
        $("#menuContent").css({ left: nameOffset.left + "px", top: nameOffset.top + nameObj.outerHeight() + "px" }).slideDown("fast");
        $("body").bind("mousedown", onBodyDown);
    }
    function hideMenu() {
        $("#menuContent").fadeOut("fast");
        $("body").unbind("mousedown", onBodyDown);
    }
    // 当点击窗口其他区域时zTree消息框隐藏
    function onBodyDown(event) {
        if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0)) {
            hideMenu();
        }
    }
    function clearCheckedOldNodes() {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        nodes = zTree.getChangeCheckedNodes();
        for (var i = 0, l = nodes.length; i < l; i++) {
            nodes[i].checkedOld = nodes[i].checked;
        }
    }

    function onCheck(e, treeId, treeNode) {
        var treeObj = $.fn.zTree.getZTreeObj("treeDemo"),
        nodes = treeObj.getCheckedNodes(true);
        var Node = "";
        for (var i = 0; i < nodes.length; i++) {
            Node += "," + nodes[i].ID; //获取选中节点的值
        }
        return Node;
    }
}
function EditEditRole(obj)
{
    $("#EditInfor").css("display", "none");
    //$("#RoleName").attr("readonly", "readonly");
    RoleId = obj.value;
    $.post("/Maintain/GetRoleResults/", RoleId, function (data)
    {
        if (data)
        {
            $("#RoleName").val(data.RoleName);
            $("#RoleGroupCode").val(data.RoleGroupId);
            $("#RoleGroupCode").empty();
            $("#Save").val(data.RoleId);
            $.each(data.RoleGroupList, function (i, item) {
                var PrintShopList = "";
                PrintShopList = "<option value='" + item.Value + "'>" + item.Text + "</option>";
                $("#RoleGroupCode").append(PrintShopList);
            });
            $("#RoleGroupCode").val(data.RoleGroups);
        }
        $("#Query").removeAttr("style");
        $("#Query-order").css("display","none");
    });

}
function SaveEditRole(obj)
{
    RoleId = obj.value;
    var RoleGroup = $("#RoleGroupCode").val();
    var RoleName=$("#RoleName").val();
    if (RoleGroup == "") {
        $("#labtxt").html("Please Select a RoleGroup");
        showDiv();
        return false;

    }
    _data =
    {
        Role: RoleId,
        RoleGroupCode: RoleGroup,
        RoleName:RoleName
    }
    $.post("/Maintain/SaveEditRole/", _data, function (data) {
        if (data.FunStatus == "success")
        {
            $("#labtxt").html("Success");
            showDiv();
            GetRoleBase();
        }
        else
        {
            $("#labtxt").html("Error");
            showDiv();
        }
        $("#Query").css("display","none");
    });
   

}
function NewRole()
{
    $("#EditInfor").css("display","none");
    $("#Query-order").removeAttr("style");
    $("#Query").css("display", "none");
    $.post("/Maintain/AddNewRole", '', function (data) {
        if(data)
        {
            $("#NewRoleGroupCode").empty();
            $.each(data.orderdata.RoleGroupList, function (i, item) {
                var RoleGroupList = "";
                RoleGroupList = "<option value='" + item.Value + "'>" + item.Text + "</option>";
                $("#NewRoleGroupCode").append(RoleGroupList);
            });
        }

    });
    

}
function NewRoleGroup()
{
    $("#NewRoleGroupName").val("");
    $("#EditInfor").removeAttr("style");
    $("#Query-order").css("display", "none");

}
function SaveNewRole()
{
    var NewRoleName = $("#NewRoleName").val();
    var NewRoleGroupCode = $("#NewRoleGroupCode").val();
    if (NewRoleName == "")
    {
        $("#labtxt").html("Please input RoleName");
        showDiv();
        return false;
    }

    if (NewRoleGroupCode == "")
    {
        $("#labtxt").html("Please Select a RoleGroup");
        showDiv();
        return false;

    }

    _data =
        {
            NewRoleName: NewRoleName,
            NewRoleGroupCode: NewRoleGroupCode
        }
    $.post("/Maintain/SaveNewRole", _data, function (data)
    {
        if (data.FunStatus=="success")
        {
            $("#labtxt").html("Success");
            showDiv();
            GetRoleBase();
            $("#Query-order").css("display", "none");
        }
        else
        {
            $("#labtxt").html(data.ErrorCode);
            showDiv();
        }

    });
}
function SaveNewRoleGroup()
{
    debugger
    var NewRoleGroupName = $("#NewRoleGroupName").val();
    if (NewRoleGroupName == "" || NewRoleGroupName.toLocaleLowerCase() == "group")
    {
        $("#labtxt").html("Please input RoleGroupName.");
        showDiv();
        return false;
    }
    if (NewRoleGroupName.indexOf('Group')>-1)
    {

    }
    else
    {
        NewRoleGroupName = NewRoleGroupName + " Group";
    }
    $.post("/Maintain/SaveRoleGroup", NewRoleGroupName, function (data)
    {
        if (data.FunStatus == "success")
        {
            $("#labtxt").html("success");
            showDiv();
            $("#EditInfor").css("display","none");
            return;
            
        }
        else
        {
            $("#labtxt").html(data.ErrorCode);
            showDiv();
            return false;
        }
    })
}
function createTree() {

    function showIconForTree(treeId, treeNode) {
        return !treeNode;
    };
    function beforeClick(treeId, treeNode) {
        var check = (treeNode && !treeNode);
        return check;
    }
    function onClick(e, treeId, treeNode) {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        nodes = zTree.getSelectedNodes(),
        v = "";
        nodes.sort(function compare(a, b) { return a.id - b.id; });
        for (var i = 0, l = nodes.length; i < l; i++) {
            v += nodes[i].name + ",";
        }
        if (v.length > 0) v = v.substring(0, v.length - 1);
        var nameObj = $("#nameSel");
        nameObj.attr("value", v);
        var n = "";
        for (var i = 0, l = nodes.length; i < l; i++) {
            n += nodes[i].id + ",";
        }
        if (n.length > 0) n = n.substring(0, n.length - 1);
        nameObj.attr("nameid", n);
        hideMenu();
    }
    var $RoleId = $("#SubmitRose").val();
    var zNodes;
    var setting = {
        view: {
            showLine: true,
            showIcon: showIconForTree,
            dblClickExpand: true,
            //selectedMulti: false,
            //fontCss: { 'color': 'gray', 'font-family': '微软雅黑' }              
        },
        check: {
            //复选框显示
            enable: true,
        },
        data: {
            key:
            {
                name: "CateName"
            },
            simpleData: {
                enable: true,
                idKey: "ID",
                pIdKey: "ParentID",
                //rootPId: "1"
            }
        },
        callback: {
            beforeClick: beforeClick,
            onClick: onClick

        }
    };
    $.ajax({
        type: 'POST',
        url: "/Maintain/GetORBaseNode/",
        dataType: "text", //可以是text，如果用text，返回的结果为字符串；如果需要json格式的，可是设置为json
        ContentType: "application/json; charset=utf-8",
        success: function (data) {
            var ZNode = data;
            zNodes = JSON.parse(ZNode);
            $.fn.zTree.init($("#treeDemo"), setting, eval('(' + zNodes + ')'));
            //展开所有节点
            var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
            treeObj.expandAll(true);
            ///加载时勾选用户已有权限
            $.ajax({
                type: "post",
                url: "/Maintain/GetRoleBaseNode/",
                data: { RoleId: $RoleId },

                dataType: "text",
                ContentType: "application/json; charset=utf-8",
                success: function (data) {
                    $strDates = data.substring(2, data.length - 1);
                    var strDates = $strDates.split("^");
                    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                    for (var k = 0; k < strDates.length; k++) {
                        if (strDates.length <= 1) {
                            break;
                        }
                        else {
                            var trueCheck = strDates[k];
                            var Newnode = treeObj.getNodeByParam("ID", trueCheck, null);
                            treeObj.checkNode(Newnode, true, false);
                        }
                    }

                },

            });

        },
    });
}
function onCheck(e, treeId, treeNode) {
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo"),
    nodes = treeObj.getCheckedNodes(true);
    var Node = "";
    for (var i = 0; i < nodes.length; i++) {
        Node += "," + nodes[i].ID; //获取选中节点的值
    }
    return Node;
}