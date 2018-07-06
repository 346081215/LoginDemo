//遮罩
function show(popupdiv) {

    //以下部分使整个页面至灰不可点击
    var procbg = document.createElement("div"); //首先创建一个div
    procbg.setAttribute("id", "mybg"); //定义该div的id
    procbg.style.background = "#000000";
    procbg.style.width = "100%";
    procbg.style.height = "100%";
    procbg.style.position = "fixed";
    procbg.style.top = "0";
    procbg.style.left = "0";
    procbg.style.zIndex = "1";
    procbg.style.opacity = "0.6";
    procbg.style.filter = "Alpha(opacity=70)";
    //以上部分也可以用csstext代替
    // procbg.style.cssText="background:#000000;width:100%;height:100%;position:fixed;top:0;left:0;zIndex:500;opacity:0.6;filter:Alpha(opacity=70);";
    //背景层加入页面
    document.body.appendChild(procbg);
    //document.body.style.overflow = "hidden"; //取消滚动条

}
function closeDivs(popupdiv) //关闭弹出层
{
    var Idiv = document.getElementById(popupdiv);
    Idiv.style.display = "none";
    document.body.style.overflow = "auto"; //恢复页面滚动条
    var body = document.getElementsByTagName("body");
    var mybg = document.getElementById("mybg");
    body[0].removeChild(mybg);
}





//页面拖动
//$(".UpdataNode").mousedown(function (e) {
//    //设置移动后的默认位置
//    var endx = 0;
//    var endy = 0;

//    //获取div的初始位置，要注意的是需要转整型，因为获取到值带px
//    var left = parseInt($(".UpdataNode").css("left"));
//    var top = parseInt($(".UpdataNode").css("top"));

//    //获取鼠标按下时的坐标，区别于下面的es.pageX,es.pageY
//    var downx = e.pageX;
//    var downy = e.pageY;   //pageY的y要大写，必须大写！！

//    //  鼠标按下时给div挂事件
//    $(".UpdataNode").bind("mousemove", function (es) {

//        //es.pageX,es.pageY:获取鼠标移动后的坐标
//        var endx = es.pageX - downx + left;   //计算div的最终位置
//        var endy = es.pageY - downy + top;

//        //带上单位
//        $(".UpdataNode").css("left", endx + "px").css("top", endy + "px")
//    });
//})

//$(".UpdataNode").mouseup(function () {
//    //鼠标弹起时给div取消事件
//    $(".UpdataNode").unbind("mousemove")
//})

//必填区域鼠标离开事件
$("#CateName").blur(function () {
    if ($("#CateName").val() == "") {
        // $("#CateName").focus();
        $("#CateName").attr("placeholder", "该区域为必填区域！");
        $("#CateName").css("background-color", "#FFFFCC");
        $("#alert-warning").css({ "display": "block" });
    } else {
        $("#alert-warning").css({
            "display": "none"
        })
    }
})

function hidewarning() {
    $("#alert-warning").css({
        "display": "none"
    })
}

$(function () {
    $("#alert-warning").css({ "display": "none" });
    $("#CateName").blur(function () {
        if ($("#CateName").val() == "") {
            // $("#CateName").focus();
            $("#CateName").attr("placeholder", "该区域为必填区域！");
            $("#alert-warning").css({ "display": "block" });

        }
    }
       );

});


var setting = {
    view: {
        selectedMulti: false
    },
    edit: {
        enable: true,
        showRemoveBtn: false,
        showRenameBtn: false
    },
    data: {
        keep: {
            parent: true,
            leaf: true
        },
        simpleData: {
            enable: true
        }
    },
    callback: {
        beforeDrag: beforeDrag,
        beforeRemove: beforeRemove,
        beforeRename: beforeRename,
        onRemove: onRemove
    }
};
//var zNodes =[
//	{ id:1, pId:0, name:"父节点 1", open:true},
//	{ id:11, pId:1, name:"叶子节点 1-1"},
//	{ id:12, pId:1, name:"叶子节点 1-2"},
//	{ id: 13, pId: 1, name: "叶子节点 1-3" ,open:true},
//    { id: 14, pId: 13, name: "叶子节点 1-3" },
//	{ id:2, pId:0, name:"父节点 2", open:true},
//	{ id:21, pId:2, name:"叶子节点 2-1"},
//	{ id:22, pId:2, name:"叶子节点 2-2"},
//];


