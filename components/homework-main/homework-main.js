(function() {

    angular.module('homeworkMain', [
        'datePicker',
        'ngAnimate',
        'ngSanitize',
        'scrollIntoView',
        'flash',
        'focus-if',
        'ellipsis'
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
                url: 'API/homework/'+$scope._id,
                data: data
            }).then(function(res) {
                var result = res.data;
                if (result.code === 0) {
                    $scope.homework.push(result.content[0]);
                    $scope.newHW = newHW();
                    $scope.isEdit = false;
                } else {
                    console.error(result);
                }
            }, function(err) {
                console.error(err);
            })
        };

        $scope.delHW = function($index) {
            $http({
                method: 'DELETE',
                url: 'API/homework/'+$scope._id,
                params: {
                    homework_id: $scope.homework[$index]._id
                }
            }).then(function(res) {
                var result = res.data;
                if (result.code === 0) {
                    $scope.homework.splice($index, 1);
                    Flash.create('success', "删除成功");
                } else {
                    Flash.create('danger', result.desc);
                }
            }, function(err) {
                console.error(err);
            })
        };

        $http({
            method: 'GET',
            url: 'API/homework/'+$scope._id
        }).then(function(res) {
            var result = res.data;
            if (result.code === 0) {
                console.log(result);
                $scope.homework = result.homework;
            } else {
                console.error(result);
                Flash.create('danger', result.desc);
            }
        }, function(err) {
            console.error(err);
        });

    }


})();