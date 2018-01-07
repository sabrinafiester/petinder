myApp.service('PetsService', ['$http', function ($http) {
    var self = this;
    self.pets = {};
    self.currentPet = {
        data: {},
        photos: []
    };
    self.showMore = false;
    self.count = 0;
    self.userPetList = [];

    self.getPets = function (species) {
        console.log('pets service - getPets()', species)
        species = "cat";
        $http.get('/petfinder/getPetsByZip/55113/' + species).then(function (response) {
            //  console.log('response.data is', response);
            //   console.log('type of response.data is', typeof response.data);
            console.log(response.data[0]);
            self.pets = response.data;
            // console.log('photo url is',  self.currentPet.data.media.photos)
            // console.log('in service, current pet is', self.currentPet)
            //self.checkCurrentPet(self.pets[self.count])
            self.currentPet.data = self.pets[self.count];
            self.currentPet.photos = Object.values(self.pets[self.count].media.photos);
            return self.pets;
        })
    }

    self.checkCurrentPet = function (pet) {
        console.log('current pet to check record for is', pet);
        console.log('self.pets is this long', self.userPetList.length);
        for (i = 0; i < self.userPetList.length; i++) {
           // console.log('current pet is', pet.id)
           // console.log('pet id from list is', self.userPetList[i].petfinder_id)
            if (self.userPetList[i].petfinder_id == pet.id) {
                console.log('oh no you already saw this guy')
                self.getNewPet();
            } else {
                self.currentPet.data = self.pets[self.count];
                self.currentPet.photos = Object.values(self.pets[self.count].media.photos);
            }
        }
    }

    self.getNewPet = function(){
        self.count++;
        self.checkCurrentPet(self.pets[self.count])
    }

    self.toggleDetails = function () {
        self.showMore = !self.showMore;
        console.log('show more?', self.showMore)
    }

    self.saveThisPet = function (pet, name, love) {
        console.log('saved pet is', name);
        //console.log('status is ', love)
        var petToSave = {
            petId: pet,
            name: name,
            love: love
        }
        self.userPetList.push(petToSave);
        $http.post('/pets', petToSave).then(function (response) {
            // console.log('response is', response)
        }).then(function () {
            self.getUserPetList();
        });
    }

    self.getUserPetList = function () {
        // console.log('in getUserPetList')
        $http.get('/pets/userPets').then(function (response) {
            console.log('petlist is', response.data);
            self.userPetList = response.data;
        })
    }

  //  self.getPets();
    self.getUserPetList();


}]);
