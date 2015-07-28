angular.module('coveomobile.controllers')
    .controller('GroupCtrl', function ($scope, $ionicPopup, $ionicLoading, $http, Groups) {

        $scope.doRefresh = function () {
            Groups.all().success(function (result) {
                $scope.groups = result;
                $scope.$broadcast('scroll.refreshComplete');
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

        $scope.$on('workgroupRefresh', function () {
            $scope.doRefresh();
        });

        $ionicLoading.show({content: 'Loading', animation: 'fade-in'});
        $scope.doRefresh();
    });

