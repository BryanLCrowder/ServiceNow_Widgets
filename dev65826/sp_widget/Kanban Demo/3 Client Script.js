api.controller = function($scope) {
//     /* widget controller */
     var c = this;
// var list_items = document.querySelectorAll('.list-item');
// var lists = document.querySelectorAll('.list');

// var draggedItem = null;

// for (var i = 0; i < list_items.length; i++) {
// 	var item = list_items[i];

// 	item.addEventListener('dragstart', function () {
// 		draggedItem = item;
// 		setTimeout(function () {
// 			item.style.display = 'none';
// 		}, 0);
// 	});

// 	item.addEventListener('dragend', function () {
// 		setTimeout(function () {
// 			draggedItem.style.display = 'block';
// 			draggedItem = null;
// 		}, 0);
// 	});

// 	for (var j = 0; j < lists.length; j ++) {
// 		var list = lists[j];

// 		list.addEventListener('dragover', function (e) {
// 			e.preventDefault();
// 		});
		
// 		list.addEventListener('dragenter', function (e) {
// 			e.preventDefault();
// 			this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
// 		});

// 		list.addEventListener('dragleave', function (e) {
// 			this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
// 		});

// 		list.addEventListener('drop', function (e) {
// 			this.append(draggedItem);
// 			this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
// 		});
// 	}
// }
	
	

// };

$scope.models = {
	selected: null,
	lists: {"A": [], "B": []}
};

// Generate initial model
for (var i = 1; i <= 3; ++i) {
	$scope.models.lists.A.push({label: "Item A" + i});
	$scope.models.lists.B.push({label: "Item B" + i});
}

// Model to JSON for demo purpose
$scope.$watch('models', function(model) {
	$scope.modelAsJson = angular.toJson(model, true);
}, true);
};