api.controller=function() {
  var c = this;
	$('#calendar').fullCalendar({
		defaultView: 'listWeek',
		events: c.data.eventList,
		
		header: {
			left:'prev',
			center: "title",
			right: "next"
		}
		
		
	});
	
	
};