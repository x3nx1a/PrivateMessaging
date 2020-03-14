$(function () {

    var l = abp.localization.getResource('PrivateMessaging');

    var service = easyAbp.privateMessaging.privateMessages.privateMessage;
    var detailModal = new abp.ModalManager(abp.appPath + 'PrivateMessages/PrivateMessage/DetailModal');
    var createModal = new abp.ModalManager(abp.appPath + 'PrivateMessages/PrivateMessage/CreateModal');

    var dataTable = $('#PrivateMessageTable').DataTable(abp.libs.datatables.normalizeConfiguration({
        processing: true,
        serverSide: true,
        paging: true,
        searching: false,
        autoWidth: false,
        scrollCollapse: true,
        order: [[1, "asc"]],
        ajax: abp.libs.datatables.createAjax(service.getList),
        columnDefs: [
            {
                rowAction: {
                    items:
                        [
                            {
                                text: l('Read'),
                                action: function (data) {
                                    service.setRead([data.record.id])
                                        .then(function () {
                                            detailModal.open({ id: data.record.id });
                                            dataTable.ajax.reload();
                                        })
                                }
                            },
                            {
                                text: l('SetRead'),
                                action: function (data) {
                                    service.setRead([data.record.id])
                                        .then(function () {
                                            dataTable.ajax.reload();
                                        });
                                }
                            },
                            {
                                text: l('Delete'),
                                confirmMessage: function (data) {
                                    return l('PrivateMessageDeletionConfirmationMessage', data.record.title.substring(0, 10) + '...');
                                },
                                action: function (data) {
                                    service.delete(data.record.id)
                                        .then(function () {
                                            abp.notify.info(l('SuccessfullyDeleted'));
                                            dataTable.ajax.reload();
                                        });
                                }
                            }
                        ]
                }
            },
            {
                data: "creator.userName",
                render: function ( data, type, row, meta ) { return renderRow(row, data) }
            },
            {
                data: "title",
                render: function ( data, type, row, meta ) { return renderRow(row, data) }
            },
            {
                data: "creationTime",
                render: function ( data, type, row, meta ) { return renderRow(row, data) }
            }
        ]
    }));

    function renderRow(row, data) {
        return row.readTime == null ? '<span class="bold">' + data + '</span>' : data;
    }
    
    createModal.onResult(function () {
        dataTable.ajax.reload();
    });

    $('#NewPrivateMessageButton').click(function (e) {
        e.preventDefault();
        createModal.open();
    });
});