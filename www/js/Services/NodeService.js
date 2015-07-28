angular.module('coveomobile.services')
    .factory('Nodes', function ($http) {

        var stateIcons = {
            Running: "ion-record icon-green",
            Unknown: "ion-record icon-red",
            OutOfSync: "ion-record icon-yellow"
        };

        var typeIcons = {
            Security: "ion-key",
            SecurityProvider: "ion-lock-combination",
            SecurityProviders: "ion-lock-combination",
            Indexer: "ion-document-text",
            Index: "ion-document-text",
            IndexerManager: "ion-document-text",
            Connector: "ion-outlet",
            DPM: "ion-filing"
        };

        function getStateIcon(state) {
            return stateIcons[state] != null ? stateIcons[state] : "ion-record icon-red";
        }

        function getTypeIcons(type) {
            return typeIcons[type] != null ? typeIcons[type] : "ion-document-text";
        }

        var all = function () {
            return $http({
                method: 'GET',
                url: baseApi + 'workgroups/' + actualWorkgroup + '/nodes',
                headers: {'Authorization': 'Bearer ' + bearer},
                timeout: 5000
            }).success(function (data) {
                _.each(data, function (obj) {
                    return _.extend(obj, {
                        name: obj.name.replace(actualWorkgroup + '-', ''),
                        agentId: obj.agentId.replace(actualWorkgroup + '-', ''),
                        typeIcon: getTypeIcons(obj.instanceType.split('.')[0]),
                        stateIcon: getStateIcon(obj.status.status)
                    });
                });
            });
        };

        return {
            all: all
        };
    });