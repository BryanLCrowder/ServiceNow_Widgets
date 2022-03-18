api.controller = function ($scope, $uibModal, $window, spUtil, $log, $timeout) {
    /* widget controller */
    var c = this;

    $scope.submit = function (array) {
        c.data.action = "submit";
        c.server.update().then(function (r) {
            c.data.action = undefined;
        });
        $timeout(function () {
                parent.location.reload();
            },
            500);

    };
    $scope.cancel = function () {
        c.data.action = "remove"
        c.server.update().then(function (r) {
            c.data.action = undefined;
        });
        $timeout(function () {
                parent.location.reload();
            },
            500);
    };


    $scope.add_remove = function (add_remove) {
        c.data.add_remove = add_remove;
    }

    $scope.openModal = function () {
        c.modalInstance = $uibModal.open({
            templateUrl: 'modalTemplate',
            scope: $scope
        });
    };

    $scope.closeModal = function () {
        c.data.action = "remove"
        c.server.update().then(function (r) {
            c.data.action = undefined;
        });
        c.modalInstance.close();
    };

    $scope.submitModal = function () {
        c.modalInstance.close();
    };



    $scope.pageChanged = function () {
        //$log.log('Page changed to: ' + c.data.currentPage);
        c.data.action = "nextRecord";
        c.server.update().then(function (r) {
            c.data.action = undefined;

        });
    };

    c.data.length = c.data.array.length;





};