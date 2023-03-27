(function () {

  if (input && input.loaded) {
    data.sys_id = input.sys_id;
    data.modules = onLoad();
  }


  function onLoad() {
    var modules = [];
    var moduleGR = new GlideRecordSecure("x_adsr_tap_module");
    moduleGR.query();
    while (moduleGR.next()) {
      var moduleOBJ = {
        "name": moduleGR.name.getDisplayValue(),
        "expected_time": moduleGR.expected_time.getDisplayValue(),
        "associated": getModuleInstance(moduleGR.sys_id, data.sys_id),
        "id": moduleGR.sys_id.getDisplayValue(),
      }
      modules.push(moduleOBJ);
    }
    return modules;
  }


  function getModuleInstance(moduleID, classID) {
    moduleInstGR = new GlideRecordSecure("x_adsr_tap_m2m_module_instance");
    moduleInstGR.addQuery("x_adsr_tap_module", moduleID);
    moduleInstGR.addQuery("x_adsr_tap_class", classID);
    moduleInstGR.query();
    if (moduleInstGR.hasNext()) {
      return true;
    }
    return false;

  }

})();