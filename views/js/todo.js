var app = angular.module('myApp', []); 
app.controller('todoCtrl', function($scope, $http) {
    
    $scope.todoAdd = function() {
        $scope.lookup = [];
        var test = $scope.todoInput;
        $http.get('/test',{params:{budget:test}})
            .then(function (obj) {       
                console.log(test);
                console.log(obj.data);
                angular.forEach(obj.data, function(x){
                    $scope.lookup.push({country:x.arrival_location, url:x.image, price:x.price, done:false});
                });
        }).then(function(){
        $scope.todoInput = "";
        });
    };

    $scope.remove = function() {
        var oldList = $scope.lookup;
        $scope.lookup = [];
        angular.forEach(oldList, function(x) {
            if (!x.done) $scope.lookup.push(x);
        });
    };
});