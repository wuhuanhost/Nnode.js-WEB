app.controller('taskListCtrl',
    function($scope, $http) {
        $http.get('http://localhost:3000/user/tasklist/liming')
            .success(function(response) {
                $scope.taskList = response.data;
            })
    }
);
