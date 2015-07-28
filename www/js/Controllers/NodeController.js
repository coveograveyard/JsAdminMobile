angular.module('coveomobile.controllers')
    .controller('NodeCtrl', function ($scope, $ionicLoading, $ionicPopup, $http, Nodes) {

        $scope.doRefresh = function () {
            Nodes.all().success(function (result) {
                $scope.nodes = _.groupBy(result, function (obj) {
                    return obj.agentId;
                });
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
            $ionicLoading.show({content: 'Loading', animation: 'fade-in'});
            $scope.doRefresh();
        });

        $ionicLoading.show({content: 'Loading', animation: 'fade-in'});
        $scope.doRefresh();
    });