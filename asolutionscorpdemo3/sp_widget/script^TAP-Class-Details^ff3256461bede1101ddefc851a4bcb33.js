(function() {
  data.classDetails = [];
  data.buttons = false;
 
  if(input && input.action === "loadClass") {
    data.buttons = input.modifiable;

    var classDetailsGR = new GlideRecordSecure("x_adsr_tap_class");
    classDetailsGR.addQuery("sys_id", input.sys_id);
    classDetailsGR.query();
    while(classDetailsGR.next()) {
      var classDetailOBJ = {
        "name":classDetailsGR.name.getDisplayValue(),
        "progress":classDetailsGR.progress.getDisplayValue(),
        "short_desc":classDetailsGR.short_description.getDisplayValue(),
        "type":classDetailsGR.type.getDisplayValue(),
        "level":classDetailsGR.level.getDisplayValue(),
        "sys_id":classDetailsGR.sys_id.getDisplayValue(),
        "modules": getModules(input.sys_id)
      }
      data.classDetails.push(classDetailOBJ);
    }
  }


  function getModules(classID) {
    var modules = [];
    moduleInstGR = new GlideRecordSecure("x_adsr_tap_m2m_module_instance");
    moduleInstGR.addQuery("x_adsr_tap_class", classID);
    moduleInstGR.query();
    while(moduleInstGR.next()) {
      moduleOBJ = {
        "name": moduleInstGR.x_adsr_tap_module.name.getDisplayValue(),
        "description": moduleInstGR.x_adsr_tap_module.description.getDisplayValue(),
        "expected_time": moduleInstGR.x_adsr_tap_module.expected_time.getDisplayValue(),
        "completion": new x_adsr_tap.userRoleUtility().getModuleCompletion(),
      }
      modules.push(moduleOBJ);
    }
    return modules;
  }



})();