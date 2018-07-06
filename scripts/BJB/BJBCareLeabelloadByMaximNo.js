$(function () {
    debugger;
    var _MximNoEdit = $("#MaximNoEdit").val();
    $.ajax({
        url: "/BJB/GetEditCancelOrderJSON",
        data: { "_MximNo": _MximNoEdit },
        dataType: 'json',
        type: "post",
        success: function (table) {
            var data = JSON.parse(table.Data)
            debugger;
            if (table.FunStatus == "Success") {
                //Bind OrdTable
                var _OrderStrListHead = "";
                var _OrderStrListHtml = "";
                var productid = data.Item;

                var ShipmentType = data.ShipmentType.substring(13);
                $("#DDLShipmentType").val(ShipmentType);
                $("#Comments").val(data.Comments);
                $("#madein").val(data.MadeIn);
                $("#productid").val(productid);
                $("#productid").attr("disabled", "disabled");
                if (productid == "BJB001-T503" || productid == "BJB001-T506-Satin" || productid == "BJB001-T506" || productid == "BJB001-T504" || productid == "BJB001-T507") {
                    _OrderStrListHead += '<tr class="head">';
                    _OrderStrListHead += '<th>Line</th>';
                    _OrderStrListHead += '<th>Type</th>';
                    _OrderStrListHead += '<th>Size</th>';
                    _OrderStrListHead += '<th>QTY</th>';
                    _OrderStrListHead += '<th>Total QTY</th>';
                    _OrderStrListHead += '<th></th>';
                    _OrderStrListHead += '</tr>';
                    _OrderStrListHead += '<tr>';
                    _OrderStrListHead += '<td></td>';
                    _OrderStrListHead += '<td><select id="Type" class="Type" onchange="TypeChange(this)"><option value="">--Please Select--</option><option value="HER">HER</option><option value="HIM">HIM</option><option value="KIDS">KIDS</option></select></td>';
                    _OrderStrListHead += '<td><select id="Size" class="Size"><option value="">--Please Select--</option></select></td>';
                    _OrderStrListHead += '<td><input id="Qty" class="number" type="number" min="0" value="0"></td>';
                    _OrderStrListHead += '<td></td>';
                    _OrderStrListHead += '<td><button id="btn" type="button" onclick="AddOrderLine(this)">ADD</button></td>';
                    _OrderStrListHead += '</tr>';


                    $("#OrdTable thead").html(_OrderStrListHead);
                }
                else if (productid == "BJB001-T500" || productid == "BJB001-T505") {
                    _OrderStrListHead += '<tr class="head">';
                    _OrderStrListHead += '<th>Line</th>';
                    _OrderStrListHead += '<th>Style Name</th>';
                    _OrderStrListHead += '<th>ART. NO.</th>';
                    _OrderStrListHead += '<th>QTY</th>';
                    _OrderStrListHead += '<th>Total QTY</th>';
                    _OrderStrListHead += '<th></th>';
                    _OrderStrListHead += '</tr>';
                    _OrderStrListHead += '<tr>';
                    _OrderStrListHead += '<td></td>';
                    _OrderStrListHead += '<td><input type="text" id="Style"></td>';
                    _OrderStrListHead += '<td><input type="text" id="ArtNo"></td>';
                    _OrderStrListHead += '<td><input id="Qty" class="number" type="number" min="0" value="0"></td>';
                    _OrderStrListHead += '<td></td>';
                    _OrderStrListHead += '<td><button id="btn" type="button" onclick="AddOrderLine(this)">ADD</button></td>';
                    _OrderStrListHead += '</tr>';
                    $("#OrdTable thead").html(_OrderStrListHead);

                }

                $.each(data._OrderStrList, function (i, item) {

                    if (productid == "BJB001-T503" || productid == "BJB001-T506-Satin" || productid == "BJB001-T506" || productid == "BJB001-T504" || productid == "BJB001-T507") {

                        _OrderStrListHtml += "<tr>";
                        _OrderStrListHtml += "<td><font>" + (i + 1) + "</font><input type='text' value='" + i + "' style='display:none'></td>";
                        _OrderStrListHtml += "<td><select id='Type" + i + "' class='Type' disabled='disabled'><option value='" + item.Orderstr1 + "'>" + item.Orderstr1 + "</option></select></td>";
                        _OrderStrListHtml += "<td><select id='Size" + i + "' class='Size' disabled='disabled'><option value='" + item.Orderstr2 + "'>" + item.Orderstr2 + "</option></select></td>";
                        _OrderStrListHtml += "<td><input id='Qty" + i + "' type='number' class='number QTY' min='0' onchange='FunChange(" + i + ")' value='" + item.Orderstr3 + "'></td>";
                        _OrderStrListHtml += "<td id='Total" + i + "'>" + item.Orderstr3 + "</td><td><button id='btn" + i + "' type='button' onclick='AddOrderLine(this)'>Remove</button></td>";
                        _OrderStrListHtml += "</tr>";
                    }
                    else if (productid == "BJB001-T500" || productid == "BJB001-T505") {
                        _OrderStrListHtml += "<tr>";
                        _OrderStrListHtml += "<td><font>" + (i + 1) + "</font><input type='text' value='" + i + "' style='display:none'></td>";
                        _OrderStrListHtml += "<td><input  type='text' id='Style" + i + "' value='" + item.Orderstr1 + "'/></td>";
                        _OrderStrListHtml += "<td><input  type='text' id='ArtNo" + i + "' value='" + item.Orderstr2 + "'/></td>";
                        _OrderStrListHtml += "<td><input id='Qty" + i + "' type='number' class='number QTY' min='0' onchange='FunChange(" + i + ")' value='" + item.Orderstr3 + "'></td>";
                        _OrderStrListHtml += "<td id='Total" + i + "'>" + item.Orderstr3 + "</td><td><button id='btn" + i + "' type='button' onclick='AddOrderLine(this)'>Remove</button></td>";
                        _OrderStrListHtml += "</tr>";
                    }
                    index++;
                    indexCount++;
                });

                //end
                BindTypeSelect();
                $("#OrderDetailCareLabel").html(_OrderStrListHtml);
                //Bind Fiber
                $.each(data._FiberStrList, function (i, item) {
                    var html = "<tr>";
                    html += "<td></td>";
                    html += "<td>" + item.percentage + "</td>";
                    html += "<td>" + item.Fiber + "</td>";
                    html += "<td><Button class='btn btn-default' onclick='return Remove(this);'>Remove</Button></td>";
                    html += "</tr>";
                    $("#FiberDetail").append(html);
                    $("#ComPercent").val("");
                    $("#FiberID").val("")
                    changeIndex();
                })
                //end

                //Special
                $.each(data._SpeWashStrList, function (i, item) {
                    var Html = ""
                    Html += "<tr>";
                    Html += "<td class='center'>" + item + "</td>";
                    Html += "<td class='center'><Button class='btn btn-default' onclick='return Remove(this);'>Remove</Button></td>";
                    Html += "</tr>";
                    $("#Item2 tbody").append(Html);
                    $("#Item2").css("display", "block");
                    $("#WashcareID2").val("");
                });
                //end

                //Symbols

                //显示下拉
                $("#btnWashingID span").text(data._WashStrList[0].Care_Instruction);
                $("#btnBleachingID span").text(data._WashStrList[1].Care_Instruction);
                $("#btnSpecialID span").text(data._WashStrList[2].Care_Instruction);
                $("#btnDryingID span").text(data._WashStrList[3].Care_Instruction);
                $("#btnIroningID span").text(data._WashStrList[4].Care_Instruction);
                $("#btnProCleanID span").text(data._WashStrList[5].Care_Instruction);
                //隐藏下拉
                $("#WashingID").val(data._WashStrList[0].Care_Symbol);
                $("#BleachingID").val(data._WashStrList[1].Care_Symbol);
                $("#SpecialID").val(data._WashStrList[2].Care_Instruction);
                $("#DryingID").val(data._WashStrList[3].Care_Symbol);
                $("#IroningID").val(data._WashStrList[4].Care_Symbol);
                $("#ProCleanID").val(data._WashStrList[5].Care_Symbol);
                //end
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // 状态码
            console.log(XMLHttpRequest.status);
            // 状态
            console.log(XMLHttpRequest.readyState);
            // 错误信息   
            console.log(textStatus);
        }
    })
})