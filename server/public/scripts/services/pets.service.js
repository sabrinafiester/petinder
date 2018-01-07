myApp.service('PetsService', ['$http', function ($http) {
    var self = this;
    self.pets = {};
    self.currentPet = {
        data: {},
        photos: []
    };
    self.showMore = false;
    self.count = 0;

    self.getPets = function () {
        console.log('pets service - getPets()')
        $http.get('/petfinder/getPetsByZip/55113/cat').then(function (response) {
            console.log('response.data is', response);
            console.log('type of response.data is', typeof response.data);
            console.log(response.data[0]);
            self.pets = response.data;
            // console.log('photo url is',  self.currentPet.data.media.photos)
            // console.log('in service, current pet is', self.currentPet)
            self.currentPet.data = self.pets[self.count];
            self.currentPet.photos = Object.values(self.pets[self.count].media.photos);
            return self.pets;
        })
    }

    self.toggleDetails = function () {
        self.showMore = !self.showMore;
        console.log('show more?', self.showMore)
    }


    self.saveThisPet = function (pet, love) {
        console.log('saved pet is', pet);
        console.log('status is ', love)
        var petToSave = {
            petId: pet,
            love: love
        }
        $http.post('/pets', petToSave).then(function (response) {
            console.log('response is', response)
        });
    }

    self.getPets();


}]);
