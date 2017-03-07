var app = angular.module('myApp', []); 
app.controller('todoCtrl', function($scope, $http) {
    

    $scope.todoAdd = function() {
        $scope.todoList = [];
        $http.get('/test').then(function (obj) {
            console.log(obj.data);
        angular.forEach(obj.data, function(x){
            $scope.todoList.push({todoText:x.arrival_location, done:false});
        });
           // $scope.todoList.push(obj.data);
            console.log('--||',$scope.todoList);
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