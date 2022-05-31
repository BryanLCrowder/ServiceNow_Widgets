(function() {
data.eventList = [];
	
	var eventGR = new GlideRecord("u_event");
	eventGR.query();
		while(eventGR.next()) {
			var obj = {};
			obj.id = eventGR.sys_id.toString();
			obj.title = eventGR.u_title.toString();
			obj.start = eventGR.u_start_time.getDisplayValue();
			obj.end = eventGR.u_end_time.getDisplayValue();
			data.eventList.push(obj);
}


})();