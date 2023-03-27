(function() {

 data.choices = [];

 onLoad();

  function onLoad() {
    var choiceGR = new GlideRecordSecure("x_adsr_tap_choice");
    choiceGR.query();
    while(choiceGR.next()) {
      var choiceOBJ = {
        "label": choiceGR.choice.toString(),
        "table": choiceGR.table.getDisplayValue(),
        "field": choiceGR.field.getDisplayValue()
      }
      data.choices.push(choiceOBJ);
    }
  }

})();