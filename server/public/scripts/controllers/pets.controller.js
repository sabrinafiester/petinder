myApp.controller('PetsController', function(UserService, PetsService) {
    console.log('PetsController created');
    var self = this;
    self.userService = UserService;
    self.petsService = PetsService;

    console.log('PetsController loaded');

    self.getNextPet = function() {
        //service calls get function to connect to API
        //this function moves through the API data
    };

    self.savePet = function() {
        //saves pet info when like is clicked
        console.log('save button clicked');
        //sends object to service to send to post route to db 
        self.getNextPet();
    }

    PetsService.getPets();



  });
  