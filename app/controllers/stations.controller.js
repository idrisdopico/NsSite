(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('StationsController', StationsController);

    function StationsController($http) {

        var vm = this;

        vm.newStation = {};
        vm.filtered = [];

        vm.setStation = function(currentStation){
            if(vm.currentStation != currentStation)
                vm.currentStation = currentStation;
            else
                vm.currentStation = undefined;

        };

        vm.createStation = function(){
            var newStation = {
                name: vm.newStation.name,
                type: vm.newStation.type
            }

            vm.allStations.splice(0, 0, newStation);
            //vm.allStations.push(newStation);

            vm.newStation = {};
        }

        vm.allStations = [
            // {name:"Anton", age:18},
            // {name:"Joris", age:29},
            // {name:"Cees", age:19},
            // {name:"Ryan", age:18},
            // {name:"Jesse", age:18},
            // {name:"Idris", age:20},
            // {name:"Donovan", age:18}
        ];

        $http.get('data/trainstations.json').then(function(stations){
            vm.allStations = stations.data;
        });

        vm.map = {
          center: { latitude: 52, longitude: 5 }, zoom: 7
        };

        //markers hier


    }


})();
