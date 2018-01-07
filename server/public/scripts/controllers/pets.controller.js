myApp.controller('PetsController', function (UserService, PetsService) {
    console.log('PetsController created');
    var self = this;
    self.userService = UserService;
    self.petsService = PetsService;
    self.pets = PetsService.pets;
    // self.currentPet = self.pets[self.petsService.count];
    console.log('PetsController loaded');
    console.log('user info is', self.userService.userObject)

    self.getNextPet = function () {
        //need this line i think
        // self.currentPet = PetsService.getPets();
        self.petsService.count = self.petsService.count+1;
        PetsService.checkCurrentPet(self.petsService.pets[self.petsService.count])
        self.petsService.currentPet.data = self.petsService.pets[self.petsService.count];
        self.petsService.currentPet.photos = Object.values(self.petsService.pets[self.petsService.count].media.photos);
    };

    self.lovePet = function (petId, name) {
        PetsService.saveThisPet(petId, name, true);
        //saves pet info when like is clicked
       // console.log('save button clicked');
      //  console.log('pet loved is', petId);
        //sends object to service to send to post route to db 
        self.getNextPet();
    };

    self.hidePet = function (petId) {
        PetsService.saveThisPet(petId, false);
        //saves pet info when like is clicked
     //   console.log('hide button clicked');
      //  console.log('pet not loved is', petId);
        //sends object to service to send to post route to db
        self.getNextPet();
    };

    self.successMessage = function () {
        console.log('put success toaster here');
    }

    self.showMore = function () {
        self.showPetData = true;
    }

    self.hideMore = function () {
        self.showPetData = false;
    }

    PetsService.getPets(self.userService.userObject)
});
