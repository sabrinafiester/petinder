myApp.service('PetsService', ['$http', function ($http) {
    var self = this;
    self.currentPet = {data: {}};

    self.getPets = function () {
        console.log('pets service - getPets()')
        $http.get('/petfinder//getRandomCat').then(function (response) {
            console.log('response.data is', response.data);
            console.log('type of response.data is', typeof response.data)
            self.currentPet.data = response.data;
            console.log('in service, current pet is', self.currentPet)
            return self.currentPet;
        })
    }

}]);
