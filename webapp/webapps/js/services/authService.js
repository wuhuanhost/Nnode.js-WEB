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
