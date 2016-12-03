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
