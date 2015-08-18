angular.module('coveomobile.services')
    .factory('Groups', function ($http) {

        var all = function () {
            return $http({
                method: 'GET',
                url: baseApi + 'workgroups/' + actualWorkgroup + '/groups',
                headers: {'Authorization': 'Bearer ' + bearer},
                timeout: 5000
            }).success(function (data) {
                _.each(data, function (obj) {
                    return _.extend(obj, {
                        userNbr: obj.users.length,
                        realmNbr: obj.realms.length,
                        permissionNbr: obj.permissions.length
                    });
                });
            });
        };

        return {
            all: all
        };

    }).factory('GroupDetail', function ($http) {

        var get = function (groupId) {
            return $http({
                method: 'GET',
                url: baseApi + 'workgroups/' + actualWorkgroup + '/groups/' + groupId,
                headers: {'Authorization': 'Bearer ' + bearer},
                timeout: 5000
            }).success(function (data) {
                
                data.permissions = _.map(_.groupBy(data.permissions, function (obj) {
                    return obj.targetDomain;
                }), function (num) {
                    return {
                        name: toTitle(num[0].targetDomain),
                        owner: toTitle(num[0].owner),
                        types: (_.map(num, function (obj) {
                            return obj.type != null ? toTitle(obj.type) :  '';
                        })).join(", ")
                    };
                });
            });
        };

        var invite = function (groupId, email) {
            return $http({
                method: 'POST',
                url: baseApi + 'workgroups/' + actualWorkgroup + '/groups/' + groupId + '/invitedusers',
                headers: {'Authorization': 'Bearer ' + bearer},
                timeout: 5000,
                data: {
                    displayName: "",
                    email: email,
                    type: "INVITED",
                    username: ""
                }
            });
        };

        return {
            get: get,
            invite: invite
        };
    });