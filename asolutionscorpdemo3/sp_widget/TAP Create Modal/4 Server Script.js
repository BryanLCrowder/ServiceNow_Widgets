(function () {
  data.fields = [];
  if(input && input.loaded) {
  data.form = $sp.getForm(input.table, input.sys_id, input.query, input.view, input.popup);
  data.table = input.table;
  data.fieldID = input.fieldID;
  data.fieldName = input.fieldName;
  onLoad();
  }
 
 
  
  function onLoad() {
    const formData = data.form["_fields"];
    
    for (var field in formData) {
      data.fields.push(new x_adsr_tap.userRoleUtility().formData(formData[field], input.table, input.view));
    }

    data.dateOptions = {
      dateDisabled: "disabled",
      formatYear: 'yy',
      maxDate: new GlideDate(2030, 5, 22),
      minDate: new GlideDate(),
      startingDay: 1
    }
    
  } 

// if(input && input.action === "referenceQualifierRun") {
//   for(var i = 0; i < input.fields.length; i++) {
//     if(input.fields[i].type === "reference") {
//     runReferenceQualifier(input.fields[i].reference_qual, input.fields, i);
//     }
//   }

// }

// function runReferenceQualifier(refQual, fields, location) {
//   let refFields = [];
//   let returnedIds = "";
//   if(refQual.startsWith("javascript")) {
//     gs.info("bryan js if hit");
//     refFields = refQual.split("current.");
//   }

//   gs.info("bryan ref field " + refFields);

//   fields[location].reference_qual = returnedIds;
//   data.fields = input.fields;
// }

  if(input && input.action == "submitForm" && !input.loaded) {
    data.table = input.table;
    var formSubmitGR = new GlideRecordSecure(data.table);
    formSubmitGR.initialize();
    for (var i = 0;i < input.fields.length; i++) {
      var variableName = input.fields[i].name.toString();
      if(input.fields[i].type === "reference") {
        formSubmitGR[variableName] = input.fields[i].value.value.toString()
      }
      else {
        formSubmitGR[variableName] = input.fields[i].value.toString();
      }
      if(input.fieldID) {
        formSubmitGR[input.fieldName] = input.fieldID;
      }
    }
    formSubmitGR.insert();
  }



})();