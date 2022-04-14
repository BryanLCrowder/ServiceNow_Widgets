(function () {
  data.ctrl_test_num = "";
  data.sample_num = "";
  data.length = 0;
  data.attrArray = [];
  data.currentPage = 1;
  data.page_size = 1;
  data.sampleArray = [];
  data.state = '';
  data.existingSample = false;
  data.existingSamples = [];
  var ctrlTest = $sp.getParameter('ctrl');
data.bryan = true;

  data.passFailArray = [{
      title: "Choose a result",
      value: undefined
    },
    {
      title: "Pass",
      value: true
    },
    {
      title: "Fail",
      value: false
    }
  ];

  //Pagination input
  if (input && input.action == "nextRecord") {
    nextRecord();
  }

  if (input && input.action == "addRecord") {
    addRecord();
  }

  onPageRun();

  function onPageRun() {
    var ctrlTestGR = new GlideRecord("sn_audit_control_test");
    ctrlTestGR.addQuery('sys_id', ctrlTest);
    ctrlTestGR.query();

    while (ctrlTestGR.next()) {
      data.ctrl_test_num = ctrlTestGR.number.toString();
      data.length = ctrlTestGR.u_sample_size.toString();
      data.state = ctrlTestGR.state.toString();
    }

    console.log("State is: " + data.state);
    var sampleGR = new GlideRecord("sn_audit_test_samples");
    sampleGR.orderBy('u_number');
    sampleGR.query();
    while (sampleGR.next()) {
      var obj = {};
      obj.number = sampleGR.u_number.getDisplayValue();
      obj.id = sampleGR.sys_id.toString();
      data.sampleArray.push(obj);
    }

    var sam_attr_GR = new GlideRecord("sn_audit_samples_and_attributes");
    sam_attr_GR.addQuery('u_control_test', ctrlTest);
    sam_attr_GR.addEncodedQuery('u_sample.u_number=' + data.sampleArray[data.currentPage - 1].number);
    sam_attr_GR.addQuery('u_complete', true);
    sam_attr_GR.query();

    while (sam_attr_GR.next()) {
      data.existingSample = true;
      var sampleObj = {};
      sampleObj.name = sam_attr_GR.u_attribute.getDisplayValue();
      sampleObj.sample_number = sam_attr_GR.u_sample.getDisplayValue();
      sampleObj.item = sam_attr_GR.u_item.toString();

      if (sam_attr_GR.u_passfail == 'pass') {
        sampleObj.passfail = {value:true};
      } 
      
      else if (sam_attr_GR.u_passfail == 'fail') {
        sampleObj.passfail = {value:false};
      }

      console.log("PassFail: " + sampleObj.passfail);
      //Get Attribute's description 
      var attrGR = new GlideRecord("sn_audit_toe_attributes");
      attrGR.addQuery('sys_id', sam_attr_GR.u_attribute.toString());
      attrGR.query();

      if (attrGR.next()) {
        sampleObj.description = attrGR.u_description.toString();
      }

      data.existingSamples.push(sampleObj);
    }

    getAttributes();

  }

  function getAttributes() {
    data.attrArray = [];
    var attrGR = new GlideRecord("sn_audit_toe_attributes");
    attrGR.addQuery('u_control_test', ctrlTest);
    attrGR.query();

    while (attrGR.next()) {
      var attribute = {};
      attribute.name = attrGR.u_attribute_name.getDisplayValue();
      attribute.id = attrGR.sys_id.toString();
      attribute.description = attrGR.u_description.toString();
      attribute.item = "";
      attribute.passfail = undefined;
      data.attrArray.push(attribute);
    }
  }

  function nextRecord() {
    var startPage = (input.currentPage - 1) * 1;
    var endPage = ((input.currentPage - 1) * 1) + 1;
    var attrGR = new GlideRecord("sn_audit_toe_attributes");
    attrGR.addQuery('u_control_test', ctrlTest);
    attrGR.query();

    while (attrGR.next()) {
      var attribute = {};
      attribute.name = attrGR.u_attribute_name.getDisplayValue();
      attribute.id = attrGR.sys_id.toString();
      attribute.description = attrGR.u_description.toString();
      attribute.passfail = undefined;
      data.attrArray.push(attribute);
    }
    data.currentPage = input.currentPage;
  }

  function addRecord() {
    var gr = new GlideRecord("sn_audit_samples_and_attributes");
    gr.initialize();

    for (var i = 0; i < input.attrArray.length; i++) {
      gr.u_sample = input.sampleArray[input.currentPage - 1].id;
      gr.u_control_test = ctrlTest;
      gr.u_item = input.attrArray[i].item;
      gr.u_attribute = input.attrArray[i].id;

      if (input.attrArray[i].passfail.value == true) {
        gr.u_passfail = 'pass';
      }

      if (input.attrArray[i].passfail.value == false) {
        gr.u_passfail = 'fail';
      }
      gr.u_complete = true;
      gr.insert();
    }

  }


})();