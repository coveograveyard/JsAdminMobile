angular.module('coveomobile.controllers')
    .controller('SearchCtrl', function ($scope, $ionicLoading, $ionicPopup, $http, Results) {

        $scope.$on('workgroupRefresh', function () {
            $scope.doRefresh();
        });

        $scope.doRefresh = function () {
            $ionicLoading.show({content: 'Loading', animation: 'fade-in'});

            Results.all($scope.searchTerm.text).success(function (result) {
                $scope.results = result;
            }).error(function (result, status) {
                $scope.results = null;
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
                $ionicLoading.hide();
            });
        };

        $scope.searchTerm = {text: ''};
        $scope.doRefresh();

    });