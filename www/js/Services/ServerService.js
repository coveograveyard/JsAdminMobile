angular.module('coveomobile.services')
    .factory('Servers', function ($http) {
        var servers = null;

        var stateIcons = {
            running: "icon-green",
            stopped: "icon-red"
        };

        var platformIcons = {
            windows: "ion-social-windows",
            otherLinux: "ion-social-tux"
        };

        var all = function () {
            return $http({
                method: 'GET',
                url: baseApi + 'aws/instances/agents',
                headers: {'Authorization': 'Bearer ' + bearer},
                timeout: 5000
            }).success(function (data) {
                servers = _.each(data, function (obj) {
                    return _.extend(obj, {
                        workgroup: toTitle(obj.agentId.split('-')[0]),
                        agentId: obj.agentId.split('-')[1],
                        platformIcon: platformIcons[obj.platform],
                        stateIcon: stateIcons[obj.instanceState]
                    });
                });
            });
        };

        var stop = function (id) {
            return $http({
                method: 'POST',
                url: baseApi + 'aws/instances/' + id + '/stop',
                headers: {'Authorization': 'Bearer ' + bearer},
                timeout: 5000
            });
        };

        var start = function (id) {
            return $http({
                method: 'POST',
                url: baseApi + 'aws/instances/' + id + '/start',
                headers: {'Authorization': 'Bearer ' + bearer},
                timeout: 5000
            });
        };

        var get = function (id) {
            var obj = _.find(servers, function (obj) {
                return obj.id === id;
            });
            if (obj == null) {
                redirectToHome();
            }
            return obj;
        };

        return {
            all: all,
            get: get,
            stop: stop,
            start: start
        };
    });