var log, className = "dark";
function beforeDrag(treeId, treeNodes) {
    return false;
}
function beforeRemove(treeId, treeNode) {
    className = (className === "dark" ? "" : "dark");
    showLog("[ " + getTime() + " beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
    return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
}
function onRemove(e, treeId, treeNode) {
    showLog("[ " + getTime() + " onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
}
function beforeRename(treeId, treeNode, newName) {
    if (newName.length == 0) {
        alert("节点名称不能为空.");
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        setTimeout(function () { zTree.editName(treeNode) }, 10);
        return false;
    }
    return true;
}
function showLog(str) {
    if (!log) log = $("#log");
    log.append("<li class='" + className + "'>" + str + "</li>");
    if (log.children("li").length > 8) {
        log.get(0).removeChild(log.children("li")[0]);
    }
}
function getTime() {
    var now = new Date(),
    h = now.getHours(),
    m = now.getMinutes(),
    s = now.getSeconds(),
    ms = now.getMilliseconds();
    return (h + ":" + m + ":" + s + " " + ms);
}
function updateTree() {
    $.ajax({
        url: '/Maintain/GetMenuNodes',
        type: 'post',
        dataType: "json",
        traditional: true,
        success: function (data) {
            $.fn.zTree.init($("#treeDemo"), setting, data);
        }
    })
}

var newCount = 1;
function add(e) {
    $("#Other").css("display", "none");
    $("#updateOtherlg").css("display", "none");
    $("#formUp").removeAttr("style");
    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
    isParent = e.data.isParent,
    nodes = zTree.getSelectedNodes(),
    treeNode = nodes[0];
    show('popupdiv');
    var rid;
    if (treeNode) {
        //点击父节点 添加父节点 1 3
        $.ajax({
            url: '/Maintain/GetLastID',
            data: { "idd": treeNode["id"] },
            type: 'post',
            dataType: "json",
            traditional: true,
            success: function (data) {
                $("#Tit").each(function () {
                    var myvalue = 'AddNode';
                    $(this).html(myvalue);
                });
                $("#UpNode input[type='text']").each(function () {
                    $(this).val("");
                });
                $("#sub").bind("click", subAdd);
                //$("#sub").click(subAdd);
                $("#ID").val(data.MAXId + 1);
                data.RootID = data.RootID == 0 ? treeNode["id"] : data.RootID;
                $("#RootID").val(data.RootID);
                $("#ParentID").val(treeNode["id"]);
                $("#CateDescription").val("OnlineOrder");
                $("#UpNode").css({ "display": "block" });

                //treeNode = zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, isParent:isParent, name:"new node" + (newCount++)});
            }
        })
    } else {
        //alert("2");
        //没有任何选中时  2 4
        //treeNode = zTree.addNodes(null, { id: (100 + newCount), pId: 0, isParent: isParent, name: "new node" + (newCount++) });


    }
    if (treeNode) {
        //alert(3);
        //zTree.editName(treeNode[0]);
    } else {
        //alert(4);
        closeDivs('popupdiv');
        alert("叶子节点被锁定，无法增加子节点");
    }
};
function edit() {
    $("#Other").removeAttr("style");
    $("#updateOtherlg").css("display", "none");
    $("#formUp").removeAttr("style");
    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
    nodes = zTree.getSelectedNodes(),
    treeNode = nodes[0];
    if (nodes.length == 0) {
        alert("请先选择一个节点");
        return;
    }
    //zTree.editName(treeNode);
    $("#ID").val(treeNode["id"]);
    show('popupdiv');
    $.ajax({
        url: '/Maintain/UpdateMenuNodes',
        data: { "id": treeNode["id"] },
        type: 'post',
        dataType: "json",
        traditional: true,
        success: function (data) {
            //$.each(data.CountryList, function (i, item) {
            //    var Countrylist = "";
            //    Countrylist = "<option value='" + item.Value + "'>" + item.Text + "</option>";
            //    $("#Country").append(Countrylist);
            //})
            $("#Tit").each(function () {
                var myvalue = 'UpdateNode';
                $(this).html(myvalue);
            });
            $("#sub").bind("click", subUp);
            //$("#sub").click(subUp);
            $("#CateName").val(data.CateName);
            $("#EnCateName").val(data.EnCateName);
            $("#RootID").val(data.RootID);
            $("#ParentID").val(data.ParentID);
            $("#ProcessPage").val(data.ProcessPage);
            $("#ProcessPage_MVC").val(data.ProcessPage_MVC);
            $("#OrderID").val(data.OrderID);
            $("#CateDescription").val(data.CateDescription);
            $("#CateDescription").val(data.CateDescription);
            $("#CateDescription").val(data.CateDescription);
            $("#UpNode").css({ "display": "block" });
            //alert( $("#Tit").html());

        }
    })
};
function remove(e) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
    nodes = zTree.getSelectedNodes(),
    treeNode = nodes[0];
    if (nodes.length == 0) {
        alert("请先选择一个节点");
        return;
    }
    //var callbackFlag = $("#callbackTrigger").attr("checked");
    //zTree.removeNode(treeNode, callbackFlag);
   /// alert(treeNode.isParent);
    if (!treeNode.isParent) {
        var flag = confirm("确认删除？");
        if (flag == true) {
            $.ajax({
                url: '/Maintain/deleteNode',
                data: { "ID": treeNode["id"] },
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    if (data != 1) {
                        alert("删除失败！")
                    } else {
                        updateTree();
                    }
                }
            })
        }
    } else {
        alert("目前无法删除父节点哦...");
    }
    
};


