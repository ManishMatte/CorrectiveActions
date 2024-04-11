sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/FilterOperator',
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, FilterOperator, MessageBox) {
        "use strict";

        return Controller.extend("caworklist.controller.CorrectiveActionWorklist", {
            onInit: function () {

            },
            formatDate: function (date) {

                return new Date(date).toISOString().split('T')[0].split('-')[2] + '/'
                    + new Date(date).toISOString().split('T')[0].split('-')[1] + '/'
                    + new Date(date).toISOString().split('T')[0].split('-')[0];

            },
            onSearch: function () {

                var gModel = this.getOwnerComponent().getModel('gModel');
                var filtername = gModel.getProperty('/filter');
                var final = [], aTableFilters = [];

                for (var i = 0; i < filtername.length; i++) {
                    if (filtername[i] !== '') {
                        // final.push(filtername[i]);

                        aTableFilters.push(new sap.ui.model.Filter({
                            path: "name",
                            operator: FilterOperator.Contains,
                            value1: filtername[i]
                        }));

                    };
                };

                var combo = gModel.getProperty('/combo');

                //     if(combo !== undefined && combo !== null && combo !== ''){

                //     aTableFilters.push(new sap.ui.model.Filter({
                //         path: "name",
                //         operator: FilterOperator.Contains,
                //         value1: combo
                //     }));
                // }

                this.oTable = this.getView().byId("table");
                this.oTable.getBinding("rows").filter(aTableFilters);

            },
            onClear: function () {
                var gModel = this.getOwnerComponent().getModel('gModel');
                gModel.setProperty('/filter', []);
                this.oTable = this.getView().byId("table");
                this.oTable.getBinding("rows").filter([]);

            },
            onClickCreate: function () {

                // create dialog lazily
                if (!this.oMPDialog) {
                    this.oMPDialog = sap.ui.xmlfragment("caworklist.view.fragments.MPDialog", this);
                }


                this.getView().addDependent(this.oMPDialog);

                this.oMPDialog.open();

            },

            onCancel: function () {

                if (!this.oMPDialog) {
                    this.oMPDialog = sap.ui.xmlfragment("caworklist.view.fragments.MPDialog", this);
                }
                this.getView().addDependent(this.oMPDialog);
                this.oMPDialog.close();
            },

            clearModel: function () {

                var gModel = this.getOwnerComponent().getModel('gModel');
                gModel.setProperty("/payload",
                    {
                        "name": "",
                        "description": "",
                        "dueDate": null,
                        "assignedTo": "",
                        "assignDate": null,
                        "status": "",
                        "incident_ID":""
                    });
                this.getView().getModel().refresh();
            },

            onFragSubmit: function () {

                if (!this.oMPDialog) {
                    this.oMPDialog = sap.ui.xmlfragment("caworklist.view.fragments.MPDialog", this);
                }
                var that = this;
                var gModel = this.getOwnerComponent().getModel('gModel');
                var payload = gModel.getProperty('/payload');

                $.ajax({
                    type: "POST",
                    url: "/odata/v4/employee-safety-incidents/CorrectiveActions",
                    data: JSON.stringify(payload),
                    success: function (response, statusText, xhrToken) {

                        MessageBox.success("Corrective Action Submitted Successfully.");
                        that.oMPDialog.close();
                        that.clearModel();

                    },
                    contentType: "application/json"
                });

                gModel.setProperty('/filter', []);
                this.oTable = this.getView().byId("table");
                this.oTable.getBinding("rows").filter([]);

            },
            onWarning2MessageBoxPress: function () {
                
            },

            onDelete: function(oEvent){

                var that = this;

                var CAID = oEvent.getSource().getBindingContext().getObject().ID;
                
                    MessageBox.warning("Are you sure, you want to delete CA with ID "+CAID+"?", {
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: function (sAction) {
                        
                        if(sAction === 'OK'){
                            $.ajax({
                                type: "DELETE",
                                url: '/odata/v4/employee-safety-incidents/CorrectiveActions(' + CAID + ')',
                                success: function () {
                                  var msg = "delete successful";
                                  console.log(msg);
                                },
                              });

                              MessageBox.success("Deleted Successfully.");    

                              that.getView().getModel().refresh();
                        }
                    }
                });


            }

        });
    });
