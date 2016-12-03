app.controller("navCtrl", ["$scope", "$state", "$window", "ngDialog", function($scope, $state, $window, ngDialog) {
    /**
     * [退出登录]
     * @return {[type]} [description]
     */
    $scope.exit = function() {


        ngDialog.open({ template: '/tpls/message.html', className: 'ngdialog-theme-default' });

 
    };

}]);
