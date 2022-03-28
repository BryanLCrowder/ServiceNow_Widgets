api.controller = function ($scope, $uibModal, $timeout, spModal) {
    /* widget controller */
    var c = this;
    
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
        c.data.yes_no = yes_no;
        if (c.data.addArray) {
            spModal.confirm("Are you sure you want to add these controls?").then(function(confirmation) {
                confirmationCall(confirmation);  
             
            },function(notConfirm) {
                confirmationCall(notConfirm);
            })   
        }   
    };

    function confirmationCall(confirmation) {
        if (confirmation) {
            c.data.action = "submit";
            c.server.update().then(function (r) {
                c.data.action = undefined;
                c.modalInstance.close();
            });
            $timeout(function () {
                    parent.location.reload();
                },
                500);
        }
            parent.location.reload();   
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
            c.data.array = array;
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

    $scope.openModalAdd = function () {
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