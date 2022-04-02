api.controller = function() {
    var c = this;
    $("#calendar").fullCalendar({

        events: c.data.eventList,
        header: {
            left: 'prev',
            center: 'title',
            right: 'next'
        },

        themeSystem: 'bootstrap3',
		aspectRatio:2,
        eventClick: function(calEvent) {
            var redirect = '?id=event_details&sys_id=' + calEvent.id;
            top.window.location = redirect;
        },

        eventMouseover: function(event) {
            $(this).css({
                "cursor": "pointer"
            });
        }


    });
};