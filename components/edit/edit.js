angular.module('edit', [
    'ngCkeditor'
]).controller('edit', edit);

function edit($scope, $timeout) {
    $scope.editorOptions = {};   //ngCkeditor必要配置
    
}