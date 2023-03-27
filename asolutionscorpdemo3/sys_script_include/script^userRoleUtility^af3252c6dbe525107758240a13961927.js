var userRoleUtility = Class.create();
userRoleUtility.prototype = {
    initialize: function () { },
    hasRole: function (user, role) {
        var userRole = new GlideRecord('sys_user_has_role');
        userRole.addEncodedQuery('role.name=' + role + '^user=' + user);
        userRole.query();
        if (userRole.next()) {
            return true;
        } else {
            return false;

        }
    },

    formData: function (fieldData, tableName, viewName) {
        var userobj = {
            "label": fieldData.label,
            "name": fieldData.ed.name,
            "type": fieldData.type,
            "readonly": fieldData.readonly,
            "reference_table": fieldData.ed.reference,
            "ref_search_field": fieldData.ed.searchField,
            "choices": fieldData.choices,
            "mandatory": fieldData.sys_mandatory,
            "max_length": fieldData.max_length,
            "opened": false,
            "position": 0,
            "value": "",
            "reference_qual": fieldData.reference_qual,
        };

        var grView = new GlideRecord("sys_ui_view");
        if (grView.get("name", viewName)) {
            var grSection = new GlideRecord("sys_ui_section");
            grSection.addQuery("view", grView.sys_id);
            grSection.addQuery("name", tableName);
            grSection.query();
            while (grSection.next()) {
                var grElement = new GlideRecord("sys_ui_element");
                grElement.addQuery("sys_ui_section", grSection.sys_id);
                grElement.addQuery("element", userobj.name);
                grElement.addNullQuery("type");
                grElement.orderBy("position");
                grElement.query();
                while (grElement.next()) {
                    userobj["position"] = grElement.position.toString();
                    //gs.info("Section = " + grSection.caption + "\tPosition = " + grElement.position + "\tElement = " + grElement.element);
                }
            }
        }
        return userobj;

    },

    privileges: function () {
        let access;
        const trainer = gs.hasRole("x_adsr_tap.trainer");
        const trainee = gs.hasRole("x_adsr_tap.trainee");
        if (trainer || (trainer && trainee)) {
            access = "trainer";
        } else if (data.trainee && !trainer) {
            access = "trainee";
        }
        return access;
    },

    getModuleCompletion: function () {

        return 100;
    },

    getStoryCompletion: function () {

        return 100;
    },

    overallClassCompletion: function () {

        return 100;
    },

    overallAssessmentScore: function () {

        return 100;
    },

    

    // getFieldChoices: function(tableID) {
    // 	var fieldIDs = [];
    //     var count = 0;
    //     var fieldGR = new GlideRecordSecure("sys_dictionary");
    // 	fieldGR.addQuery("name", tableID);
    //     fieldGR.addQuery("reference", "x_adsr_tap_choice");
    //     fieldGR.query();
    // 	while(fieldGR.next()) {
    //         count++;
    // 		fieldIDs.push(fieldGR.getUniqueValue());
    // 	} 

    // 	return "sys_idIN" + fieldIDs;
    // },

    testingInfo: function () {
        gs.info("------- Testing worked and function called");
        //.getFieldChoices(current.table.name.toString())
        //javascript: new userRoleUtility().getFieldChoices(current.table.name.toString());
    },


    type: 'userRoleUtility'
};