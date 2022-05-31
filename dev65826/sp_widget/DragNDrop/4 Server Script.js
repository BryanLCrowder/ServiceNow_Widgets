(function() {

    data.state_array = [];
		data.state = "";
    //gatherRecords();
  if(!input) {
		gatherStateChoices();
	}
	
	if(input && input.action == "update") {
		updateRecord();
	}
	
    function gatherRecords(state) {
        var array = [];
        var gr = new GlideRecord(options.table);
        gr.addQuery("active", true);
        gr.addQuery("state", state);
        gr.query();
        while (gr.next()) {
            var obj = {
                id: gr.sys_id.toString(),
                number: gr.number.getDisplayValue(),
                state: gr.state.getDisplayValue()
            };
            array.push(obj);
        }
        return array;
    }

    function gatherStateChoices() {
        var gr = new GlideRecord('sys_choice');
        gr.addEncodedQuery('name=' + options.table + '^element=state');
        gr.query();
        while (gr.next()) {
            var obj = {
                id: gr.sys_id.toString(),
                label: gr.label.toString(),
                value: gr.value.toString(),
                records: gatherRecords(gr.value.toString())

            };
            data.state_array.push(obj);

        }
    }
	
	function updateRecord() {
		var gr = new GlideRecord(options.table);
		gr.addQuery("sys_id", input.changedID);
		gr.query();
		while(gr.next()) {
			gr.state = input.state;
			gr.update();
		}
	}


})();