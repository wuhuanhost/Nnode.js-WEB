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
