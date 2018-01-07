myApp.controller('UserController', function($http, UserService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.ideal = {
        size: '',
        sex: '',
        user: 'sabrina'
  };
    vm.saveIdeal = function() {
        console.log('UserController -- saveIdeal');
        if( vm.ideal.sex === '') {
            vm.message = "Choose age or sex!";
        } else {
            console.log('UserController -- saveIdeal -- sending to server...', vm.ideal);
            $http.post('/user/ideal', vm.ideal).then(function(response) {
                console.log('UserController -- saveIdeal -- success');
                $location.path('/home');
            }).catch(function(response) {
                console.log('UserController -- saveIdeal -- error');
                vm.message = "Please try again."
            });
        }
    }

});
