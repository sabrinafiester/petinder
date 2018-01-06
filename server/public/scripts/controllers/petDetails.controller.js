myApp.controller('PetDetailsController', function(UserService) {
  console.log('PetDetailsController created');
  var vm = this;
  vm.userService = UserService;
});
