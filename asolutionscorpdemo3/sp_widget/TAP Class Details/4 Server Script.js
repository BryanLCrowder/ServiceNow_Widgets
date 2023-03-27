(function() {
  data.classDetails = {};
  data.buttons = false;
 
  if(input && input.action === "loadClass") {
    data.buttons = input.modifiable;

    var classDetailsGR = new GlideRecordSecure("x_adsr_tap_class");
    //classDetailsGR.addQuery("sys_id", input.sys_id);
    classDetailsGR.get(input.sys_id)
      var classDetailOBJ = {
        "name":classDetailsGR.name.getDisplayValue(),
        "progress":classDetailsGR.progress.getDisplayValue(),
        "short_desc":classDetailsGR.short_description.getDisplayValue(),
        "type":classDetailsGR.type.getDisplayValue(),
        "level":classDetailsGR.level.getDisplayValue(),
        "sys_id":classDetailsGR.sys_id.getDisplayValue(),
        "modules": getModules(input.sys_id)
      }
      data.classDetails = classDetailOBJ;
    
  }


  function getModules(classID) {
    var modules = [];
    moduleInstGR = new GlideRecordSecure("x_adsr_tap_m2m_module_instance");
    moduleInstGR.addQuery("x_adsr_tap_class", classID);
    moduleInstGR.query();
    while(moduleInstGR.next()) {
      moduleOBJ = {
				"id": moduleInstGR.x_adsr_tap_module.sys_id.getDisplayValue(),
        "module_id": moduleInstGR.sys_id.toString(),
        "name": moduleInstGR.x_adsr_tap_module.name.getDisplayValue(),
        "description": moduleInstGR.x_adsr_tap_module.description.getDisplayValue(),
        "expected_time": moduleInstGR.x_adsr_tap_module.expected_time.getDisplayValue(),
        "completion": new x_adsr_tap.userRoleUtility().getModuleCompletion(),
      }
      modules.push(moduleOBJ);
    }
    return modules;
  }


  if(input && input.action === "createStories") {
    var obj = {
      "classID": input.moduleInfo.classID,
      "moduleID": input.moduleInfo.modID,
      "moduleInstID": input.moduleInfo.modInstID
    };
    var obj = JSON.stringify(obj);

    gs.eventQueue('x_adsr_tap.create_story_instance', null, obj, null);
    //new userRoleUtility().generateStoryInstances(input.moduleInfo.classID, input.moduleInfo.modID, input.moduleInfo.modInstID);
    
  }



})();