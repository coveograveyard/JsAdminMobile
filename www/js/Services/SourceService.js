angular.module('coveomobile.services')
    .factory('Sources', function ($http) {
        var sources = null;

        var sourceIcons = {
            WEB: "ion-android-laptop",
            GMAIL: "ion-android-globe",
            SALESFORCE: "ion-android-cloud-outline",
            YOUTUBE: "ion-social-youtube",
            DROPBOX: "ion-social-dropbox",
            GOOGLE_DRIVE_SINGLE_USER: "ion-social-google"
        };

        var visibilityIcons = {
            SECURED: "ion-person",
            SHARED: "ion-person-stalker",
            PRIVATE: "ion-locked"
        };

        function getSourceIcon(id) {
            return sourceIcons[id] != null ? sourceIcons[id] : "ion-archive";
        }

        var all = function () {
            return $http({
                method: 'GET',
                url: baseApi + 'workgroups/' + actualWorkgroup + '/sources',
                headers: {'Authorization': 'Bearer ' + bearer},
                timeout: 5000
            }).success(function (data) {
                sources = _.each(data, function (obj) {
                    return _.extend(obj, {
                        type: toTitle(obj.sourceType),
                        operationType: typeof obj.information.lastOperation == 'undefined' ? 'No preceding operation' : toTitle(obj.information.lastOperation.operationType),
                        visibilityIcon: visibilityIcons[obj.sourceVisibility],
                        sourceIcon: getSourceIcon(obj.sourceType),
                        status: toTitle(obj.information.sourceStatus.type),
                        sourceVisibility: toTitle(obj.sourceVisibility),
                        statusStamp: toDateStr(obj.information.sourceStatus.timestamp)
                    });
                });
            });
        };

        var get = function (id) {
            var obj = _.find(sources, function (obj) {
                return obj.id === id;
            });
            if (obj == null) {
                redirectToHome();
            }
            return obj;
        };

        var refresh = function (id) {
            return $http({
                method: 'POST',
                url: baseApi + 'workgroups/' + actualWorkgroup + '/sources/' + id + '/fullRefresh',
                headers: {'Authorization': 'Bearer ' + bearer},
                timeout: 5000
            });
        };

        var rebuild = function (id) {
            return $http({
                method: 'POST',
                url: baseApi + 'workgroups/' + actualWorkgroup + '/sources/' + id + '/rebuild',
                headers: {'Authorization': 'Bearer ' + bearer},
                timeout: 5000
            });
        };

        return {
            all: all,
            get: get,
            refresh: refresh,
            rebuild: rebuild
        };
    }).factory('SourceActivities', function ($http) {

        var operationIcons = {
            REBUILD: "ion-settings",
            SOURCE_CREATE: "ion-code-download",
            FULL_REFRESH: "ion-refresh",
            SCHEDULE_CHANGE: "ion-clock",
            INCREMENTAL_REFRESH: "ion-loop",
            MAPPING_CHANGE: "ion-shuffle",
            SOURCE_DELETE: "ion-close-circled",
            CONFIG_CHANGE: "ion-wrench"
        };

        var stateIcons = {
            NOT_EXECUTED: "icon-red",
            EXECUTED: "icon-green",
            EXECUTING: "icon-yellow"
        };

        function getOperationIcon(id) {
            return operationIcons[id] != null ? operationIcons[id] : "ion-gear-b";
        }

        var all = function (sourceId) {
            return $http({
                method: 'GET',
                url: baseApi + 'workgroups/' + actualWorkgroup + '/sources/' + sourceId + '/activities?page=0&perPage=15&totalPages=1&totalEntries=2',
                headers: {'Authorization': 'Bearer ' + bearer},
                timeout: 5000
            }).success(function (data) {
                _.each(data.items, function (obj) {
                    return _.extend(obj, {
                        operation: toTitle(obj.operationType),
                        operationIcon: getOperationIcon(obj.operationType),
                        date: toDateStr(obj.createDate),
                        stateIcon: stateIcons[obj.state],
                        state: toTitle(obj.state)
                    });
                });
            });
        };

        return {
            all: all
        };
    });