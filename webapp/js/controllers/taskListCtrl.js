app.controller('taskListCtrl', ["$scope", "$http", "i18nService", "uiGridConstants", function($scope, $http, i18nService, uiGridConstants) {
            i18nService.setCurrentLang('zh-cn');
            $scope.gridOptions = {
                paginationPageSizes: [25, 50, 75],
                paginationPageSize: 25,
                columnDefs: [
                    { name: '要制作的汉字', field: "chinese" },
                    { name: '汉字单价', field: "price" },
                    { name: '截止日期', field: "lastCompleteDate", cellFilter: 'date:"yyyy年MM月dd日 HH:mm:ss"' }, {
                        name: "完成状态",
                        field: "completeState",
                        cellFilter:"completeStateFilter"
                    },
                    { name: "完成时间", field: "completeDate", cellFilter: 'date:"yyyy年MM月dd日 HH:mm:ss"' },
                    { name: "审核状态", field: "checkState" },
                    { name: "审核时间", field: "checkTime", cellFilter: 'date:"yyyy年MM月dd日 HH:mm:ss"' },
                    { name: "审核备注", field: "checkRemark" ,cellFilter:'nullFilter'},
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
            return input===0?"未完成":"完成"; 
    };
}).filter('nullFilter',function(){
    
    return function(input){
        return input===""?"暂无数据":input;
    }
});
