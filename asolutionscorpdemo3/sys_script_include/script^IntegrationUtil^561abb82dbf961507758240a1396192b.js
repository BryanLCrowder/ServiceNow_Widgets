var integrationUtil = Class.create();
integrationUtil.prototype = {
    initialize: function() {
    },

	generateStoryInstances: function (classID, moduleID, moduleInstID) {
        var start = new GlideDate();
        var end = new GlideDateTime();
        var points = 0;
        var storyGR = new GlideRecordSecure("x_adsr_tap_story");
        storyGR.addQuery("module", moduleID);
        storyGR.query();
        while (storyGR.next()) {
            var ac = JSON.stringify(storyGR.acceptance_criteria.getDisplayValue());
            ac = ac.slice(1);
            ac = ac.slice(0, ac.length - 1);
            points += storyGR.expected_time;
            var traineeGR = new GlideRecordSecure("x_adsr_tap_m2m_trainee");
            traineeGR.addQuery("x_adsr_tap_class", classID);
            traineeGR.query();
            while (traineeGR.next()) {
                var storyInst = new GlideRecordSecure("x_adsr_tap_m2m_story_instance");
                storyInst.initialize();
                storyInst.x_adsr_tap_m2m_trainee = traineeGR.sys_id;
                storyInst.module = moduleInstID;
                storyInst.x_adsr_tap_story = storyGR.sys_id;
                storyInst.insert();
                var obj = {
                    points: storyGR.expected_time.toString(),
                    instanceURL: traineeGR.instance_url.toString(),
                    short_desc: storyGR.description.toString(),
                    acceptance_criteria:ac,
                    traineeID:traineeGR.sys_id.toString(),
                    storyInstID: storyInst.sys_id.toString()
                }
                storyInst.integration_id = this.generateStoryIntegration(
                    obj,
                    false
                );
                storyInst.update();

            }

        }

        var moduleInstGR = new GlideRecordSecure("x_adsr_tap_m2m_module_instance");
        moduleInstGR.addQuery("sys_id", moduleInstID);
        moduleInstGR.query()
        while (moduleInstGR.next()) {
            moduleInstGR.active = true;
            moduleInstGR.start = start;
            moduleInstGR.end = end.addDaysUTC(10);
            //gs.info("bryan---- 1" + end);
            //gs.info("bryan---- 2" + end.addDaysUTC(10));
            moduleInstGR.update();
        }

        if (!this._checkPluginStatus) {
            this._addPlugin();
            //continue;
        }


    },



    _checkPluginStatus: function (instanceURL) {
        //checks to see if they have a plugin installed
        return true;
    },

    _addPlugin: function (instanceURL) {
        //installs the plugin
    },

    generateStoryIntegration: function (obj, failedIntegration) {
        try {
            var r = new sn_ws.RESTMessageV2('x_adsr_tap.TAP Training', 'Push Stories');
            r.setStringParameterNoEscape('points', obj.points);
            r.setStringParameterNoEscape('instance_URL', obj.instanceURL);
            r.setStringParameterNoEscape('short_description', obj.short_desc);
            r.setStringParameterNoEscape('state', '1');
            r.setStringParameterNoEscape('acceptance_criteria', obj.acceptance_criteria);

            //gs.info("bryan --- points " + points + " instanceurl " + instanceURL + " short desc " + short_desc + " acceptance criteria "+ acceptance_criteria);
            var response = r.execute();
            var responseBody = response.getBody();
            var httpStatus = response.getStatusCode();

            var returnedData = JSON.parse(responseBody);

            var integrationGR = new GlideRecordSecure("x_adsr_tap_integration_information");
            integrationGR.initialize();
            integrationGR.trainee = obj.traineeID;
            integrationGR.returned_data = responseBody;
            integrationGR.insert();

            if(!failedIntegration) {
             return returnedData.result.sys_id;
            }

        }
        catch (ex) {
            var message = ex.message;

        }
    },

    getStoryInfoIntegration: function() {

    },

    type: 'integrationUtil'
};