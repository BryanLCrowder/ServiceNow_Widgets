(function() {
  data.trainees = [];
if(input && input.action ==="loadClass"){
data.modifiable = input.modifiable;
  onLoad();
}

if(input && input.action==="deleteTrainee"){
  deleteTrainee(input.traineeID);
}


  function onLoad() {
    var traineeGR = new GlideRecordSecure("x_adsr_tap_m2m_trainee");
    traineeGR.addQuery("x_adsr_tap_class", input.sys_id);
    traineeGR.query();
    while(traineeGR.next()) {
      var traineeOBJ = {
        "name": traineeGR.sys_user.getDisplayValue(),
        "sys_id": traineeGR.sys_id.getDisplayValue(),
        "currentStories": getUsersStoriesCount()
      }
      data.trainees.push(traineeOBJ);
    }
  }

  function deleteTrainee(traineeID) {
    var deleteTraineeGR = new GlideRecordSecure("x_adsr_tap_m2m_trainee");
    deleteTraineeGR.addQuery("sys_id", traineeID);
    deleteTraineeGR.query();
    while(deleteTraineeGR.next()) {
      deleteTraineeGR.deleteRecord();
    }
    onLoad(input.sys_id);
  }

  function getUsersStoriesCount() {
    /*
    return the users story list and how many stories they have
    left on the current class.
    */
    return 5;
  }

})();