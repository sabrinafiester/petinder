myApp.controller('UserController', function($http, UserService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.ideal = {
        size: '',
        age: 'adult',
        sex: '',
        kids: 'false',
        dogs: 'false',
        cats: 'false'
  };
  vm.userIdeal = {};

  vm.saveIdeal = function() {
      console.log('UserController -- save ideal');
      $http.post('/user/ideal', vm.ideal).then(function(response) {
          if(response.data) {
              vm.userIdeal = response.data;
          }
      });

  }
});
