api.controller = function (spUtil, $scope, $uibModal, $timeout, spModal) {
    /* widget controller */
    var c = this;
    var globalReason = "";
    var globalArray = [];
    var yesNo = "";

    /*------------------------------------------------------
    This will invoke the submit Function on the server side.
    -------------------------------------------------------*/

    $scope.submit = function () {
        c.data.action = "submit";
        c.server.update().then(function (r) {
            c.data.action = undefined;
        });
        $timeout(function () {
                parent.location.reload();
            },
            500);
    };


    /*------------------------------------------------------
    This will pull us an additonal modal if the values are
    prepopulated for the duplicate array called addArray this
    is just a double confirmation making sure that we are sure
    we want to remove it from an existing engagement and add 
    the control to this engagement.
    -------------------------------------------------------*/

    $scope.confirmAdd = function (yes_no) {
        globalArray = c.data.array;
        c.data.yes_no = yes_no;
        yesNo = c.data.yes_no;
        if (c.data.addArray) {
            spModal.confirm("Are you sure you want to add these controls?").then(function (confirmation) {
                addConfirmation(confirmation);
                

            }, function (notConfirm) {
                addConfirmation(notConfirm);
            })

        }
    
    };

    function addConfirmation(confirm) {

        if (confirm) {
            
            c.data.reason_add = globalReason;
            var stringAnswer = "";
            var dupAnswer = "";
            var arrayInfo = [];
            
            if (c.data.yes_no) {
            //DuplicateArray();
            //This is for adding the array that is already being associated.
            for (i = 0; i < c.data.addArray.length; i++) {
                stringAnswer += '<br>' + c.data.addArray[i].number + " was Removed from previous engagement" 
            }

            for( var j=0; j<c.data.array.length; j++) {
                console.log(c.data.array[j].selected);
            }

            for(var i = c.data.array.length - 1; i>=0; i--){
                for( var j=0; j<c.data.addArray.length; j++){
                  if(c.data.array[i].id != c.data.addArray[j].id){
                    arrayInfo.push(c.data.array[i])
                  }
                }
              }
              //c.data.array = globalArray;
              
            //This is for adding the array without already being associated.
            for (j = 0; j < arrayInfo.length; j++) {
                if(arrayInfo[j].selected) {
                dupAnswer += '<br>' + arrayInfo[j].number + " Was Added"
            }
        }
        
            
                spModal.alert('The Following has Happened ' + stringAnswer + dupAnswer).then(function (answer) {    
                    c.data.array = globalArray;
                    adding(answer, c.data.array);
                    
                });
                //c.data.array = globalArray;
                
            } 
            else {
               
                nonDuplicateInsert(globalArray)
            }
   
        } else {
            parent.location.reload();
        }
       
    }



    function nonDuplicateInsert(array) {
            c.data.action = "submit";
            c.data.array = array;
            c.server.update().then(function() {
               
            c.data.reason_add = globalReason;
            c.data.action = undefined;
            c.modalInstance.close();
                });

            $timeout(function () {
            parent.location.reload();
            },
         500);
        

    }

    function adding(added, array) { 
        // for( var j=0; j<c.data.array.length; j++) {
        //     console.log(c.data.array[j].selected);
        // } 
        c.data.array = array;
        if(added) {
        c.data.action = "submit";
        c.server.update().then(function() {
            c.data.yes_no = yesNo;
            c.data.reason_add = globalReason;
            c.data.action = undefined;
            c.modalInstance.close();
        });
        $timeout(function () {
            parent.location.reload();
        },
        500);
    }
}


function DuplicateArray() {
    c.data.action = "duplicateArray";
        c.server.update().then(function (r) {
            c.data.reason_add = globalReason;
            c.data.action = undefined;
        });
    }


    /*------------------------------------------------------
    This will refresh the page on a cancel
    -------------------------------------------------------*/

    $scope.cancel = function () {
        c.data.action = "remove";
        c.server.update().then(function (r) {
            c.data.action = undefined;
        });
        $timeout(function () {
                parent.location.reload();
            },
            500);
    };

    /*------------------------------------------------------
    This will invoke a function on the server side to check 
    if there are any dupicates and add them to the AddArray
    -------------------------------------------------------*/

    $scope.checkDuplicates = function (array) {
        c.data.action = "checkDuplicates";
        c.server.update().then(function (r) {
            c.data.reason_add = globalReason;
            c.data.array = array;
            c.data.action = undefined;
        });
    };

    /*------------------------------------------------------
    This will Add values if we are adding or removing from 
    the array
    -------------------------------------------------------*/

    $scope.add_remove = function (add_remove) {
        c.data.add_remove = add_remove;
    };

    /*------------------------------------------------------
    Open Remove Modal
    -------------------------------------------------------*/

    $scope.openModal = function () {
        c.modalInstance = $uibModal.open({
            templateUrl: 'modalTemplate',
            scope: $scope
        });
    };

    /*------------------------------------------------------
    Open Add Modal
    -------------------------------------------------------*/

    $scope.openModalAdd = function (reason) {
        globalReason = reason;
        c.modalInstance = $uibModal.open({
            templateUrl: 'modalTemplateAdd',
            scope: $scope
        });
    };

    /*------------------------------------------------------
    This will close any modal
    -------------------------------------------------------*/

    $scope.closeModal = function () {
        c.data.action = "remove";
        c.server.update().then(function (r) {
            c.data.action = undefined;
        });
        c.modalInstance.close();
    };

    /*------------------------------------------------------
    This will invoke the pagination change and open a new 
    query
    -------------------------------------------------------*/

    $scope.pageChanged = function () {
        c.data.action = "nextRecord";
        c.server.update().then(function (r) {});
    };

};