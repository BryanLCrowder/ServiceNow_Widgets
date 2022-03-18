(function () {
    data.array = [];
    data.array_control = [];
    var engagement = $sp.getParameter('eng');
    var list = $sp.getParameter('list');
    data.eng = engagement;
    data.maxSize = 5;
    data.page_size = 15;

    onPageRun();

    if (input && input.action == "remove") {
        removingSelected();
    }

    if (input && input.action == "submit") {
        submit(input.add_remove);
    }

    if (input && input.action == "nextRecord") {
        nextRecord();
    }


    function onPageRun() {
        data.currntPage = 0;
        var gr = new GlideRecord("sn_compliance_control");
        gr.addQuery("active", "true");
        gr.addEncodedQuery("state!=retired");
        gr.chooseWindow(data.currentPage, data.page_size);
        gr.query();
        while (gr.next()) {
            var obj = {};
            obj.id = gr.sys_id.toString();
            obj.number = gr.number.toString();
            obj.name = gr.name.toString();
            obj.state = gr.state.getDisplayValue();
            obj.add_remove = undefined;
            obj.selected = false;
            data.array.push(obj);
        }

    }


    function removingSelected() {
        for (i = 0; i < input.array.length; i++) {
            input.array[i].selected = false;
        }
    }


    function submit(add_remove) {
        if (add_remove == "Add") {
            for (i = 0; i < input.array.length; i++) {
                if (input.array[i].selected == true) {
                    var gr_add = new GlideRecord("sn_audit_m2m_control_engagement");
                    gr_add.initialize();
                    gr_add.sn_audit_engagement = engagement;
                    gr_add.sn_compliance_control = input.array[i].id;
                    gr_add.insert();
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


    function nextRecord() {
        data.array = [];
        var startPage = (input.currentPage - 1) * input.page_size;
        var endPage = ((input.currentPage - 1) * input.page_size) + input.page_size
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
            obj.state = gr.state.getDisplayValue();
            obj.add_remove = undefined;
            obj.selected = false;
            data.array.push(obj);
        }

    }



})();