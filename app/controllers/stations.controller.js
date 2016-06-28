(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('StationsController', StationsController);

    function StationsController($http,filterFilter) {

        var vm = this;

        vm.newStation = {};

        vm.setStation = function(currentStation){
            if(vm.currentStation != currentStation){
                vm.currentStation = currentStation;
                vm.geolat = currentStation.latitude;
                vm.geolong = currentStation.longitude;
                vm.map = {
                  center: { latitude: vm.geolat, longitude: vm.geolong },
                  zoom: 15,
                  options: {mapTypeId: google.maps.MapTypeId.HYBRID }
                }
              }
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
        ];
        vm.savedStations = [
        ];

        $http.get('data/trainstations.json').then(function(stations){
            vm.allStations = stations.data;
            vm.savedStations = stations.data;

        });

        vm.map = {
          center: { latitude: 52.2, longitude: 5.35 },
          zoom: 8,
          options: {mapTypeId: google.maps.MapTypeId.HYBRID }
        };

        vm.filtersorting = function(query){
          vm.allStations = angular.copy(vm.savedStations);
          this.query = query;
          vm.allStations = filterFilter(vm.allStations,this.query);
        }





    }


})();
