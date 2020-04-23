sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/ui/core/routing/History"
], function(Controller, MsgBox, MsgToast,History) {
	"use strict";

	return Controller.extend("ibm.fin.ar.controller.View2", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ibm.fin.ar.view.View2
		 */
			onInit: function() {
				
				this.oRouter = this.getOwnerComponent().getRouter();
				this.oRouter.attachRoutePatternMatched(this._routeMatch,this);
						
						
		
			},
			 _routeMatch:function(oEvent){
			 	
			 	var sPath  = oEvent.getParameter("arguments").index ;
			 	
			 	this.getView().bindElement("/fruits/"+sPath);
			 } ,
			
		onBack: function(){
			
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("", true);
			}
		
		},
		onItemPressed:function(oEvent){
			
			var selectSupple = oEvent.getParameter("listItem").getBindingContextPath();
			var selectedFruit =	this.oRouter.getHashChanger().hash ;
			var fruit =  selectedFruit.split("/")[1];
			var sPath = selectSupple.split("/")[2];
			this.oRouter.navTo("supplierDetail",{
				sindex:sPath,
				index:fruit
			});
		} ,
		onSelect: function(oEvent){
			var oComboControl = oEvent.getSource();
			var items = oComboControl.getSelectedItems();
			if(items.length > 2){
				oComboControl.setValueState(sap.ui.core.ValueState.Error);
				oComboControl.setValueStateText("Bhaiya ise sahi karlo");
			}else{
				oComboControl.setValueState(sap.ui.core.ValueState.None);
			}
		},
		oPopSupplier: null,
		oPopCities: null,
		onSettings: function(){
			//MsgBox.confirm("This page is under constuction...");
			if(!this.oPopSupplier){
				this.oPopSupplier = new sap.ui.xmlfragment("ibm.fin.ar.fragments.popup");
				//go vulnerable
				this.getView().addDependent(this.oPopSupplier);
				this.oPopSupplier.bindAggregation("items",{
					path: "/Supplier",
					template: new sap.m.DisplayListItem({
						value: "{city}",
						label: "{name}"
					})
				});
			}
			this.oPopSupplier.open();
		},
		onConfirm: function(oEvent){
			var oSelectedItem = oEvent.getParameter("selectedItem");
			var cityName = oSelectedItem.getTitle();
			sap.ui.getCore().byId(this.fieldId).setValue(cityName);
		},
		fieldId: "",
		onF4Help: function(oEvent){
			this.fieldId = oEvent.getSource().getId();
			//MsgToast.show("Please check later");
			if(!this.oPopCities){
				this.oPopCities = new sap.ui.xmlfragment("ibm.fin.ar.fragments.popup");
				this.getView().addDependent(this.oPopCities);
				this.oPopCities.setMultiSelect(false);
				this.oPopCities.bindAggregation("items",{
					path: "/Cities"	,
					template: new sap.m.StandardListItem({
						icon: "sap-icon://home",
						title: "{name}",
						description: "{state}"
					})
				});
				this.oPopCities.attachConfirm(this.onConfirm, this);
			}
			this.oPopCities.open();
		},
		
		onSave:function(){
			MsgBox.confirm("do you want to save?",{
				onClose: this.onClose
			});
		},
		onClose: function(args){
			if(args === "OK"){
				MsgToast.show("Your object is saved successfully");
			}else{
				MsgBox.error("Object could not be saved");
			}
		}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ibm.fin.ar.view.View2
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ibm.fin.ar.view.View2
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ibm.fin.ar.view.View2
		 */
		//	onExit: function() {
		//
		//	}

	});

});