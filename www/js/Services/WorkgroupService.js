angular.module('coveomobile.services').factory('Workgroups', function ($http) {
    var workgroups = null;
    var all = function () {
        return $http({
            method: 'GET',
            url: baseApi + 'workgroups',
            headers: {'Authorization': 'Bearer ' + bearer},
            timeout: 5000
        }).success(function (data) {
            workgroups = data;
        });
    };

    var setCurrentWorkgroup = function (id) {
        actualWorkgroup = id;
    };

    var get = function (id) {
        return _.find(workgroups, function (obj) {
            return obj.id === id;
        });
    };

    return {
        all: all,
        get: get,
        setCurrentWorkgroup: setCurrentWorkgroup
    };
});