function clearChildren(e) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
    nodes = zTree.getSelectedNodes(),
    treeNode = nodes[0];
    if (nodes.length == 0 || !nodes[0].isParent) {
        alert("请先选择一个父节点");
        return;
    }
    zTree.removeChildNodes(treeNode);
};


$(document).ready(function () {
    $("#addParent").bind("click", { isParent: true }, add);
    $("#addLeaf").bind("click", { isParent: false }, add);
    $("#edit").bind("click", edit);
    $("#remove").bind("click", remove);
    $("#clearChildren").bind("click", clearChildren);
});


$(function () {
    $.ajax({
        url: '/Maintain/GetMenuNodes',
        type: 'post',
        dataType: "json",
        traditional: true,
        success: function (data) {
            $.fn.zTree.init($("#treeDemo"), setting, data);
        }
    })
})

function CloSub() {
    //$("#sub").unbind("click", "");
    $("#UpNode").css({ "display": "none" });
    closeDivs('popupdiv');
}
function subUp() {
    if ($("#CateName").val() == "") {
        $("#alert-warning").css({ "display": "block" });
        $("#CateName").focus();
        $("#CateName").css("background-color", "#FFFFCC");
        return false;
    } else {
        $.ajax({
            url: '/Maintain/CheckUpdate',
            data: { "ID": $("#ID").val(), "CateName": $("#CateName").val(), "EnCateName": $("#EnCateName").val(), "RootID": $("#RootID").val(), "ParentID": $("#ParentID").val(), "ProcessPage": $("#ProcessPage").val(), "ProcessPage_MVC": $("#ProcessPage_MVC").val(), "OrderID": $("#OrderID").val(), "CateDescription": $("#CateDescription").val(), "Note1": $("#Note1").val() },
            dataType: "text",
            traditional: true,
            success: function (data) {
                if (data) {
                    $("#sub").unbind("click", subUp);
                    CloSub();
                    alert("Update-success");
                    updateTree();
                } else {
                    alert("Update-defeated");
                }
            }
        })
    }

}
function subAdd() {
    if ($("#CateName").val() == "") {
        $("#alert-warning").css({ "display": "block" });
        $("#CateName").focus();
        $("#CateName").css("background-color", "#FFFFCC");
        return false;
    } else {
        $.ajax({
            url: '/Maintain/AddNodeMentu',
            data: { "ID": $("#ID").val(), "CateName": $("#CateName").val(), "EnCateName": $("#EnCateName").val(), "RootID": $("#RootID").val(), "ParentID": $("#ParentID").val(), "ProcessPage": $("#ProcessPage").val(), "ProcessPage_MVC": $("#ProcessPage_MVC").val(), "OrderID": $("#OrderID").val(), "CateDescription": $("#CateDescription").val(), "Note1": $("#Note1").val() },
            dataType: "text",
            traditional: true,
            success: function (data) {
                if (data) {
                    $("#sub").unbind("click", subAdd);
                    CloSub();
                    alert("Add-success");
                    updateTree();
                } else {
                    alert("Add-defeated");
                }
            }
        })
        
    }
}
function funOther()
{
    $("#updateOtherlg").removeAttr("style");
    $("#formUp").css("display", "none");
    var ID = $("#ID").val();
    $.post("/Maintain/GetOtherlgByID",ID,function (data)
    {
        debugger;
        $("#EsCateName").val(data);
    });
}
function funUpdateES()
{
    if ($("#CateName").val() == "") {
        $("#alert-warning").css({ "display": "block" });
        $("#CateName").focus();
        $("#CateName").css("background-color", "#FFFFCC");
        return false;
    } else {
        $.ajax({
            url: '/Maintain/CheckUpdateES',
            data: { "ID": $("#ID").val(), "EsCateName": $("#EsCateName").val() },
            dataType: "text",
            traditional: true,
            success: function (data) {
                if (data) {
                    $("#sub").unbind("click", subUp);
                    CloSub();
                    alert("Update-success");
                    updateTree();
                } else {
                    alert("Update-defeated");
                }
            }
        })
    }

}
