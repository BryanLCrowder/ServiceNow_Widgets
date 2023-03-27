api.controller=function($scope, spModal) {
  var c = this;
  $scope.createClass = function() {
    spModal.open({
      title:"Create Class",
      widget:"tap-create-modal",
      //size: "lg",
      footerStyle: { display: "none" },
      //buttons: [],
      widgetInput:{
        table: "x_adsr_tap_class",
        sys_id:"-1",
        query:"",
        view:"tap_sp_view",
        popup:true,
        loaded: true
      }
    }).then(function(){
      console.log("Widget Dissmissed")
    })
  }


};