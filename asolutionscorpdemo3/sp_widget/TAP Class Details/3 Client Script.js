api.controller=function($scope, $rootScope, spUtil, $window, spModal) {
  /* widget controller */
  var c = this;

  $rootScope.$on('currentClass', function (event, args) {
    loadClass(args.sys_id, args.modifiable);
  });

  function loadClass(id, modifiable) {
    c.data.sys_id = id;
    c.data.modifiable = modifiable;
    c.data.action = "loadClass";
    c.server.update().then(function(){
      c.data.action = undefined;
    });
  }

  // $scope.addModule = function() {
  //   spModal.open({
  //     title:"Create Class",
  //     widget:"tap-create-modal",
  //     //size: "lg",
  //     footerStyle: { display: "none" },
  //     //buttons: [],
  //     widgetInput:{
  //       table: "x_adsr_tap_class",
  //       sys_id:"-1",
  //       query:"",
  //       view:"tap_sp_view",
  //       popup:true,
  //       loaded: true
  //     }
  //   }).then(function(){
  //     console.log("Widget Dissmissed")
  //   })
  // }

  $scope.moduleAdd = function() {
      spModal.open({
        title:"Add Module",
        footerStyle: { display: "none" },
        widget:"tap-create-modal",
        widgetInput:{
          table: "x_adsr_tap_m2m_module_instance",
          fieldName:"x_adsr_tap_class",
          fieldID: c.data.sys_id,
          sys_id:"-1",
          query:"",
          view:"add_module",
          popup:true,
          loaded: true
        }
      }).then(function(){
        console.log("Widget Dissmissed")
      })
  }

  $scope.startClass = function(moduleID, moduleInstID) {
    c.data.moduleInfo = {
      classID: c.data.sys_id,
      modID: moduleID,
      modInstID: moduleInstID
    }

    c.data.action = "createStories";
    c.server.update().then(function(){
      c.data.action = undefined;
    });
   $window.location.reload();
   // spUtil.addInfoMessage("Stories were created for your students");
  }

   $scope.goToModulesPage = function(id){
 	   $window.location.href = "training?id=tap_modules&sys_id=" + id;
   }


};