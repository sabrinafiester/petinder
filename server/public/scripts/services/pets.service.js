myApp.service('PetsService', ['$http', function ($http) {
    var self = this;

    self.getPets = function () {
        console.log('pets service - getPets()')
        $http.get('/petfinder/getBreeds').then(function (response) {
           console.log(response)
        })
    }

}]);
