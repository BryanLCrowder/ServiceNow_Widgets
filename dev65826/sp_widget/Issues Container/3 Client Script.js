api.controller=function($scope) {
  /* widget controller */
  var c = this;
  $scope.issues = "All Issues"
  $scope.filter = [
    {name:'Issue ID (Ascending)', id:1},
    {name:'Issue ID (Descending)', id:2},
    {name:'Issue Title (A-Z)', id:3},
    {name:'Issue Title (Z-A)', id:4},
    {name:'Issue Due Date (Ascending)', id:5},
    {name:'Issue Due Date (Descending)', id:6},
    {name:'Owning Organization (A-Z)', id:7},
    {name:'Owning Organization (Z-A)', id:8},
    {name:'Issue Rating (Low to Critical)', id:9},
    {name:'Issue Rating (Critical to Low)', id:10},
    {name:'Issue Owner (A-Z)', id:11},
    {name:'Issue Owner (Z-A)', id:12},
    ]
    
    $scope.selectedFilter = 5;
};