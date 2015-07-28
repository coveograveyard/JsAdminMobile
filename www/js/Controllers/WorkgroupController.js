angular.module('coveomobile.controllers').controller('WorkgroupCtrl', function ($scope, $ionicModal, $ionicPopup, $ionicLoading, $http, Workgroups, Token) {
    $ionicModal.fromTemplateUrl('templates/tab-workgroups.html', {scope: $scope}).then(function (modal) {
        $scope.workgroupModal = modal;
    });

    $ionicLoading.show({content: 'Loading', animation: 'fade-in'});
    $scope.actualWorkgroup = actualWorkgroup;

    Token.get().success(function (result) {
        $scope.token = result;
    }).error(function (result) {
        if (noPopUp) {
            noPopUp = false;
            var alertPop = $ionicPopup.alert({
                title: 'ERROR',
                template: (result.errorCode != null ? result.errorCode + " : " : "") + result.message
            });
            alertPop.then(function () {
                noPopUp = true;
            });
        }
    });

    Workgroups.all().success(function (result) {
        $scope.workgroups = result;
        if (actualWorkgroup == '' || Workgroups.get(actualWorkgroup) == null) {
            $scope.showWorkgroupModal();
        }
        else {
            $scope.$broadcast('workgroupRefresh');
        }
    }).error(function (result, status) {
        redirectToLogin(status);
        $scope.showWorkgroupModal();
        if (noPopUp) {
            noPopUp = false;
            var alertPop = $ionicPopup.alert({
                title: 'ERROR',
                template: (result.errorCode != null ? result.errorCode + " : " : "") + result.message
            });
            alertPop.then(function () {
                noPopUp = true;
            });
        }
    }).finally(function () {
        $ionicLoading.hide();
    });

    $scope.doRefresh = function () {
        Workgroups.all().success(function (result) {
            $scope.workgroups = result;
            $scope.actualWorkgroup = actualWorkgroup;
        }).error(function (result, status) {
            redirectToLogin(status);
            if (noPopUp) {
                noPopUp = false;
                var alertPop = $ionicPopup.alert({
                    title: 'ERROR',
                    template: (result.errorCode != null ? result.errorCode + " : " : "") + result.message
                });
                alertPop.then(function () {
                    noPopUp = true;
                });
            }
        }).finally(function () {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.setCurrentWorkgroup = function (id) {
        Workgroups.setCurrentWorkgroup(id);
        localStorage.setItem("workgroup", id);
        $scope.hideWorkgroupModal();
        $scope.$broadcast('workgroupRefresh');
    };

    $scope.showWorkgroupModal = function () {
        $scope.workgroupModal.show();
    };

    $scope.hideWorkgroupModal = function () {
        if ((actualWorkgroup == '' || Workgroups.get(actualWorkgroup) == null) && !_.isEmpty($scope.workgroups)) {
            $scope.setCurrentWorkgroup(_.first($scope.workgroups).id);
        }
        $scope.workgroupModal.hide();
    };

    $scope.logout = function () {
        redirectToLogout();
    };
});