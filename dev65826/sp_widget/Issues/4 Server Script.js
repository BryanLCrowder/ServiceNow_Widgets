(function() {
data.styleLoad=true;
data.defaultRecords = 5;
data.arrayIndex = "";
data.states = [
    {name:"New",
    value: "1",
    issues: [],
    opened: true,
    records: data.defaultRecords},
    {name:"Pending Approval",
    value: "2",
    issues: [],
    opened: true,
    records: data.defaultRecords},
    {name:"Open",
    value: "5",
    issues: [],
    opened: true,
    records: data.defaultRecords},
    {name:"Action Plan Implementation",
    value: "0",
    issues: [],
    opened: true,
    records: data.defaultRecords},
    {name:"Remediated",
    value: "3",
    issues: [],
    opened: true,
    records: data.defaultRecords},
    {name:"Pending Final Approval",
    value: "4",
    issues: [],
    opened: true,
    records: data.defaultRecords}
];
onLoad();

if(input && input.action == "loadMoreRecords") {
    loadMoreRecords();
}

function onLoad() {

    for(var i = 0; i < data.states.length; i++) {
    var gr = new GlideRecord('sn_grc_issue');
    gr.addQuery("state", data.states[i].value);
    gr.chooseWindow(0, data.defaultRecords);
    gr.query();
    while(gr.next()) {
        //console.log(gr.assigned_to.toString())
        var obj = {
            number: gr.number.toString(),
            priority: gr.priority.getDisplayValue(),
            assigned_to: gr.assigned_to.getDisplayValue(),
            name: gr.name.toString(),
            due: gr.due_date.toString(),
            userImage: loadUserData(gr.assigned_to.toString())
        };
        data.states[i].issues.push(obj);
    }

}
}

function loadMoreRecords() {
    data.styleLoad = false;
    var tempArray = input.states;
    tempArray[input.arrayIndex].issues = [];
    var records = tempArray[input.arrayIndex].records += data.defaultRecords;
    var gr = new GlideRecord('sn_grc_issue');
    gr.addQuery("state", tempArray[input.arrayIndex].value);
    gr.chooseWindow(0, records);
    gr.query();
    while(gr.next()) {
       
        var obj = {
            number: gr.number.toString(),
            priority: gr.priority.getDisplayValue(),
            priorityValue: gr.priority.toString(),
            assigned_to: gr.assigned_to.getDisplayValue(),
            name: gr.name.toString(),
            due: gr.due_date.toString(),
            userImage: loadUserData(gr.assigned_to.toString())
        };
        tempArray[input.arrayIndex].issues.push(obj);
}
data.states = tempArray;

}

function loadUserData(userID) {
    console.log(userID);
    var gr = new GlideRecord("live_profile");
    gr.addQuery("document", "userID");
    gr.query();
    while(gr.next()) {
        console.log(gr.name.toString());
    }


    // var attachmentGR = new GlideRecord("sys_attachment");
    // attachmentGR.get("table_sys_id", id);
    
    // return attachmentGR.file_name;
    return "bryan";
}


})();