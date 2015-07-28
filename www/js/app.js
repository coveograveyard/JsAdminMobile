angular.module('coveomobile', ['ionic', 'coveomobile.controllers', 'coveomobile.services'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleLightContent();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html",
                controller: 'WorkgroupCtrl'
            })

            .state('tab.sources', {
                url: '/sources',
                views: {
                    'tab-sources': {
                        templateUrl: 'templates/tab-sources.html',
                        controller: 'SourceCtrl'
                    }
                }
            })

            .state('tab.source-detail', {
                url: '/sources/:ID',
                views: {
                    'tab-sources': {
                        templateUrl: 'templates/source-detail.html',
                        controller: 'SourceDetailCtrl'
                    }
                }
            })

            .state('tab.groups', {
                url: '/groups',
                views: {
                    'tab-groups': {
                        templateUrl: 'templates/tab-groups.html',
                        controller: 'GroupCtrl'
                    }
                }
            })

            .state('tab.group-detail', {
                url: '/groups/:ID',
                views: {
                    'tab-groups': {
                        templateUrl: 'templates/group-detail.html',
                        controller: 'GroupDetailCtrl'
                    }
                }
            })

            .state('tab.nodes', {
                url: '/nodes',
                views: {
                    'tab-nodes': {
                        templateUrl: 'templates/tab-nodes.html',
                        controller: 'NodeCtrl'
                    }
                }
            })

            .state('tab.servers', {
                url: '/servers',
                views: {
                    'tab-servers': {
                        templateUrl: 'templates/tab-servers.html',
                        controller: 'ServerCtrl'
                    }
                }
            })

            .state('tab.server-detail', {
                url: '/servers/:ID',
                views: {
                    'tab-servers': {
                        templateUrl: 'templates/server-detail.html',
                        controller: 'ServerDetailCtrl'
                    }
                }
            })

            .state('tab.search', {
                url: '/search',
                views: {
                    'tab-search': {
                        templateUrl: 'templates/tab-search.html',
                        controller: 'SearchCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/sources');

    });