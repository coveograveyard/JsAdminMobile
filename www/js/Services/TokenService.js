angular.module('coveomobile.services')
    .factory('Token', function ($http) {

        var get = function () {
            return $http({
                method: 'GET',
                url: loginUri + 'rest/tokens/info',
                headers: {'Authorization': 'Bearer ' + bearer},
                timeout: 5000
            });
        };

        return {
            get: get
        };
    });