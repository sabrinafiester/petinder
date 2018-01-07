myApp.controller('PetsController', function (UserService, PetsService) {
    console.log('PetsController created');
    var self = this;
    self.userService = UserService;
    self.petsService = PetsService;
    self.currentPet = PetsService.currentPet;

    console.log('PetsController loaded');

    self.getNextPet = function () {
        self.currentPet = PetsService.getPets();
    };

    self.lovePet = function (pet) {
        //saves pet info when like is clicked
        console.log('save button clicked');
        console.log('pet loved is', pet)
        //sends object to service to send to post route to db 
        PetsService.saveThisPet(pet);
        self.getNextPet();
    }


    self.showMore = function () {
        self.showPetData = true;
    }

    self.hideMore = function () {
        self.showPetData = false;
    }

    self.getNextPet();

});
