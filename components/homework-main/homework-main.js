(function() {

    angular.module('homeworkMain', [
        'flash',
        'ngAnimate',
        'ngSanitize',
        'ngCkeditor',
        [
            'focus-if',
            'datePicker',
            'scrollIntoView',
            'ellipsis'
        ]
    ]).directive('homeworkMain', homeworkMain);

    function homeworkMain() {
        return {
            templateUrl: 'components/homework-main/homework-main.html',
            transclude: false,
            controller: controller
        }
    }

    function controller($scope, $http, Flash) {
        $scope.newHW = newHW();

        function newHW() {
            return {
                title: "",
                deadline: moment(),
                strict: false,
                problem: ""
            }
        }

        $scope.showDetail = function() {
            
        };


        $scope.save = function() {
            if (!$scope.newHW.title){
                Flash.create('danger', "标题不能为空");
                return false;
            }
            if (!$scope.newHW.problem) {
                Flash.create('danger', "问题描述不能为空");
                return false;
            }
            var data = angular.copy($scope.newHW);
            data.deadline = data.deadline.unix();
            $http({
                method: 'POST',
                url: 'API/homework/'+$scope.course_id,
                data: data
            }).then(function(res) {
                $scope.homework.push(res.data.content[0]);
                $scope.newHW = newHW();
                $scope.isEdit = false;
            })
        };

        $scope.delHW = function($index) {
            $http({
                method: 'DELETE',
                url: 'API/homework/'+$scope.course_id,
                params: {
                    homework_id: $scope.homework[$index]._id
                }
            }).then(function(res) {
                $scope.homework.splice($index, 1);
                Flash.create('success', "删除成功");
            })
        };

        $http({
            method: 'GET',
            url: 'API/homework/'+$scope.course_id
        }).then(function(res) {
            $scope.homework = res.data.homework;
        });

    }


})();