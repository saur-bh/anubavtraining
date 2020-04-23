sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller,History) {
	"use strict";

	return Controller.extend("ibm.fin.ar.controller.SupplierDetail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ibm.fin.ar.view.SupplierDetail
		 */
		onInit: function () {this.oRouter = this.getOwnerComponent().getRouter();
				this.oRouter.attachRoutePatternMatched(this._routeMatch,this);
						
						
		
			},
			 _routeMatch:function(oEvent){
			 	
			 	var fruitIndex  = oEvent.getParameter("arguments").index ;
			 		var supLierInde = oEvent.getParameter("arguments").sindex;
			 	
			 	this.getView().bindElement("/Supplier/"+supLierInde);
			 } ,
			 
			 onBack:function(){
			 	
			 	var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("", true);
			}
			 }
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ibm.fin.ar.view.SupplierDetail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ibm.fin.ar.view.SupplierDetail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ibm.fin.ar.view.SupplierDetail
		 */
		//	onExit: function() {
		//
		//	}

	});

});