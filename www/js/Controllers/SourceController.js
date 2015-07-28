angular.module('coveomobile.controllers')
    .controller('SourceCtrl', function ($scope, $ionicModal, $ionicPopup, $ionicLoading, $ionicListDelegate, $http, Sources) {

        $scope.doRefresh = function () {
            Sources.all().success(function (result) {
                $scope.sources = result;
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

        $scope.refresh = function (sourceId) {
            Sources.refresh(sourceId).success(function () {
                $ionicPopup.alert({title: 'Success', template: 'Refresh has been triggered on selected source'});
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

        $scope.rebuild = function (sourceId) {
            Sources.rebuild(sourceId).success(function () {
                $ionicPopup.alert({title: 'Success', template: 'Rebuild has been triggered on selected source'});
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

        $scope.$on('workgroupRefresh', function () {
            $ionicLoading.show({content: 'Loading', animation: 'fade-in'});
            $scope.doRefresh();

        });
    }).controller('SourceDetailCtrl', function ($scope, $ionicPopup, $stateParams, Sources, SourceActivities) {
        $scope.source = Sources.get($stateParams.ID);

        SourceActivities.all($stateParams.ID).success(function (result) {
            $scope.activities = result.items;
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
        });
    });