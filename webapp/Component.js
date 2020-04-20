sap.ui.define(["sap/ui/core/UIComponent", "sap/m/Button"],
	function(UIComponent, Btn){
		return UIComponent.extend("ibm.fin.ar.Component",{
			metadata: {
				manifest: "json"
			},
			init: function(){
				//we will write initilization code like initialization of router
				//calling the base class construtor in child class
				sap.ui.core.UIComponent.prototype.init.apply(this);
			},
			createContent: function(){
				//here we create content which needs to be displayed to the user
				var oView1 = new sap.ui.view("idApp",{
					type:sap.ui.core.mvc.ViewType.XML	,
					viewName: "ibm.fin.ar.view.App"
				});
				return oView1;
			},
			destroy: function(){
				//clean up code
				sap.ui.core.UIComponent.prototype.destroy.apply(this);
			}
		});
	}
);