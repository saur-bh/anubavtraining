sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("ibm.fin.ar.controller.View1", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ibm.fin.ar.view.View1
		 */
		//	onInit: function() {
		//
		//	},
		onNext: function(){
			var oAppContainer = this.getView().getParent().getParent();
			oAppContainer.to("idView2");
		},
		onDelete: function(oEvent){
			//how do i know which item user press delete?
			var itemToBeDeleted = oEvent.getParameter("listItem");
			var oList = oEvent.getSource();
			//oList = this.getView().byId("myList");
			oList.removeItem(itemToBeDeleted);
		},
		onSearch: function(oEvent){
			//How to read value enetered by user in search field?
			var whatToSearch = oEvent.getParameter("query");
			//Create a filter object - 2 operands and 1 operator
			var oFilter = new Filter("name", FilterOperator.Contains, whatToSearch);
			var oFilter1 = new Filter("type", FilterOperator.Contains, whatToSearch);
			var oSuperman = new Filter({
				filters: [oFilter, oFilter1],
				and:false
			});
			//Q 1: what do you want to filer? --- items (binding created them)
			this.getView().byId("idList").getBinding("items").filter(oSuperman);
		},
		onItemPress: function(oEvent){
			//the selected item object - just for info, will use later,..
			var selectedItem = oEvent.getParameter("listItem");
			//Get the view2 object by traversing through parent
			//var oView2 = this.getView().getParent().getPages()[1];
			//since our strcuture is different now, we are using splitApp
			var oView2 = this.getView().getParent().getParent().getDetailPages()[1];
			//get The address of selected item -  element address
			var sPath = selectedItem.getBindingContextPath();
			//whole second view should now be bound to selected item - absolute path for view 2
			oView2.bindElement(sPath);
			//navigate to next page on click
			this.onNext();
		}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ibm.fin.ar.view.View1
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ibm.fin.ar.view.View1
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ibm.fin.ar.view.View1
		 */
		//	onExit: function() {
		//
		//	}

	});

});