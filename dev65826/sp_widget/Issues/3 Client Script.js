api.controller=function($scope) {
  /* widget controller */
  var c = this;

  $scope.loadedStyle = "loadedDiv";
  $scope.closeStyle = "closed";

  $scope.changeStyle = function() {
    $scope.loadedStyle = "";
  };
  $scope.changeStyleTrue = function() {
    $scope.loadedStyle = "loadedDiv";
  };

  $scope.changeClosedStyle = function() {
    $scope.closeStyle = "";
  };

  $scope.changeClosedStyleTrue = function() {
    $scope.closeStyle = "closed";
  };

  $scope.detailsPage = function() {
    
  };

  $scope.loadMoreRecords = function(index) {
    c.data.arrayIndex = index;
    c.data.action = "loadMoreRecords";
    c.server.update().then(function() {
      c.data.action = undefined;
      $scope.changeStyle();
  });
  };

  $scope.avatarPicture = "";

};