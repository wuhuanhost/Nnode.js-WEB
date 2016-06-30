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
