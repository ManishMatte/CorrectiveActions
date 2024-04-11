/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "caworklist/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("caworklist.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                var gModel = new sap.ui.model.json.JSONModel({
                    "filter":[],
                    "combo":"",
                    "status":[
                        {
                            "key":1,
                            "text":"Open"
                        },
                        {
                            "key":2,
                            "text":"In Progress"
                        },
                        {
                            "key":3,
                            "text":"Closed"
                        }
                    ],
                    "payload":{
                        "name":"",
                        "description":"",
                        "dueDate":null,
                        "assignedTo" : "",
                        "assignDate" : null,
                        "status" : "",
                        "incident_ID":""
                    }
                });
                this.setModel(gModel,'gModel');
            }
        });
    }
);