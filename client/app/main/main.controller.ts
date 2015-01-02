'use strict';

module myApp.controllers{
    export class MainCtrl{
        constructor(private $scope, private $http){
            $scope.awesomeThings = [];

            $http.get('/api/things').success(function(awesomeThings) {
                $scope.awesomeThings = awesomeThings;
            });

            $scope.addThing = function() {
                if($scope.newThing === '') {
                    return;
                }
                $http.post('/api/things', { name: $scope.newThing });
                $scope.newThing = '';
            };

            $scope.deleteThing = function(thing) {
                $http.delete('/api/things/' + thing._id);
            };
        }
    }
}

myApp.registerController('MainCtrl', ['$scope', '$http']);
