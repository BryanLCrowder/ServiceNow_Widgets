api.controller = function($scope, spUtil) {
    /* widget controller */
    var c = this;
    $scope.models = {
        selected: null,
        lists: c.data.state_array
    };
	
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);
	
	$scope.changedValue = function(indexValue, array) {
		console.log(array.value);
		//bryan was here
	//for (var state=0; state < array.length; state++) {
	//		for(var record=0; record < array[state].records.length; record++) {
				
	//			if(array[state].records[record].id == indexValue) {
	//				c.data.state = array[state].value;
	//			}
	//		}
//	}
	//	console.log("Changed Value - " + array.label + "  ");
		c.data.changedID = indexValue;
	//	c.data.action = "update";
		//c.server.update().then(function (r) {
   //     c.data.action = undefined;
  //      });
	}
};