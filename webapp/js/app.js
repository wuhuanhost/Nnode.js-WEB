var app = angular.module("myApp", ["ui.router", "ui.grid", "ui.grid.moveColumns","ui.grid.pagination"]);
app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state("index", {
            url: "/",
            views: {
                "": {
                    templateUrl: "tpls/login.html",
                }
            }
        }).state("home", {
            url: "/home",
            views: {
                "": {
                    templateUrl: "tpls/home.html",
                },
                "nav@home": {
                    templateUrl: "tpls/nav.html",
                },
                "directory@home": {
                    templateUrl: "tpls/directory.html",
                },
                "content@home": {
                    templateUrl: "tpls/money.html",
                }
            }
        }).state("home.task", {
            url: "/task",
            views: {
                "content@home": {
                    templateUrl: "tpls/tasklist.html"
                }
            }
        }).state("home.successTask", {
            url: "/tasked",
            views: {
                "content@home": {
                    templateUrl: "tpls/uiGrid.html"
                }
            }
        })
});

/**
 * [ui-router绑定到g根作用域]
 * @param  {[type]} $rootScope    [description]
 * @param  {[type]} $state        [description]
 * @param  {[type]} $stateParams) {                   $rootScope.$state [description]
 * @return {[type]}               [description]
 */
app.run(['$rootScope', '$state', '$stateParams',
    function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
]);
