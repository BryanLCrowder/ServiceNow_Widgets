(function () {
    data.reason_remove = "Remove key controls(s)";
    data.reason_add = "Add key controls(s)";
    data.submit_remove = false;
    data.submit_add = false;
    data.array = [];
    data.array_control = [];
    var engagement = $sp.getParameter('eng');
    var list = $sp.getParameter('list');
    data.eng = engagement;
    data.page_size = 20;
    data.currentPage = 1;
    data.addArray = [];
    data.length = 0;

    onPageRun();

    //checking if duplicate records have been seen in other controls
    if (input && input.action == "checkDuplicates") {
        checkDuplicates();
    }

    //removing the selected items
    if (input && input.action == "remove") {
        removingSelected();
    }

    //submitting the record with no duplicates
    if (input && input.action == "submit") {
        if(input.yes_no) {
        submit(input.add_remove);
        }
        else {
            nonDuplicateInsert();
        }
    }

    //Pagination input
    if (input && input.action == "nextRecord") {
        nextRecord();
    }

    //Adding to the removed section, implement for Add to qc planned changes -- and update on the plan activity
    if (input && input.submit_remove) {
        if (input && input.action == "submit") {
            submit(input.add_remove);
        }
    }

    /*------------------------------------------------------
    The first script that is ran when the page loads
    -------------------------------------------------------*/

    function onPageRun() {
        if (!list) {
            var gr = new GlideRecord("sn_compliance_control");
            gr.addQuery("active", "true");
            gr.addEncodedQuery("state!=retired");
            gr.chooseWindow(0, data.page_size);
            gr.query();
            while (gr.next()) {
                var obj = {};
                obj.id = gr.sys_id.toString();
                obj.number = gr.number.toString();
                obj.name = gr.name.toString();
                obj.key_cont = gr.key_control.toString();
                obj.state = gr.state.getDisplayValue();
                obj.selected = false;
                data.array.push(obj);

            }

            getCount("add");

        } else {
            data.listInfo = list.replace(/,/g, "^ORsys_idLIKE");
            var gr_remove = new GlideRecord("sn_audit_m2m_control_engagement");
            gr_remove.addEncodedQuery("sys_idLIKE" + data.listInfo);
            gr_remove.chooseWindow(0, data.page_size);
            gr_remove.query();

            while (gr_remove.next()) {
                var objRemove = {};
                objRemove.id = gr_remove.sn_compliance_control.sys_id.toString();
                objRemove.number = gr_remove.sn_compliance_control.number.toString();
                objRemove.name = gr_remove.sn_compliance_control.name.toString();
                objRemove.key_cont = gr_remove.sn_compliance_control.key_control.toString();
                objRemove.state = gr_remove.sn_compliance_control.state.getDisplayValue();
                objRemove.selected = true;
                data.array.push(objRemove);
            }
            getCount("remove");
        }
    }

    /*------------------------------------------------------
    Checking for duplicates for the controls
    -------------------------------------------------------*/

    function checkDuplicates() {
        for (i = 0; i < input.array.length; i++) {
            if (input.array[i].selected == true) {
                var gr_add = new GlideRecord("sn_audit_m2m_control_engagement");
                gr_add.addQuery("sn_compliance_control", input.array[i].id);
                gr_add.query();
                while (gr_add.next()) {
                    data.submit_add = true;
                    var obj = {};
                    obj.id = gr_add.sn_compliance_control.sys_id.toString();
                    obj.number = gr_add.sn_compliance_control.number.toString();
                    obj.name = gr_add.sn_compliance_control.name.toString();
                    obj.key_cont = gr_add.sn_compliance_control.key_control.toString();
                    obj.state = gr_add.sn_compliance_control.state.getDisplayValue();
                    obj.selected = true;
                    data.addArray.push(obj);
                }

            }
        }
    }

    /*------------------------------------------------------
    This will Remove selected items
    -------------------------------------------------------*/

    function removingSelected() {
        for (i = 0; i < input.array.length; i++) {
            input.array[i].selected = false;
        }
    }

    /*------------------------------------------------------
    Submitting function base on parameter entered, If its a
    add or remove
    -------------------------------------------------------*/

    function submit(add_remove) {
        if (add_remove == "Add") {
            for (i = 0; i < input.array.length; i++) {
                if (input.array[i].selected == true) {
                    var gr_insert = new GlideRecord("sn_audit_m2m_control_engagement");
                    gr_insert.initialize();
                    gr_insert.sn_audit_engagement = engagement;
                    gr_insert.sn_compliance_control = input.array[i].id;
                    gr_insert.insert();
                }
            }
        }

        if (add_remove == "Remove") {
            for (i = 0; i < input.array.length; i++) {
                if (input.array[i].selected == true) {
                    var gr_remove = new GlideRecord("sn_audit_m2m_control_engagement");
                    gr_remove.addQuery("sn_audit_engagement", engagement);
                    gr_remove.addQuery("sn_compliance_control", input.array[i].id);
                    gr_remove.query();

                    while (gr_remove.next()) {
                        gr_remove.deleteRecord();

                    }
                }
            }
        }
    }


   /*------------------------------------------------------
    Submitting function based on submitting non duplicate 
    entries
    -------------------------------------------------------*/

    function nonDuplicateInsert() {
        for( var i =input.array.length - 1; i>=0; i--){
            for( var j=0; j<input.addArray.length; j++){
              if(input.array[i].id === input.addArray[j].id){
                input.array.splice(i, 1);
              }
            }
          }

        for (i = 0; i < input.array.length; i++) {
            if (input.array[i].selected == true) {
                var gr_insert = new GlideRecord("sn_audit_m2m_control_engagement");
                gr_insert.initialize();
                gr_insert.sn_audit_engagement = engagement;
                gr_insert.sn_compliance_control = input.array[i].id;
                gr_insert.insert();
            }
        }
    }

    /*------------------------------------------------------
    This will Work with pagination and how to add a page 
    based on the angular directive uib-pagination
    -------------------------------------------------------*/

    function nextRecord() {
        if (!list) {
            data.array = [];
            var startPage = (input.currentPage - 1) * input.page_size;
            var endPage = ((input.currentPage - 1) * input.page_size) + input.page_size;
            var gr = new GlideRecord("sn_compliance_control");
            gr.addQuery("active", "true");
            gr.addEncodedQuery("state!=retired");
            gr.chooseWindow(startPage, endPage);
            gr.query();

            while (gr.next()) {
                var obj = {};
                obj.id = gr.sys_id.toString();
                obj.number = gr.number.toString();
                obj.name = gr.name.toString();
                obj.key_cont = gr.key_control.toString();
                obj.state = gr.state.getDisplayValue();
                obj.add_remove = undefined;
                obj.selected = false;
                data.array.push(obj);
            }
            data.currentPage = input.currentPage;
        } else {
            data.array = [];
            data.listInfo = list.replace(/,/g, "^ORsys_idLIKE");
            var startPageRemove = (input.currentPage - 1) * input.page_size;
            var endPageRemove = ((input.currentPage - 1) * input.page_size) + input.page_size;
            var gr_remove = new GlideRecord("sn_audit_m2m_control_engagement");
            gr_remove.addEncodedQuery("sys_idLIKE" + data.listInfo);
            gr_remove.chooseWindow(startPageRemove, endPageRemove);
            gr_remove.query();

            while (gr_remove.next()) {
                var objRemove = {};
                objRemove.id = gr_remove.sn_compliance_control.sys_id.toString();
                objRemove.number = gr_remove.sn_compliance_control.number.toString();
                objRemove.name = gr_remove.sn_compliance_control.name.toString();
                objRemove.key_cont = gr_remove.sn_compliance_control.key_control.toString();
                objRemove.state = gr_remove.sn_compliance_control.state.getDisplayValue();
                objRemove.add_remove = undefined;
                objRemove.selected = true;
                data.array.push(objRemove);
            }
            data.currentPage = input.currentPage;
        }
    }

    /*------------------------------------------------------
    Getting the full count of controls
    -------------------------------------------------------*/

    function getCount(countType) {
        if (countType == "add") {
            var gr = new GlideAggregate("sn_compliance_control");
            gr.addQuery("active", "true");
            gr.addEncodedQuery("state!=retired");
            gr.addAggregate("COUNT");
            gr.query();
            while (gr.next()) {
                data.length = gr.getAggregate("COUNT");
            }
        }

        if (countType == "remove") {
            data.listInfo = list.replace(/,/g, "^ORsys_idLIKE");
            var gr = new GlideAggregate("sn_audit_m2m_control_engagement");
            gr.addEncodedQuery("sys_idLIKE" + data.listInfo);
            gr.addAggregate("COUNT");
            gr.query();
            while (gr.next()) {
                data.length = gr.getAggregate("COUNT");
            }
        }
    }


})();