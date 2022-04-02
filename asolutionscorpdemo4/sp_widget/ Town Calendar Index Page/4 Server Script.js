(function() {

    data.eventList = [];
    var eventGR = new GlideRecordSecure('x_adsr_town_event');
    eventGR.query();
    while (eventGR.next()) {

        var eventJSON = {};
        eventJSON.id = eventGR.getDisplayValue("sys_id");
        eventJSON.title = eventGR.getDisplayValue("title");
        eventJSON.start = eventGR.getDisplayValue("start_date");
        eventJSON.end = eventGR.getDisplayValue("end_date");
        eventJSON.description = eventGR.getDisplayValue("description");
        data.eventList.push(eventJSON);
    }
})();