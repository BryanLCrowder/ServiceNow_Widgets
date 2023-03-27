(function() {
data.classes = [];
const userID = gs.getUserID();

onLoad();

function onLoad() {
  let now = new GlideDate();
  const userRole = new x_adsr_tap.userRoleUtility().privileges();

if(userRole === "trainer") {
  var classGR = new GlideRecordSecure("x_adsr_tap_class");
  classGR.addQuery("trainer", userID);
  classGR.query();
  while(classGR.next()) {
    let when;
    if(now >= classGR.start && now <= classGR.end) {
      when = "active";
    }
    else if(now < classGR.start) {
      when = "upcoming";
    }
    else if(now > classGR.end) {
      when = "completed";
    }
    var classOBJ = {
      "name":classGR.name.getDisplayValue(),
      "progress":classGR.progress.getDisplayValue(),
      "short_desc":classGR.short_description.getDisplayValue(),
      "type":classGR.type.getDisplayValue(),
      "level":classGR.level.getDisplayValue(),
      "when":when,
      "sys_id":classGR.sys_id.getDisplayValue(),
      "selected": false
    }
    data.classes.push(classOBJ);
  }


  }
}

// var gr = new GlideRecord("sysevent");
// gr.addEncodedQuery("parm1=sys_updated_on");
// gr.query();
// while(gr.next()) {
//   console.log("bryna")
// }



})();