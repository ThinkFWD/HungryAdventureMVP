var app = angular.module('myApp', []); 
app.controller('todoCtrl', function($scope, $http) {
    $scope.todoList = [{todoText:'Clean House', done:false}];

    $scope.todoAdd = function() {
        $http.get('/test').then(function (rr) {
            $scope.todoList.push({todoText:rr.data.price, done:false});
        });
        $scope.todoInput = "";
        
    };

    $scope.remove = function() {
        var oldList = $scope.todoList;
        $scope.todoList = [];
        angular.forEach(oldList, function(x) {
            if (!x.done) $scope.todoList.push(x);
        });
    };
});