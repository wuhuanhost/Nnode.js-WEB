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

app.controller('loginCtrl', ['authService', '$scope', '$state', '$window', function(authService, $scope, $state, $window) {
    //表单需要提交的数据对象
    $scope.formData = {};
    /**
     * [登录方法]
     * @return {[type]} [description]
     */
    $scope.login = function() {
        var promiseLogin = authService.login($scope.formData);
        promiseLogin.then(function(data) {
            if (data.success === true) {
                $window.localStorage.token = "home";//保存token信息在localStorage中
                $state.go("home");
            } else {
                alert("用户名密码有误");
            }
        }, function(data) {
            console.log("err");
        });
    };
    /**
     * [自动执行的函数，如果用户登录跳转到首页]
     * @return {[type]} [description]
     */
    (function() {
        if ($window.localStorage.token === "home") {
            $state.go("home");
        }
    }());


}]);

app.controller("messageCtrl", ["$scope", "$state", "$window","ngDialog", function($scope, $state, $window,ngDialog) {

    // 退出登录
    $scope.close = function() {
        if ($window.localStorage.token === "home") {
            $window.localStorage.token = "";
            ngDialog.close();
            $state.go("index");
        }
    }
}])

app.controller("navCtrl", ["$scope", "$state", "$window", "ngDialog", function($scope, $state, $window, ngDialog) {
    /**
     * [退出登录]
     * @return {[type]} [description]
     */
    $scope.exit = function() {


        ngDialog.open({ template: '/tpls/message.html', className: 'ngdialog-theme-default' });

 
    };

}]);

app.controller("personCtrl", ["$scope", "$state", "$http", function($scope, $state, $http) {


    $scope.user = {
        userName: "liming123456",
        userPwd: "123456",
        email: "ddada@test.com",
        phone: "13892656369",
        nickName: "哈哈"
    }


    function getInfo() {
        $http.get("/user/getUser/liming")
            .success(function(data) {
                if (data.success === true) {
                	data.data.phone="13892656369";
                    $scope.user = data.data;
                    $scope.user.nickName = "李明";
                } else {
                    alert("数据获取异常。");
                }
            })
            .error(function(data) {
                alert("请求失败！")
            })
    }

    getInfo();


}]);

app.controller('taskListCtrl', ["$scope", "$http", "i18nService", "uiGridConstants", function($scope, $http, i18nService, uiGridConstants) {
            i18nService.setCurrentLang('zh-cn');
            $scope.gridOptions = {
                paginationPageSizes: [25, 50, 75],
                paginationPageSize: 25,
                columnDefs: [
                    { name: '要制作的汉字', field: "chinese" },
                    { name: '汉字单价', field: "price",cellFilter:"formatMoney"},
                    { name: '截止日期', field: "lastCompleteDate", cellFilter: 'date:"yyyy年MM月dd日 HH:mm:ss"' }, {
                        name: "完成状态",
                        field: "completeState",
                        cellFilter: "completeStateFilter"
                    },
                    { name: "完成时间", field: "completeDate", cellFilter: 'date:"yyyy年MM月dd日 HH:mm:ss"' },
                    { name: "审核状态", field: "checkState",cellFilter: "completeStateFilter"},
                    { name: "审核时间", field: "checkTime", cellFilter: 'date:"yyyy年MM月dd日 HH:mm:ss"' },
                    { name: "审核备注", field: "checkRemark", cellFilter: 'nullFilter' },
                ]
            };

            $http.get('http://localhost:3000/user/tasklist/liming')
                .success(function(response) {
                    $scope.taskList = response.data;
                    $scope.gridOptions.data = response.data.chinese;

                })
        }

    ]

).filter('completeStateFilter', function() {
    /**
     * 完成状态过滤器
     */
    return function(input) {
        return input === 0 ? "未完成" : "完成";
    };
}).filter('nullFilter', function() {
    return function(input) {
        return input === "" ? "暂无数据" : input;
    }
}).filter('formatMoney', function() {
    return function(input) {
        return "￥ "+(input / 100.0).toFixed(2);
    }

});

app.controller('uiGridCtrl', ['$scope','$http','i18nService', function($scope, $http,i18nService) {
   
i18nService.setCurrentLang('zh-cn');
    $scope.gridOptions = {
        enableSorting: true,
        columnDefs: [
            { field: 'name',enableColumnResizing: false },
            { field: 'gender'},
            { field: 'company' }
        ]
    };

    $http.get("http://ui-grid.info/data/500_complex.json")
        .success(function(data) {
            $scope.gridOptions.data = data;
            $scope.gridOptions1.data = data;
            $scope.gridOptions2.data = data;
        });

    $scope.gridOptions1 = {
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 25,
        columnDefs: [
            { name: 'name' },
            { name: 'gender' },
            { name: 'company' }
        ]
    };

    $scope.gridOptions2 = {
        enablePaginationControls: false,
        paginationPageSize: 25,
        columnDefs: [
            { name: 'name' },
            { name: 'gender' },
            { name: 'company' }
        ]
    };

    $scope.gridOptions2.onRegisterApi = function(gridApi) {
        $scope.gridApi2 = gridApi;
    }

}]);

/**
 * [用户登录验证的服务]
 * @param  {[type]} ) {}          [description]
 * @return {[type]}   [description]
 */
app.factory("authService", ['$q', '$http', function($q, $http) {
    var authService = {};
    authService.login = function(formData) {
        var deferred = $q.defer();
        $http.post("/user/logIn", { data: formData }).
        success(function(data, states, headers, config) {
            // console.log("登录请求成功");
            // console.log(states);
            // console.log(data);
            // $state.go("home");
            if (data.success === true) {
                authService.isLogin = true;
            } else {
                authService.isLogin = false;
            }
            deferred.resolve(data);
        }).
        error(function(data, states, headers, config) {
            // console.log("登录请求失败");
            // console.log(states);
            authService.isLogin = false;
            deferred.reject(data);
        })
        return deferred.promise;
    }

    return authService;

}]);

