(function() {
	data.array = [];
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */
	onPageLoad();
	
	function onPageLoad() {
	var gr = new GlideRecord("incident");
		gr.addQuery("active", "true");
		gr.addQuery("assigned_to", gs.getUserID());
		gr.query();
while(gr.next()) {
   var obj = {};
	obj.short_desc = gr.getDisplayValue("short_description");
	obj.id = gr.getDisplayValue("sys_id");
	obj.state = gr.getDisplayValue("state");
	data.array.push(obj);
}
	}


	

})();