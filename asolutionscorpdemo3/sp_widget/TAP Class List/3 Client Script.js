api.controller = function ($scope, $rootScope, spUtil, $timeout) {
  /* widget controller */
  var c = this;

  $scope.filterItems = "active";
  let modifiableRecord = false;
  let classID = "";

  $scope.currentClass = function (id, when) {
    $timeout(function () {
      classID = id;
      if(when === "active" || when === "upcoming") {
        modifiableRecord = true;
        
      }
      else {
        modifiableRecord = false;
      }
      broadcating(id, modifiableRecord);
        
      },
      1);
  }

  function broadcating(id, modifiableRecord) {
    console.log(id);
    $rootScope.$broadcast('currentClass', {
      sys_id: id,
      modifiable: modifiableRecord
    });
  }

  for (var i = 0; i < c.data.classes.length; i++) {

    if (c.data.classes[i].when === "active") {

      c.data.classes[i].selected = true;
      $scope.currentClass(c.data.classes[i].sys_id, "active");
    }

    break;
  }


  $scope.changeSelected = function (id) {
    for (var k = 0; k < c.data.classes.length; k++) {
      c.data.classes[k].selected = false;
    }

    for (var j = 0; j < c.data.classes.length; j++) {
      if (c.data.classes[j].sys_id == id) {
        c.data.classes[j].selected = true;
        //console.log(c.data.classes);
        break;
      }
    }

  }

  $rootScope.$on('refresh', function (event, args) {
    broadcating(classID, modifiableRecord);
    c.server.update();
  });

  $scope.changeFilter = function (filter) {
    $scope.filterItems = filter;
  }
  //console.log($scope.filterItems);
};