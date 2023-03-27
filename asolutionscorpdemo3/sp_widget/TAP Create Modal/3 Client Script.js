api.controller=function($scope, $rootScope, spUtil) {
   
  var c = this;
  var sys_id = "";
  var modifiableRecord = false;

  $rootScope.$on('currentClass', function (event, args) {
    loadClass(args.sys_id, args.modifiable);
  });

  function loadClass(id, modifiable) {
    sys_id = id;
    modifiableRecord = modifiable;
  }

  $scope.dateOptions = c.data.dateOptions;
  $scope.submitForm = function() {
    c.data.action = "submitForm";
    c.server.update().then(function(){
      reloadPage(sys_id, modifiableRecord)
      $scope.$parent.$parent.$dismiss();
      c.data.action = undefined;
      spUtil.addInfoMessage("Record Added")
    });
  }

  // $scope.runRefQualifier = function() {
  //   console.log("this worked here");
  //   c.data.action = "referenceQualifierRun";
  //   c.server.update().then(function(){
  //     c.data.action = undefined;
  //   });
  // }


  function reloadPage() {
    $rootScope.$broadcast('refresh', {});
  }
};