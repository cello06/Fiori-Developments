sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
],
function (Controller, MessageToast , JSONModel) {
    "use strict";

    return Controller.extend("fioriodata001.controller.View1", {
        onInit: function () {

        },
        onListButtonPress(){
            var oView = this.getView();
            var oModel = oView.getModel();
            var sPath = "/persProcessSet";
            oModel.read(sPath,{
                success : function(oSuccess){
                    var oJSONModel = new JSONModel();
                    oJSONModel.setData(oSuccess);
                    oView.setModel(oJSONModel, "mPers");
                    MessageToast.show("Success");
                
                    
                },
                error : function(oError){
                    var sMessage = JSON.parse(oError.responseTesxt).error.message.value;
                    MessageToast.show("Error" + sMessage);
                }
                 
            });
        },
        onCreateButtonPress(){
            var oView = this.getView();
            var oModel = oView.getModel();
            var sPath = "/persProcessSet";

            var oData = {
                PersId: oView.byId("inpId").getValue(),
                PersName:oView.byId("inpName").getValue(),
                PersTitle: oView.byId("inpTitle").getValue()
            }

            oModel.create(sPath, oData, {
                success : function(oSuccess){
                    MessageToast.show("Success");  
                },
                error : function(oError){
                    var sMessage = JSON.parse(oError.responseTesxt).error.message.value;
                    MessageToast.show("Error" + sMessage);
                }
            });
        },

        onReadButtonPress(){
            var oView = this.getView();
            var oModel = oView.getModel();
            var sPersId = oView.byId("inpId").getValue();

            var sPath = "/persProcessSet(PersId='"+ sPersId+"')";

            oModel.read(sPath,{
                success : function(oSuccess){
                    if (oSuccess && oSuccess.PersName && oSuccess.PersName.trim() !== "" && 
                    oSuccess.PersTitle && oSuccess.PersTitle.trim() !== "") {
                        oView.byId("inpName").setValue(oSuccess.PersName);
                        oView.byId("inpTitle").setValue(oSuccess.PersTitle);
                        MessageToast.show("Success");
                    } else {
                        oView.byId("inpName").setValue(" ");
                        oView.byId("inpTitle").setValue(" ");
                        MessageToast.show("Bu ID'ye ait bilgi bulunamadı.");
                    }
                
                    
                },
                error : function(oError){
                    var sMessage = JSON.parse(oError.responseTesxt).error.message.value;
                    MessageToast.show("Error" + sMessage);
                }
                 
            });

        },

        onUpdateButtonPress(){
            var oView = this.getView();
            var oModel = oView.getModel();

            var oData = {
                PersName:oView.byId("inpName").getValue(),
                PersTitle: oView.byId("inpTitle").getValue()
            }

            var sPersId = oView.byId("inpId").getValue();

            var sPath = "/persProcessSet(PersId='"+ sPersId+"')";

            oModel.update(sPath, oData, {
                success : function(oSuccess){
                    MessageToast.show("Success");  
                },
                error : function(oError){
                    var sMessage = JSON.parse(oError.responseTesxt).error.message.value;
                    MessageToast.show("Error" + sMessage);
                }
            });

        },

        onDeleteButtonPress(){
            var oView = this.getView();
            var oModel = oView.getModel();

            var sPersId = oView.byId("inpId").getValue();

            var sPath = "/persProcessSet(PersId='"+ sPersId+"')";
            
            
            oModel.remove(sPath,{

                success : function(oSuccess){
                        MessageToast.show("Success"); 
                },
                error : function(oError){
                    var sMessage = JSON.parse(oError.responseTesxt).error.message.value;
                    MessageToast.show("Error" + sMessage);
                }
            });
        }
    });
});
