var app = angular.module('myApp', ['ui.router']);


app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/index");
    $stateProvider
        .state('index', {
            url: "",
            views: {
                '': {
                    templateUrl: "tpls/home.html",
                },
                'main@index': {
                    templateUrl: 'tpls/tasklist.html'
                }
            }
        })
        .state('tasklist', {
            url: "/tasklist",
            views: {
                '': {
                    templateUrl: "tpls/tasklist.html",
                }
            }
        })        .state('person', {
            url: "/person",
            views: {
                '': {
                    templateUrl: "tpls/person.html",
                }
            }
        })

});
