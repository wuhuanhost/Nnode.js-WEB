var app = angular.module("myApp", [
    "ui.router",
    "ui.grid",
    "ui.grid.moveColumns",
    "ui.grid.pagination",
    "angular-loading-bar",
    "ngDialog"
]);
app.config(["$stateProvider", "$urlRouterProvider", "cfpLoadingBarProvider", function($stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false; //不显示转圈动画
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state("index", {
            url: "/",
            views: {
                "": {
                    templateUrl: "tpls/login.html",
                    controller: "loginCtrl", //指定当前模板对应的控制器的名字，和在模板页面使用【ng-controller="loginCtrl"】指令效果一样
                }
            }
        }).state("home", {
            url: "/home",
            views: {
                "": {
                    templateUrl: "tpls/home.html",
                    controller: "navCtrl"

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
                    templateUrl: "tpls/uiGrid.html",
                    controller: "uiGridCtrl"
                }
            }
        }).state("home.person", {
            url: "/person",
            views: {
                "content@home": {
                    templateUrl: "tpls/person.html",
                    controller: "personCtrl"
                }
            }

        })
}]);

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
