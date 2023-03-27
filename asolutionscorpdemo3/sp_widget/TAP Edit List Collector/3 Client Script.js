api.controller=function($scope, $rootScope) {
  /* widget controller */
  var c = this;
  $scope.modules = c.data.modules;
  //$scope.selected = [];
  //$scope.unselected = [];


  // for(var i = 0; i < c.data.modules.length;i++) {
  //   if(c.data.modules[i].associated == true) {
  //   $scope.selected.push(c.data.modules[i]);
  //   }
  //   else {
  //     $scope.unselected.push(c.data.modules[i]);
  //   }
  // }
  // console.log($scope.unselected)

 $scope.setAssociated = function(item) {
  $scope.$evalAsync(
    item.associated = !item.associated
  );
  
 }

//  $scope.addModule = function(item) {
//   var index = $scope.unselected.indexOf(item);
//   $scope.unselected.splice(index,1);
//   $scope.selected.push(item);
//  }

//  $scope.removeModule = function(item) {
//   var index = $scope.selected.indexOf(item);
//   $scope.selected.splice(index,1);
//   $scope.unselected.push(item);
//  }


};