angular.module('coveomobile.controllers')
    .controller('GroupDetailCtrl', function ($scope, $stateParams, $ionicPopup, $ionicModal, $ionicLoading, $http, GroupDetail) {
        $ionicModal.fromTemplateUrl('templates/member-invite.html', {scope: $scope}).then(function (modal) {
            $scope.inviteModal = modal;
        });

        $scope.showInvite = function () {
            $scope.inviteModal.show();
        };

        $scope.closeInvite = function () {
            $scope.inviteModal.hide();
        };

        $scope.doRefresh = function () {
            GroupDetail.get($stateParams.ID).success(function (result) {
                $scope.groupDetail = result;
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

        $scope.invite = function (email) {
            GroupDetail.invite($scope.groupDetail.id, email).success(function () {
                $ionicPopup.alert({title: 'Success', template: email + ' has been invited to the current group'});
                $scope.doRefresh();
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
                $scope.closeInvite();
            });
        };

        $scope.user = '';
        $ionicLoading.show({content: 'Loading', animation: 'fade-in'});
        $scope.doRefresh();
    });

