api.controller=function($scope,spModal, $rootScope ,$window) {
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



  $scope.addTrainee = function() {
    spModal.open({
      title:"Create Class",
      footerStyle: { display: "none" },
      widget:"tap-create-modal",
      widgetInput:{
        table: "x_adsr_tap_m2m_trainee",
        fieldName:"x_adsr_tap_class",
        fieldID: c.data.sys_id,
        sys_id:"-1",
        query:"",
        view:"add_trainee",
        popup:true,
        loaded: true
      }
    }).then(function(){
      console.log("Widget Dissmissed")
    })
  }

  $scope.deleteTrainee = function(id) {
    c.data.traineeID = id;
    c.data.action = "deleteTrainee";
    c.server.update().then(function(){
      c.data.action = undefined;
    });
  }

  $scope.goToTraineePage = function(id) {
    $window.location.href = "training?id=tap_trainee&sys_id=" + id;
  }
};