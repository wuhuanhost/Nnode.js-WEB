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
