api.controller=function($scope, spModal) {
  /* widget controller */
  var c = this;
    $scope.addChoice = function() {
    spModal.open({
      title:"Create Choice",
      widget:"tap-create-modal",
      //size: "lg",
      footerStyle: { display: "none" },
      //buttons: [],
      widgetInput:{
        table: "x_adsr_tap_choice",
        sys_id:"-1",
        query:"",
        view:"tap_portal",
        popup:true,
        loaded: true
      }
    }).then(function(){
      console.log("Widget Dissmissed");
    })
  }
};