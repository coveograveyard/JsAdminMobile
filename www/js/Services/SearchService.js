angular.module('coveomobile.services')
    .factory('Results', function ($http) {

        var sourceIcons = {
            Web: "ion-android-laptop",
            Gmail: "ion-android-globe",
            SalesForce: "ion-android-cloud-outline",
            YouTube: "ion-social-youtube"
        };

        function getSourceIcon(id) {
            return sourceIcons[id] != null ? sourceIcons[id] : "ion-archive";
        }

        var all = function (searchTerm) {
            searchTerm = (searchTerm === "" || searchTerm === null ? "" : searchTerm);
            return $http({
                method: 'POST',
                url: baseApi + 'search/?workgroupId=' + actualWorkgroup + '&errorsAsSuccess=1',
                headers: {
                    'Authorization': 'Bearer ' + bearer,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'q=' + searchTerm + '&firstResult=0&numberOfResults=100'
            }).success(function (data) {
                _.each(data.results, function (obj) {
                    return _.extend(obj, {
                        typeIcon: getSourceIcon(obj.raw.sourcetype)
                    });
                })
            });
        };

        return {
            all: all
        };
    });