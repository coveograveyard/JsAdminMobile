angular.module('coveomobile.controllers')
    .controller('ServerCtrl', function ($scope, $ionicPopup, $ionicLoading, $ionicListDelegate, $http, Servers) {

        $scope.doRefresh = function () {
            Servers.all().success(function (result) {
                $scope.servers = result;
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
                $ionicLoading.hide();
            });
        };

        $scope.start = function (serverId) {
            Servers.start(serverId).success(function () {
                $ionicPopup.alert({title: 'Success', template: 'Start operation has been triggered on selected server'});
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
            }).finally(function () {
                $ionicListDelegate.closeOptionButtons();
            });
        };

        $scope.stop = function (serverId) {
            Servers.stop(serverId).success(function () {
                $ionicPopup.alert({title: 'Success', template: 'Stop operation has been triggered on selected server'});
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
            }).finally(function () {
                $ionicListDelegate.closeOptionButtons();
            });
        };

        $ionicLoading.show({content: 'Loading', animation: 'fade-in'});
        $scope.doRefresh();
    })
    .controller('ServerDetailCtrl', function ($scope, $stateParams, Servers) {
        $scope.server = Servers.get($stateParams.ID);
    });