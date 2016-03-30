app.controller('loginCtrl', ['authService', '$scope', '$state', function(authService, $scope, $state) {
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
                $state.go("home");
            } else {
                alert("用户名密码有误");
            }
        }, function(data) {
            console.log("err");
        });
    };

}]);
