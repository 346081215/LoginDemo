$(function () {
    function confirmOrderGroupQuery() {
        var queryData = {
            orderNumber: $('#txtOrderNumber').val()
        };
        $.ajax({
            url: '/ECI/ConfirmOrderGroupQuery',
            type: 'get',
            data: queryData,
            success: showQueryResult
        });
    }

    function generateRowHtml(item) {
        var text = '';
        item && Array.isArray(item.Details) && item.Details.forEach(function (detail, index, array) {
            if (index === 0) {
                var artworkLink = 'View';
                var confirmLink = 'Confirm';
                if (item.ViewArtwork === true) {
                    artworkLink = `<a href="/ECI/ViewOrderGroupArtwork?code=${detail.Code}" target="_blank">View</a>`;
                    confirmLink = `<a href="#" class="confirm-link" value="${detail.Code}">Confirm</a>`;
                }

                text += `
<tr>
    <td rowspan="${array.length}">${detail.CustomerPO}</td>
    <td>${detail.MaximNO}</td>
    <td>${detail.ProductItemCode}</td>
    <td>${detail.OrderQty}</td>
    <td rowspan="${array.length}">${artworkLink}</td>
    <td rowspan="${array.length}">${confirmLink}</td>
</tr>`;
            } else {
                text += `
<tr>
    <td>${detail.MaximNO}</td>
    <td>${detail.ProductItemCode}</td>
    <td>${detail.OrderQty}</td>
</tr>`;
            }
        });
        return text;
    }

    function showQueryResult(e) {
        var table = '<table class="table dataTable"><tr><th>PO#</th><th>Maxim#</th><th>Item</th><th>Quantity</th><th>Artwork</th><th>Confirm</th></tr>';
        e.Data && e.Data.forEach(function (item) {
            table += generateRowHtml(item);
        });
        table += '</table>';
        $('#queryResult').html(table);
    }

    $('#btnQuery').click(confirmOrderGroupQuery);

    $('#Close').click(function () {
        $('#Success').hide();
        $('#step1').removeClass('gray-em').addClass('red-em');
        $('#OK').hide();
        $('#lblOrderNO').val('');
        confirmOrderGroupQuery();
    });

    $('#queryResult').on('click', 'a.confirm-link', function () {
        $("#HidPO").val(this.parentElement.parentElement.children[0].innerText);
        if (!window.confirm('Are you sure to Submit?')) {
            return;
        }
        $.ajax({
            url: '/ECI/ConfirmOrderGroup',
            type: 'post',
            data: {
                code: $(this).attr('value')
            },
            success: function (data) {
                if (data && data.successOrders && data.successOrders.length > 0) {
                    var html = "";
                    $.each(data.successOrders, function (index, item) {
                        if (index == 0) {
                            html += "<tr>"
                            html += "<td rowspan='" + data.successOrders.length + "'>" + $("#HidPO").val() + "</td>"
                            html += "<td>" + item + "</td>"
                            html += "</tr>"
                        } else {
                            html += "<tr>"
                            html += "<td>" + item + "</td>"
                            html += "</tr>"
                        }
                    })
                    //data.successOrders.join(',')
                    $('#lblOrderNO').html(html);


                    $('#step1').removeClass('red-em').addClass('gray-em');
                    $('#OK').removeClass('gray-em').addClass('red-em');
                    $('#OK').removeAttr('style');
                    $('#Success').slideDown();
                    $('#Query').hide();
                } else {
                    $('#labtxt').html('Confirm order failed.');
                    showDiv();
                }
            }
        });
    });
})