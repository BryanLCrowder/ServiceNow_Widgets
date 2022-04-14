api.controller=function(spUtil, $scope, $uibModal, $timeout, spModal) {
  /* widget controller */
  var c = this;
	
	
	$scope.submit = function () {
        c.data.action = "addRecord";
        c.server.update().then(function (r) {
					
				});
    };
	
	$scope.pageChanged = function () {
        c.data.action = "nextRecord";
        c.server.update().then(function (r) {
					
				});
    };
	$scope.arrayValue = c.data.passFailArray;
};

